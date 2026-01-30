'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

type LoginMode = 'select' | 'teacher' | 'student' | 'teacher-signup';

export default function LoginPage() {
  const router = useRouter();
  const { signInAsTeacher, signUpAsTeacher, signInAsStudent, login } = useAuth();

  const [mode, setMode] = useState<LoginMode>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Teacher form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [schoolName, setSchoolName] = useState('');

  // Student form state
  const [loginCode, setLoginCode] = useState('');

  // Legacy password state
  const [legacyPassword, setLegacyPassword] = useState('');

  const handleTeacherSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signInAsTeacher(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/teacher');
    }
  };

  const handleTeacherSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!displayName.trim()) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    const { error } = await signUpAsTeacher(email, password, displayName, schoolName);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/teacher');
    }
  };

  const handleStudentSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signInAsStudent(loginCode);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/student');
    }
  };

  const handleLegacyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(legacyPassword)) {
      router.push('/');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-oceanBlue mb-2">Decoding Den</h1>
          <p className="text-gray-600">Welcome to your phonics learning adventure!</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Mode Selection */}
          {mode === 'select' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Who are you?
              </h2>

              <button
                onClick={() => setMode('teacher')}
                className="w-full p-6 rounded-xl border-2 border-oceanBlue bg-blue-50 hover:bg-blue-100 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">👩‍🏫</span>
                  <div>
                    <h3 className="text-xl font-bold text-oceanBlue group-hover:text-darkOcean">
                      I&apos;m a Teacher
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Access your dashboard, manage students, and assign activities
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode('student')}
                className="w-full p-6 rounded-xl border-2 border-green-500 bg-green-50 hover:bg-green-100 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🧒</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-600 group-hover:text-green-700">
                      I&apos;m a Student
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enter your login code to see your activities
                    </p>
                  </div>
                </div>
              </button>

              {/* Legacy Access (temporary) */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="text-sm text-gray-500 text-center mb-3">
                  Or use site password (legacy access)
                </p>
                <form onSubmit={handleLegacyLogin} className="flex gap-2">
                  <input
                    type="password"
                    value={legacyPassword}
                    onChange={(e) => setLegacyPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Teacher Sign In */}
          {mode === 'teacher' && (
            <div>
              <button
                onClick={() => setMode('select')}
                className="mb-4 text-oceanBlue hover:text-darkOcean flex items-center gap-1"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>👩‍🏫</span> Teacher Sign In
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleTeacherSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="teacher@school.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('teacher-signup');
                      setError(null);
                    }}
                    className="text-oceanBlue hover:text-darkOcean font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Teacher Sign Up */}
          {mode === 'teacher-signup' && (
            <div>
              <button
                onClick={() => setMode('teacher')}
                className="mb-4 text-oceanBlue hover:text-darkOcean flex items-center gap-1"
              >
                ← Back to Sign In
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>👩‍🏫</span> Create Teacher Account
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleTeacherSignUp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="Ms. Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="teacher@school.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name (optional)
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
                    placeholder="Oak Elementary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            </div>
          )}

          {/* Student Sign In */}
          {mode === 'student' && (
            <div>
              <button
                onClick={() => setMode('select')}
                className="mb-4 text-oceanBlue hover:text-darkOcean flex items-center gap-1"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>🧒</span> Student Login
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleStudentSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter your login code
                  </label>
                  <input
                    type="text"
                    value={loginCode}
                    onChange={(e) => setLoginCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="w-full px-4 py-4 text-center text-3xl tracking-widest font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="000000"
                  />
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Ask your teacher for your 6-digit code
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || loginCode.length !== 6}
                  className="w-full py-4 bg-green-500 text-white rounded-lg font-semibold text-xl hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Let\'s Go! 🚀'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Decoding Den - Science of Reading Based Phonics
        </p>
      </div>
    </div>
  );
}
