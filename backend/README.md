# Linguistic Analysis Backend

## Overview

This Python backend provides AI-ism detection, L2 voice preservation analysis, and comprehensive linguistic auditing for the Writing Defense Platform.

## Features

### 1. AI-ism Detection System
- **Genericism Database**: Curated lexicon of high-frequency AI markers
- **Formulaic Structure Detection**: Identifies templated sentence patterns
- **Generic Language Detection**: Flags academic clichés and hedging qualifiers
- **Transition Word Analysis**: Detects overuse of transitional phrases
- **Reporting**: Quantified AI-ism score (0-100) with detailed breakdown

### 2. L2 Voice Preservation Engine
- **L2 Grammatical Structures**: Identifies stylistically valid L2 patterns
- **Cultural Metaphor Detection**: Protects culturally-influenced imagery
- **L1 Interference Markers**: Detects and preserves authentic L1 transfer
- **Voice Loss Analysis**: Quantifies what authentic elements were lost

### 3. Dual-Text Comparison
- **Sentence-Level Diff**: Tracks additions, deletions, modifications
- **Word-Level Analysis**: Detailed change visualization
- **Readability Impact**: Measures complexity changes
- **Change Statistics**: Comprehensive metrics about edits

### 4. Linguistic Identity Scoring
- **Voice Preservation Score**: 0-100 scale measuring original voice retained
- **Component Analysis**: 5-factor breakdown
  - Lexical Identity (word choice preservation)
  - Structural Identity (sentence pattern preservation)
  - Stylistic Identity (personal style consistency)
  - Voice Consistency (uniformity across document)
  - Authenticity Markers (unique personal/L2 elements)
- **Homogenization Assessment**: Risk levels from "Low" to "Critical"

### 5. PDF Report Generation
- **Comprehensive Audit Reports**: Professional PDF output
- **Executive Summary**: Key findings and risk assessment
- **Detailed Metrics**: Component breakdown and statistics
- **Recommendations**: Actionable guidance for students
- **Methodology**: Transparent explanation of analysis methods

## Installation

### Requirements
- Python 3.9+
- pip (Python package manager)

### Quick Start

```bash
# Navigate to backend directory
cd backend

# Run setup script
chmod +x setup.sh
./setup.sh

# Activate virtual environment
source venv/bin/activate

# Start the server
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### 1. Health Check
```
GET /health
```
Returns service status.

### 2. AI-ism Analysis
```
POST /analyze/aitism
Content-Type: application/json

{
  "text": "The student's writing sample...",
  "language": "english"
}
```

**Response**: AI-ism score, marker breakdown, risk level

### 3. L2 Voice Analysis
```
POST /analyze/l2-voice
Content-Type: application/json

{
  "original": "Student's original draft...",
  "edited": "AI-edited version..."
}
```

**Response**: L2 structure analysis, voice loss detection

### 4. Voice Preservation Score
```
POST /analyze/voice-preservation
Content-Type: application/json

{
  "original": "Student's original draft...",
  "edited": "AI-edited version..."
}
```

**Response**: Overall score (0-100), component scores, interpretation

### 5. Text Comparison
```
POST /analyze/compare
Content-Type: application/json

{
  "original": "Student's original draft...",
  "edited": "AI-edited version..."
}
```

**Response**: Detailed diff analysis, changes, statistics

### 6. Full Audit
```
POST /analyze/full-audit
Content-Type: application/json

{
  "original": "Student's original draft...",
  "edited": "AI-edited version..."
}
```

**Response**: Combined results from all analysis engines

### 7. PDF Report Generation
```
POST /generate-report
Content-Type: application/json

{
  "original": "Student's original draft...",
  "edited": "AI-edited version...",
  "aitism_results": {...},
  "voice_preservation": {...},
  "l2_voice_analysis": {...},
  "comparison_data": {...}
}
```

**Response**: PDF file download

### 8. AI Markers Reference
```
GET /api/markers
```

Returns the complete genericism database for reference.

## Usage Example

### Python

```python
import requests
import json

BASE_URL = "http://localhost:5000"

# Example texts
original = """
The problem of climate change is very big. Many scientists agree with this.
First, we see weather changes. Furthermore, water levels are rising. 
In conclusion, we need to do something about this.
"""

edited = """
The escalating climate crisis presents unprecedented challenges to global 
ecosystems and human societies alike. Extensive scientific consensus confirms 
this urgent reality. In the ever-evolving landscape of environmental science, 
multiple indicators signal systemic change: altered precipitation patterns, 
rising sea levels, and ecological disruption. Consequently, immediate 
intervention at scale becomes imperative.
"""

# Full audit
response = requests.post(
    f"{BASE_URL}/analyze/full-audit",
    json={"original": original, "edited": edited}
)

results = response.json()
print(f"Voice Preservation Score: {results['summary']['overall_score']}/100")
print(f"AI-ism Score: {results['summary']['aitism_score']}/100")
print(f"Risk Level: {results['voice_preservation']['risk_level']}")
```

### JavaScript/React

```javascript
const analyzeText = async (original, edited) => {
  const response = await fetch('/api/analyze/full-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ original, edited })
  });

  return await response.json();
};

// Use in React component
const results = await analyzeText(originalText, editedText);
console.log(`Score: ${results.voice_preservation.overall_score}/100`);
```

## Scoring Interpretation

### Voice Preservation Score

| Score | Level | Meaning |
|-------|-------|---------|
| 80-100 | LOW Risk | Student used AI as a tool, voice strongly preserved |
| 60-79 | MODERATE Risk | Some voice loss, but authentic elements remain |
| 40-59 | HIGH Risk | Significant AI homogenization, much voice lost |
| 20-39 | CRITICAL Risk | Heavy rewriting, minimal authentic voice |
| 0-19 | SEVERE | Text essentially AI-generated |

### AI-ism Score

| Score | Risk Level | Interpretation |
|-------|-----------|-----------------|
| 0-20 | Low | Natural, unique voice with minimal AI markers |
| 20-40 | Moderate | Some generic language but overall authentic |
| 40-60 | High | Heavy use of formulaic/generic patterns |
| 60-80 | Critical | Mostly formulaic, heavily AI-influenced |
| 80-100 | Severe | Extremely formulaic, likely AI-generated |

## Architecture

### Core Modules

1. **aitism_detector.py**: AI-ism marker detection
   - High-frequency AI phrases
   - Formulaic sentence structures
   - Academic clichés
   - Generic openers
   - Transition word analysis

2. **l2_voice_preserver.py**: L2 voice preservation
   - Grammatical structure analysis
   - Cultural reference detection
   - L1 interference identification
   - Voice loss measurement

3. **dual_text_comparator.py**: Text comparison
   - Sentence-level diffing
   - Word-level tracking
   - Readability impact analysis
   - Visualization data generation

4. **linguistic_identity_scorer.py**: Voice preservation scoring
   - 5-factor component analysis
   - Weighted composite scoring
   - Homogenization risk assessment
   - Authenticity evaluation

5. **audit_report_generator.py**: PDF report generation
   - Professional report formatting
   - Executive summary
   - Detailed metrics presentation
   - Recommendations

6. **app.py**: Flask API server
   - RESTful endpoints
   - Request handling
   - CORS support
   - File serving

## Configuration

### Environment Variables

```bash
FLASK_ENV=development  # or production
FLASK_DEBUG=True       # Enable debug mode
FLASK_PORT=5000        # Server port
```

### Database Path

Ensure `genericism_database.json` is in the same directory as the Python scripts.

## Performance

- **Response Time**: Typically 1-3 seconds per analysis
- **Max Text Length**: No strict limit (tested up to 100,000 words)
- **Concurrent Requests**: Supports multiple simultaneous analyses

## Troubleshooting

### ImportError: No module named 'spacy'

```bash
# Activate virtual environment
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### CORS Errors

The backend includes CORS support. If still experiencing issues:

1. Ensure React frontend is running on a different port
2. Check that Flask CORS is properly initialized
3. Verify API endpoints in frontend match backend URLs

### Port Already in Use

```bash
# Change the port in app.py
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Use 5001 instead
```

## Future Enhancements

- [ ] Multi-language support (Spanish, Mandarin, Arabic)
- [ ] Real-time analysis streaming
- [ ] Machine learning model refinement
- [ ] Batch processing support
- [ ] Integration with learning management systems
- [ ] Advanced visualization dashboards

## License

This project is part of research on AI editing and L2 writing instruction.

## Contributing

For issues, improvements, or contributions:
1. Document the change clearly
2. Update tests if applicable
3. Submit for review

## Support

For questions or technical issues, refer to:
- [Backend Issues](./docs/TROUBLESHOOTING.md)
- API documentation in `/docs/API.md`
- Example usage in `/examples/`
