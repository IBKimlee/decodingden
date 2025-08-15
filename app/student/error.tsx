'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
      <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-purple-300">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Oops! Something went wrong!</h2>
        <p className="text-gray-600 mb-6">Don&apos;t worry, even the best explorers get lost sometimes!</p>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-bold"
        >
          Try Again! 🔄
        </button>
      </div>
    </div>
  );
}