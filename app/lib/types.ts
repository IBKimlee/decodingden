// Unified type definitions for Supabase integration
// © 2025 Decoding Den. All rights reserved.

export interface PhonemeEntry {
  id: string;
  phoneme: string;
  graphemes: string[];
  stage: number;
  frequency_rank: number;
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
  created_at?: string;
  updated_at?: string;
}

export interface StageInfo {
  id: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  phoneme_id: string;
  duration: string;
  objectives: string[];
  materials: string[];
  structure: {
    engage: string;
    teach: string;
    practice: string;
    assess: string;
    extend: string;
  };
  differentiation: {
    struggling: string;
    on_level: string;
    advanced: string;
  };
  research_basis: string[];
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  phoneme_id: string;
  stage: number;
  mastery_level: 'introduced' | 'practicing' | 'mastered';
  last_practiced: string;
  attempts: number;
  success_rate: number;
  created_at?: string;
  updated_at?: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  phoneme_id: string;
  assessment_type: 'daily' | 'weekly' | 'summative';
  score: number;
  max_score: number;
  feedback: string;
  administered_at: string;
  created_at?: string;
}