'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Teacher } from '@/lib/supabase';

export default function AdminPage() {
  const router = useRouter();
  const { teacher, userRole, isLoading: authLoading } = useAuth();
  const [pendingTeachers, setPendingTeachers] = useState<Teacher[]>([]);
  const [approvedTeachers, setApprovedTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Check if current user is admin
  const isAdmin = teacher?.is_admin === true;

  const loadTeachers = useCallback(async () => {
    setLoading(true);
    try {
      // Get pending teachers
      const { data: pending, error: pendingError } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;
      setPendingTeachers(pending || []);

      // Get approved teachers
      const { data: approved, error: approvedError } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_approved', true)
        .order('display_name');

      if (approvedError) throw approvedError;
      setApprovedTeachers(approved || []);
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (userRole !== 'teacher') {
        router.push('/login');
        return;
      }
      if (!isAdmin) {
        router.push('/teacher');
        return;
      }
      loadTeachers();
    }
  }, [authLoading, userRole, isAdmin, router, loadTeachers]);

  const approveTeacher = async (teacherId: string) => {
    setActionLoading(teacherId);
    try {
      const { error } = await supabase
        .from('teachers')
        .update({ is_approved: true })
        .eq('id', teacherId);

      if (error) throw error;
      await loadTeachers();
    } catch (error) {
      console.error('Error approving teacher:', error);
      alert('Failed to approve teacher');
    } finally {
      setActionLoading(null);
    }
  };

  const denyTeacher = async (teacherId: string) => {
    if (!confirm('Are you sure you want to deny and remove this teacher request?')) {
      return;
    }

    setActionLoading(teacherId);
    try {
      // Delete from teachers table
      const { error: teacherError } = await supabase
        .from('teachers')
        .delete()
        .eq('id', teacherId);

      if (teacherError) throw teacherError;

      // Note: We can't delete from auth.users from client side
      // The auth user will remain but won't be able to do anything

      await loadTeachers();
    } catch (error) {
      console.error('Error denying teacher:', error);
      alert('Failed to deny teacher');
    } finally {
      setActionLoading(null);
    }
  };

  const revokeAccess = async (teacherId: string) => {
    if (!confirm('Are you sure you want to revoke this teacher\'s access?')) {
      return;
    }

    setActionLoading(teacherId);
    try {
      const { error } = await supabase
        .from('teachers')
        .update({ is_approved: false })
        .eq('id', teacherId);

      if (error) throw error;
      await loadTeachers();
    } catch (error) {
      console.error('Error revoking access:', error);
      alert('Failed to revoke access');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleAdmin = async (teacherId: string, currentIsAdmin: boolean) => {
    const action = currentIsAdmin ? 'remove admin rights from' : 'make admin';
    if (!confirm(`Are you sure you want to ${action} this teacher?`)) {
      return;
    }

    setActionLoading(teacherId);
    try {
      const { error } = await supabase
        .from('teachers')
        .update({ is_admin: !currentIsAdmin })
        .eq('id', teacherId);

      if (error) throw error;
      await loadTeachers();
    } catch (error) {
      console.error('Error toggling admin:', error);
      alert('Failed to update admin status');
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softSand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-softSand">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-red-100 text-sm">Manage teacher approvals</p>
          </div>
          <Link
            href="/teacher"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            ← Teacher Portal
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Pending Approvals */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⏳</span>
            Pending Approvals
            {pendingTeachers.length > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {pendingTeachers.length}
              </span>
            )}
          </h2>

          {pendingTeachers.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No pending teacher requests
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingTeachers.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{t.display_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.school_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                        {new Date(t.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => approveTeacher(t.id)}
                          disabled={actionLoading === t.id}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                          {actionLoading === t.id ? '...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => denyTeacher(t.id)}
                          disabled={actionLoading === t.id}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                          {actionLoading === t.id ? '...' : 'Deny'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Approved Teachers */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            Approved Teachers
            <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
              {approvedTeachers.length}
            </span>
          </h2>

          {approvedTeachers.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No approved teachers yet
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedTeachers.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {t.display_name}
                        {t.id === teacher?.id && (
                          <span className="ml-2 text-xs text-gray-400">(you)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.school_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {t.is_admin ? (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Admin</span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Teacher</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        {t.id !== teacher?.id && (
                          <>
                            <button
                              onClick={() => toggleAdmin(t.id, t.is_admin)}
                              disabled={actionLoading === t.id}
                              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium disabled:opacity-50"
                            >
                              {actionLoading === t.id ? '...' : (t.is_admin ? 'Remove Admin' : 'Make Admin')}
                            </button>
                            <button
                              onClick={() => revokeAccess(t.id)}
                              disabled={actionLoading === t.id}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs font-medium disabled:opacity-50"
                            >
                              {actionLoading === t.id ? '...' : 'Revoke'}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
