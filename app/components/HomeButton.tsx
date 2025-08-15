'use client';

import { useRouter } from 'next/navigation';

interface HomeButtonProps {
  className?: string;
}

export default function HomeButton({ className = '' }: HomeButtonProps) {
  const router = useRouter();

  return (
    <div className={`bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full p-1 backdrop-blur-sm border border-white/40 ${className}`}>
      <button 
        onClick={() => router.push('/student')}
        className="p-2 rounded-full transition-all duration-300 bg-gradient-to-br from-blue-800 to-indigo-900 shadow-md shadow-indigo-900/50 text-white hover:scale-110 flex items-center justify-center border border-white/50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
    </div>
  );
}