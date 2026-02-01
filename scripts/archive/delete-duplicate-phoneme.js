const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteDuplicatePhoneme() {
  const idToDelete = '27bab064-7a4f-4836-91ed-1811073535c4';
  
  console.log(`Attempting to delete phoneme record with ID: ${idToDelete}\n`);
  
  try {
    // First, let's verify the record exists
    const { data: checkData, error: checkError } = await supabase
      .from('phonemes')
      .select('id, phoneme, graphemes, stage_id')
      .eq('id', idToDelete)
      .single();
    
    if (checkError) {
      console.error('Error checking record:', checkError);
      return;
    }
    
    console.log('Record to be deleted:');
    console.log(`  ID: ${checkData.id}`);
    console.log(`  Phoneme: ${checkData.phoneme}`);
    console.log(`  Graphemes: ${JSON.stringify(checkData.graphemes)}`);
    console.log(`  Stage ID: ${checkData.stage_id}`);
    console.log('');
    
    // Now delete the record
    const { error: deleteError } = await supabase
      .from('phonemes')
      .delete()
      .eq('id', idToDelete);
    
    if (deleteError) {
      console.error('Error deleting record:', deleteError);
      return;
    }
    
    console.log('✅ Record successfully deleted!\n');
    
    // Verify deletion by checking remaining /ər/ records
    const { data: remainingData, error: remainingError } = await supabase
      .from('phonemes')
      .select('id, phoneme, graphemes, stage_id')
      .eq('phoneme', '/ər/');
    
    if (remainingError) {
      console.error('Error checking remaining records:', remainingError);
      return;
    }
    
    console.log(`Remaining /ər/ records: ${remainingData.length}`);
    remainingData.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log(`  ID: ${record.id}`);
      console.log(`  Phoneme: ${record.phoneme}`);
      console.log(`  Graphemes: ${JSON.stringify(record.graphemes)}`);
      console.log(`  Stage ID: ${record.stage_id}`);
    });
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

deleteDuplicatePhoneme();