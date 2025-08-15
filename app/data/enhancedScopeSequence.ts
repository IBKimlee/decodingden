// © 2025 Decoding Den. All rights reserved.
// Science of Reading-based 8-Stage Scope & Sequence
// Independent creation from publicly available research

export const legalCompliance = {
  copyright: "© 2025 Decoding Den. All rights reserved.",
  disclaimer: "This scope and sequence is independently developed based on Science of Reading research. Not affiliated with any commercial curriculum.",
  research_basis: "Based on National Reading Panel (2000), Ehri's phases of reading development, and cognitive science research.",
  prohibited_associations: "This content is not derived from, affiliated with, or endorsed by LETRS, Wilson Reading System, Orton-Gillingham programs, or any commercial curriculum."
};

export interface StageInfo {
  stage_number: number;
  stage_name: string;
  grade_level: string;
  student_phase: string;
  duration: string;
  total_phonemes: number;
  key_concept: string;
  research_alignment: string;
}

export const eightStageProgression: StageInfo[] = [
  {
    stage_number: 1,
    stage_name: "Foundation Consonants & Short Vowels",
    grade_level: "Kindergarten (ages 5-6)",
    student_phase: "Pre-alphabetic to Partial Alphabetic",
    duration: "10-12 weeks",
    total_phonemes: 15,
    key_concept: "Letters represent sounds. CVC word formation is the foundation of reading.",
    research_alignment: "Adams (1990) - Most frequent consonants first; NRP - Systematic phonics"
  },
  {
    stage_number: 2,
    stage_name: "Complex Consonants & Beginning Digraphs",
    grade_level: "Late K/First Grade",
    student_phase: "Partial to Full Alphabetic",
    duration: "8-10 weeks",
    total_phonemes: 15,
    key_concept: "Some letters work together. Consonant teams and FLOSS rule.",
    research_alignment: "Ehri - Full alphabetic phase development; NRP - Digraph instruction"
  },
  {
    stage_number: 3,
    stage_name: "Consonant Blends & Advanced Digraphs",
    grade_level: "First Grade/Early Second",
    student_phase: "Full Alphabetic",
    duration: "10-12 weeks",
    total_phonemes: 18,
    key_concept: "Blending adjacent consonants while maintaining individual sounds.",
    research_alignment: "Adams - Blend instruction after single consonants; FCRR - Systematic blending"
  },
  {
    stage_number: 4,
    stage_name: "Long Vowels & VCe Patterns",
    grade_level: "First/Second Grade",
    student_phase: "Consolidated Alphabetic",
    duration: "12-14 weeks",
    total_phonemes: 20,
    key_concept: "Silent e and vowel teams change vowel sounds predictably.",
    research_alignment: "Ehri - Pattern recognition in consolidated phase; NRP - Vowel patterns"
  },
  {
    stage_number: 5,
    stage_name: "R-Controlled Vowels & Diphthongs",
    grade_level: "Second Grade",
    student_phase: "Consolidated Alphabetic",
    duration: "10-12 weeks",
    total_phonemes: 15,
    key_concept: "R changes vowel sounds; vowels can glide together.",
    research_alignment: "FCRR - R-controlled as separate category; NRP - Complex vowel patterns"
  },
  {
    stage_number: 6,
    stage_name: "Advanced Vowel Patterns & Syllable Types",
    grade_level: "Second/Third Grade",
    student_phase: "Advanced Consolidated",
    duration: "14-16 weeks",
    total_phonemes: 25,
    key_concept: "Six syllable types govern vowel sounds in multisyllabic words.",
    research_alignment: "Moats - Six syllable types; NRP - Multisyllabic decoding"
  },
  {
    stage_number: 7,
    stage_name: "Morphology & Advanced Patterns",
    grade_level: "Third/Fourth Grade",
    student_phase: "Morphological Awareness",
    duration: "Full year",
    total_phonemes: 30,
    key_concept: "Word parts carry meaning; prefixes, suffixes, and roots build vocabulary.",
    research_alignment: "Liu & Groen (2024) - Morphological awareness; Carlisle - Morphology impact"
  },
  {
    stage_number: 8,
    stage_name: "Latin/Greek Roots & Academic Vocabulary",
    grade_level: "Fourth/Fifth Grade",
    student_phase: "Advanced Morphological",
    duration: "Full year",
    total_phonemes: 40,
    key_concept: "Classical roots unlock academic vocabulary across disciplines.",
    research_alignment: "Nagy & Anderson - 60% of academic words have Latin/Greek; Biemiller - Vocabulary"
  }
];

// Enhanced scope and sequence for UI display
export const enhancedScopeAndSequence = [
  {
    grade: "Kindergarten",
    stages: [1, 2],
    description: "Foundation phonemes, CVC words, beginning digraphs",
    skills: [
      {
        id: "k-1",
        name: "Stage 1: Foundation Phonemes",
        description: "15 phonemes: m, s, a, t, n, p, i, d, f, o, l, h, b, e, u",
        quarter: 1,
        color: "bg-green-100",
        stage: 1
      },
      {
        id: "k-2",
        name: "CVC Word Mastery",
        description: "Blend and segment 3-sound words with all short vowels",
        quarter: 2,
        color: "bg-blue-100",
        stage: 1
      },
      {
        id: "k-3",
        name: "Stage 2: Beginning Digraphs",
        description: "sh, ch, th, ck, ss, ff, ll - FLOSS rule",
        quarter: 3,
        color: "bg-purple-100",
        stage: 2
      },
      {
        id: "k-4",
        name: "Decodable Text Application",
        description: "95% decodable texts using Stages 1-2 phonemes",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 2
      }
    ]
  },
  {
    grade: "Grade 1",
    stages: [2, 3, 4],
    description: "Blends, digraphs, long vowels with silent e",
    skills: [
      {
        id: "1-1",
        name: "Stage 2 Mastery & Review",
        description: "Complex consonants: r, g, k, j, v, w, y, z, qu",
        quarter: 1,
        color: "bg-green-100",
        stage: 2
      },
      {
        id: "1-2",
        name: "Stage 3: Consonant Blends",
        description: "Initial blends (st, sp, sk), final blends (nd, nt, mp)",
        quarter: 2,
        color: "bg-blue-100",
        stage: 3
      },
      {
        id: "1-3",
        name: "Stage 4: VCe Pattern",
        description: "Long vowels with silent e: a_e, i_e, o_e, u_e, e_e",
        quarter: 3,
        color: "bg-purple-100",
        stage: 4
      },
      {
        id: "1-4",
        name: "Inflectional Endings",
        description: "Adding -s, -ed, -ing to known words",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 4
      }
    ]
  },
  {
    grade: "Grade 2",
    stages: [4, 5, 6],
    description: "Vowel teams, r-controlled vowels, syllable types",
    skills: [
      {
        id: "2-1",
        name: "Stage 4: Vowel Teams",
        description: "Common teams: ai, ay, ea, ee, oa, ow, oi, oy",
        quarter: 1,
        color: "bg-green-100",
        stage: 4
      },
      {
        id: "2-2",
        name: "Stage 5: R-Controlled Vowels",
        description: "ar, or, er, ir, ur - bossy r patterns",
        quarter: 2,
        color: "bg-blue-100",
        stage: 5
      },
      {
        id: "2-3",
        name: "Stage 6: Syllable Types",
        description: "Closed, open, VCe, vowel team, r-controlled, consonant-le",
        quarter: 3,
        color: "bg-purple-100",
        stage: 6
      },
      {
        id: "2-4",
        name: "Multisyllabic Decoding",
        description: "Breaking words into syllables for decoding",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 6
      }
    ]
  },
  {
    grade: "Grade 3",
    stages: [6, 7],
    description: "Advanced patterns, morphology introduction",
    skills: [
      {
        id: "3-1",
        name: "Stage 6: Advanced Vowel Patterns",
        description: "au, aw, oo, ew, ough, schwa in unstressed syllables",
        quarter: 1,
        color: "bg-green-100",
        stage: 6
      },
      {
        id: "3-2",
        name: "Stage 7: Prefixes & Suffixes",
        description: "re-, un-, dis-, pre-, -ful, -less, -ness, -ment",
        quarter: 2,
        color: "bg-blue-100",
        stage: 7
      },
      {
        id: "3-3",
        name: "Base Words & Roots",
        description: "Identifying base words, adding multiple affixes",
        quarter: 3,
        color: "bg-purple-100",
        stage: 7
      },
      {
        id: "3-4",
        name: "Morphological Analysis",
        description: "Breaking complex words into meaningful parts",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 7
      }
    ]
  },
  {
    grade: "Grade 4",
    stages: [7, 8],
    description: "Latin roots, advanced morphology",
    skills: [
      {
        id: "4-1",
        name: "Stage 7: Advanced Morphology",
        description: "Complex prefixes: in-, ex-, mis-, non-, inter-",
        quarter: 1,
        color: "bg-green-100",
        stage: 7
      },
      {
        id: "4-2",
        name: "Stage 8: Latin Roots I",
        description: "port, dict, rupt, spect, tract, struct, form",
        quarter: 2,
        color: "bg-blue-100",
        stage: 8
      },
      {
        id: "4-3",
        name: "Greek Combining Forms",
        description: "geo, photo, auto, tele, bio, graph, phon",
        quarter: 3,
        color: "bg-purple-100",
        stage: 8
      },
      {
        id: "4-4",
        name: "Academic Vocabulary",
        description: "Using roots to decode content-area vocabulary",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 8
      }
    ]
  },
  {
    grade: "Grade 5",
    stages: [8],
    description: "Advanced roots, complex morphological analysis",
    skills: [
      {
        id: "5-1",
        name: "Stage 8: Latin Roots II",
        description: "bene, mal, cogn, sens, aud, vis, cred, fid",
        quarter: 1,
        color: "bg-green-100",
        stage: 8
      },
      {
        id: "5-2",
        name: "Advanced Greek Roots",
        description: "path, log, chron, dem, morph, polis, thesis",
        quarter: 2,
        color: "bg-blue-100",
        stage: 8
      },
      {
        id: "5-3",
        name: "Complex Word Analysis",
        description: "Multiple morphemes: telecommunications, autobiography",
        quarter: 3,
        color: "bg-purple-100",
        stage: 8
      },
      {
        id: "5-4",
        name: "Vocabulary Mastery",
        description: "Independent word analysis across all content areas",
        quarter: 4,
        color: "bg-yellow-100",
        stage: 8
      }
    ]
  }
];

// Assessment benchmarks by stage
export const assessmentBenchmarks = {
  stage1: {
    phoneme_production: "90% accuracy",
    letter_sound: "95% accuracy",
    cvc_reading: "85% accuracy",
    cvc_spelling: "80% accuracy"
  },
  stage2: {
    digraph_reading: "90% accuracy",
    floss_rule: "85% accuracy",
    complex_consonants: "85% accuracy"
  },
  stage3: {
    blend_reading: "90% accuracy",
    blend_spelling: "85% accuracy",
    multisyllabic_attempt: "75% accuracy"
  },
  stage4: {
    vce_pattern: "90% accuracy",
    vowel_teams: "85% accuracy",
    inflections: "90% accuracy"
  },
  stage5: {
    r_controlled: "85% accuracy",
    diphthongs: "80% accuracy",
    syllable_division: "75% accuracy"
  },
  stage6: {
    six_syllable_types: "85% accuracy",
    multisyllabic_reading: "80% accuracy",
    schwa_recognition: "75% accuracy"
  },
  stage7: {
    prefix_suffix: "90% accuracy",
    base_word_identification: "85% accuracy",
    morpheme_manipulation: "80% accuracy"
  },
  stage8: {
    root_recognition: "85% accuracy",
    word_derivation: "80% accuracy",
    academic_vocabulary: "75% accuracy"
  }
};

// Differentiation guidelines by stage
export const differentiationGuidelines = {
  struggling: {
    pace: "50% slower progression",
    practice: "Double the practice opportunities",
    support: "Explicit multisensory instruction",
    grouping: "Small group or 1:1 instruction"
  },
  onLevel: {
    pace: "Standard progression",
    practice: "Regular practice schedule",
    support: "Whole group with targeted small group",
    grouping: "Flexible grouping"
  },
  advanced: {
    pace: "Accelerated by 25-50%",
    practice: "Extension activities",
    support: "Independent application",
    grouping: "Enrichment groups"
  }
};

// Export functions for accessing stage data
export function getStageInfo(stageNumber: number): StageInfo | undefined {
  return eightStageProgression.find(stage => stage.stage_number === stageNumber);
}

export function getStagesForGrade(grade: string): number[] {
  const gradeData = enhancedScopeAndSequence.find(g => g.grade === grade);
  return gradeData ? gradeData.stages : [];
}

export function getSkillsForStage(stageNumber: number): any[] {
  const skills: any[] = [];
  enhancedScopeAndSequence.forEach(grade => {
    grade.skills.forEach(skill => {
      if (skill.stage === stageNumber) {
        skills.push({...skill, grade: grade.grade});
      }
    });
  });
  return skills;
}

export function getAssessmentBenchmark(stageNumber: number): any {
  return assessmentBenchmarks[`stage${stageNumber}` as keyof typeof assessmentBenchmarks];
}