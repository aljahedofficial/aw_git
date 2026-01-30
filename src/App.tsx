import { useState, useEffect } from 'react'
import Editor from './components/Editor'
import MetricsPanel from './components/MetricsPanel'
import BaselineManager from './components/BaselineManager'
import ShadowPanel from './components/ShadowPanel'
import SourceManager from './components/SourceManager'
import OnboardingTutorial from './components/OnboardingTutorial'
import ResearcherDashboard from './components/ResearcherDashboard'
import AdvancedBurstinessDetector from './components/AdvancedBurstinessDetector'
import SentenceLengthDistribution from './components/SentenceLengthDistribution'
import ThemeSelector from './components/ThemeSelector'
import HomogenizationAnalyzer from './components/HomogenizationAnalyzer'
import { FileText, Activity, Target, FileUp, BarChart2, Zap } from 'lucide-react'
import { getStoredTheme, applyTheme, themes } from './utils/themes'

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'baseline' | 'sources' | 'dashboard' | 'homogenization'>('editor')
  const [editorText, setEditorText] = useState('')
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

  // Apply theme on mount
  useEffect(() => {
    const theme = getStoredTheme()
    applyTheme(themes[theme])
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              <h1 className="text-2xl font-bold">Writing Defense Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                v1.0.0-beta
              </div>
              <ThemeSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors font-medium`}
              style={{
                borderColor: activeTab === 'editor' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'editor' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('baseline')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors font-medium`}
              style={{
                borderColor: activeTab === 'baseline' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'baseline' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <Activity className="w-4 h-4" />
              <span>Baseline</span>
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors font-medium`}
              style={{
                borderColor: activeTab === 'sources' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'sources' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <FileUp className="w-4 h-4" />
              <span>Sources</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors font-medium`}
              style={{
                borderColor: activeTab === 'dashboard' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'dashboard' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('homogenization')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors font-medium`}
              style={{
                borderColor: activeTab === 'homogenization' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'homogenization' ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <Zap className="w-4 h-4" />
              <span>AI Analyzer</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Onboarding Tutorial */}
      <OnboardingTutorial onComplete={() => {}} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Editor 
                onMetricsUpdate={setMetrics}
                onTextChange={setEditorText}
              />
            </div>
            <div className="space-y-6">
              <MetricsPanel metrics={metrics} />
              <AdvancedBurstinessDetector text={editorText} />
              <SentenceLengthDistribution text={editorText} />
              <ShadowPanel scores={metrics.shadowScores} />
            </div>
          </div>
        )}
        {activeTab === 'baseline' && <BaselineManager />}
        {activeTab === 'sources' && <SourceManager />}
        {activeTab === 'dashboard' && <ResearcherDashboard />}
        {activeTab === 'homogenization' && <HomogenizationAnalyzer />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        marginTop: '3rem'
      }}>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <p>Writing Defense Platform - Research Tool for L2 Writers</p>
            <p className="mt-2">All data is processed locally and encrypted</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
