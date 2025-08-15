# Original 8-Stage Teacher System Structure - Pre-Supabase

## Overview
This document details the complete original structure of the 8-stage phonics teaching system before Supabase integration. The system was built on Science of Reading principles with comprehensive TypeScript interfaces and hardcoded data arrays.

## 1. Core Data Files Location
All original data was located in `/app/data/` directory:

- **allStagesDatabase.ts** - Main 8-stage system and phoneme samples
- **phonemeDatabase.ts** - Comprehensive phoneme database class
- **scopeAndSequence.ts** - Grade-level progression mapping
- **phonemeDevelopmentDatabase.ts** - Developmental data
- **comprehensivePhonemeDataset.ts** - Extended phoneme properties
- **assessmentDatabase.ts** - Assessment frameworks
- **researchJustifications.ts** - Research citations

## 2. Original 8-Stage System Structure

### Stage Information Interface
```typescript
export interface StageInfo {
  stage_number: number;
  stage_name: string;
  grade_level: string;
  student_phase: string;
  duration: string;
  total_elements: number;
  description: string;
  key_concept: string;
  instructional_focus: string[];
  science_of_reading_alignment: {
    ehri_phase: string;
    research_principle: string;
    orthographic_mapping: string;
  };
}
```

### The 8 Stages (Hardcoded Array)
```typescript
export const EIGHT_STAGE_SYSTEM: StageInfo[] = [
  {
    stage_number: 1,
    stage_name: "Core Consonants & Short Vowels",
    grade_level: "Kindergarten – Fall Semester",
    student_phase: "Pre-Alphabetic to Partial Alphabetic Phase",
    duration: "10 weeks",
    total_elements: 15,
    description: "Students learn foundational consonants and short vowels...",
    key_concept: "Letters represent sounds. When we put consonant-vowel-consonant together...",
    instructional_focus: [
      "CVC word formation (consonant-vowel-consonant)",
      "Phonemic awareness integration with letters",
      "Letter-sound correspondence mastery",
      "Basic decoding skills development"
    ],
    science_of_reading_alignment: {
      ehri_phase: "Pre-alphabetic to Partial Alphabetic",
      research_principle: "Ehri (2005); NRP (2000) - Foundational consonants...",
      orthographic_mapping: "Foundation for connecting letters to sounds in memory"
    }
  },
  // ... 7 more stages
];
```

## 3. Phoneme Entry Structure

### Core Phoneme Interface
```typescript
export interface PhonemeEntry {
  phoneme_id: string;
  stage: number;
  phoneme: string;
  graphemes: string[];
  frequency_rank: number;
  complexity_score: number;
  grade_band: string;
  introduction_week: number;
  word_examples: string[];
  decodable_sentences: string[];
  assessment_criteria: {
    daily: string;
    weekly: string;
    summative: string;
  };
  teaching_advantages: string[];
  research_sources: string[];
}
```

### Sample Phoneme Data (Hardcoded)
```typescript
export const STAGE_PHONEME_SAMPLES: PhonemeEntry[] = [
  // STAGE 1: Core Consonants & Short Vowels
  { 
    phoneme_id: "stage1_m", 
    stage: 1, 
    phoneme: "/m/", 
    graphemes: ["m"], 
    frequency_rank: 1, 
    complexity_score: 1.0, 
    grade_band: "K-Fall", 
    introduction_week: 1, 
    word_examples: ["mat", "mad", "man", "mom", "mud"], 
    decodable_sentences: ["I am mad.", "Sam has a mat."], 
    assessment_criteria: { 
      daily: "90% accuracy", 
      weekly: "85% accuracy", 
      summative: "95% letter-sound" 
    }, 
    teaching_advantages: ["visible articulation", "continuous sound"], 
    research_sources: ["Ehri (2005); NRP (2000)"] 
  },
  // ... more phonemes
];
```

## 4. Enhanced Phoneme Structure (EnhancedPhoneme Interface)

### Complete Enhanced Structure
```typescript
export interface EnhancedPhoneme {
  phonemeId: string;
  metadata: {
    stage: number;
    frequencyRank: number;
    complexityScore: number;
    prerequisitePhonemes: string[];
    gradeBand: string;
  };
  linguisticProperties: {
    phoneme: string;
    graphemes: string[];
    graphemeFrequency: Record<string, number>;
    articulation: {
      manner: string;
      place: string;
      voicing: string;
      airflow: string;
    };
    phonologicalNeighbors: string[];
    morphologicalRole: string[];
  };
  instructionalSequence: {
    introductionPhase: {
      week: number;
      lessonPosition: string;
      prerequisiteCheck: string[];
      masteryCriteria: string;
    };
    practicePhases: InstructionalPhase[];
  };
  assessmentFramework: {
    formativeAssessments: Assessment[];
    summativeAssessment: {
      wordReading: string;
      spelling: string;
      transfer: string;
    };
  };
  // ... more detailed properties
}
```

## 5. Assessment Framework Structure

### Assessment Benchmarks (Hardcoded)
```typescript
export const ASSESSMENT_BENCHMARKS = {
  stage1: {
    phoneme_production: "90% accuracy",
    letter_sound: "95% accuracy", 
    cvc_reading: "85% accuracy",
    cvc_spelling: "80% accuracy",
    fluency_target: "10 CVC words per minute"
  },
  stage2: {
    digraph_reading: "90% accuracy",
    blend_production: "85% accuracy",
    cvcc_ccvc_reading: "80% accuracy",
    fluency_target: "15 words per minute"
  },
  // ... stages 3-8
};
```

## 6. Scope and Sequence Structure

### Grade-Level Progression
```typescript
export const SCOPE_AND_SEQUENCE: { [key: string]: PhonemeData } = {
  'frequent-consonants': {
    phonemes: ['/m/', '/s/', '/t/', '/p/', '/n/', '/k/', '/b/', '/d/', '/g/', '/f/'],
    graphemes: ['m', 's', 't', 'p', 'n', 'k', 'b', 'd', 'g', 'f'],
    gradeLevel: 'Kindergarten',
    category: 'Frequent & Consistent Sounds (Consonants)',
    prerequisites: [],
    exampleWords: ['man', 'sun', 'top', 'pen', 'net', 'kit', 'bat', 'dog', 'go', 'fan'],
    order: 1,
    description: 'Letter names & sounds, foundational consonants...'
  },
  // ... more categories
};
```

## 7. Original JSON Stage Files (Archived)

### Stage File Structure (Example from stage5_complete_example.json)
```json
{
  "stage_number": 5,
  "stage_name": "R-Controlled Vowels",
  "grade_level": "Second Grade",
  "student_phase": "Consolidated Alphabetic Phase",
  "duration": "6-8 weeks",
  "total_elements": 7,
  "description": "Students master r-controlled vowel patterns...",
  "key_concept": "The letter 'r' is bossy! When 'r' comes after a vowel...",
  "instructional_focus": [
    "Primary r-controlled vowels: ar, or, er, ir, ur",
    "Advanced r-controlled patterns: air, ear",
    "Schwa understanding: er/ir/ur often sound alike"
  ],
  "science_of_reading_alignment": {
    "ehri_phase": "Consolidated Alphabetic Phase - chunking common patterns",
    "research_principle": "Corpus analysis shows r-controlled frequency patterns",
    "orthographic_mapping": "R-controlled patterns essential for multisyllabic words"
  },
  "phonemes": [
    {
      "phoneme_id": "stage5_ar",
      "metadata": {
        "stage": 5,
        "frequency_rank": 12,
        "complexity_score": 3.8,
        "prerequisite_phonemes": ["/a/", "/r/"],
        "grade_band": "2",
        "introduction_week": 1
      },
      "linguistic_properties": {
        "phoneme": "/ar/",
        "graphemes": ["ar"],
        "grapheme_frequency": {"ar": 100},
        "articulation": {
          "manner": "r_controlled_vowel",
          "place": "low_back_retroflex",
          "voicing": "voiced",
          "air_flow": "oral"
        }
      },
      "word_examples": {
        "medial_position": ["car", "bar", "far", "star", "hard", "park"],
        "cumulative_decodable_sentences_98_percent": [
          "The car is far from the park. (86% decodable)",
          "I can see a star from my car. (86% decodable)"
        ]
      },
      "assessment_framework_enhanced": {
        "formative_daily": "80% accuracy /ar/ vs /a/ discrimination",
        "formative_weekly": "75% accuracy /ar/ word reading",
        "summative": "85% r-controlled recognition, 80% reading, 75% spelling"
      }
    }
  ]
}
```

## 8. Data Access Pattern (Original)

### PhonemeDatabase Class
```typescript
export class PhonemeDatabase {
  private stages: Map<number, any> = new Map();
  private phonemes: Map<string, EnhancedPhoneme> = new Map();
  
  constructor() {
    this.initializeDatabase();
  }

  // Key methods:
  getStagePhonemes(stageNumber: number): EnhancedPhoneme[]
  getPhoneme(phonemeId: string): EnhancedPhoneme | undefined
  getPhonemesByComplexity(minScore: number, maxScore: number): EnhancedPhoneme[]
  getPrerequisites(phonemeId: string): EnhancedPhoneme[]
  getTeachingSequence(stageNumber: number): any
  getAssessmentProtocols(stageNumber: number): any
}
```

### Helper Functions
```typescript
export function getPhonemesByStage(stage: number): PhonemeEntry[]
export function getStageInfo(stageNumber: number): StageInfo | undefined
export function getPhonemeById(phonemeId: string): PhonemeEntry | undefined
export function getAssessmentBenchmark(stage: number): any
export function calculateNextPhonemes(masteredPhonemes: string[], currentStage: number): string[]
```

## 9. Frontend Component Access Pattern

### Original Data Import Pattern
```typescript
import { EIGHT_STAGE_SYSTEM, getStageInfo, getPhonemesByStage } from '@/app/data/allStagesDatabase';
import { phonemeDatabase } from '@/app/data/phonemeDatabase';
import { SCOPE_AND_SEQUENCE } from '@/app/data/scopeAndSequence';
```

### Component Usage Example
```typescript
// Direct access to hardcoded arrays
const stages = EIGHT_STAGE_SYSTEM;
const stageInfo = getStageInfo(stageNumber);
const phonemes = getPhonemesByStage(stageNumber);

// Class-based access
const phonemeDb = new PhonemeDatabase();
const stagePhonemes = phonemeDb.getStagePhonemes(stageNumber);
```

## 10. Legal Compliance Structure

### Original Legal Framework
```typescript
export const LEGAL_COMPLIANCE = {
  copyright_notice: "© 2025 Decoding Den. All rights reserved.",
  disclaimer: "Decoding Den is an independent educational platform...",
  research_attribution: "Our instructional design is based on findings...",
  compliance_verification: "This content contains zero proprietary material...",
  prohibited_associations: "This content is not derived from, affiliated with..."
};
```

## 11. Differentiation Strategies (Hardcoded)

### Original Differentiation Structure
```typescript
export const DIFFERENTIATION_STRATEGIES = {
  struggling: {
    pace: "50% slower progression",
    practice: "Double the practice opportunities",
    instruction: "Explicit multisensory instruction",
    grouping: "Small group or 1:1 instruction"
  },
  on_level: {
    pace: "Standard progression",
    practice: "Regular practice schedule",
    instruction: "Whole group with targeted small group"
  },
  advanced: {
    pace: "Accelerated by 25-50%",
    practice: "Extension activities and enrichment",
    instruction: "Independent application opportunities"
  }
};
```

## 12. Key Differences from Supabase Version

### Data Storage
- **Original**: Hardcoded TypeScript arrays and objects
- **Supabase**: Database tables with queries

### Data Access
- **Original**: Direct imports and function calls
- **Supabase**: Async database queries with `getAllStages()`, `getAllPhonemes()`

### Structure Changes
- **Original**: Nested objects with complex interfaces
- **Supabase**: Flattened table structure with relationships

### Performance
- **Original**: Immediate data access, no network calls
- **Supabase**: Network-dependent with loading states

## 13. Migration Considerations

When recreating the original system, key elements to preserve:

1. **Complete 8-stage progression** with all metadata
2. **Comprehensive phoneme entries** with linguistic properties
3. **Assessment frameworks** with benchmarks
4. **Research citations** and legal compliance
5. **Differentiation strategies** for all learner types
6. **Decodable sentence generation** capabilities
7. **Cumulative word list** functionality
8. **Teaching sequence** ordering
9. **Prerequisites mapping** between phonemes
10. **Grade-level alignment** with standards

## 14. File Dependencies

### Original Import Chain
```
Frontend Components
├── allStagesDatabase.ts (EIGHT_STAGE_SYSTEM, STAGE_PHONEME_SAMPLES)
├── phonemeDatabase.ts (PhonemeDatabase class)
├── scopeAndSequence.ts (SCOPE_AND_SEQUENCE)
├── assessmentDatabase.ts (ASSESSMENT_BENCHMARKS)
├── phonemeDevelopmentDatabase.ts (PHONEME_DEVELOPMENT_DATA)
├── comprehensivePhonemeDataset.ts (ComprehensivePhonemeEntry)
└── researchJustifications.ts (Research citations)
```

This structure provided a complete, self-contained phonics instruction system with all data locally available and no external dependencies beyond the TypeScript interfaces.