const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xckllondwxdotcsjtxrd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2xsb25kd3hkb3Rjc2p0eHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMDQ2NjYsImV4cCI6MjA4NDc4MDY2Nn0.plbqzDvp5IF_O8A9zJNstrI-1H8Ql1307qghyNSSYr8'
);

async function checkStage1() {
  const { data: phonemes } = await supabase
    .from('phonemes')
    .select('*')
    .eq('stage_id', 1)
    .order('frequency_rank', { ascending: true });

  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║              STAGE 1 PHONEMES - CONTENT AUDIT                ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`Total Stage 1 entries: ${phonemes.length}\n`);

  // Filter to just core phonemes (not irregulars or patterns)
  const corePhonemes = phonemes.filter(p =>
    !p.phoneme.includes('irregular') &&
    !p.phoneme.includes('æ') &&
    p.phoneme.startsWith('/')
  );

  console.log(`Core phonemes (not irregulars): ${corePhonemes.length}\n`);
  console.log('─'.repeat(70));
  console.log('Phoneme | Graphemes | Words | Sentences | Has Stories | Has Ladders');
  console.log('─'.repeat(70));

  corePhonemes.forEach(p => {
    const phoneme = p.phoneme.padEnd(7);
    const graphemes = (p.graphemes || []).slice(0, 2).join(', ').padEnd(10);
    const wordCount = (p.word_examples || []).length;
    const sentenceCount = (p.decodable_sentences || []).length;

    // Check for stories and word ladders in content_generation_meta or other fields
    const hasStories = p.content_generation_meta?.stories?.length > 0 ? '✅' : '❌';
    const hasLadders = p.content_generation_meta?.word_ladders?.length > 0 ? '✅' : '❌';

    console.log(`${phoneme} | ${graphemes} | ${String(wordCount).padStart(5)} | ${String(sentenceCount).padStart(9)} | ${hasStories.padStart(11)} | ${hasLadders}`);
  });

  console.log('─'.repeat(70));

  // Show sample of what we have for /m/
  console.log('\n\n📋 SAMPLE DATA FOR /m/:');
  console.log('─'.repeat(50));
  const mPhoneme = corePhonemes.find(p => p.phoneme === '/m/');
  if (mPhoneme) {
    console.log('Word examples:', mPhoneme.word_examples?.join(', '));
    console.log('Sentences:', mPhoneme.decodable_sentences?.join(' | '));
    console.log('Content meta:', JSON.stringify(mPhoneme.content_generation_meta, null, 2));
  }

  // List what's missing
  console.log('\n\n📝 CONTENT NEEDED FOR DECODING DEN:');
  console.log('─'.repeat(50));
  console.log('For each core phoneme, we need to add:');
  console.log('  1. Short story (3-5 sentences featuring the sound)');
  console.log('  2. Word ladder (5-word progression)');
  console.log('\nCore phonemes to populate:');
  corePhonemes.forEach(p => {
    console.log(`  • ${p.phoneme} (${p.graphemes?.[0] || '?'})`);
  });
}

checkStage1().catch(console.error);
