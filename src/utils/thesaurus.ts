// Comprehensive Thesaurus for Academic & General Writing
// Organized by word category for efficient lookup

const thesaurus: Record<string, string[]> = {
  // Common verbs
  'say': ['state', 'express', 'mention', 'declare', 'announce', 'assert', 'claim', 'propose', 'suggest', 'indicate'],
  'said': ['stated', 'expressed', 'mentioned', 'declared', 'announced', 'asserted', 'claimed', 'proposed', 'suggested', 'indicated'],
  'think': ['believe', 'consider', 'suppose', 'assume', 'presume', 'conceive', 'deem', 'regard', 'reckon', 'maintain'],
  'thought': ['believed', 'considered', 'supposed', 'assumed', 'presumed', 'conceived', 'deemed', 'regarded', 'reckoned', 'maintained'],
  'get': ['obtain', 'acquire', 'receive', 'secure', 'gain', 'procure', 'attain', 'retrieve', 'fetch', 'collect'],
  'got': ['obtained', 'acquired', 'received', 'secured', 'gained', 'procured', 'attained', 'retrieved', 'fetched', 'collected'],
  'make': ['create', 'produce', 'construct', 'fabricate', 'manufacture', 'build', 'generate', 'form', 'establish', 'develop'],
  'made': ['created', 'produced', 'constructed', 'fabricated', 'manufactured', 'built', 'generated', 'formed', 'established', 'developed'],
  'go': ['proceed', 'advance', 'move', 'travel', 'progress', 'venture', 'depart', 'journey', 'traverse', 'shift'],
  'went': ['proceeded', 'advanced', 'moved', 'traveled', 'progressed', 'ventured', 'departed', 'journeyed', 'traversed', 'shifted'],
  'see': ['observe', 'perceive', 'notice', 'witness', 'discern', 'behold', 'view', 'sight', 'recognize', 'detect'],
  'saw': ['observed', 'perceived', 'noticed', 'witnessed', 'discerned', 'beheld', 'viewed', 'sighted', 'recognized', 'detected'],
  'know': ['understand', 'comprehend', 'recognize', 'acknowledge', 'apprehend', 'perceive', 'grasp', 'realize', 'discern', 'fathom'],
  'knew': ['understood', 'comprehended', 'recognized', 'acknowledged', 'apprehended', 'perceived', 'grasped', 'realized', 'discerned', 'fathomed'],
  'want': ['desire', 'wish', 'need', 'require', 'crave', 'seek', 'long', 'yearn', 'covet', 'prefer'],
  'wanted': ['desired', 'wished', 'needed', 'required', 'craved', 'sought', 'longed', 'yearned', 'coveted', 'preferred'],
  'use': ['employ', 'utilize', 'apply', 'exploit', 'exercise', 'operate', 'deploy', 'implement', 'wield', 'harness'],
  'used': ['employed', 'utilized', 'applied', 'exploited', 'exercised', 'operated', 'deployed', 'implemented', 'wielded', 'harnessed'],
  'try': ['attempt', 'endeavor', 'strive', 'seek', 'essay', 'undertake', 'venture', 'test', 'experiment', 'assay'],
  'tried': ['attempted', 'endeavored', 'strived', 'sought', 'essayed', 'undertook', 'ventured', 'tested', 'experimented', 'assayed'],
  'show': ['display', 'reveal', 'demonstrate', 'exhibit', 'illustrate', 'present', 'expose', 'manifest', 'depict', 'portray'],
  'showed': ['displayed', 'revealed', 'demonstrated', 'exhibited', 'illustrated', 'presented', 'exposed', 'manifested', 'depicted', 'portrayed'],
  'find': ['discover', 'locate', 'uncover', 'detect', 'identify', 'ascertain', 'retrieve', 'encounter', 'stumble', 'expose'],
  'found': ['discovered', 'located', 'uncovered', 'detected', 'identified', 'ascertained', 'retrieved', 'encountered', 'stumbled', 'exposed'],
  'give': ['provide', 'supply', 'grant', 'offer', 'donate', 'bestow', 'impart', 'present', 'deliver', 'furnish'],
  'gave': ['provided', 'supplied', 'granted', 'offered', 'donated', 'bestowed', 'imparted', 'presented', 'delivered', 'furnished'],
  'tell': ['inform', 'notify', 'advise', 'report', 'communicate', 'disclose', 'relate', 'recount', 'articulate', 'convey'],
  'told': ['informed', 'notified', 'advised', 'reported', 'communicated', 'disclosed', 'related', 'recounted', 'articulated', 'conveyed'],
  'become': ['transform', 'evolve', 'develop', 'grow', 'turn', 'convert', 'shift', 'transition', 'metamorphose', 'mature'],
  'became': ['transformed', 'evolved', 'developed', 'grew', 'turned', 'converted', 'shifted', 'transitioned', 'metamorphosed', 'matured'],
  'work': ['labor', 'toil', 'operate', 'function', 'perform', 'engage', 'serve', 'execute', 'proceed', 'succeed'],
  'worked': ['labored', 'toiled', 'operated', 'functioned', 'performed', 'engaged', 'served', 'executed', 'proceeded', 'succeeded'],
  'call': ['name', 'designate', 'label', 'term', 'style', 'dub', 'summon', 'contact', 'appeal', 'invoke'],
  'called': ['named', 'designated', 'labeled', 'termed', 'styled', 'dubbed', 'summoned', 'contacted', 'appealed', 'invoked'],
  'ask': ['inquire', 'question', 'interrogate', 'query', 'pose', 'solicit', 'request', 'appeal', 'demand', 'petition'],
  'asked': ['inquired', 'questioned', 'interrogated', 'queried', 'posed', 'solicited', 'requested', 'appealed', 'demanded', 'petitioned'],
  'help': ['assist', 'aid', 'support', 'facilitate', 'contribute', 'benefit', 'serve', 'succor', 'relieve', 'promote'],
  'helped': ['assisted', 'aided', 'supported', 'facilitated', 'contributed', 'benefited', 'served', 'succored', 'relieved', 'promoted'],
  'talk': ['converse', 'communicate', 'dialogue', 'discuss', 'chat', 'discourse', 'speak', 'interact', 'confer', 'consult'],
  'talked': ['conversed', 'communicated', 'dialogued', 'discussed', 'chatted', 'discoursed', 'spoke', 'interacted', 'conferred', 'consulted'],
  'turn': ['rotate', 'spin', 'revolve', 'pivot', 'shift', 'convert', 'transform', 'direct', 'orient', 'maneuver'],
  'turned': ['rotated', 'spun', 'revolved', 'pivoted', 'shifted', 'converted', 'transformed', 'directed', 'oriented', 'maneuvered'],
  'start': ['begin', 'commence', 'initiate', 'launch', 'embark', 'trigger', 'open', 'establish', 'introduce', 'undertake'],
  'started': ['began', 'commenced', 'initiated', 'launched', 'embarked', 'triggered', 'opened', 'established', 'introduced', 'undertook'],
  'keep': ['retain', 'maintain', 'preserve', 'sustain', 'uphold', 'persist', 'continue', 'harbor', 'store', 'hold'],
  'kept': ['retained', 'maintained', 'preserved', 'sustained', 'upheld', 'persisted', 'continued', 'harbored', 'stored', 'held'],
  'follow': ['pursue', 'track', 'trail', 'chase', 'adhere', 'observe', 'comply', 'emulate', 'succeed', 'ensue'],
  'followed': ['pursued', 'tracked', 'trailed', 'chased', 'adhered', 'observed', 'complied', 'emulated', 'succeeded', 'ensued'],
  'allow': ['permit', 'enable', 'authorize', 'consent', 'grant', 'tolerate', 'afford', 'sanction', 'empower', 'facilitate'],
  'allowed': ['permitted', 'enabled', 'authorized', 'consented', 'granted', 'tolerated', 'afforded', 'sanctioned', 'empowered', 'facilitated'],
  'add': ['append', 'attach', 'annex', 'incorporate', 'adjoin', 'combine', 'sum', 'increase', 'supplement', 'augment'],
  'added': ['appended', 'attached', 'annexed', 'incorporated', 'adjoined', 'combined', 'summed', 'increased', 'supplemented', 'augmented'],
  'spend': ['expend', 'consume', 'invest', 'disburse', 'allocate', 'squander', 'waste', 'exhaust', 'deplete', 'employ'],
  'spent': ['expended', 'consumed', 'invested', 'disbursed', 'allocated', 'squandered', 'wasted', 'exhausted', 'depleted', 'employed'],
  'write': ['compose', 'author', 'draft', 'inscribe', 'scribe', 'pen', 'record', 'document', 'articulate', 'express'],
  'wrote': ['composed', 'authored', 'drafted', 'inscribed', 'scribed', 'penned', 'recorded', 'documented', 'articulated', 'expressed'],
  'read': ['peruse', 'scan', 'skim', 'study', 'review', 'examine', 'interpret', 'decipher', 'absorb', 'understand'],
  'develop': ['expand', 'evolve', 'advance', 'progress', 'mature', 'cultivate', 'construct', 'elaborate', 'unfold', 'refine'],
  'provide': ['supply', 'furnish', 'offer', 'afford', 'grant', 'yield', 'contribute', 'deliver', 'render', 'present'],
  'increase': ['augment', 'expand', 'enhance', 'amplify', 'enlarge', 'escalate', 'boost', 'elevate', 'heighten', 'intensify'],
  'improve': ['enhance', 'ameliorate', 'refine', 'upgrade', 'strengthen', 'perfect', 'optimize', 'better', 'advance', 'elevate'],
  'continue': ['persist', 'proceed', 'maintain', 'sustain', 'prolong', 'extend', 'resume', 'persevere', 'perpetuate', 'endure'],
  'change': ['alter', 'modify', 'transform', 'convert', 'adjust', 'revise', 'vary', 'shift', 'amend', 'adapt'],
  'explain': ['clarify', 'elucidate', 'expound', 'interpret', 'illuminate', 'detail', 'articulate', 'describe', 'account', 'justify'],
  'analyze': ['examine', 'investigate', 'scrutinize', 'study', 'dissect', 'evaluate', 'assess', 'appraise', 'critique', 'parse'],
  'conclude': ['finish', 'end', 'complete', 'terminate', 'close', 'determine', 'infer', 'deduce', 'resolve', 'finalize'],
  'suggest': ['propose', 'recommend', 'indicate', 'imply', 'intimate', 'insinuate', 'hint', 'advise', 'counsel', 'urge'],
  'require': ['demand', 'necessitate', 'need', 'call', 'mandate', 'exact', 'insist', 'stipulate', 'compel', 'oblige'],
  'examine': ['inspect', 'scrutinize', 'investigate', 'study', 'survey', 'check', 'explore', 'analyze', 'assess', 'review'],
  'support': ['uphold', 'sustain', 'buttress', 'corroborate', 'validate', 'endorse', 'back', 'champion', 'defend', 'strengthen'],
  'argue': ['contend', 'assert', 'maintain', 'debate', 'dispute', 'reason', 'plead', 'advocate', 'present', 'submit'],
  'prove': ['demonstrate', 'establish', 'verify', 'validate', 'confirm', 'substantiate', 'authenticate', 'document', 'justify', 'show'],

  // Common adjectives
  'good': ['excellent', 'fine', 'superior', 'quality', 'positive', 'beneficial', 'favorable', 'admirable', 'commendable', 'outstanding'],
  'bad': ['poor', 'inferior', 'unfavorable', 'negative', 'detrimental', 'undesirable', 'adverse', 'harmful', 'inadequate', 'deficient'],
  'big': ['large', 'vast', 'extensive', 'enormous', 'immense', 'substantial', 'considerable', 'significant', 'monumental', 'tremendous'],
  'small': ['tiny', 'petite', 'diminutive', 'miniature', 'insignificant', 'negligible', 'minimal', 'meager', 'scanty', 'modest'],
  'important': ['significant', 'crucial', 'essential', 'vital', 'critical', 'fundamental', 'paramount', 'central', 'principal', 'chief'],
  'interesting': ['engaging', 'compelling', 'fascinating', 'captivating', 'intriguing', 'absorbing', 'engrossing', 'enthralling', 'gripping', 'riveting'],
  'different': ['distinct', 'various', 'diverse', 'dissimilar', 'divergent', 'disparate', 'heterogeneous', 'unlike', 'differential', 'variant'],
  'similar': ['alike', 'comparable', 'analogous', 'parallel', 'equivalent', 'correspondent', 'kindred', 'uniform', 'homogeneous', 'matching'],
  'strong': ['robust', 'powerful', 'vigorous', 'sturdy', 'formidable', 'potent', 'forceful', 'resilient', 'muscular', 'mighty'],
  'weak': ['frail', 'feeble', 'fragile', 'delicate', 'infirm', 'powerless', 'impotent', 'vulnerable', 'insubstantial', 'tenuous'],
  'clear': ['distinct', 'lucid', 'transparent', 'unambiguous', 'evident', 'obvious', 'apparent', 'plain', 'manifest', 'perspicuous'],
  'difficult': ['challenging', 'arduous', 'tough', 'complex', 'complicated', 'intricate', 'demanding', 'formidable', 'laborious', 'onerous'],
  'easy': ['simple', 'effortless', 'straightforward', 'facile', 'uncomplicated', 'elementary', 'basic', 'undemanding', 'painless', 'convenient'],
  'fast': ['swift', 'rapid', 'quick', 'speedy', 'hasty', 'expeditious', 'brisk', 'prompt', 'fleet', 'accelerated'],
  'slow': ['sluggish', 'gradual', 'leisurely', 'dilatory', 'tardy', 'dawdling', 'unhurried', 'deliberate', 'pokey', 'lagging'],
  'happy': ['joyful', 'cheerful', 'content', 'delighted', 'pleased', 'elated', 'jubilant', 'blissful', 'ecstatic', 'satisfied'],
  'sad': ['sorrowful', 'melancholic', 'dejected', 'despondent', 'forlorn', 'mournful', 'disconsolate', 'gloomy', 'downcast', 'crestfallen'],
  'new': ['novel', 'recent', 'fresh', 'modern', 'contemporary', 'original', 'unprecedented', 'latest', 'up-to-date', 'innovative'],
  'old': ['ancient', 'archaic', 'obsolete', 'dated', 'outmoded', 'venerable', 'aged', 'antique', 'timeworn', 'antiquated'],
  'beautiful': ['lovely', 'gorgeous', 'stunning', 'handsome', 'attractive', 'exquisite', 'elegant', 'picturesque', 'radiant', 'sublime'],
  'ugly': ['hideous', 'unsightly', 'grotesque', 'repugnant', 'dreadful', 'abominable', 'repulsive', 'ghastly', 'unattractive', 'homely'],
  'common': ['frequent', 'typical', 'ordinary', 'usual', 'standard', 'conventional', 'prevalent', 'widespread', 'routine', 'mundane'],
  'rare': ['uncommon', 'infrequent', 'scarce', 'exceptional', 'unique', 'singular', 'unusual', 'remarkable', 'sporadic', 'seldom'],
  'true': ['accurate', 'correct', 'factual', 'genuine', 'authentic', 'veracious', 'valid', 'legitimate', 'sincere', 'honest'],
  'false': ['incorrect', 'inaccurate', 'untrue', 'erroneous', 'fraudulent', 'fabricated', 'spurious', 'counterfeit', 'deceptive', 'misleading'],
  'possible': ['feasible', 'viable', 'probable', 'conceivable', 'plausible', 'achievable', 'attainable', 'potential', 'imaginable', 'realistic'],
  'impossible': ['infeasible', 'implausible', 'unattainable', 'improbable', 'inconceivable', 'unrealistic', 'unthinkable', 'unworkable', 'unachievable', 'hopeless'],
  'certain': ['sure', 'definite', 'absolute', 'positive', 'convinced', 'confident', 'undoubted', 'inevitable', 'assured', 'indisputable'],
  'uncertain': ['unsure', 'doubtful', 'indefinite', 'questionable', 'ambiguous', 'unclear', 'hesitant', 'tentative', 'inconclusive', 'vague'],
  'serious': ['grave', 'solemn', 'earnest', 'somber', 'weighty', 'significant', 'critical', 'severe', 'consequential', 'momentous'],
  'funny': ['humorous', 'amusing', 'witty', 'comic', 'hilarious', 'entertaining', 'droll', 'laughable', 'whimsical', 'facetious'],
  'busy': ['occupied', 'engaged', 'preoccupied', 'absorbed', 'involved', 'hard-working', 'industrious', 'active', 'hectic', 'rushed'],
  'idle': ['inactive', 'unemployed', 'unoccupied', 'lazy', 'indolent', 'slothful', 'dormant', 'unused', 'vacant', 'stagnant'],

  // Common nouns
  'thing': ['object', 'item', 'entity', 'matter', 'affair', 'concern', 'issue', 'element', 'component', 'aspect'],
  'person': ['individual', 'human', 'being', 'character', 'subject', 'figure', 'specimen', 'agent', 'entity', 'soul'],
  'people': ['individuals', 'humans', 'beings', 'persons', 'folks', 'populace', 'citizenry', 'society', 'community', 'collective'],
  'time': ['period', 'era', 'epoch', 'age', 'season', 'moment', 'instant', 'duration', 'interval', 'span'],
  'way': ['method', 'manner', 'approach', 'technique', 'mode', 'means', 'procedure', 'pathway', 'direction', 'fashion'],
  'idea': ['concept', 'notion', 'thought', 'conception', 'premise', 'theory', 'hypothesis', 'perception', 'viewpoint', 'principle'],
  'problem': ['issue', 'difficulty', 'challenge', 'obstacle', 'complication', 'dilemma', 'predicament', 'situation', 'concern', 'matter'],
  'reason': ['cause', 'motive', 'rationale', 'basis', 'ground', 'factor', 'explanation', 'justification', 'purpose', 'incentive'],
  'question': ['inquiry', 'query', 'interrogation', 'issue', 'doubt', 'concern', 'uncertainty', 'puzzle', 'riddle', 'problem'],
  'answer': ['response', 'reply', 'solution', 'resolution', 'explanation', 'result', 'outcome', 'conclusion', 'decision', 'remedy'],
  'result': ['consequence', 'outcome', 'effect', 'conclusion', 'product', 'finding', 'discovery', 'output', 'upshot', 'sequel'],
  'process': ['procedure', 'method', 'system', 'mechanism', 'operation', 'sequence', 'workflow', 'progression', 'development', 'cycle'],
  'system': ['structure', 'organization', 'framework', 'scheme', 'setup', 'mechanism', 'network', 'apparatus', 'arrangement', 'complex'],
  'research': ['investigation', 'study', 'inquiry', 'examination', 'exploration', 'analysis', 'experimentation', 'survey', 'scholarship', 'scrutiny'],
  'evidence': ['proof', 'data', 'testimony', 'documentation', 'indication', 'support', 'basis', 'corroboration', 'grounds', 'substantiation'],
  'knowledge': ['understanding', 'awareness', 'information', 'learning', 'wisdom', 'expertise', 'familiarity', 'comprehension', 'erudition', 'scholarship'],
  'experience': ['encounter', 'exposure', 'involvement', 'practice', 'background', 'ordeal', 'event', 'occurrence', 'incident', 'journey'],
  'opinion': ['view', 'perspective', 'stance', 'belief', 'judgment', 'assessment', 'conviction', 'standpoint', 'sentiment', 'impression'],
  'discussion': ['debate', 'dialogue', 'conversation', 'talk', 'discourse', 'exchange', 'consultation', 'conference', 'colloquy', 'parley'],
  'example': ['instance', 'illustration', 'specimen', 'sample', 'case', 'precedent', 'exemplar', 'model', 'paradigm', 'demonstration'],
  'effect': ['consequence', 'result', 'outcome', 'impact', 'influence', 'reaction', 'repercussion', 'ramification', 'aftermath', 'sequela'],
  'cause': ['reason', 'source', 'origin', 'root', 'basis', 'factor', 'stimulus', 'antecedent', 'agent', 'determinant'],
  'benefit': ['advantage', 'gain', 'profit', 'good', 'asset', 'merit', 'blessing', 'boon', 'privilege', 'perk'],
  'cost': ['expense', 'price', 'charge', 'expenditure', 'fee', 'payment', 'outlay', 'toll', 'rate', 'tariff'],
  'level': ['degree', 'extent', 'stage', 'grade', 'rank', 'tier', 'plane', 'standard', 'height', 'magnitude'],
  'issue': ['matter', 'question', 'topic', 'subject', 'concern', 'point', 'problem', 'debate', 'publication', 'edition'],
  'point': ['spot', 'location', 'position', 'place', 'dot', 'mark', 'tip', 'detail', 'argument', 'assertion'],
  'role': ['function', 'part', 'position', 'duty', 'responsibility', 'character', 'capacity', 'occupation', 'assignment', 'purpose'],
  'rule': ['regulation', 'law', 'principle', 'norm', 'standard', 'guideline', 'decree', 'statute', 'ordinance', 'policy'],
  'value': ['worth', 'importance', 'merit', 'quality', 'principle', 'standard', 'cost', 'price', 'amount', 'significance'],
  'type': ['kind', 'category', 'class', 'variety', 'form', 'sort', 'genre', 'style', 'character', 'species'],
  'basis': ['foundation', 'ground', 'reason', 'premise', 'principle', 'root', 'core', 'essence', 'background', 'source'],
  'state': ['condition', 'situation', 'status', 'position', 'phase', 'stage', 'state of being', 'circumstances', 'estate', 'realm'],

  // Academic/Research terms
  'significant': ['substantial', 'meaningful', 'considerable', 'noteworthy', 'material', 'relevant', 'impactful', 'pivotal', 'critical', 'consequential'],
  'data': ['information', 'facts', 'figures', 'statistics', 'evidence', 'findings', 'results', 'observations', 'measurements', 'records'],
  'hypothesis': ['theory', 'supposition', 'assumption', 'proposition', 'conjecture', 'premise', 'postulate', 'guess', 'educated guess', 'tentative explanation'],
  'theory': ['hypothesis', 'explanation', 'framework', 'model', 'concept', 'doctrine', 'school of thought', 'system of ideas', 'philosophy', 'principle'],
  'method': ['approach', 'technique', 'procedure', 'methodology', 'process', 'system', 'strategy', 'way', 'means', 'mode'],
  'analysis': ['examination', 'investigation', 'study', 'breakdown', 'assessment', 'evaluation', 'scrutiny', 'inspection', 'appraisal', 'dissection'],
  'conclusion': ['finding', 'determination', 'judgment', 'verdict', 'decision', 'outcome', 'result', 'inference', 'deduction', 'resolution'],
  'observation': ['remark', 'comment', 'note', 'notation', 'finding', 'discovery', 'sighting', 'perception', 'insight', 'indication'],
  'demonstrate': ['show', 'prove', 'exhibit', 'illustrate', 'display', 'reveal', 'manifest', 'establish', 'substantiate', 'validate'],
  'illustrate': ['exemplify', 'demonstrate', 'show', 'depict', 'represent', 'explain', 'clarify', 'elucidate', 'illuminate', 'visualize'],
  'summarize': ['recapitulate', 'outline', 'encapsulate', 'synopsize', 'abstract', 'condense', 'abbreviate', 'overview', 'epitomize', 'conclude'],
  'compare': ['contrast', 'juxtapose', 'differentiate', 'examine', 'parallel', 'match', 'relate', 'associate', 'equate', 'measure'],
  'evaluate': ['assess', 'appraise', 'judge', 'critique', 'rate', 'estimate', 'measure', 'examine', 'consider', 'analyze'],
  'indicate': ['suggest', 'imply', 'show', 'demonstrate', 'reveal', 'signal', 'display', 'mark', 'manifest', 'denote'],
  'relevant': ['applicable', 'pertinent', 'apposite', 'germane', 'material', 'significant', 'apropos', 'connected', 'related', 'appropriate'],
  'comprehensive': ['complete', 'thorough', 'exhaustive', 'all-inclusive', 'extensive', 'broad', 'detailed', 'full-scale', 'encyclopedic', 'systematic'],
  'precise': ['exact', 'accurate', 'meticulous', 'careful', 'punctilious', 'specific', 'definite', 'particular', 'explicit', 'strict'],
  'elaborate': ['detailed', 'complex', 'intricate', 'complicated', 'ornate', 'extensive', 'thorough', 'involved', 'sophisticated', 'refined'],
  'framework': ['structure', 'system', 'skeleton', 'scaffold', 'model', 'outline', 'basis', 'foundation', 'scheme', 'apparatus'],

  // Transition words
  'however': ['nevertheless', 'nonetheless', 'still', 'yet', 'but', 'though', 'even so', 'all the same', 'on the other hand', 'in contrast'],
  'therefore': ['thus', 'accordingly', 'consequently', 'hence', 'as a result', 'for this reason', 'so', 'thereby', 'subsequently', 'ergo'],
  'because': ['since', 'as', 'due to', 'caused by', 'on account of', 'owing to', 'inasmuch as', 'given that', 'in view of', 'by reason of'],
  'moreover': ['furthermore', 'additionally', 'besides', 'also', 'in addition', 'what is more', 'further', 'on top of that', 'over and above', 'plus'],
  'also': ['as well', 'too', 'besides', 'additionally', 'furthermore', 'moreover', 'in addition', 'likewise', 'equally', 'further'],
  'although': ['though', 'even though', 'while', 'whereas', 'despite', 'in spite of', 'notwithstanding', 'yet', 'but', 'however'],
  'through': ['via', 'by means of', 'by way of', 'using', 'with', 'employing', 'utilizing', 'by', 'throughout', 'across'],
  'according': ['based on', 'as stated by', 'per', 'by', 'pursuant to', 'in accordance with', 'consistent with', 'in line with', 'aligned with', 'as reported by'],
}

/**
 * Get synonyms for a word
 * @param word The word to find synonyms for
 * @returns Array of synonyms or empty array if none found
 */
export function getSynonyms(word: string): string[] {
  const normalized = word.toLowerCase().trim()
  return thesaurus[normalized] || []
}

/**
 * Find the best synonym suggestion for a word
 * Prioritizes more common/better synonyms
 * @param word The word to suggest a synonym for
 * @returns The suggested synonym or empty string if none found
 */
export function getSuggestedSynonym(word: string): string {
  const synonyms = getSynonyms(word)
  if (synonyms.length === 0) return ''
  // Return the first synonym as the primary suggestion
  return synonyms[0]
}

/**
 * Check if a word has synonyms available
 * @param word The word to check
 * @returns True if synonyms are available
 */
export function hasSynonyms(word: string): boolean {
  return getSynonyms(word).length > 0
}

/**
 * Get all available words in thesaurus
 * @returns Array of all words
 */
export function getAvailableWords(): string[] {
  return Object.keys(thesaurus)
}

export default thesaurus
