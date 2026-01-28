interface MetricsPanelProps {
  metrics: {
    humanityScore: number
    burstiness: number
    confidence: number
  }
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-4">Writing Metrics</h2>
      
      <div className="space-y-6">
        {/* Humanity Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Humanity Score</span>
            <span className="text-2xl font-bold text-green-400">
              {metrics.humanityScore}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${metrics.humanityScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Higher scores indicate more natural, human-like writing patterns
          </p>
        </div>

        {/* Burstiness */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Burstiness</span>
            <span className="text-2xl font-bold text-blue-400">
              {metrics.burstiness.toFixed(1)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.burstiness / 10) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Measures variation in sentence length. Higher = more natural rhythm
          </p>
        </div>

        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Baseline Confidence</span>
            <span className="text-2xl font-bold text-yellow-400">
              {(metrics.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${metrics.confidence * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            How confident we are in your baseline profile
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-3">
          <p className="text-sm text-blue-200">
            💡 Your metrics are within normal human range. Keep writing naturally!
          </p>
        </div>
      </div>
    </div>
  )
}
