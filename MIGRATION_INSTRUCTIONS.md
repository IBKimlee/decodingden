# 🎯 DECODING DEN: PHONEME DATA MIGRATION INSTRUCTIONS

This guide will walk you through safely migrating your consolidated phoneme data into your Supabase `public.phonemes` table.

## 📋 Prerequisites

### 1. Node.js Installation
Ensure you have Node.js 16+ installed:

```bash
# Check your Node.js version
node --version

# If you need to install Node.js, visit: https://nodejs.org/
# Or use a package manager:
# macOS: brew install node
# Windows: winget install OpenJS.NodeJS
```

### 2. Supabase Credentials
You'll need two pieces of information from your Supabase dashboard:

- **Supabase URL**: Found in Settings > API
- **Service Role Key**: Found in Settings > API (NOT the anon public key)

⚠️ **SECURITY NOTE**: The Service Role Key has full database access. Keep it secure and never commit it to version control.

## 🚀 Step-by-Step Migration Process

### Step 1: Install Dependencies

Navigate to your project directory and install the required packages:

```bash
cd /Users/kimlee/Desktop/decodingden
npm install
```

This will install the `@supabase/supabase-js` package needed for the migration.

### Step 2: Set Environment Variables

Set your Supabase credentials as environment variables. Choose one method:

#### Option A: Terminal Environment Variables (Recommended)
```bash
export SUPABASE_URL="https://your-project-id.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

#### Option B: Create a .env file (Alternative)
Create a `.env` file in your project root:

```bash
# Create .env file
touch .env

# Add your credentials (replace with actual values)
echo "SUPABASE_URL=https://your-project-id.supabase.co" >> .env
echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here" >> .env
```

If using .env file, install dotenv and modify the script:
```bash
npm install dotenv
```

### Step 3: Verify Your Setup

Before running the migration, verify everything is set up correctly:

```bash
# Check that your environment variables are set
echo $SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Verify the data file exists
ls -la consolidated_phoneme_data.json

# Check Node.js and npm
node --version
npm --version
```

### Step 4: Run the Migration

Execute the migration script:

```bash
node migrate-phonemes.js
```

**What you'll see:**
- Real-time progress logs with timestamps
- Batch processing updates (10 phonemes per batch)
- Success/failure indicators for each phoneme
- Final summary with migration statistics

**Expected output:**
```
[2025-01-02T10:30:00.000Z] INFO: 🚀 Starting Decoding Den phoneme data migration...
[2025-01-02T10:30:00.100Z] SUCCESS: Environment variables validated successfully
[2025-01-02T10:30:00.200Z] SUCCESS: Supabase client initialized with service role key
[2025-01-02T10:30:00.300Z] SUCCESS: Loaded 120 phonemes from data file
[2025-01-02T10:30:00.400Z] SUCCESS: Database connection verified
[2025-01-02T10:30:00.500Z] INFO: Processing batch 1 (10 phonemes)
[2025-01-02T10:30:01.000Z] SUCCESS: ✅ Upserted phoneme: /m/ (stage1_m)
[2025-01-02T10:30:01.100Z] SUCCESS: ✅ Upserted phoneme: /s/ (stage1_s)
...
[2025-01-02T10:30:30.000Z] SUCCESS: 🎉 Migration completed successfully!
```

### Step 5: Handle Common Issues

#### Issue: "Missing required environment variables"
**Solution**: Ensure your environment variables are properly set:
```bash
export SUPABASE_URL="your-url-here"
export SUPABASE_SERVICE_ROLE_KEY="your-key-here"
```

#### Issue: "Database connection failed"
**Solutions**:
- Verify your Supabase URL is correct
- Ensure your Service Role Key is valid (not the anon key)
- Check that your Supabase project is active

#### Issue: "ENOENT: no such file or directory"
**Solution**: Ensure the data file exists:
```bash
ls -la consolidated_phoneme_data.json
```

#### Issue: Network/timeout errors
**Solution**: The script includes automatic retry logic. If issues persist:
- Check your internet connection
- Verify Supabase service status
- Consider running during off-peak hours

## ✅ Migration Verification

### Method 1: Using the Script's Output
The script provides a detailed summary at the end:
- Total phonemes processed
- Success/failure counts
- Error details (if any)

### Method 2: Supabase Dashboard Query
Go to your Supabase dashboard > SQL Editor and run:

```sql
-- Check total phoneme count
SELECT COUNT(*) as total_phonemes FROM public.phonemes;

-- Verify JSONB columns have data
SELECT 
  phoneme_id,
  phoneme,
  stage_id,
  CASE WHEN articulation_data IS NOT NULL THEN '✅' ELSE '❌' END as articulation_data,
  CASE WHEN instructional_sequence IS NOT NULL THEN '✅' ELSE '❌' END as instructional_sequence,
  CASE WHEN assessment_framework_details IS NOT NULL THEN '✅' ELSE '❌' END as assessment_framework,
  CASE WHEN differentiation_protocols IS NOT NULL THEN '✅' ELSE '❌' END as differentiation,
  CASE WHEN linguistic_properties_extended IS NOT NULL THEN '✅' ELSE '❌' END as linguistic_properties,
  CASE WHEN weekly_data_override IS NOT NULL THEN '✅' ELSE '❌' END as weekly_data,
  CASE WHEN content_generation_meta IS NOT NULL THEN '✅' ELSE '❌' END as content_meta
FROM public.phonemes
ORDER BY stage_id, phoneme_id
LIMIT 10;
```

### Method 3: Sample Data Check
Verify specific phoneme data:

```sql
-- Check a specific phoneme's complete data
SELECT * FROM public.phonemes 
WHERE phoneme_id = 'stage1_m';

-- Verify JSONB structure for articulation data
SELECT 
  phoneme_id,
  phoneme,
  articulation_data->>'manner' as manner,
  articulation_data->>'place' as place,
  articulation_data->>'voicing' as voicing
FROM public.phonemes 
WHERE phoneme_id IN ('stage1_m', 'stage1_s', 'stage2_ch')
ORDER BY stage_id;
```

### Expected Results:
- **Total phonemes**: 120+ records
- **All JSONB columns**: Should show ✅ for non-null data
- **Stage distribution**: Phonemes across stages 1-8
- **Rich data**: Articulation details, teaching sequences, assessments

## 🔒 Security Best Practices

### After Migration:
1. **Unset environment variables**:
   ```bash
   unset SUPABASE_URL
   unset SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Remove .env file** (if used):
   ```bash
   rm .env
   ```

3. **Clear command history** (optional):
   ```bash
   history -c
   ```

## 🚨 Troubleshooting

### Script Fails Completely
1. Check Node.js version: `node --version`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Verify file permissions: `chmod +x migrate-phonemes.js`

### Partial Migration Success
- The script will show exactly which phonemes failed
- You can re-run the script safely (it uses upsert operations)
- Failed phonemes will be retried automatically

### Need to Start Over
To completely reset the phonemes table:

```sql
-- ⚠️ WARNING: This will delete ALL data in the phonemes table
DELETE FROM public.phonemes;

-- Then re-run the migration script
```

## 📞 Support

If you encounter issues:
1. Check the detailed error logs from the script
2. Verify your Supabase project settings
3. Ensure your consolidated_phoneme_data.json file is valid JSON
4. Review the JSONB column definitions in your Supabase table

The migration script is designed to be safe and can be run multiple times without creating duplicates.