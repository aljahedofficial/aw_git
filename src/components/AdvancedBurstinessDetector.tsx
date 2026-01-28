import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'

interface AdvancedBurstinessDetectorProps {
  text: string
}

export default function AdvancedBurstinessDetector({ text }: AdvancedBurstinessDetectorProps) {
  // Parse sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  if (sentences.length === 0) {
    return null
  }

  // ========== LAYER 1: MICRO-BURSTINESS (SUB-SENTENCE LEVEL) ==========
  const calculateMicroBurstiness = () => {
    let clauseFragmentationScore = 0
    let punctuationEntropyScore = 0
    let syntacticDisruptionScore = 0

    sentences.forEach(sentence => {
      const trimmed = sentence.trim()
      
      // Clause fragmentation: count dependent/independent clause markers
      const clauses = trimmed.split(',').length
      const clauseWeight = clauses > 1 ? Math.abs(trimmed.indexOf(',') - trimmed.length / 2) / trimmed.length : 0
      clauseFragmentationScore += clauseWeight * 100

      // Punctuation entropy: variety of punctuation
      const commas = (trimmed.match(/,/g) || []).length
      const semicolons = (trimmed.match(/;/g) || []).length
      const emDashes = (trimmed.match(/—/g) || []).length
      const colons = (trimmed.match(/:/g) || []).length
      const punctuationVariety = [commas > 0, semicolons > 0, emDashes > 0, colons > 0].filter(Boolean).length
      punctuationEntropyScore += (punctuationVariety * 25) + (commas * 5)

      // Syntactic disruption: mid-sentence topic shifts and interruptions
      const interruptions = (trimmed.match(/\(|\[|—|,\s*(however|nevertheless|moreover|furthermore|indeed|actually)/gi) || []).length
      syntacticDisruptionScore += interruptions * 15
    })

    // Normalize scores
    const avgClause = clauseFragmentationScore / sentences.length
    const avgPunctuation = Math.min(100, punctuationEntropyScore / sentences.length)
    const avgDisruption = Math.min(100, syntacticDisruptionScore / sentences.length)
    
    const microScore = Math.round((avgClause + avgPunctuation + avgDisruption) / 3)
    
    return {
      score: Math.min(100, microScore),
      clauseFragmentation: Math.min(100, Math.round(avgClause)),
      punctuationEntropy: Math.min(100, Math.round(avgPunctuation)),
      syntacticDisruption: Math.min(100, Math.round(avgDisruption))
    }
  }

  // ========== LAYER 2: MESO-BURSTINESS (SENTENCE-TO-SENTENCE) ==========
  const calculateMesoBurstiness = () => {
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length)
    
    // Calculate consecutive sentence deltas
    const lengthDeltas: number[] = []
    for (let i = 1; i < sentenceLengths.length; i++) {
      const delta = Math.abs(sentenceLengths[i] - sentenceLengths[i - 1])
      const percentChange = (delta / sentenceLengths[i - 1]) * 100
      lengthDeltas.push(percentChange)
    }

    // Syntactic pivot detection
    const openingPatterns: string[] = []
    sentences.forEach(sentence => {
      const trimmed = sentence.trim()
      const firstWords = trimmed.split(/\s+/).slice(0, 3).join(' ').toLowerCase()
      openingPatterns.push(firstWords)
    })
    const uniqueOpenings = new Set(openingPatterns).size
    const syntacticVariety = (uniqueOpenings / sentences.length) * 100

    // Coefficient of Variation (CV)
    const mean = sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / sentenceLengths.length
    const stdDev = Math.sqrt(variance)
    const cv = (stdDev / mean) * 100 // Expressed as percentage

    // Determine AI probability based on CV
    let cvCategory = ''
    let cvScore = 0
    if (cv < 35) {
      cvCategory = 'High AI Probability (Uniform)'
      cvScore = 20 // Low score = AI-like
    } else if (cv < 65) {
      cvCategory = 'Human Baseline'
      cvScore = 70
    } else if (cv < 90) {
      cvCategory = 'Human (Natural Variation)'
      cvScore = 90
    } else {
      cvCategory = 'Adversarial Humanization (Suspicious)'
      cvScore = 40 // Suspiciously chaotic
    }

    return {
      cv: cv,
      cvCategory: cvCategory,
      cvScore: cvScore,
      avgDelta: lengthDeltas.length > 0 ? lengthDeltas.reduce((a, b) => a + b, 0) / lengthDeltas.length : 0,
      syntacticVariety: Math.round(syntacticVariety),
      lengthDeltas: lengthDeltas
    }
  }

  // ========== LAYER 3: MACRO-BURSTINESS (DISCOURSE ARCHITECTURE) ==========
  const calculateMacroBurstiness = () => {
    // Thematic chunking: detect idea density patterns
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0)
    const paragraphLengths = paragraphs.map(p => p.split(/\s+/).length)
    const paragraphVariance = paragraphLengths.length > 1
      ? Math.sqrt(paragraphLengths.reduce((sum, len) => {
          const mean = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length
          return sum + Math.pow(len - mean, 2)
        }, 0) / paragraphLengths.length)
      : 0

    // Digression depth: parenthetical nesting
    let maxNestingDepth = 0
    let totalNesting = 0
    sentences.forEach(sentence => {
      const opens = (sentence.match(/\(|\[/g) || []).length
      const closes = (sentence.match(/\)|\]/g) || []).length
      const nestingDepth = Math.min(opens, closes)
      totalNesting += nestingDepth
      maxNestingDepth = Math.max(maxNestingDepth, nestingDepth)
    })

    // Cognitive pause markers
    const pauseMarkers = [
      /\bactually\b/gi, /\bwait\b/gi, /\blook[,—]/gi, /\bthe point is\b/gi,
      /\bhonestly\b/gi, /\bfrankly\b/gi, /\blet me\b/gi, /\bin other words\b/gi,
      /\bthat is\b/gi, /\bi mean\b/gi
    ]
    let pauseCount = 0
    pauseMarkers.forEach(pattern => {
      pauseCount += (text.match(pattern) || []).length
    })

    const thematicScore = Math.min(100, paragraphVariance * 10)
    const digressionScore = Math.min(100, (maxNestingDepth * 30) + (totalNesting * 5))
    const pauseScore = Math.min(100, pauseCount * 20)

    const macroScore = Math.round((thematicScore + digressionScore + pauseScore) / 3)

    return {
      score: macroScore,
      thematicChunking: Math.round(thematicScore),
      digressionDepth: Math.round(digressionScore),
      cognitivePauses: pauseCount,
      pauseScore: Math.round(pauseScore)
    }
  }

  // ========== LAYER 4: ADVERSARIAL EVASION SIGNATURES ==========
  const detectAdversarialTactics = () => {
    const flags: string[] = []
    let adversarialScore = 100 // Start at 100, deduct for each red flag

    // 1. Random sentence length injection (variance without semantic cause)
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length)
    const transitions = [
      /\bhowever\b/gi, /\btherefore\b/gi, /\bmoreover\b/gi, /\bfurthermore\b/gi,
      /\bconsequently\b/gi, /\bnevertheless\b/gi
    ]
    let transitionCount = 0
    transitions.forEach(pattern => {
      transitionCount += (text.match(pattern) || []).length
    })
    const transitionRatio = transitionCount / sentences.length
    if (transitionRatio > 0.5) {
      flags.push('Excessive transitions (potential AI)')
      adversarialScore -= 20
    }

    // 2. Intentional grammatical errors in predictable locations
    const endingErrors = sentences.filter((s, i) => {
      if (i < sentences.length - 1) return false
      return /\b(aint|gonna|wanna|gotta)\b/gi.test(s)
    }).length
    if (endingErrors > 0) {
      flags.push('Errors cluster at paragraph ends')
      adversarialScore -= 15
    }

    // 3. Thesaurus-based lexical variation (unusual word choices)
    const unusualWords = [
      /\bpulchritudinous\b/gi, /\beloquent\b/gi, /\butilize\b/gi, /\bfacilitate\b/gi,
      /\bparadigm\b/gi, /\bsynergistic\b/gi, /\bholistic\b/gi
    ]
    let unusualCount = 0
    unusualWords.forEach(pattern => {
      unusualCount += (text.match(pattern) || []).length
    })
    if (unusualCount > 2) {
      flags.push('Thesaurus-style lexical inflation')
      adversarialScore -= 15
    }

    // 4. Faux-informal markers without register consistency
    const contractions = (text.match(/\b\w+\'(t|s|re|ve|ll|d)\b/gi) || []).length
    const fragments = sentences.filter(s => s.trim().split(/\s+/).length < 4).length
    const informalMarkers = (text.match(/\byou know\b/gi) || []).length
    const informalRatio = (contractions + fragments * 2 + informalMarkers * 3) / sentences.length
    if (informalRatio > 1.5) {
      flags.push('Overuse of informal markers')
      adversarialScore -= 10
    }

    // 5. Sentence length noise vs signal
    const mean = sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / sentenceLengths.length
    const cv = Math.sqrt(variance) / mean
    if (cv > 0.9 && flags.length > 0) {
      flags.push('Suspicious variance without semantic justification')
      adversarialScore -= 20
    }

    return {
      score: Math.max(0, adversarialScore),
      flags: flags
    }
  }

  // Calculate all layers
  const microBurstiness = calculateMicroBurstiness()
  const mesoBurstiness = calculateMesoBurstiness()
  const macroBurstiness = calculateMacroBurstiness()
  const adversarial = detectAdversarialTactics()

  // ========== BURSTINESS AUTHENTICITY INDEX (BAI) ==========
  const bai = Math.round(
    microBurstiness.score * 0.25 +
    mesoBurstiness.cvScore * 0.30 +
    macroBurstiness.score * 0.25 +
    adversarial.score * 0.20
  )

  // Interpretation
  let interpretation = ''
  let interpretationColor = ''
  let interpretationIcon = null
  if (bai <= 40) {
    interpretation = 'Synthetic Uniformity (Default AI Output)'
    interpretationColor = 'var(--color-danger)'
    interpretationIcon = <XCircle className="w-5 h-5" />
  } else if (bai <= 60) {
    interpretation = 'Edited/Paraphrased AI (Common Humanization)'
    interpretationColor = 'var(--color-warning)'
    interpretationIcon = <AlertTriangle className="w-5 h-5" />
  } else if (bai <= 85) {
    interpretation = 'Authentic Human or Sophisticated AI'
    interpretationColor = 'var(--color-success)'
    interpretationIcon = <CheckCircle className="w-5 h-5" />
  } else {
    interpretation = 'Extreme Variability (Possible Adversarial Over-optimization)'
    interpretationColor = 'var(--color-warning)'
    interpretationIcon = <AlertTriangle className="w-5 h-5" />
  }

  // Prepare radar chart data
  const radarData = [
    { layer: 'Micro', score: microBurstiness.score, fullMark: 100 },
    { layer: 'Meso-CV', score: mesoBurstiness.cvScore, fullMark: 100 },
    { layer: 'Macro', score: macroBurstiness.score, fullMark: 100 },
    { layer: 'Adversarial', score: adversarial.score, fullMark: 100 }
  ]

  // Prepare meso-burstiness delta chart
  const deltaChartData = mesoBurstiness.lengthDeltas.map((delta, index) => ({
    pair: `${index + 1}-${index + 2}`,
    delta: Math.round(delta)
  }))

  // Prepare micro-burstiness breakdown
  const microBreakdownData = [
    { component: 'Clause Frag', score: microBurstiness.clauseFragmentation },
    { component: 'Punctuation', score: microBurstiness.punctuationEntropy },
    { component: 'Syntax Disrupt', score: microBurstiness.syntacticDisruption }
  ]

  return (
    <div className="space-y-6">
      {/* BAI Score Header */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Burstiness Authenticity Index (BAI)
          </h3>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div style={{ color: interpretationColor }}>
              {interpretationIcon}
            </div>
            <span className="text-5xl font-bold" style={{ color: interpretationColor }}>
              {bai}
            </span>
            <span className="text-2xl" style={{ color: 'var(--color-text-secondary)' }}>/100</span>
          </div>
          <p className="text-lg font-medium" style={{ color: interpretationColor }}>
            {interpretation}
          </p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Micro (25%)
            </div>
            <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {microBurstiness.score}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Meso-CV (30%)
            </div>
            <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {mesoBurstiness.cvScore}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Macro (25%)
            </div>
            <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {macroBurstiness.score}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Adversarial (20%)
            </div>
            <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {adversarial.score}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Layer Radar Chart */}
      <div
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          Multi-Layer Burstiness Profile
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="layer" 
              tick={{ fill: 'var(--color-text)', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}
            />
            <Radar 
              name="Score" 
              dataKey="score" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary)" 
              fillOpacity={0.6} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-tertiary)', 
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                color: 'var(--color-text)'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Layer 1: Micro-Burstiness */}
      <div
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          Layer 1: Micro-Burstiness (Sub-Sentence Level)
        </h4>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Intra-sentence rhythm irregularities - AI avoids "messy" punctuation
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={microBreakdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="component" 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text)', fontSize: 11 }}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-tertiary)', 
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                color: 'var(--color-text)'
              }}
            />
            <Bar dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>Analysis:</strong> Score {microBurstiness.score}/100. 
            {microBurstiness.score < 30 && ' Clean syntax suggests AI (no messy punctuation).'}
            {microBurstiness.score >= 30 && microBurstiness.score < 70 && ' Moderate irregularity detected.'}
            {microBurstiness.score >= 70 && ' Disruptive, "messy" rhythm indicates human writing.'}
          </p>
        </div>
      </div>

      {/* Layer 2: Meso-Burstiness */}
      <div
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          Layer 2: Meso-Burstiness (Sentence-to-Sentence)
        </h4>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Coefficient of Variation (CV): {mesoBurstiness.cv.toFixed(2)}% - {mesoBurstiness.cvCategory}
        </p>
        
        {deltaChartData.length > 0 && (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={deltaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="pair" 
                  stroke="var(--color-text-secondary)"
                  tick={{ fill: 'var(--color-text)', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                  label={{ value: '% Change', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-bg-tertiary)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    color: 'var(--color-text)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="delta" 
                  stroke="var(--color-info)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-info)', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Avg Length Delta
                </div>
                <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {mesoBurstiness.avgDelta.toFixed(1)}%
                </div>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Syntactic Variety
                </div>
                <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {mesoBurstiness.syntacticVariety}%
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>ZeroGPT Detection:</strong> CV &lt; 0.35 = High AI probability | CV &gt; 0.65 = Human baseline | CV &gt; 0.90 = Adversarial humanization (suspiciously chaotic)
          </p>
        </div>
      </div>

      {/* Layer 3: Macro-Burstiness */}
      <div
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          Layer 3: Macro-Burstiness (Discourse Architecture)
        </h4>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Paragraph-level rhythmic structure and cognitive patterns
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Thematic Chunking
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
              {macroBurstiness.thematicChunking}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Irregular idea bursts
            </div>
          </div>
          <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Digression Depth
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
              {macroBurstiness.digressionDepth}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Parenthetical nesting
            </div>
          </div>
          <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Cognitive Pauses
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
              {macroBurstiness.cognitivePauses}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Metadiscursive markers
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>Turnitin AI Indicator:</strong> Humans use irregular idea bursts with self-interruption. AI maintains thematic momentum too consistently.
          </p>
        </div>
      </div>

      {/* Layer 4: Adversarial Evasion */}
      {adversarial.flags.length > 0 && (
        <div
          className="rounded-lg border p-4"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-danger)',
            borderWidth: '2px'
          }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-danger)' }} />
            <h4 className="text-lg font-semibold" style={{ color: 'var(--color-danger)' }}>
              Layer 4: Adversarial Evasion Signatures Detected
            </h4>
          </div>
          <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            Common "humanization" tactics that detectors now track
          </p>
          <ul className="space-y-2">
            {adversarial.flags.map((flag, index) => (
              <li key={index} className="flex items-start space-x-2">
                <XCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--color-danger)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{flag}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text)' }}>
              <strong>Adversarial Score:</strong> {adversarial.score}/100 (100 = no evasion signals, 0 = obvious manipulation)
            </p>
          </div>
        </div>
      )}

      {/* Detector-Specific Notes */}
      <div
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <Info className="w-5 h-5" style={{ color: 'var(--color-info)' }} />
          <h4 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
            Detector Optimization Notes
          </h4>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              🎯 Turnitin Performance:
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {bai > 60 ? 'Text shows varied writing fingerprint. Micro-irregularities may trigger lower AI score.' : 'Uniform patterns detected. Likely to trigger Authorship Investigate methodology.'}
            </p>
          </div>
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              🔍 ZeroGPT Performance:
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              CV {mesoBurstiness.cv.toFixed(2)}% - {mesoBurstiness.cvCategory}. 
              {mesoBurstiness.cv < 35 && ' High detection probability.'}
              {mesoBurstiness.cv >= 35 && mesoBurstiness.cv < 90 && ' Should pass most checks.'}
              {mesoBurstiness.cv >= 90 && ' May trigger adversarial flags.'}
            </p>
          </div>
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              📊 GPTZero Performance:
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {macroBurstiness.cognitivePauses > 0 ? 'Cognitive pause markers detected - positive signal for human writing.' : 'No metadiscursive markers found - may appear overly polished.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
