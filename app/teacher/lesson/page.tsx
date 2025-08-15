'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Section {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
}

function CreateLessonContent() {
  const searchParams = useSearchParams();
  const [phoneme, setPhoneme] = useState('');
  const [lessonData, setLessonData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  
  // Track which sections are open/closed (excluding Sound of the Day which is always visible)
  const [sections, setSections] = useState<Section[]>([
    { id: 'learn', title: "LET'S LEARN IT", icon: '🧠', isOpen: false },
    { id: 'articulation', title: 'ARTICULATION GUIDANCE', icon: '👄', isOpen: false },
    { id: 'wordlist', title: 'WORD LIST PRACTICE', icon: '📚', isOpen: false },
    { id: 'practice', title: 'PRACTICE TEXT', icon: '📖', isOpen: false },
    { id: 'resources', title: 'ON-DEMAND RESOURCES', icon: '📝', isOpen: false },
    { id: 'student', title: 'STUDENT-FACING LINK', icon: '🧩', isOpen: false },
  ]);

  useEffect(() => {
    const searchQuery = searchParams.get('phoneme');
    if (searchQuery) {
      setPhoneme(searchQuery);
      generateLesson(searchQuery);
    }
  }, [searchParams]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const generateLesson = async (phonemeQuery: string) => {
    setIsGenerating(true);
    
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneme: phonemeQuery }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to generate lesson');
      }

      const data = await response.json();
      setLessonData(data.lesson);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Error generating lesson:', error);
      }
    }
    
    setIsGenerating(false);
  };

  const getPhonemeInfo = (input: string) => {
    // Comprehensive phoneme mapping with proper names and graphemes
    const phonemeData: { [key: string]: { phoneme: string; name: string; graphemes: string } } = {
      // Long vowels
      '/ā/': { phoneme: '/ā/', name: 'long a', graphemes: 'a_e, ai, ay, a, eigh, ey' },
      '/ē/': { phoneme: '/ē/', name: 'long e', graphemes: 'e_e, ee, ea, y, ie, e, ey' },
      '/ī/': { phoneme: '/ī/', name: 'long i', graphemes: 'i_e, igh, y, ie, i' },
      '/ō/': { phoneme: '/ō/', name: 'long o', graphemes: 'o_e, oa, ow, o, oe' },
      '/ū/': { phoneme: '/ū/', name: 'long u', graphemes: 'u_e, ue, ew, u' },
      
      // Short vowels
      '/a/': { phoneme: '/a/', name: 'short a', graphemes: 'a' },
      '/e/': { phoneme: '/e/', name: 'short e', graphemes: 'e, ea' },
      '/i/': { phoneme: '/i/', name: 'short i', graphemes: 'i, y' },
      '/o/': { phoneme: '/o/', name: 'short o', graphemes: 'o, a' },
      '/u/': { phoneme: '/u/', name: 'short u', graphemes: 'u, o' },
      
      // Consonant digraphs
      '/sh/': { phoneme: '/sh/', name: 'digraph sh', graphemes: 'sh, ti, ci' },
      '/ch/': { phoneme: '/ch/', name: 'digraph ch', graphemes: 'ch, tch' },
      '/th/': { phoneme: '/th/', name: 'voiceless th', graphemes: 'th' },
      '/TH/': { phoneme: '/TH/', name: 'voiced th', graphemes: 'th' },
      '/wh/': { phoneme: '/wh/', name: 'digraph wh', graphemes: 'wh' },
      '/ph/': { phoneme: '/f/', name: 'digraph ph', graphemes: 'ph' },
      '/ng/': { phoneme: '/ng/', name: 'digraph ng', graphemes: 'ng, n' },
      
      // R-controlled vowels
      '/ar/': { phoneme: '/ar/', name: 'r-controlled ar', graphemes: 'ar' },
      '/er/': { phoneme: '/er/', name: 'r-controlled er', graphemes: 'er, ir, ur, ear' },
      '/or/': { phoneme: '/or/', name: 'r-controlled or', graphemes: 'or, ore, oar' },
      
      // Diphthongs
      '/oi/': { phoneme: '/oi/', name: 'diphthong oi', graphemes: 'oi, oy' },
      '/ou/': { phoneme: '/ou/', name: 'diphthong ou', graphemes: 'ou, ow' },
      
      // Common mislabeings (corrections)
      'vowel team ch': { phoneme: '/ch/', name: 'digraph ch', graphemes: 'ch, tch' },
      'ch': { phoneme: '/ch/', name: 'digraph ch', graphemes: 'ch, tch' },
      'sh': { phoneme: '/sh/', name: 'digraph sh', graphemes: 'sh, ti, ci' },
      'long o': { phoneme: '/ō/', name: 'long o', graphemes: 'o_e, oa, ow, o, oe' },
      'short a': { phoneme: '/a/', name: 'short a', graphemes: 'a' }
    };
    
    // Normalize input
    const normalizedInput = input.toLowerCase().trim();
    
    // Check if we have data for this input
    if (phonemeData[normalizedInput]) {
      return phonemeData[normalizedInput];
    }
    
    // Check if input starts with / (phoneme notation)
    if (phonemeData[input]) {
      return phonemeData[input];
    }
    
    // Default fallback
    return {
      phoneme: input,
      name: input.replace(/[\/]/g, ''),
      graphemes: 'various'
    };
  };

  const isSpellingPatternList = (wordLists: any) => {
    if (!wordLists) return false;
    const keys = Object.keys(wordLists);
    return !keys.includes('beginner') && !keys.includes('intermediate');
  };

  return (
    <div className="min-h-screen bg-softSand text-pineShadow">
      {/* Header */}
      <header className="bg-gradient-to-b from-softSand to-forestMist shadow-md p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-pineShadow">Sound Superpowers</h1>
              <p className="text-sm text-mossGray">Building a lesson for {phoneme || 'selected phoneme'}</p>
            </div>
            <a href="/teacher" className="text-sm text-pineShadow/70 hover:text-pineShadow transition">
              ← Back to Portal
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Phoneme Input and Learning Intention Row */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-start">
          {/* Phoneme Input - Left Side */}
          <div>
            <div className="relative">
              <input
                type="text"
                value={phoneme}
                onChange={(e) => setPhoneme(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && phoneme && !isGenerating) {
                    generateLesson(phoneme);
                  }
                }}
                placeholder="Target Phoneme (Sound)"
                className="w-full px-4 py-3 pr-32 bg-white rounded-lg shadow-md border border-forestMist/30 focus:outline-none focus:border-roseAccent transition text-base placeholder:text-mossGray"
              />
              <button
                onClick={() => generateLesson(phoneme)}
                disabled={!phoneme || isGenerating}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full bg-forestMist/80 hover:bg-forestMist text-white font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title={isGenerating ? 'Generating...' : 'Generate Lesson'}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="hidden sm:inline">Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="hidden sm:inline">Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Learning Intention - Right Side */}
          {lessonData && (
            <div className="bg-gradient-to-r from-forestMist to-mossGray text-white rounded-lg shadow-md px-4 py-3 h-full flex items-center">
              <div className="flex items-center gap-2">
                <span className="text-base">🎯</span>
                <h2 className="font-bold text-sm">Learning Intention:</h2>
                <p className="text-sm">
                  I can read and spell words with {getPhonemeInfo(lessonData.phoneme).graphemes.split(', ').map((g, i) => (
                    <span key={i}>
                      <strong>{g}</strong>
                      {i < getPhonemeInfo(lessonData.phoneme).graphemes.split(', ').length - 1 && ', '}
                    </span>
                  ))}.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🦉</div>
              <p className="text-lg text-mossGray">The wise owl is crafting your lesson...</p>
            </div>
          </div>
        )}

        {/* Generated Lesson */}
        {lessonData && !isGenerating && (
          <div className="space-y-4">
            {/* Teacher Notes Toggle */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowTeacherNotes(!showTeacherNotes)}
                className="text-sm text-mossGray hover:text-pineShadow transition flex items-center gap-2"
              >
                <span>📋</span>
                {showTeacherNotes ? 'Hide' : 'Show'} Teacher Notes
              </button>
            </div>

            {showTeacherNotes && (
              <div className="bg-mossGray/10 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-sm mb-2">Teacher Notes</h3>
                <p className="text-sm text-mossGray">
                  This lesson follows the Science of Reading approach with explicit, systematic instruction.
                  All activities progress from simple to complex and include multiple opportunities for practice.
                </p>
              </div>
            )}

            {/* Sound of the Day - Always Visible */}
            <div className="bg-gradient-to-r from-pineShadow to-mossGray text-softSand rounded-xl p-6 shadow-lg mb-6">
              <h2 className="font-bold text-2xl mb-4 flex items-center">
                <span className="mr-3 text-3xl">🔠</span> SOUND OF THE DAY
              </h2>
              <div className="space-y-2">
                <p className="text-xl">
                  <span className="font-semibold">Phoneme:</span> <span className="font-bold text-2xl">{getPhonemeInfo(lessonData.phoneme).phoneme} ({getPhonemeInfo(lessonData.phoneme).name})</span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Grapheme(s):</span> <span className="font-semibold text-xl">{getPhonemeInfo(lessonData.phoneme).graphemes}</span>
                </p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
              {/* Section 1: Let's Learn It */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('learn')}
                  className="w-full px-6 py-4 bg-forestMist text-white flex items-center justify-between hover:bg-forestMist/90 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[0].icon}</span>
                    <h3 className="font-bold text-lg">{sections[0].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[0].isOpen ? '−' : '+'}</span>
                </button>
                {sections[0].isOpen && (
                  <div className="p-6 bg-softSand space-y-6">
                    {/* Explanation */}
                    <div>
                      <h4 className="font-semibold text-pineShadow mb-3">Explanation:</h4>
                      <div className="bg-white/70 p-4 rounded-lg space-y-2">
                        <div className="flex items-start space-x-1">
                          <span className="text-forestMist flex-shrink-0">🌲</span>
                          <p className="text-base">
                            The grapheme &quot;{getPhonemeInfo(lessonData.phoneme).graphemes.split(', ')[0]}&quot; represents the sound {getPhonemeInfo(lessonData.phoneme).phoneme}
                          </p>
                        </div>
                        <div className="flex items-start space-x-1">
                          <span className="text-forestMist flex-shrink-0">🌲</span>
                          <p className="text-base">{lessonData.explanation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rules */}
                    {lessonData.rules && lessonData.rules.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-pineShadow mb-3">Rules:</h4>
                        <div className="bg-white/70 p-4 rounded-lg space-y-2">
                          {lessonData.rules.map((rule: string, index: number) => (
                            <div key={index} className="flex items-start space-x-1">
                              <span className="text-mossGray flex-shrink-0">📋</span>
                              <p className="text-base">{rule}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {lessonData.tips && lessonData.tips.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-pineShadow mb-3">Tips:</h4>
                        <div className="bg-white/70 p-4 rounded-lg space-y-2">
                          {lessonData.tips.map((tip: string, index: number) => (
                            <div key={index} className="flex items-start space-x-1">
                              <span className="text-roseAccent flex-shrink-0">💡</span>
                              <p className="text-base">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Section 2: Articulation Guidance */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('articulation')}
                  className="w-full px-6 py-4 bg-roseAccent/80 text-white flex items-center justify-between hover:bg-roseAccent transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[1].icon}</span>
                    <h3 className="font-bold text-lg">{sections[1].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[1].isOpen ? '−' : '+'}</span>
                </button>
                {sections[1].isOpen && (
                  <div className="p-6 bg-roseAccent/5">
                    <div className="bg-white/70 p-4 rounded-lg">
                      <pre className="text-base whitespace-pre-wrap font-sans">{lessonData.articulation}</pre>
                      <div className="mt-4 text-sm text-mossGray">
                        <p>• Place • Manner • Voicing</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Word List Practice */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('wordlist')}
                  className="w-full px-6 py-4 bg-mossGray text-white flex items-center justify-between hover:bg-mossGray/90 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[2].icon}</span>
                    <h3 className="font-bold text-lg">{sections[2].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[2].isOpen ? '−' : '+'}</span>
                </button>
                {sections[2].isOpen && (
                  <div className="p-6 bg-forestMist/10">
                    {isSpellingPatternList(lessonData.wordLists) ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(lessonData.wordLists).map(([spelling, words]: [string, any], index) => (
                          <div key={index} className="bg-white/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-pineShadow mb-3 text-lg">Spelling: {spelling}</h4>
                            <div className="space-y-1">
                              {(Array.isArray(words) ? words : []).slice(0, 10).map((word: string, wordIndex: number) => (
                                <p key={wordIndex} className="text-base">{word}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {lessonData.wordLists.beginner && (
                          <div className="bg-white/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-forestMist mb-2">Beginner</h4>
                            <div className="space-y-1">
                              {lessonData.wordLists.beginner.slice(0, 10).map((word: string, index: number) => (
                                <p key={index} className="text-base">{word}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {lessonData.wordLists.intermediate && (
                          <div className="bg-white/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-mossGray mb-2">Intermediate</h4>
                            <div className="space-y-1">
                              {lessonData.wordLists.intermediate.slice(0, 10).map((word: string, index: number) => (
                                <p key={index} className="text-base">{word}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {lessonData.wordLists.advanced && (
                          <div className="bg-white/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-pineShadow mb-2">Advanced</h4>
                            <div className="space-y-1">
                              {lessonData.wordLists.advanced.slice(0, 10).map((word: string, index: number) => (
                                <p key={index} className="text-base">{word}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {lessonData.wordLists.challenge && (
                          <div className="bg-white/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-roseAccent mb-2">Challenge</h4>
                            <div className="space-y-1">
                              {lessonData.wordLists.challenge.slice(0, 10).map((word: string, index: number) => (
                                <p key={index} className="text-base">{word}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-sm text-mossGray mt-4 italic">Words are grouped by grapheme spelling pattern • 10 words per group • Editable</p>
                  </div>
                )}
              </div>

              {/* Section 4: Practice Text */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('practice')}
                  className="w-full px-6 py-4 bg-pineShadow text-white flex items-center justify-between hover:bg-pineShadow/90 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[3].icon}</span>
                    <h3 className="font-bold text-lg">{sections[3].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[3].isOpen ? '−' : '+'}</span>
                </button>
                {sections[3].isOpen && (
                  <div className="p-6 bg-softSand/50">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-pineShadow mb-3">Decodable Sentences:</h4>
                        <div className="bg-white/70 p-4 rounded-lg space-y-2">
                          {lessonData.decodablePractice.sentences.map((sentence: string, index: number) => (
                            <p key={index} className="text-base">{index + 1}. {sentence}</p>
                          ))}
                        </div>
                      </div>
                      
                      {lessonData.decodablePractice.shortStory && (
                        <div>
                          <h4 className="font-semibold text-pineShadow mb-3">Short Story:</h4>
                          <div className="bg-white/70 p-4 rounded-lg">
                            <p className="text-base leading-relaxed">{lessonData.decodablePractice.shortStory}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 5: On-Demand Resources */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('resources')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forestMist to-mossGray text-white flex items-center justify-between hover:opacity-90 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[4].icon}</span>
                    <h3 className="font-bold text-lg">{sections[4].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[4].isOpen ? '−' : '+'}</span>
                </button>
                {sections[4].isOpen && (
                  <div className="p-6 bg-mossGray/5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/70 p-4 rounded-lg">
                        <h4 className="font-semibold text-pineShadow mb-2">🔤 Word Ladders</h4>
                        {lessonData.wordLadder && lessonData.wordLadder.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {lessonData.wordLadder.map((word: string, index: number) => (
                              <span key={index} className="text-base">
                                {word}
                                {index < lessonData.wordLadder.length - 1 && (
                                  <span className="mx-2 text-forestMist">→</span>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-mossGray italic">Available upon request</p>
                        )}
                      </div>
                      
                      <div className="bg-white/70 p-4 rounded-lg">
                        <h4 className="font-semibold text-pineShadow mb-2">✍️ Dictation Activities</h4>
                        <p className="text-sm text-mossGray italic">Coming soon</p>
                      </div>
                      
                      <div className="bg-white/70 p-4 rounded-lg">
                        <h4 className="font-semibold text-pineShadow mb-2">🖨️ Printable Materials</h4>
                        <p className="text-sm text-mossGray italic">Generate worksheets and handouts</p>
                      </div>
                      
                      <div className="bg-white/70 p-4 rounded-lg">
                        <h4 className="font-semibold text-pineShadow mb-2">📦 Elkonin Box Template</h4>
                        <p className="text-sm text-mossGray italic">Sound segmentation practice</p>
                      </div>
                    </div>
                    <p className="text-sm text-mossGray mt-4 text-center italic">(More resources to be added)</p>
                  </div>
                )}
              </div>

              {/* Section 6: Student-Facing Link */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection('student')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-forestMist to-roseAccent text-white flex items-center justify-between hover:opacity-90 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sections[5].icon}</span>
                    <h3 className="font-bold text-lg">{sections[5].title}</h3>
                  </div>
                  <span className="text-2xl">{sections[5].isOpen ? '−' : '+'}</span>
                </button>
                {sections[5].isOpen && (
                  <div className="p-6 bg-gradient-to-br from-forestMist/10 to-roseAccent/10">
                    <div className="bg-white/70 p-6 rounded-lg text-center">
                      <h4 className="font-semibold text-lg mb-3">🔗 Send to Sound Sandbox</h4>
                      <p className="text-base mb-4 text-mossGray">
                        Automatically links students to the aligned interactive version of this lesson
                      </p>
                      <button className="bg-roseAccent px-6 py-3 rounded-lg text-white font-medium hover:bg-roseAccent/80 transition">
                        Generate Student Link
                      </button>
                      <p className="text-sm text-mossGray mt-3">
                        Students will access gamified practice activities for {lessonData.phoneme}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              <button className="bg-forestMist px-6 py-3 rounded-lg hover:bg-forestMist/80 transition text-white font-medium">
                💾 Save Lesson
              </button>
              <button className="bg-mossGray px-6 py-3 rounded-lg hover:bg-mossGray/80 transition text-white font-medium">
                📄 Export PDF
              </button>
              <button className="bg-roseAccent/70 px-6 py-3 rounded-lg hover:bg-roseAccent/80 transition text-white font-medium">
                🎯 Start Teaching
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CreateLesson() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand flex items-center justify-center"><div className="text-lg">Loading lesson generator...</div></div>}>
      <CreateLessonContent />
    </Suspense>
  );
}