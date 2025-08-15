// 🔍 STAGE-BASED FILTERING
// Filters content based on stage progression for Science of Reading alignment

import { getCumulativePhonemesFor, getPhonemeStage, getPhonemeStageInfo } from './phonemeStageMapper';
import { getTargetPhonemeWords, getDecodableWords } from './wordPhonemeDatabase';
import { calculateStageBasedDecodability } from './decodabilityCalculator';

export interface FilteredWordList {
  beginning: string[];
  medial: string[];
  ending: string[];
  decodabilityPercentage: number;
  stage: number;
  totalWords: number;
}

export interface StageBasedContent {
  wordList: FilteredWordList;
  sentences: string[];
  stageInfo: {
    number: number;
    name: string;
    cumulativePhonemes: string[];
  };
  decodabilityStats: {
    percentage: number;
    meetsThreshold: boolean;
    qualityRating: string;
  };
}

/**
 * Generate stage-appropriate word list for a target phoneme
 * @param targetPhoneme - The phoneme being taught (e.g., "/sh/")
 * @returns Filtered word list organized by position
 */
export function generateStageBasedWordList(targetPhoneme: string): FilteredWordList {
  const cumulativePhonemes = getCumulativePhonemesFor(targetPhoneme);
  const stage = getPhonemeStage(targetPhoneme) || 0;
  const targetWords = getTargetPhonemeWords(targetPhoneme, cumulativePhonemes);
  
  // Remove the slashes for word matching
  const phonemeForMatching = targetPhoneme.replace(/\//g, '');
  
  // Organize by position in word
  const beginning = targetWords
    .filter(w => w.word.startsWith(phonemeForMatching))
    .map(w => w.word)
    .sort();
    
  const ending = targetWords
    .filter(w => w.word.endsWith(phonemeForMatching))
    .map(w => w.word)
    .sort();
    
  const medial = targetWords
    .filter(w => {
      const word = w.word;
      return word.includes(phonemeForMatching) && 
             !word.startsWith(phonemeForMatching) && 
             !word.endsWith(phonemeForMatching);
    })
    .map(w => w.word)
    .sort();
  
  // Calculate decodability
  const allWords = [...beginning, ...medial, ...ending];
  const decodabilityResult = calculateStageBasedDecodability(targetPhoneme);
  
  return {
    beginning,
    medial,
    ending,
    decodabilityPercentage: decodabilityResult.percentage,
    stage,
    totalWords: allWords.length
  };
}

/**
 * Generate complete stage-based content for a phoneme
 * @param targetPhoneme - The phoneme being taught
 * @returns Complete content package
 */
export function generateStageBasedContent(targetPhoneme: string): StageBasedContent {
  const wordList = generateStageBasedWordList(targetPhoneme);
  const stageInfo = getPhonemeStageInfo(targetPhoneme);
  const cumulativePhonemes = getCumulativePhonemesFor(targetPhoneme);
  const decodabilityResult = calculateStageBasedDecodability(targetPhoneme);
  
  // Generate simple decodable sentences (basic implementation)
  const sentences = generateSimpleSentences(targetPhoneme, wordList);
  
  return {
    wordList,
    sentences,
    stageInfo: {
      number: stageInfo?.stage || 0,
      name: `Stage ${stageInfo?.stage || 0}`,
      cumulativePhonemes
    },
    decodabilityStats: {
      percentage: decodabilityResult.percentage,
      meetsThreshold: decodabilityResult.percentage >= 95,
      qualityRating: decodabilityResult.percentage >= 95 ? 'Excellent' : 
                     decodabilityResult.percentage >= 85 ? 'Good' : 
                     decodabilityResult.percentage >= 75 ? 'Fair' : 'Needs Improvement'
    }
  };
}

/**
 * Generate simple decodable sentences using stage-appropriate words
 * @param targetPhoneme - The phoneme being taught
 * @param wordList - The filtered word list
 * @returns Array of simple sentences
 */
function generateSimpleSentences(targetPhoneme: string, wordList: FilteredWordList): string[] {
  const allWords = [...wordList.beginning, ...wordList.medial, ...wordList.ending];
  const cumulativePhonemes = getCumulativePhonemesFor(targetPhoneme);
  const decodableWords = getDecodableWords(cumulativePhonemes);
  
  // Get simple sight words and decodable words for sentence building
  const simpleWords = decodableWords
    .filter(w => w.complexity === 'simple' && w.syllables === 1)
    .map(w => w.word);
  
  const sentences: string[] = [];
  
  // Generate basic sentences if we have words
  if (allWords.length > 0 && simpleWords.length > 0) {
    // Simple patterns
    if (wordList.beginning.length > 0) {
      sentences.push(`I can ${wordList.beginning[0]}.`);
    }
    if (wordList.ending.length > 0 && simpleWords.includes('the')) {
      sentences.push(`The ${wordList.ending[0]} is big.`);
    }
    if (allWords.length >= 2) {
      sentences.push(`${allWords[0]} and ${allWords[1]}.`);
    }
  }
  
  return sentences.length > 0 ? sentences : [`Words with ${targetPhoneme}: ${allWords.slice(0, 3).join(', ')}.`];
}

/**
 * Validate that content meets decodability standards
 * @param targetPhoneme - The phoneme being validated
 * @returns Validation results
 */
export function validateStageBasedContent(targetPhoneme: string) {
  const content = generateStageBasedContent(targetPhoneme);
  const issues: string[] = [];
  
  // Check decodability threshold
  if (content.decodabilityStats.percentage < 85) {
    issues.push(`Decodability ${content.decodabilityStats.percentage}% below recommended 85% minimum`);
  }
  
  // Check word count
  if (content.wordList.totalWords < 5) {
    issues.push(`Only ${content.wordList.totalWords} words available - recommend minimum 5`);
  }
  
  // Check sentence quality
  if (content.sentences.length < 2) {
    issues.push(`Only ${content.sentences.length} sentences generated - recommend minimum 2`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    content,
    recommendations: issues.length > 0 ? 
      ['Expand word database', 'Add more early-stage phonemes', 'Improve sentence generation'] : 
      ['Content meets quality standards']
  };
}