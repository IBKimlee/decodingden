'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStudent } from '@/app/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';
import type { StudentAssignment } from '@/lib/supabase/client';

// Activity type to route mapping
const ACTIVITY_ROUTES: Record<string, string> = {
  'elkonin_box': '/student/elkonin-box',
  'whiteboard': '/student/whiteboard',
  'word_work': '/student/phoneme-keyboard',
  'phoneme_keyboard': '/student/phoneme-keyboard',
  'story_circle': '/student/story-circle',
};

// Activity display info
const ACTIVITY_INFO: Record<string, { name: string; icon: string; color: string; description: string }> = {
  'elkonin_box': {
    name: 'Sound Boxes',
    icon: '📦',
    color: 'from-emerald-400 to-teal-600',
    description: 'Break words into sounds!'
  },
  'whiteboard': {
    name: 'Drawing Den',
    icon: '✏️',
    color: 'from-purple-500 to-pink-600',
    description: 'Practice writing!'
  },
  'word_work': {
    name: 'Word Workspace',
    icon: '🔤',
    color: 'from-indigo-400 to-purple-600',
    description: 'Build words!'
  },
  'phoneme_keyboard': {
    name: 'Word Workspace',
    icon: '🔤',
    color: 'from-indigo-400 to-purple-600',
    description: 'Build words!'
  },
  'story_circle': {
    name: 'Story Circle',
    icon: '📚',
    color: 'from-red-400 to-pink-600',
    description: 'Read a story!'
  },
};

export default function StudentDenPage() {
  const router = useRouter();
  const { student, isStudent } = useStudent();
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch student's assigned activities
  const fetchAssignments = useCallback(async () => {
    if (!student?.id) return;

    try {
      const { data, error } = await supabase
        .from('student_assignments')
        .select(`
          *,
          assignment:assignments(*)
        `)
        .eq('student_id', student.id)
        .in('status', ['assigned', 'in_progress'])
        .order('created_at', { ascending: false });

      if (!error && data) {
        setAssignments(data as StudentAssignment[]);
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    if (isStudent && student) {
      fetchAssignments();
    } else {
      setLoading(false);
    }
  }, [isStudent, student, fetchAssignments]);

  // Get first name for greeting
  const firstName = student?.display_name?.split(' ')[0] || 'Friend';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">

      {/* Big Welcome Header */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-8 px-4 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Link href="/" className="hover:scale-110 transition-transform">
              <Image
                src="/images/dhole mascot.png"
                alt="Home"
                width={60}
                height={60}
              />
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
              Hi, {firstName}! 👋
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-white/90">
            Welcome to your Decoding Den!
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* My Tasks Section - Shows First if there are assignments */}
        {assignments.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl animate-bounce">⭐</span>
              <h2 className="text-3xl font-bold text-gray-800">
                My Tasks
              </h2>
              <span className="bg-red-500 text-white text-xl font-bold px-3 py-1 rounded-full">
                {assignments.length}
              </span>
            </div>

            <div className="grid gap-4">
              {assignments.map((assignment) => {
                const activityType = assignment.assignment?.activity_type || '';
                const info = ACTIVITY_INFO[activityType] || {
                  name: 'Activity',
                  icon: '📝',
                  color: 'from-gray-400 to-gray-600',
                  description: 'Complete this activity!'
                };
                const route = ACTIVITY_ROUTES[activityType];

                return (
                  <button
                    key={assignment.id}
                    onClick={() => route && router.push(route)}
                    className={`w-full bg-gradient-to-r ${info.color} rounded-2xl shadow-xl p-6 text-left hover:scale-102 hover:shadow-2xl transition-all border-4 border-white/50`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{info.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white">
                          {info.name}
                        </h3>
                        <p className="text-white/80 text-lg">
                          {assignment.assignment?.title || info.description}
                        </p>
                      </div>
                      <div className="text-4xl">▶️</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* No Tasks Message */}
        {!loading && assignments.length === 0 && (
          <div className="mb-10 bg-white rounded-3xl shadow-xl p-8 text-center border-4 border-green-300">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              All Done!
            </h2>
            <p className="text-xl text-gray-600">
              No tasks right now. Explore the activities below!
            </p>
          </div>
        )}

        {/* All Activities Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🎮</span> All Activities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

            {/* Sound Boxes */}
            <Link
              href="/student/elkonin-box"
              className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-lg p-5 text-center hover:scale-105 transition-all border-4 border-emerald-700"
            >
              <div className="text-4xl mb-2">
                <svg width="60" height="48" viewBox="0 0 128 128" fill="none" className="mx-auto">
                  <rect x="2" y="36" width="40" height="40" stroke="white" strokeWidth="4" fill="none"/>
                  <rect x="42" y="36" width="40" height="40" stroke="white" strokeWidth="4" fill="none"/>
                  <rect x="82" y="36" width="40" height="40" stroke="white" strokeWidth="4" fill="none"/>
                  <circle cx="22" cy="56" r="10" fill="white"/>
                  <circle cx="62" cy="56" r="10" fill="white"/>
                  <circle cx="102" cy="56" r="10" fill="white"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Sound Boxes</h3>
            </Link>

            {/* Drawing Den */}
            <Link
              href="/student/whiteboard"
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-5 text-center hover:scale-105 transition-all border-4 border-purple-700"
            >
              <div className="text-4xl mb-2">✏️</div>
              <h3 className="text-lg font-bold text-white">Drawing Den</h3>
            </Link>

            {/* Word Workspace */}
            <Link
              href="/student/phoneme-keyboard"
              className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl shadow-lg p-5 text-center hover:scale-105 transition-all border-4 border-indigo-700"
            >
              <div className="text-4xl mb-2">🔤</div>
              <h3 className="text-lg font-bold text-white">Word Workspace</h3>
            </Link>

            {/* Story Circle */}
            <Link
              href="/student/story-circle"
              className="bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl shadow-lg p-5 text-center hover:scale-105 transition-all border-4 border-red-700"
            >
              <div className="text-4xl mb-2">📚</div>
              <h3 className="text-lg font-bold text-white">Story Circle</h3>
            </Link>

            {/* Den Friends - Coming Soon */}
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-lg p-5 text-center border-4 border-blue-700 opacity-75">
              <div className="text-4xl mb-2">🦊</div>
              <h3 className="text-lg font-bold text-white">Den Friends</h3>
              <p className="text-xs text-white/70">Coming Soon!</p>
            </div>

            {/* Trophy Tree - Coming Soon */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-5 text-center border-4 border-yellow-600 opacity-75">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-lg font-bold text-white">Trophy Tree</h3>
              <p className="text-xs text-white/70">Coming Soon!</p>
            </div>

          </div>
        </section>

        {/* Fun Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-lg">
            Keep learning, {firstName}! You&apos;re doing great! 🌟
          </p>
        </div>

      </main>
    </div>
  );
}
