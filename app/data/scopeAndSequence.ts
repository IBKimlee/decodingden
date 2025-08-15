// Authentic Decoding Den K-5 Phonics Scope and Sequence
// Structured by Grade • Aligned with Science of Reading • FCRR Standards
// Comprehensive K-5 progression including advanced morphology and multisyllabic skills
export interface PhonemeData {
  phonemes: string[];
  graphemes: string[];
  gradeLevel: string;
  category: string;
  prerequisites: string[];
  exampleWords: string[];
  order: number;
  description: string;
}

export const SCOPE_AND_SEQUENCE: { [key: string]: PhonemeData } = {
  // 1. Frequent & Consistent Sounds (Consonants) - Kindergarten
  'frequent-consonants': {
    phonemes: ['/m/', '/s/', '/t/', '/p/', '/n/', '/k/', '/b/', '/d/', '/g/', '/f/'],
    graphemes: ['m', 's', 't', 'p', 'n', 'k', 'b', 'd', 'g', 'f'],
    gradeLevel: 'Kindergarten',
    category: 'Frequent & Consistent Sounds (Consonants)',
    prerequisites: [],
    exampleWords: ['man', 'sun', 'top', 'pen', 'net', 'kit', 'bat', 'dog', 'go', 'fan'],
    order: 1,
    description: 'Letter names & sounds, foundational consonants with consistent sound-symbol relationships'
  },

  // 2. Short Vowels - Kindergarten
  'short-vowels': {
    phonemes: ['/ă/', '/ĕ/', '/ĭ/', '/ŏ/', '/ŭ/'],
    graphemes: ['a', 'e', 'i', 'o', 'u'],
    gradeLevel: 'Kindergarten',
    category: 'Short Vowels',
    prerequisites: ['Frequent & Consistent Sounds (Consonants)'],
    exampleWords: ['apple', 'elephant', 'igloo', 'octopus', 'umbrella'],
    order: 2,
    description: 'Short vowels and simple CVC blending'
  },

  // 3. Consonant Blends - Grade 1
  'consonant-blends': {
    phonemes: ['/st/', '/pl/', '/gr/', '/bl/', '/cl/', '/fl/', '/gl/', '/sl/', '/br/', '/cr/', '/dr/', '/fr/', '/pr/', '/tr/', '/sc/', '/sk/', '/sm/', '/sn/', '/sp/', '/sw/'],
    graphemes: ['st', 'pl', 'gr', 'bl', 'cl', 'fl', 'gl', 'sl', 'br', 'cr', 'dr', 'fr', 'pr', 'tr', 'sc', 'sk', 'sm', 'sn', 'sp', 'sw'],
    gradeLevel: 'Grade 1',
    category: 'Consonant Blends',
    prerequisites: ['Short Vowels'],
    exampleWords: ['stop', 'plan', 'grab', 'blue', 'clap', 'flag', 'glad', 'slip', 'brick', 'crab', 'drop', 'frog', 'price', 'tree', 'scale', 'skin', 'smile', 'snake', 'spoon', 'swim'],
    order: 3,
    description: 'Full CVC decoding with initial and final blends'
  },

  // 4. Consonant Digraphs - Grade 1
  'consonant-digraphs': {
    phonemes: ['/sh/', '/ch/', '/th/', '/wh/'],
    graphemes: ['sh', 'ch', 'th', 'wh'],
    gradeLevel: 'Grade 1',
    category: 'Consonant Digraphs',
    prerequisites: ['Consonant Blends'],
    exampleWords: ['ship', 'chip', 'thin', 'whip'],
    order: 4,
    description: 'Two letters that make one sound, foundational digraphs'
  },

  // 5. Long Vowels with Silent e - Grade 1
  'long-vowels-silent-e': {
    phonemes: ['/ā/', '/ē/', '/ī/', '/ō/', '/ū/'],
    graphemes: ['a_e', 'e_e', 'i_e', 'o_e', 'u_e'],
    gradeLevel: 'Grade 1',
    category: 'Long Vowels with Silent e',
    prerequisites: ['Consonant Digraphs'],
    exampleWords: ['cake', 'these', 'kite', 'rope', 'mule'],
    order: 5,
    description: 'VCe pattern with silent e and inflectional endings: -s, -ed, -ing'
  },

  // 6. Common Vowel Teams - Grade 2
  'common-vowel-teams': {
    phonemes: ['/ā/', '/ā/', '/ē/', '/ē/', '/ō/', '/ō/'],
    graphemes: ['ai', 'ay', 'ea', 'ee', 'oa', 'ow'],
    gradeLevel: 'Grade 2',
    category: 'Common Vowel Teams',
    prerequisites: ['Long Vowels with Silent e'],
    exampleWords: ['rain', 'play', 'eat', 'tree', 'boat', 'snow'],
    order: 6,
    description: 'High-frequency vowel teams and beginning multisyllabic word decoding'
  },

  // 7. R-Controlled Vowels - Grade 2
  'r-controlled-vowels': {
    phonemes: ['/ar/', '/or/', '/er/', '/ir/', '/ur/'],
    graphemes: ['ar', 'or', 'er', 'ir', 'ur'],
    gradeLevel: 'Grade 2',
    category: 'R-Controlled Vowels',
    prerequisites: ['Common Vowel Teams'],
    exampleWords: ['car', 'start', 'art', 'fork', 'born', 'her', 'bird', 'fur'],
    order: 7,
    description: 'Vowels controlled by /r/ sound, introduction to prefixes/suffixes'
  },

  // 8. Less Common & Irregular Patterns - Grade 2-3
  'irregular-patterns': {
    phonemes: ['/n/', '/r/', '/s/', '/j/'],
    graphemes: ['kn', 'wr', 'c', 'g'],
    gradeLevel: 'Grade 2–3',
    category: 'Less Common & Irregular Patterns',
    prerequisites: ['R-Controlled Vowels'],
    exampleWords: ['knee', 'knife', 'write', 'wrong', 'cent', 'city', 'gem', 'giant'],
    order: 8,
    description: 'Silent letters (kn, wr) and soft c/g patterns'
  },

  // 9. Advanced Vowel Teams & Schwa - Grade 3
  'advanced-vowel-teams-schwa': {
    phonemes: ['/au/', '/aw/', '/oo/', '/oo/', '/ew/', '/ough/', '/ə/'],
    graphemes: ['au', 'aw', 'oo', 'oo', 'ew', 'ough', 'a', 'e', 'i', 'o', 'u'],
    gradeLevel: 'Grade 3',
    category: 'Advanced Vowel Teams & Schwa',
    prerequisites: ['Less Common & Irregular Patterns'],
    exampleWords: ['haul', 'saw', 'moon', 'book', 'new', 'thought', 'about', 'pencil'],
    order: 9,
    description: 'Complex vowel patterns and unstressed schwa in multisyllabic words'
  },

  // 10. Multisyllabic Words and Morphology - Grade 3
  'multisyllabic-morphology': {
    phonemes: ['varies by morpheme'],
    graphemes: ['re-', 'un-', 'dis-', 'pre-', '-ed', '-ing', '-er', '-est', '-ful', '-less', '-ness', '-tion'],
    gradeLevel: 'Grade 3',
    category: 'Multisyllabic Words and Morphology',
    prerequisites: ['Advanced Vowel Teams & Schwa'],
    exampleWords: ['redo', 'unhappy', 'disconnect', 'preheat', 'jumped', 'jumping', 'faster', 'tallest', 'helpful', 'helpless', 'kindness', 'action'],
    order: 10,
    description: 'Prefixes, suffixes, roots, syllable division rules, and word analysis for fluency'
  },

  // 11. Advanced Morphology - Grade 4
  'advanced-morphology-grade4': {
    phonemes: ['varies by morpheme'],
    graphemes: ['in-', 'ex-', 'mis-', 'non-', '-ment', '-ly', '-or', '-ist', '-tion', '-sion', '-ture', '-ous', '-able', '-ible'],
    gradeLevel: 'Grade 4',
    category: 'Advanced Morphology',
    prerequisites: ['Multisyllabic Words and Morphology'],
    exampleWords: ['incorrect', 'exit', 'misplace', 'nonfiction', 'achievement', 'quickly', 'actor', 'artist', 'nation', 'decision', 'picture', 'dangerous', 'readable', 'possible'],
    order: 11,
    description: 'Advanced prefixes, suffixes, and morphological analysis for complex words'
  },

  // 12. Latin and Greek Roots I - Grade 4
  'latin-greek-roots-1': {
    phonemes: ['varies by root'],
    graphemes: ['port', 'dict', 'rupt', 'spect', 'tract', 'struct', 'form', 'ject', 'duc/duct', 'scrib/script'],
    gradeLevel: 'Grade 4',
    category: 'Latin and Greek Roots I',
    prerequisites: ['Advanced Morphology'],
    exampleWords: ['transport', 'predict', 'interrupt', 'inspect', 'attract', 'construct', 'transform', 'project', 'conduct', 'describe'],
    order: 12,
    description: 'Common Latin roots for vocabulary building and word analysis'
  },

  // 13. Greek Roots and Combining Forms - Grade 4-5
  'greek-roots-combining-forms': {
    phonemes: ['varies by root'],
    graphemes: ['geo', 'photo', 'auto', 'tele', 'bio', 'graph', 'phon', 'scope', 'meter', 'therm'],
    gradeLevel: 'Grade 4-5',
    category: 'Greek Roots and Combining Forms',
    prerequisites: ['Latin and Greek Roots I'],
    exampleWords: ['geography', 'photograph', 'automatic', 'telephone', 'biology', 'autograph', 'phonics', 'telescope', 'thermometer', 'geometry'],
    order: 13,
    description: 'Greek roots and combining forms for scientific and academic vocabulary'
  },

  // 14. Advanced Syllable Division - Grade 5
  'advanced-syllable-division': {
    phonemes: ['varies by pattern'],
    graphemes: ['VCCV', 'VCV', 'VC/V', 'V/CV', 'VCCCV'],
    gradeLevel: 'Grade 5',
    category: 'Advanced Syllable Division',
    prerequisites: ['Greek Roots and Combining Forms'],
    exampleWords: ['fundamental', 'helicopter', 'complicated', 'independent', 'incomprehensible'],
    order: 14,
    description: 'Complex syllable division patterns for multisyllabic academic vocabulary'
  },

  // 15. Advanced Latin and Greek Roots II - Grade 5
  'advanced-latin-greek-roots': {
    phonemes: ['varies by root'],
    graphemes: ['bene', 'mal', 'cogn', 'sens', 'aud', 'vis', 'cred', 'fid', 'path', 'log'],
    gradeLevel: 'Grade 5',
    category: 'Advanced Latin and Greek Roots II',
    prerequisites: ['Advanced Syllable Division'],
    exampleWords: ['benefit', 'malicious', 'recognize', 'sensitive', 'audible', 'visible', 'credible', 'confident', 'empathy', 'dialogue'],
    order: 15,
    description: 'Advanced Latin and Greek roots for sophisticated academic vocabulary'
  },

  // 16. Complex Morphological Analysis - Grade 5
  'complex-morphological-analysis': {
    phonemes: ['varies by morpheme'],
    graphemes: ['multi-word combinations', 'compound morphemes', 'derivational patterns'],
    gradeLevel: 'Grade 5',
    category: 'Complex Morphological Analysis',
    prerequisites: ['Advanced Latin and Greek Roots II'],
    exampleWords: ['incomprehensible', 'misunderstood', 'autobiography', 'photosynthesis', 'telecommunications'],
    order: 16,
    description: 'Analysis of complex words with multiple morphemes for academic vocabulary mastery'
  }
};

// Individual phoneme mappings to categories - Updated for Authentic Decoding Den Scope & Sequence
export const PHONEME_TO_CATEGORY: { [key: string]: string } = {
  // 1. Frequent & Consistent Sounds (Consonants)
  '/m/': 'frequent-consonants',
  '/s/': 'frequent-consonants', 
  '/t/': 'frequent-consonants',
  '/p/': 'frequent-consonants',
  '/n/': 'frequent-consonants',
  '/k/': 'frequent-consonants',
  '/b/': 'frequent-consonants',
  '/d/': 'frequent-consonants',
  '/g/': 'frequent-consonants',
  '/f/': 'frequent-consonants',

  // 2. Short Vowels
  '/ă/': 'short-vowels',
  '/ĕ/': 'short-vowels',
  '/ĭ/': 'short-vowels',
  '/ŏ/': 'short-vowels',
  '/ŭ/': 'short-vowels',

  // 3. Consonant Blends
  '/st/': 'consonant-blends',
  '/pl/': 'consonant-blends',
  '/gr/': 'consonant-blends',
  '/bl/': 'consonant-blends',
  '/cl/': 'consonant-blends',
  '/fl/': 'consonant-blends',
  '/gl/': 'consonant-blends',
  '/sl/': 'consonant-blends',
  '/br/': 'consonant-blends',
  '/cr/': 'consonant-blends',
  '/dr/': 'consonant-blends',
  '/fr/': 'consonant-blends',
  '/pr/': 'consonant-blends',
  '/tr/': 'consonant-blends',

  // 4. Consonant Digraphs
  '/sh/': 'consonant-digraphs',
  '/ch/': 'consonant-digraphs',
  '/th/': 'consonant-digraphs',
  '/wh/': 'consonant-digraphs',

  // 5. Long Vowels with Silent e
  '/ā/': 'long-vowels-silent-e',
  '/ē/': 'long-vowels-silent-e', 
  '/ī/': 'long-vowels-silent-e',
  '/ō/': 'long-vowels-silent-e',
  '/ū/': 'long-vowels-silent-e',

  // 6. Common Vowel Teams
  '/ai/': 'common-vowel-teams',
  '/ay/': 'common-vowel-teams',
  '/ea/': 'common-vowel-teams',
  '/ee/': 'common-vowel-teams',
  '/oa/': 'common-vowel-teams',
  '/ow/': 'common-vowel-teams',

  // 7. R-Controlled Vowels
  '/ar/': 'r-controlled-vowels',
  '/or/': 'r-controlled-vowels',
  '/er/': 'r-controlled-vowels',
  '/ir/': 'r-controlled-vowels',
  '/ur/': 'r-controlled-vowels',

  // 8. Less Common & Irregular Patterns
  '/kn/': 'irregular-patterns',
  '/wr/': 'irregular-patterns',
  '/soft-c/': 'irregular-patterns',
  '/soft-g/': 'irregular-patterns',

  // 9. Advanced Vowel Teams & Schwa
  '/au/': 'advanced-vowel-teams-schwa',
  '/aw/': 'advanced-vowel-teams-schwa',
  '/oo/': 'advanced-vowel-teams-schwa',
  '/ew/': 'advanced-vowel-teams-schwa',
  '/ough/': 'advanced-vowel-teams-schwa',
  '/ə/': 'advanced-vowel-teams-schwa',

  // 10. Multisyllabic Words and Morphology
  '/prefix/': 'multisyllabic-morphology',
  '/suffix/': 'multisyllabic-morphology',
  '/root/': 'multisyllabic-morphology'
};

export function getPhonemeCategory(phoneme: string): PhonemeData | null {
  const categoryKey = PHONEME_TO_CATEGORY[phoneme];
  return categoryKey ? SCOPE_AND_SEQUENCE[categoryKey] : null;
}

export function getPrerequisites(phoneme: string): string[] {
  const category = getPhonemeCategory(phoneme);
  return category ? category.prerequisites : [];
}

export function getGradeLevel(phoneme: string): string {
  const category = getPhonemeCategory(phoneme);
  return category ? category.gradeLevel : 'Unknown';
}

export function isPhonemeAppropriate(phoneme: string, completedSkills: string[]): boolean {
  const prerequisites = getPrerequisites(phoneme);
  return prerequisites.every(prereq => completedSkills.includes(prereq));
}

// Get teaching order for instructional sequencing
export function getTeachingOrder(phoneme: string): number {
  const category = getPhonemeCategory(phoneme);
  return category ? category.order : 999;
}

// Get all skills in teaching order
export function getAllSkillsInOrder(): PhonemeData[] {
  return Object.values(SCOPE_AND_SEQUENCE).sort((a, b) => a.order - b.order);
}

// Grade-level expectations based on authentic Decoding Den K-5 scope & sequence
export const GRADE_LEVEL_EXPECTATIONS = {
  'Kindergarten': {
    skills: ['Frequent & Consistent Sounds (Consonants)', 'Short Vowels'],
    description: 'Letter names & sounds, Short vowels and common consonants, Simple CVC blending, Initial digraphs and consonant blends',
    objectives: [
      'Identify all letter names and sounds',
      'Blend simple CVC words',
      'Recognize short vowel patterns',
      'Begin consonant blends and digraphs'
    ]
  },
  'Grade 1': {
    skills: ['Consonant Blends', 'Consonant Digraphs', 'Long Vowels with Silent e'],
    description: 'Full CVC decoding, Blends & digraphs, Silent-e long vowels, Inflectional endings: -s, -ed, -ing',
    objectives: [
      'Decode CVC words fluently',
      'Read words with consonant blends and digraphs',
      'Apply VCe (silent e) pattern',
      'Use inflectional endings (-s, -ed, -ing)'
    ]
  },
  'Grade 2': {
    skills: ['Common Vowel Teams', 'R-Controlled Vowels'],
    description: 'Vowel teams, R-controlled vowels, Multisyllabic word decoding, Intro to prefixes/suffixes',
    objectives: [
      'Read common vowel teams (ai, ay, ea, ee, oa, ow)',
      'Decode r-controlled vowels (ar, or, er, ir, ur)',
      'Begin multisyllabic word decoding',
      'Recognize basic prefixes and suffixes'
    ]
  },
  'Grade 3': {
    skills: ['Less Common & Irregular Patterns', 'Advanced Vowel Teams & Schwa', 'Multisyllabic Words and Morphology'],
    description: 'Morphological units (prefixes, suffixes, roots), Advanced vowel teams & schwa, Syllable division rules, Word analysis & fluency with multisyllabic words',
    objectives: [
      'Apply morphological analysis (prefixes, suffixes, roots)',
      'Read advanced vowel patterns and schwa',
      'Use syllable division rules',
      'Achieve fluency with multisyllabic words'
    ]
  },
  'Grade 4': {
    skills: ['Advanced Morphology', 'Latin and Greek Roots I', 'Greek Roots and Combining Forms'],
    description: 'Advanced prefixes and suffixes, Latin and Greek roots for vocabulary building, Complex syllable division strategies, Academic vocabulary development',
    objectives: [
      'Analyze complex words using morphological knowledge',
      'Apply Latin and Greek roots to decode academic vocabulary',
      'Use advanced syllable division strategies (VCCV, VCV patterns)',
      'Build academic vocabulary through root word analysis',
      'Develop fluency with multisyllabic academic words'
    ]
  },
  'Grade 5': {
    skills: ['Advanced Syllable Division', 'Advanced Latin and Greek Roots II', 'Complex Morphological Analysis'],
    description: 'Complex syllable division patterns, Advanced Latin and Greek roots, Sophisticated morphological analysis, Academic vocabulary mastery across content areas',
    objectives: [
      'Master complex syllable division patterns (VCCCV, advanced patterns)',
      'Analyze sophisticated academic vocabulary using multiple morphemes',
      'Apply advanced Latin and Greek roots across content areas',
      'Demonstrate fluency with complex multisyllabic words',
      'Use morphological analysis for vocabulary acquisition and comprehension'
    ]
  }
};