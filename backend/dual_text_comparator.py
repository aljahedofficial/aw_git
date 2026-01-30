"""
Dual-Text Comparison Tool
Compares original draft with AI-polished version and tracks changes
"""

import difflib
import re
from typing import List, Dict, Tuple
from html import escape


class DualTextComparator:
    """Tracks and visualizes changes between student draft and AI-edited versions"""
    
    def __init__(self):
        """Initialize comparator"""
        self.differ = difflib.Differ()
    
    def compare_texts(self, original: str, edited: str) -> Dict:
        """
        Compare two texts and identify additions, removals, and modifications
        
        Args:
            original: Student's raw draft
            edited: AI-polished version
            
        Returns:
            Comprehensive diff analysis
        """
        results = {
            'summary': {},
            'changes': [],
            'statistics': {},
            'visualization': {},
            'detailed_diff': []
        }
        
        # Tokenize by sentences for detailed analysis
        orig_sentences = self._smart_tokenize(original)
        edited_sentences = self._smart_tokenize(edited)
        
        # Get line-by-line diff
        diff = list(self.differ.compare(orig_sentences, edited_sentences))
        
        # Categorize changes
        additions = []
        deletions = []
        modifications = []
        
        for line in diff:
            if line.startswith('+ '):
                additions.append(line[2:].strip())
            elif line.startswith('- '):
                deletions.append(line[2:].strip())
            elif line.startswith('? '):
                modifications.append(line[2:].strip())
        
        results['changes'] = {
            'additions': additions,
            'deletions': deletions,
            'modifications': modifications
        }
        
        # Calculate statistics
        results['statistics'] = self._calculate_statistics(
            original, edited, additions, deletions
        )
        
        # Generate summary
        results['summary'] = {
            'total_additions': len(additions),
            'total_deletions': len(deletions),
            'total_sentences_original': len(orig_sentences),
            'total_sentences_edited': len(edited_sentences),
            'change_percentage': self._calculate_change_percentage(original, edited)
        }
        
        # Create HTML visualization data
        results['visualization'] = self._create_diff_visualization(original, edited)
        
        # Detailed diff at word level
        results['detailed_diff'] = self._word_level_diff(original, edited)
        
        return results
    
    def _smart_tokenize(self, text: str) -> List[str]:
        """
        Tokenize text by sentences, preserving structure
        """
        # Split by periods, question marks, exclamation marks
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())
        return [s.strip() for s in sentences if s.strip()]
    
    def _calculate_statistics(self, original: str, edited: str, 
                             additions: List[str], deletions: List[str]) -> Dict:
        """Calculate detailed statistics about the changes"""
        orig_words = original.split()
        edited_words = edited.split()
        
        stats = {
            'original_word_count': len(orig_words),
            'edited_word_count': len(edited_words),
            'word_count_change': len(edited_words) - len(orig_words),
            'original_char_count': len(original),
            'edited_char_count': len(edited),
            'char_count_change': len(edited) - len(original),
            'added_words': sum(len(a.split()) for a in additions),
            'removed_words': sum(len(d.split()) for d in deletions),
            'readability_impact': self._estimate_readability_impact(original, edited)
        }
        
        return stats
    
    def _estimate_readability_impact(self, original: str, edited: str) -> Dict:
        """Estimate how readability metrics changed"""
        orig_avg_word_len = sum(len(w) for w in original.split()) / max(len(original.split()), 1)
        edited_avg_word_len = sum(len(w) for w in edited.split()) / max(len(edited.split()), 1)
        
        return {
            'original_avg_word_length': round(orig_avg_word_len, 2),
            'edited_avg_word_length': round(edited_avg_word_len, 2),
            'complexity_change': 'increased' if edited_avg_word_len > orig_avg_word_len else 'decreased',
            'complexity_magnitude': round(abs(edited_avg_word_len - orig_avg_word_len), 2)
        }
    
    def _calculate_change_percentage(self, original: str, edited: str) -> float:
        """Calculate percentage of text that changed"""
        orig_len = len(original)
        if orig_len == 0:
            return 0
        
        # Use sequence matching
        matcher = difflib.SequenceMatcher(None, original, edited)
        return round((1 - matcher.ratio()) * 100, 2)
    
    def _create_diff_visualization(self, original: str, edited: str) -> Dict:
        """
        Create data structure for side-by-side visualization
        """
        orig_sentences = self._smart_tokenize(original)
        edited_sentences = self._smart_tokenize(edited)
        
        # Use SequenceMatcher for sentence alignment
        matcher = difflib.SequenceMatcher(None, orig_sentences, edited_sentences)
        opcodes = matcher.get_opcodes()
        
        visualization_data = []
        
        for tag, i1, i2, j1, j2 in opcodes:
            if tag == 'equal':
                for k, sent in enumerate(orig_sentences[i1:i2]):
                    visualization_data.append({
                        'original': sent,
                        'edited': edited_sentences[j1 + k] if j1 + k < len(edited_sentences) else '',
                        'change_type': 'unchanged',
                        'color': 'neutral'
                    })
            elif tag == 'replace':
                for k in range(max(i2-i1, j2-j1)):
                    orig_sent = orig_sentences[i1+k] if i1+k < i2 else None
                    edited_sent = edited_sentences[j1+k] if j1+k < j2 else None
                    visualization_data.append({
                        'original': orig_sent,
                        'edited': edited_sent,
                        'change_type': 'modified',
                        'color': 'yellow'
                    })
            elif tag == 'delete':
                for sent in orig_sentences[i1:i2]:
                    visualization_data.append({
                        'original': sent,
                        'edited': None,
                        'change_type': 'deleted',
                        'color': 'red'
                    })
            elif tag == 'insert':
                for sent in edited_sentences[j1:j2]:
                    visualization_data.append({
                        'original': None,
                        'edited': sent,
                        'change_type': 'added',
                        'color': 'green'
                    })
        
        return visualization_data
    
    def _word_level_diff(self, original: str, edited: str) -> List[Dict]:
        """
        Create word-level diff for detailed highlighting
        """
        orig_words = original.split()
        edited_words = edited.split()
        
        matcher = difflib.SequenceMatcher(None, orig_words, edited_words)
        opcodes = matcher.get_opcodes()
        
        word_diff = []
        
        for tag, i1, i2, j1, j2 in opcodes:
            if tag == 'equal':
                for k, word in enumerate(orig_words[i1:i2]):
                    word_diff.append({
                        'type': 'unchanged',
                        'word': word,
                        'position': i1 + k
                    })
            elif tag == 'replace':
                for k in range(max(i2-i1, j2-j1)):
                    if i1+k < i2:
                        word_diff.append({
                            'type': 'deleted',
                            'word': orig_words[i1+k],
                            'position': i1+k
                        })
                    if j1+k < j2:
                        word_diff.append({
                            'type': 'added',
                            'word': edited_words[j1+k],
                            'position': j1+k
                        })
            elif tag == 'delete':
                for word in orig_words[i1:i2]:
                    word_diff.append({
                        'type': 'deleted',
                        'word': word,
                        'position': i1
                    })
            elif tag == 'insert':
                for word in edited_words[j1:j2]:
                    word_diff.append({
                        'type': 'added',
                        'word': word,
                        'position': j1
                    })
        
        return word_diff
    
    def generate_html_diff(self, original: str, edited: str) -> str:
        """
        Generate HTML representation of diff for PDF/web display
        """
        orig_lines = original.split('\n')
        edited_lines = edited.split('\n')
        
        diff = difflib.unified_diff(orig_lines, edited_lines, lineterm='')
        
        html_parts = ['<div class="diff-container">']
        
        for line in diff:
            if line.startswith('+++') or line.startswith('---') or line.startswith('@@'):
                html_parts.append(f'<div class="diff-meta">{escape(line)}</div>')
            elif line.startswith('+'):
                html_parts.append(f'<div class="diff-added">+ {escape(line[1:])}</div>')
            elif line.startswith('-'):
                html_parts.append(f'<div class="diff-removed">- {escape(line[1:])}</div>')
            else:
                html_parts.append(f'<div class="diff-unchanged">{escape(line)}</div>')
        
        html_parts.append('</div>')
        
        return '\n'.join(html_parts)
