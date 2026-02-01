import { useState } from 'react';

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
  research_citations: Array<{
    source_name: string;
    citation_text: string;
    url?: string;
  }>;
}

interface SoundOfTheDayProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

/**
 * Phoneme frequency in spoken English (percentage of all phonemes)
 * Source: Mines, Hanson & Shoup (1978) "Frequency of occurrence of phonemes in conversational English"
 * Additional data from Denes & Pinson (1993) "The Speech Chain"
 */
const PHONEME_FREQUENCY_PERCENT: Record<string, { percent: number; rank: number }> = {
  // Vowels - using common notations
  '/ə/': { percent: 11.49, rank: 1 },    // schwa
  '/ĭ/': { percent: 3.61, rank: 7 },     // short i
  '/ĕ/': { percent: 2.39, rank: 15 },    // short e
  '/ă/': { percent: 1.93, rank: 17 },    // short a
  '/ŭ/': { percent: 1.66, rank: 20 },    // short u
  '/ŏ/': { percent: 1.02, rank: 27 },    // short o
  '/ē/': { percent: 2.41, rank: 14 },    // long e
  '/ā/': { percent: 1.64, rank: 22 },    // long a
  '/ō/': { percent: 1.48, rank: 24 },    // long o
  '/ī/': { percent: 1.01, rank: 28 },    // long i
  '/ū/': { percent: 0.86, rank: 30 },    // long u
  // R-controlled
  '/er/': { percent: 1.95, rank: 16 },   // er/ir/ur
  '/ar/': { percent: 0.65, rank: 33 },   // ar
  '/or/': { percent: 0.58, rank: 34 },   // or
  // Diphthongs
  '/ow/': { percent: 0.53, rank: 35 },   // ow/ou
  '/oy/': { percent: 0.10, rank: 40 },   // oi/oy
  '/aw/': { percent: 0.44, rank: 36 },   // aw/au
  '/oo/': { percent: 0.91, rank: 29 },   // oo (book)
  // Consonants
  '/n/': { percent: 7.11, rank: 2 },
  '/t/': { percent: 6.91, rank: 3 },
  '/s/': { percent: 4.55, rank: 4 },
  '/d/': { percent: 4.14, rank: 5 },
  '/l/': { percent: 3.81, rank: 6 },
  '/r/': { percent: 3.41, rank: 8 },
  '/z/': { percent: 2.95, rank: 10 },
  '/m/': { percent: 2.78, rank: 11 },
  '/k/': { percent: 2.71, rank: 12 },
  '/w/': { percent: 2.47, rank: 13 },
  '/b/': { percent: 2.11, rank: 16 },
  '/p/': { percent: 1.86, rank: 18 },
  '/h/': { percent: 1.83, rank: 19 },
  '/f/': { percent: 1.65, rank: 21 },
  '/v/': { percent: 1.32, rank: 25 },
  '/g/': { percent: 1.06, rank: 26 },
  '/y/': { percent: 0.81, rank: 31 },
  '/j/': { percent: 0.44, rank: 37 },    // j as in "jump"
  // Digraphs
  '/th(v)/': { percent: 3.29, rank: 9 }, // voiced th (the, this)
  '/ng/': { percent: 1.60, rank: 23 },
  '/sh/': { percent: 0.96, rank: 29 },
  '/ch/': { percent: 0.56, rank: 34 },
  '/th/': { percent: 0.41, rank: 38 },   // unvoiced th (think)
  '/zh/': { percent: 0.07, rank: 41 },
  // Blends
  '/ks/': { percent: 0.15, rank: 39 },   // x
  '/kw/': { percent: 0.06, rank: 42 },   // qu
};

function getPhonemeFrequency(ipaSymbol: string): { percent: number; rank: number } | null {
  // Normalize the input
  const normalized = ipaSymbol.toLowerCase().trim();

  // Try direct match
  if (PHONEME_FREQUENCY_PERCENT[normalized]) {
    return PHONEME_FREQUENCY_PERCENT[normalized];
  }

  // Try with slashes
  const withSlashes = normalized.startsWith('/') ? normalized : `/${normalized}/`;
  if (PHONEME_FREQUENCY_PERCENT[withSlashes]) {
    return PHONEME_FREQUENCY_PERCENT[withSlashes];
  }

  // Try common aliases
  const aliases: Record<string, string> = {
    'short a': '/ă/',
    'short e': '/ĕ/',
    'short i': '/ĭ/',
    'short o': '/ŏ/',
    'short u': '/ŭ/',
    'long a': '/ā/',
    'long e': '/ē/',
    'long i': '/ī/',
    'long o': '/ō/',
    'long u': '/ū/',
    '/a/': '/ă/',
    '/e/': '/ĕ/',
    '/i/': '/ĭ/',
    '/o/': '/ŏ/',
    '/u/': '/ŭ/',
  };

  if (aliases[normalized] && PHONEME_FREQUENCY_PERCENT[aliases[normalized]]) {
    return PHONEME_FREQUENCY_PERCENT[aliases[normalized]];
  }

  return null;
}

export default function SoundOfTheDay({ phonemeData }: SoundOfTheDayProps) {
  const [showAlternatives, setShowAlternatives] = useState(true);
  const [showSources, setShowSources] = useState(false);
  const [showReferralNotes, setShowReferralNotes] = useState(true);

  if (!phonemeData) return null;

  const { phoneme, graphemes, articulation, research_citations } = phonemeData;

  // Get actual frequency data for this phoneme
  const frequencyData = getPhonemeFrequency(phoneme.ipa_symbol);

  // Get phoneme label for display
  const getPhonemeLabel = (phoneme: PhonemeData['phoneme']) => {
    switch (phoneme.phoneme_type) {
      case 'short_vowel':
        return 'short vowel';
      case 'consonant_digraph':
        return 'consonant digraph';
      case 'consonant_trigraph':
        return 'consonant trigraph';
      case 'long_vowel':
        return 'long vowel';
      case 'vowel_team':
        return 'vowel team';
      case 'vowel_r_controlled':
        return 'r-controlled vowel';
      case 'vowel_diphthong':
        return 'diphthong';
      case 'advanced_pattern':
        return 'advanced pattern';
      default:
        return phoneme.phoneme_type.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-5">

      {/* Phoneme Being Explored Header */}
      <div className="bg-gradient-to-r from-oceanBlue to-darkOcean text-white rounded-lg px-4 py-3 shadow-md">
        <p className="text-lg font-bold">
          {phoneme.ipa_symbol} — Spelled 〈{graphemes[0]?.grapheme || 'N/A'}〉
        </p>
      </div>

      {/* 3-Column Grid: Left = Type+Voicing stacked, Middle = Frequency, Right = Spelling */}
      <div className="grid md:grid-cols-3 gap-3 items-stretch">

        {/* LEFT COLUMN: Phoneme Type + Voicing (stacked, equal height to other columns) */}
        <div className="flex flex-col gap-2">
          {/* Phoneme Type */}
          <div className="bg-blue-50 rounded-lg px-3 py-2 border-2 border-oceanBlue/40 flex-1 flex flex-col justify-center">
            <h5 className="font-semibold text-oceanBlue text-sm drop-shadow-md">Phoneme Type</h5>
            <p className="text-gray-700 capitalize font-bold">{getPhonemeLabel(phoneme)}</p>
          </div>

          {/* Voicing */}
          {phoneme.is_voiced !== null && (
            <div className="bg-purple-50 rounded-lg px-3 py-2 border-2 border-oceanBlue/40 flex-1 flex flex-col justify-center">
              <h5 className="font-semibold text-oceanBlue text-sm drop-shadow-md">Voicing</h5>
              <p className="text-gray-700">
                <strong>{phoneme.is_voiced ? 'Voiced' : 'Unvoiced'}</strong>
              </p>
              <p className="text-xs text-gray-500">
                {phoneme.is_voiced ? 'vocal cords vibrate' : 'no vibration'}
              </p>
            </div>
          )}
        </div>

        {/* MIDDLE COLUMN: Frequency in English */}
        {frequencyData && (
          <div className="bg-green-50 rounded-lg px-3 py-3 border-2 border-oceanBlue/40 flex flex-col h-full">
            <h5 className="font-semibold text-oceanBlue text-sm drop-shadow-md">Frequency in English</h5>
            <p className="text-gray-700 mt-4">
              <span className="text-xl font-bold">{frequencyData.percent.toFixed(2)}%</span>
              <span className="text-sm ml-1">of phonemes</span>
            </p>
            <p className="mt-3">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                #{frequencyData.rank} most common
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-auto italic">
              Mines, Hanson & Shoup (1978)
            </p>
          </div>
        )}

        {/* RIGHT COLUMN: Spelling Chart */}
        <div className="bg-orange-50 rounded-lg px-3 py-3 border-2 border-oceanBlue/40 h-full">
          <h5 className="font-semibold text-oceanBlue mb-2 drop-shadow-md">
            Most Common Spelling - <span className="text-black">
              〈{graphemes[0]?.grapheme || 'N/A'}〉
            </span>
            {graphemes[0]?.percentage != null && graphemes[0].percentage > 0 && (
              <span className="ml-2 text-sm font-semibold text-emerald-600">
                ({typeof graphemes[0].percentage === 'number' ? graphemes[0].percentage.toFixed(1) : graphemes[0].percentage}%)
              </span>
            )}
            {graphemes[0]?.usage_label && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                graphemes[0].usage_label === 'Primary' ? 'bg-green-100 text-green-700' :
                graphemes[0].usage_label === 'Secondary' ? 'bg-blue-100 text-blue-700' :
                graphemes[0].usage_label === 'Rare' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {graphemes[0].usage_label}
              </span>
            )}
          </h5>

          {graphemes.length > 1 && (
            <div className="text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-oceanBlue text-sm">Alternative spellings</p>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="px-2 py-0.5 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                >
                  {showAlternatives ? 'Hide' : 'Show'}
                </button>
              </div>
              {showAlternatives && (
                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  {graphemes.slice(1).map((grapheme) => (
                    <div key={grapheme.id} className="flex items-center bg-white/80 rounded-lg px-3 py-1.5 border border-oceanBlue/20">
                      <span className="text-base font-bold text-deepNavy">〈{grapheme.grapheme}〉</span>
                      {grapheme.percentage != null && grapheme.percentage > 0 && (
                        <span className="ml-2 text-sm font-semibold text-blue-600">
                          {typeof grapheme.percentage === 'number' ? grapheme.percentage.toFixed(1) : grapheme.percentage}%
                        </span>
                      )}
                      {grapheme.usage_label && (
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          grapheme.usage_label === 'Primary' ? 'bg-green-100 text-green-700' :
                          grapheme.usage_label === 'Secondary' ? 'bg-blue-100 text-blue-700' :
                          grapheme.usage_label === 'Rare' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {grapheme.usage_label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>


      {/* Common Errors */}
      {articulation && articulation.common_errors.length > 0 && (
        <div className="bg-orange-50 rounded-lg border-2 border-oceanBlue/40 overflow-hidden">
          <button
            onClick={() => setShowReferralNotes(!showReferralNotes)}
            className="w-full px-6 pt-6 pb-4 text-left hover:bg-amber-100 transition-colors rounded-t-lg"
          >
            <h4 className="text-lg font-semibold text-oceanBlue flex items-center justify-between -ml-4 -mt-4">
              <span className="flex items-center">
                <span>⚠️</span>
                <span className="ml-2">Watch for Common Errors</span>
              </span>
              <span className={`transform transition-transform text-oceanBlue ml-2 ${showReferralNotes ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </h4>
          </button>
          {showReferralNotes && (
            <div className="px-6 pb-4 -mt-2 rounded-b-lg">
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <h5 className="font-semibold text-orange-800 mb-2">📋 Common Errors</h5>
                <ul className="text-gray-700 space-y-1">
                  {articulation.common_errors.map((error, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2 mt-0.5">•</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Reference to Let's Learn It Tab */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm text-gray-700 flex items-center">
          <span className="mr-2">📚</span>
          <span>For explanations, rules, and teaching tips, see the <strong className="text-oceanBlue">Let&apos;s Learn It</strong> tab.</span>
        </p>
      </div>



      {/* Research Sources */}
      {research_citations && research_citations.length > 0 && (
        <div className="bg-gray-50 rounded-lg border-2 border-oceanBlue/40 overflow-hidden">
          <button
            onClick={() => setShowSources(!showSources)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors rounded-t-lg"
          >
            <span className="text-sm font-medium text-deepNavy flex items-center">
              🔍 Research Sources & Citations
            </span>
            <span className={`transform transition-transform text-gray-500 ${showSources ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showSources && (
            <div className="px-4 pb-4 border-t border-gray-200 rounded-b-lg">
              <div className="bg-white rounded-lg p-3 border border-gray-200 mt-2">
                <h5 className="font-semibold text-gray-800 mb-2">📚 Research Citations</h5>
                <div className="space-y-2">
                  {research_citations.map((citation, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      <p className="font-medium">{citation.source_name}</p>
                      <p className="text-gray-600 text-xs mt-1">{citation.citation_text}</p>
                      {citation.url && (
                        <a href={citation.url} className="text-blue-600 text-xs hover:underline" target="_blank" rel="noopener noreferrer">
                          View Source
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
