import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'
import { generateSuggestions } from '../utils/suggestions'

interface PlagiarismPanelProps {
  warnings: string[]
  matchedPhrases?: string[]
}

export default function PlagiarismPanel({ warnings, matchedPhrases = [] }: PlagiarismPanelProps) {
  const plagiarismWarnings = warnings.filter(w => 
    w.includes('🚨') || w.includes('source') || w.includes('plagiarism') || w.includes('phrases') || w.includes('similar')
  )

  // Generate suggestions for matched phrases
  const allSuggestions = matchedPhrases.flatMap(phrase => generateSuggestions(phrase))
  const synonymSuggestions = allSuggestions.filter(s => s.type === 'synonym')
  const paraphraseSuggestions = allSuggestions.filter(s => s.type === 'paraphrase')

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
        <div className="space-y-3">
          {/* Warnings */}
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

          {/* Suggestions Section */}
          {(synonymSuggestions.length > 0 || paraphraseSuggestions.length > 0) && (
            <div
              className="rounded-lg p-4 border"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-info)'
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  Suggestions to Improve Originality
                </h4>
              </div>

              {/* Synonym Suggestions */}
              {synonymSuggestions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Word Alternatives:
                  </p>
                  <div className="space-y-1">
                    {synonymSuggestions.slice(0, 5).map((sugg, idx) => (
                      <div key={idx} className="text-xs flex items-center gap-2">
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                          "{sugg.original}"
                        </span>
                        <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
                        <span 
                          className="font-medium px-2 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'var(--color-info)',
                            color: 'var(--color-bg)'
                          }}
                        >
                          {sugg.suggestion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Paraphrase Suggestions */}
              {paraphraseSuggestions.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    📝 Paraphrase Ideas:
                  </p>
                  <div className="space-y-2">
                    {paraphraseSuggestions.map((sugg, idx) => (
                      <div 
                        key={idx}
                        className="text-xs p-3 rounded border"
                        style={{ 
                          backgroundColor: 'var(--color-bg-secondary)',
                          borderColor: 'var(--color-info)',
                          borderWidth: '1px'
                        }}
                      >
                        <div style={{ color: 'var(--color-text-secondary)' }} className="mb-2">
                          <strong>Original:</strong> <span className="italic">"{sugg.original}"</span>
                        </div>
                        <div 
                          className="font-medium p-2 rounded"
                          style={{ 
                            color: 'var(--color-info)',
                            backgroundColor: 'rgba(0, 184, 212, 0.1)'
                          }}
                        >
                          💡 {sugg.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
