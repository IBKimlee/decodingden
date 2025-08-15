// Comprehensive Phoneme Database - Science of Reading Compliant
// © 2025 Decoding Den. All rights reserved.

import { EnhancedPhoneme } from '@/app/types/phoneme';

export interface PhonemeStage {
  stage_number: number;
  stage_name: string;
  grade_level: string;
  student_phase: string;
  duration: string;
  total_phonemes: number;
  description: string;
  key_concept: string;
  instructional_focus: string[];
  science_of_reading_alignment: {
    ehri_phase: string;
    national_reading_panel: string;
    adams_principle: string;
    orthographic_mapping: string;
  };
}

export interface LegalCompliance {
  copyright_notice: string;
  disclaimer: string;
  research_attribution: string;
  compliance_verification: string;
  usage_terms: string;
  research_foundation: {
    primary_sources: string[];
    methodology: string;
    development_approach: string;
  };
  prohibited_associations: string;
  contact_info: string;
}

// Stage 1 Data from uploaded JSON
export const stage1Data = {
  legal_compliance: {
    copyright_notice: "© 2025 Decoding Den. All rights reserved.",
    disclaimer: "Decoding Den is an independent educational platform built entirely on publicly available Science of Reading research. Our content is original and research-informed, drawing from peer-reviewed studies by Ehri, Seidenberg, Adams, and other leading scientists. We are not affiliated with, derived from, or endorsed by any commercial reading program or proprietary curriculum.",
    research_attribution: "Our instructional design is based on findings from the National Reading Panel, IES Practice Guides, and decades of cognitive and linguistic research. All content is independently developed using evidence-based principles.",
    compliance_verification: "This content contains zero proprietary material and is built exclusively from publicly available research sources.",
    usage_terms: "This material may be used for educational purposes with proper attribution. Commercial use requires written permission from Decoding Den.",
    research_foundation: {
      primary_sources: [
        "National Reading Panel (2000) - Systematic phonics instruction most effective in kindergarten",
        "Ehri, L.C. (2005) - Partial alphabetic phase development",
        "Adams, M.J. (1990) - Most frequent, consistent consonants taught first",
        "Liu & Groen (2024) - Morphological awareness systematic review",
        "Mather & Wendling (2024) - Orthographic mapping foundations"
      ],
      methodology: "Science of Reading-based systematic phonics instruction",
      development_approach: "Independent creation from public research only"
    },
    prohibited_associations: "This content is not derived from, affiliated with, or endorsed by LETRS, Wilson Reading System, Orton-Gillingham programs, or any commercial curriculum.",
    contact_info: "For permissions or legal inquiries: legal@decodingden.com"
  },
  stage_info: {
    stage_number: 1,
    stage_name: "Foundation Consonants & Short Vowels",
    grade_level: "Kindergarten (ages 5-6)",
    student_phase: "Pre-alphabetic to Partial Alphabetic",
    duration: "10-12 weeks",
    total_phonemes: 15,
    description: "Students learn the most frequent, consistent consonants and all short vowels to enable CVC word formation. This foundational stage establishes letter-sound correspondence and basic decoding skills essential for reading development.",
    key_concept: "Letters represent sounds. When we put consonant-vowel-consonant together, we can read and spell words. This is the foundation of all reading.",
    instructional_focus: [
      "CVC word formation (consonant-vowel-consonant)",
      "Phonemic awareness integration with letters",
      "Letter-sound correspondence mastery",
      "Basic decoding skills development",
      "Systematic introduction by frequency and consistency"
    ],
    science_of_reading_alignment: {
      ehri_phase: "Pre-alphabetic to Partial Alphabetic - children use first and last sounds in words",
      national_reading_panel: "Systematic phonics instruction most effective in kindergarten and first grade",
      adams_principle: "Most frequent, consistent consonants should be taught first",
      orthographic_mapping: "Foundation for connecting letters to sounds in memory"
    }
  }
};

// Complete Phoneme Database organized by stages
export class PhonemeDatabase {
  private stages: Map<number, any> = new Map();
  private phonemes: Map<string, EnhancedPhoneme> = new Map();
  
  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // Stage 1 phonemes will be loaded from the JSON
    this.stages.set(1, stage1Data);
    
    // Convert Stage 1 phonemes to enhanced format
    this.loadStage1Phonemes();
  }

  private loadStage1Phonemes() {
    // This will be populated with the actual phoneme data from the JSON
    // For now, creating a sample structure
    const samplePhoneme: EnhancedPhoneme = {
      phonemeId: "stage1_m",
      metadata: {
        stage: 1,
        frequencyRank: 13,
        complexityScore: 1.2,
        prerequisitePhonemes: [],
        gradeBand: "K-1"
      },
      linguisticProperties: {
        phoneme: "/m/",
        graphemes: ["m"],
        graphemeFrequency: { "m": 100 },
        articulation: {
          manner: "nasal",
          place: "bilabial",
          voicing: "voiced",
          airflow: "nasal"
        },
        phonologicalNeighbors: ["/n/", "/b/", "/p/"],
        morphologicalRole: ["initial", "medial", "final"]
      },
      instructionalSequence: {
        introductionPhase: {
          week: 1,
          lessonPosition: "early",
          prerequisiteCheck: [],
          masteryCriteria: "90% accuracy sound production"
        },
        practicePhases: [
          {
            phase: "isolation",
            activities: ["mirror work", "articulation practice"],
            duration: "3-5 days"
          },
          {
            phase: "blending",
            activities: ["cvc formation", "onset-rime"],
            duration: "5-7 days"
          },
          {
            phase: "application",
            activities: ["text reading", "spelling"],
            duration: "ongoing"
          }
        ]
      },
      assessmentFramework: {
        formativeAssessments: [
          {
            type: "sound production",
            criterion: "90% accuracy",
            frequency: "daily"
          },
          {
            type: "grapheme recognition",
            criterion: "95% accuracy",
            frequency: "weekly"
          }
        ],
        summativeAssessment: {
          wordReading: "85% accuracy on 20 words",
          spelling: "80% accuracy on 10 words",
          transfer: "can apply in novel words"
        }
      },
      differentiationProtocols: {
        strugglingLearners: {
          additionalPractice: "50% more exposures",
          multisensoryEmphasis: true,
          progressMonitoring: "daily",
          interventionTriggers: ["below 70% after 1 week"]
        },
        advancedLearners: {
          acceleration: "introduce related phonemes",
          enrichment: "morphological connections",
          complexityIncrease: "multisyllabic words"
        },
        englishLearners: {
          nativeLanguageConnections: true,
          visualSupports: "enhanced",
          oralLanguageEmphasis: "additional 20 minutes",
          culturalConsiderations: ["cognate awareness"]
        }
      },
      researchAttribution: {
        primarySources: [
          "Adams, M.J. (1990) - /m/ recommended as first phoneme due to visibility",
          "National Reading Panel (2000) - Systematic introduction of consistent sounds"
        ],
        evidenceLevel: "Tier 1 - Multiple RCTs",
        effectSize: "d = 0.8 (large effect)",
        populationValidated: ["general ed", "struggling readers", "ELL"]
      },
      contentGeneration: {
        wordLists: {
          cvcWords: "auto-generated cumulative",
          decodableSentences: "95% decodability guaranteed",
          practiceTexts: "controlled vocabulary"
        },
        teachingMaterials: {
          lessonPlans: "auto-generated 40min format",
          assessmentItems: "criterion-referenced",
          homeActivities: "parent-friendly"
        }
      }
    };
    
    this.phonemes.set("stage1_m", samplePhoneme);
  }

  // Get all phonemes for a specific stage
  getStagePhonemes(stageNumber: number): EnhancedPhoneme[] {
    const stage = this.stages.get(stageNumber);
    if (!stage) return [];
    
    // Return phonemes for the requested stage
    return Array.from(this.phonemes.values()).filter(
      phoneme => phoneme.metadata.stage === stageNumber
    );
  }

  // Get a specific phoneme by ID
  getPhoneme(phonemeId: string): EnhancedPhoneme | undefined {
    return this.phonemes.get(phonemeId);
  }

  // Get phonemes by complexity score range
  getPhonemesByComplexity(minScore: number, maxScore: number): EnhancedPhoneme[] {
    return Array.from(this.phonemes.values()).filter(
      phoneme => phoneme.metadata.complexityScore >= minScore && 
                 phoneme.metadata.complexityScore <= maxScore
    );
  }

  // Get phonemes by grade band
  getPhonemesByGradeBand(gradeBand: string): EnhancedPhoneme[] {
    return Array.from(this.phonemes.values()).filter(
      phoneme => phoneme.metadata.gradeBand === gradeBand
    );
  }

  // Get prerequisite phonemes for a given phoneme
  getPrerequisites(phonemeId: string): EnhancedPhoneme[] {
    const phoneme = this.phonemes.get(phonemeId);
    if (!phoneme) return [];
    
    return phoneme.metadata.prerequisitePhonemes
      .map(id => this.phonemes.get(id))
      .filter(p => p !== undefined) as EnhancedPhoneme[];
  }

  // Get teaching sequence for a stage
  getTeachingSequence(stageNumber: number): any {
    const stage = this.stages.get(stageNumber);
    return stage?.teaching_sequence || null;
  }

  // Get assessment protocols for a stage
  getAssessmentProtocols(stageNumber: number): any {
    const stage = this.stages.get(stageNumber);
    return stage?.assessment_protocols || null;
  }

  // Get differentiation strategies
  getDifferentiationStrategies(stageNumber: number): any {
    const stage = this.stages.get(stageNumber);
    return stage?.differentiation_strategies || null;
  }

  // Get legal compliance information
  getLegalCompliance(): LegalCompliance {
    return stage1Data.legal_compliance;
  }

  // Get stage information
  getStageInfo(stageNumber: number): PhonemeStage | null {
    const stage = this.stages.get(stageNumber);
    return stage?.stage_info || null;
  }

  // Check if student has mastered prerequisites
  hasPrerequisiteMastery(phonemeId: string, studentMasteredPhonemes: string[]): boolean {
    const phoneme = this.phonemes.get(phonemeId);
    if (!phoneme) return false;
    
    return phoneme.metadata.prerequisitePhonemes.every(
      prereq => studentMasteredPhonemes.includes(prereq)
    );
  }

  // Get cumulative word list based on taught phonemes
  getCumulativeWordList(taughtPhonemes: string[]): string[] {
    // This would generate words using only the phonemes that have been taught
    // Implementation would use the word generation algorithm
    return [];
  }

  // Get decodable sentences based on taught phonemes
  getDecodableSentences(taughtPhonemes: string[], count: number = 5): string[] {
    // Generate sentences with 95%+ decodability using taught phonemes
    return [];
  }
}

// Export singleton instance
export const phonemeDatabase = new PhonemeDatabase();