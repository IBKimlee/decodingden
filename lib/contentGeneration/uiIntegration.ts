// 🎯 UI INTEGRATION HELPERS
// Bridges the content generation rules with existing UI components

import { generatePhonemeContent, PhonemeContentData } from './phonemeContentRules';

/**
 * Get enhanced phoneme data for any UI component
 * @param phoneme - The phoneme (e.g., "/sh/", "/a/")
 * @returns Enhanced content data or null if not available
 */
export function getEnhancedPhonemeData(phoneme: string): PhonemeContentData | null {
  try {
    return generatePhonemeContent(phoneme);
  } catch (error) {
    console.warn(`Failed to generate enhanced content for ${phoneme}:`, error);
    return null;
  }
}

/**
 * Get frequency information for display in UI
 */
export function getFrequencyDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  return {
    rank: content.frequency.rank,
    description: content.frequency.description,
    isHighFrequency: content.frequency.isHighFrequency,
    displayText: `#${content.frequency.rank}`,
    badgeColor: content.frequency.isHighFrequency ? 'green' : 'blue'
  };
}

/**
 * Get type classification for display in UI
 */
export function getTypeDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  return {
    category: content.type.category,
    description: content.type.description,
    explanation: content.type.explanation,
    displayText: content.type.category,
    tooltip: `${content.type.description} - ${content.type.explanation}`
  };
}

/**
 * Get spelling information for display in UI
 */
export function getSpellingDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  return {
    mostCommon: content.spellings.mostCommon,
    alternatives: content.spellings.alternatives,
    hasAlternatives: content.spellings.hasAlternatives,
    examples: content.spellings.examples,
    displayText: content.spellings.mostCommon,
    alternativesList: content.spellings.alternatives.join(', '),
    exampleWords: Object.entries(content.spellings.examples)
      .map(([spelling, words]) => `${spelling}: ${words.slice(0, 2).join(', ')}`)
      .join(' | ')
  };
}

/**
 * Get voicing information for display in UI
 */
export function getVoicingDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content?.voicing) return null;
  
  return {
    isVoiced: content.voicing.isVoiced,
    description: content.voicing.description,
    explanation: content.voicing.explanation,
    displayText: content.voicing.description,
    fullText: `${content.voicing.description} ${content.voicing.explanation}`,
    iconColor: content.voicing.isVoiced ? 'blue' : 'gray'
  };
}

/**
 * Get articulation guidance for display in UI
 */
export function getArticulationDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content?.articulation) return null;
  
  return {
    placement: content.articulation.placement,
    manner: content.articulation.manner,
    tips: content.articulation.tips,
    commonErrors: content.articulation.commonErrors,
    summary: `${content.articulation.placement} - ${content.articulation.manner}`,
    tipsText: content.articulation.tips.join(' • '),
    errorsText: content.articulation.commonErrors.join(' • ')
  };
}

/**
 * Get assessment criteria for display in UI
 */
export function getAssessmentDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  return {
    masteryCriteria: content.assessment.mastery_criteria,
    errorPatterns: content.assessment.error_patterns,
    progressIndicators: content.assessment.progress_indicators,
    criteriaCount: content.assessment.mastery_criteria.length,
    primaryCriteria: content.assessment.mastery_criteria.slice(0, 4),
    stageCriteria: content.assessment.mastery_criteria.slice(4)
  };
}

/**
 * Get research backing for display in UI
 */
export function getResearchDisplay(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  return {
    citations: content.research.citations,
    supportingEvidence: content.research.supporting_evidence,
    pedagogicalRationale: content.research.pedagogical_rationale,
    citationCount: content.research.citations.length,
    primaryCitations: content.research.citations.slice(0, 3),
    evidenceSummary: content.research.supporting_evidence.join(' • ')
  };
}

/**
 * Check if enhanced content is available for a phoneme
 */
export function hasEnhancedContent(phoneme: string): boolean {
  return getEnhancedPhonemeData(phoneme) !== null;
}

/**
 * Get a comprehensive summary for tooltip or popup display
 */
export function getPhonemeContentSummary(phoneme: string) {
  const content = getEnhancedPhonemeData(phoneme);
  if (!content) return null;
  
  const frequency = getFrequencyDisplay(phoneme);
  const type = getTypeDisplay(phoneme);
  const spelling = getSpellingDisplay(phoneme);
  const voicing = getVoicingDisplay(phoneme);
  
  return {
    phoneme: content.phoneme,
    stage: content.stage,
    summary: {
      frequency: frequency?.description || 'Unknown frequency',
      type: type?.category || 'Unknown type',
      mostCommonSpelling: spelling?.mostCommon || 'Unknown',
      voicing: voicing?.description || 'Not applicable'
    },
    quickFacts: [
      `Stage ${content.stage} phoneme`,
      frequency?.description || 'Frequency unknown',
      type?.category || 'Type unknown',
      spelling?.hasAlternatives ? `${spelling.alternatives.length + 1} spellings` : '1 spelling'
    ].filter(Boolean)
  };
}

/**
 * Integration utilities for existing components
 */
export const ContentIntegration = {
  // Helper to get display data for the current phoneme insight modal
  getPhonemeInsightData: (phoneme: string) => ({
    frequency: getFrequencyDisplay(phoneme),
    type: getTypeDisplay(phoneme),
    spelling: getSpellingDisplay(phoneme),
    voicing: getVoicingDisplay(phoneme),
    articulation: getArticulationDisplay(phoneme),
    assessment: getAssessmentDisplay(phoneme),
    research: getResearchDisplay(phoneme)
  }),
  
  // Helper to check if content should be displayed
  shouldShowContent: (phoneme: string, section: string) => {
    const content = getEnhancedPhonemeData(phoneme);
    if (!content) return false;
    
    switch (section) {
      case 'voicing':
        return content.voicing !== null;
      case 'articulation':
        return content.articulation !== null;
      case 'assessment':
        return content.assessment.mastery_criteria.length > 0;
      case 'research':
        return content.research.citations.length > 0;
      default:
        return true;
    }
  },
  
  // Helper to get fallback content when enhanced data isn't available
  getFallbackContent: (phoneme: string) => ({
    frequency: { rank: 0, description: 'Frequency analysis pending', displayText: 'TBD' },
    type: { category: 'Phoneme', description: 'Classification pending', displayText: 'Phoneme' },
    spelling: { mostCommon: phoneme.replace(/\//g, ''), alternatives: [], displayText: phoneme.replace(/\//g, '') }
  })
};