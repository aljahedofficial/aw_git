"""
L2 Voice Preservation Engine
Protects authentic L2 grammatical structures and cultural identity
"""

import re
from typing import List, Dict, Tuple
from nltk.tokenize import sent_tokenize, word_tokenize
import json


class L2VoicePreserver:
    """Identifies and protects L2 voice elements from AI oversimplification"""
    
    def __init__(self, db_path='genericism_database.json'):
        """Initialize with voice preservation markers"""
        with open(db_path, 'r') as f:
            self.db = json.load(f)
        
        self.valid_structures = self.db['voice_preservation_markers']['valid_l2_structures']
        self.cultural_metaphors = self.db['voice_preservation_markers']['cultural_metaphors']
        self.l2_interference = self.db['ai_markers']['l2_interference_markers']
    
    def detect_l2_grammatical_structures(self, text: str) -> Dict:
        """
        Detect L2-authentic grammatical patterns that should be preserved
        """
        results = {
            'stylistically_valid_structures': [],
            'cultural_references': [],
            'l1_interference_markers': [],
            'voice_strength_score': 0.0,
            'authenticity_indicators': []
        }
        
        sentences = sent_tokenize(text)
        
        # Detect interlanguage markers
        for i, sent in enumerate(sentences):
            # Check for subject-OV patterns (common in Asian L2s)
            if self._has_object_verb_pattern(sent):
                results['stylistically_valid_structures'].append({
                    'type': 'Object-Verb ordering',
                    'sentence': sent,
                    'preservation_value': 'HIGH',
                    'reason': 'Valid L2 structural pattern showing L1 influence'
                })
            
            # Check for aspect marking
            if self._has_aspect_marking(sent):
                results['stylistically_valid_structures'].append({
                    'type': 'Aspect marking',
                    'sentence': sent,
                    'preservation_value': 'HIGH'
                })
            
            # Check for topic-prominent structure
            if self._has_topic_prominent(sent):
                results['stylistically_valid_structures'].append({
                    'type': 'Topic-prominent sentence',
                    'sentence': sent,
                    'preservation_value': 'MEDIUM'
                })
        
        # Detect cultural metaphors
        cultural_phrases = self._detect_cultural_metaphors(text)
        results['cultural_references'].extend(cultural_phrases)
        
        # Detect L1 interference (which is authentic, not error)
        l1_markers = self._detect_l1_interference(text)
        results['l1_interference_markers'].extend(l1_markers)
        
        # Calculate voice strength
        results['voice_strength_score'] = self._calculate_voice_strength(
            len(results['stylistically_valid_structures']),
            len(results['cultural_references']),
            len(sentences)
        )
        
        results['authenticity_indicators'] = self._generate_authenticity_summary(results)
        
        return results
    
    def _has_object_verb_pattern(self, sentence: str) -> bool:
        """Detect OV word order patterns (Asian L1 influence)"""
        # Look for patterns like "The homework complete needed" or "This problem solve must"
        pattern = r'\b(must|need|require|can|should|will)\b.*(?:complete|solve|done|finished|correct)'
        return bool(re.search(pattern, sentence, re.IGNORECASE))
    
    def _has_aspect_marking(self, sentence: str) -> bool:
        """Detect aspect marking variations"""
        patterns = [
            r'\b(is|are|be)\s+\w+ing\b',  # Progressive
            r'\b(has|have)\s+been\b',      # Perfect
            r'\b(used\s+to|would\s+always)\b'  # Habitual
        ]
        return any(re.search(p, sentence, re.IGNORECASE) for p in patterns)
    
    def _has_topic_prominent(self, sentence: str) -> bool:
        """Detect topic-prominent sentence structures"""
        # Sentences that start with topicalization
        pattern = r'^(?:As\s+for|Speaking\s+of|In\s+terms\s+of|Regarding|Concerning)\b'
        return bool(re.match(pattern, sentence, re.IGNORECASE))
    
    def _detect_cultural_metaphors(self, text: str) -> List[Dict]:
        """Identify culturally-specific imagery and metaphors"""
        results = []
        
        # Family-based language
        family_keywords = ['family', 'parent', 'ancestor', 'elder', 'sibling', 'household']
        for keyword in family_keywords:
            if re.search(r'\b' + keyword + r'\b', text, re.IGNORECASE):
                context_match = re.search(
                    r'.{0,50}\b' + keyword + r'\b.{0,50}',
                    text, re.IGNORECASE
                )
                if context_match:
                    results.append({
                        'type': 'Family-based reference',
                        'marker': keyword,
                        'context': context_match.group(),
                        'cultural_value': 'Potentially authentic L2 voice'
                    })
        
        # Nature-based imagery
        nature_keywords = ['mountain', 'river', 'moon', 'wind', 'bamboo', 'desert', 'ocean']
        for keyword in nature_keywords:
            if re.search(r'\b' + keyword + r'\b', text, re.IGNORECASE):
                results.append({
                    'type': 'Nature-based imagery',
                    'marker': keyword,
                    'cultural_value': 'May indicate authentic L2 cultural perspective'
                })
        
        return results
    
    def _detect_l1_interference(self, text: str) -> List[Dict]:
        """Detect L1 transfer patterns (which indicate authentic voice, not error)"""
        results = []
        
        for lang, markers in self.l2_interference.items():
            for marker in markers:
                if marker.lower() in text.lower():
                    results.append({
                        'l1_language': lang,
                        'marker': marker,
                        'authenticity_indicator': 'Shows genuine L1 influence',
                        'preservation_recommendation': 'PROTECT - This is authentic voice'
                    })
        
        return results
    
    def _calculate_voice_strength(self, structures_count: int, cultural_count: int, total_sentences: int) -> float:
        """
        Calculate overall voice strength (0-100)
        Higher = more authentic L2 voice preserved
        """
        if total_sentences == 0:
            return 0
        
        structure_score = (structures_count / max(total_sentences, 1)) * 60
        cultural_score = min(cultural_count * 10, 40)
        
        return min(100, structure_score + cultural_score)
    
    def _generate_authenticity_summary(self, results: Dict) -> List[str]:
        """Generate readable authenticity indicators"""
        summary = []
        
        if results['voice_strength_score'] > 70:
            summary.append("✓ STRONG L2 VOICE: Multiple authentic linguistic patterns detected")
        elif results['voice_strength_score'] > 40:
            summary.append("○ MODERATE L2 VOICE: Some authentic patterns present")
        else:
            summary.append("⚠ WEAK L2 VOICE: Few distinguishing L2 features detected")
        
        if results['cultural_references']:
            summary.append(f"✓ {len(results['cultural_references'])} cultural references detected")
        
        if results['l1_interference_markers']:
            summary.append(f"✓ {len(results['l1_interference_markers'])} L1 transfer patterns (authentic)")
        
        return summary
    
    def detect_voice_loss(self, original: str, edited: str) -> Dict:
        """
        Detect specific instances where AI has stripped L2 voice
        """
        results = {
            'lost_structures': [],
            'lost_cultural_references': [],
            'lost_l1_markers': [],
            'total_voice_loss': 0.0,
            'specific_instances': []
        }
        
        orig_analysis = self.detect_l2_grammatical_structures(original)
        edited_analysis = self.detect_l2_grammatical_structures(edited)
        
        # Compare voice strength
        voice_loss = orig_analysis['voice_strength_score'] - edited_analysis['voice_strength_score']
        results['total_voice_loss'] = max(0, voice_loss)
        
        # Identify lost structures
        orig_structures = {s['sentence'] for s in orig_analysis['stylistically_valid_structures']}
        edited_structures = {s['sentence'] for s in edited_analysis['stylistically_valid_structures']}
        results['lost_structures'] = list(orig_structures - edited_structures)
        
        # Identify lost cultural elements
        orig_cultural = {c['context'] for c in orig_analysis['cultural_references']}
        edited_cultural = {c['context'] for c in edited_analysis['cultural_references']}
        results['lost_cultural_references'] = list(orig_cultural - edited_cultural)
        
        # Identify lost L1 markers
        orig_l1 = {m['marker'] for m in orig_analysis['l1_interference_markers']}
        edited_l1 = {m['marker'] for m in edited_analysis['l1_interference_markers']}
        results['lost_l1_markers'] = list(orig_l1 - edited_l1)
        
        # Generate specific instances
        for lost_struct in results['lost_structures'][:3]:  # Top 3
            results['specific_instances'].append({
                'type': 'Lost L2 grammatical structure',
                'original': lost_struct,
                'loss_severity': 'HIGH',
                'recommendation': 'Consider restoring this authentic L2 pattern'
            })
        
        return results
