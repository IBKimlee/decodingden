'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ActivityCompletion from '@/app/components/ActivityCompletion';

type StoryGeneratorResult = {
  title: string;
  sentences: string[];
  focus_words: string[];
  stage_number: number;
  phoneme_display: string;
  stage?: {
    stage_number: number;
    stage_name: string;
    grade_level: string;
    student_phase: string;
    description: string;
  } | null;
};

const STORY_SUGGESTIONS = ['short a', '/sh/', '/ch/', '/ar/', 'long o', '/st/'];

export default function StoryCirclePage() {
  const [storyInput, setStoryInput] = useState('');
  const [storyResult, setStoryResult] = useState<StoryGeneratorResult | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);

  const handleStoryRequest = async (requestedInput?: string) => {
    const query = (requestedInput ?? storyInput).trim();

    if (!query) {
      setStoryError('Type a sound, blend, or digraph to hear a story.');
      setStoryResult(null);
      return;
    }

    setStoryLoading(true);
    setStoryError(null);

    try {
      const response = await fetch('/api/student-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneme_input: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'We could not make that story yet.');
      }

      setStoryResult({
        title: data.story.title,
        sentences: data.story.sentences,
        focus_words: data.story.focus_words,
        stage_number: data.story.stage_number,
        phoneme_display: data.story.phoneme_display,
        stage: data.stage
          ? {
              stage_number: data.stage.stage_number,
              stage_name: data.stage.stage_name,
              grade_level: data.stage.grade_level,
              student_phase: data.stage.student_phase,
              description: data.stage.description,
            }
          : null,
      });
      setStoryInput(query);
    } catch (error: any) {
      setStoryError(error.message || 'We could not make that story yet.');
      setStoryResult(null);
    } finally {
      setStoryLoading(false);
    }
  };

  const handleStorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStoryRequest();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setStoryInput(suggestion);
    handleStoryRequest(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-yellow-100 text-deepNavy">
      <header className="bg-gradient-to-r from-red-500 to-pink-600 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/student"
              className="text-white text-2xl hover:text-yellow-200 transition-colors"
              aria-label="Back to Student Den"
            >
              ←
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Story Circle</h1>
              <p className="text-white/85 text-sm sm:text-base">
                Pick a sound to hear a decodable story just right for you!
              </p>
            </div>
          </div>
          <Image src="/images/dhole mascot.png" width={48} height={48} alt="Decoding Den Mascot" className="drop-shadow-xl" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-red-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2 animate-pulse">📚</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-700">Create Your Magical Story</h2>
            <p className="text-red-500 text-base sm:text-lg">
              Enter a phonics skill and we&apos;ll keep every word within the 8-stage path.
            </p>
          </div>

          <form onSubmit={handleStorySubmit} className="bg-red-50 rounded-2xl p-4 sm:p-5 border border-red-200 shadow-inner">
            <label className="block text-left text-sm font-semibold text-red-700 mb-2">
              Type a sound, blend, or digraph (example: <span className="font-mono">short a</span> or <span className="font-mono">/sh/</span>)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={storyInput}
                onChange={(event) => setStoryInput(event.target.value)}
                placeholder="Try /sh/, short a, long o, or /st/"
                className="flex-1 rounded-xl px-4 py-2 text-base border-2 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm bg-white"
              />
              <button
                type="submit"
                disabled={storyLoading}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {storyLoading ? 'Crafting...' : 'Tell My Story'}
              </button>
            </div>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {STORY_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm font-medium bg-white/90 hover:bg-white text-red-700 px-3 py-1 rounded-full border border-red-200 transition-all duration-150 shadow-sm"
                disabled={storyLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {storyError && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 rounded-xl p-3 text-sm">
              {storyError}
            </div>
          )}

          {storyResult && !storyLoading && (
            <div className="mt-6 bg-white rounded-2xl p-5 border-2 border-red-200 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-700">{storyResult.title}</h3>
                  <p className="text-sm text-red-500">
                    Focus sound: <span className="font-mono font-semibold text-red-700">{storyResult.phoneme_display}</span>
                  </p>
                </div>
                {storyResult.stage && (
                  <div className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-center">
                    Stage {storyResult.stage.stage_number}: {storyResult.stage.stage_name}
                    <div className="font-normal text-[11px] mt-1 text-red-600">{storyResult.stage.grade_level}</div>
                  </div>
                )}
              </div>
              <div className="space-y-3 text-left">
                {storyResult.sentences.map((sentence, index) => (
                  <p key={index} className="text-base sm:text-lg text-red-800 leading-relaxed">
                    {sentence}
                  </p>
                ))}
              </div>
              {storyResult.focus_words.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-red-600 mb-2">Focus words</p>
                  <div className="flex flex-wrap gap-2">
                    {storyResult.focus_words.map((word) => (
                      <span
                        key={word}
                        className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium border border-red-200"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Activity Completion Tracking */}
      <ActivityCompletion activityType="story_circle" />
    </div>
  );
}
