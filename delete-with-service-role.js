const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Use service role key for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteDuplicatePhoneme() {
  const idToDelete = '27bab064-7a4f-4836-91ed-1811073535c4';
  
  console.log(`Attempting to delete phoneme record with ID: ${idToDelete}`);
  console.log('Using service role key for elevated permissions\n');
  
  try {
    // Delete the record using service role
    const { data, error: deleteError, count } = await supabase
      .from('phonemes')
      .delete()
      .eq('id', idToDelete)
      .select();
    
    if (deleteError) {
      console.error('Error deleting record:', deleteError);
      console.error('Error details:', JSON.stringify(deleteError, null, 2));
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Record successfully deleted!');
      console.log('Deleted record details:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('⚠️  No record was deleted. The record might not exist or is already deleted.');
    }
    
    // Verify deletion
    console.log('\nVerifying deletion...');
    const { data: remainingData, error: remainingError } = await supabase
      .from('phonemes')
      .select('id, phoneme, graphemes, stage_id')
      .eq('phoneme', '/ər/');
    
    if (remainingError) {
      console.error('Error checking remaining records:', remainingError);
      return;
    }
    
    console.log(`\nRemaining /ər/ records: ${remainingData.length}`);
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