'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SCOPE_AND_SEQUENCE } from '../../data/scopeAndSequence';

export default function ScopeAndSequence() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sequenceOrder = Object.entries(SCOPE_AND_SEQUENCE)
    .sort(([,a], [,b]) => a.order - b.order);

  const handleCreateLesson = (phoneme: string) => {
    router.push(`/teacher/lesson?phoneme=${encodeURIComponent(phoneme)}`);
  };

  return (
    <div className="min-h-screen bg-softSand text-pineShadow flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-softSand to-forestMist shadow-md p-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-pineShadow">Phonics Scope & Sequence</h1>
              <p className="text-xs text-mossGray">Decoding Den&apos;s research-based progression for phonics instruction</p>
            </div>
            <a href="/teacher" className="text-xs text-pineShadow/70 hover:text-pineShadow transition">
              ← Teacher Portal
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 w-full">
        <div className="space-y-6">
          {sequenceOrder.map(([key, data], index) => (
            <div key={key} className="bg-white/50 rounded-xl p-6 shadow-sm border-l-4 border-roseAccent">
              {/* Category Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-roseAccent text-white px-3 py-1 rounded-full text-sm font-medium">
                      Step {data.order}
                    </span>
                    <h2 className="text-xl font-bold text-pineShadow">{data.category}</h2>
                  </div>
                  <p className="text-sm text-mossGray mb-2">
                    <strong>Grade Level:</strong> {data.gradeLevel}
                  </p>
                  {data.prerequisites.length > 0 && (
                    <p className="text-sm text-mossGray">
                      <strong>Prerequisites:</strong> {data.prerequisites.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                  className="text-sm bg-forestMist px-3 py-1 rounded hover:bg-forestMist/80 transition"
                >
                  {selectedCategory === key ? 'Collapse' : 'Expand'}
                </button>
              </div>

              {/* Weekly Grid View */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-3">Weekly Instruction Schedule</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data.phonemes.map((phoneme, idx) => (
                    <div key={idx} className="bg-white/80 rounded-lg p-3 border border-forestMist/20 hover:border-roseAccent/50 transition">
                      <div className="text-xs text-mossGray font-medium mb-1">Week {idx + 1}</div>
                      <div className="space-y-1">
                        <div className="text-xs">
                          <span className="font-medium text-pineShadow">Phoneme:</span> 
                          <span className="ml-1 bg-mossGray/30 px-2 py-0.5 rounded">{phoneme}</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-pineShadow">Grapheme:</span> 
                          <span className="ml-1 bg-roseAccent/20 px-2 py-0.5 rounded">
                            {data.graphemes[idx] || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Words */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Example Words</h4>
                <div className="flex flex-wrap gap-2">
                  {data.exampleWords.map((word, idx) => (
                    <span key={idx} className="bg-forestMist/40 px-2 py-1 rounded text-xs">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedCategory === key && (
                <div className="border-t border-forestMist/30 pt-4 mt-4">
                  <h4 className="font-semibold text-sm mb-3">Create Lessons for Individual Phonemes</h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {data.phonemes.map((phoneme, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCreateLesson(phoneme)}
                        className="bg-white p-3 rounded-lg border border-forestMist/30 hover:bg-forestMist/20 transition text-left"
                      >
                        <div className="font-medium text-sm text-pineShadow">{phoneme}</div>
                        <div className="text-xs text-mossGray">
                          {data.graphemes[idx] && `Spelled: ${data.graphemes[idx]}`}
                        </div>
                        <div className="text-xs text-mossGray">
                          {data.exampleWords[idx] && `Ex: ${data.exampleWords[idx]}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Teaching Notes */}
        <div className="mt-8 bg-forestMist/30 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <span className="mr-2">📚</span> Teaching Sequence Notes
          </h3>
          <div className="text-sm text-mossGray space-y-2">
            <p>• <strong>Sequential Instruction:</strong> Teach skills in the order shown for optimal student success</p>
            <p>• <strong>Mastery-Based:</strong> Ensure 80% accuracy before moving to the next skill level</p>
            <p>• <strong>Prerequisite Checking:</strong> Students should master prerequisites before advancing</p>
            <p>• <strong>Flexible Pacing:</strong> Grade levels are guidelines - adjust based on individual student needs</p>
            <p>• <strong>Review & Spiral:</strong> Regularly review previously taught skills while introducing new ones</p>
          </div>
        </div>
      </main>
    </div>
  );
}