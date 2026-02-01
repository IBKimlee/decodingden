'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useTeacher } from '@/app/contexts/AuthContext';
import { getMyStudents, getMyGroups, getTeacherProgressSummary } from '@/lib/supabase/auth';
import type { Student, StudentGroup } from '@/lib/supabase/client';

interface ProgressData {
  student: Student;
  assigned_count: number;
  completed_count: number;
  avg_score: number | null;
  total_time_seconds: number;
  last_activity: string | null;
}

export default function ProgressDashboardPage() {
  const router = useRouter();
  const { isLoading: authLoading, userRole } = useAuth();
  const { teacher, isTeacher } = useTeacher();

  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [classes, setClasses] = useState<StudentGroup[]>([]);
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filterType, setFilterType] = useState<'all' | 'class' | 'group'>('all');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const loadData = useCallback(async (teacherId: string) => {
    setLoading(true);
    try {
      const [progressResult, allGroupsResult] = await Promise.all([
        getTeacherProgressSummary(),
        getMyGroups(undefined, teacherId)
      ]);

      if (progressResult.error) {
        setError(progressResult.error.message);
      } else {
        setProgress(progressResult.progress);
      }

      if (allGroupsResult.error) {
        console.error('Error loading groups:', allGroupsResult.error);
      } else {
        const allGroups = allGroupsResult.groups;
        setClasses(allGroups.filter(g => g.type === 'class'));
        setGroups(allGroups.filter(g => g.type === 'group' || !g.type));
      }
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isTeacher && userRole !== 'teacher') {
      router.push('/');
      return;
    }

    if (isTeacher && teacher?.id) {
      loadData(teacher.id);
    }
  }, [authLoading, isTeacher, userRole, teacher?.id, router, loadData]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Calculate totals
  const totalAssigned = progress.reduce((sum, p) => sum + p.assigned_count, 0);
  const totalCompleted = progress.reduce((sum, p) => sum + p.completed_count, 0);
  const avgCompletion = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-softSand flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-mossGray">Loading progress data...</p>
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
              <h1 className="text-lg sm:text-xl font-bold text-pineShadow">Student Progress</h1>
              <p className="text-xs text-mossGray">
                {teacher?.display_name ? `${teacher.display_name}'s classroom` : 'Track student activity completion'}
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                👨‍👩‍👧‍👦
              </div>
              <div>
                <p className="text-2xl font-bold text-oceanBlue">{progress.length}</p>
                <p className="text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                📋
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{totalAssigned}</p>
                <p className="text-sm text-gray-500">Assigned</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                ✅
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalCompleted}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{avgCompletion}%</p>
                <p className="text-sm text-gray-500">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <button
              onClick={() => { setFilterType('all'); setSelectedFilter(''); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-oceanBlue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Students
            </button>

            {classes.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-500">Class:</span>
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => { setFilterType('class'); setSelectedFilter(cls.id); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterType === 'class' && selectedFilter === cls.id
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={filterType === 'class' && selectedFilter === cls.id ? { backgroundColor: cls.color } : {}}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            )}

            {groups.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-500">Group:</span>
                {groups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => { setFilterType('group'); setSelectedFilter(group.id); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterType === 'group' && selectedFilter === group.id
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={filterType === 'group' && selectedFilter === group.id ? { backgroundColor: group.color } : {}}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => teacher?.id && loadData(teacher.id)}
              className="ml-auto px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Progress Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {progress.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-5xl mb-3">📊</p>
              <p className="text-lg font-medium">No progress data yet</p>
              <p className="text-sm">Assign activities to students and track their completion here.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Assigned</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Completed</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Progress</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Avg Score</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Time Spent</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {progress.map(p => {
                  const completionRate = p.assigned_count > 0
                    ? Math.round((p.completed_count / p.assigned_count) * 100)
                    : 0;

                  return (
                    <tr key={p.student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-oceanBlue/20 rounded-full flex items-center justify-center text-sm">
                            🧒
                          </div>
                          <div>
                            <p className="font-medium">{p.student.display_name}</p>
                            <p className="text-xs text-gray-500">
                              {p.student.grade_level && `Grade ${p.student.grade_level}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-gray-700">{p.assigned_count}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-green-600">{p.completed_count}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                completionRate >= 80 ? 'bg-green-500' :
                                completionRate >= 50 ? 'bg-yellow-500' :
                                'bg-red-400'
                              }`}
                              style={{ width: `${completionRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 w-10 text-right">
                            {completionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.avg_score !== null ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.avg_score >= 80 ? 'bg-green-100 text-green-700' :
                            p.avg_score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {p.avg_score}%
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm text-gray-600">
                          {formatTime(p.total_time_seconds)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm text-gray-500">
                          {formatDate(p.last_activity)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-2 text-blue-800">How Progress Tracking Works</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Assign activities using &quot;Push Activities&quot; from the Teacher Portal</li>
            <li>• Students see a &quot;Mark Complete&quot; button when they have assigned work</li>
            <li>• Time spent and completion data are tracked automatically</li>
            <li>• Use filters to view progress by class or skill group</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
