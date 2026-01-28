import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function BaselineManager() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [baseline, setBaseline] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
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
                <h3 className="font-medium">Uploaded Files:</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-700 rounded p-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="flex-1">{file.name}</span>
                    <span className="text-sm text-gray-400">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
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
    </div>
  )
}
