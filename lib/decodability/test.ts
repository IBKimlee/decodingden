// 🧪 TEST THE DECODABILITY SYSTEM
// Quick test to verify our implementation works

import { testDecodability, generateStageBasedContent, validateStageBasedContent } from './index';

// Test with /sh/ phoneme
console.log('=== TESTING DECODABILITY SYSTEM ===\n');

try {
  // Test basic decodability calculation
  testDecodability('/sh/');
  
  console.log('\n=== FULL CONTENT GENERATION ===');
  const content = generateStageBasedContent('/sh/');
  console.log('Word List:', content.wordList);
  console.log('Sentences:', content.sentences);
  console.log('Stage Info:', content.stageInfo);
  console.log('Decodability Stats:', content.decodabilityStats);
  
  console.log('\n=== VALIDATION ===');
  const validation = validateStageBasedContent('/sh/');
  console.log('Is Valid:', validation.isValid);
  console.log('Issues:', validation.issues);
  console.log('Recommendations:', validation.recommendations);
  
} catch (error) {
  console.error('Test failed:', error);
}