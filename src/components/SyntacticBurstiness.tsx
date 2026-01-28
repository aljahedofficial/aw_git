import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SyntacticBurstinessProps {
  text: string
}

export default function SyntacticBurstiness({ text }: SyntacticBurstinessProps) {
  // Parse sentences and calculate word counts
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length)
  
  // Prepare chart data
  const chartData = sentenceLengths.map((length, index) => ({
    sentence: index + 1,
    words: length
  }))

  // Calculate statistics
  const avgLength = sentenceLengths.length > 0
    ? sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length
    : 0
  
  const variance = sentenceLengths.length > 0
    ? sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / sentenceLengths.length
    : 0
  
  const stdDev = Math.sqrt(variance)
  
  // Determine verdict based on variance
  const getVerdict = () => {
    if (sentenceLengths.length < 3) {
      return { text: 'Need more sentences', color: 'var(--color-text-secondary)', emoji: '⏳' }
    }
    
    // AI writing has low variance (uniform lengths)
    // Human writing has higher variance (varied lengths)
    if (stdDev < 2.5) {
      return { text: 'AI-like Pattern', color: 'var(--color-danger)', emoji: '🤖' }
    } else if (stdDev < 4.5) {
      return { text: 'Ambiguous', color: 'var(--color-warning)', emoji: '⚠️' }
    } else {
      return { text: 'Human-like Pattern', color: 'var(--color-success)', emoji: '✅' }
    }
  }

  const verdict = getVerdict()

  if (sentenceLengths.length === 0) {
    return null
  }

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
          Syntactic Burstiness
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Word count per sentence reveals writing patterns
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Avg Words
          </div>
          <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {avgLength.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Variance
          </div>
          <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {stdDev.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Pattern
          </div>
          <div className="text-lg font-bold" style={{ color: verdict.color }}>
            {verdict.emoji} {verdict.text}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-4">
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text)' }}>
          Word Count per Sentence
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="sentence" 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
              label={{ value: 'Sentence Index', position: 'insideBottom', offset: -5, fill: 'var(--color-text-secondary)' }}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
              label={{ value: 'Word Count', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-tertiary)', 
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                color: 'var(--color-text)'
              }}
              labelStyle={{ color: 'var(--color-text)' }}
            />
            <Bar 
              dataKey="words" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Fluctuation Pattern */}
      <div className="mb-4">
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text)' }}>
          Fluctuation Pattern
        </p>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="sentence" 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-tertiary)', 
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                color: 'var(--color-text)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="words" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Explanation */}
      <div 
        className="p-3 rounded text-xs"
        style={{ 
          backgroundColor: 'var(--color-bg-tertiary)',
          borderLeft: `3px solid ${verdict.color}`
        }}
      >
        <p style={{ color: 'var(--color-text)' }}>
          <strong>Analysis:</strong> {sentenceLengths.length} sentences detected. 
          {stdDev < 2.5 && ' Very uniform lengths suggest AI generation (robots write consistently).'}
          {stdDev >= 2.5 && stdDev < 4.5 && ' Moderate variation - could be human or well-trained AI.'}
          {stdDev >= 4.5 && ' High variation indicates natural human writing (mixing short, medium, and long sentences).'}
        </p>
      </div>
    </div>
  )
}
