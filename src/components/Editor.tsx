import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useState } from 'react'
import { analyzeLinguisticFeatures } from '../utils/linguisticAnalysis'
import BurstinessEKG from './BurstinessEKG'

interface EditorProps {
  onMetricsUpdate: (metrics: any) => void
}

export default function Editor({ onMetricsUpdate }: EditorProps) {
  const [keystrokeData, setKeystrokeData] = useState<number[]>([])
  const [lastKeystrokeTime, setLastKeystrokeTime] = useState<number>(Date.now())
  const [stumbles, setStumbles] = useState<Array<{ time: number; duration: number }>>([])

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
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-6',
      },
      handleKeyDown: (_view, _event) => {
        const now = Date.now()
        const interval = now - lastKeystrokeTime
        
        // Track inter-keystroke intervals
        setKeystrokeData(prev => [...prev.slice(-100), interval])
        setLastKeystrokeTime(now)

        // Detect stumbles (pauses > 2 seconds)
        if (interval > 2000) {
          setStumbles(prev => [...prev, { time: now, duration: interval }])
        }

        return false
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      if (text.length > 10) {
        const analysis = analyzeLinguisticFeatures(text)
        onMetricsUpdate(analysis)
      }
    },
  })

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
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-gray-750 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span className="font-medium">{wordCount}</span> words · 
            <span className="font-medium ml-2">{charCount}</span> characters
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Redo
            </button>
          </div>
        </div>
        <EditorContent editor={editor} />
      </div>

      {/* Burstiness EKG */}
      {keystrokeData.length > 10 && (
        <BurstinessEKG data={keystrokeData} stumbles={stumbles} />
      )}

      {/* Stumble Alerts */}
      {stumbles.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4">
          <h3 className="text-yellow-400 font-medium mb-2">⚠️ Stumble Detected</h3>
          <p className="text-sm text-gray-300">
            You paused for {(stumbles[stumbles.length - 1].duration / 1000).toFixed(1)}s. 
            This might indicate cognitive effort or searching for words.
          </p>
        </div>
      )}
    </div>
  )
}
