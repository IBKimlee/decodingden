# Decoding Den Archive

This directory contains historical files from the development process of Decoding Den's research-validated phonics curriculum.

## Archive Structure

### `/iterations/`
Contains various iterations of the stage development process:
- `final_stages/` - Final versions before research-based reorganization
- `new_stages/` - Interim versions during development 
- `temp_stages/` - Temporary working versions

### `/old-json-stages/`
Contains individual JSON files for each stage from various development phases:
- `stage1.json` through `stage8.json` - Original individual stage files
- `stage*_research_aligned.json` - Research-aligned versions during transition
- `stage5_complete_example.json` - Complete example during development

### `/reference-files/`
Contains compilation and backup files:
- `all_stages_combined.txt` - Text compilation of all stages
- `original_stages.zip` - Backup of original stage files

## Current Authoritative Sources

The current live system uses these files as the single source of truth:

1. **`/decoding-den/app/data/allStagesDatabase.ts`** - Primary research-validated database
2. **`/decoding-den/app/data/researchJustifications.ts`** - Research documentation and sources
3. **`/decoding-den/app/teacher/stages/[stage]/page.tsx`** - Weekly implementation data

## Research Foundation

The current system is based on:
- Fry (2004) phoneme-grapheme frequency data
- National Reading Panel (2000) systematic phonics principles  
- Ehri's Four Phases of Word Reading development
- Science of Reading evidence-based practices

## Archive Date
Created: ${new Date().toLocaleDateString()}

---
**Note:** These archived files are preserved for reference only. All current development should use the authoritative sources listed above.