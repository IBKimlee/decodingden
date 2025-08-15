// 🎯 PHONEME CONTENT GENERATION RULES
// Intelligent rules for populating all phoneme framework components

import { STAGE_PHONEME_SAMPLES, getPhonemeById } from '../../app/data/allStagesDatabase';
import { getPhonemeStage } from '../decodability/phonemeStageMapper';

export interface PhonemeContentData {
  // Basic identification
  phoneme: string;
  stage: number;
  phoneme_id: string;
  
  // Frequency data
  frequency: {
    rank: number;
    description: string;
    isHighFrequency: boolean;
  };
  
  // Type classification
  type: {
    category: string;
    description: string;
    explanation: string;
  };
  
  // Spelling information
  spellings: {
    mostCommon: string;
    alternatives: string[];
    hasAlternatives: boolean;
    examples: { [key: string]: string[] };
  };
  
  // Voicing information
  voicing: {
    isVoiced: boolean | null;
    description: string;
    explanation: string;
  } | null;
  
  // Examples and usage
  examples: {
    words: string[];
    sentences: string[];
  };
  
  // Teaching metadata
  teaching: {
    advantages: string[];
    complexity_score: number;
    grade_band: string;
    introduction_week: number;
  };
  
  // Articulation guidance
  articulation: {
    placement: string;
    manner: string;
    tips: string[];
    commonErrors: string[];
  } | null;
  
  // Assessment criteria
  assessment: {
    mastery_criteria: string[];
    error_patterns: string[];
    progress_indicators: string[];
  };
  
  // Research backing
  research: {
    citations: string[];
    supporting_evidence: string[];
    pedagogical_rationale: string;
  };
}

/**
 * Generate complete content data for any phoneme using intelligent rules
 * @param phoneme - The phoneme (e.g., "/sh/", "/a/", "/th/")
 * @returns Complete content data or null if phoneme not found
 */
export function generatePhonemeContent(phoneme: string): PhonemeContentData | null {
  const phonemeEntry = STAGE_PHONEME_SAMPLES.find(p => p.phoneme === phoneme);
  if (!phonemeEntry) return null;
  
  return {
    phoneme: phonemeEntry.phoneme,
    stage: phonemeEntry.stage,
    phoneme_id: phonemeEntry.phoneme_id,
    
    frequency: generateFrequencyData(phonemeEntry),
    type: generateTypeData(phonemeEntry),
    spellings: generateSpellingData(phonemeEntry),
    voicing: generateVoicingData(phonemeEntry),
    examples: generateExampleData(phonemeEntry),
    teaching: generateTeachingData(phonemeEntry),
    articulation: generateArticulationData(phonemeEntry),
    assessment: generateAssessmentData(phonemeEntry),
    research: generateResearchData(phonemeEntry)
  };
}

/**
 * Generate frequency ranking data with intelligent descriptions
 */
function generateFrequencyData(phonemeEntry: any) {
  const rank = phonemeEntry.frequency_rank;
  const isHighFrequency = rank <= 10;
  
  let description = '';
  if (rank <= 5) {
    description = 'Very high frequency - among the most common sounds in English';
  } else if (rank <= 10) {
    description = 'High frequency - commonly used in everyday words';
  } else if (rank <= 20) {
    description = 'Moderate frequency - regularly encountered in reading';
  } else if (rank <= 30) {
    description = 'Lower frequency - less common but still important';
  } else {
    description = 'Low frequency - specialized or less common sound';
  }
  
  return {
    rank,
    description,
    isHighFrequency
  };
}

/**
 * Generate phoneme type classification with explanations
 */
function generateTypeData(phonemeEntry: any) {
  // Extract type from phoneme_id or infer from phoneme characteristics
  const phoneme = phonemeEntry.phoneme;
  const id = phonemeEntry.phoneme_id;
  
  let category = '';
  let description = '';
  let explanation = '';
  
  // Determine category based on phoneme characteristics
  if (phoneme.length > 3) { // More than /x/ suggests digraph/trigraph
    if (phoneme.includes('sh') || phoneme.includes('ch') || phoneme.includes('th') || phoneme.includes('ng')) {
      category = 'Consonant Digraph';
      description = 'Two letters that make one sound';
      explanation = 'This is different from blends where each letter keeps its sound';
    } else if (phoneme.includes('tch') || phoneme.includes('dge')) {
      category = 'Consonant Trigraph';
      description = 'Three letters that make one sound';
      explanation = 'These patterns often appear at the end of words';
    }
  } else if (['a', 'e', 'i', 'o', 'u'].includes(phoneme.replace(/\//g, ''))) {
    // Vowel classification
    if (id.includes('long') || phoneme.includes('ā') || phoneme.includes('ē')) {
      category = 'Long Vowel';
      description = 'Vowel that says its name';
      explanation = 'Often appears in vowel-consonant-e patterns';
    } else if (id.includes('short') || phoneme.includes('ă') || phoneme.includes('ĕ')) {
      category = 'Short Vowel';
      description = 'Quick, clipped vowel sound';
      explanation = 'Commonly found in closed syllables';
    } else if (id.includes('team') || phoneme.includes('ea') || phoneme.includes('ai')) {
      category = 'Vowel Team';
      description = 'Two vowels working together';
      explanation = 'The vowels create one sound when combined';
    } else if (id.includes('r_controlled') || phoneme.includes('ar') || phoneme.includes('er')) {
      category = 'R-Controlled Vowel';
      description = 'Vowel influenced by the letter r';
      explanation = 'The r changes how the vowel sounds';
    } else {
      category = 'Vowel';
      description = 'Single vowel sound';
      explanation = 'Core vowel sound in the English language';
    }
  } else {
    // Consonant classification
    category = 'Consonant';
    description = 'Single consonant sound';
    explanation = 'Individual letter that represents one sound';
  }
  
  return {
    category,
    description,
    explanation
  };
}

/**
 * Generate spelling information with alternatives and examples
 */
function generateSpellingData(phonemeEntry: any) {
  const graphemes = phonemeEntry.graphemes || [];
  const mostCommon = graphemes[0] || '';
  const alternatives = graphemes.slice(1);
  
  // Generate example words for each spelling
  const spellingExamples = generateSpellingExamples(phonemeEntry.phoneme, graphemes);
  
  return {
    mostCommon,
    alternatives,
    hasAlternatives: alternatives.length > 0,
    examples: spellingExamples
  };
}

/**
 * Generate example words for each spelling pattern
 */
function generateSpellingExamples(phoneme: string, graphemes: string[]) {
  const examples: { [key: string]: string[] } = {};
  
  // Common example words for different phonemes and spellings
  const exampleDatabase = {
    '/sh/': {
      'sh': ['shop', 'ship', 'fish', 'cash'],
      'ti': ['nation', 'station', 'education'],
      'ci': ['special', 'social', 'commercial'],
      'si': ['mansion', 'dimension'],
      'ch': ['chef', 'machine']
    },
    '/th/': {
      'th': ['think', 'three', 'bath', 'with']
    },
    '/ch/': {
      'ch': ['chat', 'much', 'reach'],
      'tch': ['catch', 'watch', 'hatch']
    },
    '/a/': {
      'a': ['cat', 'hat', 'map'],
      'au': ['laugh']
    },
    '/e/': {
      'e': ['bed', 'red', 'pen'],
      'ea': ['bread', 'head']
    }
    // Add more as needed
  };
  
  const phonemeExamples = exampleDatabase[phoneme as keyof typeof exampleDatabase];
  if (!phonemeExamples) {
    // Default examples if not in database
    graphemes.forEach(grapheme => {
      examples[grapheme] = [`${grapheme}_word1`, `${grapheme}_word2`];
    });
    return examples;
  }
  
  graphemes.forEach(grapheme => {
    examples[grapheme] = phonemeExamples[grapheme as keyof typeof phonemeExamples] || [`${grapheme}_example`];
  });
  
  return examples;
}

/**
 * Generate voicing information if applicable
 */
function generateVoicingData(phonemeEntry: any) {
  // This is a simplified implementation - in full version, we'd have voicing data
  const phoneme = phonemeEntry.phoneme.replace(/\//g, '');
  
  // Common voiced/unvoiced pairs and patterns
  const voicedConsonants = ['b', 'd', 'g', 'v', 'z', 'j', 'm', 'n', 'ng', 'l', 'r', 'w', 'y'];
  const unvoicedConsonants = ['p', 't', 'k', 'f', 's', 'sh', 'ch', 'th', 'h'];
  
  let isVoiced: boolean | null = null;
  let description = '';
  let explanation = '';
  
  if (voicedConsonants.includes(phoneme)) {
    isVoiced = true;
    description = 'Voiced';
    explanation = '(vocal cords vibrate)';
  } else if (unvoicedConsonants.includes(phoneme)) {
    isVoiced = false;
    description = 'Unvoiced';
    explanation = '(no vocal cord vibration)';
  } else {
    // Vowels or unclear - don't show voicing
    return null;
  }
  
  return {
    isVoiced,
    description,
    explanation
  };
}

/**
 * Generate example words and sentences
 */
function generateExampleData(phonemeEntry: any) {
  return {
    words: phonemeEntry.word_examples || [],
    sentences: phonemeEntry.decodable_sentences || []
  };
}

/**
 * Generate teaching metadata
 */
function generateTeachingData(phonemeEntry: any) {
  return {
    advantages: phonemeEntry.teaching_advantages || [],
    complexity_score: phonemeEntry.complexity_score || 1.0,
    grade_band: phonemeEntry.grade_band || 'Unknown',
    introduction_week: phonemeEntry.introduction_week || 1
  };
}

/**
 * Generate articulation guidance data
 */
function generateArticulationData(phonemeEntry: any) {
  const phoneme = phonemeEntry.phoneme.replace(/\//g, '');
  
  // Articulation database for common phonemes
  const articulationDatabase = {
    'sh': {
      placement: 'Tongue tip behind bottom teeth, sides up',
      manner: 'Continuous fricative',
      tips: ['Round lips slightly', 'Keep air flowing smoothly', 'Feel vibration on hand'],
      commonErrors: ['Substituting /s/ sound', 'Not rounding lips enough']
    },
    'ch': {
      placement: 'Tongue tip touches roof of mouth',
      manner: 'Stop and release',
      tips: ['Start with /t/ then add /sh/', 'Quick release of air'],
      commonErrors: ['Substituting /sh/ or /t/', 'Not enough air release']
    },
    'th': {
      placement: 'Tongue tip between teeth',
      manner: 'Continuous fricative',
      tips: ['Let tongue peek out slightly', 'Blow air gently'],
      commonErrors: ['Substituting /f/ or /d/', 'Tongue too far out']
    },
    's': {
      placement: 'Tongue tip near roof of mouth',
      manner: 'Continuous fricative',
      tips: ['Keep tongue narrow', 'Steady air stream'],
      commonErrors: ['Lateral lisp', 'Interdental lisp']
    }
  };
  
  const articulationInfo = articulationDatabase[phoneme as keyof typeof articulationDatabase];
  
  if (!articulationInfo) {
    // For vowels or phonemes not in database
    if (['a', 'e', 'i', 'o', 'u'].includes(phoneme)) {
      return {
        placement: 'Vocal tract positioning for vowel production',
        manner: 'Continuous vowel sound',
        tips: ['Keep mouth position stable', 'Use clear voice'],
        commonErrors: ['Inconsistent mouth position', 'Adding extra sounds']
      };
    }
    return null; // Don't show articulation for unknown phonemes
  }
  
  return articulationInfo;
}

/**
 * Generate assessment criteria data
 */
function generateAssessmentData(phonemeEntry: any) {
  const stage = phonemeEntry.stage;
  const phoneme = phonemeEntry.phoneme;
  
  // Base criteria that apply to all phonemes
  const baseCriteria = [
    'Student can identify the sound in isolation',
    'Student can produce the sound in isolation',
    'Student can identify the sound in beginning position',
    'Student can identify the sound in ending position'
  ];
  
  // Stage-specific criteria
  const stageCriteria = {
    1: ['Student recognizes sound immediately', 'Student blends with other Stage 1 sounds'],
    2: ['Student differentiates from Stage 1 sounds', 'Student reads words with this sound'],
    3: ['Student applies in multisyllabic words', 'Student uses in writing activities'],
    4: ['Student recognizes in complex words', 'Student applies spelling patterns'],
    5: ['Student reads fluently in text', 'Student applies advanced patterns'],
    6: ['Student uses in academic vocabulary', 'Student recognizes morphological connections'],
    7: ['Student applies in complex texts', 'Student demonstrates mastery in writing'],
    8: ['Student transfers to new contexts', 'Student supports others learning']
  };
  
  const stageSpecific = stageCriteria[stage as keyof typeof stageCriteria] || [];
  
  const errorPatterns = [
    `Substituting similar sounds for ${phoneme}`,
    'Inconsistent production across contexts',
    'Difficulty in connected speech',
    'Spelling errors with this phoneme'
  ];
  
  const progressIndicators = [
    'Immediate recognition in word lists',
    'Consistent production in conversation',
    'Accurate spelling in independent writing',
    'Transfer to unfamiliar words'
  ];
  
  return {
    mastery_criteria: [...baseCriteria, ...stageSpecific],
    error_patterns: errorPatterns,
    progress_indicators: progressIndicators
  };
}

/**
 * Generate research backing data
 */
function generateResearchData(phonemeEntry: any) {
  const phoneme = phonemeEntry.phoneme;
  const stage = phonemeEntry.stage;
  
  // Research database with key citations
  const researchDatabase = {
    general: [
      'Adams, M. J. (1990). Beginning to read: Thinking and learning about print.',
      'Ehri, L. C. (2005). Learning to read words: Theory, findings, and issues.',
      'National Reading Panel (2000). Teaching children to read.'
    ],
    phonological: [
      'Brady, S. A. (2011). Efficacy of phonics teaching for reading outcomes.',
      'Castles, A., & Coltheart, M. (2004). Is there a causal link from phonological awareness to success in learning to read?'
    ],
    sequence: [
      'Bear, D. R., et al. (2020). Words their way: Word study for phonics, vocabulary, and spelling instruction.',
      'Moats, L. C. (2020). Speech to print: Language essentials for teachers.'
    ]
  };
  
  const supportingEvidence = [
    `Stage ${stage} placement based on frequency analysis and developmental readiness`,
    'Sequence follows synthetic phonics progression research',
    'Decodability percentages based on cumulative phoneme instruction',
    'Teaching advantages derived from classroom implementation studies'
  ];
  
  const pedagogicalRationale = `This phoneme (${phoneme}) is introduced in Stage ${stage} based on research showing optimal timing for student success. The systematic sequence ensures students have prerequisite skills before encountering this sound in decodable texts.`;
  
  return {
    citations: [...researchDatabase.general, ...researchDatabase.phonological, ...researchDatabase.sequence],
    supporting_evidence: supportingEvidence,
    pedagogical_rationale: pedagogicalRationale
  };
}