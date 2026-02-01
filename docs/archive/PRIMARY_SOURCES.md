# Decoding Den - Primary Sources Documentation

## Authoritative Files

These files constitute the single source of truth for Decoding Den's research-validated 8-stage phonics curriculum:

### 1. Main Database
**`/app/data/allStagesDatabase.ts`**
- Complete 8-stage system with metadata
- Stage descriptions, grade levels, duration, elements count
- Research alignment and instructional focus
- Student phase progressions (Ehri's framework)

### 2. Research Documentation  
**`/app/data/researchJustifications.ts`**
- Peer-reviewed research sources and citations
- Research basis for each stage's phoneme selection
- Justifications for sequencing decisions

### 3. Weekly Implementation Data
**`/app/teacher/stages/[stage]/page.tsx`**
- Detailed 10-week breakdown for each stage
- Weekly phonemes, graphemes, and focus words
- Assessment schedules and teaching tips
- Decodable sentences for practice

### 4. Supporting Data Files
**`/app/data/enhancedScopeSequence.ts`** - Enhanced scope and sequence
**`/app/data/phonemeDatabase.ts`** - Phoneme database utilities
**`/app/data/scopeAndSequence.ts`** - Core scope and sequence

## Research Foundation

Our curriculum is built on three primary research pillars:

1. **Fry (2004)** - Phoneme-grapheme frequency data for optimal sequencing
2. **National Reading Panel (2000)** - Systematic phonics instruction principles  
3. **Ehri (2005)** - Four Phases of Word Reading development framework

## File Management Rules

1. **Never modify these files without research justification**
2. **All changes must maintain research alignment**
3. **Archive old versions before making significant changes**
4. **Document all changes with research citations**

## Stage Overview

| Stage | Focus | Grade | Elements | Phase |
|-------|-------|-------|----------|--------|
| 1 | Core Consonants & Short Vowels | K-Fall | 15 | Pre-Alphabetic → Partial |
| 2 | Remaining Single Letters & Simple Patterns | K-Spring | 7 | Partial Alphabetic |
| 3 | Consonant Digraphs | 1st-Fall | 8 | Full Alphabetic - Emerging |
| 4 | Long Vowels with Silent E | 1st-Spring | 6 | Full Alphabetic |
| 5 | High-Frequency Vowel Teams | 2nd-Fall | 8 | Consolidated - Emerging |
| 6 | R-Controlled Vowels & Diphthongs | 2nd-Spring | 8 | Consolidated - Developing |
| 7 | Silent Letters & Advanced Patterns | 3rd-Fall | 11 | Consolidated - Proficient |
| 8 | Morphology & Complex Patterns | 3rd-Spring | 10 | Consolidated - Advanced |

## Last Updated
${new Date().toLocaleDateString()}

---
**IMPORTANT:** Historical files have been archived in `/archive/`. Only use the files listed above for current development.