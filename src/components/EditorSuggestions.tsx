import { generateSynonym } from '../utils/suggestions'

interface EditorSuggestionsProps {
  text: string
  matchedPhrases: string[]
}

interface WordSuggestion {
  position: number
  word: string
  synonym: string
}

export default function EditorSuggestions({ text, matchedPhrases }: EditorSuggestionsProps) {
  // Find positions of matched phrases and generate synonyms
  const wordSuggestions: WordSuggestion[] = []

  matchedPhrases.forEach(phrase => {
    const phraseWords = phrase.split(/\s+/)
    
    // Find each word in the phrase and generate synonyms
    phraseWords.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '')
      const synonym = generateSynonym(cleanWord)
      
      if (synonym) {
        // Find position in text
        const wordIndex = text.toLowerCase().indexOf(cleanWord.toLowerCase())
        if (wordIndex !== -1) {
          wordSuggestions.push({
            position: wordIndex,
            word: cleanWord,
            synonym: synonym
          })
        }
      }
    })
  })

  // Remove duplicates
  const uniqueSuggestions = Array.from(
    new Map(
      wordSuggestions.map(s => [s.word.toLowerCase(), s])
    ).values()
  ).slice(0, 8) // Limit to 8 suggestions

  return (
    <div className="space-y-2">
      {uniqueSuggestions.length > 0 && (
        <div
          className="rounded-lg p-3 border"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-info)',
            borderWidth: '1px'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: 'var(--color-info)' }}>💡</span>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
              Synonym Suggestions
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            {uniqueSuggestions.map((sugg, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2 rounded text-xs"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
              >
                <span className="font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                  "{sugg.word}"
                </span>
                <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
                <span 
                  className="font-semibold px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: 'var(--color-info)',
                    color: 'var(--color-bg)'
                  }}
                >
                  {sugg.synonym}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              ✨ Click any suggestion or manually replace matched words to improve originality.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
