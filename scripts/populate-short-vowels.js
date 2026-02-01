// Script to populate Supabase with short vowel phoneme data
// Run with: node scripts/populate-short-vowels.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Short vowel data based on your Category 2
const shortVowelData = [
  {
    phoneme: '/a/',
    phoneme_id: 'short_a',
    common_name: 'short a',
    phoneme_type: 'vowel_short',
    frequency_rank: 5,
    is_voiced: true,
    graphemes: ['a', 'au', 'al'],
    articulation_data: {
      place: 'front',
      manner: 'open',
      voicing: 'voiced',
      teacher_guidance: 'Drop jaw, tongue flat',
      articulation_cues: 'Wide open mouth like saying "apple"',
      student_tips: 'Say "aaa" like at the doctor'
    },
    instructional_sequence: {
      explanations: [
        { content: 'The short a sound is the most common short vowel sound', icon_emoji: '📚' },
        { content: 'It appears in simple CVC words like cat, bat, had', icon_emoji: '💡' }
      ],
      rules: [
        { content: 'Use 〈a〉 for short /a/ in closed syllables', icon_emoji: '📏' },
        { content: 'Short /a/ does not appear at word endings', icon_emoji: '⚠️' }
      ],
      tips: [
        { content: 'Practice with word families: -at, -an, -ap', icon_emoji: '🎯' },
        { content: 'Use hand gesture: pat your lap for short a', icon_emoji: '👋' }
      ]
    },
    research_sources: ['Science of Reading', 'National Reading Panel (2000)'],
    stage_id: 2
  },
  {
    phoneme: '/e/',
    phoneme_id: 'short_e',
    common_name: 'short e',
    phoneme_type: 'vowel_short',
    frequency_rank: 18,
    is_voiced: true,
    graphemes: ['e', 'ea', 'ai', 'a'],
    articulation_data: {
      place: 'front-mid',
      manner: 'mid-open',
      voicing: 'voiced',
      teacher_guidance: 'Slight smile, tongue mid-height',
      articulation_cues: 'Smile slightly, say "eh"',
      student_tips: 'Say "e" like in "egg"'
    },
    instructional_sequence: {
      explanations: [
        { content: 'The short e sound is found in closed syllables', icon_emoji: '📚' },
        { content: 'Common in high-frequency words like bed, red, ten', icon_emoji: '💡' }
      ],
      rules: [
        { content: 'Use 〈e〉 for short /e/ in closed syllables', icon_emoji: '📏' },
        { content: 'Sometimes 〈ea〉 makes short /e/ (bread, head)', icon_emoji: '⚠️' }
      ],
      tips: [
        { content: 'Practice with word families: -et, -en, -ed', icon_emoji: '🎯' },
        { content: 'Use hand gesture: edge hand like cutting', icon_emoji: '👋' }
      ]
    },
    research_sources: ['Science of Reading', 'National Reading Panel (2000)'],
    stage_id: 2
  },
  {
    phoneme: '/i/',
    phoneme_id: 'short_i',
    common_name: 'short i',
    phoneme_type: 'vowel_short',
    frequency_rank: 23,
    is_voiced: true,
    graphemes: ['i', 'y', 'ui', 'e'],
    articulation_data: {
      place: 'front-high',
      manner: 'close-mid',
      voicing: 'voiced',
      teacher_guidance: 'Slight smile, tongue high and forward',
      articulation_cues: 'Quick smile, say "ih"',
      student_tips: 'Say "i" like in "itch"'
    },
    instructional_sequence: {
      explanations: [
        { content: 'The short i sound is a quick, crisp vowel', icon_emoji: '📚' },
        { content: 'Found in CVC words like sit, big, win', icon_emoji: '💡' }
      ],
      rules: [
        { content: 'Use 〈i〉 for short /i/ in closed syllables', icon_emoji: '📏' },
        { content: 'Use 〈y〉 for short /i/ in words like gym, myth', icon_emoji: '⚠️' }
      ],
      tips: [
        { content: 'Practice with word families: -it, -in, -ig', icon_emoji: '🎯' },
        { content: 'Use hand gesture: point to grin/smile', icon_emoji: '👋' }
      ]
    },
    research_sources: ['Science of Reading', 'National Reading Panel (2000)'],
    stage_id: 2
  },
  {
    phoneme: '/o/',
    phoneme_id: 'short_o',
    common_name: 'short o',
    phoneme_type: 'vowel_short',
    frequency_rank: 27,
    is_voiced: true,
    graphemes: ['o', 'a', 'au'],
    articulation_data: {
      place: 'back-mid',
      manner: 'open-mid',
      voicing: 'voiced',
      teacher_guidance: 'Round lips, drop jaw',
      articulation_cues: 'Round mouth like saying "awe"',
      student_tips: 'Say "o" like in "octopus"'
    },
    instructional_sequence: {
      explanations: [
        { content: 'The short o sound requires rounded lips', icon_emoji: '📚' },
        { content: 'Common in words like top, hot, dog', icon_emoji: '💡' }
      ],
      rules: [
        { content: 'Use 〈o〉 for short /o/ in closed syllables', icon_emoji: '📏' },
        { content: 'After w, 〈a〉 often makes /o/ sound (want, wash)', icon_emoji: '⚠️' }
      ],
      tips: [
        { content: 'Practice with word families: -op, -ot, -og', icon_emoji: '🎯' },
        { content: 'Use hand gesture: make O shape with mouth', icon_emoji: '👋' }
      ]
    },
    research_sources: ['Science of Reading', 'National Reading Panel (2000)'],
    stage_id: 2
  },
  {
    phoneme: '/u/',
    phoneme_id: 'short_u',
    common_name: 'short u',
    phoneme_type: 'vowel_short',
    frequency_rank: 28,
    is_voiced: true,
    graphemes: ['u', 'o', 'ou', 'oo', 'a'],
    articulation_data: {
      place: 'central',
      manner: 'mid',
      voicing: 'voiced',
      teacher_guidance: 'Relaxed mouth, neutral position',
      articulation_cues: 'Relaxed "uh" sound',
      student_tips: 'Say "u" like in "up"'
    },
    instructional_sequence: {
      explanations: [
        { content: 'The short u is the most relaxed vowel sound', icon_emoji: '📚' },
        { content: 'Found in words like cup, bug, run', icon_emoji: '💡' }
      ],
      rules: [
        { content: 'Use 〈u〉 for short /u/ in closed syllables', icon_emoji: '📏' },
        { content: '〈o〉 makes /u/ before n, m, v, th (son, come, love)', icon_emoji: '⚠️' }
      ],
      tips: [
        { content: 'Practice with word families: -up, -un, -ug', icon_emoji: '🎯' },
        { content: 'Use hand gesture: pat tummy for "uh"', icon_emoji: '👋' }
      ]
    },
    research_sources: ['Science of Reading', 'National Reading Panel (2000)'],
    stage_id: 2
  }
];

async function populateDatabase() {
  console.log('Starting to populate short vowel phonemes...');
  
  for (const phoneme of shortVowelData) {
    try {
      // Check if phoneme already exists
      const { data: existing, error: checkError } = await supabase
        .from('phonemes')
        .select('*')
        .eq('phoneme', phoneme.phoneme)
        .single();
      
      if (existing) {
        console.log(`Phoneme ${phoneme.phoneme} already exists, updating...`);
        
        // Update existing phoneme
        const { error: updateError } = await supabase
          .from('phonemes')
          .update({
            graphemes: phoneme.graphemes,
            articulation_data: phoneme.articulation_data,
            instructional_sequence: phoneme.instructional_sequence,
            research_sources: phoneme.research_sources
          })
          .eq('phoneme', phoneme.phoneme);
        
        if (updateError) {
          console.error(`Error updating ${phoneme.phoneme}:`, updateError);
        } else {
          console.log(`✅ Updated ${phoneme.phoneme}`);
        }
      } else {
        // Insert new phoneme
        const { error: insertError } = await supabase
          .from('phonemes')
          .insert([phoneme]);
        
        if (insertError) {
          console.error(`Error inserting ${phoneme.phoneme}:`, insertError);
        } else {
          console.log(`✅ Inserted ${phoneme.phoneme}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${phoneme.phoneme}:`, error);
    }
  }
  
  console.log('Database population complete!');
  console.log('You can now search for short vowels like:');
  console.log('- "short a" or "/a/" or "a"');
  console.log('- "short e" or "/e/" or "e"');
  console.log('- "short i" or "/i/" or "i"');
  console.log('- "short o" or "/o/" or "o"');
  console.log('- "short u" or "/u/" or "u"');
}

populateDatabase().catch(console.error);