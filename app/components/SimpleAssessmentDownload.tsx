'use client';

import React from 'react';
import jsPDF from 'jspdf';
import { getAssessmentByWeek } from '../data/assessmentDatabase';

interface SimpleAssessmentDownloadProps {
  week: number;
  stageNumber: number;
  assessmentText: string;
}

export default function SimpleAssessmentDownload({ 
  week, 
  stageNumber, 
  assessmentText
}: SimpleAssessmentDownloadProps) {
  // Check if this week has a formal assessment
  const isCheckpointWeek = [2, 4, 6, 8, 10].includes(week);
  const assessment = isCheckpointWeek ? getAssessmentByWeek(week, stageNumber) : null;

  const handleDownload = () => {
    if (!assessment) return;

    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const weekText = week === 2 ? '(Week 1 and 2)' : 
                       week === 4 ? '(Week 1-4)' : 
                       week === 6 ? '(Week 1-6)' : 
                       week === 8 ? '(Week 1-8)' : 
                       '(Week 1-10)';
      doc.text(`Decoding Den - Stage ${stageNumber} ${weekText} Checkpoint Assessment`, 20, 20);
      
      // Student info line
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Student: __________________________ Date: ___________ Score: ___/' + assessment.total_points, 20, 35);
      
      // Table layout for assessments
      let yPos = 50;
      
      // Get questions by type
      const letterIdQuestions = assessment.questions.filter(q => q.type === 'letter_identification');
      const soundQuestions = assessment.questions.filter(q => q.type === 'phoneme_production');
      const segmentQuestions = assessment.questions.filter(q => q.type === 'phoneme_segmentation');
      const wordQuestions = assessment.questions.filter(q => q.type === 'cvc_blending');
      const spellingQuestions = assessment.questions.filter(q => q.type === 'spelling');
      
      // First table: Letter ID and Sound Production
      if (letterIdQuestions.length > 0 || soundQuestions.length > 0) {
        // Draw table border
        doc.rect(20, yPos, 85, 40);
        doc.rect(105, yPos, 85, 40);
        
        // Headers
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Letter Identification', 25, yPos + 10);
        doc.text('Sound Production', 110, yPos + 10);
        
        // Content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const letters = letterIdQuestions.map(q => q.stimulus).join(' , ');
        const sounds = soundQuestions.map(q => q.stimulus).join(' , ');
        doc.text(letters, 25, yPos + 25);
        doc.text(sounds, 110, yPos + 25);
        
        yPos += 50;
      }
      
      // Second table: Segmentation and Word Reading
      if (segmentQuestions.length > 0 || wordQuestions.length > 0) {
        // Always use 3 columns for compact layout
        const segmentRows = Math.ceil(segmentQuestions.length / 3);
        const wordRows = Math.ceil(wordQuestions.length / 3);
        const tableHeight = Math.max(segmentRows, wordRows) * 15 + 20; // Reduced row height
        
        // Draw table border
        doc.rect(20, yPos, 85, tableHeight);
        doc.rect(105, yPos, 85, tableHeight);
        
        // Headers
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Segmentation', 25, yPos + 10);
        doc.text('Word Reading', 110, yPos + 10);
        
        // Content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9); // Smaller font for 3-column layout
        
        // Segmentation section - 3 columns
        let segmentY = yPos + 22;
        const segmentPerCol = Math.ceil(segmentQuestions.length / 3);
        segmentQuestions.forEach((q, idx) => {
          const col = Math.floor(idx / segmentPerCol);
          const row = idx % segmentPerCol;
          const xOffset = 25 + (col * 27); // 27 pixels between columns
          
          doc.text(q.stimulus, xOffset, segmentY + (row * 15));
          doc.setFontSize(8);
          doc.text(q.expected_response, xOffset + 10, segmentY + (row * 15));
          doc.setFontSize(9);
        });
        
        // Word Reading section - 3 columns
        let wordY = yPos + 22;
        const wordPerCol = Math.ceil(wordQuestions.length / 3);
        wordQuestions.forEach((q, idx) => {
          const col = Math.floor(idx / wordPerCol);
          const row = idx % wordPerCol;
          const xOffset = 110 + (col * 27); // 27 pixels between columns
          
          doc.text(q.stimulus, xOffset, wordY + (row * 15));
        });
        
        yPos += tableHeight + 10;
      }
      
      // Spelling section if exists (optional for some weeks)
      if (spellingQuestions.length > 0) {
        // Always use 4 columns for spelling to save space
        const columnsNeeded = 4;
        const rowsNeeded = Math.ceil(spellingQuestions.length / columnsNeeded);
        const spellingHeight = rowsNeeded * 15 + 20; // Reduced row height
        
        // Draw table border
        doc.rect(20, yPos, 170, spellingHeight);
        
        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Spelling', 25, yPos + 10);
        
        // Content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10); // Smaller font for 4 columns
        let spellingY = yPos + 22;
        const columnWidth = 160 / columnsNeeded; // Distribute width evenly
        
        spellingQuestions.forEach((q, idx) => {
          const word = q.stimulus.split(' ')[0];
          const row = Math.floor(idx / columnsNeeded);
          const col = idx % columnsNeeded;
          doc.text(`${idx + 1}. ${word}`, 25 + (col * columnWidth), spellingY + (row * 15));
        });
        
        yPos += spellingHeight + 10;
      }
      
      // Notes section - moved up
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Notes:', 20, yPos + 5);
      
      // Draw lines for notes - aligned with bottom of Notes text
      doc.setLineWidth(0.5);
      for (let i = 0; i < 2; i++) {
        doc.line(60, yPos + 5 + (i * 8), 190, yPos + 5 + (i * 8));
      }
      
      // Add footer - moved down and made smaller
      const pageHeight = doc.internal.pageSize.height;
      const footerY = pageHeight - 20;
      
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text('© 2025 Decoding Den. All rights reserved.', 105, footerY, { align: 'center' });
      doc.text('Phoneme–grapheme clarity in an instant.', 105, footerY + 3, { align: 'center' });
      doc.text('Built on Science of Reading research. Independent. Not affiliated with any commercial program.', 105, footerY + 6, { align: 'center' });
      doc.text('legal@decodingden.com', 105, footerY + 9, { align: 'center' });
      
      // Save the PDF
      doc.save(`Stage_${stageNumber}_Week_${week}_Assessment.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="flex items-start justify-between gap-4">
      {/* Assessment Description */}
      <p className={`text-pineShadow ${week === 10 ? 'text-sm' : ''} flex-1`}>
        {assessmentText}
      </p>

      {/* Show download button only for checkpoint weeks in Stage 1 */}
      {isCheckpointWeek && assessment && (
        <button
          onClick={handleDownload}
          className="px-3 py-1.5 bg-oceanBlue/60 text-white rounded-md hover:bg-oceanBlue transition-colors duration-200 flex items-center text-xs font-medium whitespace-nowrap shadow-md"
        >
          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      )}
    </div>
  );
}