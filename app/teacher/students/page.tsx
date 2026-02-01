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
  getGroupStudents,
  addStudentToGroup,
  removeStudentFromGroup,
} from '@/lib/supabase/auth';
import type { Student, StudentGroup } from '@/lib/supabase/client';

type TabType = 'classes' | 'groups' | 'students';

export default function StudentsPage() {
  const router = useRouter();
  const { isLoading: authLoading, userRole } = useAuth();
  const { teacher, isTeacher } = useTeacher();

  const [activeTab, setActiveTab] = useState<TabType>('classes');
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<StudentGroup[]>([]);
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

  // Add class/group form state
  const [showAddClassOrGroup, setShowAddClassOrGroup] = useState<'class' | 'group' | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupColor, setGroupColor] = useState('#4a90a4');

  // Selected items for detail views
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClassOrGroup, setSelectedClassOrGroup] = useState<StudentGroup | null>(null);
  const [selectedRosterStudents, setSelectedRosterStudents] = useState<Student[]>([]);
  const [loadingRoster, setLoadingRoster] = useState(false);

  // Manage members modal
  const [showManageMembers, setShowManageMembers] = useState(false);

  const loadData = useCallback(async (teacherId: string) => {
    setLoading(true);
    setError(null);
    try {
      // Pass teacherId to skip redundant auth checks (faster loading)
      const [studentsResult, allGroupsResult] = await Promise.all([
        getMyStudents(teacherId),
        getMyGroups(undefined, teacherId) // Get all (both classes and groups)
      ]);

      if (studentsResult.error) {
        console.error('Students error:', studentsResult.error);
        setError(studentsResult.error.message);
      } else {
        setStudents(studentsResult.students);
      }

      if (allGroupsResult.error) {
        console.error('Groups error:', allGroupsResult.error);
      } else {
        // Separate classes and groups
        const allGroups = allGroupsResult.groups;
        setClasses(allGroups.filter(g => g.type === 'class'));
        setGroups(allGroups.filter(g => g.type === 'group' || !g.type)); // Default to group if no type
      }
    } catch (err) {
      console.error('Load data error:', err);
      setError('Failed to load data. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Redirect if not a teacher
    if (!isTeacher || !teacher?.id) {
      if (userRole !== 'teacher') {
        router.push('/login');
      }
      return;
    }

    // Load data once we know we're a teacher (pass teacher.id to skip auth checks)
    loadData(teacher.id);
  }, [authLoading, isTeacher, userRole, teacher?.id, router, loadData]);

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

  const handleAddClassOrGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || !showAddClassOrGroup) return;

    setIsSubmitting(true);
    setError(null);

    const { group, error } = await createGroup(
      groupName.trim(),
      groupDescription.trim() || undefined,
      groupColor,
      showAddClassOrGroup
    );

    if (error) {
      setError(error.message);
    } else if (group) {
      if (showAddClassOrGroup === 'class') {
        setClasses(prev => [...prev, group]);
      } else {
        setGroups(prev => [...prev, group]);
      }
      // Reset form
      setGroupName('');
      setGroupDescription('');
      setGroupColor('#4a90a4');
      setShowAddClassOrGroup(null);
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

  const handleViewRoster = async (classOrGroup: StudentGroup) => {
    setSelectedClassOrGroup(classOrGroup);
    setLoadingRoster(true);

    const { students: rosterStudents, error } = await getGroupStudents(classOrGroup.id);

    if (error) {
      setError(error.message);
    } else {
      setSelectedRosterStudents(rosterStudents);
    }

    setLoadingRoster(false);
  };

  const handleAddToClassOrGroup = async (studentId: string) => {
    if (!selectedClassOrGroup) return;

    setIsSubmitting(true);
    const { error } = await addStudentToGroup(selectedClassOrGroup.id, studentId);

    if (error) {
      setError(error.message);
    } else {
      // Refresh the roster
      const { students: rosterStudents } = await getGroupStudents(selectedClassOrGroup.id);
      setSelectedRosterStudents(rosterStudents);
    }
    setIsSubmitting(false);
  };

  const handleRemoveFromClassOrGroup = async (studentId: string) => {
    if (!selectedClassOrGroup) return;

    setIsSubmitting(true);
    const { error } = await removeStudentFromGroup(selectedClassOrGroup.id, studentId);

    if (error) {
      setError(error.message);
    } else {
      // Refresh the roster
      const { students: rosterStudents } = await getGroupStudents(selectedClassOrGroup.id);
      setSelectedRosterStudents(rosterStudents);
    }
    setIsSubmitting(false);
  };

  const formatReadingLevel = (level: string | undefined) => {
    if (!level) return '-';
    const levels: Record<string, string> = {
      below: 'Below Grade',
      approaching: 'Approaching',
      at: 'At Grade',
      above: 'Above Grade',
    };
    return levels[level] || level;
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
                {teacher?.display_name ? `Welcome, ${teacher.display_name}` : 'Manage your classes, groups, and students'}
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

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('classes')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'classes'
                ? 'bg-oceanBlue text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🏫 My Classes ({classes.length})
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'groups'
                ? 'bg-oceanBlue text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📁 Skill Groups ({groups.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'students'
                ? 'bg-oceanBlue text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            👨‍👩‍👧‍👦 All Students ({students.length})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          {activeTab === 'classes' && (
            <button
              onClick={() => setShowAddClassOrGroup('class')}
              className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors flex items-center gap-2"
            >
              <span>➕</span> Create Class
            </button>
          )}
          {activeTab === 'groups' && (
            <button
              onClick={() => setShowAddClassOrGroup('group')}
              className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors flex items-center gap-2"
            >
              <span>➕</span> Create Skill Group
            </button>
          )}
          {activeTab === 'students' && (
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors flex items-center gap-2"
            >
              <span>➕</span> Add Student
            </button>
          )}
        </div>

        {/* Classes Tab Content */}
        {activeTab === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl">
                <p className="text-5xl mb-3">🏫</p>
                <p className="text-lg font-medium">No classes yet</p>
                <p className="text-sm">Create a class to organize your students into homeroom rosters.</p>
              </div>
            ) : (
              classes.map(cls => (
                <div
                  key={cls.id}
                  onClick={() => handleViewRoster(cls)}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4"
                  style={{ borderLeftColor: cls.color }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: cls.color }}
                    >
                      🏫
                    </div>
                    <div>
                      <h3 className="font-semibold">{cls.name}</h3>
                      {cls.description && (
                        <p className="text-xs text-gray-500">{cls.description}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Click to view roster →</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Groups Tab Content */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl">
                <p className="text-5xl mb-3">📁</p>
                <p className="text-lg font-medium">No skill groups yet</p>
                <p className="text-sm">Create skill groups for targeted intervention and practice.</p>
              </div>
            ) : (
              groups.map(group => (
                <div
                  key={group.id}
                  onClick={() => handleViewRoster(group)}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4"
                  style={{ borderLeftColor: group.color }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: group.color }}
                    >
                      📁
                    </div>
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      {group.description && (
                        <p className="text-xs text-gray-500">{group.description}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Click to view members →</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Students Tab Content */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {students.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-5xl mb-3">🧒</p>
                <p className="text-lg font-medium">No students yet</p>
                <p className="text-sm">Add students to get started.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reading Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Login Code</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-oceanBlue/20 rounded-full flex items-center justify-center text-sm">
                            🧒
                          </div>
                          <div>
                            <p className="font-medium">{student.display_name}</p>
                            <p className="text-xs text-gray-500">{student.first_name} {student.last_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {student.grade_level ? `Grade ${student.grade_level}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          student.reading_level === 'above' ? 'bg-green-100 text-green-700' :
                          student.reading_level === 'at' ? 'bg-blue-100 text-blue-700' :
                          student.reading_level === 'approaching' ? 'bg-yellow-100 text-yellow-700' :
                          student.reading_level === 'below' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {formatReadingLevel(student.reading_level)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {student.login_code}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-oceanBlue hover:text-darkOcean text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

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

        {/* Add Class/Group Modal */}
        {showAddClassOrGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>{showAddClassOrGroup === 'class' ? '🏫' : '📁'}</span>
                Create {showAddClassOrGroup === 'class' ? 'Class' : 'Skill Group'}
              </h2>

              <form onSubmit={handleAddClassOrGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {showAddClassOrGroup === 'class' ? 'Class' : 'Group'} Name *
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder={showAddClassOrGroup === 'class' ? "e.g., Mrs. Smith's 2nd Grade" : "e.g., Short Vowel Practice"}
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
                    placeholder={showAddClassOrGroup === 'class' ? "Room 204, Morning class" : "Students working on short vowel sounds"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
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
                    onClick={() => setShowAddClassOrGroup(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !groupName.trim()}
                    className="px-4 py-2 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : `Create ${showAddClassOrGroup === 'class' ? 'Class' : 'Group'}`}
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
                    <p className="font-medium">{selectedStudent.grade_level ? `Grade ${selectedStudent.grade_level}` : '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Reading Level:</span>
                    <p className="font-medium">{formatReadingLevel(selectedStudent.reading_level)}</p>
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

        {/* Class/Group Roster Modal */}
        {selectedClassOrGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: selectedClassOrGroup.color }}
                  >
                    {selectedClassOrGroup.type === 'class' ? '🏫' : '📁'}
                  </span>
                  {selectedClassOrGroup.name}
                </h2>
                <button
                  onClick={() => {
                    setSelectedClassOrGroup(null);
                    setSelectedRosterStudents([]);
                    setShowManageMembers(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedClassOrGroup.description && (
                <p className="text-gray-600 text-sm mb-4">{selectedClassOrGroup.description}</p>
              )}

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setShowManageMembers(!showManageMembers)}
                  className="px-3 py-1.5 bg-oceanBlue text-white text-sm rounded-lg hover:bg-darkOcean transition-colors"
                >
                  {showManageMembers ? '← Back to Roster' : '➕ Manage Members'}
                </button>
              </div>

              {loadingRoster ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oceanBlue mx-auto"></div>
                </div>
              ) : showManageMembers ? (
                /* Manage Members View */
                <div>
                  <h3 className="font-semibold mb-3">Add or Remove Students</h3>
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {students.map(student => {
                      const isInGroup = selectedRosterStudents.some(s => s.id === student.id);
                      return (
                        <div
                          key={student.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isInGroup ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-oceanBlue/20 rounded-full flex items-center justify-center text-sm">
                              🧒
                            </div>
                            <div>
                              <p className="font-medium">{student.display_name}</p>
                              <p className="text-xs text-gray-500">
                                {student.grade_level && `Grade ${student.grade_level}`}
                                {student.grade_level && student.reading_level && ' • '}
                                {formatReadingLevel(student.reading_level)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => isInGroup
                              ? handleRemoveFromClassOrGroup(student.id)
                              : handleAddToClassOrGroup(student.id)
                            }
                            disabled={isSubmitting}
                            className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                              isInGroup
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            } disabled:opacity-50`}
                          >
                            {isInGroup ? 'Remove' : 'Add'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Roster View */
                <div>
                  <h3 className="font-semibold mb-3">
                    {selectedClassOrGroup.type === 'class' ? 'Class' : 'Group'} Roster ({selectedRosterStudents.length} students)
                  </h3>
                  {selectedRosterStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-3xl mb-2">👥</p>
                      <p>No students in this {selectedClassOrGroup.type === 'class' ? 'class' : 'group'} yet.</p>
                      <p className="text-sm">Click &quot;Manage Members&quot; to add students.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Grade</th>
                          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Reading</th>
                          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">Code</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedRosterStudents.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2">
                                <span>🧒</span>
                                <span className="font-medium">{student.display_name}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm">
                              {student.grade_level ? `${student.grade_level}` : '-'}
                            </td>
                            <td className="px-3 py-2 text-sm">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                student.reading_level === 'above' ? 'bg-green-100 text-green-700' :
                                student.reading_level === 'at' ? 'bg-blue-100 text-blue-700' :
                                student.reading_level === 'approaching' ? 'bg-yellow-100 text-yellow-700' :
                                student.reading_level === 'below' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {formatReadingLevel(student.reading_level)}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <code className="text-sm font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                                {student.login_code}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Info */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-2 text-blue-800">Quick Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-blue-700">
            <div>
              <p className="font-medium">🏫 Classes</p>
              <p>Homeroom rosters for your students. Assign activities to entire classes at once.</p>
            </div>
            <div>
              <p className="font-medium">📁 Skill Groups</p>
              <p>Targeted intervention groups. Students can be in multiple skill groups.</p>
            </div>
            <div>
              <p className="font-medium">👨‍👩‍👧‍👦 Students</p>
              <p>Individual student profiles with 6-digit login codes. COPPA compliant.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
