'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSimpleAudio } from '@/app/lib/simpleAudio';

interface PhonemeKey {
  letter: string;
  phoneme: string;
  example: string;
}

interface DraggedLetter {
  id: string;
  letter: string;
  x: number;
  y: number;
  zIndex: number;
}

interface PhonemeKeyboardProps {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
  currentPosition: number;
  setCurrentPosition: (position: number) => void;
  draggedLetters: DraggedLetter[];
  setDraggedLetters: (letters: DraggedLetter[]) => void;
  nextZIndex: number;
  setNextZIndex: (index: number) => void;
  wordsOnPaper: {lineIndex: number, word: string}[];
  dragOverLine: number | null;
  handleLineDrop: (e: React.DragEvent, lineIndex: number) => void;
  handleLineDragOver: (e: React.DragEvent, lineIndex: number) => void;
  handleLineDragLeave: () => void;
  clearWritingPaper: () => void;
  customStyles?: {
    paperContainerWidth?: string;
    paperContainerMarginTop?: string;
  };
  selectedMascot?: string;
}

export default function PhonemeKeyboard({ selectedLetters, setSelectedLetters, currentPosition, setCurrentPosition, draggedLetters, setDraggedLetters, nextZIndex, setNextZIndex, wordsOnPaper, dragOverLine, handleLineDrop, handleLineDragOver, handleLineDragLeave, clearWritingPaper, customStyles, selectedMascot }: PhonemeKeyboardProps) {
  const [showPhoneme, setShowPhoneme] = useState(false);
  const [mascotShaking, setMascotShaking] = useState(false);
  const prevWordsCountRef = useRef(wordsOnPaper.length);
  
  // Use simplified audio system
  const { playEraser } = useSimpleAudio();

  // Watch for new words being added and trigger shake animation
  useEffect(() => {
    if (wordsOnPaper.length > prevWordsCountRef.current) {
      setMascotShaking(true);
      setTimeout(() => setMascotShaking(false), 500); // Shake for 500ms like whiteboard
    }
    prevWordsCountRef.current = wordsOnPaper.length;
  }, [wordsOnPaper.length]);

  // Phoneme data for each letter
  const phonemeData: { [key: string]: PhonemeKey } = {
    a: { letter: 'a', phoneme: 'ă or ā', example: 'cat, cake' },
    b: { letter: 'b', phoneme: 'b', example: 'ball' },
    c: { letter: 'c', phoneme: 'k or s', example: 'cat, city' },
    d: { letter: 'd', phoneme: 'd', example: 'dog' },
    e: { letter: 'e', phoneme: 'ĕ or ē', example: 'bed, be' },
    f: { letter: 'f', phoneme: 'f', example: 'fish' },
    g: { letter: 'g', phoneme: 'g or j', example: 'go, gem' },
    h: { letter: 'h', phoneme: 'h', example: 'hat' },
    i: { letter: 'i', phoneme: 'ĭ or ī', example: 'sit, kite' },
    j: { letter: 'j', phoneme: 'j', example: 'jump' },
    k: { letter: 'k', phoneme: 'k', example: 'kite' },
    l: { letter: 'l', phoneme: 'l', example: 'lion' },
    m: { letter: 'm', phoneme: 'm', example: 'moon' },
    n: { letter: 'n', phoneme: 'n', example: 'nest' },
    o: { letter: 'o', phoneme: 'ŏ or ō', example: 'hot, home' },
    p: { letter: 'p', phoneme: 'p', example: 'pen' },
    q: { letter: 'q', phoneme: 'kw', example: 'queen' },
    r: { letter: 'r', phoneme: 'r', example: 'run' },
    s: { letter: 's', phoneme: 's or z', example: 'sun, rose' },
    t: { letter: 't', phoneme: 't', example: 'top' },
    u: { letter: 'u', phoneme: 'ŭ or ū', example: 'cup, cute' },
    v: { letter: 'v', phoneme: 'v', example: 'van' },
    w: { letter: 'w', phoneme: 'w', example: 'web' },
    x: { letter: 'x', phoneme: 'ks or gz', example: 'fox, exact' },
    y: { letter: 'y', phoneme: 'y or ī', example: 'yes, fly' },
    z: { letter: 'z', phoneme: 'z', example: 'zoo' }
  };

  const handleLetterClick = (letter: string) => {
    console.log('Letter clicked:', letter);
    console.log('Current selectedLetters:', selectedLetters);
    // Find first empty position
    const emptyIndex = selectedLetters.findIndex(l => l === '');
    console.log('Empty index found:', emptyIndex);
    if (emptyIndex !== -1) {
      const newLetters = [...selectedLetters];
      newLetters[emptyIndex] = letter;
      console.log('New letters array:', newLetters);
      setSelectedLetters(newLetters);
      setCurrentPosition(emptyIndex < 5 ? emptyIndex + 1 : 5);
    }
  };

  // Handle drag start with proper drag image
  const handleDragStart = (e: React.DragEvent, letter: string) => {
    // Create a custom drag image to fix visibility issues
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      width: 85px;
      height: 85px;
      background: linear-gradient(to bottom right, #3b82f6, #10b981);
      color: white;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.875rem;
      font-weight: bold;
      outline: 3px solid black;
      position: absolute;
      top: -1000px;
      left: -1000px;
      pointer-events: none;
    `;
    dragImage.textContent = letter;
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 42, 42);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', letter);
    
    // Clean up drag image
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
  };


  // Play sound function (placeholder - would need actual audio files)
  const playSound = (letter: string) => {
    // In a real implementation, this would play the phoneme sound
    console.log(`Playing sound for ${letter}: ${phonemeData[letter]?.phoneme}`);
  };

  // Function to render the selected mascot
  const renderMascot = () => {
    switch (selectedMascot) {
      case 'forest':
        return (
          <Image 
            src="/images/dhole.png" 
            alt="Dhole" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      case 'squirrel':
        return (
          <Image 
            src="/images/raccoon.png" 
            alt="Raccoon" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      case 'mountain':
        return null;
      case 'mixed':
        return (
          <Image 
            src="/images/wombat.png" 
            alt="Wombat" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      case 'placeholder1':
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      case 'placeholder2':
        return (
          <Image 
            src="/images/meerkat.png" 
            alt="Meerkat" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      case 'placeholder3':
        return (
          <Image 
            src="/images/hedgehog.png" 
            alt="Hedgehog" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
      default:
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={120} 
            height={120} 
            className="mx-auto"
          />
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 -ml-8 relative min-h-[600px]">
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
        `}
      </style>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Interactive Keyboard (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg pb-4 pt-2 pl-2 pr-2 -mt-8">

          {/* Alphabet Keyboard */}
          <div className="grid grid-cols-7 gap-3 p-2">
            {Object.values(phonemeData).map((data) => (
              <div
                key={data.letter}
                draggable
                onDragStart={(e) => handleDragStart(e, data.letter)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('CLICK DETECTED on letter:', data.letter);
                  handleLetterClick(data.letter);
                  playSound(data.letter);
                }}
                className="relative group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg select-none flex items-center justify-center" 
                  style={{width: "85px", height: "85px", outline: "3px solid black"}}>
                  <div className={`text-6xl ${['a', 'e', 'i', 'o', 'u'].includes(data.letter) ? 'text-red-500 drop-shadow-lg' : 'text-white'}`} style={['a', 'e', 'i', 'o', 'u'].includes(data.letter) ? {WebkitTextStroke: '2px black'} : {WebkitTextStroke: '2px black'}}>{data.letter}</div>
                  
                  {/* Phoneme tooltip */}
                  {showPhoneme && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-deepNavy text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      {data.phoneme}
                      <div className="text-gray-300">{data.example}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Show/Hide Hints Button */}
            <button
              onClick={() => setShowPhoneme(!showPhoneme)}
              className="bg-gradient-to-b from-gray-400 to-gray-600 text-white rounded-lg p-5 hover:from-gray-500 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-center flex flex-col items-center justify-center"
              style={{width: "85px", height: "85px", outline: "3px solid black"}}
            >
              <div className="text-3xl font-bold mb-1">
                {showPhoneme ? '👀' : (
                  <svg width="48" height="24" viewBox="0 0 32 16" fill="none" className="mx-auto">
                    {/* Left closed eye */}
                    <path d="M2 4 Q7 8 12 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    {/* Left eyelashes pointing down */}
                    <line x1="3" y1="5.5" x2="2" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="7" x2="6" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11" y1="5.5" x2="10" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    
                    {/* Right closed eye */}
                    <path d="M20 4 Q25 8 30 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    {/* Right eyelashes pointing down */}
                    <line x1="21" y1="5.5" x2="20" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="25" y1="7" x2="24" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="29" y1="5.5" x2="28" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </button>
          </div>

        </div>

        {/* Right Column - Lined Paper (1/4 width) */}
        <div 
          className="bg-white rounded-xl shadow-2xl border-2 border-blue-500 pt-4 px-4 pb-0" 
          style={{
            marginTop: customStyles?.paperContainerMarginTop || "-240px",
            width: customStyles?.paperContainerWidth || "auto"
          }}
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-3xl font-bold text-oceanBlue pt-4 pb-3">
              My Word List
            </h2>
            <button
              onClick={() => {
                clearWritingPaper();
                playEraser();
              }}
              className="hover:scale-110 transition-transform duration-200 cursor-pointer p-2"
              title="Clear writing practice paper"
            >
              <div className="relative w-16 h-8 bg-gradient-to-b from-blue-100 to-blue-200 rounded-sm border-2 border-blue-300 shadow-lg">
                {/* Felt Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-sm"></div>
                
                {/* Texture Lines */}
                <div className="absolute top-1 left-1 right-1 space-y-0.5">
                  <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                  <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                  <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                </div>
                
                {/* Brand Label */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-700 font-bold">E</div>
              </div>
            </button>
          </div>
          
          {/* Lined Paper */}
          <div className="h-[530px] w-full bg-white rounded-lg relative">
            {/* Selected Mascot in bottom right corner */}
            {selectedMascot && (
              <div 
                className="absolute bottom-2 -right-2 z-10"
                style={{
                  animation: mascotShaking ? 'shake 0.5s ease-in-out' : 'none'
                }}
              >
                {renderMascot()}
              </div>
            )}
            
            {/* Paper lines */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Writing lines */}
              {Array.from({ length: 11 }).map((_, index) => {
                return (
                  <div key={index}>
                    {/* Line */}
                    <div 
                      className={`absolute left-0 right-0 h-px ${index === 0 ? 'bg-red-400' : 'bg-blue-300'}`}
                      style={{ top: `${30 + (index * 50)}px` }}
                    ></div>
                    
                    {/* Drop zone between lines (not above red line) */}
                    {index > 0 && (
                      <div
                        className="absolute left-0 right-0"
                        style={{ 
                          top: `${30 + ((index - 1) * 50)}px`,
                          height: '50px'
                        }}
                        onDrop={(e) => handleLineDrop(e, index - 1)}
                        onDragOver={(e) => handleLineDragOver(e, index - 1)}
                        onDragLeave={handleLineDragLeave}
                      >
                        {/* Word display between lines */}
                        {wordsOnPaper.find(w => w.lineIndex === index - 1) && (
                          <div 
                            className="absolute left-2"
                            style={{ top: '5px' }}
                          >
                            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black rounded-lg shadow-xl flex items-center justify-center text-2xl font-bold select-none px-3 py-1"
                              style={{outline: "2px solid black", minWidth: "80px", height: "40px"}}>
                              {wordsOnPaper.find(w => w.lineIndex === index - 1)?.word}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}