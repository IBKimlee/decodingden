const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function findDuplicatePhonemes() {
  console.log('Searching for phoneme /ər/ records...\n');
  
  try {
    const { data, error } = await supabase
      .from('phonemes')
      .select('id, phoneme, graphemes, stage_id')
      .eq('phoneme', '/ər/');
    
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    
    console.log(`Found ${data.length} records for phoneme /ər/:\n`);
    
    data.forEach((record, index) => {
      console.log(`Record ${index + 1}:`);
      console.log(`  ID: ${record.id}`);
      console.log(`  Phoneme: ${record.phoneme}`);
      console.log(`  Graphemes: ${JSON.stringify(record.graphemes)}`);
      console.log(`  Stage ID: ${record.stage_id}`);
      console.log('');
    });
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

findDuplicatePhonemes();