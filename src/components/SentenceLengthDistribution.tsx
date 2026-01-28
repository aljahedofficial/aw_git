import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SentenceLengthDistributionProps {
  text?: string
}

export default function SentenceLengthDistribution({ text = '' }: SentenceLengthDistributionProps) {
  // Parse sentences and calculate lengths
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length)
  
  // Calculate statistics
  const avgLength = sentenceLengths.length > 0
    ? sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length
    : 0
  
  // Categorize sentences
  const shortCount = sentenceLengths.filter(len => len <= 10).length
  const mediumCount = sentenceLengths.filter(len => len > 10 && len <= 20).length
  const longCount = sentenceLengths.filter(len => len > 20).length
  
  const totalSentences = sentenceLengths.length || 1
  
  const chartData = [
    {
      category: 'Short\n(≤10)',
      count: shortCount,
      percentage: ((shortCount / totalSentences) * 100).toFixed(0)
    },
    {
      category: 'Medium\n(11-20)',
      count: mediumCount,
      percentage: ((mediumCount / totalSentences) * 100).toFixed(0)
    },
    {
      category: 'Long\n(>20)',
      count: longCount,
      percentage: ((longCount / totalSentences) * 100).toFixed(0)
    }
  ]
  
  // Determine variety level
  const getVarietyLevel = () => {
    if (totalSentences < 3) return { text: 'Need more text', color: 'var(--color-text-secondary)' }
    
    const maxCategoryPercent = Math.max(
      (shortCount / totalSentences) * 100,
      (mediumCount / totalSentences) * 100,
      (longCount / totalSentences) * 100
    )
    
    if (maxCategoryPercent > 80) return { text: 'Low Variety (AI-like)', color: 'var(--color-danger)' }
    if (maxCategoryPercent > 60) return { text: 'Moderate Variety', color: 'var(--color-warning)' }
    return { text: 'Good Variety (Natural)', color: 'var(--color-success)' }
  }
  
  const variety = getVarietyLevel()

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
          Sentence Length Distribution
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Natural writing uses varied sentence lengths
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Average Words/Sentence
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {avgLength.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Variety Level
          </div>
          <div className="text-lg font-bold" style={{ color: variety.color }}>
            {variety.text}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="category" 
            stroke="var(--color-text-secondary)"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
          />
          <YAxis 
            stroke="var(--color-text-secondary)"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
            label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-tertiary)', 
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              color: 'var(--color-text)'
            }}
            labelStyle={{ color: 'var(--color-text)' }}
            formatter={(value: any, _name: string, props: any) => [
              `${value} sentences (${props.payload.percentage}%)`,
              'Count'
            ]}
          />
          <Bar 
            dataKey="count" 
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 grid grid-cols-3 gap-2 text-xs" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <div style={{ color: 'var(--color-text-secondary)' }}>Short</div>
          <div className="font-bold" style={{ color: 'var(--color-text)' }}>{shortCount}</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <div style={{ color: 'var(--color-text-secondary)' }}>Medium</div>
          <div className="font-bold" style={{ color: 'var(--color-text)' }}>{mediumCount}</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <div style={{ color: 'var(--color-text-secondary)' }}>Long</div>
          <div className="font-bold" style={{ color: 'var(--color-text)' }}>{longCount}</div>
        </div>
      </div>

      <div className="mt-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
        <p>
          💡 AI writing typically shows uniform sentence lengths (70%+ in one category). 
          Natural writing mixes short, medium, and long sentences for better flow.
        </p>
      </div>
    </div>
  )
}
