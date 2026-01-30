"""
Linguistic Identity Scoring
Quantifies how much original student voice remains after AI editing
"""

import re
import math
from typing import Dict, List, Tuple
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import Counter
import json


class LinguisticIdentityScorer:
    """Calculates comprehensive voice preservation metrics"""
    
    def __init__(self, db_path='genericism_database.json'):
        """Initialize with voice markers database"""
        with open(db_path, 'r') as f:
            self.db = json.load(f)
    
    def calculate_voice_preservation_score(self, original: str, edited: str) -> Dict:
        """
        Calculate how much student voice is preserved
        
        High score = Student used AI as a tool (voice intact)
        Low score = AI homogenized the text (voice replaced)
        
        Scale: 0-100
        """
        results = {
            'overall_score': 0,
            'component_scores': {},
            'interpretation': '',
            'risk_level': '',
            'detailed_metrics': {}
        }
        
        # Calculate component scores
        lexical_score = self._calculate_lexical_identity(original, edited)
        structural_score = self._calculate_structural_identity(original, edited)
        stylistic_score = self._calculate_stylistic_identity(original, edited)
        voice_consistency = self._calculate_voice_consistency(original, edited)
        authenticity_markers = self._calculate_authenticity_markers(original, edited)
        
        results['component_scores'] = {
            'lexical_identity': lexical_score,
            'structural_identity': structural_score,
            'stylistic_identity': stylistic_score,
            'voice_consistency': voice_consistency,
            'authenticity_markers': authenticity_markers
        }
        
        # Calculate weighted overall score
        results['overall_score'] = round(
            (lexical_score * 0.20 +
             structural_score * 0.20 +
             stylistic_score * 0.25 +
             voice_consistency * 0.20 +
             authenticity_markers * 0.15),
            2
        )
        
        # Generate interpretation
        results['interpretation'] = self._interpret_score(results['overall_score'])
        results['risk_level'] = self._assess_homogenization_risk(results['overall_score'])
        
        # Detailed metrics
        results['detailed_metrics'] = {
            'original_word_count': len(original.split()),
            'edited_word_count': len(edited.split()),
            'retained_unique_words': self._count_retained_unique_words(original, edited),
            'retained_sentence_patterns': self._count_retained_patterns(original, edited),
            'ai_phrase_infiltration': 100 - self._measure_generic_infiltration(edited)
        }
        
        return results
    
    def _calculate_lexical_identity(self, original: str, edited: str) -> float:
        """
        Measure vocabulary preservation
        High = more original vocabulary retained
        """
        orig_words = set(word_tokenize(original.lower()))
        edited_words = set(word_tokenize(edited.lower()))
        
        # Remove common words
        stopwords = set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of'])
        orig_words -= stopwords
        edited_words -= stopwords
        
        # Calculate retention rate
        if not orig_words:
            return 100
        
        retained = len(orig_words & edited_words)
        retention_rate = (retained / len(orig_words)) * 100
        
        # Penalty for added generic words
        generic_words = self._count_generic_words(edited)
        generic_penalty = (generic_words / max(len(edited_words), 1)) * 20
        
        return max(0, retention_rate - generic_penalty)
    
    def _calculate_structural_identity(self, original: str, edited: str) -> float:
        """
        Measure sentence structure preservation
        High = original sentence patterns retained
        """
        orig_sents = sent_tokenize(original)
        edited_sents = sent_tokenize(edited)
        
        if not orig_sents:
            return 100
        
        # Calculate average sentence length preservation
        orig_lengths = [len(s.split()) for s in orig_sents]
        edited_lengths = [len(s.split()) for s in edited_sents]
        
        if not edited_lengths:
            return 0
        
        orig_avg = sum(orig_lengths) / len(orig_lengths)
        edited_avg = sum(edited_lengths) / len(edited_lengths)
        
        # Measure how much the structure changed
        length_change = abs(edited_avg - orig_avg) / max(orig_avg, 1)
        structure_preservation = max(0, 100 - (length_change * 100))
        
        return min(100, structure_preservation)
    
    def _calculate_stylistic_identity(self, original: str, edited: str) -> float:
        """
        Measure stylistic consistency
        High = original style/voice retained
        """
        # Measure punctuation patterns
        orig_punct_score = self._measure_punctuation_style(original)
        edited_punct_score = self._measure_punctuation_style(edited)
        
        # Measure capitalization patterns
        orig_caps_score = self._measure_capitalization_style(original)
        edited_caps_score = self._measure_capitalization_style(edited)
        
        # Measure contraction usage
        orig_contraction_score = self._measure_contraction_usage(original)
        edited_contraction_score = self._measure_contraction_usage(edited)
        
        # Average the style components
        style_preservation = (
            (100 - abs(orig_punct_score - edited_punct_score)) * 0.33 +
            (100 - abs(orig_caps_score - edited_caps_score)) * 0.33 +
            (100 - abs(orig_contraction_score - edited_contraction_score)) * 0.34
        ) / 100
        
        return style_preservation
    
    def _calculate_voice_consistency(self, original: str, edited: str) -> float:
        """
        Measure consistency of voice throughout
        High = voice stable across document
        """
        # Split texts into paragraphs/sections
        orig_sections = original.split('\n\n')
        edited_sections = edited.split('\n\n')
        
        # Calculate voice scores for each section
        section_scores = []
        
        for orig_sec, edited_sec in zip(orig_sections, edited_sections):
            if not orig_sec or not edited_sec:
                continue
            
            sec_score = self._section_voice_consistency(orig_sec, edited_sec)
            section_scores.append(sec_score)
        
        if not section_scores:
            return 50
        
        # Return average with variance penalty
        avg_score = sum(section_scores) / len(section_scores)
        variance = sum((s - avg_score)**2 for s in section_scores) / len(section_scores)
        consistency_penalty = math.sqrt(variance)
        
        return max(0, avg_score - (consistency_penalty / 10))
    
    def _calculate_authenticity_markers(self, original: str, edited: str) -> float:
        """
        Measure presence of authentic L2/personal markers
        """
        orig_authentic = self._count_authentic_markers(original)
        edited_authentic = self._count_authentic_markers(edited)
        
        if orig_authentic == 0:
            return 50  # Neutral if no markers to begin with
        
        retention_rate = (edited_authentic / orig_authentic) * 100
        
        # Bonus for maintaining unique L2 features
        l2_bonus = self._detect_l2_preservation_bonus(original, edited)
        
        return min(100, retention_rate + l2_bonus)
    
    def _measure_punctuation_style(self, text: str) -> float:
        """Measure punctuation usage patterns (0-100)"""
        total_chars = len(text)
        if total_chars == 0:
            return 50
        
        punctuation_counts = {
            '!': text.count('!'),
            '?': text.count('?'),
            ';': text.count(';'),
            ':': text.count(':'),
            '...': text.count('...')
        }
        
        # Calculate punctuation "richness"
        richness = sum(count for count in punctuation_counts.values()) / (total_chars / 100)
        return min(100, richness * 10)
    
    def _measure_capitalization_style(self, text: str) -> float:
        """Measure capitalization patterns"""
        words = text.split()
        if not words:
            return 50
        
        caps_words = sum(1 for w in words if w[0].isupper() if w)
        return (caps_words / len(words)) * 100
    
    def _measure_contraction_usage(self, text: str) -> float:
        """Measure informal contractions (don't, can't, etc.)"""
        contractions = ["don't", "can't", "won't", "it's", "i'm", "that's", "we're", "they're"]
        contraction_count = sum(text.lower().count(c) for c in contractions)
        word_count = len(text.split())
        
        if word_count == 0:
            return 50
        
        return (contraction_count / (word_count / 100)) * 10
    
    def _section_voice_consistency(self, orig_section: str, edited_section: str) -> float:
        """Calculate voice consistency for a single section"""
        # Check if major changes occurred
        orig_words = set(word_tokenize(orig_section.lower()))
        edited_words = set(word_tokenize(edited_section.lower()))
        
        if not orig_words:
            return 50
        
        overlap = len(orig_words & edited_words) / len(orig_words)
        return overlap * 100
    
    def _count_retained_unique_words(self, original: str, edited: str) -> int:
        """Count unique words from original that appear in edited"""
        orig_words = set(word_tokenize(original.lower()))
        edited_words = set(word_tokenize(edited.lower()))
        return len(orig_words & edited_words)
    
    def _count_retained_patterns(self, original: str, edited: str) -> int:
        """Count sentence patterns from original that appear in edited"""
        # Simplified: count matching sentence opening patterns
        orig_sents = sent_tokenize(original)
        edited_text = edited.lower()
        
        patterns_retained = 0
        for sent in orig_sents:
            # Get first 3 words as pattern
            pattern = ' '.join(word_tokenize(sent)[:3]).lower()
            if pattern in edited_text:
                patterns_retained += 1
        
        return patterns_retained
    
    def _count_generic_words(self, text: str) -> int:
        """Count generic AI words"""
        generic_words = self.db['ai_markers']['high_frequency']
        count = 0
        for word in generic_words:
            count += len(re.findall(re.escape(word), text, re.IGNORECASE))
        return count
    
    def _measure_generic_infiltration(self, text: str) -> float:
        """Measure how many generic phrases infiltrated the text"""
        generic_count = self._count_generic_words(text)
        word_count = len(text.split())
        
        if word_count == 0:
            return 0
        
        return min(100, (generic_count / (word_count / 100)) * 10)
    
    def _count_authentic_markers(self, text: str) -> int:
        """Count markers of authentic L2/personal voice"""
        markers = 0
        
        # Count first-person pronouns (sign of personal voice)
        first_person = ['i ', 'i\'', 'my ', 'me ', 'we ', 'our ', 'us ']
        markers += sum(len(re.findall(r'\b' + re.escape(m), text.lower())) for m in first_person)
        
        # Count questions (sign of personal inquiry)
        markers += text.count('?')
        
        # Count exclamations (sign of emotion/authenticity)
        markers += text.count('!')
        
        # Count contractions
        contractions = ["don't", "can't", "won't", "it's", "i'm"]
        markers += sum(len(re.findall(re.escape(c), text.lower())) for c in contractions)
        
        return markers
    
    def _detect_l2_preservation_bonus(self, original: str, edited: str) -> float:
        """Bonus for maintaining L2-specific authentic features"""
        # Check if L2 markers persist in edited version
        bonus = 0
        
        # Cultural references
        cultural_keywords = ['family', 'culture', 'home', 'tradition']
        for keyword in cultural_keywords:
            if keyword in original.lower() and keyword in edited.lower():
                bonus += 5
        
        # L1 transfer patterns
        if re.search(r'\b(?:very\s+very|should\s+must)\b', original, re.IGNORECASE) and \
           re.search(r'\b(?:very\s+very|should\s+must)\b', edited, re.IGNORECASE):
            bonus += 10
        
        return min(20, bonus)  # Cap at 20 points
    
    def _interpret_score(self, score: float) -> str:
        """Generate interpretation of the voice preservation score"""
        if score >= 80:
            return "EXCELLENT: Student used AI as a tool while maintaining authentic voice. Original linguistic identity strongly preserved."
        elif score >= 60:
            return "GOOD: AI editing occurred but student voice largely intact. Some authentic elements simplified."
        elif score >= 40:
            return "MODERATE: Significant AI intervention. Student voice present but compromised. Linguistic identity partially homogenized."
        elif score >= 20:
            return "CONCERNING: Heavy AI presence. Much of student's original voice replaced with generic language. Significant homogenization detected."
        else:
            return "CRITICAL: Original voice largely erased. Text heavily AI-polished with minimal authentic student voice remaining. Severe linguistic homogenization."
    
    def _assess_homogenization_risk(self, score: float) -> str:
        """Assess level of 'linguistic homogenization'"""
        if score >= 70:
            return "LOW - Voice Authentic"
        elif score >= 50:
            return "MODERATE - Some Voice Loss"
        elif score >= 30:
            return "HIGH - Significant Homogenization"
        else:
            return "CRITICAL - Voice Homogenized"
