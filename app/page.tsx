'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import TwoPortalLogin from './components/TwoPortalLogin';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading } = useAuth();

  // Redirect authenticated users to their portal
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (userRole === 'teacher') {
        router.replace('/teacher');
      } else if (userRole === 'student') {
        router.replace('/student');
      }
    }
  }, [isLoading, isAuthenticated, userRole, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy font-sans flex flex-col relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Navigation with gradient */}
      <nav className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-2xl pt-4 px-4 pb-2 border-b border-oceanBlue/50 relative z-10 flex-shrink-0">
        <div className="px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/dhole mascot.png"
                alt="Dhole Mascot"
                width={55}
                height={55}
                className="mr-2"
              />
              <div>
                <h1 className="text-white font-bold drop-shadow-lg">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}>Decoding Den</span>
                </h1>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mt-1 ml-1">Rooted in Research. Designed for Results.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 pr-2 sm:pr-4">
              <Link href="#" className="hidden sm:block text-white/80 hover:text-white transition-colors font-medium text-sm">About</Link>
              <Link href="#" className="hidden sm:block text-white/80 hover:text-white transition-colors font-medium text-sm">Resources</Link>
              <Link href="#" className="hidden sm:block text-white/80 hover:text-white transition-colors font-medium text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Subheader - blue layer 1 */}
      <div className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 pb-2 px-4 border-b border-oceanBlue/30 flex-shrink-0">
      </div>

      {/* Subheader - blue layer 2 (flipped gradient) */}
      <div className="bg-gradient-to-r from-oceanBlue to-darkOcean via-indigo-600 pb-2 px-4 border-b border-oceanBlue/30 flex-shrink-0">
      </div>

      {/* Main Content - fills remaining space */}
      <div className="flex-1 flex flex-col justify-center px-4 py-2 relative z-10 bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">

          {/* Two Portal Login Section in soft container */}
          <div className="p-6 rounded-xl shadow-xl max-w-4xl mx-auto border-2 border-oceanBlue/30"
            style={{
              background: `linear-gradient(to bottom, #A67C5A55, #A67C5A20 150px, #A67C5A05 300px, white)`
            }}>
            <TwoPortalLogin />

            {/* Tagline below buttons */}
            <p className="text-mediumGray text-sm mt-4 leading-relaxed text-center">
              <strong className="text-deepNavy">Decoding Den</strong> — Phoneme–grapheme clarity in an instant, so every learner can be taught with
              focused intent, precision, and confidence. Because every second counts, and every student matters.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <Link href="/sound-based-instruction" className="block">
              <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-oceanBlue/20 cursor-pointer">
                <h3 className="text-sm font-semibold mb-1 text-deepNavy">Sound-Based Instruction</h3>
                <p className="text-mediumGray text-xs">Explicit lessons from phoneme to meaning, one skill at a time.</p>
              </div>
            </Link>
            <Link href="/teaching-tools" className="block">
              <div className="bg-gradient-to-br from-accentCoral/15 to-accentCoral/25 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-accentCoral/30 cursor-pointer">
                <h3 className="text-sm font-semibold mb-1 text-deepNavy">Teaching Tools & Printables</h3>
                <p className="text-mediumGray text-xs">Low-prep resources aligned with the science of reading.</p>
              </div>
            </Link>
            <Link href="/research" className="block">
              <div className="bg-gradient-to-br from-accentGold/15 to-accentGold/25 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-accentGold/30 cursor-pointer">
                <h3 className="text-sm font-semibold mb-1 text-deepNavy">Built on Research</h3>
                <p className="text-mediumGray text-xs">Grounded in National Reading Panel, McREL, FCRR, and decades of cognitive science.</p>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 text-xs py-1.5 border-t border-gray-300 flex-shrink-0">
        <p>© 2025 Decoding Den. All rights reserved.</p>
      </footer>

    </div>
  );
}
