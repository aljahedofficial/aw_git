import { AlertTriangle, TrendingDown, Zap } from 'lucide-react'

interface MetricsPanelProps {
  metrics: {
    humanityScore: number
    burstiness: number
    confidence: number
    aiPatternScore?: number
    shadowScores?: {
      gptZero: number
      turnitin: number
      originality: number
    }
    warnings?: string[]
    similarityRisk?: number
  }
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const getHumanityColor = (score: number) => {
    if (score >= 75) return 'var(--color-success)'
    if (score >= 50) return 'var(--color-warning)'
    return 'var(--color-danger)'
  }

  const getAiRiskColor = (score: number) => {
    if (score <= 0.4) return 'var(--color-success)'
    if (score <= 0.65) return 'var(--color-warning)'
    return 'var(--color-danger)'
  }

  const humanityColor = getHumanityColor(metrics.humanityScore)
  const aiRiskColor = getAiRiskColor(metrics.aiPatternScore || 0.5)

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)'
      }}
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        Writing Metrics
      </h2>
      
      <div className="space-y-6">
        {/* Humanity Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Humanity Score
            </span>
            <span className="text-2xl font-bold" style={{ color: humanityColor }}>
              {metrics.humanityScore}%
            </span>
          </div>
          <div
            className="w-full rounded-full h-3"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${metrics.humanityScore}%`,
                backgroundColor: humanityColor
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            Higher scores = more natural, human-like writing patterns
          </p>
        </div>

        {/* AI Pattern Risk */}
        {metrics.aiPatternScore !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: aiRiskColor }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  AI Pattern Risk
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: aiRiskColor }}>
                {(metrics.aiPatternScore * 100).toFixed(0)}%
              </span>
            </div>
            <div
              className="w-full rounded-full h-3"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${metrics.aiPatternScore * 100}%`,
                  backgroundColor: aiRiskColor
                }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              Detects common AI writing patterns (transitions, passive voice, formality)
            </p>
          </div>
        )}

        {/* Burstiness */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Burstiness
            </span>
            <span className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>
              {metrics.burstiness.toFixed(1)}
            </span>
          </div>
          <div
            className="w-full rounded-full h-3"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((metrics.burstiness / 10) * 100, 100)}%`,
                backgroundColor: 'var(--color-info)'
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            Sentence length variation. Higher = more natural rhythm
          </p>
        </div>

        {/* Similarity Risk */}
        {metrics.similarityRisk !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Source Similarity
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>
                {(metrics.similarityRisk * 100).toFixed(0)}%
              </span>
            </div>
            <div
              className="w-full rounded-full h-3"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${metrics.similarityRisk * 100}%`,
                  backgroundColor: 'var(--color-warning)'
                }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              How similar your writing is to source material
            </p>
          </div>
        )}

        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Baseline Confidence
            </span>
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {(metrics.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className="w-full rounded-full h-3"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${metrics.confidence * 100}%`,
                backgroundColor: 'var(--color-primary)'
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            Confidence in your baseline profile
          </p>
        </div>
      </div>

      {/* Warnings */}
      {metrics.warnings && metrics.warnings.length > 0 && (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="space-y-2">
            {metrics.warnings.map((warning, idx) => (
              <div
                key={idx}
                className="rounded-lg p-3 flex gap-2"
                style={{
                  backgroundColor: 'var(--color-warning)',
                  color: 'var(--color-text)',
                  opacity: 0.15
                }}
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-warning)' }} />
                <p className="text-xs" style={{ color: 'var(--color-text)' }}>
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Message */}
      {!metrics.warnings || metrics.warnings.length === 0 && (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: 'var(--color-success)',
              color: 'var(--color-text)',
              opacity: 0.15
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              ✓ Your writing appears authentic and natural!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
