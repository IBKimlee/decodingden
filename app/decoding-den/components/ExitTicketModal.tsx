// 🎟️ EXIT TICKET MODAL
// Simple assessment modal for phoneme mastery checking

import { useState } from 'react';
import { getEnhancedPhonemeData } from '../../../lib/contentGeneration/uiIntegration';

interface ExitTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  phonemeData: any;
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'identification' | 'self_assessment';
  question: string;
  options?: string[];
  correctAnswers?: string[];
  points: number;
}

interface StudentResponse {
  questionId: string;
  answer: string | string[];
  correct?: boolean;
}

export default function ExitTicketModal({ isOpen, onClose, phonemeData }: ExitTicketModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<StudentResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  if (!isOpen || !phonemeData) return null;

  const phoneme = phonemeData.phoneme.ipa_symbol;
  
  // Get enhanced data for smarter question generation
  const enhancedData = getEnhancedPhonemeData(phoneme);
  const stage = enhancedData?.stage || 1;

  // Generate simple questions based on phoneme and stage
  const generateQuestions = (): Question[] => {
    const baseQuestions: Question[] = [];

    // Question 1: Sound Identification
    if (phoneme === '/sh/') {
      baseQuestions.push({
        id: 'identify',
        type: 'multiple_choice',
        question: `Which word has the ${phoneme} sound?`,
        options: ['shop', 'stop', 'step', 'slip'],
        correctAnswers: ['shop'],
        points: 1
      });
    } else if (phoneme === '/th/') {
      baseQuestions.push({
        id: 'identify',
        type: 'multiple_choice',
        question: `Which word has the ${phoneme} sound?`,
        options: ['think', 'sink', 'pink', 'link'],
        correctAnswers: ['think'],
        points: 1
      });
    } else {
      // Generic question for other phonemes
      baseQuestions.push({
        id: 'identify',
        type: 'multiple_choice',
        question: `I can hear the ${phoneme} sound in words:`,
        options: ['Always', 'Sometimes', 'Need help', 'Not sure'],
        correctAnswers: ['Always', 'Sometimes'], // Self-assessment, multiple correct
        points: 1
      });
    }

    // Question 2: Spelling Recognition  
    const commonSpelling = enhancedData?.spellings?.mostCommon || phoneme.replace(/\//g, '');
    baseQuestions.push({
      id: 'spelling',
      type: 'multiple_choice',
      question: `Which letters make the ${phoneme} sound?`,
      options: [commonSpelling, 'ch', 'th', 'ph'],
      correctAnswers: [commonSpelling],
      points: 1
    });

    // Question 3: Self-Assessment
    baseQuestions.push({
      id: 'confidence',
      type: 'self_assessment',
      question: `How confident are you with the ${phoneme} sound?`,
      options: ['😊 Very confident', '🙂 Pretty confident', '😐 Need more practice', '😟 Need help'],
      points: 1
    });

    return baseQuestions;
  };

  const questions = generateQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save response
    const newResponse: StudentResponse = {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      correct: currentQuestion.correctAnswers?.includes(selectedAnswer) || currentQuestion.type === 'self_assessment'
    };

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }
    
    setResponses(updatedResponses);

    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Restore previous answer if exists
      const previousResponse = responses.find(r => r.questionId === questions[currentQuestionIndex - 1].id);
      setSelectedAnswer(previousResponse?.answer as string || '');
    }
  };

  const handleSubmitForApproval = () => {
    // Here we would normally save to Supabase as 'pending' status
    // For now, just show completion message
    alert('Exit ticket completed! Waiting for teacher approval...');
    onClose();
    // Reset state
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
    setSelectedAnswer('');
  };

  const calculateScore = () => {
    const correctCount = responses.filter(r => r.correct).length;
    return Math.round((correctCount / questions.length) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎟️</span>
              <div>
                <h2 className="text-lg font-bold">Exit Ticket</h2>
                <p className="text-sm opacity-90">{phoneme} Sound Check</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="p-6">
          {!isCompleted ? (
            /* Question Display */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === option && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLastQuestion ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          ) : (
            /* Completion Screen */
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Exit Ticket Complete!
                </h3>
                <p className="text-gray-600 mb-4">
                  You answered {responses.filter(r => r.correct).length} out of {questions.length} questions correctly
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">
                    📊 Score: {calculateScore()}%
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⏳</span>
                  <div className="text-left">
                    <p className="font-medium text-yellow-800">Waiting for Teacher Approval</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your teacher will review your answers before saving your progress.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmitForApproval}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium"
              >
                Submit for Teacher Approval
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}