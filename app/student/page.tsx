'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function StudentDenPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState(''); // forest, dragon, mountain, mixed
  const [darkMode, setDarkMode] = useState(false);

  // Load selected mascot from localStorage on page load
  useEffect(() => {
    const savedMascot = localStorage.getItem('selectedMascot');
    if (savedMascot) {
      setSelectedTheme(savedMascot);
    } else {
      // Set default if no saved mascot
      setSelectedTheme('placeholder1');
    }
  }, []);

  // Save selected mascot to localStorage only when user makes a selection
  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem('selectedMascot', selectedTheme);
    }
  }, [selectedTheme]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'
    }`}>
      
      {/* Magical Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 139, 34, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        }}>
          {/* Animated paw prints */}
          <div className="absolute top-10 left-10 animate-pulse">🐾</div>
          <div className="absolute top-32 right-20 animate-pulse delay-300">🐾</div>
          <div className="absolute bottom-40 left-1/4 animate-pulse delay-700">🐾</div>
          <div className="absolute top-1/2 right-1/3 animate-pulse delay-500">✨</div>
          <div className="absolute bottom-20 right-10 animate-pulse delay-1000">🔥</div>
        </div>
      </div>

      {/* Header with Mascot */}
      <header className={`relative z-10 shadow-2xl p-4 border-b-4 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
          : 'bg-gradient-to-r from-blue-400 to-indigo-600 border-blue-700'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-3 -ml-4 sm:-ml-12 md:-ml-24">
            <Link href="/" className="cursor-pointer hover:scale-110 transition-all" title="Go Home">
              <Image 
                src="/images/dhole mascot.png" 
                alt="Go Home" 
                width={45} 
                height={45} 
              />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8)'}}>
                Welcome to Your Cozy Den!
              </h1>
              <p className={`text-sm sm:text-base md:text-xl transition-colors duration-300 ${
                darkMode ? 'text-gray-200' : 'text-blue-100'
              }`}>
                Ready for a magical reading adventure? 🌟
              </p>
            </div>
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full p-1 backdrop-blur-sm ml-auto -mr-4 sm:-mr-12 md:-mr-24 border border-white/40">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-sky-300 to-blue-400 shadow-md shadow-blue-400/50' 
                  : 'bg-gradient-to-br from-blue-800 to-indigo-900 shadow-md shadow-indigo-900/50'
              } text-white hover:scale-110 hover:rotate-12 flex items-center justify-center border border-white/50`}
            >
              {darkMode ? (
                <span className="text-base">☀️</span>
              ) : (
                <span className="text-sm">🌙</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Den Activities */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        
        {/* Greeting Section */}
        <div className="text-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl px-3 sm:px-6 border-4 border-blue-700">
            <div className="flex flex-col sm:flex-row items-center py-3 sm:py-5 gap-4 sm:gap-0">
              <div className="rounded-2xl p-2 px-3 sm:p-3 sm:px-6 relative" style={{backgroundColor: '#f87171'}}>
                <h3 className="text-blue-800 font-bold text-lg sm:text-2xl">Choose your mascot</h3>
              </div>
              <svg width="60" height="100" viewBox="0 0 60 100" className="hidden sm:block flex-shrink-0 -ml-3 z-10">
                <path d="M0 10 Q0 0 10 0 L50 40 Q60 50 50 60 L10 100 Q0 100 0 90 Z" fill="#f87171" stroke="none" />
              </svg>
              <div className="flex flex-wrap justify-center sm:ml-auto gap-2 sm:gap-4">
              <button 
                onClick={() => setSelectedTheme('forest')}
                className={`p-3 sm:p-5 rounded-lg text-3xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'forest' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Forest Den"
              >
                <Image 
                  src="/images/dhole.png" 
                  alt="Dhole" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-12 sm:h-12"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('squirrel')}
                className={`p-3 sm:p-5 rounded-lg text-2xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'squirrel' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Raccoon Den"
              >
                <Image 
                  src="/images/raccoon.png" 
                  alt="Raccoon" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-14 sm:h-14"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('mountain')}
                className={`p-3 sm:p-5 rounded-lg text-5xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'mountain' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Mountain Den"
              >
                <Image 
                  src="/images/armadillo.png" 
                  alt="Armadillo" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-12 sm:h-12"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('mixed')}
                className={`p-3 sm:p-5 rounded-lg text-2xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'mixed' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Wombat Den"
              >
                <Image 
                  src="/images/wombat.png" 
                  alt="Wombat" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-12 sm:h-12"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('placeholder1')}
                className={`p-3 sm:p-5 rounded-lg text-2xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'placeholder1' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Coming Soon"
              >
                <Image 
                  src="/images/white headed petrel.png" 
                  alt="White Headed Petrel" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-14 sm:h-14"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('placeholder2')}
                className={`p-3 sm:p-5 rounded-lg text-2xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'placeholder2' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Coming Soon"
              >
                <Image 
                  src="/images/meerkat.png" 
                  alt="Meerkat" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-14 sm:h-14"
                />
              </button>
              <button 
                onClick={() => setSelectedTheme('placeholder3')}
                className={`p-3 sm:p-5 rounded-lg text-5xl transition-all duration-300 border-4 drop-shadow-md ${
                  selectedTheme === 'placeholder3' ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl text-white scale-110 border-emerald-700' : 'bg-gradient-to-br from-blue-500/70 via-purple-500/70 to-indigo-600/70 border-blue-700 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 text-deepNavy'
                }`}
                title="Hedgehog Den"
              >
                <Image 
                  src="/images/hedgehog.png" 
                  alt="Hedgehog" 
                  width={32} 
                  height={32} 
                  className="mx-auto sm:w-12 sm:h-12"
                />
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Sound Tracks */}
          <a 
            href="/student/elkonin-box"
            className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl shadow-2xl p-6 border-4 border-emerald-700 hover:scale-105 transition-all duration-300 cursor-pointer block"
          >
            <div className="text-center">
              <div className="text-6xl -mb-1">
                <svg width="120" height="96" viewBox="0 0 128 128" fill="none" className="mx-auto">
                  {/* Three connected boxes */}
                  <rect x="2" y="36" width="40" height="40" stroke="black" strokeWidth="3" fill="white"/>
                  <rect x="42" y="36" width="40" height="40" stroke="black" strokeWidth="3" fill="white"/>
                  <rect x="82" y="36" width="40" height="40" stroke="black" strokeWidth="3" fill="white"/>
                  
                  {/* Blue circle in first box */}
                  <circle cx="22" cy="56" r="14" fill="#3B82F6" stroke="black" strokeWidth="2"/>
                  
                  {/* Red circle in middle box (vowel) */}
                  <circle cx="62" cy="56" r="14" fill="#EF4444" stroke="black" strokeWidth="2"/>
                  
                  {/* Blue circle in third box */}
                  <circle cx="102" cy="56" r="14" fill="#3B82F6" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-5">Elkonin Sound Boxes</h3>
              <p className="text-emerald-100 text-lg">
                Sound Segmenting Made Simple
              </p>
            </div>
          </a>

          {/* Magic Drawing Cave */}
          <div 
            onClick={() => router.push('/student/whiteboard')}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-6 border-4 border-purple-700 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-6xl -mb-1">
                <Image 
                  src="/images/pencil2.png" 
                  alt="Drawing Den" 
                  width={48} 
                  height={48} 
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-5">Drawing Den</h3>
              <p className="text-purple-100 text-lg">
                Practice with Pizzazz!
              </p>
            </div>
          </div>

          {/* Phoneme Keyboard */}
          <a 
            href="/student/phoneme-keyboard"
            className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl shadow-2xl p-6 border-4 border-indigo-700 hover:scale-105 transition-all duration-300 cursor-pointer block"
          >
            <div className="text-center">
              <div className="text-6xl -mb-1">
                <Image 
                  src="/images/word workspace.png" 
                  alt="Word Workspace" 
                  width={48} 
                  height={48} 
                  className="mx-auto rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-5">Word Workspace</h3>
              <p className="text-indigo-100 text-lg">
                Build words letter by letter!
              </p>
            </div>
          </a>

          {/* Den Friends */}
          <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl shadow-2xl p-6 border-4 border-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <div className="text-6xl -mb-1">
                {selectedTheme === 'squirrel' ? (
                  <Image 
                    src="/images/raccoon.png" 
                    alt="Raccoon Head" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : 
                 selectedTheme === 'mountain' ? (
                  <Image 
                    src="/images/armadillo.png" 
                    alt="Armadillo" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : 
                 selectedTheme === 'forest' ? (
                  <Image 
                    src="/images/dhole.png" 
                    alt="Dhole Head" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : 
                 selectedTheme === 'mixed' ? (
                  <Image 
                    src="/images/wombat.png" 
                    alt="Wombat Head" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : 
                 selectedTheme === 'placeholder1' ? (
                  <Image 
                    src="/images/white headed petrel.png" 
                    alt="White Headed Petrel" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : 
                 selectedTheme === 'placeholder2' ? (
                  <Image 
                    src="/images/meerkat.png" 
                    alt="Meerkat" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) :
                 selectedTheme === 'placeholder3' ? (
                  <Image 
                    src="/images/hedgehog.png" 
                    alt="Hedgehog" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                ) : (
                  <Image 
                    src="/images/dhole.png" 
                    alt="Dhole Head" 
                    width={80} 
                    height={80} 
                    className="mx-auto"
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-2">Den Friends</h3>
              <p className="text-blue-100 text-lg">
                Meet your reading buddies!
              </p>
            </div>
          </div>

          {/* Story Circle */}
          <div className="bg-gradient-to-br from-red-400 to-pink-600 rounded-3xl shadow-2xl p-6 border-4 border-red-700 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <div className="text-6xl -mb-1 animate-pulse">📚</div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-2">Story Circle</h3>
              <p className="text-red-100 text-lg">
                Read magical decodable stories!
              </p>
            </div>
          </div>

          {/* Trophy Tree */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl p-6 border-4 border-yellow-600 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <div className="text-6xl -mb-1 animate-pulse">🌟</div>
              <h3 className="text-2xl font-bold text-white mb-0 mt-2">Trophy Tree</h3>
              <p className="text-yellow-100 text-lg">
                See all your amazing achievements!
              </p>
            </div>
          </div>


        </div>

        {/* My Den Map - Learning Goals */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-amber-300">
          <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center flex items-center justify-center">
            <span className="mr-3">🗺️</span>
            My Den Adventure Map
            <span className="ml-3">🗺️</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Today's Trail */}
            <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-2xl p-6 border-3 border-green-400">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                🐾 Today&apos;s Trail
              </h3>
              <p className="text-green-700 text-lg">
                Follow the paw prints to learn /ch/ and /sh/ sounds!
              </p>
              <div className="mt-4 flex space-x-2">
                <span className="text-2xl animate-pulse">🐾</span>
                <span className="text-2xl animate-pulse delay-300">🐾</span>
                <span className="text-2xl animate-pulse delay-600">🐾</span>
              </div>
            </div>

            {/* Honey Pot Goals */}
            <div className="bg-gradient-to-r from-yellow-200 to-amber-300 rounded-2xl p-6 border-3 border-yellow-400">
              <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center">
                🍯 Honey Pot Goals
              </h3>
              <p className="text-amber-700 text-lg">
                Fill your honey pot by reading 5 words!
              </p>
              <div className="mt-4 flex space-x-1">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Cozy Confidence */}
            <div className="bg-gradient-to-r from-orange-200 to-red-300 rounded-2xl p-6 border-3 border-orange-400">
              <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                🏠 Cozy Confidence
              </h3>
              <p className="text-red-700 text-lg">
                How cozy do you feel with today&apos;s sounds?
              </p>
              <div className="mt-4 flex justify-between">
                <button className="text-3xl hover:scale-125 transition-all">😰</button>
                <button className="text-3xl hover:scale-125 transition-all">😐</button>
                <button className="text-3xl hover:scale-125 transition-all bg-green-200 rounded-full p-1">😊</button>
                <button className="text-3xl hover:scale-125 transition-all">🤩</button>
              </div>
            </div>

          </div>
        </div>

      </main>


    </div>
  );
}