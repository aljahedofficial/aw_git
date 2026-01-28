// Storage utilities using IndexedDB for persistent local storage

import localforage from 'localforage'
import type { SessionData, BaselineProfile, SourceFile } from '../types'

// Configure localforage
const sessionStore = localforage.createInstance({
  name: 'WritingDefense',
  storeName: 'sessions',
  description: 'Writing session data'
})

const baselineStore = localforage.createInstance({
  name: 'WritingDefense',
  storeName: 'baselines',
  description: 'User baseline profiles'
})

const sourceStore = localforage.createInstance({
  name: 'WritingDefense',
  storeName: 'sources',
  description: 'Source files for plagiarism detection'
})

export const storage = {
  // Session Management
  async saveSession(sessionId: string, data: SessionData): Promise<void> {
    await sessionStore.setItem(sessionId, data)
  },

  async getSession(sessionId: string): Promise<SessionData | null> {
    return await sessionStore.getItem(sessionId)
  },

  async getAllSessions(): Promise<SessionData[]> {
    const sessions: SessionData[] = []
    await sessionStore.iterate((value: SessionData) => {
      sessions.push(value)
    })
    return sessions
  },

  async deleteSession(sessionId: string): Promise<void> {
    await sessionStore.removeItem(sessionId)
  },

  // Baseline Management
  async saveBaseline(userId: string, baseline: BaselineProfile): Promise<void> {
    await baselineStore.setItem(userId, baseline)
  },

  async getBaseline(userId: string): Promise<BaselineProfile | null> {
    return await baselineStore.getItem(userId)
  },

  async deleteBaseline(userId: string): Promise<void> {
    await baselineStore.removeItem(userId)
  },

  // Source File Management
  async saveSource(source: SourceFile): Promise<void> {
    await sourceStore.setItem(source.id, source)
  },

  async getSource(sourceId: string): Promise<SourceFile | null> {
    return await sourceStore.getItem(sourceId)
  },

  async getAllSources(): Promise<SourceFile[]> {
    const sources: SourceFile[] = []
    await sourceStore.iterate((value: SourceFile) => {
      sources.push(value)
    })
    return sources
  },

  async deleteSource(sourceId: string): Promise<void> {
    await sourceStore.removeItem(sourceId)
  },

  // Auto-save Draft
  async saveDraft(content: string, metrics: any): Promise<void> {
    const draft = {
      content,
      metrics,
      timestamp: new Date().toISOString()
    }
    await sessionStore.setItem('current-draft', draft)
  },

  async getDraft(): Promise<{ content: string; metrics: any; timestamp: string } | null> {
    return await sessionStore.getItem('current-draft')
  },

  async clearDraft(): Promise<void> {
    await sessionStore.removeItem('current-draft')
  },

  // Export/Import
  async exportAllData(): Promise<{
    sessions: SessionData[]
    baseline: BaselineProfile | null
    sources: SourceFile[]
  }> {
    return {
      sessions: await this.getAllSessions(),
      baseline: await this.getBaseline('current-user'),
      sources: await this.getAllSources()
    }
  },

  async importData(data: {
    sessions?: SessionData[]
    baseline?: BaselineProfile
    sources?: SourceFile[]
  }): Promise<void> {
    if (data.sessions) {
      for (const session of data.sessions) {
        await this.saveSession(session.sessionId, session)
      }
    }
    if (data.baseline) {
      await this.saveBaseline('current-user', data.baseline)
    }
    if (data.sources) {
      for (const source of data.sources) {
        await this.saveSource(source)
      }
    }
  },

  // Clear All Data (for testing/reset)
  async clearAll(): Promise<void> {
    await sessionStore.clear()
    await baselineStore.clear()
    await sourceStore.clear()
  }
}

// Auto-save helper
export function setupAutoSave(
  getContent: () => string,
  getMetrics: () => any,
  intervalMs: number = 30000
): () => void {
  const interval = setInterval(async () => {
    try {
      const content = getContent()
      const metrics = getMetrics()
      if (content.trim().length > 0) {
        await storage.saveDraft(content, metrics)
        console.log('[Auto-save] Draft saved at', new Date().toLocaleTimeString())
      }
    } catch (error) {
      console.error('[Auto-save] Failed to save draft:', error)
    }
  }, intervalMs)

  // Return cleanup function
  return () => clearInterval(interval)
}

// Recovery helper
export async function checkForRecovery(): Promise<{
  content: string
  metrics: any
  timestamp: string
} | null> {
  const draft = await storage.getDraft()
  
  if (!draft) return null

  // Check if draft is less than 24 hours old
  const draftDate = new Date(draft.timestamp)
  const now = new Date()
  const hoursSince = (now.getTime() - draftDate.getTime()) / (1000 * 60 * 60)

  if (hoursSince < 24) {
    return draft
  }

  // Clean up old draft
  await storage.clearDraft()
  return null
}
