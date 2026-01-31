import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (bypasses RLS for API routes)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * POST /api/student-progress
 * Update a student's progress on an assignment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      assignment_id,
      student_id,
      status,
      score,
      time_spent_seconds,
      attempts,
      response_data,
    } = body;

    // Validate required fields
    if (!assignment_id || !student_id) {
      return NextResponse.json(
        { error: 'assignment_id and student_id are required' },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (status) updateData.status = status;
    if (score !== undefined) updateData.score = score;
    if (time_spent_seconds !== undefined) updateData.time_spent_seconds = time_spent_seconds;
    if (attempts !== undefined) updateData.attempts = attempts;
    if (response_data) updateData.response_data = response_data;

    // Set timestamps based on status
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }
    if (status === 'in_progress') {
      updateData.started_at = new Date().toISOString();
    }

    // Update the student assignment
    const { data, error } = await supabase
      .from('student_assignments')
      .update(updateData)
      .eq('assignment_id', assignment_id)
      .eq('student_id', student_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating student progress:', error);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in student-progress API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/student-progress?student_id=xxx
 * Get all assignments and progress for a student
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id');

    if (!studentId) {
      return NextResponse.json(
        { error: 'student_id is required' },
        { status: 400 }
      );
    }

    // Get all assignments for this student with assignment details
    const { data, error } = await supabase
      .from('student_assignments')
      .select(`
        *,
        assignment:assignments(*)
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching student progress:', error);
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({ assignments: data });
  } catch (error) {
    console.error('Error in student-progress API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
