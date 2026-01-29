import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getGraphemeFrequencies } from '../../data/graphemeFrequencies';

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PhonemeData {
  phoneme: {
    id: string;
    ipa_symbol: string;
    common_name: string;
    phoneme_type: string;
    frequency_rank: number;
    is_voiced: boolean;
  };
  graphemes: Array<{
    id: string;
    grapheme: string;
    spelling_frequency: number;
    percentage?: number;
    usage_label?: 'Primary' | 'Secondary' | 'Rare' | 'Exception';
    context_notes?: string;
    notes?: string;
  }>;
  articulation: {
    place_of_articulation: string;
    manner_of_articulation: string;
    voicing: string;
    tongue_position: string;
    lip_position: string;
    airflow_description: string;
    step_by_step_instructions: string[];
    common_errors: string[];
    teacher_tips: string[];
  } | null;
  teaching_content: {
    explanations: Array<{ content: string; icon_emoji: string }>;
    rules: Array<{ content: string; icon_emoji: string }>;
    tips: Array<{ content: string; icon_emoji: string }>;
  };
  word_lists: {
    [grapheme: string]: {
      beginning: string[];
      medial: string[];
      ending: string[];
    };
  };
  practice_texts: {
    sentences: string[];
    stories: string[];
    word_ladders: string[];
  };
  research_citations: Array<{
    source_name: string;
    citation_text: string;
    url?: string;
  }>;
}

interface DecodingDenResponse {
  success: boolean;
  phoneme_data?: PhonemeData;
  correction_message?: string | null;
  generated_at: string;
  error?: string;
  message?: string;
  suggestions?: string[];
}

/**
 * Find specific grapheme for a phoneme (e.g., "sh spelled ch")
 */
async function findSpecificGraphemeForPhoneme(phoneme: string, grapheme: string): Promise<any | null> {
  try {
    // Normalize phoneme input
    let normalizedPhoneme = phoneme.toLowerCase().trim();
    if (!normalizedPhoneme.startsWith('/')) {
      normalizedPhoneme = `/${normalizedPhoneme}/`;
    }
    
    // First, find the phoneme
    const { data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme', normalizedPhoneme)
      .single();

    if (!phonemeData || error) {
      console.log(`Phoneme ${normalizedPhoneme} not found, trying alternative searches...`);
      
      // Try alternative searches for common phoneme patterns
      const alternativeSearches = [
        phoneme, // Try without IPA formatting
        phoneme.replace(/^\/|\/$/g, ''), // Remove any existing slashes
      ];
      
      for (const alt of alternativeSearches) {
        const { data: altData, error: altError } = await supabase
          .from('phonemes')
          .select('*')
          .contains('graphemes', [alt])
          .single();
          
        if (altData && !altError) {
          return {
            ...altData,
            requested_specific_grapheme: grapheme,
            show_specific_grapheme: true
          };
        }
      }
      
      return null; // Phoneme doesn't exist
    }

    // Check if the requested grapheme is valid for this phoneme
    const hasGrapheme = phonemeData.graphemes?.includes(grapheme);
    
    // Always return the phoneme data with the requested grapheme for display
    return {
      ...phonemeData,
      requested_specific_grapheme: grapheme,
      show_specific_grapheme: true,
      invalid_grapheme: !hasGrapheme // Flag if this is an invalid combination
    };
  } catch (error) {
    console.error('Error in findSpecificGraphemeForPhoneme:', error);
    return null;
  }
}

/**
 * Find phoneme by various input formats
 */
async function findPhonemeByInput(input: string): Promise<any | null> {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check for "phoneme spelled grapheme" syntax
  const spelledPattern = /^(.+?)\s+spelled\s+(.+)$/i;
  const spelledMatch = normalizedInput.match(spelledPattern);
  
  if (spelledMatch) {
    const [, requestedPhoneme, requestedGrapheme] = spelledMatch;
    return await findSpecificGraphemeForPhoneme(requestedPhoneme.trim(), requestedGrapheme.trim());
  }
  
  try {
    // Try direct phoneme match first (e.g., "/sh/", "/m/")
    let { data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme', normalizedInput)
      .single();

    if (phonemeData && !error) {
      return phonemeData;
    }

    // Try with IPA formatting if not already formatted
    if (!normalizedInput.startsWith('/')) {
      const ipaFormatted = `/${normalizedInput}/`;
      ({ data: phonemeData, error } = await supabase
        .from('phonemes')
        .select('*')
        .eq('phoneme', ipaFormatted)
        .single());

      if (phonemeData && !error) {
        return phonemeData;
      }
    }

    // Try searching in graphemes array
    ({ data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .contains('graphemes', [normalizedInput])
      .limit(1)
      .single());

    if (phonemeData && !error) {
      return phonemeData;
    }

    // Try searching by phoneme_id (e.g., "stage1_m")
    ({ data: phonemeData, error } = await supabase
      .from('phonemes')
      .select('*')
      .eq('phoneme_id', normalizedInput)
      .single());

    if (phonemeData && !error) {
      return phonemeData;
    }

    // Try fuzzy search in common patterns
    const commonPatterns = [
      normalizedInput.replace(/\s+sound$/i, ''),
      normalizedInput.replace(/^long\s+/i, ''),
      normalizedInput.replace(/^short\s+/i, ''),
      normalizedInput.replace(/\s+/g, ''),
    ];

    for (const pattern of commonPatterns) {
      // Special case: if searching for "short" + single vowel, prioritize short vowel phonemes
      // Short vowels are in Stage 1, so look for stage1_a, stage1_e, etc.
      if (normalizedInput.toLowerCase().includes('short') &&
          ['a', 'e', 'i', 'o', 'u'].includes(pattern.toLowerCase())) {

        // Try to find short vowel phoneme first (Stage 1 vowels)
        ({ data: phonemeData, error } = await supabase
          .from('phonemes')
          .select('*')
          .eq('phoneme', `/${pattern}/`)
          .eq('stage_id', 1)
          .limit(1)
          .single());

        if (phonemeData && !error) {
          return phonemeData;
        }
      }

      // Try as grapheme
      ({ data: phonemeData, error } = await supabase
        .from('phonemes')
        .select('*')
        .contains('graphemes', [pattern])
        .limit(1)
        .single());

      if (phonemeData && !error) {
        return phonemeData;
      }

      // Try as IPA
      const ipaPattern = `/${pattern}/`;
      ({ data: phonemeData, error } = await supabase
        .from('phonemes')
        .select('*')
        .eq('phoneme', ipaPattern)
        .single());

      if (phonemeData && !error) {
        return phonemeData;
      }
    }

    return null;
  } catch (error) {
    console.error('Error searching for phoneme:', error);
    return null;
  }
}

/**
 * Transform Supabase phoneme data to expected frontend format
 */
function transformPhonemeData(supabaseData: any): PhonemeData {
  const articulation = supabaseData.articulation_data;
  
  // Safely extract string values and ensure no objects are passed to React
  const safeString = (value: any): string => {
    if (typeof value === 'string') return value;
    if (value == null) return '';
    return String(value);
  };
  
  const safeArray = (value: any): string[] => {
    if (Array.isArray(value)) return value.map(v => safeString(v));
    if (typeof value === 'string') return [value];
    return [];
  };

  // Extract stories from content_generation_meta
  const extractStories = (meta: any): string[] => {
    if (!meta?.short_stories || !Array.isArray(meta.short_stories)) return [];
    return meta.short_stories.map((story: any) => {
      if (typeof story === 'string') return story;
      if (story?.title && story?.text) return `${story.title}\n${story.text}`;
      if (story?.text) return story.text;
      return '';
    }).filter((s: string) => s.length > 0);
  };

  // Extract word ladders from content_generation_meta
  const extractWordLadders = (meta: any): string[] => {
    if (!meta?.word_ladders || !Array.isArray(meta.word_ladders)) return [];
    return meta.word_ladders.map((ladder: any) => {
      if (typeof ladder === 'string') return ladder;
      if (ladder?.words && Array.isArray(ladder.words)) {
        const wordsStr = ladder.words.join(' → ');
        return ladder.instructions ? `${wordsStr} (${ladder.instructions})` : wordsStr;
      }
      return '';
    }).filter((s: string) => s.length > 0);
  };

  const result: any = {
    phoneme: {
      id: safeString(supabaseData.phoneme_id),
      ipa_symbol: safeString(supabaseData.phoneme),
      common_name: safeString(supabaseData.phoneme).replace(/[\/]/g, '') + ' sound',
      phoneme_type: getPhonemeType(supabaseData),
      frequency_rank: typeof supabaseData.frequency_rank === 'number' ? supabaseData.frequency_rank : 0,
      is_voiced: articulation?.voicing === 'voiced' || false,
    },
    graphemes: (supabaseData.graphemes || [])
      .map((grapheme: string, index: number) => {
        // Get frequency data for this phoneme
        const frequencyData = getGraphemeFrequencies(supabaseData.phoneme);
        const graphemeFreq = frequencyData.find(f => f.grapheme === grapheme);
        
        // Return grapheme data with validation flag
        return {
          id: `${safeString(supabaseData.phoneme_id)}_${index}`,
          grapheme: safeString(grapheme),
          spelling_frequency: graphemeFreq ? graphemeFreq.percentage / 100 : (index === 0 ? 1 : 0.5),
          percentage: graphemeFreq?.percentage,
          usage_label: graphemeFreq?.usage_label,
          context_notes: safeString(graphemeFreq?.context_notes),
          notes: safeString(graphemeFreq?.context_notes || (index === 0 ? `Most common spelling for ${supabaseData.phoneme} sound` : '')),
          isValid: !!graphemeFreq, // Flag to indicate if this grapheme is linguistically valid
        };
      })
      .filter((graphemeData) => {
        // Filter out invalid graphemes that don't have frequency data
        // This removes database inconsistencies like 's' and 'ss' for /sh/
        return graphemeData.isValid;
      })
      .map((graphemeData, newIndex) => {
        // Re-index after filtering and clean up the validation flag
        const { isValid, ...cleanedData } = graphemeData;
        return {
          ...cleanedData,
          id: `${safeString(supabaseData.phoneme_id)}_${newIndex}`,
        };
      }),
    articulation: articulation ? {
      place_of_articulation: safeString(articulation.place || generatePlaceOfArticulation(supabaseData)),
      manner_of_articulation: safeString(articulation.manner || generateMannerOfArticulation(supabaseData)),
      voicing: safeString(articulation.voicing || generateVoicing(supabaseData)),
      tongue_position: safeString(articulation.teacher_guidance || articulation.cue || generateTonguePosition(supabaseData)),
      lip_position: safeString(articulation.articulation_cues || generateLipPosition(supabaseData)),
      airflow_description: generateAirflowDescription(supabaseData),
      step_by_step_instructions: articulation.student_tips ? [safeString(articulation.student_tips)] : generateStepByStepInstructions(supabaseData),
      common_errors: generateCommonErrors(supabaseData),
      teacher_tips: articulation.teacher_guidance ? [safeString(articulation.teacher_guidance)] : generateTeacherTips(supabaseData),
    } : null,
    teaching_content: {
      explanations: generateTeachingExplanations(supabaseData),
      rules: generateTeachingRules(supabaseData),
      tips: generateTeachingTips(supabaseData),
    },
    word_lists: generateWordLists(supabaseData),
    practice_texts: {
      sentences: safeArray(supabaseData.decodable_sentences),
      stories: extractStories(supabaseData.content_generation_meta),
      word_ladders: extractWordLadders(supabaseData.content_generation_meta),
    },
    research_citations: (supabaseData.research_sources || []).map((source: any, index: number) => ({
      source_name: safeString(source),
      citation_text: `Research-based phonics instruction supporting ${supabaseData.phoneme} sound development.`,
      url: undefined,
    })),
  };
  
  // Add fields for "spelled" syntax support
  if (supabaseData.show_specific_grapheme) {
    result.show_specific_grapheme = true;
    result.requested_specific_grapheme = safeString(supabaseData.requested_specific_grapheme);
    result.invalid_grapheme = Boolean(supabaseData.invalid_grapheme);
  }
  
  return result;
}

/**
 * Determine phoneme type from Supabase data
 */
function getPhonemeType(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const stageName = data.stage_id;
  
  if (stageName <= 2) return 'consonant';
  if (stageName === 3) return 'consonant_digraph';
  if (stageName === 4) return 'long_vowel';
  if (stageName >= 5) return 'vowel_team';
  
  return 'consonant';
}

/**
 * Generate teaching explanations from Supabase data
 */
function generateTeachingExplanations(data: any): Array<{ content: string; icon_emoji: string }> {
  const explanations = [];
  
  if (data.graphemes?.length > 1) {
    explanations.push({
      content: `<strong>〈${data.graphemes[0]}〉</strong> can be spelled ${data.graphemes.length} different ways.`,
      icon_emoji: '💙'
    });
  }
  
  if (data.articulation_data?.voicing) {
    explanations.push({
      content: `The ${data.phoneme} sound is ${data.articulation_data.voicing}. ${data.articulation_data.voicing === 'voiced' ? 'Your vocal cords vibrate when it is said.' : 'Your vocal cords do not vibrate when it is said.'}`,
      icon_emoji: '💙'
    });
  }
  
  explanations.push({
    content: `You can hear this sound in different positions in words.`,
    icon_emoji: '💙'
  });
  
  return explanations;
}

/**
 * Generate teaching rules from Supabase data
 */
function generateTeachingRules(data: any): Array<{ content: string; icon_emoji: string }> {
  const rules = [];
  
  if (data.stage_id === 3) {
    rules.push({
      content: 'Digraphs are two letters making one sound.',
      icon_emoji: '💚'
    });
  }
  
  if (data.teaching_advantages?.length > 0) {
    rules.push({
      content: data.teaching_advantages[0],
      icon_emoji: '💚'
    });
  }
  
  return rules;
}

/**
 * Generate teaching tips from Supabase data
 */
function generateTeachingTips(data: any): Array<{ content: string; icon_emoji: string }> {
  const tips = [];
  
  if (data.articulation_data?.teacher_guidance) {
    tips.push({
      content: data.articulation_data.teacher_guidance,
      icon_emoji: '💛'
    });
  }
  
  if (data.articulation_data?.student_tips) {
    tips.push({
      content: data.articulation_data.student_tips,
      icon_emoji: '💛'
    });
  }
  
  return tips;
}

/**
 * Generate word lists from word examples with proper phoneme position detection
 * Only includes words that are appropriate for each specific grapheme
 */
function generateWordLists(data: any): { [grapheme: string]: { beginning: string[]; medial: string[]; ending: string[] } } {
  const wordLists: any = {};
  
  if (data.graphemes?.length > 0 && data.word_examples?.length > 0) {
    const phoneme = data.phoneme?.replace(/[\/]/g, ''); // Remove IPA slashes
    const frequencyData = getGraphemeFrequencies(data.phoneme);
    
    // Only process valid graphemes that have frequency data
    const validGraphemes = data.graphemes.filter((grapheme: string) => 
      frequencyData.some(f => f.grapheme === grapheme)
    );
    
    validGraphemes.forEach((grapheme: string) => {
      wordLists[grapheme] = {
        beginning: [],
        medial: [],
        ending: [],
      };
      
      // Filter words that actually contain this specific grapheme spelling
      const relevantWords = data.word_examples.filter((word: string) => {
        const lowerWord = word.toLowerCase();
        
        // Special cases for different graphemes
        if (phoneme === 'sh') {
          switch (grapheme) {
            case 'sh':
              return lowerWord.includes('sh');
            case 'ti':
              return lowerWord.includes('ti') && (lowerWord.endsWith('tion') || lowerWord.includes('tia') || lowerWord.includes('tio'));
            case 'ci':
              return lowerWord.includes('ci') && (lowerWord.includes('cia') || lowerWord.includes('cio') || lowerWord.includes('cial'));
            case 'si':
              // Only include 'si' if it doesn't contain 'ssi' (to avoid overlap)
              return lowerWord.includes('si') && !lowerWord.includes('ssi') && (lowerWord.endsWith('sion') || lowerWord.includes('sia'));
            case 'ssi':
              return lowerWord.includes('ssi');
            case 'ch':
              return lowerWord.includes('ch') && (lowerWord.includes('machine') || lowerWord.includes('chef') || lowerWord.includes('chalet'));
            default:
              return false;
          }
        }
        // For other phonemes, check if word contains the grapheme
        else {
          return lowerWord.includes(grapheme.toLowerCase());
        }
      });
      
      // Categorize filtered words by phoneme position
      relevantWords.forEach((word: string) => {
        const lowerWord = word.toLowerCase();
        
        if (phoneme === 'sh') {
          // Determine position based on the specific grapheme
          switch (grapheme) {
            case 'sh':
              if (lowerWord.startsWith('sh')) {
                wordLists[grapheme].beginning.push(word);
              } else if (lowerWord.endsWith('sh')) {
                wordLists[grapheme].ending.push(word);
              } else if (lowerWord.includes('sh')) {
                wordLists[grapheme].medial.push(word);
              }
              break;
            case 'ti':
            case 'ci': 
            case 'si':
            case 'ssi':
              // These typically appear in endings
              wordLists[grapheme].ending.push(word);
              break;
            case 'ch':
              // Machine-type words - usually beginning or medial
              if (lowerWord.startsWith('ch')) {
                wordLists[grapheme].beginning.push(word);
              } else {
                wordLists[grapheme].medial.push(word);
              }
              break;
          }
        }
        // For vowels, check grapheme position
        else if (['a', 'e', 'i', 'o', 'u'].includes(phoneme)) {
          const graphemeIndex = lowerWord.indexOf(grapheme.toLowerCase());
          if (graphemeIndex === 0) {
            wordLists[grapheme].beginning.push(word);
          } else if (graphemeIndex === lowerWord.length - grapheme.length) {
            wordLists[grapheme].ending.push(word);
          } else if (graphemeIndex > 0) {
            wordLists[grapheme].medial.push(word);
          }
        }
        // For other consonants, check grapheme position
        else {
          if (lowerWord.startsWith(grapheme.toLowerCase())) {
            wordLists[grapheme].beginning.push(word);
          } else if (lowerWord.endsWith(grapheme.toLowerCase())) {
            wordLists[grapheme].ending.push(word);
          } else if (lowerWord.includes(grapheme.toLowerCase())) {
            wordLists[grapheme].medial.push(word);
          }
        }
      });
      
      // Remove duplicates and limit to 5 words per position
      wordLists[grapheme].beginning = [...new Set(wordLists[grapheme].beginning)].slice(0, 5);
      wordLists[grapheme].medial = [...new Set(wordLists[grapheme].medial)].slice(0, 5);
      wordLists[grapheme].ending = [...new Set(wordLists[grapheme].ending)].slice(0, 5);
    });
  }
  
  return wordLists;
}

/**
 * Generate appropriate airflow description based on phoneme type
 */
function generateAirflowDescription(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const stageName = data.stage_id;
  
  // Provide specific airflow descriptions based on phoneme characteristics
  if (phoneme.includes('sh')) {
    return 'Continuous airflow through a narrow channel between tongue and roof of mouth.';
  }
  if (phoneme.includes('ch')) {
    return 'Brief blockage followed by release with friction.';
  }
  if (phoneme.includes('th')) {
    return 'Airflow passes between tongue and teeth.';
  }
  if (stageName === 3) {
    return 'Two letters working together to create one sound with continuous airflow.';
  }
  if (stageName >= 4) {
    return 'Smooth, unobstructed airflow for vowel production.';
  }
  
  return 'Controlled airflow for precise sound production.';
}

/**
 * Generate explicit common errors with clear descriptions
 */
function generateCommonErrors(data: any): string[] {
  const articulation = data.articulation_data;
  const phoneme = data.phoneme?.toLowerCase() || '';
  const errors = [];
  
  // Get base substitutions from database
  const baseErrors = articulation?.common_substitutions || [];
  
  // Make errors more explicit based on phoneme
  if (phoneme.includes('sh')) {
    errors.push('Students may substitute /s/ for /sh/ (saying "sip" instead of "ship")');
    errors.push('Students may substitute /f/ for /sh/ due to similar tongue position');
    if (baseErrors.includes('omission')) {
      errors.push('Students may omit the /sh/ sound entirely in complex words');
    }
  } else if (phoneme.includes('ch')) {
    errors.push('Students may substitute /sh/ for /ch/ (saying "ship" instead of "chip")');
    errors.push('Students may substitute /t/ for /ch/ in initial position');
  } else if (phoneme.includes('th')) {
    errors.push('Students may substitute /f/ for /th/ (saying "fink" instead of "think")');
    errors.push('Students may substitute /d/ for voiced /th/ (saying "dis" instead of "this")');
  } else {
    // For other phonemes, make the substitutions more explicit
    baseErrors.forEach((error: string) => {
      if (error === '/s/') {
        errors.push(`Students may substitute /s/ for ${phoneme} (confusion with similar sounds)`);
      } else if (error === '/f/') {
        errors.push(`Students may substitute /f/ for ${phoneme} (similar mouth position)`);
      } else if (error === 'omission') {
        errors.push(`Students may omit the ${phoneme} sound in words`);
      } else {
        errors.push(`Students may substitute ${error} for ${phoneme}`);
      }
    });
  }
  
  return errors.length > 0 ? errors : [`Monitor for substitutions of similar sounds for ${phoneme}`];
}

/**
 * Generate place of articulation for phonemes without detailed articulation data
 */
function generatePlaceOfArticulation(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const stageId = data.stage_id;
  
  // Vowels
  if (stageId <= 2 && ['a', 'e', 'i', 'o', 'u'].some(v => phoneme.includes(v))) {
    return 'central (tongue position varies by vowel)';
  }
  
  // Common consonants
  if (phoneme.includes('m') || phoneme.includes('p') || phoneme.includes('b')) {
    return 'bilabial (both lips)';
  }
  if (phoneme.includes('t') || phoneme.includes('d') || phoneme.includes('n')) {
    return 'alveolar (tongue tip to ridge behind teeth)';
  }
  if (phoneme.includes('k') || phoneme.includes('g')) {
    return 'velar (back of tongue to soft palate)';
  }
  
  return 'varies by sound';
}

/**
 * Generate manner of articulation for phonemes without detailed articulation data
 */
function generateMannerOfArticulation(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const stageId = data.stage_id;
  
  // Vowels
  if (stageId <= 2 && ['a', 'e', 'i', 'o', 'u'].some(v => phoneme.includes(v))) {
    return 'vowel (open vocal tract)';
  }
  
  // Common consonants
  if (phoneme.includes('m') || phoneme.includes('n')) {
    return 'nasal (air through nose)';
  }
  if (phoneme.includes('p') || phoneme.includes('b') || phoneme.includes('t') || phoneme.includes('d') || phoneme.includes('k') || phoneme.includes('g')) {
    return 'stop (brief blockage of airflow)';
  }
  if (phoneme.includes('f') || phoneme.includes('v') || phoneme.includes('s') || phoneme.includes('z')) {
    return 'fricative (continuous airflow through narrow opening)';
  }
  
  return 'consonant';
}

/**
 * Generate voicing information for phonemes without detailed articulation data
 */
function generateVoicing(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  
  // Vowels are always voiced
  if (['a', 'e', 'i', 'o', 'u'].some(v => phoneme.includes(v))) {
    return 'voiced (vocal cords vibrate)';
  }
  
  // Common voiceless consonants
  if (['p', 't', 'k', 'f', 's'].some(c => phoneme.includes(c))) {
    return 'voiceless (no vocal cord vibration)';
  }
  
  // Common voiced consonants
  if (['b', 'd', 'g', 'v', 'z', 'm', 'n', 'l', 'r'].some(c => phoneme.includes(c))) {
    return 'voiced (vocal cords vibrate)';
  }
  
  return 'varies';
}

/**
 * Generate tongue position guidance for phonemes without detailed articulation data
 */
function generateTonguePosition(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const articulationData = data.articulation_data;
  
  if (articulationData?.cue) {
    return articulationData.cue;
  }
  
  if (phoneme.includes('a')) {
    return 'Jaw drops, tongue low and back';
  }
  if (phoneme.includes('e')) {
    return 'Tongue slightly raised, mouth more closed than /a/';
  }
  if (phoneme.includes('i')) {
    return 'Tongue high and forward, corners of mouth spread';
  }
  if (phoneme.includes('o')) {
    return 'Tongue back and raised, lips rounded';
  }
  if (phoneme.includes('u')) {
    return 'Tongue high and back, lips very rounded';
  }
  
  return 'Position tongue for clear sound production';
}

/**
 * Generate lip position guidance for phonemes without detailed articulation data
 */
function generateLipPosition(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  
  if (phoneme.includes('o') || phoneme.includes('u')) {
    return 'Lips rounded';
  }
  if (phoneme.includes('i') || phoneme.includes('e')) {
    return 'Lips slightly spread';
  }
  if (phoneme.includes('a')) {
    return 'Lips neutral, jaw dropped';
  }
  
  return 'Natural lip position for sound';
}

/**
 * Generate step-by-step instructions for phonemes without detailed articulation data
 */
function generateStepByStepInstructions(data: any): string[] {
  const phoneme = data.phoneme?.toLowerCase() || '';
  
  if (phoneme.includes('a')) {
    return ['Open your mouth', 'Drop your jaw', 'Make a short /a/ sound'];
  }
  if (phoneme.includes('e')) {
    return ['Open your mouth slightly', 'Say /a/ but lift your tongue a bit', 'Make a short /e/ sound'];
  }
  if (phoneme.includes('i')) {
    return ['Spread corners of your mouth', 'Lift your tongue high', 'Make a short /i/ sound'];
  }
  if (phoneme.includes('o')) {
    return ['Round your lips', 'Keep mouth more closed', 'Make a short /o/ sound'];
  }
  if (phoneme.includes('u')) {
    return ['Round your lips tightly', 'Lift back of tongue', 'Make a short /u/ sound'];
  }
  
  return ['Listen to the teacher model', 'Try to copy the sound', 'Practice in words'];
}

/**
 * Generate teacher tips for phonemes without detailed articulation data
 */
function generateTeacherTips(data: any): string[] {
  const phoneme = data.phoneme?.toLowerCase() || '';
  
  if (phoneme.includes('a')) {
    return ['Model with exaggerated jaw drop', 'Use visual cues like opening mouth wide', 'Practice with familiar words like "cat"'];
  }
  if (['e', 'i', 'o', 'u'].some(v => phoneme.includes(v))) {
    return [`Model clear ${phoneme} sound`, 'Use hand gestures to show mouth shape', 'Practice with simple CVC words'];
  }
  
  return ['Model the sound clearly', 'Use visual and tactile cues', 'Practice in simple words first'];
}

/**
 * Log usage analytics to Supabase
 */
async function logUsage(phonemeId: string, sectionsViewed: string[], userId?: string) {
  try {
    // You could implement usage logging here if you have a usage_logs table
    console.log('Usage logged:', { phonemeId, sectionsViewed, userId });
  } catch (error) {
    console.error('Error logging usage:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phoneme_input, sections_requested, user_id } = await request.json();

    if (!phoneme_input) {
      return NextResponse.json(
        { error: 'Phoneme input is required' },
        { status: 400 }
      );
    }

    // Find the phoneme in Supabase
    const phonemeData = await findPhonemeByInput(phoneme_input);
    
    if (!phonemeData) {
      return NextResponse.json(
        { 
          error: 'Phoneme not found',
          message: `Could not find phoneme for input: "${phoneme_input}". Try using IPA notation (e.g., "/sh/") or common names (e.g., "sh").`,
          suggestions: [
            'Try "/sh/" for the sh sound', 
            'Use "/m/" for the m sound', 
            'Use "ai" for the ai vowel team',
            'Use stage and phoneme like "stage1_m"'
          ]
        } as DecodingDenResponse,
        { status: 404 }
      );
    }

    // Note: We no longer block invalid grapheme combinations here
    // Instead, we let them pass through with invalid_grapheme flag
    // so the frontend can display the requested combination while
    // providing educational content about correct spellings

    // Transform Supabase data to expected frontend format
    const transformedData = transformPhonemeData(phonemeData);

    // Log usage analytics
    const requestedSections = sections_requested || ['all'];
    await logUsage(phonemeData.phoneme_id, requestedSections, user_id);

    // Check if this was an auto-corrected input
    let correction = null;
    if (phoneme_input.toLowerCase().includes('digraph')) {
      correction = { correction_message: 'Great! You\'re exploring digraphs - two letters that make one sound.' };
    }

    const response: DecodingDenResponse = {
      success: true,
      phoneme_data: transformedData,
      correction_message: correction?.correction_message || null,
      generated_at: new Date().toISOString(),
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in decoding-den API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        generated_at: new Date().toISOString(),
      } as DecodingDenResponse,
      { status: 500 }
    );
  }
}

// GET endpoint for browsing phonemes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('phonemes')
      .select('phoneme_id, phoneme, stage_id, frequency_rank, graphemes');

    if (stage) {
      query = query.eq('stage_id', parseInt(stage));
    }

    const { data: phonemes, error, count } = await query
      .order('frequency_rank', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const transformedPhonemes = phonemes?.map(phoneme => ({
      id: phoneme.phoneme_id,
      ipa_symbol: phoneme.phoneme,
      common_name: phoneme.phoneme.replace(/[\/]/g, '') + ' sound',
      phoneme_type: getPhonemeType(phoneme),
      frequency_rank: phoneme.frequency_rank || 0,
      stage_id: phoneme.stage_id,
      graphemes: phoneme.graphemes || [],
    })) || [];

    return NextResponse.json({
      success: true,
      phonemes: transformedPhonemes,
      total: count || 0,
      generated_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in decoding-den GET:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        generated_at: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}