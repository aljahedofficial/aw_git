import { useState, useEffect } from 'react'
import { Upload, FileText, X, Eye } from 'lucide-react'
import { readFile } from '../utils/fileReader'

interface Source {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
  content?: string
}

export default function SourceManager() {
  const [sources, setSources] = useState<Source[]>([])
  const [previewFile, setPreviewFile] = useState<Source | null>(null)
  const [previewContent, setPreviewContent] = useState<string>('')
  const [loadingPreview, setLoadingPreview] = useState(false)

  // Load sources from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('source-files')
    if (stored) {
      try {
        setSources(JSON.parse(stored))
      } catch (e) {
        console.log('Failed to parse stored source files')
      }
    }
  }, [])

  const saveSourcesLocally = (newSources: Source[]) => {
    localStorage.setItem('source-files', JSON.stringify(newSources))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      const newSources: Source[] = []
      
      for (const file of fileArray) {
        const content = await readFile(file)
        newSources.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          content
        })
      }
      
      const updated = [...sources, ...newSources]
      setSources(updated)
      saveSourcesLocally(updated)
    }
  }

  const handlePreview = async (source: Source) => {
    setPreviewFile(source)
    setLoadingPreview(true)
    
    if (source.content) {
      setPreviewContent(source.content)
      setLoadingPreview(false)
    } else {
      setPreviewContent('File content not available. Please re-upload the file.')
      setLoadingPreview(false)
    }
  }

  const removeSource = (id: string) => {
    const updated = sources.filter(s => s.id !== id)
    setSources(updated)
    saveSourcesLocally(updated)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Source File Management</h2>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Upload your research sources to detect structural plagiarism and ensure independent synthesis.
        </p>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center mb-6"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-tertiary)'
          }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
          <label className="cursor-pointer">
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>
              Click to upload sources
            </span>
            <span style={{ color: 'var(--color-text-secondary)' }}> or drag and drop</span>
            <input
              type="file"
              multiple
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            PDF, DOC, DOCX, or TXT files (max 50MB each)
          </p>
        </div>

        {/* Source List */}
        {sources.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-medium text-lg" style={{ color: 'var(--color-text)' }}>Uploaded Sources ({sources.length})</h3>
            {sources.map(source => (
              <div
                key={source.id}
                className="flex items-center space-x-4 rounded-lg p-4"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderLeft: '3px solid var(--color-primary)'
                }}
              >
                <FileText className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate" style={{ color: 'var(--color-text)' }}>{source.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {(source.size / 1024).toFixed(0)} KB · 
                    Uploaded {new Date(source.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreview(source)}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-secondary)'
                    }}
                    title="Preview file"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeSource(source.id)}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: 'var(--color-danger)',
                      color: 'white'
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No sources uploaded yet</p>
            <p className="text-sm mt-2">Upload sources to enable plagiarism detection</p>
          </div>
        )}

        {/* OCR Notice */}
        {sources.length > 0 && (
          <div className="mt-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              📋 <strong>Note:</strong> Scanned PDFs will be automatically detected. 
              We'll offer OCR processing to extract text from images.
            </p>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{previewFile.name}</span>
              </h3>
              <button
                onClick={() => {
                  setPreviewFile(null)
                  setPreviewContent('')
                }}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {loadingPreview ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400">Loading preview...</div>
                </div>
              ) : (
                <div>
                  <div className="mb-3 text-sm text-gray-400 flex items-center justify-between">
                    <span>File size: {(previewFile.size / 1024).toFixed(0)} KB</span>
                    <span>Uploaded: {new Date(previewFile.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-gray-900 rounded border border-gray-700 p-4 text-sm">
                    <pre className="whitespace-pre-wrap font-mono text-gray-300 leading-relaxed">
                      {previewContent || 'No content available'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
