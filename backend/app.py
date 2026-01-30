"""
Flask API Server
Main entry point for the linguistic analysis backend
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
import os
import json
from aitism_detector import AIismDetector
from l2_voice_preserver import L2VoicePreserver
from dual_text_comparator import DualTextComparator
from linguistic_identity_scorer import LinguisticIdentityScorer
from audit_report_generator import AuditReportGenerator

app = Flask(__name__)
CORS(app)

# Initialize analysis engines
aitism_detector = AIismDetector('genericism_database.json')
l2_voice_preserver = L2VoicePreserver('genericism_database.json')
text_comparator = DualTextComparator()
identity_scorer = LinguisticIdentityScorer('genericism_database.json')
report_generator = AuditReportGenerator()


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': 'Linguistic Analysis API'})


@app.route('/analyze/aitism', methods=['POST'])
def analyze_aitism():
    """
    Detect AI-ism markers in text
    
    Expected JSON:
    {
        "text": "The student's writing sample...",
        "language": "english"
    }
    """
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        results = aitism_detector.detect_ai_markers(text)
        results['explanation'] = aitism_detector.get_ai_explanation(results['ai_ism_score'])
        results['formulaic_index'] = aitism_detector.calculate_formulaic_index(text)
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze/l2-voice', methods=['POST'])
def analyze_l2_voice():
    """
    Analyze L2 voice preservation
    
    Expected JSON:
    {
        "original": "Original student draft...",
        "edited": "AI-edited version..."
    }
    """
    try:
        data = request.get_json()
        original = data.get('original', '')
        edited = data.get('edited', '')
        
        if not original or not edited:
            return jsonify({'error': 'Both original and edited text required'}), 400
        
        voice_analysis = l2_voice_preserver.detect_l2_grammatical_structures(original)
        voice_loss = l2_voice_preserver.detect_voice_loss(original, edited)
        
        return jsonify({
            'structure_analysis': voice_analysis,
            'voice_loss_analysis': voice_loss
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze/voice-preservation', methods=['POST'])
def analyze_voice_preservation():
    """
    Calculate overall linguistic identity score
    
    Expected JSON:
    {
        "original": "Original student draft...",
        "edited": "AI-edited version..."
    }
    """
    try:
        data = request.get_json()
        original = data.get('original', '')
        edited = data.get('edited', '')
        
        if not original or not edited:
            return jsonify({'error': 'Both original and edited text required'}), 400
        
        results = identity_scorer.calculate_voice_preservation_score(original, edited)
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze/compare', methods=['POST'])
def compare_texts():
    """
    Compare original and edited texts
    
    Expected JSON:
    {
        "original": "Original student draft...",
        "edited": "AI-edited version..."
    }
    """
    try:
        data = request.get_json()
        original = data.get('original', '')
        edited = data.get('edited', '')
        
        if not original or not edited:
            return jsonify({'error': 'Both original and edited text required'}), 400
        
        results = text_comparator.compare_texts(original, edited)
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze/full-audit', methods=['POST'])
def full_audit():
    """
    Perform complete linguistic audit
    
    Expected JSON:
    {
        "original": "Original student draft...",
        "edited": "AI-edited version..."
    }
    """
    try:
        data = request.get_json()
        original = data.get('original', '')
        edited = data.get('edited', '')
        
        if not original or not edited:
            return jsonify({'error': 'Both original and edited text required'}), 400
        
        # Run all analyses
        aitism_results = aitism_detector.detect_ai_markers(original)
        aitism_results['explanation'] = aitism_detector.get_ai_explanation(aitism_results['ai_ism_score'])
        
        l2_voice_results = l2_voice_preserver.detect_l2_grammatical_structures(original)
        l2_voice_loss = l2_voice_preserver.detect_voice_loss(original, edited)
        
        voice_preservation = identity_scorer.calculate_voice_preservation_score(original, edited)
        
        comparison = text_comparator.compare_texts(original, edited)
        
        return jsonify({
            'aitism_analysis': aitism_results,
            'l2_voice_analysis': {
                'structure_analysis': l2_voice_results,
                'voice_loss_analysis': l2_voice_loss
            },
            'voice_preservation': voice_preservation,
            'text_comparison': comparison,
            'summary': {
                'overall_score': voice_preservation['overall_score'],
                'risk_level': voice_preservation['risk_level'],
                'aitism_score': aitism_results['ai_ism_score']
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/generate-report', methods=['POST'])
def generate_report():
    """
    Generate PDF audit report
    
    Expected JSON:
    {
        "original": "Original student draft...",
        "edited": "AI-edited version...",
        "aitism_results": {...},
        "voice_preservation": {...},
        "l2_voice_analysis": {...},
        "comparison_data": {...}
    }
    """
    try:
        data = request.get_json()
        original = data.get('original', '')
        edited = data.get('edited', '')
        aitism_results = data.get('aitism_results', {})
        voice_preservation = data.get('voice_preservation', {})
        l2_voice_analysis = data.get('l2_voice_analysis', {})
        comparison_data = data.get('comparison_data', {})
        
        if not original or not edited:
            return jsonify({'error': 'Both original and edited text required'}), 400
        
        # Generate PDF
        pdf_buffer = io.BytesIO()
        report_generator.generate_full_report(
            pdf_buffer,
            original,
            edited,
            aitism_results,
            voice_preservation,
            l2_voice_analysis,
            comparison_data
        )
        
        pdf_buffer.seek(0)
        
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='Linguistic_Audit_Report.pdf'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/markers', methods=['GET'])
def get_ai_markers():
    """Return the AI markers database for reference"""
    try:
        with open('genericism_database.json', 'r') as f:
            db = json.load(f)
        return jsonify(db)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Development server
    app.run(debug=True, host='0.0.0.0', port=5000)
