// Script to find all short vowel phonemes in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function findShortVowels() {
  console.log('Searching for short vowel phonemes...\n');
  
  // Search for phonemes that contain "short" in phoneme_id
  const { data: shortPhonemes, error: shortError } = await supabase
    .from('phonemes')
    .select('*')
    .ilike('phoneme_id', '%short%');
  
  if (shortError) {
    console.error('Error searching for short phonemes:', shortError);
  } else {
    console.log('Found short vowel phonemes:');
    shortPhonemes.forEach(p => {
      console.log(`- ${p.phoneme} (${p.phoneme_id}) - graphemes: [${p.graphemes.join(', ')}]`);
    });
  }
  
  // Also search for common short vowel IPA symbols
  const shortVowelIPA = ['/a/', '/e/', '/i/', '/o/', '/u/'];
  
  console.log('\nSearching by IPA symbols:');
  for (const ipa of shortVowelIPA) {
    const { data: ipaResults, error: ipaError } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme', ipa);
    
    if (ipaError) {
      console.error(`Error searching for ${ipa}:`, ipaError);
    } else if (ipaResults && ipaResults.length > 0) {
      ipaResults.forEach(p => {
        console.log(`- ${p.phoneme} (${p.phoneme_id}) - graphemes: [${p.graphemes.join(', ')}]`);
      });
    } else {
      console.log(`- ${ipa} - NOT FOUND`);
    }
  }
}

findShortVowels().catch(console.error);