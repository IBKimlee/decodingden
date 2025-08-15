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

interface PracticeTextProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

export default function PracticeText({ phonemeData }: PracticeTextProps) {
  if (!phonemeData) return null;

  const { practice_texts, phoneme } = phonemeData;

  // If no practice texts, show empty state
  if (!practice_texts || (!practice_texts.sentences?.length && !practice_texts.word_ladders?.length && !practice_texts.stories?.length)) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-4xl mb-4">📖</div>
        <p className="text-gray-600">
          Practice texts for {phoneme?.ipa_symbol || 'this phoneme'} are being developed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Decodable Sentences */}
      {practice_texts.sentences && practice_texts.sentences.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            📝 Decodable Sentences for {phoneme.ipa_symbol}
          </h3>
          <div className="space-y-2">
            {practice_texts.sentences.map((sentence, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed font-medium">
                    {sentence}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-200">
            <div className="text-sm text-blue-800 flex">
              <span className="flex-shrink-0"><strong>💡 Teaching Tip:</strong></span>
              <span className="ml-1">Have students read these sentences aloud, focusing on accurate pronunciation of the target sound. Only use decodable words aligned with previously taught sounds.</span>
            </div>
          </div>
        </div>
      )}

      {/* Word Ladders */}
      {practice_texts.word_ladders && practice_texts.word_ladders.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            🪜 Word Ladder
          </h3>
          <div className="space-y-4">
            {practice_texts.word_ladders.map((ladder, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                <div className="space-y-2">
                  {ladder.split('\n').map((line, lineIndex) => {
                    const isStep = line.includes('➡️');
                    const isStart = line.includes('Start:');
                    
                    if (isStart) {
                      return (
                        <div key={lineIndex} className="flex items-center space-x-2">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            START
                          </div>
                          <span className="text-lg font-bold text-gray-800">
                            {line.replace('Start:', '').trim()}
                          </span>
                        </div>
                      );
                    }
                    
                    if (isStep) {
                      const [arrow, rest] = line.split('➡️');
                      const [word, instruction] = rest.split('(');
                      return (
                        <div key={lineIndex} className="flex items-center space-x-2" style={{marginLeft: '2.25rem'}}>
                          <span className="text-green-500 text-xl w-8">➡️</span>
                          <span className="text-lg font-bold text-gray-800 w-16 text-left">
                            {word.trim()}
                          </span>
                          {instruction && (
                            <span className="text-sm text-gray-600">
                              ({instruction.replace(')', '')}
                            </span>
                          )}
                        </div>
                      );
                    }
                    
                    return (
                      <div key={lineIndex} className="text-gray-700">
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded border border-green-200">
            <p className="text-sm text-green-800">
              <strong>🎯 How to Use:</strong> Start with the first word and change one letter at each step to form a new 
              decodable word. This builds phonemic awareness and spelling skills.
            </p>
          </div>
        </div>
      )}

      {/* Short Stories */}
      {practice_texts.stories && practice_texts.stories.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            📚 Short Stories for {phoneme.ipa_symbol}
          </h3>
          <div className="space-y-4">
            {practice_texts.stories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-purple-100">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Story {index + 1}</h4>
                </div>
                <div className="prose prose-sm max-w-none">
                  {story.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-800 leading-relaxed mb-3 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-100 rounded border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>🎯 Teaching Tip:</strong> Have students read these stories multiple times to build fluency. 
              Encourage them to visualize the story and discuss what they read.
            </p>
          </div>
        </div>
      )}

      {/* Reading Guidelines */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">📚 Reading Guidelines</h4>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <span><strong>Decodability Focus:</strong> All words use previously taught phoneme-grapheme correspondences</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <span><strong>Accuracy First:</strong> Encourage accurate decoding rather than speed</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <span><strong>Sound Blending:</strong> Model how to blend sounds smoothly into words</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">•</span>
            <span><strong>Repeated Reading:</strong> Multiple readings build fluency and confidence</span>
          </div>
        </div>
      </div>

      {/* Practice Activities */}
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🎯 Practice Activities</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-medium text-deepNavy mb-2">👥 Partner Reading</h5>
            <p className="text-sm text-gray-700">Students take turns reading sentences to each other.</p>
          </div>
          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-medium text-deepNavy mb-2">🎭 Act It Out</h5>
            <p className="text-sm text-gray-700">Have students act out the actions or scenes from the sentences.</p>
          </div>
          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-medium text-deepNavy mb-2">🖼️ Illustrate</h5>
            <p className="text-sm text-gray-700">Students draw pictures to match the sentences they read.</p>
          </div>
          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-medium text-deepNavy mb-2">🔍 Sound Hunt</h5>
            <p className="text-sm text-gray-700">Find and highlight all instances of the target sound in the text.</p>
          </div>
        </div>
      </div>

      {/* Assessment Suggestions */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">📊 Quick Assessment</h4>
        <div className="space-y-3">
          <div className="bg-white rounded p-3 border border-gray-100">
            <strong className="text-gray-700">Accuracy Check:</strong>
            <p className="text-sm text-gray-600 mt-1">
              Can the student read the sentences with 95%+ accuracy?
            </p>
          </div>
          <div className="bg-white rounded p-3 border border-gray-100">
            <strong className="text-gray-700">Fluency Check:</strong>
            <p className="text-sm text-gray-600 mt-1">
              Does the student read with appropriate phrasing and expression?
            </p>
          </div>
          <div className="bg-white rounded p-3 border border-gray-100">
            <strong className="text-gray-700">Comprehension Check:</strong>
            <p className="text-sm text-gray-600 mt-1">
              Can the student explain what happened in the sentences?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}