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

/**
 * Teacher-friendly explanations for technical phonetic terms
 */
function getPlaceExplanation(place: string): string {
  const explanations: Record<string, string> = {
    'bilabial': 'Both lips together',
    'labiodental': 'Bottom lip touches top teeth',
    'dental': 'Tongue touches teeth',
    'interdental': 'Tongue between teeth',
    'alveolar': 'Tongue touches ridge behind teeth',
    'palato-alveolar': 'Tongue behind the ridge, toward roof',
    'post-alveolar': 'Tongue behind the ridge, toward roof',
    'palatal': 'Tongue touches hard palate (roof)',
    'velar': 'Back of tongue touches soft palate',
    'glottal': 'Sound made in throat',
  };
  const key = place.toLowerCase().trim();
  return explanations[key] || place;
}

function getMannerExplanation(manner: string): string {
  const explanations: Record<string, string> = {
    'stop': 'Air completely blocked, then released',
    'plosive': 'Air completely blocked, then released',
    'fricative': 'Air squeezed through narrow gap',
    'affricate': 'Starts blocked, ends with friction',
    'nasal': 'Air flows through nose',
    'liquid': 'Air flows around tongue',
    'lateral': 'Air flows around sides of tongue',
    'approximant': 'Tongue close but not touching',
    'glide': 'Quick movement, almost like a vowel',
    'tap': 'Quick tap of tongue',
    'flap': 'Quick tap of tongue',
    'trill': 'Tongue vibrates rapidly',
  };
  const key = manner.toLowerCase().trim();
  return explanations[key] || manner;
}

function getVoicingExplanation(voicing: string): string {
  const explanations: Record<string, string> = {
    'voiced': 'Vocal cords vibrate',
    'voiceless': 'No vocal cord vibration',
    'unvoiced': 'No vocal cord vibration',
  };
  const key = voicing.toLowerCase().trim();
  return explanations[key] || voicing;
}

function getAirflowExplanation(airflow: string): string {
  const explanations: Record<string, string> = {
    'oral': 'Air exits through mouth',
    'nasal': 'Air exits through nose',
    'pulmonic': 'Air from lungs',
  };
  const key = airflow.toLowerCase().trim();
  return explanations[key] || airflow;
}

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
  const [showTeachingTips, setShowTeachingTips] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAllSpellingsModal, setShowAllSpellingsModal] = useState(false);

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

      {/* 3-Column Grid: Left = Type+Voicing stacked, Middle = Frequency, Right = Spelling */}
      <div className="grid md:grid-cols-3 gap-3 items-stretch min-h-[220px]">

        {/* LEFT COLUMN: Phoneme Type + Voicing (stacked, equal height to other columns) */}
        <div className="flex flex-col gap-2">
          {/* Phoneme Type */}
          <div className="bg-blue-50 rounded-lg px-3 py-2 border-2 border-oceanBlue/40 flex-1 flex flex-col">
            <h5 className="font-semibold text-lg">
              <span className="text-black font-bold">{phoneme.ipa_symbol}</span>
              <span className="text-oceanBlue font-bold ml-2">Phoneme Type</span>
            </h5>
            <p className="text-gray-700 capitalize font-bold mt-1">{getPhonemeLabel(phoneme)}</p>
          </div>

          {/* Voicing */}
          {phoneme.is_voiced !== null && (
            <div className="bg-purple-50 rounded-lg px-3 py-2 border-2 border-oceanBlue/40 flex-1 flex flex-col">
              <h5 className="font-semibold text-lg">
                <span className="text-black font-bold">{phoneme.ipa_symbol}</span>
                <span className="text-oceanBlue font-bold ml-2">Voicing</span>
              </h5>
              <p className="text-gray-700 mt-1">
                <strong>{phoneme.is_voiced ? 'Voiced' : 'Unvoiced'}</strong>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 ml-2">
                  {phoneme.is_voiced ? 'Vocal Cords Vibrate' : 'No Vibration'}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* MIDDLE COLUMN: Frequency in English */}
        {frequencyData && (
          <div className="bg-green-50 rounded-lg px-3 py-2 border-2 border-oceanBlue/40 flex flex-col h-full">
            <h5 className="font-semibold text-lg">
              <span className="text-black font-bold">{phoneme.ipa_symbol}</span>
              <span className="text-oceanBlue font-bold ml-2">How Common Is This Sound?</span>
            </h5>
            <p className="text-gray-700 mt-1 flex items-center">
              <span className="text-xl font-bold w-16">{frequencyData.percent.toFixed(2)}%</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Of All Sounds In English</span>
            </p>
            <p className="text-gray-700 mt-1 flex items-center">
              <span className="text-xl font-bold text-black w-16">#{frequencyData.rank}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Most Common Sound</span>
            </p>
            <p className="text-xs text-gray-500 mt-auto italic">
              Mines, Hanson & Shoup (1978)
            </p>
          </div>
        )}

        {/* RIGHT COLUMN: Spelling Chart */}
        <div className="bg-orange-50 rounded-lg px-3 py-3 border-2 border-oceanBlue/40 h-full">
          <h5 className="font-bold text-oceanBlue text-lg mb-2">
            Most Common Spelling - <span className="text-black font-bold">
              〈{graphemes[0]?.grapheme || 'N/A'}〉
            </span>
            {graphemes[0]?.percentage != null && (
              <span className="ml-2 text-sm font-semibold text-emerald-600">
                ({graphemes[0].percentage < 0.05 ? '<0.05%' : `${graphemes[0].percentage.toFixed(1)}%`})
              </span>
            )}
          </h5>

          {graphemes.length > 1 && (
            <div className="text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-oceanBlue text-base">Alternative spellings</p>
                <span className="text-xs text-gray-500">({graphemes.length - 1} total)</span>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="px-2 py-0.5 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                >
                  {showAlternatives ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => setShowAllSpellingsModal(true)}
                  className="px-2 py-0.5 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                >
                  Show All
                </button>
              </div>
              {showAlternatives && (
                <div className="space-y-1.5 max-h-[46px] overflow-y-auto">
                  {graphemes.slice(1).map((grapheme) => (
                    <div key={grapheme.id} className="flex items-center bg-white/80 rounded-lg px-3 py-1.5 border border-oceanBlue/20">
                      <div className="w-32 flex items-center">
                        <span className="text-base font-bold text-deepNavy">〈{grapheme.grapheme}〉</span>
                        {grapheme.percentage != null && (
                          <span className="ml-2 text-sm font-semibold text-blue-600">
                            {grapheme.percentage < 0.05 ? '<0.05%' : `${grapheme.percentage.toFixed(1)}%`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Articulation Details - Collapsible Sections */}
      {articulation && (
        <div className="space-y-2">

          {/* Articulation Features - Always Visible */}
          <div className="bg-blue-50 rounded-lg border border-oceanBlue/30 overflow-hidden">
            <div className="px-4 py-3">
              <span className="text-sm font-semibold text-oceanBlue flex items-center mb-2">
                <span className="mr-2">🎯</span>
                Articulation Features
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-white rounded-lg px-3 py-2 border border-oceanBlue/20">
                  <p className="text-xs text-gray-500 uppercase">Place <span className="normal-case">- Where in mouth</span></p>
                  <p className="font-bold text-base text-gray-800">{articulation.place_of_articulation}</p>
                  <p className="text-xs text-gray-500 italic mt-1">{getPlaceExplanation(articulation.place_of_articulation)}</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-oceanBlue/20">
                  <p className="text-xs text-gray-500 uppercase">Manner <span className="normal-case">- How air releases</span></p>
                  <p className="font-bold text-base text-gray-800">{articulation.manner_of_articulation}</p>
                  <p className="text-xs text-gray-500 italic mt-1">{getMannerExplanation(articulation.manner_of_articulation)}</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-oceanBlue/20">
                  <p className="text-xs text-gray-500 uppercase">Voicing <span className="normal-case">- Vocal cord vibration</span></p>
                  <p className="font-bold text-base text-gray-800">{articulation.voicing}</p>
                  <p className="text-xs text-gray-500 italic mt-1">{getVoicingExplanation(articulation.voicing)}</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-oceanBlue/20">
                  <p className="text-xs text-gray-500 uppercase">Airflow <span className="normal-case">- Mouth or nose</span></p>
                  <p className="font-bold text-base text-gray-800">{articulation.airflow_description || 'oral'}</p>
                  <p className="text-xs text-gray-500 italic mt-1">{getAirflowExplanation(articulation.airflow_description || 'oral')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Tips - Compact Collapsible */}
          {articulation.teacher_tips && articulation.teacher_tips.length > 0 && (
            <div className="bg-yellow-50 rounded-lg border border-yellow-300/50 overflow-hidden">
              <button
                onClick={() => setShowTeachingTips(!showTeachingTips)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-yellow-100 transition-colors"
              >
                <span className="text-sm font-semibold text-yellow-700 flex items-center">
                  <span className="mr-2">💡</span>
                  Teaching Tips
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({articulation.teacher_tips.length} tip{articulation.teacher_tips.length > 1 ? 's' : ''})
                  </span>
                </span>
                <span className={`transform transition-transform text-yellow-600 ${showTeachingTips ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {showTeachingTips && (
                <div className="px-4 pb-3">
                  <ul className="space-y-1">
                    {articulation.teacher_tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start bg-white rounded px-3 py-2 border border-yellow-200">
                        <span className="text-yellow-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Instructions - Compact Collapsible */}
          {articulation.step_by_step_instructions && articulation.step_by_step_instructions.length > 0 && (
            <div className="bg-green-50 rounded-lg border border-green-300/50 overflow-hidden">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-green-100 transition-colors"
              >
                <span className="text-sm font-semibold text-green-700 flex items-center">
                  <span className="mr-2">📋</span>
                  Step-by-Step Instructions
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({articulation.step_by_step_instructions.length} step{articulation.step_by_step_instructions.length > 1 ? 's' : ''})
                  </span>
                </span>
                <span className={`transform transition-transform text-green-600 ${showInstructions ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {showInstructions && (
                <div className="px-4 pb-3">
                  <ol className="space-y-1">
                    {articulation.step_by_step_instructions.map((step, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start bg-white rounded px-3 py-2 border border-green-200">
                        <span className="text-green-600 font-bold mr-2 min-w-[20px]">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

        </div>
      )}

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

      {/* All Spellings Modal */}
      {showAllSpellingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAllSpellingsModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-oceanBlue to-darkOcean p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  All Spellings for {phoneme.ipa_symbol}
                </h3>
                <button
                  onClick={() => setShowAllSpellingsModal(false)}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className={`grid gap-2 ${graphemes.length > 6 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {graphemes.map((grapheme, index) => (
                  <div key={grapheme.id} className={`grid grid-cols-[80px_70px_1fr] items-center rounded-lg px-4 py-2 border ${index === 0 ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'}`}>
                    <span className="text-lg font-bold text-deepNavy">〈{grapheme.grapheme}〉</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {grapheme.percentage != null ? (grapheme.percentage < 0.05 ? '<0.05%' : `${grapheme.percentage.toFixed(1)}%`) : '—'}
                    </span>
                    <div className="flex items-center justify-end">
                      {index === 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          #1
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAllSpellingsModal(false)}
                className="w-full py-2 bg-oceanBlue text-white rounded-lg hover:bg-darkOcean transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
