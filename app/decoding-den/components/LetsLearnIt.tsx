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
    rules: false,
    tips: false,
    routine: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!phonemeData) return null;

  const { teaching_content } = phonemeData;

  return (
    <div className="space-y-6">

      {/* Explanations Section */}
      {teaching_content?.explanations && teaching_content.explanations.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
          <button
            onClick={() => toggleSection('explanation')}
            className="w-full p-6 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-deepNavy flex items-center">
              <Image
                src="/images/lets learn it.png"
                alt="Let's Learn It"
                width={40}
                height={40}
                className="mr-2"
              />
              Explanation
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.explanation ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.explanation && (
            <div className="px-6 pb-6 space-y-3">
              {teaching_content.explanations.map((item, index) => (
                <div key={index} className="flex items-start space-x-1 pl-12">
                  <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                  {renderAlignmentSpacer(item.content)}
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
            className="w-full p-6 flex items-center justify-between hover:bg-green-100/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-deepNavy flex items-center">
              <Image
                src="/images/lets learn it.png"
                alt="Let's Learn It"
                width={40}
                height={40}
                className="mr-2"
              />
              Rule/s
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.rules ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.rules && (
            <div className="px-6 pb-6 space-y-3">
              {teaching_content.rules.map((item, index) => (
                <div key={index} className="flex items-start space-x-1 pl-12">
                  <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                  {renderAlignmentSpacer(item.content)}
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
            className="w-full p-6 flex items-center justify-between hover:bg-yellow-100/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-deepNavy flex items-center">
              <Image
                src="/images/lets learn it.png"
                alt="Let's Learn It"
                width={40}
                height={40}
                className="mr-2"
              />
              Tips
            </h3>
            <span className={`transform transition-transform text-deepNavy ${expandedSections.tips ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.tips && (
            <div className="px-6 pb-6 space-y-3">
              {teaching_content.tips.map((item, index) => (
                <div key={index} className="flex items-start space-x-1 pl-12">
                  <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                  {renderAlignmentSpacer(item.content)}
                  <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
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


      {/* Explicit Phonics Teaching Routine */}
      <div className="bg-oceanBlue/10 rounded-lg border border-oceanBlue/30 overflow-hidden">
        <button
          onClick={() => toggleSection('routine')}
          className="w-full p-6 flex items-center justify-between hover:bg-oceanBlue/20 transition-colors"
        >
          <h4 className="text-lg font-semibold text-deepNavy flex items-center">
            🎯 Explicit Teaching Routine
          </h4>
          <span className={`transform transition-transform text-deepNavy ${expandedSections.routine ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.routine && (
          <div className="px-6 pb-6">
            <div className="space-y-3">
              <div className="bg-white rounded p-4 border border-oceanBlue/20">
                <p className="text-sm text-gray-700">
                  <strong className="text-oceanBlue">1. Model the Sound (I Do):</strong> Say the {phonemeData.phoneme.ipa_symbol} sound aloud. Show the mouth position and model the sound in CVC words. Students repeat after you.
                </p>
              </div>
              <div className="bg-white rounded p-4 border border-oceanBlue/20">
                <p className="text-sm text-gray-700">
                  <strong className="text-oceanBlue">2. Map Sound to Print (We Do):</strong> Write the letter 〈{phonemeData.graphemes[0]?.grapheme || 'a'}〉. Say the sound and have students match the sound to the letter. Stretch and blend CVC words together.
                </p>
              </div>
              <div className="bg-white rounded p-4 border border-oceanBlue/20">
                <p className="text-sm text-gray-700">
                  <strong className="text-oceanBlue">3. Practice & Check (You Do):</strong> Students read and spell {phonemeData.phoneme.ipa_symbol} words in isolation, then in simple decodable sentences. Monitor for errors and correct immediately.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/50 rounded border border-oceanBlue/10">
              <p className="text-xs text-gray-600 italic">
                <strong>Teacher Routine:</strong> Say the sound → show the letter → blend the word → read it → spell it → repeat.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}