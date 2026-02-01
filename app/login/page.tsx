'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

type LoginMode = 'select' | 'teacher' | 'student' | 'teacher-signup' | 'signup-success';

export default function LoginPage() {
  const router = useRouter();
  const { signInAsTeacher, signUpAsTeacher, signInAsStudent } = useAuth();

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

  const handleTeacherSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[LoginPage] handleTeacherSignIn called', Date.now());
    setIsLoading(true);
    setError(null);

    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<{ error: Error }>((_, reject) =>
        setTimeout(() => {
          console.log('[LoginPage] TIMEOUT triggered!', Date.now());
          reject(new Error('Sign in timed out. Please try again.'));
        }, 10000)
      );

      console.log('[LoginPage] Starting sign-in race...', Date.now());
      const signInPromise = signInAsTeacher(email, password);
      const { error } = await Promise.race([signInPromise, timeoutPromise]);
      console.log('[LoginPage] Race complete', Date.now(), { hasError: !!error });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        // The teacher page will handle redirecting to pending-approval if not approved
        console.log('[LoginPage] Success! Navigating to /teacher');
        router.push('/teacher');
      }
    } catch (err: any) {
      console.log('[LoginPage] Caught error:', err.message);
      setError(err.message || 'Sign in failed. Please try again.');
      setIsLoading(false);
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
      // Show success message - user needs to confirm email then wait for approval
      setIsLoading(false);
      setMode('signup-success');
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
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Who are you?
              </h2>

              {/* Student Button - Big and Kid Friendly */}
              <button
                onClick={() => setMode('student')}
                className="w-full p-8 rounded-2xl border-4 border-green-500 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all text-center group hover:scale-105 shadow-lg"
              >
                <div className="text-7xl mb-2">🎒</div>
                <h3 className="text-3xl font-bold text-white drop-shadow-md">
                  I&apos;m a Student!
                </h3>
                <p className="text-green-100 text-lg mt-1">
                  Tap here to enter your code
                </p>
              </button>

              {/* Teacher Button - Smaller, Professional */}
              <button
                onClick={() => setMode('teacher')}
                className="w-full p-4 rounded-xl border-2 border-oceanBlue bg-blue-50 hover:bg-blue-100 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">👩‍🏫</span>
                  <div>
                    <h3 className="text-lg font-bold text-oceanBlue group-hover:text-darkOcean">
                      I&apos;m a Teacher
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Access your dashboard
                    </p>
                  </div>
                </div>
              </button>
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

          {/* Signup Success */}
          {mode === 'signup-success' && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Account Created!
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-blue-800 mb-3">
                  <strong>Next steps:</strong>
                </p>
                <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
                  <li>Sign in with your email and password</li>
                  <li>Your account will be pending admin approval</li>
                  <li>You&apos;ll get access once an administrator approves you</li>
                </ol>
              </div>
              <button
                onClick={() => {
                  setMode('teacher');
                  setError(null);
                }}
                className="w-full py-3 bg-oceanBlue text-white rounded-lg font-semibold hover:bg-darkOcean transition-colors"
              >
                Go to Sign In
              </button>
            </div>
          )}

          {/* Student Sign In - Kid Friendly PIN Pad */}
          {mode === 'student' && (
            <div className="text-center">
              <button
                onClick={() => setMode('select')}
                className="mb-4 text-oceanBlue hover:text-darkOcean flex items-center gap-1 text-lg"
              >
                ← Back
              </button>

              <div className="text-6xl mb-2">🎒</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Hi there!
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Type your secret code!
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl text-lg">
                  {error}
                </div>
              )}

              {/* Code Display */}
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-14 rounded-xl border-4 flex items-center justify-center text-3xl font-bold transition-all ${
                      loginCode[i]
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {loginCode[i] || '•'}
                  </div>
                ))}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      if (loginCode.length < 6) {
                        setLoginCode(loginCode + num);
                      }
                    }}
                    className="w-full aspect-square text-4xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:from-blue-500 hover:to-blue-700 active:scale-95 transition-all border-4 border-blue-700"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setLoginCode(loginCode.slice(0, -1))}
                  className="w-full aspect-square text-3xl font-bold bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all border-4 border-orange-600"
                >
                  ⌫
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (loginCode.length < 6) {
                      setLoginCode(loginCode + '0');
                    }
                  }}
                  className="w-full aspect-square text-4xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:from-blue-500 hover:to-blue-700 active:scale-95 transition-all border-4 border-blue-700"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => setLoginCode('')}
                  className="w-full aspect-square text-2xl font-bold bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all border-4 border-gray-600"
                >
                  Clear
                </button>
              </div>

              {/* Go Button */}
              <button
                onClick={handleStudentSignIn}
                disabled={isLoading || loginCode.length !== 6}
                className={`w-full max-w-xs mx-auto py-5 rounded-2xl font-bold text-2xl shadow-lg transition-all border-4 ${
                  loginCode.length === 6
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border-green-700 hover:scale-105 animate-pulse'
                    : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Opening...' : "Let's Go! 🚀"}
              </button>

              <p className="mt-4 text-gray-500">
                Ask your teacher for your code!
              </p>
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
