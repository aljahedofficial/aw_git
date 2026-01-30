import React, { useState } from 'react';
import './ColonizationAnalyzer.css';

interface AnalysisResults {
  overall_score: number;
  risk_level: string;
  component_scores: {
    lexical_identity: number;
    structural_identity: number;
    stylistic_identity: number;
    voice_consistency: number;
    authenticity_markers: number;
  };
  interpretation: string;
  detailed_metrics: Record<string, any>;
}

interface AIismResults {
  ai_ism_score: number;
  risk_level: string;
  high_frequency_phrases: Array<[number, number, string]>;
  academic_clichés: Array<[number, number, string]>;
  transition_abuse: Array<[number, number, string]>;
  generic_openers: Array<[number, number, string]>;
  explanation: string;
}

const ColonizationAnalyzer: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  const handleAnalyze = async () => {
    if (!originalText.trim() || !editedText.trim()) {
      alert('Please provide both original and edited text');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze/full-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original: originalText,
          edited: editedText
        })
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResults(data);
      setActiveTab('results');
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!results) return;

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original: originalText,
          edited: editedText,
          ...results
        })
      });

      if (!response.ok) throw new Error('Report generation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Linguistic_Audit_Report.pdf';
      a.click();
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating report. Please try again.');
    }
  };

  const getRiskColor = (score: number): string => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFC107'; // Yellow
    if (score >= 40) return '#FF9800'; // Orange
    return '#f44336'; // Red
  };

  const getColonizationLevel = (score: number): string => {
    if (score >= 70) return 'LOW - Voice Authentic';
    if (score >= 50) return 'MODERATE - Some Voice Loss';
    if (score >= 30) return 'HIGH - Significant Colonization';
    return 'CRITICAL - Voice Colonized';
  };

  return (
    <div className="colonization-analyzer">
      <header className="analyzer-header">
        <h1>🔍 Linguistic Colonization Analyzer</h1>
        <p>Detect AI interference & preserve your authentic voice</p>
      </header>

      <div className="analyzer-container">
        {activeTab === 'input' ? (
          <div className="input-section">
            <div className="text-input-group">
              <label htmlFor="original">Student's Original Draft</label>
              <textarea
                id="original"
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste your original writing here..."
                rows={12}
              />
            </div>

            <div className="text-input-group">
              <label htmlFor="edited">AI-Edited Version</label>
              <textarea
                id="edited"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Paste the AI-polished version here..."
                rows={12}
              />
            </div>

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze for Colonization'}
            </button>
          </div>
        ) : (
          <div className="results-section">
            {results && (
              <>
                {/* Overall Score */}
                <div className="score-card">
                  <h2>Voice Preservation Score</h2>
                  <div className="score-display">
                    <div
                      className="score-circle"
                      style={{ borderColor: getRiskColor(results.voice_preservation.overall_score) }}
                    >
                      <div className="score-value">{results.voice_preservation.overall_score.toFixed(1)}</div>
                      <div className="score-label">/100</div>
                    </div>
                    <div className="score-info">
                      <div className="risk-level" style={{ color: getRiskColor(results.voice_preservation.overall_score) }}>
                        {getColonizationLevel(results.voice_preservation.overall_score)}
                      </div>
                      <p className="interpretation">{results.voice_preservation.interpretation}</p>
                    </div>
                  </div>
                </div>

                {/* Component Scores */}
                <div className="components-card">
                  <h3>Component Analysis</h3>
                  <div className="component-grid">
                    {Object.entries(results.voice_preservation.component_scores).map(([key, value]: [string, any]) => (
                      <div key={key} className="component-item">
                        <label>{key.replace(/_/g, ' ')}</label>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${value}%`,
                              backgroundColor: getRiskColor(value)
                            }}
                          />
                        </div>
                        <span className="component-score">{value.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI-ism Detection */}
                <div className="aitism-card">
                  <h3>AI-ism Markers Detected</h3>
                  <div className="aitism-score">
                    <span>AI-ism Score:</span>
                    <strong style={{ color: getRiskColor(results.aitism_analysis.ai_ism_score) }}>
                      {results.aitism_analysis.ai_ism_score.toFixed(1)}/100
                    </strong>
                  </div>
                  <p className="aitism-explanation">{results.aitism_analysis.explanation}</p>
                  
                  <div className="marker-summary">
                    <h4>Detected Markers:</h4>
                    <ul>
                      <li>High-Frequency Phrases: {results.aitism_analysis.high_frequency_phrases.length}</li>
                      <li>Academic Clichés: {results.aitism_analysis.academic_clichés.length}</li>
                      <li>Transition Word Abuse: {results.aitism_analysis.transition_abuse.length}</li>
                      <li>Generic Openers: {results.aitism_analysis.generic_openers.length}</li>
                    </ul>
                  </div>
                </div>

                {/* Text Comparison */}
                <div className="comparison-card">
                  <h3>Text Changes</h3>
                  <div className="change-stats">
                    <div className="stat">
                      <strong>Words Added:</strong> {results.text_comparison.changes.additions.length}
                    </div>
                    <div className="stat">
                      <strong>Words Removed:</strong> {results.text_comparison.changes.deletions.length}
                    </div>
                    <div className="stat">
                      <strong>Total Change:</strong> {results.text_comparison.summary.change_percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    className="generate-report-btn"
                    onClick={handleGenerateReport}
                  >
                    📄 Generate PDF Report
                  </button>
                  <button
                    className="back-btn"
                    onClick={() => setActiveTab('input')}
                  >
                    ← Back to Input
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColonizationAnalyzer;
