import { useState } from 'react'
import Editor from './components/Editor'
import MetricsPanel from './components/MetricsPanel'
import BaselineManager from './components/BaselineManager'
import ShadowPanel from './components/ShadowPanel'
import SourceManager from './components/SourceManager'
import { FileText, Activity, Target, FileUp } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'baseline' | 'sources'>('editor')
  const [metrics, setMetrics] = useState({
    humanityScore: 75,
    burstiness: 6.2,
    confidence: 0.87,
    shadowScores: {
      gptZero: 0.35,
      turnitin: 0.42,
      originality: 0.38
    }
  })

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-primary-500" />
              <h1 className="text-2xl font-bold">Writing Defense Platform</h1>
            </div>
            <div className="text-sm text-gray-400">
              v1.0.0-beta
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'editor'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('baseline')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'baseline'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Baseline</span>
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'sources'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <FileUp className="w-4 h-4" />
              <span>Sources</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Editor onMetricsUpdate={setMetrics} />
            </div>
            <div className="space-y-6">
              <MetricsPanel metrics={metrics} />
              <ShadowPanel scores={metrics.shadowScores} />
            </div>
          </div>
        )}
        {activeTab === 'baseline' && <BaselineManager />}
        {activeTab === 'sources' && <SourceManager />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            <p>Writing Defense Platform - Research Tool for L2 Writers</p>
            <p className="mt-2">All data is processed locally and encrypted</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
