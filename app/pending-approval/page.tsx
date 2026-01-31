'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { teacher, userRole, isLoading, signOut } = useAuth();

  useEffect(() => {
    // If not logged in as teacher, redirect to login
    if (!isLoading && userRole !== 'teacher') {
      router.push('/login');
      return;
    }

    // If approved, redirect to teacher portal
    if (!isLoading && teacher?.is_approved) {
      router.push('/teacher');
    }
  }, [isLoading, userRole, teacher, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Account Pending Approval
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for signing up, <strong>{teacher?.display_name}</strong>!
          </p>
          <p className="text-gray-600 mb-6">
            Your account is currently pending administrator approval.
            You&apos;ll be able to access the Teacher Portal once your account is approved.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Email:</strong> {teacher?.email}
            </p>
            {teacher?.school_name && (
              <p className="text-sm text-blue-800 mt-1">
                <strong>School:</strong> {teacher?.school_name}
              </p>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Questions? Contact the site administrator.
        </p>
      </div>
    </div>
  );
}
