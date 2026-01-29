'use client';

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

interface LetsLearnItProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

export default function LetsLearnIt({ phonemeData }: LetsLearnItProps) {
  const [expandedSections, setExpandedSections] = useState({
    explanation: true,
    rules: true,
    tips: true,
    articulation: true,
    wordList: true,
    practiceText: true,
    wordLadder: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!phonemeData) return null;

  const { phoneme, graphemes, articulation, teaching_content, word_lists, practice_texts } = phonemeData;

  // Get the primary grapheme's word list
  const primaryGrapheme = graphemes[0]?.grapheme;
  const primaryWordList = primaryGrapheme ? word_lists[primaryGrapheme] : null;

  // Get place description based on phoneme type
  const getPlaceDescription = () => {
    if ((articulation as any)?.is_vowel) {
      // Format vowel place more user-friendly
      const place = articulation?.place_of_articulation || '';
      if (place.toLowerCase().includes('front')) {
        return 'Front of the mouth';
      } else if (place.toLowerCase().includes('back')) {
        return 'Back of the mouth';
      } else if (place.toLowerCase().includes('central')) {
        return 'Center of the mouth';
      }
      return place || 'varies';
    }
    return articulation?.place_of_articulation || 'varies';
  };

  // Get manner description based on phoneme type
  const getMannerDescription = () => {
    if ((articulation as any)?.is_vowel) {
      return 'Vowel sound — open and unobstructed';
    }
    return articulation?.manner_of_articulation || 'varies';
  };

  // Get voicing description
  const getVoicingDescription = () => {
    const voicing = articulation?.voicing || 'varies';
    if (voicing.toLowerCase() === 'voiced') {
      return 'Voiced — vocal cords vibrate';
    } else if (voicing.toLowerCase() === 'voiceless' || voicing.toLowerCase() === 'unvoiced') {
      return 'Voiceless — no vocal cord vibration';
    }
    return voicing;
  };

  return (
    <div className="space-y-6">

      {/* Explanation Section */}
      {teaching_content?.explanations && teaching_content.explanations.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('explanation')}
            className="w-full p-5 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              🧠 Explanation
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.explanation ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.explanation && (
            <div className="px-6 pb-5 space-y-2">
              {teaching_content.explanations.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-0.5">💙</span>
                  <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rules Section */}
      {teaching_content?.rules && teaching_content.rules.length > 0 && (
        <div className="bg-green-50 rounded-lg border border-green-200 overflow-hidden">
          <button
            onClick={() => toggleSection('rules')}
            className="w-full p-5 flex items-center justify-between hover:bg-green-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              🧠 Rule/s
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.rules ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.rules && (
            <div className="px-6 pb-5 space-y-2">
              {teaching_content.rules.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-0.5">💚</span>
                  <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {teaching_content?.tips && teaching_content.tips.length > 0 && (
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 overflow-hidden">
          <button
            onClick={() => toggleSection('tips')}
            className="w-full p-5 flex items-center justify-between hover:bg-yellow-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              🧠 Tips
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.tips ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.tips && (
            <div className="px-6 pb-5 space-y-2">
              {teaching_content.tips.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-0.5">💛</span>
                  <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state for teaching content */}
      {(!teaching_content?.explanations?.length &&
        !teaching_content?.rules?.length &&
        !teaching_content?.tips?.length) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">
            Teaching content for this phoneme is being developed.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check back soon for explanations, rules, and tips!
          </p>
        </div>
      )}

      {/* Articulation Guidance Section */}
      {articulation && (
        <div className="bg-pink-50 rounded-lg border border-pink-200 overflow-hidden">
          <button
            onClick={() => toggleSection('articulation')}
            className="w-full p-5 flex items-center justify-between hover:bg-pink-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              👄 Articulation Guidance
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.articulation ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.articulation && (
            <div className="px-6 pb-5 space-y-2">
              {/* Step-by-step instructions */}
              {articulation.step_by_step_instructions && articulation.step_by_step_instructions.length > 0 && (
                <>
                  {articulation.step_by_step_instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-3">👄</span>
                      <span className="text-gray-700">Step {index + 1}: {instruction}</span>
                    </div>
                  ))}
                </>
              )}

              {/* Place/Manner/Voicing - indented under steps */}
              <div className="pl-8 space-y-1 text-gray-700">
                <p>• <strong>Place:</strong> {getPlaceDescription()}</p>
                <p>• <strong>Manner:</strong> {getMannerDescription()}</p>
                <p>• <strong>Voicing:</strong> {getVoicingDescription()}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Word List Practice Section */}
      {primaryWordList && (primaryWordList.beginning.length > 0 || primaryWordList.medial.length > 0 || primaryWordList.ending.length > 0) && (
        <div className="bg-purple-50 rounded-lg border border-purple-200 overflow-hidden">
          <button
            onClick={() => toggleSection('wordList')}
            className="w-full p-5 flex items-center justify-between hover:bg-purple-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              📚 Word List Practice
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.wordList ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.wordList && (
            <div className="px-6 pb-5">
              <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="px-4 py-2 text-left text-purple-800 font-semibold">Beginning</th>
                      <th className="px-4 py-2 text-left text-purple-800 font-semibold">Medial</th>
                      <th className="px-4 py-2 text-left text-purple-800 font-semibold">Ending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.max(
                      primaryWordList.beginning.length,
                      primaryWordList.medial.length,
                      primaryWordList.ending.length,
                      1
                    ) }).map((_, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}>
                        <td className="px-4 py-2 text-gray-700">
                          {primaryWordList.beginning[index] || ''}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {primaryWordList.medial[index] || ''}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {primaryWordList.ending[index] || ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Practice Text Section */}
      {practice_texts && (practice_texts.sentences.length > 0 || practice_texts.stories.length > 0) && (
        <div className="bg-orange-50 rounded-lg border border-orange-200 overflow-hidden">
          <button
            onClick={() => toggleSection('practiceText')}
            className="w-full p-5 flex items-center justify-between hover:bg-orange-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              📖 Practice Text
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.practiceText ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.practiceText && (
            <div className="px-6 pb-5 space-y-4">
              {/* Decodable Sentences */}
              {practice_texts.sentences.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Decodable Sentences:</h4>
                  <div className="bg-white rounded-lg p-4 border border-orange-100 space-y-2">
                    {practice_texts.sentences.map((sentence, index) => (
                      <p key={index} className="text-gray-700">{sentence}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Stories */}
              {practice_texts.stories.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Short Story:</h4>
                  <div className="bg-white rounded-lg p-4 border border-orange-100 space-y-3">
                    {practice_texts.stories.map((story: any, index) => (
                      <div key={index}>
                        {typeof story === 'object' && story.title && (
                          <p className="font-semibold text-gray-800 mb-2">&ldquo;{story.title}&rdquo;</p>
                        )}
                        <p className="text-gray-700 whitespace-pre-line">
                          {typeof story === 'string' ? story : story.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Word Ladder Section */}
      {practice_texts?.word_ladders && practice_texts.word_ladders.length > 0 && (
        <div className="bg-teal-50 rounded-lg border border-teal-200 overflow-hidden">
          <button
            onClick={() => toggleSection('wordLadder')}
            className="w-full p-5 flex items-center justify-between hover:bg-teal-100/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-deepNavy flex items-center">
              🔤 Word Ladder
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.wordLadder ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.wordLadder && (
            <div className="px-6 pb-5">
              <div className="bg-white rounded-lg p-4 border border-teal-100">
                <div className="space-y-1">
                  {practice_texts.word_ladders.map((item, index) => (
                    <p key={index} className="text-gray-700">
                      {index === 0 ? (
                        <span className="font-semibold">{item}</span>
                      ) : (
                        <span>➡ {item}</span>
                      )}
                    </p>
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
