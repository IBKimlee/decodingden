import { createClient } from '@supabase/supabase-js';

// Browser client - uses anon key, relies on RLS for security
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Types for our database tables
export interface Teacher {
  id: string;
  email: string;
  display_name: string;
  school_name?: string;
  grade_levels?: string[];
  is_approved: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  teacher_id: string;
  first_name: string;
  last_name?: string;
  display_name: string;
  login_code: string;
  avatar_url?: string;
  grade_level?: string;
  reading_level?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudentGroup {
  id: string;
  teacher_id: string;
  name: string;
  description?: string;
  color: string;
  type: 'class' | 'group';  // 'class' = homeroom roster, 'group' = skill-based grouping
  skill_focus?: string;  // e.g., 'short_a', 'blend_st', 'digraph_sh'
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  teacher_id: string;
  title: string;
  description?: string;
  activity_type: 'elkonin_box' | 'word_work' | 'whiteboard' | 'phoneme_keyboard' | 'story_circle' | 'word_sort' | 'spelling_practice' | 'reading_passage';
  phoneme_id?: string;
  grapheme?: string;
  activity_config: Record<string, unknown>;
  due_date?: string;
  created_at: string;
}

export interface StudentAssignment {
  id: string;
  assignment_id: string;
  student_id: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'skipped';
  started_at?: string;
  completed_at?: string;
  score?: number;
  time_spent_seconds?: number;
  attempts: number;
  response_data: Record<string, unknown>;
  teacher_feedback?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  assignment?: Assignment;
}

export interface GroupMembership {
  id: string;
  group_id: string;
  student_id: string;
  added_at: string;
}

export type UserRole = 'teacher' | 'student' | null;
