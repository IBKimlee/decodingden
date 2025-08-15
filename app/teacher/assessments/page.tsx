'use client';

import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ALL_ASSESSMENTS, Assessment } from '../../data/assessmentDatabase';
import AssessmentPDF from '../../components/AssessmentPDF';

export default function AssessmentsPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [studentInfo, setStudentInfo] = useState({
    studentName: '',
    teacherName: '',
    schoolName: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: selectedAssessment ? 
      `${selectedAssessment.title.replace(/[^a-zA-Z0-9]/g, '_')}_${studentInfo.studentName || 'Student'}_${studentInfo.date}` : 
      'Assessment',
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .print\\:shadow-none { box-shadow: none !important; }
      }
    `
  });

  const assessmentCheckpoints = [
    { week: 2, title: 'Week 2 Checkpoint', description: 'Assessment of first 5 phonemes' },
    { week: 4, title: 'Week 4 Checkpoint', description: 'Assessment of first 9 phonemes' },
    { week: 6, title: 'Week 6 Checkpoint', description: 'Assessment of first 13 phonemes' },
    { week: 8, title: 'Week 8 Checkpoint', description: 'Assessment of all 15 phonemes' },
    { week: 10, title: 'Week 10 Summative', description: 'Final Stage 1 assessment' }
  ];

  return (
    <div className="min-h-screen bg-warmBeige">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-oceanBlue mb-2">📋 Stage 1 Assessment Generator</h1>
          <p className="text-gray-600 mb-4">
            Generate formal assessments for Stage 1 phonics checkpoints. Each assessment includes 
            research-based questions, scoring rubrics, and intervention recommendations.
          </p>
          <div className="bg-creamyWhite p-4 rounded-lg">
            <h3 className="font-semibold text-oceanBlue mb-2">Assessment Features:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <li>• Letter identification tasks</li>
              <li>• Phoneme production assessments</li>
              <li>• CVC word reading evaluations</li>
              <li>• Phoneme segmentation activities</li>
              <li>• Spelling assessments</li>
              <li>• Comprehensive scoring rubrics</li>
              <li>• Research-based intervention recommendations</li>
              <li>• PDF download for classroom use</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assessment Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-oceanBlue mb-4">Select Assessment</h2>
              <div className="space-y-3">
                {assessmentCheckpoints.map((checkpoint) => {
                  const assessment = ALL_ASSESSMENTS.find(a => a.checkpoint_week === checkpoint.week);
                  return (
                    <button
                      key={checkpoint.week}
                      onClick={() => setSelectedAssessment(assessment || null)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAssessment?.checkpoint_week === checkpoint.week
                          ? 'border-oceanBlue bg-oceanBlue text-white'
                          : 'border-gray-200 bg-gray-50 hover:border-oceanBlue hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold">{checkpoint.title}</div>
                      <div className={`text-sm ${
                        selectedAssessment?.checkpoint_week === checkpoint.week ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {checkpoint.description}
                      </div>
                      {assessment && (
                        <div className={`text-xs mt-1 ${
                          selectedAssessment?.checkpoint_week === checkpoint.week ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {assessment.questions.length} questions • {assessment.duration}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Student Information Form */}
              {selectedAssessment && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-oceanBlue mb-4">Student Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={studentInfo.studentName}
                        onChange={(e) => setStudentInfo({...studentInfo, studentName: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teacher Name
                      </label>
                      <input
                        type="text"
                        value={studentInfo.teacherName}
                        onChange={(e) => setStudentInfo({...studentInfo, teacherName: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
                        placeholder="Enter teacher name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        value={studentInfo.schoolName}
                        onChange={(e) => setStudentInfo({...studentInfo, schoolName: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
                        placeholder="Enter school name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assessment Date
                      </label>
                      <input
                        type="date"
                        value={studentInfo.date}
                        onChange={(e) => setStudentInfo({...studentInfo, date: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-oceanBlue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePrint}
                    className="w-full mt-6 bg-accentCoral text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate PDF Assessment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Assessment Preview */}
          <div className="lg:col-span-2">
            {selectedAssessment ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-oceanBlue mb-2">
                      {selectedAssessment.title}
                    </h2>
                    <p className="text-gray-600">{selectedAssessment.week_range}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p><strong>Duration:</strong> {selectedAssessment.duration}</p>
                    <p><strong>Total Points:</strong> {selectedAssessment.total_points}</p>
                    <p><strong>Benchmark:</strong> {selectedAssessment.benchmark_score}</p>
                  </div>
                </div>

                {/* Assessment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-oceanBlue mb-3">Phonemes Assessed</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssessment.phonemes_assessed.map((phoneme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-creamyWhite text-oceanBlue rounded-full text-sm font-mono"
                        >
                          {phoneme}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-oceanBlue mb-3">Question Types</h3>
                    <div className="space-y-1 text-sm">
                      {Object.entries(
                        selectedAssessment.questions.reduce((acc, q) => {
                          acc[q.type] = (acc[q.type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="capitalize">{type.replace('_', ' ')}</span>
                          <span className="font-semibold">{count} items</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instructions Preview */}
                <div className="mb-6">
                  <h3 className="font-semibold text-oceanBlue mb-3">Assessment Instructions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-gray-700 mb-2">For Teachers:</h4>
                      <p>{selectedAssessment.instructions.teacher}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-gray-700 mb-2">For Students:</h4>
                      <p>{selectedAssessment.instructions.student}</p>
                    </div>
                  </div>
                </div>

                {/* Scoring Rubric Preview */}
                <div>
                  <h3 className="font-semibold text-oceanBlue mb-3">Performance Levels</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                      <strong className="text-green-700">Mastery (80-100%):</strong>
                      <p className="text-sm text-green-600 mt-1">{selectedAssessment.scoring_rubric.mastery}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <strong className="text-yellow-700">Developing (60-79%):</strong>
                      <p className="text-sm text-yellow-600 mt-1">{selectedAssessment.scoring_rubric.developing}</p>
                    </div>
                    <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                      <strong className="text-red-700">Beginning (0-59%):</strong>
                      <p className="text-sm text-red-600 mt-1">{selectedAssessment.scoring_rubric.beginning}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select an Assessment</h3>
                <p className="text-gray-500">
                  Choose a checkpoint assessment from the left panel to preview and generate a PDF.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hidden PDF Component for Printing */}
        <div className="hidden">
          {selectedAssessment && (
            <AssessmentPDF
              ref={componentRef}
              assessment={selectedAssessment}
              studentName={studentInfo.studentName}
              teacherName={studentInfo.teacherName}
              schoolName={studentInfo.schoolName}
              date={studentInfo.date}
            />
          )}
        </div>
      </div>
    </div>
  );
}