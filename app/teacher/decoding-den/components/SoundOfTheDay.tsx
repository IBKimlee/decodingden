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

export default function SoundOfTheDay({ phonemeData }: SoundOfTheDayProps) {
  const [showAlternatives, setShowAlternatives] = useState(true);
  const [showSources, setShowSources] = useState(false);
  const [showReferralNotes, setShowReferralNotes] = useState(true);
  
  if (!phonemeData) return null;

  const { phoneme, graphemes, articulation, research_citations } = phonemeData;
  

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

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg px-4 py-2 border-2 border-oceanBlue/40">
          <h5 className="font-semibold text-oceanBlue mb-2 -mt-0.5 drop-shadow-md">Phoneme Type</h5>
          <p className="text-gray-700 capitalize">
            <strong>{getPhonemeLabel(phoneme)}</strong>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg px-4 py-2 border-2 border-oceanBlue/40">
          <h5 className="font-semibold text-oceanBlue mb-2 drop-shadow-md">How Common Is This Sound?</h5>
          <p className="text-gray-700">
            {phoneme.frequency_rank > 0 ? (
              <>
                <span className="font-bold">#{phoneme.frequency_rank}</span> most common sound in English
                {phoneme.frequency_rank <= 5 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Essential</span>
                )}
                {phoneme.frequency_rank > 5 && phoneme.frequency_rank <= 10 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">High frequency</span>
                )}
                {phoneme.frequency_rank > 10 && phoneme.frequency_rank <= 20 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Common</span>
                )}
                {phoneme.frequency_rank > 20 && phoneme.frequency_rank <= 30 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Moderately common</span>
                )}
                {phoneme.frequency_rank > 30 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Less common</span>
                )}
                <p className="text-xs text-gray-500 mt-1 italic">
                  {phoneme.frequency_rank <= 10
                    ? 'This sound appears very frequently in text - prioritize for early instruction.'
                    : phoneme.frequency_rank <= 20
                      ? 'This is a commonly encountered sound in reading materials.'
                      : 'This sound is less frequent but still important for reading fluency.'}
                </p>
              </>
            ) : (
              <span className="text-gray-500 italic">Frequency data not available</span>
            )}
          </p>
        </div>

        {phoneme.is_voiced !== null && (
          <div className="bg-purple-50 rounded-lg px-4 py-2 border-2 border-oceanBlue/40">
            <h5 className="font-semibold text-oceanBlue mb-2 drop-shadow-md">
              Voicing
            </h5>
            <p className="text-gray-700">
              <strong>{phoneme.is_voiced ? 'Voiced' : 'Unvoiced'}</strong>
              {phoneme.is_voiced ? ' (vocal cords vibrate)' : ' (no vocal cord vibration)'}
            </p>
          </div>
        )}

        <div className="bg-orange-50 rounded-lg px-4 py-2 border-2 border-oceanBlue/40">
          <h5 className="font-semibold text-oceanBlue mb-2 -mt-0.5 drop-shadow-md">
            Most Common Spelling - <span className="text-black">
              〈{graphemes[0]?.grapheme || 'N/A'}〉
            </span>
            {graphemes[0]?.percentage != null && graphemes[0].percentage > 0 && (
              <span className="ml-2 text-sm font-semibold text-emerald-600">
                ({typeof graphemes[0].percentage === 'number' ? graphemes[0].percentage.toFixed(1) : graphemes[0].percentage}% of usage)
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
          {(graphemes[0]?.context_notes || graphemes[0]?.notes) && (
            <p className="text-sm text-gray-600 mb-2">
              {graphemes[0].context_notes || graphemes[0].notes}
            </p>
          )}
          {graphemes.length > 1 && (
            <div className="text-gray-700">
              <div className="flex items-center gap-2 mb-1 -mt-0.5">
                <p className="font-semibold text-oceanBlue">Alternative spellings</p>
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="px-2 py-0.5 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                >
                  {showAlternatives ? 'Hide' : 'Show'}
                </button>
              </div>
              {showAlternatives && (
                <div className="space-y-2">
                  {graphemes.slice(1).map((grapheme) => (
                    <div key={grapheme.id} className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 border border-oceanBlue/20">
                      <div className="flex items-center flex-wrap gap-1">
                        <span className="text-lg font-bold text-deepNavy">〈{grapheme.grapheme}〉</span>
                        {grapheme.percentage != null && grapheme.percentage > 0 && (
                          <span className="ml-2 text-sm font-semibold text-blue-600">
                            {typeof grapheme.percentage === 'number' ? grapheme.percentage.toFixed(1) : grapheme.percentage}%
                          </span>
                        )}
                        {grapheme.usage_label && (
                          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            grapheme.usage_label === 'Primary' ? 'bg-green-100 text-green-700' :
                            grapheme.usage_label === 'Secondary' ? 'bg-blue-100 text-blue-700' :
                            grapheme.usage_label === 'Rare' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {grapheme.usage_label}
                          </span>
                        )}
                      </div>
                      {(grapheme.context_notes || grapheme.notes) && (
                        <span className="text-xs text-gray-500 ml-2 italic">
                          {grapheme.context_notes || grapheme.notes}
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