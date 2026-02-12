# Heart Words Implementation - Project Status

**Last Updated:** February 11, 2026
**Status:** In Progress

---

## Overview

We are implementing a comprehensive **Heart Words** system across all 8 stages of the Decoding Den phonics curriculum. Heart words are high-frequency words with irregular parts that cannot be decoded using current GPC (Grapheme-Phoneme Correspondence) knowledge and require explicit memorization.

### Key Distinction
- **Heart Words (❤️):** Irregular words needing memorization (e.g., "the", "was", "said")
- **Decodable Words (✅):** Words that can be sounded out with taught GPCs - these are shown in "Decodable Words" section, NOT in Heart Words

---

## Files Created/Modified

### New Data Files

1. **`/app/data/core400Words.ts`**
   - Contains the Core 400 high-frequency word list organized by stage
   - Each word has properties: `word`, `introducedAtStage`, `isHeartWord`, `trickyPart`, `upgradesAtStage`, `pattern`, `isPermanentlyIrregular`
   - Includes helper functions: `getWordsByStage()`, `getHeartWordsByStage()`, `getDecodableWordsByStage()`, `getUpgradesAtStage()`, `getStageSummary()`

2. **`/app/data/core400WeeklyMap.ts`**
   - Maps Core 400 words to specific weeks (1-7) within each stage
   - Weeks 8-9 are Review weeks, Week 10 is Mastery (no new words)
   - Includes `getLegacySightWordsForWeek()` for compatibility with existing UI
   - Distribution: Heart words spread across weeks 1-7, aligned with GPC teaching

### Modified Files

1. **`/app/teacher/stages/[stage]/page.tsx`**
   - Added imports for Core 400 data and weekly map functions
   - Added collapsible "Heart Words for Stage X" section
   - Updated weekly modal to show Heart Words (blue cards, ❤️ icon)
   - Updated "Decodable Words" section to show cumulative words
   - Added intensity markers (★ CORE, ▲ TEACH, ○ EXPOSURE) next to phonemes
   - Moved Grid/List View toggle to header

---

## Current Implementation State

### Completed

1. **Heart Words Section (Collapsible)**
   - Header shows: `❤️ Heart Words for Stage X` | `12 heart words` | intensity legend
   - Expands to show all heart words for the stage
   - Shows upgrades (heart words that become decodable at this stage)

2. **Weekly Modal - Heart Words**
   - Shows only NEW heart words for that week by default
   - Toggle button: "Show all (X)" to see cumulative heart words
   - Blue card styling (matching decodable text highlighting)
   - ❤️ icon on each word
   - Popover on click shows tricky part explanation

3. **Weekly Modal - Decodable Words**
   - Shows CUMULATIVE decodable words (from week 1 through current week)
   - New words: soft yellow background (`bg-amber-50`)
   - Old words: white background
   - Vowels highlighted in red

4. **Intensity Markers**
   - ★ (amber) = CORE — drill to automaticity
   - ▲ (sky blue) = TEACH — explicit instruction
   - ○ (gray) = EXPOSURE — encounter in reading
   - Now displayed next to each phoneme in week cards and modal

5. **UI Improvements**
   - Grid/List View toggle moved to header (next to "Back to Stages")
   - Intensity legend moved to Heart Words title line
   - Removed redundant containers

### Stage 1 Focus Word Fixes Applied
- Removed "as" from Week 1 (taught as heart word in Week 6)
- Changed "mas" to "mam" in Week 1
- Removed "ant" from Week 2 (blend - not appropriate for early Stage 1)
- Removed "flip" from Week 5 (blend)

---

## Week Distribution Logic

### Teaching Weeks (1-7)
- New GPCs introduced
- New heart words introduced
- New decodable focus words

### Review Weeks (8-9)
- No new words
- Cumulative review of all words

### Mastery Week (10)
- End-of-stage assessment
- All cumulative words

---

## Heart Words by Stage (Approximate Counts)

| Stage | Heart Words | Notes |
|-------|-------------|-------|
| 1 | 12 | the, a, I, to, is, you, he, she, of, was, said, as |
| 2 | 6 | all, one, what, do, call, who |
| 3 | 8 | come, some, have, give, live, love, done, gone |
| 4 | 6 | know, two, been, many, people, only |
| 5 | 4 | every, different, (+ upgrades) |
| 6 | 6 | thought, through, enough, small, about, around |
| 7 | 3 | once, don't, won't |
| 8 | 10 | because, together, into, both, most, put, again, also |

---

## Known Issues / TODO

1. **Page Loading Issue**
   - Page was stuck loading after moving View toggle to header
   - Build passes successfully
   - May need dev server restart or browser cache clear
   - Check browser console for runtime errors

2. **Remaining Stages to Verify**
   - Stage 1 focus words have been cleaned up
   - Stages 2-8 focus words need review for blends/inappropriate words

3. **Week Mapping Refinement**
   - Current week assignments in `core400WeeklyMap.ts` may need adjustment
   - Some words might need to be moved to different weeks based on GPC alignment

4. **Testing Needed**
   - Verify heart words display correctly in all 8 stages
   - Verify cumulative decodable words work across all weeks
   - Verify upgrade notifications appear correctly

---

## Code Patterns

### Getting Heart Words for a Week
```typescript
import { getLegacySightWordsForWeek } from '@/app/data/core400WeeklyMap';

const weekSightWords = getLegacySightWordsForWeek(stageNumber, weekNumber);
const heartWords = weekSightWords.filter(w => w.isHeartWord);
```

### Getting Stage Summary
```typescript
import { getStageSummary, getHeartWordsByStage } from '@/app/data/core400Words';

const summary = getStageSummary(stageNumber);
// summary.heartWordCount, summary.decodableCount, etc.

const heartWords = getHeartWordsByStage(stageNumber);
```

---

## Visual Design Decisions

- **Heart Words:** Blue cards with ❤️ icon (matches decodable text highlighting)
- **New Heart Words:** Same blue styling (distinguished by "+X new" badge)
- **Decodable Words - New:** Soft yellow background (`bg-amber-50`)
- **Decodable Words - Review:** White background
- **Vowels:** Red text in decodable words

---

## Next Steps

1. Fix page loading issue (restart dev server, clear cache)
2. Review and clean up focus words for Stages 2-8 (remove blends)
3. Verify heart word week assignments align with GPC teaching sequence
4. Test all stages thoroughly
5. Consider adding heart word teaching tips to weekly modal

---

## Reference Documents

- `/docs/core-400/Decoding_Den_Core_400.html` - Original Core 400 reference document
- `/app/data/allStagesDatabase.ts` - GPC sequence and stage definitions
