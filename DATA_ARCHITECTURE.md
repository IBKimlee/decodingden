# Data Architecture

This document explains where data lives in Decoding Den and why.

## Core Principle

**TypeScript files = Curriculum content (static)**
**Supabase = User data (dynamic)**

The 8-stage phonics curriculum is research-validated content that rarely changes. It belongs in TypeScript files for:
- Version control (changes tracked in git)
- Type safety (compile-time validation)
- Fast access (no database queries for static content)
- Easy updates (edit file, deploy)

User-generated and dynamic data goes in Supabase:
- Student progress tracking
- Teacher accounts
- Assignments and groups
- Class management

---

## TypeScript Data Files

All located in `/app/data/`:

### Primary Curriculum Data

| File | Purpose | Used By |
|------|---------|---------|
| `allStagesDatabase.ts` | 8-stage curriculum system, stage info, research justifications | Teacher stages pages, API |
| `scopeAndSequence.ts` | K-5 scope & sequence overview | Scope & sequence viewer |
| `assessmentDatabase.ts` | Checkpoint assessments by stage | Assessment generator |

### Phoneme Reference Data

| File | Purpose | Used By |
|------|---------|---------|
| `allComprehensivePhonemes.ts` | Phoneme metadata for API lookups | Decoding Den API |
| `comprehensivePhonemeFrequencies.ts` | Detailed frequency data | Sound of the Day |
| `graphemeFrequencies.ts` | Grapheme spelling percentages | Phoneme detail displays |
| `phonemeDevelopmentDatabase.ts` | Speech development data | Teaching tips |

---

## Supabase Tables

### User & Auth Data

| Table | Purpose |
|-------|---------|
| `teachers` | Teacher accounts |
| `students` | Student accounts (linked to teachers) |
| `student_groups` | Class/group definitions |
| `group_memberships` | Student-to-group assignments |

### Assignment Data

| Table | Purpose |
|-------|---------|
| `assignments` | Created assignments |
| `student_assignments` | Individual student assignment records |
| `group_assignments` | Group-level assignment records |

### Phoneme Reference (Minimal)

| Table | Purpose |
|-------|---------|
| `phonemes` | Basic phoneme info for search |
| `phonics_stages` | Stage definitions |

**Note:** Supabase phoneme tables contain minimal data for search/lookup. The rich content (frequencies, research, teaching tips) comes from TypeScript files.

---

## How Data Flows

### 8 Stages Teacher Portal

```
Teacher Portal → TypeScript (allStagesDatabase.ts)
                          ↓
              Renders stage info, weekly curriculum
                          ↓
              PDF generation (jsPDF)
```

No Supabase queries for curriculum content.

### Decoding Den Search

```
Search Query → API (decoding-den/route.ts)
                    ↓
        Query Supabase (basic phoneme info)
                    ↓
        Enrich with TypeScript (frequencies, details)
                    ↓
        Return combined data
```

### Student Progress

```
Student Activity → API
                    ↓
        Write to Supabase (progress tables)
                    ↓
        Read curriculum from TypeScript (what's next)
```

---

## Why This Architecture

1. **Performance**: Static curriculum loads instantly from bundled TypeScript
2. **Reliability**: No database dependency for core content
3. **Type Safety**: Compile-time validation of curriculum structure
4. **Easy Updates**: Edit TypeScript, deploy, done
5. **Cost Effective**: Fewer database queries
6. **Git History**: Full change tracking for curriculum

---

## Adding New Data

### New curriculum content (stages, phonemes, assessments):
→ Add to appropriate TypeScript file in `/app/data/`

### New user-generated data (progress, assignments, preferences):
→ Create Supabase migration in `/supabase/migrations/`

### New reference data that needs search:
→ Consider if search is required:
  - Yes: Add minimal data to Supabase, rich data to TypeScript
  - No: TypeScript only

---

## Files Removed (2025 Cleanup)

These files were orphaned (not imported anywhere) and have been deleted:

| File | Reason |
|------|--------|
| `phonemeDatabase.ts` | Duplicate of allStagesDatabase content |
| `enhancedScopeSequence.ts` | Duplicate of allStagesDatabase content |
| `comprehensivePhonemeDataset.ts` | Interface-only, unused |
| `researchJustifications.ts` | Content merged into allStagesDatabase.ts |
