// ============================================================================
// DECODING DEN CORE 400 - Weekly Distribution Map
// ============================================================================
// Maps Core 400 words to specific weeks within each stage
// Weeks 1-7: Teaching weeks (new words introduced)
// Weeks 8-9: Review weeks (no new words)
// Week 10: Mastery week (no new words)
//
// Distribution principles:
// 1. Heart words distributed early (essential for reading any text)
// 2. Decodable words aligned with GPCs taught that week
// 3. Words build cumulatively within each stage
// ============================================================================

import {
  Core400Word,
  STAGE_1_WORDS,
  STAGE_2_WORDS,
  STAGE_3_WORDS,
  STAGE_4_WORDS,
  STAGE_5_WORDS,
  STAGE_6_WORDS,
  STAGE_7_WORDS,
  STAGE_8_WORDS,
  ALL_CORE_400_WORDS
} from './core400Words';

// Extended interface with week assignment
export interface WeeklyCore400Word extends Core400Word {
  introducedAtWeek: number;  // Week 1-7 within the stage
}

// Weekly word collection for a single week
export interface WeekWordCollection {
  week: number;
  newDecodableWords: WeeklyCore400Word[];
  newHeartWords: WeeklyCore400Word[];
  upgradesThisWeek: WeeklyCore400Word[];  // Heart words becoming decodable
  cumulativeDecodable: WeeklyCore400Word[];
  cumulativeHeart: WeeklyCore400Word[];
}

// ============================================================================
// STAGE 1: Core Consonants & Short Vowels (K-Fall)
// GPCs by week:
//   Week 1: m, s, a
//   Week 2: t, n (Checkpoint)
//   Week 3: p, i
//   Week 4: d, f (Checkpoint)
//   Week 5: o, l
//   Week 6: h, b (Checkpoint)
//   Week 7: e, u
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_1_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS - distributed across teaching weeks
  "the": 1,    // Most essential - introduce immediately
  "a": 1,      // Essential article
  "I": 2,      // Essential pronoun
  "to": 2,     // Essential preposition
  "is": 3,     // Essential verb
  "you": 3,    // Essential pronoun
  "he": 4,     // Pronoun
  "she": 4,    // Pronoun
  "of": 5,     // High frequency
  "was": 5,    // High frequency verb
  "said": 6,   // Essential for dialogue
  "as": 6,     // Conjunction

  // DECODABLE WORDS - aligned with GPCs
  // Week 2 (t, n added): Words using m, s, a, t, n
  "an": 2,
  "at": 2,
  "sat": 2,
  "mat": 2,
  "man": 2,

  // Week 3 (p, i added): Words using all + p, i
  "in": 3,
  "it": 3,
  "and": 3,    // Now decodable with d from preview

  // Week 4 (d, f added): Words using all + d, f
  "if": 4,
  "had": 4,
  "him": 4,
  "did": 4,

  // Week 5 (o, l added): Words using all + o, l
  "on": 5,
  "not": 5,
  "lot": 5,
  "let": 5,
  "hot": 5,

  // Week 6 (h, b added): Words using all + h, b
  "but": 6,
  "bed": 6,
  "bit": 6,

  // Week 7 (e, u added): Words using all + e, u
  "up": 7,
  "us": 7,
  "set": 7,
  "pet": 7,
  "ten": 7,
  "hen": 7,
  "hid": 7,
  "fun": 7,
  "sun": 7,
  "bus": 7,
};

// ============================================================================
// STAGE 2: Remaining Letters & Digraphs (K-Spring)
// GPCs by week:
//   Week 1: r, g
//   Week 2: k, c (hard), ck (Checkpoint)
//   Week 3: j, v
//   Week 4: w, wh (Checkpoint)
//   Week 5: y, z
//   Week 6: x, qu (Checkpoint)
//   Week 7: ch, sh, th, ng
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_2_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "all": 1,
  "one": 2,
  "what": 4,   // wh week
  "do": 3,
  "call": 5,
  "who": 4,    // wh week

  // DECODABLE WORDS
  // Week 1 (r, g): Words with r, g
  "run": 1,
  "red": 1,
  "got": 1,
  "big": 1,

  // Week 2 (k, c, ck): Words with k, c, ck
  "can": 2,
  "get": 2,
  "back": 2,
  "kick": 2,
  "pick": 2,
  "stick": 2,
  "trick": 2,
  "quick": 2,

  // Week 3 (j, v): Words with j, v
  "just": 3,
  "yet": 3,

  // Week 4 (w, wh): Words with w, wh
  "with": 4,
  "when": 4,
  "which": 4,
  "went": 4,

  // Week 5 (y, z): Words with y, z
  "yes": 5,

  // Week 6 (x, qu): Consolidation + x, qu

  // Week 7 (ch, sh, th, ng): Digraph words
  "than": 7,
  "that": 7,
  "them": 7,
  "then": 7,
  "this": 7,
  "such": 7,
  "much": 7,
  "ship": 7,
  "shop": 7,
  "ring": 7,
  "sing": 7,
  "bring": 7,
  "thing": 7,
  "king": 7,
  "long": 7,
  "song": 7,
};

// ============================================================================
// STAGE 3: VCe Long Vowels & FLOSS (1st-Fall)
// GPCs by week:
//   Week 1: a_e (magic e with a)
//   Week 2: i_e (magic e with i) (Checkpoint)
//   Week 3: o_e (magic e with o)
//   Week 4: u_e, e_e (Checkpoint)
//   Week 5: ff, ll (FLOSS rule)
//   Week 6: ss, zz (FLOSS rule) (Checkpoint)
//   Week 7: Open syllables (he, she, we, me, be, no, so, go)
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_3_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "come": 1,
  "some": 1,
  "have": 2,
  "give": 3,
  "live": 3,
  "love": 4,
  "done": 5,
  "gone": 5,

  // VCe WORDS
  // Week 1 (a_e)
  "make": 1,
  "made": 1,
  "take": 1,
  "came": 1,
  "name": 1,
  "same": 1,
  "game": 1,

  // Week 2 (i_e)
  "like": 2,
  "time": 2,
  "while": 2,
  "white": 2,

  // Week 3 (o_e)
  "home": 3,
  "hope": 3,
  "those": 3,

  // Week 4 (u_e, e_e)
  "use": 4,
  "these": 4,

  // Week 5 (ff, ll - FLOSS)
  "will": 5,
  "well": 5,
  "tell": 5,
  "fell": 5,

  // Week 7 (Open syllables - UPGRADES from heart words)
  "we": 7,
  "me": 7,
  "be": 7,
  "no": 7,
  "so": 7,
  "go": 7,
};

// ============================================================================
// STAGE 4: Common Vowel Teams (1st-Spring)
// GPCs by week:
//   Week 1: ai, ay
//   Week 2: ee (Checkpoint)
//   Week 3: ea
//   Week 4: oa, ow→/ō/ (Checkpoint)
//   Week 5: igh, y→/ī/
//   Week 6: y→/ē/ (Checkpoint)
//   Week 7: o→/ŭ/, Long vowel exceptions
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_4_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "know": 1,   // Silent k - temporary heart word
  "two": 2,
  "been": 3,
  "many": 4,
  "people": 5,
  "only": 6,

  // DECODABLE WORDS
  // Week 1 (ai, ay)
  "my": 1,
  "day": 1,
  "way": 1,
  "say": 1,
  "play": 1,
  "stay": 1,
  "may": 1,
  "rain": 1,
  "wait": 1,
  "away": 1,
  "today": 1,
  "okay": 1,

  // Week 2 (ee)
  "see": 2,
  "tree": 2,
  "three": 2,
  "green": 2,
  "keep": 2,
  "sleep": 2,
  "need": 2,
  "feel": 2,

  // Week 3 (ea)
  "eat": 3,
  "read": 3,
  "sea": 3,

  // Week 4 (oa, ow→/ō/)
  "boat": 4,
  "road": 4,
  "coat": 4,
  "grow": 4,
  "show": 4,
  "snow": 4,
  "slow": 4,
  "own": 4,

  // Week 5 (igh, y→/ī/)
  "night": 5,
  "right": 5,
  "light": 5,
  "high": 5,
  "fly": 5,
  "try": 5,
  "why": 5,
  "by": 5,
  "sky": 5,

  // Week 6 (y→/ē/)
  "very": 6,
  "happy": 6,
  "funny": 6,

  // Week 7 (o→/ŭ/)
  "from": 7,
};

// ============================================================================
// STAGE 5: R-Controlled Vowels, /oo/ & W-Influence (2nd-Fall)
// GPCs by week:
//   Week 1: ar
//   Week 2: er, ir, ur (Checkpoint)
//   Week 3: or, ore
//   Week 4: oo→/ōō/ (moon) (Checkpoint)
//   Week 5: oo→/ʊ/ (book)
//   Week 6: oul, wa, wor (Checkpoint)
//   Week 7: our, war
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_5_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "every": 2,
  "different": 3,
  "his": 4,

  // DECODABLE WORDS
  // Week 1 (ar)
  "are": 1,
  "part": 1,
  "start": 1,
  "car": 1,
  "far": 1,
  "star": 1,

  // Week 2 (er, ir, ur)
  "her": 2,
  "after": 2,
  "under": 2,
  "number": 2,
  "other": 2,
  "first": 2,
  "girl": 2,
  "bird": 2,
  "turn": 2,
  "over": 2,

  // Week 3 (or, ore)
  "for": 3,
  "or": 3,
  "more": 3,
  "short": 3,
  "story": 3,
  "before": 3,

  // Week 4 (oo→/ōō/)
  "too": 4,
  "room": 4,
  "food": 4,
  "moon": 4,
  "soon": 4,

  // Week 5 (oo→/ʊ/)
  "good": 5,
  "look": 5,
  "book": 5,
  "took": 5,

  // Week 6 (oul, wa, wor)
  "could": 6,
  "would": 6,
  "should": 6,
  "water": 6,
  "work": 6,
  "word": 6,
  "world": 6,

  // Week 7 (our)
  "your": 7,
  "mother": 7,
  "father": 7,
};

// ============================================================================
// STAGE 6: Diphthongs & Extended Vowel Spellings (2nd-Spring)
// GPCs by week:
//   Week 1: ou→/ow/
//   Week 2: ow→/ow/ (Checkpoint)
//   Week 3: oi, oy
//   Week 4: au, aw (Checkpoint)
//   Week 5: ey→/ā/, ere
//   Week 6: ear (Checkpoint)
//   Week 7: Review diphthongs
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_6_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "thought": 1,
  "through": 2,
  "enough": 3,
  "small": 4,
  "about": 5,
  "around": 6,

  // DECODABLE WORDS
  // Week 1 (ou→/ow/)
  "out": 1,
  "found": 1,
  "house": 1,
  "sound": 1,
  "round": 1,
  "ground": 1,
  "loud": 1,
  "cloud": 1,
  "mouth": 1,
  "south": 1,

  // Week 2 (ow→/ow/)
  "down": 2,
  "now": 2,
  "how": 2,
  "town": 2,
  "brown": 2,
  "owl": 2,
  "cow": 2,

  // Week 3 (oi, oy)
  "boy": 3,
  "toy": 3,
  "joy": 3,
  "point": 3,
  "oil": 3,

  // Week 4 (au, aw)
  "saw": 4,
  "draw": 4,

  // Week 5 (ey→/ā/, ere)
  "they": 5,
  "there": 5,
  "where": 5,
  "here": 5,

  // Week 6 (ear)
  "year": 6,
  "great": 6,
};

// ============================================================================
// STAGE 7: Complex & Variable Patterns (3rd-Fall)
// GPCs by week:
//   Week 1: soft c (ce, ci, cy)
//   Week 2: soft g (ge, gi, gy) (Checkpoint)
//   Week 3: -ce, -ge endings
//   Week 4: dge (Checkpoint)
//   Week 5: ch→/k/, ch→/sh/
//   Week 6: -ve endings (Checkpoint)
//   Week 7: se→/z/
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_7_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "once": 1,
  "don't": 5,
  "won't": 5,

  // DECODABLE WORDS
  // Week 1 (soft c)
  "place": 1,
  "nice": 1,
  "since": 1,
  "face": 1,
  "space": 1,
  "race": 1,
  "ice": 1,
  "city": 1,
  "center": 1,
  "circle": 1,
  "decide": 1,
  "except": 1,
  "excite": 1,

  // Week 2 (soft g)
  "change": 2,
  "large": 2,
  "page": 2,
  "age": 2,
  "stage": 2,
  "range": 2,
  "strange": 2,
  "gentle": 2,
  "giant": 2,
  "magic": 2,
  "imagine": 2,

  // Week 3 (-ce, -ge endings)
  "voice": 3,
  "dance": 3,
  "chance": 3,
  "prince": 3,

  // Week 4 (dge)
  "edge": 4,
  "bridge": 4,

  // Week 5 (ch→/k/)
  "school": 5,

  // Week 6 (-ve endings) - UPGRADES for love, give, live, have
  "close": 6,
};

// ============================================================================
// STAGE 8: Morphology, Schwa & Advanced Patterns (3rd-Spring)
// GPCs by week:
//   Week 1: un-, re- prefixes
//   Week 2: -ed, -ing suffixes (Checkpoint)
//   Week 3: -er, -est, -ly suffixes
//   Week 4: -ful, -less suffixes (Checkpoint)
//   Week 5: -tion, -sion
//   Week 6: kn, wr (Checkpoint)
//   Week 7: Schwa, compound words
//   Weeks 8-9: Review
//   Week 10: Mastery
// ============================================================================
const STAGE_8_WEEK_MAP: { [word: string]: number } = {
  // HEART WORDS
  "because": 1,
  "together": 2,
  "into": 3,
  "both": 4,
  "most": 4,
  "put": 5,
  "again": 6,
  "also": 7,

  // DECODABLE WORDS
  // Week 1 (un-, re-)
  "unhappy": 1,
  "remake": 1,

  // Week 2 (-ed, -ing)
  "looking": 2,
  "wanted": 2,
  "walking": 2,
  "jumped": 2,

  // Week 3 (-er, -est, -ly)
  "faster": 3,
  "biggest": 3,
  "quickly": 3,
  "really": 3,
  "usually": 3,

  // Week 4 (-ful, -less)
  "careful": 4,
  "helpless": 4,

  // Week 5 (-tion, -sion)
  "national": 5,
  "action": 5,
  "question": 5,
  "station": 5,
  "direction": 5,
  "attention": 5,
  "decision": 5,
  "mission": 5,

  // Week 6 (kn, wr)
  "write": 6,
  "wrong": 6,
  "knee": 6,
  "knife": 6,
  "knew": 6,
  "written": 6,

  // Week 7 (Schwa, compounds)
  "inside": 7,
  "outside": 7,
  "without": 7,
  "something": 7,
  "anything": 7,
  "everything": 7,
  "nothing": 7,
  "important": 7,
  "understand": 7,
  "another": 7,
  "between": 7,
  "example": 7,
  "always": 7,
};

// ============================================================================
// UNIFIED WEEK MAP - All stages combined
// ============================================================================
export const STAGE_WEEK_MAPS: { [stage: number]: { [word: string]: number } } = {
  1: STAGE_1_WEEK_MAP,
  2: STAGE_2_WEEK_MAP,
  3: STAGE_3_WEEK_MAP,
  4: STAGE_4_WEEK_MAP,
  5: STAGE_5_WEEK_MAP,
  6: STAGE_6_WEEK_MAP,
  7: STAGE_7_WEEK_MAP,
  8: STAGE_8_WEEK_MAP,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the week a word is introduced within its stage
 */
export function getWordWeek(word: string, stage: number): number {
  const stageMap = STAGE_WEEK_MAPS[stage];
  if (!stageMap) return 1; // Default to week 1 if stage not found
  return stageMap[word] || 1; // Default to week 1 if word not mapped
}

/**
 * Get all words introduced at a specific stage and week
 */
export function getWordsForStageWeek(stage: number, week: number): WeeklyCore400Word[] {
  const stageWords = getStageWordArray(stage);
  const weekMap = STAGE_WEEK_MAPS[stage] || {};

  return stageWords
    .filter(word => (weekMap[word.word] || 1) === week)
    .map(word => ({
      ...word,
      introducedAtWeek: weekMap[word.word] || 1
    }));
}

/**
 * Get decodable words for a specific stage and week
 */
export function getDecodableWordsForWeek(stage: number, week: number): WeeklyCore400Word[] {
  return getWordsForStageWeek(stage, week).filter(w => !w.isHeartWord);
}

/**
 * Get heart words for a specific stage and week
 */
export function getHeartWordsForWeek(stage: number, week: number): WeeklyCore400Word[] {
  return getWordsForStageWeek(stage, week).filter(w => w.isHeartWord);
}

/**
 * Get cumulative words through a specific week (within a stage)
 */
export function getCumulativeWordsForWeek(stage: number, throughWeek: number): WeeklyCore400Word[] {
  const stageWords = getStageWordArray(stage);
  const weekMap = STAGE_WEEK_MAPS[stage] || {};

  return stageWords
    .filter(word => (weekMap[word.word] || 1) <= throughWeek)
    .map(word => ({
      ...word,
      introducedAtWeek: weekMap[word.word] || 1
    }));
}

/**
 * Get words that upgrade at a specific stage and week
 * (Heart words that become decodable due to GPC being taught)
 */
export function getUpgradesForWeek(stage: number, week: number): WeeklyCore400Word[] {
  // Find all words that upgrade at this stage
  const upgradesAtStage = ALL_CORE_400_WORDS.filter(w => w.upgradesAtStage === stage);
  const weekMap = STAGE_WEEK_MAPS[stage] || {};

  // Check if they upgrade at this specific week (based on when teaching happens)
  return upgradesAtStage
    .filter(word => (weekMap[word.word] || 7) === week) // Upgrades typically happen in week 7
    .map(word => ({
      ...word,
      introducedAtWeek: weekMap[word.word] || 7
    }));
}

/**
 * Get complete word collection for a specific week
 */
export function getWeekWordCollection(stage: number, week: number): WeekWordCollection {
  const newWords = getWordsForStageWeek(stage, week);
  const cumulativeWords = getCumulativeWordsForWeek(stage, week);
  const upgrades = getUpgradesForWeek(stage, week);

  return {
    week,
    newDecodableWords: newWords.filter(w => !w.isHeartWord),
    newHeartWords: newWords.filter(w => w.isHeartWord),
    upgradesThisWeek: upgrades,
    cumulativeDecodable: cumulativeWords.filter(w => !w.isHeartWord),
    cumulativeHeart: cumulativeWords.filter(w => w.isHeartWord)
  };
}

/**
 * Helper to get stage-specific word array
 */
function getStageWordArray(stage: number): Core400Word[] {
  switch (stage) {
    case 1: return STAGE_1_WORDS;
    case 2: return STAGE_2_WORDS;
    case 3: return STAGE_3_WORDS;
    case 4: return STAGE_4_WORDS;
    case 5: return STAGE_5_WORDS;
    case 6: return STAGE_6_WORDS;
    case 7: return STAGE_7_WORDS;
    case 8: return STAGE_8_WORDS;
    default: return [];
  }
}

/**
 * Get all weeks data for a stage (for display)
 */
export function getAllWeeksForStage(stage: number): WeekWordCollection[] {
  const weeks: WeekWordCollection[] = [];

  // Weeks 1-7 are teaching weeks
  for (let week = 1; week <= 7; week++) {
    weeks.push(getWeekWordCollection(stage, week));
  }

  // Weeks 8-10 have no new words (review and mastery)
  for (let week = 8; week <= 10; week++) {
    weeks.push({
      week,
      newDecodableWords: [],
      newHeartWords: [],
      upgradesThisWeek: [],
      cumulativeDecodable: getCumulativeWordsForWeek(stage, 7).filter(w => !w.isHeartWord),
      cumulativeHeart: getCumulativeWordsForWeek(stage, 7).filter(w => w.isHeartWord)
    });
  }

  return weeks;
}

/**
 * Get summary stats for a week
 */
export function getWeekSummary(stage: number, week: number): {
  newDecodable: number;
  newHeart: number;
  upgrades: number;
  cumulativeDecodable: number;
  cumulativeHeart: number;
} {
  const collection = getWeekWordCollection(stage, week);
  return {
    newDecodable: collection.newDecodableWords.length,
    newHeart: collection.newHeartWords.length,
    upgrades: collection.upgradesThisWeek.length,
    cumulativeDecodable: collection.cumulativeDecodable.length,
    cumulativeHeart: collection.cumulativeHeart.length
  };
}

// ============================================================================
// LEGACY COMPATIBILITY
// ============================================================================

// Interface matching existing sightWords in weekly data
export interface LegacyWeeklySightWord {
  word: string;
  isHeartWord: boolean;
  trickyPart: string | null;
  isNew: boolean;
  isUpgrade: boolean;
}

/**
 * Get sight words for a specific week in legacy format
 * (Compatible with existing WeeklyData.sightWords structure)
 */
export function getLegacySightWordsForWeek(
  stage: number,
  week: number
): LegacyWeeklySightWord[] {
  // Get cumulative words through this week
  const cumulativeWords = getCumulativeWordsForWeek(stage, week);
  const newWordsThisWeek = getWordsForStageWeek(stage, week);
  const upgradesThisWeek = getUpgradesForWeek(stage, week);

  const newWordSet = new Set(newWordsThisWeek.map(w => w.word));
  const upgradeSet = new Set(upgradesThisWeek.map(w => w.word));

  // Build legacy format
  const legacyWords: LegacyWeeklySightWord[] = cumulativeWords.map(word => ({
    word: word.word,
    isHeartWord: word.isHeartWord &&
      (word.upgradesAtStage === null || word.upgradesAtStage > stage),
    trickyPart: word.isHeartWord &&
      (word.upgradesAtStage === null || word.upgradesAtStage > stage)
      ? word.trickyPart
      : null,
    isNew: newWordSet.has(word.word),
    isUpgrade: upgradeSet.has(word.word)
  }));

  // Add upgrades from previous stages if they happen at this stage/week
  const stageUpgrades = ALL_CORE_400_WORDS.filter(w =>
    w.upgradesAtStage === stage &&
    w.introducedAtStage < stage
  );

  for (const upgrade of stageUpgrades) {
    // Check if this upgrade should appear this week
    const weekMap = STAGE_WEEK_MAPS[stage];
    const upgradeWeek = weekMap?.[upgrade.word] || 7;

    if (upgradeWeek <= week && !legacyWords.some(w => w.word === upgrade.word)) {
      legacyWords.push({
        word: upgrade.word,
        isHeartWord: false,
        trickyPart: null,
        isNew: upgradeWeek === week,
        isUpgrade: upgradeWeek === week
      });
    }
  }

  return legacyWords;
}
