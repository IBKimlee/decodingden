// 🎯 PHONEME STAGE MAPPER
// Maps phonemes to their stages in the 8-stage progression system

import { STAGE_PHONEME_SAMPLES } from '../../app/data/allStagesDatabase';

export interface StageMapping {
  phoneme: string;
  stage: number;
  phoneme_id: string;
}

/**
 * Gets the stage number for a given phoneme
 * @param phoneme - The phoneme (e.g., "/sh/", "/th/")
 * @returns Stage number (1-8) or null if not found
 */
export function getPhonemeStage(phoneme: string): number | null {
  const entry = STAGE_PHONEME_SAMPLES.find(p => p.phoneme === phoneme);
  return entry ? entry.stage : null;
}

/**
 * Gets all phonemes from stages 1 through the specified stage
 * @param targetStage - The stage number (1-8)
 * @returns Array of phoneme strings that should be "taught" by this stage
 */
export function getCumulativePhonemes(targetStage: number): string[] {
  return STAGE_PHONEME_SAMPLES
    .filter(phoneme => phoneme.stage <= targetStage)
    .map(phoneme => phoneme.phoneme)
    .sort(); // Sort for consistency
}

/**
 * Gets all phonemes from stages 1 through the stage of the target phoneme
 * @param targetPhoneme - The phoneme (e.g., "/sh/")
 * @returns Array of phoneme strings that should be taught before/including target
 */
export function getCumulativePhonemesFor(targetPhoneme: string): string[] {
  const stage = getPhonemeStage(targetPhoneme);
  if (!stage) return [];
  
  return getCumulativePhonemes(stage);
}

/**
 * Gets stage information for a phoneme
 * @param phoneme - The phoneme (e.g., "/sh/")
 * @returns Stage mapping object or null
 */
export function getPhonemeStageInfo(phoneme: string): StageMapping | null {
  const entry = STAGE_PHONEME_SAMPLES.find(p => p.phoneme === phoneme);
  if (!entry) return null;
  
  return {
    phoneme: entry.phoneme,
    stage: entry.stage,
    phoneme_id: entry.phoneme_id
  };
}

/**
 * Checks if a phoneme should be "known" based on stage progression
 * @param phoneme - The phoneme to check
 * @param currentStage - The current stage being taught
 * @returns true if phoneme should be known by this stage
 */
export function isPhonemeKnownByStage(phoneme: string, currentStage: number): boolean {
  const phonemeStage = getPhonemeStage(phoneme);
  return phonemeStage ? phonemeStage <= currentStage : false;
}