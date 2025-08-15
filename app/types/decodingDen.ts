export interface Phoneme {
  id: string;
  ipa_symbol: string;
  common_name: string;
  phoneme_type: PhonemeType;
  frequency_rank: number;
  is_voiced: boolean;
}

export type PhonemeType = 
  | 'consonant_single'
  | 'consonant_digraph'
  | 'consonant_trigraph'
  | 'consonant_blend'
  | 'vowel_short'
  | 'vowel_long'
  | 'vowel_r_controlled'
  | 'vowel_diphthong'
  | 'vowel_team'
  | 'schwa';

export interface Grapheme {
  id: string;
  grapheme: string;
  spelling_frequency: number;
  notes?: string;
}

export interface ArticulationGuide {
  place_of_articulation: string;
  manner_of_articulation: string;
  voicing: string;
  tongue_position: string;
  lip_position: string;
  airflow_description: string;
  step_by_step_instructions: string[];
  common_errors: string[];
  teacher_tips: string[];
}

export interface TeachingContent {
  explanations: Array<{ content: string; icon_emoji: string }>;
  rules: Array<{ content: string; icon_emoji: string }>;
  tips: Array<{ content: string; icon_emoji: string }>;
}

export interface WordLists {
  [grapheme: string]: {
    beginning: string[];
    medial: string[];
    ending: string[];
  };
}

export interface PracticeTexts {
  sentences: string[];
  stories: string[];
  word_ladders: string[];
}

export interface ResearchCitation {
  source_name: string;
  citation_text: string;
  url?: string;
}

export interface PhonemeData {
  phoneme: Phoneme;
  graphemes: Grapheme[];
  articulation: ArticulationGuide | null;
  teaching_content: TeachingContent;
  word_lists: WordLists;
  practice_texts: PracticeTexts;
  research_citations: ResearchCitation[];
}

export interface DecodingDenResponse {
  success: boolean;
  phoneme_data: PhonemeData;
  correction_message?: string;
  generated_at: string;
}

export interface DecodingDenRequest {
  phoneme_input: string;
  sections_requested?: string[];
  user_id?: string;
}

export interface PhonemeSearchResponse {
  success: boolean;
  phonemes: Phoneme[];
  total: number;
}

// UI Component Props
export interface SoundOfTheDayProps {
  phoneme: Phoneme;
  graphemes: Grapheme[];
}

export interface LetsLearnItProps {
  teachingContent: TeachingContent;
  articulation: ArticulationGuide | null;
}

export interface WordListPracticeProps {
  wordLists: WordLists;
  phonemeSymbol: string;
}

export interface PracticeTextProps {
  practiceTexts: PracticeTexts;
}

export interface ResearchCitationsProps {
  citations: ResearchCitation[];
}

// Section identifiers for the UI
export type DecodingDenSection = 
  | 'sound-of-the-day'
  | 'lets-learn-it'
  | 'articulation-guidance'
  | 'word-list-practice'
  | 'practice-text'
  | 'short-story'
  | 'customize-lesson'
  | 'word-workspace';

export interface DecodingDenSectionConfig {
  id: DecodingDenSection;
  title: string;
  description: string;
  icon?: string;
  requires_data: keyof PhonemeData;
}