import { supabase, Teacher, Student, StudentGroup, StudentAssignment } from './client';
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
    // Create auth user with metadata
    // A database trigger will automatically create the teacher profile
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          school_name: schoolName || null,
          role: 'teacher',
        },
      },
    });

    if (authError) {
      return { user: null, error: authError };
    }

    if (!authData.user) {
      return { user: null, error: new Error('Failed to create user') };
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
export async function getCurrentTeacher(userId?: string): Promise<{ teacher: Teacher | null; error: Error | null }> {
  try {
    let id = userId;

    // Only fetch current user if userId not provided
    if (!id) {
      const { user, error: userError } = await getCurrentUser();
      if (userError || !user) {
        return { teacher: null, error: userError || new Error('Not authenticated') };
      }
      id = user.id;
    }

    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
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
 * @param teacherId - Optional teacher ID to skip auth check (faster)
 */
export async function getMyStudents(teacherId?: string): Promise<{ students: Student[]; error: Error | null }> {
  try {
    let userId = teacherId;

    // Only fetch current user if teacherId not provided
    if (!userId) {
      const { user, error: userError } = await getCurrentUser();
      if (userError || !user) {
        return { students: [], error: new Error('Not authenticated') };
      }
      userId = user.id;
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', userId)
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
 * Create a new student group or class
 */
export async function createGroup(
  name: string,
  description?: string,
  color?: string,
  type: 'class' | 'group' = 'group'
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
        type,
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
 * Create a new class (convenience wrapper)
 */
export async function createClass(
  name: string,
  description?: string,
  color?: string
): Promise<{ group: StudentGroup | null; error: Error | null }> {
  return createGroup(name, description, color, 'class');
}

/**
 * Get all groups for the current teacher (optionally filtered by type)
 * @param type - Optional filter by 'class' or 'group'
 * @param teacherId - Optional teacher ID to skip auth check (faster)
 */
export async function getMyGroups(type?: 'class' | 'group', teacherId?: string): Promise<{ groups: StudentGroup[]; error: Error | null }> {
  try {
    let userId = teacherId;

    // Only fetch current user if teacherId not provided
    if (!userId) {
      const { user, error: userError } = await getCurrentUser();
      if (userError || !user) {
        return { groups: [], error: new Error('Not authenticated') };
      }
      userId = user.id;
    }

    let query = supabase
      .from('student_groups')
      .select('*')
      .eq('teacher_id', userId);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.order('name');

    if (error) {
      return { groups: [], error };
    }

    return { groups: data, error: null };
  } catch (error) {
    return { groups: [], error: error as Error };
  }
}

/**
 * Get all classes for the current teacher
 */
export async function getMyClasses(): Promise<{ classes: StudentGroup[]; error: Error | null }> {
  const { groups, error } = await getMyGroups('class');
  return { classes: groups, error };
}

/**
 * Get all skill groups for the current teacher
 */
export async function getMySkillGroups(): Promise<{ groups: StudentGroup[]; error: Error | null }> {
  return getMyGroups('group');
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

// ============================================================================
// STUDENT PROGRESS TRACKING
// ============================================================================

/**
 * Update student assignment progress (for completion tracking)
 */
export async function updateStudentProgress(
  assignmentId: string,
  studentId: string,
  updates: {
    status?: 'assigned' | 'in_progress' | 'completed' | 'skipped';
    score?: number;
    time_spent_seconds?: number;
    attempts?: number;
    response_data?: Record<string, unknown>;
  }
): Promise<{ error: Error | null }> {
  try {
    const updateData: Record<string, unknown> = { ...updates };

    if (updates.status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }
    if (updates.status === 'in_progress' && !updates.score) {
      updateData.started_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('student_assignments')
      .update(updateData)
      .eq('assignment_id', assignmentId)
      .eq('student_id', studentId);

    return { error };
  } catch (error) {
    return { error: error as Error };
  }
}

/**
 * Get a student's assignments with progress
 */
export async function getStudentAssignments(
  studentId: string
): Promise<{ assignments: StudentAssignment[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('student_assignments')
      .select('*, assignment:assignments(*)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      return { assignments: [], error };
    }

    return { assignments: data as StudentAssignment[], error: null };
  } catch (error) {
    return { assignments: [], error: error as Error };
  }
}

/**
 * Get progress summary for all students (for teacher dashboard)
 */
export async function getTeacherProgressSummary(): Promise<{
  progress: Array<{
    student: Student;
    assigned_count: number;
    completed_count: number;
    avg_score: number | null;
    total_time_seconds: number;
    last_activity: string | null;
  }>;
  error: Error | null;
}> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError || !user) {
      return { progress: [], error: new Error('Not authenticated') };
    }

    // Get all students for this teacher
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', user.id)
      .eq('is_active', true);

    if (studentsError) {
      return { progress: [], error: studentsError };
    }

    // Get all student assignments for these students
    const studentIds = students.map(s => s.id);
    const { data: assignments, error: assignmentsError } = await supabase
      .from('student_assignments')
      .select('*')
      .in('student_id', studentIds);

    if (assignmentsError) {
      return { progress: [], error: assignmentsError };
    }

    // Calculate progress for each student
    const progress = students.map(student => {
      const studentAssignments = assignments.filter(a => a.student_id === student.id);
      const completedAssignments = studentAssignments.filter(a => a.status === 'completed');

      const scores = completedAssignments
        .map(a => a.score)
        .filter((s): s is number => s !== null && s !== undefined);

      const avgScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : null;

      const totalTime = studentAssignments.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0);

      const lastCompleted = completedAssignments
        .map(a => a.completed_at)
        .filter(Boolean)
        .sort()
        .reverse()[0] || null;

      return {
        student,
        assigned_count: studentAssignments.length,
        completed_count: completedAssignments.length,
        avg_score: avgScore,
        total_time_seconds: totalTime,
        last_activity: lastCompleted,
      };
    });

    return { progress, error: null };
  } catch (error) {
    return { progress: [], error: error as Error };
  }
}

/**
 * Get which groups/classes a student belongs to
 */
export async function getStudentGroups(studentId: string): Promise<{ groups: StudentGroup[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('group_memberships')
      .select('group_id, student_groups(*)')
      .eq('student_id', studentId);

    if (error) {
      return { groups: [], error };
    }

    const groups = (data as unknown as Array<{ student_groups: StudentGroup }>)
      .map((m) => m.student_groups)
      .filter(Boolean);
    return { groups, error: null };
  } catch (error) {
    return { groups: [], error: error as Error };
  }
}
