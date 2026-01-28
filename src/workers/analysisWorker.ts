// Web Worker for background linguistic processing
// This runs in a separate thread to avoid blocking the UI

self.addEventListener('message', (event) => {
  const { type, data } = event.data

  switch (type) {
    case 'analyze-text':
      const analysis = performAnalysis(data.text)
      self.postMessage({ type: 'analysis-complete', data: analysis })
      break

    case 'calculate-shadow-scores':
      const shadowScores = calculateShadowScores(data.text)
      self.postMessage({ type: 'shadow-scores-complete', data: shadowScores })
      break

    case 'detect-stumbles':
      const stumbles = detectStumbles(data.keystrokeIntervals)
      self.postMessage({ type: 'stumbles-detected', data: stumbles })
      break

    default:
      console.warn('Unknown message type:', type)
  }
})

function performAnalysis(text: string) {
  // Simulate complex NLP processing
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = text.toLowerCase().split(/\s+/)
  
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length)
  const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length
  const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / sentenceLengths.length
  const burstiness = Math.sqrt(variance)

  const uniqueWords = new Set(words)
  const lexicalDiversity = uniqueWords.size / words.length

  return {
    sentenceCount: sentences.length,
    wordCount: words.length,
    burstiness,
    lexicalDiversity,
    meanSentenceLength: mean
  }
}

function calculateShadowScores(text: string) {
  // Simulate ML model inference for detector emulation
  const analysis = performAnalysis(text)
  
  const predictability = 1 - (analysis.lexicalDiversity * 0.5 + (analysis.burstiness / 10) * 0.5)
  
  return {
    gptZero: Math.max(0.1, Math.min(0.9, predictability)),
    turnitin: Math.max(0.1, Math.min(0.9, predictability * 1.1)),
    originality: Math.max(0.1, Math.min(0.9, predictability * 0.9))
  }
}

function detectStumbles(intervals: number[]) {
  const stumbles = []
  const threshold = 2000 // 2 seconds

  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i] > threshold) {
      stumbles.push({
        index: i,
        duration: intervals[i],
        timestamp: Date.now()
      })
    }
  }

  return stumbles
}

export {}
