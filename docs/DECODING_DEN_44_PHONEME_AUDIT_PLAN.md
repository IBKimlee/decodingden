# Decoding Den — 44 Phoneme Audit Plan

**Date:** 2026-04-19
**Purpose:** Verify every phoneme's data is accurate across all Decoding Den sections.

---

## Approach

Go phoneme by phoneme. For each phoneme, check the stage-independent sections first. Stage-dependent sections (word lists, sentences, stories) wait until 8-stage classification is finalized.

---

## Phase 1: Stage-Independent Sections (do now)

These sections are about the sound itself, not about scope and sequence:

| # | Section | What to check |
|---|---------|---------------|
| 1 | **Focus Sound** | Correct phoneme symbol, correct grapheme, anchor word matches grapheme |
| 2 | **Phoneme Insight** | Articulation (place, manner, voicing), mouth instructions, common errors, teacher tips |
| 3 | **Let's Learn It** | Explanations accurate and phoneme-specific, rules correct, tips practical |
| 7 | **Differentiation** | Struggling / on-level / advanced strategies present and practical |
| G | **Grapheme Coverage** | All common graphemes listed, no incorrect graphemes, frequency labels accurate |

## Phase 2: Stage-Dependent Sections (do after 8-stage classification is finalized)

These sections depend on which phonemes are taught when:

| # | Section | What to check |
|---|---------|---------------|
| 4 | **Word List Practice** | Words decodable using only previously taught phonemes, sorted by position |
| 5 | **Simple Sentences** | Sentences decodable at the appropriate stage level |
| 6 | **Short Story** | Story decodable, uses target phoneme, age-appropriate |
| 8 | **Word Practice Space** | Content matches phoneme and stage scope |
| 9 | **Read Along** | Content matches phoneme and stage scope |

---

## Progress Tracking

### Consonants (1-24)

| # | Phoneme | Search | Phase 1 | Phase 2 | Issues |
|---|---------|--------|---------|---------|--------|
| 1 | /m/ | /m/ | IN PROGRESS | BLOCKED | Teaching content is generic, not /m/-specific |
| 2 | /n/ | /n/ | | | |
| 3 | /p/ | /p/ | | | |
| 4 | /b/ | /b/ | | | |
| 5 | /t/ | /t/ | | | |
| 6 | /d/ | /d/ | | | |
| 7 | /k/ | /k/ | | | |
| 8 | /g/ | /g/ | | | |
| 9 | /f/ | /f/ | | | |
| 10 | /v/ | /v/ | | | |
| 11 | /s/ | /s/ | | | |
| 12 | /z/ | /z/ | | | |
| 13 | /h/ | /h/ | | | |
| 14 | /w/ | /w/ | | | |
| 15 | /y/ | /y/ | | | |
| 16 | /l/ | /l/ | | | |
| 17 | /r/ | /r/ | | | |
| 18 | /ch/ | /ch/ | | | |
| 19 | /sh/ | /sh/ | | | |
| 20 | /th/ voiceless | th → Voiceless | | | |
| 21 | /th/ voiced | th → Voiced | | | |
| 22 | /ng/ | /ng/ | | | |
| 23 | /zh/ | zh | | | |
| 24 | /kw/ | qu | | | |

### Short Vowels (25-29)

| # | Phoneme | Search | Phase 1 | Phase 2 | Issues |
|---|---------|--------|---------|---------|--------|
| 25 | /ă/ | short a | | | |
| 26 | /ĕ/ | short e | | | |
| 27 | /ĭ/ | short i | | | |
| 28 | /ŏ/ | short o | | | |
| 29 | /ŭ/ | short u | | | |

### Long Vowels (30-34)

| # | Phoneme | Search | Phase 1 | Phase 2 | Issues |
|---|---------|--------|---------|---------|--------|
| 30 | /ā/ | long a | | | |
| 31 | /ē/ | long e | | | |
| 32 | /ī/ | long i | | | |
| 33 | /ō/ | long o | | | |
| 34 | /ū/ | long u | | | |

### Other Vowels & Diphthongs (35-44)

| # | Phoneme | Search | Phase 1 | Phase 2 | Issues |
|---|---------|--------|---------|---------|--------|
| 35 | /ar/ | /ar/ | | | |
| 36 | /er/ | /er/ | | | |
| 37 | /or/ | /or/ | | | |
| 38 | /oi/ | /oi/ | | | |
| 39 | /ow/ | /ow/ | | | |
| 40 | /aw/ | aw | | | |
| 41 | /oo/ long | /oo/ | | | |
| 42 | /oo/ short | /ʊ/ | | | |
| 43 | /air/ | air | | | |
| 44 | /ear/ | ear | | | |

---

## Dependencies

- **Phase 1** can proceed now — no blockers
- **Phase 2** is blocked until the 8-stage classification and counting work is finalized
- The 8-stage governance track is documented in `docs/8_STAGE_CONSENSUS_GOVERNANCE_PLAN.md`

---

## Handoff Rules

1. Phase 1 first: check stage-independent sections across all 44 phonemes
2. Do not start Phase 2 until 8-stage classification is done
3. Data source: `app/data/allComprehensivePhonemes.ts`
4. Matching logic: `app/api/decoding-den/route.ts`
5. Do not touch Teaching Stages data during this audit
6. Fix issues as you find them before moving to the next phoneme

---

## Current Step

**Phase 1, phoneme #1: /m/ — fix the Let's Learn It content to be /m/-specific**
