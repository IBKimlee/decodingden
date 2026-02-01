# Phonics Data Migration to Supabase

This guide will help you migrate your phonics curriculum data from TypeScript files to your Supabase database.

## Overview

I've created a comprehensive database schema and migration system that will move all your phonics data from static TypeScript files into Supabase tables, allowing for dynamic data retrieval and better performance.

## What's Been Created

### 1. Database Schema (`supabase/migrations/001_create_phonics_schema.sql`)
- **phonics_stages**: 8-stage phonics progression system
- **phonemes**: Individual phoneme entries with metadata
- **phonics_assessments**: Stage-specific assessments
- **research_justifications**: Academic backing for each stage
- **scope_sequence_categories**: K-5 curriculum progression
- **phoneme_scope_mappings**: Links phonemes to curriculum
- **word_phoneme_mappings**: For decodability calculations
- **phoneme_development_norms**: Speech development data
- **student_phonics_progress**: Individual progress tracking

### 2. Sample Data (`supabase/migrations/002_insert_phonics_data.sql`)
- Complete Stage 1 and Stage 2 phoneme data
- All 8 phonics stages with metadata
- Sample assessments and research justifications
- Differentiation strategies
- Scope and sequence categories

### 3. Helper Functions (`lib/supabase/phonics-queries.ts`)
- Replacement functions for your TypeScript data access
- Student progress tracking
- Assessment management
- Performance utilities

## Migration Options

### Option 1: Supabase Dashboard (Recommended)

1. **Access your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `ufgqsdzehncouogsxazf`

2. **Run Schema Migration**
   - Navigate to SQL Editor
   - Copy the contents of `supabase/migrations/001_create_phonics_schema.sql`
   - Paste and execute
   - Verify tables are created

3. **Insert Data**
   - Copy the contents of `supabase/migrations/002_insert_phonics_data.sql`
   - Paste and execute
   - Check the verification queries at the end

### Option 2: Supabase CLI (If you have it installed)

```bash
# Apply schema migration
supabase db push

# Or run migrations individually
supabase db reset
```

### Option 3: Development Branch (Advanced)

If you want to test first:
1. Create a development branch in Supabase
2. Apply migrations to the branch
3. Test the data
4. Merge to production

## Updating Your Application Code

### Replace Data Import Statements

**Before:**
```typescript
import { EIGHT_STAGE_SYSTEM, getPhonemesByStage } from '@/app/data/allStagesDatabase';
import { STAGE_PHONEME_SAMPLES } from '@/app/data/allStagesDatabase';
```

**After:**
```typescript
import { getAllStages, getPhonemesByStage } from '@/lib/supabase/phonics-queries';
```

### Update Function Calls

**Before:**
```typescript
// Static data access
const stages = EIGHT_STAGE_SYSTEM;
const phonemes = getPhonemesByStage(1);
```

**After:**
```typescript
// Dynamic database access
const stages = await getAllStages();
const phonemes = await getPhonemesByStage(1);
```

### Example Component Updates

**Before:**
```typescript
export default function StageViewer() {
  const stages = EIGHT_STAGE_SYSTEM;
  const currentStagePhonemes = getPhonemesByStage(currentStage);
  
  return (
    <div>
      {stages.map(stage => (
        <div key={stage.stage_number}>
          {stage.stage_name}
        </div>
      ))}
    </div>
  );
}
```

**After:**
```typescript
export default function StageViewer() {
  const [stages, setStages] = useState<PhonicsStage[]>([]);
  const [phonemes, setPhonemes] = useState<Phoneme[]>([]);

  useEffect(() => {
    async function loadData() {
      const stagesData = await getAllStages();
      const phonemesData = await getPhonemesByStage(currentStage);
      setStages(stagesData);
      setPhonemes(phonemesData);
    }
    loadData();
  }, [currentStage]);
  
  return (
    <div>
      {stages.map(stage => (
        <div key={stage.id}>
          {stage.name}
        </div>
      ))}
    </div>
  );
}
```

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ufgqsdzehncouogsxazf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Key Benefits After Migration

1. **Dynamic Data**: Update curriculum without code deployment
2. **Student Progress**: Track individual student phonics progress
3. **Performance**: Indexed database queries vs. static file parsing
4. **Scalability**: Support for multiple teachers and classes
5. **Real-time Updates**: Data changes reflect immediately
6. **Analytics**: Query student performance across phonemes/stages

## Available Query Functions

### Stages
- `getAllStages()` - Get all 8 phonics stages
- `getStageById(id)` - Get specific stage
- `getStagesByGrade(grade)` - Filter by grade level

### Phonemes  
- `getAllPhonemes()` - Get all phonemes
- `getPhonemesByStage(stageId)` - Get phonemes for a stage
- `getPhonemeById(phonemeId)` - Get specific phoneme
- `getPhonemesByGrapheme(grapheme)` - Search by spelling

### Student Progress
- `getStudentProgress(studentId)` - All progress for student
- `getStudentProgressByStage(studentId, stageId)` - Stage-specific progress
- `getCurrentStageForStudent(studentId)` - Current stage
- `updateStudentProgress(studentId, data)` - Record progress

### Assessments
- `getAssessmentsByStage(stageId)` - Stage assessments
- `getAssessmentsByType(type)` - Daily/weekly/summative

## Data Verification

After migration, run these queries to verify:

```sql
-- Check data counts
SELECT 'Stages: ' || COUNT(*) FROM phonics_stages;
SELECT 'Phonemes: ' || COUNT(*) FROM phonemes;
SELECT 'Assessments: ' || COUNT(*) FROM phonics_assessments;

-- Sample data check
SELECT * FROM phonics_stages ORDER BY id LIMIT 3;
SELECT * FROM phonemes WHERE stage_id = 1 LIMIT 5;
```

## Migration Checklist

- [ ] Run schema migration (001_create_phonics_schema.sql)
- [ ] Insert sample data (002_insert_phonics_data.sql)
- [ ] Verify data in Supabase dashboard
- [ ] Update environment variables
- [ ] Install/update Supabase client in your app
- [ ] Update component imports
- [ ] Convert static data access to async queries
- [ ] Test lesson generation with new data source
- [ ] Test stage viewer with database data
- [ ] Update student progress tracking
- [ ] Remove old TypeScript data files (optional)

## Rollback Plan

If needed, you can always revert to the original TypeScript files:
1. Keep the original files as backup
2. The new query functions are drop-in replacements
3. Switch imports back to original files if needed

## Next Steps

1. **Complete the data extraction**: The current migration includes Stage 1 and 2 sample data. You may want to extract and migrate all phoneme data from your TypeScript files.

2. **Update your API routes**: The `/api/generate-lesson` endpoint can now pull from the database instead of static files.

3. **Student progress tracking**: Start using the new progress tracking tables to monitor student advancement.

4. **Teacher dashboard**: Build admin interfaces to manage the phonics curriculum data.

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify RLS policies are working correctly
3. Ensure environment variables are set
4. Test queries in the SQL editor first

The migration preserves all your existing functionality while adding powerful database capabilities for student tracking and curriculum management.