const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('phonemes')
    .select('id, phoneme_id, stage_id, phoneme, graphemes')
    .limit(10);
  
  if (error) console.error('Error:', error);
  else {
    data.forEach(p => {
      console.log('---');
      console.log('id:', p.id);
      console.log('phoneme_id:', p.phoneme_id);
      console.log('stage_id:', p.stage_id);
      console.log('phoneme:', JSON.stringify(p.phoneme));
      console.log('graphemes:', JSON.stringify(p.graphemes));
    });
  }
}

check();
