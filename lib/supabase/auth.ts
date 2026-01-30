import { supabase, Teacher, Student, StudentGroup } from './client';
import type { User, AuthError } from '@supabase/supabase-js';

// ============================================================================
// TEACHER AUTHENTICATION
// ============================================================================

/**
 * Sign up a new teacher
 */
export async function signUpTeacher(
  email: string,
  password: string,
  displayName: string,
  schoolName?: string
): Promise<{ user: User | null; error: AuthError | Error | null }> {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { user: null, error: authError };
    }

    if (!authData.user) {
      return { user: null, error: new Error('Failed to create user') };
    }

    // 2. Create teacher profile
    const { error: profileError } = await supabase
      .from('teachers')
      .insert({
        id: authData.user.id,
        email: email,
        display_name: displayName,
        school_name: schoolName,
      });

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      // But Supabase doesn't allow deleting users from client side
      console.error('Failed to create teacher profile:', profileError);
      return { user: null, error: profileError };
    }

    return { user: authData.user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}

/**
 * Sign in a teacher
 */
export async function signInTeacher(
  email: string,
  password: string
): Promise<{ user: User | null; teacher: Teacher | null; error: AuthError | Error | null }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { user: null, teacher: null, error: authError };
    }

    if (!authData.user) {
      return { user: null, teacher: null, error: new Error('Failed to sign in') };
    }

    // Fetch teacher profile
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (teacherError) {
      return { user: authData.user, teacher: null, error: teacherError };
    }

    return { user: authData.user, teacher: teacherData as Teacher, error: null };
  } catch (error) {
    return { user: null, teacher: null, error: error as Error };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Get the current teacher profile
 */
export async function getCurrentTeacher(): Promise<{ teacher: Teacher | null; error: Error | null }> {
  try {
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return { teacher: null, error: userError || new Error('Not authenticated') };
    }

    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return { teacher: null, error };
    }

    return { teacher: data as Teacher, error: null };
  } catch (error) {
    return { teacher: null, error: error as Error };
  }
}

// ============================================================================
// STUDENT AUTHENTICATION (Simple code-based login)
// ============================================================================

/**
 * Student login with teacher code + student code
 * Format: TEACHER_ID:STUDENT_CODE (e.g., "abc123:456789")
 */
export async function loginStudent(
  teacherCode: string,
  studentCode: string
): Promise<{ student: Student | null; error: Error | null }> {
  try {
    // Find the student by login code
    // Note: This query needs a special RLS policy for anonymous access
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('login_code', studentCode)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { student: null, error: new Error('Invalid login code') };
      }
      return { student: null, error };
    }

    return { student: data as Student, error: null };
  } catch (error) {
    return { student: null, error: error as Error };
  }
}

/**
 * Generate a unique login code for a student
 */
export function generateLoginCode(): string {
  // Generate 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ============================================================================
// STUDENT MANAGEMENT (For Teachers)
// ============================================================================

/**
 * Create a new student (teacher must be authenticated)
 */
export async function createStudent(
  firstName: string,
  lastName?: string,
  gradeLevel?: string,
  readingLevel?: string
): Promise<{ student: Student | null; error: Error | null }> {
  try {
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return { student: null, error: new Error('Not authenticated') };
    }

    const loginCode = generateLoginCode();
    const displayName = lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName;

    const { data, error } = await supabase
      .from('students')
      .insert({
        teacher_id: user.id,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
        login_code: loginCode,
        grade_level: gradeLevel,
        reading_level: readingLevel,
      })
      .select()
      .single();

    if (error) {
      // If code collision, try again with new code
      if (error.code === '23505') {
        return createStudent(firstName, lastName, gradeLevel, readingLevel);
      }
      return { student: null, error };
    }

    return { student: data as Student, error: null };
  } catch (error) {
    return { student: null, error: error as Error };
  }
}

/**
 * Get all students for the current teacher
 */
export async function getMyStudents(): Promise<{ students: Student[]; error: Error | null }> {
  try {
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return { students: [], error: new Error('Not authenticated') };
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', user.id)
      .eq('is_active', true)
      .order('first_name');

    if (error) {
      return { students: [], error };
    }

    return { students: data as Student[], error: null };
  } catch (error) {
    return { students: [], error: error as Error };
  }
}

/**
 * Update a student
 */
export async function updateStudent(
  studentId: string,
  updates: Partial<Omit<Student, 'id' | 'teacher_id' | 'created_at' | 'updated_at'>>
): Promise<{ student: Student | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', studentId)
      .select()
      .single();

    if (error) {
      return { student: null, error };
    }

    return { student: data as Student, error: null };
  } catch (error) {
    return { student: null, error: error as Error };
  }
}

/**
 * Deactivate a student (soft delete)
 */
export async function deactivateStudent(studentId: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('students')
      .update({ is_active: false })
      .eq('id', studentId);

    return { error };
  } catch (error) {
    return { error: error as Error };
  }
}

// ============================================================================
// GROUP MANAGEMENT
// ============================================================================

/**
 * Create a new student group
 */
export async function createGroup(
  name: string,
  description?: string,
  color?: string
): Promise<{ group: StudentGroup | null; error: Error | null }> {
  try {
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return { group: null, error: new Error('Not authenticated') };
    }

    const { data, error } = await supabase
      .from('student_groups')
      .insert({
        teacher_id: user.id,
        name,
        description,
        color: color || '#4a90a4',
      })
      .select()
      .single();

    if (error) {
      return { group: null, error };
    }

    return { group: data, error: null };
  } catch (error) {
    return { group: null, error: error as Error };
  }
}

/**
 * Get all groups for the current teacher
 */
export async function getMyGroups(): Promise<{ groups: StudentGroup[]; error: Error | null }> {
  try {
    const { user, error: userError } = await getCurrentUser();

    if (userError || !user) {
      return { groups: [], error: new Error('Not authenticated') };
    }

    const { data, error } = await supabase
      .from('student_groups')
      .select('*')
      .eq('teacher_id', user.id)
      .order('name');

    if (error) {
      return { groups: [], error };
    }

    return { groups: data, error: null };
  } catch (error) {
    return { groups: [], error: error as Error };
  }
}

/**
 * Add a student to a group
 */
export async function addStudentToGroup(
  groupId: string,
  studentId: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('group_memberships')
      .insert({
        group_id: groupId,
        student_id: studentId,
      });

    if (error && error.code !== '23505') { // Ignore duplicate key errors
      return { error };
    }

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

/**
 * Remove a student from a group
 */
export async function removeStudentFromGroup(
  groupId: string,
  studentId: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('group_memberships')
      .delete()
      .eq('group_id', groupId)
      .eq('student_id', studentId);

    return { error };
  } catch (error) {
    return { error: error as Error };
  }
}

/**
 * Get students in a group
 */
export async function getGroupStudents(groupId: string): Promise<{ students: Student[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('group_memberships')
      .select('student_id, students(*)')
      .eq('group_id', groupId);

    if (error) {
      return { students: [], error };
    }

    const students = (data as unknown as Array<{ students: Student }>).map((m) => m.students).filter(Boolean);
    return { students, error: null };
  } catch (error) {
    return { students: [], error: error as Error };
  }
}
