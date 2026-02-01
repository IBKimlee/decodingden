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

  // SHORT VOWELS - Science of Reading Aligned
  // Short vowels have 1:1 grapheme-phoneme correspondence
  // Irregular words (laugh, plaid, half) are lexical exceptions, NOT alternative spellings
  '/a/': [
    { grapheme: 'a', percentage: 100, usage_label: 'Primary', context_notes: 'The only spelling for short /ă/' }
  ],

  '/e/': [
    { grapheme: 'e', percentage: 100, usage_label: 'Primary', context_notes: 'The only spelling for short /ĕ/' }
  ],

  '/i/': [
    { grapheme: 'i', percentage: 100, usage_label: 'Primary', context_notes: 'The only spelling for short /ĭ/' }
  ],

  '/o/': [
    { grapheme: 'o', percentage: 100, usage_label: 'Primary', context_notes: 'The only spelling for short /ŏ/' }
  ],

  '/u/': [
    { grapheme: 'u', percentage: 100, usage_label: 'Primary', context_notes: 'The only spelling for short /ŭ/' }
  ],

  '/t/': [
    { grapheme: 't', percentage: 79, usage_label: 'Primary' },
    { grapheme: 'tt', percentage: 12, usage_label: 'Secondary', context_notes: 'Doubled consonant' },
    { grapheme: 'ed', percentage: 8, usage_label: 'Secondary', context_notes: 'Past tense: walked' },
    { grapheme: 'th', percentage: 0.7, usage_label: 'Exception', context_notes: 'thomas' },
    { grapheme: 'tw', percentage: 0.3, usage_label: 'Exception', context_notes: 'two' }
  ],

  '/n/': [
    { grapheme: 'n', percentage: 91, usage_label: 'Primary' },
    { grapheme: 'nn', percentage: 5, usage_label: 'Secondary', context_notes: 'Doubled consonant: dinner, funny' },
    { grapheme: 'kn', percentage: 3, usage_label: 'Rare', context_notes: 'Silent k: know, knee' },
    { grapheme: 'gn', percentage: 1, usage_label: 'Exception', context_notes: 'Silent g: gnat, gnaw' }
  ],

  '/p/': [
    { grapheme: 'p', percentage: 96, usage_label: 'Primary' },
    { grapheme: 'pp', percentage: 4, usage_label: 'Secondary', context_notes: 'Doubled consonant: happy, pepper' }
  ],

  '/d/': [
    { grapheme: 'd', percentage: 90, usage_label: 'Primary' },
    { grapheme: 'dd', percentage: 6, usage_label: 'Secondary', context_notes: 'Doubled consonant: ladder, added' },
    { grapheme: 'ed', percentage: 4, usage_label: 'Secondary', context_notes: 'Past tense: played, called' }
  ],

  '/f/': [
    { grapheme: 'f', percentage: 78, usage_label: 'Primary' },
    { grapheme: 'ff', percentage: 14, usage_label: 'Secondary', context_notes: 'Doubled consonant: staff, puff' },
    { grapheme: 'ph', percentage: 5, usage_label: 'Secondary', context_notes: 'Greek origin: phone, photo' },
    { grapheme: 'gh', percentage: 3, usage_label: 'Rare', context_notes: 'laugh, cough, enough' }
  ],

  '/l/': [
    { grapheme: 'l', percentage: 85, usage_label: 'Primary' },
    { grapheme: 'll', percentage: 15, usage_label: 'Secondary', context_notes: 'Doubled consonant: bell, full' }
  ],

  '/h/': [
    { grapheme: 'h', percentage: 98, usage_label: 'Primary' },
    { grapheme: 'wh', percentage: 2, usage_label: 'Rare', context_notes: 'Some dialects: who' }
  ],

  '/b/': [
    { grapheme: 'b', percentage: 97, usage_label: 'Primary' },
    { grapheme: 'bb', percentage: 3, usage_label: 'Rare', context_notes: 'Doubled consonant: rabbit, cabbage' }
  ],

  '/r/': [
    { grapheme: 'r', percentage: 92, usage_label: 'Primary' },
    { grapheme: 'rr', percentage: 5, usage_label: 'Secondary', context_notes: 'Doubled consonant: carrot, mirror' },
    { grapheme: 'wr', percentage: 2, usage_label: 'Rare', context_notes: 'Silent w: write, wrong' },
    { grapheme: 'rh', percentage: 1, usage_label: 'Exception', context_notes: 'Greek origin: rhythm' }
  ],

  '/g/': [
    { grapheme: 'g', percentage: 88, usage_label: 'Primary' },
    { grapheme: 'gg', percentage: 8, usage_label: 'Secondary', context_notes: 'Doubled consonant: egg, bigger' },
    { grapheme: 'gh', percentage: 3, usage_label: 'Rare', context_notes: 'ghost, ghoul' },
    { grapheme: 'gu', percentage: 1, usage_label: 'Exception', context_notes: 'Before e, i: guess, guide' }
  ],

  '/k/': [
    { grapheme: 'c', percentage: 52, usage_label: 'Primary', context_notes: 'Before a, o, u: cat, cot, cup' },
    { grapheme: 'k', percentage: 26, usage_label: 'Primary', context_notes: 'Before i, e: kid, kite' },
    { grapheme: 'ck', percentage: 13, usage_label: 'Secondary', context_notes: 'After short vowel: back, stick' },
    { grapheme: 'ch', percentage: 4, usage_label: 'Rare', context_notes: 'Greek origin: school, chrome' },
    { grapheme: 'cc', percentage: 3, usage_label: 'Rare', context_notes: 'account, occasion' },
    { grapheme: 'qu', percentage: 2, usage_label: 'Rare', context_notes: 'As /kw/: queen, quick' }
  ],

  '/j/': [
    { grapheme: 'j', percentage: 48, usage_label: 'Primary' },
    { grapheme: 'g', percentage: 34, usage_label: 'Primary', context_notes: 'Before e, i, y: gem, giraffe' },
    { grapheme: 'dge', percentage: 12, usage_label: 'Secondary', context_notes: 'After short vowel: badge, bridge' },
    { grapheme: 'ge', percentage: 6, usage_label: 'Secondary', context_notes: 'End of word: cage, page' }
  ],

  '/v/': [
    { grapheme: 'v', percentage: 99.5, usage_label: 'Primary' },
    { grapheme: 'f', percentage: 0.5, usage_label: 'Exception', context_notes: 'of' }
  ],

  '/w/': [
    { grapheme: 'w', percentage: 92, usage_label: 'Primary' },
    { grapheme: 'wh', percentage: 6, usage_label: 'Secondary', context_notes: 'what, when, where' },
    { grapheme: 'u', percentage: 2, usage_label: 'Rare', context_notes: 'After q: queen, quick' }
  ],

  '/y/': [
    { grapheme: 'y', percentage: 85, usage_label: 'Primary', context_notes: 'Initial position: yes, you' },
    { grapheme: 'i', percentage: 15, usage_label: 'Secondary', context_notes: 'Before vowel: onion, million' }
  ],

  '/z/': [
    { grapheme: 'z', percentage: 23, usage_label: 'Primary' },
    { grapheme: 's', percentage: 64, usage_label: 'Primary', context_notes: 'Between vowels or final: rose, is, has' },
    { grapheme: 'zz', percentage: 8, usage_label: 'Secondary', context_notes: 'Doubled: buzz, fizz' },
    { grapheme: 'x', percentage: 3, usage_label: 'Rare', context_notes: 'As /gz/: exam, exist' },
    { grapheme: 'ss', percentage: 2, usage_label: 'Exception', context_notes: 'scissors, dessert' }
  ],

  '/ks/': [
    { grapheme: 'x', percentage: 85, usage_label: 'Primary', context_notes: 'box, fox, mix' },
    { grapheme: 'ks', percentage: 8, usage_label: 'Secondary', context_notes: 'books, looks' },
    { grapheme: 'cks', percentage: 5, usage_label: 'Secondary', context_notes: 'backs, sticks' },
    { grapheme: 'cc', percentage: 2, usage_label: 'Rare', context_notes: 'Before i, e: accept, accident' }
  ],

  '/kw/': [
    { grapheme: 'qu', percentage: 100, usage_label: 'Primary', context_notes: 'queen, quick, quiet' }
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
// Handles multiple input formats: "/a/", "a", "/ă/", etc.
export function getGraphemeFrequencies(phonemeSymbol: string): GraphemeFrequencyData[] {
  if (!phonemeSymbol) return [];

  // Try exact match first
  if (GRAPHEME_FREQUENCIES[phonemeSymbol]) {
    return GRAPHEME_FREQUENCIES[phonemeSymbol];
  }

  // Normalize the input - remove slashes and try again
  const normalized = phonemeSymbol.replace(/^\/|\/$/g, '').toLowerCase();
  const withSlashes = `/${normalized}/`;

  if (GRAPHEME_FREQUENCIES[withSlashes]) {
    return GRAPHEME_FREQUENCIES[withSlashes];
  }

  // Try matching short vowels with breve notation
  // Map breve vowels to standard: ă→a, ĕ→e, ĭ→i, ŏ→o, ŭ→u
  const breveMap: { [key: string]: string } = {
    'ă': 'a', 'ĕ': 'e', 'ĭ': 'i', 'ŏ': 'o', 'ŭ': 'u'
  };

  let debreved = normalized;
  for (const [breve, plain] of Object.entries(breveMap)) {
    debreved = debreved.replace(breve, plain);
  }

  const debrevedWithSlashes = `/${debreved}/`;
  if (GRAPHEME_FREQUENCIES[debrevedWithSlashes]) {
    return GRAPHEME_FREQUENCIES[debrevedWithSlashes];
  }

  // Try matching long vowels with macron notation
  // Map macron vowels: ā→a (for long vowels lookup)
  const macronMap: { [key: string]: string } = {
    'ā': 'ā', 'ē': 'ē', 'ī': 'ī', 'ō': 'ō', 'ū': 'ū'
  };

  // Check if input contains macron and try exact macron match
  for (const macron of Object.keys(macronMap)) {
    if (normalized.includes(macron)) {
      const macronWithSlashes = `/${macron}/`;
      if (GRAPHEME_FREQUENCIES[macronWithSlashes]) {
        return GRAPHEME_FREQUENCIES[macronWithSlashes];
      }
    }
  }

  return [];
}

// Helper function to determine usage label based on percentage
export function determineUsageLabel(percentage: number): 'Primary' | 'Secondary' | 'Rare' | 'Exception' {
  if (percentage >= 20) return 'Primary';
  if (percentage >= 10) return 'Secondary';
  if (percentage >= 3) return 'Rare';
  return 'Exception';
}