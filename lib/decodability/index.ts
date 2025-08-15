// 🎯 DECODABILITY SYSTEM - Main Exports
// Stage-based decodability calculation for Science of Reading alignment

// Core functions
export {
  getPhonemeStage,
  getCumulativePhonemes,
  getCumulativePhonemesFor,
  getPhonemeStageInfo,
  isPhonemeKnownByStage,
  type StageMapping
} from './phonemeStageMapper';

export {
  getWordPhonemeMapping,
  getDecodableWords,
  getTargetPhonemeWords,
  calculateWordListDecodability,
  WORD_PHONEME_DATABASE,
  type WordPhonemeMapping
} from './wordPhonemeDatabase';

export {
  calculateStageBasedDecodability,
  generateDecodableWordList,
  getDecodabilityStats,
  testDecodability,
  type DecodabilityResult
} from './decodabilityCalculator';

export {
  generateStageBasedWordList,
  generateStageBasedContent,
  validateStageBasedContent,
  type FilteredWordList,
  type StageBasedContent
} from './stageBasedFiltering';

// Main function for framework integration
export function getFrameworkDecodabilityData(targetPhoneme: string) {
  const { 
    generateStageBasedContent, 
    calculateStageBasedDecodability,
    getDecodabilityStats 
  } = require('./stageBasedFiltering');
  
  const content = generateStageBasedContent(targetPhoneme);
  const stats = getDecodabilityStats(targetPhoneme);
  
  return {
    ...content,
    stats,
    frameworkReady: true
  };
}