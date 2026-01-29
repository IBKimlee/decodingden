// Script to check what's in the Supabase database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking database tables and data...\n');
  
  // Check if phonemes table exists and has data
  try {
    const { data: phonemes, error: phonemesError } = await supabase
      .from('phonemes')
      .select('*')
      .limit(10);
    
    if (phonemesError) {
      console.error('Error accessing phonemes table:', phonemesError);
      console.log('The phonemes table may not exist or have access issues.');
    } else {
      console.log(`Found ${phonemes.length} phonemes in database:`);
      phonemes.forEach(p => {
        console.log(`- ${p.phoneme || p.ipa_symbol} (${p.common_name || p.phoneme_id})`);
      });
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }

  // Test a specific search
  console.log('\n--- Testing search for "a" ---');
  try {
    const { data: aResults, error: aError } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme', '/a/');
    
    if (aError) {
      console.error('Error searching for /a/:', aError);
    } else {
      console.log('Results for /a/:', aResults.length > 0 ? aResults[0] : 'Not found');
    }
  } catch (error) {
    console.error('Search error:', error);
  }

  // Check table structure
  console.log('\n--- Testing table structure ---');
  try {
    const { data: sample, error: structError } = await supabase
      .from('phonemes')
      .select('*')
      .limit(1);
    
    if (sample && sample.length > 0) {
      console.log('Table columns:', Object.keys(sample[0]));
    }
  } catch (error) {
    console.error('Structure check error:', error);
  }
}

checkDatabase().catch(console.error);