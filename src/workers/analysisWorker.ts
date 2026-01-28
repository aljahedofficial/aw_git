// Web Worker for background linguistic processing with Compromise.js
// This runs in a separate thread to avoid blocking the UI

import nlp from 'compromise'
import { analyzeLinguisticFeatures } from '../utils/linguisticAnalysis'

self.addEventListener('message', (event) => {
  const { type, data } = event.data

  try {
    switch (type) {
      case 'analyze-text':
        const analysis = analyzeLinguisticFeatures(data.text)
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

      case 'analyze-pos':
        const posAnalysis = analyzePOS(data.text)
        self.postMessage({ type: 'pos-analysis-complete', data: posAnalysis })
        break

      case 'detect-fatigue':
        const fatigueMetrics = detectFatigue(data.metrics, data.timeWindow)
        self.postMessage({ type: 'fatigue-detected', data: fatigueMetrics })
        break

      default:
        console.warn('Unknown message type:', type)
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: { message: error instanceof Error ? error.message : 'Unknown error' }
    })
  }
})

function analyzePOS(text: string) {
  const doc = nlp(text)
  
  return {
    nouns: doc.nouns().out('array'),
    verbs: doc.verbs().out('array'),
    adjectives: doc.adjectives().out('array'),
    adverbs: doc.adverbs().out('array'),
    entities: doc.people().out('array').concat(doc.places().out('array'))
  }
}

function calculateShadowScores(text: string) {
  // Use the full linguistic analysis
  const analysis = analyzeLinguisticFeatures(text)
  return analysis.shadowScores
}

function detectStumbles(intervals: number[]) {
  const stumbles = []
  const threshold = 2000 // 2 seconds

  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i] > threshold) {
      stumbles.push({
        index: i,
        duration: intervals[i],
        severity: intervals[i] > 5000 ? 'high' : intervals[i] > 3000 ? 'medium' : 'low'
      })
    }
  }

  return {
    stumbles,
    count: stumbles.length,
    averageDuration: stumbles.length > 0 
      ? stumbles.reduce((sum, s) => sum + s.duration, 0) / stumbles.length 
      : 0
  }
}

function detectFatigue(metrics: any[], timeWindow: number = 10) {
  // Analyze last N minutes of metrics to detect degradation
  if (metrics.length < 5) {
    return { fatigued: false, confidence: 0 }
  }

  const recent = metrics.slice(-timeWindow)
  const earlier = metrics.slice(Math.max(0, metrics.length - timeWindow * 2), -timeWindow)

  if (earlier.length === 0) {
    return { fatigued: false, confidence: 0 }
  }

  // Calculate trend in humanity score
  const recentAvg = recent.reduce((sum, m) => sum + m.humanityScore, 0) / recent.length
  const earlierAvg = earlier.reduce((sum, m) => sum + m.humanityScore, 0) / earlier.length

  const degradation = earlierAvg - recentAvg
  const fatigued = degradation > 10 // More than 10 point drop

  return {
    fatigued,
    degradation,
    confidence: Math.min(recent.length / 10, 1),
    recommendation: fatigued ? 'Consider taking a break to maintain writing quality' : null
  }
}

export {}
