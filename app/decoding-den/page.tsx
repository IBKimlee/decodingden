'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DecodingDenSection } from '@/app/types/decodingDen';
import PhonemeSearch from './components/PhonemeSearch';
import SoundOfTheDay from './components/SoundOfTheDay';
import LetsLearnIt from './components/LetsLearnIt';
import ArticulationGuidance from './components/ArticulationGuidance';
import WordListPractice from './components/WordListPractice';
import PracticeText from './components/PracticeText';
import ShortStory from './components/ShortStory';
import CustomizeLesson from './components/CustomizeLesson';
import WordWorkspace from './components/WordWorkspace';
import ExitTicketModal from './components/ExitTicketModal';

const DECODING_DEN_SECTIONS = [
  {
    id: 'sound-of-the-day' as DecodingDenSection,
    title: '🔠 Sound of the Day',
    description: 'Display phoneme and grapheme with bold formatting',
    icon: '🔠',
    component: SoundOfTheDay,
  },
  {
    id: 'lets-learn-it' as DecodingDenSection,
    title: '🧠 Let\'s Learn It',
    description: 'Explanations, rules, and tips with emoji organization',
    icon: '🧠',
    component: LetsLearnIt,
  },
  {
    id: 'articulation-guidance' as DecodingDenSection,
    title: '👄 Articulation Guidance',
    description: 'Step-by-step pronunciation instructions',
    icon: '👄',
    component: ArticulationGuidance,
  },
  {
    id: 'word-list-practice' as DecodingDenSection,
    title: '📚 Word List Practice',
    description: 'Beginning, medial, and ending word examples',
    icon: '📚',
    component: WordListPractice,
  },
  {
    id: 'practice-text' as DecodingDenSection,
    title: '📖 Simple Sentences',
    description: 'Decodable sentences and word ladders',
    icon: '📖',
    component: PracticeText,
  },
  {
    id: 'short-story' as DecodingDenSection,
    title: '📚 Short Story',
    description: 'Engaging stories using target phonemes',
    icon: '📚',
    component: ShortStory,
  },
  {
    id: 'customize-lesson' as DecodingDenSection,
    title: '⚙️ Customize This Lesson',
    description: 'Additional materials and customization options',
    icon: '⚙️',
    component: CustomizeLesson,
  },
  {
    id: 'word-workspace' as DecodingDenSection,
    title: '📝 Word Practice Space',
    description: 'Interactive word building and spelling practice',
    icon: '📝',
    component: WordWorkspace,
  },
];

export default function DecodingDenPage() {
  const [activeSection, setActiveSection] = useState<DecodingDenSection | null>(null);
  const [phonemeData, setPhonemeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correctionMessage, setCorrectionMessage] = useState<string | null>(null);
  const [articulationViewMode, setArticulationViewMode] = useState<'teacher' | 'student'>('teacher');
  const [showExitTicket, setShowExitTicket] = useState(false);

  const handlePhonemeSearch = async (phonemeInput: string) => {
    setIsLoading(true);
    setError(null);
    setCorrectionMessage(null);

    try {
      const response = await fetch('/api/decoding-den', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneme_input: phonemeInput,
          sections_requested: ['all'],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch phoneme data');
      }

      setPhonemeData(data.phoneme_data);
      setCorrectionMessage(data.correction_message);
      setActiveSection(null); // Reset section when new phoneme is loaded
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPhonemeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const ActiveComponent = activeSection ? 
    DECODING_DEN_SECTIONS.find(s => s.id === activeSection)?.component : null;

  return (
    <div className="min-h-screen bg-yellow-100 text-deepNavy">
      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                <span className="text-2xl">←</span>
              </Link>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-white flex items-center">
                  Decoding Den
                </h1>
                <p className="text-white/80 text-xs sm:text-sm">Phoneme mastery at your fingertips</p>
              </div>
            </div>
            <div className="w-full sm:flex-1 max-w-md sm:ml-8">
              <PhonemeSearch 
                onSearch={handlePhonemeSearch}
                isLoading={isLoading}
                error={error}
                correctionMessage={correctionMessage}
                compact={true}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4" style={{maxWidth: '82rem'}}>

        {/* Main Content Area */}
        <>
          {/* Section Selection Cards */}
          <div className="rounded-xl shadow-lg p-3 sm:p-5 pb-4 mb-4 border-2 border-blue-600" style={{backgroundColor: '#D0EFEA'}}>
            <div className="mb-3 flex flex-col lg:flex-row gap-3 lg:gap-5">
              {/* Focus Sound Container */}
              <div className="bg-gray-50 rounded-lg p-2 border-2 border-blue-400 w-full lg:w-1/4">
                <h1 className="text-lg sm:text-2xl font-bold text-oceanBlue mb-2 drop-shadow-lg">
                  FOCUS SOUND
                </h1>
                <div className="space-y-1">
                  <p className="text-sm sm:text-xl font-semibold text-deepNavy">
                    <strong>Phoneme:</strong> {phonemeData ? <span className="text-lg sm:text-2xl">{phonemeData.phoneme.ipa_symbol}</span> : ''}
                  </p>
                  <p className="text-sm sm:text-xl font-semibold text-deepNavy">
                    <strong>Grapheme{phonemeData && phonemeData.graphemes.length > 1 ? 's' : ''}:</strong>{phonemeData ? <span className="text-lg sm:text-2xl">{phonemeData.graphemes.map((g: any) => `〈 ${g.grapheme} 〉`).join(', ')}</span> : ''}
                  </p>
                </div>
                
                {/* Exit Ticket Button */}
                {phonemeData && (
                  <div className="mt-3 pt-1.5 border-t border-blue-200">
                    <button
                      onClick={() => setShowExitTicket(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-0.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <span className="text-lg">🎟️</span>
                      <span className="text-sm">Exit Ticket</span>
                    </button>
                  </div>
                )}
              </div>
                
                {/* Button Grid - Responsive Layout */}
                <div className="flex-1 mt-2 lg:mt-0">
                  {/* Responsive Button Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-5 auto-rows-fr justify-items-center px-2 sm:px-0">
                    {/* Phoneme Insight */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'sound-of-the-day' ? null : 'sound-of-the-day')}
                      className={`relative rounded-lg p-1 sm:p-2 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-full aspect-square min-h-[80px] sm:min-h-[90px] ${
                        activeSection === 'sound-of-the-day' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/phoneme insight.png" 
                          alt="Phoneme Insight" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'sound-of-the-day' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Phoneme</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'sound-of-the-day' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Insight</div>
                      </div>
                    </button>

                    {/* Let's Learn It */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'lets-learn-it' ? null : 'lets-learn-it')}
                      className={`relative rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-28 h-22 drop-shadow-lg ${
                        activeSection === 'lets-learn-it' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/lets learn it.png" 
                          alt="Let's Learn It" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'lets-learn-it' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Let&apos;s</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'lets-learn-it' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Learn It</div>
                      </div>
                    </button>

                    {/* Articulation Guidance */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'articulation-guidance' ? null : 'articulation-guidance')}
                      className={`relative rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-28 h-22 drop-shadow-lg ${
                        activeSection === 'articulation-guidance' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/articulation guidance.png" 
                          alt="Articulation Guidance" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'articulation-guidance' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Articulation</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'articulation-guidance' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Guidance</div>
                      </div>
                    </button>

                    {/* Word List Practice */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'word-list-practice' ? null : 'word-list-practice')}
                      className={`relative rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-28 h-22 drop-shadow-lg ${
                        activeSection === 'word-list-practice' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/word list practice.png" 
                          alt="Word List Practice" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'word-list-practice' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Word List</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'word-list-practice' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Practice</div>
                      </div>
                    </button>

                    {/* Simple Sentences */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'practice-text' ? null : 'practice-text')}
                      className={`relative rounded-lg p-1 sm:p-2 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-full aspect-square min-h-[80px] sm:min-h-[90px] ${
                        activeSection === 'practice-text' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/simple sentences.png" 
                          alt="Simple Sentences" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'practice-text' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Simple</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'practice-text' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Sentences</div>
                      </div>
                    </button>

                    {/* Short Story */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'short-story' ? null : 'short-story')}
                      className={`relative rounded-lg p-1 sm:p-2 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-full aspect-square min-h-[80px] sm:min-h-[90px] ${
                        activeSection === 'short-story' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/short story.png" 
                          alt="Short Story" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'short-story' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Short</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'short-story' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Story</div>
                      </div>
                    </button>

                    {/* Differentiation */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'customize-lesson' ? null : 'customize-lesson')}
                      className={`relative rounded-lg p-1 sm:p-2 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-full aspect-square min-h-[80px] sm:min-h-[90px] ${
                        activeSection === 'customize-lesson' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="mb-1">
                        <Image 
                          src="/images/differentiation.png" 
                          alt="Differentiation" 
                          width={48} 
                          height={48} 
                          className="mx-auto"
                          key={Date.now() + Math.random()}
                        />
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'customize-lesson' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Differentiation</div>
                      </div>
                    </button>

                    {/* Word Workspace */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'word-workspace' ? null : 'word-workspace')}
                      className={`relative rounded-lg p-1 sm:p-2 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-center w-full aspect-square min-h-[80px] sm:min-h-[90px] ${
                        activeSection === 'word-workspace' 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]  shadow-xl text-white' 
                          : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-600 hover:border-blue-700 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-1">
                        <Image 
                          src="/images/word workspace.png" 
                          alt="Word Workspace" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'word-workspace' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Word Practice</div>
                        <div className={`font-semibold leading-tight ${
                          activeSection === 'word-workspace' ? 'text-white text-xs' : 'text-deepNavy text-xs'
                        }`}>Space</div>
                      </div>
                    </button>
                  </div>

                  {/* Learning Intention */}
                  <div className="flex justify-start gap-3 mt-4 lg:mt-6">
                    <div className="bg-blue-50 rounded-xl p-2 border-2 border-blue-400 w-full">
                      <p className="text-sm sm:text-lg font-semibold text-deepNavy text-center">
                        <strong className="text-green-600 drop-shadow-lg">Learning Intention:</strong> {phonemeData ? (
                          <>
                            I can read and spell words with the <strong>{phonemeData.phoneme.ipa_symbol}</strong> sound spelled〈<strong>{phonemeData.graphemes[0].grapheme}</strong>〉
                          </>
                        ) : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Section Content - Shows below the cards */}
            {activeSection && ActiveComponent && phonemeData && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideDown border-2 border-blue-600">
                <div className="bg-gradient-to-r from-indigo-200 to-indigo-100 p-4 border-b border-blue-200 h-16 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    {activeSection !== 'sound-of-the-day' && (
                      <div className="flex items-center space-x-4">
                        <h2 className="text-2xl font-bold text-oceanBlue drop-shadow-lg flex items-center">
                          {activeSection === 'lets-learn-it' && (
                            <Image 
                              src="/images/lets learn it.png" 
                              alt="Let's Learn It" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {activeSection === 'articulation-guidance' && (
                            <Image 
                              src="/images/articulation guidance.png" 
                              alt="Articulation Guidance" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {activeSection === 'word-list-practice' && (
                            <Image 
                              src="/images/word list practice.png" 
                              alt="Word List Practice" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {activeSection === 'practice-text' && (
                            <Image 
                              src="/images/simple sentences.png" 
                              alt="Simple Sentences" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {activeSection === 'short-story' && (
                            <Image 
                              src="/images/short story.png" 
                              alt="Short Story" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {activeSection === 'customize-lesson' && (
                            <div className="text-3xl mr-3">⚙️</div>
                          )}
                          {activeSection === 'word-workspace' && (
                            <Image 
                              src="/images/word workspace.png" 
                              alt="Word Workspace" 
                              width={32} 
                              height={32} 
                              className="mr-3"
                            />
                          )}
                          {DECODING_DEN_SECTIONS.find(s => s.id === activeSection)?.title.replace(/^🔠 /, '').replace(/^🧠 /, '').replace(/^👄 /, '').replace(/^📚 /, '').replace(/^📖 /, '').replace(/^⚙️ /, '').replace(/^📝 /, '')}
                        </h2>
                        
                        {/* Articulation Guidance Toggle Buttons */}
                        {activeSection === 'articulation-guidance' && (
                          <div className="bg-oceanBlue/10 rounded-lg p-1">
                            <button
                              onClick={() => setArticulationViewMode('teacher')}
                              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                                articulationViewMode === 'teacher' 
                                  ? 'bg-oceanBlue text-white shadow-sm' 
                                  : 'text-oceanBlue hover:bg-oceanBlue/20'
                              }`}
                            >
                              👩‍🏫 Teacher View
                            </button>
                            <button
                              onClick={() => setArticulationViewMode('student')}
                              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                                articulationViewMode === 'student' 
                                  ? 'bg-oceanBlue text-white shadow-sm' 
                                  : 'text-oceanBlue hover:bg-oceanBlue/20'
                              }`}
                            >
                              🧒 Student View
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {activeSection === 'sound-of-the-day' ? (
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-xl font-semibold text-oceanBlue flex items-center drop-shadow">
                          <Image 
                            src="/images/phoneme insight.png" 
                            alt="Phoneme Insight" 
                            width={32} 
                            height={32} 
                            className="mr-3"
                          />
                          Phoneme Insight
                        </h3>
                        <h3 className="text-xl font-semibold text-deepNavy text-right drop-shadow">
                          <span className="text-oceanBlue">Focus Sound</span> <strong>{phonemeData.phoneme.ipa_symbol}</strong> - <span className="text-oceanBlue">Spelled</span><strong> 〈{phonemeData.graphemes[0].grapheme}〉</strong>
                        </h3>
                      </div>
                    ) : (
                      <h3 className="text-xl font-semibold text-deepNavy text-right">
                        <span className="text-oceanBlue drop-shadow-lg">Focus Sound</span> <strong>{phonemeData.phoneme.ipa_symbol}</strong> - <span className="text-oceanBlue drop-shadow-lg">Spelled</span><strong> 〈{phonemeData.graphemes[0].grapheme}〉</strong>
                      </h3>
                    )}
                  </div>
                </div>
                <div className="px-6 pt-4 pb-6">
                  <ActiveComponent 
                    phonemeData={phonemeData}
                    onClose={() => setActiveSection(null)}
                    viewMode={activeSection === 'articulation-guidance' ? articulationViewMode : undefined}
                  />
                </div>
              </div>
            )}
        </>
      </div>

      {/* Exit Ticket Modal */}
      <ExitTicketModal
        isOpen={showExitTicket}
        onClose={() => setShowExitTicket(false)}
        phonemeData={phonemeData}
      />
    </div>
  );
}