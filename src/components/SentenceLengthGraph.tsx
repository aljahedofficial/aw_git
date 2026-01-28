import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface SentenceLengthGraphProps {
  burstiness: number
  sentenceLengths?: number[]
}

export default function SentenceLengthGraph({ burstiness, sentenceLengths = [] }: SentenceLengthGraphProps) {
  // Generate sample data if no sentence lengths provided
  const defaultData = Array.from({ length: 30 }, (_, i) => ({
    index: i + 1,
    length: Math.floor(Math.random() * 25) + 10
  }))

  const chartData = sentenceLengths.length > 0
    ? sentenceLengths.slice(-30).map((length, index) => ({
        index: index + 1,
        length
      }))
    : defaultData

  const avgLength = chartData.length > 0
    ? chartData.reduce((sum, item) => sum + item.length, 0) / chartData.length
    : 0

  return (
    <div
      className="rounded-lg border p-4"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
          Sentence Length Variation
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Natural writing shows varied sentence lengths
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Burstiness Score
          </span>
          <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {burstiness.toFixed(1)}
          </span>
        </div>
        <div
          className="w-full rounded-full h-2"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min((burstiness / 10) * 100, 100)}%`,
              backgroundColor: 'var(--color-primary)'
            }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Higher = more natural rhythm
        </p>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="index" 
            stroke="var(--color-text-secondary)"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            label={{ value: 'Sentence #', position: 'insideBottom', offset: -5, fill: 'var(--color-text-secondary)' }}
          />
          <YAxis 
            stroke="var(--color-text-secondary)"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            label={{ value: 'Words', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-tertiary)', 
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              color: 'var(--color-text)'
            }}
            labelStyle={{ color: 'var(--color-text-secondary)' }}
          />
          <ReferenceLine 
            y={avgLength} 
            stroke="var(--color-warning)" 
            strokeDasharray="5 5"
            label={{ value: `Avg: ${avgLength.toFixed(1)}`, fill: 'var(--color-warning)', fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="length" 
            stroke="var(--color-primary)" 
            strokeWidth={2}
            dot={{ fill: 'var(--color-primary)', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          AI writing tends to have uniform sentence lengths. Natural human writing varies between short, medium, and long sentences.
        </p>
      </div>
    </div>
  )
}
