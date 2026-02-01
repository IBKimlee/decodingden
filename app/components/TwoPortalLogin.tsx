'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

type ActivePortal = null | 'teacher' | 'student' | 'teacher-signup';

export default function TwoPortalLogin() {
  const router = useRouter();
  const { signInAsTeacher, signUpAsTeacher, signInAsStudent } = useAuth();

  const [activePortal, setActivePortal] = useState<ActivePortal>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Teacher form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [schoolName, setSchoolName] = useState('');

  // Student form state
  const [loginCode, setLoginCode] = useState('');

  const resetForms = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setSchoolName('');
    setLoginCode('');
    setError(null);
  };

  const handleTeacherSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signInAsTeacher(email, password);
      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        router.push('/teacher');
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed.');
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
      setIsLoading(false);
      setError(null);
      setActivePortal('teacher');
      alert('Account created! Please sign in. Your account will be pending admin approval.');
    }
  };

  const handleStudentSignIn = async () => {
    if (loginCode.length !== 6) return;

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
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">

      {/* Teacher Portal - Single unified card */}
      <div className="flex-1 bg-gradient-to-br from-emerald-600/80 via-teal-600/80 to-cyan-700/80 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 px-4 py-12 flex flex-col items-center group border-2 border-amber-400/50 min-w-[320px] min-h-[420px]">
        {/* Icon */}
        <div className="relative w-20 h-24 mb-4 mt-6 overflow-hidden">
          {/* Tree trunk */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-700/60 to-amber-800/60 rounded-t-lg rounded-b-sm overflow-hidden">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
            <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-amber-900/30"></div>
          </div>
          {/* Tree hollow */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 rounded-full shadow-inner"></div>
          {/* Owl peeking out */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl group-hover:top-2 transition-all duration-300">
            🦉
          </div>
        </div>

        {/* Title */}
        <span className="drop-shadow-2xl text-2xl sm:text-3xl tracking-wide font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Teacher Den</span>

        {/* Content area - fixed height to prevent layout shift */}
        <div className="h-[160px] flex items-start justify-center w-full">
          {activePortal !== 'teacher' && activePortal !== 'teacher-signup' ? (
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setActivePortal('teacher'); resetForms(); }}
                className="px-6 py-3 text-base bg-white/90 text-emerald-700 rounded-lg font-medium hover:bg-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => { setActivePortal('teacher-signup'); resetForms(); }}
                className="px-6 py-3 text-base bg-transparent text-white rounded-lg font-medium border border-white/70 hover:bg-white/20 transition-colors"
              >
                Request Access
              </button>
            </div>
          ) : activePortal === 'teacher' ? (
            <div className="w-full">
              <button
                onClick={() => { setActivePortal(null); resetForms(); }}
                className="text-[10px] text-white/70 hover:text-white mb-1"
              >
                ← Back
              </button>

              {error && (
                <div className="text-xs text-red-200 mb-1">{error}</div>
              )}

              <form onSubmit={handleTeacherSignIn} className="space-y-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-2 py-1.5 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-2 py-1.5 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-1.5 bg-white/90 text-emerald-700 rounded-lg font-medium text-sm hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full">
              <button
                onClick={() => { setActivePortal(null); resetForms(); }}
                className="text-[10px] text-white/70 hover:text-white mb-1"
              >
                ← Back
              </button>

              {error && (
                <div className="text-xs text-red-200 mb-1">{error}</div>
              )}

              <form onSubmit={handleTeacherSignUp} className="space-y-1">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-2 py-1 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-2 py-1 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-2 py-1 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="Password (6+ chars)"
                />
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-2 py-1 text-sm border-0 rounded-lg focus:ring-2 focus:ring-white bg-white/90"
                  placeholder="School (optional)"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-1 bg-white/90 text-emerald-700 rounded-lg font-medium text-sm hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Request Access'}
                </button>
              </form>
              <p className="text-[10px] text-white/60 mt-1 text-center">
                Requires admin approval
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Student Portal - Single unified card */}
      <div className="flex-1 bg-gradient-to-br from-slate-500/80 via-slate-600/80 to-yellow-600/70 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 px-4 py-12 flex flex-col items-center group border-2 border-amber-400/50 min-w-[320px] min-h-[420px]">
        {/* Icon */}
        <div className="relative w-24 h-24 mb-4 mt-7">
          {/* Pot body */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-amber-200/70 to-amber-300/70 rounded-lg shadow-sm">
            {/* HONEY label */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-50/80 rounded border border-amber-200/60">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-amber-600/70">
                HONEY
              </div>
            </div>
          </div>

          {/* Pot rim */}
          <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[84px] h-3.5 bg-gradient-to-b from-amber-500/70 to-amber-600/70 rounded-full shadow-sm z-10"></div>

          {/* Bear - starts hidden inside pot, pops up on hover */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-4xl transition-all duration-300 ease-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-translate-y-2">
            🐻
          </div>

          {/* Lid - closed by default, lifts and tilts on hover */}
          <div className="absolute bottom-[63px] left-1/2 -translate-x-1/2 transition-all duration-300 ease-out group-hover:-translate-y-6 group-hover:translate-x-4 group-hover:rotate-[30deg] origin-left z-20">
            <div className="w-[88px] h-3.5 bg-gradient-to-b from-amber-400/80 to-amber-500/80 rounded-full shadow-md"></div>
            {/* Lid handle */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-3 bg-gradient-to-b from-amber-400/80 to-amber-500/80 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <span className="drop-shadow-2xl text-2xl sm:text-3xl tracking-wide font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Student Den</span>

        {/* Content area - fixed height to prevent layout shift */}
        <div className="h-[160px] flex items-start justify-center">
          {activePortal !== 'student' ? (
            <button
              onClick={() => { setActivePortal('student'); resetForms(); }}
              className="px-8 py-3 text-base bg-white/90 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors"
            >
              Enter Code
            </button>
          ) : (
            <div className="flex flex-col items-center">
              {/* Back button */}
              <button
                onClick={() => { setActivePortal(null); resetForms(); }}
                className="text-[10px] text-white/70 hover:text-white mb-1 self-start"
              >
                ← Back
              </button>

              {error && (
                <div className="text-xs text-red-200 mb-1">{error}</div>
              )}

              {/* Code Display - above keypad */}
              <div className="flex gap-1 mb-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-9 rounded border-2 flex items-center justify-center text-base font-bold ${
                      loginCode[i]
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-white/90 border-white/50 text-gray-400'
                    }`}
                  >
                    {loginCode[i] || '•'}
                  </div>
                ))}
              </div>

              {/* Number Pad - compact grid */}
              <div className="grid grid-cols-6 gap-1 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => loginCode.length < 6 && setLoginCode(loginCode + num)}
                    className="w-8 h-8 text-sm font-bold bg-white/90 text-slate-700 rounded-lg hover:bg-white transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setLoginCode(loginCode.slice(0, -1))}
                  className="w-8 h-8 text-xs font-bold bg-red-400 text-white rounded-lg transition-all"
                >
                  ⌫
                </button>
                <button
                  type="button"
                  onClick={() => setLoginCode('')}
                  className="w-8 h-8 text-[10px] font-bold bg-gray-400 text-white rounded-lg transition-all"
                >
                  C
                </button>
              </div>

              {/* Go Button */}
              <button
                onClick={handleStudentSignIn}
                disabled={isLoading || loginCode.length !== 6}
                className={`px-6 py-1 rounded-lg font-bold text-xs transition-all ${
                  loginCode.length === 6
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                }`}
              >
                {isLoading ? '...' : "Let's Go!"}
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
