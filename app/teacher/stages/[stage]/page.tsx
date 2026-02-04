'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { EIGHT_STAGE_SYSTEM } from '@/app/data/allStagesDatabase';
import SimpleAssessmentDownload from '@/app/components/SimpleAssessmentDownload';
import { jsPDF } from 'jspdf';

// Stage info interface matching TypeScript data structure
interface StageInfo {
  name: string;
  grade_band: string;
  student_phase: string;
  duration: string;
  total_elements: number;
  key_concept: string;
  instructional_focus: string[];
}

// v4.1 Weekly data structure with intensity flags
type IntensityLevel = "CORE" | "TEACH" | "EXPOSURE";

interface WeeklyData {
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
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 1: Core Consonants & Short Vowels (v4.1)
// Grade: K-Fall | Duration: 10 weeks | Phase: Pre → Partial Alphabetic
// Intensity Profile: 15 ★ CORE | 0 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage1WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/m/', '/s/', '/ă/'],
    graphemes: ['m', 's', 'a'],
    intensity: ['CORE', 'CORE', 'CORE'],
    focusWords: ['am', 'Sam', 'as', 'mas'],
    decodableText: 'Mam! Sam! Sam am mas.',
    assessment: 'Daily: letter-sound correspondence',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/m/ — continuous sound (can be held), ideal for blending instruction',
      '/s/ — continuous sound (can be held), ideal for blending instruction',
      '/ă/ — clear open vowel articulation'
    ]
  },
  {
    week: 2,
    phonemes: ['/t/', '/n/'],
    graphemes: ['t', 'n'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['at', 'sat', 'mat', 'man', 'tan', 'ant'],
    decodableText: 'The man sat. Sam sat. Sam and the man sat on a tan mat.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      '/t/ — stop sound (quick release), voiceless',
      '/n/ — continuous nasal, tongue behind teeth'
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
    ]
  },
  {
    week: 5,
    phonemes: ['/ŏ/', '/l/'],
    graphemes: ['o', 'l'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['dot', 'pot', 'lot', 'lap', 'lit', 'log', 'flip'],
    decodableText: 'I sit by the pot a lot. The pot is hot. Flip the lid.',
    assessment: 'Daily: word chain activity',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ŏ/ — short o, open mouth rounded',
      '/l/ — continuous liquid, tongue tip on ridge'
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
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2: Remaining Letters & Digraphs (v4.1)
// Grade: K-Spring | Duration: 10 weeks | Phase: Partial → Full Alphabetic
// Intensity Profile: 18 ★ CORE | 0 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage2WeeklyData: WeeklyData[] = [
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
    week: 8,
    phonemes: ['/th/ (voiceless)', '/th/ (voiced)'],
    graphemes: ['th', 'th'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['thin', 'math', 'path', 'thick', 'this', 'that', 'them', 'then'],
    decodableText: 'A thin path. This is thick. That math is fun. Then them sat.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'th has two sounds — voiceless (thin, math) and voiced (this, that)',
      'Voiceless: air only. Voiced: feel throat vibration.'
    ]
  },
  {
    week: 9,
    phonemes: ['/ng/', 'Review'],
    graphemes: ['ng'],
    intensity: ['CORE'],
    focusWords: ['ring', 'sing', 'long', 'king', 'hang', 'wing', 'song', 'thing'],
    decodableText: 'The king can sing a long song. Hang the ring on the thing.',
    assessment: 'Daily: final digraph + mixed review',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      '/ng/ — nasal sound, back of tongue, always at end of syllable'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 2'],
    intensity: ['CORE'],
    focusWords: ['strong', 'fresh', 'church', 'thinking', 'quickly', 'spring', 'bring', 'which'],
    decodableText: 'The strong spring church is fresh. We are quickly thinking about which long path to bring.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all 18 new GPCs plus all Stage 1 GPCs. Students should decode CCVC and CVCC words.'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3: VCe Patterns & Consonant Complexities (v4.1)
// Grade: 1st-Fall | Duration: 10 weeks | Phase: Full Alphabetic (Emerging)
// Intensity Profile: 9 ★ CORE | 6 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage3WeeklyData: WeeklyData[] = [
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
    week: 3,
    phonemes: ['/ū/', '/ē/'],
    graphemes: ['u_e', 'e_e'],
    intensity: ['CORE', 'TEACH'],
    focusWords: ['cute', 'use', 'tube', 'huge', 'rule', 'theme', 'these'],
    decodableText: 'The cute cat will use the huge tube. These kids like the theme and the rule.',
    assessment: 'Daily: u_e and e_e patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'u_e is CORE — high frequency',
      'e_e is TEACH — far fewer words use this pattern (theme, these, Steve, eve). Teach explicitly but don\'t drill as heavily.'
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
      'Students already know ch and j — these are positional variants'
    ]
  },
  {
    week: 7,
    phonemes: ['/ngk/', '/f/'],
    graphemes: ['nk', 'ph'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['think', 'drink', 'bank', 'pink', 'thank', 'phone', 'graph', 'photo'],
    decodableText: 'Think and drink at the bank. Thank the pink phone for the photo and graph.',
    assessment: 'Daily: nk and ph patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'nk always makes /ngk/ — the n borrows the ng sound before k',
      'ph makes /f/ — Greek origin (phone, photo, graph, elephant)'
    ]
  },
  {
    week: 8,
    phonemes: ['/s/', '/j/'],
    graphemes: ['soft c', 'soft g'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['city', 'cent', 'circle', 'ice', 'gem', 'giant', 'gym', 'age', 'stage'],
    decodableText: 'The giant in the city had a gem on stage. The ice is a cent in the circle. She ran at the gym.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'Soft c: c says /s/ before e, i, y (city, cent, circle)',
      'Soft g: g says /j/ before e, i, y (gem, giant, gym)',
      'INTRODUCTION only — mastery expected by Stage 7'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 3'],
    intensity: ['CORE'],
    focusWords: ['sunshine', 'himself', 'napkin', 'mistake', 'pancake'],
    decodableText: 'He made a mistake with the pancake. The napkin fell in the sunshine. He did it himself.',
    assessment: 'Daily: mixed pattern practice',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review VCe + FLOSS + trigraphs in multisyllabic words'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 3'],
    intensity: ['CORE'],
    focusWords: ['cupcake', 'lunchtime', 'bathrobe', 'lifeline', 'homesick'],
    decodableText: 'She felt homesick at lunchtime. The cupcake was a lifeline. She put on her bathrobe.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess VCe patterns, FLOSS doubles, tch/dge, nk, ph. Soft c/g is awareness only — not assessed for mastery yet.'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 4: Common Vowel Teams & Vowel Discrimination (v4.1)
// Grade: 1st-Spring | Duration: 10 weeks | Phase: Full Alphabetic
// Intensity Profile: 10 ★ CORE | 5 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage4WeeklyData: WeeklyData[] = [
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
    week: 5,
    phonemes: ['/ō/', '/ŭ/'],
    graphemes: ['ow→/ō/', 'o→/ŭ/'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['show', 'grow', 'snow', 'slow', 'know', 'love', 'come', 'some', 'done', 'from', 'mother'],
    decodableText: 'I know the snow will grow. Come from the show. My mother has some love. We are done!',
    assessment: 'Daily: ow→/ō/ and o→/ŭ/ (critical)',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ow can say /ō/ (show, grow) — the OTHER sound /ow/ (cow) comes in Stage 6',
      'o→/ŭ/ is CRITICAL: "o" now has THREE sounds: /ŏ/ (hot), /ō/ (home), /ŭ/ (love, come, some, done, from, mother, other, brother, money). These are Fry top 100 words.'
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
    week: 7,
    phonemes: ['/ē/', '/ī/', 'Open syllable'],
    graphemes: ['ie→/ē/', 'ie→/ī/', 'open syllable'],
    intensity: ['TEACH', 'TEACH', 'TEACH'],
    focusWords: ['chief', 'field', 'piece', 'pie', 'tie', 'lie', 'me', 'go', 'baby', 'music'],
    decodableText: 'The chief found a piece in the field. The baby will tie the pie. Go play me some music!',
    assessment: 'Daily: ie flexibility + open syllable',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ie says /ē/ in the middle of words (chief, field, piece)',
      'ie says /ī/ at the end of words (pie, tie, lie)',
      'Open syllable: when a syllable ends in a vowel, it usually says its long sound (me, go, ba-by, mu-sic)'
    ]
  },
  {
    week: 8,
    phonemes: ['Long vowel exceptions'],
    graphemes: ['-ind', '-ild', '-old', '-olt', '-oll', '-ost'],
    intensity: ['TEACH', 'TEACH', 'TEACH', 'TEACH', 'TEACH', 'TEACH'],
    focusWords: ['find', 'kind', 'mind', 'wild', 'child', 'old', 'cold', 'gold', 'hold', 'bold', 'roll', 'most', 'post'],
    decodableText: 'Find the kind, wild child. The old, cold gold is bold. Hold and roll to the most far post.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'Long Vowel Exception Patterns (UFLI/Wilson "Welded Sounds")',
      'Before -nd, -ild, -old, -olt, -oll, -ost, the vowel is often LONG despite being in a closed syllable',
      'Teach: try the long vowel first, then short. If it makes a real word, you got it!',
      'Very high frequency: find, kind, old, cold, gold, told, hold, most'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 4'],
    intensity: ['CORE'],
    focusWords: ['rainbow', 'nightlight', 'toaster', 'snowflake', 'daydream'],
    decodableText: 'The rainbow shone on the nightlight. The snowflake fell on the toaster. What a daydream!',
    assessment: 'Daily: mixed vowel team practice',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all vowel teams in compound and multisyllabic words'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 4'],
    intensity: ['CORE'],
    focusWords: ['sailboat', 'blindfold', 'sunshine', 'bluebird', 'meanwhile'],
    decodableText: 'The bluebird sailed the sailboat in the sunshine. Meanwhile she wore a blindfold.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess all vowel teams, o→/ŭ/, and long vowel exception patterns. Welded sounds are TEACH — assess for recognition, not timed automaticity.'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 5: R-Controlled Vowels, /oo/ Patterns & W-Influence (v4.1)
// Grade: 2nd-Fall | Duration: 10 weeks | Phase: Consolidated (Emerging)
// Intensity Profile: 9 ★ CORE | 12 ▲ TEACH | 0 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage5WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/ar/', '/er/'],
    graphemes: ['ar', 'er'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['car', 'star', 'park', 'farm', 'her', 'fern', 'term', 'sister', 'water'],
    decodableText: 'Her sister parked the car by the farm. Start near the fern for the term. The water is far from the star.',
    assessment: 'Daily: ar and er recognition',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/ar/ — very consistent, always says /ar/ (Fry: 474)',
      '/er/ — highest frequency r-controlled (Fry: 1,979), "Bossy R changes the vowel sound"'
    ]
  },
  {
    week: 2,
    phonemes: ['/er/'],
    graphemes: ['ir', 'ur'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['bird', 'first', 'girl', 'shirt', 'hurt', 'turn', 'burn', 'church', 'nurse'],
    decodableText: 'The girl in the shirt hurt her first bird. The nurse will turn and burn at the church.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ir, er, and ur all make the same sound /er/ — teach as "same sound, different spelling"',
      'ir is most common in -ird, -irt, -irst words'
    ]
  },
  {
    week: 3,
    phonemes: ['/or/'],
    graphemes: ['or', 'ore'],
    intensity: ['CORE', 'TEACH'],
    focusWords: ['for', 'more', 'store', 'horse', 'corn', 'short', 'sport', 'shore', 'score'],
    decodableText: 'More corn is at the store for the horse. The short sport is on the shore. Score!',
    assessment: 'Daily: or and ore patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/or/ — or is CORE (high frequency)',
      'ore is TEACH — same sound, word-final position'
    ]
  },
  {
    week: 4,
    phonemes: ['/er/', '/or/'],
    graphemes: ['oar', 'our'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['roar', 'board', 'soar', 'pour', 'four', 'your', 'court', 'source'],
    decodableText: 'The lion will roar on the board. Pour four cups for your court. The source will soar!',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'oar says /or/ (roar, board, soar)',
      'our usually says /or/ (pour, four, your, court) — but can say /ow-er/ (hour, sour) in Stage 6'
    ]
  },
  {
    week: 5,
    phonemes: ['/oo/ (long)', '/oo/ (short)'],
    graphemes: ['oo→/oo/', 'oo→/ʊ/'],
    intensity: ['CORE', 'CORE'],
    focusWords: ['moon', 'soon', 'spoon', 'room', 'food', 'book', 'look', 'good', 'wood', 'foot'],
    decodableText: 'The moon will soon be in the room. Look at the good book on the wood. Spoon the food with your foot!',
    assessment: 'Daily: Two sounds of oo',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'oo has TWO sounds: /oo/ (moon, soon, food) and /ʊ/ (book, look, good, wood)',
      'Teach: try /oo/ first, if it doesn\'t make a word, try /ʊ/. Most words use long /oo/.',
      'This is a critical flex pattern!'
    ]
  },
  {
    week: 6,
    phonemes: ['/wŏ/', '/wer/'],
    graphemes: ['wa', 'wor'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['want', 'wash', 'watch', 'was', 'wasp', 'word', 'work', 'world', 'worm', 'worst', 'worth'],
    decodableText: 'I want to wash and watch. Was the wasp at work? The word is worth the world. The worm is the worst!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'W-Influence: W changes nearby vowels!',
      'wa says /wŏ/ (want, wash, watch, was) — NOT short a',
      'wor says /wer/ (word, work, world, worm) — NOT /wor/'
    ]
  },
  {
    week: 7,
    phonemes: ['/wor/', '/er/'],
    graphemes: ['war', 'ear'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['warm', 'war', 'ward', 'warn', 'early', 'earth', 'learn', 'search', 'heard'],
    decodableText: 'The warm war is on the ward. Warn them early! The earth will learn. Search for what you heard.',
    assessment: 'Daily: war and ear→/er/',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'war says /wor/ (warm, warn) — another W-influence pattern',
      'ear says /er/ (early, earth, learn, heard) — one of THREE ear sounds! Others: /ēr/ (hear) and /âr/ (bear)'
    ]
  },
  {
    week: 8,
    phonemes: ['/ēr/', '/âr/', '/ʊ/'],
    graphemes: ['ear→/ēr/', 'ear→/âr/', 'air', 'are', 'oul'],
    intensity: ['TEACH', 'TEACH', 'CORE', 'CORE', 'TEACH'],
    focusWords: ['hear', 'near', 'clear', 'year', 'bear', 'pear', 'wear', 'tear', 'hair', 'fair', 'pair', 'care', 'share', 'stare', 'could', 'would', 'should'],
    decodableText: 'I hear a clear sound near the bear. The pear will wear and tear. The fair hair is a pair. Care and share at the stare. Could you? Would you? Should you!',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ear has THREE sounds: /er/ (learn), /ēr/ (hear), /âr/ (bear) — flex pattern!',
      'air says /âr/ (hair, fair) — very consistent',
      'are says /âr/ (care, share) — consistent word-final pattern',
      'oul says /ʊ/ (could, would, should) — Fry top 100 words, must know!'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 5'],
    intensity: ['CORE'],
    focusWords: ['starfish', 'airport', 'earring', 'bedroom', 'could', 'would', 'should'],
    decodableText: 'Could you find the starfish? Would the airport have an earring? You should go to the bedroom.',
    assessment: 'Daily: mixed review',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all r-controlled and /oo/ patterns in compound words',
      'Reinforce oul words (could, would, should) from Week 8'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 5'],
    intensity: ['CORE'],
    focusWords: ['afternoon', 'understand', 'barefoot', 'homework', 'cardboard'],
    decodableText: 'In the afternoon, understand the barefoot homework on the cardboard.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess r-controlled vowels, two sounds of oo, W-influence, ear/air/are patterns, and oul words.'
    ]
  }
];


// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 6: Diphthongs & Extended Vowel Spellings (v4.1)
// Grade: 2nd-Spring | Duration: 10 weeks | Phase: Consolidated (Developing)
// Intensity Profile: 6 ★ CORE | 8 ▲ TEACH | 4 ○ EXPOSURE
// ═══════════════════════════════════════════════════════════════════════════════
const stage6WeeklyData: WeeklyData[] = [
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
    phonemes: ['/ā/'],
    graphemes: ['eigh', 'ey'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['eight', 'weigh', 'neighbor', 'sleigh', 'they', 'grey', 'obey', 'prey', 'survey'],
    decodableText: 'Eight neighbors weigh the sleigh. They survey in grey. The prey will obey.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'eigh says /ā/ (eight, weigh, neighbor) — less common but important',
      'ey says /ā/ at word end (they, grey, obey) — also can say /ē/ (key, monkey)'
    ]
  },
  {
    week: 5,
    phonemes: ['/ā/', '/ē/'],
    graphemes: ['ei', 'ey→/ē/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['vein', 'rein', 'veil', 'ceiling', 'receive', 'key', 'money', 'monkey', 'donkey', 'honey'],
    decodableText: 'The key is on the ceiling. The monkey with the honey will receive the veil. The donkey has money for the rein.',
    assessment: 'Daily: ei and ey flexibility',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ei says /ā/ (vein, rein, veil) — "i before e except after c" exception group',
      'ey says /ē/ at word end (key, money, monkey) — contrasts with /ā/ (they, grey)'
    ]
  },
  {
    week: 6,
    phonemes: ['/ēr/', '/âr/'],
    graphemes: ['ere→/ēr/', 'ere→/âr/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['here', 'severe', 'sincere', 'where', 'there', 'everywhere'],
    decodableText: 'Here is a severe case. Where is the sincere one? There and everywhere!',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ere is variable! /ēr/ (here, severe, sincere) vs /âr/ (where, there)',
      'Flex strategy: try /ēr/ first, if not a word try /âr/'
    ]
  },
  {
    week: 7,
    phonemes: ['/oo/'],
    graphemes: ['ui', 'ew'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['fruit', 'juice', 'suit', 'cruise', 'chew', 'flew', 'drew', 'threw', 'grew', 'stew'],
    decodableText: 'Chew the fruit juice! The suit flew on the cruise. She threw the stew, then drew and grew.',
    assessment: 'Daily: ui and ew→/oo/',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ui says /oo/ (fruit, juice, suit, cruise)',
      'ew says /oo/ (chew, flew, drew) — same sound taught for /ū/ in Stage 4, reinforced here'
    ]
  },
  {
    week: 8,
    phonemes: ['/ā/', '/ō/', '/oo/'],
    graphemes: ['ea→/ā/', 'oe', 'eu'],
    intensity: ['EXPOSURE', 'EXPOSURE', 'EXPOSURE'],
    focusWords: ['great', 'break', 'steak', 'toe', 'hoe', 'foe', 'feud', 'neutral', 'Europe'],
    decodableText: 'That is a great break for the steak! My toe hit the hoe and the foe. The neutral feud started in Europe.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'EXPOSURE only — encounter these, don\'t drill',
      'ea→/ā/ (great, break, steak) — rare but high frequency words',
      'oe says /ō/ (toe, hoe, foe) — rare',
      'eu says /oo/ (feud, neutral, Europe) — rare, Greek/French origin'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 6'],
    intensity: ['CORE'],
    focusWords: ['joyful', 'powerful', 'downtown', 'playground', 'bough', 'drought'],
    decodableText: 'The drought hit the bough. The joyful downtown playground was powerful.',
    assessment: 'Daily: mixed review',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all diphthongs in compound words',
      'ough→/ow/ (bough, drought) previewed here — full ough instruction in Stage 7'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 6'],
    intensity: ['CORE'],
    focusWords: ['throughout', 'appointment', 'enjoyable', 'automobile', 'tournament'],
    decodableText: 'Throughout the tournament, the automobile appointment was enjoyable.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess diphthongs (ou/ow, oi/oy, au/aw), extended vowels (eigh, ey, ei, ere, ui). EXPOSURE patterns are recognition only.'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 7: Complex & Variable Patterns (v4.1)
// Grade: 3rd-Fall | Duration: 10 weeks | Phase: Consolidated (Proficient)
// Intensity Profile: 1 ★ CORE | 8 ▲ TEACH | 3 ○ EXPOSURE
// Note: Silent letters (kn, wr, gn, mb) moved to Stage 8 for morphological context
// ═══════════════════════════════════════════════════════════════════════════════
const stage7WeeklyData: WeeklyData[] = [
  {
    week: 1,
    phonemes: ['/zh/'],
    graphemes: ['s→/zh/', 'si→/zh/'],
    intensity: ['CORE', 'TEACH'],
    focusWords: ['measure', 'treasure', 'pleasure', 'leisure', 'vision', 'decision', 'television', 'division'],
    decodableText: 'I take pleasure in the treasure. The vision and decision are on the television. Measure the division with leisure.',
    assessment: 'Daily: /zh/ phoneme introduction',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      '/zh/ is the LAST consonant phoneme — voiced version of /sh/',
      's says /zh/ in -sure words (measure, treasure, pleasure)',
      'si says /zh/ in -sion words (vision, decision)'
    ]
  },
  {
    week: 2,
    phonemes: ['Review'],
    graphemes: [],
    intensity: [],
    focusWords: ['celebrate', 'citizen', 'bicycle', 'decimal', 'generous', 'original', 'giraffe', 'gymnasium'],
    decodableText: 'The generous citizen will celebrate on the bicycle. The original giraffe ran to the gymnasium with the decimal.',
    assessment: 'CHECKPOINT Weeks 1-2',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Soft c/g MASTERY REVIEW — introduced in Stage 3, assessed here for automaticity (not counted as new GPCs)',
      'c says /s/ before e, i, y (celebrate, citizen, bicycle)',
      'g says /j/ before e, i, y (generous, giraffe, gymnasium)'
    ]
  },
  {
    week: 3,
    phonemes: ['/ō/', '/oo/', '/aw/', '/ŭf/', '/ow/'],
    graphemes: ['ough→/ō/', 'ough→/oo/', 'ough→/aw/', 'ough→/ŭf/', 'ough→/ow/'],
    intensity: ['TEACH', 'TEACH', 'TEACH', 'EXPOSURE', 'EXPOSURE'],
    focusWords: ['through', 'though', 'thought', 'rough', 'cough', 'bough', 'dough', 'thorough'],
    decodableText: 'I thought the dough was rough. Through and through, though the bough fell with a cough. Be thorough!',
    assessment: 'Daily: ough flexibility',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'ough has FIVE sounds — teach flex strategy:',
      'ough→/oo/ — through (TEACH)',
      'ough→/ō/ — though, dough (TEACH)',
      'ough→/aw/ — thought, bought (TEACH)',
      'ough→/ŭf/ — rough, tough, enough (EXPOSURE)',
      'ough→/ow/ — bough (EXPOSURE)'
    ]
  },
  {
    week: 4,
    phonemes: ['/k/', '/sh/'],
    graphemes: ['ch→/k/', 'ch→/sh/'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['school', 'stomach', 'orchestra', 'anchor', 'echo', 'chef', 'machine', 'parachute', 'brochure'],
    decodableText: 'The chef at school made an echo. The machine in the orchestra had an anchor. The brochure showed a parachute in my stomach.',
    assessment: 'CHECKPOINT Weeks 3-4',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'ch→/k/ is Greek origin (school, stomach, orchestra, anchor, echo)',
      'ch→/sh/ is French origin (chef, machine, parachute, brochure)',
      'Students already know ch→/ch/ — now they have three sounds for this grapheme'
    ]
  },
  {
    week: 5,
    phonemes: ['/s/', '/k/'],
    graphemes: ['sc', 'rh'],
    intensity: ['TEACH', 'EXPOSURE'],
    focusWords: ['science', 'scene', 'scent', 'scissors', 'muscle', 'rhinoceros', 'rhythm', 'rhyme'],
    decodableText: 'The science scene had a scent. The scissors cut the muscle. The rhinoceros had rhythm and rhyme.',
    assessment: 'Daily: Greek sc and rh',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'sc says /s/ before e, i (science, scene, scent, scissors) — TEACH',
      'rh says /r/ (rhinoceros, rhythm, rhyme) — Greek origin, EXPOSURE'
    ]
  },
  {
    week: 6,
    phonemes: ['/g/'],
    graphemes: ['gu (hard g protector)', 'ue (hard g)'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['guess', 'guest', 'guide', 'guitar', 'guilty', 'guard', 'tongue', 'league', 'vague'],
    decodableText: 'I guess the guilty guest will guide the guitar. Guard your tongue in the league. It was vague.',
    assessment: 'CHECKPOINT Weeks 5-6',
    isCheckpoint: true,
    isMastery: false,
    teachingTips: [
      'gu protects hard /g/ before e/i (guess, guest, guide, guitar, guilty, guard)',
      'Without u, these would be soft g: *gess, *gest, *gide',
      'ue after g keeps it hard (tongue, league, vague)'
    ]
  },
  {
    week: 7,
    phonemes: ['/v/', '/z/'],
    graphemes: ['ve (final)', 'se (final)'],
    intensity: ['TEACH', 'TEACH'],
    focusWords: ['have', 'give', 'live', 'love', 'above', 'house', 'mouse', 'please', 'choose', 'because'],
    decodableText: 'Have and give some love. Live above the house with the mouse. Please choose because you can.',
    assessment: 'Daily: ve and se final patterns',
    isCheckpoint: false,
    isMastery: false,
    teachingTips: [
      'English words don\'t end in v — silent e is added (have, give, live, love)',
      'se at word end can say /z/ (house, mouse, please, choose) or /s/ (horse, nurse) — flex!'
    ]
  },
  {
    week: 8,
    phonemes: ['Review'],
    graphemes: ['All Stage 7 patterns'],
    intensity: ['CORE'],
    focusWords: ['measure', 'treasure', 'school', 'stomach', 'through', 'though', 'thought', 'guess', 'guard', 'have', 'give', 'please'],
    decodableText: 'I will measure the treasure at school. My stomach felt strange through the thought. I guess the guard will have and give, please.',
    assessment: 'CHECKPOINT Weeks 7-8',
    isCheckpoint: true,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all Stage 7 patterns: /zh/, soft c/g mastery, ough (5 sounds), Greek/French ch, gu/ue protectors, ve/se finals',
      'Focus on flex strategies for variable patterns',
      'Silent letters (kn, wr, gn, mb) moved to Stage 8 for morphological instruction'
    ]
  },
  {
    week: 9,
    phonemes: ['Review'],
    graphemes: ['All Stage 7'],
    intensity: ['TEACH'],
    focusWords: ['photographer', 'throughout', 'scholarship', 'championship', 'knowledgeable'],
    decodableText: 'The knowledgeable photographer won the scholarship. Throughout the championship, she was thorough.',
    assessment: 'Daily: mixed complex patterns',
    isCheckpoint: false,
    isMastery: false,
    isReview: true,
    teachingTips: [
      'Review all Stage 7 patterns in multisyllabic words'
    ]
  },
  {
    week: 10,
    phonemes: ['Mastery'],
    graphemes: ['All Stage 7'],
    intensity: ['CORE'],
    focusWords: ['extraordinary', 'circumstances', 'acknowledge', 'measurement', 'gymnasium'],
    decodableText: 'Under extraordinary circumstances, I acknowledge the measurement at the gymnasium.',
    assessment: 'END-OF-STAGE ASSESSMENT',
    isCheckpoint: false,
    isMastery: true,
    teachingTips: [
      'Assess /zh/, soft c/g mastery, ough, Greek/French ch, gu/ue, ve/se, and silent letters. EXPOSURE patterns are recognition only.'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 8: Morphology, Schwa & Advanced Patterns (v4.1)
// Grade: 3rd-Spring | Duration: 10 weeks | Phase: Consolidated (Advanced)
// Intensity Profile: 9 ★ CORE | 22 ▲ TEACH | 19 ○ EXPOSURE
// Phase 8A (Weeks 1-5): Core Morphology | Phase 8B (Weeks 6-10): Extended Patterns
// ═══════════════════════════════════════════════════════════════════════════════
const stage8WeeklyData: WeeklyData[] = [
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
      'Fry data: un- and re- together cover 50%+ of all prefixed words!'
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


export default function StageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const stageNumber = parseInt(params.stage as string);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [assessmentToolsOpen, setAssessmentToolsOpen] = useState(false);
  const [differentiationOpen, setDifferentiationOpen] = useState(false);
  const [homeConnectionOpen, setHomeConnectionOpen] = useState(false);
  const [showDifferentiationTreeModal, setShowDifferentiationTreeModal] = useState(false);
  const [expandedExposureWeeks, setExpandedExposureWeeks] = useState<Set<number>>(new Set());

  // Toggle exposure section for a week
  const toggleExposureSection = (weekNum: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setExpandedExposureWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNum)) {
        newSet.delete(weekNum);
      } else {
        newSet.add(weekNum);
      }
      return newSet;
    });
  };

  // Stage data state (from TypeScript)
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Intensity badge helper function
  const getIntensityBadge = (intensity: IntensityLevel) => {
    switch (intensity) {
      case 'CORE':
        return { symbol: '★', label: 'Core', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', textColor: 'text-amber-700' };
      case 'TEACH':
        return { symbol: '▲', label: 'Teach', bgColor: 'bg-sky-100', borderColor: 'border-sky-400', textColor: 'text-sky-700' };
      case 'EXPOSURE':
        return { symbol: '○', label: 'Exposure', bgColor: 'bg-gray-100', borderColor: 'border-gray-400', textColor: 'text-gray-600' };
      default:
        return { symbol: '★', label: 'Core', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', textColor: 'text-amber-700' };
    }
  };

  // Download week resources function
  const handleDownloadWeekResources = (weekNumber: number) => {
    const weekData = weeklyData.find(week => week.week === weekNumber);
    if (!weekData) return;

    // Create PDF
    const pdf = new jsPDF();
    
    // Define colors
    const primaryColor: [number, number, number] = [74, 144, 164]; // oceanBlue
    const accentColor: [number, number, number] = [212, 130, 110]; // warmCoral
    const textColor: [number, number, number] = [45, 55, 72]; // deepNavy
    
    // Determine week type for dynamic labeling
    const weekType = weekData.isMastery ? 'MASTERY' : weekData.isCheckpoint ? 'CHECKPOINT' : weekData.isReview ? 'REVIEW' : '';
    const weekLabel = weekType ? `Week ${weekNumber} — ${weekType}` : `Week ${weekNumber}`;

    // Page 1 - Teacher Resource Page
    // Header background - use different colors for special weeks
    if (weekData.isMastery) {
      pdf.setFillColor(245, 158, 11); // amber for mastery
    } else if (weekData.isCheckpoint) {
      pdf.setFillColor(59, 130, 246); // blue for checkpoint
    } else {
      pdf.setFillColor(...primaryColor);
    }
    pdf.rect(0, 0, 210, 35, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Stage ${stageNumber} - ${weekLabel}`, 105, 12, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(stageInfo?.name || 'Phonics Stage', 105, 20, { align: 'center' });

    // Add week type badge if applicable
    if (weekType) {
      pdf.setFontSize(10);
      pdf.text(`★ ${weekType} WEEK ★`, 105, 28, { align: 'center' });
    }

    // Stage 8 phase indicator
    if (stageNumber === 8) {
      pdf.setFontSize(9);
      const phaseLabel = weekNumber <= 5 ? 'Phase 8A: Core Morphology' : 'Phase 8B: Extended Patterns';
      pdf.text(phaseLabel, 105, weekType ? 33 : 28, { align: 'center' });
    }
    
    // Teacher Section Header
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Teacher Guide', 20, 50);

    // This Week's Focus
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 55, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('This Week\'s Focus', 20, 60);

    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text(`Phonemes: ${weekData.phonemes.join(', ')}`, 20, 70);

    // Format graphemes with intensity symbols for PDF
    const graphemesWithIntensity = weekData.graphemes.map((g, i) => {
      const intensity = weekData.intensity?.[i] || 'CORE';
      const symbol = intensity === 'CORE' ? '★' : intensity === 'TEACH' ? '▲' : '○';
      return `${symbol} ${g}`;
    }).join(', ');
    pdf.text(`Graphemes: ${graphemesWithIntensity}`, 20, 78);

    // Intensity Legend
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Intensity Key:  ★ CORE (drill to automaticity)  |  ▲ TEACH (explicit instruction)  |  ○ EXPOSURE (encounter in reading)', 20, 86);

    // Teaching Tips
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 90, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Teaching Tips', 20, 95);

    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const tips = weekData.teachingTips;
    let yPos = 105;
    tips.forEach(tip => {
      pdf.text(`• ${tip}`, 20, yPos);
      yPos += 7;
    });
    
    // Assessment
    pdf.setFillColor(...accentColor);
    pdf.rect(15, yPos + 5, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Assessment', 20, yPos + 10);
    
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(weekData.assessment, 20, yPos + 20);
    
    // Activities
    pdf.setFillColor(...accentColor);
    pdf.rect(15, yPos + 30, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Quick Activities', 20, yPos + 35);
    
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const activities = [
      'Sound Hunt: Find objects that start with this week\'s sounds',
      'Letter Formation: Practice writing graphemes in sand/shaving cream',
      'Word Building: Use letter tiles to build focus words',
      'Reading Practice: Use the decodable text for guided reading'
    ];
    let activityY = yPos + 45;
    activities.forEach((activity, index) => {
      pdf.text(`${index + 1}. ${activity}`, 20, activityY);
      activityY += 7;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2025 Decoding Den. All rights reserved.', 105, 280, { align: 'center' });
    
    // Page 2 - Student Practice Sheet
    pdf.addPage();
    
    // Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, 210, 20, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Student Practice Sheet', 105, 11, { align: 'center' });
    pdf.setFontSize(10);
    pdf.text(`Week ${weekNumber}`, 105, 16, { align: 'center' });
    
    // Dynamic Y positioning for all elements
    let currentY = 35;
    const sectionSpacing = 8; // Space between sections
    
    // Name and Date
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Name: ________________________________', 20, currentY);
    pdf.text('Date: _______________', 140, currentY);
    
    currentY += sectionSpacing;
    
    // Learning Focus Box
    const focusBoxY = currentY;
    const focusBoxHeight = 25;
    pdf.setFillColor(245, 251, 254);
    pdf.rect(15, focusBoxY, 180, focusBoxHeight, 'F');
    pdf.setDrawColor(...primaryColor);
    pdf.rect(15, focusBoxY, 180, focusBoxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('This Week I\'m Learning:', 20, focusBoxY + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text(`Sounds: ${weekData.phonemes.join(', ')}`, 20, focusBoxY + 16);
    pdf.text(`Letters: ${weekData.graphemes.join(', ')}`, 20, focusBoxY + 22);
    
    currentY = focusBoxY + focusBoxHeight + 3;
    
    // Learning Goal Box
    const goalBoxY = currentY;
    
    // Create learning goal text first to calculate required height
    const learningGoal = `I can use the ${weekData.graphemes.length > 1 ? 'letters' : 'letter'} ${weekData.graphemes.join(', ')} to read and write words with the ${weekData.phonemes.length > 1 ? 'sounds' : 'sound'} ${weekData.phonemes.join(', ')}.`;
    
    // Calculate text height (estimate ~7 units per line, max width 170)
    const goalTextLines = pdf.splitTextToSize(learningGoal, 170);
    const goalBoxHeight = Math.max(20, 10 + (goalTextLines.length * 7));
    
    pdf.setFillColor(255, 243, 199); // Light yellow for goal
    pdf.rect(15, goalBoxY, 180, goalBoxHeight, 'F');
    pdf.setDrawColor(...accentColor);
    pdf.rect(15, goalBoxY, 180, goalBoxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('My Learning Goal:', 20, goalBoxY + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    
    pdf.text(learningGoal, 20, goalBoxY + 16, { maxWidth: 170 });
    
    currentY = goalBoxY + goalBoxHeight + sectionSpacing;
    
    // Practice Words
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Practice Words:', 20, currentY);
    
    currentY += 13;
    
    // Word boxes - dynamic sizing based on number of words
    const words = weekData.focusWords;
    const pageWidth = 170; // Total usable width (210 - 20 left margin - 20 right margin)
    
    // Calculate dynamic sizing based on word count
    let boxWidth = 50;
    let boxHeight = 12;
    let wordsPerRow = 3;
    let fontSize = 14;
    let rowSpacing = 15;
    
    const estimatedRows = Math.ceil(words.length / wordsPerRow);
    const availableHeight = 120; // Approximate space available for words before next section
    
    // If we have too many words, adjust layout
    if (words.length > 16 || estimatedRows * rowSpacing > availableHeight) {
      // Compact layout for many words - use 5 columns
      wordsPerRow = 5;
      boxWidth = 30;
      boxHeight = 10;
      fontSize = 10;
      rowSpacing = 12;
    }
    
    const rowCount = Math.ceil(words.length / wordsPerRow);
    const totalBoxWidth = Math.min(words.length, wordsPerRow) * boxWidth;
    const totalSpacing = pageWidth - totalBoxWidth;
    const spaceBetween = totalSpacing / (Math.min(words.length, wordsPerRow) + 1);
    
    let wordX = 20 + spaceBetween;
    let wordY = currentY;
    let maxWordY = wordY;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);
    words.forEach((word, index) => {
      if (index > 0 && index % wordsPerRow === 0) {
        wordY += rowSpacing;
        maxWordY = wordY;
        wordX = 20 + spaceBetween;
      }
      pdf.setDrawColor(...primaryColor);
      pdf.rect(wordX, wordY - 8, boxWidth, boxHeight, 'S');
      pdf.text(word, wordX + (boxWidth/2), wordY, { align: 'center' });
      wordX += boxWidth + spaceBetween;
    });
    
    currentY = maxWordY + 7 + sectionSpacing;
    
    // Read This Sentence
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Read This Sentence:', 20, currentY);
    
    currentY += 5;
    
    const sentenceBoxY = currentY;
    
    // Set font before calculating text wrap
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    
    // Split text to fit within box width (170 allows for padding)
    const textLines = pdf.splitTextToSize(weekData.decodableText, 170) as string[];
    
    // Calculate dynamic height based on number of lines
    const lineHeight = 5;
    const sentenceBoxHeight = 8 + (textLines.length * lineHeight);
    
    // Draw the box
    pdf.setFillColor(250, 250, 250);
    pdf.rect(15, sentenceBoxY, 180, sentenceBoxHeight, 'F');
    pdf.setDrawColor(...primaryColor);
    pdf.rect(15, sentenceBoxY, 180, sentenceBoxHeight, 'S');
    
    // Render each line of text (left-aligned)
    let textY = sentenceBoxY + 6;
    textLines.forEach((line) => {
      pdf.text(line, 20, textY);
      textY += lineHeight;
    });
    
    currentY = sentenceBoxY + sentenceBoxHeight + sectionSpacing;
    
    // Write Your Own Words
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Write Your Own Words:', 20, currentY);
    
    currentY += 12;
    
    // Three writing lines with equal spacing
    const lineWidth = 50;
    const totalWidth = 170;
    const lineSpacing = (totalWidth - (3 * lineWidth)) / 2;
    
    pdf.setDrawColor(150, 150, 150);
    pdf.line(20, currentY, 20 + lineWidth, currentY);
    pdf.line(20 + lineWidth + lineSpacing, currentY, 20 + lineWidth + lineSpacing + lineWidth, currentY);
    pdf.line(20 + (2 * lineWidth) + (2 * lineSpacing), currentY, 20 + (3 * lineWidth) + (2 * lineSpacing), currentY);
    
    currentY += sectionSpacing - 4; // Moved up another tad
    
    // Add separator lines before Home Connection
    pdf.setDrawColor(200, 200, 200);
    
    // Home Connection Box - dynamically positioned
    const homeConnectionY = currentY;
    pdf.setFillColor(...accentColor);
    pdf.rect(15, homeConnectionY, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Home Connection', 20, homeConnectionY + 5);
    
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Dear Families,', 20, homeConnectionY + 13);
    pdf.text(`This week we are working on the sounds ${weekData.phonemes.join(' and ')}`, 20, homeConnectionY + 20);
    pdf.text(`written as ${weekData.graphemes.join(' and ')}.`, 20, homeConnectionY + 27);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('At home you can:', 20, homeConnectionY + 35);
    pdf.setFont('helvetica', 'normal');
    const homeActivities = [
      'Practice the focus words during daily activities',
      'Point out these letters in books and signs',
      'Play "I Spy" with words that have these sounds',
      'Read the decodable sentence together'
    ];
    let homeY = homeConnectionY + 42;
    homeActivities.forEach(activity => {
      pdf.text(`• ${activity}`, 25, homeY);
      homeY += 5;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2025 Decoding Den. All rights reserved.', 105, 280, { align: 'center' });
    
    // Save the PDF
    pdf.save(`Stage-${stageNumber}-Week-${weekNumber}-Resources.pdf`);
  };

  // Load stage data from TypeScript (no Supabase needed)
  useEffect(() => {
    // Find stage in TypeScript data (array is 0-indexed, stages are 1-indexed)
    const stageData = EIGHT_STAGE_SYSTEM[stageNumber - 1];
    if (stageData) {
      // Map TypeScript fields to component interface
      setStageInfo({
        name: stageData.stage_name,
        grade_band: stageData.grade_level,
        student_phase: stageData.student_phase,
        duration: stageData.duration,
        total_elements: stageData.total_elements,
        key_concept: stageData.key_concept,
        instructional_focus: stageData.instructional_focus
      });
    }
    setLoading(false);
  }, [stageNumber]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading stage details...</p>
        </div>
      </div>
    );
  }
  
  if (!stageInfo) {
    return <div>Stage not found</div>;
  }

  // Select the appropriate weekly data based on stage number
  const weeklyData = stageNumber === 1 ? stage1WeeklyData :
                     stageNumber === 2 ? stage2WeeklyData :
                     stageNumber === 3 ? stage3WeeklyData :
                     stageNumber === 4 ? stage4WeeklyData :
                     stageNumber === 5 ? stage5WeeklyData :
                     stageNumber === 6 ? stage6WeeklyData :
                     stageNumber === 7 ? stage7WeeklyData :
                     stageNumber === 8 ? stage8WeeklyData : [];
  const hasDetailedData = weeklyData.length > 0;

  // Calculate taught vs exposure counts for Stage 8 (exclude Week 10 mastery and review weeks)
  const intensityCounts = stageNumber === 8 ? weeklyData.reduce((acc, week) => {
    // Skip Week 10 and any week with "All Stage" review graphemes
    if (week.week === 10 || week.graphemes?.some(g => g.startsWith('All Stage'))) {
      return acc;
    }
    week.intensity?.forEach(i => {
      if (i === 'CORE' || i === 'TEACH') {
        acc.taught++;
      } else if (i === 'EXPOSURE') {
        acc.exposure++;
      }
    });
    return acc;
  }, { taught: 0, exposure: 0 }) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-slate-600 text-deepNavy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue shadow-2xl p-2 border-b border-oceanBlue/50">
        <div className="px-4">
          <div className="flex items-center justify-between relative z-50">
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">
                Stage {stageNumber}: {stageInfo.name}
              </h1>
              <p className="text-sm text-white/90 mt-1">
                {stageInfo.grade_band} • {stageInfo.duration} • {stageInfo.total_elements} elements
                {stageNumber === 8 && intensityCounts && (
                  <span className="ml-2 text-white/70">
                    ({intensityCounts.taught} taught · {intensityCounts.exposure} exposure reference)
                  </span>
                )}
              </p>
            </div>
            <div className="relative z-50 pr-4">
              <button 
                onClick={() => router.push('/teacher/stages')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-600 transition-all duration-200 font-medium cursor-pointer relative z-50 hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                ← Back to Stages
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mx-auto px-6 py-4 relative z-10">
        {/* Stage Overview Card - 4 Section Layout */}
        <div className="rounded-lg shadow-lg p-4 mb-3 relative overflow-hidden" style={{
          background: 'radial-gradient(ellipse at center, #ffffff 60%, #f8fafc 85%, #e2e8f0 100%)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 40px rgba(0, 0, 0, 0.08)'
        }}>
          <h2 className="text-xl font-bold mb-2 text-black">Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-4">
            {/* Student Phase Section - Full height on left */}
            <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-lg p-5 border border-blue-400 shadow-xl relative overflow-hidden" >
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
              <h3 className="text-lg mb-2">
                <span className="text-black font-bold">Student Phase:</span> <span className="text-black">{stageInfo.student_phase}</span>
              </h3>
              
              {/* Definition */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-oceanBlue mb-1">Definition:</h4>
                <p className="text-deepNavy text-sm">
                  {stageInfo.student_phase === 'Pre-alphabetic Phase' && 
                    "Students rely on visual cues or context—not letter-sound knowledge—to identify words."}
                  {stageInfo.student_phase === 'Pre-Alphabetic to Partial Alphabetic Phase' && 
                    "Students are transitioning from relying on visual cues to beginning to use letter-sound knowledge, particularly first and last letters in words."}
                  {stageInfo.student_phase === 'Partial Alphabetic Phase' && 
                    "Students begin to use some letter-sound knowledge, typically the first or last letter in a word, often relying on context to fill in the rest."}
                  {stageInfo.student_phase === 'Full Alphabetic Phase - Emerging' && 
                    "Students begin systematic use of letter-sound relationships but are still developing full mastery of decoding strategies with complex patterns."}
                  {stageInfo.student_phase === 'Full Alphabetic Phase' && 
                    "Students can fully decode unfamiliar words by applying letter-sound knowledge across the entire word."}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Emerging' && 
                    "Students begin efficiently processing multi-letter patterns as single units, focusing on foundational letter combinations like r-controlled vowels."}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Developing' && 
                    "Students demonstrate increased proficiency with complex multi-letter patterns and advanced syllable structures, including irregular spellings."}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Proficient' && 
                    "Students demonstrate strong proficiency with complex orthographic patterns and efficiently decode multisyllabic words using known chunks."}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Advanced' && 
                    "Students exhibit mastery of complex orthographic patterns and sophisticated understanding of morphological structures."}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase' && 
                    "Students recognize common chunks (e.g., -ight, -tion) and morphemes (e.g., un-, -ed) to read and spell multisyllabic words."}
                </p>
              </div>
              
              {/* Student Can */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-oceanBlue mb-1">Student Can:</h4>
                <p className="text-deepNavy text-sm italic">
                  {stageInfo.student_phase === 'Pre-alphabetic Phase' && 
                    '"Read" familiar words by shape, color, or logos (e.g., guessing "McDonald\'s" from the golden arches).'}
                  {stageInfo.student_phase === 'Pre-Alphabetic to Partial Alphabetic Phase' && 
                    'Begin to notice first letters in words (e.g., recognize "M" starts "Mom") and attempt to write letters for sounds they hear, though not all sounds are represented.'}
                  {stageInfo.student_phase === 'Partial Alphabetic Phase' && 
                    'Write "bt" for "boat" or guess words like "cat" from the first letter and the picture.'}
                  {stageInfo.student_phase === 'Full Alphabetic Phase - Emerging' && 
                    'Begin systematic decoding of CVC and CVCC words, with emerging skills in vowel pattern recognition and basic blending strategies.'}
                  {stageInfo.student_phase === 'Full Alphabetic Phase' && 
                    'Blend and segment CVC and CCVC words like "slip" or "mend" with increasing accuracy.'}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Emerging' && 
                    'Recognize r-controlled vowel patterns and decode multisyllabic words using familiar chunks with increasing automaticity.'}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Developing' && 
                    'Efficiently decode words with irregular patterns and apply morphological knowledge to unfamiliar multisyllabic words.'}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Proficient' && 
                    'Read fluently with complex orthographic patterns including diphthongs and less predictable vowel patterns.'}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Advanced' && 
                    'Demonstrate mastery with Greek and Latin roots, complex prefixes and suffixes, and read academic texts with confidence.'}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase' && 
                    'Decode words more automatically and with greater fluency; reading begins to feel smoother and more effortless.'}
                </p>
              </div>
              {/* Teacher Should */}
              <div>
                <h4 className="text-sm font-bold text-oceanBlue mb-1">Teacher Should:</h4>
                <ul className="list-disc list-outside ml-4 text-deepNavy text-sm space-y-1">
                  {stageInfo.student_phase === 'Pre-alphabetic Phase' && (
                    <>
                      <li>Build oral language and vocabulary</li>
                      <li>Engage in print awareness (pointing to words while reading)</li>
                      <li>Practice concepts of print (directionality, word boundaries)</li>
                      <li>Expose students to letter names through alphabet books and songs</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Pre-Alphabetic to Partial Alphabetic Phase' && (
                    <>
                      <li>Explicitly teach initial consonant sounds and connect to letter names</li>
                      <li>Build phonemic awareness with focus on first and last sounds</li>
                      <li>Practice letter formation alongside sound production</li>
                      <li>Use environmental print to bridge from logos to letter recognition</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Partial Alphabetic Phase' && (
                    <>
                      <li>Teach consonant sounds and short vowels explicitly</li>
                      <li>Practice blending and segmenting 2–3 sounds</li>
                      <li>Use Elkonin boxes to reinforce phoneme-grapheme mapping</li>
                      <li>Provide letter-sound matching practice with real and nonsense words</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Full Alphabetic Phase - Emerging' && (
                    <>
                      <li>Introduce complex consonant patterns and silent E rules</li>
                      <li>Build systematic decoding strategies for longer words</li>
                      <li>Practice with vowel pattern recognition and application</li>
                      <li>Support transition from sounding out to pattern recognition</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Full Alphabetic Phase' && (
                    <>
                      <li>Continue systematic phonics instruction with blends, digraphs, and vowel patterns</li>
                      <li>Build decoding fluency with decodable texts</li>
                      <li>Introduce simple spelling tasks to reinforce sound-symbol connections</li>
                      <li>Model word solving strategies explicitly</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Emerging' && (
                    <>
                      <li>Teach r-controlled vowel patterns systematically (ar, or, er, ir, ur)</li>
                      <li>Build chunking strategies for multisyllabic word decoding</li>
                      <li>Practice with known spelling units to decode unfamiliar words</li>
                      <li>Support orthographic mapping through repeated exposure</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Developing' && (
                    <>
                      <li>Teach silent letter patterns and irregular spellings explicitly</li>
                      <li>Introduce morphological analysis (prefixes, suffixes, roots)</li>
                      <li>Practice with complex syllable structures and patterns</li>
                      <li>Build automaticity through fluency-focused activities</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Proficient' && (
                    <>
                      <li>Teach complex orthographic patterns including diphthongs</li>
                      <li>Build advanced decoding strategies for academic vocabulary</li>
                      <li>Practice with sophisticated vowel patterns and morphemes</li>
                      <li>Support transition to fluent, automatic word recognition</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase - Advanced' && (
                    <>
                      <li>Teach Greek and Latin roots and complex morphological structures</li>
                      <li>Build expertise with academic vocabulary and technical terms</li>
                      <li>Practice with advanced orthographic patterns and etymology</li>
                      <li>Support reading comprehension across complex academic texts</li>
                    </>
                  )}
                  {stageInfo.student_phase === 'Consolidated Alphabetic Phase' && (
                    <>
                      <li>Teach syllable types and morphological units</li>
                      <li>Provide practice with multisyllabic words</li>
                      <li>Embed fluency work with expressive reading</li>
                      <li>Support comprehension strategies through connected text</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Right column with three side-by-side boxes */}
            <div className="flex space-x-3 h-full">
              {/* Key Concepts Section */}
              <div className="bg-gradient-to-br from-emerald-300/20 to-emerald-400/25 rounded-lg p-4 border border-emerald-400 flex-1 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                <h3 className="text-lg font-bold text-black mb-2">Key Concepts</h3>
                <p className="text-black text-sm">{stageInfo.key_concept}</p>
              </div>

              {/* Instructional Focus Section */}
              <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/40 rounded-lg p-4 border border-amber-400 flex-1 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                <h3 className="text-lg font-bold text-black mb-2">Instructional Focus</h3>
                <ul className="list-disc list-outside ml-4 text-deepNavy space-y-1">
                  {stageInfo.instructional_focus?.map((focus, index) => (
                    <li key={index} className="text-sm text-black">{focus}</li>
                  ))}
                </ul>
              </div>

              {/* Useful Strategies Section */}
              <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-lg p-4 border border-purple-400 flex-1 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                <h3 className="text-lg font-bold text-black mb-2">Useful Strategies</h3>
                <ul className="list-disc list-outside ml-4 text-black space-y-1">
                  <li className="text-sm text-black">Systematic introduction of phonemes</li>
                  <li className="text-sm text-black">Daily quick assessments (1-3 minutes)</li>
                  <li className="text-sm text-black">Multisensory instruction techniques</li>
                  <li className="text-sm text-black">Decodable text practice</li>
                  <li className="text-sm text-black">Progress monitoring every 2 weeks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {hasDetailedData ? (
          <>
            {/* View Mode Toggle */}
            <div className="flex justify-center mb-3">
              <div className="bg-white bg-warm-stripes rounded-lg shadow-sm p-0.5 border border-goldenYellow/20">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-1 rounded transition-all text-sm ${
                    viewMode === 'timeline' 
                      ? 'bg-oceanBlue text-white shadow-sm' 
                      : 'text-deepNavy hover:bg-warmCoral/10'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1 rounded transition-all text-sm ${
                    viewMode === 'list' 
                      ? 'bg-oceanBlue text-white shadow-sm' 
                      : 'text-deepNavy hover:bg-warmCoral/10'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>

            {/* Intensity Legend */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/80 rounded-lg shadow-sm px-4 py-2 border border-gray-200 flex items-center gap-4 text-xs">
                <span className="font-semibold text-gray-600">Intensity:</span>
                <span className="flex items-center gap-1">
                  <span className="text-amber-600 font-bold">★</span>
                  <span className="bg-amber-100 border border-amber-400 text-amber-700 px-1.5 py-0.5 rounded">CORE</span>
                  <span className="text-gray-500 ml-1">Drill to automaticity</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-sky-600 font-bold">▲</span>
                  <span className="bg-sky-100 border border-sky-400 text-sky-700 px-1.5 py-0.5 rounded">TEACH</span>
                  <span className="text-gray-500 ml-1">Explicit instruction</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-gray-500 font-bold">○</span>
                  <span className="bg-gray-100 border border-gray-400 text-gray-600 px-1.5 py-0.5 rounded">EXPOSURE</span>
                  <span className="text-gray-500 ml-1">Encounter in reading</span>
                </span>
              </div>
            </div>

            {/* Stage 8 Instructional Shift Banner */}
            {stageNumber === 8 && (
              <div className="mb-4 bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-400 rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="font-bold text-violet-800 text-lg mb-1">Instructional Shift: Morphology Focus</h3>
                    <p className="text-violet-700 text-sm mb-2">
                      Stage 8 marks a transition from phoneme-grapheme correspondence to <strong>morphological awareness</strong> — understanding how prefixes, suffixes, and roots create meaning.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="bg-violet-200/50 rounded px-3 py-1">
                        <span className="font-bold text-violet-800">Phase 8A (Weeks 1-5):</span>
                        <span className="text-violet-700 ml-1">Core Morphology — inflectional suffixes (-ed, -s, -ing) and high-frequency prefixes (un-, re-)</span>
                      </div>
                      <div className="bg-purple-200/50 rounded px-3 py-1">
                        <span className="font-bold text-purple-800">Phase 8B (Weeks 6-10):</span>
                        <span className="text-purple-700 ml-1">Extended Patterns — derivational suffixes (-tion, -ful, -ness) and schwa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid View - 2 rows × 5 columns */}
            {viewMode === 'timeline' && (
              <div className="max-w-5xl mx-auto px-1">
                {/* Row 1: Weeks 1-5 */}
                <div className="grid grid-cols-5 gap-4 mb-4 justify-items-center">
                  {weeklyData.slice(0, 5).map((week) => {
                    // Dynamic week label
                    const getWeekLabel = () => {
                      if (week.isMastery) return `Week ${week.week} — MASTERY`;
                      if (week.isCheckpoint) return `Week ${week.week} — CHECKPOINT`;
                      if (week.isReview) return `Week ${week.week} — REVIEW`;
                      if (stageNumber === 8 && week.week === 5) return `Week ${week.week} — 8A MASTERY`;
                      return `Week ${week.week}`;
                    };

                    return (
                      <button
                        key={week.week}
                        onClick={() => setSelectedWeek(week.week)}
                        className={`rounded-lg shadow-md px-2 pb-2 pt-px border-2 text-center transition-all duration-300 transform hover:scale-110 hover:z-20 hover:shadow-xl relative overflow-hidden ${
                          selectedWeek === week.week
                            ? 'ring-2 ring-cyan-400 border-cyan-400'
                            : 'border-cyan-400 hover:border-cyan-300'
                        }`}
                        style={{
                          width: '140px',
                          height: '260px',
                          background: week.isMastery
                            ? 'linear-gradient(to bottom, #fef08a, #f59e0b)'
                            : week.isCheckpoint
                              ? 'linear-gradient(to bottom, #dbeafe, #60a5fa)'
                              : 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        <div className="h-8 flex items-center justify-center">
                          <span className={`text-xs font-bold text-center leading-tight ${
                            week.isMastery ? 'text-amber-800' : week.isCheckpoint ? 'text-blue-800' : 'text-slate-700'
                          }`}>
                            {getWeekLabel()}
                          </span>
                          {(week.isMastery || week.isCheckpoint) && (
                            <span className="ml-1 text-yellow-500">⭐</span>
                          )}
                        </div>
                    
                    <div className="mt-2">
                      <div className="h-5 flex items-center justify-center">
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Phonemes</span>
                      </div>
                      <div className="h-16 flex flex-col gap-0.5 justify-start mt-1">
                        {week.phonemes.map((phoneme, idx) => (
                          <span key={idx} className="bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded-md text-xs font-semibold text-emerald-800 text-center leading-tight shadow-sm flex items-center justify-center">
                            {phoneme}
                          </span>
                        ))}
                      </div>
                      
                      <div className="h-5 flex items-center justify-center mt-2">
                        <span className="font-bold text-blue-700 text-xs uppercase tracking-wide">Graphemes</span>
                      </div>
                      <div className="h-20 flex flex-col gap-0.5 justify-start mt-1 overflow-y-auto">
                        {week.graphemes.map((grapheme, idx) => {
                          const intensity = week.intensity?.[idx] || 'CORE';
                          const badge = getIntensityBadge(intensity);
                          return (
                            <div key={idx} className="flex items-center gap-1">
                              <span className={`${badge.textColor} text-[10px] font-bold`} title={badge.label}>
                                {badge.symbol}
                              </span>
                              <span className={`${badge.bgColor} border ${badge.borderColor} px-1.5 py-0.5 rounded-md text-xs font-semibold text-center leading-tight shadow-sm flex-grow ${
                                ['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : badge.textColor
                              }`}>
                                {grapheme}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </button>
                    );
                  })}
                </div>

                {/* Row 2: Weeks 6-10 */}
                <div className="grid grid-cols-5 gap-4 justify-items-center">
                  {weeklyData.slice(5, 10).map((week) => {
                    // Dynamic week label
                    const getWeekLabel = () => {
                      if (week.isMastery) return `Week ${week.week} — MASTERY`;
                      if (week.isCheckpoint) return `Week ${week.week} — CHECKPOINT`;
                      if (week.isReview) return `Week ${week.week} — REVIEW`;
                      if (stageNumber === 8 && week.week === 6) return `Week ${week.week} — 8B START`;
                      return `Week ${week.week}`;
                    };

                    return (
                      <button
                        key={week.week}
                        onClick={() => setSelectedWeek(week.week)}
                        className={`rounded-lg shadow-md px-2 pb-2 pt-px border-2 text-center transition-all duration-300 transform hover:scale-110 hover:z-20 hover:shadow-xl relative overflow-hidden ${
                          selectedWeek === week.week
                            ? 'ring-2 ring-cyan-400 border-cyan-400'
                            : 'border-cyan-400 hover:border-cyan-300'
                        }`}
                        style={{
                          width: '140px',
                          height: '260px',
                          background: week.isMastery
                            ? 'linear-gradient(to bottom, #fef08a, #f59e0b)'
                            : week.isCheckpoint
                              ? 'linear-gradient(to bottom, #dbeafe, #60a5fa)'
                              : stageNumber === 8 && week.week >= 6
                                ? 'linear-gradient(to bottom, #ede9fe, #a78bfa)'
                                : 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        <div className="h-8 flex items-center justify-center">
                          <span className={`text-xs font-bold text-center leading-tight ${
                            week.isMastery ? 'text-amber-800' : week.isCheckpoint ? 'text-blue-800' : stageNumber === 8 && week.week >= 6 ? 'text-violet-800' : 'text-slate-700'
                          }`}>
                            {getWeekLabel()}
                          </span>
                          {(week.isMastery || week.isCheckpoint) && (
                            <span className="ml-1 text-yellow-500">⭐</span>
                          )}
                        </div>

                        <div className="mt-2">
                          <div className="h-5 flex items-center justify-center">
                            <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Phonemes</span>
                          </div>
                          <div className="h-16 flex flex-col gap-0.5 justify-start mt-1">
                            {week.phonemes.map((phoneme, idx) => (
                              <span key={idx} className="bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded-md text-xs font-semibold text-emerald-800 text-center leading-tight shadow-sm flex items-center justify-center">
                                {phoneme}
                              </span>
                            ))}
                          </div>

                          <div className="h-5 flex items-center justify-center mt-2">
                            <span className="font-bold text-blue-700 text-xs uppercase tracking-wide">Graphemes</span>
                          </div>
                          <div className="h-20 flex flex-col gap-0.5 justify-start mt-1 overflow-y-auto">
                            {week.graphemes.map((grapheme, idx) => {
                              const intensity = week.intensity?.[idx] || 'CORE';
                              const badge = getIntensityBadge(intensity);
                              return (
                                <div key={idx} className="flex items-center gap-1">
                                  <span className={`${badge.textColor} text-[10px] font-bold`} title={badge.label}>
                                    {badge.symbol}
                                  </span>
                                  <span className={`${badge.bgColor} border ${badge.borderColor} px-1.5 py-0.5 rounded-md text-xs font-semibold text-center leading-tight shadow-sm flex-grow ${
                                    ['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : badge.textColor
                                  }`}>
                                    {grapheme}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {weeklyData.map((week) => {
                  // For Stage 8, separate CORE/TEACH from EXPOSURE items
                  const hasExposure = stageNumber === 8 && week.intensity?.some(i => i === 'EXPOSURE');
                  const coreTeachItems: { grapheme: string; intensity: IntensityLevel; idx: number }[] = [];
                  const exposureItems: { grapheme: string; intensity: IntensityLevel; idx: number }[] = [];

                  if (stageNumber === 8) {
                    week.graphemes.forEach((grapheme, idx) => {
                      const intensity = week.intensity?.[idx] || 'CORE';
                      if (intensity === 'EXPOSURE') {
                        exposureItems.push({ grapheme, intensity, idx });
                      } else {
                        coreTeachItems.push({ grapheme, intensity, idx });
                      }
                    });
                  }

                  const isExposureExpanded = expandedExposureWeeks.has(week.week);

                  return (
                    <div
                      key={week.week}
                      onClick={() => setSelectedWeek(week.week)}
                      className={`w-full rounded-lg shadow-md p-6 hover:shadow-lg transition-all text-left border-2 border-cyan-400 cursor-pointer ${
                        selectedWeek === week.week
                          ? 'ring-2 ring-cyan-400'
                          : ''
                      }`}
                      style={{
                        background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <h3 className="font-bold text-xl text-black mb-2">
                            Week {week.week}: {week.phonemes.join(', ')}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-baseline flex-wrap">
                              <span className="text-black/70">Graphemes:</span>
                              <span className="ml-2 font-medium flex flex-wrap gap-1">
                                {stageNumber === 8 ? (
                                  // Stage 8: Show only CORE/TEACH items inline
                                  coreTeachItems.map(({ grapheme, intensity, idx }) => {
                                    const badge = getIntensityBadge(intensity);
                                    return (
                                      <span key={idx} className={`inline-flex items-center gap-0.5 ${badge.bgColor} ${badge.borderColor} border px-1.5 py-0.5 rounded text-xs`}>
                                        <span className={`${badge.textColor} text-[10px] font-bold`} title={badge.label}>{badge.symbol}</span>
                                        <span className={['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : badge.textColor}>
                                          {grapheme}
                                        </span>
                                      </span>
                                    );
                                  })
                                ) : (
                                  // Other stages: Show all items
                                  week.graphemes.map((grapheme, idx) => {
                                    const intensity = week.intensity?.[idx] || 'CORE';
                                    const badge = getIntensityBadge(intensity);
                                    return (
                                      <span key={idx} className={`inline-flex items-center gap-0.5 ${badge.bgColor} ${badge.borderColor} border px-1.5 py-0.5 rounded text-xs`}>
                                        <span className={`${badge.textColor} text-[10px] font-bold`} title={badge.label}>{badge.symbol}</span>
                                        <span className={['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : badge.textColor}>
                                          {grapheme}
                                        </span>
                                      </span>
                                    );
                                  })
                                )}
                              </span>
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-black/70" style={{minWidth: '90px', display: 'inline-block'}}>Focus Words:</span>
                              <span className="ml-2 text-black">{week.focusWords.slice(0, 3).join(', ')}...</span>
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-black/70">Assessment:</span>
                              <span className="ml-2 text-black">{week.assessment.split(':')[0]}</span>
                            </div>
                          </div>

                          {/* Collapsible Exposure Reference section for Stage 8 */}
                          {hasExposure && exposureItems.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-amber-300/50">
                              <button
                                onClick={(e) => toggleExposureSection(week.week, e)}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                <span className={`transform transition-transform ${isExposureExpanded ? 'rotate-90' : ''}`}>▶</span>
                                <span className="font-medium">Exposure Reference</span>
                                <span className="text-gray-400">({exposureItems.length} {exposureItems.length === 1 ? 'item' : 'items'})</span>
                              </button>
                              {isExposureExpanded && (
                                <div className="mt-2 pl-4 flex flex-wrap gap-1">
                                  {exposureItems.map(({ grapheme, intensity, idx }) => {
                                    const badge = getIntensityBadge(intensity);
                                    return (
                                      <span key={idx} className={`inline-flex items-center gap-0.5 ${badge.bgColor} ${badge.borderColor} border px-1.5 py-0.5 rounded text-xs`}>
                                        <span className={`${badge.textColor} text-[10px] font-bold`} title={badge.label}>{badge.symbol}</span>
                                        <span className={badge.textColor}>
                                          {grapheme}
                                        </span>
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {(week.assessment.includes('CHECKPOINT') || week.assessment.includes('ASSESSMENT')) && (
                          <span className="ml-4 px-3 py-1 bg-dustyRose/20 text-dustyRose text-sm rounded font-medium">
                            Assessment
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Week Detail Modal */}
            {selectedWeek && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{paddingTop: '50px'}}>
                <div className="rounded-lg p-6 max-w-3xl w-full max-h-[90vh] bg-white relative overflow-y-auto" style={{
                  background: 'radial-gradient(ellipse at center, #ffffff 60%, #f8fafc 85%, #e2e8f0 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08)'
                }}>
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-2xl font-bold text-black">
                      Week {selectedWeek} Detail
                      {(() => {
                        const week = weeklyData.find(w => w.week === selectedWeek);
                        return (week?.assessment.includes('CHECKPOINT') || week?.assessment.includes('ASSESSMENT')) && (
                          <span className="ml-2 text-yellow-500">⭐</span>
                        );
                      })()}
                    </h2>
                    <button 
                      onClick={() => setSelectedWeek(null)}
                      className={stageNumber === 1 
                        ? 'text-slate-600 hover:text-slate-800 text-2xl' 
                        : 'text-mossGray hover:text-pineShadow text-2xl'
                      }
                    >
                      ×
                    </button>
                  </div>
                  
                  {(() => {
                    const week = weeklyData.find(w => w.week === selectedWeek)!;
                    return (
                      <div className="space-y-4 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-lg p-4 border border-blue-400 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                            <h3 className="font-bold text-lg mb-2 text-black">Phonemes & Graphemes</h3>
                            <div className="space-y-2">
                              {selectedWeek === 8 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>u</span>
                                  </div>
                                </div>
                              ) : selectedWeek === 9 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">u</span>
                                  </div>
                                </div>
                              ) : selectedWeek === 10 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">u</span>
                                  </div>
                                </div>
                              ) : (
                                week.phonemes.map((phoneme, i) => {
                                  const intensity = week.intensity?.[i] || 'CORE';
                                  const badge = getIntensityBadge(intensity);
                                  return (
                                    <div key={i} className="flex items-center justify-start min-w-0 gap-2">
                                      <span className={`${badge.textColor} text-sm font-bold`} title={badge.label}>{badge.symbol}</span>
                                      <span className={`text-lg font-bold w-12 text-left font-mono ${
                                        stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                      }`}>{phoneme}</span>
                                      <span className="text-sm font-medium w-6 text-center">→</span>
                                      <span className={`text-lg font-bold text-left px-2 py-0.5 rounded ${badge.bgColor} border ${badge.borderColor} ${
                                        stageNumber === 1 ? (['a', 'e', 'i', 'o', 'u'].includes(week.graphemes[i]?.toLowerCase()) ? 'text-red-600' : badge.textColor) : 'text-pineShadow'
                                      }`}>{week.graphemes[i]}</span>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-emerald-300/20 to-emerald-400/25 rounded-lg p-4 h-full border border-emerald-400 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                            <h3 className="font-bold text-lg mb-2 text-black">Focus Words</h3>
                            <div className={
                              (selectedWeek === 10 && stageNumber === 1) ? "grid grid-cols-5 gap-1" : "grid grid-cols-4 gap-2"
                            }>
                              {week.focusWords.map((word, i) => (
                                <span key={i} className={
                                  (selectedWeek === 10 && stageNumber === 1)
                                    ? "px-2 py-1 bg-white rounded-lg font-medium text-center text-sm border border-slate-200 min-w-0" 
                                    : "px-2 py-1 bg-white rounded-lg font-medium text-center text-sm border border-slate-200"
                                } style={{
                                  borderColor: 'rgba(47, 95, 95, 0.2)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}>
                                  {word.split('').map((letter, idx) => (
                                    <span key={idx} style={{
                                      color: ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase()) ? '#dc2626' : '#1e293b'
                                    }}>
                                      {letter}
                                    </span>
                                  ))}
                                </span>
                              ))}
                            </div>
                            
                            {/* Sight Words Section */}
                            {(() => {
                              const sightWords = ['the', 'a', 'an', 'is', 'was', 'were', 'are', 'to', 'too', 'two', 'and', 'he', 'she', 'it', 'we', 'they', 'I', 'you', 'me', 'my', 'his', 'her', 'him', 'them', 'us', 'of', 'for', 'from', 'with', 'by', 'on', 'in', 'at', 'up', 'out', 'down', 'off', 'over', 'under', 'into', 'onto', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must', 'be', 'been', 'being', 'go', 'goes', 'went', 'come', 'came', 'get', 'got', 'see', 'saw', 'look', 'want', 'said', 'say', 'says', 'here', 'there', 'where', 'when', 'what', 'who', 'why', 'how', 'this', 'that', 'these', 'those', 'some', 'all', 'any', 'many', 'much', 'one', 'two', 'three', 'first', 'then', 'now', 'only', 'also', 'but', 'or', 'so', 'if', 'because', 'before', 'after', 'while', 'during', 'about', 'above', 'below', 'between', 'through', 'around', 'near', 'far', 'big', 'little', 'long', 'short', 'high', 'low', 'good', 'bad', 'new', 'old', 'cold', 'fast', 'slow', 'happy', 'sad', 'yes', 'no', 'not'];
                              
                              // Extract unique sight words from the decodable text (case-insensitive)
                              const textWords = week.decodableText.split(' ').map(w => w.replace(/[.,!?;:—]/g, ''));
                              const sightWordMap = new Map();
                              
                              textWords.forEach(word => {
                                const lowerWord = word.toLowerCase();
                                if (sightWords.includes(lowerWord) && !sightWordMap.has(lowerWord)) {
                                  sightWordMap.set(lowerWord, lowerWord); // Store in lowercase
                                } else if (word.toLowerCase() === 'i' && sightWords.includes('I') && !sightWordMap.has('i')) {
                                  sightWordMap.set('i', 'I'); // Store "I" as uppercase
                                }
                              });
                              
                              const foundSightWords = Array.from(sightWordMap.values());
                              
                              if (foundSightWords.length > 0) {
                                return (
                                  <>
                                    <h3 className={`font-bold text-lg mb-2 mt-4 ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>Sight Words</h3>
                                    <div className={
                                      (selectedWeek === 10 && stageNumber === 1) ? "grid grid-cols-5 gap-1" : "grid grid-cols-4 gap-2"
                                    }>
                                      {foundSightWords.map((word, i) => (
                                        <span key={i} className={
                                          (selectedWeek === 10 && stageNumber === 1)
                                            ? "px-2 py-1 bg-blue-50 rounded-lg font-medium text-center text-sm border border-blue-200 text-blue-600 min-w-0" 
                                            : "px-2 py-1 bg-blue-50 rounded-lg font-medium text-center text-sm border border-blue-200 text-blue-600"
                                        } style={{
                                          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                                        }}>
                                          {word}
                                        </span>
                                      ))}
                                    </div>
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/40 rounded-lg mt-2 p-3 border border-amber-400 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                          <h3 className={`font-bold text-black ${
                            selectedWeek === 10 ? 'text-base mb-1' : 'text-lg mb-2'
                          }`}>
                            {selectedWeek === 8 && stageNumber === 1 
                              ? "End of Stage Assessment - Decodable Text" 
                              : selectedWeek === 9 && stageNumber === 1
                              ? "Review All Vowels - Decodable Text"
                              : selectedWeek === 10 && stageNumber === 1
                              ? "Mastery Check - Decodable Text"
                              : selectedWeek === 8
                              ? "Checkpoint Assessment - Decodable Text"
                              : selectedWeek === 9
                              ? "Review - Decodable Text"
                              : selectedWeek === 10
                              ? "Mastery Check - Decodable Text"
                              : "Decodable Text"
                            }
                          </h3>
                          <div className={`text-pineShadow italic ${
                            selectedWeek === 10 ? 'text-sm' : 'text-base'
                          }`}>
                            {(() => {
                              const sightWords = ['the', 'a', 'an', 'is', 'was', 'were', 'are', 'to', 'too', 'two', 'and', 'he', 'she', 'it', 'we', 'they', 'I', 'you', 'me', 'my', 'his', 'her', 'him', 'them', 'us', 'of', 'for', 'from', 'with', 'by', 'on', 'in', 'at', 'up', 'out', 'down', 'off', 'over', 'under', 'into', 'onto', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must', 'be', 'been', 'being', 'go', 'goes', 'went', 'come', 'came', 'get', 'got', 'see', 'saw', 'look', 'want', 'said', 'say', 'says', 'here', 'there', 'where', 'when', 'what', 'who', 'why', 'how', 'this', 'that', 'these', 'those', 'some', 'all', 'any', 'many', 'much', 'one', 'two', 'three', 'first', 'then', 'now', 'only', 'also', 'but', 'or', 'so', 'if', 'because', 'before', 'after', 'while', 'during', 'about', 'above', 'below', 'between', 'through', 'around', 'near', 'far', 'big', 'little', 'long', 'short', 'high', 'low', 'good', 'bad', 'new', 'old', 'cold', 'fast', 'slow', 'happy', 'sad', 'yes', 'no', 'not'];
                              
                              return week.decodableText.split(' ').map((word, index) => {
                                const cleanWord = word.replace(/[.,!?;:—]/g, '');
                                if (sightWords.includes(cleanWord.toLowerCase()) || sightWords.includes(cleanWord)) {
                                  return <span key={index} className="text-blue-600 font-bold">{word} </span>;
                                }
                                return <span key={index}>{word} </span>;
                              });
                            })()}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-lg mt-2 p-3 border border-purple-400 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                          <h3 className={`font-bold text-black ${
                            selectedWeek === 10 ? 'text-base mb-1' : 'text-lg mb-2'
                          }`}>Assessment</h3>
                          <SimpleAssessmentDownload
                            week={selectedWeek}
                            stageNumber={stageNumber}
                            assessmentText={week.assessment}
                          />
                        </div>
                        
                        <div className={`bg-gradient-to-br from-rose-500/30 to-pink-600/40 rounded-lg border border-rose-400 shadow-xl relative overflow-hidden ${
                          selectedWeek === 10 ? 'px-3 pt-2 pb-3' : 'px-4 pt-2 pb-4'
                        }`}>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
                          <h3 className={`font-bold text-black mb-1 ${
                            selectedWeek === 10 ? 'text-base' : 'text-lg'
                          }`}>Teaching Tips</h3>
                          <div className={`text-black ${
                            selectedWeek === 10 ? 'text-sm' : ''
                          }`}>
                            {week.teachingTips.map((tip, index) => (
                              <div key={index} className="mb-1">{tip}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6 mb-12 pr-12">
                          <button 
                            onClick={() => handleDownloadWeekResources(selectedWeek)}
                            className="px-4 py-2 bg-forestGreen text-white rounded-lg hover:bg-forestGreen/90 transition"
                          >
                            Download Week {selectedWeek} Resources
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Placeholder for other stages */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-mossGray mb-2">
              Detailed weekly breakdown coming soon for Stage {stageNumber}
            </p>
            <p className="text-pineShadow">
              Currently available for Stages 1, 2, 3, and 4. Other stages will include:
            </p>
            <ul className="mt-4 text-sm text-mossGray space-y-1">
              <li>• Week-by-week phoneme introduction</li>
              <li>• Assessment checkpoints</li>
              <li>• Decodable texts and word lists</li>
              <li>• Teaching tips and differentiation</li>
            </ul>
          </div>
        )}

        {/* Resources Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/20 rounded-lg shadow-xl py-2 px-4 border border-emerald-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
            <button 
              onClick={() => setAssessmentToolsOpen(!assessmentToolsOpen)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="font-bold text-lg text-white mb-0">Assessment Tools</h3>
              <span className={`text-white text-xl transition-transform duration-200 ${assessmentToolsOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {assessmentToolsOpen && (
              <ul className="space-y-2 text-sm text-white mt-2">
                <li>• Quick phoneme checks (1-3 min)</li>
                <li>• Weekly progress monitoring</li>
                <li>• Formal assessments at weeks 2, 4, 6, 8</li>
                <li>• Differentiation decision trees</li>
              </ul>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/20 rounded-lg shadow-xl py-2 px-4 border border-emerald-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
            <button 
              onClick={() => setDifferentiationOpen(!differentiationOpen)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="font-bold text-lg text-white mb-0">Differentiation</h3>
              <span className={`text-white text-xl transition-transform duration-200 ${differentiationOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {differentiationOpen && (
              <div className="mt-2">
                <ul className="space-y-2 text-sm text-white mb-4">
                  <li>• Tier 1: 2-3 days per phoneme</li>
                  <li>• Tier 2: 5-7 days with multisensory</li>
                  <li>• Advanced: Accelerate with mastery checks</li>
                  <li>• ELL: Extra oral language support</li>
                </ul>
                <button
                  onClick={() => setShowDifferentiationTreeModal(true)}
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  View Differentiation Tree
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/20 rounded-lg shadow-xl py-2 px-4 border border-emerald-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
            <button 
              onClick={() => setHomeConnectionOpen(!homeConnectionOpen)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="font-bold text-lg text-white mb-0">Home Connection</h3>
              <span className={`text-white text-xl transition-transform duration-200 ${homeConnectionOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {homeConnectionOpen && (
              <ul className="space-y-2 text-sm text-white mt-2">
                <li>• Weekly phoneme practice sheets</li>
                <li>• Decodable books for home</li>
                <li>• Parent tips for each phoneme</li>
                <li>• Progress celebration ideas</li>
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Differentiation Tree Modal */}
      {showDifferentiationTreeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg pt-3 px-6 pb-3 max-w-4xl w-full max-h-[98vh] overflow-y-auto relative" style={{
            background: 'radial-gradient(ellipse at center, #ffffff 60%, #f8fafc 85%, #e2e8f0 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-black">Differentiation Decision Tree</h2>
              <button 
                onClick={() => setShowDifferentiationTreeModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-lg p-3 border border-blue-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                <h3 className="font-bold text-lg text-black mb-1">Step 1: Initial Assessment</h3>
                <p className="text-black mb-1">Assess student&apos;s current phonemic awareness level:</p>
                <ul className="list-disc list-inside text-black space-y-1">
                  <li>Can identify beginning sounds? → <strong>Yes:</strong> Proceed to Step 2 | <strong>No:</strong> Start with Tier 2</li>
                  <li>Can blend 2-3 sounds? → <strong>Yes:</strong> Proceed to Step 2 | <strong>No:</strong> Start with Tier 2</li>
                  <li>Can segment simple words? → <strong>Yes:</strong> Ready for Tier 1 | <strong>No:</strong> Start with Tier 2</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/40 rounded-lg p-3 border border-emerald-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                <h3 className="font-bold text-lg text-black mb-2">Step 2: Placement Decision</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/60 rounded p-3">
                    <h4 className="font-semibold text-black mb-2">Tier 1 (Grade Level)</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li>• 80%+ on phoneme assessment</li>
                      <li>• 2-3 days per phoneme</li>
                      <li>• Regular classroom instruction</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-3">
                    <h4 className="font-semibold text-black mb-2">Tier 2 (Intervention)</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li>• 50-79% on assessment</li>
                      <li>• 5-7 days per phoneme</li>
                      <li>• Multisensory techniques</li>
                      <li>• Small group instruction</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-3">
                    <h4 className="font-semibold text-black mb-2">Tier 3 (Intensive)</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li>• Below 50% on assessment</li>
                      <li>• 7-10 days per phoneme</li>
                      <li>• 1:1 or very small group</li>
                      <li>• Specialized materials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/40 rounded-lg p-3 border border-amber-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                <h3 className="font-bold text-lg text-black mb-1">Step 3: Progress Monitoring / Weekly assessment protocol:</h3>
                <ul className="list-disc list-inside text-black space-y-1">
                  <li><strong>Making Progress:</strong> Continue current tier placement</li>
                  <li><strong>Struggling:</strong> Move to higher tier or extend timeline</li>
                  <li><strong>Exceeding:</strong> Consider moving to lower tier or acceleration</li>
                  <li><strong>Plateau:</strong> Adjust instructional methods, consider different approach</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-lg p-3 border border-purple-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                <h3 className="font-bold text-lg text-black mb-2">Special Considerations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded p-3">
                    <h4 className="font-semibold text-black mb-2">English Language Learners</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li>• Extra oral language support</li>
                      <li>• Visual/gesture connections</li>
                      <li>• L1 language comparisons</li>
                      <li>• Extended vocabulary focus</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-3">
                    <h4 className="font-semibold text-black mb-2">Advanced Learners</h4>
                    <ul className="text-sm text-black space-y-1">
                      <li>• Accelerated timeline</li>
                      <li>• Complex word patterns</li>
                      <li>• Morphology connections</li>
                      <li>• Independent exploration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}