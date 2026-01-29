import { useState } from 'react';
import Image from 'next/image';
import { renderContentWithBold, renderAlignmentSpacer } from '@/app/utils/phonemeFormatting';

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
  const [showArticulationNotes, setShowArticulationNotes] = useState(true);
  const [showReferralNotes, setShowReferralNotes] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showDevelopmentalInfo, setShowDevelopmentalInfo] = useState(false);
  const [showSpelling, setShowSpelling] = useState(false);
  
  if (!phonemeData) return null;

  const { phoneme, graphemes, articulation, teaching_content, research_citations } = phonemeData;
  

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
        <div className="bg-blue-100 rounded-lg px-4 py-2 border-2 border-blue-500">
          <h5 className="font-semibold text-oceanBlue mb-2 -mt-0.5 drop-shadow-md">Phoneme Type</h5>
          <p className="text-gray-700 capitalize">
            <strong>{getPhonemeLabel(phoneme)}</strong>
          </p>
        </div>
        
        <div className="bg-green-100 rounded-lg px-4 py-2 border-2 border-blue-500">
          <h5 className="font-semibold text-oceanBlue mb-2 drop-shadow-md">Frequency Rank</h5>
          <p className="text-gray-700">
            <span className="font-bold">#{phoneme.frequency_rank}</span> most common in English
            {phoneme.frequency_rank <= 10 && (
              <span className="text-green-600 ml-2 font-medium">(High frequency)</span>
            )}
          </p>
        </div>

        {phoneme.is_voiced !== null && (
          <div className="bg-purple-100 rounded-lg px-4 py-2 border-2 border-blue-500">
            <h5 className="font-semibold text-oceanBlue mb-2 drop-shadow-md">
              Voicing
            </h5>
            <p className="text-gray-700">
              <strong>{phoneme.is_voiced ? 'Voiced' : 'Unvoiced'}</strong>
              {phoneme.is_voiced ? ' (vocal cords vibrate)' : ' (no vocal cord vibration)'}
            </p>
          </div>
        )}

        <div className="bg-orange-100 rounded-lg px-4 py-2 border-2 border-blue-500">
          <h5 className="font-semibold text-oceanBlue mb-2 -mt-0.5 drop-shadow-md">
            Most Common Spelling - <span className="text-black">
              〈{graphemes[0]?.grapheme || 'N/A'}〉
            </span>
          </h5>
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
                    <div key={grapheme.id} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-deepNavy">〈{grapheme.grapheme}〉</span>
                        {grapheme.percentage && (
                          <span className="ml-3 text-sm font-semibold text-blue-600">
                            {grapheme.percentage}%
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
                      {(grapheme.context_notes || grapheme.notes) && (
                        <span className="text-sm text-gray-600 ml-2">
                          ({grapheme.context_notes || grapheme.notes})
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

      {/* Articulation Guidance */}
      {articulation && (
        <div className="bg-blue-100 rounded-lg border-2 border-blue-500 overflow-hidden">
          <button
            onClick={() => setShowArticulationNotes(!showArticulationNotes)}
            className="w-full p-6 pb-3 text-left hover:bg-blue-100 transition-colors rounded-t-lg"
          >
            <h4 className="text-lg font-semibold text-oceanBlue flex items-center justify-between -mt-2 -ml-4">
              <span className="flex items-center">
                <Image 
                  src="/images/articulation guidance.png" 
                  alt="Articulation Guidance" 
                  width={24} 
                  height={24} 
                  className="mr-2"
                />
                Articulation Guidance
              </span>
              <span className={`transform transition-transform text-oceanBlue ml-2 ${showArticulationNotes ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </h4>
          </button>
          {showArticulationNotes && (
            <div className="px-6 pb-2 -mt-3 rounded-b-lg">
              <div className="bg-white rounded-lg p-4 border border-blue-200 mt-2">
                <div className="flex gap-4">
                  {/* Articulation Features - different labels for vowels vs consonants */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 w-1/2">
                    {(articulation as any).is_vowel ? (
                      <>
                        <p className="text-gray-700 mt-2 text-justify">
                          <strong>Sound Type:</strong> vowel
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Airflow:</strong> {(articulation as any).lip_position || 'open (no blockage)'}
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Tongue Position:</strong> {articulation.place_of_articulation}
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Lip Shape:</strong> {(articulation as any).lip_shape || (articulation as any).tongue_position}
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Voicing:</strong> {articulation.voicing}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 mt-2 text-justify">
                          <strong>Place:</strong> {articulation.place_of_articulation}
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Manner:</strong> {articulation.manner_of_articulation}
                        </p>
                        <p className="text-gray-700 mt-3 text-justify">
                          <strong>Voicing:</strong> {articulation.voicing}
                        </p>
                        {articulation.airflow_description && (
                          <p className="text-gray-600 text-sm italic mt-2">
                            {articulation.airflow_description}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Teaching Tips */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 w-1/2">
                    <h5 className="font-semibold text-black mb-2">💡 Teaching Tips</h5>
                    {articulation.teacher_tips.length > 0 ? (
                      <ul className="text-gray-700 space-y-1">
                        {articulation.teacher_tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 italic">No specific tips available</p>
                    )}
                    
                    {articulation.step_by_step_instructions.length > 0 && (
                      <div className="mt-3">
                        <h6 className="font-medium text-gray-800 mb-1">Instructions:</h6>
                        <ul className="text-gray-700 space-y-1">
                          {articulation.step_by_step_instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2 mt-0.5">•</span>
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Common Errors */}
      {articulation && articulation.common_errors.length > 0 && (
        <div className="bg-orange-100 rounded-lg border-2 border-blue-500 overflow-hidden">
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


      {/* Teaching Content */}
      {teaching_content && (teaching_content.explanations.length > 0 || teaching_content.rules.length > 0 || teaching_content.tips.length > 0) && (
        <div className="bg-purple-100 rounded-lg border-2 border-blue-500 overflow-hidden">
          <button
            onClick={() => setShowDevelopmentalInfo(!showDevelopmentalInfo)}
            className="w-full p-6 pb-3 text-left hover:bg-purple-100 transition-colors rounded-t-lg"
          >
            <h4 className="text-lg font-semibold text-oceanBlue flex items-center justify-between -mt-2 -ml-4">
              <span className="flex items-center">
                <span>📚</span>
                <span className="ml-2">Teaching Content</span>
              </span>
              <span className={`transform transition-transform text-oceanBlue ml-2 ${showDevelopmentalInfo ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </h4>
          </button>
          {showDevelopmentalInfo && (
            <div className="px-6 pb-3 -mt-3 rounded-b-lg">
              <div className="space-y-4 mt-2">
                {/* Explanations */}
                {teaching_content.explanations.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">💙 Explanations</h5>
                    <div className="space-y-2">
                      {teaching_content.explanations.map((item, index) => (
                        <div key={index} className="flex items-start space-x-1">
                          <span className="text-xl flex-shrink-0">➜</span>
                          {renderAlignmentSpacer(item.content)}
                          <p className="text-gray-700">{renderContentWithBold(item.content)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules */}
                {teaching_content.rules.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">💚 Rules</h5>
                    <div className="space-y-2">
                      {teaching_content.rules.map((item, index) => (
                        <div key={index} className="flex items-start space-x-1">
                          <span className="text-xl flex-shrink-0">➜</span>
                          {renderAlignmentSpacer(item.content)}
                          <p className="text-gray-700">{renderContentWithBold(item.content)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                {teaching_content.tips.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 className="font-semibold text-yellow-800 mb-2">💛 Tips</h5>
                    <div className="space-y-2">
                      {teaching_content.tips.map((item, index) => (
                        <div key={index} className="flex items-start space-x-1">
                          <span className="text-xl flex-shrink-0">➜</span>
                          {renderAlignmentSpacer(item.content)}
                          <p className="text-gray-700">{renderContentWithBold(item.content)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Spelling Information */}
      {graphemes.length > 0 && (
        <div className="bg-yellow-100 rounded-lg border-2 border-blue-500 overflow-hidden">
          <button
            onClick={() => setShowSpelling(!showSpelling)}
            className="w-full px-6 pt-6 pb-4 text-left hover:bg-yellow-100 transition-colors rounded-t-lg"
          >
            <h4 className="text-lg font-semibold text-oceanBlue flex items-center justify-between -ml-4 -mt-4">
              <span className="flex items-center">
                <span>📝</span>
                <span className="ml-2">Spelling Patterns</span>
              </span>
              <span className={`transform transition-transform text-oceanBlue ml-2 ${showSpelling ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </h4>
          </button>
          {showSpelling && (
            <div className="px-6 pb-4 -mt-2 rounded-b-lg">
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-3">✅ Grapheme Options for {phoneme.ipa_symbol}</h5>
                    <div className="space-y-2">
                      {graphemes.map((grapheme, index) => (
                        <div key={grapheme.id} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5 font-bold">{index + 1}.</span>
                          <div>
                            <p className="text-gray-700">
                              <strong>〈{grapheme.grapheme}〉</strong> 
                              {index === 0 && <span className="text-green-700 ml-2">(Most common)</span>}
                            </p>
                            {grapheme.notes && (
                              <p className="text-sm text-gray-600 ml-4">{grapheme.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">🎯 Key Pattern</h5>
                    <p className="text-gray-700">
                      The most reliable spelling for {phoneme.ipa_symbol} is <strong className="text-green-700">〈{graphemes[0]?.grapheme}〉</strong>.
                      {graphemes.length > 1 && ` This phoneme can also be spelled ${graphemes.length - 1} other way${graphemes.length > 2 ? 's' : ''}.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Research Sources */}
      {research_citations && research_citations.length > 0 && (
        <div className="bg-gray-100 rounded-lg border-2 border-blue-500 overflow-hidden">
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