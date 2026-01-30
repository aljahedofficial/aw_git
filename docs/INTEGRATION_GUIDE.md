# Integration Guide: Linguistic Analysis Backend

## Overview

This guide explains how the new AI-ism detection and voice preservation features are integrated with the Writing Defense Platform.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│           React Frontend (Vite)                         │
│         - ColonizationAnalyzer Component                │
│         - Dual-text input interface                     │
│         - Results visualization                         │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/JSON (port 3000)
                   │
         ┌─────────▼─────────┐
         │  Vite Dev Proxy   │
         │ (vite.config.ts)  │
         └─────────┬─────────┘
                   │ proxies to localhost:5000
                   │
┌──────────────────▼──────────────────────────────────────┐
│         Flask Backend (Python)                          │
│  - aitism_detector.py                                  │
│  - l2_voice_preserver.py                               │
│  - dual_text_comparator.py                             │
│  - linguistic_identity_scorer.py                       │
│  - audit_report_generator.py                           │
│  - app.py (REST API)                                   │
└──────────────────────────────────────────────────────────┘
```

## Components

### Frontend Components

#### ColonizationAnalyzer.tsx

Main React component for the analyzer interface.

**Location**: `src/components/ColonizationAnalyzer.tsx`

**Features**:
- Dual text input (original + edited)
- Analysis trigger button
- Results display with visualization
- PDF report generation

**Key Methods**:
- `handleAnalyze()`: Calls `/api/analyze/full-audit`
- `handleGenerateReport()`: Calls `/api/generate-report`

**State**:
- `originalText`: Student's original draft
- `editedText`: AI-edited version
- `results`: Analysis results from backend
- `activeTab`: Toggle between input and results
- `isAnalyzing`: Loading state

### Backend Modules

#### 1. aitism_detector.py

Detects AI-generated text markers.

```python
detector = AIismDetector('genericism_database.json')
results = detector.detect_ai_markers(text)
# Returns: {
#   'ai_ism_score': 0-100,
#   'risk_level': 'low'|'moderate'|'high'|'critical',
#   'high_frequency_phrases': [...],
#   'formulaic_structures': [...],
#   ...
# }
```

**Methods**:
- `detect_ai_markers(text)`: Full AI-ism detection
- `calculate_formulaic_index(text)`: Measures text formulaic nature
- `get_ai_explanation(score)`: Human-readable explanation

#### 2. l2_voice_preserver.py

Identifies and protects L2-authentic language patterns.

```python
preserver = L2VoicePreserver('genericism_database.json')
analysis = preserver.detect_l2_grammatical_structures(text)
loss = preserver.detect_voice_loss(original, edited)
```

**Methods**:
- `detect_l2_grammatical_structures(text)`: Finds L2 patterns
- `detect_voice_loss(original, edited)`: Compares voice between versions
- `_detect_cultural_metaphors(text)`: Identifies cultural references
- `_calculate_voice_strength(...)`: Scores L2 authenticity

#### 3. dual_text_comparator.py

Compares original and edited texts using difflib.

```python
comparator = DualTextComparator()
diff = comparator.compare_texts(original, edited)
# Returns detailed diff with visualizations
```

**Methods**:
- `compare_texts(original, edited)`: Full comparison
- `generate_html_diff(original, edited)`: HTML visualization
- `_word_level_diff(original, edited)`: Word-by-word tracking

#### 4. linguistic_identity_scorer.py

Calculates overall voice preservation score.

```python
scorer = LinguisticIdentityScorer('genericism_database.json')
score = scorer.calculate_voice_preservation_score(original, edited)
# Returns: {
#   'overall_score': 0-100,
#   'component_scores': {...},
#   'interpretation': 'text',
#   'risk_level': 'LOW - Voice Authentic' | ...
# }
```

**Component Scores**:
- Lexical Identity (20%): Word retention
- Structural Identity (20%): Sentence structure preservation
- Stylistic Identity (25%): Writing style consistency
- Voice Consistency (20%): Uniformity across document
- Authenticity Markers (15%): Unique personal/L2 elements

#### 5. audit_report_generator.py

Generates professional PDF reports.

```python
generator = AuditReportGenerator()
generator.generate_full_report(
    output_file,
    original_text,
    edited_text,
    aitism_results,
    voice_preservation,
    l2_voice_analysis,
    comparison_data
)
```

**Report Sections**:
1. Title Page with score
2. Executive Summary
3. AI-ism Analysis
4. Voice Preservation Analysis
5. Detailed Text Comparison
6. L2 Voice Preservation
7. Recommendations
8. Methodology

#### 6. app.py

Flask REST API server.

**Endpoints**:

```
GET /health
  - Check service status

POST /analyze/aitism
  - Detect AI-ism markers
  - Input: { text }
  - Output: AI-ism analysis

POST /analyze/l2-voice
  - Analyze L2 voice
  - Input: { original, edited }
  - Output: L2 analysis

POST /analyze/voice-preservation
  - Calculate voice preservation score
  - Input: { original, edited }
  - Output: Overall score + components

POST /analyze/compare
  - Compare texts
  - Input: { original, edited }
  - Output: Diff analysis

POST /analyze/full-audit
  - Complete analysis
  - Input: { original, edited }
  - Output: All analyses combined

POST /generate-report
  - Generate PDF
  - Input: { original, edited, ...results }
  - Output: PDF file download

GET /api/markers
  - Return AI markers database
```

## Data Flow

### 1. User Inputs Texts

```
User types/pastes texts in ColonizationAnalyzer.tsx
│
├─ originalText: student's draft
└─ editedText: AI-edited version
```

### 2. Trigger Analysis

```
Click "Analyze" button
│
└─ Call: POST /api/analyze/full-audit
   ├─ Body: { original: "...", edited: "..." }
   └─ Response: Complete analysis results
```

### 3. Backend Processing

```
app.py receives request
│
├─ AIismDetector.detect_ai_markers(original)
│  └─ Returns: AI-ism score and markers
│
├─ L2VoicePreserver.detect_l2_grammatical_structures(original)
│  ├─ L2VoicePreserver.detect_voice_loss(original, edited)
│  └─ Returns: L2 voice analysis
│
├─ LinguisticIdentityScorer.calculate_voice_preservation_score()
│  └─ Returns: Overall score + components
│
└─ DualTextComparator.compare_texts()
   └─ Returns: Detailed diff
```

### 4. Display Results

```
React component receives results
│
└─ Renders:
   ├─ Score circle with color coding
   ├─ Component progress bars
   ├─ AI-ism marker counts
   ├─ Text change statistics
   └─ Action buttons
```

### 5. Generate Report

```
User clicks "Generate PDF"
│
└─ Call: POST /api/generate-report
   ├─ Body: all analysis results
   ├─ Backend: AuditReportGenerator.generate_full_report()
   └─ Response: PDF file download
```

## API Request/Response Examples

### Full Audit Request

```bash
curl -X POST http://localhost:5000/analyze/full-audit \
  -H "Content-Type: application/json" \
  -d '{
    "original": "Climate change is very big...",
    "edited": "The escalating climate crisis..."
  }'
```

### Response Structure

```json
{
  "aitism_analysis": {
    "ai_ism_score": 62.5,
    "risk_level": "high",
    "high_frequency_phrases": [...],
    "explanation": "..."
  },
  "l2_voice_analysis": {
    "structure_analysis": {...},
    "voice_loss_analysis": {...}
  },
  "voice_preservation": {
    "overall_score": 45.3,
    "component_scores": {
      "lexical_identity": 52.1,
      "structural_identity": 48.5,
      ...
    },
    "interpretation": "...",
    "risk_level": "HIGH - Significant Colonization"
  },
  "text_comparison": {
    "summary": {...},
    "statistics": {...},
    "changes": {...}
  },
  "summary": {
    "overall_score": 45.3,
    "risk_level": "HIGH - Significant Colonization",
    "aitism_score": 62.5
  }
}
```

## Development Workflow

### Adding a New Analysis Feature

1. **Create backend module** in `backend/new_analyzer.py`
   ```python
   class NewAnalyzer:
       def __init__(self, db_path='genericism_database.json'):
           ...
       
       def analyze(self, text):
           # Your analysis
           return results
   ```

2. **Add Flask endpoint** in `backend/app.py`
   ```python
   @app.route('/analyze/new-feature', methods=['POST'])
   def analyze_new_feature():
       data = request.get_json()
       analyzer = NewAnalyzer()
       results = analyzer.analyze(data.get('text', ''))
       return jsonify(results)
   ```

3. **Create React component** in `src/components/NewFeature.tsx`
   ```tsx
   const [results, setResults] = useState(null);
   
   const handleAnalyze = async (text) => {
       const response = await fetch('/analyze/new-feature', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ text })
       });
       setResults(await response.json());
   };
   ```

4. **Integrate into ColonizationAnalyzer** or create new tab

5. **Test**:
   ```bash
   # Test endpoint directly
   curl -X POST http://localhost:5000/analyze/new-feature ...
   
   # Test in UI
   npm run dev
   ```

### Modifying Scoring Algorithms

The scoring weights are in the respective modules:

**linguistic_identity_scorer.py**:
```python
results['overall_score'] = round(
    (lexical_score * 0.20 +      # Adjust weights here
     structural_score * 0.20 +
     stylistic_score * 0.25 +
     voice_consistency * 0.20 +
     authenticity_markers * 0.15),
    2
)
```

**aitism_detector.py**:
```python
total_markers = (
    len(high_freq) * 2 +     # Adjust multipliers
    len(formulaic) * 1.5 +
    ...
)
```

## Testing

### Unit Testing Python

```bash
cd backend
python -m pytest tests/test_aitism_detector.py
python -m pytest tests/test_l2_voice_preserver.py
```

### Integration Testing

```bash
# Start backend
python app.py

# In another terminal, test endpoints
curl http://localhost:5000/health
curl -X POST http://localhost:5000/analyze/full-audit \
  -H "Content-Type: application/json" \
  -d '{"original":"test","edited":"test"}'
```

### Frontend Testing

```bash
npm run dev
# Navigate to AI Analyzer tab
# Enter sample texts
# Verify results display correctly
```

## Deployment

### Production Backend

```bash
# Install production dependencies
pip install gunicorn python-dotenv

# Create .env file
echo "FLASK_ENV=production" > backend/.env

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Production Frontend

```bash
npm run build
# Serve dist/ folder via your web server
# Ensure backend is accessible at same origin or configure CORS properly
```

### Docker Deployment

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_sm
COPY . .
CMD ["python", "app.py"]
```

## Performance Optimization

### Frontend
- Component memoization for large analysis results
- Lazy load PDF generation
- Debounce text input for real-time preview

### Backend
- Cache spaCy/NLTK models
- Use async tasks for PDF generation (Celery)
- Database indexing for generi database lookups

### Network
- Gzip compression for responses
- Minimize JSON payload sizes
- Consider streaming for large text analysis

## Troubleshooting

### Backend won't start

```bash
# Check Python version
python --version  # Should be 3.9+

# Verify dependencies
pip list | grep -E "flask|spacy|nltk"

# Test imports
python -c "from aitism_detector import AIismDetector"
```

### CORS errors

Ensure Vite proxy is configured in `vite.config.ts`:
```typescript
proxy: {
  '/api': { target: 'http://localhost:5000', ... },
  '/analyze': { target: 'http://localhost:5000', ... }
}
```

### spaCy model not found

```bash
python -m spacy download en_core_web_sm
```

### Frontend not connecting to backend

1. Check backend is running: `curl http://localhost:5000/health`
2. Check Vite proxy configuration
3. Check browser network tab for failed requests
4. Ensure ports aren't conflicting (3000 for frontend, 5000 for backend)

## Future Enhancements

- [ ] Multi-language support (Spanish, Arabic, Mandarin)
- [ ] Machine learning model for colonization prediction
- [ ] Real-time streaming analysis
- [ ] Integration with GitHub for essay version control
- [ ] Teacher dashboard for class-wide analysis
- [ ] Mobile app (React Native)

---

For questions or contributions, see [CONTRIBUTING.md](./CONTRIBUTING.md)
