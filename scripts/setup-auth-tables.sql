-- Run this in Supabase SQL Editor
-- This will set up the authentication tables for Decoding Den

-- First, drop existing empty tables if they exist (only if empty!)
DO $$
DECLARE
    student_count INTEGER;
    teacher_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO student_count FROM students;
    SELECT COUNT(*) INTO teacher_count FROM teachers;

    IF student_count = 0 AND teacher_count = 0 THEN
        DROP TABLE IF EXISTS student_phonics_progress CASCADE;
        DROP TABLE IF EXISTS students CASCADE;
        DROP TABLE IF EXISTS teachers CASCADE;
        RAISE NOTICE 'Dropped empty tables';
    ELSE
        RAISE NOTICE 'Tables have data, not dropping';
    END IF;
END $$;

-- Now create the tables fresh
-- TEACHERS TABLE
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    school_name TEXT,
    grade_levels TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    display_name TEXT NOT NULL,
    login_code TEXT NOT NULL,
    avatar_url TEXT,
    grade_level TEXT,
    reading_level TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, login_code)
);

-- STUDENT GROUPS TABLE
CREATE TABLE IF NOT EXISTS student_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#4a90a4',
    skill_focus TEXT,  -- e.g., 'short_a', 'blend_st', 'digraph_sh'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GROUP MEMBERSHIPS
CREATE TABLE IF NOT EXISTS group_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES student_groups(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, student_id)
);

-- ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    activity_type TEXT NOT NULL,
    phoneme_id TEXT,
    grapheme TEXT,
    activity_config JSONB DEFAULT '{}',
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STUDENT ASSIGNMENTS
CREATE TABLE IF NOT EXISTS student_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'assigned',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    score INTEGER,
    time_spent_seconds INTEGER,
    attempts INTEGER DEFAULT 0,
    response_data JSONB DEFAULT '{}',
    teacher_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

-- GROUP ASSIGNMENTS
CREATE TABLE IF NOT EXISTS group_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id UUID NOT NULL REFERENCES student_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, group_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_students_teacher_id ON students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_login_code ON students(login_code);
CREATE INDEX IF NOT EXISTS idx_student_groups_teacher_id ON student_groups(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher_id ON assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_assignments_student_id ON student_assignments(student_id);

-- Enable RLS
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teachers
DROP POLICY IF EXISTS "Teachers can view own profile" ON teachers;
CREATE POLICY "Teachers can view own profile" ON teachers FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Teachers can update own profile" ON teachers;
CREATE POLICY "Teachers can update own profile" ON teachers FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Teachers can insert own profile" ON teachers;
CREATE POLICY "Teachers can insert own profile" ON teachers FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for students
DROP POLICY IF EXISTS "Teachers can view own students" ON students;
CREATE POLICY "Teachers can view own students" ON students FOR SELECT USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can manage own students" ON students;
CREATE POLICY "Teachers can manage own students" ON students FOR ALL USING (auth.uid() = teacher_id);

-- IMPORTANT: Allow anonymous student login verification
-- This policy allows anyone to verify a login code exists (for student login)
DROP POLICY IF EXISTS "Anyone can verify student login code" ON students;
CREATE POLICY "Anyone can verify student login code" ON students FOR SELECT
    USING (is_active = true);  -- Only active students can log in

-- RLS Policies for groups
DROP POLICY IF EXISTS "Teachers can view own groups" ON student_groups;
CREATE POLICY "Teachers can view own groups" ON student_groups FOR SELECT USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can manage own groups" ON student_groups;
CREATE POLICY "Teachers can manage own groups" ON student_groups FOR ALL USING (auth.uid() = teacher_id);

-- RLS Policies for group memberships
DROP POLICY IF EXISTS "Teachers can view group memberships" ON group_memberships;
CREATE POLICY "Teachers can view group memberships" ON group_memberships FOR SELECT
    USING (group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid()));

DROP POLICY IF EXISTS "Teachers can manage group memberships" ON group_memberships;
CREATE POLICY "Teachers can manage group memberships" ON group_memberships FOR ALL
    USING (group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid()));

-- RLS Policies for assignments
DROP POLICY IF EXISTS "Teachers can view own assignments" ON assignments;
CREATE POLICY "Teachers can view own assignments" ON assignments FOR SELECT USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can manage own assignments" ON assignments;
CREATE POLICY "Teachers can manage own assignments" ON assignments FOR ALL USING (auth.uid() = teacher_id);

-- RLS Policies for student assignments
DROP POLICY IF EXISTS "Teachers can view student assignments" ON student_assignments;
CREATE POLICY "Teachers can view student assignments" ON student_assignments FOR SELECT
    USING (student_id IN (SELECT id FROM students WHERE teacher_id = auth.uid()));

DROP POLICY IF EXISTS "Teachers can manage student assignments" ON student_assignments;
CREATE POLICY "Teachers can manage student assignments" ON student_assignments FOR ALL
    USING (student_id IN (SELECT id FROM students WHERE teacher_id = auth.uid()));

-- RLS Policies for group assignments
DROP POLICY IF EXISTS "Teachers can view group assignments" ON group_assignments;
CREATE POLICY "Teachers can view group assignments" ON group_assignments FOR SELECT
    USING (group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid()));

DROP POLICY IF EXISTS "Teachers can manage group assignments" ON group_assignments;
CREATE POLICY "Teachers can manage group assignments" ON group_assignments FOR ALL
    USING (group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid()));

-- Success message
SELECT 'Authentication tables created successfully!' as status;
