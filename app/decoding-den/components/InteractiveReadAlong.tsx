'use client';

import React, { useState, useEffect, useRef } from 'react';

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
  practice_texts: {
    sentences: string[];
    stories: Array<string | { title: string; text: string; level?: string; word_count?: number }>;
    word_ladders: string[];
  };
}

interface InteractiveReadAlongProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

interface ProcessedSentence {
  text: string;
  targetWords: string[];
}

interface ProcessedStory {
  title: string;
  text: string;
  level: string;
  targetWords: string[];
}

// Helper function to clean and normalize text for display
const normalizeText = (text: string): string => {
  // Replace newlines with spaces
  let normalized = text.replace(/\n/g, ' ');
  // Ensure space after punctuation if missing (e.g., "Map.Dad" -> "Map. Dad")
  normalized = normalized.replace(/([.!?])([A-Za-z])/g, '$1 $2');
  // Remove multiple spaces
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
};

export default function InteractiveReadAlong({ phonemeData }: InteractiveReadAlongProps) {
  const [mode, setMode] = useState<'sentences' | 'story'>('sentences');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [highlightedWord, setHighlightedWord] = useState(-1);
  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(0.9);
  const [pitch, setPitch] = useState(1.0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(0);

  // Get the primary grapheme for target word detection
  const primaryGrapheme = phonemeData?.graphemes?.[0]?.grapheme?.toLowerCase() || '';
  const displayPhoneme = phonemeData?.phoneme?.ipa_symbol || '';

  // Process sentences from phonemeData
  const processedSentences: ProcessedSentence[] = React.useMemo(() => {
    if (!phonemeData?.practice_texts?.sentences) return [];

    return phonemeData.practice_texts.sentences.map(sentence => {
      // Normalize the sentence text
      const normalizedSentence = normalizeText(sentence);
      const words = normalizedSentence.split(' ');
      const targetWords = words.filter(word => {
        const cleanWord = word.replace(/[.,!?"'—]/g, '').toLowerCase();
        // Exclude single-letter words (sight words like "a", "I")
        if (cleanWord.length <= 1) return false;
        // Check if word contains any of the graphemes for this phoneme
        return phonemeData.graphemes.some(g =>
          cleanWord.includes(g.grapheme.toLowerCase())
        );
      }).map(word => word.replace(/[.,!?"'—]/g, ''));

      return {
        text: normalizedSentence,
        targetWords: [...new Set(targetWords)] // Remove duplicates
      };
    });
  }, [phonemeData]);

  // Process stories from phonemeData
  const processedStories: ProcessedStory[] = React.useMemo(() => {
    if (!phonemeData?.practice_texts?.stories) return [];

    return phonemeData.practice_texts.stories.map((story, index) => {
      let storyText = typeof story === 'string' ? story : story.text;
      const storyTitle = typeof story === 'string' ? `Story ${index + 1}` : (story.title || `Story ${index + 1}`);
      const storyLevel = typeof story === 'string' ? 'Decodable' : (story.level || 'Decodable');

      // Check if title is embedded in text (API concatenates title\ntext)
      // If so, extract just the story content after the first line
      if (storyText.includes('\n')) {
        const parts = storyText.split('\n');
        // If first part looks like a title (matches storyTitle or is short), use remaining parts
        if (parts[0].trim() === storyTitle.trim() || parts[0].length < 30) {
          storyText = parts.slice(1).join(' ');
        }
      }

      // Normalize the text (fix spacing issues)
      storyText = normalizeText(storyText);

      const words = storyText.split(' ');
      const targetWords = words.filter(word => {
        const cleanWord = word.replace(/[.,!?"'—\n]/g, '').toLowerCase();
        // Exclude single-letter words (sight words like "a", "I")
        if (cleanWord.length <= 1) return false;
        return phonemeData.graphemes.some(g =>
          cleanWord.includes(g.grapheme.toLowerCase())
        );
      }).map(word => word.replace(/[.,!?"'—\n]/g, ''));

      return {
        title: storyTitle,
        text: storyText,
        level: storyLevel,
        targetWords: [...new Set(targetWords)]
      };
    });
  }, [phonemeData]);

  // Load available voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const sortedVoices = voices
          .filter(v => v.lang.startsWith('en'))
          .sort((a, b) => {
            const aScore = getVoiceQualityScore(a);
            const bScore = getVoiceQualityScore(b);
            return bScore - aScore;
          });

        setAvailableVoices(sortedVoices);

        if (!selectedVoice && sortedVoices.length > 0) {
          setSelectedVoice(sortedVoices[0]);
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getVoiceQualityScore = (voice: SpeechSynthesisVoice): number => {
    let score = 0;
    const name = voice.name.toLowerCase();

    if (name.includes('natural')) score += 100;
    if (name.includes('premium')) score += 90;
    if (name.includes('enhanced')) score += 80;
    if (name.includes('neural')) score += 85;
    if (name.includes('wavenet')) score += 85;
    if (name.includes('samantha')) score += 70;
    if (name.includes('karen')) score += 65;
    if (name.includes('daniel')) score += 65;
    if (name.includes('moira')) score += 65;
    if (name.includes('fiona')) score += 65;
    if (name.includes('google us english')) score += 60;
    if (name.includes('google uk english')) score += 60;
    if (name.includes('microsoft zira')) score += 55;
    if (name.includes('microsoft david')) score += 55;
    if (name.includes('microsoft aria')) score += 70;
    if (name.includes('microsoft jenny')) score += 70;

    if (voice.localService) score += 5;
    if (voice.lang === 'en-US') score += 3;

    return score;
  };

  const groupedVoices = () => {
    const groups: { [key: string]: SpeechSynthesisVoice[] } = {
      'Premium / Natural': [],
      'Standard': [],
      'Other': []
    };

    availableVoices.forEach(voice => {
      const score = getVoiceQualityScore(voice);
      if (score >= 60) {
        groups['Premium / Natural'].push(voice);
      } else if (score >= 20) {
        groups['Standard'].push(voice);
      } else {
        groups['Other'].push(voice);
      }
    });

    return groups;
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const highlightTargetWords = (text: string, targetWords: string[]) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?"'—\n]/g, '').toLowerCase();
      const isTarget = targetWords.some(t => t.toLowerCase() === cleanWord);
      const isHighlighted = index === highlightedWord;

      return (
        <span
          key={index}
          onClick={() => !isReading && speakSingleWord(word)}
          className={`transition-all duration-200 inline-block px-1 py-0.5 mx-0.5 rounded cursor-pointer
            ${isHighlighted ? 'bg-yellow-300 scale-110 font-bold shadow-lg' : 'hover:bg-gray-100'}
            ${isTarget && !isHighlighted ? 'text-indigo-600 font-bold underline decoration-dotted decoration-2' : ''}`}
        >
          {word}
        </span>
      );
    });
  };

  // Calculate pause duration based on punctuation at end of word
  const getPunctuationPause = (word: string): number => {
    const trimmedWord = word.trim();
    const lastChar = trimmedWord.charAt(trimmedWord.length - 1);

    // Longer pauses for sentence-ending punctuation
    if (lastChar === '.') return 500;  // Period - longest pause
    if (lastChar === '!') return 400;  // Exclamation - slightly shorter
    if (lastChar === '?') return 350;  // Question mark - medium-long

    // Shorter pauses for mid-sentence punctuation
    if (lastChar === ',') return 200;  // Comma - short pause
    if (lastChar === ';') return 250;  // Semicolon - slightly longer than comma
    if (lastChar === ':') return 250;  // Colon - same as semicolon
    if (lastChar === '—' || lastChar === '-') return 150;  // Dash - brief pause

    // Quotes at end might indicate end of speech
    if (lastChar === '"' || lastChar === "'") {
      const secondLastChar = trimmedWord.charAt(trimmedWord.length - 2);
      if (secondLastChar === '.' || secondLastChar === '!' || secondLastChar === '?') {
        return 450;  // End of quoted sentence
      }
      if (secondLastChar === ',') return 200;
    }

    return 50;  // Default minimal pause between words
  };

  const speakWord = (word: string, index: number, words: string[], onComplete?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word.replace(/[.,!?"'—\n]/g, ''));
    utterance.rate = speed;
    utterance.pitch = pitch;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      const nextIndex = index + 1;
      if (nextIndex < words.length && !isPaused) {
        currentWordIndexRef.current = nextIndex;
        setHighlightedWord(nextIndex);

        // Get pause duration based on punctuation
        const pauseDuration = getPunctuationPause(word);

        setTimeout(() => {
          if (!isPaused) {
            speakWord(words[nextIndex], nextIndex, words, onComplete);
          }
        }, pauseDuration);
      } else if (nextIndex >= words.length) {
        setIsReading(false);
        setHighlightedWord(-1);
        currentWordIndexRef.current = 0;
        if (onComplete) onComplete();
      }
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      setIsReading(false);
      setHighlightedWord(-1);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startReading = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      startVisualOnly();
      return;
    }

    window.speechSynthesis.cancel();

    setIsReading(true);
    setIsPaused(false);

    let currentText = '';
    if (mode === 'sentences' && processedSentences.length > 0) {
      currentText = processedSentences[currentSentence]?.text || '';
    } else if (mode === 'story' && processedStories.length > 0) {
      currentText = processedStories[currentStoryIndex]?.text || '';
    }

    if (!currentText) {
      setIsReading(false);
      return;
    }

    const words = currentText.split(' ');
    wordsRef.current = words;
    currentWordIndexRef.current = 0;

    setHighlightedWord(0);
    speakWord(words[0], 0, words);
  };

  const startVisualOnly = () => {
    setIsReading(true);
    setHighlightedWord(0);

    let currentText = '';
    if (mode === 'sentences' && processedSentences.length > 0) {
      currentText = processedSentences[currentSentence]?.text || '';
    } else if (mode === 'story' && processedStories.length > 0) {
      currentText = processedStories[currentStoryIndex]?.text || '';
    }

    const words = currentText.split(' ');

    // Visual-only mode with punctuation pauses
    const advanceWord = (index: number) => {
      if (index >= words.length) {
        setIsReading(false);
        setHighlightedWord(-1);
        return;
      }

      setHighlightedWord(index);

      // Calculate delay: base reading time + punctuation pause
      const baseDelay = 400 / speed;
      const punctuationPause = getPunctuationPause(words[index]);
      const totalDelay = baseDelay + punctuationPause;

      setTimeout(() => {
        advanceWord(index + 1);
      }, totalDelay);
    };

    // Start with first word after a brief delay
    setTimeout(() => advanceWord(1), 400 / speed);
  };

  const stopReading = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReading(false);
    setIsPaused(false);
    setHighlightedWord(-1);
    currentWordIndexRef.current = 0;
  };

  const pauseReading = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
  };

  const resumeReading = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    setIsPaused(false);
  };

  const speakSingleWord = (word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isReading) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.replace(/[.,!?"'—\n]/g, ''));
    utterance.rate = speed;
    utterance.pitch = pitch;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const previewVoice = (voice: SpeechSynthesisVoice) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("The cat sat on the mat.");
    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const groups = groupedVoices();

  // Check if we have content
  const hasSentences = processedSentences.length > 0;
  const hasStories = processedStories.length > 0;
  const hasContent = hasSentences || hasStories;

  if (!phonemeData) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-4xl mb-4">📖</div>
        <p className="text-gray-600">Search for a phoneme to start reading along!</p>
      </div>
    );
  }

  if (!hasContent) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-4xl mb-4">📖</div>
        <p className="text-gray-600">
          Read-along content for {displayPhoneme} is being developed.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Check back soon for sentences and stories!
        </p>
      </div>
    );
  }

  // Auto-switch to available mode
  if (mode === 'sentences' && !hasSentences && hasStories) {
    setMode('story');
  } else if (mode === 'story' && !hasStories && hasSentences) {
    setMode('sentences');
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        {hasSentences && (
          <button
            onClick={() => {
              stopReading();
              setMode('sentences');
              setCurrentSentence(0);
            }}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              mode === 'sentences' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📝 Sentences
          </button>
        )}
        {hasStories && (
          <button
            onClick={() => {
              stopReading();
              setMode('story');
              setCurrentStoryIndex(0);
            }}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              mode === 'story' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📚 Story
          </button>
        )}
      </div>

      {!speechSupported && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-xl text-center text-sm">
          Your browser doesn&apos;t support text-to-speech. Visual highlighting will still work!
        </div>
      )}

      {mode === 'sentences' && hasSentences ? (
        <div className="space-y-4">
          {/* Sentence Navigation */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                stopReading();
                setCurrentSentence(Math.max(0, currentSentence - 1));
              }}
              disabled={currentSentence === 0 || isReading}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="text-lg">◀️</span>
            </button>
            <span className="text-gray-600 font-medium">
              {currentSentence + 1} of {processedSentences.length}
            </span>
            <button
              onClick={() => {
                stopReading();
                setCurrentSentence(Math.min(processedSentences.length - 1, currentSentence + 1));
              }}
              disabled={currentSentence === processedSentences.length - 1 || isReading}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="text-lg">▶️</span>
            </button>
          </div>

          {/* Sentence Display */}
          <div className="bg-orange-50 rounded-2xl p-6 text-center border-2 border-orange-200 min-h-[120px] flex items-center justify-center">
            <p className="text-xl sm:text-2xl leading-relaxed">
              {highlightTargetWords(
                processedSentences[currentSentence]?.text || '',
                processedSentences[currentSentence]?.targetWords || []
              )}
            </p>
          </div>

          {/* Target Words */}
          {processedSentences[currentSentence]?.targetWords?.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 w-full text-center mb-1">
                Tap any word to hear it — words with {displayPhoneme} are underlined:
              </span>
              {processedSentences[currentSentence].targetWords.slice(0, 8).map((word, i) => (
                <button
                  key={i}
                  onClick={() => speakSingleWord(word)}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 hover:scale-105 transition-all cursor-pointer"
                >
                  🔊 {word}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : mode === 'story' && hasStories ? (
        <div className="space-y-4">
          {/* Story Navigation (if multiple stories) */}
          {processedStories.length > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  stopReading();
                  setCurrentStoryIndex(Math.max(0, currentStoryIndex - 1));
                }}
                disabled={currentStoryIndex === 0 || isReading}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-lg">◀️</span>
              </button>
              <span className="text-gray-600 font-medium">
                Story {currentStoryIndex + 1} of {processedStories.length}
              </span>
              <button
                onClick={() => {
                  stopReading();
                  setCurrentStoryIndex(Math.min(processedStories.length - 1, currentStoryIndex + 1));
                }}
                disabled={currentStoryIndex === processedStories.length - 1 || isReading}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-lg">▶️</span>
              </button>
            </div>
          )}

          <div className="bg-teal-50 rounded-2xl p-6 border-2 border-teal-200">
            <h4 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
              📖 {processedStories[currentStoryIndex]?.title}
              <span className="text-sm bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                {processedStories[currentStoryIndex]?.level}
              </span>
            </h4>
            <p className="text-lg sm:text-xl leading-relaxed">
              {highlightTargetWords(
                processedStories[currentStoryIndex]?.text || '',
                processedStories[currentStoryIndex]?.targetWords || []
              )}
            </p>
          </div>

          {/* Target Words for Story */}
          {processedStories[currentStoryIndex]?.targetWords?.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 w-full text-center mb-1">
                Words with {displayPhoneme} sound (tap to hear):
              </span>
              {processedStories[currentStoryIndex].targetWords.slice(0, 10).map((word, i) => (
                <button
                  key={i}
                  onClick={() => speakSingleWord(word)}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 hover:scale-105 transition-all cursor-pointer"
                >
                  🔊 {word}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Voice Settings Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowVoiceSettings(!showVoiceSettings)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700 flex items-center gap-2">
            🎙️ Voice Settings
            {selectedVoice && (
              <span className="text-sm text-gray-500">
                ({selectedVoice.name})
              </span>
            )}
          </span>
          <span className={`transition-transform ${showVoiceSettings ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {showVoiceSettings && (
          <div className="p-4 space-y-4 border-t border-gray-200">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Voice:
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = availableVoices.find(v => v.name === e.target.value);
                  if (voice) setSelectedVoice(voice);
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-base"
              >
                {Object.entries(groups).map(([groupName, voices]) => (
                  voices.length > 0 && (
                    <optgroup key={groupName} label={`── ${groupName} ──`}>
                      {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} {voice.lang !== 'en-US' ? `(${voice.lang})` : ''}
                        </option>
                      ))}
                    </optgroup>
                  )
                ))}
              </select>

              {selectedVoice && (
                <button
                  onClick={() => previewVoice(selectedVoice)}
                  className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  🔊 Preview Voice
                </button>
              )}
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed: {speed.toFixed(1)}x
              </label>
              <div className="flex items-center gap-3">
                <span>🐢</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  disabled={isReading}
                  className="flex-1 accent-orange-500"
                />
                <span>🐇</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pitch: {pitch.toFixed(1)}
              </label>
              <div className="flex items-center gap-3">
                <span>⬇️</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  disabled={isReading}
                  className="flex-1 accent-orange-500"
                />
                <span>⬆️</span>
              </div>
            </div>

            {/* Voice Info */}
            {selectedVoice && (
              <div className="bg-blue-50 rounded-lg p-3 text-sm">
                <p className="text-blue-800">
                  <strong>Selected:</strong> {selectedVoice.name}
                </p>
                <p className="text-blue-600">
                  Language: {selectedVoice.lang} |
                  {selectedVoice.localService ? ' Local voice' : ' Network voice'}
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800">
              <p className="font-medium mb-1">Tips for best voices:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li><strong>macOS:</strong> &quot;Samantha&quot; is excellent</li>
                <li><strong>Windows:</strong> &quot;Microsoft Jenny&quot; or &quot;Aria&quot; (Edge)</li>
                <li><strong>Chrome:</strong> &quot;Google US English&quot; works well</li>
                <li>Try different voices to find one students enjoy!</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Play Controls */}
      <div className="flex justify-center gap-3">
        {!isReading ? (
          <button
            onClick={startReading}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <span className="text-2xl">▶️</span> Read Along
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button
                onClick={pauseReading}
                className="px-6 py-4 bg-yellow-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">⏸️</span> Pause
              </button>
            ) : (
              <button
                onClick={resumeReading}
                className="px-6 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">▶️</span> Resume
              </button>
            )}
            <button
              onClick={stopReading}
              className="px-6 py-4 bg-gray-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2"
            >
              <span className="text-2xl">⏹️</span> Stop
            </button>
          </>
        )}
      </div>

      <p className="text-center text-sm text-gray-500">
        <strong>Underlined words</strong> contain the {displayPhoneme} sound! Tap any word to hear it.
      </p>
    </div>
  );
}
