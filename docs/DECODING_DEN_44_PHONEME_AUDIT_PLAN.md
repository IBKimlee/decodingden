# Decoding Den — 44 Phoneme Audit Plan

**Date:** 2026-04-19
**Purpose:** Verify every phoneme's data is accurate across all Decoding Den sections.

---

## Approach

Go phoneme by phoneme. For each phoneme, check all 8 sections plus Focus Sound. Mark it done. Move to the next phoneme.

---

## What To Check Per Phoneme

Search the phoneme in Decoding Den, then check each section:

| # | Section | What to check |
|---|---------|---------------|
| 1 | **Focus Sound** | Correct phoneme symbol, correct grapheme, anchor word matches grapheme |
| 2 | **Phoneme Insight** | Articulation (place, manner, voicing), mouth instructions, common errors, teacher tips |
| 3 | **Let's Learn It** | Explanations accurate, rules correct, tips practical |
| 4 | **Word List Practice** | Words real and decodable, sorted by position, correct phoneme, all graphemes covered |
| 5 | **Simple Sentences** | Sentences exist, decodable, use target phoneme, no errors |
| 6 | **Short Story** | Story exists, uses target phoneme, age-appropriate |
| 7 | **Differentiation** | Struggling / on-level / advanced strategies present and practical |
| 8 | **Word Practice Space** | Loads, content matches phoneme |
| 9 | **Read Along** | Loads, content matches phoneme |

---

## Progress Tracking

### Consonants (1-24)

| # | Phoneme | Search | Status | Issues |
|---|---------|--------|--------|--------|
| 1 | /m/ | /m/ | | |
| 2 | /n/ | /n/ | | |
| 3 | /p/ | /p/ | | |
| 4 | /b/ | /b/ | | |
| 5 | /t/ | /t/ | | |
| 6 | /d/ | /d/ | | |
| 7 | /k/ | /k/ | | |
| 8 | /g/ | /g/ | | |
| 9 | /f/ | /f/ | | |
| 10 | /v/ | /v/ | | |
| 11 | /s/ | /s/ | | |
| 12 | /z/ | /z/ | | |
| 13 | /h/ | /h/ | | |
| 14 | /w/ | /w/ | | |
| 15 | /y/ | /y/ | | |
| 16 | /l/ | /l/ | | |
| 17 | /r/ | /r/ | | |
| 18 | /ch/ | /ch/ | | |
| 19 | /sh/ | /sh/ | | |
| 20 | /th/ voiceless | th → Voiceless | | |
| 21 | /th/ voiced | th → Voiced | | |
| 22 | /ng/ | /ng/ | | |
| 23 | /zh/ | zh | | |
| 24 | /kw/ | qu | | |

### Short Vowels (25-29)

| # | Phoneme | Search | Status | Issues |
|---|---------|--------|--------|--------|
| 25 | /ă/ | short a | | |
| 26 | /ĕ/ | short e | | |
| 27 | /ĭ/ | short i | | |
| 28 | /ŏ/ | short o | | |
| 29 | /ŭ/ | short u | | |

### Long Vowels (30-34)

| # | Phoneme | Search | Status | Issues |
|---|---------|--------|--------|--------|
| 30 | /ā/ | long a | | |
| 31 | /ē/ | long e | | |
| 32 | /ī/ | long i | | |
| 33 | /ō/ | long o | | |
| 34 | /ū/ | long u | | |

### Other Vowels & Diphthongs (35-44)

| # | Phoneme | Search | Status | Issues |
|---|---------|--------|--------|--------|
| 35 | /ar/ | /ar/ | | |
| 36 | /er/ | /er/ | | |
| 37 | /or/ | /or/ | | |
| 38 | /oi/ | /oi/ | | |
| 39 | /ow/ | /ow/ | | |
| 40 | /aw/ | aw | | |
| 41 | /oo/ long | /oo/ | | |
| 42 | /oo/ short | /ʊ/ | | |
| 43 | /air/ | air | | |
| 44 | /ear/ | ear | | |

---

## Handoff Rules

1. One phoneme at a time. Check all 8 sections. Mark done. Move to next.
2. Fix issues as you find them before moving on.
3. Data source: `app/data/allComprehensivePhonemes.ts`
4. Matching logic: `app/api/decoding-den/route.ts`
5. Do not touch Teaching Stages, Student Den, Heart Words, or auth during this audit.

---

## Current Step

**Start with phoneme #1: /m/**
