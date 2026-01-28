import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useState } from 'react'
import { analyzeLinguisticFeatures, calculateSimilarityWithSource } from '../utils/linguisticAnalysis'
import { findMatchedWords } from '../utils/suggestions'
import { getSynonyms } from '../utils/thesaurus'
import PlagiarismPanel from './PlagiarismPanel'
import EditorSuggestions from './EditorSuggestions'
import SyntacticBurstiness from './SyntacticBurstiness'
import SynonymSuggestion from './SynonymSuggestion'

interface EditorProps {
  onMetricsUpdate: (metrics: any) => void
  onTextChange?: (text: string) => void
}

export default function Editor({ onMetricsUpdate, onTextChange }: EditorProps) {
  const [_keystrokeData, setKeystrokeData] = useState<number[]>([])
  const [lastKeystrokeTime, setLastKeystrokeTime] = useState<number>(Date.now())
  const [stumbles, setStumbles] = useState<Array<{ time: number; duration: number }>>([])
  const [sourceTexts, setSourceTexts] = useState<string[]>([])
  const [currentWarnings, setCurrentWarnings] = useState<string[]>([])
  const [matchedPhrases, setMatchedPhrases] = useState<string[]>([])
  
  // Synonym suggestion state
  const [currentWord, setCurrentWord] = useState<string>('')
  const [synonymSuggestions, setSynonymSuggestions] = useState<string[]>([])
  const [showSynonymSuggestion, setShowSynonymSuggestion] = useState<boolean>(false)
  const [suggestionPosition, setSuggestionPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  // Helper: Detect current word at cursor position
  const detectCurrentWord = () => {
    if (!editor) return

    const text = editor.getText()
    const { from } = editor.state.selection
    
    if (from <= 0) {
      setShowSynonymSuggestion(false)
      return
    }
    
    // Find word boundaries around cursor
    let start = from - 1
    let end = from

    // Find start of word (move backwards while we see word characters)
    while (start >= 0 && /\w/.test(text[start])) {
      start--
    }
    start++ // Move to first letter of word

    // Find end of word (move forwards while we see word characters)
    while (end < text.length && /\w/.test(text[end])) {
      end++
    }

    if (start < end) {
      const word = text.substring(start, end).toLowerCase()
      
      // Only show suggestion if word is at least 2 chars
      if (word.length >= 2) {
        const synonyms = getSynonyms(word)

        if (synonyms && synonyms.length > 0) {
          setCurrentWord(word)
          setSynonymSuggestions(synonyms.slice(0, 8)) // Limit to 8 suggestions
          
          // Calculate position for suggestion popup
          try {
            const coords = editor.view.coordsAtPos(from)
            if (coords) {
              setSuggestionPosition({
                top: coords.top - 140, // Position above cursor
                left: coords.left
              })
            }
          } catch (e) {
            // Fallback if coordsAtPos fails
            setSuggestionPosition({
              top: 100,
              left: 200
            })
          }
          
          setShowSynonymSuggestion(true)
          return
        }
      }
    }
    
    setShowSynonymSuggestion(false)
  }

  // Helper: Replace current word with synonym
  const replacedCurrentWord = (synonym: string) => {
    if (!editor || !currentWord) return

    const text = editor.getText()
    const { from } = editor.state.selection
    
    // Find word boundaries
    let start = from - 1
    let end = from

    while (start >= 0 && /\w/.test(text[start])) {
      start--
    }
    start++ // Move to first letter of word

    while (end < text.length && /\w/.test(text[end])) {
      end++
    }

    if (start < end) {
      // Tiptap uses 1-based indices for commands, not 0-based
      // We need to add 1 to both start and end positions
      editor
        .chain()
        .focus()
        .deleteRange({ from: start + 1, to: end + 1 })
        .insertContent(synonym)
        .run()
      
      setShowSynonymSuggestion(false)
      setCurrentWord('')
      setSynonymSuggestions([])
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your essay here...',
      }),
      CharacterCount,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] p-6'
      },
      handleKeyDown: (_view: any, event: KeyboardEvent) => {
        const now = Date.now()
        const interval = now - lastKeystrokeTime
        
        // Track inter-keystroke intervals
        setKeystrokeData(prev => [...prev.slice(-100), interval])
        setLastKeystrokeTime(now)

        // Detect stumbles (pauses > 2 seconds)
        if (interval > 2000) {
          setStumbles(prev => [...prev, { time: now, duration: interval }])
        }

        // Handle Tab key for synonym selection
        if (event.key === 'Tab' && showSynonymSuggestion && synonymSuggestions.length > 0) {
          event.preventDefault()
          const selectedSynonym = synonymSuggestions[0]
          replacedCurrentWord(selectedSynonym)
          return true
        }

        // Handle Escape to close suggestion
        if (event.key === 'Escape') {
          setShowSynonymSuggestion(false)
          return false
        }

        // Detect current word after a short delay
        setTimeout(() => {
          detectCurrentWord()
        }, 0)

        return false
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      
      // Pass text to parent for real-time display
      if (onTextChange) {
        onTextChange(text)
      }
      
      if (text.length > 10) {
        const analysis = analyzeLinguisticFeatures(text)
        
        // Calculate similarity with sources
        let maxSimilarity = 0
        let similarityWarnings: string[] = []
        const allMatchedPhrases: string[] = []
        
        sourceTexts.forEach(source => {
          const similarity = calculateSimilarityWithSource(text, source)
          if (similarity.overallSimilarity > maxSimilarity) {
            maxSimilarity = similarity.overallSimilarity
          }
          similarityWarnings.push(...similarity.warnings)
          
          // Find actual matched phrases directly from text comparison
          const matches = findMatchedWords(text, source)
          allMatchedPhrases.push(...matches)
        })

        // Merge warnings and update state immediately for real-time display
        const allWarnings = [...(analysis.warnings || []), ...similarityWarnings]
        setCurrentWarnings(allWarnings)
        setMatchedPhrases(allMatchedPhrases)

        onMetricsUpdate({
          ...analysis,
          similarityRisk: maxSimilarity,
          warnings: allWarnings
        })
      }
    },
  })

  // Load source texts from localStorage and setup listener
  useEffect(() => {
    const loadSources = () => {
      try {
        const saved = localStorage.getItem('source-files')
        if (saved) {
          const files = JSON.parse(saved)
          const texts = files.map((f: any) => f.content || f.text || '').filter(Boolean)
          setSourceTexts(texts)
        }
      } catch (e) {
        console.error('Error loading source texts:', e)
      }
    }

    // Load initially
    loadSources()

    // Listen for changes to source-files in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'source-files') {
        loadSources()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    // Auto-save to IndexedDB every 30 seconds
    const interval = setInterval(() => {
      if (editor) {
        const content = editor.getHTML()
        localStorage.setItem('draft-autosave', content)
        localStorage.setItem('draft-timestamp', new Date().toISOString())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [editor])

  // Load autosaved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('draft-autosave')
    const savedTime = localStorage.getItem('draft-timestamp')
    
    if (savedContent && savedTime && editor) {
      const savedDate = new Date(savedTime)
      const now = new Date()
      const hoursSince = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60)
      
      if (hoursSince < 24) {
        const restore = window.confirm(
          `Restore your previous draft? (Saved ${savedDate.toLocaleString()})`
        )
        if (restore) {
          editor.commands.setContent(savedContent)
        }
      }
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const wordCount = editor.storage.characterCount.words()
  const charCount = editor.storage.characterCount.characters()

  return (
    <div className="space-y-4 relative">
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div
          className="px-4 py-2 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-medium">{wordCount}</span> words · 
            <span className="font-medium ml-2">{charCount}</span> characters
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="px-3 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="px-3 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
            >
              Redo
            </button>
          </div>
        </div>
        
        {/* Synonym Suggestion Popup */}
        <div className="relative">
          <EditorContent editor={editor} />
          <SynonymSuggestion
            word={currentWord}
            suggestions={synonymSuggestions}
            onSelect={replacedCurrentWord}
            visible={showSynonymSuggestion}
            position={suggestionPosition}
          />
        </div>
      </div>

      {/* Inline Synonym Suggestions */}
      {matchedPhrases.length > 0 && (
        <EditorSuggestions text={editor?.getText() || ''} matchedPhrases={matchedPhrases} />
      )}

      {/* Plagiarism & Similarity Detection */}
      <PlagiarismPanel warnings={currentWarnings} matchedPhrases={matchedPhrases} />

      {/* Stumble Alerts */}
      {stumbles.length > 0 && (
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: `var(--color-bg-tertiary)`,
            borderColor: `var(--color-warning)`,
            borderWidth: '2px'
          }}
        >
          <h3 className="font-medium mb-2" style={{ color: 'var(--color-warning)' }}>⚠️ Stumble Detected</h3>
          <p className="text-sm" style={{ color: 'var(--color-text)' }}>
            You paused for {(stumbles[stumbles.length - 1].duration / 1000).toFixed(1)}s. 
            This might indicate cognitive effort or searching for words.
          </p>
        </div>
      )}

      {/* Syntactic Burstiness Analysis */}
      <SyntacticBurstiness text={editor?.getText() || ''} />
    </div>
  )
}
