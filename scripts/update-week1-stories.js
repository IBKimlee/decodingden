const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateShortAStories() {
  // Get the short a phoneme by its phoneme_id
  const { data: phoneme, error: fetchError } = await supabase
    .from('phonemes')
    .select('*')
    .eq('phoneme_id', 'stage1_short_a')
    .single();

  if (fetchError) {
    console.error('Error fetching phoneme:', fetchError);
    return;
  }

  console.log('Found phoneme:', phoneme.phoneme_id, 'with phoneme symbol:', phoneme.phoneme);

  // Create properly decodable stories using ONLY: m, s, a + sight word "can"
  // Available words: Sam, Mam, sass, can
  // Grammar check: each sentence must make complete sense
  const newStories = [
    // Story 1 - Very Easy (simple statements)
    "Sam! Sam! Mam can sass. Sam can sass.",

    // Story 2 - Easy (questions and answers)
    "Can Sam sass? Sam can sass! Can Mam sass? Mam can sass!",

    // Story 3 - Medium (narrative with action)
    "Mam can sass Sam. Sam can sass Mam. Sass, Sam! Sass, Mam!"
  ];

  // Update the content_generation_meta with new stories
  const currentMeta = phoneme.content_generation_meta || {};
  const updatedMeta = {
    ...currentMeta,
    practice_texts: {
      ...(currentMeta.practice_texts || {}),
      stories: newStories
    }
  };

  const { error: updateError } = await supabase
    .from('phonemes')
    .update({ content_generation_meta: updatedMeta })
    .eq('id', phoneme.id);

  if (updateError) {
    console.error('Error updating:', updateError);
    return;
  }

  console.log('Successfully updated stories!');
  console.log('New stories:');
  newStories.forEach(function(story, i) {
    console.log((i + 1) + '. ' + story);
  });
}

updateShortAStories();
