// Simple test script to verify Supabase migration
// Run with: node test-supabase-simple.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ufgqsdzehncouogsxazf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZ3FzZHplaG5jb3VvZ3N4YXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzYyMzcsImV4cCI6MjA2MzYxMjIzN30.YFqccovbkeKkVbPT9IQD6uGD2Wd-DAJk0CMZnOsy2nM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Migration...\n');

  try {
    // Test 1: Get all stages
    console.log('1️⃣ Testing stages query...');
    const { data: stages, error: stagesError } = await supabase
      .from('phonics_stages')
      .select('id, name, grade_band')
      .order('id');

    if (stagesError) throw stagesError;
    console.log('✅ Stages loaded successfully!');
    stages.forEach(stage => {
      console.log(`   Stage ${stage.id}: ${stage.name} (${stage.grade_band})`);
    });

    // Test 2: Get phonemes for Stage 1
    console.log('\n2️⃣ Testing phonemes for Stage 1...');
    const { data: phonemes, error: phonemesError } = await supabase
      .from('phonemes')
      .select('phoneme_id, phoneme, graphemes')
      .eq('stage_id', 1)
      .order('frequency_rank');

    if (phonemesError) throw phonemesError;
    console.log('✅ Stage 1 phonemes loaded successfully!');
    phonemes.forEach(phoneme => {
      console.log(`   ${phoneme.phoneme_id}: ${phoneme.phoneme} → ${phoneme.graphemes.join(', ')}`);
    });

    // Test 3: Get assessments
    console.log('\n3️⃣ Testing assessments...');
    const { data: assessments, error: assessError } = await supabase
      .from('phonics_assessments')
      .select('stage_id, assessment_type, name')
      .order('stage_id, assessment_type');

    if (assessError) throw assessError;
    console.log('✅ Assessments loaded successfully!');
    assessments.forEach(assessment => {
      console.log(`   Stage ${assessment.stage_id} - ${assessment.assessment_type}: ${assessment.name}`);
    });

    console.log('\n🎉 All Supabase tests passed! Your migration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
  }
}

testSupabaseConnection();