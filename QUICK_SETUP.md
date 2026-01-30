# Quick Setup Guide - Linguistic Homogenization Analyzer

## What's New?

Your Writing Defense Platform now includes powerful AI-ism detection and L2 voice preservation analysis. These features help you understand and protect your authentic voice when using AI editing tools.

## One-Time Setup (2 minutes)

### 1. Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Run setup script
chmod +x setup.sh
./setup.sh

# This will:
# - Create a Python virtual environment
# - Install all required packages
# - Download language models
```

**or manually:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 -m spacy download en_core_web_sm
```

## Running the Application

### Terminal 1: Start the Backend

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

### Terminal 2: Start the Frontend

```bash
# In project root
npm install  # If you haven't already
npm run dev
```

**Expected output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### 3. Open in Browser

Navigate to `http://localhost:3000` and click the **"AI Analyzer"** tab.

## Using the Analyzer

### Step 1: Paste Original Draft
Enter your essay/writing before any AI editing.

### Step 2: Paste AI-Edited Version
Enter the version after using ChatGPT, Grammarly, etc.

### Step 3: Click Analyze
Wait 1-3 seconds for results.

### Step 4: Review Results
- **Voice Preservation Score**: How much of your authentic voice remains (0-100)
- **Component Breakdown**: 5 factors affecting your score
- **AI-ism Markers**: Generic phrases the AI added
- **Text Changes**: What was added/removed/modified

### Step 5: Generate Report (Optional)
Click "📄 Generate PDF Report" for a professional audit document.

## Troubleshooting

### "Connection refused" error
- Make sure backend is running on Terminal 1
- Check that you see "Running on http://127.0.0.1:5000"

### "ModuleNotFoundError: No module named 'flask'"
- Make sure you activated the virtual environment
- Run: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)

### Port already in use
```bash
# If port 5000 is taken, edit backend/app.py:
# Change: app.run(host='0.0.0.0', port=5000)
# To: app.run(host='0.0.0.0', port=5001)
```

### Text analyzer not loading
- Refresh the page (Ctrl+R or Cmd+R)
- Check browser console for errors (F12 -> Console tab)
- Verify backend is running

## What Each Score Means

### Voice Preservation Score (Main Score)

| Score | Your Voice | What to Do |
|-------|-----------|-----------|
| 80-100 | ✓ Strong | Great! Your voice is well-preserved |
| 60-79 | ○ Moderate | Some AI changes, but you're still you |
| 40-59 | ⚠ Weak | Significant AI rewriting occurred |
| 20-39 | ⚠⚠ Very Weak | Heavy AI intervention, barely your voice |
| 0-19 | ✗ Lost | Text is mostly AI-generated |

### Component Breakdown

1. **Lexical Identity** - Are your word choices preserved?
2. **Structural Identity** - Are your sentence patterns kept?
3. **Stylistic Identity** - Is your personal style maintained?
4. **Voice Consistency** - Is your voice the same throughout?
5. **Authenticity Markers** - Are unique personal/L2 elements preserved?

## Features Overview

### AI-ism Detection
Identifies 100+ AI markers:
- High-frequency phrases ("In the ever-evolving landscape")
- Generic academic clichés
- Transition word overuse
- Formulaic sentence starters

### L2 Voice Preservation
Protects valuable L2 features:
- Authentic grammatical structures
- Cultural metaphors and references
- L1 transfer patterns (your authentic voice!)
- Personal expressions

### Text Comparison
Shows exactly what changed:
- Words added by AI
- Original words removed
- Modified sections
- Readability changes

### PDF Reports
Professional audit documents including:
- Your scores and risk level
- Component breakdown
- Detailed analysis
- Specific recommendations
- Methodology explanation

## Tips for Best Results

✓ **Use longer text samples** (150+ words for best analysis)
✓ **Use truly original vs edited versions** (don't copy-paste the same text twice)
✓ **Review the component scores** (understand which aspects changed)
✓ **Read the interpretation** (explains what your score means)
✓ **Generate reports for documentation** (shows you understand voice preservation)

## File Locations

```
project/
├── src/
│   └── components/
│       ├── HomogenizationAnalyzer.tsx   ← Main analyzer component
│       └── HomogenizationAnalyzer.css
├── backend/
│   ├── app.py                          ← Start here: python app.py
│   ├── aitism_detector.py
│   ├── l2_voice_preserver.py
│   ├── dual_text_comparator.py
│   ├── linguistic_identity_scorer.py
│   ├── audit_report_generator.py
│   ├── genericism_database.json
│   └── requirements.txt
└── docs/
    ├── HOMOGENIZATION_GUIDE.md           ← User guide
    ├── INTEGRATION_GUIDE.md            ← Developer guide
    └── QUICK_SETUP.md                  ← This file
```

## Learning More

- **User Guide**: See [HOMOGENIZATION_GUIDE.md](./HOMOGENIZATION_GUIDE.md)
- **Developer Info**: See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Backend Details**: See [backend/README.md](../backend/README.md)

## Key Concepts

### Linguistic Homogenization
When AI editing replaces your authentic voice with generic standardized language. This analyzer helps you detect and prevent it.

### L2 Voice
Your authentic second-language expression, including L1-influenced patterns. This is VALUABLE, not an error!

### Voice Preservation Score
A metric (0-100) showing how much of your original linguistic identity survives AI editing.

### Genericism Database
The reference lexicon of 100+ common AI markers and generic academic phrases.

## Questions?

Check the [User Guide](./HOMOGENIZATION_GUIDE.md) FAQ section or review the [Integration Guide](./INTEGRATION_GUIDE.md) for technical questions.

---

**You're all set!** 🎉

Start the backend and frontend, go to the AI Analyzer tab, and analyze your writing!
