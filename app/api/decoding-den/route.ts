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
 * Find phoneme by various input formats
 */
async function findPhonemeByInput(input: string): Promise<any | null> {
  const normalizedInput = input.toLowerCase().trim();
  
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
  
  return {
    phoneme: {
      id: supabaseData.phoneme_id,
      ipa_symbol: supabaseData.phoneme,
      common_name: supabaseData.phoneme.replace(/[\/]/g, '') + ' sound',
      phoneme_type: getPhonemeType(supabaseData),
      frequency_rank: supabaseData.frequency_rank || 0,
      is_voiced: articulation?.voicing === 'voiced' || false,
    },
    graphemes: supabaseData.graphemes?.map((grapheme: string, index: number) => {
      // Get frequency data for this phoneme
      const frequencyData = getGraphemeFrequencies(supabaseData.phoneme);
      const graphemeFreq = frequencyData.find(f => f.grapheme === grapheme);
      
      return {
        id: `${supabaseData.phoneme_id}_${index}`,
        grapheme: grapheme,
        spelling_frequency: graphemeFreq ? graphemeFreq.percentage / 100 : (index === 0 ? 1 : 0.5),
        percentage: graphemeFreq?.percentage,
        usage_label: graphemeFreq?.usage_label,
        context_notes: graphemeFreq?.context_notes,
        notes: graphemeFreq?.context_notes || (index === 0 ? `Most common spelling for ${supabaseData.phoneme} sound` : undefined),
      };
    }) || [],
    articulation: articulation ? {
      place_of_articulation: articulation.place || '',
      manner_of_articulation: articulation.manner || '',
      voicing: articulation.voicing || '',
      tongue_position: articulation.teacher_guidance || '',
      lip_position: articulation.articulation_cues || '',
      airflow_description: generateAirflowDescription(supabaseData),
      step_by_step_instructions: articulation.student_tips ? [articulation.student_tips] : [],
      common_errors: generateCommonErrors(supabaseData),
      teacher_tips: articulation.teacher_guidance ? [articulation.teacher_guidance] : [],
    } : null,
    teaching_content: {
      explanations: generateTeachingExplanations(supabaseData),
      rules: generateTeachingRules(supabaseData),
      tips: generateTeachingTips(supabaseData),
    },
    word_lists: generateWordLists(supabaseData),
    practice_texts: {
      sentences: supabaseData.decodable_sentences || [],
      stories: [], // Could be generated from word examples
      word_ladders: [], // Could be generated from similar phonemes
    },
    research_citations: supabaseData.research_sources?.map((source: string, index: number) => ({
      source_name: source,
      citation_text: `Research-based phonics instruction supporting ${supabaseData.phoneme} sound development.`,
      url: undefined,
    })) || [],
  };
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
 * Generate word lists from word examples
 */
function generateWordLists(data: any): { [grapheme: string]: { beginning: string[]; medial: string[]; ending: string[] } } {
  const wordLists: any = {};
  
  if (data.graphemes?.length > 0 && data.word_examples?.length > 0) {
    const primaryGrapheme = data.graphemes[0];
    wordLists[primaryGrapheme] = {
      beginning: data.word_examples.slice(0, 5) || [],
      medial: [],
      ending: [],
    };
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