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
    <div className="min-h-screen bg-softSand flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pineShadow mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-roseAccent/30 text-pineShadow px-6 py-2 rounded-lg hover:bg-roseAccent/40 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}