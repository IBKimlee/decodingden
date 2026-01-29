const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xckllondwxdotcsjtxrd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2xsb25kd3hkb3Rjc2p0eHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMDQ2NjYsImV4cCI6MjA4NDc4MDY2Nn0.plbqzDvp5IF_O8A9zJNstrI-1H8Ql1307qghyNSSYr8'
);

async function audit() {
  const { data: phonemes } = await supabase
    .from('phonemes')
    .select('phoneme, graphemes, stage_id');

  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           DECODING DEN: PHONEME & GRAPHEME AUDIT             ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Count unique graphemes
  const allGraphemes = new Set();
  const graphemesByStage = {};
  const phonemesByStage = {};

  phonemes.forEach(p => {
    const stage = p.stage_id || 'unknown';
    if (!phonemesByStage[stage]) phonemesByStage[stage] = [];
    phonemesByStage[stage].push(p.phoneme);

    if (!graphemesByStage[stage]) graphemesByStage[stage] = new Set();

    if (p.graphemes && Array.isArray(p.graphemes)) {
      p.graphemes.forEach(g => {
        allGraphemes.add(g);
        graphemesByStage[stage].add(g);
      });
    }
  });

  console.log('📊 SUMMARY');
  console.log('─'.repeat(50));
  console.log(`Total phoneme entries:    ${phonemes.length}`);
  console.log(`Total unique graphemes:   ${allGraphemes.size}`);
  console.log('');

  console.log('📈 BY STAGE');
  console.log('─'.repeat(50));
  console.log('Stage | Phonemes | Graphemes | Grade Level');
  console.log('─'.repeat(50));

  const gradeLevels = {
    1: 'K-Fall',
    2: 'K-Spring',
    3: '1-Fall',
    4: '1-Spring',
    5: '2-Fall',
    6: '2-Spring',
    7: '3-Fall',
    8: '3-Spring'
  };

  Object.keys(phonemesByStage).sort((a, b) => a - b).forEach(stage => {
    const phonemeCount = phonemesByStage[stage].length;
    const graphemeCount = graphemesByStage[stage] ? graphemesByStage[stage].size : 0;
    const grade = gradeLevels[stage] || '';
    console.log(`  ${stage}   |    ${String(phonemeCount).padStart(2)}    |    ${String(graphemeCount).padStart(2)}     | ${grade}`);
  });

  console.log('');

  // Categorize phonemes by type
  console.log('📚 PHONEME CATEGORIES');
  console.log('─'.repeat(50));

  // True consonant phonemes (single sounds, not patterns)
  const singleConsonants = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && (
      ['/m/', '/s/', '/t/', '/n/', '/p/', '/b/', '/d/', '/f/', '/l/', '/h/',
       '/r/', '/g/', '/k/', '/j/', '/v/', '/w/', '/z/', '/ks/', '/kw/'].includes(ph)
    );
  });

  // Consonant digraphs
  const digraphs = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && ['/sh/', '/ch/', '/th/', '/wh/', '/ng/', '/ʃ/', '/θ/', '/ð/', '/ʒ/'].includes(ph);
  });

  // Blends and clusters
  const blends = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && (
      ph.includes('bl') || ph.includes('br') || ph.includes('cl') || ph.includes('cr') ||
      ph.includes('dr') || ph.includes('fl') || ph.includes('fr') || ph.includes('gl') ||
      ph.includes('gr') || ph.includes('pl') || ph.includes('pr') || ph.includes('sc') ||
      ph.includes('sk') || ph.includes('sl') || ph.includes('sm') || ph.includes('sn') ||
      ph.includes('sp') || ph.includes('st') || ph.includes('sw') || ph.includes('tr') ||
      ph.includes('tw') || ph.includes('str') || ph.includes('spr') || ph.includes('scr') ||
      ph.includes('spl') || ph.includes('nd') || ph.includes('nt') || ph.includes('nk') ||
      ph.includes('mp') || ph.includes('ft') || ph.includes('lt') || ph.includes('ld') ||
      ph.includes('pt') || ph.includes('ct') || ph.includes('xt')
    );
  });

  // Short vowels
  const shortVowels = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && ['/a/', '/e/', '/i/', '/o/', '/u/', '/æ/', '/ɛ/', '/ɪ/', '/ɒ/', '/ʌ/'].includes(ph);
  });

  // Long vowels
  const longVowels = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && ['/ā/', '/ē/', '/ī/', '/ō/', '/ū/'].includes(ph);
  });

  // R-controlled vowels
  const rControlled = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && ['/ar/', '/or/', '/er/', '/ir/', '/ur/', '/ər/', '/är/', '/ôr/'].includes(ph);
  });

  // Diphthongs and vowel teams
  const diphthongsVowelTeams = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && ['/aw/', '/ou/', '/oo/', '/oi/', '/ɔ/', '/ɔɪ/', '/aʊ/', '/ʊ/', '/o͞o/', '/yoo/ or /oo/', '/ē/ or /ī/'].includes(ph);
  });

  // Irregular/sight words
  const irregulars = phonemes.filter(p => p.phoneme && p.phoneme.includes('irregular'));

  // Morphology (prefixes, suffixes, syllables)
  const morphology = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && (ph.includes('suffix') || ph.includes('prefix') || ph.includes('syllable'));
  });

  // Word patterns (like /æn/, /æm/)
  const wordPatterns = phonemes.filter(p => {
    const ph = p.phoneme;
    return ph && (ph.includes('æ') && ph.length > 3);
  });

  console.log(`Single consonants:        ${singleConsonants.length}`);
  console.log(`Consonant digraphs:       ${digraphs.length}`);
  console.log(`Blends & clusters:        ${blends.length}`);
  console.log(`Short vowels:             ${shortVowels.length}`);
  console.log(`Long vowels (VCe/teams):  ${longVowels.length}`);
  console.log(`R-controlled vowels:      ${rControlled.length}`);
  console.log(`Diphthongs/vowel teams:   ${diphthongsVowelTeams.length}`);
  console.log(`Irregular/sight words:    ${irregulars.length}`);
  console.log(`Morphology patterns:      ${morphology.length}`);
  console.log(`Word patterns:            ${wordPatterns.length}`);
  console.log('');

  // All unique graphemes
  console.log('📝 ALL UNIQUE GRAPHEMES');
  console.log('─'.repeat(50));
  const sortedGraphemes = Array.from(allGraphemes).sort();

  // Group by length
  const singleLetter = sortedGraphemes.filter(g => g.length === 1);
  const digraphGraphemes = sortedGraphemes.filter(g => g.length === 2);
  const trigraphPlus = sortedGraphemes.filter(g => g.length >= 3);

  console.log(`\nSingle letters (${singleLetter.length}):`);
  console.log('  ' + singleLetter.join(', '));

  console.log(`\nDigraphs/2-letter (${digraphGraphemes.length}):`);
  console.log('  ' + digraphGraphemes.join(', '));

  console.log(`\nTrigraphs+ (${trigraphPlus.length}):`);
  console.log('  ' + trigraphPlus.join(', '));

  // What's the expected coverage for Science of Reading?
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║              SCIENCE OF READING COVERAGE CHECK               ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Standard English has ~44 phonemes
  const allPhonemeSymbols = phonemes.map(p => p.phoneme);

  // Core phonemes that should exist
  const expectedCore = [
    // Consonants
    '/m/', '/n/', '/p/', '/b/', '/t/', '/d/', '/k/', '/g/', '/f/', '/v/',
    '/s/', '/z/', '/h/', '/w/', '/l/', '/r/', '/j/',
    // Digraphs
    '/sh/', '/ch/', '/th/', '/wh/', '/ng/',
    // Short vowels
    '/a/', '/e/', '/i/', '/o/', '/u/',
    // Long vowels
    '/ā/', '/ē/', '/ī/', '/ō/', '/ū/'
  ];

  console.log('Core phonemes (27 essential):');
  let missingCore = [];
  expectedCore.forEach(ph => {
    const found = allPhonemeSymbols.includes(ph);
    if (!found) missingCore.push(ph);
  });

  if (missingCore.length === 0) {
    console.log('  ✅ All 27 core phonemes present!');
  } else {
    console.log(`  ⚠️  Missing ${missingCore.length}: ${missingCore.join(', ')}`);
  }

  console.log('');
  console.log('Additional coverage:');
  console.log(`  • R-controlled vowels: ${rControlled.length > 0 ? '✅' : '❌'}`);
  console.log(`  • Diphthongs: ${diphthongsVowelTeams.length > 0 ? '✅' : '❌'}`);
  console.log(`  • Consonant blends: ${blends.length > 0 ? '✅' : '❌'}`);
  console.log(`  • Morphology patterns: ${morphology.length > 0 ? '✅' : '❌'}`);
  console.log(`  • Irregular/sight words: ${irregulars.length > 0 ? '✅' : '❌'}`);
}

audit().catch(console.error);
