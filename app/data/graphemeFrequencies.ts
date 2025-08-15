// 🌟 DECODING DEN: GRAPHEME FREQUENCY DATA 🌟
// © 2025 Decoding Den. All rights reserved.
// Research-based grapheme frequency percentages and usage labels

export interface GraphemeFrequencyData {
  grapheme: string;
  percentage: number;
  usage_label: 'Primary' | 'Secondary' | 'Rare' | 'Exception';
  context_notes?: string;
}

export interface PhonemeFrequencyMap {
  [phonemeId: string]: GraphemeFrequencyData[];
}

// Comprehensive grapheme frequency data based on corpus analysis
export const GRAPHEME_FREQUENCIES: PhonemeFrequencyMap = {
  // ============================================
  // STAGE 1: Core Consonants & Short Vowels
  // ============================================
  '/m/': [
    { grapheme: 'm', percentage: 94, usage_label: 'Primary' },
    { grapheme: 'mm', percentage: 4, usage_label: 'Secondary', context_notes: 'In words like hammer, summer' },
    { grapheme: 'mb', percentage: 1.5, usage_label: 'Rare', context_notes: 'Silent b: lamb, thumb' },
    { grapheme: 'mn', percentage: 0.3, usage_label: 'Exception', context_notes: 'Silent n: autumn' },
    { grapheme: 'lm', percentage: 0.2, usage_label: 'Exception', context_notes: 'Silent l: calm' }
  ],

  '/s/': [
    { grapheme: 's', percentage: 73, usage_label: 'Primary' },
    { grapheme: 'ss', percentage: 16, usage_label: 'Secondary', context_notes: 'Doubled consonant' },
    { grapheme: 'c', percentage: 8, usage_label: 'Secondary', context_notes: 'Before i, e, y' },
    { grapheme: 'sc', percentage: 2, usage_label: 'Rare', context_notes: 'science, muscle' },
    { grapheme: 'ps', percentage: 0.7, usage_label: 'Exception', context_notes: 'Silent p: psychology' },
    { grapheme: 'x', percentage: 0.3, usage_label: 'Exception', context_notes: 'Final position: six' }
  ],

  '/a/': [
    { grapheme: 'a', percentage: 96, usage_label: 'Primary' },
    { grapheme: 'au', percentage: 2, usage_label: 'Rare', context_notes: 'laugh, aunt' },
    { grapheme: 'ai', percentage: 1.5, usage_label: 'Rare', context_notes: 'plaid' },
    { grapheme: 'al', percentage: 0.5, usage_label: 'Exception', context_notes: 'half, calf' }
  ],

  '/t/': [
    { grapheme: 't', percentage: 79, usage_label: 'Primary' },
    { grapheme: 'tt', percentage: 12, usage_label: 'Secondary', context_notes: 'Doubled consonant' },
    { grapheme: 'ed', percentage: 8, usage_label: 'Secondary', context_notes: 'Past tense: walked' },
    { grapheme: 'th', percentage: 0.7, usage_label: 'Exception', context_notes: 'thomas' },
    { grapheme: 'tw', percentage: 0.3, usage_label: 'Exception', context_notes: 'two' }
  ],

  // ============================================
  // STAGE 4: Long Vowels with Silent E
  // ============================================
  '/ā/': [
    { grapheme: 'a_e', percentage: 37, usage_label: 'Primary', context_notes: 'Magic e pattern' },
    { grapheme: 'ai', percentage: 24, usage_label: 'Primary', context_notes: 'Usually medial' },
    { grapheme: 'ay', percentage: 20, usage_label: 'Primary', context_notes: 'End of words/syllables' },
    { grapheme: 'a', percentage: 15, usage_label: 'Secondary', context_notes: 'Open syllables' },
    { grapheme: 'eigh', percentage: 3, usage_label: 'Rare', context_notes: 'eight, weigh, neighbor' },
    { grapheme: 'ey', percentage: 1, usage_label: 'Exception', context_notes: 'they, grey' }
  ],

  '/ē/': [
    { grapheme: 'ee', percentage: 38, usage_label: 'Primary', context_notes: 'Usually medial/final' },
    { grapheme: 'ea', percentage: 32, usage_label: 'Primary', context_notes: 'Usually medial' },
    { grapheme: 'e', percentage: 18, usage_label: 'Secondary', context_notes: 'Open syllables' },
    { grapheme: 'e_e', percentage: 6, usage_label: 'Secondary', context_notes: 'Magic e pattern' },
    { grapheme: 'y', percentage: 4, usage_label: 'Secondary', context_notes: 'End of words' },
    { grapheme: 'ie', percentage: 2, usage_label: 'Rare', context_notes: 'field, piece' }
  ],

  '/ī/': [
    { grapheme: 'i_e', percentage: 37, usage_label: 'Primary', context_notes: 'Magic e pattern' },
    { grapheme: 'igh', percentage: 30, usage_label: 'Primary', context_notes: 'light, night, right' },
    { grapheme: 'y', percentage: 20, usage_label: 'Primary', context_notes: 'End of words' },
    { grapheme: 'i', percentage: 8, usage_label: 'Secondary', context_notes: 'Open syllables' },
    { grapheme: 'ie', percentage: 3, usage_label: 'Rare', context_notes: 'tie, pie' },
    { grapheme: 'uy', percentage: 2, usage_label: 'Exception', context_notes: 'buy, guy' }
  ],

  '/ō/': [
    { grapheme: 'o_e', percentage: 42, usage_label: 'Primary', context_notes: 'Magic e pattern' },
    { grapheme: 'oa', percentage: 24, usage_label: 'Primary', context_notes: 'boat, coat' },
    { grapheme: 'ow', percentage: 20, usage_label: 'Primary', context_notes: 'End of words' },
    { grapheme: 'o', percentage: 12, usage_label: 'Secondary', context_notes: 'Open syllables' },
    { grapheme: 'oe', percentage: 2, usage_label: 'Exception', context_notes: 'toe, doe' }
  ],

  '/ū/': [
    { grapheme: 'u_e', percentage: 69, usage_label: 'Primary', context_notes: 'Magic e pattern' },
    { grapheme: 'ue', percentage: 13, usage_label: 'Secondary', context_notes: 'blue, true' },
    { grapheme: 'ew', percentage: 10, usage_label: 'Secondary', context_notes: 'new, flew' },
    { grapheme: 'u', percentage: 5, usage_label: 'Rare', context_notes: 'Open syllables' },
    { grapheme: 'ou', percentage: 2, usage_label: 'Rare', context_notes: 'you, group' },
    { grapheme: 'ui', percentage: 1, usage_label: 'Exception', context_notes: 'suit, fruit' }
  ],

  // ============================================
  // STAGE 5: Vowel Teams & Diphthongs
  // ============================================
  '/oi/': [
    { grapheme: 'oi', percentage: 62, usage_label: 'Primary', context_notes: 'Usually medial' },
    { grapheme: 'oy', percentage: 38, usage_label: 'Primary', context_notes: 'End of words' }
  ],

  '/ou/': [
    { grapheme: 'ou', percentage: 56, usage_label: 'Primary', context_notes: 'house, mouse' },
    { grapheme: 'ow', percentage: 44, usage_label: 'Primary', context_notes: 'cow, now' }
  ],

  '/aw/': [
    { grapheme: 'au', percentage: 78, usage_label: 'Primary', context_notes: 'author, because' },
    { grapheme: 'aw', percentage: 19, usage_label: 'Primary', context_notes: 'saw, claw' },
    { grapheme: 'augh', percentage: 2, usage_label: 'Rare', context_notes: 'caught, taught' },
    { grapheme: 'ough', percentage: 1, usage_label: 'Exception', context_notes: 'thought, bought' }
  ],

  // ============================================
  // STAGE 6: R-Controlled Vowels
  // ============================================
  '/ar/': [
    { grapheme: 'ar', percentage: 89, usage_label: 'Primary' },
    { grapheme: 'are', percentage: 9, usage_label: 'Secondary', context_notes: 'care, share' },
    { grapheme: 'air', percentage: 2, usage_label: 'Rare', context_notes: 'fair, hair' }
  ],

  '/er/': [
    { grapheme: 'er', percentage: 40, usage_label: 'Primary' },
    { grapheme: 'ir', percentage: 26, usage_label: 'Primary', context_notes: 'bird, girl' },
    { grapheme: 'ur', percentage: 26, usage_label: 'Primary', context_notes: 'turn, burn' },
    { grapheme: 'or', percentage: 6, usage_label: 'Secondary', context_notes: 'word, work' },
    { grapheme: 'ear', percentage: 2, usage_label: 'Rare', context_notes: 'learn, heard' }
  ],

  '/or/': [
    { grapheme: 'or', percentage: 78, usage_label: 'Primary' },
    { grapheme: 'ore', percentage: 14, usage_label: 'Secondary', context_notes: 'more, store' },
    { grapheme: 'oar', percentage: 4, usage_label: 'Rare', context_notes: 'board, roar' },
    { grapheme: 'our', percentage: 3, usage_label: 'Rare', context_notes: 'four, pour' },
    { grapheme: 'oor', percentage: 1, usage_label: 'Exception', context_notes: 'door, floor' }
  ],

  // ============================================
  // STAGE 3: Consonant Digraphs
  // ============================================
  '/sh/': [
    { grapheme: 'sh', percentage: 76, usage_label: 'Primary' },
    { grapheme: 'ti', percentage: 13, usage_label: 'Secondary', context_notes: 'nation, action' },
    { grapheme: 'ci', percentage: 6, usage_label: 'Secondary', context_notes: 'special, social' },
    { grapheme: 'si', percentage: 3, usage_label: 'Rare', context_notes: 'mansion' },
    { grapheme: 'ssi', percentage: 1, usage_label: 'Rare', context_notes: 'mission' },
    { grapheme: 'ch', percentage: 1, usage_label: 'Exception', context_notes: 'machine, chef' }
  ],

  '/ch/': [
    { grapheme: 'ch', percentage: 55, usage_label: 'Primary' },
    { grapheme: 'tch', percentage: 31, usage_label: 'Primary', context_notes: 'After short vowels' },
    { grapheme: 'tu', percentage: 8, usage_label: 'Secondary', context_notes: 'picture, nature' },
    { grapheme: 't', percentage: 4, usage_label: 'Rare', context_notes: 'question' },
    { grapheme: 'ti', percentage: 2, usage_label: 'Exception', context_notes: 'suggestion' }
  ],

  '/th/': [
    { grapheme: 'th', percentage: 100, usage_label: 'Primary', context_notes: 'Only spelling for /th/' }
  ],

  '/wh/': [
    { grapheme: 'wh', percentage: 100, usage_label: 'Primary', context_notes: 'who, what, when, where' }
  ],

  '/ph/': [
    { grapheme: 'ph', percentage: 83, usage_label: 'Primary', context_notes: 'Greek origin words' },
    { grapheme: 'f', percentage: 17, usage_label: 'Secondary', context_notes: 'Standard f spelling' }
  ],

  '/ng/': [
    { grapheme: 'ng', percentage: 59, usage_label: 'Primary' },
    { grapheme: 'n', percentage: 41, usage_label: 'Primary', context_notes: 'Before k: think, bank' }
  ]
};

// Helper function to get frequency data for a phoneme
export function getGraphemeFrequencies(phonemeSymbol: string): GraphemeFrequencyData[] {
  return GRAPHEME_FREQUENCIES[phonemeSymbol] || [];
}

// Helper function to determine usage label based on percentage
export function determineUsageLabel(percentage: number): 'Primary' | 'Secondary' | 'Rare' | 'Exception' {
  if (percentage >= 20) return 'Primary';
  if (percentage >= 10) return 'Secondary';
  if (percentage >= 3) return 'Rare';
  return 'Exception';
}