// 📚 WORD-PHONEME DATABASE
// Maps words to their required phonemes for decodability calculation

export interface WordPhonemeMapping {
  word: string;
  requiredPhonemes: string[];
  syllables: number;
  complexity: 'simple' | 'moderate' | 'complex';
  wordType: 'cvc' | 'cvce' | 'ccvc' | 'cvcc' | 'ccvcc' | 'other';
}

/**
 * Initial word database - starting with common words for /sh/ and early stages
 * This will be expanded as we build out the framework
 */
export const WORD_PHONEME_DATABASE: WordPhonemeMapping[] = [
  // Stage 1 words (single phonemes)
  { word: "at", requiredPhonemes: ["/a/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "sat", requiredPhonemes: ["/s/", "/a/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "mat", requiredPhonemes: ["/m/", "/a/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "man", requiredPhonemes: ["/m/", "/a/", "/n/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "map", requiredPhonemes: ["/m/", "/a/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "mad", requiredPhonemes: ["/m/", "/a/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "sit", requiredPhonemes: ["/s/", "/i/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "pit", requiredPhonemes: ["/p/", "/i/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "tip", requiredPhonemes: ["/t/", "/i/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "sip", requiredPhonemes: ["/s/", "/i/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "dim", requiredPhonemes: ["/d/", "/i/", "/m/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "dad", requiredPhonemes: ["/d/", "/a/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  
  // Stage 2 words with /sh/
  { word: "shop", requiredPhonemes: ["/sh/", "/o/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'ccvc' },
  { word: "ship", requiredPhonemes: ["/sh/", "/i/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'ccvc' },
  { word: "fish", requiredPhonemes: ["/f/", "/i/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "dish", requiredPhonemes: ["/d/", "/i/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "wish", requiredPhonemes: ["/w/", "/i/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "wash", requiredPhonemes: ["/w/", "/a/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "cash", requiredPhonemes: ["/k/", "/a/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "rush", requiredPhonemes: ["/r/", "/u/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "hush", requiredPhonemes: ["/h/", "/u/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "push", requiredPhonemes: ["/p/", "/u/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "mesh", requiredPhonemes: ["/m/", "/e/", "/sh/"], syllables: 1, complexity: 'simple', wordType: 'cvcc' },
  { word: "fresh", requiredPhonemes: ["/f/", "/r/", "/e/", "/sh/"], syllables: 1, complexity: 'moderate', wordType: 'ccvcc' },
  
  // Additional Stage 1-2 phonemes needed for /sh/ words
  { word: "hot", requiredPhonemes: ["/h/", "/o/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "hop", requiredPhonemes: ["/h/", "/o/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "top", requiredPhonemes: ["/t/", "/o/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "cop", requiredPhonemes: ["/k/", "/o/", "/p/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "cut", requiredPhonemes: ["/k/", "/u/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "hut", requiredPhonemes: ["/h/", "/u/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "rut", requiredPhonemes: ["/r/", "/u/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "wet", requiredPhonemes: ["/w/", "/e/", "/t/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "web", requiredPhonemes: ["/w/", "/e/", "/b/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "red", requiredPhonemes: ["/r/", "/e/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "bed", requiredPhonemes: ["/b/", "/e/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "fed", requiredPhonemes: ["/f/", "/e/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' },
  { word: "led", requiredPhonemes: ["/l/", "/e/", "/d/"], syllables: 1, complexity: 'simple', wordType: 'cvc' }
];

/**
 * Get word-phoneme mapping for a specific word
 * @param word - The word to look up
 * @returns WordPhonemeMapping or null if not found
 */
export function getWordPhonemeMapping(word: string): WordPhonemeMapping | null {
  return WORD_PHONEME_DATABASE.find(w => w.word.toLowerCase() === word.toLowerCase()) || null;
}

/**
 * Get all words that can be decoded with the given phonemes
 * @param knownPhonemes - Array of phonemes the student knows
 * @returns Array of decodable words
 */
export function getDecodableWords(knownPhonemes: string[]): WordPhonemeMapping[] {
  return WORD_PHONEME_DATABASE.filter(wordMapping => 
    wordMapping.requiredPhonemes.every(phoneme => knownPhonemes.includes(phoneme))
  );
}

/**
 * Get words that contain a specific target phoneme and are decodable with known phonemes
 * @param targetPhoneme - The phoneme being taught (e.g., "/sh/")
 * @param knownPhonemes - Array of phonemes the student knows (including target)
 * @returns Array of decodable words containing the target phoneme
 */
export function getTargetPhonemeWords(targetPhoneme: string, knownPhonemes: string[]): WordPhonemeMapping[] {
  return WORD_PHONEME_DATABASE.filter(wordMapping =>
    wordMapping.requiredPhonemes.includes(targetPhoneme) &&
    wordMapping.requiredPhonemes.every(phoneme => knownPhonemes.includes(phoneme))
  );
}

/**
 * Calculate decodability percentage for a given set of words
 * @param words - Array of words to check
 * @param knownPhonemes - Array of phonemes the student knows
 * @returns Percentage (0-100) of words that are decodable
 */
export function calculateWordListDecodability(words: string[], knownPhonemes: string[]): number {
  if (words.length === 0) return 0;
  
  const decodableCount = words.reduce((count, word) => {
    const mapping = getWordPhonemeMapping(word);
    if (!mapping) return count; // Skip unknown words
    
    const isDecodable = mapping.requiredPhonemes.every(phoneme => knownPhonemes.includes(phoneme));
    return isDecodable ? count + 1 : count;
  }, 0);
  
  return Math.round((decodableCount / words.length) * 100);
}