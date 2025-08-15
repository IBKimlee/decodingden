import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy font-sans flex flex-col relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>
      
      {/* Navigation with gradient */}
      <nav className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-2xl pt-4 px-4 pb-2 border-b border-oceanBlue/50 relative z-10">
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
              <button className="bg-white/20 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs sm:text-sm font-medium border border-white/30 hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Subheader */}
      <div className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 pb-6 px-4 border-b border-oceanBlue/30">
        <div className="px-4">
        </div>
      </div>

      {/* Subheader */}
      <div className="bg-gradient-to-r from-oceanBlue to-darkOcean via-indigo-600 pb-6 px-4 border-b border-oceanBlue/30">
        <div className="px-4">
        </div>
      </div>

      {/* Main Content - Flex container */}
      <div className="flex-1 flex flex-col justify-center px-2 py-4 relative z-10 bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6">
            <div className="p-5 rounded-xl shadow-2xl max-w-2xl mx-auto border-2 border-oceanBlue/30"
              style={{
                background: `linear-gradient(to bottom, #A67C5A55, #A67C5A20 150px, #A67C5A05 300px, white)`
              }}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-evenly items-center px-2 sm:px-4">
                <div className="flex flex-col items-center w-full sm:flex-1 sm:max-w-[140px]">
                  <Link href="/teacher/stages" className="bg-gradient-to-br from-emerald-600/80 via-teal-600/80 to-cyan-700/80 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-emerald-800/40 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base font-medium shadow-md mb-1 flex flex-col items-center group border-2 border-blue-500 w-full">
                    <div className="relative w-12 h-14 mb-1 overflow-hidden">
                      {/* Tree trunk */}
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-700/60 to-amber-800/60 rounded-t-lg rounded-b-sm overflow-hidden">
                        {/* Tree texture lines - now inside the trunk */}
                        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
                        <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
                      </div>
                      {/* Tree hollow */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-900 rounded-full shadow-inner"></div>
                      {/* Owl peeking out */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xl group-hover:top-3 transition-all">
                        🦉
                      </div>
                    </div>
                    <span className="drop-shadow-2xl text-sm sm:text-lg tracking-wide font-bold leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Teacher<br />Den</span>
                  </Link>
                </div>
                <div className="flex flex-col items-center w-full sm:flex-1 sm:max-w-[140px]">
                  <Link href="/decoding-den" className="bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base font-medium shadow-md mb-1 flex flex-col items-center group border-2 border-blue-500 w-full">
                    <div className="relative w-12 h-14 mb-1 flex items-center justify-center">
                      {/* Dhole mascot image */}
                      <Image 
                        src="/images/dhole mascot.png" 
                        alt="Dhole Mascot" 
                        width={40} 
                        height={40} 
                        className="group-hover:scale-110 transition-transform duration-200"
                      />
                      {/* Magic sparkles that appear on hover */}
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1">
                        <span className="text-sm">✨</span>
                      </div>
                    </div>
                    <span className="drop-shadow-2xl text-sm sm:text-lg tracking-wide font-bold leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Decoding<br />Den</span>
                  </Link>
                </div>
                <div className="flex flex-col items-center w-full sm:flex-1 sm:max-w-[140px]">
                  <Link href="/student" className="bg-gradient-to-br from-slate-500/80 via-slate-600/80 to-yellow-600/70 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-slate-700/40 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base font-medium shadow-md mb-1 flex flex-col items-center group border-2 border-blue-500 w-full">
                    <div className="relative w-12 h-14 mb-1">
                      {/* Simple honey pot */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11 h-11 z-10">
                        {/* Pot body */}
                        <div className="absolute bottom-0 w-full h-9 bg-gradient-to-b from-amber-200/60 to-amber-300/60 rounded-lg shadow-sm"></div>
                        
                        {/* Pot rim */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-11 h-2 bg-gradient-to-b from-amber-500/60 to-amber-600/60 rounded-full shadow-sm"></div>
                        
                        {/* HONEY label */}
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-50/70 rounded border border-amber-200/60">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] font-bold text-amber-600/60">
                            HONEY
                          </div>
                        </div>
                        
                        {/* Lid - lifts on hover */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:rotate-[22deg] transform-origin-left">
                          <div className="w-full h-full bg-gradient-to-b from-amber-400/60 to-amber-500/60 rounded-full shadow-md"></div>
                          {/* Lid handle */}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-gradient-to-b from-amber-400/60 to-amber-500/60 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Bear head that pops up when lid lifts */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 group-hover:delay-100 group-hover:-translate-y-1">
                        <span className="text-2xl">🐻</span>
                      </div>
                    </div>
                    <span className="drop-shadow-2xl text-sm sm:text-lg tracking-wide font-bold leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Student<br />Den</span>
                  </Link>
                </div>
              </div>
              <p className="text-mediumGray text-sm mt-4 leading-relaxed">
                <strong>Decoding Den</strong> — Phoneme–grapheme clarity in an instant, so every learner can be taught with 
                focused intent, precision, and confidence. Because every second counts, and every student matters.
              </p>
            </div>
          </div>

          {/* Features with updated content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6">
            <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden border border-oceanBlue/20">
              <h3 className="text-base font-semibold mb-1 text-deepNavy">Sound-Based Instruction</h3>
              <p className="text-mediumGray text-xs">Explicit lessons from phoneme to meaning, one skill at a time.</p>
            </div>
            <Link href="/teaching-tools" className="block">
              <div className="bg-gradient-to-br from-accentCoral/15 to-accentCoral/25 p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden border border-accentCoral/30 cursor-pointer">
                <h3 className="text-base font-semibold mb-1 text-deepNavy">Teaching Tools & Printables</h3>
                <p className="text-mediumGray text-xs">Low-prep resources aligned with the science of reading.</p>
              </div>
            </Link>
            <Link href="/research" className="block">
              <div className="bg-gradient-to-br from-accentGold/15 to-accentGold/25 p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden border border-accentGold/30 cursor-pointer">
                <h3 className="text-base font-semibold mb-1 text-deepNavy">Built on Research</h3>
                <p className="text-mediumGray text-xs">Grounded in National Reading Panel, McREL, FCRR, and decades of cognitive science.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}