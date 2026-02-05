'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { EIGHT_STAGE_SYSTEM, STAGE_PHONEME_SAMPLES } from '../../data/allStagesDatabase';

// DD23 CSS Animations for sophisticated tooltips
const fadeInStyle = {
  animation: 'fadeIn 0.3s ease-in-out'
};

export default function TeachingStages() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phaseModalVisible, setPhaseModalVisible] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedPhaseStageNum, setSelectedPhaseStageNum] = useState<number>(1);
  const [showPhonemeModal, setShowPhonemeModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStage, setSelectedStage] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [selectedStageDuration, setSelectedStageDuration] = useState<any>(null);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [showGradeLevelModal, setShowGradeLevelModal] = useState(false);
  const [gradeLevelModalVisible, setGradeLevelModalVisible] = useState(false);

  // Stage-specific color system from DD23 backup
  const stageColors = [
    '#059669', // Stage 1 - Emerald Green
    '#6B7C3C', // Stage 2 - Olive Green
    '#4A7C7C', // Stage 3 - Teal/Cyan
    '#A67C5A', // Stage 4 - Warm Brown/Sienna
    '#C4969B', // Stage 5 - Dusty Rose
    '#7A8B5C', // Stage 6 - Sage Green
    '#8FA68E', // Stage 7 - Soft Green/Gray
    '#B5967D'  // Stage 8 - Tan/Beige
  ];

  // Convert EIGHT_STAGE_SYSTEM to stage data format expected by DD23 styling
  const stageData = EIGHT_STAGE_SYSTEM.map(stage => ({
    stage: stage.stage_number,
    title: stage.stage_name,
    gradeLevel: stage.grade_level,
    studentPhase: stage.student_phase,
    duration: stage.duration,
    totalElements: stage.total_elements,
    description: stage.description
  }));
  
  // Reading development phases based on Ehri's research framework
  const ehriPhases = {
    'Pre-Alphabetic to Partial Alphabetic Phase': {
      title: 'Pre-Alphabetic to Partial Alphabetic Phase',
      description: 'Students begin their reading journey in the Pre-alphabetic Phase, where they identify words using visual cues like word shape, distinctive letters, or pictures rather than letter-sound relationships. Through systematic phonics instruction, they transition to the Partial Alphabetic Phase, where they start connecting some letters with their sounds—typically focusing on initial or final letters. This critical transition represents the foundation of reading development, as students move from purely visual word recognition to beginning sound-symbol correspondence. Research by Dr. Linnea Ehri shows this progression is essential for developing the alphabetic principle that underlies all successful reading.'
    },
    'Partial Alphabetic Phase': {
      title: 'Partial Alphabetic Phase', 
      description: 'Students begin connecting some letters with their corresponding sounds, typically focusing on initial or final letters in words while using context to fill in the gaps. This emerging letter-sound knowledge is applied inconsistently as students build their understanding that print represents speech sounds. During this phase, students benefit from explicit instruction in consonant blends, digraphs, and consistent practice with CVC and CVCC patterns. Dr. Linnea Ehri\'s research shows this phase is crucial for establishing the alphabetic principle before students can progress to full systematic decoding.'
    },
    'Full Alphabetic Phase - Emerging': {
      title: 'Full Alphabetic Phase - Emerging',
      description: 'Students begin systematic use of letter-sound relationships but are still developing full mastery of decoding strategies. They demonstrate emerging skills in analyzing word structures and can handle basic phonetic patterns with support. This phase represents the bridge between partial letter-sound knowledge and complete phonemic analysis. Students benefit from continued practice with vowel patterns and consonant blends as they build toward full alphabetic mastery. Dr. Linnea Ehri\'s research identifies this emerging phase as critical for solidifying decoding foundations.'
    },
    'Full Alphabetic Phase': {
      title: 'Full Alphabetic Phase',
      description: 'Students demonstrate systematic use of letter-sound relationships to decode unfamiliar words with increasing accuracy and independence. Complete phonemic awareness enables thorough analysis of word structures, including complex patterns like vowel teams and silent letters. Students can blend and segment sounds across entire words and begin developing sight word vocabulary through complete phonetic analysis. Research by Dr. Linnea Ehri indicates this phase represents a critical milestone where students transition from guessing at words to systematic decoding, laying the foundation for reading fluency and independence.'
    },
    'Consolidated Alphabetic Phase - Emerging': {
      title: 'Consolidated Alphabetic Phase - Emerging',
      description: 'Students begin efficiently processing multi-letter patterns as single units, focusing on foundational letter combinations like r-controlled vowels. Word recognition starts becoming more automatic with common patterns, allowing some cognitive resources to shift toward comprehension. At this emerging consolidated stage, readers master complex vowel patterns and begin tackling multisyllabic words with confidence. Dr. Linnea Ehri identifies this as the entry point into fluent reading, where students first experience the transition from laboriously sounding out words to recognizing familiar chunks automatically.'
    },
    'Consolidated Alphabetic Phase - Proficient': {
      title: 'Consolidated Alphabetic Phase - Proficient',
      description: 'Students demonstrate proficient automatic recognition of complex letter patterns and advanced word structures, including variable vowel teams and soft consonant rules. They efficiently process multisyllabic words by recognizing familiar chunks and morphological patterns. This proficient stage represents mastery of complex orthographic patterns while building toward advanced morphological awareness. Students read grade-level vocabulary with increasing fluency and can decode sophisticated patterns like variable vowel teams (oo in moon vs. book) and soft consonants (c/g before e,i,y). Dr. Linnea Ehri identifies this proficient phase as essential preparation for the morphological awareness needed in advanced reading.'
    },
    'Consolidated Alphabetic Phase - Developing': {
      title: 'Consolidated Alphabetic Phase - Developing',
      description: 'Students continue developing automatic recognition of multi-letter patterns and word parts while strengthening foundational spelling patterns. Complex vowel combinations become increasingly automatic, freeing cognitive resources for meaning-making. Students demonstrate growing fluency with multisyllabic words and begin integrating morphological awareness with phonetic analysis. Dr. Linnea Ehri\'s research emphasizes this developing phase as crucial for building the automatic word recognition that supports reading comprehension and fluency development.'
    },
    'Consolidated Alphabetic Phase': {
      title: 'Consolidated Alphabetic Phase',
      description: 'Students achieve automatic recognition of multi-letter patterns and common letter sequences, processing familiar chunks instantly without conscious decoding. Orthographic mapping allows immediate recognition of word parts, morphemes, and syllable patterns, leading to fluent reading. Students can analyze complex, multisyllabic words and demonstrate mature spelling strategies. Dr. Linnea Ehri identifies this phase as the culmination of systematic phonics instruction, where students achieve the automatic word recognition necessary for fluent reading and full focus on comprehension.'
    },
    'Consolidated Alphabetic Phase - Advanced': {
      title: 'Consolidated Alphabetic Phase - Advanced',
      description: 'Students achieve advanced automatic recognition of multi-letter patterns, silent consonant patterns, and morphological structures, processing complex word parts instantly without conscious decoding. Advanced orthographic mapping enables immediate recognition of morphemes, syllable patterns, and sophisticated spelling conventions including silent letters (kn, wr, mb) and schwa sounds in multisyllabic words. Students demonstrate mature spelling strategies and can analyze the most complex vocabulary with morphological awareness. Dr. Linnea Ehri identifies this advanced phase as the culmination of systematic phonics instruction, where students achieve the sophisticated word recognition necessary for academic text comprehension and advanced literacy skills.'
    }
  };

  const handlePhaseClick = (phase: string, stageNumber: number) => {
    setSelectedPhase(phase);
    setSelectedPhaseStageNum(stageNumber);
    setShowModal(true);
    // Trigger animation after modal appears
    setTimeout(() => setPhaseModalVisible(true), 10);
  };

  const handleElementsClick = (stageNumber: number) => {
    setSelectedStage(stageNumber);
    setShowPhonemeModal(true);
    // Trigger animation after modal appears
    setTimeout(() => setModalVisible(true), 10);
  };

  const handleDurationClick = (stageData: any) => {
    setSelectedStageDuration(stageData);
    setShowDurationModal(true);
    // Trigger animation after modal appears
    setTimeout(() => setDurationModalVisible(true), 10);
  };

  const handleGradeLevelClick = (stageNumber: number) => {
    if (stageNumber === 1 || stageNumber === 2 || stageNumber === 3 || stageNumber === 4 || stageNumber === 5 || stageNumber === 6 || stageNumber === 7 || stageNumber === 8) {
      setSelectedStage(stageNumber);
      setShowGradeLevelModal(true);
      // Trigger animation after modal appears
      setTimeout(() => setGradeLevelModalVisible(true), 10);
    }
  };

  const handleStageClick = (stageNumber: number) => {
    router.push(`/teacher/stages/${stageNumber}`);
  };

  // DD23 getWeeklyPhonemes function for sophisticated duration modal
  const getWeeklyPhonemes = (stageNumber: number) => {
    const stagePhonemes = {
      1: [
        // Week 1: First phonemes taught
        { week: 1, phonemes: ['/m/', '/s/', '/a/'], graphemes: ['m', 's', 'a'], examples: ['mat', 'sad', 'am'], frequency: '90.9%', type: 'foundation' },
        // Week 2: Next phonemes
        { week: 2, phonemes: ['/t/', '/n/'], graphemes: ['t', 'n'], examples: ['top', 'nap'], frequency: '93.7%', type: 'foundation' },
        // Week 3: Continuing sequence
        { week: 3, phonemes: ['/p/', '/i/'], graphemes: ['p', 'i'], examples: ['pat', 'pit'], frequency: '95.2%', type: 'foundation' },
        // Week 4: Next pair
        { week: 4, phonemes: ['/d/', '/f/'], graphemes: ['d', 'f'], examples: ['dad', 'fat'], frequency: '81.9%', type: 'foundation' },
        // Week 5: Continuing progression
        { week: 5, phonemes: ['/o/', '/l/'], graphemes: ['o', 'l'], examples: ['dot', 'lap'], frequency: '92.7%', type: 'foundation' },
        // Week 6: Next pair
        { week: 6, phonemes: ['/h/', '/b/'], graphemes: ['h', 'b'], examples: ['hat', 'bat'], frequency: '97.1%', type: 'foundation' },
        // Week 7: Final pair
        { week: 7, phonemes: ['/e/', '/u/'], graphemes: ['e', 'u'], examples: ['pet', 'hut'], frequency: '61.6%', type: 'foundation' },
        // Week 8: Review week
        { week: 8, phonemes: ['Review'], graphemes: ['All'], examples: ['review'], frequency: '100%', type: 'review' }
      ],
    2: [
      { week: 1, phonemes: ['/r/', '/g/'], graphemes: ['r', 'g'], examples: ['run', 'big'], frequency: '91.3%', type: 'foundation' },
      { week: 2, phonemes: ['/k/', '/j/'], graphemes: ['k', 'j'], examples: ['kit', 'jam'], frequency: '24.9%', type: 'foundation' },
      { week: 3, phonemes: ['/v/', '/w/'], graphemes: ['v', 'w'], examples: ['van', 'wet'], frequency: '84.1%', type: 'foundation' },
      { week: 4, phonemes: ['/y/', '/z/'], graphemes: ['y', 's'], examples: ['yes', 'has'], frequency: '70.0%', type: 'foundation' },
      { week: 5, phonemes: ['/x/', '/kw/'], graphemes: ['x', 'qu'], examples: ['fox', 'quit'], frequency: '95.4%', type: 'foundation' },
      { week: 6, phonemes: ['/ch/', '/sh/'], graphemes: ['ch', 'sh'], examples: ['chip', 'shop'], frequency: '94.9%', type: 'foundation' },
      { week: 7, phonemes: ['/th/', '/wh/'], graphemes: ['th', 'wh'], examples: ['thin', 'when'], frequency: '52.6%', type: 'foundation' },
      { week: 8, phonemes: ['Review'], graphemes: ['All'], examples: ['review'], frequency: '100%', type: 'review' }
    ],
    3: [
      { week: 1, phonemes: ['/th/'], graphemes: ['th'], examples: ['thin'], frequency: '100%', type: 'foundation' },
      { week: 2, phonemes: ['/sh/'], graphemes: ['sh'], examples: ['shop'], frequency: '39.7%', type: 'foundation' },
      { week: 3, phonemes: ['/ng/'], graphemes: ['ng'], examples: ['ring'], frequency: '87.1%', type: 'foundation' },
      { week: 4, phonemes: ['/ch/'], graphemes: ['ch'], examples: ['chip'], frequency: '65.5%', type: 'foundation' },
      { week: 5, phonemes: ['/kw/'], graphemes: ['qu'], examples: ['quit'], frequency: '94.9%', type: 'foundation' },
      { week: 6, phonemes: ['/ð/'], graphemes: ['th'], examples: ['the'], frequency: '88.6%', type: 'foundation' },
      { week: 7, phonemes: ['/wh/'], graphemes: ['wh'], examples: ['when'], frequency: '98.7%', type: 'foundation' },
      { week: 8, phonemes: ['Review'], graphemes: ['All'], examples: ['review'], frequency: '100%', type: 'review' }
    ],
    4: [
      // Stage 4: Magic E Patterns - Organized by weekly teaching sequence with Grapheme Frequency (%)
      { week: 1, phonemes: ['/ā/'], graphemes: ['a_e'], examples: ['make', 'cake', 'take'], frequency: '20.84%', type: 'foundation' },
      { week: 2, phonemes: ['/ī/'], graphemes: ['i_e'], examples: ['bike', 'time', 'ride'], frequency: '24.96%', type: 'foundation' },
      { week: 3, phonemes: ['/ō/'], graphemes: ['o_e'], examples: ['home', 'bone', 'nose'], frequency: '10.69%', type: 'foundation' },
      { week: 4, phonemes: ['/ū/'], graphemes: ['u_e'], examples: ['cute', 'use', 'tube'], frequency: '8.82%', type: 'foundation' },
      { week: 5, phonemes: ['/ē/'], graphemes: ['e_e'], examples: ['these', 'complete', 'athlete'], frequency: '1.19%', type: 'foundation' },
      { week: 6, phonemes: ['VCe Review'], graphemes: ['_e'], examples: ['bake', 'bike', 'bone'], frequency: '100%', type: 'review' },
      { week: 7, phonemes: ['Practice'], graphemes: ['All VCe'], examples: ['practice'], frequency: '100%', type: 'practice' },
      { week: 8, phonemes: ['Assessment'], graphemes: ['All VCe'], examples: ['assessment'], frequency: '100%', type: 'assessment' }
    ],
    5: [
      // Stage 5: High-Frequency Vowel Teams - Organized by weekly teaching sequence with Grapheme Frequency (%)
      // Week 1: /ər/ er pattern
      { week: 1, phonemes: ['/ər/'], graphemes: ['er'], examples: ['her', 'fern', 'term', 'tiger', 'sister', 'water'], frequency: '100%', type: 'foundation' },
      // Week 2: /ē/ ee pattern
      { week: 2, phonemes: ['/ē/'], graphemes: ['ee'], examples: ['tree', 'see', 'green', 'feet', 'sleep', 'keep'], frequency: '7.99%', type: 'foundation' },
      // Week 3: /ē/ ea pattern
      { week: 3, phonemes: ['/ē/'], graphemes: ['ea'], examples: ['eat', 'read', 'team', 'beach', 'clean', 'dream'], frequency: '9.43%', type: 'foundation' },
      // Week 4: /ā/ ai pattern
      { week: 4, phonemes: ['/ā/'], graphemes: ['ai'], examples: ['rain', 'train', 'main', 'wait', 'paint', 'chain'], frequency: '13.22%', type: 'foundation' },
      // Week 5: /ā/ ay pattern
      { week: 5, phonemes: ['/ā/'], graphemes: ['ay'], examples: ['play', 'day', 'stay', 'way', 'say', 'may'], frequency: '5.71%', type: 'foundation' },
      // Week 6: /ō/ oa pattern
      { week: 6, phonemes: ['/ō/'], graphemes: ['oa'], examples: ['boat', 'coat', 'road', 'goat', 'soap', 'float'], frequency: '6.47%', type: 'foundation' },
      // Week 7: /ō/ ow pattern
      { week: 7, phonemes: ['/ō/'], graphemes: ['ow'], examples: ['snow', 'grow', 'show', 'yellow', 'window', 'follow'], frequency: '6.21%', type: 'foundation' },
      // Week 8: /ar/ ar pattern
      { week: 8, phonemes: ['/ar/'], graphemes: ['ar'], examples: ['car', 'star', 'park', 'farm', 'start', 'shark'], frequency: '100%', type: 'foundation' }
    ],
    6: [
      // Stage 6: R-Controlled & Complex Vowels - Weekly teaching sequence from Dig In
      // Week 1: /or/ or pattern
      { week: 1, phonemes: ['/or/'], graphemes: ['or'], examples: ['for', 'corn', 'short'], frequency: '10.52%', type: 'foundation' },
      // Week 2: /ər/ ir pattern  
      { week: 2, phonemes: ['/ər/'], graphemes: ['ir'], examples: ['bird', 'girl', 'first'], frequency: '3.63%', type: 'foundation' },
      // Week 3: /ər/ ur pattern
      { week: 3, phonemes: ['/ər/'], graphemes: ['ur'], examples: ['hurt', 'turn', 'nurse'], frequency: '7.43%', type: 'foundation' },
      // Week 4: /ou/ ou pattern
      { week: 4, phonemes: ['/ou/'], graphemes: ['ou'], examples: ['out', 'house', 'mouse'], frequency: '67.43%', type: 'foundation' },
      // Week 5: /aw/ au pattern
      { week: 5, phonemes: ['/aw/'], graphemes: ['au'], examples: ['auto', 'sauce', 'taught'], frequency: '13.37%', type: 'foundation' },
      // Week 6: /oi/ oi pattern
      { week: 6, phonemes: ['/oi/'], graphemes: ['oi'], examples: ['oil', 'coin', 'soil'], frequency: '61.72%', type: 'foundation' },
      // Week 7: /aw/ aw pattern
      { week: 7, phonemes: ['/aw/'], graphemes: ['aw'], examples: ['law', 'saw', 'draw'], frequency: '8.18%', type: 'foundation' },
      // Week 8: /oi/ oy pattern
      { week: 8, phonemes: ['/oi/'], graphemes: ['oy'], examples: ['boy', 'toy', 'joy'], frequency: '38.28%', type: 'foundation' }
    ],
    7: [
      // Stage 7: Advanced Vowel Patterns - Weekly teaching sequence from Dig In
      // Week 1: /oo/ long sound - oo pattern
      { week: 1, phonemes: ['/ōō/'], graphemes: ['oo'], examples: ['moon', 'soon', 'food'], frequency: '27.91%', type: 'foundation' },
      // Week 2: /oo/ short sound - oo pattern
      { week: 2, phonemes: ['/o͝o/'], graphemes: ['oo'], examples: ['book', 'look', 'took'], frequency: '45.79%', type: 'foundation' },
      // Week 3: /ī/ - igh pattern
      { week: 3, phonemes: ['/ī/'], graphemes: ['igh'], examples: ['light', 'night', 'right'], frequency: '7.09%', type: 'foundation' },
      // Week 4: /ū/ - ew pattern
      { week: 4, phonemes: ['/ū/'], graphemes: ['ew'], examples: ['new', 'few', 'grew'], frequency: '7.65%', type: 'foundation' },
      // Week 5: /ē/ - ie pattern
      { week: 5, phonemes: ['/ē/'], graphemes: ['ie'], examples: ['field', 'piece', 'believe'], frequency: '5.76%', type: 'foundation' },
      // Week 6: /ū/ - ue pattern
      { week: 6, phonemes: ['/ū/'], graphemes: ['ue'], examples: ['blue', 'true', 'glue'], frequency: '3.73%', type: 'foundation' },
      // Week 7: /s/ - c pattern
      { week: 7, phonemes: ['/s/'], graphemes: ['c'], examples: ['city', 'race', 'face'], frequency: '9.04%', type: 'foundation' },
      // Week 8: /j/ - g pattern
      { week: 8, phonemes: ['/j/'], graphemes: ['g'], examples: ['giant', 'gym', 'age'], frequency: '41.40%', type: 'foundation' }
    ],
    8: [
      // Stage 8: Silent Letters & Morphology - Weekly teaching sequence from Dig In
      // Week 1: Silent k - kn pattern
      { week: 1, phonemes: ['silent k'], graphemes: ['kn'], examples: ['knee', 'know', 'knife'], frequency: '0.54%', type: 'foundation' },
      // Week 2: Silent w - wr pattern
      { week: 2, phonemes: ['silent w'], graphemes: ['wr'], examples: ['write', 'wrong', 'wrist'], frequency: '0.97%', type: 'foundation' },
      // Week 3: Silent b - mb pattern
      { week: 3, phonemes: ['silent b'], graphemes: ['mb'], examples: ['lamb', 'thumb', 'climb'], frequency: '0.91%', type: 'foundation' },
      // Week 4: Silent l - lm pattern
      { week: 4, phonemes: ['silent l'], graphemes: ['lm'], examples: ['palm', 'calm', 'psalm'], frequency: '0.26%', type: 'foundation' },
      // Week 5: Schwa /ə/ - unstressed vowel
      { week: 5, phonemes: ['schwa /ə/'], graphemes: ['a', 'e', 'o'], examples: ['about', 'taken', 'lemon'], frequency: '100%', type: 'foundation' },
      // Week 6: Prefix un- 
      { week: 6, phonemes: ['prefix un-'], graphemes: ['un-'], examples: ['unhappy', 'unlock', 'unfair'], frequency: '100%', type: 'morphology' },
      // Week 7: Suffix -ing
      { week: 7, phonemes: ['suffix -ing'], graphemes: ['-ing'], examples: ['running', 'jumping', 'playing'], frequency: '100%', type: 'morphology' },
      // Week 8: Suffix -ed
      { week: 8, phonemes: ['suffix -ed'], graphemes: ['-ed'], examples: ['walked', 'played', 'wanted'], frequency: '100%', type: 'morphology' }
    ]
    };
    
    return stagePhonemes[stageNumber as keyof typeof stagePhonemes] || [];
  };

  return (
    <>
      {/* DD23 CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .phase-modal {
          background: white;
          background-image: radial-gradient(circle at 20% 80%, rgba(74, 144, 164, 0.03) 1px, transparent 1px),
                          radial-gradient(circle at 80% 20%, rgba(74, 144, 164, 0.02) 1px, transparent 1px),
                          radial-gradient(circle at 40% 40%, rgba(212, 130, 110, 0.02) 1px, transparent 1px);
          border: 2px solid rgba(74, 144, 164, 0.3) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3) !important;
        }
      `}</style>
      
    <div className="h-[calc(100vh-130px)] bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand text-deepNavy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-2xl p-3 border-b border-oceanBlue/50">
        <div className="px-4">
          <div className="flex items-center justify-between relative z-50">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-2xl leading-none" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                8 Stage Reading Matrix Framework
              </h1>
              <p className="text-sm text-white/90 mt-1 text-left ml-1">Rooted in the Science of Reading</p>
            </div>
            <Link href="/teacher" className="text-xs sm:text-sm text-white/80 hover:text-white transition">
              ← Teacher Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Streamlined Stage View with Tabs */}
      <main className="max-w-7xl mx-auto p-6 relative z-10" style={{marginTop: '13px'}}>
        <div className="bg-white rounded-b-2xl shadow-2xl border-b-2 border-slate-300 overflow-hidden relative">
          <div className="relative z-10">
          {/* Tabs with Color Coding */}
          <div className="flex -mb-px relative">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const tabColors = [
                'text-white border-[#059669]',
                'text-white border-[#6B7C3C]',
                'text-white border-[#4A7C7C]',
                'text-white border-[#A67C5A]',
                'text-white border-[#C4969B]',
                'text-white border-[#7A8B5C]',
                'text-white border-[#8FA68E]',
                'text-white border-[#B5967D]'
              ];
              const tabGradients = [
                'from-[#059669] via-[#059669]/60 to-[#059669]/20',
                'from-[#6B7C3C] via-[#6B7C3C]/60 to-[#6B7C3C]/20',
                'from-[#4A7C7C] via-[#4A7C7C]/60 to-[#4A7C7C]/20',
                'from-[#A67C5A] via-[#A67C5A]/60 to-[#A67C5A]/20',
                'from-[#C4969B] via-[#C4969B]/60 to-[#C4969B]/20',
                'from-[#7A8B5C] via-[#7A8B5C]/60 to-[#7A8B5C]/20',
                'from-[#8FA68E] via-[#8FA68E]/60 to-[#8FA68E]/20',
                'from-[#B5967D] via-[#B5967D]/60 to-[#B5967D]/20'
              ];
              const tabShadows = [
                'shadow-[#059669]/30',
                'shadow-[#6B7C3C]/30',
                'shadow-[#4A7C7C]/30',
                'shadow-[#A67C5A]/30',
                'shadow-[#C4969B]/30',
                'shadow-[#7A8B5C]/30',
                'shadow-[#8FA68E]/30',
                'shadow-[#B5967D]/30'
              ];
              const inactiveColors = [
                'hover:text-[#059669] hover:bg-gradient-to-b hover:from-[#059669]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#059669]/20',
                'hover:text-[#6B7C3C] hover:bg-gradient-to-b hover:from-[#6B7C3C]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#6B7C3C]/20',
                'hover:text-[#4A7C7C] hover:bg-gradient-to-b hover:from-[#4A7C7C]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#4A7C7C]/20',
                'hover:text-[#A67C5A] hover:bg-gradient-to-b hover:from-[#A67C5A]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#A67C5A]/20',
                'hover:text-[#C4969B] hover:bg-gradient-to-b hover:from-[#C4969B]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#C4969B]/20',
                'hover:text-[#7A8B5C] hover:bg-gradient-to-b hover:from-[#7A8B5C]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#7A8B5C]/20',
                'hover:text-[#8FA68E] hover:bg-gradient-to-b hover:from-[#8FA68E]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#8FA68E]/20',
                'hover:text-[#B5967D] hover:bg-gradient-to-b hover:from-[#B5967D]/30 hover:to-slate-800/50 hover:shadow-lg hover:shadow-[#B5967D]/20'
              ];
              
              return (
                <button
                  key={num}
                  onClick={() => setActiveTab(num)}
                  onMouseEnter={() => setHoveredTab(num)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`flex-1 py-2 px-4 text-center font-bold transition-all duration-300 rounded-t-xl relative ${
                    activeTab === num
                      ? `${tabColors[num - 1]} bg-gradient-to-b ${tabGradients[num - 1]} shadow-xl ${tabShadows[num - 1]} z-30`
                      : `text-slate-400 bg-gradient-to-b from-slate-900/80 to-slate-800/60 border-slate-600/50 shadow-md ${inactiveColors[num - 1]} hover:transform hover:-translate-y-0.5 hover:scale-102 border-2 border-b-0`
                  }`}
                  style={activeTab === num ? {
                    background: `linear-gradient(to bottom, ${stageColors[num - 1]}90, ${stageColors[num - 1]}20)`,
                    filter: 'brightness(1.05)',
                    transform: 'translateY(-1px)',
                    marginBottom: '-2px',
                    zIndex: 50,
                    borderLeft: `3px solid ${stageColors[num - 1]}`,
                    borderRight: `3px solid ${stageColors[num - 1]}`,
                    borderTop: `3px solid ${stageColors[num - 1]}`,
                    borderBottom: 'none'
                  } : {}}
                >
                  <span className="relative z-10 drop-shadow-sm">Stage {num}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Content */}
          {stageData.filter(stage => stage.stage === activeTab).map((stage) => {
            return (
              <div 
                key={stage.stage} 
                className="p-6 relative transform transition-all duration-300"
                onMouseEnter={() => setHoveredTab(stage.stage)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  background: `linear-gradient(to bottom, ${stageColors[stage.stage - 1]}55, ${stageColors[stage.stage - 1]}20 150px, ${stageColors[stage.stage - 1]}05 300px, transparent)`,
                  boxShadow: hoveredTab === stage.stage 
                    ? '0 12px 24px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)' 
                    : '0 8px 16px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)',
                  marginTop: '-2px',
                  borderLeft: `3px solid ${stageColors[stage.stage - 1]}`,
                  borderRight: `3px solid ${stageColors[stage.stage - 1]}`,
                  borderBottom: `3px solid ${stageColors[stage.stage - 1]}`,
                  borderTop: 'none',
                  borderRadius: '0 0 16px 16px',
                  position: 'relative',
                  zIndex: 1,
                  transform: hoveredTab === stage.stage ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {/* Left side border extension from container edge to tab */}
                <div 
                  className="absolute top-[2px] left-0 h-[3px]"
                  style={{
                    width: `${(activeTab - 1) * 12.5}%`,
                    backgroundColor: stageColors[stage.stage - 1]
                  }}
                />
                {/* Right side border extension from tab to container edge */}
                <div 
                  className="absolute top-[2px] right-0 h-[3px]"
                  style={{
                    width: `${(8 - activeTab) * 12.5}%`,
                    backgroundColor: stageColors[stage.stage - 1]
                  }}
                />
                {/* Header with Dig In button */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-deepNavy mb-1">
                      Stage {stage.stage}: {stage.title}
                    </h2>
                    <p className="text-base text-oceanBlue font-medium">Complete Phoneme Breakdown</p>
                  </div>
                <button
                  onClick={() => handleStageClick(stage.stage)}
                  className="text-black px-6 py-2.5 rounded-lg font-semibold border-2 border-cyan-400 transform-gpu hover:scale-105 hover:-translate-y-0.5 transition-all duration-500 ease-out will-change-transform relative overflow-hidden group"
                  style={{ 
                    background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  Dig In →
                </button>
              </div>

              {/* Info Buttons - All same size with centered content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* New Patterns Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementsClick(stage.stage);
                  }}
                  className="p-4 rounded-xl border-2 border-cyan-400 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center group h-20 flex flex-col justify-center items-center relative overflow-hidden shadow-lg hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Enhanced hover effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <h3 className="text-lg font-bold text-black mb-1 group-hover:text-black group-hover:scale-110 transition-all duration-300 drop-shadow-md relative z-10">
                    New Patterns
                  </h3>
                  <p className="text-sm text-black/90 font-medium group-hover:text-black group-hover:scale-105 transition-all duration-300 drop-shadow-sm relative z-10">{stage.totalElements}</p>
                  {stage.stage === 8 && (
                    <p className="text-[10px] text-black/60 mt-0.5 relative z-10">31 taught · 19 exposure ref.</p>
                  )}
                </button>

                {/* Duration Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDurationClick(stage);
                  }}
                  className="p-4 rounded-xl border-2 border-cyan-400 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center group h-20 flex flex-col justify-center items-center relative overflow-hidden shadow-lg hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Enhanced hover effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <h3 className="text-lg font-bold text-black mb-1 group-hover:text-black group-hover:scale-110 transition-all duration-300 drop-shadow-md relative z-10">
                    Duration
                  </h3>
                  <p className="text-sm text-black/90 font-medium group-hover:text-black group-hover:scale-105 transition-all duration-300 drop-shadow-sm relative z-10">{stage.duration}</p>
                </button>

                {/* Student Phase Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePhaseClick(stage.studentPhase, stage.stage);
                  }}
                  className="p-4 rounded-xl border-2 border-cyan-400 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center group h-20 flex flex-col justify-center items-center relative overflow-hidden shadow-lg hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Enhanced hover effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <h3 className="text-lg font-bold text-black mb-1 group-hover:text-black group-hover:scale-110 transition-all duration-300 drop-shadow-md relative z-10">
                    Student Phase
                  </h3>
                  <p className="text-sm text-black/90 font-medium leading-tight group-hover:text-black group-hover:scale-105 transition-all duration-300 drop-shadow-sm relative z-10">{stage.studentPhase}</p>
                </button>

                {/* Grade Level Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGradeLevelClick(stage.stage);
                  }}
                  className="p-4 rounded-xl border-2 border-cyan-400 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center group h-20 flex flex-col justify-center items-center relative overflow-hidden shadow-lg hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(to bottom, #fef3c7, #fdba74)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Enhanced hover effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <h3 className="text-lg font-bold text-black mb-1 group-hover:text-black group-hover:scale-110 transition-all duration-300 drop-shadow-md relative z-10">
                    Grade Level
                  </h3>
                  <p className="text-sm text-black/90 font-medium group-hover:text-black group-hover:scale-105 transition-all duration-300 drop-shadow-sm relative z-10">{stage.gradeLevel}</p>
                </button>
              </div>

              {/* Additional Info - Smaller height */}
              <div className="mt-4 p-3 bg-gradient-to-r from-oceanBlue/20 to-lightOcean/25 rounded-lg border border-oceanBlue/40">
                <p className="text-darkOcean text-sm leading-relaxed">
                  {EIGHT_STAGE_SYSTEM.find(s => s.stage_number === stage.stage)?.description}
                </p>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      </main>

        {/* Modal for Ehri Phase Definitions */}
        {showModal && (
          <div className={`fixed inset-0 bg-black flex items-start justify-center z-50 transition-all duration-500 ${phaseModalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} style={{paddingTop: selectedPhase === 'Consolidated Alphabetic Phase - Advanced' ? '163px' : selectedPhase === 'Consolidated Alphabetic Phase - Proficient' ? '162px' : selectedPhase === 'Full Alphabetic Phase' ? '162px' : selectedPhase === 'Partial Alphabetic Phase' ? '162px' : '160px'}}>
            <div className={`bg-white bg-subtle-texture rounded-lg mx-4 max-h-[80vh] overflow-y-auto transition-all duration-700 transform ${phaseModalVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`} style={{
              maxWidth: '1237px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3)'
            }}>
              <div className="flex justify-between items-center p-6 pb-4">
                <h2 className="text-2xl font-bold text-deepNavy">
                  Student Phase
                </h2>
                <button 
                  onClick={() => {
                    setPhaseModalVisible(false);
                    setShowModal(false);
                  }}
                  className="text-teal-700 hover:text-teal-800 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="px-6 pb-6">
                <div className="bg-gradient-to-br from-indigo-600/50 via-purple-600/45 to-purple-500/50 rounded-xl p-6 relative overflow-hidden shadow-xl mb-4 border border-purple-400">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                  <h3 className="font-bold text-white text-xl drop-shadow-lg">
                    {selectedPhase}
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/40 rounded-xl p-6 shadow-lg border border-emerald-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                  <p className="text-black leading-relaxed text-lg">
                    {EIGHT_STAGE_SYSTEM[selectedPhaseStageNum - 1]?.science_of_reading_alignment?.ehri_phase_description || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DD23 Sophisticated Duration Modal with Interactive Timeline */}
        {showDurationModal && (
          <div className={`fixed inset-0 bg-black flex items-start justify-center z-50 transition-all duration-500 ${durationModalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} style={{paddingTop: selectedStageDuration?.stage === 1 ? '166px' : selectedStageDuration?.stage === 2 ? '167px' : selectedStageDuration?.stage === 3 ? '165px' : selectedStageDuration?.stage === 4 ? '165px' : selectedStageDuration?.stage === 5 ? '165px' : selectedStageDuration?.stage === 6 ? '165px' : selectedStageDuration?.stage === 7 ? '165px' : selectedStageDuration?.stage === 8 ? '165px' : '160px'}}>
            <div className={`bg-white bg-subtle-texture rounded-lg p-6 mx-4 max-h-[95vh] overflow-y-auto border-2 border-oceanBlue/30 transition-all duration-700 transform ${durationModalVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`} style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3)', 
              maxWidth: selectedStageDuration?.stage === 1 ? '1236px' : selectedStageDuration?.stage === 2 ? '1233px' : selectedStageDuration?.stage === 3 ? '1236px' : selectedStageDuration?.stage === 4 ? '1236px' : selectedStageDuration?.stage === 5 ? '1230px' : selectedStageDuration?.stage === 6 ? '1230px' : selectedStageDuration?.stage === 7 ? '1234px' : selectedStageDuration?.stage === 8 ? '1235px' : '1248px'
            }}>
              <div className="flex justify-end items-center mb-6">
                <button 
                  onClick={() => {
                    setDurationModalVisible(false);
                    setShowDurationModal(false);
                    setHoveredWeek(null);
                  }}
                  className="text-teal-700 hover:text-teal-800 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Stage Overview Container with Title */}
              <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/40 rounded-xl pt-1 px-6 pb-6 border border-emerald-500 shadow-xl mb-6 relative overflow-hidden">
                {/* Colorful accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                <h2 className="text-2xl font-bold text-deepNavy mb-3">
                  Stage {selectedStageDuration?.stage}: {EIGHT_STAGE_SYSTEM.find(s => s.stage_number === selectedStageDuration?.stage)?.stage_name}
                </h2>
                <p className="text-deepNavy leading-relaxed text-sm">
                  {selectedStageDuration?.description}
                </p>
              </div>

              {/* Improved Timeline Format */}
              <div className="relative px-8 py-6">
                {/* Timeline Container */}
                <div className="relative">
                  {/* Horizontal Connecting Line - positioned to run through center of circles */}
                  <div className="absolute top-6 left-6 right-6 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full shadow-sm" style={{top: '24px'}}></div>
                  
                  {/* Week Markers */}
                  <div className="flex justify-between items-center">
                    {getWeeklyPhonemes(selectedStageDuration?.stage).map((weekData, i) => (
                      <div 
                        key={i}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredWeek(i + 1)}
                        onMouseLeave={() => setHoveredWeek(null)}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-white font-bold text-sm shadow-lg relative ${
                            weekData.type === 'review' 
                              ? 'bg-gradient-to-b from-rose-500 to-pink-600 border-2 border-rose-400'
                              : i % 4 === 0 ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 border-2 border-emerald-400'
                              : i % 4 === 1 ? 'bg-gradient-to-b from-blue-500 to-blue-600 border-2 border-blue-400'
                              : i % 4 === 2 ? 'bg-gradient-to-b from-purple-500 to-purple-600 border-2 border-purple-400'
                              : 'bg-gradient-to-b from-amber-500 to-orange-600 border-2 border-amber-400'
                          } ${
                            hoveredWeek === i + 1 ? 'transform scale-110 shadow-xl' : 'hover:transform hover:scale-105'
                          }`}
                        >
                          {weekData.type === 'review' ? (
                            <>
                              <span className="absolute inset-0 flex items-center justify-center text-white/40 text-3xl">★</span>
                              <span className="relative z-10">{i + 1}</span>
                            </>
                          ) : (
                            i + 1
                          )}
                        </div>
                        
                        {/* Week Label */}
                        <div className="mt-3 text-sm text-darkOcean font-medium whitespace-nowrap">
                          Week {i + 1}
                        </div>

                        {/* DD23 Style Tooltip with Percentage and Column Layout */}
                        {hoveredWeek === i + 1 && (
                          <div className="absolute bottom-full mb-3 z-50 opacity-0" style={{
                            left: i === 0 ? '0px' : 
                                  i === getWeeklyPhonemes(selectedStageDuration?.stage).length - 1 ? 'auto' : '-186px',
                            right: i === getWeeklyPhonemes(selectedStageDuration?.stage).length - 1 ? '0px' : 'auto',
                            transform: i === 0 ? 'none' : 
                                      i === getWeeklyPhonemes(selectedStageDuration?.stage).length - 1 ? 'none' : 'none',
                            maxWidth: '90vw',
                            width: '420px',
                            animation: 'fadeIn 0.2s ease-in-out 0.1s forwards'
                          }}>
                            <div className={`bg-slate-800 text-white rounded-lg px-6 py-4 shadow-xl w-full relative overflow-hidden border-2 ${
                              weekData.type === 'review' 
                                ? 'border-rose-400'
                                : i % 4 === 0 ? 'border-emerald-400'
                                : i % 4 === 1 ? 'border-blue-400'
                                : i % 4 === 2 ? 'border-purple-400'
                                : 'border-amber-400'
                            }`}>
                              {/* Colorful accent strip */}
                              <div className={`absolute top-0 left-0 right-0 h-1 ${
                                weekData.type === 'review' 
                                  ? 'bg-rose-400'
                                  : i % 4 === 0 ? 'bg-emerald-400'
                                  : i % 4 === 1 ? 'bg-blue-400'
                                  : i % 4 === 2 ? 'bg-purple-400'
                                  : 'bg-amber-400'
                              }`}></div>
                              {/* Header with Week and Percentage */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-sm font-bold">
                                  Week {i + 1} {weekData.type === 'review' ? '⭐ REVIEW' : '- New Learning'}
                                </div>
                                <div className="text-xs bg-slate-700 px-2 py-1 rounded-full">
                                  {weekData.frequency}
                                </div>
                              </div>
                              
                              {/* Three-Column Layout for Content */}
                              <div className="grid grid-cols-3 gap-4 text-xs">
                                <div>
                                  <div className="text-blue-300 font-semibold mb-2">Phonemes:</div>
                                  <div className="space-y-1">
                                    {weekData.phonemes.map((phoneme, idx) => (
                                      <div key={idx} className="bg-blue-600/80 text-white px-2 py-1 rounded font-mono text-xs text-center">
                                        {phoneme}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-green-300 font-semibold mb-2">Graphemes:</div>
                                  <div className="space-y-1">
                                    {weekData.graphemes.map((grapheme, idx) => (
                                      <div key={idx} className="bg-green-600/80 text-white px-2 py-1 rounded font-mono text-xs text-center">
                                        〈{grapheme}〉
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-yellow-300 font-semibold mb-2">Example Words:</div>
                                  <div className="space-y-1">
                                    {weekData.examples.map((example, idx) => (
                                      <div key={idx} className="text-white italic text-xs bg-slate-700/50 px-2 py-1 rounded text-center">
                                        {example}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Bottom description line */}
                              <div className="pt-2 mt-2 border-t border-slate-600">
                                <div className="text-xs text-slate-400">
                                  {weekData.type === 'review' ? 'Comprehensive review of all patterns learned' : 'Foundation phoneme instruction'}
                                </div>
                              </div>
                              
                              {/* Tooltip Arrow - always points to the week circle center */}
                              <div className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" style={{
                                left: i === 0 ? '24px' : 
                                      i === getWeeklyPhonemes(selectedStageDuration?.stage).length - 1 ? 'auto' : '210px',
                                right: i === getWeeklyPhonemes(selectedStageDuration?.stage).length - 1 ? '24px' : 'auto',
                                transform: 'none'
                              }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* Pacing Note Section */}
              <div className="bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40 rounded-xl p-5 border border-indigo-400 shadow-xl relative overflow-hidden">
                {/* Colorful accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
                <div>
                  <h4 className="font-bold text-black mb-2 text-lg">Pacing & Differentiation Notes</h4>
                  <div className="space-y-3 text-sm text-black">
                    <div>
                      <div className="font-bold mb-1">Baseline Pacing:</div>
                      <div className="ml-4">Each week follows a structured 5-day cycle: introduce new phonemes Monday-Tuesday, practice Wednesday-Thursday, assess and review Friday. Cumulative checkpoint assessments every other week.</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Struggling Learners:</div>
                      <div className="ml-4">Extend timeline by 50% (12 weeks total). Use multisensory techniques and increase review frequency.</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Advanced Learners:</div>
                      <div className="ml-4">Accelerate through weeks 1-6, then focus on complex applications and morphology connections.</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Assessment Trigger:</div>
                      <div className="ml-4">If students score below 80% mastery on Friday assessments, extend that week&apos;s content into the following week. Cumulative checkpoints assess retention of all prior weeks&apos; content.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Phonemes in Stage - DD23 Exact Style */}
        {showPhonemeModal && (
          <div className={`fixed inset-0 bg-black flex items-start justify-center z-50 transition-all duration-500 ${modalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} style={{paddingTop: '167px'}}>
            <div className={`bg-white bg-subtle-texture rounded-lg p-6 overflow-hidden transition-all duration-700 transform ${modalVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`} style={{width: '1230px', minWidth: '1230px', maxWidth: '1230px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3)'}}>
              <div className="flex justify-between items-start mb-0">
                <h2 className="text-xl font-bold text-deepNavy">
                  Stage {selectedStage}: Phonemes & Elements
                </h2>
                <button 
                  onClick={() => {
                    setModalVisible(false);
                    setShowPhonemeModal(false);
                  }}
                  className="text-teal-700 hover:text-teal-800 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-deepNavy text-sm mb-2">
                  {EIGHT_STAGE_SYSTEM.find(s => s.stage_number === selectedStage)?.description}
                </p>
                <div className="bg-gradient-to-br from-emerald-600/80 via-teal-600/80 to-cyan-700/80 rounded-lg p-3 border border-oceanBlue/40 shadow-xl">
                  <p className="text-base text-white">
                    <strong>Research-Based Pacing:</strong>&nbsp; 2-3 phonemes per week • Cumulative checkpoint assessments every other week
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {getWeeklyPhonemes(selectedStage).map((weekData, index) => {
                  const cardColors = [
                    'bg-gradient-to-br from-emerald-500/30 to-emerald-600/40', 
                    'bg-gradient-to-br from-blue-500/30 to-blue-600/40', 
                    'bg-gradient-to-br from-purple-500/30 to-purple-600/40', 
                    'bg-gradient-to-br from-amber-500/30 to-orange-600/40',
                    'bg-gradient-to-br from-red-500/30 to-red-600/40', 
                    'bg-gradient-to-br from-yellow-500/30 to-yellow-600/40',
                    'bg-gradient-to-br from-indigo-500/30 to-indigo-600/40',
                    'bg-gradient-to-br from-rose-500/30 to-pink-600/40'
                  ];
                  const borderColors = [
                    'border-emerald-500', 
                    'border-blue-500', 
                    'border-purple-500', 
                    'border-orange-500',
                    'border-red-500', 
                    'border-yellow-500',
                    'border-indigo-500',
                    'border-pink-500'
                  ];
                  
                  return (
                    <div key={index} className={`${cardColors[index % cardColors.length]} rounded-lg p-4 border ${borderColors[index % borderColors.length]} shadow-xl relative overflow-hidden`}>
                      {/* Colorful accent strip */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${
                        index === 0 ? 'bg-emerald-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' :
                        index === 4 ? 'bg-red-500' :
                        index === 5 ? 'bg-yellow-500' :
                        index === 6 ? 'bg-indigo-500' :
                        'bg-pink-500'
                      }`}></div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-deepNavy">
                          <span className="text-darkOcean pr-1">Week {weekData.week}:</span> {weekData.phonemes.join(', ')} 
                        </span>
                        <div className="text-xs text-mediumGray">
                          {weekData.frequency}
                        </div>
                      </div>
                      
                      {/* Column headers */}
                      <div className="grid grid-cols-3 gap-1 mb-3 text-[10px] font-bold">
                        <div className="bg-white/80 text-darkOcean text-center py-0.5 px-1 rounded shadow-sm border-l-4 border-darkOcean">Phonemes</div>
                        <div className="bg-white/80 text-darkOcean text-center py-0.5 px-1 rounded shadow-sm border-l-4 border-darkOcean">Graphemes</div>
                        <div className="bg-white/80 text-darkOcean text-center py-0.5 px-1 rounded shadow-sm border-l-4 border-darkOcean">Examples</div>
                      </div>
                      
                      {/* Data rows */}
                      {weekData.phonemes.map((phoneme, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-1 text-sm text-deepNavy mb-1 py-1 px-2">
                          <div className="text-center font-medium">{phoneme}</div>
                          <div className="text-center font-medium">〈{weekData.graphemes[idx] || ''}〉</div>
                          <div className="text-center">{weekData.examples[idx] || ''}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              
              {getWeeklyPhonemes(selectedStage).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No Phoneme Samples Available</h3>
                  <p className="text-gray-500">
                    Phoneme samples for this stage are being prepared. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grade Level Modal - Visual Design */}
        {showGradeLevelModal && (
          <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-500 ${gradeLevelModalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} style={{paddingTop: selectedStage === 1 ? '95px' : selectedStage === 2 ? '119px' : selectedStage === 3 ? '118px' : selectedStage === 4 ? '70px' : selectedStage === 5 ? '70px' : selectedStage === 6 ? '95px' : selectedStage === 7 ? '99px' : selectedStage === 8 ? '95px' : '83px'}}>
            <div className={`bg-white bg-subtle-texture rounded-lg mx-4 transition-all duration-700 transform ${gradeLevelModalVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`} style={{
              maxWidth: '1230px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 6px 30px rgba(47, 95, 95, 0.3)'
            }}>
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 pb-4">
                <h2 className="text-2xl font-bold text-deepNavy">
                  Grade Level
                </h2>
                <button 
                  onClick={() => {
                    setGradeLevelModalVisible(false);
                    setShowGradeLevelModal(false);
                  }}
                  className="text-deepNavy/70 hover:text-deepNavy transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Visual Cards Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${selectedStage === 5 || selectedStage === 8 ? 'gap-4' : 'gap-6'}`}>
                  
                  {/* Stage Overview & Instructional Focus Card */}
                  <div className="bg-gradient-to-br from-amber-500/30 to-amber-600/40 rounded-xl p-5 border border-amber-400 shadow-xl col-span-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-black">Overview:  <span className="font-normal" style={{paddingLeft: '5px'}}>Students learn foundational consonants and short vowels prioritized for high frequency and transparent mappings.</span></h3>
                    </div>
                    
                    {/* Key Concept */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-black">Key Concept:  <span className="font-normal" style={{paddingLeft: '5px'}}>{EIGHT_STAGE_SYSTEM.find(s => s.stage_number === selectedStage)?.key_concept}</span></h3>
                    </div>
                    
                    {/* Instructional Focus Grid */}
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-black">Instructional Focus Areas:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {EIGHT_STAGE_SYSTEM.find(s => s.stage_number === selectedStage)?.instructional_focus.map((focus, index) => (
                          <div key={index} className="border-2 border-amber-500 rounded-lg p-3 bg-white/60 backdrop-blur-sm">
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-amber-500"></div>
                              <p className="text-sm text-black leading-relaxed font-medium">{focus}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Developmental Insight Card */}
                  <div className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 rounded-xl p-4 border border-purple-400 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                        <span className="text-lg">🧠</span>
                      </div>
                      <h3 className="text-base font-extrabold text-black">Developmental Profile</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-50/70 rounded-lg p-2">
                        <h4 className="font-semibold text-xs text-black mb-1">Ehri Phase</h4>
                        <p className="text-xs text-black/80">{EIGHT_STAGE_SYSTEM.find(s => s.stage_number === selectedStage)?.science_of_reading_alignment.ehri_phase}</p>
                      </div>
                      <div className="bg-blue-50/70 rounded-lg p-2">
                        <h4 className="font-semibold text-xs text-black mb-1">Cognitive Development</h4>
                        <p className="text-xs text-black/80 leading-relaxed">
                          {selectedStage === 1 
                            ? "Visual memory reliance → Initial sound-symbol mapping"
                            : selectedStage === 2
                            ? "3-4 phoneme manipulation → Blend & digraph processing"
                            : selectedStage === 3
                            ? "3-5 phoneme fluency → Orthographic mapping begins"
                            : selectedStage === 4
                            ? "Pattern consolidation → Vowel team recognition"
                            : selectedStage === 5
                            ? "Automatic chunking → R-controlled pattern mastery"
                            : selectedStage === 6
                            ? "Orthographic memory → Irregular pattern storage"
                            : selectedStage === 7
                            ? "Rapid pattern recognition → Morpheme awareness"
                            : "Morphological analysis → Academic vocabulary mastery"
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ELL Considerations Card */}
                  <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/40 rounded-xl p-4 border border-emerald-400 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                        <span className="text-lg">🌍</span>
                      </div>
                      <h3 className="text-base font-extrabold text-black">ELL Support</h3>
                    </div>
                    <div className="bg-emerald-50/60 rounded-lg p-3">
                      {selectedStage === 1 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Oral-first activities before print</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Visual/gesture/L1 connections</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">High-frequency vocabulary focus</p>
                          </div>
                        </>
                      ) : selectedStage === 2 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Mouth visuals for /th/, /r/, /ng/</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Contrastive analysis (/v/ vs /b/)</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Oral rehearsal before decoding</p>
                          </div>
                        </>
                      ) : selectedStage === 3 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Explicit long/short vowel contrast</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Silent E with motion/sound cards</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Decodables tied to oral goals</p>
                          </div>
                        </>
                      ) : selectedStage === 4 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Multiple spelling contrasts</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Color-coded sound flexibility</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Vocabulary + decoding pairs</p>
                          </div>
                        </>
                      ) : selectedStage === 5 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Explicit R-controlled syllable work</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Visual pattern cards + sorting</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Analogies with known patterns</p>
                          </div>
                        </>
                      ) : selectedStage === 6 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Interactive irregular word board</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Etymology + word stories</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Memory techniques for spelling</p>
                          </div>
                        </>
                      ) : selectedStage === 7 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Visual/auditory diphthong cues</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Systematic word building</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Chunking + graphic organizers</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Visual morpheme models</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Hands-on syllable division</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Morpheme analysis activities</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Differentiation Card */}
                  <div className="bg-gradient-to-br from-rose-500/30 to-pink-600/40 rounded-xl p-4 border border-rose-400 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                        <span className="text-lg">🎯</span>
                      </div>
                      <h3 className="text-base font-extrabold text-black">Differentiation</h3>
                    </div>
                    <div className="bg-rose-100/80 rounded-lg p-3">
                      {selectedStage === 1 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Manipulatives + phoneme practice</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Chants/rhythm for sounds</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Extra retrieval time</p>
                          </div>
                        </>
                      ) : selectedStage === 2 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Digraph/blend discrimination cards</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Sound mirrors for articulation</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Partner reading support</p>
                          </div>
                        </>
                      ) : selectedStage === 3 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Silent E wands + visual aids</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Extended vowel practice time</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Controlled text complexity</p>
                          </div>
                        </>
                      ) : selectedStage === 4 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Pattern sort activities</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Vowel team reference charts</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Flexible grouping strategies</p>
                          </div>
                        </>
                      ) : selectedStage === 5 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">R-controlled word walls</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Syllable division supports</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Choice in practice activities</p>
                          </div>
                        </>
                      ) : selectedStage === 6 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Word history investigations</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Personal spelling journals</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Memory palace techniques</p>
                          </div>
                        </>
                      ) : selectedStage === 7 ? (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Diphthong discovery activities</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Advanced word building games</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Peer teaching opportunities</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Morpheme manipulation tools</p>
                          </div>
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Academic vocabulary projects</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-rose-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            <p className="text-xs text-black/80">Complex text analysis</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
    </>
  );
}