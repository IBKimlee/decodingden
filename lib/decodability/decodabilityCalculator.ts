// 🧮 DECODABILITY CALCULATOR
// Calculates actual decodability percentages based on stage progression

import { getCumulativePhonemesFor, getPhonemeStage } from './phonemeStageMapper';
import { 
  getTargetPhonemeWords, 
  calculateWordListDecodability,
  getDecodableWords,
  WORD_PHONEME_DATABASE 
} from './wordPhonemeDatabase';

export interface DecodabilityResult {
  percentage: number;
  decodableWords: string[];
  totalWords: number;
  targetPhoneme: string;
  stage: number;
  cumulativePhonemes: string[];
}

/**
 * Calculate decodability for a target phoneme based on stage progression
 * @param targetPhoneme - The phoneme being taught (e.g., "/sh/")
 * @returns DecodabilityResult with percentage and supporting data
 */
export function calculateStageBasedDecodability(targetPhoneme: string): DecodabilityResult {
  // Get the stage and all phonemes that should be known by this stage
  const stage = getPhonemeStage(targetPhoneme);
  const cumulativePhonemes = getCumulativePhonemesFor(targetPhoneme);
  
  if (!stage || cumulativePhonemes.length === 0) {
    return {
      percentage: 0,
      decodableWords: [],
      totalWords: 0,
      targetPhoneme,
      stage: stage || 0,
      cumulativePhonemes: []
    };
  }
  
  // Get all words containing the target phoneme
  const targetPhonemeWords = getTargetPhonemeWords(targetPhoneme, cumulativePhonemes);
  
  // Calculate decodability
  const wordList = targetPhonemeWords.map(w => w.word);
  const percentage = calculateWordListDecodability(wordList, cumulativePhonemes);
  
  return {
    percentage,
    decodableWords: wordList,
    totalWords: wordList.length,
    targetPhoneme,
    stage,
    cumulativePhonemes
  };
}

/**
 * Generate decodable word list for a target phoneme
 * @param targetPhoneme - The phoneme being taught
 * @param categories - Optional word categories to include
 * @returns Organized word lists by category
 */
export function generateDecodableWordList(targetPhoneme: string, categories?: string[]) {
  const cumulativePhonemes = getCumulativePhonemesFor(targetPhoneme);
  const targetWords = getTargetPhonemeWords(targetPhoneme, cumulativePhonemes);
  
  // Organize by word patterns/categories
  const organized = {
    beginning: targetWords.filter(w => w.word.startsWith(targetPhoneme.replace(/\//g, ''))).map(w => w.word),
    ending: targetWords.filter(w => w.word.endsWith(targetPhoneme.replace(/\//g, ''))).map(w => w.word),
    middle: targetWords.filter(w => {
      const phoneme = targetPhoneme.replace(/\//g, '');
      return w.word.includes(phoneme) && !w.word.startsWith(phoneme) && !w.word.endsWith(phoneme);
    }).map(w => w.word),
    all: targetWords.map(w => w.word)
  };
  
  return organized;
}

/**
 * Get decodability statistics for reporting
 * @param targetPhoneme - The phoneme being analyzed
 * @returns Statistics object
 */
export function getDecodabilityStats(targetPhoneme: string) {
  const result = calculateStageBasedDecodability(targetPhoneme);
  const stage = getPhonemeStage(targetPhoneme);
  
  return {
    stage: stage,
    phoneme: targetPhoneme,
    decodabilityPercentage: result.percentage,
    wordCount: result.totalWords,
    cumulativePhonemesCount: result.cumulativePhonemes.length,
    meetsThreshold: result.percentage >= 95,
    qualityRating: result.percentage >= 95 ? 'Excellent' : 
                   result.percentage >= 85 ? 'Good' : 
                   result.percentage >= 75 ? 'Fair' : 'Needs Improvement'
  };
}

/**
 * Test function to validate our decodability calculation
 * @param targetPhoneme - Phoneme to test
 */
export function testDecodability(targetPhoneme: string): void {
  const result = calculateStageBasedDecodability(targetPhoneme);
  
  console.log(`🎯 Decodability Test for ${targetPhoneme}`);
  console.log(`📊 Stage: ${result.stage}`);
  console.log(`📈 Decodability: ${result.percentage}%`);
  console.log(`📚 Words: ${result.decodableWords.join(', ')}`);
  console.log(`🧩 Known Phonemes: ${result.cumulativePhonemes.join(', ')}`);
}