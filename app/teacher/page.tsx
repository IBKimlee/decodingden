'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllStages, type PhonicsStage } from '@/lib/supabase/phonics-queries';
import { useTeacher } from '../contexts/AuthContext';

export default function TeacherPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [stages, setStages] = useState<PhonicsStage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { teacher, isTeacher, isLoading: authLoading } = useTeacher();

  // Redirect based on auth status
  useEffect(() => {
    if (authLoading) return;

    if (!isTeacher) {
      router.push('/login');
      return;
    }

    // Check if teacher is approved
    if (teacher && !teacher.is_approved) {
      router.push('/pending-approval');
      return;
    }
  }, [authLoading, isTeacher, teacher, router]);

  // Load stages from Supabase
  useEffect(() => {
    async function loadStages() {
      try {
        const stagesData = await getAllStages();
        setStages(stagesData);
      } catch (error) {
        console.error('Error loading stages:', error);
      } finally {
        setLoading(false);
      }
    }
    if (isTeacher) {
      loadStages();
    }
  }, [isTeacher]);

  // Enhanced phoneme suggestions with stage information
  const phonemeSuggestions = [
    { phoneme: '/m/', keyword: 'mat', type: 'Stage 1: Foundation', stage: 1 },
    { phoneme: '/sh/', keyword: 'ship', type: 'Stage 2: Digraph', stage: 2 },
    { phoneme: '/str/', keyword: 'string', type: 'Stage 3: Complex Blend', stage: 3 },
    { phoneme: '/ai/', keyword: 'rain', type: 'Stage 4: Vowel Team', stage: 4 },
    { phoneme: '/ar/', keyword: 'car', type: 'Stage 5: R-Controlled', stage: 5 },
    { phoneme: '/kn/', keyword: 'knee', type: 'Stage 6: Silent Letters', stage: 6 },
    { phoneme: '/oy/', keyword: 'boy', type: 'Stage 7: Diphthong', stage: 7 },
  ];

  const recentLessons = [
    { id: 1, phoneme: '/ai/', stage: 4, date: 'Nov 15', students: 24, mastery: '87%', type: 'Vowel Team' },
    { id: 2, phoneme: '/str/', stage: 3, date: 'Nov 14', students: 22, mastery: '92%', type: 'Complex Blend' },
    { id: 3, phoneme: '/sh/', stage: 2, date: 'Nov 13', students: 25, mastery: '95%', type: 'Digraph' },
  ];

  const studentNeeds = [
    { skill: 'R-controlled vowels', stage: 5, percentage: 35, students: ['Emma S.', 'James K.'], intervention: 'Multisensory practice' },
    { skill: 'Silent e pattern', stage: 3, percentage: 28, students: ['Maya P.', 'Alex R.'], intervention: 'Magic e activities' },
    { skill: 'Consonant blends', stage: 2, percentage: 22, students: ['Sam L.'], intervention: 'Phoneme segmentation' },
  ];

  const filteredSuggestions = phonemeSuggestions.filter(item =>
    item.phoneme.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query = searchQuery) => {
    console.log('Searching for:', query, 'searchQuery:', searchQuery);
    if (query.trim()) {
      const url = `/teacher/lesson?phoneme=${encodeURIComponent(query.trim())}`;
      console.log('Navigating to:', url);
      router.push(url);
    } else {
      console.log('Search term is empty');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchQuery);
      setShowDropdown(false);
    }
  };


  // Show loading while checking auth or approval
  if (authLoading || !isTeacher || (teacher && !teacher.is_approved)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softSand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-softSand text-pineShadow flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-softSand to-forestMist shadow-md p-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-pineShadow">Teacher Portal</h1>
              <p className="text-xs text-mossGray hidden sm:block">Welcome back! Let&apos;s build strong readers together.</p>
            </div>
            <div className="flex items-center gap-3">
              {teacher?.is_admin && (
                <Link
                  href="/admin"
                  className="text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                >
                  Admin Panel
                </Link>
              )}
              <Link href="/" className="text-xs sm:text-sm text-pineShadow/70 hover:text-pineShadow transition">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-2 sm:p-4 flex-1 w-full flex flex-col px-4 sm:px-6 lg:px-8">
        {/* Search Bar Section */}
        <div className="mb-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                console.log('Input changed:', e.target.value);
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onFocus={() => setShowDropdown(searchQuery.length > 0)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a sound, keyword, or grapheme..."
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-lg shadow-md border border-forestMist/30 focus:outline-none focus:border-roseAccent transition text-sm sm:text-base"
            />
            <button 
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
            >
              <span className="text-xl">🔍</span>
            </button>
            
            {/* Dropdown */}
            {showDropdown && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-forestMist/30 overflow-hidden z-10">
                {filteredSuggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(item.phoneme);
                      setShowDropdown(false);
                      handleSearch(item.phoneme);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-forestMist/20 transition flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium">{item.phoneme}</span>
                      <span className="text-mossGray ml-2">as in &quot;{item.keyword}&quot;</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-roseAccent">{item.type}</span>
                      <div className="text-xs text-pineShadow">Stage {item.stage}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <button
            onClick={() => router.push('/teacher/students')}
            className="bg-oceanBlue text-white p-3 sm:p-4 rounded-xl shadow-md hover:bg-darkOcean transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-xs sm:text-sm">Manage Students</h3>
            <p className="text-xs text-white/80 hidden sm:block">Add students & groups</p>
          </button>

          <button
            onClick={() => router.push('/teacher/push-activities')}
            className="bg-green-500 text-white p-3 sm:p-4 rounded-xl shadow-md hover:bg-green-600 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="font-semibold text-xs sm:text-sm">Push Activities</h3>
            <p className="text-xs text-white/80 hidden sm:block">Assign work after small group</p>
          </button>

          <button
            onClick={() => router.push('/teacher/stages')}
            className="bg-forestMist p-3 sm:p-4 rounded-xl shadow-md hover:bg-forestMist/80 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="font-semibold text-xs sm:text-sm">Teaching Stages</h3>
            <p className="text-xs text-pineShadow/70 hidden sm:block">8-Stage phonics progression</p>
          </button>

          <button
            onClick={() => router.push('/teacher/assessments')}
            className="bg-roseAccent/30 p-3 sm:p-4 rounded-xl shadow-md hover:bg-roseAccent/40 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">📋</div>
            <h3 className="font-semibold text-xs sm:text-sm">Assessment Generator</h3>
            <p className="text-xs text-pineShadow/70 hidden sm:block">Create formal assessments</p>
          </button>

          <button
            onClick={() => router.push('/teacher/progress')}
            className="bg-roseAccent/30 p-3 sm:p-4 rounded-xl shadow-md hover:bg-roseAccent/40 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="font-semibold text-xs sm:text-sm">Progress Analytics</h3>
            <p className="text-xs text-pineShadow/70 hidden sm:block">Real-time student data</p>
          </button>

          <button 
            onClick={() => router.push('/teacher/scope-sequence')}
            className="bg-mossGray/70 p-3 sm:p-4 rounded-xl shadow-md hover:bg-mossGray/80 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">🧭</div>
            <h3 className="font-semibold text-xs sm:text-sm">Scope & Sequence</h3>
            <p className="text-xs text-pineShadow/70 hidden sm:block">View phonics progression</p>
          </button>

          <button className="bg-mossGray text-softSand p-3 sm:p-4 rounded-xl shadow-md hover:bg-mossGray/90 transition group">
            <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">🚨</div>
            <h3 className="font-semibold text-xs sm:text-sm">Intervention Hub</h3>
            <p className="text-xs text-softSand/80 hidden sm:block">Smart alerts & support</p>
          </button>
        </div>

        {/* Bottom Section - Recent Activity and Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Recent Lessons */}
          <div className="bg-white/50 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-sm mb-2 flex items-center">
              <span className="mr-1">📑</span> Recent Lessons
            </h3>
            <div className="space-y-1">
              {recentLessons.slice(0, 3).map((lesson) => (
                <div key={lesson.id} className="flex justify-between items-center p-2 bg-forestMist/30 rounded-lg hover:bg-forestMist/50 transition cursor-pointer text-xs">
                  <div>
                    <span className="font-medium">{lesson.phoneme}</span>
                    <span className="text-mossGray ml-1">• {lesson.type}</span>
                    <div className="text-xs text-pineShadow">Stage {lesson.stage} • {lesson.students} students</div>
                  </div>
                  <div className="text-right">
                    <span className="text-forestGreen font-medium">{lesson.mastery}</span>
                    <div className="text-mossGray">{lesson.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Needs */}
          <div className="bg-white/50 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-sm mb-2 flex items-center">
              <span className="mr-1">🎯</span> Common Student Needs
            </h3>
            <div className="space-y-2">
              {studentNeeds.map((need, index) => (
                <div key={index} className="p-2 bg-white/30 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{need.skill}</span>
                    <span className="text-xs text-roseAccent font-medium">{need.percentage}% need support</span>
                  </div>
                  <div className="text-xs text-mossGray mb-1">
                    Stage {need.stage} • {need.students.join(', ')}
                  </div>
                  <div className="w-full bg-forestMist/30 rounded-full h-1.5">
                    <div 
                      className="bg-roseAccent h-1.5 rounded-full transition-all"
                      style={{ width: `${need.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-forestGreen mt-1">→ {need.intervention}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-4 bg-gradient-to-r from-forestMist/30 to-roseAccent/20 rounded-xl p-3 text-center">
          <p className="text-xs text-mossGray">
            <span className="font-semibold">🌲 Science of Reading Hub:</span> Your 8-stage system covers 75+ phonemic elements for complete K-5 mastery!
          </p>
        </div>
      </main>

    </div>
  );
}