// v4.1 Curriculum weekly data — extracted from app/teacher/stages/[stage]/page.tsx on 2026-04-16
// This file is the single source of truth for 8-stage weekly content, imported by:
//   - app/teacher/stages/[stage]/page.tsx (stage detail pages)
//   - app/teacher/stages/page.tsx (Duration modal on stages list)

// v4.1 Weekly data structure with intensity flags
export type IntensityLevel = "CORE" | "TEACH" | "EXPOSURE";

// Sight Word interface for heart words / high-frequency words
export interface SightWord {
  word: string;
  isHeartWord: boolean;
  trickyPart: string | null;
  isNew: boolean;
  isUpgrade: boolean;
}

export interface WeeklyData {
  week: number;
  phonemes: string[];
  graphemes: string[];
  intensity: IntensityLevel[];
  focusWords: string[];
  decodableText: string;
  assessment: string;
  isCheckpoint: boolean;
  isMastery: boolean;
  isReview?: boolean;
  teachingTips: string[];
  sightWords?: SightWord[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 1: Core Consonants & Short Vowels (v4.1)
// Grade: K-Fall | Duration: 10 weeks | Phase: Pre → Partial Alphabetic
// Intensity Profile: 15 ★ CORE | 0 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
export const stage1WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/m/', '/s/', '/ă/'],
    graphemes: ['m', 's', 'a'],
    intensity: ['CORE', 'CORE', 'CORE'],
    focusWords: ['am', 'Sam', 'mam'],
    decodableText: 'Mam! Sam! Sam am mas.',
    assessment: 'Daily: letter-sound correspondence',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/m/ — continuous sound (can be held), ideal for blending instruction',
      '/s/ — continuous sound (can be held), ideal for blending instruction',
      '/ă/ — clear open vowel articulation'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: true, isUpgrade: false },
      { word: "and", isHeartWord: true, trickyPart: "\"d\" not yet taught (temporarily irregular)", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 2,
    phonemes: ['/t/', '/n/'],
    graphemes: ['t', 'n'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['at', 'sat', 'mat', 'man', 'tan'],
    decodableText: 'The man sat. Sam sat. Sam and the man sat on a tan mat.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/t/ — stop sound (quick release), voiceless',
      '/n/ — continuous nasal, tongue behind teeth'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: true, trickyPart: "\"d\" not yet taught (temporarily irregular)", isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: true, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 3,
    phonemes: ['/p/', '/ĭ/'],
    graphemes: ['p', 'i'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['pat', 'pit', 'sip', 'sit', 'tip', 'pin', 'nap'],
    decodableText: 'Pat can sit. Tip can sip. I can sit and sip.',
    assessment: 'Daily: dictation (3-5 words)',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/p/ — stop sound, voiceless bilabial (visible lip pop)',
      '/ĭ/ — short i, lips slightly spread'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: true, trickyPart: "\"d\" not yet taught (temporarily irregular)", isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 4,
    phonemes: ['/d/', '/f/'],
    graphemes: ['d', 'f'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['dad', 'mad', 'sad', 'fat', 'if', 'fin', 'fit'],
    decodableText: 'Dad sat. The fat cat is mad. Dad is sad.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/d/ — stop sound, voiced (feel throat vibration), pair with /t/',
      '/f/ — continuous fricative, voiceless (teeth on lower lip)'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: true },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false }
    ]
  },
  {
    week: 5,
    phonemes: ['/ŏ/', '/l/'],
    graphemes: ['o', 'l'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['dot', 'pot', 'lot', 'lap', 'lit', 'log'],
    decodableText: 'I sit by the pot a lot. The pot is hot. Flip the lid.',
    assessment: 'Daily: word chain activity',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ŏ/ — short o, open mouth rounded',
      '/l/ — continuous liquid, tongue tip on ridge'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 6,
    phonemes: ['/h/', '/b/'],
    graphemes: ['h', 'b'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['Bob', 'has', 'hat', 'hot', 'bat', 'bit', 'bib'],
    decodableText: 'Not the hot hat! Bob has a bat and a bib.',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/h/ — voiceless glottal fricative (breath sound), initial position only',
      '/b/ — stop sound, voiced bilabial, pair with /p/'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: false, isUpgrade: false },
      { word: "he", isHeartWord: true, trickyPart: "\"e\" says /ē/ (open syllable, long vowel not taught until Stage 3/4)", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 7,
    phonemes: ['/ĕ/', '/ŭ/'],
    graphemes: ['e', 'u'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['pet', 'hen', 'mud', 'Ben', 'fed', 'tub', 'bus', 'fun'],
    decodableText: 'Ben fed the hen. The pet hen is in the mud. The bus is fun.',
    assessment: 'Daily: spelling assessment',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ĕ/ — short e, mouth slightly open',
      '/ŭ/ — short u, relaxed central vowel'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: false, isUpgrade: false },
      { word: "he", isHeartWord: true, trickyPart: "\"e\" says /ē/ (open syllable, long vowel not taught until Stage 3/4)", isNew: false, isUpgrade: false },
      { word: "of", isHeartWord: true, trickyPart: "\"o\" says /ŭ/ (not /ŏ/); \"f\" says /v/ (not /f/) — permanently irregular", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 8,
    phonemes: ['Review'],
    graphemes: ['All Stage 1 consonants'],
    intensity: ['CORE'],
    focusWords: ['hot', 'mud', 'pet', 'sit', 'tan', 'lab', 'fun', 'nap', 'big', 'tub'],
    decodableText: 'The hot sun hit the mud. Ben let his pet sit on the tan mat in the tub.',
    assessment: 'CHECKPOINT Weeks 1-8',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all consonant sounds — focus on any sounds students are still confusing'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: false, isUpgrade: false },
      { word: "he", isHeartWord: true, trickyPart: "\"e\" says /ē/ (open syllable, long vowel not taught until Stage 3/4)", isNew: false, isUpgrade: false },
      { word: "of", isHeartWord: true, trickyPart: "\"o\" says /ŭ/ (not /ŏ/); \"f\" says /v/ (not /f/) — permanently irregular", isNew: false, isUpgrade: false },
      { word: "you", isHeartWord: true, trickyPart: "Entirely irregular — no GPC rule produces /yoo/ from this spelling", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 1 vowels'],
    intensity: ['CORE'],
    focusWords: ['cat', 'sat', 'bed', 'dog', 'dug', 'mud', 'fun', 'hit', 'lap', 'pen', 'log'],
    decodableText: 'The cat sat on the bed to nap. The hen hid in the pen to nap.',
    assessment: 'Daily: vowel discrimination',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Focus on vowel discrimination — students often confuse /ĕ/ and /ĭ/, and /ŏ/ and /ŭ/'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: false, isUpgrade: false },
      { word: "he", isHeartWord: true, trickyPart: "\"e\" says /ē/ (open syllable, long vowel not taught until Stage 3/4)", isNew: false, isUpgrade: false },
      { word: "of", isHeartWord: true, trickyPart: "\"o\" says /ŭ/ (not /ŏ/); \"f\" says /v/ (not /f/) — permanently irregular", isNew: false, isUpgrade: false },
      { word: "you", isHeartWord: true, trickyPart: "Entirely irregular — no GPC rule produces /yoo/ from this spelling", isNew: false, isUpgrade: false },
      { word: "was", isHeartWord: true, trickyPart: "\"w\" not taught (Stage 2); \"a\" says /ŭ/ (not /ă/); \"s\" says /z/ — three irregular parts", isNew: true, isUpgrade: false }
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 1'],
    intensity: ['CORE'],
    focusWords: ['Sam', 'sat', 'mat', 'man', 'Pat', 'sit', 'sip', 'tip', 'dad', 'mad', 'fat', 'pot', 'hot', 'lot', 'lap', 'hat', 'Bob', 'bat', 'bed', 'pet', 'mud', 'hut', 'bus', 'fun', 'hen'],
    decodableText: 'Sam sat on the mat. His pal Pat had a pet. The pet sat on his lap. Fun in the sun!',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 15 GPCs — both reading and spelling. Students should decode CVC words automatically.'
    ],
    sightWords: [
      { word: "I", isHeartWord: true, trickyPart: "Says /ī/ (long i), not /ĭ/; always capitalized", isNew: false, isUpgrade: false },
      { word: "and", isHeartWord: false, trickyPart: null, isNew: false, isUpgrade: false },
      { word: "the", isHeartWord: true, trickyPart: "\"th\" digraph not taught; \"e\" says /ə/ (schwa)", isNew: false, isUpgrade: false },
      { word: "a", isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", isNew: false, isUpgrade: false },
      { word: "is", isHeartWord: true, trickyPart: "\"s\" says /z/, not /s/", isNew: false, isUpgrade: false },
      { word: "to", isHeartWord: true, trickyPart: "\"o\" says /oo/, not /ŏ/ — permanently irregular", isNew: false, isUpgrade: false },
      { word: "he", isHeartWord: true, trickyPart: "\"e\" says /ē/ (open syllable, long vowel not taught until Stage 3/4)", isNew: false, isUpgrade: false },
      { word: "of", isHeartWord: true, trickyPart: "\"o\" says /ŭ/ (not /ŏ/); \"f\" says /v/ (not /f/) — permanently irregular", isNew: false, isUpgrade: false },
      { word: "you", isHeartWord: true, trickyPart: "Entirely irregular — no GPC rule produces /yoo/ from this spelling", isNew: false, isUpgrade: false },
      { word: "was", isHeartWord: true, trickyPart: "\"w\" not taught (Stage 2); \"a\" says /ŭ/ (not /ă/); \"s\" says /z/ — three irregular parts", isNew: false, isUpgrade: false },
      { word: "it", isHeartWord: false, trickyPart: null, isNew: true, isUpgrade: false }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2: Remaining Letters, Digraphs & Blends (v5.0 — Restructured)
// Grade: K-Spring | Duration: 11 weeks | Phase: Partial → Full Alphabetic
// Intensity Profile: 25 ★ CORE | 0 ▲ TEACH | 0 ○ EXPOSURE
// Key change from v4.1: Blends restored (were missing entirely)
// Items: 18 GPCs (letters/digraphs) + 7 blend groups = 25
// ═══════════════════════════════════════════════════════════════════════════════
export const stage2WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/r/', '/g/'],
    graphemes: ['r', 'g'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['red', 'rag', 'rat', 'got', 'gab', 'gap', 'rug', 'grin'],
    decodableText: 'Dad had a red rug. The rat got in the gap.',
    assessment: 'Daily: new consonant recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/r/ — liquid, tongue curled back, continuous',
      '/g/ — stop sound, voiced velar, pair with /k/'
    ]
  },
  {
    week: 2,
    phonemes: ['/k/'],
    graphemes: ['k', 'c (hard)', 'ck'],
    intensity: ['CORE', 'CORE', 'CORE'],
    focusWords: ['can', 'cat', 'kit', 'cap', 'kid', 'kick', 'duck', 'back', 'sick'],
    decodableText: 'The kid can kick. The cat sat on the cap. The duck is in the back.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/k/ has THREE spellings: c before a, o, u; k before e, i; ck after a short vowel at the end of a one-syllable word'
    ]
  },
  {
    week: 3,
    phonemes: ['/j/', '/v/'],
    graphemes: ['j', 'v'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['jam', 'jet', 'jog', 'van', 'vet', 'vat', 'Val'],
    decodableText: 'Val the vet had a red van. Jim had jam on his vest.',
    assessment: 'Daily: /j/ and /v/ production',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/j/ — voiced affricate',
      '/v/ — voiced fricative, teeth on lower lip, pair with /f/'
    ]
  },
  {
    week: 4,
    phonemes: ['/w/'],
    graphemes: ['w', 'wh'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['wet', 'win', 'wag', 'when', 'what', 'whip', 'which'],
    decodableText: 'When is it wet? What did the dog wag? Which hat is his?',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/w/ — glide sound, lips rounded',
      'wh — most wh words are question words (when, what, where, which, why)'
    ]
  },
  {
    week: 5,
    phonemes: ['/y/', '/z/'],
    graphemes: ['y', 'z'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['yes', 'yet', 'yam', 'zip', 'zap', 'zag'],
    decodableText: 'Yes, the yam is hot. Zip, zap, zag!',
    assessment: 'Daily: /y/ and /z/ sounds',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/y/ — glide sound, tongue high and forward',
      '/z/ — voiced fricative, pair with /s/'
    ]
  },
  {
    week: 6,
    phonemes: ['/ks/', '/kw/'],
    graphemes: ['x', 'qu'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['fox', 'box', 'mix', 'six', 'quit', 'quiz', 'quest'],
    decodableText: 'The fox is in the box. Six can quit the quiz.',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'x represents TWO sounds: /k/+/s/',
      'qu — q and u always together, makes /kw/'
    ]
  },
  {
    week: 7,
    phonemes: ['/ch/', '/sh/'],
    graphemes: ['ch', 'sh'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['chip', 'chat', 'chop', 'much', 'shop', 'fish', 'dish', 'shed'],
    decodableText: 'Chip and Chad had fish on a dish at the shop. Much fun in the shed.',
    assessment: 'Daily: first digraphs',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Digraphs: two letters, one sound',
      '/ch/ — voiceless affricate',
      '/sh/ — voiceless fricative'
    ]
  },
  {
    // Merged from old weeks 8+9: th (both) + ng now in one week
    week: 8,
    phonemes: ['/th/ (voiceless)', '/th/ (voiced)', '/ng/'],
    graphemes: ['th', 'th', 'ng'],
    intensity: ['CORE', 'CORE', 'CORE'],
    focusWords: ['thin', 'math', 'path', 'thick', 'this', 'that', 'them', 'then', 'ring', 'sing', 'long', 'king'],
    decodableText: 'A thin path. This king can sing a long song. That math is fun.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'th has two sounds — voiceless (thin, math) and voiced (this, that)',
      'Voiceless: air only. Voiced: feel throat vibration.',
      '/ng/ — nasal sound, back of tongue, always at end of syllable',
      'Digraph review: ch, sh, th, ng — two letters, one sound'
    ]
  },
  {
    // NEW — Blends were missing entirely from v4.1; restored per locked plan
    week: 9,
    phonemes: ['Initial L-blends', 'Initial R-blends', 'Initial S-blends'],
    graphemes: ['bl, cl, fl, gl, pl, sl', 'br, cr, dr, fr, gr, pr, tr', 'sc, sk, sm, sn, sp, st, sw'],
    intensity: ['CORE', 'CORE', 'CORE'],
    focusWords: ['flag', 'clap', 'sled', 'plan', 'grab', 'drip', 'frog', 'trip', 'stop', 'spin', 'snap', 'skip'],
    decodableText: 'Grab the flag and clap! The frog can skip and stop. Spin the sled on the trip.',
    assessment: 'Daily: initial blend production and reading',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Blends vs. digraphs: in a blend, you hear BOTH sounds (s-t-op); in a digraph, two letters make ONE sound (sh-op)',
      'L-blends: bl, cl, fl, gl, pl, sl — second sound is always /l/',
      'R-blends: br, cr, dr, fr, gr, pr, tr — second sound is always /r/',
      'S-blends: sc, sk, sm, sn, sp, st, sw — first sound is always /s/',
      'Teach continuous blending: sssss-t-op → stop'
    ]
  },
  {
    // NEW — Final blends + three-letter blends + review
    week: 10,
    phonemes: ['Final nasal blends', 'Final stop/liquid blends', 'Final S-blends', 'Three-letter blends'],
    graphemes: ['-mp, -nd, -nk, -nt', '-ft, -ld, -lk, -lp, -lt', '-sk, -sp, -st', 'scr, spl, spr, str'],
    intensity: ['CORE', 'CORE', 'CORE', 'CORE'],
    focusWords: ['jump', 'hand', 'tank', 'tent', 'belt', 'milk', 'help', 'fast', 'desk', 'string', 'spring', 'splash'],
    decodableText: 'Jump and grab the belt! Help the fast fish splash in the spring. The string is on the desk.',
    assessment: 'CHECKPOINT Weeks 9-10',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Final nasal blends (-mp, -nd, -nk, -nt): the nasal sound comes first, then the stop',
      'Final stop/liquid blends (-ft, -ld, -lk, -lp, -lt): /l/ often precedes the final consonant',
      'Final S-blends (-sk, -sp, -st): mirror initial S-blends but at the end of the word',
      'Three-letter blends (scr, spl, spr, str): build on known two-letter blends — str = s + tr',
      'Review all digraphs and initial blends alongside final blends'
    ]
  },
  {
    week: 11,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 2'],
    intensity: ['CORE'],
    focusWords: ['strong', 'fresh', 'church', 'spring', 'bring', 'which', 'splash', 'string', 'think', 'clamp', 'shrub', 'quest'],
    decodableText: 'The strong spring church is fresh. Which long path did the king bring? Think fast and splash!',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 25 Stage 2 items: 18 GPCs (letters + digraphs) plus 7 blend groups',
      'Students should decode CCVC, CVCC, and CCVCC words with automaticity',
      'Verify blend vs. digraph distinction is clear (st-op vs. sh-op)',
      'Include Stage 1 GPCs in cumulative assessment'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3: VCe, FLOSS, Trigraphs & Bridge Blends (v5.0 — Restructured)
// Grade: 1st-Fall | Duration: 11 weeks | Phase: Full Alphabetic (Emerging)
// Intensity Profile: 14 ★ CORE | 2 ▲ TEACH | 1 ○ EXPOSURE
// Key changes from v4.1: ph → Stage 7, soft c/g → Stage 5, e_e → EXPOSURE,
//   5 bridge blend groups added (connect Stage 2 blend skills to Stage 3 patterns)
// Items: 5 VCe + 4 FLOSS + 2 trigraphs + 1 nk + 5 bridge blends = 17
// ═══════════════════════════════════════════════════════════════════════════════
export const stage3WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/ā/'],
    graphemes: ['a_e'],
    intensity: ['CORE'],
    focusWords: ['make', 'cake', 'take', 'name', 'game', 'same', 'bake', 'lake'],
    decodableText: 'Jake will make a cake at the lake. We can take the same name for the game. Bake it!',
    assessment: 'Daily: a_e pattern recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Magic E: the silent e at the end makes the vowel say its name. Contrast: mad→made, cap→cape'
    ]
  },
  {
    week: 2,
    phonemes: ['/ī/', '/ō/'],
    graphemes: ['i_e', 'o_e'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['bike', 'time', 'ride', 'like', 'home', 'bone', 'nose', 'hope'],
    decodableText: 'Mike will ride his bike home in time. I like the bone on his nose. I hope so!',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'Continue VCe pattern — kit→kite, hop→hope',
      'Students should now recognize the VCe pattern across three vowels'
    ]
  },
  {
    // e_e demoted from TEACH to EXPOSURE per locked plan (very low frequency)
    week: 3,
    phonemes: ['/ū/', '/ē/'],
    graphemes: ['u_e', 'e_e'],
    intensity: ['CORE', 'EXPOSURE'],
    focusWords: ['cute', 'use', 'tube', 'huge', 'rule', 'theme', 'these'],
    decodableText: 'The cute cat will use the huge tube. These kids like the theme and the rule.',
    assessment: 'Daily: u_e and e_e patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'u_e is CORE — high frequency',
      'e_e is EXPOSURE — very few words use this pattern (theme, these, eve). Expose students to it but do not drill or assess.'
    ]
  },
  {
    week: 4,
    phonemes: ['/f/', '/l/'],
    graphemes: ['ff', 'll'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['cliff', 'stuff', 'off', 'puff', 'bell', 'hill', 'doll', 'tell', 'well', 'shell'],
    decodableText: 'Tell the doll on the hill. We fell off the cliff. The bell is in the shell.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'FLOSS Rule: ff, ll, ss, zz double after a single short vowel at the end of a one-syllable word'
    ]
  },
  {
    week: 5,
    phonemes: ['/s/', '/z/'],
    graphemes: ['ss', 'zz'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['miss', 'dress', 'boss', 'less', 'mess', 'buzz', 'fizz', 'jazz', 'fuzz'],
    decodableText: 'The boss made a mess. Do not miss the jazz. The buzz and fizz made less fuzz.',
    assessment: 'Daily: FLOSS rule practice',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Complete the FLOSS pattern — ss and zz follow the same doubling rule as ff and ll'
    ]
  },
  {
    week: 6,
    phonemes: ['/ch/', '/j/'],
    graphemes: ['tch', 'dge'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['catch', 'match', 'watch', 'kitchen', 'bridge', 'fudge', 'badge', 'judge'],
    decodableText: 'Catch the match! Watch the judge on the bridge. Fudge in the kitchen!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'tch and dge are trigraphs — three letters, one sound',
      'They appear after short vowels: catch (short a), bridge (short i)',
      'Students already know ch and j from Stage 2 — these are positional variants'
    ]
  },
  {
    // ph removed → Stage 7; replaced with CCVCE bridge blends
    week: 7,
    phonemes: ['/ngk/', 'CCVCE bridge blends'],
    graphemes: ['nk', 'blend + VCe'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['think', 'drink', 'bank', 'pink', 'thank', 'brave', 'crane', 'drive', 'flame', 'globe'],
    decodableText: 'Think brave! Drink at the bank and thank the pink crane. Drive past the flame and the globe.',
    assessment: 'Daily: nk pattern + blends meet VCe',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'nk always makes /ngk/ — the n borrows the ng sound before k',
      'CCVCE bridge blends: students combine Stage 2 blend skills with VCe — brave, crane, drive, flame, globe, pride, stroke, flute',
      'Contrast CVC→CVCE (mad→made) with CCVC→CCVCE (plan→plane, grad→grade)'
    ]
  },
  {
    // NEW — Bridge blends: CCVCC + digraph-blend onsets (thr, shr)
    week: 8,
    phonemes: ['CCVCC bridge blends', 'Digraph-blend onsets'],
    graphemes: ['blend + vowel + blend', 'thr, shr'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['brand', 'crisp', 'clamp', 'frost', 'stump', 'drift', 'three', 'throw', 'shred', 'shrub', 'shrimp'],
    decodableText: 'Three crisp chips fell off the stump. Throw the brand on the frost. Shred the shrub and clamp it. The shrimp will drift.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'CCVCC: blends on BOTH sides of the vowel — brand (br-a-nd), crisp (cr-i-sp), clamp (cl-a-mp)',
      'thr = th + r (digraph + blend): three, throw, throb, thrill, thrash',
      'shr = sh + r (digraph + blend): shred, shrub, shrimp, shrink, shrug',
      'Students already know th, sh (Stage 2) and r-blends (Stage 2) — now combine them'
    ]
  },
  {
    // NEW — Bridge blends: blend + digraph endings + multi-syllable blend words
    week: 9,
    phonemes: ['Blend + digraph endings', 'Multi-syllable blend words'],
    graphemes: ['-nch, -nge, blend + sh/ch/th', 'two-syllable blend words'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['bench', 'ranch', 'lunch', 'crunch', 'brush', 'crush', 'fresh', 'stretch', 'pumpkin', 'sunset', 'napkin', 'sandstorm'],
    decodableText: 'Crunch the fresh lunch on the bench at the ranch. Crush and brush at sunset. The pumpkin is in the sandstorm. Stretch the napkin!',
    assessment: 'Daily: complex blend patterns in context',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Blend + digraph ending: bench (b-e-nch), crush (cr-u-sh), stretch (str-e-tch)',
      'Multi-syllable: break at the syllable boundary — pump-kin, sun-set, nap-kin, sand-storm',
      'These words combine ALL Stage 2-3 skills: blends, digraphs, FLOSS, and VCe in longer words'
    ]
  },
  {
    week: 10,
    phonemes: ['Review'],
    graphemes: ['All Stage 3'],
    intensity: ['CORE'],
    focusWords: ['sunshine', 'himself', 'mistake', 'pancake', 'splendid', 'friendship', 'bathrobe', 'lunchtime'],
    decodableText: 'He made a splendid pancake at lunchtime. The sunshine and friendship felt like no mistake. He put on his bathrobe himself.',
    assessment: 'CHECKPOINT Weeks 9-10',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review VCe + FLOSS + trigraphs + bridge blends in multisyllabic words',
      'Focus on syllable segmentation: sun-shine, him-self, mis-take, pan-cake'
    ]
  },
  {
    week: 11,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 3'],
    intensity: ['CORE'],
    focusWords: ['cupcake', 'lunchtime', 'lifeline', 'homesick', 'drumstick', 'springtime', 'craftsman', 'thrilling'],
    decodableText: 'She felt homesick at lunchtime. The cupcake was a lifeline. The thrilling craftsman made a drumstick in springtime.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 17 Stage 3 items: VCe (a_e, i_e, o_e, u_e), FLOSS (ff, ll, ss, zz), trigraphs (tch, dge), nk, and 5 bridge blend groups',
      'e_e is EXPOSURE only — do NOT assess for mastery',
      'Soft c/g and ph are NOT in this stage — do not assess',
      'Include Stage 1-2 GPCs and blends in cumulative assessment'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 4: Core Vowel Teams & Light Morphology (v5.0 — Restructured)
// Grade: 1st-Spring | Duration: 10 weeks | Phase: Full Alphabetic
// Intensity Profile: 11 ★ CORE | 3 ▲ TEACH | 0 ○ EXPOSURE
// Key changes from v4.1: o→/ŭ/ → Stage 7, ie→/ē/ → Stage 5,
//   -s and -ing morphology added from Stage 8 (inflectional morphology starts 1st grade)
// Items: 12 vowel teams/patterns + 2 morphology = 14
// ═══════════════════════════════════════════════════════════════════════════════
export const stage4WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/ā/'],
    graphemes: ['ai', 'ay'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['rain', 'wait', 'paint', 'train', 'day', 'play', 'stay', 'say', 'way'],
    decodableText: 'Wait for the rain on the train. Play all day and stay this way. I say paint!',
    assessment: 'Daily: ai (middle) vs ay (end)',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ai and ay both say /ā/ — position rule: ai in the middle of words (rain, wait), ay at the end (day, play)'
    ]
  },
  {
    week: 2,
    phonemes: ['/ē/'],
    graphemes: ['ee', 'ea'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['tree', 'see', 'green', 'sleep', 'eat', 'read', 'team', 'beach', 'dream'],
    decodableText: 'The team will eat and read by the green tree. Sleep on the beach and dream.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ee is very reliable — almost always says /ē/',
      'ea usually says /ē/ but can say /ĕ/ (bread) or /ā/ (great) — teach /ē/ first, flex later'
    ]
  },
  {
    week: 3,
    phonemes: ['/ē/', '/ī/'],
    graphemes: ['y→/ē/', 'igh'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['happy', 'puppy', 'sunny', 'funny', 'night', 'light', 'right', 'bright', 'sight'],
    decodableText: 'The happy puppy ran in the bright light. What a funny, sunny night! The sight is right.',
    assessment: 'Daily: y and igh patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'y says /ē/ at the end of multi-syllable words (happy, puppy)',
      'igh — three letters, one sound /ī/ (night, light, right)'
    ]
  },
  {
    week: 4,
    phonemes: ['/ī/', '/ō/'],
    graphemes: ['y→/ī/', 'oa'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['my', 'fly', 'sky', 'try', 'why', 'boat', 'road', 'coat', 'toast'],
    decodableText: 'My boat is on the road. Try to fly in the sky! Why is the coat on the toast?',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'y says /ī/ at the end of one-syllable words (my, fly, sky, try)',
      'oa says /ō/ — very consistent, always in middle of words'
    ]
  },
  {
    // o→/ŭ/ removed → Stage 7; ie→/ī/ kept, ie→/ē/ delayed → Stage 5
    week: 5,
    phonemes: ['/ō/', '/ī/'],
    graphemes: ['ow→/ō/', 'ie→/ī/'],
    intensity: ['CORE', 'TEACH'],
    focusWords: ['show', 'grow', 'snow', 'slow', 'know', 'pie', 'tie', 'lie', 'die', 'dried'],
    decodableText: 'I know the snow will grow slow. Show me the pie! Tie it and lie down. The paint dried.',
    assessment: 'Daily: ow→/ō/ and ie→/ī/',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ow can say /ō/ (show, grow) — the OTHER sound /ow/ (cow) comes in Stage 6',
      'ie says /ī/ at the end of words (pie, tie, lie, die) — ie→/ē/ (chief, field) comes in Stage 5'
    ]
  },
  {
    week: 6,
    phonemes: ['/ū/'],
    graphemes: ['ew', 'ue'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['new', 'few', 'blew', 'grew', 'chew', 'blue', 'true', 'glue', 'clue', 'due'],
    decodableText: 'A few new birds grew and flew. The true blue clue is due. Chew the glue!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ew and ue both say /ū/ — moderate frequency, TEACH level',
      'ew usually at word end; ue at word end'
    ]
  },
  {
    // NEW — Morphology begins: -s (inflectional suffix, moved from Stage 8)
    week: 7,
    phonemes: ['-s inflectional suffix'],
    graphemes: ['-s'],
    intensity: ['CORE'],
    focusWords: ['cats', 'dogs', 'hats', 'runs', 'sits', 'hops', 'trains', 'plays', 'reads', 'sleeps'],
    decodableText: 'The cats and dogs play. She runs and hops. He reads and sleeps on the trains. She sits in the boats.',
    assessment: 'Daily: base word + -s identification',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'FIRST MORPHOLOGY LESSON: introduce the concept of base word + suffix',
      '-s makes nouns plural (cat→cats) and marks third-person verbs (run→runs)',
      '-s says /s/ after voiceless sounds (cats, hops, sits) and /z/ after voiced sounds (dogs, runs, plays)',
      'Have students find the base word inside the longer word: cats = cat + s'
    ]
  },
  {
    // NEW — Morphology: -ing (inflectional suffix, moved from Stage 8)
    week: 8,
    phonemes: ['-ing inflectional suffix'],
    graphemes: ['-ing'],
    intensity: ['CORE'],
    focusWords: ['jumping', 'helping', 'singing', 'thinking', 'raining', 'playing', 'sleeping', 'dreaming', 'reading', 'waiting'],
    decodableText: 'She is jumping and singing in the rain. He is reading and dreaming. We are playing and waiting. They are helping and thinking.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '-ing means the action is happening RIGHT NOW (present progressive)',
      'Just add -ing to the base word when it ends in a consonant cluster or vowel team: jump→jumping, rain→raining, play→playing',
      'CVC words like "run" and "hop" need the doubling rule (run→running) — that rule is taught formally in Stage 8',
      'For now, focus on words where -ing simply attaches with no spelling change'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 4'],
    intensity: ['CORE'],
    focusWords: ['rainbow', 'nightlight', 'toaster', 'snowflake', 'daydream', 'playing', 'waiting', 'sleeping'],
    decodableText: 'The rainbow is shining on the nightlight. The snowflake is falling on the toaster. She is playing and daydreaming while waiting.',
    assessment: 'CHECKPOINT Weeks 9-10: mixed vowel team + morphology practice',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all vowel teams and -s/-ing in compound and multisyllabic words',
      'Practice finding base words: playing = play + ing, trains = train + s'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 4'],
    intensity: ['CORE'],
    focusWords: ['sailboat', 'sunshine', 'bluebird', 'reading', 'sleeping', 'trains', 'boats', 'dreams'],
    decodableText: 'The bluebird is sailing the sailboat in the sunshine. She is reading about trains and boats and sleeping dreams.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 14 Stage 4 items: vowel teams (ai, ay, ee, ea, y→/ē/, igh, y→/ī/, oa, ow→/ō/, ie→/ī/, ew, ue) plus morphology (-s, -ing)',
      'o→/ŭ/ and ie→/ē/ are NOT in this stage — do not assess',
      'Include Stage 1-3 GPCs and blends in cumulative assessment'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 5: R-Controlled Vowels, /oo/, Soft C/G & Morphology (v5.0 — Restructured)
// Grade: 2nd-Fall | Duration: 11 weeks | Phase: Consolidated (Emerging)
// Intensity Profile: 11 ★ CORE | 7 ▲ TEACH | 0 ○ EXPOSURE
// Key changes from v4.1: ie→/ē/ added from Stage 4, soft c/g added from Stage 3,
//   -es and -ed morphology added from Stage 8, W-influence patterns deferred
// Items: 8 r-controlled + 2 oo + 1 ie→/ē/ + 2 soft c/g + 2 morphology + 3 additional = 18
// ═══════════════════════════════════════════════════════════════════════════════
export const stage5WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/ar/', '/er/'],
    graphemes: ['ar', 'er'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['car', 'star', 'park', 'farm', 'dark', 'her', 'fern', 'after', 'sister', 'water'],
    decodableText: 'Her sister parked the car by the dark farm. The fern is after the star. The water is far.',
    assessment: 'Daily: ar and er recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ar/ — very consistent, always says /ar/. "Bossy R changes the vowel sound."',
      '/er/ — highest frequency r-controlled vowel. er, ir, ur all make this same sound — er is taught first.'
    ]
  },
  {
    week: 2,
    phonemes: ['/er/'],
    graphemes: ['ir', 'ur'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['bird', 'first', 'girl', 'shirt', 'dirt', 'hurt', 'turn', 'burn', 'fur', 'church'],
    decodableText: 'The first girl in the shirt got dirt on her fur. The bird hurt its turn at the church. Burn it!',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ir, er, and ur all make the same sound /er/ — teach as "same sound, different spelling"',
      'ir is most common in -ird, -irt, -irst words; ur appears in burn, turn, church, nurse'
    ]
  },
  {
    week: 3,
    phonemes: ['/or/'],
    graphemes: ['or', 'ore'],
    intensity: ['CORE', 'TEACH'],
    focusWords: ['for', 'more', 'store', 'horse', 'corn', 'short', 'sport', 'shore', 'score', 'north'],
    decodableText: 'More corn is at the store for the horse. The short sport is on the north shore. Score!',
    assessment: 'Daily: or and ore patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/or/ — or is CORE (high frequency): for, horse, corn, short, sport, north',
      'ore is TEACH — same sound, word-final position: more, store, shore, score'
    ]
  },
  {
    week: 4,
    phonemes: ['/âr/'],
    graphemes: ['air', 'are'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['hair', 'fair', 'pair', 'stair', 'chair', 'care', 'share', 'stare', 'bare', 'dare'],
    decodableText: 'The fair hair is a pair. Share the chair on the stair. Care to dare and stare? Bare feet!',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'air says /âr/ (hair, fair, pair, stair, chair) — very consistent',
      'are says /âr/ (care, share, stare, bare, dare) — consistent word-final pattern',
      'Both make the same sound — air in the middle, are at the end'
    ]
  },
  {
    week: 5,
    phonemes: ['/oo/ (long)', '/oo/ (short)'],
    graphemes: ['oo→/oo/', 'oo→/ʊ/'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['moon', 'soon', 'spoon', 'room', 'food', 'book', 'look', 'good', 'wood', 'foot'],
    decodableText: 'The moon will soon be in the room. Look at the good book on the wood. Spoon the food with your foot!',
    assessment: 'Daily: two sounds of oo',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'oo has TWO sounds: /oo/ (moon, soon, food) and /ʊ/ (book, look, good, wood)',
      'Teach: try /oo/ first, if it doesn\'t make a word, try /ʊ/. Most words use long /oo/.',
      'This is a critical flex pattern!'
    ]
  },
  {
    // ie→/ē/ delayed from Stage 4; ear→/ēr/ kept from old Stage 5
    week: 6,
    phonemes: ['/ē/', '/ēr/'],
    graphemes: ['ie→/ē/', 'ear→/ēr/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['chief', 'field', 'piece', 'shield', 'grief', 'hear', 'near', 'clear', 'year', 'dear'],
    decodableText: 'The chief heard a clear sound near the field. A dear piece of the shield. Grief this year!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ie says /ē/ in the middle of words (chief, field, piece, shield, grief)',
      'Students learned ie→/ī/ at the END of words in Stage 4 (pie, tie) — now teach ie→/ē/ in the MIDDLE',
      'ear says /ēr/ (hear, near, clear, year, dear) — note: ear can also say /er/ (learn, earth) — flex!'
    ]
  },
  {
    // Soft c/g added from Stage 3 per locked plan
    week: 7,
    phonemes: ['/s/', '/j/'],
    graphemes: ['soft c', 'soft g'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['city', 'cent', 'circle', 'ice', 'place', 'gem', 'giant', 'gym', 'age', 'stage'],
    decodableText: 'The giant in the city had a gem on stage. The ice is a cent in the circle. She ran at the gym. What a nice place!',
    assessment: 'Daily: soft c and soft g patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Soft c: c says /s/ before e, i, y (city, cent, circle, ice, place, nice)',
      'Soft g: g says /j/ before e, i, y (gem, giant, gym, age, stage)',
      'Students already know hard c (/k/) and hard g (/g/) from Stage 2 — now they learn the soft sounds'
    ]
  },
  {
    // oar/our and oul kept from old Stage 5
    week: 8,
    phonemes: ['/or/', '/ʊ/'],
    graphemes: ['oar/our', 'oul'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['board', 'roar', 'soar', 'pour', 'four', 'your', 'court', 'could', 'would', 'should'],
    decodableText: 'The board will roar and soar! Pour four cups for your court. Could you? Would you? Should you!',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'oar says /or/ (board, roar, soar) — less common spelling of /or/',
      'our usually says /or/ (pour, four, your, court)',
      'oul says /ʊ/ (could, would, should) — only three words, but very high frequency. Must memorize!'
    ]
  },
  {
    // NEW — Morphology: -es (inflectional suffix, moved from Stage 8)
    week: 9,
    phonemes: ['-es inflectional suffix'],
    graphemes: ['-es'],
    intensity: ['CORE'],
    focusWords: ['boxes', 'foxes', 'dishes', 'wishes', 'watches', 'catches', 'misses', 'dresses', 'buzzes', 'churches'],
    decodableText: 'She watches and catches the boxes. He wishes for dresses and dishes. The foxes buzz near the churches. She misses them!',
    assessment: 'Daily: when to use -es vs -s',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '-es is used when the base word ends in s, x, z, ch, sh — you NEED the extra syllable to say the word',
      '-es says /ĭz/ and adds a syllable: dish→dish-es, box→box-es, watch→watch-es',
      'Connect to -s from Stage 4: cats needs just -s, but dishes needs -es. Why? Try saying "dishs" — you can\'t!',
      'Base word identification: watches = watch + es, foxes = fox + es'
    ]
  },
  {
    // NEW — Morphology: -ed (inflectional suffix, moved from Stage 8)
    week: 10,
    phonemes: ['-ed inflectional suffix'],
    graphemes: ['-ed'],
    intensity: ['CORE'],
    focusWords: ['jumped', 'helped', 'wished', 'played', 'rained', 'called', 'wanted', 'melted', 'painted', 'started'],
    decodableText: 'She jumped and helped. He wished it rained. They played and called. She wanted and started. The paint melted.',
    assessment: 'CHECKPOINT Weeks 9-10',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '-ed means the action ALREADY HAPPENED (past tense)',
      '-ed has THREE sounds: /t/ after voiceless sounds (jumped, helped, wished), /d/ after voiced sounds (played, rained, called), /ĭd/ after t or d (wanted, melted, painted, started)',
      'Teach the "tap test": say the base word, feel your throat — if it vibrates (voiced), -ed says /d/; if not, /t/; if the word ends in t or d, say /ĭd/',
      'CVC words like "hop" need doubling (hopped) — that spelling rule is taught formally in Stage 8. For now, focus on hearing the three -ed sounds.'
    ]
  },
  {
    week: 11,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 5'],
    intensity: ['CORE'],
    focusWords: ['afternoon', 'starfish', 'barefoot', 'bedroom', 'churches', 'painted', 'rooftop', 'cardboard'],
    decodableText: 'In the afternoon, she painted the barefoot starfish on the cardboard. The churches near the bedroom rooftop looked good.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 18 Stage 5 items: r-controlled (ar, er, ir, ur, or, ore, air, are), oo (long/short), ie→/ē/, ear→/ēr/, soft c/g, oar/our, oul, and morphology (-es, -ed)',
      'Three sounds of -ed: /t/, /d/, /ĭd/ — all three should be assessed',
      'Include Stage 1-4 GPCs, blends, vowel teams, and -s/-ing in cumulative assessment'
    ]
  }
];


// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 6: Diphthongs, Silent Letters & Prefix Morphology (v5.0 — Restructured)
// Grade: 2nd-Spring | Duration: 10 weeks | Phase: Consolidated (Developing)
// Intensity Profile: 10 ★ CORE | 8 ▲ TEACH | 3 ○ EXPOSURE
// Key changes from v4.1: silent letters kn/wr/mb added from Stage 8,
//   un-/re- prefix morphology added from Stage 8, W-influence added from Stage 5
// Items: 6 diphthongs + 6 extended vowels + 3 silent letters + 2 prefixes
//   + 1 W-influence + 3 exposure = 21
// ═══════════════════════════════════════════════════════════════════════════════
export const stage6WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/ow/'],
    graphemes: ['ou', 'ow'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['out', 'house', 'cloud', 'sound', 'cow', 'how', 'now', 'down', 'town', 'brown'],
    decodableText: 'The brown cow ran out of the house now. How did the cloud sound? Go down to town.',
    assessment: 'Daily: ou and ow→/ow/',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ow/ diphthong: mouth glides from /a/ to /oo/',
      'ou in the middle of words (out, house, sound)',
      'ow can say /ow/ (cow, how, now) OR /ō/ (snow, show) — this week focuses on /ow/'
    ]
  },
  {
    week: 2,
    phonemes: ['/oi/'],
    graphemes: ['oi', 'oy'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['oil', 'boil', 'coin', 'point', 'voice', 'boy', 'toy', 'joy', 'enjoy', 'destroy'],
    decodableText: 'The boy will enjoy the toy with joy. Point to the coin in the oil. Boil with a voice. Do not destroy it.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/oi/ diphthong: mouth glides from /o/ to /i/',
      'Position rule: oi in the middle (oil, coin, point), oy at the end (boy, toy, joy)'
    ]
  },
  {
    week: 3,
    phonemes: ['/aw/'],
    graphemes: ['au', 'aw'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['haul', 'cause', 'autumn', 'author', 'saw', 'draw', 'claw', 'lawn', 'dawn', 'hawk'],
    decodableText: 'The author saw a hawk draw with its claw on the lawn at dawn. Haul in the autumn because of the cause.',
    assessment: 'Daily: au and aw patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/aw/ diphthong: mouth opens wide then rounds',
      'Position rule: au in the middle (haul, cause), aw at the end or before n/l/k (saw, lawn, hawk)'
    ]
  },
  {
    week: 4,
    phonemes: ['/ā/', '/ā/'],
    graphemes: ['eigh', 'ey→/ā/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['eight', 'weigh', 'neighbor', 'sleigh', 'they', 'grey', 'obey', 'prey', 'survey'],
    decodableText: 'Eight neighbors weigh the sleigh. They survey in grey. The prey will obey.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'eigh says /ā/ (eight, weigh, neighbor) — less common but important',
      'ey says /ā/ at word end (they, grey, obey) — also can say /ē/ (key, monkey) — that flex is next week'
    ]
  },
  {
    week: 5,
    phonemes: ['/ā/', '/ē/', 'ere flex'],
    graphemes: ['ei', 'ey→/ē/', 'ere'],
    intensity: ['TEACH', 'TEACH', 'TEACH'],
    focusWords: ['vein', 'rein', 'veil', 'key', 'money', 'monkey', 'honey', 'here', 'where', 'there'],
    decodableText: 'The key to the veil is money and honey. The monkey found a vein and a rein. Here, where, and there!',
    assessment: 'Daily: ei, ey, and ere flexibility',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ei says /ā/ (vein, rein, veil) — "i before e except after c" exception',
      'ey says /ē/ at word end (key, money, monkey) — contrasts with /ā/ (they, grey) from last week',
      'ere is variable! /ēr/ (here, severe) vs /âr/ (where, there) — flex strategy: try both!'
    ]
  },
  {
    week: 6,
    phonemes: ['/oo/', '/ā/', '/ō/', '/oo/'],
    graphemes: ['ui', 'ea→/ā/', 'oe', 'eu'],
    intensity: ['TEACH', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE'],
    focusWords: ['fruit', 'juice', 'suit', 'cruise', 'great', 'break', 'steak', 'toe', 'hoe', 'feud'],
    decodableText: 'Chew the fruit juice in the suit on the cruise! That is a great break for the steak. My toe hit the hoe. What a feud!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ui says /oo/ (fruit, juice, suit, cruise) — TEACH level',
      'EXPOSURE only for these rare patterns — encounter, don\'t drill:',
      'ea→/ā/ (great, break, steak) — rare but high frequency',
      'oe says /ō/ (toe, hoe, foe) — rare',
      'eu says /oo/ (feud) — rare, Greek/French origin'
    ]
  },
  {
    // NEW — Silent letters moved from Stage 8 (late 2nd grade per LETRS)
    week: 7,
    phonemes: ['/n/', '/r/', '/m/'],
    graphemes: ['kn', 'wr', 'mb'],
    intensity: ['CORE', 'CORE', 'TEACH'],
    focusWords: ['knee', 'knife', 'knock', 'know', 'knot', 'write', 'wrong', 'wrap', 'wrist', 'lamb', 'climb', 'comb', 'thumb'],
    decodableText: 'I know the knight with the knife will knock on the door. Write the wrong word and wrap your wrist. The lamb will climb with a comb and a thumb.',
    assessment: 'Daily: silent letter recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'Silent k in kn: the k is silent, only say /n/ (knee, knife, knock, know, knot, knight, knit)',
      'Silent w in wr: the w is silent, only say /r/ (write, wrong, wrap, wrist, wreck, wren)',
      'Silent b in mb: the b is silent at the end, only say /m/ (lamb, climb, comb, thumb, dumb, crumb)',
      'These are old English or Germanic spellings — the silent letter was once pronounced!'
    ]
  },
  {
    // NEW — Prefix morphology: un-, re- (most common prefixes, moved from Stage 8)
    week: 8,
    phonemes: ['un- prefix', 're- prefix', 'W-influence'],
    graphemes: ['un-', 're-', 'wa/wor/war'],
    intensity: ['CORE', 'CORE', 'TEACH'],
    focusWords: ['undo', 'unfair', 'unhappy', 'unlock', 'unkind', 'redo', 'reread', 'replay', 'retell', 'rebuild', 'want', 'wash', 'word', 'work', 'warm'],
    decodableText: 'It is unfair and unkind to undo the lock. She is unhappy. Redo and reread the work. Replay and retell it. Rebuild! I want to wash in warm water. That word is worth the work.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'un- means "not" or "opposite": unfair = not fair, undo = reverse doing, unlock = reverse locking',
      're- means "again": redo = do again, reread = read again, rebuild = build again',
      'Prefix + base word: students should identify both parts (un + happy, re + play)',
      'W-influence on vowels: wa says /wŏ/ (want, wash, watch), wor says /wer/ (word, work, world), war says /wor/ (warm, warn) — W changes nearby vowels!'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 6'],
    intensity: ['CORE'],
    focusWords: ['joyful', 'downtown', 'unknown', 'rewrite', 'unkind', 'playground', 'knocking', 'unwrap'],
    decodableText: 'The unknown, unkind boy went downtown to the playground. Rewrite and unwrap! She is knocking joyfully.',
    assessment: 'CHECKPOINT Weeks 9-10: mixed review',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all diphthongs, silent letters, and prefixes in compound and multisyllabic words',
      'Practice prefix identification: un + known = unknown, re + write = rewrite, un + wrap = unwrap'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 6'],
    intensity: ['CORE'],
    focusWords: ['throughout', 'enjoyable', 'appointment', 'unknown', 'rewrite', 'knowledgeable', 'unwrapped', 'thumbprint'],
    decodableText: 'Throughout the appointment, the enjoyable and knowledgeable author rewritten the unknown story. She unwrapped the thumbprint.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 21 Stage 6 items: diphthongs (ou/ow, oi/oy, au/aw), extended vowels (eigh, ey, ei, ere, ui), silent letters (kn, wr, mb), prefixes (un-, re-), W-influence',
      'EXPOSURE patterns (ea→/ā/, oe, eu) are recognition only — do not assess for mastery',
      'Include Stage 1-5 cumulative assessment with morphology (-s, -ing, -es, -ed, un-, re-)'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 7: Variable Patterns, Deferred GPCs & Derivational Morphology (v5.0 — Restructured)
// Grade: 3rd-Fall | Duration: 11 weeks | Phase: Consolidated (Proficient)
// Intensity Profile: 8 ★ CORE | 10 ▲ TEACH | 3 ○ EXPOSURE
// Key changes from v4.1: ph added from Stage 3, o→/ŭ/ added from Stage 4,
//   derivational morphology (pre-, dis-, mis-, -ful, -less, -ly) added from Stage 8,
//   silent letters (kn, wr, mb) already moved to Stage 6
// Items: 2 deferred GPCs + 10 variable patterns + 3 exposure + 6 morphology = 21
// ═══════════════════════════════════════════════════════════════════════════════
export const stage7WeeklyData: WeeklyData[] = [
  {
    // ph and o→/ŭ/ deferred from earlier stages per locked plan
    week: 1,
    phonemes: ['/f/', '/ŭ/'],
    graphemes: ['ph', 'o→/ŭ/'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['phone', 'photo', 'graph', 'elephant', 'dolphin', 'alphabet', 'love', 'come', 'some', 'done', 'mother', 'brother'],
    decodableText: 'My mother and brother love the elephant and dolphin photo. Come graph some of the alphabet on the phone. Done!',
    assessment: 'Daily: ph and o→/ŭ/ recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ph makes /f/ — Greek origin (phone, photo, graph, elephant, dolphin, alphabet, phantom, phrase)',
      'Students already know /f/ spelled "f" (Stage 1) and "ff" (Stage 3) — ph is the third spelling',
      'o→/ŭ/: "o" says /ŭ/ in many high-frequency words (love, come, some, done, from, mother, brother, money, month, front, none)',
      'This is NOT short o (/ŏ/) — contrast: hot (short o) vs. love (o→/ŭ/)'
    ]
  },
  {
    week: 2,
    phonemes: ['/zh/', '/k/'],
    graphemes: ['s→/zh/ / si→/zh/', 'ch→/k/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['measure', 'treasure', 'pleasure', 'vision', 'decision', 'television', 'school', 'stomach', 'orchestra', 'anchor', 'echo'],
    decodableText: 'I take pleasure in the treasure. The vision and decision are on the television. The school orchestra had an anchor and an echo in the stomach.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/zh/ is the LAST consonant phoneme — voiced version of /sh/',
      's says /zh/ in -sure words (measure, treasure, pleasure); si says /zh/ in -sion words (vision, decision)',
      'ch→/k/ is Greek origin (school, stomach, orchestra, anchor, echo, character, chorus)'
    ]
  },
  {
    week: 3,
    phonemes: ['/sh/', '/s/', '/r/'],
    graphemes: ['ch→/sh/', 'sc', 'rh'],
    intensity: ['TEACH', 'TEACH', 'EXPOSURE'],
    focusWords: ['chef', 'machine', 'parachute', 'brochure', 'science', 'scene', 'scent', 'scissors', 'rhinoceros', 'rhythm', 'rhyme'],
    decodableText: 'The chef used the machine and parachute. The science scene had a scent. The scissors cut with rhythm and rhyme near the rhinoceros. Read the brochure!',
    assessment: 'Daily: French ch, Greek sc, and rh',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ch→/sh/ is French origin (chef, machine, parachute, brochure)',
      'Students now know THREE sounds for ch: /ch/ (chip), /k/ (school), /sh/ (chef)',
      'sc says /s/ before e, i (science, scene, scent, scissors) — TEACH',
      'rh says /r/ (rhinoceros, rhythm, rhyme) — Greek origin, EXPOSURE only'
    ]
  },
  {
    week: 4,
    phonemes: ['/ō/', '/oo/', '/aw/'],
    graphemes: ['ough→/ō/', 'ough→/oo/', 'ough→/aw/'],
    intensity: ['TEACH', 'TEACH', 'TEACH'],
    focusWords: ['though', 'dough', 'although', 'through', 'thought', 'bought', 'brought', 'fought', 'sought'],
    decodableText: 'I thought the dough was bought, although the fight was fought and sought. Through and through, though!',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ough has FIVE sounds — teach the three most common first:',
      'ough→/ō/ — though, dough, although',
      'ough→/oo/ — through',
      'ough→/aw/ — thought, bought, brought, fought, sought',
      'Remaining two sounds (rough, bough) come next week as EXPOSURE'
    ]
  },
  {
    week: 5,
    phonemes: ['/ŭf/', '/ow/'],
    graphemes: ['ough→/ŭf/', 'ough→/ow/'],
    intensity: ['EXPOSURE', 'EXPOSURE'],
    focusWords: ['rough', 'tough', 'enough', 'bough', 'plough', 'guess', 'guest', 'guide', 'guitar', 'guard', 'tongue', 'league'],
    decodableText: 'The rough, tough bough is enough. I guess the guilty guest will guide the guitar. Guard your tongue in the league near the plough.',
    assessment: 'Daily: ough EXPOSURE + gu/ue patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ough→/ŭf/ — rough, tough, enough (EXPOSURE — encounter, don\'t drill)',
      'ough→/ow/ — bough, plough (EXPOSURE — very rare)',
      'gu protects hard /g/ before e/i (guess, guest, guide, guitar, guard) — without u, these would be soft g',
      'ue after g keeps it hard (tongue, league, vague)'
    ]
  },
  {
    week: 6,
    phonemes: ['/g/', '/v/', '/z/'],
    graphemes: ['gu/ue', 've (final)', 'se (final)'],
    intensity: ['TEACH', 'TEACH', 'TEACH'],
    focusWords: ['guess', 'guide', 'guard', 'league', 'have', 'give', 'live', 'love', 'above', 'house', 'mouse', 'please', 'choose'],
    decodableText: 'Have and give some love. Live above the house with the mouse. Please choose to guess and guide the guard in the league.',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'gu protects hard /g/ before e/i (guess, guide, guard); ue keeps g hard (league, tongue, vague)',
      'English words don\'t end in v — silent e is added (have, give, live, love, above, twelve)',
      'se at word end can say /z/ (house, mouse, please, choose) or /s/ (horse, nurse) — flex!'
    ]
  },
  {
    // NEW — Derivational morphology: prefixes (moved from Stage 8)
    week: 7,
    phonemes: ['pre- prefix', 'dis- prefix'],
    graphemes: ['pre-', 'dis-'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['preview', 'preschool', 'preheat', 'prefix', 'predict', 'disagree', 'disappear', 'discover', 'dislike', 'dishonest'],
    decodableText: 'Preview the preschool prefix. Preheat and predict! I disagree and dislike the dishonest one. The rabbit will disappear and we will discover it.',
    assessment: 'Daily: prefix identification and meaning',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'pre- means "before": preview = view before, preschool = before school, preheat = heat before, predict = say before',
      'dis- means "not" or "opposite": disagree = not agree, disappear = opposite of appear, dislike = not like',
      'Derivational morphology: these prefixes CHANGE the meaning of the base word'
    ]
  },
  {
    // NEW — Derivational morphology: mis- prefix + -ful suffix
    week: 8,
    phonemes: ['mis- prefix', '-ful suffix'],
    graphemes: ['mis-', '-ful'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['mistake', 'misread', 'misspell', 'misplace', 'misunderstand', 'helpful', 'thankful', 'cheerful', 'powerful', 'careful'],
    decodableText: 'It is a mistake to misread and misspell. Do not misplace or misunderstand! Be helpful, thankful, cheerful, powerful, and careful.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'mis- means "wrong" or "badly": mistake = wrong take, misread = read wrong, misspell = spell wrong',
      '-ful means "full of": helpful = full of help, thankful = full of thanks, cheerful = full of cheer',
      'Connect to un-/re- from Stage 6: students now know 5 prefixes (un-, re-, pre-, dis-, mis-) and 1 suffix (-ful)'
    ]
  },
  {
    // NEW — Derivational morphology: -less and -ly suffixes
    week: 9,
    phonemes: ['-less suffix', '-ly suffix'],
    graphemes: ['-less', '-ly'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['helpless', 'careless', 'endless', 'hopeless', 'fearless', 'slowly', 'quickly', 'sadly', 'carefully', 'kindly'],
    decodableText: 'The helpless, careless child slowly and sadly walked. The endless, hopeless road went on. She quickly, carefully, and kindly helped the fearless dog.',
    assessment: 'Daily: -less and -ly suffix identification',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '-less means "without": helpless = without help, careless = without care, hopeless = without hope',
      '-ly means "in a ___ way": slowly = in a slow way, carefully = in a careful way, kindly = in a kind way',
      'Contrast -ful and -less: helpful (full of help) vs. helpless (without help) — opposites!',
      'Students now know 3 derivational suffixes (-ful, -less, -ly) plus 4 inflectional suffixes (-s, -ing, -es, -ed)'
    ]
  },
  {
    week: 10,
    phonemes: ['Review'],
    graphemes: ['All Stage 7'],
    intensity: ['CORE'],
    focusWords: ['photographer', 'throughout', 'scholarship', 'disagreement', 'misunderstanding', 'hopelessly', 'carefully', 'powerful'],
    decodableText: 'The photographer carefully took a powerful photo throughout the scholarship. The disagreement was a hopelessly sad misunderstanding.',
    assessment: 'CHECKPOINT Weeks 9-10',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all Stage 7 patterns in multisyllabic words',
      'Practice morpheme analysis: dis + agree + ment, mis + understand + ing, hope + less + ly',
      'Focus on flex strategies for variable patterns (ough, ch, se/ve finals)'
    ]
  },
  {
    week: 11,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 7'],
    intensity: ['CORE'],
    focusWords: ['extraordinary', 'circumstances', 'measurement', 'disagreeable', 'misspelling', 'thoughtfully', 'delightful', 'powerlessly'],
    decodableText: 'Under extraordinary circumstances, the measurement was disagreeable. The misspelling was thoughtfully corrected. What a delightful but powerlessly difficult day.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 21 Stage 7 items: ph, o→/ŭ/, /zh/, ch variants (3 sounds), ough (5 sounds), sc, gu/ue, ve/se finals, and 6 derivational affixes (pre-, dis-, mis-, -ful, -less, -ly)',
      'EXPOSURE patterns (ough→/ŭf/, ough→/ow/, rh) are recognition only',
      'Include Stage 1-6 cumulative assessment with all morphology'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 8: Morphology, Schwa & Advanced Patterns (v4.1)
// Grade: 3rd-Spring | Duration: 10 weeks | Phase: Consolidated (Advanced)
// Intensity Profile: 9 ★ CORE | 22 ▲ TEACH | 19 ○ EXPOSURE
// Phase 8A (Weeks 1-5): Core Morphology | Phase 8B (Weeks 6-10): Extended Patterns
// ═══════════════════════════════════════════════════════════════════════════════
export const stage8WeeklyData: WeeklyData[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE 8A: Core Morphology (Weeks 1-5)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    week: 1,
    phonemes: ['-ed (3 sounds)', 'Silent letters'],
    graphemes: ['-ed→/t/', '-ed→/d/', '-ed→/əd/', 'kn', 'wr'],
    intensity: ['CORE', 'CORE', 'CORE', 'TEACH', 'TEACH'],
    focusWords: ['jumped', 'walked', 'played', 'called', 'wanted', 'needed', 'know', 'knife', 'knock', 'knee', 'write', 'wrong', 'wrist', 'wrap'],
    decodableText: 'I jumped and walked. She played and called. We wanted and needed it. I know the knife is by the knee. Write the wrong word on your wrist. Wrap it up!',
    assessment: 'Daily: -ed suffix + silent letters kn/wr',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '-ed has THREE sounds based on final consonant:',
      '/t/ after voiceless consonants (jumped, walked, stopped)',
      '/d/ after voiced consonants and vowels (played, called, rained)',
      '/əd/ after t or d (wanted, needed, started, ended)',
      'kn→/n/ — k is silent (know, knife, knock, knee)',
      'wr→/r/ — w is silent (write, wrong, wrist, wrap)'
    ]
  },
  {
    week: 2,
    phonemes: ['-s/-es', '-ing', 'Silent letters'],
    graphemes: ['-s', '-es', '-ing', 'mb', 'gn'],
    intensity: ['CORE', 'CORE', 'CORE', 'EXPOSURE', 'EXPOSURE'],
    focusWords: ['cats', 'dogs', 'boxes', 'wishes', 'running', 'jumping', 'hopping', 'playing', 'lamb', 'climb', 'comb', 'thumb', 'gnat', 'gnaw', 'sign', 'design'],
    decodableText: 'The cats and dogs are running and jumping. The boxes have wishes. Hopping and playing! The lamb will climb. Use the comb and thumb. The gnat will gnaw at the sign. What a design!',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '-s/-es plurals: -es after s, x, z, ch, sh (boxes, wishes)',
      '-ing: progressive tense',
      'Doubling rule: hop→hopping (double consonant after short vowel)',
      'Drop e rule: make→making',
      'mb→/m/ — b is silent at word end (lamb, climb, comb, thumb) — EXPOSURE',
      'gn→/n/ — g is silent (gnat, gnaw, sign, design) — EXPOSURE'
    ]
  },
  {
    week: 3,
    phonemes: ['un-', 're-'],
    graphemes: ['un-', 're-'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['undo', 'unfair', 'unhappy', 'unlock', 'redo', 'reread', 'return', 'rebuild'],
    decodableText: 'It is unfair to be unhappy. Undo and unlock it. Reread, redo, return, and rebuild!',
    assessment: 'Daily: un- and re- prefixes',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'un- means "not" or "opposite" (CORE — most common prefix)',
      're- means "again" (CORE — second most common prefix)',
      'Research shows: un- and re- together cover 50%+ of all prefixed words!'
    ]
  },
  {
    week: 4,
    phonemes: ['pre-', 'dis-', 'mis-'],
    graphemes: ['pre-', 'dis-', 'mis-'],
    intensity: ['TEACH', 'TEACH', 'TEACH'],
    focusWords: ['preview', 'prepay', 'disagree', 'disappear', 'dislike', 'mistake', 'misread', 'misplace'],
    decodableText: 'Preview and prepay. I disagree and dislike the mistake. It will disappear. Do not misread or misplace.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'pre- means "before" (preview, prepay, predict)',
      'dis- means "not" or "opposite" (disagree, disappear, dislike)',
      'mis- means "wrongly" (mistake, misread, misplace)'
    ]
  },
  {
    week: 5,
    phonemes: ['-er', '-est', '-ly', '-y', 'in-/im-'],
    graphemes: ['-er', '-est', '-ly', '-y', 'in-', 'im-'],
    intensity: ['CORE', 'TEACH', 'TEACH', 'TEACH', 'TEACH', 'TEACH'],
    focusWords: ['faster', 'fastest', 'quickly', 'slowly', 'carefully', 'sunny', 'rainy', 'cloudy', 'inside', 'incorrect', 'impossible', 'impatient'],
    decodableText: 'Run faster — be the fastest! Go quickly and carefully, not slowly. It is sunny, not rainy or cloudy. Go inside. That is incorrect and impossible! Do not be impatient.',
    assessment: '8A MASTERY CHECK (End of Phase 8A)',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      '-er comparative (faster, bigger)',
      '-est superlative (fastest, biggest)',
      '-ly makes adverbs (quickly, slowly, carefully)',
      '-y makes adjectives (sunny, rainy, cloudy)',
      'in- means "not" or "into" (inside, incorrect) — im- before m, p, b (impossible, impatient)',
      'Phase 8A complete — assess inflectional suffixes and core prefixes'
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE 8B: Extended Patterns (Weeks 6-10)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    week: 6,
    phonemes: ['/shən/', '/zhən/'],
    graphemes: ['-tion', '-sion'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['action', 'nation', 'question', 'station', 'vision', 'decision', 'television', 'confusion'],
    decodableText: 'The action at the nation station was a question. The vision and decision on television caused confusion.',
    assessment: 'Daily: -tion and -sion suffixes',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '-tion says /shən/ (action, nation, question) — very high frequency',
      '-sion can say /shən/ (mission) or /zhən/ (vision, decision)',
      'If the root ends in a vowel or r: -sion→/zhən/ (vision)',
      'If the root ends in a consonant: -sion→/shən/ (mission)'
    ]
  },
  {
    week: 7,
    phonemes: ['/shən/', 'schwa /ə/'],
    graphemes: ['-cian', 'schwa'],
    intensity: ['EXPOSURE', 'TEACH'],
    focusWords: ['musician', 'magician', 'physician', 'about', 'away', 'alone', 'around', 'again', 'lemon', 'pencil', 'open'],
    decodableText: 'The musician and magician asked the physician. I am about to go away, alone, around, and again. A lemon, a pencil, and an open door.',
    assessment: 'CHECKPOINT Weeks 6-7',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '-cian says /shən/ — refers to a person (musician, magician, physician) — EXPOSURE',
      'Schwa /ə/ is the unstressed vowel sound — MOST common sound in English',
      'Any vowel can make schwa in unstressed syllables (about, away, lemon, pencil, open)'
    ]
  },
  {
    week: 8,
    phonemes: ['/sh/', 'Tier 2 suffixes'],
    graphemes: ['ti→/sh/', 'ci→/sh/', 'ssi→/sh/', 'sci→/sh/', '-ful', '-less', '-ness', '-ment'],
    intensity: ['TEACH', 'TEACH', 'EXPOSURE', 'EXPOSURE', 'TEACH', 'TEACH', 'TEACH', 'TEACH'],
    focusWords: ['patient', 'partial', 'special', 'official', 'mission', 'permission', 'conscience', 'conscious', 'helpful', 'careless', 'kindness', 'movement'],
    decodableText: 'The patient was partial to the special official. The mission needs permission. Be conscious of your conscience. Be helpful, not careless. Show kindness with movement.',
    assessment: 'Daily: ti/ci/ssi/sci→/sh/ and Tier 2 suffixes',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ti says /sh/ before a vowel (patient, partial, nation)',
      'ci says /sh/ before a vowel (special, official, ancient)',
      'ssi says /sh/ (mission, permission) — EXPOSURE',
      'sci says /sh/ (conscience, conscious) — EXPOSURE',
      '-ful means "full of" (helpful, careful)',
      '-less means "without" (careless, homeless)',
      '-ness makes nouns (kindness, happiness)',
      '-ment makes nouns (movement, payment)'
    ]
  },
  {
    week: 9,
    phonemes: ['Advanced suffixes', 'Rare patterns', 'Doubled consonants'],
    graphemes: ['-ture', '-ous', '-ent', '-ant', '-al', '-or', 'augh', 'eau', 'que', 'gh→/f/', 'x→/gz/', 'wh→/h/', 'dd', 'gg', 'nn', 'pp', 'tt', 'rr'],
    intensity: ['EXPOSURE', 'TEACH', 'TEACH', 'TEACH', 'TEACH', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE', 'EXPOSURE'],
    focusWords: ['picture', 'nature', 'famous', 'dangerous', 'different', 'important', 'natural', 'musical', 'actor', 'inventor', 'daughter', 'caught', 'beautiful', 'unique', 'enough', 'laugh', 'exam', 'exact', 'who', 'whole', 'added', 'bigger', 'dinner', 'happy', 'butter', 'carry'],
    decodableText: 'The picture of nature is famous but dangerous. It is different and important. The natural, musical actor was an inventor. My daughter caught a beautiful, unique thing. Enough! She will laugh. The exam was exact. Who ate the whole dinner? I added bigger butter. I am happy to carry it.',
    assessment: 'CHECKPOINT Weeks 8-9',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      '-ture says /chər/ (picture, nature) — EXPOSURE',
      '-ous makes adjectives (famous, dangerous) — TEACH',
      '-ent makes adjectives (different, confident) — TEACH',
      '-ant makes adjectives (important, pleasant) — TEACH',
      '-al makes adjectives (natural, musical) — TEACH',
      '-or makes nouns for people (actor, inventor) — EXPOSURE',
      'augh says /aw/ (daughter, caught) — EXPOSURE',
      'eau says /ō/ (beautiful) — French origin, EXPOSURE',
      'que says /k/ (unique) — French origin, EXPOSURE',
      'gh says /f/ (enough, laugh) — EXPOSURE',
      'x says /gz/ before stressed vowel (exam, exact) — EXPOSURE',
      'wh says /h/ (who, whole) — EXPOSURE',
      'Doubled consonants (dd, gg, nn, pp, tt, rr) mark short vowels — EXPOSURE'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 8'],
    intensity: ['CORE'],
    focusWords: ['unbelievable', 'disagreement', 'uncomfortable', 'disappointment', 'unfortunately', 'international'],
    decodableText: 'The unbelievable disagreement was uncomfortable. What a disappointment! Unfortunately, it was international.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess -ed (3 sounds), -s/-es, -ing, prefixes (un-, re-, pre-, dis-, mis-), and suffixes.',
      'Students should parse multisyllabic words into morphemes.',
      'EXPOSURE suffixes (-cian, -ture, -or) are recognition only.',
      'Celebrate completion of the 8-Stage Phonics Curriculum! Ready for 4th grade vocabulary and reading comprehension focus.'
    ]
  }
];

