// Synonym and paraphrase suggestion system

interface Suggestion {
  type: 'synonym' | 'paraphrase'
  original: string
  suggestion: string
  context?: string
}

// Common academic synonyms
const synonymMap: Record<string, string[]> = {
  'important': ['significant', 'crucial', 'vital', 'essential', 'critical'],
  'show': ['demonstrate', 'illustrate', 'reveal', 'indicate', 'display'],
  'use': ['utilize', 'employ', 'apply', 'implement', 'adopt'],
  'make': ['create', 'produce', 'generate', 'construct', 'develop'],
  'get': ['obtain', 'acquire', 'receive', 'gain', 'secure'],
  'give': ['provide', 'offer', 'supply', 'present', 'deliver'],
  'think': ['believe', 'consider', 'assume', 'suppose', 'contemplate'],
  'help': ['assist', 'aid', 'support', 'facilitate', 'enable'],
  'change': ['modify', 'alter', 'transform', 'adjust', 'revise'],
  'study': ['examine', 'investigate', 'analyze', 'explore', 'research'],
  'find': ['discover', 'identify', 'determine', 'locate', 'ascertain'],
  'different': ['distinct', 'diverse', 'varied', 'disparate', 'dissimilar'],
  'same': ['identical', 'similar', 'equivalent', 'comparable', 'analogous'],
  'good': ['effective', 'beneficial', 'positive', 'favorable', 'advantageous'],
  'bad': ['detrimental', 'negative', 'adverse', 'unfavorable', 'harmful'],
  'big': ['substantial', 'significant', 'considerable', 'extensive', 'major'],
  'small': ['minor', 'limited', 'minimal', 'modest', 'negligible'],
  'many': ['numerous', 'various', 'multiple', 'several', 'abundant'],
  'because': ['since', 'as', 'due to', 'owing to', 'given that'],
  'but': ['however', 'nevertheless', 'yet', 'although', 'whereas'],
  'also': ['additionally', 'furthermore', 'moreover', 'likewise', 'similarly'],
  'very': ['extremely', 'highly', 'particularly', 'exceptionally', 'remarkably'],
  'understand': ['comprehend', 'grasp', 'perceive', 'recognize', 'appreciate'],
  'explain': ['clarify', 'elucidate', 'describe', 'interpret', 'expound'],
  'argue': ['contend', 'assert', 'maintain', 'claim', 'propose'],
  'suggest': ['propose', 'recommend', 'indicate', 'imply', 'advise'],
  'discuss': ['examine', 'explore', 'analyze', 'consider', 'address'],
  'increase': ['enhance', 'augment', 'expand', 'elevate', 'amplify'],
  'decrease': ['reduce', 'diminish', 'lower', 'minimize', 'lessen']
}

// Common phrase paraphrases
const phraseParaphrases: Record<string, string[]> = {
  'in order to': ['to', 'so as to', 'for the purpose of'],
  'due to the fact that': ['because', 'since', 'as'],
  'in spite of': ['despite', 'although', 'even though'],
  'as a result of': ['because of', 'due to', 'resulting from'],
  'it is important to note that': ['notably', 'significantly', 'importantly'],
  'a large number of': ['many', 'numerous', 'several'],
  'at the present time': ['currently', 'now', 'presently'],
  'in the event that': ['if', 'should', 'when'],
  'in addition to': ['besides', 'along with', 'as well as'],
  'with regard to': ['regarding', 'concerning', 'about'],
  'for the purpose of': ['to', 'for', 'in order to'],
  'in the process of': ['during', 'while', 'when'],
  'on the other hand': ['however', 'conversely', 'alternatively'],
  'take into consideration': ['consider', 'account for', 'factor in'],
  'make use of': ['use', 'utilize', 'employ'],
  'by means of': ['by', 'through', 'via'],
  'in the majority of cases': ['usually', 'typically', 'generally'],
  'a variety of': ['various', 'several', 'many'],
  'in conclusion': ['finally', 'ultimately', 'in summary'],
  'it can be seen that': ['evidently', 'clearly', 'apparently']
}

export function generateSynonym(word: string): string | null {
  const lowerWord = word.toLowerCase()
  const synonyms = synonymMap[lowerWord]
  if (synonyms && synonyms.length > 0) {
    // Return a random synonym
    return synonyms[Math.floor(Math.random() * synonyms.length)]
  }
  return null
}

export function generateParaphrase(phrase: string): string | null {
  const lowerPhrase = phrase.toLowerCase().trim()
  
  // Check for exact phrase matches
  for (const [original, paraphrases] of Object.entries(phraseParaphrases)) {
    if (lowerPhrase.includes(original)) {
      return paraphrases[Math.floor(Math.random() * paraphrases.length)]
    }
  }
  
  // Generate generic paraphrase suggestions based on structure
  if (phrase.split(' ').length >= 5) {
    return generateGenericParaphrase(phrase)
  }
  
  return null
}

function generateGenericParaphrase(sentence: string): string {
  // Simple paraphrase patterns
  const lowerSentence = sentence.toLowerCase()
  const words = sentence.split(' ')
  
  // If sentence starts with common words, suggest alternatives
  if (lowerSentence.startsWith('this shows that')) {
    return 'This demonstrates that...'
  }
  if (lowerSentence.startsWith('it is important')) {
    return 'Significantly, this...'
  }
  if (lowerSentence.startsWith('there are many')) {
    return 'Numerous factors...'
  }
  if (lowerSentence.startsWith('in this study')) {
    return 'The present research...'
  }
  if (lowerSentence.startsWith('research shows')) {
    return 'Evidence indicates...'
  }
  if (lowerSentence.startsWith('it has been')) {
    return 'Historically,... OR Studies have found...'
  }
  if (lowerSentence.startsWith('the fact that')) {
    return 'Given that..., it is clear that...'
  }
  if (lowerSentence.includes('can be seen')) {
    return 'It is evident that...'
  }
  if (lowerSentence.includes('such as')) {
    return 'For instance,... OR Including...'
  }
  if (lowerSentence.includes('according to')) {
    return 'As [author] notes,... OR Research by [author] suggests...'
  }
  
  // For longer sentences, suggest restructuring
  if (words.length > 20) {
    return 'Consider breaking this into two shorter sentences or restructuring for clarity.'
  }
  if (words.length > 15) {
    return 'Try rephrasing with active voice or using a different sentence structure.'
  }
  if (words.length > 10) {
    return 'Consider using a more direct structure or shorter sentence.'
  }
  
  return 'Try rephrasing with different vocabulary or sentence structure.'
}

export function findMatchedWords(text: string, sourceText: string): string[] {
  const sourceLower = sourceText.toLowerCase()
  const textWords = text.split(/\s+/)
  const matches: string[] = []
  
  // Find 3-7 word sequences that match
  for (let i = 0; i < textWords.length; i++) {
    for (let len = 3; len <= 7; len++) {
      if (i + len > textWords.length) break
      
      const sequence = textWords.slice(i, i + len)
      const sequenceLower = sequence.join(' ').toLowerCase()
      
      // Check if this sequence exists in source
      if (sourceLower.includes(sequenceLower) && sequenceLower.length > 10) {
        const originalSequence = sequence.join(' ')
        // Avoid duplicates
        if (!matches.some(m => m.toLowerCase() === sequenceLower)) {
          matches.push(originalSequence)
        }
      }
    }
  }
  
  return matches
}

export function generateSuggestions(matchedPhrase: string): Suggestion[] {
  const suggestions: Suggestion[] = []
  const words = matchedPhrase.split(/\s+/)
  
  // Generate synonym suggestions for individual words
  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase()
    const synonym = generateSynonym(cleanWord)
    if (synonym) {
      suggestions.push({
        type: 'synonym',
        original: word,
        suggestion: synonym,
        context: matchedPhrase
      })
    }
  })
  
  // Generate paraphrase for the whole phrase
  const paraphrase = generateParaphrase(matchedPhrase)
  if (paraphrase) {
    suggestions.push({
      type: 'paraphrase',
      original: matchedPhrase,
      suggestion: paraphrase,
      context: matchedPhrase
    })
  }
  
  return suggestions
}
