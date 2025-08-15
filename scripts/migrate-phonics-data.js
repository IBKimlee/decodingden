#!/usr/bin/env node

/**
 * PHONICS DATA MIGRATION SCRIPT
 * Extracts data from TypeScript files and generates SQL INSERT statements
 * for migrating to Supabase database
 */

const fs = require('fs');
const path = require('path');

// Import the data (you'll need to transpile or adjust imports)
// For now, we'll read the files and parse the data structures

function extractStagesData() {
  const filePath = path.join(__dirname, '../app/data/allStagesDatabase.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract EIGHT_STAGE_SYSTEM data
  const stagesMatch = content.match(/export const EIGHT_STAGE_SYSTEM: StageInfo\[\] = \[([\s\S]*?)\];/);
  if (!stagesMatch) throw new Error('Could not find EIGHT_STAGE_SYSTEM data');
  
  // Parse the stages data (simplified - you may need to adjust based on exact format)
  const stages = [
    {
      id: 1,
      name: "Core Consonants & Short Vowels",
      grade_band: "Kindergarten – Fall Semester",
      student_phase: "Pre-Alphabetic to Partial Alphabetic Phase",
      duration: "10 weeks",
      total_elements: 15,
      description: "Students learn foundational consonants and short vowels prioritized for high frequency and transparent mappings.",
      key_concept: "Letters represent sounds. When we put consonant-vowel-consonant together, we can read and spell words.",
      instructional_focus: ["CVC word formation (consonant-vowel-consonant)", "Phonemic awareness integration with letters", "Letter-sound correspondence mastery", "Basic decoding skills development"],
      science_of_reading_alignment: {
        ehri_phase: "Pre-alphabetic to Partial Alphabetic - children use first and last sounds in words",
        research_principle: "Ehri (2005); NRP (2000) - Foundational consonants and short vowels prioritized for transparent mappings",
        orthographic_mapping: "Foundation for connecting letters to sounds in memory"
      }
    },
    {
      id: 2,
      name: "Remaining Single Letters & Simple Patterns",
      grade_band: "Kindergarten – Spring Semester",
      student_phase: "Partial Alphabetic Phase",
      duration: "10 weeks",
      total_elements: 12,
      description: "Students complete the single letter foundation with remaining high-frequency consonants and simple patterns, avoiding complex digraphs until developmentally ready.",
      key_concept: "We complete our letter-sound foundation. Some letters work together in simple ways, but we're not ready for complex digraphs yet.",
      instructional_focus: ["Complete single letter-sound correspondences", "Simple consonant blends maintaining individual sounds", "CVCC and CCVC word patterns with known letters", "Systematic review of all single letters"],
      science_of_reading_alignment: {
        ehri_phase: "Partial Alphabetic - completing single letter foundation before complex patterns",
        research_principle: "Fry (2004); NRP (2000) - High-frequency single letters prioritized, digraphs delayed until 1st grade",
        orthographic_mapping: "Solid single letter-sound connections before advancing to complex patterns"
      }
    },
    {
      id: 3,
      name: "Consonant Digraphs",
      grade_band: "1st Grade – Fall Semester",
      student_phase: "Full Alphabetic Phase - Emerging",
      duration: "10 weeks",
      total_elements: 8,
      description: "Students learn consonant digraphs representing single sounds, building on solid single-letter foundation.",
      key_concept: "Two letters can work together to make one sound. This helps us read and spell more words.",
      instructional_focus: ["Consonant digraphs (ch, sh, th, wh)", "Two letters = one sound concept", "Digraph vs. blend distinction", "Advanced CVC patterns with digraphs"],
      science_of_reading_alignment: {
        ehri_phase: "Full Alphabetic - systematic letter patterns",
        research_principle: "Ehri (2005); Adams (1990) - Digraphs introduced after single letter mastery",
        orthographic_mapping: "Complex orthographic patterns stored in memory"
      }
    },
    {
      id: 4,
      name: "Long Vowels with Silent E",
      grade_band: "1st Grade – Spring Semester",
      student_phase: "Full Alphabetic Phase",
      duration: "12 weeks",
      total_elements: 10,
      description: "Students learn the magic e pattern for long vowels, understanding vowel sounds in different contexts.",
      key_concept: "The silent e at the end of words makes the vowel say its name (long sound).",
      instructional_focus: ["CVCe patterns", "Long vs. short vowel discrimination", "Silent e concept", "Vowel team foundations"],
      science_of_reading_alignment: {
        ehri_phase: "Full Alphabetic - advanced phoneme-grapheme correspondences",
        research_principle: "Ehri (2005); Bear et al. (2020) - Systematic long vowel instruction",
        orthographic_mapping: "Advanced vowel patterns and morphological awareness"
      }
    },
    {
      id: 5,
      name: "Vowel Teams & Diphthongs",
      grade_band: "2nd Grade – Fall Semester",
      student_phase: "Full Alphabetic Phase - Advanced",
      duration: "14 weeks",
      total_elements: 15,
      description: "Students master vowel teams and diphthongs, expanding their decoding capabilities significantly.",
      key_concept: "Two vowels can work together to make one sound, and sometimes vowels slide together to make new sounds.",
      instructional_focus: ["Common vowel teams (ai, ay, ee, ea, oa, ow)", "Diphthongs (oi, oy, ou, ow)", "Vowel team patterns and rules", "Advanced decoding strategies"],
      science_of_reading_alignment: {
        ehri_phase: "Full Alphabetic - complex vowel patterns",
        research_principle: "Ehri (2005); Moats (2020) - Systematic vowel team instruction",
        orthographic_mapping: "Complex vowel pattern recognition and storage"
      }
    },
    {
      id: 6,
      name: "R-Controlled Vowels & Irregular Patterns",
      grade_band: "2nd Grade – Spring Semester",
      student_phase: "Full Alphabetic to Consolidated Alphabetic",
      duration: "12 weeks",
      total_elements: 12,
      description: "Students learn r-controlled vowels and begin handling irregular spelling patterns systematically.",
      key_concept: "The letter r changes how vowels sound, and some words have special spellings we need to remember.",
      instructional_focus: ["R-controlled vowels (ar, er, ir, or, ur)", "Irregular spelling patterns", "High-frequency irregular words", "Strategic word analysis"],
      science_of_reading_alignment: {
        ehri_phase: "Consolidated Alphabetic - word pattern chunking",
        research_principle: "Ehri (2005); Moats (2020) - R-controlled and irregular pattern instruction",
        orthographic_mapping: "Pattern chunking and irregular word storage"
      }
    },
    {
      id: 7,
      name: "Advanced Phonics & Variant Spellings",
      grade_band: "3rd Grade – Fall Semester",
      student_phase: "Consolidated Alphabetic Phase",
      duration: "16 weeks",
      total_elements: 20,
      description: "Students master advanced phonics patterns and variant spellings, developing sophisticated decoding skills.",
      key_concept: "Many sounds can be spelled in different ways, and we can figure out words by trying different patterns.",
      instructional_focus: ["Variant spellings for sounds", "Advanced consonant patterns", "Syllable patterns", "Morphological awareness introduction"],
      science_of_reading_alignment: {
        ehri_phase: "Consolidated Alphabetic - advanced pattern recognition",
        research_principle: "Ehri (2005); Moats (2020) - Advanced phonics and morphology integration",
        orthographic_mapping: "Sophisticated pattern recognition and morphological connections"
      }
    },
    {
      id: 8,
      name: "Multisyllabic Words & Morphology",
      grade_band: "3rd Grade – Spring Semester",
      student_phase: "Consolidated Alphabetic to Automatic",
      duration: "18 weeks",
      total_elements: 25,
      description: "Students develop skills for reading multisyllabic words using syllable division and morphological analysis.",
      key_concept: "Big words are made of smaller parts (syllables and word parts with meaning) that we can figure out.",
      instructional_focus: ["Syllable division patterns", "Common prefixes and suffixes", "Root word analysis", "Multisyllabic decoding strategies"],
      science_of_reading_alignment: {
        ehri_phase: "Automatic - fluent word recognition and morphological analysis",
        research_principle: "Ehri (2005); Nagy & Anderson (1984) - Morphological awareness and vocabulary",
        orthographic_mapping: "Automatic word recognition with morphological connections"
      }
    }
  ];
  
  return stages;
}

function generateStagesSQL(stages) {
  let sql = "-- INSERT PHONICS STAGES DATA\n";
  
  stages.forEach(stage => {
    const instructionalFocusArray = `'{${stage.instructional_focus.map(item => `"${item.replace(/"/g, '\\"')}"`).join(',')}}'`;
    const alignmentJSON = JSON.stringify(stage.science_of_reading_alignment).replace(/'/g, "''");
    
    sql += `INSERT INTO phonics_stages (id, name, grade_band, student_phase, duration, total_elements, description, key_concept, instructional_focus, science_of_reading_alignment)
VALUES (${stage.id}, '${stage.name.replace(/'/g, "''")}', '${stage.grade_band.replace(/'/g, "''")}', '${stage.student_phase.replace(/'/g, "''")}', '${stage.duration}', ${stage.total_elements}, '${stage.description.replace(/'/g, "''")}', '${stage.key_concept.replace(/'/g, "''")}', ${instructionalFocusArray}, '${alignmentJSON}');

`);
  });
  
  return sql;
}

function extractPhonemesData() {
  // Sample phonemes data - in practice, you'd parse from the TypeScript file
  const phonemes = [
    { phoneme_id: "stage1_m", stage: 1, phoneme: "/m/", graphemes: ["m"], frequency_rank: 1, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["mat", "mad", "man", "mom", "mud"], decodable_sentences: ["I am mad.", "Sam has a mat."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["visible articulation", "continuous sound"], research_sources: ["Ehri (2005); NRP (2000)"] },
    { phoneme_id: "stage1_s", stage: 1, phoneme: "/s/", graphemes: ["s"], frequency_rank: 2, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["sat", "sad", "sun", "sit"], decodable_sentences: ["Sam is sad.", "I sit."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["continuous sound", "frequent usage"], research_sources: ["Ehri (2005); NRP (2000)"] },
    { phoneme_id: "stage1_a", stage: 1, phoneme: "/a/", graphemes: ["a"], frequency_rank: 3, complexity_score: 1.0, grade_band: "K-Fall", introduction_week: 1, word_examples: ["mat", "sat", "hat", "man"], decodable_sentences: ["I am mad.", "The mat is tan."], assessment_criteria: { daily: "90% accuracy", weekly: "85% accuracy", summative: "95% letter-sound" }, teaching_advantages: ["clear sound", "visible mouth position"], research_sources: ["Ehri (2005); NRP (2000)"] }
    // ... more phonemes would be extracted from the actual file
  ];
  
  return phonemes;
}

function generatePhonemesSQL(phonemes) {
  let sql = "-- INSERT PHONEMES DATA\n";
  
  phonemes.forEach(phoneme => {
    const graphemesArray = `'{${phoneme.graphemes.map(g => `"${g}"`).join(',')}}'`;
    const wordExamplesArray = `'{${phoneme.word_examples.map(w => `"${w}"`).join(',')}}'`;
    const decodableSentencesArray = `'{${phoneme.decodable_sentences.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',')}}'`;
    const assessmentCriteriaJSON = JSON.stringify(phoneme.assessment_criteria).replace(/'/g, "''");
    const teachingAdvantagesArray = `'{${phoneme.teaching_advantages.map(a => `"${a.replace(/"/g, '\\"')}"`).join(',')}}'`;
    const researchSourcesArray = `'{${phoneme.research_sources.map(r => `"${r.replace(/"/g, '\\"')}"`).join(',')}}'`;
    
    sql += `INSERT INTO phonemes (phoneme_id, stage_id, phoneme, graphemes, frequency_rank, complexity_score, grade_band, introduction_week, word_examples, decodable_sentences, assessment_criteria, teaching_advantages, research_sources)
VALUES ('${phoneme.phoneme_id}', ${phoneme.stage}, '${phoneme.phoneme}', ${graphemesArray}, ${phoneme.frequency_rank}, ${phoneme.complexity_score}, '${phoneme.grade_band}', ${phoneme.introduction_week}, ${wordExamplesArray}, ${decodableSentencesArray}, '${assessmentCriteriaJSON}', ${teachingAdvantagesArray}, ${researchSourcesArray});

`);
  });
  
  return sql;
}

function generateDifferentiationSQL() {
  return `-- INSERT DIFFERENTIATION STRATEGIES
INSERT INTO differentiation_strategies (learner_type, pace, practice_requirements, instruction_type, grouping_strategy, materials)
VALUES 
('struggling', '50% slower progression', 'Double the practice opportunities', 'Explicit multisensory instruction', 'Small group or 1:1 instruction', 'Enhanced visual and tactile supports'),
('on_level', 'Standard progression', 'Regular practice schedule', 'Whole group with targeted small group', 'Flexible grouping', 'Standard instructional materials'),
('advanced', 'Accelerated by 25-50%', 'Extension activities and enrichment', 'Independent application opportunities', 'Enrichment groups and peer tutoring', 'Advanced texts and challenge activities');

`;
}

// Main execution
function generateMigrationSQL() {
  console.log('Extracting phonics data...');
  
  const stages = extractStagesData();
  const phonemes = extractPhonemesData();
  
  console.log('Generating SQL statements...');
  
  let fullSQL = `-- PHONICS DATA MIGRATION SQL
-- Generated: ${new Date().toISOString()}
-- Description: Inserts all phonics curriculum data into Supabase

-- Disable foreign key checks during import
SET session_replication_role = replica;

`;
  
  fullSQL += generateStagesSQL(stages);
  fullSQL += "\n";
  fullSQL += generatePhonemesSQL(phonemes);
  fullSQL += "\n";
  fullSQL += generateDifferentiationSQL();
  
  fullSQL += `
-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Verification queries
SELECT 'Stages inserted: ' || COUNT(*) as stages_count FROM phonics_stages;
SELECT 'Phonemes inserted: ' || COUNT(*) as phonemes_count FROM phonemes;
SELECT 'Differentiation strategies inserted: ' || COUNT(*) as diff_strategies_count FROM differentiation_strategies;

SELECT 'Phonics data migration completed successfully!' as status;
`;
  
  return fullSQL;
}

// Generate and write the migration file
const migrationSQL = generateMigrationSQL();
const outputPath = path.join(__dirname, '../supabase/migrations/002_insert_phonics_data.sql');

fs.writeFileSync(outputPath, migrationSQL);
console.log(`Migration SQL generated: ${outputPath}`);
console.log('Run this migration in your Supabase dashboard or using supabase CLI');