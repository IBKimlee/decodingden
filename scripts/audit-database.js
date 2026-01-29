const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xckllondwxdotcsjtxrd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2xsb25kd3hkb3Rjc2p0eHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMDQ2NjYsImV4cCI6MjA4NDc4MDY2Nn0.plbqzDvp5IF_O8A9zJNstrI-1H8Ql1307qghyNSSYr8'
);

async function detailedAudit() {
  // Get all phonemes grouped by stage
  const { data: phonemes } = await supabase
    .from('phonemes')
    .select('phoneme, stage_id, graphemes')
    .order('stage_id', { ascending: true });

  console.log('=== PHONEMES BY STAGE ===\n');

  const byStage = {};
  phonemes.forEach(p => {
    const stage = p.stage_id || 'unknown';
    if (!byStage[stage]) byStage[stage] = [];
    byStage[stage].push(p.phoneme);
  });

  Object.keys(byStage).sort().forEach(stage => {
    console.log('Stage ' + stage + ' (' + byStage[stage].length + ' phonemes):');
    console.log('  ' + byStage[stage].join(', '));
    console.log('');
  });

  // Check for core consonants and vowels
  console.log('=== CORE PHONEME CHECK ===\n');

  const coreConsonants = ['/m/', '/s/', '/t/', '/n/', '/p/', '/b/', '/d/', '/k/', '/g/', '/f/', '/v/', '/h/', '/w/', '/l/', '/r/', '/j/', '/z/'];
  const shortVowels = ['/a/', '/e/', '/i/', '/o/', '/u/', '/ă/', '/ĕ/', '/ĭ/', '/ŏ/', '/ŭ/'];
  const digraphs = ['/sh/', '/ch/', '/th/', '/wh/', '/ng/', '/ck/'];
  const longVowels = ['/ā/', '/ē/', '/ī/', '/ō/', '/ū/'];

  const allPhonemes = phonemes.map(p => p.phoneme);

  console.log('Core Consonants:');
  coreConsonants.forEach(c => {
    const found = allPhonemes.includes(c);
    console.log('  ' + c + ': ' + (found ? '✓' : '✗ MISSING'));
  });

  console.log('\nShort Vowels:');
  shortVowels.forEach(v => {
    const found = allPhonemes.includes(v);
    console.log('  ' + v + ': ' + (found ? '✓' : '✗ MISSING'));
  });

  console.log('\nDigraphs:');
  digraphs.forEach(d => {
    const found = allPhonemes.includes(d);
    console.log('  ' + d + ': ' + (found ? '✓' : '✗ MISSING'));
  });

  console.log('\nLong Vowels:');
  longVowels.forEach(v => {
    const found = allPhonemes.includes(v);
    console.log('  ' + v + ': ' + (found ? '✓' : '✗ MISSING'));
  });

  // Show a sample record with all its fields
  console.log('\n=== SAMPLE PHONEME RECORD ===\n');
  const { data: sample } = await supabase
    .from('phonemes')
    .select('*')
    .eq('phoneme', '/m/')
    .single();

  if (sample) {
    console.log('Phoneme /m/ data:');
    console.log(JSON.stringify(sample, null, 2));
  } else {
    // Try another common phoneme
    const { data: sample2 } = await supabase
      .from('phonemes')
      .select('*')
      .limit(1)
      .single();
    console.log('Sample phoneme data:');
    console.log(JSON.stringify(sample2, null, 2));
  }
}

detailedAudit().catch(console.error);
