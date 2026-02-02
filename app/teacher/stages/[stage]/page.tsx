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

// RESEARCH-VALIDATED Stage 1 Weekly Data - 15 Core Phonemes Only
// Extended to 10 weeks for better mastery and spiral review
const stage1WeeklyData = [
  {
    week: 1,
    phonemes: ['/m/', '/s/', '/a/'],
    graphemes: ['m', 's', 'a'],
    focusWords: ['am', 'Sam', 'as', 'mam', 'sas'],
    decodableText: 'Mam! Sam! Sam can sas, mam!',
    assessment: 'Daily quick check: letter-sound correspondence',
    tips: '/m/ - continuous sound (can be held)\n/s/ - continuous sound (can be held)\n/a/ - clear open vowel articulation'
  },
  {
    week: 2,
    phonemes: ['/t/', '/n/'],
    graphemes: ['t', 'n'],
    focusWords: ['at', 'sat', 'mat', 'man', 'tan'],
    decodableText: 'The man sat. Sam sat. Sam and the man sat on a tan mat.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/t/ - stop sound (quick release)\n/n/ - continuous nasal sound\nContrast stop vs. continuous production'
  },
  {
    week: 3,
    phonemes: ['/p/', '/i/'],
    graphemes: ['p', 'i'],
    focusWords: ['pat', 'pit', 'sip', 'sit', 'tip'],
    decodableText: 'Pat can sit. Tip can sip. I can sit and sip.',
    assessment: 'Daily quick check + dictation (3-5 words)',
    tips: '/p/ - visible bilabial stop\n/i/ - high front vowel\nPractice /i/ vs /a/ discrimination (high front vs. low central vowels)'
  },
  {
    week: 4,
    phonemes: ['/d/', '/f/'],
    graphemes: ['d', 'f'],
    focusWords: ['dad', 'mad', 'sad', 'fat', 'if'],
    decodableText: 'Dad sat. The fat cat is mad. Dad sat.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/d/ - voiced alveolar stop (hand on throat to feel vibration)\n/f/ - voiceless labiodental fricative\nContrast /d/ with voiceless /t/'
  },
  {
    week: 5,
    phonemes: ['/o/', '/l/'],
    graphemes: ['o', 'l'],
    focusWords: ['dot', 'pot', 'lot', 'lap', 'lit'],
    decodableText: 'I sit by the pot a lot. The pot is hot.',
    assessment: 'Daily quick check + word chain activity',
    tips: '/o/ - rounded mid-back vowel\n/l/ - lateral liquid (tongue tip to alveolar ridge)'
  },
  {
    week: 6,
    phonemes: ['/h/', '/b/'],
    graphemes: ['h', 'b'],
    focusWords: ['Bob', 'has', 'hat', 'hot', 'sud', 'dud'],
    decodableText: 'Not the hot hat! It is a dud. Bob has it in the sud.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/h/ - voiceless fricative with aspirated airflow\n/b/ - voiced bilabial stop\n/b/ and /p/ minimal pairs: Practice contrasting voiced/voiceless (bat-pat)'
  },
  {
    week: 7,
    phonemes: ['/e/', '/u/'],
    graphemes: ['e', 'u'],
    focusWords: ['pet', 'hen', 'mud', 'Ben', 'fed', 'sud', 'set', 'tub'],
    decodableText: 'Ben fed the hen. The pet hen is in the mud. Not the mud! Sud in the tub! Hen in the tub! Sud and hen in the tub!',
    assessment: 'Daily quick check + spelling assessment',
    tips: '/e/ - mid-front vowel\n/u/ - high-back rounded vowel\nAll 5 short vowels complete - focus on discrimination practice'
  },
  {
    week: 8,
    phonemes: ['Review Consonants'],
    graphemes: ['Review All Elements'],
    focusWords: ['hot', 'mud', 'pet', 'sit', 'tan', 'lab', 'fun', 'nap', 'big'],
    decodableText: 'The hot sun hit the mud. Ben let his pet sit on the tan mat. The big lab had fun. It had a nap!',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-8',
    tips: 'Review all consonants - focus on challenging sounds for each student'
  },
  {
    week: 9,
    phonemes: ['Review All Vowels'],
    graphemes: ['Review All Elements'],
    focusWords: ['cat', 'sat', 'bed', 'dog', 'dug', 'mud', 'fun', 'hit', 'lap', 'pen', 'log'],
    decodableText: 'The cat sat on the bed to nap. The hen hid in the pen to nap. The dog sat on his lap to nap. Mud, mud, mud on the bed, in the pen, on his lap.',
    assessment: 'Daily quick check: all vowel discrimination practice',
    tips: 'Review all 5 short vowels - use minimal pairs for discrimination'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 1 Elements'],
    focusWords: ['Sam', 'am', 'sat', 'mat', 'man', 'Pat', 'sit', 'sip', 'tip', 'dad', 'mad', 'fat', 'pot', 'hot', 'lot', 'lap', 'hat', 'Bob', 'bat', 'bit', 'bed', 'pet', 'but', 'mud', 'hut'],
    decodableText: 'Sam sat on the mat. His pal Pat had a pet. The pet sat on his lap. Dad sat. Bob sat. Dad and Bob pat the pet.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery! Ready for consonant blends and digraphs!'
  }
];

// RESEARCH-VALIDATED Stage 2 Weekly Data (10 weeks)
// Research-aligned 15 elements: consonants, digraphs & final consonants
// Extended to 10 weeks for better mastery and spiral review
const stage2WeeklyData = [
  {
    week: 1,
    phonemes: ['/r/', '/g/'],
    graphemes: ['r', 'g'],
    focusWords: ['red', 'rag', 'rat', 'got', 'gab', 'gap'],
    decodableText: 'Dad had a red rat. The red rat had a bit of mud.',
    assessment: 'Daily quick check: new consonant recognition',
    tips: '/r/ - clear articulation with tongue tip up\n/g/ - back of tongue touches roof of mouth'
  },
  {
    week: 2,
    phonemes: ['/k/', '/j/'],
    graphemes: ['k', 'c', 'j'],
    focusWords: ['can', 'cat', 'kit', 'cap', 'jam', 'Jim'],
    decodableText: 'Jim had a cap and a can. The cat had a kit and some jam.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/k/ - can be spelled with c or k\n/j/ - always at word beginnings'
  },
  {
    week: 3,
    phonemes: ['/v/'],
    graphemes: ['v'],
    focusWords: ['van', 'vet', 'vat', 'vim', 'Val'],
    decodableText: 'Val the vet had a red van. Val had a cat that sat in the van.',
    assessment: 'Daily quick check: Can student produce /v/ sound correctly and read /v/ words',
    tips: '/v/ - teeth on bottom lip, voiced fricative (continuous sound made with vibration)'
  },
  {
    week: 4,
    phonemes: ['/w/', '/y/'],
    graphemes: ['w', 'y'],
    focusWords: ['wet', 'win', 'was', 'yes', 'yam', 'yet'],
    decodableText: 'Is the yam wet yet? Yes, the yam is wet.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/w/ - round lips and blow air (like blowing out candles)\n/y/ - tongue touches roof of mouth, used as a consonant at the beginning of words'
  },
  {
    week: 5,
    phonemes: ['/z/', '/x/'],
    graphemes: ['z', 'x'],
    focusWords: ['zip', 'zap', 'zag', 'fox', 'box', 'mix'],
    decodableText: 'The fox is in the box. Zip, zap, zag — what a mix!',
    assessment: 'Daily quick check: /z/ and /ks/ sounds',
    tips: '/z/ - voiced version of /s/\n/x/ - represents two sounds /k/+/s/'
  },
  {
    week: 6,
    phonemes: ['/kw/'],
    graphemes: ['qu'],
    focusWords: ['quit', 'quiz', 'quip', 'quest'],
    decodableText: 'I quit the quest. I had a quiz.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/qu/ - always together, represents /kw/ sound'
  },
  {
    week: 7,
    phonemes: ['/ch/', '/sh/'],
    graphemes: ['ch', 'sh'],
    focusWords: ['chip', 'Chad', 'chat', 'shop', 'fish', 'dish'],
    decodableText: 'Chip and Chad had fish on a dish at the shop.',
    assessment: 'Daily quick check: first digraphs',
    tips: '/ch/ - two letters make one sound\n/sh/ - two letters make one sound\nTwo letters that make one sound are called digraphs'
  },
  {
    week: 8,
    phonemes: ['/th/', '/th/'],
    graphemes: ['th', 'th'],
    focusWords: ['thin', 'math', 'path'],
    decodableText: 'A thin path. Math is fun.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: '/th/ - voiceless, tongue between teeth\n/th/ - voiced, tongue between teeth\nSame spelling, different sounds'
  },
  {
    week: 9,
    phonemes: ['/ng/'],
    graphemes: ['ng'],
    focusWords: ['ring', 'sing', 'long', 'king', 'hang', 'wing'],
    decodableText: 'The king can sing a long song. Hang the ring on the wing.',
    assessment: 'Daily quick check: final consonant digraph',
    tips: '/ng/ - only at end of words or syllables, never at beginning'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 2 Elements'],
    focusWords: ['strong', 'spring', 'church', 'fresh', 'quickly', 'thinking'],
    decodableText: 'The strong spring church is fresh. We are quickly thinking about the long path.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery! Ready for silent e and complex consonants!'
  }
];

// FRY+NRP+EHRI Stage 3 Weekly Data (10 weeks)
// Consonant Digraphs - 1st Grade Fall - "Two letters, one sound"
const stage3WeeklyData = [
  {
    week: 1,
    phonemes: ['/th/'],
    graphemes: ['th'],
    focusWords: ['thin', 'math', 'path', 'with', 'both', 'cloth'],
    decodableText: 'The thin math book is on the path. Both kids put cloth with it.',
    assessment: 'Daily quick check: voiceless th recognition',
    tips: '/th/ - tongue between teeth, two letters make ONE sound'
  },
  {
    week: 2,
    phonemes: ['/sh/'],
    graphemes: ['sh'],
    focusWords: ['shop', 'fish', 'dish', 'rush', 'fresh', 'splash'],
    decodableText: 'Rush to the shop for fresh fish. Put it in the dish with a splash.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/sh/ - sounds like "shh", continuous sound you can stretch'
  },
  {
    week: 3,
    phonemes: ['/ng/'],
    graphemes: ['ng'],
    focusWords: ['ring', 'sing', 'long', 'hang', 'king', 'strong'],
    decodableText: 'The strong king can sing a long song. Hang the ring up.',
    assessment: 'Daily quick check: ng at word endings',
    tips: '/ng/ - only comes at the end of words or syllables'
  },
  {
    week: 4,
    phonemes: ['/ch/'],
    graphemes: ['ch'],
    focusWords: ['chip', 'chat', 'much', 'lunch', 'bench', 'church'],
    decodableText: 'Much fun to chat at lunch. Sit on the bench by the church with a chip.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/ch/ - can come at beginning, middle, or end of words'
  },
  {
    week: 5,
    phonemes: ['/qu/'],
    graphemes: ['qu'],
    focusWords: ['quit', 'quick', 'queen', 'quiet', 'quack', 'quest'],
    decodableText: 'The quick queen went on a quiet quest. The duck can quack but must quit.',
    assessment: 'Daily quick check: qu always together',
    tips: '/qu/ - q and u are always together, sounds like /kw/'
  },
  {
    week: 6,
    phonemes: ['/TH/'],
    graphemes: ['th'],
    focusWords: ['the', 'they', 'then', 'this', 'that', 'there'],
    decodableText: 'They went there with this and that. Then the dog ran to them.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/TH/ - same spelling as voiceless th, but voice box vibrates'
  },
  {
    week: 7,
    phonemes: ['/wh/'],
    graphemes: ['wh'],
    focusWords: ['when', 'what', 'where', 'which', 'while', 'white'],
    decodableText: 'When will you tell me what and where? Which white dog ran while we chat?',
    assessment: 'Daily quick check: question words',
    tips: '/wh/ - most wh words are question words'
  },
  {
    week: 8,
    phonemes: ['/f/'],
    graphemes: ['ph'],
    focusWords: ['phone', 'graph', 'photo', 'elephant', 'alphabet', 'dolphin'],
    decodableText: 'The elephant is in the photo. Use the phone to call about the graph and alphabet.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: '/f/ - ph makes /f/ sound\nOften in Greek origin words'
  },
  {
    week: 9,
    phonemes: ['Review All Digraphs'],
    graphemes: ['Review All Elements'],
    focusWords: ['something', 'fishing', 'nothing', 'watching'],
    decodableText: 'Nothing is better than fishing and watching something splash in the fresh water.',
    assessment: 'Daily quick check: mixed digraph practice',
    tips: 'Review all digraphs - two letters, one sound'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 3 Elements'],
    focusWords: ['everything', 'somewhere', 'anything', 'nowhere'],
    decodableText: 'Everything we need is somewhere. We have nothing to worry about anywhere.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of consonant digraphs!'
  }
];

// FRY+NRP+EHRI Stage 4 Weekly Data (10 weeks)
// Long Vowels with Silent E - 1st Grade Spring - "Magic E"
const stage4WeeklyData = [
  {
    week: 1,
    phonemes: ['/ā/'],
    graphemes: ['a_e'],
    focusWords: ['make', 'cake', 'take', 'name', 'game', 'same'],
    decodableText: 'Jake will make a cake. We can take the same name for the game.',
    assessment: 'Daily quick check: a_e pattern recognition',
    tips: '/ā/ - magic e makes the a say its name\nChanges from short /a/ to long /ā/'
  },
  {
    week: 2,
    phonemes: ['/ī/'],
    graphemes: ['i_e'],
    focusWords: ['bike', 'time', 'ride', 'like', 'fine', 'nine'],
    decodableText: 'Mike will ride his bike at nine. That is a fine time. I like it.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/ī/ - magic e makes the i say its name\nChanges from short /i/ to long /ī/'
  },
  {
    week: 3,
    phonemes: ['/ō/'],
    graphemes: ['o_e'],
    focusWords: ['home', 'bone', 'nose', 'hope', 'note', 'rope'],
    decodableText: 'I hope to go home. The dog has a bone by his nose. Write a note about the rope.',
    assessment: 'Daily quick check: o_e pattern practice',
    tips: '/ō/ - magic e makes the o say its name\nChanges from short /o/ to long /ō/'
  },
  {
    week: 4,
    phonemes: ['/ū/'],
    graphemes: ['u_e'],
    focusWords: ['cute', 'use', 'tube', 'huge', 'rude', 'June'],
    decodableText: 'The cute puppy will use the huge tube in June. Do not be rude.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/ū/ - magic e makes the u say its name\nChanges from short /u/ to long /ū/'
  },
  {
    week: 5,
    phonemes: ['/ē/'],
    graphemes: ['e_e'],
    focusWords: ['these', 'Pete', 'theme', 'compete', 'complete', 'delete'],
    decodableText: 'These kids will compete with Pete. The theme is complete. Do not delete it.',
    assessment: 'Daily quick check: e_e pattern recognition',
    tips: '/ē/ - magic e makes the e say its name\nChanges from short /e/ to long /ē/'
  },
  {
    week: 6,
    phonemes: ['Silent e'],
    graphemes: ['_e'],
    focusWords: ['make', 'bike', 'home', 'cute', 'these', 'quite'],
    decodableText: 'I quite like to make things at home. Bike there and use these.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: 'Silent e - changes the vowel sound but stays quiet\nAll VCe patterns create long vowel sounds'
  },
  {
    week: 7,
    phonemes: ['Long vowel sounds'],
    graphemes: ['VCe'],
    focusWords: ['snake', 'white', 'stone', 'flute', 'theme', 'brave'],
    decodableText: 'The brave white snake saw a stone flute. It had a shine like a globe.',
    assessment: 'Daily quick check: mixed VCe practice',
    tips: 'Long vowel sounds - review all VCe patterns\nPractice with longer words'
  },
  {
    week: 8,
    phonemes: ['Long Vowels vs Short Vowels'],
    graphemes: ['Review VCe vs CVC'],
    focusWords: ['mad/made', 'cap/cape', 'kit/kite', 'hop/hope', 'cut/cute'],
    decodableText: 'Tim was mad but then made a cape. The kit became a kite. We hop with hope.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: 'Long vs Short Vowels - compare with and without magic e\nMinimal pairs help show the difference'
  },
  {
    week: 9,
    phonemes: ['Review Long Vowels'],
    graphemes: ['Review All VCe'],
    focusWords: ['surprise', 'complete', 'invite', 'suppose', 'extreme'],
    decodableText: 'The complete surprise was extreme. Suppose we invite them to compete.',
    assessment: 'Daily quick check: multisyllabic VCe words',
    tips: 'Review Long Vowels - VCe patterns work in longer words too'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 4 Elements'],
    focusWords: ['celebrate', 'telephone', 'complete', 'athlete', 'concrete'],
    decodableText: 'The athlete will celebrate with a telephone call. The concrete work is complete.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of magic e patterns!'
  }
];

// FRY+NRP+EHRI Stage 5 Weekly Data (10 weeks)
// High-Frequency Vowel Teams - 2nd Grade Fall
const stage5WeeklyData = [
  {
    week: 1,
    phonemes: ['/ər/'],
    graphemes: ['er'],
    focusWords: ['her', 'fern', 'term', 'tiger', 'sister', 'water'],
    decodableText: 'Her sister gave water to the tiger by the fern. The term is over.',
    assessment: 'Daily quick check: er pattern recognition',
    tips: '/ər/ - highest frequency vowel team (Fry: 1,979)\nControlled vowel sound'
  },
  {
    week: 2,
    phonemes: ['/ē/'],
    graphemes: ['ee'],
    focusWords: ['tree', 'see', 'green', 'feet', 'sleep', 'keep'],
    decodableText: 'I see a green tree. Keep your feet still and sleep deep.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/ē/ - ee is very reliable (Fry: 249)\nAlmost always says /ē/'
  },
  {
    week: 3,
    phonemes: ['/ē/'],
    graphemes: ['ea'],
    focusWords: ['eat', 'read', 'team', 'beach', 'clean', 'dream'],
    decodableText: 'The team will eat and read at the beach. Clean up and dream.',
    assessment: 'Daily quick check: ea pattern recognition',
    tips: '/ē/ - ea is high frequency (Fry: 245)\nCan vary but teach /ē/ first'
  },
  {
    week: 4,
    phonemes: ['/ā/'],
    graphemes: ['ai'],
    focusWords: ['rain', 'train', 'main', 'wait', 'paint', 'chain'],
    decodableText: 'Wait for the rain. The train is on the main track. Paint the chain.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/ā/ - ai always in middle of words (Fry: 208)\nVery consistent pattern'
  },
  {
    week: 5,
    phonemes: ['/ā/'],
    graphemes: ['ay'],
    focusWords: ['play', 'day', 'stay', 'way', 'say', 'may'],
    decodableText: 'May I play all day? Stay this way and say what you may.',
    assessment: 'Daily quick check: ai vs ay position rule',
    tips: '/ā/ - ay at word end (Fry: 131)\nPosition rule with ai'
  },
  {
    week: 6,
    phonemes: ['/ō/'],
    graphemes: ['oa'],
    focusWords: ['boat', 'coat', 'road', 'goat', 'soap', 'float'],
    decodableText: 'The goat in a coat is on the boat. The soap will float down the road.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/ō/ - oa very consistent (Fry: 126)\nAlways in middle of words'
  },
  {
    week: 7,
    phonemes: ['/ō/'],
    graphemes: ['ow'],
    focusWords: ['snow', 'grow', 'show', 'yellow', 'window', 'follow'],
    decodableText: 'The yellow snow will grow. Show me the window and follow.',
    assessment: 'Daily quick check: ow variability introduction',
    tips: '/ō/ - ow can say /ō/ (snow) or /ow/ (cow)\nTeach /ō/ first'
  },
  {
    week: 8,
    phonemes: ['/ar/'],
    graphemes: ['ar'],
    focusWords: ['car', 'star', 'park', 'farm', 'start', 'shark'],
    decodableText: 'Start the car and park at the farm. The star is far from the shark.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: '/ar/ - very consistent (Fry: 474)\nAlways says /ar/'
  },
  {
    week: 9,
    phonemes: ['Review Vowel Teams'],
    graphemes: ['Review All Elements'],
    focusWords: ['teacher', 'freedom', 'birthday', 'railway', 'everywhere'],
    decodableText: 'The teacher has freedom. The birthday railway goes everywhere we dream.',
    assessment: 'Daily quick check: mixed vowel team practice',
    tips: 'Review Vowel Teams - highest frequency patterns\ner, ee, ea, ai, ay'
  },
  {
    week: 10,
    phonemes: ['All Vowel Teams'],
    graphemes: ['All Stage 5 Elements'],
    focusWords: ['railroad', 'teamwork', 'seashore', 'anywhere', 'somewhere'],
    decodableText: 'The railroad teamwork at the seashore can go anywhere or somewhere.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of high-frequency vowel teams!'
  }
];


// FRY+NRP+EHRI Stage 6 Weekly Data (10 weeks)
// R-Controlled & Diphthongs - 2nd Grade Spring
const stage6WeeklyData = [
  {
    week: 1,
    phonemes: ['/or/'],
    graphemes: ['or'],
    focusWords: ['for', 'short', 'corn', 'storm', 'horse', 'north'],
    decodableText: 'The short horse ran north in the storm for corn.',
    assessment: 'Daily quick check: or pattern recognition',
    tips: '/or/ - very consistent (Fry: 321)\nAlways says /or/'
  },
  {
    week: 2,
    phonemes: ['/ər/'],
    graphemes: ['ir'],
    focusWords: ['bird', 'girl', 'first', 'shirt', 'dirt', 'third'],
    decodableText: 'The girl saw a bird first. The shirt has dirt from third place.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/ər/ - ir sounds like er (Fry: 104)\nSame /ər/ sound'
  },
  {
    week: 3,
    phonemes: ['/ər/'],
    graphemes: ['ur'],
    focusWords: ['turn', 'hurt', 'nurse', 'burn', 'church', 'purple'],
    decodableText: 'Turn to the nurse if you hurt or burn. The purple church is there.',
    assessment: 'Daily quick check: ur pattern practice',
    tips: '/ər/ - ur sounds like er and ir (Fry: 234)\nAll three say /ər/'
  },
  {
    week: 4,
    phonemes: ['/ou/'],
    graphemes: ['ou'],
    focusWords: ['out', 'house', 'cloud', 'about', 'found', 'sound'],
    decodableText: 'The sound came out of the house. I found a cloud about there.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4', 
    tips: '/ou/ - can vary (Fry: 227)\nBut /ou/ is most common'
  },
  {
    week: 5,
    phonemes: ['/aw/'],
    graphemes: ['au'],
    focusWords: ['haul', 'cause', 'autumn', 'because', 'author', 'caught'],
    decodableText: 'The author was caught in autumn because we haul for a cause.',
    assessment: 'Daily quick check: au diphthong recognition',
    tips: '/aw/ - au pattern (Fry: 146)\nMouth glides in diphthong'
  },
  {
    week: 6,
    phonemes: ['/oi/'],
    graphemes: ['oi'],
    focusWords: ['oil', 'boil', 'coin', 'point', 'voice', 'choice'],
    decodableText: 'Point to the coin in the oil. I hear a voice. That is my choice.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/oi/ - always in middle of words (Fry: 92)\nMouth glides from /o/ to /i/'
  },
  {
    week: 7,
    phonemes: ['/aw/'],
    graphemes: ['aw'],
    focusWords: ['saw', 'draw', 'claw', 'lawn', 'dawn', 'hawk'],
    decodableText: 'I saw a hawk draw with its claw on the lawn at dawn.',
    assessment: 'Daily quick check: au vs aw comparison',
    tips: '/aw/ - at word end (Fry: 75)\nSame sound as au'
  },
  {
    week: 8,
    phonemes: ['/oi/'],
    graphemes: ['oy'],
    focusWords: ['boy', 'toy', 'joy', 'enjoy', 'destroy', 'employ'],
    decodableText: 'The boy will enjoy his toy with joy. Do not destroy or employ it.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: '/oi/ - oy at word end (Fry: 48)\nSame sound as oi, position rule'
  },
  {
    week: 9,
    phonemes: ['Review R-Controlled Vowels'],
    graphemes: ['Review All Elements'],
    focusWords: ['birthday', 'purple', 'morning', 'circus', 'turkey'],
    decodableText: 'The purple turkey was at the circus for a birthday morning.',
    assessment: 'Daily quick check: mixed r-controlled practice',
    tips: 'Review R-Controlled Vowels - or, ir, ur\nir and ur sound like er'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 6 Elements'],
    focusWords: ['important', 'turmoil', 'joyful', 'because', 'author'],
    decodableText: 'The joyful author wrote about important turmoil because of choice.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of r-controlled vowels and diphthongs!'
  }
];

// FRY+NRP+EHRI Stage 7 Weekly Data (10 weeks)
// Complex Vowel Patterns - 3rd Grade Fall
const stage7WeeklyData = [
  {
    week: 1,
    phonemes: ['/oo/ long'],
    graphemes: ['oo'],
    focusWords: ['moon', 'soon', 'food', 'cool', 'boot', 'zoo'],
    decodableText: 'The moon will be seen soon. Cool food at the zoo. Put on your boot.',
    assessment: 'Daily quick check: long oo pattern',
    tips: '/oo/ long - as in moon (Fry: 173)\nHigher frequency than short oo'
  },
  {
    week: 2,
    phonemes: ['/oo/ short'],
    graphemes: ['oo'],
    focusWords: ['book', 'look', 'good', 'cook', 'foot', 'took'],
    decodableText: 'Look in the good book. The cook took his foot and stood.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: '/oo/ short - as in book (Fry: 114)\nTeach flexibility with oo'
  },
  {
    week: 3,
    phonemes: ['/ī/'],
    graphemes: ['igh'],
    focusWords: ['light', 'night', 'right', 'bright', 'sight', 'flight'],
    decodableText: 'The bright light at night is right. We might take a flight if the sight is good.',
    assessment: 'Daily quick check: igh pattern recognition',
    tips: '/ī/ - igh pattern (Fry: 88)\nThree letters, one sound'
  },
  {
    week: 4,
    phonemes: ['/ū/'],
    graphemes: ['ew'],
    focusWords: ['new', 'few', 'grew', 'flew', 'drew', 'threw'],
    decodableText: 'A few new birds grew and flew. They drew and threw things.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: '/ū/ - ew pattern (Fry: 60)\nUsually at word end'
  },
  {
    week: 5,
    phonemes: ['/ē/'],
    graphemes: ['ie'],
    focusWords: ['field', 'piece', 'believe', 'achieve', 'relief', 'brief'],
    decodableText: 'I believe the piece in the field will achieve relief. It was brief.',
    assessment: 'Daily quick check: ie variable pattern',
    tips: '/ē/ - ie can say /ē/ (field) or /ī/ (pie)\nTeach /ē/ first (Fry: 62)'
  },
  {
    week: 6,
    phonemes: ['/ū/'],
    graphemes: ['ue'],
    focusWords: ['blue', 'true', 'glue', 'clue', 'due', 'value'],
    decodableText: 'The true blue clue is due. The value of glue is clear.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: '/ū/ - ue pattern (Fry: 27)\nLess common pattern'
  },
  {
    week: 7,
    phonemes: ['/s/'],
    graphemes: ['c'],
    focusWords: ['city', 'ice', 'face', 'place', 'race', 'space'],
    decodableText: 'The race took place in the city. We saw ice in space by your face.',
    assessment: 'Daily quick check: soft c before e, i, y',
    tips: '/s/ - soft c before e, i, y\nImportant spelling rule'
  },
  {
    week: 8,
    phonemes: ['/j/'],
    graphemes: ['g'],
    focusWords: ['gem', 'giant', 'age', 'stage', 'huge', 'change'],
    decodableText: 'The huge giant found a gem on stage. The age will change.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: '/j/ - soft g before e, i, y\nParallel to soft c rule'
  },
  {
    week: 9,
    phonemes: ['Review Complex Vowels'],
    graphemes: ['Review All Elements'],
    focusWords: ['moonlight', 'newspaper', 'rightful', 'bluebird', 'football'],
    decodableText: 'The rightful bluebird read the newspaper by moonlight after football.',
    assessment: 'Daily quick check: mixed complex pattern practice',
    tips: 'Review Complex Vowels - variable and complex patterns'
  },
  {
    week: 10,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 7 Elements'],
    focusWords: ['beautiful', 'thoughtful', 'neighborhood', 'breakthrough', 'viewpoint'],
    decodableText: 'The beautiful neighborhood had a thoughtful breakthrough at the viewpoint.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of complex vowel patterns!'
  }
];

// FRY+NRP+EHRI Stage 8 Weekly Data (10 weeks)
// Advanced Patterns & Morphology - 3rd Grade Spring
const stage8WeeklyData = [
  {
    week: 1,
    phonemes: ['silent k'],
    graphemes: ['kn'],
    focusWords: ['knee', 'know', 'knife', 'knock', 'knight', 'knot'],
    decodableText: 'I know the knight will knock his knee with a knife. Tie a knot.',
    assessment: 'Daily quick check: silent k recognition',
    tips: 'silent k - in kn pattern (Fry: 41)\nk is silent but helps with meaning'
  },
  {
    week: 2,
    phonemes: ['silent w'],
    graphemes: ['wr'],
    focusWords: ['write', 'wrong', 'wrist', 'wrap', 'wreck', 'wrote'],
    decodableText: 'Write the wrong word on your wrist. Wrap the wreck that I wrote.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 1-2',
    tips: 'silent w - in wr pattern (Fry: 48)\nw is silent but helps with meaning'
  },
  {
    week: 3,
    phonemes: ['silent b'],
    graphemes: ['mb'],
    focusWords: ['lamb', 'thumb', 'climb', 'comb', 'bomb', 'tomb'],
    decodableText: 'The lamb will climb and comb its thumb. The bomb is in the tomb.',
    assessment: 'Daily quick check: silent b recognition',
    tips: 'silent b - in mb pattern (Fry: 27)\nb is silent at word end'
  },
  {
    week: 4,
    phonemes: ['silent letters'],
    graphemes: ['lk', 'lm', 'gn'],
    focusWords: ['walk', 'calm', 'sign', 'talk', 'palm', 'design'],
    decodableText: 'Walk and talk in a calm way. Sign your name and design with your palm.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 3-4',
    tips: 'silent letters - multiple patterns\nlk, lm, gn'
  },
  {
    week: 5,
    phonemes: ['schwa /ə/'],
    graphemes: ['a', 'e', 'o'],
    focusWords: ['about', 'taken', 'lemon', 'away', 'alone', 'suppose'],
    decodableText: 'Suppose the lemon was taken away. I was about to be alone.',
    assessment: 'Daily quick check: schwa sound recognition',
    tips: 'schwa /ə/ - unstressed vowel\nVery high frequency in English'
  },
  {
    week: 6,
    phonemes: ['prefix un-'],
    graphemes: ['un-'],
    focusWords: ['undo', 'unfair', 'unhappy', 'unlock', 'unpack', 'untie'],
    decodableText: 'It is unfair to be unhappy. Undo, unlock, unpack, and untie.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 5-6',
    tips: 'prefix un- - most common prefix\nMeans "not" or "opposite"'
  },
  {
    week: 7,
    phonemes: ['suffix -ing'],
    graphemes: ['-ing'],
    focusWords: ['running', 'jumping', 'playing', 'reading', 'writing', 'thinking'],
    decodableText: 'I am running, jumping, and playing. We are reading, writing, and thinking.',
    assessment: 'Daily quick check: -ing suffix recognition',
    tips: 'suffix -ing - most common suffix\nShows ongoing action'
  },
  {
    week: 8,
    phonemes: ['suffix -ed'],
    graphemes: ['-ed'],
    focusWords: ['played', 'jumped', 'walked', 'wanted', 'needed', 'started'],
    decodableText: 'We played and jumped. I walked when I wanted, needed, and started.',
    assessment: 'CHECKPOINT: Formal assessment of weeks 7-8',
    tips: 'suffix -ed - shows past action\nCan sound like /t/, /d/, or /əd/'
  },
  {
    week: 9,
    phonemes: ['Review Silent Letters'],
    graphemes: ['Review All Elements'],
    focusWords: ['know', 'write', 'lamb', 'walk', 'calm', 'sign', 'design', 'knight'],
    decodableText: 'I know the knight will write and design a calm sign. Walk to the lamb.',
    assessment: 'Daily quick check: intensive silent letter practice',
    tips: 'Review Silent Letters - extensive visual memory practice\nFocus on kn, wr, mb patterns'
  },
  {
    week: 10,
    phonemes: ['Review Morphology'],
    graphemes: ['Review All Elements'],
    focusWords: ['unfinished', 'unwrapping', 'unlocked', 'unexpected', 'understanding'],
    decodableText: 'The unfinished unwrapping was unexpected. Understanding means unlocked thinking.',
    assessment: 'Daily quick check: morphology consolidation',
    tips: 'Review Morphology - prefixes and suffixes\nBuilding word meaning in complex words'
  },
  {
    week: 11,
    phonemes: ['Integrated Practice'],
    graphemes: ['Review All Elements'],
    focusWords: ['unknowing', 'writing', 'designed', 'walking', 'thoughtful', 'climbing'],
    decodableText: 'The unknowing writer was walking and climbing while designing thoughtful work.',
    assessment: 'Daily quick check: combined advanced patterns',
    tips: 'Integrated Practice - all Stage 8 concepts\nSilent letters, schwa, and morphology'
  },
  {
    week: 12,
    phonemes: ['Mastery Check All'],
    graphemes: ['All Stage 8 Elements'],
    focusWords: ['unknowingly', 'understanding', 'thoughtfully', 'designed', 'writing', 'walking'],
    decodableText: 'Unknowingly, the thoughtful understanding was designed for writing and walking.',
    assessment: 'END-OF-STAGE COMPREHENSIVE ASSESSMENT',
    tips: 'Celebrate mastery of advanced patterns and morphology! Ready for 4th grade!'
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
  
  // Stage data state (from TypeScript)
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [loading, setLoading] = useState(true);

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
    
    // Page 1 - Teacher Resource Page
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, 210, 30, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Stage ${stageNumber} - Week ${weekNumber} Resources`, 105, 20, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text(stageInfo?.name || 'Phonics Stage', 105, 28, { align: 'center' });
    
    // Teacher Section Header
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Teacher Guide', 20, 45);
    
    // This Week's Focus
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 50, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('This Week\'s Focus', 20, 55);
    
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text(`Phonemes: ${weekData.phonemes.join(', ')}`, 20, 65);
    pdf.text(`Graphemes: ${weekData.graphemes.join(', ')}`, 20, 72);
    
    // Teaching Tips
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 80, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Teaching Tips', 20, 85);
    
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const tips = weekData.tips.split('\n');
    let yPos = 95;
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

            {/* Grid View */}
            {viewMode === 'timeline' && (
              <div className={`flex flex-wrap justify-center max-w-full mx-auto px-1 ${stageNumber === 8 ? 'gap-4' : 'gap-8'}`}>
                {weeklyData.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setSelectedWeek(week.week)}
                    className={`rounded-lg shadow-md px-2 pb-2 pt-px border-2 border-cyan-400 text-center transition-all duration-300 transform hover:scale-150 hover:z-20 hover:shadow-xl relative overflow-hidden ${
                      selectedWeek === week.week 
                        ? 'ring-2 ring-cyan-400 border-cyan-400' 
                        : 'border-cyan-400 hover:border-cyan-300'
                    }`}
                    style={{ 
                      width: '100px', 
                      height: '240px',
                      background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div className="h-6 flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700">Week {week.week}</span>
                      {(week.assessment.includes('CHECKPOINT') || week.assessment.includes('ASSESSMENT')) && (
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
                      <div className="h-16 flex flex-col gap-0.5 justify-start mt-1">
                        {week.graphemes.map((grapheme, idx) => (
                          <span key={idx} className={`bg-blue-100 border border-blue-400 px-1.5 py-0.5 rounded-md text-xs font-semibold text-center leading-tight shadow-sm ${
                            ['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : 'text-blue-800'
                          }`}>
                            {grapheme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                  </button>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {weeklyData.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setSelectedWeek(week.week)}
                    className={`w-full rounded-lg shadow-md p-6 hover:shadow-lg transition-all text-left border-2 border-cyan-400 ${
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
                          <div className="flex items-baseline">
                            <span className="text-black/70">Graphemes:</span>
                            <span className="ml-2 font-medium">
                              {week.graphemes.map((grapheme, idx) => (
                                <span key={idx} className={['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : 'text-black'}>
                                  {grapheme}{idx < week.graphemes.length - 1 ? ', ' : ''}
                                </span>
                              ))}
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
                      </div>
                      {(week.assessment.includes('CHECKPOINT') || week.assessment.includes('ASSESSMENT')) && (
                        <span className="ml-4 px-3 py-1 bg-dustyRose/20 text-dustyRose text-sm rounded font-medium">
                          Assessment
                        </span>
                      )}
                    </div>
                  </button>
                ))}
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
                                week.phonemes.map((phoneme, i) => (
                                  <div key={i} className="flex items-center justify-start min-w-0">
                                    <span className={`text-lg font-bold w-12 text-left font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>{phoneme}</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-left ${
                                      stageNumber === 1 ? (['a', 'e', 'i', 'o', 'u'].includes(week.graphemes[i]?.toLowerCase()) ? 'text-red-600' : 'text-slate-800') : 'text-pineShadow'
                                    }`}>{week.graphemes[i]}</span>
                                  </div>
                                ))
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
                            {week.tips.split('\n').map((tip, index) => (
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