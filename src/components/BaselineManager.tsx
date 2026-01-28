import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Eye, X } from 'lucide-react'

interface StoredFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
}

export default function BaselineManager() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [baseline, setBaseline] = useState<any>(null)
  const [previewFile, setPreviewFile] = useState<StoredFile | null>(null)

  // Load files from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('baseline-files')
    if (stored) {
      try {
        setFiles(JSON.parse(stored))
      } catch (e) {
        console.log('Failed to parse stored baseline files')
      }
    }
  }, [])

  const saveFilesToStorage = (newFiles: StoredFile[]) => {
    localStorage.setItem('baseline-files', JSON.stringify(newFiles))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: StoredFile[] = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      }))
      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      saveFilesToStorage(updatedFiles)
    }
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(f => f.id !== id)
    setFiles(updatedFiles)
    saveFilesToStorage(updatedFiles)
  }

  const processBaseline = async () => {
    setIsProcessing(true)
    
    // Simulate baseline processing
    setTimeout(() => {
      setBaseline({
        wordCount: 3847,
        confidence: 0.96,
        sentenceLength: { mean: 14.2, sd: 4.8 },
        lexicalDiversity: { mattr: 0.62 },
        cefrLevel: 'B2',
        createdDate: new Date().toISOString(),
      })
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-2">Baseline Calibration</h2>
        <p className="text-gray-400 mb-6">
          Upload 2-3 of your previous essays (2000+ words total) to establish your authentic writing voice.
        </p>

        {!baseline ? (
          <div className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="cursor-pointer">
                <span className="text-primary-400 hover:text-primary-300 font-medium">
                  Click to upload
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
                TXT, DOC, DOCX, or PDF files
              </p>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Uploaded Files ({files.length}):</h3>
                {files.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 bg-gray-700 rounded p-3">
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Preview file"
                    >
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                    </button>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Remove file"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Process Button */}
            {files.length > 0 && (
              <button
                onClick={processBaseline}
                disabled={isProcessing}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Create Baseline'}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-green-400 mb-1">Baseline Created Successfully!</h3>
                <p className="text-sm text-gray-300">
                  Your linguistic fingerprint has been established with {baseline.confidence * 100}% confidence.
                </p>
              </div>
            </div>

            {/* Baseline Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Words Analyzed</div>
                <div className="text-2xl font-bold">{baseline.wordCount.toLocaleString()}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Confidence</div>
                <div className="text-2xl font-bold text-green-400">
                  {(baseline.confidence * 100).toFixed(0)}%
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Avg Sentence Length</div>
                <div className="text-2xl font-bold">{baseline.sentenceLength.mean}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">CEFR Level</div>
                <div className="text-2xl font-bold text-blue-400">{baseline.cefrLevel}</div>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Baseline Metadata</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Created: {new Date(baseline.createdDate).toLocaleString()}</p>
                <p>Lexical Diversity (MATTR): {baseline.lexicalDiversity.mattr}</p>
                <p>Sentence Length SD: {baseline.sentenceLength.sd}</p>
              </div>
            </div>

            {/* Recalibrate Button */}
            <button
              onClick={() => setBaseline(null)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg"
            >
              Recalibrate Baseline
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">Why baseline calibration?</p>
              <p>
                Your baseline establishes your authentic voice. This helps the system distinguish 
                between your natural writing development and AI-generated text.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-2xl w-full max-h-96 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{previewFile.name}</span>
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="text-gray-400">
                <p className="mb-2">File size: {(previewFile.size / 1024).toFixed(0)} KB</p>
                <p className="mb-4 text-sm">Uploaded: {new Date(previewFile.uploadedAt).toLocaleString()}</p>
                <p className="text-sm p-3 bg-gray-700 rounded border border-gray-600">
                  Preview functionality for {previewFile.type || 'file'} files will be implemented in the next phase.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}    </div>
  )
}
