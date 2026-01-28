import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface BurstinessEKGProps {
  data: number[]
  stumbles: Array<{ time: number; duration: number }>
}

export default function BurstinessEKG({ data }: BurstinessEKGProps) {
  const chartData = data.slice(-50).map((interval, index) => ({
    index,
    interval: Math.min(interval, 1000), // Cap at 1 second for visualization
  }))

  const mean = data.reduce((a, b) => a + b, 0) / data.length
  const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length
  const burstiness = Math.sqrt(variance)

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Burstiness EKG</h3>
        <p className="text-sm text-gray-400">
          Real-time visualization of your typing rhythm
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Burstiness Score</span>
          <span className="text-2xl font-bold text-primary-400">
            {(burstiness / 100).toFixed(1)}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((burstiness / 500) * 100, 100)}%` }}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="index" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Line 
            type="monotone" 
            dataKey="interval" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-400">
        <p>
          Higher variance = more natural writing. AI typically has low variance (consistent timing).
        </p>
      </div>
    </div>
  )
}
