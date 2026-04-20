'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { EIGHT_STAGE_SYSTEM } from '@/app/data/allStagesDatabase';
import SimpleAssessmentDownload from '@/app/components/SimpleAssessmentDownload';
import { jsPDF } from 'jspdf';
import { registerPdfUnicodeFont, PDF_FONT_FAMILY } from '@/app/utils/pdfFonts';
import {
  getWordsByStage,
  getHeartWordsByStage,
  getDecodableWordsByStage,
  getUpgradesAtStage,
  getStageSummary,
  type Core400Word
} from '@/app/data/core400Words';
import {
  getLegacySightWordsForWeek,
  getWeekSummary,
  type LegacyWeeklySightWord
} from '@/app/data/core400WeeklyMap';
import {
  stage1WeeklyData,
  stage2WeeklyData,
  stage3WeeklyData,
  stage4WeeklyData,
  stage5WeeklyData,
  stage6WeeklyData,
  stage7WeeklyData,
  stage8WeeklyData,
  type WeeklyData,
  type SightWord,
  type IntensityLevel,
} from '@/app/data/stagesWeeklyData';

// Stage info interface matching TypeScript data structure
interface StageInfo {
  name: string;
  grade_band: string;
  student_phase: string;
  duration: string;
  total_elements: number;
  key_concept: string;
  instructional_focus: string[];
}



export default function StageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const stageNumber = parseInt(params.stage as string);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [assessmentToolsOpen, setAssessmentToolsOpen] = useState(false);
  const [differentiationOpen, setDifferentiationOpen] = useState(false);
  const [homeConnectionOpen, setHomeConnectionOpen] = useState(false);
  const [showDifferentiationTreeModal, setShowDifferentiationTreeModal] = useState(false);
  const [expandedExposureWeeks, setExpandedExposureWeeks] = useState<Set<number>>(new Set());
  const [showStudentPhaseModal, setShowStudentPhaseModal] = useState(false);
  const [studentPhaseModalVisible, setStudentPhaseModalVisible] = useState(false);
  const [openSightWordPopover, setOpenSightWordPopover] = useState<number | null>(null);
  const [highFreqWordsExpanded, setHighFreqWordsExpanded] = useState(false);
  const [showAllCumulativeWords, setShowAllCumulativeWords] = useState(false);

  // Toggle exposure section for a week
  const toggleExposureSection = (weekNum: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setExpandedExposureWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNum)) {
        newSet.delete(weekNum);
      } else {
        newSet.add(weekNum);
      }
      return newSet;
    });
  };

  // Stage data state (from TypeScript)
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Intensity badge helper function
  const getIntensityBadge = (intensity: IntensityLevel) => {
    switch (intensity) {
      case 'CORE':
        return { symbol: '★', label: 'Core', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', textColor: 'text-amber-700' };
      case 'TEACH':
        return { symbol: '▲', label: 'Teach', bgColor: 'bg-sky-100', borderColor: 'border-sky-400', textColor: 'text-sky-700' };
      case 'EXPOSURE':
        return { symbol: '○', label: 'Exposure', bgColor: 'bg-gray-100', borderColor: 'border-gray-400', textColor: 'text-gray-600' };
      default:
        return { symbol: '★', label: 'Core', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', textColor: 'text-amber-700' };
    }
  };

  // Download week resources function
  const handleDownloadWeekResources = async (weekNumber: number) => {
    const weekData = weeklyData.find(week => week.week === weekNumber);
    if (!weekData) return;

    // Create PDF
    const pdf = new jsPDF();
    await registerPdfUnicodeFont(pdf);
    
    // Define colors
    const primaryColor: [number, number, number] = [74, 144, 164]; // oceanBlue
    const accentColor: [number, number, number] = [212, 130, 110]; // warmCoral
    const textColor: [number, number, number] = [45, 55, 72]; // deepNavy
    
    // Determine week type for dynamic labeling
    const weekType = weekData.isMastery ? 'MASTERY' : weekData.isCheckpoint ? 'CHECKPOINT' : weekData.isReview ? 'REVIEW' : '';
    const weekLabel = weekType ? `Week ${weekNumber} — ${weekType}` : `Week ${weekNumber}`;

    // Page 1 - Teacher Resource Page
    // Header background - use different colors for special weeks
    if (weekData.isMastery) {
      pdf.setFillColor(245, 158, 11); // amber for mastery
    } else if (weekData.isCheckpoint) {
      pdf.setFillColor(59, 130, 246); // blue for checkpoint
    } else {
      pdf.setFillColor(...primaryColor);
    }
    pdf.rect(0, 0, 210, 35, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text(`Stage ${stageNumber} - ${weekLabel}`, 105, 12, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(stageInfo?.name || 'Phonics Stage', 105, 20, { align: 'center' });

    // Add week type badge if applicable
    if (weekType) {
      pdf.setFontSize(10);
      pdf.text(`★ ${weekType} WEEK ★`, 105, 28, { align: 'center' });
    }

    // Stage 8 phase indicator
    if (stageNumber === 8) {
      pdf.setFontSize(9);
      const phaseLabel = weekNumber <= 5 ? 'Phase 8A: Core Morphology' : 'Phase 8B: Extended Patterns';
      pdf.text(phaseLabel, 105, weekType ? 33 : 28, { align: 'center' });
    }
    
    // Teacher Section Header
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Teacher Guide', 20, 50);

    // This Week's Focus
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 55, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('This Week\'s Focus', 20, 60);

    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(11);
    pdf.text(`Phonemes: ${weekData.phonemes.join(', ')}`, 20, 70);

    // Format graphemes with intensity symbols for PDF
    const graphemesWithIntensity = weekData.graphemes.map((g, i) => {
      const intensity = weekData.intensity?.[i] || 'CORE';
      const symbol = intensity === 'CORE' ? '★' : intensity === 'TEACH' ? '▲' : '○';
      return `${symbol} ${g}`;
    }).join(', ');
    pdf.text(`Graphemes: ${graphemesWithIntensity}`, 20, 78);

    // Intensity Legend
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Intensity Key:  ★ CORE (drill to automaticity)  |  ▲ TEACH (explicit instruction)  |  ○ EXPOSURE (encounter in reading)', 20, 86);

    // Teaching Tips
    pdf.setFillColor(...accentColor);
    pdf.rect(15, 90, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Teaching Tips', 20, 95);

    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(10);
    const tips = weekData.teachingTips;
    let yPos = 105;
    tips.forEach(tip => {
      pdf.text(`• ${tip}`, 20, yPos);
      yPos += 7;
    });
    
    // Assessment
    pdf.setFillColor(...accentColor);
    pdf.rect(15, yPos + 5, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Assessment', 20, yPos + 10);
    
    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(10);
    pdf.text(weekData.assessment, 20, yPos + 20);

    // Sight Words (if present)
    let sightWordsHeight = 0;
    if (weekData.sightWords && weekData.sightWords.length > 0) {
      pdf.setFillColor(...accentColor);
      pdf.rect(15, yPos + 30, 180, 8, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont(PDF_FONT_FAMILY, 'bold');
      pdf.text('Sight / Heart Words', 20, yPos + 35);

      pdf.setTextColor(...textColor);
      pdf.setFont(PDF_FONT_FAMILY, 'normal');
      pdf.setFontSize(10);

      let sightWordY = yPos + 45;
      // Sort: NEW first, then UPGRADE, then REVIEW
      const sortedSightWords = [...weekData.sightWords].sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        if (a.isUpgrade && !b.isUpgrade) return -1;
        if (!a.isUpgrade && b.isUpgrade) return 1;
        return 0;
      });

      sortedSightWords.forEach(sw => {
        const status = sw.isHeartWord ? '❤️' : '✅';
        const badge = sw.isNew ? '🆕 ' : sw.isUpgrade ? '⬆️ ' : '';
        const upgradeNote = sw.isUpgrade && !sw.isHeartWord ? ' (Now decodable!)' : '';
        const trickyNote = sw.trickyPart ? ` — ${sw.trickyPart}` : '';
        pdf.text(`${badge}${status} ${sw.word}${upgradeNote}${trickyNote}`, 20, sightWordY);
        sightWordY += 6;
      });
      sightWordsHeight = 15 + (sortedSightWords.length * 6);
    }

    // Activities
    pdf.setFillColor(...accentColor);
    pdf.rect(15, yPos + 30 + sightWordsHeight, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Quick Activities', 20, yPos + 35 + sightWordsHeight);

    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(10);
    const activities = [
      'Sound Hunt: Find objects that start with this week\'s sounds',
      'Letter Formation: Practice writing graphemes in sand/shaving cream',
      'Word Building: Use letter tiles to build focus words',
      'Reading Practice: Use the decodable text for guided reading'
    ];
    let activityY = yPos + 45 + sightWordsHeight;
    activities.forEach((activity, index) => {
      pdf.text(`${index + 1}. ${activity}`, 20, activityY);
      activityY += 7;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2025 Decoding Den. All rights reserved.', 105, 280, { align: 'center' });
    
    // Page 2 - Student Practice Sheet
    pdf.addPage();
    
    // Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, 210, 20, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Student Practice Sheet', 105, 11, { align: 'center' });
    pdf.setFontSize(10);
    pdf.text(`Week ${weekNumber}`, 105, 16, { align: 'center' });
    
    // Dynamic Y positioning for all elements
    let currentY = 35;
    const sectionSpacing = 8; // Space between sections
    
    // Name and Date
    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(11);
    pdf.text('Name: ________________________________', 20, currentY);
    pdf.text('Date: _______________', 140, currentY);
    
    currentY += sectionSpacing;
    
    // Learning Focus Box
    const focusBoxY = currentY;
    const focusBoxHeight = 25;
    pdf.setFillColor(245, 251, 254);
    pdf.rect(15, focusBoxY, 180, focusBoxHeight, 'F');
    pdf.setDrawColor(...primaryColor);
    pdf.rect(15, focusBoxY, 180, focusBoxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('This Week I\'m Learning:', 20, focusBoxY + 8);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(11);
    pdf.text(`Sounds: ${weekData.phonemes.join(', ')}`, 20, focusBoxY + 16);
    pdf.text(`Letters: ${weekData.graphemes.join(', ')}`, 20, focusBoxY + 22);
    
    currentY = focusBoxY + focusBoxHeight + 3;
    
    // Learning Goal Box
    const goalBoxY = currentY;
    
    // Create learning goal text first to calculate required height
    const learningGoal = `I can use the ${weekData.graphemes.length > 1 ? 'letters' : 'letter'} ${weekData.graphemes.join(', ')} to read and write words with the ${weekData.phonemes.length > 1 ? 'sounds' : 'sound'} ${weekData.phonemes.join(', ')}.`;
    
    // Calculate text height (estimate ~7 units per line, max width 170)
    const goalTextLines = pdf.splitTextToSize(learningGoal, 170);
    const goalBoxHeight = Math.max(20, 10 + (goalTextLines.length * 7));
    
    pdf.setFillColor(255, 243, 199); // Light yellow for goal
    pdf.rect(15, goalBoxY, 180, goalBoxHeight, 'F');
    pdf.setDrawColor(...accentColor);
    pdf.rect(15, goalBoxY, 180, goalBoxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('My Learning Goal:', 20, goalBoxY + 8);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(11);
    
    pdf.text(learningGoal, 20, goalBoxY + 16, { maxWidth: 170 });
    
    currentY = goalBoxY + goalBoxHeight + sectionSpacing;
    
    // Practice Words
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Practice Words:', 20, currentY);
    
    currentY += 13;
    
    // Word boxes - dynamic sizing based on number of words
    const words = weekData.focusWords;
    const pageWidth = 170; // Total usable width (210 - 20 left margin - 20 right margin)
    
    // Calculate dynamic sizing based on word count
    let boxWidth = 50;
    let boxHeight = 12;
    let wordsPerRow = 3;
    let fontSize = 14;
    let rowSpacing = 15;
    
    const estimatedRows = Math.ceil(words.length / wordsPerRow);
    const availableHeight = 120; // Approximate space available for words before next section
    
    // If we have too many words, adjust layout
    if (words.length > 16 || estimatedRows * rowSpacing > availableHeight) {
      // Compact layout for many words - use 5 columns
      wordsPerRow = 5;
      boxWidth = 30;
      boxHeight = 10;
      fontSize = 10;
      rowSpacing = 12;
    }
    
    const rowCount = Math.ceil(words.length / wordsPerRow);
    const totalBoxWidth = Math.min(words.length, wordsPerRow) * boxWidth;
    const totalSpacing = pageWidth - totalBoxWidth;
    const spaceBetween = totalSpacing / (Math.min(words.length, wordsPerRow) + 1);
    
    let wordX = 20 + spaceBetween;
    let wordY = currentY;
    let maxWordY = wordY;
    
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(fontSize);
    words.forEach((word, index) => {
      if (index > 0 && index % wordsPerRow === 0) {
        wordY += rowSpacing;
        maxWordY = wordY;
        wordX = 20 + spaceBetween;
      }
      pdf.setDrawColor(...primaryColor);
      pdf.rect(wordX, wordY - 8, boxWidth, boxHeight, 'S');
      pdf.text(word, wordX + (boxWidth/2), wordY, { align: 'center' });
      wordX += boxWidth + spaceBetween;
    });
    
    currentY = maxWordY + 7 + sectionSpacing;
    
    // Read This Sentence
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Read This Sentence:', 20, currentY);
    
    currentY += 5;
    
    const sentenceBoxY = currentY;
    
    // Set font before calculating text wrap
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(10);
    
    // Split text to fit within box width (170 allows for padding)
    const textLines = pdf.splitTextToSize(weekData.decodableText, 170) as string[];
    
    // Calculate dynamic height based on number of lines
    const lineHeight = 5;
    const sentenceBoxHeight = 8 + (textLines.length * lineHeight);
    
    // Draw the box
    pdf.setFillColor(250, 250, 250);
    pdf.rect(15, sentenceBoxY, 180, sentenceBoxHeight, 'F');
    pdf.setDrawColor(...primaryColor);
    pdf.rect(15, sentenceBoxY, 180, sentenceBoxHeight, 'S');
    
    // Render each line of text (left-aligned)
    let textY = sentenceBoxY + 6;
    textLines.forEach((line) => {
      pdf.text(line, 20, textY);
      textY += lineHeight;
    });
    
    currentY = sentenceBoxY + sentenceBoxHeight + sectionSpacing;
    
    // Write Your Own Words
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Write Your Own Words:', 20, currentY);
    
    currentY += 12;
    
    // Three writing lines with equal spacing
    const lineWidth = 50;
    const totalWidth = 170;
    const lineSpacing = (totalWidth - (3 * lineWidth)) / 2;
    
    pdf.setDrawColor(150, 150, 150);
    pdf.line(20, currentY, 20 + lineWidth, currentY);
    pdf.line(20 + lineWidth + lineSpacing, currentY, 20 + lineWidth + lineSpacing + lineWidth, currentY);
    pdf.line(20 + (2 * lineWidth) + (2 * lineSpacing), currentY, 20 + (3 * lineWidth) + (2 * lineSpacing), currentY);
    
    currentY += sectionSpacing - 4; // Moved up another tad
    
    // Add separator lines before Home Connection
    pdf.setDrawColor(200, 200, 200);
    
    // Home Connection Box - dynamically positioned
    const homeConnectionY = currentY;
    pdf.setFillColor(...accentColor);
    pdf.rect(15, homeConnectionY, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('Home Connection', 20, homeConnectionY + 5);
    
    pdf.setTextColor(...textColor);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    pdf.setFontSize(10);
    pdf.text('Dear Families,', 20, homeConnectionY + 13);
    pdf.text(`This week we are working on the sounds ${weekData.phonemes.join(' and ')}`, 20, homeConnectionY + 20);
    pdf.text(`written as ${weekData.graphemes.join(' and ')}.`, 20, homeConnectionY + 27);
    
    pdf.setFont(PDF_FONT_FAMILY, 'bold');
    pdf.text('At home you can:', 20, homeConnectionY + 35);
    pdf.setFont(PDF_FONT_FAMILY, 'normal');
    const homeActivities = [
      'Practice the focus words during daily activities',
      'Point out these letters in books and signs',
      'Play "I Spy" with words that have these sounds',
      'Read the decodable sentence together'
    ];
    let homeY = homeConnectionY + 42;
    homeActivities.forEach(activity => {
      pdf.text(`• ${activity}`, 25, homeY);
      homeY += 5;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2025 Decoding Den. All rights reserved.', 105, 280, { align: 'center' });
    
    // Save the PDF
    pdf.save(`Stage-${stageNumber}-Week-${weekNumber}-Resources.pdf`);
  };

  // Load stage data from TypeScript (no Supabase needed)
  useEffect(() => {
    // Find stage in TypeScript data (array is 0-indexed, stages are 1-indexed)
    const stageData = EIGHT_STAGE_SYSTEM[stageNumber - 1];
    if (stageData) {
      // Map TypeScript fields to component interface
      setStageInfo({
        name: stageData.stage_name,
        grade_band: stageData.grade_level,
        student_phase: stageData.student_phase,
        duration: stageData.duration,
        total_elements: stageData.total_elements,
        key_concept: stageData.key_concept,
        instructional_focus: stageData.instructional_focus
      });
    }
    setLoading(false);
  }, [stageNumber]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading stage details...</p>
        </div>
      </div>
    );
  }
  
  if (!stageInfo) {
    return <div>Stage not found</div>;
  }

  // Select the appropriate weekly data based on stage number
  const weeklyData = stageNumber === 1 ? stage1WeeklyData :
                     stageNumber === 2 ? stage2WeeklyData :
                     stageNumber === 3 ? stage3WeeklyData :
                     stageNumber === 4 ? stage4WeeklyData :
                     stageNumber === 5 ? stage5WeeklyData :
                     stageNumber === 6 ? stage6WeeklyData :
                     stageNumber === 7 ? stage7WeeklyData :
                     stageNumber === 8 ? stage8WeeklyData : [];
  const hasDetailedData = weeklyData.length > 0;

  // Calculate core, taught, and exposure counts for Stage 8 (exclude Week 10 mastery and review weeks)
  const intensityCounts = stageNumber === 8 ? weeklyData.reduce((acc, week) => {
    // Skip Week 10 and any week with "All Stage" review graphemes
    if (week.week === 10 || week.graphemes?.some(g => g.startsWith('All Stage'))) {
      return acc;
    }
    week.intensity?.forEach(i => {
      if (i === 'CORE') {
        acc.core++;
      } else if (i === 'TEACH') {
        acc.taught++;
      } else if (i === 'EXPOSURE') {
        acc.exposure++;
      }
    });
    return acc;
  }, { core: 0, taught: 0, exposure: 0 }) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-slate-600 text-deepNavy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue shadow-2xl p-2 border-b border-oceanBlue/50">
        <div className="px-4">
          <div className="flex items-center justify-between relative z-50">
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">
                Stage {stageNumber}: {stageInfo.name}
              </h1>
              <p className="text-sm text-white/90 mt-1 flex items-center">
                <span>{stageInfo.grade_band} • {stageInfo.duration} • {stageInfo.total_elements} elements</span>
                {stageNumber === 8 && intensityCounts && (
                  <span className="ml-2 text-white/70">
                    ({intensityCounts.core} core · {intensityCounts.taught} taught · {intensityCounts.exposure} exposure)
                  </span>
                )}
                <button
                  onClick={() => {
                    setShowStudentPhaseModal(true);
                    setTimeout(() => setStudentPhaseModalVisible(true), 10);
                  }}
                  className="bg-purple-500/80 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-purple-600 transition-colors ml-3"
                >
                  Student Phase ▸
                </button>
              </p>
            </div>
            <div className="relative z-50 pr-4 flex items-center gap-3">
              {/* View Toggle */}
              {hasDetailedData && (
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                      viewMode === 'timeline'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    List View
                  </button>
                </div>
              )}
              <button
                onClick={() => router.push('/teacher/stages')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-600 transition-all duration-200 font-medium cursor-pointer relative z-50 hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                ← Back to Stages
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mx-auto px-6 py-4 relative z-10">
        {/* Stage Overview Cards - 3 Column Layout */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Key Concepts Card */}
          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-emerald-400 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Key Concepts</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{stageInfo.key_concept}</p>
          </div>

          {/* Instructional Focus Card */}
          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-sky-400 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Instructional Focus</h3>
            <ul className="list-disc list-outside ml-4 space-y-1">
              {stageInfo.instructional_focus?.map((focus, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed">{focus}</li>
              ))}
            </ul>
          </div>

          {/* Useful Strategies Card */}
          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-amber-400 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Useful Strategies</h3>
            <ul className="list-disc list-outside ml-4 space-y-1">
              <li className="text-sm text-gray-600 leading-relaxed">Systematic introduction of phonemes</li>
              <li className="text-sm text-gray-600 leading-relaxed">Daily quick assessments (1-3 minutes)</li>
              <li className="text-sm text-gray-600 leading-relaxed">Multisensory instruction techniques</li>
              <li className="text-sm text-gray-600 leading-relaxed">Decodable text practice</li>
              <li className="text-sm text-gray-600 leading-relaxed">Progress monitoring every 2 weeks</li>
            </ul>
          </div>
        </div>

        {/* Heart Words Section - Only irregular words needing memorization (Collapsible) */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6 overflow-hidden">
          {/* Header - Always Visible */}
          <button
            onClick={() => setHighFreqWordsExpanded(!highFreqWordsExpanded)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">❤️</span>
              <h3 className="text-lg font-bold text-gray-800">
                Heart Words for Stage {stageNumber}
              </h3>
              {/* Compact Stats + Intensity Legend */}
              {(() => {
                const summary = getStageSummary(stageNumber);
                const upgrades = getUpgradesAtStage(stageNumber);
                return (
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="bg-red-100 px-2 py-0.5 rounded text-red-700">{summary.heartWordCount} heart words</span>
                    {upgrades.length > 0 && (
                      <span className="bg-purple-100 px-2 py-0.5 rounded text-purple-700">⬆️ {upgrades.length} upgrade{upgrades.length > 1 ? 's' : ''}</span>
                    )}
                    <span className="text-xs text-gray-400 hidden sm:inline">|</span>
                    <span className="text-xs text-gray-500 hidden sm:inline flex items-center gap-1">
                      <span className="text-amber-500">★</span>CORE
                      <span className="text-sky-500 ml-2">▲</span>TEACH
                      <span className="text-gray-400 ml-2">○</span>EXPOSURE
                    </span>
                  </div>
                );
              })()}
            </div>
            <span className={`text-gray-400 text-sm transition-transform duration-200 ${highFreqWordsExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Expanded Content */}
          {highFreqWordsExpanded && (
            <div className="p-5 pt-0 border-t border-gray-100">
              {/* Upgrades Section (if any) */}
              {getUpgradesAtStage(stageNumber).length > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <h4 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-1">
                    <span>⬆️</span> Heart Words That Become Decodable at Stage {stageNumber}
                  </h4>
                  <p className="text-xs text-purple-600 mb-2">These words were heart words but now can be fully decoded!</p>
                  <div className="flex flex-wrap gap-2">
                    {getUpgradesAtStage(stageNumber).map((word: Core400Word) => (
                      <span
                        key={word.word}
                        className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm border border-purple-300 text-purple-800"
                        title={`Was heart word: ${word.trickyPart || 'irregular'}`}
                      >
                        <span className="font-medium">{word.word}</span>
                        <span className="text-green-500 text-xs">→ decodable!</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Heart Words */}
              {getHeartWordsByStage(stageNumber).length > 0 && (
                <div className="pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {getHeartWordsByStage(stageNumber).map((word: Core400Word) => (
                      <span
                        key={word.word}
                        className="group inline-flex items-center bg-red-50 px-2 py-0.5 rounded text-sm border border-red-200 text-red-800 hover:bg-red-100 cursor-help relative"
                        title={word.trickyPart || 'Irregular spelling'}
                      >
                        <span className="mr-1">❤️</span>
                        {word.word}
                        {word.upgradesAtStage && (
                          <span className="ml-1 text-purple-600 text-xs">(→S{word.upgradesAtStage})</span>
                        )}
                        {word.isPermanentlyIrregular && (
                          <span className="ml-1 text-gray-400 text-xs">∞</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="text-purple-600">(→S#)</span> = becomes decodable at Stage # |
                    <span className="text-gray-400 ml-1">∞</span> = permanently irregular
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {hasDetailedData ? (
          <>

            {/* Stage 8 Instructional Shift Banner */}
            {stageNumber === 8 && (
              <div className="mb-4 bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-400 rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="font-bold text-violet-800 text-lg mb-1">Instructional Shift: Morphology Focus</h3>
                    <p className="text-violet-700 text-sm mb-2">
                      Stage 8 marks a transition from phoneme-grapheme correspondence to <strong>morphological awareness</strong> — understanding how prefixes, suffixes, and roots create meaning.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="bg-violet-200/50 rounded px-3 py-1">
                        <span className="font-bold text-violet-800">Phase 8A (Weeks 1-5):</span>
                        <span className="text-violet-700 ml-1">Core Morphology — inflectional suffixes (-ed, -s, -ing) and high-frequency prefixes (un-, re-)</span>
                      </div>
                      <div className="bg-purple-200/50 rounded px-3 py-1">
                        <span className="font-bold text-purple-800">Phase 8B (Weeks 6-10):</span>
                        <span className="text-purple-700 ml-1">Extended Patterns — derivational suffixes (-tion, -ful, -ness) and schwa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'timeline' && (
              <div className={`flex flex-wrap justify-center max-w-full mx-auto px-1 ${stageNumber === 8 ? 'gap-4' : 'gap-8'}`}>
                {weeklyData.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setSelectedWeek(week.week)}
                    className={`rounded-lg shadow-md px-2 pb-2 pt-px border-2 border-cyan-400 text-center transition-all duration-300 transform hover:scale-150 hover:z-20 hover:shadow-xl relative overflow-hidden ${
                      selectedWeek === week.week
                        ? 'ring-2 ring-cyan-400 border-cyan-400'
                        : 'border-cyan-400 hover:border-cyan-300'
                    }`}
                    style={{
                      width: '100px',
                      height: '240px',
                      background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div className="h-6 flex items-center justify-center gap-1">
                      <span className="text-sm font-bold text-slate-700">Week {week.week}</span>
                      {(week.assessment.includes('CHECKPOINT') || week.assessment.includes('ASSESSMENT')) && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="h-5 flex items-center justify-center">
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Phonemes</span>
                      </div>
                      <div className="h-16 flex flex-col gap-0.5 justify-start mt-1">
                        {week.phonemes.map((phoneme, idx) => {
                          const intensity = week.intensity?.[idx] || 'CORE';
                          const intensitySymbol = intensity === 'CORE' ? '★' : intensity === 'TEACH' ? '▲' : '○';
                          const intensityColor = intensity === 'CORE' ? 'text-amber-500' : intensity === 'TEACH' ? 'text-sky-500' : 'text-gray-400';
                          return (
                            <span key={idx} className="bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded-md text-xs font-semibold text-emerald-800 text-center leading-tight shadow-sm flex items-center justify-center gap-1">
                              <span className={`text-[10px] ${intensityColor}`}>{intensitySymbol}</span>
                              {phoneme}
                            </span>
                          );
                        })}
                      </div>

                      <div className="h-5 flex items-center justify-center mt-2">
                        <span className="font-bold text-blue-700 text-xs uppercase tracking-wide">Graphemes</span>
                      </div>
                      <div className="h-16 flex flex-col gap-0.5 justify-start mt-1">
                        {week.graphemes.map((grapheme, idx) => (
                          <span key={idx} className={`bg-blue-100 border border-blue-400 px-1.5 py-0.5 rounded-md text-xs font-semibold text-center leading-tight shadow-sm ${
                            ['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : 'text-blue-800'
                          }`}>
                            {grapheme}
                          </span>
                        ))}
                      </div>
                    </div>

                  </button>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {weeklyData.map((week) => (
                  <button
                    key={week.week}
                    onClick={() => setSelectedWeek(week.week)}
                    className={`w-full rounded-lg shadow-md p-6 hover:shadow-lg transition-all text-left border-2 border-cyan-400 ${
                      selectedWeek === week.week
                        ? 'ring-2 ring-cyan-400'
                        : ''
                    }`}
                    style={{
                      background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <h3 className="font-bold text-xl text-black mb-2">
                          Week {week.week}: {week.phonemes.join(', ')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-baseline">
                            <span className="text-black/70">Graphemes:</span>
                            <span className="ml-2 font-medium">
                              {week.graphemes.map((grapheme, idx) => (
                                <span key={idx} className={['a', 'e', 'i', 'o', 'u'].includes(grapheme.toLowerCase()) ? 'text-red-600' : 'text-black'}>
                                  {grapheme}{idx < week.graphemes.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </span>
                          </div>
                          <div className="flex items-baseline">
                            <span className="text-black/70" style={{minWidth: '90px', display: 'inline-block'}}>Focus Words:</span>
                            <span className="ml-2 text-black">{week.focusWords.slice(0, 3).join(', ')}...</span>
                          </div>
                          <div className="flex items-baseline">
                            <span className="text-black/70">Assessment:</span>
                            <span className="ml-2 text-black">{week.assessment.split(':')[0]}</span>
                          </div>
                        </div>
                      </div>
                      {(week.assessment.includes('CHECKPOINT') || week.assessment.includes('ASSESSMENT')) && (
                        <span className="ml-4 px-3 py-1 bg-dustyRose/20 text-dustyRose text-sm rounded font-medium">
                          Assessment
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Week Detail Modal */}
            {selectedWeek && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{paddingTop: '50px'}}>
                <div
                  onClick={() => setOpenSightWordPopover(null)}
                  className="rounded-lg p-6 max-w-3xl w-full max-h-[90vh] bg-white relative overflow-y-auto" style={{
                  background: 'radial-gradient(ellipse at center, #ffffff 60%, #f8fafc 85%, #e2e8f0 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08)'
                }}>
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-2xl font-bold text-black">
                      Week {selectedWeek} Detail
                      {(() => {
                        const week = weeklyData.find(w => w.week === selectedWeek);
                        return (week?.assessment.includes('CHECKPOINT') || week?.assessment.includes('ASSESSMENT')) && (
                          <span className="ml-2 text-yellow-500">⭐</span>
                        );
                      })()}
                    </h2>
                    <button
                      onClick={() => { setSelectedWeek(null); setOpenSightWordPopover(null); setShowAllCumulativeWords(false); }}
                      className={stageNumber === 1
                        ? 'text-slate-600 hover:text-slate-800 text-2xl'
                        : 'text-mossGray hover:text-pineShadow text-2xl'
                      }
                    >
                      ×
                    </button>
                  </div>
                  
                  {(() => {
                    const week = weeklyData.find(w => w.week === selectedWeek)!;
                    return (
                      <div className="space-y-4 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-lg p-4 border border-blue-400 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                            <h3 className="font-bold text-lg mb-2 text-black">Phonemes & Graphemes</h3>
                            <div className="space-y-2">
                              {selectedWeek === 8 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-pineShadow'
                                    }`}>b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className={`text-lg font-bold w-12 text-center font-mono ${
                                      stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                    }`}>/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className={`text-lg font-bold w-6 text-center ${
                                      stageNumber === 1 ? 'text-red-600' : 'text-pineShadow'
                                    }`}>u</span>
                                  </div>
                                </div>
                              ) : selectedWeek === 9 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">u</span>
                                  </div>
                                </div>
                              ) : selectedWeek === 10 && stageNumber === 1 ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/m/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">m</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/s/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">s</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/a/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">a</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/t/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">t</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/n/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">n</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/p/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">p</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/i/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">i</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/d/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">d</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/f/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">f</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/o/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">o</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/l/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">l</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/h/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">h</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/b/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-slate-800">b</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/e/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">e</span>
                                  </div>
                                  <div className="flex items-center justify-center min-w-0">
                                    <span className="text-lg font-bold w-12 text-center font-mono text-slate-800">/u/</span>
                                    <span className="text-sm font-medium w-6 text-center">→</span>
                                    <span className="text-lg font-bold w-6 text-center text-red-600">u</span>
                                  </div>
                                </div>
                              ) : (
                                week.phonemes.map((phoneme, i) => {
                                  const grapheme = week.graphemes[i]?.toLowerCase() || '';
                                  const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(grapheme);
                                  const intensity = week.intensity?.[i] || 'CORE';
                                  const intensitySymbol = intensity === 'CORE' ? '★' : intensity === 'TEACH' ? '▲' : '○';
                                  const intensityColor = intensity === 'CORE' ? 'text-amber-500' : intensity === 'TEACH' ? 'text-sky-500' : 'text-gray-400';
                                  return (
                                    <div key={i} className="flex items-center justify-start min-w-0 gap-2">
                                      <span className={`text-sm ${intensityColor}`} title={intensity}>{intensitySymbol}</span>
                                      <span className={`text-lg font-bold w-12 text-left font-mono ${
                                        stageNumber === 1 ? 'text-slate-800' : 'text-forestGreen'
                                      }`}>{phoneme}</span>
                                      <span className="text-sm font-medium w-6 text-center">→</span>
                                      <span className={`text-lg font-bold text-center w-10 py-0.5 rounded bg-amber-50 border border-amber-300 ${
                                        stageNumber === 1 ? (isVowel ? 'text-red-600' : 'text-black') : 'text-pineShadow'
                                      }`}>{week.graphemes[i]}</span>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-emerald-300/20 to-emerald-400/25 rounded-lg p-4 h-full border border-emerald-400 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                            {(() => {
                              // Get cumulative focus words from week 1 through current week
                              const cumulativeFocusWords: { word: string; isNew: boolean }[] = [];
                              const seenWords = new Set<string>();

                              for (let w = 1; w <= week.week; w++) {
                                const weekData = weeklyData.find(wd => wd.week === w);
                                if (weekData) {
                                  weekData.focusWords.forEach(word => {
                                    if (!seenWords.has(word.toLowerCase())) {
                                      seenWords.add(word.toLowerCase());
                                      cumulativeFocusWords.push({
                                        word,
                                        isNew: w === week.week
                                      });
                                    }
                                  });
                                }
                              }

                              const newCount = cumulativeFocusWords.filter(w => w.isNew).length;

                              return (
                                <>
                                  <h3 className="font-bold text-lg mb-2 text-black flex items-center gap-2">
                                    Decodable Words
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-normal">
                                      {cumulativeFocusWords.length} total
                                    </span>
                                    {newCount > 0 && (
                                      <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-normal">
                                        +{newCount} new
                                      </span>
                                    )}
                                  </h3>
                                  <div className={
                                    cumulativeFocusWords.length > 20 ? "grid grid-cols-5 gap-1" : "grid grid-cols-4 gap-2"
                                  }>
                                    {cumulativeFocusWords.map((item, i) => (
                                      <span key={i} className={`px-2 py-1 rounded-lg font-medium text-center text-sm border ${
                                        item.isNew
                                          ? 'bg-amber-50 border-amber-300'
                                          : 'bg-white border-slate-200'
                                      }`} style={{
                                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                                      }}>
                                        {item.word.split('').map((letter, idx) => (
                                          <span key={idx} style={{
                                            color: ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase()) ? '#dc2626' : '#1e293b'
                                          }}>
                                            {letter}
                                          </span>
                                        ))}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              );
                            })()}
                            
                            {/* Heart Words Section - Only irregular words needing memorization */}
                            {(() => {
                              const weekSightWords = getLegacySightWordsForWeek(stageNumber, week.week);

                              // Filter to only heart words (irregular words needing memorization)
                              const allHeartWords = weekSightWords.filter(w => w.isHeartWord);
                              if (allHeartWords.length === 0) return null;

                              // Separate new heart words from review heart words
                              const newHeartWords = allHeartWords.filter(w => w.isNew);
                              const reviewHeartWords = allHeartWords.filter(w => !w.isNew);

                              // Determine which words to display
                              const wordsToDisplay = showAllCumulativeWords ? allHeartWords : newHeartWords;

                              return (
                                <>
                                  <h3 className="font-bold text-lg mb-2 mt-4 text-black flex items-center gap-2 flex-wrap">
                                    <span>❤️</span> Heart Words
                                    {week.week <= 7 && newHeartWords.length > 0 && (
                                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-normal">
                                        +{newHeartWords.length} new
                                      </span>
                                    )}
                                    {/* Toggle for cumulative heart words */}
                                    {reviewHeartWords.length > 0 && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowAllCumulativeWords(!showAllCumulativeWords);
                                        }}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-normal hover:bg-gray-200 transition-colors ml-auto"
                                      >
                                        {showAllCumulativeWords
                                          ? 'Show new only'
                                          : `Show all (${allHeartWords.length})`
                                        }
                                      </button>
                                    )}
                                  </h3>

                                  {/* Heart Words display */}
                                  {wordsToDisplay.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-2">
                                      {wordsToDisplay.map((sw, i) => (
                                        <div key={i} className="relative">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenSightWordPopover(openSightWordPopover === i ? null : i);
                                            }}
                                            className={`w-full px-2 py-1 rounded-lg font-medium text-center text-sm border cursor-pointer transition-colors ${
                                              sw.isNew
                                                ? 'bg-white border-blue-400 text-blue-600 font-bold hover:bg-blue-50'
                                                : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'
                                            }`}
                                            style={{
                                              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                                            }}
                                          >
                                            <span className="text-[10px] mr-0.5">❤️</span>
                                            {sw.word}
                                          </button>
                                          {/* Popover on click */}
                                          {openSightWordPopover === i && (
                                            <div className="absolute left-full ml-2 bottom-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 min-w-[180px] max-w-[250px]">
                                              <div className="flex items-start gap-1 mb-1">
                                                <span className="text-sm">❤️</span>
                                                <div>
                                                  <div className="text-xs font-medium">Heart word</div>
                                                  <div className="text-[10px] text-gray-500">(has irregular parts - memorize)</div>
                                                </div>
                                              </div>
                                              {sw.isNew && (
                                                <div className="text-[10px] text-red-600 mt-1 font-medium">New this week!</div>
                                              )}
                                              {sw.trickyPart && (
                                                <div className="text-[10px] text-gray-600 mt-1 border-t pt-1">
                                                  <strong>Tricky part:</strong> {sw.trickyPart}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 italic">
                                      No new heart words this week
                                    </p>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/40 rounded-lg mt-2 p-3 border border-amber-400 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                          <h3 className={`font-bold text-black ${
                            selectedWeek === 10 ? 'text-base mb-1' : 'text-lg mb-2'
                          }`}>
                            {selectedWeek === 8 && stageNumber === 1 
                              ? "End of Stage Assessment - Decodable Text" 
                              : selectedWeek === 9 && stageNumber === 1
                              ? "Review All Vowels - Decodable Text"
                              : selectedWeek === 10 && stageNumber === 1
                              ? "Mastery Check - Decodable Text"
                              : selectedWeek === 8
                              ? "Checkpoint Assessment - Decodable Text"
                              : selectedWeek === 9
                              ? "Review - Decodable Text"
                              : selectedWeek === 10
                              ? "Mastery Check - Decodable Text"
                              : "Decodable Text"
                            }
                          </h3>
                          <div className={`text-pineShadow italic ${
                            selectedWeek === 10 ? 'text-sm' : 'text-base'
                          }`}>
                            {(() => {
                              const sightWords = ['the', 'a', 'an', 'is', 'was', 'were', 'are', 'to', 'too', 'two', 'and', 'he', 'she', 'it', 'we', 'they', 'I', 'you', 'me', 'my', 'his', 'her', 'him', 'them', 'us', 'of', 'for', 'from', 'with', 'by', 'on', 'in', 'at', 'up', 'out', 'down', 'off', 'over', 'under', 'into', 'onto', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must', 'be', 'been', 'being', 'go', 'goes', 'went', 'come', 'came', 'get', 'got', 'see', 'saw', 'look', 'want', 'said', 'say', 'says', 'here', 'there', 'where', 'when', 'what', 'who', 'why', 'how', 'this', 'that', 'these', 'those', 'some', 'all', 'any', 'many', 'much', 'one', 'two', 'three', 'first', 'then', 'now', 'only', 'also', 'but', 'or', 'so', 'if', 'because', 'before', 'after', 'while', 'during', 'about', 'above', 'below', 'between', 'through', 'around', 'near', 'far', 'big', 'little', 'long', 'short', 'high', 'low', 'good', 'bad', 'new', 'old', 'cold', 'fast', 'slow', 'happy', 'sad', 'yes', 'no', 'not'];
                              
                              return week.decodableText.split(' ').map((word, index) => {
                                const cleanWord = word.replace(/[.,!?;:—]/g, '');
                                if (sightWords.includes(cleanWord.toLowerCase()) || sightWords.includes(cleanWord)) {
                                  return <span key={index} className="text-blue-600 font-bold">{word} </span>;
                                }
                                return <span key={index}>{word} </span>;
                              });
                            })()}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-lg mt-2 p-3 border border-purple-400 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                          <h3 className={`font-bold text-black ${
                            selectedWeek === 10 ? 'text-base mb-1' : 'text-lg mb-2'
                          }`}>Assessment</h3>
                          <SimpleAssessmentDownload
                            week={selectedWeek}
                            stageNumber={stageNumber}
                            assessmentText={week.assessment}
                          />
                        </div>
                        
                        <div className={`bg-gradient-to-br from-rose-500/30 to-pink-600/40 rounded-lg border border-rose-400 shadow-xl relative overflow-hidden ${
                          selectedWeek === 10 ? 'px-3 pt-2 pb-3' : 'px-4 pt-2 pb-4'
                        }`}>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
                          <h3 className={`font-bold text-black mb-1 ${
                            selectedWeek === 10 ? 'text-base' : 'text-lg'
                          }`}>Teaching Tips</h3>
                          <div className={`text-black ${
                            selectedWeek === 10 ? 'text-sm' : ''
                          }`}>
                            {week.teachingTips.map((tip, index) => (
                              <div key={index} className="mb-1">{tip}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6 mb-12 pr-12">
                          <button 
                            onClick={() => handleDownloadWeekResources(selectedWeek)}
                            className="px-4 py-2 bg-forestGreen text-white rounded-lg hover:bg-forestGreen/90 transition"
                          >
                            Download Week {selectedWeek} Resources
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Placeholder for other stages */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-mossGray mb-2">
              Detailed weekly breakdown coming soon for Stage {stageNumber}
            </p>
            <p className="text-pineShadow">
              Currently available for Stages 1, 2, 3, and 4. Other stages will include:
            </p>
            <ul className="mt-4 text-sm text-mossGray space-y-1">
              <li>• Week-by-week phoneme introduction</li>
              <li>• Assessment checkpoints</li>
              <li>• Decodable texts and word lists</li>
              <li>• Teaching tips and differentiation</li>
            </ul>
          </div>
        )}

        {/* Resources Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-rose-400 rounded-xl overflow-hidden">
            <button
              onClick={() => setAssessmentToolsOpen(!assessmentToolsOpen)}
              className="w-full text-left flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">Assessment Tools</h3>
              <span className={`text-gray-400 text-sm transition-transform duration-200 ${assessmentToolsOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {assessmentToolsOpen && (
              <div className="bg-stone-50 border-t border-gray-200 px-5 py-4">
                <ul className="space-y-2 text-base text-gray-600 leading-relaxed">
                  <li>• Quick phoneme checks (1-3 min)</li>
                  <li>• Weekly progress monitoring</li>
                  <li>• Formal assessments at weeks 2, 4, 6, 8</li>
                  <li>• Differentiation decision trees</li>
                </ul>
              </div>
            )}
          </div>

          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-violet-400 rounded-xl overflow-hidden">
            <button
              onClick={() => setDifferentiationOpen(!differentiationOpen)}
              className="w-full text-left flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">Differentiation</h3>
              <span className={`text-gray-400 text-sm transition-transform duration-200 ${differentiationOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {differentiationOpen && (
              <div className="bg-stone-50 border-t border-gray-200 px-5 py-4">
                <ul className="space-y-2 text-base text-gray-600 leading-relaxed mb-4">
                  <li>• Tier 1: 2-3 days per phoneme</li>
                  <li>• Tier 2: 5-7 days with multisensory</li>
                  <li>• Advanced: Accelerate with mastery checks</li>
                  <li>• ELL: Extra oral language support</li>
                </ul>
                <button
                  onClick={() => setShowDifferentiationTreeModal(true)}
                  className="bg-teal-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Differentiation Tree
                </button>
              </div>
            )}
          </div>

          <div className="bg-stone-50 border border-gray-200 border-l-4 border-l-teal-400 rounded-xl overflow-hidden">
            <button
              onClick={() => setHomeConnectionOpen(!homeConnectionOpen)}
              className="w-full text-left flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">Home Connection</h3>
              <span className={`text-gray-400 text-sm transition-transform duration-200 ${homeConnectionOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {homeConnectionOpen && (
              <div className="bg-stone-50 border-t border-gray-200 px-5 py-4">
                <ul className="space-y-2 text-base text-gray-600 leading-relaxed">
                  <li>• Weekly phoneme practice sheets</li>
                  <li>• Decodable books for home</li>
                  <li>• Parent tips for each phoneme</li>
                  <li>• Progress celebration ideas</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Differentiation Tree Modal */}
      {showDifferentiationTreeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg pt-2 px-3 pb-2 max-w-4xl w-full max-h-[85vh] overflow-y-auto relative" style={{
            background: 'radial-gradient(ellipse at center, #ffffff 60%, #f8fafc 85%, #e2e8f0 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-bold text-black">Differentiation Decision Tree</h2>
              <button
                onClick={() => setShowDifferentiationTreeModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/40 rounded-lg p-2 border border-blue-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                <h3 className="font-bold text-sm text-black mb-0.5">Step 1: Initial Assessment</h3>
                <p className="text-sm text-black mb-0.5">Assess student&apos;s current phonemic awareness level:</p>
                <ul className="list-disc list-inside text-sm text-black space-y-0.5">
                  <li>Can identify beginning sounds? → <strong>Yes:</strong> Proceed to Step 2 | <strong>No:</strong> Start with Tier 2</li>
                  <li>Can blend 2-3 sounds? → <strong>Yes:</strong> Proceed to Step 2 | <strong>No:</strong> Start with Tier 2</li>
                  <li>Can segment simple words? → <strong>Yes:</strong> Ready for Tier 1 | <strong>No:</strong> Start with Tier 2</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/40 rounded-lg p-2 border border-emerald-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                <h3 className="font-bold text-sm text-black mb-1">Step 2: Placement Decision</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-white/60 rounded p-2">
                    <h4 className="font-semibold text-sm text-black mb-1">Tier 1 (Grade Level)</h4>
                    <ul className="text-xs text-black space-y-0.5">
                      <li>• 80%+ on phoneme assessment</li>
                      <li>• 2-3 days per phoneme</li>
                      <li>• Regular classroom instruction</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-2">
                    <h4 className="font-semibold text-sm text-black mb-1">Tier 2 (Intervention)</h4>
                    <ul className="text-xs text-black space-y-0.5">
                      <li>• 50-79% on assessment</li>
                      <li>• 5-7 days per phoneme</li>
                      <li>• Multisensory techniques</li>
                      <li>• Small group instruction</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-2">
                    <h4 className="font-semibold text-sm text-black mb-1">Tier 3 (Intensive)</h4>
                    <ul className="text-xs text-black space-y-0.5">
                      <li>• Below 50% on assessment</li>
                      <li>• 7-10 days per phoneme</li>
                      <li>• 1:1 or very small group</li>
                      <li>• Specialized materials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/40 rounded-lg p-2 border border-amber-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                <h3 className="font-bold text-sm text-black mb-0.5">Step 3: Progress Monitoring / Weekly assessment protocol:</h3>
                <ul className="list-disc list-inside text-sm text-black space-y-0.5">
                  <li><strong>Making Progress:</strong> Continue current tier placement</li>
                  <li><strong>Struggling:</strong> Move to higher tier or extend timeline</li>
                  <li><strong>Exceeding:</strong> Consider moving to lower tier or acceleration</li>
                  <li><strong>Plateau:</strong> Adjust instructional methods, consider different approach</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-lg p-2 border border-purple-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                <h3 className="font-bold text-sm text-black mb-1">Special Considerations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-white/60 rounded p-2">
                    <h4 className="font-semibold text-sm text-black mb-1">English Language Learners</h4>
                    <ul className="text-xs text-black space-y-0.5">
                      <li>• Extra oral language support</li>
                      <li>• Visual/gesture connections</li>
                      <li>• L1 language comparisons</li>
                      <li>• Extended vocabulary focus</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 rounded p-2">
                    <h4 className="font-semibold text-sm text-black mb-1">Advanced Learners</h4>
                    <ul className="text-xs text-black space-y-0.5">
                      <li>• Accelerated timeline</li>
                      <li>• Complex word patterns</li>
                      <li>• Morphology connections</li>
                      <li>• Independent exploration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Phase Modal */}
      {showStudentPhaseModal && (
        <div className={`fixed inset-0 bg-black flex items-start justify-center z-50 transition-all duration-500 ${studentPhaseModalVisible ? 'bg-opacity-40' : 'bg-opacity-0'}`} style={{paddingTop: '95px'}}>
          <div className={`bg-white bg-subtle-texture rounded-lg mx-auto w-[95%] max-w-[1600px] max-h-[90vh] overflow-y-auto transition-all duration-700 transform ${studentPhaseModalVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`} style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3)'
          }}>
            <div className="flex justify-between items-center p-4 pb-2">
              <h2 className="text-xl font-bold text-deepNavy">
                Student Phase
              </h2>
              <button
                onClick={() => {
                  setStudentPhaseModalVisible(false);
                  setShowStudentPhaseModal(false);
                }}
                className="text-teal-700 hover:text-teal-800 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="px-4 pb-4 space-y-2">
              {/* Purple phase name header */}
              <div className="bg-gradient-to-br from-indigo-600/50 via-purple-600/45 to-purple-500/50 rounded-xl p-4 relative overflow-hidden shadow-xl border border-purple-400">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                <h3 className="font-bold text-white text-lg drop-shadow-lg">
                  {stageInfo.student_phase}
                </h3>
              </div>

              {/* Summary box */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3">
                <p className="text-gray-800 text-base leading-relaxed">
                  {EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.summary || ''}
                </p>
              </div>

              {/* 2x2 Grid for main sections */}
              <div className="grid grid-cols-2 gap-3">
                {/* What Students Can Do - Top Left */}
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 h-full">
                  <h4 className="font-bold text-base mb-1 text-emerald-800">What Students Can Do ✅</h4>
                  <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 space-y-1">
                    {EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.studentCanDo?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags - Top Right */}
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 h-full">
                  <h4 className="font-bold text-base mb-1 text-red-800">Red Flags 🚩</h4>
                  <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 space-y-1">
                    {EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.redFlags?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* What Students Need - Bottom Left */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 h-full">
                  <h4 className="font-bold text-base mb-1 text-amber-800">What Students Need 📋</h4>
                  <ul className="list-disc list-inside text-sm leading-relaxed text-gray-700 space-y-1">
                    {EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.studentNeeds?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Brain Connection - Bottom Right */}
                <div className="bg-purple-50 border border-purple-300 rounded-xl p-4 h-full">
                  <h4 className="font-bold text-base mb-1 text-purple-800">Brain Connection 🧠</h4>
                  <p className="text-sm leading-relaxed text-gray-700 italic">
                    {EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.brainConnection || ''}
                  </p>
                </div>
              </div>

              {/* Parent Conference Language */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <h4 className="font-bold text-sm mb-1 text-gray-700">💬 Parent Conference Language</h4>
                <p className="text-sm leading-relaxed text-gray-600 italic">
                  &ldquo;{EIGHT_STAGE_SYSTEM[stageNumber - 1]?.science_of_reading_alignment?.ehri_phase_description?.parentConferenceLine || ''}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}