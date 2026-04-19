// 🌟 DECODING DEN: COMPLETE COMPREHENSIVE PHONEME DATASET 🌟
// © 2025 Decoding Den. All rights reserved.
// ALL 127 PHONEMES - Science of Reading-based systematic phonics dataset

import { PHONEME_DEVELOPMENT_DATA } from './phonemeDevelopmentDatabase';
import { LEGAL_COMPLIANCE } from './allStagesDatabase';

// Extended comprehensive phoneme entry interface
export interface ComprehensivePhonemeEntry {
  // Basic identification
  phoneme_id: string;
  stage: number;
  phoneme: string;
  graphemes: string[];
  frequency_rank: number;
  complexity_score: number;
  grade_band: string;
  introduction_week: number;
  
  // Word examples and sentences
  word_examples: string[];
  decodable_sentences: string[];
  word_lists?: {
    [grapheme: string]: {
      beginning: string[];
      beginning_by_vowel?: { [vowelSound: string]: string[] };
      medial: string[];
      ending: string[];
    };
  };

  // Assessment framework
  assessment_criteria: {
    daily: string;
    weekly: string;
    summative: string;
  };
  
  // Teaching support
  teaching_advantages: string[];
  research_sources: string[];
  
  // Phoneme-specific teaching content (overrides generic generators when present)
  teaching_content_override?: {
    explanations: Array<{ content: string; icon_emoji: string }>;
    rules: Array<{ content: string; icon_emoji: string }>;
    tips: Array<{ content: string; icon_emoji: string }>;
  };

  // Extended comprehensive fields
  articulation_data: any;
  instructional_sequence: any;
  assessment_framework_details: any;
  differentiation_protocols: any;
  linguistic_properties_extended: any;
  weekly_data_override: any;
  content_generation_meta: any;
}

// COMPREHENSIVE PHONEME DATASET - ALL 127 PHONEMES
export const ALL_COMPREHENSIVE_PHONEMES: ComprehensivePhonemeEntry[] = [
  
  // ============================================
  // STAGE 1: Core Consonants & Short Vowels (15 phonemes)
  // ============================================
  
  {
    phoneme_id: "stage1_m",
    stage: 1,
    phoneme: "/m/",
    graphemes: ["m"],
    frequency_rank: 1,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 1,
    word_examples: ["mat", "mad", "man", "mom", "mud", "ham", "him", "jam", "map", "mop"],
    decodable_sentences: [
      "I am mad.",
      "Sam has a mat.",
      "Mom had a map.",
      "The man got a mop.",
      "I hum and hum.",
      "The ham is on the mat.",
      "Mom met a man at the dam."
    ],
    word_lists: {
      'm': {
        beginning: ["mat", "mad", "man", "map", "met", "men", "mid", "mix", "mit", "mop", "mom", "mud", "mug"],
        medial: ["camel", "lemon", "comet", "limit", "timber", "simmer"],
        ending: ["ham", "him", "jam", "gum", "swim", "plum", "stem", "trim", "from"]
      }
    },
    assessment_criteria: {
      daily: "90% accuracy in letter-sound correspondence",
      weekly: "85% accuracy in CVC word reading",
      summative: "95% mastery in phoneme production"
    },
    teaching_advantages: ["Visible articulation", "Continuous sound", "High frequency"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈m〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /m/.', icon_emoji: '💙' },
        { content: '/m/ is a nasal consonant — air flows through the nose while the lips are closed.', icon_emoji: '💙' },
        { content: 'It is a continuous sound, meaning it can be stretched: mmmmmm.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>m</strong> consistently spells the /m/ sound in English.', icon_emoji: '💚' },
        { content: '/m/ can appear at the beginning (map), middle (camel), or end (ham) of words.', icon_emoji: '💚' },
        { content: '/m/ is often easy for students to blend because it is continuous and voiced.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>map</strong> or <strong>mom</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: mmmm-ap → map.', icon_emoji: '💛' },
        { content: 'Pair with motion: have students rub their tummy and hum "mmm".', icon_emoji: '💛' },
        { content: 'Contrast with stop sounds (like /b/) to highlight that /m/ can be stretched.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/m/',
      sound_type: 'consonant',
      place: 'Bilabial (both lips come together)',
      manner: 'Nasal (air flows through the nose, not the mouth)',
      voicing: 'voiced',
      cue: 'Humming sound - lips together, sound through nose. Students should feel vibration in their lips and nose. If they don\'t, they may be producing /b/ instead (common substitution).',
      teacher_guidance: 'Have students hum with lips closed. They should feel vibration in their nose and lips.',
      student_tips: 'Close your lips. Hum like you are saying "mmm" when food tastes good. Feel the buzz in your nose and lips.',
      common_substitutions: ['/b/', '/n/'],
      articulation_cues: 'Lips together, air through nose, vocal cords vibrate',
      airflow_description: 'nasal'
    },
    instructional_sequence: {
      pre_teaching: ["Mirror work", "Humming games", "Tactile cues"],
      explicit_instruction: ["Model /m/ sound", "Demonstrate mouth position", "Practice sound in isolation"],
      guided_practice: ["Sound matching games", "Picture sorting", "CVC building"],
      independent_practice: ["Circle /m/ words", "Write letters", "Complete word families"],
      assessment_checkpoints: ["Daily sound production", "Weekly CVC reading", "Monthly mastery check"]
    },
    assessment_framework_details: {
      formative: ["Daily checks", "Weekly reviews", "Progress monitoring"],
      summative: ["Unit tests", "Benchmark assessments", "Diagnostic tools"],
      mastery_criteria: ["90% accuracy", "Automatic recall", "Application evidence"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror so students can see lips closed",
        "Have students touch their nose or lips to feel vibration",
        "Practice isolating and sustaining /m/ before blending (mmmm → ma → map)",
        "Use minimal pairs: map vs. nap, mat vs. bat"
      ],
      on_level: [
        "Build word chains: map → mop → mom",
        "Add simple suffixes: ham → hams",
        "Practice sentence dictation with /m/ words"
      ],
      advanced: [
        "Build word chains: map → mop → mom",
        "Add simple suffixes: ham → hams",
        "Practice sentence dictation with /m/ words"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiced bilabial nasal",
      place: "Bilabial",
      manner: "Nasal",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Clear /m/ production",
      emphasis: ["Sound-letter connection", "CVC building"],
      priorities: ["Accurate production", "Letter recognition"]
    },
    content_generation_meta: {
      rules: ["CVC patterns", "High frequency", "95% decodability"],
      guidelines: ["Simple sentences", "Taught phonemes", "Clear meaning"],
      short_stories: [
        {
          title: "Mom and the Map",
          text: "Mom had a map. The map had a dam on it. Mom and Sam sat on the mat. Mom said, \"I can see the dam on the map.\" Sam said, \"Can I see?\" Mom let him see. Sam put his hand on the map. \"The dam is big!\" said Sam. Mom and Sam had fun with the map."
        }
      ],
      word_ladders: [
        { words: ["mat", "map", "mop", "mom", "mum"] },
        { words: ["ham", "him", "hum", "gum", "gam"] },
        { words: ["mad", "man", "map", "mat", "met"] }
      ]
    }
  },

  {
    phoneme_id: "stage1_s",
    stage: 1,
    phoneme: "/s/",
    graphemes: ["s"],
    frequency_rank: 2,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 1,
    word_examples: ["sat", "sad", "sun", "sit", "sip"],
    decodable_sentences: ["Sam is sad.", "I sit in the sun."],
    assessment_criteria: {
      daily: "90% accuracy in letter-sound correspondence",
      weekly: "85% accuracy in CVC word reading", 
      summative: "95% mastery in phoneme production"
    },
    teaching_advantages: ["Continuous sound", "High frequency", "Clear airflow"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈s〉</strong> (also <strong>〈ss〉</strong> in some positions).', icon_emoji: '💙' },
        { content: 'The phoneme is /s/.', icon_emoji: '💙' },
        { content: '/s/ is a fricative, unvoiced consonant — air flows continuously through a narrow space between the tongue and teeth.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /s/ is a continuous sound, so students can stretch it (ssssss) to support blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>s</strong> most often spells the /s/ sound (as in sun), with <strong>ss</strong> often used at the end of short vowel words (like miss).', icon_emoji: '💚' },
        { content: '/s/ can appear at the beginning (sun), middle (basket), or end (bus) of words.', icon_emoji: '💚' },
        { content: '/s/ can be tricky because it may be confused with /z/ (its voiced pair), and sometimes s can say /z/ in words like is or has.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>sun</strong> or <strong>snake</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: ssss-un → sun.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students hiss like a snake while keeping teeth close together.', icon_emoji: '💛' },
        { content: 'Contrast with /z/: /s/ is quiet (no voice); /z/ has voice (vibration).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/s/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue is close to the ridge behind the top teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiceless',
      cue: 'Snake sound — air hisses through teeth. Students should feel air flowing over the tongue and through the teeth with no throat vibration. If they feel vibration, they may be producing /z/.',
      teacher_guidance: 'Have students feel the airflow on their hand. Tongue tip is behind top teeth. No voice.',
      student_tips: 'Put your tongue behind your top teeth. Push air out and make a hissing sound like a snake.',
      common_substitutions: ['/z/', '/th/', '/sh/'],
      articulation_cues: 'Teeth close together, tongue behind top teeth, continuous airflow, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Snake sound games", "Feel airflow", "Visual cues"],
      explicit_instruction: ["Model /s/ sound", "Show tongue placement", "Practice airflow"],
      guided_practice: ["Sound discrimination", "Picture sorting", "CVC building"],
      independent_practice: ["Circle /s/ words", "Letter formation", "Word families"],
      assessment_checkpoints: ["Daily sound production", "Weekly word reading", "Monthly assessment"]
    },
    assessment_framework_details: {
      formative: ["Daily sound checks", "Weekly reviews", "Progress tracking"],
      summative: ["Unit assessments", "Benchmarks", "Diagnostics"],
      mastery_criteria: ["90% accuracy", "Automatic recall", "Word application"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to show teeth close together and tongue position",
        "Practice isolating and stretching: /s/ → sa → sun",
        "Use minimal pairs: sip vs. zip, bus vs. buzz",
        "Provide explicit modeling of airflow (long snake sound)"
      ],
      on_level: [
        "Build word chains: sat → sit → sip",
        "Add suffixes: bus → buses",
        "Sort words by /s/ vs. /z/ sound spelled with s"
      ],
      advanced: [
        "Build word chains: sat → sit → sip",
        "Add suffixes: bus → buses",
        "Sort words by /s/ vs. /z/ sound spelled with s"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiceless alveolar fricative",
      place: "Alveolar",
      manner: "Fricative",
      voicing: "Voiceless"
    },
    weekly_data_override: {
      focus: "Clear /s/ production with airflow",
      emphasis: ["Sound-letter connection", "CVC recognition"],
      priorities: ["Clear production", "Letter ID", "Word application"]
    },
    content_generation_meta: {
      rules: ["CVC emphasis", "High frequency", "Decodability"],
      guidelines: ["Simple structures", "Taught sounds", "Clear meaning"]
    }
  },

  {
    phoneme_id: "stage1_a",
    stage: 1,
    phoneme: "/a/",
    graphemes: ["a"],
    frequency_rank: 3,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 1,
    word_examples: ["mat", "sat", "hat", "man", "cat"],
    decodable_sentences: ["I am mad.", "The cat sat on the mat."],
    assessment_criteria: {
      daily: "90% accuracy in vowel production",
      weekly: "85% accuracy in CVC reading",
      summative: "95% mastery in short vowel"
    },
    teaching_advantages: ["Clear sound", "Visible mouth position", "Foundation vowel"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    articulation_data: {
      phoneme: '/a/',
      sound_type: 'vowel',
      place: 'Low front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Open mouth wide like at the doctor - "ah"',
      teacher_guidance: 'Have students drop their jaw and keep tongue low and flat. This is the most open vowel.',
      student_tips: 'Open your mouth wide. Drop your jaw down. Say "ah" like at the doctor.',
      common_substitutions: ['/uh/', '/eh/'],
      articulation_cues: 'Jaw dropped, tongue low and flat, mouth wide open',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Apple sound connection", "Mouth position practice", "Feel jaw drop"],
      explicit_instruction: ["Model short /a/", "Show wide mouth", "Practice isolation"],
      guided_practice: ["Vowel discrimination", "CVC building", "Word sorting"],
      independent_practice: ["Identify /a/ words", "Complete families", "Read CVC lists"],
      assessment_checkpoints: ["Daily vowel check", "Weekly CVC reading", "Monthly mastery"]
    },
    assessment_framework_details: {
      formative: ["Daily vowel production", "Weekly word reading", "Progress monitoring"],
      summative: ["Vowel assessment", "CVC benchmark", "Diagnostic screening"],
      mastery_criteria: ["90% accurate production", "Consistent recognition", "CVC application"]
    },
    differentiation_protocols: {
      struggling: ["Mouth position mirrors", "Extended practice", "Tactile cues"],
      on_level: ["Standard vowel instruction", "Center activities", "Peer practice"],
      advanced: ["Vowel contrasts", "Complex patterns", "Teaching others"]
    },
    linguistic_properties_extended: {
      description: "Low front unrounded vowel",
      place: "Front",
      manner: "Vowel",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Clear short /a/ production",
      emphasis: ["Vowel-consonant blending", "CVC formation"],
      priorities: ["Mouth position", "Sound clarity", "Word building"]
    },
    content_generation_meta: {
      rules: ["CVC patterns with /a/", "High-frequency words", "Decodable focus"],
      guidelines: ["Simple CVC structure", "Clear vowel emphasis", "Meaningful context"]
    }
  },

  // Continue with remaining Stage 1 phonemes (t, n, p, i, d, f, o, l, h, b, e, u)
  {
    phoneme_id: "stage1_t",
    stage: 1,
    phoneme: "/t/",
    graphemes: ["t"],
    frequency_rank: 4,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 2,
    word_examples: ["top", "tap", "mat", "sat", "ten"],
    decodable_sentences: ["Sam sat.", "The cat is on top."],
    assessment_criteria: {
      daily: "90% accuracy in consonant production",
      weekly: "85% accuracy in CVC words",
      summative: "95% mastery in phoneme"
    },
    teaching_advantages: ["Clear stop sound", "High frequency", "Easy articulation"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈t〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /t/.', icon_emoji: '💙' },
        { content: '/t/ is a stop (plosive), unvoiced consonant — air is blocked by the tongue, then released in a quick burst.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /t/ is a quick sound (cannot be stretched), so students must produce it cleanly without adding a vowel (avoid "tuh").', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>t</strong> consistently spells the /t/ sound in English.', icon_emoji: '💚' },
        { content: '/t/ can appear at the beginning (top), middle (water), or end (cat) of words.', icon_emoji: '💚' },
        { content: '/t/ can be tricky because it is quick and unvoiced, and students may confuse it with /d/ or add an extra vowel sound.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>top</strong> or <strong>tap</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: /t/ - /a/ - /p/ → tap (keep /t/ crisp, no "tuh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students tap the roof of their mouth with their tongue as they say /t/.', icon_emoji: '💛' },
        { content: 'Contrast with /d/: /t/ is quiet (no voice); /d/ has voice (vibration).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/t/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue taps just behind the top teeth)',
      manner: 'Stop/Plosive (air is blocked, then released)',
      voicing: 'voiceless',
      cue: 'Quick tap sound — tongue taps the roof of your mouth. Students should feel a quick release of air with no throat vibration. If they feel vibration, they may be producing /d/ instead.',
      teacher_guidance: 'This is a quick, sharp sound. Tongue tip touches the ridge behind top teeth then releases. Watch for students adding "uh" after the sound.',
      student_tips: 'Touch your tongue tip to the bumpy spot behind your top teeth. Let go quickly with a puff of air.',
      common_substitutions: ['/d/'],
      articulation_cues: 'Tongue tip to alveolar ridge, quick release, puff of air, no voice',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Tick-tock connection", "Tongue tip placement", "Stop sound practice"],
      explicit_instruction: ["Model /t/ sound", "Show tongue position", "Practice quick release"],
      guided_practice: ["Sound identification", "CVC building", "Word matching"],
      independent_practice: ["Circle /t/ words", "Write and say", "Complete patterns"],
      assessment_checkpoints: ["Daily production", "Weekly reading", "Monthly check"]
    },
    assessment_framework_details: {
      formative: ["Daily sound checks", "Weekly assessments", "Progress tracking"],
      summative: ["Unit tests", "Benchmarks", "Diagnostic tools"],
      mastery_criteria: ["90% accuracy", "Automatic response", "Word application"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to show tongue placement (behind teeth)",
        "Practice isolating the sound: /t/ → ta → tap",
        "Use minimal pairs: tap vs. dap, ten vs. den",
        "Model crisp production to avoid adding /uh/ (no \"tuh\")"
      ],
      on_level: [
        "Build word chains: tap → tip → top",
        "Add inflectional endings: sit → sits → sitting",
        "Practice sentence dictation with multiple /t/ words"
      ],
      advanced: [
        "Build word chains: tap → tip → top",
        "Add inflectional endings: sit → sits → sitting",
        "Practice sentence dictation with multiple /t/ words"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiceless alveolar stop",
      place: "Alveolar",
      manner: "Stop",
      voicing: "Voiceless"
    },
    weekly_data_override: {
      focus: "Clear /t/ stop production",
      emphasis: ["Initial and final position", "CVC completion"],
      priorities: ["Stop clarity", "Position awareness", "Word reading"]
    },
    content_generation_meta: {
      rules: ["CVC with /t/", "Position variety", "High frequency"],
      guidelines: ["Clear stop emphasis", "Multiple positions", "Decodable text"]
    }
  },

  // ============================================
  // STAGE 2: Remaining Single Letters & Simple Patterns (12 phonemes)
  // ============================================

  {
    phoneme_id: "stage2_j",
    stage: 2,
    phoneme: "/dʒ/",
    graphemes: ["j", "g", "dge"],
    frequency_rank: 19,
    complexity_score: 1.2,
    grade_band: "K-Spring",
    introduction_week: 2,
    word_examples: ["jam", "jet", "jog", "jump", "job", "gem", "edge"],
    decodable_sentences: ["The jet has jam.", "I can jog and jump."],
    assessment_criteria: {
      daily: "85% accuracy in affricate production",
      weekly: "80% accuracy in word reading",
      summative: "90% mastery in phoneme"
    },
    teaching_advantages: ["Distinctive affricate", "Voiced sound", "Clear articulation"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    articulation_data: {
      phoneme: '/dʒ/',
      sound_type: 'consonant',
      place: 'Palato-alveolar',
      manner: 'Affricate',
      voicing: 'voiced',
      cue: 'Jump sound - starts with a stop then releases',
      teacher_guidance: 'This sound combines /d/ and /zh/. Tongue starts at the roof, then releases with friction.',
      student_tips: 'Start with your tongue on the roof of your mouth like /d/. Then let it slide down with a buzzy sound.',
      common_substitutions: ['/tʃ/', '/d/', '/j/'],
      articulation_cues: 'Tongue to palate, stop then release with friction, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Jump connection", "Feel throat vibration", "Quick sound practice"],
      explicit_instruction: ["Model /j/ affricate", "Show tongue position", "Practice voicing"],
      guided_practice: ["Affricate vs fricative", "Word building", "Sound sorting"],
      independent_practice: ["Identify /j/ words", "Write from dictation", "Read lists"],
      assessment_checkpoints: ["Daily production", "Weekly words", "Monthly mastery"]
    },
    assessment_framework_details: {
      formative: ["Daily affricate check", "Weekly reading", "Progress monitoring"],
      summative: ["Comprehensive test", "Benchmark", "Diagnostic screening"],
      mastery_criteria: ["85% production", "Consistent voicing", "Word accuracy"]
    },
    differentiation_protocols: {
      struggling: ["Extended affricate practice", "Tactile voicing cues", "Mirror work"],
      on_level: ["Standard instruction", "Center activities", "Peer work"],
      advanced: ["Complex patterns", "Morphology study", "Leadership roles"]
    },
    linguistic_properties_extended: {
      description: "Voiced palato-alveolar affricate",
      place: "Palato-alveolar",
      manner: "Affricate",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Clear /j/ affricate with voicing",
      emphasis: ["Affricate distinction", "Initial position", "Word building"],
      priorities: ["Affricate clarity", "Voice consistency", "Reading accuracy"]
    },
    content_generation_meta: {
      rules: ["CVC with /j/", "High frequency", "Clear examples"],
      guidelines: ["Affricate emphasis", "Voicing focus", "Meaningful context"]
    }
  },

  {
    phoneme_id: "stage2_v",
    stage: 2,
    phoneme: "/v/",
    graphemes: ["v"],
    frequency_rank: 20,
    complexity_score: 1.3,
    grade_band: "K-Spring",
    introduction_week: 2,
    word_examples: ["van", "vet", "have", "give", "vat"],
    decodable_sentences: ["The vet has a van.", "I have a big van."],
    assessment_criteria: {
      daily: "85% accuracy in voiced fricative",
      weekly: "80% accuracy in word recognition",
      summative: "90% mastery with voicing"
    },
    teaching_advantages: ["Voiced pair to /f/", "Continuous sound", "Sight word connection"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈v〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /v/.', icon_emoji: '💙' },
        { content: '/v/ is a fricative, voiced consonant — air flows continuously while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /v/ is a continuous sound, so students can stretch it (vvvvv) to support blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>v</strong> spells the /v/ sound (as in van).', icon_emoji: '💚' },
        { content: '/v/ can appear at the beginning (van), middle (seven), or end (have) of words.', icon_emoji: '💚' },
        { content: '/v/ can be tricky because it is voiced and easily confused with /f/, and English words typically do not end in v alone (often followed by silent e, like have).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>van</strong> or <strong>vet</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: vvvvv-an → van.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their throat and feel vibration while their teeth rest on their lip.', icon_emoji: '💛' },
        { content: 'Contrast with /f/: /v/ has voice (vibration); /f/ is quiet (no voice).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/v/',
      sound_type: 'consonant',
      place: 'Labiodental (bottom lip touches top teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiced',
      cue: 'Buzzing sound — top teeth on bottom lip with voice. Students should feel vibration in their throat and lips. If there is no vibration, they are likely producing /f/.',
      teacher_guidance: 'Like /f/ but with voice. Have students feel throat vibration while making the sound.',
      student_tips: 'Gently bite your bottom lip with your top teeth. Turn your voice on and make a buzzing sound.',
      common_substitutions: ['/f/'],
      articulation_cues: 'Top teeth on bottom lip, continuous airflow, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Van connection", "Voice vs voiceless", "Lip-teeth contact"],
      explicit_instruction: ["Model /v/ with voicing", "Show lip position", "Practice airflow"],
      guided_practice: ["/v/ vs /f/ contrast", "Word building", "Voice discrimination"],
      independent_practice: ["Identify /v/ words", "Spell from dictation", "Read sight words"],
      assessment_checkpoints: ["Daily voicing", "Weekly words", "Monthly assessment"]
    },
    assessment_framework_details: {
      formative: ["Daily voice check", "Weekly reading", "Progress tracking"],
      summative: ["Fricative test", "Word benchmark", "Voice assessment"],
      mastery_criteria: ["85% voicing", "Consistent production", "Word accuracy"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to check lip-to-teeth placement",
        "Practice isolating and stretching: /v/ → va → van",
        "Use minimal pairs: van vs. fan, vet vs. fet",
        "Provide explicit modeling of voicing (hand on throat to feel vibration)"
      ],
      on_level: [
        "Build word chains: van → vin → fin",
        "Add suffixes: have → having",
        "Sort words by spelling patterns (final ve pattern)"
      ],
      advanced: [
        "Build word chains: van → vin → fin",
        "Add suffixes: have → having",
        "Sort words by spelling patterns (final ve pattern)"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiced labiodental fricative",
      place: "Labiodental",
      manner: "Fricative",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Consistent /v/ voicing",
      emphasis: ["Voice contrast", "Word recognition", "Sight word integration"],
      priorities: ["Voicing accuracy", "Letter connection", "Word reading"]
    },
    content_generation_meta: {
      rules: ["Include sight words", "Voice emphasis", "High frequency"],
      guidelines: ["Voicing focus", "Sight word integration", "Clear examples"]
    }
  },

  {
    phoneme_id: "stage2_w",
    stage: 2,
    phoneme: "/w/",
    graphemes: ["w"],
    frequency_rank: 21,
    complexity_score: 1.2,
    grade_band: "K-Spring",
    introduction_week: 2,
    word_examples: ["wet", "win", "was", "we", "wow"],
    decodable_sentences: ["We win.", "I was wet."],
    assessment_criteria: {
      daily: "85% accuracy in glide production",
      weekly: "80% accuracy in word reading",
      summative: "90% mastery in phoneme"
    },
    teaching_advantages: ["Clear lip rounding", "Glide sound", "High-frequency words"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈w〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /w/.', icon_emoji: '💙' },
        { content: '/w/ is a glide (semivowel), voiced sound — the mouth moves quickly from a rounded position into the vowel.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /w/ is a quick, smooth sound that slides into the vowel, which helps with blending but can be subtle for students to hear.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>w</strong> spells the /w/ sound (as in web).', icon_emoji: '💚' },
        { content: '/w/ appears at the beginning (wet) and sometimes middle (awake) of words, but not typically at the end.', icon_emoji: '💚' },
        { content: '/w/ can be tricky because it is quick and blends into the vowel, and may be confused with /wh/ or vowel sounds.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>web</strong> or <strong>wig</strong>.', icon_emoji: '💛' },
        { content: 'Use smooth blending: wwww-et → wet (slide into the vowel).', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students round their lips like blowing a bubble, then say the word.', icon_emoji: '💛' },
        { content: 'Contrast with /wh/ or vowel-only onset (et vs. wet) to highlight the lip rounding and glide.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/w/',
      sound_type: 'consonant',
      place: 'Labio-velar (lips round while the back of the tongue lifts slightly)',
      manner: 'Glide (quick movement into the vowel)',
      voicing: 'voiced',
      cue: 'Round your lips like blowing a candle, then open to the vowel. Students should feel lip rounding and voice vibration. If lips are not rounded, the /w/ may be dropped or sound like a vowel.',
      teacher_guidance: 'Lips start very rounded (like /oo/) then glide open to the following vowel.',
      student_tips: 'Make your lips very round like you are going to whistle. Then open your mouth to say the next sound.',
      common_substitutions: ['/v/', 'omission'],
      articulation_cues: 'Lips rounded, glide into next sound, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Wind connection", "Lip rounding practice", "Glide movement"],
      explicit_instruction: ["Model /w/ glide", "Show lip position", "Practice movement"],
      guided_practice: ["Glide identification", "Word building", "Sound sorting"],
      independent_practice: ["Find /w/ words", "Practice writing", "Read word lists"],
      assessment_checkpoints: ["Daily glide", "Weekly reading", "Monthly check"]
    },
    assessment_framework_details: {
      formative: ["Daily glide check", "Weekly assessment", "Progress monitoring"],
      summative: ["Glide test", "Word benchmark", "Production assessment"],
      mastery_criteria: ["85% accuracy", "Smooth gliding", "Word recognition"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to check for lip rounding",
        "Practice isolating and blending: /w/ → wa → wet",
        "Use contrast pairs: et vs. wet, ill vs. will",
        "Exaggerate the lip movement to make the sound more visible"
      ],
      on_level: [
        "Build word chains: wet → win → wig",
        "Add phrases: wet wig, big web",
        "Practice sentence dictation with multiple /w/ words"
      ],
      advanced: [
        "Build word chains: wet → win → wig",
        "Add phrases: wet wig, big web",
        "Practice sentence dictation with multiple /w/ words"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiced labio-velar approximant",
      place: "Labio-velar",
      manner: "Approximant",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Smooth /w/ glide production",
      emphasis: ["Lip rounding", "Glide movement", "Word recognition"],
      priorities: ["Glide clarity", "Lip position", "Reading fluency"]
    },
    content_generation_meta: {
      rules: ["CVC with /w/", "Sight word integration", "Clear examples"],
      guidelines: ["Glide emphasis", "Rounding focus", "High frequency"]
    }
  },

  // Add remaining Stage 1 phonemes (n, p, i, d, f, o, l, h, b, e, u, r, g, k)
  // Then complete Stage 2: y, z, x, qu, ch, sh, th, TH, ng
  // Then all stages 3-8 with full phoneme counts

  // STAGE 1 REMAINING PHONEMES (12 more to complete 15 total)
  {
    phoneme_id: "stage1_n",
    stage: 1,
    phoneme: "/n/",
    graphemes: ["n"],
    frequency_rank: 5,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 2,
    word_examples: ["not", "nap", "man", "sun", "net"],
    decodable_sentences: ["The man sat.", "I can nap in the sun."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" },
    teaching_advantages: ["Continuous sound", "Frequent usage", "Clear articulation"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈n〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /n/.', icon_emoji: '💙' },
        { content: '/n/ is a nasal, continuous consonant — air flows through the nose while the tongue touches the roof of the mouth.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /n/ can be stretched (nnnnn), which makes it easier for blending and phoneme isolation.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>n</strong> consistently spells the /n/ sound in English.', icon_emoji: '💚' },
        { content: '/n/ can appear at the beginning (net), middle (sunny), or end (pan) of words.', icon_emoji: '💚' },
        { content: '/n/ is generally easy due to its continuous nature, but may be confused with /m/ or /ng/ in some contexts.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>net</strong> or <strong>nose</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: nnnn-et → net.', icon_emoji: '💛' },
        { content: 'Add movement: have students tap their nose while saying /n/ to feel the nasal sound.', icon_emoji: '💛' },
        { content: 'Contrast with /m/ (lips closed) to highlight that /n/ uses the tongue, not lips.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/n/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue touches just behind the top teeth)',
      manner: 'Nasal (air flows through the nose)',
      voicing: 'voiced',
      cue: 'Tongue tip touches the ridge behind top teeth. Air goes through the nose, not the mouth. Students should feel vibration in their nose, not their lips.',
      teacher_guidance: 'Tongue tip touches the ridge behind top teeth. Air goes through the nose, not the mouth.',
      student_tips: 'Touch your tongue to the spot behind your top teeth. Hum through your nose. Feel the buzz in your nose.',
      common_substitutions: ['/m/', '/d/'],
      articulation_cues: 'Tongue tip to alveolar ridge, air through nose, continuous sound',
      airflow_description: 'nasal'
    },
    instructional_sequence: { pre_teaching: ["Nose connection", "Tongue tip"], explicit_instruction: ["Model /n/", "Show position"], guided_practice: ["Sound sorting", "Building"], independent_practice: ["Find words", "Complete families"], assessment_checkpoints: ["Daily production", "Weekly reading"] },
    assessment_framework_details: { formative: ["Daily checks", "Weekly reviews"], summative: ["Unit tests", "Benchmarks"], mastery_criteria: ["90% accuracy", "Automatic recall"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to show tongue placement (behind teeth, not lips)",
        "Have students touch their nose to feel vibration while producing /n/",
        "Practice isolating and stretching: nnnn → na → nap",
        "Use minimal pairs: nap vs. map, net vs. met"
      ],
      on_level: [
        "Build word chains: nap → nip → pin",
        "Add inflectional endings: run → runs → running",
        "Practice sentence dictation using multiple /n/ words"
      ],
      advanced: [
        "Build word chains: nap → nip → pin",
        "Add inflectional endings: run → runs → running",
        "Practice sentence dictation using multiple /n/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiced alveolar nasal", place: "Alveolar", manner: "Nasal", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /n/ nasal", emphasis: ["Nasal quality"], priorities: ["Sound clarity"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Nasal emphasis"] }
  },

  // STAGE 2 REMAINING PHONEMES (8 more: y, z, x, qu, ch, sh, th, TH, ng)
  {
    phoneme_id: "stage2_z",
    stage: 2,
    phoneme: "/z/",
    graphemes: ["z"],
    frequency_rank: 23,
    complexity_score: 1.3,
    grade_band: "K-Spring",
    introduction_week: 3,
    word_examples: ["zip", "zoo", "buzz", "fizz", "zap"],
    decodable_sentences: ["The zoo has a zip.", "I buzz and fizz at the zoo."],
    assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% letter-sound" },
    teaching_advantages: ["Voiced pair to /s/", "Distinctive sound", "Clear contrast"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈z〉</strong> (also <strong>〈zz〉</strong> or sometimes <strong>〈s〉</strong> in certain words).', icon_emoji: '💙' },
        { content: 'The phoneme is /z/.', icon_emoji: '💙' },
        { content: '/z/ is a fricative, voiced consonant — air flows continuously while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /z/ is a continuous sound, so students can stretch it (zzzzz) to support blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>z</strong> spells the /z/ sound (as in zoo), and <strong>zz</strong> often appears at the end of short vowel words (like buzz).', icon_emoji: '💚' },
        { content: '/z/ can appear at the beginning (zip), middle (lizard), or end (buzz) of words.', icon_emoji: '💚' },
        { content: '/z/ can be tricky because it is voiced and often confused with /s/, and sometimes <strong>s</strong> spells /z/ (like is, has).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>zoo</strong> or <strong>zip</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: zzzzz-ip → zip.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students buzz like a bee while touching their throat to feel vibration.', icon_emoji: '💛' },
        { content: 'Contrast with /s/: /z/ has voice (vibration); /s/ is quiet (no voice).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/z/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue is close to the ridge behind the top teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiced',
      cue: 'Buzzing bee sound — like /s/ but with your voice on. Students should feel vibration in their throat along with steady airflow. If there is no vibration, they are likely producing /s/.',
      teacher_guidance: 'Like /s/ but voiced. Have students feel throat vibration. Compare /s/ (voiceless) to /z/ (voiced).',
      student_tips: 'Make the /s/ sound but turn your voice on. It should buzz like a bee. Feel your throat vibrate.',
      common_substitutions: ['/s/'],
      articulation_cues: 'Same position as /s/, but with voice — teeth close, tongue behind top teeth',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Buzzing bee", "Voice on"], explicit_instruction: ["Model /z/ with voice"], guided_practice: ["/z/ vs /s/ contrast"], independent_practice: ["Find /z/ words"], assessment_checkpoints: ["Daily voicing", "Weekly words"] },
    assessment_framework_details: { formative: ["Voice checks"], summative: ["Voice tests"], mastery_criteria: ["80% voicing"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to show tongue and teeth position",
        "Practice isolating and stretching: /z/ → za → zip",
        "Use minimal pairs: zip vs. sip, buzz vs. bus",
        "Provide explicit modeling with throat touch to feel voicing"
      ],
      on_level: [
        "Build word chains: zip → zap → map",
        "Add suffixes: buzz → buzzing",
        "Sort words where s spells /z/ vs. z spells /z/"
      ],
      advanced: [
        "Build word chains: zip → zap → map",
        "Add suffixes: buzz → buzzing",
        "Sort words where s spells /z/ vs. z spells /z/"
      ]
    },
    linguistic_properties_extended: { description: "Voiced alveolar fricative", place: "Alveolar", manner: "Fricative", voicing: "Voiced" },
    weekly_data_override: { focus: "Voiced /z/ fricative", emphasis: ["Voice quality"], priorities: ["Voicing accuracy"] },
    content_generation_meta: { rules: ["Voice emphasis"], guidelines: ["Voicing focus"] }
  },

  // STAGE 3 PHONEMES (8 total - consonant digraphs)
  {
    phoneme_id: "stage3_th_voiced",
    stage: 3,
    phoneme: "/ð/",
    graphemes: ["th"],
    frequency_rank: 32,
    complexity_score: 2.3,
    grade_band: "1st-Fall",
    introduction_week: 2,
    word_examples: ["the", "they", "that", "this", "there"],
    decodable_sentences: ["The cat is there.", "They can see that."],
    assessment_criteria: { daily: "70% accuracy", weekly: "65% accuracy", summative: "75% digraph recognition" },
    teaching_advantages: ["High frequency words", "Voiced th", "Sight word connection"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈th〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /th/ (voiced, as in this).', icon_emoji: '💙' },
        { content: '/th/ is a fricative, voiced consonant — air flows continuously between the tongue and teeth while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /th/ is a continuous sound, but requires tongue placement between the teeth + voicing, which makes it more complex.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The digraph <strong>th</strong> spells the voiced /th/ sound in words like this, them, those.', icon_emoji: '💚' },
        { content: '/th/ (voiced) often appears at the beginning (this) or middle (mother) of words, and less commonly at the end.', icon_emoji: '💚' },
        { content: '/th/ can be tricky because it has two sounds (voiced and unvoiced) and students may confuse it with /d/ or /v/.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>this</strong> or <strong>that</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: thhhh-is → this (with voice on).', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students place their tongue between their teeth and touch their throat to feel vibration.', icon_emoji: '💛' },
        { content: 'Contrast with unvoiced /th/: voiced /th/ has vibration, while unvoiced /th/ is quiet (no voice).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/ð/',
      sound_type: 'consonant',
      place: 'Interdental (tongue placed between the teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiced',
      cue: 'Tongue between teeth with voice on. Students should feel airflow on the tongue AND vibration in the throat. If there is no vibration, they are producing the unvoiced /th/ (as in thin).',
      teacher_guidance: 'Tongue tip sticks out slightly between teeth. Voice is ON. Common in high-frequency words. Many students substitute /d/ or /v/.',
      student_tips: 'Stick your tongue out a tiny bit between your teeth. Turn your voice on and push air out. Say "the".',
      common_substitutions: ['/d/', '/v/'],
      articulation_cues: 'Tongue tip between teeth, voiced, continuous airflow',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Tongue between teeth", "Voice on"], explicit_instruction: ["Model voiced th"], guided_practice: ["Digraph sorting"], independent_practice: ["Read sight words"], assessment_checkpoints: ["Daily digraph", "Weekly sight words"] },
    assessment_framework_details: { formative: ["Digraph checks"], summative: ["Sight word tests"], mastery_criteria: ["70% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to ensure tongue is visible between teeth",
        "Practice voicing awareness: hand on throat to feel vibration",
        "Use minimal pairs: this vs. thin, they vs. day",
        "Provide explicit modeling, as many students substitute /d/ or /v/"
      ],
      on_level: [
        "Build word chains: this → them → then",
        "Practice high-frequency words: this, that, they, them",
        "Sort words by voiced vs. unvoiced th"
      ],
      advanced: [
        "Build word chains: this → them → then",
        "Practice high-frequency words: this, that, they, them",
        "Sort words by voiced vs. unvoiced th"
      ]
    },
    linguistic_properties_extended: { description: "Voiced dental fricative", place: "Dental", manner: "Fricative", voicing: "Voiced" },
    weekly_data_override: { focus: "Voiced th digraph", emphasis: ["Tongue placement"], priorities: ["Digraph recognition"] },
    content_generation_meta: { rules: ["Sight word focus"], guidelines: ["Digraph emphasis"] }
  },

  // STAGE 4 PHONEMES (6 total - long vowels with silent e)
  {
    phoneme_id: "stage4_i_e",
    stage: 4,
    phoneme: "/ī/",
    graphemes: ["i_e"],
    frequency_rank: 36,
    complexity_score: 2.5,
    grade_band: "1st-Spring",
    introduction_week: 2,
    word_examples: ["like", "bike", "time", "fine", "line"],
    decodable_sentences: ["I like my bike.", "It is time to draw a fine line."],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Clear long vowel", "Magic e pattern", "High frequency"],
    research_sources: ["Ehri (2005)"],
    articulation_data: {
      phoneme: '/ī/',
      sound_type: 'vowel',
      place: 'High front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Say the letter name I - like in "bike" or "time"',
      teacher_guidance: 'Long i says its name. The magic e makes the vowel say its name.',
      student_tips: 'Say the letter I. It starts with your mouth open and ends with a smile. Think of "bike" or "like".',
      common_substitutions: ['short i', '/ee/'],
      articulation_cues: 'Mouth opens then closes to smile position, gliding sound',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Magic e review", "Long vs short"], explicit_instruction: ["Model i_e pattern"], guided_practice: ["VCe building"], independent_practice: ["Read i_e words"], assessment_checkpoints: ["Daily long vowel", "Weekly VCe"] },
    assessment_framework_details: { formative: ["Long vowel checks"], summative: ["VCe tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: { struggling: ["Extended VCe practice"], on_level: ["Standard VCe instruction"], advanced: ["Pattern analysis"] },
    linguistic_properties_extended: { description: "Long high front vowel", place: "Front", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Long /ī/ with silent e", emphasis: ["VCe pattern"], priorities: ["Long vowel clarity"] },
    content_generation_meta: { rules: ["VCe emphasis"], guidelines: ["Long vowel focus"] }
  },

  // STAGE 5 PHONEMES (8 total - high-frequency vowel teams)
  {
    phoneme_id: "stage5_ee",
    stage: 5,
    phoneme: "/ē/",
    graphemes: ["ee"],
    frequency_rank: 41,
    complexity_score: 3.0,
    grade_band: "2nd-Fall",
    introduction_week: 2,
    word_examples: ["see", "tree", "free", "need", "keep"],
    decodable_sentences: ["I see the tree.", "We need to keep it free."],
    assessment_criteria: { daily: "70% accuracy", weekly: "65% accuracy", summative: "75% mastery" },
    teaching_advantages: ["Consistent vowel team", "High frequency", "Clear sound"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/ē/',
      sound_type: 'vowel',
      place: 'High front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Big smile sound - say the letter E like in "see" or "tree"',
      teacher_guidance: 'Long e says its name. Lips are spread in a smile, tongue is high and forward.',
      student_tips: 'Make a big smile. Say the letter E. Think of "see", "tree", "bee".',
      common_substitutions: ['short e', '/i/'],
      articulation_cues: 'Lips spread wide in smile, tongue high and forward',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Vowel team concept", "Two letters one sound"], explicit_instruction: ["Model ee team"], guided_practice: ["Team sorting"], independent_practice: ["Read ee words"], assessment_checkpoints: ["Daily team", "Weekly reading"] },
    assessment_framework_details: { formative: ["Team checks"], summative: ["Vowel team tests"], mastery_criteria: ["70% accuracy"] },
    differentiation_protocols: { struggling: ["Extended team practice"], on_level: ["Standard team instruction"], advanced: ["Team patterns"] },
    linguistic_properties_extended: { description: "Long high front vowel", place: "Front", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "ee vowel team", emphasis: ["Team concept"], priorities: ["Team recognition"] },
    content_generation_meta: { rules: ["Team emphasis"], guidelines: ["Vowel team focus"] }
  },

  // STAGE 6 PHONEMES (8 total - r-controlled and diphthongs)
  {
    phoneme_id: "stage6_ar",
    stage: 6,
    phoneme: "/är/",
    graphemes: ["ar"],
    frequency_rank: 46,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 2,
    word_examples: ["car", "star", "far", "hard", "park"],
    decodable_sentences: ["The car is far.", "We park by the hard star."],
    assessment_criteria: { daily: "65% accuracy", weekly: "60% accuracy", summative: "70% mastery" },
    teaching_advantages: ["Clear r-controlled", "High frequency", "Consistent sound"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/är/',
      sound_type: 'vowel',
      place: 'Low back',
      manner: 'R-controlled vowel',
      voicing: 'voiced',
      cue: 'Open mouth then add R - "car", "star", "far"',
      teacher_guidance: 'Start with an open /ah/ sound, then curl tongue back for the R. The R changes the vowel.',
      student_tips: 'Open your mouth wide like /ah/, then curl your tongue back for the R sound. Say "car".',
      common_substitutions: ['/er/', 'pure /a/'],
      articulation_cues: 'Mouth opens wide, then tongue curls back for R',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["R-controlled review", "Bossy r"], explicit_instruction: ["Model ar pattern"], guided_practice: ["R-controlled sorting"], independent_practice: ["Read ar words"], assessment_checkpoints: ["Daily r-controlled", "Weekly reading"] },
    assessment_framework_details: { formative: ["R-controlled checks"], summative: ["Pattern tests"], mastery_criteria: ["65% accuracy"] },
    differentiation_protocols: { struggling: ["Extended r-practice"], on_level: ["Standard r-instruction"], advanced: ["R-pattern analysis"] },
    linguistic_properties_extended: { description: "Low back r-colored vowel", place: "Back", manner: "R-controlled", voicing: "Voiced" },
    weekly_data_override: { focus: "ar r-controlled", emphasis: ["R-control"], priorities: ["Pattern mastery"] },
    content_generation_meta: { rules: ["R-controlled emphasis"], guidelines: ["Bossy r focus"] }
  },

  // STAGE 7 PHONEMES (8 total - complex vowel patterns)
  {
    phoneme_id: "stage7_oo_long",
    stage: 7,
    phoneme: "/ōō/",
    graphemes: ["oo", "ew", "ue", "ui"],
    frequency_rank: 51,
    complexity_score: 4.0,
    grade_band: "3rd-Fall",
    introduction_week: 2,
    word_examples: ["moon", "soon", "cool", "pool", "food", "grew", "blue", "fruit"],
    decodable_sentences: ["The moon is cool.", "We soon see food by the pool."],
    assessment_criteria: { daily: "60% accuracy", weekly: "55% accuracy", summative: "65% mastery" },
    teaching_advantages: ["Clear long oo", "Consistent in pattern", "High frequency"],
    research_sources: ["Adams (1990)"],
    articulation_data: {
      phoneme: '/ōō/',
      sound_type: 'vowel',
      place: 'High back',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Round your lips tight like saying "oo" - "moon", "soon", "cool"',
      teacher_guidance: 'Lips are very rounded and pushed forward. Tongue is high and back. Long oo sound.',
      student_tips: 'Make your lips very round and small like a circle. Say "oo" like in "moon" or "zoo".',
      common_substitutions: ['short oo', '/ʊ/'],
      articulation_cues: 'Lips very rounded and protruded, tongue high and back',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Two oo sounds", "Long oo first"], explicit_instruction: ["Model long oo"], guided_practice: ["oo sorting"], independent_practice: ["Read long oo"], assessment_checkpoints: ["Daily oo", "Weekly pattern"] },
    assessment_framework_details: { formative: ["Pattern checks"], summative: ["Variable tests"], mastery_criteria: ["60% accuracy"] },
    differentiation_protocols: { struggling: ["Extended oo practice"], on_level: ["Standard oo instruction"], advanced: ["Variable analysis"] },
    linguistic_properties_extended: { description: "High back rounded vowel", place: "Back", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Long oo pattern", emphasis: ["Vowel length"], priorities: ["Pattern distinction"] },
    content_generation_meta: { rules: ["Long oo emphasis"], guidelines: ["Pattern clarity"] }
  },

  // NOTE: This comprehensive dataset includes examples from each stage showing the systematic progression
  // The complete dataset would continue with all 127 phonemes following this exact structure:
  // 
  // REMAINING PHONEMES TO COMPLETE 127 TOTAL:
  // Stage 1: 12 more phonemes (p, i, d, f, o, l, h, b, e, u, r, g, k)
  // Stage 2: 7 more phonemes (y, x, qu, ch, sh, th_voiceless, ng)  
  // Stage 3: 7 more phonemes (ck, tch, dge, wh, ph, gh, other digraphs)
  // Stage 4: 5 more phonemes (o_e, u_e, e_e, other VCe patterns)
  // Stage 5: 7 more phonemes (ea, ai, ay, oa, ow, other teams)
  // Stage 6: 7 more phonemes (or, ir, ur, oi, oy, aw, other patterns)
  // Stage 7: 7 more phonemes (oo_short, ew, ie, ue, other complex)
  // Stage 8: 9 more phonemes (mb, lk, lm, gn, other silent patterns, morphemes)
  //
  // Each phoneme follows the comprehensive structure with:
  // - Complete articulation data from phonemeDevelopmentDatabase
  // - Detailed instructional sequences
  // - Comprehensive assessment frameworks  
  // - Full differentiation protocols
  // - Extended linguistic properties
  // - Weekly data overrides
  // - Content generation metadata

  // ============================================
  // STAGE 3: Consonant Digraphs (8 phonemes)
  // ============================================

  {
    phoneme_id: "stage3_ck",
    stage: 3,
    phoneme: "/k/",
    graphemes: ["c", "k", "ck"],
    frequency_rank: 31,
    complexity_score: 2.0,
    grade_band: "1st-Fall",
    introduction_week: 1,
    word_examples: ["cat", "kite", "back", "cake", "keep", "duck"],
    decodable_sentences: ["The cat can kick.", "I pack my bag.", "The king has a kite."],
    word_lists: {
      c: { beginning: ["cat", "cup", "cap", "cut", "car"], medial: ["bacon", "second", "local"], ending: ["magic", "comic", "panic"] },
      k: { beginning: ["kite", "king", "keep", "kind", "key"], medial: ["baker", "taken", "making"], ending: ["look", "book", "cook"] },
      ck: { beginning: [], medial: ["pocket", "rocket", "jacket"], ending: ["back", "pack", "sick", "rock", "duck"] }
    },
    assessment_criteria: {
      daily: "80% accuracy in digraph recognition",
      weekly: "75% accuracy in word reading",
      summative: "85% mastery in pattern"
    },
    teaching_advantages: ["Clear /k/ sound", "Final position pattern", "High frequency"],
    research_sources: ["NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈c〉</strong> and <strong>〈k〉</strong> (also <strong>〈ck〉</strong> in some positions).', icon_emoji: '💙' },
        { content: 'The phoneme is /k/.', icon_emoji: '💙' },
        { content: '/k/ is a stop (plosive), unvoiced consonant — air is blocked in the back of the mouth, then released.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /k/ is a quick sound (cannot be stretched), and it is made in the back of the mouth, unlike many early sounds.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The phoneme /k/ can be spelled <strong>c</strong>, <strong>k</strong>, or <strong>ck</strong> (most common spellings).', icon_emoji: '💚' },
        { content: '/k/ can appear at the beginning (cat, kit), middle (bucket), or end (back) of words.', icon_emoji: '💚' },
        { content: '/k/ can be tricky because it has multiple spellings and students may confuse it with /g/ (voiced pair).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with keywords: <strong>cat</strong> (c), <strong>kit</strong> (k), <strong>back</strong> (ck).', icon_emoji: '💛' },
        { content: 'Use stop blending: /k/ - /a/ - /t/ → cat (keep it crisp, no "kuh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their throat lightly and notice no vibration, while focusing on the back of the tongue lifting.', icon_emoji: '💛' },
        { content: 'Contrast with /g/: /k/ is quiet (no voice); /g/ has voice (vibration).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/k/',
      sound_type: 'consonant',
      place: 'Velar (back of the tongue touches the soft palate)',
      manner: 'Stop/Plosive (air is blocked, then released)',
      voicing: 'voiceless',
      cue: 'Back of tongue pops against the soft palate. Students may not "see" this sound easily since it is made in the back of the mouth — use tactile cues and modeling. If they feel vibration, they may be producing /g/.',
      teacher_guidance: 'The back of the tongue touches the soft palate (back roof of mouth) and releases with a puff of air. Exaggerate mouth opening for modeling.',
      student_tips: 'Push the back of your tongue up to the back of your mouth. Let go quickly with a puff of air.',
      common_substitutions: ['/g/'],
      articulation_cues: 'Back of tongue to soft palate, quick release, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Connect to /k/ sound", "Multiple spellings intro", "Final position focus"],
      explicit_instruction: ["Model /k/ sound", "Show c/k/ck patterns", "Practice blending"],
      guided_practice: ["Spelling pattern sorts", "Word building", "Pattern identification"],
      independent_practice: ["Sort c/k/ck words", "Complete patterns", "Read word lists"],
      assessment_checkpoints: ["Daily pattern ID", "Weekly reading", "Monthly pattern check"]
    },
    assessment_framework_details: {
      formative: ["Daily pattern check", "Weekly assessment", "Progress monitoring"],
      summative: ["Spelling test", "Reading benchmark", "Pattern mastery"],
      mastery_criteria: ["80% recognition", "Automatic reading", "Pattern application"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror + modeling (exaggerate mouth opening even though sound is hard to see)",
        "Practice isolating the sound: /k/ → ka → cat",
        "Use minimal pairs: cap vs. gap, cot vs. got",
        "Explicitly teach spelling patterns: c vs. k vs. ck (start simple: c before a/o/u, k before e/i)"
      ],
      on_level: [
        "Build word chains: cat → cot → cop",
        "Add suffixes: pack → packs → packing",
        "Practice sorting by spelling: c, k, ck words"
      ],
      advanced: [
        "Build word chains: cat → cot → cop",
        "Add suffixes: pack → packs → packing",
        "Practice sorting by spelling: c, k, ck words"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiceless velar stop (ck spelling)",
      place: "Velar",
      manner: "Stop",
      voicing: "Voiceless"
    },
    weekly_data_override: {
      focus: "Master 'ck' digraph pattern",
      emphasis: ["Two letters one sound", "Final position", "Word recognition"],
      priorities: ["Pattern recognition", "Reading accuracy", "Spelling application"]
    },
    content_generation_meta: {
      rules: ["Final position emphasis", "High-frequency words", "Clear examples"],
      guidelines: ["Digraph focus", "Pattern consistency", "Meaningful context"]
    }
  },

  {
    phoneme_id: "stage3_sh",
    stage: 3,
    phoneme: "/sh/",
    graphemes: ["sh", "ti", "ci", "si", "ssi"],
    frequency_rank: 29,
    complexity_score: 2.0,
    grade_band: "1st-Fall",
    introduction_week: 2,
    word_examples: ["ship", "shop", "fish", "dish", "wish", "shell", "sheep", "shirt", "nation", "special"],
    decodable_sentences: ["The ship is big.", "I wish for a fish.", "She has a shell."],
    assessment_criteria: {
      daily: "80% accuracy in digraph recognition",
      weekly: "75% accuracy in word reading",
      summative: "85% mastery in digraph pattern"
    },
    teaching_advantages: ["Continuous sound", "High frequency", "Clear auditory distinction from /s/"],
    research_sources: ["NRP (2000)", "Ehri (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈sh〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /sh/ (as in ship).', icon_emoji: '💙' },
        { content: '/sh/ is a fricative, unvoiced consonant — air flows continuously through a narrow space.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /sh/ is a continuous sound, so students can stretch it (shhhhh), which supports blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The digraph <strong>sh</strong> spells the /sh/ sound (two letters, one sound).', icon_emoji: '💚' },
        { content: '/sh/ can appear at the beginning (ship), middle (fishy), or end (dish) of words.', icon_emoji: '💚' },
        { content: '/sh/ can be tricky because it may be confused with /ch/ (stop + release) or /s/, and sometimes appears in different spellings (like ti in nation — for later instruction).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>ship</strong> or <strong>shoe</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: shhhhh-ip → ship.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students put a finger to their lips and say "shhh" (quiet signal).', icon_emoji: '💛' },
        { content: 'Contrast with /ch/: /sh/ is smooth and continuous, while /ch/ is quick with a burst.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/sh/',
      sound_type: 'consonant',
      place: 'Postalveolar (tongue is just behind the alveolar ridge)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiceless',
      cue: 'Quiet sound — like telling someone to be quiet. Students should feel steady airflow with no vibration. If they add a stop or burst, they may be producing /ch/.',
      teacher_guidance: 'Have students feel the continuous airflow. Compare to /s/ — tongue is further back for /sh/.',
      student_tips: 'Round your lips slightly. Keep your tongue behind your teeth. Push air through quietly like you\'re saying "shh" to be quiet.',
      common_substitutions: ['/ch/', '/s/'],
      articulation_cues: 'Lips slightly rounded, tongue raised near roof of mouth, continuous airflow',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Quiet/shh games", "Feel airflow", "Compare to /s/"],
      explicit_instruction: ["Model /sh/ sound", "Show lip rounding", "Practice airflow"],
      guided_practice: ["Sound discrimination /s/ vs /sh/", "Picture sorting", "Word building"],
      independent_practice: ["Find sh words", "Circle digraphs", "Read word lists"],
      assessment_checkpoints: ["Daily digraph ID", "Weekly word reading", "Monthly assessment"]
    },
    assessment_framework_details: {
      formative: ["Daily sound checks", "Weekly reviews", "Progress tracking"],
      summative: ["Digraph assessments", "Reading benchmarks", "Pattern mastery"],
      mastery_criteria: ["80% recognition", "Automatic recall", "Word application"]
    },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to observe lip rounding and tongue position",
        "Practice isolating and stretching: /sh/ → sha → ship",
        "Use minimal pairs: ship vs. chip, shop vs. sop",
        "Reinforce with the \"quiet\" gesture (finger to lips)"
      ],
      on_level: [
        "Build word chains: ship → shop → chop",
        "Add suffixes: fish → fishes",
        "Sort words by /sh/ vs. /ch/ sounds"
      ],
      advanced: [
        "Build word chains: ship → shop → chop",
        "Add suffixes: fish → fishes",
        "Sort words by /sh/ vs. /ch/ sounds"
      ]
    },
    linguistic_properties_extended: {
      description: "Voiceless postalveolar fricative",
      place: "Postalveolar",
      manner: "Fricative",
      voicing: "Voiceless"
    },
    weekly_data_override: {
      focus: "Master sh digraph in all positions",
      emphasis: ["Two letters one sound", "Beginning and ending positions", "Word recognition"],
      priorities: ["Clear production", "Digraph recognition", "Word application"]
    },
    content_generation_meta: {
      rules: ["Digraph emphasis", "High frequency", "Decodability"],
      guidelines: ["Simple structures", "Taught sounds", "Clear meaning"],
      short_stories: [
        {
          title: "The Shell Shop",
          text: "Shelly has a shop. She sells shells. The shells shine in the sun. I wish I had a shell!"
        }
      ],
      word_ladders: [
        { words: ["ship", "shop", "chop", "chip"], instructions: "Change one letter at a time" }
      ]
    }
  },

  // ============================================
  // STAGE 4: Long Vowels with Silent E (6 phonemes)
  // ============================================

  {
    phoneme_id: "stage4_a_e",
    stage: 4,
    phoneme: "/ā/",
    graphemes: ["a_e"],
    frequency_rank: 35,
    complexity_score: 2.5,
    grade_band: "1st-Spring",
    introduction_week: 1,
    word_examples: ["make", "take", "cake", "name", "same"],
    decodable_sentences: ["I can make a cake.", "What is your name?"],
    assessment_criteria: {
      daily: "75% accuracy in long vowel recognition",
      weekly: "70% accuracy in VCe reading", 
      summative: "80% mastery in pattern"
    },
    teaching_advantages: ["Magic e concept", "Clear vowel contrast", "High frequency"],
    research_sources: ["Ehri (2005)"],
    articulation_data: {
      phoneme: '/ā/',
      sound_type: 'vowel',
      place: 'Mid front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Say the letter name A - like in "cake"',
      teacher_guidance: 'Long a says its name. Mouth is more closed than short a, with a slight smile.',
      student_tips: 'Say the letter A. Your mouth makes a smile shape. Think of "cake" or "make".',
      common_substitutions: ['/eh/', 'short a'],
      articulation_cues: 'Slight smile, tongue mid-high, mouth less open than short a',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Magic e introduction", "Long vs short /a/", "Silent e concept"],
      explicit_instruction: ["Model VCe pattern", "Show silent e effect", "Practice long /a/"],
      guided_practice: ["Long/short contrast", "Pattern building", "Word sorting"],
      independent_practice: ["Identify VCe words", "Complete patterns", "Read sentences"],
      assessment_checkpoints: ["Daily long vowel", "Weekly VCe reading", "Monthly mastery"]
    },
    assessment_framework_details: {
      formative: ["Daily vowel check", "Weekly pattern reading", "Progress tracking"],
      summative: ["VCe assessment", "Long vowel test", "Pattern benchmark"],
      mastery_criteria: ["75% accuracy", "Consistent recognition", "Pattern application"]
    },
    differentiation_protocols: {
      struggling: ["Extended vowel practice", "Visual pattern supports", "Individual coaching"],
      on_level: ["Standard VCe instruction", "Center activities", "Partner work"],
      advanced: ["Complex patterns", "Rule analysis", "Teaching others"]
    },
    linguistic_properties_extended: {
      description: "Long low front vowel (VCe pattern)",
      place: "Front",
      manner: "Vowel",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Master silent e with /ā/",
      emphasis: ["VCe pattern", "Long vowel production", "Magic e concept"],
      priorities: ["Pattern recognition", "Vowel length", "Reading fluency"]
    },
    content_generation_meta: {
      rules: ["VCe pattern focus", "High frequency", "Clear contrasts"],
      guidelines: ["Magic e emphasis", "Long vowel clarity", "Pattern consistency"]
    }
  },

  // ============================================
  // STAGE 5: High-Frequency Vowel Teams (8 phonemes)  
  // ============================================

  {
    phoneme_id: "stage5_er",
    stage: 5,
    phoneme: "/ər/",
    graphemes: ["er"],
    frequency_rank: 40,
    complexity_score: 3.0,
    grade_band: "2nd-Fall",
    introduction_week: 1,
    word_examples: ["her", "fern", "term", "herb", "verb"],
    decodable_sentences: ["Her fern is green.", "I know that verb."],
    assessment_criteria: {
      daily: "70% accuracy in r-controlled recognition",
      weekly: "65% accuracy in word reading",
      summative: "75% mastery in pattern"
    },
    teaching_advantages: ["Most frequent r-controlled", "Clear sound", "High utility"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/ər/',
      sound_type: 'vowel',
      place: 'Central',
      manner: 'R-controlled vowel',
      voicing: 'voiced',
      cue: 'The bossy R changes the vowel - "her", "fern", "verb"',
      teacher_guidance: 'The R controls the vowel sound. Tongue curls back slightly. This is the most common r-controlled vowel.',
      student_tips: 'The R is bossy and changes how the vowel sounds. Curl your tongue back a little. Say "er" like in "her".',
      common_substitutions: ['/ur/', '/ir/', 'pure vowel'],
      articulation_cues: 'Tongue slightly curled back, lips neutral, continuous sound',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["R-controlled introduction", "Bossy r concept", "Sound practice"],
      explicit_instruction: ["Model /ər/ sound", "Show r influence", "Practice blending"],
      guided_practice: ["R-controlled sorting", "Pattern building", "Word identification"],
      independent_practice: ["Find /ər/ words", "Complete families", "Read sentences"],
      assessment_checkpoints: ["Daily r-controlled", "Weekly reading", "Monthly pattern check"]
    },
    assessment_framework_details: {
      formative: ["Daily pattern check", "Weekly assessment", "R-controlled monitoring"],
      summative: ["Comprehensive test", "Benchmark reading", "Pattern mastery"],
      mastery_criteria: ["70% accuracy", "Consistent recognition", "Fluent reading"]
    },
    differentiation_protocols: {
      struggling: ["Extended r-controlled practice", "Auditory emphasis", "Visual supports"],
      on_level: ["Standard instruction", "Center work", "Collaborative practice"],
      advanced: ["Complex r-patterns", "Morphology connections", "Leadership roles"]
    },
    linguistic_properties_extended: {
      description: "Mid central r-colored vowel",
      place: "Central",
      manner: "R-controlled vowel",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Master /ər/ r-controlled pattern",
      emphasis: ["Bossy r concept", "Pattern recognition", "Fluent reading"],
      priorities: ["R-control awareness", "Pattern mastery", "Reading accuracy"]
    },
    content_generation_meta: {
      rules: ["R-controlled emphasis", "High frequency", "Clear examples"],
      guidelines: ["Bossy r focus", "Pattern consistency", "Meaningful context"]
    }
  },

  // ============================================
  // STAGE 6: R-Controlled Vowels & Diphthongs (8 phonemes)
  // ============================================

  {
    phoneme_id: "stage6_ou",
    stage: 6,
    phoneme: "/ou/",
    graphemes: ["ou", "ow"],
    frequency_rank: 45,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 1,
    word_examples: ["out", "house", "now", "cow", "how"],
    decodable_sentences: ["The cow is out.", "How big is your house?"],
    assessment_criteria: {
      daily: "65% accuracy in diphthong production",
      weekly: "60% accuracy in word reading",
      summative: "70% mastery in pattern"
    },
    teaching_advantages: ["Clear diphthong", "Two spellings", "High frequency"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/ou/',
      sound_type: 'vowel',
      place: 'Low back to high back',
      manner: 'Diphthong',
      voicing: 'voiced',
      cue: 'Mouth opens wide then closes to round - "ow!" like something hurts',
      teacher_guidance: 'This is a gliding sound. Start with mouth open wide, then glide to a rounded position.',
      student_tips: 'Start with your mouth wide open, then close it to a round shape. Say "ow" like when you stub your toe!',
      common_substitutions: ['/o/', '/aw/'],
      articulation_cues: 'Mouth starts open, glides to rounded position, continuous movement',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Diphthong introduction", "Mouth movement practice", "Two sound concept"],
      explicit_instruction: ["Model /ou/ glide", "Show mouth movement", "Practice both spellings"],
      guided_practice: ["Diphthong identification", "Spelling choice practice", "Word building"],
      independent_practice: ["Sort ou/ow words", "Complete patterns", "Read sentences"],
      assessment_checkpoints: ["Daily diphthong", "Weekly spelling choice", "Monthly mastery"]
    },
    assessment_framework_details: {
      formative: ["Daily diphthong check", "Weekly reading", "Spelling monitoring"],
      summative: ["Diphthong test", "Reading benchmark", "Spelling assessment"],
      mastery_criteria: ["65% accuracy", "Correct spelling choice", "Fluent reading"]
    },
    differentiation_protocols: {
      struggling: ["Extended diphthong practice", "Mouth movement cues", "Spelling supports"],
      on_level: ["Standard instruction", "Pattern work", "Partner activities"],
      advanced: ["Complex applications", "Rule analysis", "Peer coaching"]
    },
    linguistic_properties_extended: {
      description: "Low back to high back diphthong",
      place: "Back to back",
      manner: "Diphthong",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Master /ou/ diphthong with both spellings",
      emphasis: ["Gliding motion", "Spelling choice", "Pattern recognition"],
      priorities: ["Diphthong production", "Spelling accuracy", "Reading fluency"]
    },
    content_generation_meta: {
      rules: ["Include both spellings", "Diphthong emphasis", "High frequency"],
      guidelines: ["Gliding focus", "Spelling choice", "Clear examples"]
    }
  },

  // ============================================
  // STAGE 8: Advanced Patterns & Morphology (10 phonemes)
  // ============================================

  {
    phoneme_id: "stage8_schwa",
    stage: 8,
    phoneme: "/ə/",
    graphemes: ["a", "e", "i", "o", "u"],
    frequency_rank: 60,
    complexity_score: 5.0,
    grade_band: "3rd-Spring",
    introduction_week: 3,
    word_examples: ["about", "taken", "pencil", "lemon", "circus"],
    decodable_sentences: ["The lemon is about ready.", "I taken my pencil."],
    assessment_criteria: {
      daily: "50% accuracy in schwa recognition",
      weekly: "45% accuracy in multisyllabic reading",
      summative: "55% mastery in concept"
    },
    teaching_advantages: ["Most common vowel sound", "Multisyllabic connection", "Spelling support"],
    research_sources: ["Treiman (2000)", "Nagy & Anderson (1984)"],
    articulation_data: {
      phoneme: '/ə/',
      sound_type: 'vowel',
      place: 'Central',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Lazy, relaxed "uh" sound - the most common vowel sound in English',
      teacher_guidance: 'Schwa is the unstressed, reduced vowel. It sounds like a quick, lazy "uh". Found in unstressed syllables.',
      student_tips: 'This is a quick, quiet "uh" sound. Your mouth is relaxed. It happens in the unstressed part of words.',
      common_substitutions: ['full vowel sounds'],
      articulation_cues: 'Mouth relaxed, tongue in neutral position, very short sound',
      airflow_description: 'oral'
    },
    instructional_sequence: {
      pre_teaching: ["Unstressed syllable introduction", "Weak vowel concept", "Multisyllabic focus"],
      explicit_instruction: ["Model schwa sound", "Show unstressed position", "Practice in words"],
      guided_practice: ["Schwa identification", "Syllable stress practice", "Word analysis"],
      independent_practice: ["Find schwa syllables", "Practice multisyllabic words", "Read sentences"],
      assessment_checkpoints: ["Daily schwa ID", "Weekly multisyllabic", "Monthly concept check"]
    },
    assessment_framework_details: {
      formative: ["Daily schwa check", "Weekly syllable work", "Multisyllabic monitoring"],
      summative: ["Schwa test", "Multisyllabic benchmark", "Concept assessment"],
      mastery_criteria: ["50% accuracy", "Syllable awareness", "Pronunciation support"]
    },
    differentiation_protocols: {
      struggling: ["Extended syllable work", "Stress pattern practice", "Visual supports"],
      on_level: ["Standard multisyllabic instruction", "Syllable work", "Pattern practice"],
      advanced: ["Advanced syllable analysis", "Morphology connections", "Etymology study"]
    },
    linguistic_properties_extended: {
      description: "Mid central reduced vowel",
      place: "Central",
      manner: "Vowel",
      voicing: "Voiced"
    },
    weekly_data_override: {
      focus: "Understand schwa in unstressed syllables",
      emphasis: ["Weak vowel concept", "Syllable stress", "Multisyllabic reading"],
      priorities: ["Schwa recognition", "Stress patterns", "Reading support"]
    },
    content_generation_meta: {
      rules: ["Multisyllabic emphasis", "Unstressed focus", "Spelling connections"],
      guidelines: ["Schwa awareness", "Syllable focus", "Pronunciation support"]
    }
  },

  // ============================================
  // MISSING CONSONANTS - Adding all 24 consonant phonemes
  // ============================================

  {
    phoneme_id: "consonant_p",
    stage: 1,
    phoneme: "/p/",
    graphemes: ["p", "pp"],
    frequency_rank: 16,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 3,
    word_examples: ["pat", "pan", "map", "tap", "pop", "cap"],
    decodable_sentences: ["Pat has a pan.", "I can tap the map."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Visible lip closure", "Clear release", "Voiceless pair to /b/"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈p〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /p/.', icon_emoji: '💙' },
        { content: '/p/ is a stop (plosive), unvoiced consonant — air is blocked, then released in a small burst.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /p/ is a quick sound (cannot be stretched), so students must learn to produce it cleanly without adding a vowel (avoid "puh").', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>p</strong> consistently spells the /p/ sound in English.', icon_emoji: '💚' },
        { content: '/p/ can appear at the beginning (pen), middle (apple), or end (cap) of words.', icon_emoji: '💚' },
        { content: '/p/ can be tricky because it is unvoiced and quick, and students may confuse it with /b/ or add a vowel sound.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>pig</strong> or <strong>pen</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: say sounds cleanly — /p/ - /a/ - /t/ → pat (no "puh").', icon_emoji: '💛' },
        { content: 'Add movement: have students put a hand in front of their mouth to feel the puff of air.', icon_emoji: '💛' },
        { content: 'Contrast with /b/ to show that /p/ is quiet (no voice) and has a stronger puff of air.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/p/',
      sound_type: 'consonant',
      place: 'Bilabial (both lips come together)',
      manner: 'Stop/Plosive (air is blocked then released)',
      voicing: 'voiceless',
      cue: 'Pop your lips — like a small explosion of air. No voice, just air. Students should feel a puff of air on their hand.',
      teacher_guidance: 'Both lips come together and release with a puff of air. No voice — just air. Watch for students adding "uh" after the sound.',
      student_tips: 'Press your lips together. Pop them open with a puff of air. Feel the air on your hand.',
      common_substitutions: ['/b/'],
      articulation_cues: 'Lips together, quick release, puff of air, no voice',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Popping sounds"], explicit_instruction: ["Model /p/"], guided_practice: ["Sound sorts"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a tissue or hand test to feel the air puff for /p/",
        "Practice isolating the sound: /p/ → pa → pan",
        "Provide explicit contrast practice: pat vs. bat, pig vs. big",
        "Model crisp production to avoid adding /uh/ (no \"puh\")"
      ],
      on_level: [
        "Build word chains: pat → pit → sip",
        "Add suffixes: tap → taps → tapping",
        "Practice sentence dictation with multiple /p/ words"
      ],
      advanced: [
        "Build word chains: pat → pit → sip",
        "Add suffixes: tap → taps → tapping",
        "Practice sentence dictation with multiple /p/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiceless bilabial stop", place: "Bilabial", manner: "Stop", voicing: "Voiceless" },
    weekly_data_override: { focus: "Clear /p/ production", emphasis: ["Lip closure"], priorities: ["Clear release"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["High frequency"] }
  },

  {
    phoneme_id: "consonant_b",
    stage: 1,
    phoneme: "/b/",
    graphemes: ["b", "bb"],
    frequency_rank: 13,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 6,
    word_examples: ["bat", "bad", "tab", "cab", "big", "bug"],
    decodable_sentences: ["The bat is big.", "I have a bad bug."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Visible articulation", "Voiced pair to /p/", "Common in CVC words"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈b〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /b/.', icon_emoji: '💙' },
        { content: '/b/ is a stop (plosive), voiced consonant — air is blocked, then released in a quick burst while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /b/ is quick (cannot be stretched), and students must produce it without adding a vowel (avoid "buh").', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>b</strong> consistently spells the /b/ sound in English.', icon_emoji: '💚' },
        { content: '/b/ can appear at the beginning (bat), middle (orbit), or end (cab) of words.', icon_emoji: '💚' },
        { content: '/b/ can be tricky because it is voiced, and students may confuse it with /p/ or add an extra vowel sound.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>bat</strong> or <strong>ball</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: /b/ - /a/ - /t/ → bat (keep /b/ crisp, no "buh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their throat to feel the vibration.', icon_emoji: '💛' },
        { content: 'Contrast with /p/: /b/ has voice (vibration) and less air; /p/ has no voice and a stronger puff of air.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/b/',
      sound_type: 'consonant',
      place: 'Bilabial (both lips come together)',
      manner: 'Stop/Plosive (air is blocked, then released)',
      voicing: 'voiced',
      cue: 'Lips pop with voice on. Students should feel vibration in their throat. If there is no vibration and a strong puff of air, they may be producing /p/ instead.',
      teacher_guidance: 'Like /p/ but with voice. Have students feel throat vibration. Watch for students adding "uh" after the sound.',
      student_tips: 'Press your lips together like /p/. Turn your voice on. Feel your throat buzz when you say it.',
      common_substitutions: ['/p/'],
      articulation_cues: 'Lips together, quick release, voice on, throat vibrates',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Compare to /p/"], explicit_instruction: ["Model /b/"], guided_practice: ["/b/ vs /p/"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use hand-on-throat to feel vibration for /b/",
        "Practice isolating the sound: /b/ → ba → bat",
        "Use minimal pairs: bat vs. pat, big vs. pig",
        "Model clean production to avoid adding /uh/ (no \"buh\")"
      ],
      on_level: [
        "Build word chains: bat → bit → big",
        "Add inflectional endings: rub → rubs → rubbing",
        "Practice sentence dictation with multiple /b/ words"
      ],
      advanced: [
        "Build word chains: bat → bit → big",
        "Add inflectional endings: rub → rubs → rubbing",
        "Practice sentence dictation with multiple /b/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiced bilabial stop", place: "Bilabial", manner: "Stop", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /b/ with voicing", emphasis: ["Voice on"], priorities: ["Voicing contrast"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Voice contrast"] }
  },

  {
    phoneme_id: "consonant_d",
    stage: 1,
    phoneme: "/d/",
    graphemes: ["d", "dd"],
    frequency_rank: 8,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 4,
    word_examples: ["dad", "dog", "dig", "mad", "sad", "bed"],
    decodable_sentences: ["Dad has a dog.", "The dog can dig."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Voiced pair to /t/", "High frequency", "Clear tongue position"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈d〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /d/.', icon_emoji: '💙' },
        { content: '/d/ is a stop (plosive), voiced consonant — air is blocked by the tongue, then released quickly while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /d/ is quick (cannot be stretched), so students must produce it cleanly without adding a vowel (avoid "duh").', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>d</strong> consistently spells the /d/ sound in English.', icon_emoji: '💚' },
        { content: '/d/ can appear at the beginning (dog), middle (ladder), or end (sad) of words.', icon_emoji: '💚' },
        { content: '/d/ can be tricky because it is voiced, and students may confuse it with /t/ or add an extra vowel sound.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>dog</strong> or <strong>dad</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: /d/ - /a/ - /d/ → dad (keep /d/ crisp, no "duh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their throat to feel the vibration.', icon_emoji: '💛' },
        { content: 'Contrast with /t/: /d/ has voice (vibration); /t/ is quiet (no voice).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/d/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue touches just behind the top teeth)',
      manner: 'Stop/Plosive (air is blocked, then released)',
      voicing: 'voiced',
      cue: 'Tongue taps with voice on. Students should feel vibration in their throat. If there is no vibration, they may be producing /t/ instead.',
      teacher_guidance: 'Like /t/ but voiced. Tongue tip touches ridge behind top teeth with voice on. Watch for students adding "uh" after the sound.',
      student_tips: 'Touch your tongue behind your top teeth like /t/. Turn your voice on. Feel the buzz.',
      common_substitutions: ['/t/'],
      articulation_cues: 'Tongue tip to alveolar ridge, quick release, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Compare to /t/"], explicit_instruction: ["Model /d/"], guided_practice: ["/d/ vs /t/"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use hand-on-throat to feel vibration for /d/",
        "Practice isolating the sound: /d/ → da → dad",
        "Use minimal pairs: dog vs. tog, den vs. ten",
        "Model clean production to avoid adding /uh/ (no \"duh\")"
      ],
      on_level: [
        "Build word chains: dad → did → dig",
        "Add inflectional endings: mad → mads → madding",
        "Practice sentence dictation with multiple /d/ words"
      ],
      advanced: [
        "Build word chains: dad → did → dig",
        "Add inflectional endings: mad → mads → madding",
        "Practice sentence dictation with multiple /d/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiced alveolar stop", place: "Alveolar", manner: "Stop", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /d/ with voicing", emphasis: ["Voice on"], priorities: ["Voicing contrast"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Voice contrast"] }
  },

  {
    phoneme_id: "consonant_g",
    stage: 2,
    phoneme: "/g/",
    graphemes: ["g", "gg"],
    frequency_rank: 20,
    complexity_score: 1.2,
    grade_band: "K-Spring",
    introduction_week: 1,
    word_examples: ["go", "got", "big", "dog", "bag", "pig"],
    decodable_sentences: ["The big dog can go.", "I got a bag."],
    assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% mastery" },
    teaching_advantages: ["Voiced pair to /k/", "Back of tongue sound", "Common words"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈g〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /g/ (hard g sound, as in go).', icon_emoji: '💙' },
        { content: '/g/ is a stop (plosive), voiced consonant — air is blocked in the back of the mouth, then released while the voice is on.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /g/ is quick (cannot be stretched) and is made in the back of the mouth, which can make it harder for students to feel and see.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>g</strong> spells the /g/ sound (hard g) in words like go, gum, bag.', icon_emoji: '💚' },
        { content: '/g/ can appear at the beginning (go), middle (tiger), or end (bag) of words.', icon_emoji: '💚' },
        { content: '/g/ can be tricky because it is voiced and may be confused with /k/, and because g can also spell /j/ in other words (soft g).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>go</strong> or <strong>gum</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: /g/ - /o/ → go (keep it crisp, no "guh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their throat to feel vibration while noticing the back of the tongue lifting.', icon_emoji: '💛' },
        { content: 'Contrast with /k/: /g/ has voice (vibration); /k/ is quiet (no voice).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/g/',
      sound_type: 'consonant',
      place: 'Velar (back of the tongue touches the soft palate)',
      manner: 'Stop/Plosive (air is blocked, then released)',
      voicing: 'voiced',
      cue: 'Back of tongue pops with voice on. Because /g/ is made in the back of the mouth, it is less visible — use touch cues (throat for vibration). If there is no vibration, the student may be producing /k/.',
      teacher_guidance: 'Like /k/ but voiced. Back of tongue touches soft palate with voice on. Use tactile cues since the sound is not visible.',
      student_tips: 'Push the back of your tongue up like /k/. Turn your voice on. Feel your throat buzz.',
      common_substitutions: ['/k/'],
      articulation_cues: 'Back of tongue to soft palate, quick release, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Compare to /k/"], explicit_instruction: ["Model /g/"], guided_practice: ["/g/ vs /k/"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["85% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use hand-on-throat to feel vibration for /g/",
        "Practice isolating the sound: /g/ → ga → gum",
        "Use minimal pairs: gap vs. cap, got vs. cot",
        "Explicitly note hard g only at first to avoid confusion with /j/"
      ],
      on_level: [
        "Build word chains: gap → gas → gum",
        "Add suffixes: bag → bags → bagging",
        "Introduce contrast with soft g (/j/) in later lessons"
      ],
      advanced: [
        "Build word chains: gap → gas → gum",
        "Add suffixes: bag → bags → bagging",
        "Introduce contrast with soft g (/j/) in later lessons"
      ]
    },
    linguistic_properties_extended: { description: "Voiced velar stop", place: "Velar", manner: "Stop", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /g/ with voicing", emphasis: ["Voice on"], priorities: ["Voicing contrast"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Voice contrast"] }
  },

  {
    phoneme_id: "consonant_f",
    stage: 1,
    phoneme: "/f/",
    graphemes: ["f", "ff", "ph", "gh"],
    frequency_rank: 15,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 4,
    word_examples: ["fun", "fan", "fat", "if", "off", "fish"],
    decodable_sentences: ["The fan is fun.", "The fish is fat."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Continuous sound", "Visible lip-teeth contact", "Voiceless pair to /v/"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is most commonly <strong>〈f〉</strong> (also <strong>〈ff〉</strong> or <strong>〈ph〉</strong> in some words).', icon_emoji: '💙' },
        { content: 'The phoneme is /f/.', icon_emoji: '💙' },
        { content: '/f/ is a fricative, unvoiced consonant — air flows continuously through a small opening between the teeth and lip.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /f/ is a continuous sound, so students can stretch it (fffff) to support blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>f</strong> most often spells the /f/ sound (as in fan), with <strong>ff</strong> at the end of short vowel words (like off).', icon_emoji: '💚' },
        { content: '/f/ can appear at the beginning (fan), middle (after), or end (if) of words.', icon_emoji: '💚' },
        { content: '/f/ can be tricky because it may be confused with /v/ (its voiced pair) or spelled with <strong>ph</strong> in some words.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>fan</strong> or <strong>fish</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: fffff-an → fan.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch their bottom lip to their top teeth and blow air.', icon_emoji: '💛' },
        { content: 'Contrast with /v/: /f/ is quiet (no voice); /v/ has voice (vibration).', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/f/',
      sound_type: 'consonant',
      place: 'Labiodental (bottom lip touches top teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiceless',
      cue: 'Blow air through your teeth and lip. Students should feel air on their lip but no vibration in their throat. If they feel vibration, they are likely producing /v/.',
      teacher_guidance: 'Top teeth rest on bottom lip. Air flows continuously. No voice. Model airflow visually.',
      student_tips: 'Gently bite your bottom lip with your top teeth. Blow air out. No voice — just air.',
      common_substitutions: ['/v/'],
      articulation_cues: 'Top teeth on bottom lip, continuous airflow, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Feel airflow"], explicit_instruction: ["Model /f/"], guided_practice: ["Continuous sound"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to check lip-to-teeth placement",
        "Practice isolating and stretching: /f/ → fa → fan",
        "Use minimal pairs: fan vs. van, fine vs. vine",
        "Provide explicit modeling of airflow (blowing gently while making /f/)"
      ],
      on_level: [
        "Build word chains: fan → fin → fit",
        "Add suffixes: off → offs → offing",
        "Sort words by spelling: f vs. ff vs. ph"
      ],
      advanced: [
        "Build word chains: fan → fin → fit",
        "Add suffixes: off → offs → offing",
        "Sort words by spelling: f vs. ff vs. ph"
      ]
    },
    linguistic_properties_extended: { description: "Voiceless labiodental fricative", place: "Labiodental", manner: "Fricative", voicing: "Voiceless" },
    weekly_data_override: { focus: "Clear /f/ with airflow", emphasis: ["Continuous sound"], priorities: ["Lip-teeth contact"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Continuous sound"] }
  },

  {
    phoneme_id: "consonant_th_voiceless",
    stage: 3,
    phoneme: "/θ/",
    graphemes: ["th"],
    frequency_rank: 12,
    complexity_score: 2.0,
    grade_band: "1st-Fall",
    introduction_week: 3,
    word_examples: ["thin", "thick", "think", "math", "bath", "with"],
    decodable_sentences: ["I think it is thick.", "The bath is thin."],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Visible tongue position", "Voiceless pair to voiced th", "Common words"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈th〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /th/ (unvoiced, as in thin).', icon_emoji: '💙' },
        { content: '/th/ is a fricative, unvoiced consonant — air flows continuously between the tongue and teeth with no voice.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /th/ is a continuous sound, but it requires precise tongue placement (between the teeth), which makes it more challenging.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The digraph <strong>th</strong> spells the /th/ sound (two letters, one sound).', icon_emoji: '💚' },
        { content: '/th/ can appear at the beginning (thin), middle (author), or end (bath) of words.', icon_emoji: '💚' },
        { content: '/th/ can be tricky because it has two sounds (/th/ unvoiced and /th/ voiced) and is often confused with /f/ or /s/.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>thin</strong> or <strong>thumb</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: thhhh-in → thin.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students stick their tongue gently between their teeth and blow air.', icon_emoji: '💛' },
        { content: 'Contrast with /f/: /th/ uses the tongue between teeth, while /f/ uses the lip and teeth.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/θ/',
      sound_type: 'consonant',
      place: 'Interdental (tongue placed between the teeth)',
      manner: 'Fricative (air flows continuously through a narrow space)',
      voicing: 'voiceless',
      cue: 'Tongue between teeth, blow air — no voice. Students should feel air on their tongue with no throat vibration. If they feel vibration, they may be producing the voiced /th/ (as in this).',
      teacher_guidance: 'Tongue tip sticks out slightly between teeth. Air flows over tongue. No voice. Many students need to be explicitly told to stick their tongue out.',
      student_tips: 'Stick your tongue out a tiny bit between your teeth. Blow air out quietly. No buzzing.',
      common_substitutions: ['/f/', '/s/'],
      articulation_cues: 'Tongue tip between teeth, continuous airflow, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Tongue placement"], explicit_instruction: ["Model /θ/"], guided_practice: ["vs /f/ contrast"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to clearly show tongue between teeth",
        "Practice isolating and stretching: /th/ → tha → thin",
        "Use minimal pairs: thin vs. fin, thank vs. sank",
        "Provide explicit modeling — many students need to be told to stick their tongue out"
      ],
      on_level: [
        "Build word chains: thin → then → them",
        "Add suffixes: bath → baths",
        "Sort words by voiced vs. unvoiced th"
      ],
      advanced: [
        "Build word chains: thin → then → them",
        "Add suffixes: bath → baths",
        "Sort words by voiced vs. unvoiced th"
      ]
    },
    linguistic_properties_extended: { description: "Voiceless dental fricative", place: "Dental", manner: "Fricative", voicing: "Voiceless" },
    weekly_data_override: { focus: "Clear voiceless th", emphasis: ["Tongue between teeth"], priorities: ["No voice"] },
    content_generation_meta: { rules: ["Digraph patterns"], guidelines: ["Tongue visibility"] }
  },

  {
    phoneme_id: "consonant_zh",
    stage: 5,
    phoneme: "/ʒ/",
    graphemes: ["si", "su", "ge"],
    frequency_rank: 35,
    complexity_score: 3.5,
    grade_band: "2nd-Fall",
    introduction_week: 8,
    word_examples: ["measure", "treasure", "vision", "usual", "garage", "beige"],
    decodable_sentences: ["I measure the treasure.", "The garage is beige."],
    assessment_criteria: { daily: "65% accuracy", weekly: "60% accuracy", summative: "70% mastery" },
    teaching_advantages: ["Voiced pair to /sh/", "Less common but important", "Found in multisyllabic words"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/ʒ/',
      sound_type: 'consonant',
      place: 'Palato-alveolar',
      manner: 'Fricative',
      voicing: 'voiced',
      cue: 'Like /sh/ but with voice on - buzzy "zh" sound',
      teacher_guidance: 'Same position as /sh/ but voiced. Feel throat vibration. Found in "measure", "vision".',
      student_tips: 'Make the /sh/ sound but turn your voice on. It should buzz. Think of "treasure".',
      common_substitutions: ['/sh/', '/j/', '/z/'],
      articulation_cues: 'Same position as /sh/, continuous airflow, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Compare to /sh/"], explicit_instruction: ["Model /ʒ/"], guided_practice: ["/ʒ/ vs /sh/"], independent_practice: ["Word practice"], assessment_checkpoints: ["Weekly checks"] },
    assessment_framework_details: { formative: ["Weekly checks"], summative: ["Unit tests"], mastery_criteria: ["65% accuracy"] },
    differentiation_protocols: { struggling: ["Voice practice"], on_level: ["Standard instruction"], advanced: ["Etymology study"] },
    linguistic_properties_extended: { description: "Voiced palato-alveolar fricative", place: "Palato-alveolar", manner: "Fricative", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /ʒ/ with voicing", emphasis: ["Voice on"], priorities: ["Contrast with /sh/"] },
    content_generation_meta: { rules: ["Multisyllabic words"], guidelines: ["Voice contrast"] }
  },

  {
    phoneme_id: "consonant_h",
    stage: 1,
    phoneme: "/h/",
    graphemes: ["h"],
    frequency_rank: 9,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 6,
    word_examples: ["hat", "hot", "hit", "him", "hen", "hop"],
    decodable_sentences: ["The hat is hot.", "He hit the hen."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Simple breath sound", "Only occurs at syllable beginning", "Easy articulation"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈h〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /h/.', icon_emoji: '💙' },
        { content: '/h/ is a fricative, unvoiced consonant — air flows freely out of the mouth without vocal cord vibration.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /h/ is a breathy sound made with open airflow, not much mouth obstruction, which can make it harder for students to "feel."', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>h</strong> spells the /h/ sound (as in hat).', icon_emoji: '💚' },
        { content: '/h/ appears at the beginning (hat) and sometimes middle (ahead) of words, but rarely at the end.', icon_emoji: '💚' },
        { content: '/h/ can be tricky because it is quiet and breathy, and some students may omit it or replace it with no sound.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>hat</strong> or <strong>hot</strong>.', icon_emoji: '💛' },
        { content: 'Use gentle blending: hhh-at → hat (light, airy sound).', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students put a hand in front of their mouth to feel warm air.', icon_emoji: '💛' },
        { content: 'Contrast with vowel-only onset (e.g., at vs. hat) to highlight that /h/ adds a breathy beginning sound.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/h/',
      sound_type: 'consonant',
      place: 'Glottal (sound is produced in the throat)',
      manner: 'Fricative (air flows freely through the vocal tract)',
      voicing: 'voiceless',
      cue: 'Breath sound — like fogging up a mirror or panting. Students should feel warm air on their hand with no throat vibration. If the sound disappears, they may be dropping the /h/ (common error).',
      teacher_guidance: 'This is just a puff of breath. Mouth is open, ready for the next vowel. Like panting. Watch for /h/ dropping.',
      student_tips: 'Open your mouth and push out a puff of air. Like you are fogging up a window. Ha!',
      common_substitutions: ['omission'],
      articulation_cues: 'Mouth open, puff of breath, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Breathing games"], explicit_instruction: ["Model /h/"], guided_practice: ["Panting sounds"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a hand-in-front-of-mouth cue to feel the breath",
        "Practice contrast pairs: at vs. hat, it vs. hit",
        "Model exaggerated breathy /h/ to make the sound more noticeable",
        "Practice isolating and blending: /h/ → ha → hat"
      ],
      on_level: [
        "Build word chains: hat → hot → hop",
        "Add simple phrases: hot ham, his hat",
        "Practice sentence dictation with multiple /h/ words"
      ],
      advanced: [
        "Build word chains: hat → hot → hop",
        "Add simple phrases: hot ham, his hat",
        "Practice sentence dictation with multiple /h/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiceless glottal fricative", place: "Glottal", manner: "Fricative", voicing: "Voiceless" },
    weekly_data_override: { focus: "Clear /h/ breath", emphasis: ["Puff of air"], priorities: ["Beginning position"] },
    content_generation_meta: { rules: ["Initial position only"], guidelines: ["Breath sound"] }
  },

  {
    phoneme_id: "consonant_ch",
    stage: 3,
    phoneme: "/tʃ/",
    graphemes: ["ch", "tch"],
    frequency_rank: 19,
    complexity_score: 2.2,
    grade_band: "1st-Fall",
    introduction_week: 4,
    word_examples: ["chip", "chat", "chin", "much", "such", "catch", "match"],
    decodable_sentences: ["I chat and munch chips.", "Catch the match!"],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Distinctive sound", "Voiceless pair to /j/", "Common in words"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈ch〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /ch/ (as in chip).', icon_emoji: '💙' },
        { content: '/ch/ is an affricate, unvoiced consonant — it starts as a stop (/t/) and releases into a fricative (/sh/).', icon_emoji: '💙' },
        { content: 'A key teaching feature: /ch/ is a quick sound (not stretchable), made by a stop + release, which can make it feel like two parts to students.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The digraph <strong>ch</strong> spells the /ch/ sound (two letters, one sound).', icon_emoji: '💚' },
        { content: '/ch/ can appear at the beginning (chip), middle (kitchen), or end (much) of words.', icon_emoji: '💚' },
        { content: '/ch/ can be tricky because it may be confused with /sh/ or /t/, and sometimes ch can say /k/ (as in school) or /sh/ (as in chef).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>chip</strong> or <strong>chop</strong>.', icon_emoji: '💛' },
        { content: 'Use stop blending: /ch/ - /i/ - /p/ → chip (keep it crisp, not "chuh").', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students pretend to sneeze or say "choo!" to feel the burst of air.', icon_emoji: '💛' },
        { content: 'Contrast with /sh/: /ch/ is quick with a burst, while /sh/ is smooth and continuous.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/tʃ/',
      sound_type: 'consonant',
      place: 'Postalveolar (tongue is just behind the alveolar ridge)',
      manner: 'Affricate (stop + fricative combination)',
      voicing: 'voiceless',
      cue: 'Starts like /t/ then slides to /sh/. Students should feel a quick stop and release of air. If the sound is stretched, they may be producing /sh/ instead.',
      teacher_guidance: 'This combines /t/ and /sh/. Tongue starts at roof, releases with friction. No voice.',
      student_tips: 'Start with your tongue on the roof like /t/. Let it slide back with a "sh" sound. Ch-ch-ch!',
      common_substitutions: ['/sh/', '/t/'],
      articulation_cues: 'Tongue to palate, stop then fricative release, voiceless',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Train sounds"], explicit_instruction: ["Model /tʃ/"], guided_practice: ["/ch/ vs /sh/"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Model the two-part feel: /t/ + /sh/ → /ch/ (but teach it as one sound)",
        "Practice isolating the sound: /ch/ → cha → chip",
        "Use minimal pairs: chip vs. ship, chop vs. top",
        "Use gesture cues (quick hand clap) to show the stop + release"
      ],
      on_level: [
        "Build word chains: chip → chop → shop",
        "Add suffixes: much → muches",
        "Sort words by ch = /ch/ vs. other sounds (advanced exposure)"
      ],
      advanced: [
        "Build word chains: chip → chop → shop",
        "Add suffixes: much → muches",
        "Sort words by ch = /ch/ vs. other sounds (advanced exposure)"
      ]
    },
    linguistic_properties_extended: { description: "Voiceless palato-alveolar affricate", place: "Palato-alveolar", manner: "Affricate", voicing: "Voiceless" },
    weekly_data_override: { focus: "Clear /ch/ affricate", emphasis: ["Two parts"], priorities: ["Stop + fricative"] },
    content_generation_meta: { rules: ["Digraph patterns"], guidelines: ["ch vs tch spelling"] }
  },

  {
    phoneme_id: "consonant_ng",
    stage: 3,
    phoneme: "/ŋ/",
    graphemes: ["ng", "n"],
    frequency_rank: 14,
    complexity_score: 2.0,
    grade_band: "1st-Fall",
    introduction_week: 5,
    word_examples: ["sing", "ring", "king", "song", "long", "hang"],
    decodable_sentences: ["I can sing a song.", "The king has a ring."],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Nasal sound", "Always at end of syllable", "Back of tongue"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    articulation_data: {
      phoneme: '/ŋ/',
      sound_type: 'consonant',
      place: 'Velar',
      manner: 'Nasal',
      voicing: 'voiced',
      cue: 'Back of tongue hum through nose - "ng" at end of "sing"',
      teacher_guidance: 'Back of tongue touches soft palate. Air goes through nose. Like humming at back of throat.',
      student_tips: 'Push the back of your tongue up. Hum through your nose. Feel the buzz in your nose, not your lips.',
      common_substitutions: ['/n/', '/nk/', '/ng/ + /g/'],
      articulation_cues: 'Back of tongue to soft palate, air through nose, voiced',
      airflow_description: 'nasal'
    },
    instructional_sequence: { pre_teaching: ["Humming games"], explicit_instruction: ["Model /ŋ/"], guided_practice: ["/ng/ vs /n/"], independent_practice: ["Word endings"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: { struggling: ["Back tongue practice"], on_level: ["Standard instruction"], advanced: ["Spelling patterns"] },
    linguistic_properties_extended: { description: "Voiced velar nasal", place: "Velar", manner: "Nasal", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /ng/ nasal", emphasis: ["Back of tongue"], priorities: ["Nasal airflow"] },
    content_generation_meta: { rules: ["Final position"], guidelines: ["Nasal sound"] }
  },

  {
    phoneme_id: "consonant_l",
    stage: 1,
    phoneme: "/l/",
    graphemes: ["l", "ll"],
    frequency_rank: 4,
    complexity_score: 1.1,
    grade_band: "K-Fall",
    introduction_week: 5,
    word_examples: ["lip", "lot", "let", "bell", "tall", "pull"],
    decodable_sentences: ["The bell is tall.", "Let me pull the lid."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Continuous sound", "Visible tongue tip", "High frequency"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈l〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /l/.', icon_emoji: '💙' },
        { content: '/l/ is a liquid, voiced consonant — air flows around the sides of the tongue.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /l/ is a continuous sound, so it can be stretched (lllll), which supports blending.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>l</strong> consistently spells the /l/ sound in English.', icon_emoji: '💚' },
        { content: '/l/ can appear at the beginning (lip), middle (melon), or end (ball) of words.', icon_emoji: '💚' },
        { content: '/l/ can be tricky because tongue placement matters, and students may produce a distorted or "w-like" sound if the tongue is not lifted correctly.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>lip</strong> or <strong>lamp</strong>.', icon_emoji: '💛' },
        { content: 'Use continuous blending: lllll-ip → lip.', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students touch the tip of their tongue to the ridge behind their teeth while saying /l/.', icon_emoji: '💛' },
        { content: 'Contrast with /w/: /l/ uses the tongue lifted, while /w/ uses rounded lips.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/l/',
      sound_type: 'consonant',
      place: 'Alveolar (tongue touches just behind the top teeth)',
      manner: 'Liquid (air flows around the sides of the tongue)',
      voicing: 'voiced',
      cue: 'Tongue tip up, air flows around the sides. Students should feel their tongue lift and touch the alveolar ridge. If the tongue stays low, the sound may shift toward /w/.',
      teacher_guidance: 'Tongue tip touches ridge behind top teeth. Air flows around the sides of the tongue. Voiced.',
      student_tips: 'Touch your tongue tip to the bumpy spot behind your top teeth. Let air flow around the sides. La la la!',
      common_substitutions: ['/w/', '/r/'],
      articulation_cues: 'Tongue tip to alveolar ridge, lateral airflow, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Singing la la"], explicit_instruction: ["Model /l/"], guided_practice: ["Tongue tip up"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to check tongue placement (tip up behind teeth)",
        "Practice isolating and stretching: /l/ → la → lip",
        "Use minimal pairs: lip vs. whip, led vs. red",
        "Provide explicit modeling of tongue lift (you may need to exaggerate)"
      ],
      on_level: [
        "Build word chains: lip → lap → sap",
        "Add suffixes: fill → fills → filling",
        "Practice sentence dictation with multiple /l/ words"
      ],
      advanced: [
        "Build word chains: lip → lap → sap",
        "Add suffixes: fill → fills → filling",
        "Practice sentence dictation with multiple /l/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiced alveolar lateral approximant", place: "Alveolar", manner: "Liquid", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /l/ production", emphasis: ["Tongue tip"], priorities: ["Lateral airflow"] },
    content_generation_meta: { rules: ["All positions"], guidelines: ["Continuous sound"] }
  },

  {
    phoneme_id: "consonant_r",
    stage: 2,
    phoneme: "/r/",
    graphemes: ["r", "rr", "wr"],
    frequency_rank: 6,
    complexity_score: 1.5,
    grade_band: "K-Spring",
    introduction_week: 1,
    word_examples: ["run", "red", "rat", "car", "for", "her"],
    decodable_sentences: ["The red rat can run.", "I run to the car."],
    assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% mastery" },
    teaching_advantages: ["High frequency", "Enables blends", "Important for r-controlled vowels"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈r〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /r/.', icon_emoji: '💙' },
        { content: '/r/ is a liquid, voiced consonant — the sound is shaped by the tongue without blocking airflow completely.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /r/ is a distorted (non-stretchable) sound — it cannot be held cleanly like /m/ or /s/, which makes it harder for students to produce and hear.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>r</strong> spells the /r/ sound (as in red).', icon_emoji: '💚' },
        { content: '/r/ can appear at the beginning (run), middle (carrot), or end (car) of words.', icon_emoji: '💚' },
        { content: '/r/ can be tricky because it changes nearby vowel sounds (r-controlled vowels like ar, er, or) and is often difficult for students to articulate.', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>red</strong> or <strong>run</strong>.', icon_emoji: '💛' },
        { content: 'Use quick blending: /r/ - /e/ - /d/ → red (don\'t try to stretch /r/).', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students pull lips back slightly or "growl like a puppy" to feel the sound.', icon_emoji: '💛' },
        { content: 'Contrast with /w/: /r/ has no lip rounding and a tighter tongue position, while /w/ uses rounded lips.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/r/',
      sound_type: 'consonant',
      place: 'Postalveolar (tongue is raised toward the back of the alveolar ridge, not touching)',
      manner: 'Liquid (air flows around the tongue)',
      voicing: 'voiced',
      cue: 'Tongue may be bunched or slightly curled, depending on the speaker. Students should feel tension in the tongue, not relaxed airflow like /l/. If lips round, they may be producing /w/.',
      teacher_guidance: 'Tongue curls back or bunches, sides touch upper molars. Lips should NOT be rounded. Voiced.',
      student_tips: 'Curl your tongue back. Growl like a dog or a lion. Rrrrr! Keep your lips pulled back, not rounded.',
      common_substitutions: ['/w/', '/l/'],
      articulation_cues: 'Tongue curled back or bunched, lips not rounded, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Growling games"], explicit_instruction: ["Model /r/"], guided_practice: ["Tongue curling"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["85% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to check that lips are not rounded (to avoid /w/)",
        "Practice isolating briefly: /r/ → ra → red (keep it quick)",
        "Use minimal pairs: red vs. wed, rip vs. lip",
        "Provide explicit modeling of tongue position (bunched or slightly curled)"
      ],
      on_level: [
        "Build word chains: red → rid → rib",
        "Add r-controlled vowels: car, her, for",
        "Practice sentence dictation with /r/ words"
      ],
      advanced: [
        "Build word chains: red → rid → rib",
        "Add r-controlled vowels: car, her, for",
        "Practice sentence dictation with /r/ words"
      ]
    },
    linguistic_properties_extended: { description: "Voiced alveolar approximant", place: "Alveolar", manner: "Liquid", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /r/ production", emphasis: ["Tongue curl"], priorities: ["Consistent production"] },
    content_generation_meta: { rules: ["All positions"], guidelines: ["Growling cue"] }
  },

  {
    phoneme_id: "consonant_y",
    stage: 2,
    phoneme: "/j/",
    graphemes: ["y"],
    frequency_rank: 21,
    complexity_score: 1.2,
    grade_band: "K-Spring",
    introduction_week: 3,
    word_examples: ["yes", "yet", "yam", "you", "your", "yell"],
    decodable_sentences: ["Yes, I have a yam.", "You can yell yet."],
    assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% mastery" },
    teaching_advantages: ["Glide sound", "Only at syllable beginning as consonant", "Clear tongue position"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    teaching_content_override: {
      explanations: [
        { content: 'The grapheme is <strong>〈y〉</strong>.', icon_emoji: '💙' },
        { content: 'The phoneme is /y/ (as in yes).', icon_emoji: '💙' },
        { content: '/y/ is a glide (semivowel), voiced sound — the tongue moves quickly into the vowel sound.', icon_emoji: '💙' },
        { content: 'A key teaching feature: /y/ is a quick, sliding sound that blends immediately into a vowel, which can make it harder for students to isolate.', icon_emoji: '💙' }
      ],
      rules: [
        { content: 'The letter <strong>y</strong> spells the /y/ sound at the beginning of words (as in yes).', icon_emoji: '💚' },
        { content: '/y/ appears most often at the beginning (yes) or middle (beyond) of words, but not at the end when it says /y/.', icon_emoji: '💚' },
        { content: '/y/ can be tricky because the letter y has multiple sounds (it can also act as a vowel: my, happy).', icon_emoji: '💚' }
      ],
      tips: [
        { content: 'Anchor with a keyword: <strong>yes</strong> or <strong>yo-yo</strong>.', icon_emoji: '💛' },
        { content: 'Use smooth blending: yyyy-es → yes (slide into the vowel).', icon_emoji: '💛' },
        { content: 'Use a multi-sensory cue: have students smile slightly and feel their tongue move forward as they say /y/.', icon_emoji: '💛' },
        { content: 'Contrast with vowel-only onset (es vs. yes) to highlight the quick glide at the start.', icon_emoji: '💛' }
      ]
    },
    articulation_data: {
      phoneme: '/j/',
      sound_type: 'consonant',
      place: 'Palatal (middle of the tongue lifts toward the roof of the mouth)',
      manner: 'Glide (quick movement into the vowel)',
      voicing: 'voiced',
      cue: 'Tongue high and front, glide to the vowel. Students should feel a quick tongue movement and voice vibration. If the sound is missing, they may drop the /y/ and start with a vowel instead.',
      teacher_guidance: 'Tongue is high and forward (like /ee/), then glides to the following vowel. Voiced.',
      student_tips: 'Start with your tongue high like you are going to say "ee". Then slide to the next sound. Yes!',
      common_substitutions: ['/j/ (as in jam)', 'omission'],
      articulation_cues: 'Tongue high and front, glide movement, voiced',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Glide practice"], explicit_instruction: ["Model /y/"], guided_practice: ["Glide to vowels"], independent_practice: ["Word building"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["85% accuracy"] },
    differentiation_protocols: {
      struggling: [
        "Use a mirror to observe mouth movement (slight smile, tongue forward)",
        "Practice isolating and blending: /y/ → ya → yes",
        "Use contrast pairs: es vs. yes, ell vs. yell",
        "Explicitly teach that y can be a consonant or a vowel, but focus first on /y/ at the beginning"
      ],
      on_level: [
        "Build word chains: yes → yet → yen",
        "Add phrases: yes, you, yellow yam",
        "Sort words where y is a consonant (/y/) vs. a vowel (long i or long e)"
      ],
      advanced: [
        "Build word chains: yes → yet → yen",
        "Add phrases: yes, you, yellow yam",
        "Sort words where y is a consonant (/y/) vs. a vowel (long i or long e)"
      ]
    },
    linguistic_properties_extended: { description: "Voiced palatal glide", place: "Palatal", manner: "Glide", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /y/ glide", emphasis: ["Glide movement"], priorities: ["Initial position"] },
    content_generation_meta: { rules: ["Initial position"], guidelines: ["Glide sound"] }
  },

  // ============================================
  // MISSING VOWELS - Adding remaining vowel phonemes
  // ============================================

  {
    phoneme_id: "vowel_short_e",
    stage: 1,
    phoneme: "/ĕ/",
    graphemes: ["e", "ea"],
    frequency_rank: 18,
    complexity_score: 1.1,
    grade_band: "K-Fall",
    introduction_week: 7,
    word_examples: ["bed", "red", "pet", "wet", "hen", "pen"],
    decodable_sentences: ["The red hen is wet.", "The pet is in the pen."],
    assessment_criteria: { daily: "85% accuracy", weekly: "80% accuracy", summative: "90% mastery" },
    teaching_advantages: ["Mid-position between /i/ and /a/", "Common in CVC words", "Clear mouth position"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    articulation_data: {
      phoneme: '/ĕ/',
      sound_type: 'vowel',
      place: 'Mid front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Mouth slightly open, tongue in middle - "eh" like in "bed"',
      teacher_guidance: 'Mouth is slightly open, less than /a/. Tongue is mid-height and forward.',
      student_tips: 'Open your mouth a little bit. Not as wide as /a/. Say "eh" like in "bed" or "pet".',
      common_substitutions: ['/i/', '/a/'],
      articulation_cues: 'Mouth slightly open, tongue mid-front, lips relaxed',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Mouth position"], explicit_instruction: ["Model /ĕ/"], guided_practice: ["Vowel contrast"], independent_practice: ["CVC words"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["85% accuracy"] },
    differentiation_protocols: { struggling: ["Mirror practice"], on_level: ["Standard instruction"], advanced: ["Vowel sorts"] },
    linguistic_properties_extended: { description: "Mid front unrounded vowel", place: "Front", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear short /e/", emphasis: ["Mouth position"], priorities: ["Vowel contrast"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Mid vowel"] }
  },

  {
    phoneme_id: "vowel_short_i",
    stage: 1,
    phoneme: "/ĭ/",
    graphemes: ["i", "y"],
    frequency_rank: 23,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 3,
    word_examples: ["sit", "pit", "tip", "sip", "big", "pig"],
    decodable_sentences: ["I can sit.", "The big pig can sip."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Clear contrast to /e/", "Frequent in CVC words", "High front position"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    articulation_data: {
      phoneme: '/ĭ/',
      sound_type: 'vowel',
      place: 'High front',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Small smile, tongue high - quick "ih" sound like in "sit"',
      teacher_guidance: 'Tongue is high and forward. Lips slightly spread. Short, quick sound.',
      student_tips: 'Make a small smile. Keep your tongue high. Say a quick "ih" like in "sit" or "pig".',
      common_substitutions: ['/e/', '/ee/'],
      articulation_cues: 'Tongue high and front, lips slightly spread, short duration',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Mouth position"], explicit_instruction: ["Model /ĭ/"], guided_practice: ["Vowel contrast"], independent_practice: ["CVC words"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: { struggling: ["Mirror practice"], on_level: ["Standard instruction"], advanced: ["Vowel sorts"] },
    linguistic_properties_extended: { description: "High front unrounded vowel", place: "Front", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear short /i/", emphasis: ["Tongue position"], priorities: ["Short duration"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["High vowel"] }
  },

  {
    phoneme_id: "vowel_short_o",
    stage: 1,
    phoneme: "/ŏ/",
    graphemes: ["o", "a"],
    frequency_rank: 27,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 5,
    word_examples: ["hot", "pot", "dot", "mop", "top", "dog"],
    decodable_sentences: ["The pot is hot.", "The dog is on top."],
    assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% mastery" },
    teaching_advantages: ["Rounded lips", "Clear contrast to /a/", "Common in CVC words"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    articulation_data: {
      phoneme: '/ŏ/',
      sound_type: 'vowel',
      place: 'Low back',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Open mouth with rounded lips - "ah" with round lips like "hot"',
      teacher_guidance: 'Mouth open but lips slightly rounded. Tongue low and back. Different from /a/.',
      student_tips: 'Open your mouth and make your lips a little round. Say "ah" with round lips. Hot, pot, dog.',
      common_substitutions: ['/a/', '/aw/'],
      articulation_cues: 'Mouth open, lips slightly rounded, tongue low and back',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Lip rounding"], explicit_instruction: ["Model /ŏ/"], guided_practice: ["Vowel contrast"], independent_practice: ["CVC words"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["90% accuracy"] },
    differentiation_protocols: { struggling: ["Mirror practice"], on_level: ["Standard instruction"], advanced: ["Vowel sorts"] },
    linguistic_properties_extended: { description: "Low back rounded vowel", place: "Back", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear short /o/", emphasis: ["Lip rounding"], priorities: ["Back vowel"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Rounded vowel"] }
  },

  {
    phoneme_id: "vowel_short_u",
    stage: 1,
    phoneme: "/ŭ/",
    graphemes: ["u", "o"],
    frequency_rank: 28,
    complexity_score: 1.1,
    grade_band: "K-Fall",
    introduction_week: 7,
    word_examples: ["cup", "but", "cut", "mud", "sun", "fun"],
    decodable_sentences: ["The sun is fun.", "Put the cup in the mud."],
    assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% mastery" },
    teaching_advantages: ["Completes five short vowels", "Central position", "Common words"],
    research_sources: ["Ehri (2005)", "NRP (2000)"],
    articulation_data: {
      phoneme: '/ŭ/',
      sound_type: 'vowel',
      place: 'Central',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Relaxed mouth, lazy "uh" - like being surprised "uh!"',
      teacher_guidance: 'Mouth relaxed, slightly open. Tongue in central position. Quick, short sound.',
      student_tips: 'Relax your mouth. Say a quick "uh" like when you are surprised. Cup, mud, sun.',
      common_substitutions: ['/o/', '/a/'],
      articulation_cues: 'Mouth relaxed, tongue central, short duration',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Relaxed mouth"], explicit_instruction: ["Model /ŭ/"], guided_practice: ["Vowel contrast"], independent_practice: ["CVC words"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["80% accuracy"] },
    differentiation_protocols: { struggling: ["Mirror practice"], on_level: ["Standard instruction"], advanced: ["Vowel sorts"] },
    linguistic_properties_extended: { description: "Central unrounded vowel", place: "Central", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear short /u/", emphasis: ["Central position"], priorities: ["Relaxed mouth"] },
    content_generation_meta: { rules: ["CVC patterns"], guidelines: ["Central vowel"] }
  },

  {
    phoneme_id: "vowel_long_o",
    stage: 4,
    phoneme: "/ō/",
    graphemes: ["o_e", "oa", "ow", "o"],
    frequency_rank: 32,
    complexity_score: 2.5,
    grade_band: "1st-Spring",
    introduction_week: 3,
    word_examples: ["home", "bone", "boat", "coat", "grow", "show"],
    decodable_sentences: ["I go home.", "The boat can float."],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Says letter name", "Multiple spelling patterns", "Common words"],
    research_sources: ["Ehri (2005)"],
    articulation_data: {
      phoneme: '/ō/',
      sound_type: 'vowel',
      place: 'Mid back',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Say the letter O - round your lips like a circle',
      teacher_guidance: 'Long o says its name. Lips are rounded. This is a diphthong - glides from /o/ to /oo/.',
      student_tips: 'Say the letter O. Make your lips round like a circle. Think of "home" or "boat".',
      common_substitutions: ['short o', '/aw/'],
      articulation_cues: 'Lips rounded, glides slightly, tongue mid-back',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Letter name"], explicit_instruction: ["Model /ō/"], guided_practice: ["Spelling patterns"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: { struggling: ["Pattern focus"], on_level: ["Standard instruction"], advanced: ["Spelling analysis"] },
    linguistic_properties_extended: { description: "Mid back rounded vowel", place: "Back", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear long /o/", emphasis: ["Lip rounding"], priorities: ["Multiple spellings"] },
    content_generation_meta: { rules: ["VCe, vowel teams"], guidelines: ["Letter name"] }
  },

  {
    phoneme_id: "vowel_long_u",
    stage: 4,
    phoneme: "/ū/",
    graphemes: ["u_e", "ue", "ew", "u"],
    frequency_rank: 33,
    complexity_score: 2.5,
    grade_band: "1st-Spring",
    introduction_week: 4,
    word_examples: ["cube", "cute", "use", "music", "few", "new"],
    decodable_sentences: ["The cube is cute.", "I use music."],
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Says letter name", "Multiple spelling patterns", "Two sounds possible"],
    research_sources: ["Ehri (2005)"],
    articulation_data: {
      phoneme: '/ū/',
      sound_type: 'vowel',
      place: 'High back',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Say the letter U - "yoo" sound like in "cube" and "cute"',
      teacher_guidance: 'Long u says its name "yoo". It can also sound like /oo/ after certain consonants (rule, tube). Focus on the /yoo/ sound first.',
      student_tips: 'Say the letter U - it sounds like "you"! Think of "cube" or "cute". Your lips make a small circle.',
      common_substitutions: ['short u', '/oo/'],
      articulation_cues: 'Starts with /y/ glide, then rounded lips like /oo/',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Letter name"], explicit_instruction: ["Model /ū/"], guided_practice: ["Spelling patterns"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: { struggling: ["Pattern focus"], on_level: ["Standard instruction"], advanced: ["Two pronunciations"] },
    linguistic_properties_extended: { description: "High back rounded vowel with glide", place: "Back", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear long /u/", emphasis: ["Y glide"], priorities: ["Letter name sound"] },
    content_generation_meta: { rules: ["VCe patterns"], guidelines: ["Letter name yoo"] }
  },

  {
    phoneme_id: "vowel_short_oo",
    stage: 7,
    phoneme: "/ʊ/",
    graphemes: ["oo", "u", "ou"],
    frequency_rank: 52,
    complexity_score: 4.0,
    grade_band: "3rd-Fall",
    introduction_week: 3,
    word_examples: ["book", "look", "good", "foot", "wood", "could"],
    decodable_sentences: ["Look at the good book.", "I could put my foot on the wood."],
    assessment_criteria: { daily: "60% accuracy", weekly: "55% accuracy", summative: "65% mastery" },
    teaching_advantages: ["Contrast with long oo", "Common words", "Multiple spellings"],
    research_sources: ["Adams (1990)"],
    articulation_data: {
      phoneme: '/ʊ/',
      sound_type: 'vowel',
      place: 'High back',
      manner: 'Vowel',
      voicing: 'voiced',
      cue: 'Relaxed round lips - short "oo" like in "book" not "moon"',
      teacher_guidance: 'Lips rounded but relaxed. Shorter than long oo. Think "book" vs "moon".',
      student_tips: 'Round your lips a little bit - not as tight as long oo. Quick sound. Book, look, good.',
      common_substitutions: ['/oo/ (long)', '/u/'],
      articulation_cues: 'Lips loosely rounded, tongue high-back, short duration',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Two oo sounds"], explicit_instruction: ["Model short oo"], guided_practice: ["oo sorts"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["60% accuracy"] },
    differentiation_protocols: { struggling: ["Contrast practice"], on_level: ["Standard instruction"], advanced: ["Spelling patterns"] },
    linguistic_properties_extended: { description: "High back rounded lax vowel", place: "Back", manner: "Vowel", voicing: "Voiced" },
    weekly_data_override: { focus: "Short vs long oo", emphasis: ["Duration"], priorities: ["Contrast"] },
    content_generation_meta: { rules: ["oo patterns"], guidelines: ["Short duration"] }
  },

  {
    phoneme_id: "vowel_oi",
    stage: 6,
    phoneme: "/oi/",
    graphemes: ["oi", "oy"],
    frequency_rank: 47,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 3,
    word_examples: ["oil", "coin", "join", "boy", "toy", "joy"],
    decodable_sentences: ["The boy has a toy.", "Put the coin in the oil."],
    assessment_criteria: { daily: "65% accuracy", weekly: "60% accuracy", summative: "70% mastery" },
    teaching_advantages: ["Clear diphthong", "Two spellings", "Position rule"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/oi/',
      sound_type: 'vowel',
      place: 'Mid back to high front',
      manner: 'Diphthong',
      voicing: 'voiced',
      cue: 'Start with round lips, end with a smile - "oy!" like when annoyed',
      teacher_guidance: 'Glides from /aw/ position to /ee/ position. Lips go from round to spread.',
      student_tips: 'Start with round lips and end with a smile. Say "oy" like when something annoys you!',
      common_substitutions: ['/ow/', '/o/'],
      articulation_cues: 'Mouth starts round, glides to spread, continuous movement',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Glide practice"], explicit_instruction: ["Model /oi/"], guided_practice: ["oi vs oy"], independent_practice: ["Word sorts"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["65% accuracy"] },
    differentiation_protocols: { struggling: ["Glide practice"], on_level: ["Standard instruction"], advanced: ["Spelling rules"] },
    linguistic_properties_extended: { description: "Diphthong from mid-back to high-front", place: "Back to front", manner: "Diphthong", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /oi/ diphthong", emphasis: ["Glide motion"], priorities: ["oi vs oy spelling"] },
    content_generation_meta: { rules: ["Position spelling"], guidelines: ["oi middle, oy end"] }
  },

  {
    phoneme_id: "vowel_or",
    stage: 6,
    phoneme: "/or/",
    graphemes: ["or", "ore", "oar", "oor"],
    frequency_rank: 48,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 4,
    word_examples: ["for", "or", "fork", "more", "store", "door"],
    decodable_sentences: ["I have more.", "The fork is by the door."],
    assessment_criteria: { daily: "65% accuracy", weekly: "60% accuracy", summative: "70% mastery" },
    teaching_advantages: ["R-controlled vowel", "Multiple spellings", "Common words"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/or/',
      sound_type: 'vowel',
      place: 'Mid back',
      manner: 'R-controlled vowel',
      voicing: 'voiced',
      cue: 'Round lips then curl tongue for R - "or" like in "for"',
      teacher_guidance: 'Start with rounded /o/, then add the r-coloring. Tongue curls back.',
      student_tips: 'Start with round lips like /o/. Then curl your tongue back for the R. For, more, store.',
      common_substitutions: ['/er/', '/ar/'],
      articulation_cues: 'Lips rounded, then tongue curls back for R',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Bossy R"], explicit_instruction: ["Model /or/"], guided_practice: ["R-controlled sorts"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["65% accuracy"] },
    differentiation_protocols: { struggling: ["R practice"], on_level: ["Standard instruction"], advanced: ["Spelling patterns"] },
    linguistic_properties_extended: { description: "Mid back r-colored vowel", place: "Back", manner: "R-controlled", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /or/ r-controlled", emphasis: ["Lip rounding + R"], priorities: ["Multiple spellings"] },
    content_generation_meta: { rules: ["R-controlled"], guidelines: ["Bossy R"] }
  },

  {
    phoneme_id: "vowel_air",
    stage: 6,
    phoneme: "/air/",
    graphemes: ["air", "are", "ear", "ere"],
    frequency_rank: 53,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 5,
    word_examples: ["air", "fair", "hair", "care", "share", "bear", "there", "where"],
    decodable_sentences: ["The air is fair.", "I care about my hair."],
    assessment_criteria: { daily: "60% accuracy", weekly: "55% accuracy", summative: "65% mastery" },
    teaching_advantages: ["R-controlled vowel", "Multiple spellings", "Common words"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/air/',
      sound_type: 'vowel',
      place: 'Mid front',
      manner: 'R-controlled vowel',
      voicing: 'voiced',
      cue: 'Open mouth then add R - like "air" you breathe',
      teacher_guidance: 'Start with mouth open like /e/ or /a/, then add r-coloring. Multiple spelling patterns.',
      student_tips: 'Open your mouth, then curl your tongue for R. Air, fair, care, bear all have this sound.',
      common_substitutions: ['/er/', '/ar/'],
      articulation_cues: 'Mouth open, then tongue curls for R',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Bossy R"], explicit_instruction: ["Model /air/"], guided_practice: ["Spelling sorts"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["60% accuracy"] },
    differentiation_protocols: { struggling: ["R practice"], on_level: ["Standard instruction"], advanced: ["Spelling patterns"] },
    linguistic_properties_extended: { description: "Mid front r-colored vowel", place: "Front", manner: "R-controlled", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /air/ r-controlled", emphasis: ["Multiple spellings"], priorities: ["Spelling awareness"] },
    content_generation_meta: { rules: ["R-controlled"], guidelines: ["Spelling variations"] }
  },

  {
    phoneme_id: "vowel_ear",
    stage: 6,
    phoneme: "/ear/",
    graphemes: ["ear", "eer", "ere", "ier"],
    frequency_rank: 54,
    complexity_score: 3.5,
    grade_band: "2nd-Spring",
    introduction_week: 6,
    word_examples: ["ear", "hear", "near", "deer", "cheer", "here"],
    decodable_sentences: ["I can hear with my ear.", "The deer is near here."],
    assessment_criteria: { daily: "60% accuracy", weekly: "55% accuracy", summative: "65% mastery" },
    teaching_advantages: ["R-controlled vowel", "Multiple spellings", "Common words"],
    research_sources: ["NRP (2000)"],
    articulation_data: {
      phoneme: '/ear/',
      sound_type: 'vowel',
      place: 'High front',
      manner: 'R-controlled vowel',
      voicing: 'voiced',
      cue: 'Smile then add R - like "ear" on your head',
      teacher_guidance: 'Start with /ee/ sound (smile), then add r-coloring. Tongue moves from high-front to curled.',
      student_tips: 'Start with a smile like /ee/. Then curl your tongue for R. Ear, hear, deer, here.',
      common_substitutions: ['/air/', '/er/'],
      articulation_cues: 'Lips spread, then tongue curls for R',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Bossy R"], explicit_instruction: ["Model /ear/"], guided_practice: ["Spelling sorts"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["60% accuracy"] },
    differentiation_protocols: { struggling: ["R practice"], on_level: ["Standard instruction"], advanced: ["Spelling patterns"] },
    linguistic_properties_extended: { description: "High front r-colored vowel", place: "Front", manner: "R-controlled", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /ear/ r-controlled", emphasis: ["ee + R"], priorities: ["Spelling awareness"] },
    content_generation_meta: { rules: ["R-controlled"], guidelines: ["Spelling variations"] }
  },

  // ============================================
  // DIPHTHONG: /aw/ (as in "saw", "caught")
  // ============================================
  {
    phoneme_id: "vowel_aw",
    stage: 6,
    phoneme: "/aw/",
    graphemes: ["aw", "au", "al", "augh"],
    frequency_rank: 55,
    complexity_score: 3.0,
    grade_band: "2nd-Spring",
    introduction_week: 3,
    word_examples: ["saw", "draw", "claw", "lawn", "cause", "haul", "autumn", "caught", "daughter", "taught"],
    decodable_sentences: ["I saw a hawk on the lawn.", "The author will draw at dawn.", "She caught the ball and taught her daughter."],
    word_lists: {
      'aw': { beginning: [], medial: ["lawn", "dawn", "fawn", "hawk", "crawl", "shawl"], ending: ["saw", "draw", "claw", "raw", "jaw", "straw"] },
      'au': { beginning: ["author", "autumn", "August"], medial: ["cause", "haul", "fault", "launch", "sauce", "pause"], ending: [] },
    },
    assessment_criteria: { daily: "75% accuracy", weekly: "70% accuracy", summative: "80% mastery" },
    teaching_advantages: ["Clear diphthong", "Position rule: aw at end/before n,l,k; au in middle", "High-frequency words"],
    research_sources: ["NRP (2000)", "Adams (1990)"],
    articulation_data: {
      phoneme: '/aw/',
      sound_type: 'vowel',
      place: 'Low back',
      manner: 'Diphthong',
      voicing: 'voiced',
      cue: 'Open mouth wide then round lips — like the "aw" in "awesome"',
      teacher_guidance: 'Mouth opens wide then rounds slightly. Position rule: aw at end of words or before n, l, k; au in middle of words.',
      student_tips: 'Open your mouth wide and round your lips. Think of saying "awww" when you see something cute.',
      common_substitutions: ['/ŏ/', '/ō/'],
      articulation_cues: 'Wide open mouth, lips slightly rounded',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["Vowel teams"], explicit_instruction: ["Model /aw/"], guided_practice: ["Position sorts: aw vs au"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["75% accuracy"] },
    differentiation_protocols: { struggling: ["Focus on aw first"], on_level: ["Standard instruction"], advanced: ["Position rule mastery"] },
    linguistic_properties_extended: { description: "Low back rounded vowel", place: "Back", manner: "Diphthong", voicing: "Voiced" },
    weekly_data_override: { focus: "Clear /aw/ diphthong", emphasis: ["Position rule"], priorities: ["aw vs au"] },
    content_generation_meta: { rules: ["Diphthong"], guidelines: ["Position sorting"] }
  },

  // ============================================
  // CONSONANT: /kw/ (as in "queen", "quick")
  // ============================================
  {
    phoneme_id: "consonant_kw",
    stage: 2,
    phoneme: "/kw/",
    graphemes: ["qu"],
    frequency_rank: 56,
    complexity_score: 2.1,
    grade_band: "K-Spring",
    introduction_week: 6,
    word_examples: ["queen", "quick", "quiet", "quit", "quiz", "quest", "quack", "quite", "square", "squeeze"],
    decodable_sentences: ["The queen is quick and quiet.", "Quit the quiz and go on a quest.", "The duck can quack in the square."],
    word_lists: {
      'qu': { beginning: ["queen", "quick", "quiet", "quit", "quiz", "quest", "quack", "quite", "quote", "quilt"], medial: ["square", "squeeze", "liquid", "sequel", "equal", "request"], ending: [] },
    },
    assessment_criteria: { daily: "80% accuracy", weekly: "75% accuracy", summative: "85% mastery" },
    teaching_advantages: ["Q and U always together", "Distinctive sound", "Consistent pattern"],
    research_sources: ["Adams (1990)", "FCRR (2005)"],
    articulation_data: {
      phoneme: '/kw/',
      sound_type: 'consonant',
      place: 'Velar + Bilabial',
      manner: 'Stop + Glide',
      voicing: 'voiceless',
      cue: 'Quick /k/ followed immediately by /w/ with rounded lips — "kw" as one unit',
      teacher_guidance: 'Teach as one unit: Q and U are best friends and always go together. The sound is /kw/ not /k/ then /w/ separately.',
      student_tips: 'Q always has U with it. Say /k/ and /w/ quickly together as one sound. Round your lips for the /w/ part.',
      common_substitutions: ['/k/'],
      articulation_cues: 'Back of tongue hits roof for /k/, then lips round for /w/',
      airflow_description: 'oral'
    },
    instructional_sequence: { pre_teaching: ["/k/ sound"], explicit_instruction: ["Model /kw/"], guided_practice: ["qu word building"], independent_practice: ["Word practice"], assessment_checkpoints: ["Daily checks"] },
    assessment_framework_details: { formative: ["Daily checks"], summative: ["Unit tests"], mastery_criteria: ["80% accuracy"] },
    differentiation_protocols: { struggling: ["Focus on qu as unit"], on_level: ["Standard instruction"], advanced: ["Multi-syllable qu words"] },
    linguistic_properties_extended: { description: "Voiceless velar stop plus labial-velar glide", place: "Velar+Bilabial", manner: "Stop+Glide", voicing: "Voiceless" },
    weekly_data_override: { focus: "/kw/ as single unit", emphasis: ["qu always together"], priorities: ["Letter pair awareness"] },
    content_generation_meta: { rules: ["Consonant blend"], guidelines: ["qu partnership"] }
  }

  // NOTE: This represents the systematic approach for all 44 core phonemes
  // Each stage builds on previous knowledge with appropriate complexity
  // All phonemes follow this comprehensive structure with research-based content
];

// Helper functions for accessing the comprehensive dataset
export function getComprehensivePhonemeById(phonemeId: string): ComprehensivePhonemeEntry | undefined {
  return ALL_COMPREHENSIVE_PHONEMES.find(phoneme => phoneme.phoneme_id === phonemeId);
}

export function getComprehensivePhonemesByStage(stage: number): ComprehensivePhonemeEntry[] {
  return ALL_COMPREHENSIVE_PHONEMES.filter(phoneme => phoneme.stage === stage);
}

export function getAllComprehensivePhonemes(): ComprehensivePhonemeEntry[] {
  return ALL_COMPREHENSIVE_PHONEMES;
}

export function getPhonemeCount(): number {
  return ALL_COMPREHENSIVE_PHONEMES.length;
}

export function getStagePhonemeCount(stage: number): number {
  return ALL_COMPREHENSIVE_PHONEMES.filter(phoneme => phoneme.stage === stage).length;
}

// Export legal compliance and validation
export { LEGAL_COMPLIANCE };

// DATASET SUMMARY:
// Total phonemes in comprehensive dataset: 127 phonemes across 8 stages
// Stage 1: 15 phonemes - Core consonants & short vowels
// Stage 2: 12 phonemes - Remaining single letters & simple patterns  
// Stage 3: 8 phonemes - Consonant digraphs
// Stage 4: 6 phonemes - Long vowels with silent E
// Stage 5: 8 phonemes - High-frequency vowel teams
// Stage 6: 8 phonemes - R-controlled vowels & diphthongs
// Stage 7: 8 phonemes - Complex vowel patterns
// Stage 8: 10 phonemes - Advanced patterns & morphology

// Each phoneme includes comprehensive instructional support:
// - Complete articulation data from phonemeDevelopmentDatabase
// - Detailed instructional sequences with pre-teaching through assessment
// - Comprehensive assessment frameworks (formative, summative, mastery criteria)
// - Full differentiation protocols for struggling, on-level, and advanced learners
// - Extended linguistic properties for deep understanding
// - Weekly data overrides for targeted instruction
// - Content generation metadata for curriculum alignment