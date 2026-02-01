import { useState } from 'react';
import Image from 'next/image';

interface ArticulationGuidanceProps {
  phonemeData: any;
  onClose?: () => void;
  viewMode?: 'teacher' | 'student';
}

export default function ArticulationGuidance({ phonemeData, viewMode = 'teacher' }: ArticulationGuidanceProps) {
  // Use viewMode prop directly - controlled by parent header buttons
  const activeView = viewMode;
  const [showSources, setShowSources] = useState(false);

  if (!phonemeData) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <Image
          src="/images/articulation guidance.png"
          alt="Articulation Guidance"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <p className="text-gray-600">
          Articulation guidance for this phoneme is being developed.
        </p>
      </div>
    );
  }

  const { phoneme, articulation } = phonemeData;
  const isVowel = articulation?.is_vowel || false;
  const displayPhoneme = phoneme?.ipa_symbol || '/ă/';

  // Get articulation data from the actual phoneme data
  const articulationFeatures = articulation || {};

  return (
    <div className="space-y-6">
      {/* Teacher View */}
      {activeView === 'teacher' && (
        <div className="space-y-6">
          {/* Articulation Features */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🔤 Articulation Features for {displayPhoneme}
            </h3>

            <div className="bg-white rounded-lg p-4 border border-blue-100">
              {isVowel ? (
                // Vowel-specific display
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Sound Type:</strong> vowel
                  </p>
                  <p className="text-gray-700">
                    <strong>Airflow:</strong> {articulationFeatures.lip_position || 'open (no blockage)'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Tongue Position:</strong> {articulationFeatures.place_of_articulation || 'varies'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Lip Shape:</strong> {articulationFeatures.lip_shape || articulationFeatures.tongue_position || 'neutral'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Voicing:</strong> {articulationFeatures.voicing || 'voiced'}
                  </p>
                </div>
              ) : (
                // Consonant display
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Place:</strong> {articulationFeatures.place_of_articulation || 'varies'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Manner:</strong> {articulationFeatures.manner_of_articulation || 'varies'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Voicing:</strong> {articulationFeatures.voicing || 'varies'}
                  </p>
                  {articulationFeatures.airflow_description && (
                    <p className="text-gray-600 text-sm italic mt-2">
                      {articulationFeatures.airflow_description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Teaching Tips */}
          {articulationFeatures.teacher_tips && articulationFeatures.teacher_tips.length > 0 && (
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
                💡 Teaching Tips
              </h3>
              <ul className="space-y-2">
                {articulationFeatures.teacher_tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start bg-white rounded p-3 border border-green-100">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Instructions */}
          {articulationFeatures.step_by_step_instructions && articulationFeatures.step_by_step_instructions.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
                📝 Step-by-Step Instructions
              </h3>
              <ol className="space-y-2">
                {articulationFeatures.step_by_step_instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex items-start bg-white rounded p-3 border border-purple-100">
                    <span className="text-purple-600 font-bold mr-3">{index + 1}.</span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Research Sources */}
          <div className="bg-gray-100 rounded-lg border-2 border-blue-500 overflow-hidden">
            <button
              onClick={() => setShowSources(!showSources)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
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
                <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>LETRS (Language Essentials for Teachers of Reading and Spelling)</strong> - Moats & Tolman
                    </li>
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>Speech to Print</strong> - Louisa Moats (2020)
                    </li>
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>McLeod, S., & Crowe, K.</strong> (2018). Children&apos;s consonant acquisition in 27 languages.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student View */}
      {activeView === 'student' && (
        <div className="space-y-6">
          {/* How to Make the Sound */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🧒 How to Make the {displayPhoneme} Sound
            </h3>

            {articulationFeatures.step_by_step_instructions && articulationFeatures.step_by_step_instructions.length > 0 ? (
              <div className="space-y-3">
                {articulationFeatures.step_by_step_instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex items-start bg-white rounded p-3 border border-purple-100">
                    <span className="text-purple-600 text-xl mr-3">✨</span>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded p-4 border border-purple-100">
                <p className="text-gray-700">
                  Listen to your teacher say the {displayPhoneme} sound, then try to copy it!
                </p>
              </div>
            )}
          </div>

          {/* Practice Activity */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4">🎵 Practice Time!</h3>
            <div className="bg-white rounded p-4 border border-pink-100">
              <p className="text-gray-700 mb-2">
                <strong>Mirror Game:</strong> Look in a mirror while you practice {displayPhoneme}
              </p>
              <p className="text-gray-700">
                Watch your mouth shape and say the sound. Can you make the perfect {displayPhoneme} sound?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
