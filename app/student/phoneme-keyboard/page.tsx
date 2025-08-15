'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PhonemeKeyboard from '@/app/components/PhonemeKeyboard';
import HomeButton from '@/app/components/HomeButton';
import { useSimpleAudio } from '@/app/lib/simpleAudio';

export default function PhonemeKeyboardPage() {
  const [selectedLetters, setSelectedLetters] = useState<(string | {letter: string, styled: boolean})[]>(['', '', '', '', '', '']);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Use simplified audio system
  const { playClear, playWordBuilt, playWordList } = useSimpleAudio();
  interface DraggedLetter {
    id: string;
    letter: string;
    x: number;
    y: number;
    zIndex: number;
  }
  
  const [draggedLetters, setDraggedLetters] = useState<DraggedLetter[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [builtWord, setBuiltWord] = useState<{id: string, word: string, x: number, y: number} | null>(null);
  const [wordsOnPaper, setWordsOnPaper] = useState<{lineIndex: number, word: string}[]>([]);
  const [dragOverLine, setDragOverLine] = useState<number | null>(null);
  const [selectedMascot, setSelectedMascot] = useState('placeholder1');

  // Load selected mascot from localStorage
  useEffect(() => {
    const savedMascot = localStorage.getItem('selectedMascot');
    if (savedMascot) {
      setSelectedMascot(savedMascot);
    }
  }, []);

  // Function to render the selected mascot
  const renderMascot = () => {
    switch (selectedMascot) {
      case 'forest':
        return (
          <Image 
            src="/images/dhole.png" 
            alt="Dhole" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'squirrel':
        return (
          <Image 
            src="/images/raccoon.png" 
            alt="Raccoon" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'mountain':
        return (
          <Image 
            src="/images/armadillo.png" 
            alt="Armadillo" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'mixed':
        return (
          <Image 
            src="/images/wombat.png" 
            alt="Wombat" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'placeholder1':
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'placeholder2':
        return (
          <Image 
            src="/images/meerkat.png" 
            alt="Meerkat" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      case 'placeholder3':
        return (
          <Image 
            src="/images/hedgehog.png" 
            alt="Hedgehog" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
      default:
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        );
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const letter = e.dataTransfer.getData('text/plain');
    if (letter) {
      const newLetters = [...selectedLetters];
      newLetters[index] = {letter: letter, styled: true};
      setSelectedLetters(newLetters);
      setCurrentPosition(index < 5 ? index + 1 : 5);
    }
    setDragOverIndex(null);
  };

  const handleBoxClick = (index: number) => {
    setCurrentPosition(index);
  };

  // Handle drop anywhere in the workspace for floating letters
  const handleWorkspaceDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const floatingLetterId = e.dataTransfer.getData('floatingLetterId');
    const letter = e.dataTransfer.getData('text/plain');
    
    if (floatingLetterId) {
      // Moving an existing floating letter
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 42;
      const y = e.clientY - rect.top - 42;
      
      setDraggedLetters(draggedLetters.map(l => 
        l.id === floatingLetterId 
          ? { ...l, x, y, zIndex: nextZIndex }
          : l
      ));
      setNextZIndex(nextZIndex + 1);
    } else if (letter && !floatingLetterId) {
      // Creating a new floating letter from keyboard
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 42;
      const y = e.clientY - rect.top - 42;
      
      const newLetter = {
        id: `${letter}-${Date.now()}-${Math.random()}`,
        letter,
        x,
        y,
        zIndex: nextZIndex
      };
      
      setDraggedLetters([...draggedLetters, newLetter]);
      setNextZIndex(nextZIndex + 1);
    }
  };

  // Handle dragging floating letters
  const handleFloatingDragStart = (e: React.DragEvent, letterId: string, letter: string) => {
    e.dataTransfer.setData('floatingLetterId', letterId);
    e.dataTransfer.setData('text/plain', letter);
  };

  // Clear all floating letters
  const clearFloatingLetters = () => {
    setDraggedLetters([]);
  };

  // Build word from word boxes
  const buildWord = () => {
    console.log('Building word, selectedLetters:', selectedLetters);
    const word = selectedLetters
      .map(item => typeof item === 'object' ? item.letter : item)
      .filter(letter => letter !== '')
      .join('');
    
    console.log('Built word:', word);
    if (word.length > 0) {
      // Position the built word directly over the word boxes
      const newBuiltWord = {
        id: `word-${Date.now()}`,
        word,
        x: 180, // Centered over the word boxes area
        y: 280, // Just above the word boxes
      };
      console.log('Setting built word:', newBuiltWord);
      setBuiltWord(newBuiltWord);
      playWordBuilt();
      // Don't clear selectedLetters - keep them for building more words!
    } else {
      console.log('No word to build - selectedLetters empty or all empty strings');
    }
  };

  // Handle dragging built word
  const handleWordDragStart = (e: React.DragEvent) => {
    console.log('Built word drag started!', builtWord);
    e.stopPropagation();
    if (builtWord) {
      e.dataTransfer.setData('builtWord', builtWord.id);
      e.dataTransfer.setData('wordText', builtWord.word);
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  // Handle word drop on writing lines
  const handleLineDrop = (e: React.DragEvent, lineIndex: number) => {
    e.preventDefault();
    const wordText = e.dataTransfer.getData('wordText');
    
    if (wordText && !wordsOnPaper.find(w => w.lineIndex === lineIndex)) {
      setWordsOnPaper([...wordsOnPaper, { lineIndex, word: wordText }]);
      setBuiltWord(null); // Remove the floating word
      playWordList(); // Play different sound for word list drops
    }
    setDragOverLine(null);
  };

  // Handle drag over writing lines
  const handleLineDragOver = (e: React.DragEvent, lineIndex: number) => {
    e.preventDefault();
    if (!wordsOnPaper.find(w => w.lineIndex === lineIndex)) {
      setDragOverLine(lineIndex);
    }
  };

  const handleLineDragLeave = () => {
    setDragOverLine(null);
  };

  // Clear writing practice paper
  const clearWritingPaper = () => {
    setWordsOnPaper([]);
  };

  return (
    <div 
      className={`min-h-screen relative transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
      onDrop={handleWorkspaceDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Floating letters */}
      {draggedLetters.map((letter) => (
        <div
          key={letter.id}
          draggable
          onDragStart={(e) => handleFloatingDragStart(e, letter.id, letter.letter)}
          className="absolute cursor-move z-50"
          style={{
            left: `${letter.x}px`,
            top: `${letter.y}px`,
            zIndex: letter.zIndex
          }}
        >
          <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-6xl select-none ${['a', 'e', 'i', 'o', 'u'].includes(letter.letter) ? 'text-red-500 drop-shadow-lg' : 'text-black'}`}
            style={{width: "85px", height: "85px", outline: "3px solid black", WebkitTextStroke: '2px black'}}>
            {letter.letter}
          </div>
        </div>
      ))}

      {/* Built word (draggable) */}
      {builtWord && (
        <div
          key={builtWord.id}
          draggable={true}
          onDragStart={handleWordDragStart}
          className="absolute cursor-grab hover:cursor-grabbing z-[9999]"
          style={{
            left: `${builtWord.x}px`,
            top: `${builtWord.y}px`,
          }}
          title="Drag this word to a writing line"
        >
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center text-4xl font-bold select-none px-4 py-2"
            style={{outline: "3px solid black", minWidth: "120px", height: "60px"}}>
            {builtWord.word}
          </div>
        </div>
      )}

      {/* Header - matching the Sound Keyboard button gradient */}
      <header className="bg-gradient-to-br from-purple-500 to-blue-600 shadow-2xl border-b-4 border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center space-x-4">
              <HomeButton className="-ml-20" />
              <div>
                <h1 className="text-4xl font-bold text-white drop-shadow-2xl flex items-center">
                  <Image 
                    src="/images/word workspace.png" 
                    alt="Word Workspace" 
                    width={80} 
                    height={80} 
                    className="mr-3 pt-2"
                  />
                  Word Workspace
                </h1>
                <p className="text-indigo-100 text-lg -mt-5 ml-24">Build, blend, and break apart words</p>
              </div>
            </div>
            
            
            {/* Dark Mode Toggle */}
            <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full p-1 backdrop-blur-sm ml-auto -mr-16 border border-white/40">
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
        </div>
      </header>

      {/* Yellow accent bar with fade to gray */}
      <div className="h-8 bg-gradient-to-b from-yellow-100 to-gray-100"></div>

      {/* Word Building Area - no container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="flex justify-start">
          <div className="lg:w-3/4 w-full">
            {/* Word boxes and Clear button */}
            <div className="flex justify-start items-start gap-6 mb-6">
              <div className="flex gap-0">
                {selectedLetters.map((letter, index) => (
                  <div
                    key={index}
                    onClick={() => handleBoxClick(index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    className={`w-28 h-28 border-3 flex items-center justify-center text-4xl font-bold cursor-pointer transition-all
                      ${currentPosition === index ? 'border-black bg-white' : 'border-black bg-white'}
                      ${dragOverIndex === index ? 'bg-blue-100 border-blue-500' : ''}
                      ${letter ? 'text-black' : 'text-gray-400'}`}
                    style={{
                      borderRight: index < 5 ? '1.5px solid black' : '3px solid black',
                      borderLeft: index === 0 ? '3px solid black' : '1.5px solid black',
                      borderTop: '3px solid black',
                      borderBottom: '3px solid black'
                    }}
                  >
                    {typeof letter === 'object' && letter.styled ? (
                      <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-6xl font-normal select-none ${['a', 'e', 'i', 'o', 'u'].includes(letter.letter) ? 'text-red-500 drop-shadow-lg' : 'text-black'}`} style={{width: "70px", height: "70px", outline: "2px solid black", WebkitTextStroke: '2px black'}}>
                        {letter.letter}
                      </div>
                    ) : (
                      typeof letter === 'string' ? letter : ''
                    )}
                  </div>
                ))}
              </div>
              
              {/* Clear and Build Word buttons stacked */}
              <div className="flex flex-col gap-2">
                {/* Clear button */}
                <button
                  onClick={() => {
                    setSelectedLetters(['', '', '', '', '', '']);
                    setCurrentPosition(0);
                    clearFloatingLetters();
                    playClear();
                  }}
                  className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center shadow-lg"
                  style={{outline: "3px solid black", width: "100px", height: "48px"}}
                >
                  Clear
                </button>
                
                {/* Build Word button */}
                <button
                  onClick={buildWord}
                  disabled={selectedLetters.every(letter => {
                    if (typeof letter === 'object') {
                      return letter.letter === '';
                    }
                    return letter === '';
                  })}
                  title={`Selected letters: [${selectedLetters.join(', ')}] - Disabled: ${selectedLetters.every(letter => letter === '')}`}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{outline: "3px solid black", width: "100px", height: "48px"}}
                >
                  Build Word
                </button>
              </div>
            </div>
            
            {/* Arrow line */}
            <div className="relative flex items-center justify-start mb-6" style={{width: "672px"}}>
              <div className="w-full h-3 bg-black rounded-full relative mx-4">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="black">
                    <path d="M0 0 L32 16 L0 32 Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhonemeKeyboard 
          selectedLetters={selectedLetters.map(item => typeof item === 'object' ? item.letter : item)}
          setSelectedLetters={(letters: string[]) => setSelectedLetters(letters as (string | {letter: string, styled: boolean})[])}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          draggedLetters={draggedLetters}
          setDraggedLetters={setDraggedLetters}
          nextZIndex={nextZIndex}
          setNextZIndex={setNextZIndex}
          wordsOnPaper={wordsOnPaper}
          dragOverLine={dragOverLine}
          handleLineDrop={handleLineDrop}
          handleLineDragOver={handleLineDragOver}
          handleLineDragLeave={handleLineDragLeave}
          clearWritingPaper={clearWritingPaper}
          selectedMascot={selectedMascot}
        />
      </main>
      
      {/* Attribution footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <p className="text-sm text-gray-600">
          Word building interface inspired by educational phonics research and tools from the Florida Center for Reading Research (FCRR)
        </p>
      </footer>
    </div>
  );
}