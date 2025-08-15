import { useState, useEffect } from 'react';
import Image from 'next/image';

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

interface WordListPracticeProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

export default function WordListPractice({ phonemeData }: WordListPracticeProps) {
  const [showBeginning, setShowBeginning] = useState(true);
  const [showMedial, setShowMedial] = useState(true);
  const [showEnding, setShowEnding] = useState(true);
  const [selectedMascot, setSelectedMascot] = useState('placeholder1');

  // Load selected mascot from localStorage
  useEffect(() => {
    const savedMascot = localStorage.getItem('selectedMascot');
    if (savedMascot) {
      setSelectedMascot(savedMascot);
    }
  }, []);

  // Function to render the selected mascot
  const renderMascot = () => {
    switch (selectedMascot) {
      case 'forest':
        return (
          <Image 
            src="/images/dhole.png" 
            alt="Dhole" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'squirrel':
        return (
          <Image 
            src="/images/raccoon.png" 
            alt="Raccoon" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'mountain':
        return (
          <Image 
            src="/images/armadillo.png" 
            alt="Armadillo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'mixed':
        return (
          <Image 
            src="/images/wombat.png" 
            alt="Wombat" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'placeholder1':
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'placeholder2':
        return (
          <Image 
            src="/images/meerkat.png" 
            alt="Meerkat" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      case 'placeholder3':
        return (
          <Image 
            src="/images/hedgehog.png" 
            alt="Hedgehog" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
      default:
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
        );
    }
  };
  
  
  if (!phonemeData) return null;

  const { word_lists, phoneme } = phonemeData;

  // If no word lists, show empty state
  if (!word_lists || Object.keys(word_lists).length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        {renderMascot()}
        <p className="text-gray-600">
          Word lists for this phoneme are being developed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Word Lists by Grapheme */}
      {Object.entries(word_lists).map(([grapheme, positions]: [string, any]) => (
        <div key={grapheme} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-oceanBlue to-lightOcean p-4">
            <h3 className="text-xl font-semibold text-white">
              Spelling: <strong>〈{grapheme}〉</strong>
            </h3>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-deepNavy bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center justify-between">
                        <strong>Beginning</strong>
                        <button
                          onClick={() => setShowBeginning(!showBeginning)}
                          className="ml-2 px-2 py-1 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                        >
                          {showBeginning ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-deepNavy bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center justify-between">
                        <strong>Medial</strong>
                        <button
                          onClick={() => setShowMedial(!showMedial)}
                          className="ml-2 px-2 py-1 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                        >
                          {showMedial ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-deepNavy bg-gray-50">
                      <div className="flex items-center justify-between">
                        <strong>Ending</strong>
                        <button
                          onClick={() => setShowEnding(!showEnding)}
                          className="ml-2 px-2 py-1 text-xs bg-oceanBlue text-white rounded hover:bg-darkOcean transition-colors"
                        >
                          {showEnding ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Get the maximum length to determine number of rows */}
                  {Array.from({ 
                    length: Math.max(
                      positions.beginning?.length || 0,
                      positions.medial?.length || 0,
                      positions.ending?.length || 0
                    ) 
                  }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-4 border-r border-gray-200">
                        <strong className="text-deepNavy">
                          {showBeginning ? (positions.beginning?.[index] || '') : ''}
                        </strong>
                      </td>
                      <td className="py-2 px-4 border-r border-gray-200">
                        <strong className="text-deepNavy">
                          {showMedial ? (positions.medial?.[index] || '') : ''}
                        </strong>
                      </td>
                      <td className="py-2 px-4">
                        <strong className="text-deepNavy">
                          {showEnding ? (positions.ending?.[index] || '') : ''}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      ))}

      {/* Teaching Notes */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">📝 Teaching Notes</h4>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>✅ Decodable Words:</strong> All words are systematically chosen to support phonics instruction for {phoneme.ipa_symbol}.
          </p>
          <p>
            <strong>📊 Position Practice:</strong> Start with beginning position (easiest), then ending, then medial (most challenging).
          </p>
          <p>
            <strong>🎯 Systematic Approach:</strong> Practice words in isolation before using in sentences or connected text.
          </p>
          {Object.keys(word_lists).length > 1 && (
            <p>
              <strong>📚 Multiple Spellings:</strong> The phoneme {phoneme.ipa_symbol} has {Object.keys(word_lists).length} different spelling patterns. 
              Teach the most common spelling first (〈{Object.keys(word_lists)[0]}〉).
            </p>
          )}
        </div>
      </div>

      {/* Activity Suggestions */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🎯 Activity Suggestions</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🗂️ Word Sorts</h5>
            <p className="text-sm text-gray-700">Sort words by spelling pattern or position of the target sound.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🎭 Word Games</h5>
            <p className="text-sm text-gray-700">Play &quot;I Spy&quot; or &quot;Word Hunt&quot; focusing on the target sound.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">✍️ Dictation</h5>
            <p className="text-sm text-gray-700">Have students write words as you say them aloud.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🎨 Word Art</h5>
            <p className="text-sm text-gray-700">Create visual representations or illustrations for vocabulary words.</p>
          </div>
        </div>
      </div>

      {/* Differentiation Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🎯 Differentiation</h4>
        <div className="space-y-3">
          <div>
            <strong className="text-blue-700">Struggling Learners:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Start with 3-5 words from beginning position only. Use visual supports and multi-sensory practice.
            </p>
          </div>
          <div>
            <strong className="text-blue-700">On-Level Learners:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Practice all positions with 5-8 words each. Include word building and spelling activities.
            </p>
          </div>
          <div>
            <strong className="text-blue-700">Advanced Learners:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Use all words and create sentences or stories. Explore meaning and vocabulary connections.
            </p>
          </div>
        </div>
      </div>

      {/* Print Information */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
        💡 These word lists are designed for immediate classroom use and can be easily copied for student practice sheets.
      </div>
    </div>
  );
}