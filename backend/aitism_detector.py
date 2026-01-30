"""
AI-ism Detection System
Identifies formulaic LLM markers and generic academic language
"""

import json
import re
import nltk
from typing import List, Dict, Tuple
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import os

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')


class AIismDetector:
    """Detects AI-generated text markers and generic academic language"""
    
    def __init__(self, db_path='genericism_database.json'):
        """Initialize detector with genericism database"""
        with open(db_path, 'r') as f:
            self.db = json.load(f)
        
        self.ai_markers = self.db['ai_markers']
        self.english_stop = set(stopwords.words('english'))
        
    def detect_ai_markers(self, text: str) -> Dict:
        """
        Detect AI-ism markers in text
        Returns: dict with detected markers, scores, and locations
        """
        results = {
            'high_frequency_phrases': [],
            'formulaic_structures': [],
            'hedging_qualifiers': [],
            'academic_clichés': [],
            'transition_abuse': [],
            'generic_openers': [],
            'ai_ism_score': 0.0,
            'risk_level': 'low'
        }
        
        # Check high-frequency AI markers
        for phrase in self.ai_markers['high_frequency']:
            pattern = re.compile(re.escape(phrase), re.IGNORECASE)
            matches = [(m.start(), m.end(), phrase) for m in pattern.finditer(text)]
            if matches:
                results['high_frequency_phrases'].extend(matches)
        
        # Check formulaic structures using regex
        sentences = sent_tokenize(text)
        for i, sent in enumerate(sentences):
            for pattern in self.ai_markers['formulaic_structures']:
                if re.match(pattern, sent.strip(), re.IGNORECASE):
                    results['formulaic_structures'].append((i, sent.strip()))
        
        # Check hedging qualifiers
        words = word_tokenize(text.lower())
        for i, word in enumerate(words):
            if word in self.ai_markers['hedging_qualifiers']:
                results['hedging_qualifiers'].append((i, word))
        
        # Check academic clichés
        for cliché in self.ai_markers['academic_clichés']:
            pattern = re.compile(re.escape(cliché), re.IGNORECASE)
            matches = [(m.start(), m.end(), cliché) for m in pattern.finditer(text)]
            if matches:
                results['academic_clichés'].extend(matches)
        
        # Check transition word abuse
        transition_count = 0
        for transition in self.ai_markers['transition_abuse']:
            pattern = re.compile(r'\b' + re.escape(transition) + r'\b', re.IGNORECASE)
            matches = list(pattern.finditer(text))
            transition_count += len(matches)
            if matches:
                results['transition_abuse'].extend([(m.start(), m.end(), transition) for m in matches])
        
        # Check generic openers
        for opener in self.ai_markers['generic_openers']:
            pattern = re.compile(re.escape(opener), re.IGNORECASE)
            matches = [(m.start(), m.end(), opener) for m in pattern.finditer(text)]
            if matches:
                results['generic_openers'].extend(matches)
        
        # Calculate AI-ism score (0-100)
        total_markers = (
            len(results['high_frequency_phrases']) * 2 +
            len(results['formulaic_structures']) * 1.5 +
            len(results['hedging_qualifiers']) * 0.5 +
            len(results['academic_clichés']) * 1.5 +
            min(transition_count, 20) * 1 +
            len(results['generic_openers']) * 2
        )
        
        word_count = len(words)
        if word_count > 0:
            results['ai_ism_score'] = min(100, (total_markers / (word_count / 100)) * 10)
        
        # Determine risk level
        if results['ai_ism_score'] < 20:
            results['risk_level'] = 'low'
        elif results['ai_ism_score'] < 40:
            results['risk_level'] = 'moderate'
        elif results['ai_ism_score'] < 60:
            results['risk_level'] = 'high'
        else:
            results['risk_level'] = 'critical'
        
        return results
    
    def calculate_formulaic_index(self, text: str) -> float:
        """
        Calculate how formulaic/templated the text is
        Range: 0-100 (0 = unique, 100 = highly formulaic)
        """
        sentences = sent_tokenize(text)
        formulaic_sents = 0
        
        for sent in sentences:
            sent_stripped = sent.strip()
            # Check against all patterns
            for pattern in self.ai_markers['formulaic_structures']:
                if re.match(pattern, sent_stripped, re.IGNORECASE):
                    formulaic_sents += 1
                    break
        
        if not sentences:
            return 0
        
        return (formulaic_sents / len(sentences)) * 100
    
    def get_ai_explanation(self, score: float) -> str:
        """Return human-readable explanation of AI-ism score"""
        if score < 20:
            return "Low AI-ism markers. Text shows natural variation and authentic voice."
        elif score < 40:
            return "Some generic academic language detected, but voice remains distinct."
        elif score < 60:
            return "Moderate AI-ism detected. Consider replacing generic phrases with authentic voice."
        elif score < 80:
            return "High AI-ism. Text heavily relies on formulaic structures typical of AI generation."
        else:
            return "Critical AI-ism. Text appears heavily AI-polished with minimal authentic voice."
