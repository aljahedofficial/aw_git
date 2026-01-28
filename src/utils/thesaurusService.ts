// Enhanced Thesaurus Service with API Integration and Context Awareness
import nlp from 'compromise'
import { thesaurus as manualThesaurus } from './thesaurus'

// Datamuse API endpoint (free, no API key required)
const DATAMUSE_API = 'https://api.datamuse.com/words'

// Cache for API results to reduce requests
const apiCache = new Map<string, SynonymResult[]>()
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

interface SynonymResult {
  word: string
  score: number
  partOfSpeech?: string
  frequency?: number
  register?: 'academic' | 'casual' | 'neutral'
}

interface ThesaurusOptions {
  context?: 'academic' | 'casual' | 'neutral'
  partOfSpeech?: string
  maxResults?: number
  includeFrequency?: boolean
}

/**
 * Detect part of speech for a word using Compromise.js
 */
export function detectPartOfSpeech(word: string, context?: string): string {
  if (!word) return 'unknown'
  
  try {
    // If we have context, analyze the full context
    if (context) {
      const doc = nlp(context)
      const match = doc.match(word)
      if (match.found) {
        const terms = match.json()[0]?.terms || []
        const term = terms.find((t: any) => t.text.toLowerCase() === word.toLowerCase())
        if (term?.tags) {
          // Map tags to simple POS
          if (term.tags.includes('Verb')) return 'verb'
          if (term.tags.includes('Noun')) return 'noun'
          if (term.tags.includes('Adjective')) return 'adjective'
          if (term.tags.includes('Adverb')) return 'adverb'
        }
      }
    }
    
    // Fallback: analyze word alone
    const doc = nlp(word)
    if (doc.verbs().found) return 'verb'
    if (doc.nouns().found) return 'noun'
    if (doc.adjectives().found) return 'adjective'
    if (doc.adverbs().found) return 'adverb'
    
    return 'unknown'
  } catch (e) {
    console.warn('POS detection failed:', e)
    return 'unknown'
  }
}

/**
 * Classify word register based on patterns and common word lists
 */
function classifyRegister(word: string): 'academic' | 'casual' | 'neutral' {
  const academicPatterns = [
    'utilize', 'commence', 'terminate', 'facilitate', 'substantiate',
    'demonstrate', 'elucidate', 'corroborate', 'ascertain', 'ameliorate',
    'paradigm', 'hypothesis', 'methodology', 'empirical', 'theoretical',
    'furthermore', 'nevertheless', 'consequently', 'moreover', 'notwithstanding'
  ]
  
  const casualPatterns = [
    'get', 'got', 'stuff', 'thing', 'guy', 'nice', 'cool', 'awesome',
    'pretty', 'really', 'very', 'super', 'kinda', 'gonna', 'wanna'
  ]
  
  const lowerWord = word.toLowerCase()
  
  if (academicPatterns.some(p => lowerWord.includes(p))) return 'academic'
  if (casualPatterns.some(p => lowerWord.includes(p))) return 'casual'
  
  // Check word length and complexity as heuristic
  if (word.length > 10) return 'academic'
  if (word.length < 5) return 'casual'
  
  return 'neutral'
}

/**
 * Fetch synonyms from Datamuse API
 */
async function fetchFromAPI(word: string, options: ThesaurusOptions = {}): Promise<SynonymResult[]> {
  try {
    // Check cache first
    const cacheKey = `${word}-${options.partOfSpeech || 'any'}`
    const cached = apiCache.get(cacheKey)
    if (cached) {
      return cached
    }
    
    // Build API query
    const params = new URLSearchParams({
      ml: word, // means-like (synonyms)
      max: '50', // Get more results for filtering
      md: 'pf' // Include part of speech and frequency
    })
    
    const response = await fetch(`${DATAMUSE_API}?${params}`)
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const data = await response.json()
    
    // Transform API results
    const results: SynonymResult[] = data
      .filter((item: any) => item.word !== word.toLowerCase())
      .map((item: any) => {
        const tags = item.tags || []
        const pos = tags.find((t: string) => ['n', 'v', 'adj', 'adv'].includes(t))
        
        return {
          word: item.word,
          score: item.score || 0,
          partOfSpeech: mapPOSTag(pos),
          frequency: parseFloat(tags.find((t: string) => t.startsWith('f:'))?.split(':')[1] || '0'),
          register: classifyRegister(item.word)
        }
      })
      .sort((a: SynonymResult, b: SynonymResult) => {
        // Primary sort by score
        if (b.score !== a.score) return b.score - a.score
        // Secondary sort by frequency
        return (b.frequency || 0) - (a.frequency || 0)
      })
    
    // Cache results
    apiCache.set(cacheKey, results)
    setTimeout(() => apiCache.delete(cacheKey), CACHE_DURATION)
    
    return results
  } catch (error) {
    console.warn('API fetch failed:', error)
    return []
  }
}

/**
 * Map Datamuse POS tags to simple forms
 */
function mapPOSTag(tag?: string): string {
  if (!tag) return 'unknown'
  const mapping: Record<string, string> = {
    'n': 'noun',
    'v': 'verb',
    'adj': 'adjective',
    'adv': 'adverb'
  }
  return mapping[tag] || 'unknown'
}

/**
 * Get synonyms from manual thesaurus
 */
function getManualSynonyms(word: string): SynonymResult[] {
  const normalized = word.toLowerCase().trim()
  const synonyms = manualThesaurus[normalized] || []
  
  return synonyms.map((syn, index) => ({
    word: syn,
    score: 100 - index * 2, // Higher score for earlier entries
    register: classifyRegister(syn),
    frequency: 100 - index // Estimated frequency
  }))
}

/**
 * Filter synonyms based on options
 */
function filterSynonyms(
  synonyms: SynonymResult[],
  options: ThesaurusOptions
): SynonymResult[] {
  let filtered = [...synonyms]
  
  // Filter by part of speech
  if (options.partOfSpeech && options.partOfSpeech !== 'unknown') {
    filtered = filtered.filter(s => 
      !s.partOfSpeech || 
      s.partOfSpeech === 'unknown' || 
      s.partOfSpeech === options.partOfSpeech
    )
  }
  
  // Filter by register/context
  if (options.context && options.context !== 'neutral') {
    filtered = filtered.filter(s => 
      s.register === options.context || s.register === 'neutral'
    )
  }
  
  // Sort by frequency if requested
  if (options.includeFrequency) {
    filtered.sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
  }
  
  // Limit results
  if (options.maxResults) {
    filtered = filtered.slice(0, options.maxResults)
  }
  
  return filtered
}

/**
 * Main function: Get enhanced synonyms with all features
 */
export async function getEnhancedSynonyms(
  word: string,
  fullContext?: string,
  options: ThesaurusOptions = {}
): Promise<string[]> {
  if (!word || word.length < 2) return []
  
  try {
    // Detect part of speech if not provided
    if (!options.partOfSpeech) {
      options.partOfSpeech = detectPartOfSpeech(word, fullContext)
    }
    
    // Try API first
    let apiResults: SynonymResult[] = []
    try {
      apiResults = await fetchFromAPI(word, options)
    } catch (e) {
      console.warn('API call failed, using manual thesaurus')
    }
    
    // Get manual fallback
    const manualResults = getManualSynonyms(word)
    
    // Merge results (API takes priority, manual as fallback)
    const allResults = [...apiResults]
    
    // Add manual results that aren't already present
    for (const manual of manualResults) {
      if (!allResults.find(r => r.word.toLowerCase() === manual.word.toLowerCase())) {
        allResults.push(manual)
      }
    }
    
    // Apply filters
    const filtered = filterSynonyms(allResults, {
      ...options,
      maxResults: options.maxResults || 10
    })
    
    // Return just the words
    return filtered.map(r => r.word)
  } catch (error) {
    console.error('Enhanced synonym lookup failed:', error)
    // Final fallback to simple manual lookup
    return manualThesaurus[word.toLowerCase()] || []
  }
}

/**
 * Synchronous version for backward compatibility
 * Uses only manual thesaurus
 */
export function getSynonymsSync(
  word: string,
  options: ThesaurusOptions = {}
): string[] {
  const results = getManualSynonyms(word)
  const filtered = filterSynonyms(results, {
    ...options,
    maxResults: options.maxResults || 10
  })
  return filtered.map(r => r.word)
}

/**
 * Check if word has synonyms (checks manual thesaurus only for performance)
 */
export function hasSynonyms(word: string): boolean {
  return word.toLowerCase() in manualThesaurus
}

/**
 * Get available words from manual thesaurus
 */
export function getAvailableWords(): string[] {
  return Object.keys(manualThesaurus)
}
