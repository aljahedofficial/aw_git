# User Guide - Writing Defense Platform

## Table of Contents

1. [Getting Started](#getting-started)
2. [Baseline Calibration](#baseline-calibration)
3. [Using the Editor](#using-the-editor)
4. [Understanding Metrics](#understanding-metrics)
5. [Shadow System](#shadow-system)
6. [Source Management](#source-management)
7. [Privacy & Data](#privacy--data)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### First Time Setup

1. **Open the Application**: Navigate to the web app in your browser
2. **Choose Your Path**:
   - Quick Start: Skip tutorial and start writing
   - Guided Tour: 5-minute interactive tutorial

### Creating Your Baseline

Your baseline is your linguistic fingerprint. It helps the system distinguish your authentic voice from AI-generated text.

**Requirements:**
- 2-3 essays or writing samples
- Total 2000+ words
- Written by you (not edited by others)
- Representative of your current writing level

## Baseline Calibration

### Step 1: Upload Writing Samples

1. Click the **Baseline** tab
2. Click **Upload** or drag files into the upload area
3. Supported formats: TXT, DOC, DOCX, PDF
4. Wait for processing (30-60 seconds)

### Step 2: Review Your Profile

After processing, you'll see:

- **Words Analyzed**: Total word count from your samples
- **Confidence Score**: How reliable your baseline is (aim for 85%+)
- **Average Sentence Length**: Your typical sentence structure
- **CEFR Level**: Estimated proficiency (A1-C2)
- **Lexical Diversity**: Vocabulary richness

### Step 3: Interpret Confidence

| Confidence | Meaning | Action |
|-----------|---------|--------|
| < 60% | Low confidence | Upload more samples (need 2000+ words) |
| 60-80% | Moderate | Usable, but consider adding samples |
| 80-95% | Good | Reliable baseline |
| 95%+ | Excellent | Highly reliable baseline |

### Recalibrating Your Baseline

Your writing evolves. Recalibrate:
- Every 10 writing sessions
- When you notice significant growth
- After intensive language learning
- When switching writing domains (emails → essays)

**To Recalibrate:**
1. Go to Baseline tab
2. Click **Recalibrate Baseline**
3. Upload new samples
4. System creates new version (keeps history)

## Using the Editor

### Basic Writing

1. Click **Editor** tab
2. Start typing in the text area
3. Metrics update automatically every few seconds
4. Review real-time feedback in the right panel

### Editor Features

- **Word Count**: Displayed at top (updates live)
- **Undo/Redo**: Quick access buttons
- **Auto-save**: Every 30 seconds (no manual save needed)
- **Crash Recovery**: Restores last auto-save on reload

### Keyboard Shortcuts

- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo
- `Ctrl/Cmd + S`: Manual save (triggers auto-save)

## Understanding Metrics

### Humanity Score (0-100)

**What it measures:** How human-like your writing appears

**Scoring:**
- 0-40: Very robotic, likely AI-flagged
- 40-60: Borderline, some AI characteristics
- 60-80: Natural writing, low AI risk
- 80-100: Highly human, very natural

**Factors:**
- Lexical diversity (vocabulary richness)
- Sentence length variation
- Grammar complexity
- Rhetorical patterns

### Burstiness (0-10+)

**What it measures:** Variation in sentence length

**Scoring:**
- 0-2: Very uniform (AI-like)
- 2-5: Some variation (developing writers)
- 5-8: Good variation (natural writing)
- 8+: High variation (advanced writing)

**Why it matters:**
- AI text has consistent sentence lengths (low burstiness)
- Human writing has natural rhythm (high burstiness)
- Detectors use burstiness as a primary signal

### Baseline Confidence (0-100%)

**What it measures:** How reliable your baseline profile is

**Factors:**
- Sample size (word count)
- Sample diversity (multiple texts)
- Statistical stability
- Data quality

**Improving confidence:**
- Upload more samples
- Use diverse writing samples
- Write more sessions (system learns over time)

## Shadow System

### What is the Shadow?

The Shadow simulates how AI detectors would evaluate your writing in real-time.

**Three Detectors:**

1. **GPTZero**: Focuses on perplexity and burstiness
2. **Turnitin**: N-gram matching and predictability
3. **Originality.ai**: Semantic similarity detection

### Risk Levels

| Risk | Color | Score | Meaning |
|------|-------|-------|---------|
| Low | Green | 0-30% | Safe - unlikely to be flagged |
| Medium | Yellow | 30-60% | Caution - could be flagged |
| High | Red | 60-100% | Risk - likely to be flagged |

### Using Shadow Scores

**Strategy 1: Write First, Check Later**
- Disable live alerts
- Write naturally
- Review Shadow at end
- Revise only if needed

**Strategy 2: Real-time Monitoring**
- Keep Shadow visible
- Adjust writing if scores spike
- Balance authenticity vs. safety

### Shadow Accuracy

- **Validated**: 93% accuracy vs. real detectors
- **Quarterly validation**: Published reports
- **Limitations**: Approximation, not perfect replication

## Source Management

### Uploading Sources

1. Click **Sources** tab
2. Click **Upload** or drag files
3. Supported: PDF, DOC, DOCX, TXT
4. Max 50MB per file

### Scanned PDFs (OCR)

If you upload a scanned PDF:

1. System detects low text density
2. Prompts you to enable OCR
3. OCR processes images → text
4. Processing time: ~2 min per 50 pages

**OCR Privacy:**
- All processing happens locally (your browser)
- No images sent to servers
- Text extracted on-device

**OCR Quality:**
- Typed text: 85-95% accuracy
- Handwritten: Lower accuracy
- Faded/poor quality: May fail

**Alternative to OCR:**
- Manually copy-paste text from PDF
- Takes longer but 100% accurate

### Plagiarism Detection

Once sources uploaded:

1. System compares your writing to sources
2. Flags sentences too similar to sources
3. Warns about structural plagiarism
4. Suggests rephrasing

**Similarity Thresholds:**
- < 30%: Independent synthesis ✓
- 30-60%: Some similarity ⚠️
- > 60%: Too close to source ❌

## Privacy & Data

### Local-First Architecture

- All data stored on your device (IndexedDB)
- No server uploads by default
- Processing happens in your browser
- You control all data

### What Gets Stored

**Locally (always):**
- Your writing drafts
- Baseline profile
- Source files
- Session metrics
- Keystroke data

**Server (opt-in only):**
- Anonymized metrics (if you consent to research)
- No personally identifiable information
- Encrypted in transit and at rest

### Data Deletion

**To delete specific sessions:**
1. Settings → Data Management
2. Select sessions to delete
3. Confirm deletion

**To delete everything:**
1. Settings → Privacy
2. "Delete All My Data"
3. Confirm (irreversible)

**Browser data:**
- Clearing browser data also clears app data
- Use app's export before clearing browser

### Research Consent

You control whether your data is used for research:

- **Opt-in during setup**: Choose to participate
- **Fully optional**: App works regardless
- **Revocable anytime**: Withdraw consent later
- **Anonymized**: No personal info shared

## Troubleshooting

### Shadow Not Updating

**Symptoms:** Scores frozen, not changing

**Solutions:**
1. Refresh page (Ctrl+R)
2. Clear browser cache
3. Disable privacy extensions temporarily
4. Check browser console for errors

### Large PDF Won't Upload

**Symptoms:** Upload fails, "file too large" error

**Solutions:**
1. Compress PDF (use online tools)
2. Split into chapters, upload separately
3. Use OCR + manual copy-paste instead

### Baseline Seems Wrong

**Symptoms:** Low confidence, odd metrics

**Solutions:**
1. Check sample size (need 2000+ words)
2. Ensure samples are your writing (not edited by others)
3. Upload more recent samples
4. Recalibrate baseline

### Alerts Too Frequent

**Symptoms:** Constant warnings, distracting

**Solutions:**
1. Adjust sensitivity: Settings → Alerts → Lower sensitivity
2. Enable "Suppress during flow" mode
3. Disable specific alert types
4. Remember: Alerts are guidance, not rules

### Is My Data Private?

**Check:**
1. Settings → Privacy → Data Storage
2. Verify: "Local storage only" (default)
3. Cloud sync: Off (unless you enabled it)

**Confirm:**
- No uploads to servers
- Processing happens locally
- Data stays on your device

## Tips for Best Results

### For High Humanity Scores

1. **Vary sentence length**: Mix short and long sentences
2. **Use diverse vocabulary**: Avoid repetition
3. **Write naturally**: Don't overthink
4. **Take breaks**: Fatigue reduces variation

### For Low Shadow Scores

1. **Increase burstiness**: Vary sentence structure
2. **Reduce predictability**: Choose less common words
3. **Add personal voice**: Inject opinions, examples
4. **Avoid over-polishing**: Too perfect = suspicious

### For Effective Learning

1. **Review metrics after writing**: Don't obsess during
2. **Track trends over time**: Export session data
3. **Experiment consciously**: Try different styles
4. **Reflect on feedback**: Why did Shadow flag this?

## Getting Help

### In-App Help

- Click **?** icon in top right
- Access this guide anytime
- Tooltips on hover

### Technical Support

- **Email**: support@writingdefense.edu
- **GitHub**: Report bugs/request features
- **FAQ**: Common questions answered

### Research Questions

- **Contact**: research@writingdefense.edu
- **IRB**: Ethics questions
- **Publications**: Request data/methods

---

**Last Updated**: January 2026  
**Version**: 1.0.0-beta  
**For**: Phase 1 MVP
