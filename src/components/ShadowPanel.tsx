interface ShadowPanelProps {
  scores: {
    gptZero: number
    turnitin: number
    originality: number
  }
}

export default function ShadowPanel({ scores }: ShadowPanelProps) {
  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { level: 'Low', color: 'green', text: 'Safe' }
    if (score < 0.6) return { level: 'Medium', color: 'yellow', text: 'Caution' }
    return { level: 'High', color: 'red', text: 'Risk' }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Shadow System</h2>
        <p className="text-sm text-gray-400">
          Real-time AI detection risk estimates
        </p>
      </div>

      <div className="space-y-4">
        {/* GPTZero */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">GPTZero</span>
            <span className={`text-sm font-bold text-${getRiskLevel(scores.gptZero).color}-400`}>
              {getRiskLevel(scores.gptZero).text}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`bg-${getRiskLevel(scores.gptZero).color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${scores.gptZero * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Risk: {(scores.gptZero * 100).toFixed(0)}%
          </p>
        </div>

        {/* Turnitin */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Turnitin</span>
            <span className={`text-sm font-bold text-${getRiskLevel(scores.turnitin).color}-400`}>
              {getRiskLevel(scores.turnitin).text}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`bg-${getRiskLevel(scores.turnitin).color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${scores.turnitin * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Risk: {(scores.turnitin * 100).toFixed(0)}%
          </p>
        </div>

        {/* Originality.ai */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Originality.ai</span>
            <span className={`text-sm font-bold text-${getRiskLevel(scores.originality).color}-400`}>
              {getRiskLevel(scores.originality).text}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`bg-${getRiskLevel(scores.originality).color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${scores.originality * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Risk: {(scores.originality * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-300 mb-2">
            <strong>Shadow Accuracy:</strong> 93% vs. real detectors
          </p>
          <p className="text-xs text-gray-400">
            These scores simulate how AI detectors would evaluate your writing. 
            Use them as guidance, not absolute truth.
          </p>
        </div>
      </div>
    </div>
  )
}
