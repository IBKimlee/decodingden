const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getDetailedPhonemeData() {
  try {
    console.log('🔍 DETAILED PHONEME ANALYSIS\n');
    
    // Get a few example phonemes from different stages with all fields
    console.log('📚 SAMPLE PHONEMES WITH COMPLETE DATA:\n');
    
    const stages = [1, 3, 5, 8]; // Sample from different stages
    
    for (const stageId of stages) {
      const { data: phonemes, error } = await supabase
        .from('phonemes')
        .select('*')
        .eq('stage_id', stageId)
        .limit(2);
      
      if (!error && phonemes && phonemes.length > 0) {
        console.log(`\n🎯 STAGE ${stageId} SAMPLE:`);
        console.log('=' .repeat(50));
        
        const sample = phonemes[0];
        
        // Display all fields in a formatted way
        Object.keys(sample).forEach(key => {
          let value = sample[key];
          
          if (value === null || value === undefined) {
            value = '(null)';
          } else if (typeof value === 'object') {
            value = JSON.stringify(value, null, 2);
          }
          
          console.log(`${key.toUpperCase().replace(/_/g, ' ')}: ${value}`);
        });
        
        console.log('\n' + '-'.repeat(50));
      }
    }
    
    // Check for any phonemes with rich articulation data
    console.log('\n\n🗣️ CHECKING FOR ARTICULATION DATA:\n');
    const { data: articulationSample } = await supabase
      .from('phonemes')
      .select('phoneme, phoneme_id, articulation_data')
      .not('articulation_data', 'is', null)
      .limit(3);
    
    if (articulationSample && articulationSample.length > 0) {
      articulationSample.forEach(p => {
        console.log(`${p.phoneme} (${p.phoneme_id}):`);
        console.log(JSON.stringify(p.articulation_data, null, 2));
        console.log('');
      });
    } else {
      console.log('No articulation data found in current phonemes');
    }
    
    // Check for instructional sequence data
    console.log('\n\n📖 CHECKING FOR INSTRUCTIONAL SEQUENCE DATA:\n');
    const { data: instructionalSample } = await supabase
      .from('phonemes')
      .select('phoneme, phoneme_id, instructional_sequence')
      .not('instructional_sequence', 'is', null)
      .limit(3);
    
    if (instructionalSample && instructionalSample.length > 0) {
      instructionalSample.forEach(p => {
        console.log(`${p.phoneme} (${p.phoneme_id}):`);
        console.log(JSON.stringify(p.instructional_sequence, null, 2));
        console.log('');
      });
    } else {
      console.log('No instructional sequence data found in current phonemes');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

getDetailedPhonemeData();