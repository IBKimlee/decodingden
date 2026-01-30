-- Authentication & User Management Tables
-- Migration: 003_create_auth_tables
-- Description: Creates teachers, students, groups, and assignments tables
-- Date: 2026-01-29

-- ============================================================================
-- TEACHERS TABLE - Linked to Supabase Auth
-- ============================================================================
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    school_name TEXT,
    grade_levels TEXT[], -- e.g., ['K', '1', '2']
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- STUDENTS TABLE - Managed by teachers (no auth.users link for young students)
-- ============================================================================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    display_name TEXT NOT NULL, -- What shows in the app
    login_code TEXT NOT NULL, -- Simple 4-6 digit code for student login
    avatar_url TEXT,
    grade_level TEXT,
    reading_level TEXT, -- e.g., 'below', 'on', 'above'
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(teacher_id, login_code) -- Each teacher's codes must be unique
);

-- ============================================================================
-- STUDENT GROUPS TABLE - For small group instruction
-- ============================================================================
CREATE TABLE IF NOT EXISTS student_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#4a90a4', -- For UI display
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- GROUP MEMBERSHIPS - Many-to-many: students can be in multiple groups
-- ============================================================================
CREATE TABLE IF NOT EXISTS group_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES student_groups(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(group_id, student_id)
);

-- ============================================================================
-- ASSIGNMENTS TABLE - Activities pushed to students
-- ============================================================================
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'elkonin_box',
        'word_work',
        'whiteboard',
        'phoneme_keyboard',
        'story_circle',
        'word_sort',
        'spelling_practice',
        'reading_passage'
    )),
    phoneme_id TEXT, -- References phoneme_id in phonemes table
    grapheme TEXT, -- Specific grapheme focus (e.g., 'a', 'sh')
    activity_config JSONB DEFAULT '{}', -- Activity-specific settings
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- STUDENT ASSIGNMENTS - Links assignments to individual students
-- ============================================================================
CREATE TABLE IF NOT EXISTS student_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'skipped')),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    score INTEGER, -- Optional score/accuracy
    time_spent_seconds INTEGER,
    attempts INTEGER DEFAULT 0,
    response_data JSONB DEFAULT '{}', -- Student's work/answers
    teacher_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(assignment_id, student_id)
);

-- ============================================================================
-- GROUP ASSIGNMENTS - Assign to entire groups at once
-- ============================================================================
CREATE TABLE IF NOT EXISTS group_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id UUID NOT NULL REFERENCES student_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(assignment_id, group_id)
);

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_students_teacher_id ON students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_login_code ON students(login_code);
CREATE INDEX IF NOT EXISTS idx_student_groups_teacher_id ON student_groups(teacher_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_group_id ON group_memberships(group_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_student_id ON group_memberships(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher_id ON assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_assignments_student_id ON student_assignments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_assignments_status ON student_assignments(status);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_assignments ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Teachers can only see/manage their own profile
CREATE POLICY "Teachers can view own profile" ON teachers
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Teachers can update own profile" ON teachers
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Teachers can insert own profile" ON teachers
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Teachers can only see/manage their own students
CREATE POLICY "Teachers can view own students" ON students
    FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can manage own students" ON students
    FOR ALL USING (auth.uid() = teacher_id);

-- Teachers can only see/manage their own groups
CREATE POLICY "Teachers can view own groups" ON student_groups
    FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can manage own groups" ON student_groups
    FOR ALL USING (auth.uid() = teacher_id);

-- Group memberships - teachers can manage for their groups
CREATE POLICY "Teachers can view group memberships" ON group_memberships
    FOR SELECT USING (
        group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid())
    );
CREATE POLICY "Teachers can manage group memberships" ON group_memberships
    FOR ALL USING (
        group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid())
    );

-- Assignments - teachers can manage their own
CREATE POLICY "Teachers can view own assignments" ON assignments
    FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can manage own assignments" ON assignments
    FOR ALL USING (auth.uid() = teacher_id);

-- Student assignments - teachers can manage for their students
CREATE POLICY "Teachers can view student assignments" ON student_assignments
    FOR SELECT USING (
        student_id IN (SELECT id FROM students WHERE teacher_id = auth.uid())
    );
CREATE POLICY "Teachers can manage student assignments" ON student_assignments
    FOR ALL USING (
        student_id IN (SELECT id FROM students WHERE teacher_id = auth.uid())
    );

-- Group assignments - teachers can manage for their groups
CREATE POLICY "Teachers can view group assignments" ON group_assignments
    FOR SELECT USING (
        group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid())
    );
CREATE POLICY "Teachers can manage group assignments" ON group_assignments
    FOR ALL USING (
        group_id IN (SELECT id FROM student_groups WHERE teacher_id = auth.uid())
    );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to generate unique student login code for a teacher
CREATE OR REPLACE FUNCTION generate_student_login_code(p_teacher_id UUID)
RETURNS TEXT AS $$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate 6-digit code
        new_code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');

        -- Check if code exists for this teacher
        SELECT EXISTS(
            SELECT 1 FROM students
            WHERE teacher_id = p_teacher_id AND login_code = new_code
        ) INTO code_exists;

        -- Exit loop if code is unique
        EXIT WHEN NOT code_exists;
    END LOOP;

    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Function to assign an assignment to all students in a group
CREATE OR REPLACE FUNCTION assign_to_group(p_assignment_id UUID, p_group_id UUID)
RETURNS INTEGER AS $$
DECLARE
    inserted_count INTEGER;
BEGIN
    -- Insert group assignment record
    INSERT INTO group_assignments (assignment_id, group_id)
    VALUES (p_assignment_id, p_group_id)
    ON CONFLICT DO NOTHING;

    -- Create individual student assignments for all group members
    INSERT INTO student_assignments (assignment_id, student_id)
    SELECT p_assignment_id, student_id
    FROM group_memberships
    WHERE group_id = p_group_id
    ON CONFLICT DO NOTHING;

    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    RETURN inserted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- UPDATE TIMESTAMP TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
    BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_groups_updated_at ON student_groups;
CREATE TRIGGER update_student_groups_updated_at
    BEFORE UPDATE ON student_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_assignments_updated_at ON student_assignments;
CREATE TRIGGER update_student_assignments_updated_at
    BEFORE UPDATE ON student_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE teachers IS 'Teacher accounts linked to Supabase Auth';
COMMENT ON TABLE students IS 'Student accounts managed by teachers with simple login codes';
COMMENT ON TABLE student_groups IS 'Small groups for differentiated instruction';
COMMENT ON TABLE group_memberships IS 'Links students to their groups';
COMMENT ON TABLE assignments IS 'Activities created by teachers';
COMMENT ON TABLE student_assignments IS 'Tracks individual student progress on assignments';
COMMENT ON TABLE group_assignments IS 'Links assignments to groups for batch assignment';
COMMENT ON FUNCTION generate_student_login_code IS 'Generates unique 6-digit login code for a student';
COMMENT ON FUNCTION assign_to_group IS 'Assigns an activity to all students in a group';

SELECT 'Authentication tables created successfully!' as status;
