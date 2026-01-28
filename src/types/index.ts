// Type definitions for the Writing Defense Platform

export interface BaselineMetadata {
  appVersion: string
  modelVersions: {
    spacy?: string
    sentenceTransformers?: string
    gpt2?: string
    hunspell?: string
  }
  extractionTimestamp: string
  extractionDurationMs: number
  processingEnvironment: string
  validationStatus: 'passed' | 'passed_with_warnings' | 'failed'
  validationChecks: {
    minimumWordCount: ValidationCheck
    sentenceSegmentation: ValidationCheck
    posTagging: ValidationCheck
    embeddingGeneration: ValidationCheck
    statisticalStability: ValidationCheck
  }
  warnings: string[]
  dataQualityScore: number
}

export interface ValidationCheck {
  required?: number
  actual: number
  result: 'passed' | 'passed_with_warnings' | 'failed'
}

export interface BaselineProfile {
  baselineMetadata: BaselineMetadata
  sessionId: string
  profileVersion: string
  createdDate: string
  calibrationSource: 'uploaded_essays' | 'session_samples' | 'manual_entry'
  
  sentenceLength: {
    mean: number
    sd: number
    q1: number
    q3: number
    normalRange: [number, number]
    burstinessBaseline: number
  }
  
  lexicalDiversity: {
    mattr: number
    normalRange: [number, number]
    hapaxLegomenaRatio: number
    vocabularyInventorySize: number
  }
  
  syntacticProfile: {
    avgDependencyDepth: number
    clauseTypeDistribution: {
      independent: number
      dependent: number
    }
    posTrigamFingerprint: string[]
    errorPatterns: string[]
  }
  
  rhetoricalVoice: {
    hedgingFrequency: number
    stanceMarkers: string[]
    metaphorDensity: number
    discourseMarkers: string[]
  }
  
  vocabularyProfile: {
    frequentRareWords: string[]
    avoidedWords: string[]
    academicRegisterAdoption: number
  }
  
  proficiencyEstimate: {
    cefrLevel: string
    reasoning: string
  }
  
  confidence: {
    overall: number
    reasonsForUncertainty: string[]
  }
}

export interface ShadowScore {
  gptZero: number
  turnitin: number
  originality: number
}

export interface StumbleEvent {
  timestamp: string
  pauseDurationMs: number
  precedingSentence: string
  analysisStatus: 'included_as_cognitive_effort' | 'excluded_from_stumble'
}

export interface KeystrokeEvent {
  type: 'keystroke' | 'paste' | 'stumble'
  timestamp: string
  data?: any
}

export interface SessionData {
  sessionId: string
  startTime: string
  endTime?: string
  wordCount: number
  sentenceCount: number
  baselineProfile?: BaselineProfile
  metrics: {
    humanityScore: number
    burstiness: number
    confidence: number
    shadowScores: ShadowScore
  }
  keystrokeEvents: KeystrokeEvent[]
  stumbles: StumbleEvent[]
  sources: SourceFile[]
}

export interface SourceFile {
  id: string
  name: string
  uploadedAt: string
  fileType: 'pdf' | 'docx' | 'txt'
  extractionMethod: 'text_layer' | 'ocr' | 'manual_entry'
  ocrResult?: {
    pagesProcessed: number
    pagesSuccessful: number
    pagesFailed: number
    averageConfidence: number
    warnings: string[]
  }
  content: string
  metadata: {
    pageCount?: number
    wordCount: number
    characterCount: number
  }
}

export interface ValidationReport {
  quarter: string
  validationDate: string
  sentencesTested: number
  userSessionsIncluded: number
  userConsentObtained: boolean
  
  correlationAnalysis: {
    shadowVsGptZero: CorrelationResult
    shadowVsTurnitin: CorrelationResult
    shadowVsOriginality: CorrelationResult
    shadowVsPredictability: CorrelationResult
  }
  
  errorRates: {
    falsePositiveRate: number
    falseNegativeRate: number
    accuracy: number
    f1Score: number
  }
  
  systematicBiases: SystematicBias[]
  actionItems: string[]
}

export interface CorrelationResult {
  r: number
  pValue: number
  result: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface SystematicBias {
  detector: string
  bias: string
  likelyCause: string
  action: string
}

export interface ExportFormat {
  format: 'csv' | 'json' | 'txt'
  data: SessionData
  metadata: {
    exportDate: string
    exportVersion: string
    compatibility: string[]
  }
}
