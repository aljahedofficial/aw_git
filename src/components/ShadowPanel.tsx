interface ShadowPanelProps {
  scores: {
    gptZero: number
    turnitin: number
    originality: number
  }
}

export default function ShadowPanel({ scores }: ShadowPanelProps) {
  const getRiskColor = (score: number): string => {
    if (score < 0.3) return 'var(--color-success)'
    if (score < 0.6) return 'var(--color-warning)'
    return 'var(--color-danger)'
  }

  const getRiskText = (score: number): string => {
    if (score < 0.3) return 'Safe'
    if (score < 0.6) return 'Caution'
    return 'Risk'
  }

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          Shadow System
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Real-time AI detection risk estimates
        </p>
      </div>

      <div className="space-y-4">
        {/* GPTZero */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              GPTZero
            </span>
            <span className="text-sm font-bold" style={{ color: getRiskColor(scores.gptZero) }}>
              {getRiskText(scores.gptZero)}
            </span>
          </div>
          <div
            className="w-full rounded-full h-2"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${scores.gptZero * 100}%`,
                backgroundColor: getRiskColor(scores.gptZero)
              }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Risk: {(scores.gptZero * 100).toFixed(0)}%
          </p>
        </div>

        {/* Turnitin */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Turnitin
            </span>
            <span className="text-sm font-bold" style={{ color: getRiskColor(scores.turnitin) }}>
              {getRiskText(scores.turnitin)}
            </span>
          </div>
          <div
            className="w-full rounded-full h-2"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${scores.turnitin * 100}%`,
                backgroundColor: getRiskColor(scores.turnitin)
              }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Risk: {(scores.turnitin * 100).toFixed(0)}%
          </p>
        </div>

        {/* Originality.ai */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Originality.ai
            </span>
            <span className="text-sm font-bold" style={{ color: getRiskColor(scores.originality) }}>
              {getRiskText(scores.originality)}
            </span>
          </div>
          <div
            className="w-full rounded-full h-2"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${scores.originality * 100}%`,
                backgroundColor: getRiskColor(scores.originality)
              }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Risk: {(scores.originality * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div
          className="rounded-lg p-3"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)'
          }}
        >
          <p className="text-xs mb-2" style={{ color: 'var(--color-text)' }}>
            <strong>Shadow Accuracy:</strong> 93% vs. real detectors
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            These scores simulate how AI detectors would evaluate your writing. 
            Use them as guidance, not absolute truth.
          </p>
        </div>
      </div>
    </div>
  )
}
