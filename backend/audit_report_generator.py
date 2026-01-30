"""
PDF Report Generation
Creates comprehensive "Linguistic Audit" reports
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from datetime import datetime
import io
import json
from typing import Dict, BinaryIO


class AuditReportGenerator:
    """Generates comprehensive linguistic audit reports in PDF format"""
    
    def __init__(self):
        """Initialize report generator"""
        self.styles = getSampleStyleSheet()
        self._create_custom_styles()
    
    def _create_custom_styles(self):
        """Create custom paragraph styles"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1a1a1a'),
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#333333'),
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['BodyText'],
            fontSize=11,
            alignment=TA_JUSTIFY,
            spaceAfter=8
        ))
        
        self.styles.add(ParagraphStyle(
            name='CriticalHighlight',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor=colors.HexColor('#d32f2f'),
            fontName='Helvetica-Bold',
            spaceAfter=6
        ))
    
    def generate_full_report(self, 
                            output_file: BinaryIO,
                            original_text: str,
                            edited_text: str,
                            aitism_results: Dict,
                            voice_preservation: Dict,
                            l2_voice_analysis: Dict,
                            comparison_data: Dict,
                            colonization_heatmap_data: Dict = None) -> None:
        """
        Generate comprehensive linguistic audit report
        
        Args:
            output_file: File object to write PDF to
            original_text: Student's original draft
            edited_text: AI-polished version
            aitism_results: AI-ism detection results
            voice_preservation: Linguistic identity scores
            l2_voice_analysis: L2 voice preservation analysis
            comparison_data: Dual-text comparison data
            colonization_heatmap_data: Heatmap visualization data
        """
        doc = SimpleDocTemplate(
            output_file,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch
        )
        
        story = []
        
        # Title Page
        story.extend(self._create_title_page(original_text, edited_text, voice_preservation))
        story.append(PageBreak())
        
        # Executive Summary
        story.extend(self._create_executive_summary(voice_preservation, aitism_results))
        story.append(PageBreak())
        
        # AI-ism Analysis
        story.extend(self._create_aitism_section(aitism_results))
        story.append(PageBreak())
        
        # Voice Preservation Analysis
        story.extend(self._create_voice_preservation_section(voice_preservation, l2_voice_analysis))
        story.append(PageBreak())
        
        # Detailed Comparison
        story.extend(self._create_comparison_section(comparison_data))
        story.append(PageBreak())
        
        # L2 Voice Preservation Details
        story.extend(self._create_l2_voice_section(l2_voice_analysis))
        story.append(PageBreak())
        
        # Recommendations
        story.extend(self._create_recommendations(voice_preservation, aitism_results, l2_voice_analysis))
        story.append(PageBreak())
        
        # Methodology
        story.extend(self._create_methodology_section())
        
        # Build PDF
        doc.build(story)
    
    def _create_title_page(self, original: str, edited: str, voice_results: Dict):
        """Create report title page"""
        elements = []
        
        elements.append(Spacer(1, 1*inch))
        elements.append(Paragraph(
            "LINGUISTIC AUDIT REPORT",
            self.styles['CustomTitle']
        ))
        elements.append(Paragraph(
            "Student Voice Analysis & AI Colonization Assessment",
            self.styles['Heading2']
        ))
        
        elements.append(Spacer(1, 0.5*inch))
        
        # Overall score box
        score = voice_results['overall_score']
        risk = voice_results['risk_level']
        
        score_color = self._get_score_color(score)
        
        score_data = [
            ['Overall Voice Preservation Score', f'{score}/100'],
            ['Colonization Risk Level', risk],
            ['Report Generated', datetime.now().strftime('%B %d, %Y')]
        ]
        
        score_table = Table(score_data, colWidths=[3*inch, 2*inch])
        score_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        elements.append(score_table)
        elements.append(Spacer(1, 0.5*inch))
        
        # Key statistics
        elements.append(Paragraph("Document Statistics", self.styles['CustomHeading']))
        
        stats_data = [
            ['Metric', 'Original', 'Edited', 'Change'],
            ['Word Count', str(len(original.split())), str(len(edited.split())), 
             f"{len(edited.split()) - len(original.split()):+d}"],
            ['Character Count', str(len(original)), str(len(edited)), 
             f"{len(edited) - len(original):+d}"],
        ]
        
        stats_table = Table(stats_data, colWidths=[1.5*inch, 1*inch, 1*inch, 1*inch])
        stats_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey)
        ]))
        
        elements.append(stats_table)
        
        return elements
    
    def _create_executive_summary(self, voice_results: Dict, aitism_results: Dict):
        """Create executive summary section"""
        elements = []
        
        elements.append(Paragraph("Executive Summary", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.3*inch))
        
        # Main finding
        interpretation = voice_results['interpretation']
        elements.append(Paragraph("Overall Finding", self.styles['CustomHeading']))
        elements.append(Paragraph(interpretation, self.styles['CriticalHighlight']))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Risk assessment
        elements.append(Paragraph("Colonization Risk Assessment", self.styles['CustomHeading']))
        risk_level = voice_results['risk_level']
        
        risk_text = f"This document presents a <b>{risk_level}</b> level of linguistic colonization. "
        
        if 'AUTHENTIC' in risk_level:
            risk_text += "The student's original voice is strongly preserved throughout the document."
        elif 'SOME VOICE LOSS' in risk_level:
            risk_text += "While the student's core voice remains, some simplification has occurred."
        elif 'SIGNIFICANT' in risk_level:
            risk_text += "The document has undergone substantial AI-driven polishing that has erased much of the student's authentic voice."
        elif 'COLONIZED' in risk_level:
            risk_text += "The document has been heavily transformed by AI editing, with minimal traces of the student's original linguistic identity."
        
        elements.append(Paragraph(risk_text, self.styles['CustomBody']))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Component breakdown
        elements.append(Paragraph("Component Scores", self.styles['CustomHeading']))
        
        components = voice_results['component_scores']
        comp_data = [
            ['Component', 'Score', 'Assessment'],
            ['Lexical Identity', f"{components['lexical_identity']:.1f}/100", self._score_assessment(components['lexical_identity'])],
            ['Structural Identity', f"{components['structural_identity']:.1f}/100", self._score_assessment(components['structural_identity'])],
            ['Stylistic Identity', f"{components['stylistic_identity']:.1f}/100", self._score_assessment(components['stylistic_identity'])],
            ['Voice Consistency', f"{components['voice_consistency']:.1f}/100", self._score_assessment(components['voice_consistency'])],
            ['Authenticity Markers', f"{components['authenticity_markers']:.1f}/100", self._score_assessment(components['authenticity_markers'])]
        ]
        
        comp_table = Table(comp_data, colWidths=[2*inch, 1*inch, 2*inch])
        comp_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#333333')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0f0f0')]),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey)
        ]))
        
        elements.append(comp_table)
        
        return elements
    
    def _create_aitism_section(self, aitism_results: Dict):
        """Create AI-ism detection section"""
        elements = []
        
        elements.append(Paragraph("AI-ism Detection Analysis", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        elements.append(Paragraph("Overall AI-ism Score", self.styles['CustomHeading']))
        score = aitism_results['ai_ism_score']
        risk = aitism_results['risk_level']
        
        elements.append(Paragraph(
            f"<b>Score: {score:.1f}/100</b> | <b>Risk Level: {risk.upper()}</b>",
            self.styles['CustomBody']
        ))
        
        explanation = aitism_results.get('explanation', 'No explanation available')
        elements.append(Paragraph(explanation, self.styles['CustomBody']))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Detailed findings
        elements.append(Paragraph("Detected AI Markers", self.styles['CustomHeading']))
        
        marker_counts = {
            'High-Frequency Phrases': len(aitism_results.get('high_frequency_phrases', [])),
            'Formulaic Structures': len(aitism_results.get('formulaic_structures', [])),
            'Hedging Qualifiers': len(aitism_results.get('hedging_qualifiers', [])),
            'Academic Clichés': len(aitism_results.get('academic_clichés', [])),
            'Transition Word Abuse': len(aitism_results.get('transition_abuse', [])),
            'Generic Openers': len(aitism_results.get('generic_openers', []))
        }
        
        marker_data = [['Marker Type', 'Count']]
        marker_data.extend([[k, str(v)] for k, v in marker_counts.items()])
        
        marker_table = Table(marker_data, colWidths=[3*inch, 1*inch])
        marker_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1a1a')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9f9f9')]),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey)
        ]))
        
        elements.append(marker_table)
        
        return elements
    
    def _create_voice_preservation_section(self, voice_results: Dict, l2_results: Dict):
        """Create voice preservation analysis section"""
        elements = []
        
        elements.append(Paragraph("Linguistic Identity Preservation", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        elements.append(Paragraph("Analysis Overview", self.styles['CustomHeading']))
        
        overview_text = (
            "This section examines how much of the student's original linguistic identity "
            "has been preserved in the edited version. A high score indicates that the student "
            "used AI as a tool while maintaining their authentic voice. A low score suggests "
            "that AI editing has 'colonized' the text, replacing the student's original expression "
            "with generic, standardized academic language."
        )
        
        elements.append(Paragraph(overview_text, self.styles['CustomBody']))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Detailed metrics
        elements.append(Paragraph("Preservation Metrics", self.styles['CustomHeading']))
        
        metrics = voice_results['detailed_metrics']
        metrics_data = [
            ['Metric', 'Value'],
            ['Original Word Count', str(metrics['original_word_count'])],
            ['Edited Word Count', str(metrics['edited_word_count'])],
            ['Retained Unique Words', str(metrics['retained_unique_words'])],
            ['Retained Sentence Patterns', str(metrics['retained_sentence_patterns'])],
            ['AI Phrase Penetration', f"{100 - metrics['ai_phrase_infiltration']:.1f}%"]
        ]
        
        metrics_table = Table(metrics_data, colWidths=[2.5*inch, 1.5*inch])
        metrics_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2196F3')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#e3f2fd')]),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey)
        ]))
        
        elements.append(metrics_table)
        
        return elements
    
    def _create_comparison_section(self, comparison_data: Dict):
        """Create detailed comparison section"""
        elements = []
        
        elements.append(Paragraph("Textual Changes Analysis", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        # Summary statistics
        stats = comparison_data['statistics']
        
        elements.append(Paragraph("Change Statistics", self.styles['CustomHeading']))
        
        change_data = [
            ['Metric', 'Original', 'Edited', 'Change'],
            ['Word Count', str(stats['original_word_count']), str(stats['edited_word_count']), 
             f"{stats['word_count_change']:+d}"],
            ['Character Count', str(stats['original_char_count']), str(stats['edited_char_count']),
             f"{stats['char_count_change']:+d}"],
            ['Average Word Length', 
             f"{stats['readability_impact']['original_avg_word_length']:.2f}",
             f"{stats['readability_impact']['edited_avg_word_length']:.2f}",
             f"{stats['readability_impact']['complexity_magnitude']:+.2f}"]
        ]
        
        change_table = Table(change_data, colWidths=[1.5*inch, 1*inch, 1*inch, 1.5*inch])
        change_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4CAF50')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f1f8e9')]),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey)
        ]))
        
        elements.append(change_table)
        
        # Change summary
        changes = comparison_data['changes']
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph("Change Summary", self.styles['CustomHeading']))
        
        summary_text = (
            f"The edited version contains <b>{changes['total_additions']} additions</b>, "
            f"<b>{changes['total_deletions']} deletions</b>, and "
            f"<b>{changes['total_modifications']} modifications</b>. "
            f"Overall, <b>{comparison_data['summary']['change_percentage']:.1f}%</b> of the text "
            "has been modified from the original."
        )
        
        elements.append(Paragraph(summary_text, self.styles['CustomBody']))
        
        return elements
    
    def _create_l2_voice_section(self, l2_results: Dict):
        """Create L2 voice preservation section"""
        elements = []
        
        elements.append(Paragraph("L2 Voice Preservation", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        elements.append(Paragraph("L2 Authenticity Analysis", self.styles['CustomHeading']))
        
        indicators = l2_results.get('authenticity_indicators', [])
        for indicator in indicators:
            elements.append(Paragraph(indicator, self.styles['CustomBody']))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Voice loss analysis
        voice_loss = l2_results.get('total_voice_loss', 0)
        if voice_loss > 0:
            elements.append(Paragraph("Voice Loss Detected", self.styles['CustomHeading']))
            elements.append(Paragraph(
                f"<b>{voice_loss:.1f} points</b> of L2 voice authenticity have been lost in the editing process.",
                self.styles['CriticalHighlight']
            ))
            
            lost_structures = l2_results.get('lost_structures', [])
            if lost_structures:
                elements.append(Paragraph("Lost L2 Structures:", self.styles['CustomHeading']))
                for struct in lost_structures[:3]:
                    elements.append(Paragraph(f"• {struct}", self.styles['CustomBody']))
        
        return elements
    
    def _create_recommendations(self, voice_results: Dict, aitism_results: Dict, l2_results: Dict):
        """Create recommendations section"""
        elements = []
        
        elements.append(Paragraph("Recommendations", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        score = voice_results['overall_score']
        
        if score >= 80:
            rec_text = (
                "<b>Recommendation: ACCEPT WITH CONFIDENCE</b><br/><br/>"
                "This document demonstrates strong preservation of student voice. "
                "AI was used appropriately as a tool for polishing rather than rewriting. "
                "The student has maintained authentic linguistic identity throughout."
            )
        elif score >= 60:
            rec_text = (
                "<b>Recommendation: ACCEPTABLE WITH MINOR REVISIONS</b><br/><br/>"
                "The student's voice is largely preserved, though some simplification has occurred. "
                "Consider restoring unique L2 expressions that were simplified during AI editing. "
                "This will increase authenticity while maintaining polish."
            )
        elif score >= 40:
            rec_text = (
                "<b>Recommendation: REQUIRES SUBSTANTIAL REVISION</b><br/><br/>"
                "The AI editing has significantly altered the student's original voice. "
                "Restore key L2-authentic grammatical structures and cultural references. "
                "Rebalance to reflect more of the student's original phrasing."
            )
        else:
            rec_text = (
                "<b>Recommendation: REJECT - REWRITE REQUIRED</b><br/><br/>"
                "This document shows severe linguistic colonization. The student's original voice "
                "has been largely erased. The student should start with their original draft and "
                "make targeted edits rather than relying on AI polishing tools."
            )
        
        elements.append(Paragraph(rec_text, self.styles['CustomBody']))
        
        # Specific action items
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph("Action Items", self.styles['CustomHeading']))
        
        action_items = []
        
        if aitism_results['ai_ism_score'] > 30:
            action_items.append("Replace high-frequency AI phrases with authentic student voice")
        
        if l2_results.get('lost_structures'):
            action_items.append("Restore L2-authentic grammatical structures from original draft")
        
        if l2_results.get('lost_cultural_references'):
            action_items.append("Reincorporate cultural references that were removed during editing")
        
        if score < 50:
            action_items.append("Have peer/tutor review to identify what makes your voice unique")
        
        for item in action_items:
            elements.append(Paragraph(f"✓ {item}", self.styles['CustomBody']))
        
        return elements
    
    def _create_methodology_section(self):
        """Create methodology appendix"""
        elements = []
        
        elements.append(Paragraph("Methodology", self.styles['CustomTitle']))
        elements.append(Spacer(1, 0.2*inch))
        
        methodology_text = (
            "<b>AI-ism Detection:</b> Scans text for formulaic phrases, generic academic language, "
            "and sentence structures typical of large language model outputs. Measures the "
            "concentration of AI markers relative to document length.<br/><br/>"
            "<b>Voice Preservation Scoring:</b> Analyzes lexical retention, structural similarity, "
            "stylistic consistency, and authenticity markers. Calculates a weighted composite score "
            "indicating how much original student voice remains.<br/><br/>"
            "<b>L2 Voice Analysis:</b> Identifies and protects L2-authentic grammatical patterns, "
            "cultural references, and L1 transfer features that indicate genuine student expression. "
            "Flags when AI editing has erased these elements.<br/><br/>"
            "<b>Linguistic Colonization:</b> Refers to the process where AI editing replaces a student's "
            "authentic linguistic identity with standardized, generic language. This audit tool helps "
            "students reclaim agency over their own voice in academic writing."
        )
        
        elements.append(Paragraph(methodology_text, self.styles['CustomBody']))
        
        return elements
    
    def _get_score_color(self, score: float) -> str:
        """Get color based on score"""
        if score >= 80:
            return '#4CAF50'  # Green
        elif score >= 60:
            return '#FFC107'  # Yellow
        elif score >= 40:
            return '#FF9800'  # Orange
        else:
            return '#f44336'  # Red
    
    def _score_assessment(self, score: float) -> str:
        """Get assessment text for score"""
        if score >= 80:
            return "Excellent"
        elif score >= 60:
            return "Good"
        elif score >= 40:
            return "Moderate"
        elif score >= 20:
            return "Poor"
        else:
            return "Critical"
