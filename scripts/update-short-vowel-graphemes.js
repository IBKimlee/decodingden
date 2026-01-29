// Script to add missing graphemes to short vowel phonemes
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Complete grapheme data for short vowels from Category 2
// Only update phonemes that need additional graphemes
const shortVowelGraphemes = {
  '/a/': ['a', 'au', 'al'],         // currently has: [a] - needs au, al
  '/e/': ['e', 'ea', 'ai', 'a'],    // currently has: [e] - needs ea, ai, a  
  // '/i/' already complete with [i, y, ui, e] - skip
  '/o/': ['o', 'a', 'au'],          // currently has: [o] - needs a, au
  '/u/': ['u', 'o', 'ou', 'oo', 'a'] // currently has: [u] - needs o, ou, oo, a
};

async function updateGraphemes() {
  console.log('Updating short vowel graphemes...');
  
  for (const [phoneme, graphemes] of Object.entries(shortVowelGraphemes)) {
    try {
      console.log(`\nUpdating ${phoneme} with graphemes:`, graphemes);
      
      // First check if the phoneme exists
      const { data: checkData, error: checkError } = await supabase
        .from('phonemes')
        .select('*')
        .eq('phoneme', phoneme);
        
      if (checkError) {
        console.error(`Error checking ${phoneme}:`, checkError);
        continue;
      }
      
      if (!checkData || checkData.length === 0) {
        console.log(`⚠️ No phoneme found for ${phoneme}`);
        continue;
      }
      
      console.log(`Found phoneme ${phoneme} with current graphemes:`, checkData[0].graphemes);

      // Update the phoneme record
      const { data, error } = await supabase
        .from('phonemes')
        .update({
          graphemes: graphemes
        })
        .eq('phoneme', phoneme)
        .select();
      
      if (error) {
        console.error(`Error updating ${phoneme}:`, error);
      } else if (data && data.length > 0) {
        console.log(`✅ Updated ${phoneme} with ${graphemes.length} graphemes`);
        console.log(`New graphemes:`, data[0].graphemes);
      } else {
        console.log(`⚠️ Update returned no data for ${phoneme}`);
      }
    } catch (error) {
      console.error(`Error processing ${phoneme}:`, error);
    }
  }
  
  console.log('\n✅ Grapheme update complete!');
  console.log('Short vowels now have their complete grapheme sets according to Category 2.');
}

updateGraphemes().catch(console.error);