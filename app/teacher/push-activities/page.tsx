'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useTeacher } from '@/app/contexts/AuthContext';
import { getMyStudents, getMyGroups } from '@/lib/supabase/auth';
import { supabase } from '@/lib/supabase/client';
import type { Student, StudentGroup } from '@/lib/supabase/client';

// Activity types available in Student Den
const ACTIVITY_TYPES = [
  { id: 'elkonin_box', name: 'Elkonin Boxes', icon: '🔲', description: 'Sound segmentation practice' },
  { id: 'whiteboard', name: 'Whiteboard', icon: '✏️', description: 'Writing and spelling practice' },
  { id: 'word_work', name: 'Word Work', icon: '📝', description: 'Word building activities' },
  { id: 'phoneme_keyboard', name: 'Den Friends', icon: '🦊', description: 'Phoneme identification game' },
  { id: 'story_circle', name: 'Story Circle', icon: '📖', description: 'Decodable reading practice' },
];

export default function PushActivitiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading: authLoading, userRole } = useAuth();
  const { teacher, isTeacher } = useTeacher();

  // Data state
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Selection state
  const [selectedPhoneme, setSelectedPhoneme] = useState(searchParams.get('phoneme') || '');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selection mode: 'students' or 'groups'
  const [selectionMode, setSelectionMode] = useState<'students' | 'groups'>('students');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsResult, groupsResult] = await Promise.all([
        getMyStudents(),
        getMyGroups()
      ]);

      if (!studentsResult.error) setStudents(studentsResult.students);
      if (!groupsResult.error) setGroups(groupsResult.groups);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isTeacher && userRole !== 'teacher') {
      router.push('/login');
      return;
    }

    if (isTeacher) {
      loadData();
    }
  }, [authLoading, isTeacher, userRole, router, loadData]);

  // Auto-generate title when phoneme changes
  useEffect(() => {
    if (selectedPhoneme) {
      setAssignmentTitle(`Practice: ${selectedPhoneme}`);
    }
  }, [selectedPhoneme]);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const selectAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(s => s.id));
    }
  };

  const selectAllActivities = () => {
    if (selectedActivities.length === ACTIVITY_TYPES.length) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(ACTIVITY_TYPES.map(a => a.id));
    }
  };

  const handlePushActivities = async () => {
    // Validation
    if (!selectedPhoneme.trim()) {
      setError('Please enter the skill/phoneme you taught');
      return;
    }

    if (selectionMode === 'students' && selectedStudents.length === 0) {
      setError('Please select at least one student');
      return;
    }

    if (selectionMode === 'groups' && selectedGroups.length === 0) {
      setError('Please select at least one group');
      return;
    }

    if (selectedActivities.length === 0) {
      setError('Please select at least one activity type');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create assignments for each activity type
      for (const activityType of selectedActivities) {
        const activityInfo = ACTIVITY_TYPES.find(a => a.id === activityType);

        // Create the assignment
        const { data: assignment, error: assignmentError } = await supabase
          .from('assignments')
          .insert({
            teacher_id: teacher?.id,
            title: `${assignmentTitle} - ${activityInfo?.name || activityType}`,
            description: `Practice ${selectedPhoneme} with ${activityInfo?.name}`,
            activity_type: activityType,
            phoneme_id: selectedPhoneme,
            activity_config: {
              phoneme: selectedPhoneme,
              activityType: activityType
            }
          })
          .select()
          .single();

        if (assignmentError) {
          console.error('Assignment creation error:', assignmentError);
          throw assignmentError;
        }

        if (assignment) {
          if (selectionMode === 'students') {
            // Assign to individual students
            const studentAssignments = selectedStudents.map(studentId => ({
              assignment_id: assignment.id,
              student_id: studentId,
              status: 'assigned'
            }));

            const { error: studentAssignError } = await supabase
              .from('student_assignments')
              .insert(studentAssignments);

            if (studentAssignError) {
              console.error('Student assignment error:', studentAssignError);
              throw studentAssignError;
            }
          } else {
            // Assign to groups
            const groupAssignments = selectedGroups.map(groupId => ({
              assignment_id: assignment.id,
              group_id: groupId
            }));

            const { error: groupAssignError } = await supabase
              .from('group_assignments')
              .insert(groupAssignments);

            if (groupAssignError) {
              console.error('Group assignment error:', groupAssignError);
              throw groupAssignError;
            }

            // Also create student_assignments for all students in the groups
            for (const groupId of selectedGroups) {
              const { data: memberships } = await supabase
                .from('group_memberships')
                .select('student_id')
                .eq('group_id', groupId);

              if (memberships && memberships.length > 0) {
                const studentAssignments = memberships.map(m => ({
                  assignment_id: assignment.id,
                  student_id: m.student_id,
                  status: 'assigned'
                }));

                await supabase
                  .from('student_assignments')
                  .upsert(studentAssignments, { onConflict: 'assignment_id,student_id' });
              }
            }
          }
        }
      }

      setSuccess(`Successfully pushed ${selectedActivities.length} activities to ${
        selectionMode === 'students'
          ? `${selectedStudents.length} student(s)`
          : `${selectedGroups.length} group(s)`
      }!`);

      // Reset selections
      setSelectedStudents([]);
      setSelectedGroups([]);
      setSelectedActivities([]);
      setSelectedPhoneme('');
      setAssignmentTitle('');

    } catch (err) {
      console.error('Push error:', err);
      setError('Failed to push activities. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-softSand flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-mossGray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-softSand text-pineShadow">
      {/* Header */}
      <header className="bg-gradient-to-b from-softSand to-forestMist shadow-md p-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-pineShadow">Push Activities</h1>
              <p className="text-xs text-mossGray">
                Assign practice activities after small group instruction
              </p>
            </div>
            <Link href="/teacher" className="text-xs sm:text-sm text-pineShadow/70 hover:text-pineShadow transition">
              ← Back to Teacher Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">×</button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
            <button onClick={() => setSuccess(null)} className="float-right font-bold">×</button>
          </div>
        )}

        {/* Step 1: What did you teach? */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-oceanBlue text-white rounded-full flex items-center justify-center text-sm">1</span>
            What skill did you teach?
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={selectedPhoneme}
              onChange={(e) => setSelectedPhoneme(e.target.value)}
              placeholder="e.g., short /a/, digraph /sh/, blend /st/"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Enter the phoneme, grapheme, or skill you just practiced with your small group
          </p>
        </div>

        {/* Step 2: Who to assign? */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-oceanBlue text-white rounded-full flex items-center justify-center text-sm">2</span>
            Who should practice?
          </h2>

          {/* Toggle between students and groups */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectionMode('students')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectionMode === 'students'
                  ? 'bg-oceanBlue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Individual Students
            </button>
            <button
              onClick={() => setSelectionMode('groups')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectionMode === 'groups'
                  ? 'bg-oceanBlue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Groups
            </button>
          </div>

          {selectionMode === 'students' ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{selectedStudents.length} selected</span>
                <button
                  onClick={selectAllStudents}
                  className="text-sm text-oceanBlue hover:text-darkOcean"
                >
                  {selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p>No students yet.</p>
                  <Link href="/teacher/students" className="text-oceanBlue hover:underline">
                    Add students first →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {students.map(student => (
                    <button
                      key={student.id}
                      onClick={() => toggleStudent(student.id)}
                      className={`p-3 rounded-lg border-2 text-left transition ${
                        selectedStudents.includes(student.id)
                          ? 'border-oceanBlue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🧒</span>
                        <span className="text-sm font-medium truncate">{student.display_name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {groups.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p>No groups yet.</p>
                  <Link href="/teacher/students" className="text-oceanBlue hover:underline">
                    Create groups first →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {groups.map(group => (
                    <button
                      key={group.id}
                      onClick={() => toggleGroup(group.id)}
                      className={`p-3 rounded-lg border-2 text-left transition ${
                        selectedGroups.includes(group.id)
                          ? 'border-oceanBlue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <span className="font-medium">{group.name}</span>
                      </div>
                      {group.skill_focus && (
                        <p className="text-xs text-gray-500 mt-1">Focus: {group.skill_focus}</p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 3: Which activities? */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-oceanBlue text-white rounded-full flex items-center justify-center text-sm">3</span>
            Which activities should they complete?
          </h2>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">{selectedActivities.length} selected</span>
            <button
              onClick={selectAllActivities}
              className="text-sm text-oceanBlue hover:text-darkOcean"
            >
              {selectedActivities.length === ACTIVITY_TYPES.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ACTIVITY_TYPES.map(activity => (
              <button
                key={activity.id}
                onClick={() => toggleActivity(activity.id)}
                className={`p-4 rounded-xl border-2 text-left transition ${
                  selectedActivities.includes(activity.id)
                    ? 'border-oceanBlue bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Push Button */}
        <div className="bg-gradient-to-r from-oceanBlue to-darkOcean rounded-xl shadow-md p-5 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold">Ready to push?</h3>
              <p className="text-sm text-white/80">
                {selectedActivities.length} activities → {' '}
                {selectionMode === 'students'
                  ? `${selectedStudents.length} students`
                  : `${selectedGroups.length} groups`}
              </p>
            </div>
            <button
              onClick={handlePushActivities}
              disabled={isSubmitting || selectedActivities.length === 0 ||
                (selectionMode === 'students' ? selectedStudents.length === 0 : selectedGroups.length === 0)}
              className="px-8 py-3 bg-white text-oceanBlue rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span> Pushing...
                </>
              ) : (
                <>
                  <span>🚀</span> Push to Students
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
