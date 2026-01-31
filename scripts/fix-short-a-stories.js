const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixShortAStories() {
  // Get the short a phoneme
  const { data: phoneme, error: fetchError } = await supabase
    .from('phonemes')
    .select('*')
    .eq('phoneme_id', 'stage1_short_a')
    .single();

  if (fetchError) {
    console.error('Error fetching phoneme:', fetchError);
    return;
  }

  console.log('Found phoneme:', phoneme.phoneme_id);
  console.log('Current short_stories:', JSON.stringify(phoneme.content_generation_meta?.short_stories, null, 2));

  // Create properly decodable stories for Stage 1 short /a/
  // NO consonant blends (those are Stage 3)
  // Use only: basic consonants (m, s, t, n, p, d, f, l, h, b) + short vowels
  // Good words: cat, sat, mat, hat, bat, rat, fat, pat, tan, can, man, pan, Sam, am, at, an, nap, tap, map, cap, lap, sad, dad, had, mad, pad

  // Stage 1 decodable words (NO blends like gl-, fl-, tr-, etc.):
  // CVC words: cat, sat, mat, hat, bat, rat, fat, pat, tan, can, man, pan, van, Sam, Dan
  // Also: am, at, an, nap, tap, map, cap, lap, sad, dad, had, mad, pad, ran, fan
  // Sight words typically taught: the, a, is, has, on, and, to, in, not, up

  const newStories = [
    {
      title: "The Fat Cat",
      text: "Sam has a cat. The cat is fat. The fat cat sat on a mat. Sam sat and pat the cat. The cat had a nap.",
      level: "Decodable",
      word_count: 30
    },
    {
      title: "Dan and the Map",
      text: "Dan has a tan map. Dan sat on a mat. Dan had a nap. The map is on Dan. Dan sat up. Dan has the map!",
      level: "Decodable",
      word_count: 30
    },
    {
      title: "The Tan Hat",
      text: "Sam has a tan hat. The hat sat on a mat. A cat ran to the hat. The cat sat in the hat. Bad cat!",
      level: "Decodable",
      word_count: 28
    }
  ];

  // Update the content_generation_meta with corrected stories
  const currentMeta = phoneme.content_generation_meta || {};
  const updatedMeta = {
    ...currentMeta,
    short_stories: newStories  // This is the field the API actually reads!
  };

  const { error: updateError } = await supabase
    .from('phonemes')
    .update({ content_generation_meta: updatedMeta })
    .eq('id', phoneme.id);

  if (updateError) {
    console.error('Error updating:', updateError);
    return;
  }

  console.log('\nSuccessfully updated stories!');
  console.log('\nNew stories:');
  newStories.forEach(function(story, i) {
    console.log((i + 1) + '. ' + story.title + ': ' + story.text);
  });
}

fixShortAStories();
