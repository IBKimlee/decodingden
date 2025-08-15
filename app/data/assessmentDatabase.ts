// 🌟 DECODING DEN: COMPREHENSIVE ASSESSMENT DATABASE 🌟
// © 2025 Decoding Den. All rights reserved.
// Formal assessments for Stage 1 & 2 phonics progression

import { LEGAL_COMPLIANCE } from './allStagesDatabase';

export interface AssessmentQuestion {
  id: string;
  type: 'letter_identification' | 'phoneme_production' | 'letter_sound_correspondence' | 'cvc_blending' | 'phoneme_segmentation' | 'spelling';
  stimulus: string;
  expected_response: string;
  scoring: 'correct' | 'incorrect';
  points: number;
}

export interface Assessment {
  assessment_id: string;
  title: string;
  stage: number;
  week_range: string;
  checkpoint_week: number;
  phonemes_assessed: string[];
  total_points: number;
  benchmark_score: number;
  duration: string;
  instructions: {
    teacher: string;
    student: string;
  };
  questions: AssessmentQuestion[];
  scoring_rubric: {
    mastery: string;
    developing: string;
    beginning: string;
  };
  intervention_recommendations: {
    below_benchmark: string[];
    approaching_benchmark: string[];
  };
}

// COMPREHENSIVE ASSESSMENTS FOR ALL STAGES
export const ALL_ASSESSMENTS: Assessment[] = [
  {
    assessment_id: "stage1_week2_checkpoint",
    title: "Stage 1 Checkpoint Assessment: Weeks 1-2",
    stage: 1,
    week_range: "Weeks 1-2",
    checkpoint_week: 2,
    phonemes_assessed: ["/m/", "/s/", "/a/", "/t/", "/n/"],
    total_points: 25,
    benchmark_score: 20,
    duration: "10-15 minutes",
    instructions: {
      teacher: "Administer individually. Point to each letter/word and ask student to respond. Record responses accurately. Provide neutral feedback ('Thank you') regardless of correctness.",
      student: "I'm going to show you some letters and words. Tell me the sound each letter makes, or read the word for me."
    },
    questions: [
      // Letter Identification (5 points)
      { id: "q1", type: "letter_identification", stimulus: "m", expected_response: "m", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "s", expected_response: "s", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "a", expected_response: "a", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "t", expected_response: "t", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "n", expected_response: "n", scoring: "correct", points: 1 },
      
      // Phoneme Production (5 points)
      { id: "q6", type: "phoneme_production", stimulus: "m", expected_response: "/m/", scoring: "correct", points: 1 },
      { id: "q7", type: "phoneme_production", stimulus: "s", expected_response: "/s/", scoring: "correct", points: 1 },
      { id: "q8", type: "phoneme_production", stimulus: "a", expected_response: "/a/", scoring: "correct", points: 1 },
      { id: "q9", type: "phoneme_production", stimulus: "t", expected_response: "/t/", scoring: "correct", points: 1 },
      { id: "q10", type: "phoneme_production", stimulus: "n", expected_response: "/n/", scoring: "correct", points: 1 },
      
      // CVC Blending (10 points)
      { id: "q11", type: "cvc_blending", stimulus: "mat", expected_response: "mat", scoring: "correct", points: 2 },
      { id: "q12", type: "cvc_blending", stimulus: "sat", expected_response: "sat", scoring: "correct", points: 2 },
      { id: "q13", type: "cvc_blending", stimulus: "tan", expected_response: "tan", scoring: "correct", points: 2 },
      { id: "q14", type: "cvc_blending", stimulus: "man", expected_response: "man", scoring: "correct", points: 2 },
      { id: "q15", type: "cvc_blending", stimulus: "ant", expected_response: "ant", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (5 points)
      { id: "q16", type: "phoneme_segmentation", stimulus: "mat", expected_response: "/m/ /a/ /t/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_segmentation", stimulus: "sat", expected_response: "/s/ /a/ /t/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_segmentation", stimulus: "tan", expected_response: "/t/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_segmentation", stimulus: "man", expected_response: "/m/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_segmentation", stimulus: "ant", expected_response: "/a/ /n/ /t/", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "20-25 points (80-100%): Student demonstrates solid understanding of taught phonemes and can blend/segment CVC words consistently.",
      developing: "15-19 points (60-79%): Student shows good progress but needs continued practice with some phonemes or blending skills.",
      beginning: "0-14 points (0-59%): Student requires intensive intervention and additional instruction in phonemic awareness and letter-sound correspondence."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Provide additional multisensory phoneme instruction",
        "Use letter-sound correspondence games and activities",
        "Practice CVC blending with manipulatives",
        "Implement daily 5-minute phoneme drills"
      ],
      approaching_benchmark: [
        "Continue systematic phonics instruction",
        "Provide extra practice with challenging phonemes",
        "Use decodable readers for application practice"
      ]
    }
  },

  {
    assessment_id: "stage1_week4_checkpoint",
    title: "Stage 1 Checkpoint Assessment: Weeks 1-4",
    stage: 1,
    week_range: "Weeks 1-4",
    checkpoint_week: 4,
    phonemes_assessed: ["/m/", "/s/", "/a/", "/t/", "/n/", "/p/", "/i/", "/d/", "/f/"],
    total_points: 36,
    benchmark_score: 29,
    duration: "15-20 minutes",
    instructions: {
      teacher: "Administer individually. This assessment builds on Week 2 checkpoint with additional phonemes. Record all responses. Note any patterns in errors for intervention planning.",
      student: "I'm going to show you letters and words we've been learning. Tell me the sounds or read the words for me."
    },
    questions: [
      // Letter Identification (9 points)
      { id: "q1", type: "letter_identification", stimulus: "m", expected_response: "m", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "s", expected_response: "s", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "a", expected_response: "a", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "t", expected_response: "t", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "n", expected_response: "n", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "p", expected_response: "p", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "i", expected_response: "i", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "d", expected_response: "d", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "f", expected_response: "f", scoring: "correct", points: 1 },
      
      // Phoneme Production (9 points)
      { id: "q10", type: "phoneme_production", stimulus: "m", expected_response: "/m/", scoring: "correct", points: 1 },
      { id: "q11", type: "phoneme_production", stimulus: "s", expected_response: "/s/", scoring: "correct", points: 1 },
      { id: "q12", type: "phoneme_production", stimulus: "a", expected_response: "/a/", scoring: "correct", points: 1 },
      { id: "q13", type: "phoneme_production", stimulus: "t", expected_response: "/t/", scoring: "correct", points: 1 },
      { id: "q14", type: "phoneme_production", stimulus: "n", expected_response: "/n/", scoring: "correct", points: 1 },
      { id: "q15", type: "phoneme_production", stimulus: "p", expected_response: "/p/", scoring: "correct", points: 1 },
      { id: "q16", type: "phoneme_production", stimulus: "i", expected_response: "/i/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "d", expected_response: "/d/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "f", expected_response: "/f/", scoring: "correct", points: 1 },
      
      // CVC Blending (12 points)
      { id: "q19", type: "cvc_blending", stimulus: "mat", expected_response: "mat", scoring: "correct", points: 2 },
      { id: "q20", type: "cvc_blending", stimulus: "sit", expected_response: "sit", scoring: "correct", points: 2 },
      { id: "q21", type: "cvc_blending", stimulus: "pan", expected_response: "pan", scoring: "correct", points: 2 },
      { id: "q22", type: "cvc_blending", stimulus: "dip", expected_response: "dip", scoring: "correct", points: 2 },
      { id: "q23", type: "cvc_blending", stimulus: "fan", expected_response: "fan", scoring: "correct", points: 2 },
      { id: "q24", type: "cvc_blending", stimulus: "tin", expected_response: "tin", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (6 points)
      { id: "q25", type: "phoneme_segmentation", stimulus: "mat", expected_response: "/m/ /a/ /t/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_segmentation", stimulus: "sit", expected_response: "/s/ /i/ /t/", scoring: "correct", points: 1 },
      { id: "q27", type: "phoneme_segmentation", stimulus: "pan", expected_response: "/p/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q28", type: "phoneme_segmentation", stimulus: "dip", expected_response: "/d/ /i/ /p/", scoring: "correct", points: 1 },
      { id: "q29", type: "phoneme_segmentation", stimulus: "fan", expected_response: "/f/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q30", type: "phoneme_segmentation", stimulus: "tin", expected_response: "/t/ /i/ /n/", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "29-36 points (80-100%): Student demonstrates mastery of all taught phonemes and shows strong CVC blending and segmentation skills.",
      developing: "22-28 points (60-79%): Student shows good progress with most phonemes but may need additional practice with newer sounds or blending.",
      beginning: "0-21 points (0-59%): Student requires intervention with phonemic awareness and systematic review of taught phonemes."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Intensive small group phonics intervention",
        "Daily phoneme practice with immediate feedback",
        "Use multisensory techniques (visual, auditory, kinesthetic)",
        "Focus on phonemic awareness activities before advancing"
      ],
      approaching_benchmark: [
        "Targeted practice with missed phonemes",
        "Additional CVC blending practice with manipulatives",
        "Increase daily phonics instruction time"
      ]
    }
  },

  {
    assessment_id: "stage1_week6_checkpoint",
    title: "Stage 1 Checkpoint Assessment: Weeks 1-6",
    stage: 1,
    week_range: "Weeks 1-6",
    checkpoint_week: 6,
    phonemes_assessed: ["/m/", "/s/", "/a/", "/t/", "/n/", "/p/", "/i/", "/d/", "/f/", "/o/", "/l/", "/h/", "/b/"],
    total_points: 51,
    benchmark_score: 41,
    duration: "20-25 minutes",
    instructions: {
      teacher: "Comprehensive assessment of first 6 weeks. Administer over two sessions if needed. Focus on fluency as well as accuracy for mastery-level students.",
      student: "Today we'll review all the letters and sounds we've learned so far. Take your time and do your best."
    },
    questions: [
      // Letter Identification (13 points)
      { id: "q1", type: "letter_identification", stimulus: "m", expected_response: "m", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "s", expected_response: "s", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "a", expected_response: "a", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "t", expected_response: "t", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "n", expected_response: "n", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "p", expected_response: "p", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "i", expected_response: "i", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "d", expected_response: "d", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "f", expected_response: "f", scoring: "correct", points: 1 },
      { id: "q10", type: "letter_identification", stimulus: "o", expected_response: "o", scoring: "correct", points: 1 },
      { id: "q11", type: "letter_identification", stimulus: "l", expected_response: "l", scoring: "correct", points: 1 },
      { id: "q12", type: "letter_identification", stimulus: "h", expected_response: "h", scoring: "correct", points: 1 },
      { id: "q13", type: "letter_identification", stimulus: "b", expected_response: "b", scoring: "correct", points: 1 },
      
      // Phoneme Production (13 points) 
      { id: "q14", type: "phoneme_production", stimulus: "m", expected_response: "/m/", scoring: "correct", points: 1 },
      { id: "q15", type: "phoneme_production", stimulus: "s", expected_response: "/s/", scoring: "correct", points: 1 },
      { id: "q16", type: "phoneme_production", stimulus: "a", expected_response: "/a/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "t", expected_response: "/t/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "n", expected_response: "/n/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_production", stimulus: "p", expected_response: "/p/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_production", stimulus: "i", expected_response: "/i/", scoring: "correct", points: 1 },
      { id: "q21", type: "phoneme_production", stimulus: "d", expected_response: "/d/", scoring: "correct", points: 1 },
      { id: "q22", type: "phoneme_production", stimulus: "f", expected_response: "/f/", scoring: "correct", points: 1 },
      { id: "q23", type: "phoneme_production", stimulus: "o", expected_response: "/o/", scoring: "correct", points: 1 },
      { id: "q24", type: "phoneme_production", stimulus: "l", expected_response: "/l/", scoring: "correct", points: 1 },
      { id: "q25", type: "phoneme_production", stimulus: "h", expected_response: "/h/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_production", stimulus: "b", expected_response: "/b/", scoring: "correct", points: 1 },
      
      // CVC Blending (15 points)
      { id: "q27", type: "cvc_blending", stimulus: "hot", expected_response: "hot", scoring: "correct", points: 2 },
      { id: "q28", type: "cvc_blending", stimulus: "bat", expected_response: "bat", scoring: "correct", points: 2 },
      { id: "q29", type: "cvc_blending", stimulus: "lot", expected_response: "lot", scoring: "correct", points: 2 },
      { id: "q30", type: "cvc_blending", stimulus: "lap", expected_response: "lap", scoring: "correct", points: 2 },
      { id: "q31", type: "cvc_blending", stimulus: "hit", expected_response: "hit", scoring: "correct", points: 2 },
      { id: "q32", type: "cvc_blending", stimulus: "had", expected_response: "had", scoring: "correct", points: 2 },
      { id: "q33", type: "cvc_blending", stimulus: "top", expected_response: "top", scoring: "correct", points: 1 },
      { id: "q34", type: "cvc_blending", stimulus: "bid", expected_response: "bid", scoring: "correct", points: 1 },
      { id: "q35", type: "cvc_blending", stimulus: "lit", expected_response: "lit", scoring: "correct", points: 1 },
      
      // Phoneme Segmentation (6 points)
      { id: "q36", type: "phoneme_segmentation", stimulus: "hot", expected_response: "/h/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q37", type: "phoneme_segmentation", stimulus: "bat", expected_response: "/b/ /a/ /t/", scoring: "correct", points: 1 },
      { id: "q38", type: "phoneme_segmentation", stimulus: "lot", expected_response: "/l/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q39", type: "phoneme_segmentation", stimulus: "lap", expected_response: "/l/ /a/ /p/", scoring: "correct", points: 1 },
      { id: "q40", type: "phoneme_segmentation", stimulus: "hit", expected_response: "/h/ /i/ /t/", scoring: "correct", points: 1 },
      { id: "q41", type: "phoneme_segmentation", stimulus: "had", expected_response: "/h/ /a/ /d/", scoring: "correct", points: 1 },
      
      // Spelling CVC Words (4 points)
      { id: "q42", type: "spelling", stimulus: "bat (spell this word)", expected_response: "b-a-t", scoring: "correct", points: 1 },
      { id: "q43", type: "spelling", stimulus: "hot (spell this word)", expected_response: "h-o-t", scoring: "correct", points: 1 },
      { id: "q44", type: "spelling", stimulus: "lap (spell this word)", expected_response: "l-a-p", scoring: "correct", points: 1 },
      { id: "q45", type: "spelling", stimulus: "sit (spell this word)", expected_response: "s-i-t", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "41-51 points (80-100%): Student demonstrates mastery of all taught phonemes with strong blending, segmentation, and spelling skills.",
      developing: "31-40 points (60-79%): Student shows solid progress with most skills but needs additional practice with some phonemes or application skills.",
      beginning: "0-30 points (0-59%): Student requires systematic intervention and intensive instruction in foundational phonics skills."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Implement intensive daily phonics intervention (15-20 minutes)",
        "Use systematic multisensory instruction",
        "Focus on phonemic awareness before advancing to new phonemes",
        "Consider one-on-one instruction for foundational skills"
      ],
      approaching_benchmark: [
        "Provide additional practice with challenging phonemes",
        "Use decodable texts for application practice",
        "Implement targeted small group instruction"
      ]
    }
  },

  {
    assessment_id: "stage1_week8_checkpoint",
    title: "Stage 1 Checkpoint Assessment: Weeks 1-8",
    stage: 1,
    week_range: "Weeks 1-8",
    checkpoint_week: 8,
    phonemes_assessed: ["/m/", "/s/", "/a/", "/t/", "/n/", "/p/", "/i/", "/d/", "/f/", "/o/", "/l/", "/h/", "/b/", "/e/", "/u/"],
    total_points: 58,
    benchmark_score: 46,
    duration: "25-30 minutes",
    instructions: {
      teacher: "Comprehensive assessment including all 15 Stage 1 phonemes. May be administered over multiple sessions. Focus on fluency and automaticity for students demonstrating mastery.",
      student: "This is our big assessment of everything we've learned in Stage 1. You know all these letters and sounds well!"
    },
    questions: [
      // Letter Identification (15 points)
      { id: "q1", type: "letter_identification", stimulus: "m", expected_response: "m", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "s", expected_response: "s", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "a", expected_response: "a", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "t", expected_response: "t", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "n", expected_response: "n", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "p", expected_response: "p", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "i", expected_response: "i", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "d", expected_response: "d", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "f", expected_response: "f", scoring: "correct", points: 1 },
      { id: "q10", type: "letter_identification", stimulus: "o", expected_response: "o", scoring: "correct", points: 1 },
      { id: "q11", type: "letter_identification", stimulus: "l", expected_response: "l", scoring: "correct", points: 1 },
      { id: "q12", type: "letter_identification", stimulus: "h", expected_response: "h", scoring: "correct", points: 1 },
      { id: "q13", type: "letter_identification", stimulus: "b", expected_response: "b", scoring: "correct", points: 1 },
      { id: "q14", type: "letter_identification", stimulus: "e", expected_response: "e", scoring: "correct", points: 1 },
      { id: "q15", type: "letter_identification", stimulus: "u", expected_response: "u", scoring: "correct", points: 1 },
      
      // Phoneme Production (15 points)
      { id: "q16", type: "phoneme_production", stimulus: "m", expected_response: "/m/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "s", expected_response: "/s/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "a", expected_response: "/a/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_production", stimulus: "t", expected_response: "/t/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_production", stimulus: "n", expected_response: "/n/", scoring: "correct", points: 1 },
      { id: "q21", type: "phoneme_production", stimulus: "p", expected_response: "/p/", scoring: "correct", points: 1 },
      { id: "q22", type: "phoneme_production", stimulus: "i", expected_response: "/i/", scoring: "correct", points: 1 },
      { id: "q23", type: "phoneme_production", stimulus: "d", expected_response: "/d/", scoring: "correct", points: 1 },
      { id: "q24", type: "phoneme_production", stimulus: "f", expected_response: "/f/", scoring: "correct", points: 1 },
      { id: "q25", type: "phoneme_production", stimulus: "o", expected_response: "/o/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_production", stimulus: "l", expected_response: "/l/", scoring: "correct", points: 1 },
      { id: "q27", type: "phoneme_production", stimulus: "h", expected_response: "/h/", scoring: "correct", points: 1 },
      { id: "q28", type: "phoneme_production", stimulus: "b", expected_response: "/b/", scoring: "correct", points: 1 },
      { id: "q29", type: "phoneme_production", stimulus: "e", expected_response: "/e/", scoring: "correct", points: 1 },
      { id: "q30", type: "phoneme_production", stimulus: "u", expected_response: "/u/", scoring: "correct", points: 1 },
      
      // CVC Blending (16 points)
      { id: "q31", type: "cvc_blending", stimulus: "bet", expected_response: "bet", scoring: "correct", points: 2 },
      { id: "q32", type: "cvc_blending", stimulus: "hut", expected_response: "hut", scoring: "correct", points: 2 },
      { id: "q33", type: "cvc_blending", stimulus: "mud", expected_response: "mud", scoring: "correct", points: 2 },
      { id: "q34", type: "cvc_blending", stimulus: "pet", expected_response: "pet", scoring: "correct", points: 2 },
      { id: "q35", type: "cvc_blending", stimulus: "bus", expected_response: "bus", scoring: "correct", points: 2 },
      { id: "q36", type: "cvc_blending", stimulus: "net", expected_response: "net", scoring: "correct", points: 2 },
      { id: "q37", type: "cvc_blending", stimulus: "hum", expected_response: "hum", scoring: "correct", points: 2 },
      { id: "q38", type: "cvc_blending", stimulus: "led", expected_response: "led", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (8 points)
      { id: "q39", type: "phoneme_segmentation", stimulus: "bet", expected_response: "/b/ /e/ /t/", scoring: "correct", points: 1 },
      { id: "q40", type: "phoneme_segmentation", stimulus: "hut", expected_response: "/h/ /u/ /t/", scoring: "correct", points: 1 },
      { id: "q41", type: "phoneme_segmentation", stimulus: "mud", expected_response: "/m/ /u/ /d/", scoring: "correct", points: 1 },
      { id: "q42", type: "phoneme_segmentation", stimulus: "pet", expected_response: "/p/ /e/ /t/", scoring: "correct", points: 1 },
      { id: "q43", type: "phoneme_segmentation", stimulus: "bus", expected_response: "/b/ /u/ /s/", scoring: "correct", points: 1 },
      { id: "q44", type: "phoneme_segmentation", stimulus: "net", expected_response: "/n/ /e/ /t/", scoring: "correct", points: 1 },
      { id: "q45", type: "phoneme_segmentation", stimulus: "hum", expected_response: "/h/ /u/ /m/", scoring: "correct", points: 1 },
      { id: "q46", type: "phoneme_segmentation", stimulus: "led", expected_response: "/l/ /e/ /d/", scoring: "correct", points: 1 },
      
      // Spelling (4 points)
      { id: "q47", type: "spelling", stimulus: "pet (spell this word)", expected_response: "p-e-t", scoring: "correct", points: 1 },
      { id: "q48", type: "spelling", stimulus: "hut (spell this word)", expected_response: "h-u-t", scoring: "correct", points: 1 },
      { id: "q49", type: "spelling", stimulus: "bed (spell this word)", expected_response: "b-e-d", scoring: "correct", points: 1 },
      { id: "q50", type: "spelling", stimulus: "mud (spell this word)", expected_response: "m-u-d", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "46-58 points (80-100%): Student demonstrates mastery of all Stage 1 phonemes and is ready to advance to Stage 2.",
      developing: "35-45 points (60-79%): Student shows good progress but needs additional practice before advancing.",
      beginning: "0-34 points (0-59%): Student requires intensive intervention and should not advance until foundational skills are secured."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Continue Stage 1 instruction with intensive intervention",
        "Do not advance to Stage 2 until mastery is achieved",
        "Implement daily one-on-one or small group instruction",
        "Use comprehensive multisensory phonics program"
      ],
      approaching_benchmark: [
        "Provide targeted practice with missed phonemes",
        "Continue Stage 1 review while beginning Stage 2 phonemes slowly",
        "Monitor progress closely with weekly assessments"
      ]
    }
  },

  {
    assessment_id: "stage1_week10_summative",
    title: "Stage 1 Summative Assessment: Complete Stage Mastery",
    stage: 1,
    week_range: "Weeks 1-10",
    checkpoint_week: 10,
    phonemes_assessed: ["/m/", "/s/", "/a/", "/t/", "/n/", "/p/", "/i/", "/d/", "/f/", "/o/", "/l/", "/h/", "/b/", "/e/", "/u/"],
    total_points: 70,
    benchmark_score: 56,
    duration: "30-35 minutes",
    instructions: {
      teacher: "Final comprehensive assessment for Stage 1. This assessment determines readiness for Stage 2. Administer over multiple sessions if needed. Include fluency timing for mastery-level students.",
      student: "This is our final test for Stage 1! You've learned so much. Show me everything you know about letters and sounds."
    },
    questions: [
      // Letter Identification (15 points)
      { id: "q1", type: "letter_identification", stimulus: "m", expected_response: "m", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "s", expected_response: "s", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "a", expected_response: "a", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "t", expected_response: "t", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "n", expected_response: "n", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "p", expected_response: "p", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "i", expected_response: "i", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "d", expected_response: "d", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "f", expected_response: "f", scoring: "correct", points: 1 },
      { id: "q10", type: "letter_identification", stimulus: "o", expected_response: "o", scoring: "correct", points: 1 },
      { id: "q11", type: "letter_identification", stimulus: "l", expected_response: "l", scoring: "correct", points: 1 },
      { id: "q12", type: "letter_identification", stimulus: "h", expected_response: "h", scoring: "correct", points: 1 },
      { id: "q13", type: "letter_identification", stimulus: "b", expected_response: "b", scoring: "correct", points: 1 },
      { id: "q14", type: "letter_identification", stimulus: "e", expected_response: "e", scoring: "correct", points: 1 },
      { id: "q15", type: "letter_identification", stimulus: "u", expected_response: "u", scoring: "correct", points: 1 },
      
      // Phoneme Production (15 points)
      { id: "q16", type: "phoneme_production", stimulus: "m", expected_response: "/m/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "s", expected_response: "/s/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "a", expected_response: "/a/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_production", stimulus: "t", expected_response: "/t/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_production", stimulus: "n", expected_response: "/n/", scoring: "correct", points: 1 },
      { id: "q21", type: "phoneme_production", stimulus: "p", expected_response: "/p/", scoring: "correct", points: 1 },
      { id: "q22", type: "phoneme_production", stimulus: "i", expected_response: "/i/", scoring: "correct", points: 1 },
      { id: "q23", type: "phoneme_production", stimulus: "d", expected_response: "/d/", scoring: "correct", points: 1 },
      { id: "q24", type: "phoneme_production", stimulus: "f", expected_response: "/f/", scoring: "correct", points: 1 },
      { id: "q25", type: "phoneme_production", stimulus: "o", expected_response: "/o/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_production", stimulus: "l", expected_response: "/l/", scoring: "correct", points: 1 },
      { id: "q27", type: "phoneme_production", stimulus: "h", expected_response: "/h/", scoring: "correct", points: 1 },
      { id: "q28", type: "phoneme_production", stimulus: "b", expected_response: "/b/", scoring: "correct", points: 1 },
      { id: "q29", type: "phoneme_production", stimulus: "e", expected_response: "/e/", scoring: "correct", points: 1 },
      { id: "q30", type: "phoneme_production", stimulus: "u", expected_response: "/u/", scoring: "correct", points: 1 },
      
      // CVC Blending - Fluency Focused (20 points)
      { id: "q31", type: "cvc_blending", stimulus: "mat", expected_response: "mat", scoring: "correct", points: 2 },
      { id: "q32", type: "cvc_blending", stimulus: "sit", expected_response: "sit", scoring: "correct", points: 2 },
      { id: "q33", type: "cvc_blending", stimulus: "hot", expected_response: "hot", scoring: "correct", points: 2 },
      { id: "q34", type: "cvc_blending", stimulus: "bed", expected_response: "bed", scoring: "correct", points: 2 },
      { id: "q35", type: "cvc_blending", stimulus: "fun", expected_response: "fun", scoring: "correct", points: 2 },
      { id: "q36", type: "cvc_blending", stimulus: "lap", expected_response: "lap", scoring: "correct", points: 2 },
      { id: "q37", type: "cvc_blending", stimulus: "dim", expected_response: "dim", scoring: "correct", points: 2 },
      { id: "q38", type: "cvc_blending", stimulus: "pot", expected_response: "pot", scoring: "correct", points: 2 },
      { id: "q39", type: "cvc_blending", stimulus: "hug", expected_response: "hug", scoring: "correct", points: 2 },
      { id: "q40", type: "cvc_blending", stimulus: "net", expected_response: "net", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (10 points)
      { id: "q41", type: "phoneme_segmentation", stimulus: "mat", expected_response: "/m/ /a/ /t/", scoring: "correct", points: 1 },
      { id: "q42", type: "phoneme_segmentation", stimulus: "sit", expected_response: "/s/ /i/ /t/", scoring: "correct", points: 1 },
      { id: "q43", type: "phoneme_segmentation", stimulus: "hot", expected_response: "/h/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q44", type: "phoneme_segmentation", stimulus: "bed", expected_response: "/b/ /e/ /d/", scoring: "correct", points: 1 },
      { id: "q45", type: "phoneme_segmentation", stimulus: "fun", expected_response: "/f/ /u/ /n/", scoring: "correct", points: 1 },
      { id: "q46", type: "phoneme_segmentation", stimulus: "lap", expected_response: "/l/ /a/ /p/", scoring: "correct", points: 1 },
      { id: "q47", type: "phoneme_segmentation", stimulus: "dim", expected_response: "/d/ /i/ /m/", scoring: "correct", points: 1 },
      { id: "q48", type: "phoneme_segmentation", stimulus: "pot", expected_response: "/p/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q49", type: "phoneme_segmentation", stimulus: "hug", expected_response: "/h/ /u/ /g/", scoring: "correct", points: 1 },
      { id: "q50", type: "phoneme_segmentation", stimulus: "net", expected_response: "/n/ /e/ /t/", scoring: "correct", points: 1 },
      
      // Spelling & Writing (10 points)
      { id: "q51", type: "spelling", stimulus: "mat (spell this word)", expected_response: "m-a-t", scoring: "correct", points: 2 },
      { id: "q52", type: "spelling", stimulus: "big (spell this word)", expected_response: "b-i-g", scoring: "correct", points: 2 },
      { id: "q53", type: "spelling", stimulus: "hot (spell this word)", expected_response: "h-o-t", scoring: "correct", points: 2 },
      { id: "q54", type: "spelling", stimulus: "pen (spell this word)", expected_response: "p-e-n", scoring: "correct", points: 2 },
      { id: "q55", type: "spelling", stimulus: "fun (spell this word)", expected_response: "f-u-n", scoring: "correct", points: 2 }
    ],
    scoring_rubric: {
      mastery: "56-70 points (80-100%): Student demonstrates complete mastery of Stage 1 and is ready to advance to Stage 2.",
      developing: "42-55 points (60-79%): Student shows good progress but should continue Stage 1 review alongside Stage 2 introduction.",
      beginning: "0-41 points (0-59%): Student must continue intensive Stage 1 instruction and should not advance to Stage 2."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Repeat Stage 1 with intensive intervention support",
        "Implement daily systematic phonics instruction",
        "Use multisensory instructional approaches",
        "Consider individual assessment for learning differences"
      ],
      approaching_benchmark: [
        "Begin Stage 2 with continued Stage 1 review",
        "Provide additional practice with challenging phonemes",
        "Monitor progress with weekly mini-assessments"
      ]
    }
  },

  // STAGE 2 ASSESSMENTS - KINDERGARTEN SPRING
  {
    assessment_id: "stage2_week2_checkpoint",
    title: "Stage 2 Checkpoint Assessment: Weeks 1-2",
    stage: 2,
    week_range: "Weeks 1-2",
    checkpoint_week: 2,
    phonemes_assessed: ["/r/", "/g/", "/k/", "/j/", "/v/"],
    total_points: 26,
    benchmark_score: 21,
    duration: "10-15 minutes",
    instructions: {
      teacher: "Administer individually. Students should have already mastered Stage 1 phonemes. This assessment focuses on new Stage 2 phonemes only.",
      student: "Let's look at some new letters and sounds we've been learning."
    },
    questions: [
      // Letter Identification (5 points)
      { id: "q1", type: "letter_identification", stimulus: "r", expected_response: "r", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "g", expected_response: "g", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "k", expected_response: "k", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "j", expected_response: "j", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "v", expected_response: "v", scoring: "correct", points: 1 },
      
      // Phoneme Production (5 points)
      { id: "q6", type: "phoneme_production", stimulus: "r", expected_response: "/r/", scoring: "correct", points: 1 },
      { id: "q7", type: "phoneme_production", stimulus: "g", expected_response: "/g/", scoring: "correct", points: 1 },
      { id: "q8", type: "phoneme_production", stimulus: "k", expected_response: "/k/", scoring: "correct", points: 1 },
      { id: "q9", type: "phoneme_production", stimulus: "j", expected_response: "/j/", scoring: "correct", points: 1 },
      { id: "q10", type: "phoneme_production", stimulus: "v", expected_response: "/v/", scoring: "correct", points: 1 },
      
      // CVC/CVCC Word Reading (12 points)
      { id: "q11", type: "cvc_blending", stimulus: "run", expected_response: "run", scoring: "correct", points: 2 },
      { id: "q12", type: "cvc_blending", stimulus: "got", expected_response: "got", scoring: "correct", points: 2 },
      { id: "q13", type: "cvc_blending", stimulus: "kit", expected_response: "kit", scoring: "correct", points: 2 },
      { id: "q14", type: "cvc_blending", stimulus: "jam", expected_response: "jam", scoring: "correct", points: 2 },
      { id: "q15", type: "cvc_blending", stimulus: "van", expected_response: "van", scoring: "correct", points: 2 },
      { id: "q16", type: "cvc_blending", stimulus: "rug", expected_response: "rug", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (6 points) - Same 6 words as above
      { id: "q17", type: "phoneme_segmentation", stimulus: "run", expected_response: "/r/ /u/ /n/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_segmentation", stimulus: "got", expected_response: "/g/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_segmentation", stimulus: "kit", expected_response: "/k/ /i/ /t/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_segmentation", stimulus: "jam", expected_response: "/j/ /a/ /m/", scoring: "correct", points: 1 },
      { id: "q21", type: "phoneme_segmentation", stimulus: "van", expected_response: "/v/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q22", type: "phoneme_segmentation", stimulus: "rug", expected_response: "/r/ /u/ /g/", scoring: "correct", points: 1 },
      
      // Spelling (3 points)
      { id: "q23", type: "spelling", stimulus: "rug (spell this word)", expected_response: "r-u-g", scoring: "correct", points: 1 },
      { id: "q24", type: "spelling", stimulus: "jet (spell this word)", expected_response: "j-e-t", scoring: "correct", points: 1 },
      { id: "q25", type: "spelling", stimulus: "van (spell this word)", expected_response: "v-a-n", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "21-26 points (80-100%): Student demonstrates solid understanding of new Stage 2 phonemes and can apply them in reading and spelling.",
      developing: "16-20 points (60-79%): Student shows good progress but needs continued practice with some of the new phonemes.",
      beginning: "0-15 points (0-59%): Student requires additional instruction and practice with Stage 2 phonemes before advancing."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Review Stage 1 phonemes to ensure foundation is solid",
        "Provide additional practice with /r/ sound production",
        "Use multisensory techniques for distinguishing /g/ and /k/",
        "Practice voiced/unvoiced pairs (/f/-/v/)"
      ],
      approaching_benchmark: [
        "Continue systematic instruction with Stage 2 phonemes",
        "Provide extra practice with challenging sounds",
        "Use decodable texts featuring new phonemes"
      ]
    }
  },

  {
    assessment_id: "stage2_week4_checkpoint",
    title: "Stage 2 Checkpoint Assessment: Weeks 1-4",
    stage: 2,
    week_range: "Weeks 1-4",
    checkpoint_week: 4,
    phonemes_assessed: ["/r/", "/g/", "/k/", "/j/", "/v/", "/w/", "/y/", "/z/", "/x/"],
    total_points: 30,
    benchmark_score: 24,
    duration: "15-20 minutes",
    instructions: {
      teacher: "Comprehensive assessment of all Stage 2 phonemes taught in weeks 1-4. This includes single consonants and the qu pattern. Students should demonstrate mastery before advancing to digraphs.",
      student: "We're going to review all the new letters and sounds we've learned so far in Stage 2."
    },
    questions: [
      // Letter Identification (9 points)
      { id: "q1", type: "letter_identification", stimulus: "r", expected_response: "r", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "g", expected_response: "g", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "k", expected_response: "k", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "j", expected_response: "j", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "v", expected_response: "v", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "w", expected_response: "w", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "y", expected_response: "y", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "z", expected_response: "z", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "x", expected_response: "x", scoring: "correct", points: 1 },
      
      // Phoneme Production (9 points)
      { id: "q10", type: "phoneme_production", stimulus: "r", expected_response: "/r/", scoring: "correct", points: 1 },
      { id: "q11", type: "phoneme_production", stimulus: "g", expected_response: "/g/", scoring: "correct", points: 1 },
      { id: "q12", type: "phoneme_production", stimulus: "k", expected_response: "/k/", scoring: "correct", points: 1 },
      { id: "q13", type: "phoneme_production", stimulus: "j", expected_response: "/j/", scoring: "correct", points: 1 },
      { id: "q14", type: "phoneme_production", stimulus: "v", expected_response: "/v/", scoring: "correct", points: 1 },
      { id: "q15", type: "phoneme_production", stimulus: "w", expected_response: "/w/", scoring: "correct", points: 1 },
      { id: "q16", type: "phoneme_production", stimulus: "y", expected_response: "/y/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "z", expected_response: "/z/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "x", expected_response: "/ks/", scoring: "correct", points: 1 },
      
      // CVC/CVCC Word Reading (12 points) - Matching screenshot exactly
      { id: "q19", type: "cvc_blending", stimulus: "run", expected_response: "run", scoring: "correct", points: 2 },
      { id: "q20", type: "cvc_blending", stimulus: "van", expected_response: "van", scoring: "correct", points: 2 },
      { id: "q21", type: "cvc_blending", stimulus: "zip", expected_response: "zip", scoring: "correct", points: 2 },
      { id: "q22", type: "cvc_blending", stimulus: "got", expected_response: "got", scoring: "correct", points: 2 },
      { id: "q23", type: "cvc_blending", stimulus: "wet", expected_response: "wet", scoring: "correct", points: 2 },
      { id: "q24", type: "cvc_blending", stimulus: "fox", expected_response: "fox", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (6 points) - Same 6 words as above
      { id: "q25", type: "phoneme_segmentation", stimulus: "run", expected_response: "/r/ /u/ /n/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_segmentation", stimulus: "van", expected_response: "/v/ /a/ /n/", scoring: "correct", points: 1 },
      { id: "q27", type: "phoneme_segmentation", stimulus: "zip", expected_response: "/z/ /i/ /p/", scoring: "correct", points: 1 },
      { id: "q28", type: "phoneme_segmentation", stimulus: "got", expected_response: "/g/ /o/ /t/", scoring: "correct", points: 1 },
      { id: "q29", type: "phoneme_segmentation", stimulus: "wet", expected_response: "/w/ /e/ /t/", scoring: "correct", points: 1 },
      { id: "q30", type: "phoneme_segmentation", stimulus: "fox", expected_response: "/f/ /o/ /ks/", scoring: "correct", points: 1 },
      
      // Spelling (3 points)
      { id: "q31", type: "spelling", stimulus: "wet (spell this word)", expected_response: "w-e-t", scoring: "correct", points: 1 },
      { id: "q32", type: "spelling", stimulus: "zip (spell this word)", expected_response: "z-i-p", scoring: "correct", points: 1 },
      { id: "q33", type: "spelling", stimulus: "fox (spell this word)", expected_response: "f-o-x", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "24-30 points (80-100%): Student demonstrates mastery of Stage 2 single phonemes and is ready to learn digraphs.",
      developing: "18-23 points (60-79%): Student shows good progress but needs additional practice with some phonemes before advancing to digraphs.",
      beginning: "0-17 points (0-59%): Student requires intensive instruction and should not advance to digraphs until single phonemes are mastered."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Intensive review of problematic single phonemes",
        "Use multisensory techniques for /r/, /w/, /y/ sounds",
        "Practice distinguishing /v/ from /f/ and /z/ from /s/",
        "Focus on /x/ pattern before advancing"
      ],
      approaching_benchmark: [
        "Targeted practice with missed phonemes",
        "Additional word reading practice with new phonemes",
        "Begin introducing digraph concept slowly"
      ]
    }
  },

  {
    assessment_id: "stage2_week6_checkpoint",
    title: "Stage 2 Checkpoint Assessment: Weeks 1-6",
    stage: 2,
    week_range: "Weeks 1-6",
    checkpoint_week: 6,
    phonemes_assessed: ["/r/", "/g/", "/k/", "/j/", "/v/", "/w/", "/y/", "/z/", "/x/", "/qu/"],
    total_points: 28,
    benchmark_score: 22,
    duration: "20-25 minutes",
    instructions: {
      teacher: "Comprehensive assessment including all Stage 2 phonemes through week 6. This includes single consonants and the qu pattern. Students should demonstrate solid understanding before advancing.",
      student: "We're going to review all the letters, sounds, and qu words we've learned in Stage 2."
    },
    questions: [
      // Letter Identification (10 points) - includes qu
      { id: "q1", type: "letter_identification", stimulus: "r", expected_response: "r", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "g", expected_response: "g", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "k", expected_response: "k", scoring: "correct", points: 1 },
      { id: "q4", type: "letter_identification", stimulus: "j", expected_response: "j", scoring: "correct", points: 1 },
      { id: "q5", type: "letter_identification", stimulus: "v", expected_response: "v", scoring: "correct", points: 1 },
      { id: "q6", type: "letter_identification", stimulus: "w", expected_response: "w", scoring: "correct", points: 1 },
      { id: "q7", type: "letter_identification", stimulus: "y", expected_response: "y", scoring: "correct", points: 1 },
      { id: "q8", type: "letter_identification", stimulus: "z", expected_response: "z", scoring: "correct", points: 1 },
      { id: "q9", type: "letter_identification", stimulus: "x", expected_response: "x", scoring: "correct", points: 1 },
      { id: "q10", type: "letter_identification", stimulus: "qu", expected_response: "qu", scoring: "correct", points: 1 },
      
      // Phoneme Production (10 points)
      { id: "q11", type: "phoneme_production", stimulus: "r", expected_response: "/r/", scoring: "correct", points: 1 },
      { id: "q12", type: "phoneme_production", stimulus: "g", expected_response: "/g/", scoring: "correct", points: 1 },
      { id: "q13", type: "phoneme_production", stimulus: "k", expected_response: "/k/", scoring: "correct", points: 1 },
      { id: "q14", type: "phoneme_production", stimulus: "j", expected_response: "/j/", scoring: "correct", points: 1 },
      { id: "q15", type: "phoneme_production", stimulus: "v", expected_response: "/v/", scoring: "correct", points: 1 },
      { id: "q16", type: "phoneme_production", stimulus: "w", expected_response: "/w/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_production", stimulus: "y", expected_response: "/y/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_production", stimulus: "z", expected_response: "/z/", scoring: "correct", points: 1 },
      { id: "q19", type: "phoneme_production", stimulus: "x", expected_response: "/ks/", scoring: "correct", points: 1 },
      { id: "q20", type: "phoneme_production", stimulus: "qu", expected_response: "/kw/", scoring: "correct", points: 1 },
      
      // CVC/CVCC Word Reading (8 points) - 4 qu words from screenshot
      { id: "q21", type: "cvc_blending", stimulus: "quit", expected_response: "quit", scoring: "correct", points: 2 },
      { id: "q22", type: "cvc_blending", stimulus: "quiz", expected_response: "quiz", scoring: "correct", points: 2 },
      { id: "q23", type: "cvc_blending", stimulus: "quip", expected_response: "quip", scoring: "correct", points: 2 },
      { id: "q24", type: "cvc_blending", stimulus: "quest", expected_response: "quest", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (4 points) - Same 4 qu words as above
      { id: "q25", type: "phoneme_segmentation", stimulus: "quit", expected_response: "/kw/ /i/ /t/", scoring: "correct", points: 1 },
      { id: "q26", type: "phoneme_segmentation", stimulus: "quiz", expected_response: "/kw/ /i/ /z/", scoring: "correct", points: 1 },
      { id: "q27", type: "phoneme_segmentation", stimulus: "quip", expected_response: "/kw/ /i/ /p/", scoring: "correct", points: 1 },
      { id: "q28", type: "phoneme_segmentation", stimulus: "quest", expected_response: "/kw/ /e/ /s/ /t/", scoring: "correct", points: 1 },
      
      // Spelling (3 points)
      { id: "q29", type: "spelling", stimulus: "quit (spell this word)", expected_response: "q-u-i-t", scoring: "correct", points: 1 },
      { id: "q30", type: "spelling", stimulus: "quiz (spell this word)", expected_response: "q-u-i-z", scoring: "correct", points: 1 },
      { id: "q31", type: "spelling", stimulus: "quip (spell this word)", expected_response: "q-u-i-p", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "22-28 points (80-100%): Student demonstrates mastery of Stage 2 phonemes including qu pattern and is ready to advance to Stage 3.",
      developing: "17-21 points (60-79%): Student shows good progress but needs additional practice with qu words before advancing.",
      beginning: "0-16 points (0-59%): Student requires intensive instruction with qu pattern and should continue Stage 2 work."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Intensive review of qu pattern (always qu together, makes /kw/ sound)",
        "Use multisensory techniques for qu word recognition",
        "Practice qu positioning (always at beginning of syllables)",
        "Review single phonemes before advancing to Stage 3"
      ],
      approaching_benchmark: [
        "Targeted practice with qu words",
        "Additional reading practice with qu vocabulary",
        "Reinforce that qu is always together"
      ]
    }
  },

  {
    assessment_id: "stage2_week8_checkpoint",
    title: "Stage 2 Checkpoint Assessment: Weeks 7-8",
    stage: 2,
    week_range: "Weeks 7-8",
    checkpoint_week: 8,
    phonemes_assessed: ["/ch/", "/sh/", "/th/"],
    total_points: 24,
    benchmark_score: 19,
    duration: "15-20 minutes",
    instructions: {
      teacher: "Assessment focusing on the three main digraphs taught in weeks 7-8. Students should demonstrate understanding that digraphs are two letters that make one sound.",
      student: "Let's review the letter teams we've been learning - ch, sh, and th."
    },
    questions: [
      // Letter Identification (3 points)
      { id: "q1", type: "letter_identification", stimulus: "ch", expected_response: "ch", scoring: "correct", points: 1 },
      { id: "q2", type: "letter_identification", stimulus: "sh", expected_response: "sh", scoring: "correct", points: 1 },
      { id: "q3", type: "letter_identification", stimulus: "th", expected_response: "th", scoring: "correct", points: 1 },
      
      // Phoneme Production (3 points)
      { id: "q4", type: "phoneme_production", stimulus: "ch", expected_response: "/ch/", scoring: "correct", points: 1 },
      { id: "q5", type: "phoneme_production", stimulus: "sh", expected_response: "/sh/", scoring: "correct", points: 1 },
      { id: "q6", type: "phoneme_production", stimulus: "th", expected_response: "/th/", scoring: "correct", points: 1 },
      
      // CVC/CVCC Word Reading (12 points) - 6 words with digraphs
      { id: "q7", type: "cvc_blending", stimulus: "chip", expected_response: "chip", scoring: "correct", points: 2 },
      { id: "q8", type: "cvc_blending", stimulus: "shop", expected_response: "shop", scoring: "correct", points: 2 },
      { id: "q9", type: "cvc_blending", stimulus: "thin", expected_response: "thin", scoring: "correct", points: 2 },
      { id: "q10", type: "cvc_blending", stimulus: "much", expected_response: "much", scoring: "correct", points: 2 },
      { id: "q11", type: "cvc_blending", stimulus: "fish", expected_response: "fish", scoring: "correct", points: 2 },
      { id: "q12", type: "cvc_blending", stimulus: "path", expected_response: "path", scoring: "correct", points: 2 },
      
      // Phoneme Segmentation (6 points) - Same 6 words as above
      { id: "q13", type: "phoneme_segmentation", stimulus: "chip", expected_response: "/ch/ /i/ /p/", scoring: "correct", points: 1 },
      { id: "q14", type: "phoneme_segmentation", stimulus: "shop", expected_response: "/sh/ /o/ /p/", scoring: "correct", points: 1 },
      { id: "q15", type: "phoneme_segmentation", stimulus: "thin", expected_response: "/th/ /i/ /n/", scoring: "correct", points: 1 },
      { id: "q16", type: "phoneme_segmentation", stimulus: "much", expected_response: "/m/ /u/ /ch/", scoring: "correct", points: 1 },
      { id: "q17", type: "phoneme_segmentation", stimulus: "fish", expected_response: "/f/ /i/ /sh/", scoring: "correct", points: 1 },
      { id: "q18", type: "phoneme_segmentation", stimulus: "path", expected_response: "/p/ /a/ /th/", scoring: "correct", points: 1 }
    ],
    scoring_rubric: {
      mastery: "19-24 points (80-100%): Student demonstrates mastery of digraphs and is ready to advance to Stage 3.",
      developing: "14-18 points (60-79%): Student shows good progress but needs additional practice with digraphs.",
      beginning: "0-13 points (0-59%): Student requires intensive instruction with digraph concepts."
    },
    intervention_recommendations: {
      below_benchmark: [
        "Intensive review of digraph concepts (two letters, one sound)",
        "Use multisensory techniques for ch, sh, th discrimination",
        "Practice identifying digraphs in different word positions",
        "Review that digraphs function as single sound units"
      ],
      approaching_benchmark: [
        "Targeted practice with challenging digraphs",
        "Additional reading practice with digraph words",
        "Reinforce digraph concept through games and activities"
      ]
    }
  }
];

// Helper Functions for Assessment System
export function getAssessmentByWeek(week: number, stage: number = 1): Assessment | undefined {
  return ALL_ASSESSMENTS.find(assessment => 
    assessment.checkpoint_week === week && assessment.stage === stage
  );
}

export function getAllStageAssessments(stage: number): Assessment[] {
  return ALL_ASSESSMENTS.filter(assessment => assessment.stage === stage);
}

export function calculateAssessmentScore(responses: { [questionId: string]: string }, assessment: Assessment): {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  level: 'mastery' | 'developing' | 'beginning';
} {
  let earnedPoints = 0;
  const totalPoints = assessment.total_points;
  
  assessment.questions.forEach(question => {
    const studentResponse = responses[question.id];
    if (studentResponse === question.expected_response) {
      earnedPoints += question.points;
    }
  });
  
  const percentage = Math.round((earnedPoints / totalPoints) * 100);
  
  let level: 'mastery' | 'developing' | 'beginning';
  if (percentage >= 80) level = 'mastery';
  else if (percentage >= 60) level = 'developing';
  else level = 'beginning';
  
  return { totalPoints, earnedPoints, percentage, level };
}

export { LEGAL_COMPLIANCE };