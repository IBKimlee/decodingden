// Enhanced Phoneme Data Structure - Science of Reading Compliant
export interface PhonemeMetadata {
  stage: number;
  frequencyRank: number;
  complexityScore: number;
  prerequisitePhonemes: string[];
  gradeBand: 'K-1' | '1-2' | '2-3' | '3+';
}

export interface ArticulationData {
  manner: 'stop' | 'fricative' | 'nasal' | 'liquid' | 'glide' | 'affricate';
  place: 'bilabial' | 'labiodental' | 'dental' | 'alveolar' | 'palatal' | 'velar' | 'glottal';
  voicing: 'voiced' | 'voiceless';
  airflow: 'oral' | 'nasal';
}

export interface LinguisticProperties {
  phoneme: string;
  graphemes: string[];
  graphemeFrequency: Record<string, number>;
  articulation: ArticulationData;
  phonologicalNeighbors: string[];
  morphologicalRole: ('initial' | 'medial' | 'final')[];
}

export interface InstructionalPhase {
  phase: 'isolation' | 'blending' | 'application';
  activities: string[];
  duration: string;
}

export interface Assessment {
  type: string;
  criterion: string;
  frequency: string;
}

export interface DifferentiationProtocol {
  additionalPractice: string;
  multisensoryEmphasis: boolean;
  progressMonitoring: string;
  interventionTriggers: string[];
}

export interface EnhancedPhoneme {
  phonemeId: string;
  metadata: PhonemeMetadata;
  linguisticProperties: LinguisticProperties;
  instructionalSequence: {
    introductionPhase: {
      week: number;
      lessonPosition: 'early' | 'middle' | 'late';
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
  differentiationProtocols: {
    strugglingLearners: DifferentiationProtocol;
    advancedLearners: {
      acceleration: string;
      enrichment: string;
      complexityIncrease: string;
    };
    englishLearners: {
      nativeLanguageConnections: boolean;
      visualSupports: string;
      oralLanguageEmphasis: string;
      culturalConsiderations: string[];
    };
  };
  researchAttribution: {
    primarySources: string[];
    evidenceLevel: string;
    effectSize: string;
    populationValidated: string[];
  };
  contentGeneration: {
    wordLists: {
      cvcWords: string;
      decodableSentences: string;
      practiceTexts: string;
    };
    teachingMaterials: {
      lessonPlans: string;
      assessmentItems: string;
      homeActivities: string;
    };
  };
}