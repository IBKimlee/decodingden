const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeSupabaseData() {
  try {
    console.log('🔍 ANALYZING DECODING DEN SUPABASE DATABASE\n');
    console.log('=' .repeat(60));
    
    // Check phonics_stages table
    console.log('\n📚 PHONICS STAGES:');
    const { data: stages, error: stagesError } = await supabase
      .from('phonics_stages')
      .select('*')
      .order('id');
    
    if (stagesError) {
      console.error('Error fetching stages:', stagesError);
    } else {
      console.log(`Found ${stages.length} stages:`);
      stages.forEach(stage => {
        console.log(`  Stage ${stage.id}: ${stage.name} (${stage.grade_band})`);
        console.log(`    Phase: ${stage.student_phase}`);
        console.log(`    Duration: ${stage.duration} | Elements: ${stage.total_elements}`);
        console.log(`    Key Concept: ${stage.key_concept?.substring(0, 80)}...`);
        console.log('');
      });
    }
    
    // Check phonemes table 
    console.log('\n🔤 PHONEMES BY STAGE:');
    const { data: phonemes, error: phonemesError } = await supabase
      .from('phonemes')
      .select('*')
      .order('stage_id, phoneme');
      
    if (phonemesError) {
      console.error('Error fetching phonemes:', phonemesError);
    } else {
      console.log(`Total phonemes in database: ${phonemes.length}\n`);
      
      // Group by stage
      const phonemesByStage = {};
      phonemes.forEach(p => {
        if (!phonemesByStage[p.stage_id]) {
          phonemesByStage[p.stage_id] = [];
        }
        phonemesByStage[p.stage_id].push(p);
      });
      
      Object.keys(phonemesByStage).sort().forEach(stageId => {
        const stagePhonemes = phonemesByStage[stageId];
        console.log(`  Stage ${stageId}: ${stagePhonemes.length} phonemes`);
        stagePhonemes.slice(0, 5).forEach(p => {
          console.log(`    ${p.phoneme} → ${JSON.stringify(p.graphemes)} (${p.phoneme_id})`);
        });
        if (stagePhonemes.length > 5) {
          console.log(`    ... and ${stagePhonemes.length - 5} more`);
        }
        console.log('');
      });
    }
    
    // Check assessments
    console.log('\n📝 ASSESSMENTS:');
    const { data: assessments, error: assessError } = await supabase
      .from('phonics_assessments')
      .select('stage_id, assessment_type, name')
      .order('stage_id, assessment_type');
      
    if (assessError) {
      console.error('Error fetching assessments:', assessError);
    } else {
      console.log(`Found ${assessments.length} assessments:`);
      assessments.forEach(a => {
        console.log(`  Stage ${a.stage_id} - ${a.assessment_type}: ${a.name}`);
      });
    }
    
    // Check research justifications
    console.log('\n📖 RESEARCH JUSTIFICATIONS:');
    const { data: research, error: researchError } = await supabase
      .from('research_justifications')
      .select('stage_id')
      .order('stage_id');
      
    if (researchError) {
      console.error('Error fetching research:', researchError);
    } else {
      console.log(`Research justifications for ${research.length} stages`);
    }
    
    // Sample detailed phoneme record
    if (phonemes && phonemes.length > 0) {
      console.log('\n🔍 SAMPLE PHONEME DETAIL:');
      const samplePhoneme = phonemes[0];
      console.log(`Phoneme: ${samplePhoneme.phoneme} (${samplePhoneme.phoneme_id})`);
      console.log(`Stage: ${samplePhoneme.stage_id} | Week: ${samplePhoneme.introduction_week}`);
      console.log(`Graphemes: ${JSON.stringify(samplePhoneme.graphemes)}`);
      console.log(`Word Examples: ${JSON.stringify(samplePhoneme.word_examples)}`);
      console.log(`Assessment Criteria: ${JSON.stringify(samplePhoneme.assessment_criteria)}`);
      console.log(`Teaching Advantages: ${JSON.stringify(samplePhoneme.teaching_advantages)}`);
      console.log(`Research Sources: ${JSON.stringify(samplePhoneme.research_sources)}`);
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Database analysis complete!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

analyzeSupabaseData();