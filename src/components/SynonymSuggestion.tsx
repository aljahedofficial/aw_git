import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SynonymSuggestionProps {
  word: string
  suggestions: string[]
  onSelect: (suggestion: string) => void
  visible: boolean
  position?: { top: number; left: number }
}

export default function SynonymSuggestion({
  word,
  suggestions,
  onSelect,
  visible,
  position = { top: 0, left: 0 }
}: SynonymSuggestionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Handle keyboard navigation
  useEffect(() => {
    if (!visible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % suggestions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault()
        if (suggestions.length > 0) {
          onSelect(suggestions[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        // Parent will handle closing
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible, suggestions, selectedIndex, onSelect])

  if (!visible || suggestions.length === 0) {
    return null
  }

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-lg border"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        minWidth: '200px',
        maxWidth: '300px'
      }}
    >
      <div className="p-2">
        <div className="text-xs font-semibold mb-2 px-2 py-1" style={{ color: 'var(--color-text-secondary)' }}>
          Suggest for: <span style={{ color: 'var(--color-primary)' }}>"{word}"</span>
        </div>

        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSelect(suggestion)}
              className="px-3 py-2 cursor-pointer rounded transition-colors"
              style={{
                backgroundColor: index === selectedIndex ? 'var(--color-primary)' : 'transparent',
                color: index === selectedIndex ? 'var(--color-bg)' : 'var(--color-text)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{suggestion}</span>
                {index === selectedIndex && (
                  <ChevronDown className="w-4 h-4 opacity-70" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-2 pt-2 px-2 text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
          <p>Press <kbd style={{ backgroundColor: 'var(--color-bg-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>Tab</kbd> or <kbd style={{ backgroundColor: 'var(--color-bg-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>Enter</kbd> to select</p>
        </div>
      </div>
    </div>
  )
}
