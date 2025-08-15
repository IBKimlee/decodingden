import { useState } from 'react';
import Image from 'next/image';

// TypeScript interfaces for the new articulation guidance structure
interface ArticulationFeature {
  description: string;
  cue: string;
}

interface ArticulationFeatures {
  place: ArticulationFeature;
  manner: ArticulationFeature;
  voicing: ArticulationFeature;
  airflow: ArticulationFeature;
}

interface ArticulationError {
  type: string;
  example: string;
  cue: string;
}

interface TeacherView {
  features: ArticulationFeatures;
  errors: ArticulationError[];
  reminders: string[];
}

interface StudentView {
  practice_cues: string[];
  fix_tips: string[];
}

interface NewArticulationGuidance {
  phoneme: string;
  teacher_view: TeacherView;
  student_view: StudentView;
  validation: string;
}

interface ArticulationGuidanceProps {
  phonemeData: any;
  onClose?: () => void;
  viewMode?: 'teacher' | 'student';
}

export default function ArticulationGuidance({ phonemeData, viewMode = 'teacher' }: ArticulationGuidanceProps) {
  const [showSources, setShowSources] = useState(false);

  // Mock data for /sh/ to demonstrate the new format
  // This will be replaced with actual phonemeData.articulation_guidance when available
  const mockArticulationData: NewArticulationGuidance = {
    phoneme: "/sh/",
    teacher_view: {
      features: {
        place: {
          description: "Postalveolar (tongue raised behind alveolar ridge)",
          cue: "Raise your tongue just behind your top teeth"
        },
        manner: {
          description: "Fricative (continuous airflow without stopping)",
          cue: "Keep the air moving – like a whispering wind"
        },
        voicing: {
          description: "Unvoiced (vocal cords do not vibrate)",
          cue: "No buzz in your throat – it's silent like a whisper"
        },
        airflow: {
          description: "Oral (air flows only through the mouth)",
          cue: "Close your lips gently and let the air slide out"
        }
      },
      errors: [
        {
          type: "Substitution",
          example: "/s/ or /ch/ for /sh/",
          cue: "Make a whisper sound, not a hissing or choppy sound"
        },
        {
          type: "Segmentation",
          example: "Splits 'sh' into /s/ + /h/",
          cue: "These two letters work together – say it as one sound: /sh/"
        },
        {
          type: "Voicing Error",
          example: "Uses /zh/ instead of /sh/",
          cue: "Keep your voice off – no vibration in your throat"
        }
      ],
      reminders: [
        "Model with visible lip rounding and airflow",
        "Use hand in front of mouth to feel air without voice",
        "Contrast /s/, /sh/, and /ch/ using minimal pairs"
      ]
    },
    student_view: {
      practice_cues: [
        "Lips rounded like you're going to blow air",
        "Whisper like you're saying 'shhh' to be quiet",
        "Don't use your voice – it should be silent and soft",
        "Try this! Hold your hand in front of your mouth – feel the air, not the buzz"
      ],
      fix_tips: [
        "If it sounds like /s/, round your lips and whisper",
        "If you hear two sounds like /s/ + /h/, try again: just one sound – /sh/",
        "If it sounds buzzy, try turning off your voice – like you're sneaking!"
      ]
    },
    validation: "ASHA-compliant. Verified via McLeod & Baker articulation charting. Matches FCRR and NRP descriptors."
  };

  // For demo purposes, always use the new format with mock data
  // Later this will be: phonemeData?.articulation_guidance || fallback
  const articulationData = mockArticulationData;
  const hasOldFormat = false; // Temporarily disabled to show new format

  // If no articulation data at all
  if (!phonemeData || (!phonemeData.articulation && !phonemeData.articulation_guidance)) {
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

  // If old format is present, show migration notice
  if (hasOldFormat) {
    return (
      <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
        <Image 
          src="/images/articulation guidance.png" 
          alt="Articulation Guidance" 
          width={80} 
          height={80} 
          className="mx-auto mb-4"
        />
        <p className="text-blue-800 font-semibold mb-2">
          Enhanced Articulation Guidance Coming Soon!
        </p>
        <p className="text-blue-600 text-sm">
          This phoneme will be updated to the new teacher/student dual-mode format.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Teacher View */}
      {viewMode === 'teacher' && (
        <div className="space-y-6">
          {/* Visual Placement Guide */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mb-6">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              👁️ Visual Placement Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <h4 className="font-semibold text-indigo-800 mb-2">🗣️ Mouth Position for {phonemeData.phoneme || '/sh/'}</h4>
                {(articulationData.teacher_view.features.place?.cue || articulationData.teacher_view.features.manner?.cue) && (
                  <div className="bg-indigo-100 rounded p-3 mb-3">
                    <p className="text-sm text-gray-700 italic">
                      &quot;Teaching cue: {articulationData.teacher_view.features.place?.cue || articulationData.teacher_view.features.manner?.cue}&quot;
                    </p>
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <p><strong>Place:</strong> {articulationData.teacher_view.features.place?.description}</p>
                  <p><strong>Manner:</strong> {articulationData.teacher_view.features.manner?.description}</p>
                  <p><strong>Voicing:</strong> {articulationData.teacher_view.features.voicing?.description}</p>
                  {articulationData.teacher_view.features.airflow?.description && (
                    <p><strong>Airflow:</strong> {articulationData.teacher_view.features.airflow?.description}</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <h4 className="font-semibold text-indigo-800 mb-2">✋ Hand Cues & Gestures</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Quiet gesture:</strong> Finger to lips (natural /sh/ association)</p>
                  <p><strong>Airflow check:</strong> Hand in front of mouth to feel air</p>
                  <p><strong>Lip shape:</strong> Make small &quot;O&quot; with fingers</p>
                  <p><strong>Duration:</strong> Continuous hand wave (not choppy)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Articulation Features Table */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🔤 Articulation Features (Teacher)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-oceanBlue text-white">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-left font-semibold">Teacher Cue</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(articulationData.teacher_view.features).map(([feature, data], index) => (
                    <tr key={feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-deepNavy capitalize">{feature}</td>
                      <td className="px-4 py-3 text-gray-700">{data.description}</td>
                      <td className="px-4 py-3 text-gray-700 italic">&quot;{data.cue}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Student Errors */}
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🚫 Common Student Errors
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-amber-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Example</th>
                    <th className="px-4 py-3 text-left font-semibold">Correction Cue</th>
                  </tr>
                </thead>
                <tbody>
                  {articulationData.teacher_view.errors.map((error, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-deepNavy">{error.type}</td>
                      <td className="px-4 py-3 text-gray-700">{error.example}</td>
                      <td className="px-4 py-3 text-gray-700 italic">&quot;{error.cue}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Reminders */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🎯 Teacher Reminders
            </h3>
            <ul className="space-y-2">
              {articulationData.teacher_view.reminders.map((reminder, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 text-lg mr-2">💡</span>
                  <span className="text-gray-700">{reminder}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Troubleshooting Guide */}
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🚨 Quick Troubleshooting: &quot;What if...?&quot;
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3">🤔 Student Can&apos;t Make the Sound</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Try:</strong> Start with /s/ sound, then round lips</p>
                  <p><strong>Cue:</strong> &quot;Make a snake sound, then whisper it&quot;</p>
                  <p><strong>Physical:</strong> Use mirror to show lip position</p>
                  <p><strong>If stuck:</strong> Try humming first, then add /sh/</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3">🔄 Student Makes Wrong Sound</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Says /s/:</strong> &quot;Round your lips like a fish&quot;</p>
                  <p><strong>Says /ch/:</strong> &quot;Keep air flowing, don&apos;t stop it&quot;</p>
                  <p><strong>Says /th/:</strong> &quot;Pull tongue back behind teeth&quot;</p>
                  <p><strong>Too loud:</strong> &quot;Whisper it - use your quiet voice&quot;</p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-red-100 rounded p-3">
              <p className="text-sm text-red-800">
                <strong>⏰ Time Saver:</strong> If student struggles after 3 tries, move to a different phoneme and circle back later.
              </p>
            </div>
          </div>

          {/* Multisensory Teaching Strategies */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🎨 Multisensory Teaching Strategies
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">👁️ Visual</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mirror work for self-monitoring</li>
                  <li>• Hand gestures (finger to lips)</li>
                  <li>• Written grapheme 〈sh〉</li>
                  <li>• Mouth diagrams/pictures</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">👂 Auditory</h4>
                <ul className="text-sm space-y-1">
                  <li>• Contrast /s/ vs /sh/ sounds</li>
                  <li>• &quot;Quiet&quot; association (library voice)</li>
                  <li>• Alliteration: &quot;Shiny shells&quot;</li>
                  <li>• Sound isolation exercises</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">✋ Tactile/Kinesthetic</h4>
                <ul className="text-sm space-y-1">
                  <li>• Feel airflow with hand</li>
                  <li>• Vibration check on throat</li>
                  <li>• Lip rounding practice</li>
                  <li>• Sand/finger tracing of 〈sh〉</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Differentiation Strategies */}
          <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🎯 Differentiation: Meeting Every Learner
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-teal-100">
                <h4 className="font-semibold text-red-700 mb-2">🔰 Struggling Learners</h4>
                <ul className="text-sm space-y-1">
                  <li>• Break into tiny steps</li>
                  <li>• Use more tactile cues</li>
                  <li>• Practice in isolation first</li>
                  <li>• Slower modeling pace</li>
                  <li>• More repetition needed</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-teal-100">
                <h4 className="font-semibold text-green-700 mb-2">✅ On-Level Learners</h4>
                <ul className="text-sm space-y-1">
                  <li>• Standard progression</li>
                  <li>• Use visual + auditory cues</li>
                  <li>• Practice in words quickly</li>
                  <li>• Group activities work well</li>
                  <li>• Ready for contrasts (/s/ vs /sh/)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-teal-100">
                <h4 className="font-semibold text-purple-700 mb-2">🚀 Advanced Learners</h4>
                <ul className="text-sm space-y-1">
                  <li>• Move to sentences faster</li>
                  <li>• Teach other graphemes (〈tion〉)</li>
                  <li>• Peer tutoring opportunities</li>
                  <li>• Linguistic explanations</li>
                  <li>• Challenge with longer words</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Assessment Check */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              📊 Quick Progress Check
            </h3>
            <div className="bg-white rounded-lg p-4 border border-yellow-100">
              <h4 className="font-semibold text-yellow-800 mb-3">Can the student...?</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm mb-2">Isolation (sound by itself):</p>
                  <ul className="text-sm space-y-1">
                    <li>□ Produce /sh/ in isolation</li>
                    <li>□ Distinguish /sh/ from /s/ and /ch/</li>
                    <li>□ Use correct mouth position</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-sm mb-2">In Words:</p>
                  <ul className="text-sm space-y-1">
                    <li>□ Say /sh/ in beginning of words</li>
                    <li>□ Say /sh/ at end of words</li>
                    <li>□ Read 〈sh〉 grapheme correctly</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 bg-yellow-100 rounded p-2">
                <p className="text-xs text-yellow-800">
                  <strong>Next Step:</strong> If 4+ boxes checked, student is ready for word-level practice!
                </p>
              </div>
            </div>
          </div>

          {/* Research Sources & Citations Dropdown */}
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
                {/* Validation Notice */}
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-deepNavy mb-2">Research Validation</h4>
                  <p className="text-sm text-gray-700">
                    <strong>💡 {articulationData.validation}</strong>
                  </p>
                </div>
                
                {/* Primary Research Sources */}
                <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-deepNavy mb-3">Key Research Citations</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>American Speech-Language-Hearing Association (ASHA).</strong> (n.d.). Speech sound disorders: Articulation and phonology. <em>Practice portal for speech-language pathology.</em>
                    </li>
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>McLeod, S., & Crowe, K.</strong> (2018). Children&apos;s consonant acquisition in 27 languages: A cross-linguistic review. <em>American Journal of Speech-Language Pathology, 27</em>(4), 1546–1571.
                    </li>
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>Bowen, C.</strong> (2011). Children&apos;s speech sound disorders (2nd ed.). Wiley-Blackwell.
                    </li>
                  </ul>
                </div>
                
                {/* Implementation Framework */}
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Implementation Framework</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    This articulation guidance follows evidence-based practices from:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>Florida Center for Reading Research (FCRR)</strong> - Phonological awareness and articulation guidelines
                    </li>
                    <li className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      <strong>National Reading Panel (NRP)</strong> - Systematic phonics instruction principles
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student View */}
      {viewMode === 'student' && (
        <div className="space-y-6">
          {/* Practice Instructions */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🧒 Let&apos;s Practice the Sound {articulationData.phoneme}!
            </h3>
            <div className="space-y-3">
              {articulationData.student_view.practice_cues.map((cue, index) => (
                <div key={index} className="flex items-start bg-white rounded p-3 border border-purple-100">
                  <span className="text-purple-600 text-xl mr-3">✨</span>
                  <p className="text-gray-700">{cue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fix Tips */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4 flex items-center">
              🔧 Oops! Let&apos;s Fix These
            </h3>
            <div className="space-y-3">
              {articulationData.student_view.fix_tips.map((tip, index) => (
                <div key={index} className="flex items-start bg-white rounded p-3 border border-orange-100">
                  <span className="text-orange-600 text-xl mr-3">🎯</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Activity */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-deepNavy mb-4">🎵 Fun Practice Game</h3>
            <div className="bg-white rounded p-4 border border-pink-100">
              <p className="text-gray-700 mb-2">
                <strong>Mirror Game:</strong> Look in a mirror while you practice {articulationData.phoneme}
              </p>
              <p className="text-gray-700">
                Watch your lips and feel the air. Can you make the perfect {articulationData.phoneme} sound?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}