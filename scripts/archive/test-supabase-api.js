#!/usr/bin/env node

/**
 * 🧪 SUPABASE API TEST FOR DECODING DEN
 * =====================================
 * Tests the Supabase integration and API logic without requiring a running server
 */

const { createClient } = require('@supabase/supabase-js');

// ANSI colors for better output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const colors = {
    info: COLORS.blue,
    success: COLORS.green,
    warning: COLORS.yellow,
    error: COLORS.red,
    debug: COLORS.magenta
  };
  
  const color = colors[level] || COLORS.reset;
  console.log(`${color}[${timestamp}] ${level.toUpperCase()}: ${message}${COLORS.reset}`);
  
  if (data) {
    console.log(`${COLORS.cyan}${JSON.stringify(data, null, 2)}${COLORS.reset}`);
  }
}

async function testSupabaseConnection() {
  try {
    log('info', '🔌 Testing direct Supabase connection...');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Test basic connection
    const { data, error, count } = await supabase
      .from('phonemes')
      .select('phoneme_id, phoneme, stage_id', { count: 'exact' })
      .limit(5);
    
    if (error) {
      throw error;
    }
    
    log('success', `✅ Supabase connection successful! Found ${count} total phonemes`);
    log('info', 'Sample phonemes:', data);
    
    return { success: true, totalPhonemes: count, sampleData: data };
    
  } catch (error) {
    log('error', '❌ Supabase connection failed', { error: error.message });
    return { success: false, error: error.message };
  }
}

/**
 * Replicate the API's search logic for testing
 */
async function findPhonemeByInput(supabase, input) {
  const normalizedInput = input.toLowerCase().trim();
  
  try {
    // Try direct phoneme match first (e.g., "/sh/", "/m/")
    let { data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme', normalizedInput)
      .single();

    if (phonemeData && !error) {
      return { success: true, data: phonemeData, method: 'direct_match' };
    }

    // Try with IPA formatting if not already formatted
    if (!normalizedInput.startsWith('/')) {
      const ipaFormatted = `/${normalizedInput}/`;
      ({ data: phonemeData, error } = await supabase
        .from('phonemes')
        .select('*')
        .eq('phoneme', ipaFormatted)
        .single());

      if (phonemeData && !error) {
        return { success: true, data: phonemeData, method: 'ipa_format' };
      }
    }

    // Try searching in graphemes array
    ({ data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .contains('graphemes', [normalizedInput])
      .limit(1)
      .single());

    if (phonemeData && !error) {
      return { success: true, data: phonemeData, method: 'grapheme_search' };
    }

    // Try searching by phoneme_id (e.g., "stage1_m")
    ({ data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme_id', normalizedInput)
      .single());

    if (phonemeData && !error) {
      return { success: true, data: phonemeData, method: 'phoneme_id' };
    }

    return { success: false, message: 'Phoneme not found' };
    
  } catch (error) {
    log('error', `❌ Search failed for "${input}"`, { error: error.message });
    return { success: false, error: error.message };
  }
}

/**
 * Test the data transformation logic from the API
 */
function transformPhonemeData(supabaseData) {
  const articulation = supabaseData.articulation_data;
  
  const transformed = {
    phoneme: {
      id: supabaseData.phoneme_id,
      ipa_symbol: supabaseData.phoneme,
      common_name: supabaseData.phoneme.replace(/[\/]/g, '') + ' sound',
      phoneme_type: getPhonemeType(supabaseData),
      frequency_rank: supabaseData.frequency_rank || 0,
      is_voiced: articulation?.voicing === 'voiced' || false,
    },
    graphemes: supabaseData.graphemes?.map((grapheme, index) => ({
      id: `${supabaseData.phoneme_id}_${index}`,
      grapheme: grapheme,
      spelling_frequency: index === 0 ? 1 : 0.5,
      notes: index === 0 ? `Most common spelling for ${supabaseData.phoneme} sound` : undefined,
    })) || [],
    articulation: articulation ? {
      place_of_articulation: articulation.place || '',
      manner_of_articulation: articulation.manner || '',
      voicing: articulation.voicing || '',
      tongue_position: articulation.teacher_guidance || '',
      lip_position: articulation.articulation_cues || '',
      airflow_description: articulation.development_notes || '',
      step_by_step_instructions: articulation.student_tips ? [articulation.student_tips] : [],
      common_errors: articulation.common_substitutions || [],
      teacher_tips: articulation.teacher_guidance ? [articulation.teacher_guidance] : [],
    } : null,
    word_lists: generateWordLists(supabaseData),
    practice_texts: {
      sentences: supabaseData.decodable_sentences || [],
      stories: [],
      word_ladders: [],
    },
    research_citations: supabaseData.research_sources?.map((source, index) => ({
      source_name: source,
      citation_text: `Research-based phonics instruction supporting ${supabaseData.phoneme} sound development.`,
      url: undefined,
    })) || [],
  };
  
  return transformed;
}

function getPhonemeType(data) {
  const stageName = data.stage_id;
  
  if (stageName <= 2) return 'consonant';
  if (stageName === 3) return 'consonant_digraph';
  if (stageName === 4) return 'long_vowel';
  if (stageName >= 5) return 'vowel_team';
  
  return 'consonant';
}

function generateWordLists(data) {
  const wordLists = {};
  
  if (data.graphemes?.length > 0 && data.word_examples?.length > 0) {
    const primaryGrapheme = data.graphemes[0];
    wordLists[primaryGrapheme] = {
      beginning: data.word_examples.slice(0, 5) || [],
      medial: [],
      ending: [],
    };
  }
  
  return wordLists;
}

async function testPhonemeSearch(supabase, phonemeInput) {
  try {
    log('info', `🔍 Testing phoneme search for: "${phonemeInput}"`);
    
    const result = await findPhonemeByInput(supabase, phonemeInput);
    
    if (result.success) {
      log('success', `✅ Found phoneme: ${result.data.phoneme} (method: ${result.method})`);
      
      // Test data transformation
      const transformed = transformPhonemeData(result.data);
      log('info', 'Transformation result:', {
        phoneme_id: transformed.phoneme.id,
        ipa_symbol: transformed.phoneme.ipa_symbol,
        grapheme_count: transformed.graphemes.length,
        has_articulation: !!transformed.articulation,
        sentence_count: transformed.practice_texts.sentences.length,
        word_list_keys: Object.keys(transformed.word_lists)
      });
      
      return { success: true, rawData: result.data, transformed };
    } else {
      log('warning', `⚠️ No phoneme found for input: "${phonemeInput}"`);
      return { success: false, message: result.message };
    }
    
  } catch (error) {
    log('error', `❌ Phoneme search failed for "${phonemeInput}"`, { error: error.message });
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  const startTime = Date.now();
  
  try {
    log('info', '🚀 Starting Decoding Den Supabase API tests...');
    
    // Test 1: Supabase Connection
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      log('error', '💥 Supabase connection failed - stopping tests');
      return;
    }
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Test 2: Phoneme Search Tests
    const testInputs = ['/m/', 'sh', 'stage1_m', 'ch', 'ai', 'kn'];
    const searchResults = [];
    
    for (const input of testInputs) {
      const result = await testPhonemeSearch(supabase, input);
      searchResults.push({ input, result });
      
      // Brief pause between tests
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Test Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const successfulSearches = searchResults.filter(r => r.result.success).length;
    
    log('info', '📊 Test Summary:');
    log('success', `✅ Supabase connection: Working`);
    log('success', `✅ Total phonemes in database: ${connectionTest.totalPhonemes}`);
    log('success', `✅ Successful searches: ${successfulSearches}/${testInputs.length}`);
    log('info', `⏱️  Total test time: ${duration} seconds`);
    
    // Detailed search results
    log('info', '🔍 Search Results Detail:');
    searchResults.forEach(({ input, result }) => {
      if (result.success) {
        log('success', `✅ "${input}" → Found: ${result.rawData.phoneme} (${result.rawData.phoneme_id})`);
      } else {
        log('warning', `⚠️ "${input}" → ${result.message || 'Not found'}`);
      }
    });
    
    // Show a complete API response example
    const successfulResult = searchResults.find(r => r.result.success);
    if (successfulResult) {
      log('info', '📋 Complete API Response Example:');
      const apiResponse = {
        success: true,
        phoneme_data: successfulResult.result.transformed,
        correction_message: null,
        generated_at: new Date().toISOString(),
      };
      
      // Show just the structure, not all content
      log('info', 'API Response Structure:', {
        success: apiResponse.success,
        phoneme_data: {
          phoneme: apiResponse.phoneme_data.phoneme,
          graphemes_count: apiResponse.phoneme_data.graphemes.length,
          has_articulation: !!apiResponse.phoneme_data.articulation,
          word_lists: Object.keys(apiResponse.phoneme_data.word_lists),
          sentences: apiResponse.phoneme_data.practice_texts.sentences.length + ' sentences',
          research_citations: apiResponse.phoneme_data.research_citations.length + ' citations'
        },
        generated_at: apiResponse.generated_at
      });
    }
    
    if (successfulSearches > 0) {
      log('success', '🎉 Supabase integration is working! API is ready for use.');
    } else {
      log('error', '❌ No successful searches - check data migration and search logic.');
    }
    
  } catch (error) {
    log('error', '💥 Test suite failed with critical error', {
      error: error.message,
      stack: error.stack
    });
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('warning', '🛑 Tests interrupted by user');
  process.exit(1);
});

// Run the tests
if (require.main === module) {
  runAllTests();
}

module.exports = { testSupabaseConnection, testPhonemeSearch, transformPhonemeData };