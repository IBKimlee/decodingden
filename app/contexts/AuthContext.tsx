'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, Teacher, Student, UserRole } from '@/lib/supabase';
import { getCurrentTeacher, signInTeacher, signUpTeacher, signOut as authSignOut } from '@/lib/supabase/auth';
import type { User } from '@supabase/supabase-js';

// ============================================================================
// TYPES
// ============================================================================

interface AuthContextType {
  // Auth state
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole;

  // User data
  user: User | null;           // Supabase auth user (teachers only)
  teacher: Teacher | null;     // Teacher profile
  student: Student | null;     // Student profile (code-based login)

  // Teacher auth methods
  signUpAsTeacher: (email: string, password: string, displayName: string, schoolName?: string) => Promise<{ error: Error | null }>;
  signInAsTeacher: (email: string, password: string) => Promise<{ error: Error | null }>;

  // Student auth methods
  signInAsStudent: (loginCode: string) => Promise<{ error: Error | null }>;

  // Sign out
  signOut: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STUDENT_STORAGE_KEY = 'decodingden_student';

// ============================================================================
// PROVIDER
// ============================================================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth timeout')), 5000)
        );

        // Check for Supabase session (teachers)
        const sessionPromise = supabase.auth.getSession();
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as { data: { session: any } };

        if (session?.user) {
          setUser(session.user);
          // Fetch teacher profile (pass user.id to skip redundant auth check)
          const { teacher: teacherData } = await getCurrentTeacher(session.user.id);
          if (teacherData) {
            setTeacher(teacherData);
            setUserRole('teacher');
          }
        } else {
          // Check for student session in localStorage
          const storedStudent = localStorage.getItem(STUDENT_STORAGE_KEY);
          if (storedStudent) {
            try {
              const studentData = JSON.parse(storedStudent) as Student;
              setStudent(studentData);
              setUserRole('student');
            } catch {
              localStorage.removeItem(STUDENT_STORAGE_KEY);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // On timeout or error, just finish loading - user will be redirected to login
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes (teachers only)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        const { teacher: teacherData } = await getCurrentTeacher(session.user.id);
        if (teacherData) {
          setTeacher(teacherData);
          setUserRole('teacher');
        }
        // Clear any student session
        setStudent(null);
        localStorage.removeItem(STUDENT_STORAGE_KEY);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setTeacher(null);
        if (!student) {
          setUserRole(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ============================================================================
  // TEACHER AUTH METHODS
  // ============================================================================

  const signUpAsTeacher = useCallback(async (
    email: string,
    password: string,
    displayName: string,
    schoolName?: string
  ): Promise<{ error: Error | null }> => {
    setIsLoading(true);
    try {
      const { user: newUser, error } = await signUpTeacher(email, password, displayName, schoolName);

      if (error) {
        return { error: error as Error };
      }

      if (newUser) {
        setUser(newUser);
        // The profile will be fetched via onAuthStateChange
      }

      return { error: null };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInAsTeacher = useCallback(async (
    email: string,
    password: string
  ): Promise<{ error: Error | null }> => {
    console.log('[AuthContext] signInAsTeacher called', Date.now());
    setIsLoading(true);
    try {
      console.log('[AuthContext] Calling signInTeacher...', Date.now());
      const { user: authUser, teacher: teacherData, error } = await signInTeacher(email, password);
      console.log('[AuthContext] signInTeacher returned', Date.now(), { hasUser: !!authUser, hasError: !!error });

      if (error) {
        return { error: error as Error };
      }

      if (authUser) {
        console.log('[AuthContext] Setting state...', Date.now());
        setUser(authUser);
        setTeacher(teacherData);
        setUserRole('teacher');
        // Clear any student session
        setStudent(null);
        localStorage.removeItem(STUDENT_STORAGE_KEY);
        console.log('[AuthContext] State set', Date.now());
      }

      return { error: null };
    } finally {
      console.log('[AuthContext] Setting isLoading to false', Date.now());
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // STUDENT AUTH METHODS
  // ============================================================================

  const signInAsStudent = useCallback(async (loginCode: string): Promise<{ error: Error | null }> => {
    setIsLoading(true);
    try {
      // Query for student with this login code
      // Note: This needs an RLS policy that allows anonymous access to students table
      // for login verification, or we need a server-side function
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('login_code', loginCode)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        return { error: new Error('Invalid login code. Please check and try again.') };
      }

      const studentData = data as Student;

      // Store student in localStorage
      localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(studentData));
      setStudent(studentData);
      setUserRole('student');

      // Clear teacher data (but don't call authSignOut - it triggers a listener that resets userRole)
      setUser(null);
      setTeacher(null);

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // SIGN OUT
  // ============================================================================

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      // Sign out from Supabase (teachers)
      await authSignOut();

      // Clear all auth state
      setUser(null);
      setTeacher(null);
      setStudent(null);
      setUserRole(null);

      // Clear student localStorage
      localStorage.removeItem(STUDENT_STORAGE_KEY);

      // Clear legacy auth
      localStorage.removeItem('decodingden_auth');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout helper
  const logout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  // User is authenticated if they have a role (teacher or student)
  const isAuthenticated = userRole !== null;

  // ============================================================================
  // RENDER
  // ============================================================================

  const value: AuthContextType = {
    isLoading,
    isAuthenticated,
    userRole,
    user,
    teacher,
    student,
    signUpAsTeacher,
    signInAsTeacher,
    signInAsStudent,
    signOut,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================================================
// ROLE-SPECIFIC HOOKS
// ============================================================================

export function useTeacher() {
  const { teacher, userRole, isLoading } = useAuth();
  return {
    teacher,
    isTeacher: userRole === 'teacher',
    isLoading,
  };
}

export function useStudent() {
  const { student, userRole, isLoading } = useAuth();
  return {
    student,
    isStudent: userRole === 'student',
    isLoading,
  };
}
