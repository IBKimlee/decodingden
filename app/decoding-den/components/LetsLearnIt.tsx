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
  if (!phonemeData) return null;

  const { teaching_content } = phonemeData;

  return (
    <div className="space-y-6">

      {/* Explanations Section */}
      {teaching_content?.explanations && teaching_content.explanations.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            <Image 
              src="/images/lets learn it.png" 
              alt="Let's Learn It" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            Explanation
          </h3>
          <div className="space-y-3">
            {teaching_content.explanations.map((item, index) => (
              <div key={index} className="flex items-start space-x-1 pl-12">
                <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                {renderAlignmentSpacer(item.content)}
                <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Section */}
      {teaching_content?.rules && teaching_content.rules.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            <Image 
              src="/images/lets learn it.png" 
              alt="Let's Learn It" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            Rule/s
          </h3>
          <div className="space-y-3">
            {teaching_content.rules.map((item, index) => (
              <div key={index} className="flex items-start space-x-1 pl-12">
                <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                {renderAlignmentSpacer(item.content)}
                <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      {teaching_content?.tips && teaching_content.tips.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            <Image 
              src="/images/lets learn it.png" 
              alt="Let's Learn It" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            Tips
          </h3>
          <div className="space-y-3">
            {teaching_content.tips.map((item, index) => (
              <div key={index} className="flex items-start space-x-1 pl-12">
                <span className="text-xl flex-shrink-0 font-black text-gray-900 -mt-0.5" style={{fontWeight: '900', textShadow: '1px 1px 1px rgba(0,0,0,0.3)'}}>➜</span>
                {renderAlignmentSpacer(item.content)}
                <p className="text-gray-700 leading-relaxed">{renderContentWithBold(item.content)}</p>
              </div>
            ))}
          </div>
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


      {/* Interactive Elements */}
      <div className="bg-oceanBlue/10 rounded-lg p-6 border border-oceanBlue/30">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🎯 Quick Teaching Strategy</h4>
        <div className="space-y-3">
          <div className="bg-white rounded p-3 border border-oceanBlue/20">
            <p className="text-sm text-gray-700">
              <strong>1. Start with Explanation:</strong> Help students understand what this sound is and how it works.
            </p>
          </div>
          <div className="bg-white rounded p-3 border border-oceanBlue/20">
            <p className="text-sm text-gray-700">
              <strong>2. Teach the Rules:</strong> Give them clear patterns to follow and remember.
            </p>
          </div>
          <div className="bg-white rounded p-3 border border-oceanBlue/20">
            <p className="text-sm text-gray-700">
              <strong>3. Apply the Tips:</strong> Use practical strategies to help them master and remember the sound.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}