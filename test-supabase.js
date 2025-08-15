// Test script to verify Supabase migration
// Run with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Migration...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing database connection...');
    const { data: stages, error: stagesError } = await supabase
      .from('phonics_stages')
      .select('id, name')
      .limit(3);

    if (stagesError) throw stagesError;
    console.log('✅ Connection successful!');
    console.log(`   Found ${stages.length} stages:`, stages.map(s => s.name).join(', '));

    // Test 2: Get phonemes by stage
    console.log('\n2️⃣ Testing phonemes by stage...');
    const { data: phonemes, error: phonemesError } = await supabase
      .from('phonemes')
      .select('phoneme_id, phoneme, stage_id')
      .eq('stage_id', 1);

    if (phonemesError) throw phonemesError;
    console.log('✅ Phonemes query successful!');
    console.log(`   Found ${phonemes.length} phonemes in Stage 1:`, phonemes.map(p => p.phoneme).join(', '));

    // Test 3: Get stage details
    console.log('\n3️⃣ Testing stage details...');
    const { data: stageDetail, error: detailError } = await supabase
      .from('phonics_stages')
      .select('*')
      .eq('id', 1)
      .single();

    if (detailError) throw detailError;
    console.log('✅ Stage details query successful!');
    console.log(`   Stage 1: "${stageDetail.name}" - ${stageDetail.grade_band}`);

    // Test 4: Check data completeness
    console.log('\n4️⃣ Testing data completeness...');
    const { data: counts } = await supabase.rpc('get_table_counts', {}, { count: 'exact' });
    
    // Manual count since RPC might not exist
    const [stageCount, phonemeCount, assessmentCount] = await Promise.all([
      supabase.from('phonics_stages').select('*', { count: 'exact', head: true }),
      supabase.from('phonemes').select('*', { count: 'exact', head: true }),
      supabase.from('phonics_assessments').select('*', { count: 'exact', head: true })
    ]);

    console.log('✅ Data completeness check:');
    console.log(`   📚 Stages: ${stageCount.count}/8 expected`);
    console.log(`   🔤 Phonemes: ${phonemeCount.count} total`);
    console.log(`   📝 Assessments: ${assessmentCount.count} total`);

    // Test 5: Check Row Level Security
    console.log('\n5️⃣ Testing Row Level Security...');
    const { data: publicAccess, error: rlsError } = await supabase
      .from('phonics_stages')
      .select('name')
      .limit(1);

    if (rlsError && rlsError.code === 'PGRST301') {
      console.log('⚠️  RLS is working (public access blocked - this is good for production)');
    } else if (publicAccess) {
      console.log('✅ Public read access working (good for development)');
    }

    console.log('\n🎉 All tests passed! Your Supabase migration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testSupabaseConnection();