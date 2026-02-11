// ============================================================================
// DECODING DEN CORE 400 - High-Frequency Word List
// ============================================================================
// Source: CPB-Lex (Children's Picture Books Lexicon)
// Green, C., Keogh, K., Sun, H., & O'Brien, B. (2023). Behavior Research Methods.
//
// 400 words mapped to 8-stage GPC sequence with heart word classifications
// and upgrade tracking (when heart words become fully decodable)
// ============================================================================

export interface Core400Word {
  word: string;
  introducedAtStage: number;        // Stage when word is first taught (1-8)
  isHeartWord: boolean;             // True if irregular at introduction
  trickyPart: string | null;        // Explanation of irregularity for heart words
  upgradesAtStage: number | null;   // Stage when heart word becomes decodable (null if never)
  pattern: string;                  // GPC pattern or breakdown
  category: 'decodable' | 'heart' | 'upgrade';  // Classification at introduction
  isPermanentlyIrregular: boolean;  // True if never fully decodable
}

export interface StageWordSummary {
  stage: number;
  gradeBand: string;
  totalNewWords: number;
  decodableCount: number;
  heartWordCount: number;
  upgradeCount: number;
  cumulativeTotal: number;
}

// ============================================================================
// STAGE 1: Core Consonants & Short Vowels (K-Fall)
// GPCs: m, s, a, t, n, p, i, d, f, o, l, h, b, e, u
// ============================================================================

export const STAGE_1_WORDS: Core400Word[] = [
  // DECODABLE WORDS (30)
  { word: "in", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "i+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "it", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "i+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "on", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "o+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "at", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "up", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "u+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "an", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "if", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "i+f", category: "decodable", isPermanentlyIrregular: false },
  { word: "us", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "u+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "and", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+n+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "but", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+u+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "not", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+o+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "had", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+a+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "him", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+i+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "did", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+i+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "hot", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+o+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "lot", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+o+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "let", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "set", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "pet", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "bed", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+e+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "fun", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+u+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "sun", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+u+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "bus", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+u+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "sat", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+a+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "mat", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+a+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "man", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+a+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "ten", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+e+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "hen", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+e+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "hid", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+i+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "bit", introducedAtStage: 1, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+i+t", category: "decodable", isPermanentlyIrregular: false },

  // HEART WORDS (12) - Irregular at Stage 1
  { word: "the", introducedAtStage: 1, isHeartWord: true, trickyPart: "th digraph + schwa vowel", upgradesAtStage: 8, pattern: "th+e(/ə/)", category: "heart", isPermanentlyIrregular: false },
  { word: "a", introducedAtStage: 1, isHeartWord: true, trickyPart: "Says /ə/ as article, not /ă/", upgradesAtStage: 8, pattern: "a(/ə/)", category: "heart", isPermanentlyIrregular: false },
  { word: "to", introducedAtStage: 1, isHeartWord: true, trickyPart: "o says /ōō/", upgradesAtStage: null, pattern: "t+o(/ōō/)", category: "heart", isPermanentlyIrregular: true },
  { word: "I", introducedAtStage: 1, isHeartWord: true, trickyPart: "Says /ī/ (long i); always capitalized", upgradesAtStage: 3, pattern: "I(/ī/)", category: "heart", isPermanentlyIrregular: false },
  { word: "you", introducedAtStage: 1, isHeartWord: true, trickyPart: "Entirely irregular spelling", upgradesAtStage: null, pattern: "y+ou", category: "heart", isPermanentlyIrregular: true },
  { word: "he", introducedAtStage: 1, isHeartWord: true, trickyPart: "e says /ē/ (open syllable)", upgradesAtStage: 3, pattern: "h+e(/ē/)", category: "heart", isPermanentlyIrregular: false },
  { word: "of", introducedAtStage: 1, isHeartWord: true, trickyPart: "o=/ŭ/, f=/v/", upgradesAtStage: null, pattern: "o(/ŭ/)+f(/v/)", category: "heart", isPermanentlyIrregular: true },
  { word: "was", introducedAtStage: 1, isHeartWord: true, trickyPart: "a=/ŭ/, s=/z/", upgradesAtStage: null, pattern: "w+a(/ŭ/)+s(/z/)", category: "heart", isPermanentlyIrregular: true },
  { word: "is", introducedAtStage: 1, isHeartWord: true, trickyPart: "s says /z/", upgradesAtStage: 8, pattern: "i+s(/z/)", category: "heart", isPermanentlyIrregular: false },
  { word: "she", introducedAtStage: 1, isHeartWord: true, trickyPart: "sh digraph + e=/ē/", upgradesAtStage: 3, pattern: "sh+e(/ē/)", category: "heart", isPermanentlyIrregular: false },
  { word: "said", introducedAtStage: 1, isHeartWord: true, trickyPart: "ai says /ĕ/", upgradesAtStage: null, pattern: "s+ai(/ĕ/)+d", category: "heart", isPermanentlyIrregular: true },
  { word: "as", introducedAtStage: 1, isHeartWord: true, trickyPart: "s says /z/", upgradesAtStage: 8, pattern: "a+s(/z/)", category: "heart", isPermanentlyIrregular: false },
];

// ============================================================================
// STAGE 2: Remaining Letters & Digraphs (K-Spring)
// GPCs: r, g, c, k, w, y, v, z, j, x, qu, th, sh, ch, wh, ng, ck
// ============================================================================

export const STAGE_2_WORDS: Core400Word[] = [
  // DECODABLE WORDS (35)
  { word: "can", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+a+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "get", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "got", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+o+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "just", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "j+u+s+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "big", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+i+g", category: "decodable", isPermanentlyIrregular: false },
  { word: "back", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+a+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "yes", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "y+e+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "yet", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "y+e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "run", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+u+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "red", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+e+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "than", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+a+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "that", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+a+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "them", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "then", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+e+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "this", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+i+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "with", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+i+th", category: "decodable", isPermanentlyIrregular: false },
  { word: "when", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+e+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "which", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+i+ch", category: "decodable", isPermanentlyIrregular: false },
  { word: "such", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+u+ch", category: "decodable", isPermanentlyIrregular: false },
  { word: "much", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+u+ch", category: "decodable", isPermanentlyIrregular: false },
  { word: "ship", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sh+i+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "shop", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sh+o+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "ring", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+i+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "sing", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+i+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "bring", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+r+i+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "thing", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+i+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "king", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "k+i+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "long", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+o+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "song", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+o+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "quick", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "qu+i+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "kick", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "k+i+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "pick", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+i+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "stick", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+i+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "trick", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+r+i+ck", category: "decodable", isPermanentlyIrregular: false },
  { word: "went", introducedAtStage: 2, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+e+n+t", category: "decodable", isPermanentlyIrregular: false },

  // HEART WORDS (6)
  { word: "all", introducedAtStage: 2, isHeartWord: true, trickyPart: "a says /aw/ before ll", upgradesAtStage: null, pattern: "a(/aw/)+ll", category: "heart", isPermanentlyIrregular: true },
  { word: "one", introducedAtStage: 2, isHeartWord: true, trickyPart: "Entirely irregular", upgradesAtStage: null, pattern: "one", category: "heart", isPermanentlyIrregular: true },
  { word: "what", introducedAtStage: 2, isHeartWord: true, trickyPart: "a says /ŭ/", upgradesAtStage: null, pattern: "wh+a(/ŭ/)+t", category: "heart", isPermanentlyIrregular: true },
  { word: "do", introducedAtStage: 2, isHeartWord: true, trickyPart: "o says /ōō/", upgradesAtStage: null, pattern: "d+o(/ōō/)", category: "heart", isPermanentlyIrregular: true },
  { word: "call", introducedAtStage: 2, isHeartWord: true, trickyPart: "a says /aw/ before ll", upgradesAtStage: null, pattern: "c+a(/aw/)+ll", category: "heart", isPermanentlyIrregular: true },
  { word: "who", introducedAtStage: 2, isHeartWord: true, trickyPart: "wh=/h/, o=/ōō/", upgradesAtStage: null, pattern: "wh(/h/)+o(/ōō/)", category: "heart", isPermanentlyIrregular: true },
];

// ============================================================================
// STAGE 3: VCe Long Vowels & FLOSS (1st-Fall)
// GPCs: a_e, i_e, o_e, u_e, e_e, ff, ll, ss, zz + open syllables
// ============================================================================

export const STAGE_3_WORDS: Core400Word[] = [
  // FLOSS WORDS (4) - Now decodable with FLOSS rule
  { word: "will", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+i+ll", category: "decodable", isPermanentlyIrregular: false },
  { word: "well", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+e+ll", category: "decodable", isPermanentlyIrregular: false },
  { word: "tell", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+e+ll", category: "decodable", isPermanentlyIrregular: false },
  { word: "fell", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+e+ll", category: "decodable", isPermanentlyIrregular: false },

  // VCe WORDS (16)
  { word: "like", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+i_e+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "make", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+a_e+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "made", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+a_e+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "take", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+a_e+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "came", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+a_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "name", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+a_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "same", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+a_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "game", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+a_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "time", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+i_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "home", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+o_e+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "hope", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+o_e+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "those", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+o_e+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "while", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+i_e+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "white", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+i_e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "use", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "u_e+s", category: "decodable", isPermanentlyIrregular: false },
  { word: "these", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+e_e+s", category: "decodable", isPermanentlyIrregular: false },

  // OPEN SYLLABLE WORDS (Now decodable - upgrades from Stage 1)
  { word: "we", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+e(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "me", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+e(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "be", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+e(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "no", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+o(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "so", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+o(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "go", introducedAtStage: 3, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+o(/ō/)", category: "decodable", isPermanentlyIrregular: false },

  // HEART WORDS (8)
  { word: "come", introducedAtStage: 3, isHeartWord: true, trickyPart: "o_e says /ŭ/ not /ō/", upgradesAtStage: null, pattern: "c+o_e(/ŭ/)+m", category: "heart", isPermanentlyIrregular: true },
  { word: "some", introducedAtStage: 3, isHeartWord: true, trickyPart: "o_e says /ŭ/ not /ō/", upgradesAtStage: null, pattern: "s+o_e(/ŭ/)+m", category: "heart", isPermanentlyIrregular: true },
  { word: "love", introducedAtStage: 3, isHeartWord: true, trickyPart: "o says /ŭ/, ve pattern", upgradesAtStage: 7, pattern: "l+o(/ŭ/)+ve", category: "heart", isPermanentlyIrregular: false },
  { word: "give", introducedAtStage: 3, isHeartWord: true, trickyPart: "i says /ĭ/, ve pattern", upgradesAtStage: 7, pattern: "g+i(/ĭ/)+ve", category: "heart", isPermanentlyIrregular: false },
  { word: "live", introducedAtStage: 3, isHeartWord: true, trickyPart: "i says /ĭ/, ve pattern", upgradesAtStage: 7, pattern: "l+i(/ĭ/)+ve", category: "heart", isPermanentlyIrregular: false },
  { word: "have", introducedAtStage: 3, isHeartWord: true, trickyPart: "a says /ă/, ve pattern", upgradesAtStage: 7, pattern: "h+a(/ă/)+ve", category: "heart", isPermanentlyIrregular: false },
  { word: "done", introducedAtStage: 3, isHeartWord: true, trickyPart: "o_e says /ŭ/", upgradesAtStage: null, pattern: "d+o_e(/ŭ/)+n", category: "heart", isPermanentlyIrregular: true },
  { word: "gone", introducedAtStage: 3, isHeartWord: true, trickyPart: "o_e irregular", upgradesAtStage: null, pattern: "g+o_e+n", category: "heart", isPermanentlyIrregular: true },
];

// ============================================================================
// STAGE 4: Common Vowel Teams & Vowel Discrimination (1st-Spring)
// GPCs: ai, ay, ee, ea, oa, ow→/ō/, igh, y→/ī/, y→/ē/, o→/ŭ/
// ============================================================================

export const STAGE_4_WORDS: Core400Word[] = [
  // DECODABLE WORDS (45)
  { word: "my", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "day", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "way", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "say", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "play", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+l+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "stay", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "may", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "rain", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+ai+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "wait", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+ai+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "see", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+ee", category: "decodable", isPermanentlyIrregular: false },
  { word: "tree", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+r+ee", category: "decodable", isPermanentlyIrregular: false },
  { word: "three", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+r+ee", category: "decodable", isPermanentlyIrregular: false },
  { word: "green", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+r+ee+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "keep", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "k+ee+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "sleep", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+l+ee+p", category: "decodable", isPermanentlyIrregular: false },
  { word: "need", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+ee+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "feel", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+ee+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "eat", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ea+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "read", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+ea+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "sea", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+ea", category: "decodable", isPermanentlyIrregular: false },
  { word: "boat", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+oa+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "road", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+oa+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "coat", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+oa+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "grow", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+r+ow(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "show", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sh+ow(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "snow", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+n+ow(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "slow", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+l+ow(/ō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "night", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+igh+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "right", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+igh+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "light", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+igh+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "high", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+igh", category: "decodable", isPermanentlyIrregular: false },
  { word: "fly", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+l+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "try", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+r+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "why", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "by", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "sky", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+k+y(/ī/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "very", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "v+e+r+y(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "happy", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+a+pp+y(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "funny", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+u+nn+y(/ē/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "from", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+r+o(/ŭ/)+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "own", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ow(/ō/)+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "know", introducedAtStage: 4, isHeartWord: true, trickyPart: "Silent k", upgradesAtStage: 8, pattern: "kn+ow(/ō/)", category: "heart", isPermanentlyIrregular: false },
  { word: "away", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+w+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "today", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+o+d+ay", category: "decodable", isPermanentlyIrregular: false },
  { word: "okay", introducedAtStage: 4, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "o+k+ay", category: "decodable", isPermanentlyIrregular: false },

  // HEART WORDS (5)
  { word: "two", introducedAtStage: 4, isHeartWord: true, trickyPart: "Entirely irregular", upgradesAtStage: null, pattern: "two", category: "heart", isPermanentlyIrregular: true },
  { word: "been", introducedAtStage: 4, isHeartWord: true, trickyPart: "ee says /ĭ/", upgradesAtStage: null, pattern: "b+ee(/ĭ/)+n", category: "heart", isPermanentlyIrregular: true },
  { word: "many", introducedAtStage: 4, isHeartWord: true, trickyPart: "a says /ĕ/", upgradesAtStage: null, pattern: "m+a(/ĕ/)+n+y", category: "heart", isPermanentlyIrregular: true },
  { word: "people", introducedAtStage: 4, isHeartWord: true, trickyPart: "Entirely irregular", upgradesAtStage: null, pattern: "people", category: "heart", isPermanentlyIrregular: true },
  { word: "only", introducedAtStage: 4, isHeartWord: true, trickyPart: "Vowel irregularity", upgradesAtStage: null, pattern: "only", category: "heart", isPermanentlyIrregular: true },
];

// ============================================================================
// STAGE 5: R-Controlled Vowels, /oo/ & W-Influence (2nd-Fall)
// GPCs: ar, er, ir, ur, or, ore, oo, oul, wa, wor, war, our
// ============================================================================

export const STAGE_5_WORDS: Core400Word[] = [
  // DECODABLE WORDS (44)
  { word: "her", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "for", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+or", category: "decodable", isPermanentlyIrregular: false },
  { word: "or", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "or", category: "decodable", isPermanentlyIrregular: false },
  { word: "are", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ar+e", category: "decodable", isPermanentlyIrregular: false },
  { word: "more", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+ore", category: "decodable", isPermanentlyIrregular: false },
  { word: "your", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "y+our", category: "decodable", isPermanentlyIrregular: false },
  { word: "part", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+ar+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "start", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+ar+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "car", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+ar", category: "decodable", isPermanentlyIrregular: false },
  { word: "far", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+ar", category: "decodable", isPermanentlyIrregular: false },
  { word: "star", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+ar", category: "decodable", isPermanentlyIrregular: false },
  { word: "after", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+f+t+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "water", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wa+t+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "over", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "o+v+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "under", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "u+n+d+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "number", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+u+m+b+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "other", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "o(/ŭ/)+th+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "first", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+ir+s+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "girl", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+ir+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "bird", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+ir+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "turn", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+ur+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "work", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wor+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "word", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wor+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "world", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wor+l+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "short", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sh+or+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "story", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+or+y", category: "decodable", isPermanentlyIrregular: false },
  { word: "before", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+e+f+ore", category: "decodable", isPermanentlyIrregular: false },
  { word: "good", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+oo(/ʊ/)+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "look", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+oo(/ʊ/)+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "book", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+oo(/ʊ/)+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "took", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+oo(/ʊ/)+k", category: "decodable", isPermanentlyIrregular: false },
  { word: "too", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+oo(/ōō/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "room", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+oo(/ōō/)+m", category: "decodable", isPermanentlyIrregular: false },
  { word: "food", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+oo(/ōō/)+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "moon", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+oo(/ōō/)+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "soon", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+oo(/ōō/)+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "could", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+oul+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "would", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "w+oul+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "should", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sh+oul+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "every", introducedAtStage: 5, isHeartWord: true, trickyPart: "Schwa in middle syllable", upgradesAtStage: 8, pattern: "e+v+er+y", category: "heart", isPermanentlyIrregular: false },
  { word: "different", introducedAtStage: 5, isHeartWord: true, trickyPart: "Schwa vowels", upgradesAtStage: 8, pattern: "d+i+ff+er+ent", category: "heart", isPermanentlyIrregular: false },
  { word: "his", introducedAtStage: 5, isHeartWord: true, trickyPart: "s says /z/", upgradesAtStage: 8, pattern: "h+i+s(/z/)", category: "heart", isPermanentlyIrregular: false },
  { word: "mother", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+o(/ŭ/)+th+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "father", introducedAtStage: 5, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+a+th+er", category: "decodable", isPermanentlyIrregular: false },
];

// ============================================================================
// STAGE 6: Diphthongs & Extended Vowel Spellings (2nd-Spring)
// GPCs: ou/ow→/ow/, oi/oy, au/aw, eigh, ey→/ā/, ere
// ============================================================================

export const STAGE_6_WORDS: Core400Word[] = [
  // DECODABLE WORDS (31)
  { word: "there", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+ere(/air/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "found", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+ou+n+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "house", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+ou+s+e", category: "decodable", isPermanentlyIrregular: false },
  { word: "town", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+ow+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "brown", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+r+ow+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "owl", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ow+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "cow", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+ow", category: "decodable", isPermanentlyIrregular: false },
  { word: "boy", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+oy", category: "decodable", isPermanentlyIrregular: false },
  { word: "toy", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "t+oy", category: "decodable", isPermanentlyIrregular: false },
  { word: "joy", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "j+oy", category: "decodable", isPermanentlyIrregular: false },
  { word: "point", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+oi+n+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "oil", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "oi+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "saw", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+aw", category: "decodable", isPermanentlyIrregular: false },
  { word: "draw", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+r+aw", category: "decodable", isPermanentlyIrregular: false },
  { word: "great", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+r+ea(/ā/)+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "here", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+ere(/ear/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "year", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "y+ear", category: "decodable", isPermanentlyIrregular: false },
  { word: "out", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ou+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "down", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+ow+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "now", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+ow", category: "decodable", isPermanentlyIrregular: false },
  { word: "how", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "h+ow", category: "decodable", isPermanentlyIrregular: false },
  { word: "they", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "th+ey(/ā/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "where", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wh+ere(/air/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "sound", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+ou+n+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "round", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+ou+n+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "ground", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g+r+ou+n+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "loud", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+ou+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "cloud", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c+l+ou+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "mouth", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+ou+th", category: "decodable", isPermanentlyIrregular: false },
  { word: "south", introducedAtStage: 6, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+ou+th", category: "decodable", isPermanentlyIrregular: false },
  { word: "around", introducedAtStage: 6, isHeartWord: true, trickyPart: "a=schwa", upgradesAtStage: 8, pattern: "a(/ə/)+r+ou+n+d", category: "heart", isPermanentlyIrregular: false },

  // HEART WORDS (4)
  { word: "thought", introducedAtStage: 6, isHeartWord: true, trickyPart: "ough=/aw/", upgradesAtStage: null, pattern: "th+ough(/aw/)+t", category: "heart", isPermanentlyIrregular: true },
  { word: "through", introducedAtStage: 6, isHeartWord: true, trickyPart: "ough=/ōō/", upgradesAtStage: null, pattern: "th+r+ough(/ōō/)", category: "heart", isPermanentlyIrregular: true },
  { word: "enough", introducedAtStage: 6, isHeartWord: true, trickyPart: "ough=/ŭf/", upgradesAtStage: null, pattern: "e+n+ough(/ŭf/)", category: "heart", isPermanentlyIrregular: true },
  { word: "small", introducedAtStage: 6, isHeartWord: true, trickyPart: "a=/aw/ before ll", upgradesAtStage: null, pattern: "s+m+a(/aw/)+ll", category: "heart", isPermanentlyIrregular: true },
  { word: "about", introducedAtStage: 6, isHeartWord: true, trickyPart: "a=schwa", upgradesAtStage: 8, pattern: "a(/ə/)+b+ou+t", category: "heart", isPermanentlyIrregular: false },
];

// ============================================================================
// STAGE 7: Complex & Variable Patterns (3rd-Fall)
// GPCs: soft c, soft g, ough, ch→/k/, ch→/sh/, ve, se→/z/
// ============================================================================

export const STAGE_7_WORDS: Core400Word[] = [
  // DECODABLE WORDS (32)
  { word: "place", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "pl+a_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "nice", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "n+i_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "since", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+i+n+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "change", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ch+a_e+n+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "large", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "l+ar+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "page", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+a_e+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "age", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a_e+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "city", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c(/s/)+i+t+y", category: "decodable", isPermanentlyIrregular: false },
  { word: "school", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sch(/sk/)+oo+l", category: "decodable", isPermanentlyIrregular: false },
  { word: "close", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "cl+o_e+se(/z/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "face", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "f+a_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "space", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sp+a_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "race", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+a_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "ice", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "i_e+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "voice", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "v+oi+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "dance", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+a+n+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "chance", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ch+a+n+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "prince", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "p+r+i+n+ce(/s/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "edge", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "e+dge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "bridge", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "b+r+i+dge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "stage", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+a_e+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "range", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "r+a_e+n+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "strange", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "s+t+r+a_e+n+ge(/j/)", category: "decodable", isPermanentlyIrregular: false },
  { word: "gentle", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g(/j/)+e+n+t+le", category: "decodable", isPermanentlyIrregular: false },
  { word: "giant", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "g(/j/)+i+a+n+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "magic", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "m+a+g(/j/)+i+c", category: "decodable", isPermanentlyIrregular: false },
  { word: "imagine", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "i+m+a+g(/j/)+i+ne", category: "decodable", isPermanentlyIrregular: false },
  { word: "center", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c(/s/)+e+n+t+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "circle", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "c(/s/)+ir+c+le", category: "decodable", isPermanentlyIrregular: false },
  { word: "decide", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "d+e+c(/s/)+i_e+d", category: "decodable", isPermanentlyIrregular: false },
  { word: "except", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ex+c(/s/)+e+p+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "excite", introducedAtStage: 7, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ex+c(/s/)+i_e+t", category: "decodable", isPermanentlyIrregular: false },

  // HEART WORDS (3)
  { word: "once", introducedAtStage: 7, isHeartWord: true, trickyPart: "o says /wŭ/", upgradesAtStage: null, pattern: "o(/wŭ/)+n+ce", category: "heart", isPermanentlyIrregular: true },
  { word: "don't", introducedAtStage: 7, isHeartWord: true, trickyPart: "Contraction", upgradesAtStage: null, pattern: "do+n't", category: "heart", isPermanentlyIrregular: true },
  { word: "won't", introducedAtStage: 7, isHeartWord: true, trickyPart: "Contraction + irregular", upgradesAtStage: null, pattern: "wo+n't", category: "heart", isPermanentlyIrregular: true },
];

// ============================================================================
// STAGE 8: Morphology, Schwa & Advanced Patterns (3rd-Spring)
// GPCs: un-, re-, pre-, dis-, -ed, -s/-es, -ing, -tion, -sion, schwa, kn, wr
// ============================================================================

export const STAGE_8_WORDS: Core400Word[] = [
  // MORPHOLOGY WORDS (Prefix/Suffix - 30)
  { word: "unhappy", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "un+happy", category: "decodable", isPermanentlyIrregular: false },
  { word: "remake", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "re+make", category: "decodable", isPermanentlyIrregular: false },
  { word: "looking", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "look+ing", category: "decodable", isPermanentlyIrregular: false },
  { word: "wanted", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "want+ed", category: "decodable", isPermanentlyIrregular: false },
  { word: "walking", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "walk+ing", category: "decodable", isPermanentlyIrregular: false },
  { word: "jumped", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "jump+ed", category: "decodable", isPermanentlyIrregular: false },
  { word: "faster", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "fast+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "biggest", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "big+g+est", category: "decodable", isPermanentlyIrregular: false },
  { word: "quickly", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "quick+ly", category: "decodable", isPermanentlyIrregular: false },
  { word: "careful", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "care+ful", category: "decodable", isPermanentlyIrregular: false },
  { word: "helpless", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "help+less", category: "decodable", isPermanentlyIrregular: false },
  { word: "national", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "na+tion+al", category: "decodable", isPermanentlyIrregular: false },
  { word: "action", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ac+tion", category: "decodable", isPermanentlyIrregular: false },
  { word: "question", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ques+tion", category: "decodable", isPermanentlyIrregular: false },
  { word: "station", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "sta+tion", category: "decodable", isPermanentlyIrregular: false },
  { word: "direction", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "di+rec+tion", category: "decodable", isPermanentlyIrregular: false },
  { word: "attention", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "at+ten+tion", category: "decodable", isPermanentlyIrregular: false },
  { word: "decision", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "de+ci+sion", category: "decodable", isPermanentlyIrregular: false },
  { word: "mission", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "mis+sion", category: "decodable", isPermanentlyIrregular: false },
  { word: "inside", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "in+side", category: "decodable", isPermanentlyIrregular: false },
  { word: "outside", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "out+side", category: "decodable", isPermanentlyIrregular: false },
  { word: "without", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "with+out", category: "decodable", isPermanentlyIrregular: false },
  { word: "something", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "some+thing", category: "decodable", isPermanentlyIrregular: false },
  { word: "anything", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "any+thing", category: "decodable", isPermanentlyIrregular: false },
  { word: "everything", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "every+thing", category: "decodable", isPermanentlyIrregular: false },
  { word: "nothing", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "no+thing", category: "decodable", isPermanentlyIrregular: false },
  { word: "really", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "real+ly", category: "decodable", isPermanentlyIrregular: false },
  { word: "usually", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "usu+al+ly", category: "decodable", isPermanentlyIrregular: false },
  { word: "important", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "im+por+tant", category: "decodable", isPermanentlyIrregular: false },
  { word: "understand", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "under+stand", category: "decodable", isPermanentlyIrregular: false },

  // SILENT LETTER WORDS (Now decodable - 6)
  { word: "write", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wr+i_e+t", category: "decodable", isPermanentlyIrregular: false },
  { word: "wrong", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wr+o+ng", category: "decodable", isPermanentlyIrregular: false },
  { word: "knee", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "kn+ee", category: "decodable", isPermanentlyIrregular: false },
  { word: "knife", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "kn+i_e+f", category: "decodable", isPermanentlyIrregular: false },
  { word: "knew", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "kn+ew", category: "decodable", isPermanentlyIrregular: false },
  { word: "written", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "wr+i+tt+en", category: "decodable", isPermanentlyIrregular: false },

  // ADDITIONAL HIGH-FREQUENCY (12)
  { word: "because", introducedAtStage: 8, isHeartWord: true, trickyPart: "Multiple irregularities", upgradesAtStage: null, pattern: "be+cause", category: "heart", isPermanentlyIrregular: true },
  { word: "together", introducedAtStage: 8, isHeartWord: true, trickyPart: "'to' part irregular", upgradesAtStage: null, pattern: "to+geth+er", category: "heart", isPermanentlyIrregular: true },
  { word: "into", introducedAtStage: 8, isHeartWord: true, trickyPart: "'to' part irregular", upgradesAtStage: null, pattern: "in+to", category: "heart", isPermanentlyIrregular: true },
  { word: "both", introducedAtStage: 8, isHeartWord: true, trickyPart: "o=/ō/ irregular position", upgradesAtStage: null, pattern: "b+o(/ō/)+th", category: "heart", isPermanentlyIrregular: true },
  { word: "most", introducedAtStage: 8, isHeartWord: true, trickyPart: "o=/ō/ irregular position", upgradesAtStage: null, pattern: "m+o(/ō/)+s+t", category: "heart", isPermanentlyIrregular: true },
  { word: "put", introducedAtStage: 8, isHeartWord: true, trickyPart: "u=/ʊ/ irregular", upgradesAtStage: null, pattern: "p+u(/ʊ/)+t", category: "heart", isPermanentlyIrregular: true },
  { word: "again", introducedAtStage: 8, isHeartWord: true, trickyPart: "ai=/ĕ/", upgradesAtStage: null, pattern: "a+g+ai(/ĕ/)+n", category: "heart", isPermanentlyIrregular: true },
  { word: "also", introducedAtStage: 8, isHeartWord: true, trickyPart: "a=/aw/ positional", upgradesAtStage: null, pattern: "a(/aw/)+l+so", category: "heart", isPermanentlyIrregular: true },
  { word: "always", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "al+ways", category: "decodable", isPermanentlyIrregular: false },
  { word: "another", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "a+n+o(/ŭ/)+th+er", category: "decodable", isPermanentlyIrregular: false },
  { word: "between", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "be+tw+ee+n", category: "decodable", isPermanentlyIrregular: false },
  { word: "example", introducedAtStage: 8, isHeartWord: false, trickyPart: null, upgradesAtStage: null, pattern: "ex+am+ple", category: "decodable", isPermanentlyIrregular: false },
];

// ============================================================================
// COMBINED EXPORTS & HELPER FUNCTIONS
// ============================================================================

export const ALL_CORE_400_WORDS: Core400Word[] = [
  ...STAGE_1_WORDS,
  ...STAGE_2_WORDS,
  ...STAGE_3_WORDS,
  ...STAGE_4_WORDS,
  ...STAGE_5_WORDS,
  ...STAGE_6_WORDS,
  ...STAGE_7_WORDS,
  ...STAGE_8_WORDS,
];

// Get words by stage
export function getWordsByStage(stage: number): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.introducedAtStage === stage);
}

// Get heart words by stage
export function getHeartWordsByStage(stage: number): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.introducedAtStage === stage && w.isHeartWord);
}

// Get decodable words by stage
export function getDecodableWordsByStage(stage: number): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.introducedAtStage === stage && !w.isHeartWord);
}

// Get words that upgrade at a specific stage
export function getUpgradesAtStage(stage: number): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.upgradesAtStage === stage);
}

// Get all permanently irregular words
export function getPermanentlyIrregularWords(): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.isPermanentlyIrregular);
}

// Get cumulative words up to and including a stage
export function getCumulativeWords(throughStage: number): Core400Word[] {
  return ALL_CORE_400_WORDS.filter(w => w.introducedAtStage <= throughStage);
}

// Check if a word is decodable at a given stage (accounting for upgrades)
export function isWordDecodableAtStage(word: string, stage: number): boolean {
  const entry = ALL_CORE_400_WORDS.find(w => w.word.toLowerCase() === word.toLowerCase());
  if (!entry) return false;

  // If introduced after this stage, not available yet
  if (entry.introducedAtStage > stage) return false;

  // If it's decodable from introduction, yes
  if (!entry.isHeartWord) return true;

  // If it's a heart word, check if it upgrades by this stage
  if (entry.upgradesAtStage && entry.upgradesAtStage <= stage) return true;

  return false;
}

// Get summary statistics by stage
export function getStageSummary(stage: number): StageWordSummary {
  const stageWords = getWordsByStage(stage);
  const upgrades = getUpgradesAtStage(stage);
  const cumulative = getCumulativeWords(stage);

  const gradeBands: { [key: number]: string } = {
    1: "K-Fall",
    2: "K-Spring",
    3: "1st-Fall",
    4: "1st-Spring",
    5: "2nd-Fall",
    6: "2nd-Spring",
    7: "3rd-Fall",
    8: "3rd-Spring"
  };

  return {
    stage,
    gradeBand: gradeBands[stage] || "Unknown",
    totalNewWords: stageWords.length,
    decodableCount: stageWords.filter(w => !w.isHeartWord).length,
    heartWordCount: stageWords.filter(w => w.isHeartWord).length,
    upgradeCount: upgrades.length,
    cumulativeTotal: cumulative.length
  };
}

// Convert to the existing SightWord interface format for compatibility
export interface LegacySightWord {
  word: string;
  isHeartWord: boolean;
  trickyPart: string | null;
  isNew: boolean;
  isUpgrade: boolean;
}

export function convertToLegacySightWord(
  word: Core400Word,
  currentStage: number,
  previouslyIntroduced: Set<string>
): LegacySightWord {
  const isUpgrade = word.upgradesAtStage === currentStage;
  const isNew = word.introducedAtStage === currentStage && !previouslyIntroduced.has(word.word);

  // Determine if still a heart word at this stage
  const stillHeartWord = word.isHeartWord &&
    (word.upgradesAtStage === null || word.upgradesAtStage > currentStage);

  return {
    word: word.word,
    isHeartWord: stillHeartWord,
    trickyPart: stillHeartWord ? word.trickyPart : null,
    isNew,
    isUpgrade
  };
}

// Get sight words for a specific stage in legacy format
export function getSightWordsForStage(stage: number): LegacySightWord[] {
  const previousStages = getCumulativeWords(stage - 1);
  const previouslyIntroduced = new Set(previousStages.map(w => w.word));

  // Get words introduced at this stage
  const newWords = getWordsByStage(stage);

  // Get words that upgrade at this stage
  const upgrades = getUpgradesAtStage(stage);

  // Combine and convert
  const allRelevant = [...newWords, ...upgrades.filter(w => w.introducedAtStage < stage)];

  return allRelevant.map(w => convertToLegacySightWord(w, stage, previouslyIntroduced));
}
