import { useState, useEffect } from 'react'
import { Download, FileText, Users, BarChart3, Calendar } from 'lucide-react'
import { storage } from '../utils/storage'

export default function ResearcherDashboard() {
  const [sessions, setSessions] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalWords: 0,
    averageHumanityScore: 0,
    participantCount: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const allSessions = await storage.getAllSessions()
      setSessions(allSessions)

      // Calculate statistics
      const totalWords = allSessions.reduce((sum, s) => sum + (s.wordCount || 0), 0)
      const avgScore = allSessions.length > 0
        ? allSessions.reduce((sum, s) => sum + (s.metrics?.humanityScore || 0), 0) / allSessions.length
        : 0

      setStats({
        totalSessions: allSessions.length,
        totalWords,
        averageHumanityScore: Math.round(avgScore),
        participantCount: allSessions.length // Each session is a participant for now
      })
    } catch (e) {
      console.error('Failed to load data:', e)
    }
  }

  const exportToCSV = () => {
    if (sessions.length === 0) {
      alert('No data to export')
      return
    }

    const headers = ['SessionID', 'Date', 'WordCount', 'HumanityScore', 'Burstiness', 'Confidence', 'GPTZero', 'Turnitin', 'Originality']
    const rows = sessions.map(s => [
      s.sessionId || '',
      s.startTime || '',
      s.wordCount || 0,
      s.metrics?.humanityScore || 0,
      s.metrics?.burstiness || 0,
      s.metrics?.confidence || 0,
      s.metrics?.shadowScores?.gptZero || 0,
      s.metrics?.shadowScores?.turnitin || 0,
      s.metrics?.shadowScores?.originality || 0
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `writing-defense-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    if (sessions.length === 0) {
      alert('No data to export')
      return
    }

    const json = JSON.stringify(sessions, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `writing-defense-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Researcher Dashboard</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          View aggregate metrics and export data for analysis
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          className="rounded-lg border p-4"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{stats.totalSessions}</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{stats.participantCount}</div>
          <div className="text-sm text-gray-400">Participants</div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Words</div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold">{stats.averageHumanityScore}</div>
          <div className="text-sm text-gray-400">Avg Humanity Score</div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Export Data</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToJSON}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Export includes session IDs, metrics, timestamps, and anonymized participant data for research analysis.
        </p>
      </div>

      {/* Recent Sessions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
        {sessions.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sessions.slice(0, 10).map((session, index) => (
              <div key={index} className="bg-gray-700 rounded p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{session.sessionId || `Session ${index + 1}`}</div>
                  <div className="text-sm text-gray-400">
                    {session.wordCount || 0} words · Score: {session.metrics?.humanityScore || 0}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {session.startTime ? new Date(session.startTime).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No sessions recorded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
