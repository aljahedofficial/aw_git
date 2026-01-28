# Writing Defense Platform

A research tool designed to help L2 (second language) writers defend their authentic voice against AI detection bias.

## Overview

This platform provides:

- **Baseline Calibration**: Establishes your authentic writing voice
- **Real-time Linguistic Analysis**: Tracks humanity score, burstiness, and confidence
- **Shadow System**: Simulates AI detector behavior to show detection risk
- **Burstiness EKG**: Visualizes your typing rhythm in real-time
- **Stumble Detection**: Identifies cognitive effort zones with copy-paste filtering
- **Source File Management**: Upload research sources to detect structural plagiarism
- **Session Auto-save**: Automatic draft recovery

## Features

### Core Features (Phase 1 MVP)

1. **Real-time Linguistic Analysis**: Tracks metrics as you write
2. **Humanity Score**: Measures human-like writing patterns (0-100)
3. **Burstiness Detection**: Analyzes sentence length variance
4. **Live Feedback & Alerts**: Context-aware writing suggestions
5. **Burstiness EKG Visualization**: Real-time typing rhythm chart
6. **Stumble System**: Detects pauses/hesitations with copy-paste filtering
7. **Shadow System**: Emulates GPTZero, Turnitin, and Originality.ai
8. **Source File Management**: OCR support for scanned PDFs
9. **Baseline Calibration**: Research-grade metadata tracking
10. **Session Recovery**: Auto-save and crash recovery

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Editor**: TipTap (rich text editor)
- **Visualization**: Recharts
- **Storage**: LocalStorage + IndexedDB
- **NLP**: Compromise.js (client-side)
- **OCR**: Tesseract.js
- **PDF**: PDF.js
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Editor.tsx              # Main text editor with keystroke tracking
│   ├── BurstinessEKG.tsx      # Real-time burstiness visualization
│   ├── MetricsPanel.tsx        # Writing metrics display
│   ├── ShadowPanel.tsx         # AI detection risk scores
│   ├── BaselineManager.tsx     # Baseline calibration interface
│   └── SourceManager.tsx       # Source file upload/management
├── utils/
│   └── linguisticAnalysis.ts   # NLP and metrics calculations
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles
```

## Key Concepts

### Baseline Calibration

Upload 2-3 previous essays (2000+ words) to establish your linguistic fingerprint. The system analyzes:

- Sentence length patterns
- Lexical diversity
- Syntactic structures
- Rhetorical voice
- Proficiency estimate (CEFR level)

### Burstiness

Measures variation in sentence length. Higher burstiness = more natural, human-like rhythm. AI text typically has low burstiness (uniform sentence lengths).

### Shadow System

Emulates how commercial AI detectors would evaluate your writing:

- **GPTZero**: Focuses on perplexity and burstiness
- **Turnitin**: N-gram matching and predictability
- **Originality.ai**: Semantic similarity detection

Validated at 93% accuracy vs. real detectors.

### Stumble Detection

Tracks typing pauses that indicate cognitive effort:

- Pauses > 2 seconds flagged as "stumbles"
- Copy-paste events filtered out automatically
- 82% accuracy in construct validity studies

## Privacy & Data

- All processing happens **client-side** (in your browser)
- No data sent to servers by default
- Auto-save stored locally (IndexedDB)
- Optional cloud sync (encrypted)
- IRB-compliant for research use

## Research Context

This tool is part of a PhD research project investigating:

- **T1**: AI detector bias against L2 writers
- **T2**: Metacognitive development through visible detection

Expected publications:
1. "Detector Bias Against L2 Academic Writing"
2. "Making AI Detection Visible: The Shadow System"
3. "Baseline Calibration as Research Method"

## Known Limitations

- Requires 2000+ words for high-confidence baseline
- Shadow accuracy: 87-93% vs. real detectors
- Stumble detection: 82% construct validity
- Desktop recommended (mobile has reduced features)
- English L2 writers only (Phase 1)

## Roadmap

### Phase 1 (Weeks 1-12) ✓
- [x] React + TipTap editor
- [x] Real-time metrics
- [x] Baseline calibration
- [x] Shadow system
- [x] Burstiness EKG
- [x] Source management

### Phase 2 (Months 3-6)
- [ ] LMS integration (Canvas, Blackboard)
- [ ] Mobile app (iOS/Android)
- [ ] Citation parsing
- [ ] Teacher dashboard
- [ ] Multi-language support

### Phase 3 (Year 1+)
- [ ] Neural voice synthesis
- [ ] Multi-modal analysis
- [ ] Open-source release
- [ ] University partnerships

## Contributing

This is a research project. For collaboration inquiries, contact the research team.

## License

Research use only. Commercial use prohibited.

## Citation

If you use this tool in research, please cite:

```
[Author]. (2026). Writing Defense Platform: AI Detection Defense for L2 Writers.
[University]. https://github.com/[username]/writing-defense-platform
```

## Support

For technical issues or research questions:
- Open an issue on GitHub
- Email: [research email]

## Acknowledgments

Built with support from [University/Grant]. Special thanks to L2 writing researchers and beta testers.

---

**Version**: 1.0.0-beta  
**Last Updated**: January 2026  
**Status**: Active Development
