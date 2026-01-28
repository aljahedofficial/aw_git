import { AlertTriangle, CheckCircle } from 'lucide-react'

interface PlagiarismPanelProps {
  warnings: string[]
}

export default function PlagiarismPanel({ warnings }: PlagiarismPanelProps) {
  const plagiarismWarnings = warnings.filter(w => 
    w.includes('🚨') || w.includes('source') || w.includes('plagiarism') || w.includes('phrases') || w.includes('similar')
  )

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
          Plagiarism & Similarity Detection
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Real-time comparison with source materials
        </p>
      </div>

      {plagiarismWarnings.length > 0 ? (
        <div className="space-y-2">
          {plagiarismWarnings.map((warning, idx) => (
            <div
              key={idx}
              className="rounded-lg p-3 flex gap-2 border-l-4"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderLeftColor: 'var(--color-danger)'
              }}
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-danger)' }} />
              <p className="text-xs" style={{ color: 'var(--color-text)' }}>
                {warning}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-lg p-3 flex gap-2 border-l-4"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderLeftColor: 'var(--color-success)'
          }}
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
          <p className="text-sm" style={{ color: 'var(--color-success)' }}>
            No plagiarism detected. Your writing is original!
          </p>
        </div>
      )}

      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          We check for: direct copying (5+ words), phrase matches (4+ words), n-gram overlap (3-word sequences), and sentence structure similarity.
        </p>
      </div>
    </div>
  )
}
