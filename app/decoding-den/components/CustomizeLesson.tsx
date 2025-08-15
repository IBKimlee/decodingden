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

interface CustomizeLessonProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

export default function CustomizeLesson({ phonemeData }: CustomizeLessonProps) {
  const [showSources, setShowSources] = useState(false);
  if (!phonemeData) return null;

  const { phoneme, articulation, research_citations } = phonemeData;

  return (
    <div className="space-y-6">

      {/* Quick Customization Options */}
      <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/20 rounded-xl p-6 border border-oceanBlue/30">
        <h3 className="text-xl font-semibold text-deepNavy mb-4">🎛️ Lesson Customization</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-oceanBlue/20">
            <h4 className="font-semibold text-deepNavy mb-3 flex items-center">
              📊 Difficulty Level
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded bg-green-50 hover:bg-green-100 border border-green-200 transition-colors">
                <strong>Beginning:</strong> Focus on sound isolation and recognition
              </button>
              <button className="w-full text-left p-2 rounded bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors">
                <strong>Developing:</strong> Add word-level practice and simple sentences
              </button>
              <button className="w-full text-left p-2 rounded bg-red-50 hover:bg-red-100 border border-red-200 transition-colors">
                <strong>Advanced:</strong> Include complex texts and writing activities
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-oceanBlue/20">
            <h4 className="font-semibold text-deepNavy mb-3 flex items-center">
              ⏱️ Lesson Duration
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                <strong>15 minutes:</strong> Quick review or introduction
              </button>
              <button className="w-full text-left p-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                <strong>30 minutes:</strong> Complete lesson with practice
              </button>
              <button className="w-full text-left p-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                <strong>45 minutes:</strong> Extended practice with games
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Activities */}
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-xl font-semibold text-deepNavy mb-4">🎯 Additional Activities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">🧩 Word Chains</h5>
            <p className="text-sm text-gray-700 mb-3">
              Build chains of words that change one sound at a time.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <strong>Example:</strong> cat → bat → bit → sit
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">🎨 Multi-sensory Practice</h5>
            <p className="text-sm text-gray-700 mb-3">
              Engage multiple senses for better retention.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Sand trays, finger paints, play dough letters
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">🎲 Sound Games</h5>
            <p className="text-sm text-gray-700 mb-3">
              Interactive games to practice the target sound.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Sound bingo, phoneme hunt, word building
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">📱 Digital Tools</h5>
            <p className="text-sm text-gray-700 mb-3">
              Technology integration ideas.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Recording pronunciation, interactive apps
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">📝 Assessment Ideas</h5>
            <p className="text-sm text-gray-700 mb-3">
              Quick ways to check understanding.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Exit tickets, observation checklists
            </div>
          </div>

          <div className="bg-white rounded p-4 border border-purple-100">
            <h5 className="font-semibold text-deepNavy mb-2">🏠 Home Connection</h5>
            <p className="text-sm text-gray-700 mb-3">
              Activities for families to practice at home.
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Take-home word lists, family games
            </div>
          </div>
        </div>
      </div>

      {/* Articulation Support for Struggling Students */}
      {articulation && (
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4">🗣️ Articulation Support for {phoneme.ipa_symbol}</h3>
          <p className="text-gray-700 mb-4">
            For students who have difficulty articulating the {phoneme.ipa_symbol} sound:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded p-4 border border-amber-100">
              <h5 className="font-semibold text-deepNavy mb-2">👄 Articulation Details</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Place:</strong> {articulation.place_of_articulation}</li>
                <li>• <strong>Manner:</strong> {articulation.manner_of_articulation}</li>
                <li>• <strong>Voicing:</strong> {articulation.voicing}</li>
                {articulation.tongue_position && <li>• <strong>Tongue:</strong> {articulation.tongue_position}</li>}
              </ul>
            </div>
            <div className="bg-white rounded p-4 border border-amber-100">
              <h5 className="font-semibold text-deepNavy mb-2">🎯 Teacher Tips</h5>
              {articulation.teacher_tips.length > 0 ? (
                <ul className="text-sm text-gray-700 space-y-1">
                  {articulation.teacher_tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              ) : (
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use mirrors for mouth position awareness</li>
                  <li>• Model correct production clearly</li>
                  <li>• Provide frequent positive feedback</li>
                </ul>
              )}
            </div>
          </div>
          
          {/* Step-by-step instructions */}
          {articulation.step_by_step_instructions.length > 0 && (
            <div className="mt-4 bg-white rounded p-4 border border-amber-100">
              <h5 className="font-semibold text-deepNavy mb-2">📋 Step-by-Step Instructions</h5>
              <ol className="text-sm text-gray-700 space-y-1">
                {articulation.step_by_step_instructions.map((instruction, index) => (
                  <li key={index}>{index + 1}. {instruction}</li>
                ))}
              </ol>
            </div>
          )}
          
          {/* Common errors */}
          {articulation.common_errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
              <h5 className="font-semibold text-red-700 mb-2">⚠️ Common Errors to Watch For</h5>
              <ul className="text-sm text-red-700 space-y-1">
                {articulation.common_errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>🤝 SLP Collaboration:</strong> For persistent difficulties, consider consulting with a 
              Speech-Language Pathologist for specialized intervention strategies.
            </p>
          </div>
        </div>
      )}

      {/* Lesson Modifications */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-deepNavy mb-4">🔧 Quick Modifications</h3>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">For English Language Learners:</h5>
            <p className="text-sm text-gray-700">
              Provide native language cognates when available, use visual supports, and allow extra processing time.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">For Students with Learning Differences:</h5>
            <p className="text-sm text-gray-700">
              Break activities into smaller steps, use multi-sensory approaches, and provide additional practice opportunities.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">For Advanced Learners:</h5>
            <p className="text-sm text-gray-700">
              Add vocabulary extensions, creative writing activities, and morphology connections.
            </p>
          </div>
        </div>
      </div>

      {/* Research Sources */}
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <button
          onClick={() => setShowSources(!showSources)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium text-deepNavy flex items-center">
            🔍 Research Sources & Citations
          </span>
          <span className={`transform transition-transform text-gray-500 ${showSources ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {showSources && (
          <div className="px-4 pb-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3 italic">
              These citations support differentiation strategies, phonics instruction methods, and evidence-based teaching practices for diverse learners.
            </p>
            <div className="space-y-2">
              {research_citations && research_citations.length > 0 ? (
                research_citations.map((citation, index) => (
                  <div key={index} className="text-xs text-gray-700">
                    <p className="font-medium mb-1">{citation.source_name}</p>
                    <p className="text-gray-500 italic ml-2">• {citation.citation_text}</p>
                    {citation.url && (
                      <a href={citation.url} className="text-blue-600 hover:underline ml-2 text-xs" target="_blank" rel="noopener noreferrer">
                        [View Source]
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-gray-700">
                    <p className="font-medium mb-1">National Reading Panel. (2000). Teaching children to read: An evidence-based assessment of the scientific research literature on reading and its implications for reading instruction. Washington, DC: National Institute of Child Health and Human Development.</p>
                    <p className="text-gray-500 italic ml-2">• Systematic phonics instruction effectiveness</p>
                  </div>
                  <div className="text-xs text-gray-700">
                    <p className="font-medium mb-1">Florida Center for Reading Research. (2005). Student center activities for phonics instruction. Tallahassee, FL: Florida State University.</p>
                    <p className="text-gray-500 italic ml-2">• Phoneme awareness progression and differentiation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}