import { NextRequest, NextResponse } from 'next/server';
import { getGraphemeFrequencies } from '../../data/graphemeFrequencies';
import { ALL_COMPREHENSIVE_PHONEMES } from '../../data/allComprehensivePhonemes';
import { STAGE_PHONEME_SAMPLES } from '../../data/allStagesDatabase';
import {
  getPhonemeFrequencyData,
  getGraphemeFrequenciesForPhoneme,
  COMPREHENSIVE_PHONEME_FREQUENCIES
} from '../../data/comprehensivePhonemeFrequencies';

// Note: Supabase removed - all phoneme data now comes from TypeScript files
// Search both ALL_COMPREHENSIVE_PHONEMES and STAGE_PHONEME_SAMPLES for complete coverage

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
 * Get frequency rank from local data when database value is missing
 * Note: This returns the teaching sequence order from curriculum data, not actual frequency in English
 */
function getFrequencyRankFromLocalData(phonemeSymbol: string): number {
  const normalized = phonemeSymbol.replace(/^\/|\/$/g, '').toLowerCase();
  const withSlashes = `/${normalized}/`;

  // Search in local comprehensive phoneme data
  const match = ALL_COMPREHENSIVE_PHONEMES.find(p => {
    const pNormalized = p.phoneme.replace(/^\/|\/$/g, '').toLowerCase();
    return pNormalized === normalized || p.phoneme === withSlashes;
  });

  return match?.frequency_rank || 0;
}

/**
 * Search for phoneme in TypeScript data (replaces Supabase queries)
 * Searches both ALL_COMPREHENSIVE_PHONEMES and STAGE_PHONEME_SAMPLES for full coverage
 * Returns data in the same shape as the old Supabase queries for compatibility
 */
function findPhonemeInTypeScript(input: string): any | null {
  const normalizedInput = input.toLowerCase().trim();

  // Remove "sound" suffix if present
  const cleanInput = normalizedInput.replace(/\s+sound$/i, '');

  // Combine both phoneme arrays for searching
  const allPhonemes = [...ALL_COMPREHENSIVE_PHONEMES, ...STAGE_PHONEME_SAMPLES];

  // Handle "short X" and "long X" vowel searches
  const shortVowelMatch = cleanInput.match(/^short\s+([aeiou])$/i);
  const longVowelMatch = cleanInput.match(/^long\s+([aeiou])$/i);

  let match = null;

  if (shortVowelMatch) {
    // Short vowels are in Stage 1
    const vowel = shortVowelMatch[1].toLowerCase();
    match = allPhonemes.find(p =>
      p.stage === 1 && p.graphemes.includes(vowel) && p.phoneme === `/${vowel}/`
    );
  } else if (longVowelMatch) {
    // Long vowels are in Stage 4 (VCe patterns)
    const vowel = longVowelMatch[1].toLowerCase();
    match = allPhonemes.find(p =>
      p.stage === 4 && p.graphemes.some(g => g.includes(vowel))
    );
  }

  if (!match) {
    // Try exact phoneme match (e.g., "/sh/", "/m/")
    match = allPhonemes.find(p =>
      p.phoneme.toLowerCase() === normalizedInput ||
      p.phoneme.toLowerCase() === `/${cleanInput}/`
    );
  }

  if (!match) {
    // Try phoneme_id match (e.g., "stage1_m", "stage3_sh")
    match = allPhonemes.find(p =>
      p.phoneme_id.toLowerCase() === normalizedInput
    );
  }

  if (!match) {
    // Try grapheme match (e.g., "sh", "ch", "m")
    match = allPhonemes.find(p =>
      p.graphemes.some(g => g.toLowerCase() === cleanInput)
    );
  }

  if (!match) {
    // Try partial match on phoneme symbol
    const withSlashes = cleanInput.startsWith('/') ? cleanInput : `/${cleanInput}/`;
    match = allPhonemes.find(p =>
      p.phoneme.toLowerCase().includes(cleanInput) ||
      p.phoneme.toLowerCase() === withSlashes
    );
  }

  if (!match) return null;

  // Map TypeScript fields to the shape expected by transformPhonemeData
  // Use optional chaining for extended fields that only exist in ComprehensivePhonemeEntry
  // (STAGE_PHONEME_SAMPLES uses simpler PhonemeEntry type without these fields)
  const matchAny = match as any;
  return {
    phoneme_id: match.phoneme_id,
    phoneme: match.phoneme,
    stage_id: match.stage,  // Map 'stage' to 'stage_id' for compatibility
    frequency_rank: match.frequency_rank,
    graphemes: match.graphemes,
    word_examples: match.word_examples,
    decodable_sentences: match.decodable_sentences,
    // Extended fields - may be undefined for STAGE_PHONEME_SAMPLES entries
    articulation_data: matchAny.articulation_data,
    content_generation_meta: matchAny.content_generation_meta,
    research_sources: matchAny.research_sources,
    assessment_criteria: matchAny.assessment_criteria,
    teaching_advantages: matchAny.teaching_advantages,
    linguistic_properties_extended: matchAny.linguistic_properties_extended,
    complexity_score: matchAny.complexity_score,
    grade_band: matchAny.grade_band,
    introduction_week: matchAny.introduction_week,
  };
}

/**
 * Find specific grapheme for a phoneme (e.g., "sh spelled ch")
 * Uses TypeScript data only
 */
function findSpecificGraphemeForPhoneme(phoneme: string, grapheme: string): any | null {
  // Find the phoneme in TypeScript data
  const phonemeData = findPhonemeInTypeScript(phoneme);

  if (!phonemeData) {
    return null;
  }

  // Check if the requested grapheme is valid for this phoneme
  const hasGrapheme = phonemeData.graphemes?.includes(grapheme.toLowerCase());

  // Return the phoneme data with the requested grapheme for display
  return {
    ...phonemeData,
    requested_specific_grapheme: grapheme,
    show_specific_grapheme: true,
    invalid_grapheme: !hasGrapheme
  };
}

/**
 * Find phoneme by various input formats
 * Uses TypeScript data only (no Supabase)
 */
function findPhonemeByInput(input: string): any | null {
  const normalizedInput = input.toLowerCase().trim();

  // Check for "phoneme spelled grapheme" syntax
  const spelledPattern = /^(.+?)\s+spelled\s+(.+)$/i;
  const spelledMatch = normalizedInput.match(spelledPattern);

  if (spelledMatch) {
    const [, requestedPhoneme, requestedGrapheme] = spelledMatch;
    return findSpecificGraphemeForPhoneme(requestedPhoneme.trim(), requestedGrapheme.trim());
  }

  // Use TypeScript search for all other inputs
  return findPhonemeInTypeScript(input);
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
      ipa_symbol: formatPhonemeSymbol(supabaseData.phoneme, supabaseData.stage_id),
      common_name: getPhonemeCommonName(supabaseData.phoneme, supabaseData.stage_id),
      phoneme_type: getPhonemeType(supabaseData),
      frequency_rank: (typeof supabaseData.frequency_rank === 'number' && supabaseData.frequency_rank > 0)
        ? supabaseData.frequency_rank
        : getFrequencyRankFromLocalData(supabaseData.phoneme),
      is_voiced: isVoicedPhoneme(supabaseData.phoneme, articulation),
    },
    graphemes: (() => {
      // Try new comprehensive frequency data first
      const comprehensiveData = getGraphemeFrequenciesForPhoneme(supabaseData.phoneme);

      if (comprehensiveData.length > 0) {
        // Use new comprehensive frequency data - has detailed weighted percentages
        return comprehensiveData.map((freqData, index) => ({
          id: `${safeString(supabaseData.phoneme_id)}_${index}`,
          grapheme: safeString(freqData.grapheme),
          spelling_frequency: freqData.weighted_percent / 100,
          percentage: freqData.weighted_percent,
          usage_label: freqData.usage_label,
          context_notes: '',
          // Notes are now minimal since percentage and label are shown in the UI
          notes: '',
        }));
      }

      // Fallback to old graphemeFrequencies data
      const frequencyData = getGraphemeFrequencies(supabaseData.phoneme);

      if (frequencyData.length > 0) {
        // Use frequency data - it has the complete list of valid graphemes
        return frequencyData.map((freqData, index) => ({
          id: `${safeString(supabaseData.phoneme_id)}_${index}`,
          grapheme: safeString(freqData.grapheme),
          spelling_frequency: freqData.percentage / 100,
          percentage: freqData.percentage,
          usage_label: freqData.usage_label,
          context_notes: safeString(freqData.context_notes),
          notes: safeString(freqData.context_notes || (index === 0 ? `Most common spelling for ${supabaseData.phoneme} sound` : '')),
        }));
      } else {
        // Fallback to database graphemes if no frequency data available
        return (supabaseData.graphemes || []).map((grapheme: string, index: number) => ({
          id: `${safeString(supabaseData.phoneme_id)}_${index}`,
          grapheme: safeString(grapheme),
          spelling_frequency: index === 0 ? 1 : 0.5,
          percentage: undefined,
          usage_label: undefined,
          context_notes: '',
          notes: index === 0 ? `Most common spelling for ${supabaseData.phoneme} sound` : '',
        }));
      }
    })(),
    articulation: articulation ? {
      // For vowels, use vowel-specific terminology; for consonants, use standard terms
      place_of_articulation: articulation.sound_type === 'vowel'
        ? safeString(articulation.tongue_position)
        : safeString(articulation.place || generatePlaceOfArticulation(supabaseData)),
      manner_of_articulation: articulation.sound_type === 'vowel'
        ? safeString(articulation.sound_type)
        : safeString(articulation.manner || generateMannerOfArticulation(supabaseData)),
      voicing: safeString(articulation.voicing || generateVoicing(supabaseData)),
      tongue_position: articulation.sound_type === 'vowel'
        ? safeString(articulation.lip_shape)
        : safeString(articulation.teacher_guidance || articulation.cue || generateTonguePosition(supabaseData)),
      lip_position: articulation.sound_type === 'vowel'
        ? safeString(articulation.airflow)
        : safeString(articulation.articulation_cues || generateLipPosition(supabaseData)),
      airflow_description: safeString(articulation.airflow_description) || safeString(articulation.airflow) || generateAirflowDescription(supabaseData),
      step_by_step_instructions: articulation.student_tips
        ? safeString(articulation.student_tips).split(/(?<=[.!?])\s+/).filter((s: string) => s.trim().length > 0)
        : generateStepByStepInstructions(supabaseData),
      common_errors: generateCommonErrors(supabaseData),
      teacher_tips: articulation.teacher_guidance ? [safeString(articulation.teacher_guidance)] : generateTeacherTips(supabaseData),
      // Vowel-specific fields
      is_vowel: articulation.sound_type === 'vowel',
      vowel_height: articulation.tongue_position?.split(',')[0]?.trim(),
      vowel_backness: articulation.tongue_position?.split(',')[1]?.trim(),
      lip_shape: safeString(articulation.lip_shape),
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
 * Format phoneme symbol for display (e.g., /a/ → /ă/ for short vowels)
 * Uses breve notation for short vowels per Science of Reading standards
 */
function formatPhonemeSymbol(phoneme: string, stageId: number): string {
  const p = phoneme?.toLowerCase() || '';

  // Short vowels (Stage 1) should use breve notation
  const shortVowelMap: { [key: string]: string } = {
    '/a/': '/ă/',
    '/e/': '/ĕ/',
    '/i/': '/ĭ/',
    '/o/': '/ŏ/',
    '/u/': '/ŭ/',
  };

  if (stageId === 1 && shortVowelMap[p]) {
    return shortVowelMap[p];
  }

  return phoneme;
}

/**
 * Get common name for phoneme (e.g., "short a sound")
 */
function getPhonemeCommonName(phoneme: string, stageId: number): string {
  const p = phoneme?.toLowerCase() || '';

  // Short vowels
  const shortVowelNames: { [key: string]: string } = {
    '/a/': 'short a sound',
    '/e/': 'short e sound',
    '/i/': 'short i sound',
    '/o/': 'short o sound',
    '/u/': 'short u sound',
  };

  if (stageId === 1 && shortVowelNames[p]) {
    return shortVowelNames[p];
  }

  // Default: strip slashes and add "sound"
  return phoneme.replace(/[\/]/g, '') + ' sound';
}

/**
 * Determine if a phoneme is voiced
 */
function isVoicedPhoneme(phoneme: string, articulation: any): boolean {
  const p = phoneme?.toLowerCase() || '';

  // All vowels are voiced
  const vowelPatterns = ['/a/', '/e/', '/i/', '/o/', '/u/', '/ā/', '/ē/', '/ī/', '/ō/', '/ū/',
    '/ar/', '/er/', '/ir/', '/or/', '/ur/', '/oi/', '/ou/', '/aw/', '/oo/'];
  if (vowelPatterns.some(v => p === v || p.includes(v.replace(/\//g, '')))) {
    return true;
  }

  // Voiced consonants
  const voicedConsonants = ['/b/', '/d/', '/g/', '/v/', '/z/', '/m/', '/n/', '/l/', '/r/', '/w/', '/j/', '/ng/'];
  if (voicedConsonants.includes(p)) {
    return true;
  }

  // Check articulation data if available
  if (articulation?.voicing === 'voiced') {
    return true;
  }

  // Default to voiceless for remaining consonants
  return false;
}

/**
 * Determine phoneme type from Supabase data
 */
function getPhonemeType(data: any): string {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const stageId = data.stage_id;

  // Check if it's a vowel sound (short vowels are a, e, i, o, u)
  const shortVowels = ['/a/', '/e/', '/i/', '/o/', '/u/'];
  const longVowels = ['/ā/', '/ē/', '/ī/', '/ō/', '/ū/'];
  const rControlledVowels = ['/ar/', '/er/', '/ir/', '/or/', '/ur/', '/ər/'];

  if (shortVowels.includes(phoneme)) {
    return 'short_vowel';
  }
  if (longVowels.includes(phoneme)) {
    return 'long_vowel';
  }
  if (rControlledVowels.includes(phoneme)) {
    return 'vowel_r_controlled';
  }

  // Check by stage for other patterns
  if (stageId === 3) return 'consonant_digraph';
  if (stageId === 4) return 'long_vowel';
  if (stageId === 5) return 'vowel_team';
  if (stageId === 6) return 'vowel_r_controlled';
  if (stageId >= 7) return 'advanced_pattern';

  return 'consonant';
}

/**
 * Generate teaching explanations from Supabase data
 */
function generateTeachingExplanations(data: any): Array<{ content: string; icon_emoji: string }> {
  const explanations = [];

  // Get properly formatted phoneme symbol (with breve for short vowels)
  const displayPhoneme = formatPhonemeSymbol(data.phoneme, data.stage_id);
  const primaryGrapheme = data.graphemes?.[0] || '';

  // Short vowel explanations (Stage 1)
  if (data.stage_id === 1) {
    explanations.push({
      content: `The grapheme <strong>〈${primaryGrapheme}〉</strong> represents the ${displayPhoneme} sound in closed syllables.`,
      icon_emoji: '💙'
    });
    explanations.push({
      content: `It's one of the five short vowel sounds introduced early in phonics instruction.`,
      icon_emoji: '💙'
    });
    explanations.push({
      content: `The ${displayPhoneme} sound is common in simple CVC words (consonant-vowel-consonant).`,
      icon_emoji: '💙'
    });
  } else {
    // Non-short-vowel explanations
    if (data.graphemes?.length > 1) {
      explanations.push({
        content: `<strong>〈${primaryGrapheme}〉</strong> can be spelled ${data.graphemes.length} different ways.`,
        icon_emoji: '💙'
      });
    }

    if (data.articulation_data?.voicing) {
      explanations.push({
        content: `The ${displayPhoneme} sound is ${data.articulation_data.voicing}. ${data.articulation_data.voicing === 'voiced' ? 'Your vocal cords vibrate when it is said.' : 'Your vocal cords do not vibrate when it is said.'}`,
        icon_emoji: '💙'
      });
    }

    explanations.push({
      content: `You can hear this sound in different positions in words.`,
      icon_emoji: '💙'
    });
  }

  return explanations;
}

/**
 * Generate teaching rules from Supabase data
 */
function generateTeachingRules(data: any): Array<{ content: string; icon_emoji: string }> {
  const rules = [];
  const phoneme = data.phoneme?.toLowerCase() || '';

  // Short vowel rules (Stage 1)
  // One clean, structural rule that applies to all short vowels
  if (data.stage_id === 1) {
    rules.push({
      content: 'In closed syllables, a single vowel followed by one or more consonants is usually short.',
      icon_emoji: '💚'
    });
  }

  // Digraph rules (Stage 3)
  if (data.stage_id === 3) {
    rules.push({
      content: 'Digraphs are two letters making one sound.',
      icon_emoji: '💚'
    });
  }

  // Add teaching advantages if available and not already covered
  if (data.teaching_advantages?.length > 0 && data.stage_id !== 1) {
    rules.push({
      content: data.teaching_advantages[0],
      icon_emoji: '💚'
    });
  }

  return rules;
}

/**
 * Generate teaching tips from Supabase data
 * These are PEDAGOGICAL tips (how to teach), NOT articulation tips (how to produce the sound)
 * Articulation content belongs in the Articulation Guidance section only
 */
function generateTeachingTips(data: any): Array<{ content: string; icon_emoji: string }> {
  const tips: Array<{ content: string; icon_emoji: string }> = [];
  const phoneme = data.phoneme?.toLowerCase() || '';
  const displayPhoneme = formatPhonemeSymbol(data.phoneme, data.stage_id);
  const primaryGrapheme = data.graphemes?.[0] || '';

  // Short vowels (Stage 1) - pedagogical tips for teaching short vowels
  if (data.stage_id === 1) {
    tips.push({
      content: `Use Elkonin boxes to help students segment CVC words with the ${displayPhoneme} sound.`,
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Practice continuous blending (stretching sounds together) rather than choppy, segmented blending.',
      icon_emoji: '💛'
    });
    tips.push({
      content: `Use word chains to build phonemic awareness: change one sound at a time (e.g., cat → cot → cop).`,
      icon_emoji: '💛'
    });
    tips.push({
      content: `Multi-sensory practice: Have students sky-write 〈${primaryGrapheme}〉 while saying ${displayPhoneme}.`,
      icon_emoji: '💛'
    });
  }

  // Consonants (Stage 2) - pedagogical tips
  else if (data.stage_id === 2) {
    tips.push({
      content: `Use picture sorts to help students identify words that begin or end with ${displayPhoneme}.`,
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Connect the sound to a key word and picture that students can reference (anchor chart).',
      icon_emoji: '💛'
    });
    tips.push({
      content: `Practice blending ${displayPhoneme} with known vowels to build simple CVC words.`,
      icon_emoji: '💛'
    });
  }

  // Digraphs (Stage 3) - pedagogical tips
  else if (data.stage_id === 3) {
    tips.push({
      content: `Use letter tiles that show 〈${primaryGrapheme}〉 as ONE unit to reinforce "two letters, one sound."`,
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Create an anchor chart comparing this digraph to similar sounds students already know.',
      icon_emoji: '💛'
    });
    tips.push({
      content: `Word sorts: Have students categorize words by whether they contain 〈${primaryGrapheme}〉 or not.`,
      icon_emoji: '💛'
    });
  }

  // Long vowels (Stage 4) - pedagogical tips
  else if (data.stage_id === 4) {
    tips.push({
      content: 'Compare and contrast short vs. long vowel sounds explicitly (e.g., "cap" vs. "cape").',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Teach the silent-e pattern as a visual cue: "When e is at the end, the vowel says its name."',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Use word sorts to help students discover the pattern themselves before stating the rule.',
      icon_emoji: '💛'
    });
  }

  // Vowel teams (Stage 5) - pedagogical tips
  else if (data.stage_id === 5) {
    tips.push({
      content: `Teach 〈${primaryGrapheme}〉 as a team: "These letters work together to make one sound."`,
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Use color-coding to highlight vowel teams in text during reading practice.',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Connect to known words first, then introduce new decodable words with the same pattern.',
      icon_emoji: '💛'
    });
  }

  // R-controlled vowels (Stage 6) - pedagogical tips
  else if (data.stage_id === 6) {
    tips.push({
      content: 'Teach that "r" changes the vowel sound — it\'s "bossy r" that controls the vowel.',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Compare r-controlled vowels to their short vowel counterparts (e.g., "cat" vs. "car").',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Use word sorts to group words by their r-controlled vowel pattern.',
      icon_emoji: '💛'
    });
  }

  // Advanced patterns (Stage 7+) - pedagogical tips
  else if (data.stage_id >= 7) {
    tips.push({
      content: 'Build on students\' existing phonics knowledge — connect new patterns to known ones.',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Use morphology: Help students see how prefixes, roots, and suffixes affect spelling.',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Provide extensive reading practice with texts that feature the target pattern.',
      icon_emoji: '💛'
    });
  }

  // Fallback for any stage
  if (tips.length === 0) {
    tips.push({
      content: 'Use explicit, systematic instruction: model, guide, then release to independent practice.',
      icon_emoji: '💛'
    });
    tips.push({
      content: 'Provide cumulative review — regularly revisit previously taught sounds and patterns.',
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
  const displayPhoneme = formatPhonemeSymbol(data.phoneme, data.stage_id);
  const errors: string[] = [];

  // Get base substitutions from database
  const baseErrors = articulation?.common_substitutions || [];

  // If database has well-formatted errors (containing parentheses with examples), use them directly
  if (baseErrors.length > 0 && baseErrors.some((e: string) => e.includes('('))) {
    baseErrors.forEach((error: string) => {
      errors.push(`Students may substitute ${error}`);
    });
    return errors;
  }

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
        errors.push(`Students may substitute /s/ for ${displayPhoneme} (confusion with similar sounds)`);
      } else if (error === '/f/') {
        errors.push(`Students may substitute /f/ for ${displayPhoneme} (similar mouth position)`);
      } else if (error === 'omission') {
        errors.push(`Students may omit the ${displayPhoneme} sound in words`);
      } else {
        errors.push(`Students may substitute ${error} for ${displayPhoneme}`);
      }
    });
  }

  return errors.length > 0 ? errors : [`Monitor for substitutions of similar sounds for ${displayPhoneme}`];
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
    return ['Open your mouth', 'Drop your jaw', 'Make a short /ă/ sound'];
  }
  if (phoneme.includes('e')) {
    return ['Open your mouth slightly', 'Say /ă/ but lift your tongue a bit', 'Make a short /ĕ/ sound'];
  }
  if (phoneme.includes('i')) {
    return ['Spread corners of your mouth', 'Lift your tongue high', 'Make a short /ĭ/ sound'];
  }
  if (phoneme.includes('o')) {
    return ['Round your lips', 'Keep mouth more closed', 'Make a short /ŏ/ sound'];
  }
  if (phoneme.includes('u')) {
    return ['Relax your mouth', 'Keep tongue in the middle', 'Make a short /ŭ/ sound'];
  }

  return ['Listen to the teacher model', 'Try to copy the sound', 'Practice in words'];
}

/**
 * Generate teacher tips for phonemes without detailed articulation data
 */
function generateTeacherTips(data: any): string[] {
  const phoneme = data.phoneme?.toLowerCase() || '';
  const displayPhoneme = formatPhonemeSymbol(data.phoneme, data.stage_id);

  if (phoneme.includes('a')) {
    return ['Model with exaggerated jaw drop', 'Use visual cues like opening mouth wide', 'Practice with familiar words like "cat"'];
  }
  if (['e', 'i', 'o', 'u'].some(v => phoneme.includes(v))) {
    return [`Model clear ${displayPhoneme} sound`, 'Use hand gestures to show mouth shape', 'Practice with simple CVC words'];
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

    // Find the phoneme in TypeScript data
    const phonemeData = findPhonemeByInput(phoneme_input);
    
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

    // Filter and paginate from TypeScript data
    let phonemes = [...ALL_COMPREHENSIVE_PHONEMES];

    if (stage) {
      phonemes = phonemes.filter(p => p.stage === parseInt(stage));
    }

    // Sort by frequency_rank
    phonemes.sort((a, b) => (a.frequency_rank || 999) - (b.frequency_rank || 999));

    // Apply pagination
    const total = phonemes.length;
    const paginatedPhonemes = phonemes.slice(offset, offset + limit);

    const transformedPhonemes = paginatedPhonemes.map(phoneme => ({
      id: phoneme.phoneme_id,
      ipa_symbol: phoneme.phoneme,
      common_name: phoneme.phoneme.replace(/[\/]/g, '') + ' sound',
      phoneme_type: getPhonemeType({ ...phoneme, stage_id: phoneme.stage }),
      frequency_rank: phoneme.frequency_rank || 0,
      stage_id: phoneme.stage,
      graphemes: phoneme.graphemes || [],
    }));

    return NextResponse.json({
      success: true,
      phonemes: transformedPhonemes,
      total: total,
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