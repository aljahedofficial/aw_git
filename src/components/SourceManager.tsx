import { useState } from 'react'
import { Upload, FileText, X, Eye } from 'lucide-react'

interface Source {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export default function SourceManager() {
  const [sources, setSources] = useState<Source[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newSources = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      }))
      setSources([...sources, ...newSources])
    }
  }

  const removeSource = (id: string) => {
    setSources(sources.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-2">Source File Management</h2>
        <p className="text-gray-400 mb-6">
          Upload your research sources to detect structural plagiarism and ensure independent synthesis.
        </p>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-primary-400 hover:text-primary-300 font-medium">
              Click to upload sources
            </span>
            <span className="text-gray-400"> or drag and drop</span>
            <input
              type="file"
              multiple
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">
            PDF, DOC, DOCX, or TXT files (max 50MB each)
          </p>
        </div>

        {/* Source List */}
        {sources.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Uploaded Sources ({sources.length})</h3>
            {sources.map(source => (
              <div
                key={source.id}
                className="flex items-center space-x-4 bg-gray-700 rounded-lg p-4"
              >
                <FileText className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{source.name}</h4>
                  <p className="text-sm text-gray-400">
                    {(source.size / 1024).toFixed(0)} KB · 
                    Uploaded {source.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-600 rounded">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => removeSource(source.id)}
                    className="p-2 hover:bg-red-900/20 rounded"
                  >
                    <X className="w-5 h-5 text-red-400" />
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
    </div>
  )
}
