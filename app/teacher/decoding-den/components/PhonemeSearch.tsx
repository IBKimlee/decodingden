'use client';

import { useState } from 'react';

interface PhonemeSearchProps {
  onSearch: (phonemeInput: string) => void;
  isLoading: boolean;
  error: string | null;
  correctionMessage: string | null;
  compact?: boolean;
}

export default function PhonemeSearch({ 
  onSearch, 
  isLoading, 
  error, 
  correctionMessage,
  compact = false
}: PhonemeSearchProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleQuickSearch = (phoneme: string) => {
    setInput(phoneme);
    onSearch(phoneme);
  };

  const quickSearchOptions = [
    { label: '/sh/', value: '/sh/' },
    { label: 'long a', value: 'long a' },
    { label: '/ch/', value: '/ch/' },
    { label: 'short e', value: 'short e' },
    { label: '/th/', value: '/th/' },
    { label: 'long o', value: 'long o' },
  ];

  if (compact) {
    return (
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search phonemes (e.g., /sh/, long a)..."
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm bg-white/10 text-white placeholder-white/70"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm border border-white/30"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  <span className="hidden sm:inline">Searching</span>
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Compact error/correction messages */}
        {(error || correctionMessage) && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            {correctionMessage && (
              <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 mb-2 text-sm">
                <div className="flex items-start">
                  <div className="text-amber-600 mr-2">💡</div>
                  <div>
                    <p className="text-amber-800 font-medium">Auto-correction applied:</p>
                    <p className="text-amber-700 text-xs mt-1">{correctionMessage}</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-sm">
                <div className="flex items-start">
                  <div className="text-red-600 mr-2">⚠️</div>
                  <div>
                    <p className="text-red-800 font-medium">Search Error:</p>
                    <p className="text-red-700 text-xs mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-oceanBlue/20">
      <h2 className="text-xl font-semibold mb-4 text-deepNavy">Search for Any Phoneme</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter phoneme (e.g., /sh/, long a, ch sound)..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-transparent text-lg"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-oceanBlue text-white px-6 py-3 rounded-lg hover:bg-darkOcean transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Quick search buttons */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick search:</p>
        <div className="flex flex-wrap gap-2">
          {quickSearchOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleQuickSearch(option.value)}
              className="bg-gray-100 hover:bg-oceanBlue hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
              disabled={isLoading}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Correction message */}
      {correctionMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="text-amber-600 mr-2">💡</div>
            <div>
              <p className="text-amber-800 font-medium">Auto-correction applied:</p>
              <p className="text-amber-700 text-sm mt-1">{correctionMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-red-600 mr-2">⚠️</div>
            <div>
              <p className="text-red-800 font-medium">Search Error:</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <div className="mt-2">
                <p className="text-red-600 text-xs">Try using:</p>
                <ul className="text-red-600 text-xs mt-1 ml-4">
                  <li>• IPA notation: /sh/, /eɪ/, /ɪ/</li>
                  <li>• Common names: &quot;sh sound&quot;, &quot;long a&quot;, &quot;short i&quot;</li>
                  <li>• Graphemes: sh, ay, ch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="text-xs text-gray-500 mt-4">
        <p><strong>Search Tips:</strong></p>
        <ul className="mt-1 ml-4 space-y-1">
          <li>• Use IPA symbols like /sh/ or /eɪ/</li>
          <li>• Try common names like &quot;long a&quot; or &quot;ch sound&quot;</li>
          <li>• Enter just the grapheme like &quot;sh&quot; or &quot;ay&quot;</li>
          <li>• The system will auto-correct common mistakes</li>
        </ul>
      </div>
    </div>
  );
}