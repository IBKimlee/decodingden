'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DecodingDenSection } from '@/app/types/decodingDen';
import PhonemeSearch from './components/PhonemeSearch';
import SoundOfTheDay from './components/SoundOfTheDay';
import LetsLearnIt from './components/LetsLearnIt';
// ArticulationGuidance content is now integrated into SoundOfTheDay (Phoneme Insight)
import WordListPractice from './components/WordListPractice';
import PracticeText from './components/PracticeText';
import ShortStory from './components/ShortStory';
import CustomizeLesson from './components/CustomizeLesson';
import WordWorkspace from './components/WordWorkspace';
import InteractiveReadAlong from './components/InteractiveReadAlong';

// Anchor words for each phoneme - iconic words that represent the sound
// Covers all phonemes in the database including IPA variants
const ANCHOR_WORDS: Record<string, string> = {
  // ===== SHORT VOWELS =====
  // Multiple notation systems for teacher flexibility
  '/ă/': 'apple', '/a/': 'apple', '/æ/': 'apple',
  '/ĕ/': 'elephant', '/e/': 'elephant', '/ɛ/': 'elephant',
  '/ĭ/': 'itchy', '/i/': 'itchy', '/ɪ/': 'itchy',
  '/ŏ/': 'octopus', '/o/': 'octopus', '/ɒ/': 'octopus',
  '/ŭ/': 'umbrella', '/u/': 'umbrella', '/ʌ/': 'umbrella',

  // ===== LONG VOWELS =====
  '/ā/': 'acorn', '/eɪ/': 'acorn',
  '/ē/': 'eagle', '/iː/': 'eagle', '/i:/': 'eagle',
  '/ī/': 'ice', '/aɪ/': 'ice',
  '/ō/': 'open', '/oʊ/': 'open',
  '/ū/': 'unicorn', '/uː/': 'unicorn', '/ju:/': 'unicorn',

  // ===== SCHWA =====
  '/ə/': 'about',

  // ===== R-CONTROLLED VOWELS =====
  '/ar/': 'car', '/ɑr/': 'car', '/är/': 'car',
  '/er/': 'her', '/ɜr/': 'her', '/ər/': 'her',
  '/ir/': 'bird', '/ɪr/': 'bird',
  '/or/': 'horse', '/ɔr/': 'horse',
  '/ur/': 'nurse', '/ʊr/': 'nurse',

  // ===== CONSONANTS =====
  '/b/': 'ball',
  '/d/': 'dog',
  '/f/': 'fish',
  '/g/': 'goat',
  '/h/': 'hat',
  '/j/': 'jump',
  '/k/': 'kite',
  '/l/': 'lion',
  '/m/': 'moon',
  '/n/': 'nest',
  '/p/': 'pig',
  '/r/': 'rabbit',
  '/s/': 'sun',
  '/t/': 'top',
  '/v/': 'van',
  '/w/': 'water',
  '/y/': 'yellow',
  '/z/': 'zebra',
  '/x/': 'fox',

  // ===== CONSONANT DIGRAPHS =====
  '/sh/': 'ship',
  '/ch/': 'cheese',
  '/th/': 'thumb',           // voiceless th
  '/ð/': 'this',             // voiced th (IPA)
  '/th(v)/': 'this',         // voiced th (alternate)
  '/wh/': 'whale',
  '/ng/': 'ring',
  '/ph/': 'phone',
  '/ck/': 'duck',
  '/tch/': 'catch',
  '/dge/': 'bridge',

  // ===== DIPHTHONGS =====
  '/ou/': 'house',
  '/ow/': 'cow',
  '/oi/': 'coin',
  '/oy/': 'boy',
  '/aw/': 'saw',
  '/au/': 'haul',

  // ===== VOWEL TEAMS =====
  '/ee/': 'tree',
  '/ea/': 'eat',
  '/ai/': 'rain',
  '/ay/': 'play',
  '/oa/': 'boat',
  '/oo/': 'moon',
  '/igh/': 'light',
  '/ew/': 'new',
  '/ie/': 'pie',
  '/ue/': 'blue',

  // ===== OTHER PATTERNS =====
  '/ks/': 'box',
  '/kw/': 'queen',
  '/zh/': 'treasure',
  '/qu/': 'queen',

  // ===== SILENT LETTER PATTERNS (Stage 8) =====
  '/kn/': 'knee',
  '/wr/': 'write',
  '/mb/': 'lamb',
  '/gn/': 'sign',
  '/gh/': 'ghost',
};

// When a specific grapheme is displayed, the anchor word should match that grapheme
const GRAPHEME_ANCHOR_WORDS: Record<string, string> = {
  'c': 'cat',
  'k': 'kite',
  'ck': 'duck',
  'g': 'goat',
  'j': 'jump',
  'dge': 'bridge',
  's': 'sun',
};

function getAnchorWord(phonemeSymbol: string, displayedGrapheme?: string): string | null {
  if (!phonemeSymbol) return null;
  // If a specific grapheme is shown, use a grapheme-appropriate anchor word
  if (displayedGrapheme) {
    const graphemeAnchor = GRAPHEME_ANCHOR_WORDS[displayedGrapheme.toLowerCase().trim()];
    if (graphemeAnchor) return graphemeAnchor;
  }
  const normalized = phonemeSymbol.toLowerCase().trim();
  return ANCHOR_WORDS[normalized] || ANCHOR_WORDS[`/${normalized}/`] || null;
}

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
  {
    id: 'read-along' as DecodingDenSection,
    title: '📖 Read Along',
    description: 'Interactive read-along with text-to-speech',
    icon: '📖',
    component: InteractiveReadAlong,
  },
];

export default function DecodingDenPage() {
  const [activeSection, setActiveSection] = useState<DecodingDenSection | null>(null);
  const [phonemeData, setPhonemeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correctionMessage, setCorrectionMessage] = useState<string | null>(null);
  const [disambiguation, setDisambiguation] = useState<Array<{id: string, label: string, example: string, phoneme: string}> | null>(null);

  const handlePhonemeSearch = async (phonemeInput: string) => {
    setIsLoading(true);
    setError(null);
    setCorrectionMessage(null);
    setDisambiguation(null);
    console.log('Search input:', phonemeInput);

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

      // Check if API returned disambiguation options instead of a direct result
      if (data.disambiguation) {
        setDisambiguation(data.disambiguation);
        setPhonemeData(null);
        return;
      }

      console.log('API response data:', data.phoneme_data);
      setPhonemeData(data.phoneme_data);
      setCorrectionMessage(data.correction_message);
      setActiveSection('sound-of-the-day'); // Auto-open Phoneme Insight when phoneme is loaded
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPhonemeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisambiguationSelect = (id: string) => {
    setDisambiguation(null);
    handlePhonemeSearch(id);
  };

  const ActiveComponent = activeSection ? 
    DECODING_DEN_SECTIONS.find(s => s.id === activeSection)?.component : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy">
      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-white flex items-center">
                  Decoding Den
                </h1>
                <p className="text-white/80 text-xs sm:text-sm">Phoneme mastery at your fingertips</p>
              </div>
            </div>
            <Link
              href="/teacher"
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              ← Teacher Portal
            </Link>
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

        {/* Disambiguation prompt — shown when a bare vowel letter is searched */}
        {disambiguation && (
          <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 border-2 border-accentGold/40 bg-gradient-to-br from-amber-50 to-creamyWhite">
            <h2 className="text-lg sm:text-xl font-bold text-deepNavy mb-3">Which sound did you mean?</h2>
            <div className="flex flex-wrap gap-3">
              {disambiguation.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleDisambiguationSelect(option.id)}
                  className="flex-1 min-w-[140px] px-4 py-4 rounded-xl border-2 border-oceanBlue/30 bg-white hover:bg-oceanBlue/10 active:bg-oceanBlue/20 transition-colors text-left cursor-pointer [-webkit-tap-highlight-color:rgba(74,144,164,0.2)]"
                >
                  <p className="text-base sm:text-lg font-bold text-oceanBlue">{option.label}</p>
                  <p className="text-xl sm:text-2xl font-mono text-deepNavy mt-1">{option.phoneme}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.example}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <>
          {/* Section Selection Cards */}
          <div className="rounded-xl shadow-lg p-3 sm:p-5 pb-4 mb-4 border-2 border-oceanBlue/30 bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15">
            <div className="mb-3 flex flex-col lg:flex-row gap-3 lg:gap-5">
              {/* Focus Sound Container */}
              <div className="bg-white/70 rounded-lg p-2 border-2 border-oceanBlue/40 w-full lg:w-1/4">
                <h1 className="text-lg sm:text-2xl font-bold text-oceanBlue mb-2 drop-shadow-lg">
                  FOCUS SOUND
                </h1>
                <div className="space-y-1">
                  <p className="text-sm sm:text-xl font-semibold text-deepNavy">
                    <strong>Phoneme:</strong> {phonemeData ? <span className="text-lg sm:text-2xl">{phonemeData.phoneme.ipa_symbol}</span> : ''}
                  </p>
                  <p className="text-sm sm:text-xl font-semibold text-deepNavy">
                    <strong>Grapheme:</strong>{phonemeData ? (
                      <span className="text-lg sm:text-2xl">
                        〈 {phonemeData.show_specific_grapheme && phonemeData.requested_specific_grapheme 
                          ? phonemeData.requested_specific_grapheme 
                          : phonemeData.graphemes[0].grapheme} 〉
                      </span>
                    ) : ''}
                  </p>
                </div>
                
                {/* Anchor Word Display */}
                {phonemeData && (() => {
                  const displayedGrapheme = phonemeData.show_specific_grapheme && phonemeData.requested_specific_grapheme
                    ? phonemeData.requested_specific_grapheme
                    : phonemeData.graphemes[0]?.grapheme;
                  const anchor = getAnchorWord(phonemeData.phoneme.ipa_symbol, displayedGrapheme);
                  return anchor ? (
                    <div className="mt-3 pt-1.5 border-t border-oceanBlue/30">
                      <p className="text-xs text-gray-500 uppercase">Anchor Word</p>
                      <p className="text-lg font-bold text-deepNavy">{anchor}</p>
                    </div>
                  ) : null;
                })()}
              </div>
                
                {/* Button Grid - Responsive Layout */}
                <div className="flex-1 mt-2 lg:mt-0">
                  {/* Responsive Button Grid */}
                  <div className="flex justify-between items-center w-full">
                    {/* Phoneme Insight */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'sound-of-the-day' ? null : 'sound-of-the-day')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'sound-of-the-day'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5 h-5 sm:h-6 lg:h-7 flex items-center justify-center">
                        <Image
                          src="/images/phoneme insight.png"
                          alt="Phoneme Insight"
                          width={24}
                          height={36}
                          className="mx-auto h-full w-auto object-contain"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'sound-of-the-day' ? 'text-white' : 'text-deepNavy'
                        }`}>Phoneme</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'sound-of-the-day' ? 'text-white' : 'text-deepNavy'
                        }`}>Insight</div>
                      </div>
                    </button>

                    {/* Let's Learn It */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'lets-learn-it' ? null : 'lets-learn-it')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'lets-learn-it'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image
                          src="/images/lets learn it.png"
                          alt="Let's Learn It"
                          width={24}
                          height={24}
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'lets-learn-it' ? 'text-white' : 'text-deepNavy'
                        }`}>Let&apos;s</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'lets-learn-it' ? 'text-white' : 'text-deepNavy'
                        }`}>Learn It</div>
                      </div>
                    </button>

                    {/* Word List Practice */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'word-list-practice' ? null : 'word-list-practice')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'word-list-practice'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image 
                          src="/images/word list practice.png" 
                          alt="Word List Practice" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'word-list-practice' ? 'text-white' : 'text-deepNavy'
                        }`}>Word List</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'word-list-practice' ? 'text-white' : 'text-deepNavy'
                        }`}>Practice</div>
                      </div>
                    </button>

                    {/* Simple Sentences */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'practice-text' ? null : 'practice-text')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'practice-text'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image 
                          src="/images/simple sentences.png" 
                          alt="Simple Sentences" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'practice-text' ? 'text-white' : 'text-deepNavy'
                        }`}>Simple</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'practice-text' ? 'text-white' : 'text-deepNavy'
                        }`}>Sentences</div>
                      </div>
                    </button>

                    {/* Short Story */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'short-story' ? null : 'short-story')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'short-story'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image 
                          src="/images/short story.png" 
                          alt="Short Story" 
                          width={24} 
                          height={24} 
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'short-story' ? 'text-white' : 'text-deepNavy'
                        }`}>Short</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'short-story' ? 'text-white' : 'text-deepNavy'
                        }`}>Story</div>
                      </div>
                    </button>

                    {/* Differentiation */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'customize-lesson' ? null : 'customize-lesson')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'customize-lesson'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image
                          src="/images/differentiation.png"
                          alt="Differentiation"
                          width={24}
                          height={24}
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[9px] sm:text-[10px] lg:text-[11px] ${
                          activeSection === 'customize-lesson' ? 'text-white' : 'text-deepNavy'
                        }`}>Differentiation</div>
                      </div>
                    </button>

                    {/* Word Workspace */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'word-workspace' ? null : 'word-workspace')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'word-workspace'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5">
                        <Image
                          src="/images/word workspace.png"
                          alt="Word Workspace"
                          width={24}
                          height={24}
                          className="mx-auto w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'word-workspace' ? 'text-white' : 'text-deepNavy'
                        }`}>Word</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'word-workspace' ? 'text-white' : 'text-deepNavy'
                        }`}>Practice</div>
                      </div>
                    </button>

                    {/* Read Along */}
                    <button
                      onClick={() => setActiveSection(activeSection === 'read-along' ? null : 'read-along')}
                      className={`relative rounded-lg p-1 shadow-sm hover:shadow-md transition-all duration-200 border-2 flex flex-col items-center justify-start w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[100px] lg:h-[100px] flex-shrink-0 pt-2 ${
                        activeSection === 'read-along'
                          ? 'bg-gradient-to-br from-oceanBlue via-indigo-500 to-darkOcean border-white shadow-[0_0_15px_rgba(74,144,164,0.6)]  shadow-xl text-white'
                          : 'bg-gradient-to-br from-oceanBlue/60 via-indigo-400/50 to-oceanBlue/60 border-oceanBlue/50 hover:border-oceanBlue/70 text-deepNavy'
                      }`}
                    >
                      <div className="flex-shrink-0 mb-0.5 text-base sm:text-lg lg:text-xl">
                        📖
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'read-along' ? 'text-white' : 'text-deepNavy'
                        }`}>Read</div>
                        <div className={`font-semibold leading-none text-[10px] sm:text-[11px] lg:text-xs ${
                          activeSection === 'read-along' ? 'text-white' : 'text-deepNavy'
                        }`}>Along</div>
                      </div>
                    </button>
                  </div>

                  {/* Learning Intention */}
                  <div className="flex justify-start gap-3 mt-4 lg:mt-6">
                    <div className="bg-white/70 rounded-xl p-2 border-2 border-oceanBlue/40 w-full">
                      <p className="text-sm sm:text-lg font-semibold text-deepNavy text-center">
                        <strong className="text-emerald-600/90 drop-shadow-lg">Learning Intention:</strong> {phonemeData ? (
                          <>
                            I can read and spell words with the <strong>{phonemeData.phoneme.ipa_symbol}</strong> sound spelled〈<strong>{phonemeData.show_specific_grapheme && phonemeData.requested_specific_grapheme 
                              ? phonemeData.requested_specific_grapheme 
                              : phonemeData.graphemes[0].grapheme}</strong>〉
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
              <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideDown border-2 border-oceanBlue/40">
                <div className="bg-gradient-to-r from-oceanBlue/20 to-lightOcean/30 p-4 border-b border-oceanBlue/20 h-16 rounded-t-xl">
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
                          {activeSection === 'read-along' && (
                            <span className="text-3xl mr-3">📖</span>
                          )}
                          {DECODING_DEN_SECTIONS.find(s => s.id === activeSection)?.title.replace(/^🔠 /, '').replace(/^🧠 /, '').replace(/^👄 /, '').replace(/^📚 /, '').replace(/^📖 /, '').replace(/^⚙️ /, '').replace(/^📝 /, '')}
                        </h2>
                        
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
                  />
                </div>
              </div>
            )}
        </>
      </div>

    </div>
  );
}