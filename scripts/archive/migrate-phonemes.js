#!/usr/bin/env node

/**
 * 🎯 DECODING DEN: PHONEME DATA MIGRATION SCRIPT
 * =============================================
 * 
 * This script migrates consolidated phoneme data from the JSON file
 * into the Supabase public.phonemes table with all JSONB columns.
 * 
 * Requirements:
 * - Node.js 16+ 
 * - @supabase/supabase-js package
 * - Environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * 
 * Usage: node migrate-phonemes.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  DATA_FILE_PATH: path.join(__dirname, 'consolidated_phoneme_data_COMPLETE.json'),
  BATCH_SIZE: 10, // Process phonemes in batches to avoid overwhelming the database
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // milliseconds
};

// ANSI colors for better logging
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

/**
 * Enhanced logging with timestamps and colors
 */
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

/**
 * Validate required environment variables
 */
function validateEnvironment() {
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    log('error', `Missing required environment variables: ${missing.join(', ')}`);
    log('info', 'Please set these environment variables before running the script:');
    missing.forEach(varName => {
      log('info', `export ${varName}="your_value_here"`);
    });
    process.exit(1);
  }
  
  log('success', 'Environment variables validated successfully');
}

/**
 * Initialize Supabase client with service role key
 */
function initializeSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  log('success', 'Supabase client initialized with service role key');
  return supabase;
}

/**
 * Read and parse the consolidated phoneme data file
 */
async function loadPhonemeData() {
  try {
    log('info', `Reading phoneme data from: ${CONFIG.DATA_FILE_PATH}`);
    
    const fileContent = await fs.readFile(CONFIG.DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    
    if (!data.phonemes || !Array.isArray(data.phonemes)) {
      throw new Error('Invalid data structure: missing phonemes array');
    }
    
    log('success', `Loaded ${data.phonemes.length} phonemes from data file`);
    log('info', `Data generated on: ${data.metadata.generated_date}`);
    
    return data.phonemes;
  } catch (error) {
    log('error', 'Failed to load phoneme data', { 
      error: error.message,
      path: CONFIG.DATA_FILE_PATH 
    });
    throw error;
  }
}

/**
 * Transform phoneme object to match Supabase table schema
 */
function transformPhonemeForDB(phoneme) {
  return {
    // Basic fields (existing columns)
    phoneme_id: phoneme.phoneme_id,
    stage_id: phoneme.stage_id,
    phoneme: phoneme.phoneme,
    graphemes: phoneme.graphemes,
    frequency_rank: phoneme.frequency_rank,
    complexity_score: phoneme.complexity_score,
    grade_band: phoneme.grade_band,
    introduction_week: phoneme.introduction_week,
    word_examples: phoneme.word_examples,
    decodable_sentences: phoneme.decodable_sentences,
    assessment_criteria: phoneme.assessment_criteria,
    teaching_advantages: phoneme.teaching_advantages,
    research_sources: phoneme.research_sources,
    
    // JSONB fields (new columns)
    articulation_data: phoneme.articulation_data,
    instructional_sequence: phoneme.instructional_sequence,
    assessment_framework_details: phoneme.assessment_framework_details,
    differentiation_protocols: phoneme.differentiation_protocols,
    linguistic_properties_extended: phoneme.linguistic_properties_extended,
    weekly_data_override: phoneme.weekly_data_override,
    content_generation_meta: phoneme.content_generation_meta,
    
    // Timestamps
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

/**
 * Perform upsert operation with retry logic
 */
async function upsertPhoneme(supabase, phoneme, attempt = 1) {
  try {
    const dbPhoneme = transformPhonemeForDB(phoneme);
    
    // Use upsert (insert with on_conflict do update)
    const { data, error } = await supabase
      .from('phonemes')
      .upsert(dbPhoneme, {
        onConflict: 'phoneme_id',
        ignoreDuplicates: false
      })
      .select();
    
    if (error) {
      throw error;
    }
    
    log('success', `✅ Upserted phoneme: ${phoneme.phoneme} (${phoneme.phoneme_id})`);
    return { success: true, data };
    
  } catch (error) {
    if (attempt < CONFIG.RETRY_ATTEMPTS) {
      log('warning', `Retry ${attempt}/${CONFIG.RETRY_ATTEMPTS} for phoneme: ${phoneme.phoneme_id}`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * attempt));
      return upsertPhoneme(supabase, phoneme, attempt + 1);
    }
    
    log('error', `❌ Failed to upsert phoneme: ${phoneme.phoneme} (${phoneme.phoneme_id})`, {
      error: error.message,
      code: error.code,
      details: error.details
    });
    
    return { success: false, error };
  }
}

/**
 * Process phonemes in batches to avoid overwhelming the database
 */
async function processPhonemeBatch(supabase, phonemes, batchNumber) {
  log('info', `Processing batch ${batchNumber} (${phonemes.length} phonemes)`);
  
  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };
  
  // Process phonemes in parallel within the batch
  const promises = phonemes.map(phoneme => upsertPhoneme(supabase, phoneme));
  const batchResults = await Promise.allSettled(promises);
  
  // Analyze results
  batchResults.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      results.successful++;
    } else {
      results.failed++;
      const phoneme = phonemes[index];
      const error = result.status === 'rejected' ? result.reason : result.value.error;
      results.errors.push({
        phoneme_id: phoneme.phoneme_id,
        phoneme: phoneme.phoneme,
        error: error.message || error
      });
    }
  });
  
  log('info', `Batch ${batchNumber} complete: ${results.successful} successful, ${results.failed} failed`);
  
  return results;
}

/**
 * Main migration function
 */
async function migratePhonemes() {
  const startTime = Date.now();
  
  try {
    log('info', '🚀 Starting Decoding Den phoneme data migration...');
    
    // Validate environment
    validateEnvironment();
    
    // Initialize Supabase
    const supabase = initializeSupabase();
    
    // Load phoneme data
    const phonemes = await loadPhonemeData();
    
    // Verify table structure (optional check)
    log('info', 'Verifying database connection...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('phonemes')
      .select('phoneme_id')
      .limit(1);
    
    if (tableError) {
      throw new Error(`Database connection failed: ${tableError.message}`);
    }
    
    log('success', 'Database connection verified');
    
    // Process phonemes in batches
    const totalBatches = Math.ceil(phonemes.length / CONFIG.BATCH_SIZE);
    const overallResults = {
      successful: 0,
      failed: 0,
      errors: []
    };
    
    for (let i = 0; i < phonemes.length; i += CONFIG.BATCH_SIZE) {
      const batch = phonemes.slice(i, i + CONFIG.BATCH_SIZE);
      const batchNumber = Math.floor(i / CONFIG.BATCH_SIZE) + 1;
      
      const batchResults = await processPhonemeBatch(supabase, batch, batchNumber);
      
      overallResults.successful += batchResults.successful;
      overallResults.failed += batchResults.failed;
      overallResults.errors.push(...batchResults.errors);
      
      // Progress indicator
      const progress = Math.round((batchNumber / totalBatches) * 100);
      log('info', `Migration progress: ${progress}% (${batchNumber}/${totalBatches} batches)`);
      
      // Brief pause between batches
      if (batchNumber < totalBatches) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Final summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    log('info', '📊 Migration Summary:');
    log('success', `✅ Successfully migrated: ${overallResults.successful} phonemes`);
    
    if (overallResults.failed > 0) {
      log('error', `❌ Failed migrations: ${overallResults.failed} phonemes`);
      log('error', 'Failed phonemes:', overallResults.errors);
    }
    
    log('info', `⏱️  Total migration time: ${duration} seconds`);
    
    if (overallResults.failed === 0) {
      log('success', '🎉 Migration completed successfully!');
      process.exit(0);
    } else {
      log('warning', '⚠️  Migration completed with some failures. Please review the errors above.');
      process.exit(1);
    }
    
  } catch (error) {
    log('error', '💥 Migration failed with critical error', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('warning', '🛑 Migration interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('warning', '🛑 Migration terminated');
  process.exit(1);
});

// Run the migration
if (require.main === module) {
  migratePhonemes();
}

module.exports = { migratePhonemes, transformPhonemeForDB };