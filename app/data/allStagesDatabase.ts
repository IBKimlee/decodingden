// 🌟 DECODING DEN: COMPLETE 8-STAGE PHONEME DATABASE 🌟
// © 2025 Decoding Den. All rights reserved.
// Science of Reading-based systematic phonics instruction

export const LEGAL_COMPLIANCE = {
  copyright_notice: "© 2025 Decoding Den. All rights reserved.",
  disclaimer: "Decoding Den is an independent educational platform built entirely on publicly available Science of Reading research. Our content is original and research-informed, drawing from peer-reviewed studies by Ehri, Seidenberg, Adams, and other leading scientists. We are not affiliated with, derived from, or endorsed by any commercial reading program or proprietary curriculum.",
  research_attribution: "Our instructional design is based on findings from the National Reading Panel, IES Practice Guides, and decades of cognitive and linguistic research. All content is independently developed using evidence-based principles.",
  compliance_verification: "This content contains zero proprietary material and is built exclusively from publicly available research sources.",
  prohibited_associations: "This content is not derived from, affiliated with, or endorsed by LETRS, Wilson Reading System, Orton-Gillingham programs, or any commercial curriculum."
};

export interface PhonemeEntry {
  phoneme_id: string;
  stage: number;
  phoneme: string;
  graphemes: string[];
  frequency_rank: number;
  complexity_score: number;
  grade_band: string;
  introduction_week: number;
  word_examples: string[];
  decodable_sentences: string[];
  assessment_criteria: {
    daily: string;
    weekly: string;
    summative: string;
  };
  teaching_advantages: string[];
  research_sources: string[];
}

export interface StageInfo {
  stage_number: number;
  stage_name: string;
  grade_level: string;
  student_phase: string;
  duration: string;
  total_elements: number;
  description: string;
  key_concept: string;
  instructional_focus: string[];
  intensity: {
    core: number;
    teach: number;
    exposure: number;
  };
  science_of_reading_alignment: {
    ehri_phase: string;
    research_principle: string;
    orthographic_mapping: string;
  };
  // Stage 8 specific: Phase 8A/8B split
  phase_split?: {
    phase_a: { weeks: string; name: string };
    phase_b: { weeks: string; name: string };
  };
}

// 📚 COMPLETE 8-STAGE PROGRESSION - RESEARCH-VALIDATED K-3
export const EIGHT_STAGE_SYSTEM: StageInfo[] = [
  {
    stage_number: 1,
    stage_name: "Core Consonants & Short Vowels",
    grade_level: "Kindergarten – Fall Semester",
    student_phase: "Pre-Alphabetic to Partial Alphabetic Phase",
    duration: "10 weeks",
    total_elements: 15,
    description: "Students learn foundational consonants and short vowels prioritized for high frequency and transparent mappings.",
    key_concept: "Letters represent sounds. When we put consonant-vowel-consonant together, we can read and spell words.",
    instructional_focus: [
      "CVC word formation (consonant-vowel-consonant)",
      "Phonemic awareness integration with letters",
      "Letter-sound correspondence mastery",
      "Basic decoding skills development"
    ],
    intensity: {
      core: 15,
      teach: 0,
      exposure: 0
    },
    science_of_reading_alignment: {
      ehri_phase: "Pre-alphabetic to Partial Alphabetic - children use first and last sounds in words",
      research_principle: "Ehri (2005); NRP (2000) - Foundational consonants and short vowels prioritized for transparent mappings",
      orthographic_mapping: "Foundation for connecting letters to sounds in memory"
    }
  },
  {
    stage_number: 2,
    stage_name: "Remaining Letters & Digraphs",
    grade_level: "Kindergarten – Spring Semester",
    student_phase: "Partial to Full Alphabetic Phase",
    duration: "10 weeks",
    total_elements: 18,
    description: "Students complete single-letter knowledge and learn consonant digraphs. Students can now decode any CVC word and begin CCVC/CVCC words.",
    key_concept: "Some sounds need two letters working together (digraphs). The same sound can sometimes be spelled different ways.",
    instructional_focus: [
      "Complete alphabetic code",
      "Consonant digraph mastery (ch, sh, th, ng)",
      "C/K/CK spelling pattern",
      "Question words with wh"
    ],
    intensity: {
      core: 18,
      teach: 0,
      exposure: 0
    },
    science_of_reading_alignment: {
      ehri_phase: "Partial to Full Alphabetic - ready for two-letter, one-sound patterns",
      research_principle: "Adams (1990); Moats (2020); NRP (2000) - Common digraphs introduced when students master CVC patterns",
      orthographic_mapping: "Two-letter, one-sound patterns build on single letter foundation"
    }
  },
  {
    stage_number: 3,
    stage_name: "VCe Patterns & Consonant Complexities",
    grade_level: "1st Grade – Fall Semester",
    student_phase: "Full Alphabetic Phase – Emerging",
    duration: "10 weeks",
    total_elements: 15,
    description: "The magic e (VCe) pattern, FLOSS rule doubles, and common complex consonant spellings. Students learn that one sound can be spelled multiple ways.",
    key_concept: "Silent e changes the vowel sound. Some patterns use doubled letters or three-letter combinations.",
    instructional_focus: [
      "VCe (magic e) patterns for all 5 vowels",
      "FLOSS rule (ff, ll, ss, zz)",
      "Trigraphs (tch, dge)",
      "Complex consonants (nk, ph)",
      "Soft c and g introduction"
    ],
    intensity: {
      core: 9,
      teach: 6,
      exposure: 0
    },
    science_of_reading_alignment: {
      ehri_phase: "Full Alphabetic – Emerging: ready for complex vowel patterns and spelling generalizations",
      research_principle: "Adams (1990); Moats (2020) - VCe patterns most consistent long vowel representation; FLOSS rule builds spelling pattern awareness",
      orthographic_mapping: "Silent E influence on vowel sounds; doubled consonants and trigraphs stored as chunks"
    }
  },
  {
    stage_number: 4,
    stage_name: "Common Vowel Teams & Vowel Discrimination",
    grade_level: "1st Grade – Spring Semester",
    student_phase: "Full Alphabetic Phase",
    duration: "10 weeks",
    total_elements: 15,
    description: "The most common vowel team spellings of long vowels, the critical o→/ŭ/ pattern, and long vowel exception patterns. Heavy emphasis on vowel flexing.",
    key_concept: "Two vowels can work as a team to make one sound. The letter 'o' can make three different sounds. Some words break the short vowel rule.",
    instructional_focus: [
      "Common vowel teams (ai, ay, ee, ea, oa, ow, igh)",
      "y as a vowel (two sounds)",
      "o→/ŭ/ exception pattern (love, come, some)",
      "Long vowel exception patterns (-ind, -ild, -old, -olt, -oll)",
      "Open syllable awareness",
      "Vowel flexing strategy"
    ],
    intensity: {
      core: 10,
      teach: 5,
      exposure: 0
    },
    science_of_reading_alignment: {
      ehri_phase: "Full Alphabetic - systematic vowel team pattern recognition and flexible decoding",
      research_principle: "Fry (2004); NRP (2000); Ehri (2005) - High-frequency vowel teams prioritized; o→/ŭ/ covers 20+ Fry top-100 words",
      orthographic_mapping: "Vowel teams stored as chunks; flexing strategy develops when patterns have multiple sounds"
    }
  },
  {
    stage_number: 5,
    stage_name: "R-Controlled Vowels, /oo/ Patterns & W-Influence",
    grade_level: "2nd Grade – Fall Semester",
    student_phase: "Consolidated Alphabetic Phase – Emerging",
    duration: "10 weeks",
    total_elements: 21,
    description: "Bossy R changes vowel sounds. The two sounds of 'oo.' W-influence patterns where 'w' changes the expected vowel sound.",
    key_concept: "When r follows a vowel, it changes the sound. The letter w can change how nearby vowels sound. Some spellings have multiple pronunciations — flex and check.",
    instructional_focus: [
      "Core r-controlled vowels (ar, er, ir, ur, or)",
      "Extended r-controlled (air, are, ear, eer, oar, our, ore)",
      "Two sounds of oo (moon vs book)",
      "W-influence patterns (wa, wor, war)",
      "Ear has THREE sounds (critical flex pattern)",
      "Could/would/should (oul pattern)"
    ],
    intensity: {
      core: 9,
      teach: 12,
      exposure: 0
    },
    science_of_reading_alignment: {
      ehri_phase: "Consolidated Alphabetic – Emerging: chunking r-controlled patterns and developing flexible decoding",
      research_principle: "Fry (2004); NRP (2000); UFLI/Wilson - R-controlled vowels essential; W-influence is consistent pattern; oul words are Fry top-100",
      orthographic_mapping: "R-controlled patterns stored as units; flex strategy for multi-sound spellings (ear)"
    }
  },
  {
    stage_number: 6,
    stage_name: "Diphthongs & Extended Vowel Spellings",
    grade_level: "2nd Grade – Spring Semester",
    student_phase: "Consolidated Alphabetic Phase – Developing",
    duration: "10 weeks",
    total_elements: 18,
    description: "Diphthongs (vowel sounds that glide) and the remaining less-common long vowel spellings. Variable 'ere' patterns.",
    key_concept: "Some vowel sounds glide from one position to another. English borrowed spellings from other languages. When a pattern has multiple sounds, try each one and check meaning.",
    instructional_focus: [
      "Diphthongs (ou/ow for /ow/, oi/oy for /oi/, au/aw for /aw/)",
      "Extended long vowel spellings (eigh, ey, ei)",
      "Variable ere patterns (where vs here)",
      "ui vowel team (fruit, juice)",
      "Position rules (oi middle, oy end; au middle, aw end)"
    ],
    intensity: {
      core: 6,
      teach: 8,
      exposure: 4
    },
    science_of_reading_alignment: {
      ehri_phase: "Consolidated Alphabetic – Developing: automatic processing of diphthongs and extended vowel patterns",
      research_principle: "Fry (2004); NRP (2000) - Diphthongs essential for grade-level reading; extended spellings require reading exposure",
      orthographic_mapping: "Diphthongs stored as gliding units; rare spellings (ea→/ā/, oe, eu) learned individually"
    }
  },
  {
    stage_number: 7,
    stage_name: "Complex & Variable Patterns",
    grade_level: "3rd Grade – Fall Semester",
    student_phase: "Consolidated Alphabetic Phase – Proficient",
    duration: "10 weeks",
    total_elements: 12,
    description: "Variable pronunciation patterns, the last consonant phoneme (/zh/), and Greek and French origin spellings. Develops flexible decoding strategies for etymology-based patterns.",
    key_concept: "English has patterns from Greek, French, and Old English. Skilled readers try multiple pronunciations and check meaning. The same spelling can make different sounds in different words.",
    instructional_focus: [
      "/zh/ phoneme (measure, vision)",
      "Soft c and g mastery (introduced Stage 3, mastered here)",
      "Variable patterns (ough has 5 sounds)",
      "Greek origin (ch→/k/, sc, rh)",
      "French origin (ch→/sh/)",
      "Hard-g protector (gu→/g/)",
      "Final position patterns (ve, se)"
    ],
    intensity: {
      core: 2,
      teach: 7,
      exposure: 3
    },
    science_of_reading_alignment: {
      ehri_phase: "Consolidated Alphabetic – Proficient: flexible decoding of variable and etymology-based patterns",
      research_principle: "Fry (2004); Adams (1990) - Variable patterns essential for grade-level vocabulary; etymology awareness supports spelling",
      orthographic_mapping: "Variable patterns require flexible retrieval; Greek/French origins stored with spelling-meaning connections"
    }
  },
  {
    stage_number: 8,
    stage_name: "Morphology, Schwa & Advanced Patterns",
    grade_level: "3rd Grade – Spring Semester",
    student_phase: "Consolidated Alphabetic Phase – Advanced",
    duration: "10 weeks",
    total_elements: 50,
    description: "Instruction shifts from phoneme-level decoding to morpheme-based word analysis. Students recognize meaningful word parts that unlock both pronunciation and meaning.",
    key_concept: "Words are built from meaningful parts: prefixes change meaning, suffixes change how words work in sentences, and roots carry core meaning. Unstressed vowels relax to schwa.",
    instructional_focus: [
      "Silent letter patterns (kn, wr, mb, gn)",
      "Inflectional suffixes (-ed, -s/-es, -ing) with spelling change rules",
      "Derivational prefixes (un-, re-, pre-, dis-, mis-, in-/im-)",
      "Tier 1 suffixes (-er, -est, -ly, -y, -ful, -less, -ness, -ment)",
      "Tier 2 suffixes (-tion, -sion, -cian, -ture, -ous, -ent, -ant, -al, -or)",
      "Schwa vowel patterns",
      "/sh/ alternate spellings (ti, ci, ssi, sci)",
      "Advanced and rare spellings (augh, eau, que, gh→/f/, x→/gz/, wh→/h/)",
      "Doubled consonants formalized (dd, gg, nn, pp, tt, rr)"
    ],
    intensity: {
      core: 9,
      teach: 22,
      exposure: 19
    },
    science_of_reading_alignment: {
      ehri_phase: "Consolidated Alphabetic – Advanced: morpheme-based word analysis and schwa awareness",
      research_principle: "Nagy & Anderson (1984); Treiman (2000); Fry data - un- and re- cover 50%+ of prefixed words; morphology unlocks meaning and spelling",
      orthographic_mapping: "Morphemes stored as meaningful chunks; schwa spelling requires related-word strategy"
    },
    phase_split: {
      phase_a: { weeks: "1-5", name: "Core Morphology" },
      phase_b: { weeks: "6-10", name: "Extended Patterns" }
    }
  }
];

// 🎯 RESEARCH-VALIDATED PHONEME PROGRESSION FOR K-3 (FROM ChatGPT ANALYSIS)
export const STAGE_PHONEME_SAMPLES: PhonemeEntry[] = [
  // STAGE 1: Core Consonants & Short Vowels - K Fall (15 phonemes)
  { phoneme_id: "stage1_m", stage: 1, phoneme: "/m/", graphemes: ["m"], frequency_rank: 1, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["mat", "mad", "man", "mom", "mud"], decodable_sentences: ["I am mad.", "Sam has a mat."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["visible articulation", "continuous sound"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_s", stage: 1, phoneme: "/s/", graphemes: ["s"], frequency_rank: 2, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["sat", "sad", "sun", "sit"], decodable_sentences: ["Sam is sad.", "I sit."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["continuous sound", "frequent usage"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_a", stage: 1, phoneme: "/a/", graphemes: ["a"], frequency_rank: 3, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["mat", "sat", "hat", "man"], decodable_sentences: ["I am mad.", "The mat is tan."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["clear sound", "visible mouth position"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_t", stage: 1, phoneme: "/t/", graphemes: ["t"], frequency_rank: 4, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 2, word_examples: ["top", "tap", "mat", "sat"], decodable_sentences: ["Sam sat.", "The mat."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["clear sound", "high frequency"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_n", stage: 1, phoneme: "/n/", graphemes: ["n"], frequency_rank: 5, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 2, word_examples: ["not", "nap", "man", "sun"], decodable_sentences: ["The man sat.", "I can nap."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["continuous sound", "frequent usage"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_p", stage: 1, phoneme: "/p/", graphemes: ["p"], frequency_rank: 6, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 3, word_examples: ["pat", "pan", "map", "tap"], decodable_sentences: ["Pat has a map.", "I can tap."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["visible articulation", "clear release"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_i", stage: 1, phoneme: "/i/", graphemes: ["i"], frequency_rank: 7, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 3, word_examples: ["sit", "pit", "tip", "sip"], decodable_sentences: ["I can sit.", "The tip."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["clear contrast to /a/", "frequent in CVC"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_d", stage: 1, phoneme: "/d/", graphemes: ["d"], frequency_rank: 8, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 4, word_examples: ["dad", "dim", "mad", "sad"], decodable_sentences: ["Dad is mad.", "The sad man."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["voiced pair to /t/", "clear articulation"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_f", stage: 1, phoneme: "/f/", graphemes: ["f"], frequency_rank: 9, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 4, word_examples: ["fan", "fat", "if"], decodable_sentences: ["The fan is fat.", "I fit."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["continuous sound", "visible airflow"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_o", stage: 1, phoneme: "/o/", graphemes: ["o"], frequency_rank: 10, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 5, word_examples: ["dot", "pot", "top", "mop"], decodable_sentences: ["The pot is hot.", "I can sit on top."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["distinct rounded lips", "clear contrast"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_l", stage: 1, phoneme: "/l/", graphemes: ["l"], frequency_rank: 11, complexity_score: 1.1, grade_band: "K-Fall", introduction_week: 5, word_examples: ["lap", "lit", "lot"], decodable_sentences: ["The lad has a lap.", "Dad lit the lamp."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["continuous sound", "visible tongue tip"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_h", stage: 1, phoneme: "/h/", graphemes: ["h"], frequency_rank: 12, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 6, word_examples: ["hat", "hit", "hot", "ham"], decodable_sentences: ["The hat is hot.", "I hid the pot."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["simple airflow", "breath-like"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_b", stage: 1, phoneme: "/b/", graphemes: ["b"], frequency_rank: 13, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 6, word_examples: ["bat", "bit", "bad", "tab"], decodable_sentences: ["The bat is bad.", "I can bat."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["visible articulation", "voiced pair to /p/"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_e", stage: 1, phoneme: "/e/", graphemes: ["e"], frequency_rank: 14, complexity_score: 1.1, grade_band: "K-Fall", introduction_week: 7, word_examples: ["bet", "pet", "let", "met"], decodable_sentences: ["The pet is in the pen.", "Let me pet the cat."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["mid-position between /i/ and /a/"], research_sources: ["Ehri (2005); NRP (2000)"] },
  { phoneme_id: "stage1_u", stage: 1, phoneme: "/u/", graphemes: ["u"], frequency_rank: 15, complexity_score: 1.1, grade_band: "K-Fall", introduction_week: 7, word_examples: ["but", "hut", "cut", "mud"], decodable_sentences: ["The sun is fun.", "Put the mud in the hut."], assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% letter-sound" }, teaching_advantages: ["completes five short vowels"], research_sources: ["Ehri (2005); NRP (2000)"] },
  // STAGE 2: Blends, Digraphs & Final Consonants - K Spring (15 phonemes) 
  { phoneme_id: "stage2_r", stage: 2, phoneme: "/r/", graphemes: ["r"], frequency_rank: 16, complexity_score: 1.5, grade_band: "K-Spring", introduction_week: 1, word_examples: ["run", "red", "rat", "car"], decodable_sentences: ["The red rat can run.", "I run to the car."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["frequent usage", "enables blends"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_g", stage: 2, phoneme: "/g/", graphemes: ["g"], frequency_rank: 17, complexity_score: 1.2, grade_band: "K-Spring", introduction_week: 1, word_examples: ["got", "big", "dog", "bag"], decodable_sentences: ["The big dog got a bag.", "I got a big bag."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["clear sound", "frequent usage"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_k", stage: 2, phoneme: "/k/", graphemes: ["k", "c"], frequency_rank: 18, complexity_score: 1.3, grade_band: "K-Spring", introduction_week: 1, word_examples: ["kit", "cat", "back", "pick"], decodable_sentences: ["The cat has a kit.", "I can pick the back."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["two spellings (k, c)", "frequent usage"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_j", stage: 2, phoneme: "/j/", graphemes: ["j"], frequency_rank: 19, complexity_score: 1.2, grade_band: "K-Spring", introduction_week: 2, word_examples: ["jam", "jet", "jog", "jump"], decodable_sentences: ["The jet has jam.", "I can jog and jump."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["clear sound", "distinctive"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_v", stage: 2, phoneme: "/v/", graphemes: ["v"], frequency_rank: 20, complexity_score: 1.3, grade_band: "K-Spring", introduction_week: 2, word_examples: ["van", "vet", "have", "give"], decodable_sentences: ["The vet has a van.", "I have a van."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["voiced pair to /f/", "continuous sound"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_w", stage: 2, phoneme: "/w/", graphemes: ["w"], frequency_rank: 21, complexity_score: 1.2, grade_band: "K-Spring", introduction_week: 2, word_examples: ["wet", "win", "was", "we"], decodable_sentences: ["We win.", "I was wet."], assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% letter-sound" }, teaching_advantages: ["lip rounding", "glide sound"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_y", stage: 2, phoneme: "/y/", graphemes: ["y"], frequency_rank: 22, complexity_score: 1.4, grade_band: "K-Spring", introduction_week: 3, word_examples: ["yes", "yet", "you", "my"], decodable_sentences: ["Yes, you can.", "My cat is yet to come."], assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% letter-sound" }, teaching_advantages: ["glide sound", "frequent sight words"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_z", stage: 2, phoneme: "/z/", graphemes: ["z"], frequency_rank: 23, complexity_score: 1.3, grade_band: "K-Spring", introduction_week: 3, word_examples: ["zip", "zoo", "buzz", "fizz"], decodable_sentences: ["The zoo has a zip.", "I buzz and fizz."], assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% letter-sound" }, teaching_advantages: ["voiced pair to /s/", "distinctive"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_x", stage: 2, phoneme: "/ks/", graphemes: ["x"], frequency_rank: 24, complexity_score: 2.0, grade_band: "K-Spring", introduction_week: 3, word_examples: ["fox", "box", "mix", "six"], decodable_sentences: ["The fox is in the box.", "I can mix six."], assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% letter-sound" }, teaching_advantages: ["represents two sounds", "usually final position"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_qu", stage: 2, phoneme: "/kw/", graphemes: ["qu"], frequency_rank: 25, complexity_score: 2.1, grade_band: "K-Spring", introduction_week: 4, word_examples: ["quit", "quick", "queen", "quack"], decodable_sentences: ["The queen can quit.", "I quack quick."], assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% letter-sound" }, teaching_advantages: ["always together (qu)", "distinctive sound"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_ch", stage: 2, phoneme: "/ch/", graphemes: ["ch"], frequency_rank: 26, complexity_score: 2.2, grade_band: "K-Spring", introduction_week: 4, word_examples: ["chip", "chat", "much", "such"], decodable_sentences: ["The chip is much good.", "I chat such a lot."], assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% digraph recognition" }, teaching_advantages: ["two letters, one sound", "distinctive"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_sh", stage: 2, phoneme: "/sh/", graphemes: ["sh"], frequency_rank: 27, complexity_score: 2.2, grade_band: "K-Spring", introduction_week: 5, word_examples: ["shop", "ship", "fish", "dish"], decodable_sentences: ["The fish is in the dish.", "I shop for a ship."], assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% digraph recognition" }, teaching_advantages: ["continuous sound", "visible lip rounding"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_th", stage: 2, phoneme: "/th/", graphemes: ["th"], frequency_rank: 28, complexity_score: 2.3, grade_band: "K-Spring", introduction_week: 5, word_examples: ["this", "that", "with", "math"], decodable_sentences: ["This is that.", "I can do math with this."], assessment_criteria: { daily: "70% accuracy", weekly: "65% accuracy", summative: "75% digraph recognition" }, teaching_advantages: ["tongue between teeth", "very frequent"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_TH", stage: 2, phoneme: "/TH/", graphemes: ["th"], frequency_rank: 29, complexity_score: 2.4, grade_band: "K-Spring", introduction_week: 6, word_examples: ["the", "they", "then", "there"], decodable_sentences: ["The cat is there.", "They can go then."], assessment_criteria: { daily: "70% accuracy", weekly: "65% accuracy", summative: "75% digraph recognition" }, teaching_advantages: ["voiced /th/", "very frequent words"], research_sources: ["Adams (1990); FCRR (2005)"] },
  { phoneme_id: "stage2_ng", stage: 2, phoneme: "/ng/", graphemes: ["ng"], frequency_rank: 30, complexity_score: 2.3, grade_band: "K-Spring", introduction_week: 6, word_examples: ["ring", "sing", "long", "king"], decodable_sentences: ["The king can sing.", "I ring the long bell."], assessment_criteria: { daily: "70% accuracy", weekly: "65% accuracy", summative: "75% digraph recognition" }, teaching_advantages: ["nasal sound", "final position common"], research_sources: ["Adams (1990); FCRR (2005)"] },
  // STAGES 3-8 will be added systematically following the ChatGPT research-validated progression
  // Stage 3: Silent E & Complex Consonants (12 phonemes)
  // Stage 4: Common Vowel Teams (9 phonemes) 
  // Stage 5: R-Controlled Vowels (5 phonemes)
  // Stage 6: Irregular & Silent Letter Patterns (9 phonemes)
  // Stage 7: Advanced Vowels & Diphthongs (11 phonemes)
  // Stage 8: Multisyllabic Patterns & Morphology (15 phonemes)
];

// 🏆 ASSESSMENT BENCHMARKS BY STAGE
export const ASSESSMENT_BENCHMARKS = {
  stage1: {
    phoneme_production: "90% accuracy",
    letter_sound: "95% accuracy", 
    cvc_reading: "85% accuracy",
    cvc_spelling: "80% accuracy",
    fluency_target: "10 CVC words per minute"
  },
  stage2: {
    digraph_reading: "90% accuracy",
    blend_production: "85% accuracy",
    cvcc_ccvc_reading: "80% accuracy",
    fluency_target: "15 words per minute"
  },
  stage3: {
    complex_blends: "85% accuracy",
    vce_pattern: "90% accuracy",
    long_short_contrast: "85% accuracy",
    fluency_target: "20 words per minute"
  },
  stage4: {
    vowel_teams: "80% accuracy",
    position_rules: "85% accuracy",
    chunking: "75% accuracy",
    fluency_target: "25 words per minute"
  },
  stage5: {
    r_controlled: "75% accuracy",
    schwa_recognition: "65% accuracy",
    bossy_r_concept: "80% accuracy",
    fluency_target: "30 words per minute"
  },
  stage6: {
    silent_letters: "60% accuracy",
    irregular_patterns: "55% accuracy",
    exception_recognition: "65% accuracy",
    fluency_target: "35 words per minute"
  },
  stage7: {
    diphthongs: "55% accuracy",
    variant_spellings: "50% accuracy",
    advanced_patterns: "60% accuracy",
    fluency_target: "40 words per minute"
  },
  stage8: {
    syllable_division: "60% accuracy",
    morpheme_recognition: "55% accuracy",
    multisyllabic_analysis: "50% accuracy",
    fluency_target: "35 multisyllabic words per minute"
  }
};

// 📊 PROGRESS TRACKING METRICS
export interface StudentProgress {
  student_id: string;
  current_stage: number;
  mastered_phonemes: string[];
  struggling_phonemes: string[];
  assessment_scores: {
    [key: string]: {
      date: string;
      score: number;
      benchmark_met: boolean;
    }
  };
  intervention_triggers: string[];
  next_recommended_phonemes: string[];
}

// 🎓 DIFFERENTIATION STRATEGIES
export const DIFFERENTIATION_STRATEGIES = {
  struggling: {
    pace: "50% slower progression",
    practice: "Double the practice opportunities",
    instruction: "Explicit multisensory instruction",
    grouping: "Small group or 1:1 instruction",
    materials: "Enhanced visual and tactile supports"
  },
  on_level: {
    pace: "Standard progression",
    practice: "Regular practice schedule",
    instruction: "Whole group with targeted small group",
    grouping: "Flexible grouping",
    materials: "Standard instructional materials"
  },
  advanced: {
    pace: "Accelerated by 25-50%",
    practice: "Extension activities and enrichment",
    instruction: "Independent application opportunities",
    grouping: "Enrichment groups and peer tutoring",
    materials: "Advanced texts and challenge activities"
  }
};

// 🔍 SEARCH AND FILTER FUNCTIONS
export function getPhonemesByStage(stage: number): PhonemeEntry[] {
  return STAGE_PHONEME_SAMPLES.filter(phoneme => phoneme.stage === stage);
}

export function getStageInfo(stageNumber: number): StageInfo | undefined {
  return EIGHT_STAGE_SYSTEM.find(stage => stage.stage_number === stageNumber);
}

export function getPhonemeById(phonemeId: string): PhonemeEntry | undefined {
  return STAGE_PHONEME_SAMPLES.find(phoneme => phoneme.phoneme_id === phonemeId);
}

export function getAssessmentBenchmark(stage: number): any {
  return ASSESSMENT_BENCHMARKS[`stage${stage}` as keyof typeof ASSESSMENT_BENCHMARKS];
}

export function calculateNextPhonemes(masteredPhonemes: string[], currentStage: number): string[] {
  const stagePhonemes = getPhonemesByStage(currentStage);
  return stagePhonemes
    .filter(phoneme => !masteredPhonemes.includes(phoneme.phoneme_id))
    .slice(0, 3)
    .map(phoneme => phoneme.phoneme_id);
}

// 📊 All exports are available above

// ═══════════════════════════════════════════════════════════════════════════════
// 🌟 RESEARCH JUSTIFICATIONS FOR ALL 8 STAGES
// Science of Reading-based systematic phonics instruction research validation
// ═══════════════════════════════════════════════════════════════════════════════

export const RESEARCH_JUSTIFICATIONS = {
  stage1: {
    title: "Stage 1: Core Consonants & Short Vowels – Research Justification",
    subtitle: "(Kindergarten – Fall Semester)",
    focus: "Foundational consonants and short vowel sounds prioritized for high frequency, transparency, and early CVC decoding.",
    phonemes_and_graphemes: {
      consonants: ["/m/", "/s/", "/t/", "/n/", "/p/", "/d/", "/f/", "/l/", "/h/", "/b/", "/r/", "/g/"],
      short_vowels: ["/a/", "/i/", "/o/", "/e/", "/u/"],
      graphemes: ["m", "s", "t", "n", "p", "d", "f", "l", "h", "b", "r", "g", "a", "i", "o", "e", "u"]
    },
    research_basis: [
      {
        source: "National Reading Panel (2000)",
        findings: [
          "Phonemic awareness and phonics are foundational for reading acquisition.",
          "Systematic phonics instruction improves word reading and spelling."
        ]
      },
      {
        source: "Louisa Moats (2020)",
        findings: [
          "Short vowels and early consonants are the most consistent and transparent phoneme-grapheme correspondences in English.",
          "Early CVC instruction builds the foundation for orthographic mapping and decoding."
        ]
      },
      {
        source: "Ehri's Phases of Word Reading",
        findings: [
          "This stage supports the transition from Pre-Alphabetic to Partial Alphabetic Phase.",
          "Mastery of basic sound-symbol connections enables students to begin decoding words independently."
        ]
      },
      {
        source: "Castles, Rastle, & Nation (2018)",
        findings: [
          "Emphasize teaching phoneme–grapheme connections in high-frequency, consistent sound-spelling patterns.",
          "Early instruction should promote predictable blending (e.g., CVC patterns)."
        ]
      },
      {
        source: "Seidenberg (2017), Dehaene (2009)",
        findings: [
          "The brain's reading circuitry requires practice with simple, transparent letter-sound connections for fluency development.",
          "Repetition with high-utility phonemes promotes automaticity and decoding efficiency."
        ]
      },
      {
        source: "Scarborough's Reading Rope",
        findings: [
          "Early phonological and phonics strands form the base of skilled word recognition.",
          "CVC-level phonics supports orthographic mapping in young readers."
        ]
      }
    ],
    conclusion: "Stage 1 targets the most frequent, consistent, and neurologically accessible sound-spelling correspondences. This approach is backed by cognitive neuroscience and reading acquisition studies and prepares students for mastery of decoding through early success with high-frequency CVC words."
  },

  stage2: {
    title: "Stage 2: Remaining Single Letters & Basic Digraphs – Research Justification",
    subtitle: "(Kindergarten – Spring Semester)",
    focus: "Consonant clusters, digraphs, and final consonants",
    phonemes_and_graphemes: {
      consonants: ["/r/", "/g/", "/k/", "/j/", "/v/", "/w/", "/y/", "/z/", "/x/", "/qu/"],
      digraphs: ["/ch/", "/sh/", "/th/", "/TH/", "/ng/"],
      graphemes: ["r", "g", "k", "c", "j", "v", "w", "y", "z", "x", "qu", "ch", "sh", "th", "ng"],
      notes: ["/x/ represents /k/ + /s/", "Both voiced /TH/ and voiceless /th/ for 'th' spelling"]
    },
    research_basis: [
      {
        source: "National Reading Panel (2000)",
        findings: [
          "Systematic phonics instruction should include digraphs and blends in early instruction.",
          "Instruction in small units (e.g., phoneme-grapheme correspondences) improves decoding."
        ]
      },
      {
        source: "Linnea Ehri's Phases of Word Reading",
        findings: [
          "Transition from Partial to Full Alphabetic Phase involves mastery of common digraphs and blend decoding.",
          "Students begin mapping larger units of sound to print."
        ]
      },
      {
        source: "Louisa Moats (2020)",
        findings: [
          "Prioritizes /sh/, /ch/, /th/, and /ng/ as essential early patterns due to high frequency and transparent mapping.",
          "Stresses importance of early spelling patterns that support decoding and automatic recognition."
        ]
      },
      {
        source: "Castles, Rastle, & Nation (2018)",
        findings: [
          "Consonant digraphs and clusters support development of flexible decoding skills and early word recognition.",
          "Suggests early introduction of high-utility, consistent phoneme-grapheme correspondences."
        ]
      },
      {
        source: "Scarborough's Reading Rope (2001)",
        findings: [
          "Phonological awareness + orthographic knowledge = foundation for fluent word recognition.",
          "Early decoding supports later reading comprehension via automaticity."
        ]
      }
    ],
    conclusion: "The phonemes and graphemes in Stage 2 align with recommended instructional sequences from peer-reviewed sources. Instructional design supports the transition to automatic word recognition and prepares students for full orthographic mapping."
  },

  stage3: {
    title: "Stage 3: Complex Consonants, VCe Long Vowels, and Soft Consonants – Research Justification",
    subtitle: "(Grade 1 – Fall Semester)",
    focus: "This stage introduces long vowel-consonant-e (VCe) patterns, soft consonant rules, and complex patterns to deepen students' decoding skills.",
    phonemes_and_graphemes: {
      vce_long_vowels: ["/ā/ → a_e", "/ē/ → e_e", "/ī/ → i_e", "/ō/ → o_e", "/ū/ → u_e"],
      soft_consonants: ["/s/ → c (before e, i, y)", "/j/ → g (before e, i, y)"],
      rule_based_spellings: ["/j/ → dge (after short vowel)", "/ch/ → tch (after short vowel)"],
      new_consonants: ["/f/ → ph", "/w/ → wh", "/ks/ → x"],
      graphemes: ["a_e", "e_e", "i_e", "o_e", "u_e", "c", "g", "dge", "tch", "ph", "wh", "x"]
    },
    research_basis: [
      {
        source: "National Reading Panel (2000)",
        findings: [
          "Recommends systematic instruction in common vowel patterns (including silent-e).",
          "Supports sequential phonics instruction to develop advanced decoding."
        ]
      },
      {
        source: "Louisa Moats (2020)",
        findings: [
          "Identifies VCe as one of the most consistent and important long vowel patterns.",
          "Advocates teaching of spelling rules like soft c/g and -tch/-dge in first and second grades."
        ]
      },
      {
        source: "Ehri's Full Alphabetic Phase",
        findings: [
          "Students begin decoding with full phoneme–grapheme knowledge.",
          "Introduction of multigraphs, long vowels, and positional spelling generalizations supports this developmental stage."
        ]
      },
      {
        source: "Castles, Rastle, & Nation (2018)",
        findings: [
          "Emphasize instruction that expands student knowledge of orthographic patterns and helps recognize chunks rather than individual letters."
        ]
      },
      {
        source: "Seidenberg (2017)",
        findings: [
          "Students learn best through repeated, meaningful practice of sound–spelling correspondences embedded in decodable text."
        ]
      },
      {
        source: "Adams (1990)",
        findings: [
          "VCe patterns are the most frequently used for marking long vowels in English and should be prioritized in early phonics instruction."
        ]
      }
    ],
    conclusion: "The phoneme–grapheme pairs selected in Stage 3 prepare students for increasingly complex decoding tasks while reinforcing spelling generalizations that are both common and rule-based. This structure advances students in the Full Alphabetic Phase and builds their ability to read longer words with accuracy and automaticity."
  },

  stage4: {
    title: "Stage 4: Research Justification",
    subtitle: "(Grade 1 – Spring Semester)",
    status: "Pending research justification document"
  },

  stage5: {
    title: "Stage 5: Research Justification",
    subtitle: "(Grade 2 – Fall Semester)",
    status: "Pending research justification document"
  },

  stage6: {
    title: "Stage 6: Research Justification",
    subtitle: "(Grade 2 – Spring Semester)",
    status: "Pending research justification document"
  },

  stage7: {
    title: "Stage 7: Research Justification",
    subtitle: "(Grade 3 – Fall Semester)",
    status: "Pending research justification document"
  },

  stage8: {
    title: "Stage 8: Research Justification",
    subtitle: "(Grade 3 – Spring Semester)",
    status: "Pending research justification document"
  }
};

export type ResearchJustification = {
  title: string;
  subtitle: string;
  focus: string;
  phonemes_and_graphemes: any;
  research_basis: Array<{
    source: string;
    findings: string[];
  }>;
  conclusion: string;
};

export type ResearchStageKey = keyof typeof RESEARCH_JUSTIFICATIONS;

// Helper function to get research justification by stage number
export function getResearchJustification(stageNumber: number): ResearchJustification | { status: string } {
  const stageKey = `stage${stageNumber}` as ResearchStageKey;
  return RESEARCH_JUSTIFICATIONS[stageKey];
}

// Helper function to check if a stage has complete research justification
export function hasCompleteResearch(stageNumber: number): boolean {
  const research = getResearchJustification(stageNumber);
  return 'research_basis' in research;
}