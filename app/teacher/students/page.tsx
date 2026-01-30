'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useTeacher } from '@/app/contexts/AuthContext';
import {
  createStudent,
  getMyStudents,
  getMyGroups,
  createGroup,
  deactivateStudent,
  generateLoginCode
} from '@/lib/supabase/auth';
import type { Student, StudentGroup } from '@/lib/supabase/client';

export default function StudentsPage() {
  const router = useRouter();
  const { isLoading: authLoading, userRole } = useAuth();
  const { teacher, isTeacher } = useTeacher();

  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add student form state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [readingLevel, setReadingLevel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add group form state
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupColor, setGroupColor] = useState('#4a90a4');

  // Selected student for details view
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsResult, groupsResult] = await Promise.all([
        getMyStudents(),
        getMyGroups()
      ]);

      if (studentsResult.error) {
        setError(studentsResult.error.message);
      } else {
        setStudents(studentsResult.students);
      }

      if (groupsResult.error) {
        console.error('Error loading groups:', groupsResult.error);
      } else {
        setGroups(groupsResult.groups);
      }
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect if not a teacher
    if (!authLoading && !isTeacher && userRole !== 'teacher') {
      router.push('/login');
      return;
    }

    if (isTeacher) {
      loadData();
    }
  }, [authLoading, isTeacher, userRole, router, loadData]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const { student, error } = await createStudent(
      firstName.trim(),
      lastName.trim() || undefined,
      gradeLevel || undefined,
      readingLevel || undefined
    );

    if (error) {
      setError(error.message);
    } else if (student) {
      setStudents(prev => [...prev, student]);
      // Reset form
      setFirstName('');
      setLastName('');
      setGradeLevel('');
      setReadingLevel('');
      setShowAddStudent(false);
    }

    setIsSubmitting(false);
  };

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const { group, error } = await createGroup(
      groupName.trim(),
      groupDescription.trim() || undefined,
      groupColor
    );

    if (error) {
      setError(error.message);
    } else if (group) {
      setGroups(prev => [...prev, group]);
      // Reset form
      setGroupName('');
      setGroupDescription('');
      setGroupColor('#4a90a4');
      setShowAddGroup(false);
    }

    setIsSubmitting(false);
  };

  const handleDeactivateStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to deactivate this student? They will no longer be able to log in.')) {
      return;
    }

    const { error } = await deactivateStudent(studentId);

    if (error) {
      setError(error.message);
    } else {
      setStudents(prev => prev.filter(s => s.id !== studentId));
      setSelectedStudent(null);
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
              <h1 className="text-lg sm:text-xl font-bold text-pineShadow">Student Management</h1>
              <p className="text-xs text-mossGray">
                {teacher?.display_name ? `Welcome, ${teacher.display_name}` : 'Manage your students and groups'}
              </p>
            </div>
            <Link href="/teacher" className="text-xs sm:text-sm text-pineShadow/70 hover:text-pineShadow transition">
              ← Back to Teacher Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">×</button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowAddStudent(true)}
            className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add Student
          </button>
          <button
            onClick={() => setShowAddGroup(true)}
            className="px-4 py-2 bg-forestMist text-pineShadow rounded-lg font-semibold hover:bg-forestMist/80 transition-colors flex items-center gap-2"
          >
            <span>📁</span> Create Group
          </button>
        </div>

        {/* Add Student Modal */}
        {showAddStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🧒</span> Add New Student
              </h2>

              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                      placeholder="Emma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Level
                    </label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    >
                      <option value="">Select...</option>
                      <option value="K">Kindergarten</option>
                      <option value="1">1st Grade</option>
                      <option value="2">2nd Grade</option>
                      <option value="3">3rd Grade</option>
                      <option value="4">4th Grade</option>
                      <option value="5">5th Grade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reading Level
                    </label>
                    <select
                      value={readingLevel}
                      onChange={(e) => setReadingLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    >
                      <option value="">Select...</option>
                      <option value="below">Below Grade Level</option>
                      <option value="approaching">Approaching Grade Level</option>
                      <option value="at">At Grade Level</option>
                      <option value="above">Above Grade Level</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> A 6-digit login code will be automatically generated for this student.
                  </p>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddStudent(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !firstName.trim()}
                    className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Group Modal */}
        {showAddGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📁</span> Create Student Group
              </h2>

              <form onSubmit={handleAddGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="e.g., Short Vowels Group"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="Students working on short vowel sounds"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group Color
                  </label>
                  <div className="flex gap-2">
                    {['#4a90a4', '#6b8e4e', '#d4a574', '#c17e7e', '#8b7bb8', '#e8a87c'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setGroupColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${groupColor === color ? 'border-gray-800' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddGroup(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !groupName.trim()}
                    className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Group'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🧒</span> {selectedStudent.display_name}
              </h2>

              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Student Login Code</p>
                  <p className="text-3xl font-mono font-bold text-green-600 tracking-widest">
                    {selectedStudent.login_code}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Share this code with the student to log in
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">First Name:</span>
                    <p className="font-medium">{selectedStudent.first_name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Name:</span>
                    <p className="font-medium">{selectedStudent.last_name || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Grade Level:</span>
                    <p className="font-medium">{selectedStudent.grade_level || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Reading Level:</span>
                    <p className="font-medium">{selectedStudent.reading_level || '-'}</p>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-between">
                  <button
                    onClick={() => handleDeactivateStudent(selectedStudent.id)}
                    className="px-3 py-2 text-red-600 hover:text-red-800 text-sm transition-colors"
                  >
                    Deactivate Student
                  </button>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>👨‍👩‍👧‍👦</span> Your Students ({students.length})
              </h2>

              {students.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">🧒</p>
                  <p>No students yet.</p>
                  <p className="text-sm">Click &quot;Add Student&quot; to get started!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {students.map(student => (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className="flex items-center justify-between p-3 bg-forestMist/20 rounded-lg hover:bg-forestMist/40 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-oceanBlue/20 rounded-full flex items-center justify-center text-lg">
                          {student.avatar_url ? (
                            <img src={student.avatar_url} alt="" className="w-full h-full rounded-full" />
                          ) : (
                            '🧒'
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{student.display_name}</p>
                          <p className="text-xs text-gray-500">
                            {student.grade_level && `Grade ${student.grade_level}`}
                            {student.grade_level && student.reading_level && ' • '}
                            {student.reading_level && `${student.reading_level} level`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-gray-600">{student.login_code}</p>
                        <p className="text-xs text-gray-400">Login code</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Groups Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📁</span> Groups ({groups.length})
              </h2>

              {groups.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-3xl mb-2">📁</p>
                  <p className="text-sm">No groups yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {groups.map(group => (
                    <div
                      key={group.id}
                      className="p-3 rounded-lg border-l-4 hover:bg-gray-50 transition cursor-pointer"
                      style={{ borderLeftColor: group.color }}
                    >
                      <p className="font-medium">{group.name}</p>
                      {group.description && (
                        <p className="text-xs text-gray-500 mt-1">{group.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="mt-4 bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2 text-blue-800">How Student Login Works</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Each student gets a unique 6-digit code</li>
                <li>• Students enter their code on the login page</li>
                <li>• No email or password needed for students</li>
                <li>• COPPA-compliant: no personal data collected</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
