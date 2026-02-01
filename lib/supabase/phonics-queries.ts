/**
 * SUPABASE PHONICS DATA QUERIES
 * Helper functions to retrieve phonics curriculum data from Supabase
 * Replaces the static TypeScript data files
 */

import { createClient } from '@supabase/supabase-js';

// Types matching our database schema
export interface PhonicsStage {
  id: number;
  name: string;
  grade_band: string;
  student_phase: string | null;
  duration: string | null;
  total_elements: number | null;
  description: string | null;
  key_concept: string | null;
  instructional_focus: string[] | null;
  science_of_reading_alignment: any | null;
  created_at: string;
  updated_at: string;
  // Computed properties for compatibility
  stage_number: number;
  stage_name: string;
  grade_level: string;
}

export interface Phoneme {
  id: string;
  phoneme_id: string;
  stage_id: number;
  phoneme: string;
  graphemes: string[];
  frequency_rank: number | null;
  complexity_score: number | null;
  grade_band: string | null;
  introduction_week: number | null;
  word_examples: string[] | null;
  decodable_sentences: string[] | null;
  assessment_criteria: any | null;
  teaching_advantages: string[] | null;
  research_sources: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface PhonicsAssessment {
  id: string;
  stage_id: number;
  assessment_type: 'daily' | 'weekly' | 'summative';
  name: string;
  description: string | null;
  questions: any | null;
  scoring_rubric: any | null;
  intervention_recommendations: any | null;
  benchmark_criteria: any | null;
  time_limit_minutes: number | null;
  passing_threshold: number | null;
  created_at: string;
  updated_at: string;
}

export interface StudentPhonicsProgress {
  id: string;
  student_id: string;
  stage_id: number | null;
  phoneme_id: string | null;
  assessment_id: string | null;
  mastery_level: 'not_started' | 'emerging' | 'developing' | 'proficient' | 'advanced' | null;
  score: number | null;
  attempts: number | null;
  first_attempt_date: string | null;
  mastery_date: string | null;
  intervention_triggers: string[] | null;
  next_recommended_phonemes: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Initialize Supabase client (you'll need to provide your URL and key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// STAGE QUERIES
// ============================================================================

// Cache for stages data (static, doesn't change)
let stagesCache: PhonicsStage[] | null = null;

/**
 * Get all phonics stages (cached)
 */
export async function getAllStages(): Promise<PhonicsStage[]> {
  // Return cached data if available
  if (stagesCache) {
    return stagesCache;
  }

  const { data, error } = await supabase
    .from('phonics_stages')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching stages:', error);
    throw error;
  }

  // Map database fields to component-expected fields
  const mappedData = (data || []).map(stage => ({
    ...stage,
    stage_number: stage.id,
    stage_name: stage.name,
    grade_level: stage.grade_band
  }));

  // Cache the result
  stagesCache = mappedData;

  return mappedData;
}

/**
 * Get a specific stage by ID
 */
export async function getStageById(stageId: number): Promise<PhonicsStage | null> {
  const { data, error } = await supabase
    .from('phonics_stages')
    .select('*')
    .eq('id', stageId)
    .single();

  if (error) {
    console.error('Error fetching stage:', error);
    return null;
  }

  return data;
}

/**
 * Get stages by grade level
 */
export async function getStagesByGrade(gradeLevel: string): Promise<PhonicsStage[]> {
  const { data, error } = await supabase
    .from('phonics_stages')
    .select('*')
    .ilike('grade_band', `%${gradeLevel}%`)
    .order('id');

  if (error) {
    console.error('Error fetching stages by grade:', error);
    throw error;
  }

  return data || [];
}

// ============================================================================
// PHONEME QUERIES
// ============================================================================

/**
 * Get all phonemes
 */
export async function getAllPhonemes(): Promise<Phoneme[]> {
  const { data, error } = await supabase
    .from('phonemes')
    .select('*')
    .order('stage_id', { ascending: true })
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('Error fetching phonemes:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get phonemes by stage
 */
export async function getPhonemesByStage(stageId: number): Promise<Phoneme[]> {
  const { data, error } = await supabase
    .from('phonemes')
    .select('*')
    .eq('stage_id', stageId)
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('Error fetching phonemes by stage:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get a specific phoneme by phoneme_id
 */
export async function getPhonemeById(phonemeId: string): Promise<Phoneme | null> {
  const { data, error } = await supabase
    .from('phonemes')
    .select('*')
    .eq('phoneme_id', phonemeId)
    .single();

  if (error) {
    console.error('Error fetching phoneme:', error);
    return null;
  }

  return data;
}

/**
 * Get phonemes by grade band
 */
export async function getPhonemesByGrade(gradeBand: string): Promise<Phoneme[]> {
  const { data, error } = await supabase
    .from('phonemes')
    .select('*')
    .eq('grade_band', gradeBand)
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('Error fetching phonemes by grade:', error);
    throw error;
  }

  return data || [];
}

/**
 * Search phonemes by grapheme
 */
export async function getPhonemesByGrapheme(grapheme: string): Promise<Phoneme[]> {
  const { data, error } = await supabase
    .from('phonemes')
    .select('*')
    .contains('graphemes', [grapheme])
    .order('stage_id', { ascending: true });

  if (error) {
    console.error('Error fetching phonemes by grapheme:', error);
    throw error;
  }

  return data || [];
}

// ============================================================================
// ASSESSMENT QUERIES
// ============================================================================

/**
 * Get assessments by stage
 */
export async function getAssessmentsByStage(stageId: number): Promise<PhonicsAssessment[]> {
  const { data, error } = await supabase
    .from('phonics_assessments')
    .select('*')
    .eq('stage_id', stageId)
    .order('assessment_type');

  if (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get assessments by type
 */
export async function getAssessmentsByType(assessmentType: 'daily' | 'weekly' | 'summative'): Promise<PhonicsAssessment[]> {
  const { data, error } = await supabase
    .from('phonics_assessments')
    .select('*')
    .eq('assessment_type', assessmentType)
    .order('stage_id');

  if (error) {
    console.error('Error fetching assessments by type:', error);
    throw error;
  }

  return data || [];
}

// ============================================================================
// STUDENT PROGRESS QUERIES
// ============================================================================

/**
 * Get student progress by student ID
 */
export async function getStudentProgress(studentId: string): Promise<StudentPhonicsProgress[]> {
  const { data, error } = await supabase
    .from('student_phonics_progress')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching student progress:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get student progress for a specific stage
 */
export async function getStudentProgressByStage(studentId: string, stageId: number): Promise<StudentPhonicsProgress[]> {
  const { data, error } = await supabase
    .from('student_phonics_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('stage_id', stageId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching student progress by stage:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get current stage for student
 */
export async function getCurrentStageForStudent(studentId: string): Promise<number> {
  const { data, error } = await supabase
    .from('student_phonics_progress')
    .select('stage_id')
    .eq('student_id', studentId)
    .not('stage_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching current stage:', error);
    return 1; // Default to stage 1
  }

  return data?.[0]?.stage_id || 1;
}

/**
 * Update student progress
 */
export async function updateStudentProgress(
  studentId: string,
  progressData: Partial<Omit<StudentPhonicsProgress, 'id' | 'student_id' | 'created_at' | 'updated_at'>>
): Promise<StudentPhonicsProgress | null> {
  const { data, error } = await supabase
    .from('student_phonics_progress')
    .insert({
      student_id: studentId,
      ...progressData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating student progress:', error);
    throw error;
  }

  return data;
}

// ============================================================================
// UTILITY FUNCTIONS (Replacements for original functions)
// ============================================================================

/**
 * Get next recommended phonemes for a student
 * Based on their current progress and mastered phonemes
 */
export async function getNextRecommendedPhonemes(
  studentId: string,
  currentStage: number,
  masteredPhonemes: string[] = []
): Promise<string[]> {
  const stagePhonemes = await getPhonemesByStage(currentStage);
  
  return stagePhonemes
    .filter(phoneme => !masteredPhonemes.includes(phoneme.phoneme_id))
    .slice(0, 3)
    .map(phoneme => phoneme.phoneme_id);
}

/**
 * Calculate mastery percentage for a stage
 */
export async function calculateStageMastery(studentId: string, stageId: number): Promise<number> {
  const [progress, allPhonemes] = await Promise.all([
    getStudentProgressByStage(studentId, stageId),
    getPhonemesByStage(stageId)
  ]);

  const masteredCount = progress.filter(p => p.mastery_level === 'proficient' || p.mastery_level === 'advanced').length;
  const totalCount = allPhonemes.length;

  return totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;
}

/**
 * Get assessment benchmark for a stage
 */
export async function getAssessmentBenchmark(stageId: number): Promise<any> {
  const stage = await getStageById(stageId);
  return stage?.science_of_reading_alignment || null;
}

// ============================================================================
// MIGRATION HELPER FUNCTIONS
// ============================================================================

/**
 * Check if phonics data exists in the database
 */
export async function checkPhonicsDataExists(): Promise<boolean> {
  const { count, error } = await supabase
    .from('phonics_stages')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error checking phonics data:', error);
    return false;
  }

  return (count || 0) > 0;
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  const [stagesCount, phonemesCount, assessmentsCount, progressCount] = await Promise.all([
    supabase.from('phonics_stages').select('*', { count: 'exact', head: true }),
    supabase.from('phonemes').select('*', { count: 'exact', head: true }),
    supabase.from('phonics_assessments').select('*', { count: 'exact', head: true }),
    supabase.from('student_phonics_progress').select('*', { count: 'exact', head: true }),
  ]);

  return {
    stages: stagesCount.count || 0,
    phonemes: phonemesCount.count || 0,
    assessments: assessmentsCount.count || 0,
    progressRecords: progressCount.count || 0,
  };
}