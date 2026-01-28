# Technical Architecture - Writing Defense Platform

## System Overview

The Writing Defense Platform is a client-side web application built with modern web technologies, emphasizing privacy, performance, and real-time analysis.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (UI)                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  Editor  │  │ Metrics  │  │  Shadow  │           │  │
│  │  │Component │  │  Panel   │  │  Panel   │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Web Workers (Background Processing)          │  │
│  │  ┌──────────────┐  ┌──────────────┐                 │  │
│  │  │ NLP Analysis │  │ Shadow Model │                 │  │
│  │  │   Worker     │  │   Worker     │                 │  │
│  │  └──────────────┘  └──────────────┘                 │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Local Storage (IndexedDB)                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │ Sessions │  │ Baseline │  │  Sources │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Framework
- **React 18**: UI component library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling

### Editor
- **TipTap**: Extensible rich text editor (based on ProseMirror)
- **Extensions**: Character count, placeholder, history

### Data Visualization
- **Recharts**: React charting library
- **Lucide React**: Icon library

### NLP Processing
- **Compromise.js**: Client-side NLP (tokenization, POS tagging)
- **Custom algorithms**: Burstiness, lexical diversity, shadow scores

### File Processing
- **PDF.js**: PDF parsing and text extraction
- **Tesseract.js**: OCR for scanned documents
- **Custom parsers**: DOCX, TXT processing

### Storage
- **LocalForage**: IndexedDB abstraction
- **LocalStorage**: Session persistence
- **Web Workers**: Background processing

## Core Components

### 1. Editor Component

**Purpose**: Main text input with real-time keystroke tracking

**Features**:
- Rich text editing (bold, italic, lists)
- Character and word count
- Undo/redo history
- Auto-save every 30s
- Keystroke interval tracking
- Copy-paste detection

**State Management**:
```typescript
interface EditorState {
  content: string
  wordCount: number
  charCount: number
  keystrokeData: number[]
  stumbles: StumbleEvent[]
  lastSaveTime: Date
}
```

**Key Events**:
- `onUpdate`: Text changed → trigger analysis
- `onKeyDown`: Track keystroke timing
- `onPaste`: Detect copy-paste events
- `onBlur`: Trigger save

### 2. Metrics Panel

**Purpose**: Display real-time writing metrics

**Metrics**:
- Humanity Score (0-100)
- Burstiness (0-10+)
- Baseline Confidence (0-100%)

**Update Frequency**: Debounced (500ms after typing stops)

**Calculation**:
- Sent to Web Worker for processing
- Async computation (non-blocking)
- Results cached for performance

### 3. Shadow Panel

**Purpose**: Simulate AI detector behavior

**Detectors Emulated**:
- GPTZero: Perplexity + burstiness
- Turnitin: N-gram + predictability
- Originality.ai: Semantic similarity

**Algorithms**:
```typescript
// Simplified detector emulation
function calculateShadowScore(text: string): number {
  const burstiness = calculateBurstiness(text)
  const lexicalDiversity = calculateLexicalDiversity(text)
  const predictability = 1 - (burstiness * 0.5 + lexicalDiversity * 0.5)
  return predictability
}
```

**Validation**: Quarterly correlation studies (target: r > 0.85)

### 4. Baseline Manager

**Purpose**: Create and manage user linguistic profile

**Process**:
1. User uploads 2-3 essays (2000+ words)
2. System extracts text (PDF.js, DOCX parser)
3. Analyzes linguistic features
4. Creates baseline profile
5. Stores locally with metadata

**Profile Structure**:
```typescript
interface BaselineProfile {
  sentenceLength: { mean, sd, normalRange }
  lexicalDiversity: { mattr, vocabularySize }
  syntacticProfile: { dependencyDepth, clauseTypes }
  proficiencyEstimate: { cefrLevel, reasoning }
  confidence: { overall, uncertainties }
  metadata: { version, timestamp, validation }
}
```

### 5. Source Manager

**Purpose**: Upload and manage research sources

**Features**:
- Multi-file upload
- PDF text extraction
- OCR for scanned PDFs
- Preview pane
- Similarity detection

**OCR Workflow**:
```typescript
async function processScannedPDF(file: File) {
  // 1. Detect text layer density
  const textDensity = await checkTextLayer(file)
  
  if (textDensity < 50) { // chars/page
    // 2. Offer OCR
    const userConsent = await promptOCR()
    
    if (userConsent) {
      // 3. Extract images and run Tesseract
      const images = await extractImages(file)
      const text = await runOCR(images)
      return text
    }
  }
  
  return await extractTextLayer(file)
}
```

### 6. Burstiness EKG

**Purpose**: Real-time visualization of typing rhythm

**Visualization**:
- Line chart of keystroke intervals
- Rolling window (last 50 keystrokes)
- Highlights stumbles (pauses > 2s)

**Interpretation**:
- Flat line = consistent timing (AI-like)
- Spiky pattern = variable timing (human-like)

## Data Flow

### Write Cycle

```
User types → Editor captures keystroke
           ↓
         Debounce (500ms)
           ↓
    Send to Analysis Worker
           ↓
    Calculate metrics (async)
           ↓
    Return results to UI
           ↓
    Update Metrics Panel + Shadow
           ↓
    Auto-save to IndexedDB (every 30s)
```

### Analysis Pipeline

```
Text input
  ↓
Sentence segmentation (Compromise.js)
  ↓
Tokenization + POS tagging
  ↓
Calculate features:
  - Sentence lengths
  - Lexical diversity
  - Burstiness
  - Predictability
  ↓
Compare to baseline
  ↓
Generate Shadow scores
  ↓
Return analysis object
```

## Performance Optimizations

### 1. Web Workers

**Problem**: Heavy NLP computation blocks UI

**Solution**: Offload to Web Workers
- Separate thread for analysis
- Non-blocking UI updates
- Parallel processing

**Implementation**:
```typescript
// Main thread
const worker = new Worker('analysisWorker.ts')
worker.postMessage({ type: 'analyze-text', data: text })
worker.onmessage = (e) => updateMetrics(e.data)

// Worker thread
self.onmessage = (e) => {
  const analysis = performNLP(e.data.text)
  self.postMessage(analysis)
}
```

### 2. Debouncing

**Problem**: Typing triggers constant re-analysis

**Solution**: Debounce updates (500ms)
- Wait until typing pauses
- Batch multiple keystrokes
- Reduce computation load

### 3. Caching

**Problem**: Re-analyzing same text wastes cycles

**Solution**: Cache analysis results
- Key: Text content hash
- Value: Analysis object
- Invalidate on text change

### 4. Lazy Loading

**Problem**: Large libraries bloat initial load

**Solution**: Code splitting
- Load Tesseract.js only when OCR needed
- Load PDF.js only when PDF uploaded
- Dynamic imports

```typescript
// Lazy load OCR
const runOCR = async (image) => {
  const Tesseract = await import('tesseract.js')
  return await Tesseract.recognize(image)
}
```

## Storage Architecture

### IndexedDB Schema

**Database**: `WritingDefense`

**Object Stores**:

1. **sessions**: Writing sessions
   - Key: `sessionId` (string)
   - Value: `SessionData` object
   - Indexes: `timestamp`, `wordCount`

2. **baselines**: User profiles
   - Key: `userId` (string)
   - Value: `BaselineProfile` object
   - Indexes: `createdDate`, `confidence`

3. **sources**: Uploaded files
   - Key: `sourceId` (string)
   - Value: `SourceFile` object
   - Indexes: `uploadedAt`, `fileType`

### Data Retention

- **Drafts**: 24 hours (auto-delete old drafts)
- **Sessions**: Indefinite (user can delete)
- **Baseline**: Until user recalibrates or deletes
- **Sources**: Until user deletes

### Export Formats

**CSV**:
```csv
timestamp,sentence,burstiness,humanity_score,shadow_gpt_zero
2026-01-28T14:32:15Z,"The research indicates...",6.2,75,0.35
```

**JSON**:
```json
{
  "version": "1.0.0",
  "sessionId": "...",
  "data": { ... }
}
```

**Plain Text**:
```
Writing Defense Session Export
Date: 2026-01-28
Word Count: 1,234
Humanity Score: 75%
...
```

## Security & Privacy

### Client-Side Only

- No backend servers (Phase 1)
- All processing in browser
- No data leaves device

### Data Encryption

- IndexedDB encrypted by browser
- LocalStorage encrypted by browser
- Export files: User-initiated only

### Consent Management

- Opt-in for research data
- Clear consent prompts
- Revocable anytime

## Testing Strategy

### Unit Tests

- Component rendering
- Utility functions (burstiness, lexical diversity)
- Storage operations

### Integration Tests

- Editor → Analysis → Metrics flow
- File upload → Processing → Storage
- Baseline creation → Application

### End-to-End Tests

- Full writing session
- Export/import cycle
- Crash recovery

## Deployment

### Build Process

```bash
npm run build
# Output: dist/
```

### Hosting Options

- **Static hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, Cloudflare
- **Self-hosted**: Nginx, Apache

### Environment Variables

```env
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_OCR_WORKER_PATH=/workers/ocr-worker.js
```

## Monitoring & Analytics

### Client-Side Logging

- Console errors captured
- Performance metrics tracked
- User actions logged (anonymized)

### Error Reporting

- Error boundaries in React
- Worker error handling
- Storage failure fallbacks

## Future Architecture (Phase 2)

### Cloud Sync

- Optional backend for multi-device
- End-to-end encryption
- Sync protocol (conflict resolution)

### Real-Time Collaboration

- WebRTC peer-to-peer
- Operational Transform for concurrent editing
- Shared sessions

### Mobile Apps

- React Native for iOS/Android
- Shared core logic
- Platform-specific UI

---

**Version**: 1.0.0-beta  
**Last Updated**: January 2026  
**Status**: Active Development
