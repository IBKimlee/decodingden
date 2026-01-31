'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeButton from '@/app/components/HomeButton';
import ActivityCompletion from '@/app/components/ActivityCompletion';

const ANIMAL_CHIPS = [
  { name: 'Petrel', color: 'bg-orange-400', emoji: '🐦' },
  { name: 'Bear', color: 'bg-yellow-300', emoji: '🐻' },
  { name: 'Owl', color: 'bg-purple-500', emoji: '🦉' },
  { name: 'Rabbit', color: 'bg-pink-400', emoji: '🐰' },
  { name: 'Deer', color: 'bg-green-500', emoji: '🦌' },
  { name: 'Raccoon', color: 'bg-red-500', emoji: '🦝' },
];

export default function ElkoninBoxPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [boxCount, setBoxCount] = useState(0);
  const [chips, setChips] = useState<Array<{id: string; color: string; emoji: string} | null>>([]);
  const [selectedColor, setSelectedColor] = useState(ANIMAL_CHIPS[0]);
  const [boxes, setBoxes] = useState<Array<{color: string; emoji: string} | null>>([]);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState<number | null>(null);
  const [showBoxCount, setShowBoxCount] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [letterCase, setLetterCase] = useState<'uppercase' | 'lowercase'>('lowercase');
  const [letters, setLetters] = useState<Array<{letter: string; id: string} | null>>([]);

  // Initialize boxes when boxCount changes
  useEffect(() => {
    setBoxes(Array(boxCount).fill(null));
    setLetters(Array(boxCount).fill(null));
  }, [boxCount]);

  // Create draggable chips matching box count
  useEffect(() => {
    const newChips = Array(boxCount)
      .fill(0)
      .map((_, i) => ({
        id: `${Date.now()}-${i}`,
        color: selectedColor.color,
        emoji: selectedColor.emoji,
      }));
    setChips(newChips);
  }, [selectedColor, boxCount]);

  // Play sound effects with proper error handling
  const playSound = (type: 'reset' | 'record') => {
    try {
      if (typeof window === 'undefined') return;
      
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const audioContext = new AudioContext();
      
      // Resume audio context if it's suspended (modern browser requirement)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      
      if (type === 'reset') {
        // Bubble pop sound
        const noise = audioContext.createBufferSource();
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        noise.buffer = buffer;
        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.05);
        filter.Q.value = 10;
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        noise.start(audioContext.currentTime);
        noise.stop(audioContext.currentTime + 0.1);
        
        setTimeout(() => {
          const plopOsc = audioContext.createOscillator();
          const plopGain = audioContext.createGain();
          plopOsc.connect(plopGain);
          plopGain.connect(audioContext.destination);
          
          plopOsc.frequency.setValueAtTime(200, audioContext.currentTime);
          plopOsc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
          plopOsc.type = 'sine';
          plopGain.gain.setValueAtTime(0.1, audioContext.currentTime);
          plopGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          plopOsc.start(audioContext.currentTime);
          plopOsc.stop(audioContext.currentTime + 0.1);
        }, 50);
      }
    } catch (error) {
      console.log('Sound effect error:', error);
    }
  };

  const handleDrop = (index: number, chip: {color: string; emoji: string}) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index] = chip;
    setBoxes(updatedBoxes);
    setHoveredBoxIndex(null);
  };

  const resetAll = () => {
    playSound('reset');
    setBoxCount(0);
    setBoxes([]);
    setLetters([]);
    setChips([]);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100'
    }`}>
      {/* Header */}
      <header className={`shadow-xl p-4 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
          : 'bg-gradient-to-r from-emerald-400 to-teal-600'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <HomeButton className="-ml-20" />
            <div className="flex items-center space-x-3">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mt-1">
                <rect x="3" y="3" width="34" height="34" rx="5" ry="5" stroke="black" strokeWidth="2" fill="white"/>
                <circle cx="20" cy="20" r="12" fill="green" stroke="black" strokeWidth="1.5"/>
              </svg>
              <div>
                <h1 className="text-[2.75rem] font-bold text-white drop-shadow-2xl shadow-black/70" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8)'}}>
                  Sound Segmenting Made Simple
                </h1>
              </div>
            </div>
          </div>
          {/* Dark Mode Toggle */}
          <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full p-1 backdrop-blur-sm -mr-28 border border-white/40">
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
      
      <div className="max-w-7xl mx-auto px-8 py-4">
        {/* Main Container for all Elkonin Tools with gradient border */}
        <div className="relative">
          {/* Gradient border wrapper */}
          <div className={`p-2 rounded-3xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400' 
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
          }`} style={{
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            <div className={`backdrop-blur-sm rounded-3xl p-12 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800/90' 
                : 'bg-white/90'
            }`} style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
            }}>
          
          {/* Minimal Controls */}
          <div className="flex justify-center gap-8 mb-8">
            {/* Box Count Selector */}
            <div className="relative">
              <button
                onClick={() => setShowBoxCount(!showBoxCount)}
                className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-xl flex items-center justify-center text-lg font-bold text-white hover:shadow-2xl hover:scale-105 transition-all border-2 border-blue-700"
              >
                {boxCount === 0 ? 'Sounds' : boxCount}
              </button>
              {showBoxCount && (
                <div className={`absolute top-24 left-1/2 -translate-x-1/2 rounded-xl shadow-2xl p-3 z-10 border-2 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-500' 
                    : 'bg-white border-gray-200'
                }`}>
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setBoxCount(n);
                        setShowBoxCount(false);
                      }}
                      className={`block w-14 h-14 rounded-lg font-bold text-2xl transition-colors ${
                        darkMode 
                          ? 'text-gray-100 hover:bg-gray-600' 
                          : 'text-gray-800 hover:bg-blue-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Selector with Halo */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`w-20 h-20 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-4 border-gray-800 ${selectedColor.color} z-20 relative`}
              />
              {showColorPicker && (
                <div className="absolute inset-0 z-10">
                  {ANIMAL_CHIPS.map((chip, index) => {
                    const angle = (index * 360) / ANIMAL_CHIPS.length;
                    const radius = 50; // Distance from center
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <button
                        key={chip.name}
                        onClick={() => {
                          setSelectedColor(chip);
                          setShowColorPicker(false);
                        }}
                        className={`absolute w-12 h-12 rounded-full ${chip.color} hover:scale-125 transition-all duration-200 border-3 border-white shadow-lg z-30`}
                        style={{
                          left: `calc(50% + ${x}px - 24px)`,
                          top: `calc(50% + ${y}px - 24px)`,
                          transform: showColorPicker ? 'scale(1)' : 'scale(0)',
                          transitionDelay: `${index * 50}ms`,
                        }}
                        title={chip.name}
                      />
                    );
                  })}
                  
                  {/* Connecting lines for halo effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="50"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={resetAll}
              className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-gray-700"
            >
              <span className="text-3xl text-white">↻</span>
            </button>
          </div>

          {/* Elkonin Boxes - Large and Centered */}
          <div className="flex justify-center mb-16">
            <div className="flex min-h-[120px]">
              {boxes.map((_, index) => (
                <div
                  key={index}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoveredBoxIndex(index);
                  }}
                  onDragLeave={() => setHoveredBoxIndex(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    try {
                      const chipData = e.dataTransfer.getData('chipData');
                      const fromBox = e.dataTransfer.getData('fromBox');
                      const chipIndex = e.dataTransfer.getData('chipIndex');
                      const letterData = e.dataTransfer.getData('letter');
                      
                      if (letterData) {
                        // Handle letter drop
                        const letter = JSON.parse(letterData);
                        if (boxes[index]) {
                          const updatedLetters = [...letters];
                          updatedLetters[index] = letter;
                          setLetters(updatedLetters);
                        }
                      } else if (chipData) {
                        const chip = JSON.parse(chipData);
                        handleDrop(index, chip);
                        
                        // If dragging from another box, clear that box
                        if (fromBox !== '') {
                          const oldIndex = parseInt(fromBox);
                          const updatedBoxes = [...boxes];
                          updatedBoxes[oldIndex] = null;
                          setBoxes(updatedBoxes);
                        }
                        
                        // If dragging from available chips to its corresponding box, remove that chip
                        if (chipIndex !== '') {
                          const chipIdx = parseInt(chipIndex);
                          // Only remove if dropped in the corresponding box (chipIndex matches box index)
                          if (chipIdx === index) {
                            const newChips = [...chips];
                            newChips[chipIdx] = null;
                            setChips(newChips);
                          }
                        }
                      }
                    } catch (error) {
                      console.error('Error handling drop:', error);
                    }
                  }}
                  className={`relative w-48 h-48 border-4 flex items-center justify-center transition-all ${
                    index !== boxes.length - 1 ? 'border-r-2' : ''
                  } ${
                    darkMode 
                      ? `border-gray-400 ${hoveredBoxIndex === index ? 'bg-gray-600' : 'bg-gray-700'}` 
                      : `border-gray-800 ${hoveredBoxIndex === index ? 'bg-purple-50' : 'bg-white'}`
                  }`}
                  style={{
                    boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  
                  {boxes[index] && (
                    <div
                      className={`w-40 h-40 rounded-full cursor-grab border-4 border-black ${boxes[index]?.color} relative flex items-center justify-center`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('fromBox', index.toString());
                        e.dataTransfer.setData('chipData', JSON.stringify(boxes[index]!));
                        e.dataTransfer.setData('chipIndex', '');
                      }}
                    >
                      {letters[index] && (
                        <span className={`text-8xl font-bold drop-shadow-2xl select-none ${
                          'aeiou'.includes(letters[index]?.letter || '') ? 'text-red-500' : 'text-white'
                        }`} style={{ fontFamily: 'Quicksand, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', lineHeight: '1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-52%, -55%)' }}>
                          {letterCase === 'uppercase' ? letters[index]?.letter.toUpperCase() : letters[index]?.letter}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Chips - Centered under boxes */}
          <div className="flex justify-center">
            <div className="flex min-h-[80px]">
              {Array(boxCount).fill(0).map((_, chipIndex) => (
                <div key={chipIndex} className="w-48 h-20 flex items-center justify-center">
                  {chips[chipIndex] && (
                    <div
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('chipData', JSON.stringify(chips[chipIndex]!));
                        e.dataTransfer.setData('fromBox', '');
                        e.dataTransfer.setData('chipIndex', chipIndex.toString());
                      }}
                      className={`w-40 h-40 rounded-full cursor-grab shadow-lg hover:shadow-xl transition-shadow border-4 border-black ${chips[chipIndex]?.color}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Alphabet Strip with Toggle */}
        <div className="mt-4 relative">
          {/* Toggle Switch - Outside Container */}
          <div className="absolute -right-16 top-0 h-full">
            <label className={`flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-lg h-full w-12 border-2 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700/90 border-gray-500' 
                : 'bg-emerald-50/95 border-emerald-500'
            }`}>
              <span className={`text-xs font-bold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                ABC
              </span>
              <div className="relative rotate-90">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={letterCase === 'uppercase'}
                  onChange={() => setLetterCase(letterCase === 'uppercase' ? 'lowercase' : 'uppercase')}
                />
                <div className={`block w-8 h-4 rounded-full transition-colors ${
                  letterCase === 'uppercase' ? 'bg-emerald-600' : 'bg-gray-400'
                }`}></div>
                <div className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform ${
                  letterCase === 'uppercase' ? 'translate-x-4' : ''
                }`}></div>
              </div>
              <span className={`text-xs font-bold mt-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                abc
              </span>
            </label>
          </div>
          
          {/* Alphabet Container */}
          <div className={`backdrop-blur-sm rounded-2xl shadow-lg border-2 p-4 transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-700/90 border-gray-500' 
              : 'bg-white/90 border-blue-300'
          }`}>
            {/* Alphabet Letters */}
            <div className="flex flex-wrap justify-center gap-3">
            {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => {
              const isVowel = 'aeiou'.includes(letter);
              return (
                <div
                  key={letter}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('letter', JSON.stringify({
                      letter: letter,
                      id: `${letter}-${Date.now()}`
                    }));
                  }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-grab hover:scale-110 transition-all border-2 ${
                    isVowel 
                      ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-700' 
                      : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700'
                  }`}
                  style={{ 
                    fontFamily: 'Quicksand, sans-serif',
                    boxShadow: '0 10px 35px -8px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {letterCase === 'uppercase' ? letter.toUpperCase() : letter}
                </div>
              );
            })}
            </div>
          </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Activity Completion Tracking */}
      <ActivityCompletion activityType="elkonin_box" />
    </div>
  );
}