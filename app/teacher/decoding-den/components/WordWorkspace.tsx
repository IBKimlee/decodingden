'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DecodingDenPhonemeKeyboard from './DecodingDenPhonemeKeyboard';
import { useSimpleAudio } from '@/app/lib/simpleAudio';

interface PhonemeData {
  phoneme: {
    id: string;
    ipa_symbol: string;
    common_name: string;
    phoneme_type: string;
    frequency_rank: number;
    is_voiced: boolean;
  };
  graphemes: Array<{
    id: string;
    grapheme: string;
    spelling_frequency: number;
    notes?: string;
  }>;
  articulation: {
    place_of_articulation: string;
    manner_of_articulation: string;
    voicing: string;
    tongue_position: string;
    lip_position: string;
    airflow_description: string;
    step_by_step_instructions: string[];
    common_errors: string[];
    teacher_tips: string[];
  } | null;
  teaching_content: {
    explanations: Array<{ content: string; icon_emoji: string }>;
    rules: Array<{ content: string; icon_emoji: string }>;
    tips: Array<{ content: string; icon_emoji: string }>;
  };
  word_lists: {
    [grapheme: string]: {
      beginning: string[];
      medial: string[];
      ending: string[];
    };
  };
  practice_texts: {
    sentences: string[];
    stories: string[];
    word_ladders: string[];
  };
  research_citations: Array<{
    source_name: string;
    citation_text: string;
    url?: string;
  }>;
}

interface WordWorkspaceProps {
  phonemeData?: PhonemeData;
  onClose?: () => void;
}

interface DraggedLetter {
  id: string;
  letter: string;
  x: number;
  y: number;
  zIndex: number;
}

export default function WordWorkspace({ phonemeData, onClose }: WordWorkspaceProps) {
  const [selectedLetters, setSelectedLetters] = useState<(string | {letter: string, styled: boolean})[]>(['', '', '', '', '', '']);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedLetters, setDraggedLetters] = useState<DraggedLetter[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [builtWord, setBuiltWord] = useState<{id: string, word: string, x: number, y: number} | null>(null);
  const [wordsOnPaper, setWordsOnPaper] = useState<{lineIndex: number, word: string}[]>([]);
  const [dragOverLine, setDragOverLine] = useState<number | null>(null);
  const [selectedMascot, setSelectedMascot] = useState('placeholder1');
  
  // Use simplified audio system
  const { playClear, playWordBuilt, playWordList } = useSimpleAudio();

  // Load selected mascot from localStorage
  useEffect(() => {
    const savedMascot = localStorage.getItem('selectedMascot');
    if (savedMascot) {
      setSelectedMascot(savedMascot);
    }
  }, []);


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

  // Build word from word boxes
  const buildWord = () => {
    const word = selectedLetters
      .map(item => typeof item === 'object' ? item.letter : item)
      .filter(letter => letter !== '')
      .join('');
    
    if (word.length > 0) {
      const newBuiltWord = {
        id: `word-${Date.now()}`,
        word,
        x: 73,
        y: 135,
      };
      setBuiltWord(newBuiltWord);
      playWordBuilt();
    }
  };

  // Handle dragging built word
  const handleWordDragStart = (e: React.DragEvent) => {
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
      setBuiltWord(null);
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

  // Function to render the selected mascot
  const renderMascot = () => {
    switch (selectedMascot) {
      case 'forest':
        return (
          <Image 
            src="/images/dhole.png" 
            alt="Dhole" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'squirrel':
        return (
          <Image 
            src="/images/raccoon.png" 
            alt="Raccoon" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'mountain':
          return (
          <Image 
            src="/images/armadillo.png" 
            alt="Armadillo" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'mixed':
        return (
          <Image 
            src="/images/wolf.png" 
            alt="Wolf" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'placeholder1':
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'placeholder2':
        return (
          <Image 
            src="/images/meerkat.png" 
            alt="Meerkat" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      case 'placeholder3':
        return (
          <Image 
            src="/images/hedgehog.png" 
            alt="Hedgehog" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
      default:
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={60} 
            height={60} 
            className="mx-auto"
          />
        );
    }
  };

  return (
    <div 
      className="relative rounded-lg p-6"
      style={{ backgroundColor: '#E0E7FF' }}
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

      {/* Word Building Area */}
      <div className="max-w-full mx-auto">
        <div className="flex justify-start">
          <div className="w-full">
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
                    setDragOverIndex(null);
                    setBuiltWord(null);
                    playClear();
                  }}
                  className="px-6 py-3 bg-teal-500 text-white rounded-xl font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Clear
                </button>

                {/* Build Word button */}
                <button
                  onClick={buildWord}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold text-lg hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
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

            {/* DecodingDenPhonemeKeyboard - completely separate from student version */}
            <div className="w-full">
              <DecodingDenPhonemeKeyboard
                selectedLetters={selectedLetters.map(letter => 
                  typeof letter === 'object' && letter !== null ? letter.letter : letter || ''
                )}
                setSelectedLetters={(letters: string[]) => setSelectedLetters(letters)}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}