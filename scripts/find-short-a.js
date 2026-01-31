const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function find() {
  const { data, error } = await supabase
    .from('phonemes')
    .select('id, phoneme_id, stage_id, phoneme, graphemes, content_generation_meta')
    .eq('stage_id', 1);
  
  if (error) console.error('Error:', error);
  else {
    console.log('Stage 1 phonemes:');
    data.forEach(p => {
      console.log('---');
      console.log('id:', p.id);
      console.log('phoneme_id:', p.phoneme_id);
      console.log('phoneme:', p.phoneme);
      console.log('graphemes:', JSON.stringify(p.graphemes));
      if (p.content_generation_meta && p.content_generation_meta.practice_texts) {
        console.log('stories:', JSON.stringify(p.content_generation_meta.practice_texts.stories));
      }
    });
  }
}

find();
