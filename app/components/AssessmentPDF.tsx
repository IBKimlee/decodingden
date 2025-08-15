'use client';

import React, { forwardRef } from 'react';
import { Assessment } from '../data/assessmentDatabase';

interface AssessmentPDFProps {
  assessment: Assessment;
  studentName?: string;
  teacherName?: string;
  date?: string;
  schoolName?: string;
}

const AssessmentPDF = forwardRef<HTMLDivElement, AssessmentPDFProps>(
  ({ assessment, studentName = "", teacherName = "", date = "", schoolName = "" }, ref) => {
    const formatDate = (dateStr: string) => {
      return dateStr || new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const getQuestionsByType = (type: string) => {
      return assessment.questions.filter(q => q.type === type);
    };

    return (
      <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto text-black print:shadow-none">
        {/* Header */}
        <div className="mb-8 border-b-4 border-oceanBlue pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-oceanBlue mb-2">🌟 Decoding Den</h1>
              <p className="text-sm text-gray-600">Science of Reading-Based Phonics Assessment</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>© 2025 Decoding Den. All rights reserved.</p>
              <p>Research-based assessment aligned with Science of Reading principles</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{assessment.title}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Student Name:</strong> {studentName || "_".repeat(30)}</p>
              <p><strong>Teacher:</strong> {teacherName || "_".repeat(25)}</p>
            </div>
            <div>
              <p><strong>Date:</strong> {date || "_".repeat(20)}</p>
              <p><strong>School:</strong> {schoolName || "_".repeat(25)}</p>
            </div>
          </div>
        </div>

        {/* Assessment Information */}
        <div className="mb-6 bg-warmBeige p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p><strong>Stage:</strong> {assessment.stage}</p>
              <p><strong>Week Range:</strong> {assessment.week_range}</p>
            </div>
            <div>
              <p><strong>Duration:</strong> {assessment.duration}</p>
              <p><strong>Total Points:</strong> {assessment.total_points}</p>
            </div>
            <div>
              <p><strong>Benchmark Score:</strong> {assessment.benchmark_score}</p>
              <p><strong>Phonemes Assessed:</strong> {assessment.phonemes_assessed.length}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-oceanBlue mb-3">Assessment Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-700 mb-2">For Teachers:</h4>
              <p>{assessment.instructions.teacher}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-700 mb-2">For Students:</h4>
              <p>{assessment.instructions.student}</p>
            </div>
          </div>
        </div>

        {/* Phonemes Assessed */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-oceanBlue mb-3">Phonemes Being Assessed</h3>
          <div className="grid grid-cols-5 gap-2">
            {assessment.phonemes_assessed.map((phoneme, index) => (
              <div key={index} className="text-center p-2 bg-creamyWhite rounded border">
                <span className="font-mono text-lg">{phoneme}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Questions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-oceanBlue mb-4">Assessment Items</h3>
          
          {/* Letter Identification */}
          {getQuestionsByType('letter_identification').length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">
                Letter Identification ({getQuestionsByType('letter_identification').length} items)
              </h4>
              <div className="grid grid-cols-5 gap-4">
                {getQuestionsByType('letter_identification').map((question, index) => (
                  <div key={question.id} className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold mb-2">{question.stimulus}</div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span>Correct:</span>
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phoneme Production */}
          {getQuestionsByType('phoneme_production').length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">
                Phoneme Production ({getQuestionsByType('phoneme_production').length} items)
              </h4>
              <div className="grid grid-cols-5 gap-4">
                {getQuestionsByType('phoneme_production').map((question, index) => (
                  <div key={question.id} className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold mb-2">{question.stimulus}</div>
                    <div className="text-sm text-gray-600 mb-2">Say the sound</div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span>Correct:</span>
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CVC Blending */}
          {getQuestionsByType('cvc_blending').length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">
                CVC Word Reading ({getQuestionsByType('cvc_blending').length} items)
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {getQuestionsByType('cvc_blending').map((question, index) => (
                  <div key={question.id} className="p-4 border rounded">
                    <div className="text-xl font-bold mb-2 text-center">{question.stimulus}</div>
                    <div className="text-sm text-gray-600 mb-2 text-center">Read this word</div>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>Correct:</span>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Incorrect:</span>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">Points: {question.points}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phoneme Segmentation */}
          {getQuestionsByType('phoneme_segmentation').length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">
                Phoneme Segmentation ({getQuestionsByType('phoneme_segmentation').length} items)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {getQuestionsByType('phoneme_segmentation').map((question, index) => (
                  <div key={question.id} className="p-4 border rounded">
                    <div className="text-lg font-bold mb-2">Word: <span className="text-oceanBlue">{question.stimulus}</span></div>
                    <div className="text-sm text-gray-600 mb-3">&quot;Tell me each sound in this word&quot;</div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm">Student Response:</span>
                      <div className="flex-1 border-b border-gray-400"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span>Correct:</span>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      </div>
                      <div className="text-xs text-gray-500">Expected: {question.expected_response}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spelling */}
          {getQuestionsByType('spelling').length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 bg-gray-100 p-2 rounded">
                Spelling ({getQuestionsByType('spelling').length} items)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {getQuestionsByType('spelling').map((question, index) => (
                  <div key={question.id} className="p-4 border rounded">
                    <div className="text-lg font-bold mb-2">
                      Spell: <span className="text-oceanBlue">{question.stimulus.split(' ')[0]}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">&quot;Write the letters for this word&quot;</div>
                    <div className="flex space-x-2 mb-3">
                      <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center"></div>
                      <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center"></div>
                      <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span>Correct:</span>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                        <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      </div>
                      <div className="text-xs text-gray-500">Points: {question.points}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scoring Section */}
        <div className="mb-8 bg-warmBeige p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-oceanBlue mb-4">Scoring Summary</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Score Calculation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1">
                  <span>Total Points Possible:</span>
                  <span className="font-semibold">{assessment.total_points}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Points Earned:</span>
                  <span className="font-semibold">_____</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Percentage:</span>
                  <span className="font-semibold">_____%</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Benchmark Score:</span>
                  <span className="font-semibold">{assessment.benchmark_score}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Performance Level:</span>
                  <span className="font-semibold">_____________</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Performance Levels</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-green-100 rounded">
                  <strong>Mastery (80-100%):</strong> {assessment.scoring_rubric.mastery}
                </div>
                <div className="p-2 bg-yellow-100 rounded">
                  <strong>Developing (60-79%):</strong> {assessment.scoring_rubric.developing}
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <strong>Beginning (0-59%):</strong> {assessment.scoring_rubric.beginning}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intervention Recommendations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-oceanBlue mb-4">Intervention Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded border-l-4 border-red-400">
              <h4 className="font-semibold text-red-700 mb-2">If Below Benchmark:</h4>
              <ul className="text-sm space-y-1">
                {assessment.intervention_recommendations.below_benchmark.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-700 mb-2">If Approaching Benchmark:</h4>
              <ul className="text-sm space-y-1">
                {assessment.intervention_recommendations.approaching_benchmark.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-oceanBlue mb-3">Teacher Notes & Observations</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Strengths:
              </label>
              <div className="w-full h-16 border border-gray-300 rounded"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Areas for Growth:
              </label>
              <div className="w-full h-16 border border-gray-300 rounded"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Steps:
              </label>
              <div className="w-full h-16 border border-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 text-xs text-gray-500">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p>Assessment ID: {assessment.assessment_id}</p>
              <p>Generated: {formatDate(date)}</p>
            </div>
          </div>
          
          {/* Standard Footer */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>© 2025 Decoding Den. All rights reserved.</p>
            <p className="mt-1">Phoneme–grapheme clarity in an instant.</p>
            <p className="mt-1">Built on Science of Reading research. Independent. Not affiliated with any commercial program.</p>
            <p className="mt-1">legal@decodingden.com</p>
          </div>
        </div>
      </div>
    );
  }
);

AssessmentPDF.displayName = 'AssessmentPDF';

export default AssessmentPDF;