-- 🎟️ EXIT TICKET SYSTEM DATABASE SCHEMA
-- Comprehensive Supabase structure for teacher-approved student assessments

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Assumes you have these tables (or similar) - modify as needed
-- CREATE TABLE IF NOT EXISTS profiles (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   email TEXT,
--   full_name TEXT,
--   role TEXT CHECK (role IN ('teacher', 'student', 'admin')),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Teacher-Student relationships
CREATE TABLE IF NOT EXISTS teacher_student_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL, -- references profiles.id where role='teacher'
  student_id UUID NOT NULL, -- references profiles.id where role='student'
  class_name TEXT,
  school_year TEXT DEFAULT EXTRACT(YEAR FROM NOW())::TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(teacher_id, student_id, school_year)
);

-- Phoneme mastery levels lookup
CREATE TABLE IF NOT EXISTS phoneme_mastery_levels (
  id SERIAL PRIMARY KEY,
  level_code TEXT UNIQUE NOT NULL, -- 'emerging', 'developing', 'proficient', 'mastered'
  level_name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER
);

-- Insert default mastery levels
INSERT INTO phoneme_mastery_levels (level_code, level_name, description, sort_order) VALUES
('emerging', 'Emerging', 'Student is beginning to recognize the phoneme', 1),
('developing', 'Developing', 'Student can identify but struggles with production', 2),
('proficient', 'Proficient', 'Student demonstrates consistent understanding', 3),
('mastered', 'Mastered', 'Student has full mastery and can transfer to new contexts', 4)
ON CONFLICT (level_code) DO NOTHING;

-- ============================================================================
-- EXIT TICKET CORE TABLES
-- ============================================================================

-- Exit ticket sessions (the main assessment record)
CREATE TABLE IF NOT EXISTS exit_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Participants
  student_id UUID NOT NULL, -- references profiles.id
  teacher_id UUID NOT NULL, -- references profiles.id
  
  -- Assessment details
  phoneme TEXT NOT NULL, -- e.g., '/sh/', '/th/'
  stage INTEGER NOT NULL, -- from our 8-stage system
  
  -- Question and response data (JSONB for flexibility)
  questions_data JSONB NOT NULL, -- Generated questions from our content system
  student_responses JSONB, -- Student's answers
  
  -- Assessment results
  score_percentage DECIMAL(5,2), -- 0.00 to 100.00
  mastery_level TEXT REFERENCES phoneme_mastery_levels(level_code),
  
  -- Workflow status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
  
  -- Teacher feedback
  teacher_notes TEXT,
  teacher_feedback TEXT, -- Quick feedback for student
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE, -- When student finished
  approved_at TIMESTAMP WITH TIME ZONE, -- When teacher approved
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student phoneme progress tracking (aggregated data)
CREATE TABLE IF NOT EXISTS student_phoneme_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  student_id UUID NOT NULL,
  teacher_id UUID NOT NULL,
  phoneme TEXT NOT NULL,
  stage INTEGER NOT NULL,
  
  -- Progress metrics
  current_mastery_level TEXT REFERENCES phoneme_mastery_levels(level_code),
  assessment_count INTEGER DEFAULT 0,
  average_score DECIMAL(5,2),
  best_score DECIMAL(5,2),
  
  -- Important dates
  first_assessment_date TIMESTAMP WITH TIME ZONE,
  last_assessment_date TIMESTAMP WITH TIME ZONE,
  mastery_achieved_date TIMESTAMP WITH TIME ZONE, -- When reached 'mastered'
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(student_id, teacher_id, phoneme)
);

-- Exit ticket question templates (reusable question patterns)
CREATE TABLE IF NOT EXISTS exit_ticket_question_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  phoneme TEXT NOT NULL,
  stage INTEGER NOT NULL,
  question_type TEXT NOT NULL, -- 'identification', 'production', 'application', 'differentiation'
  
  template_data JSONB NOT NULL, -- Question structure, options, correct answers
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  
  -- Metadata
  created_by UUID, -- teacher who created it
  is_default BOOLEAN DEFAULT FALSE, -- system-generated vs teacher-created
  active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Exit tickets indexes
CREATE INDEX IF NOT EXISTS idx_exit_tickets_student_phoneme ON exit_tickets(student_id, phoneme);
CREATE INDEX IF NOT EXISTS idx_exit_tickets_teacher_status ON exit_tickets(teacher_id, status);
CREATE INDEX IF NOT EXISTS idx_exit_tickets_pending ON exit_tickets(status, created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_exit_tickets_created_at ON exit_tickets(created_at DESC);

-- Progress tracking indexes
CREATE INDEX IF NOT EXISTS idx_student_progress_student_id ON student_phoneme_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_teacher_phoneme ON student_phoneme_progress(teacher_id, phoneme);
CREATE INDEX IF NOT EXISTS idx_student_progress_mastery ON student_phoneme_progress(current_mastery_level);

-- Relationship indexes
CREATE INDEX IF NOT EXISTS idx_teacher_student_relationships_teacher ON teacher_student_relationships(teacher_id, active);
CREATE INDEX IF NOT EXISTS idx_teacher_student_relationships_student ON teacher_student_relationships(student_id, active);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE teacher_student_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE exit_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_phoneme_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exit_ticket_question_templates ENABLE ROW LEVEL SECURITY;

-- Teacher-Student Relationships policies
CREATE POLICY "Teachers can manage their students" ON teacher_student_relationships
  FOR ALL USING (teacher_id = auth.uid());

CREATE POLICY "Students can view their teachers" ON teacher_student_relationships
  FOR SELECT USING (student_id = auth.uid());

-- Exit Tickets policies
CREATE POLICY "Students can create and view their own exit tickets" ON exit_tickets
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage exit tickets for their students" ON exit_tickets
  FOR ALL USING (
    teacher_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM teacher_student_relationships 
      WHERE teacher_id = auth.uid() 
      AND student_id = exit_tickets.student_id 
      AND active = TRUE
    )
  );

-- Student Progress policies
CREATE POLICY "Students can view their own progress" ON student_phoneme_progress
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage progress for their students" ON student_phoneme_progress
  FOR ALL USING (
    teacher_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM teacher_student_relationships 
      WHERE teacher_id = auth.uid() 
      AND student_id = student_phoneme_progress.student_id 
      AND active = TRUE
    )
  );

-- Question Templates policies
CREATE POLICY "Anyone can view default templates" ON exit_ticket_question_templates
  FOR SELECT USING (is_default = TRUE OR created_by = auth.uid());

CREATE POLICY "Teachers can create and manage their templates" ON exit_ticket_question_templates
  FOR ALL USING (created_by = auth.uid());

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update progress when exit ticket is approved
CREATE OR REPLACE FUNCTION update_student_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Only run when status changes to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Update or insert progress record
    INSERT INTO student_phoneme_progress (
      student_id, teacher_id, phoneme, stage,
      current_mastery_level, assessment_count, average_score, best_score,
      first_assessment_date, last_assessment_date,
      mastery_achieved_date, updated_at
    ) VALUES (
      NEW.student_id, NEW.teacher_id, NEW.phoneme, NEW.stage,
      NEW.mastery_level, 1, NEW.score_percentage, NEW.score_percentage,
      NEW.approved_at, NEW.approved_at,
      CASE WHEN NEW.mastery_level = 'mastered' THEN NEW.approved_at ELSE NULL END,
      NOW()
    )
    ON CONFLICT (student_id, teacher_id, phoneme) 
    DO UPDATE SET
      current_mastery_level = NEW.mastery_level,
      assessment_count = student_phoneme_progress.assessment_count + 1,
      average_score = (
        (student_phoneme_progress.average_score * student_phoneme_progress.assessment_count + NEW.score_percentage) 
        / (student_phoneme_progress.assessment_count + 1)
      ),
      best_score = GREATEST(student_phoneme_progress.best_score, NEW.score_percentage),
      last_assessment_date = NEW.approved_at,
      mastery_achieved_date = CASE 
        WHEN NEW.mastery_level = 'mastered' AND student_phoneme_progress.mastery_achieved_date IS NULL 
        THEN NEW.approved_at 
        ELSE student_phoneme_progress.mastery_achieved_date 
      END,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update progress
CREATE TRIGGER trigger_update_student_progress
  AFTER UPDATE ON exit_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_student_progress();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_exit_tickets_updated_at
  BEFORE UPDATE ON exit_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_student_progress_updated_at
  BEFORE UPDATE ON student_phoneme_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- USEFUL VIEWS FOR REPORTING
-- ============================================================================

-- Teacher dashboard view (pending exit tickets)
CREATE OR REPLACE VIEW teacher_pending_exit_tickets AS
SELECT 
  et.id,
  et.student_id,
  p_student.full_name as student_name,
  et.phoneme,
  et.stage,
  et.started_at,
  et.completed_at,
  EXTRACT(EPOCH FROM (NOW() - et.completed_at))/60 as minutes_waiting
FROM exit_tickets et
LEFT JOIN profiles p_student ON p_student.user_id = et.student_id
WHERE et.status = 'pending'
AND et.completed_at IS NOT NULL
ORDER BY et.completed_at ASC;

-- Student progress summary view
CREATE OR REPLACE VIEW student_progress_summary AS
SELECT 
  spp.student_id,
  p.full_name as student_name,
  spp.teacher_id,
  COUNT(*) as phonemes_assessed,
  COUNT(CASE WHEN spp.current_mastery_level = 'mastered' THEN 1 END) as phonemes_mastered,
  AVG(spp.average_score) as overall_average_score,
  MAX(spp.last_assessment_date) as last_assessment_date
FROM student_phoneme_progress spp
LEFT JOIN profiles p ON p.user_id = spp.student_id
GROUP BY spp.student_id, p.full_name, spp.teacher_id;

-- ============================================================================
-- REAL-TIME SETUP
-- ============================================================================

-- Enable real-time for tables that need live updates
ALTER PUBLICATION supabase_realtime ADD TABLE exit_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE student_phoneme_progress;

-- ============================================================================
-- SAMPLE DATA (for development/testing)
-- ============================================================================

-- Sample question template for /sh/ phoneme
INSERT INTO exit_ticket_question_templates (phoneme, stage, question_type, template_data, difficulty_level, is_default) VALUES
('/sh/', 2, 'identification', '{
  "question": "Point to the word that has the /sh/ sound:",
  "type": "multiple_choice",
  "options": ["shop", "stop", "ship", "skip"],
  "correct_answers": ["shop", "ship"],
  "points": 2
}', 'easy', TRUE),
('/sh/', 2, 'production', '{
  "question": "Which letters make the /sh/ sound in the word FISH?",
  "type": "multiple_choice", 
  "options": ["f", "i", "sh", "h"],
  "correct_answers": ["sh"],
  "points": 1
}', 'medium', TRUE)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- USAGE NOTES
-- ============================================================================

/*

TYPICAL WORKFLOW:

1. Student creates exit ticket:
   INSERT INTO exit_tickets (student_id, teacher_id, phoneme, stage, questions_data)
   VALUES (student_uuid, teacher_uuid, '/sh/', 2, questions_json);

2. Student completes (updates with responses):
   UPDATE exit_tickets 
   SET student_responses = responses_json, completed_at = NOW()
   WHERE id = ticket_id AND student_id = auth.uid();

3. Teacher approves:
   UPDATE exit_tickets 
   SET status = 'approved', teacher_notes = 'Great work!', 
       score_percentage = 85.0, mastery_level = 'proficient', approved_at = NOW()
   WHERE id = ticket_id;
   -- Progress automatically updates via trigger

4. Query student progress:
   SELECT * FROM student_phoneme_progress WHERE student_id = student_uuid;

5. Teacher dashboard:
   SELECT * FROM teacher_pending_exit_tickets WHERE teacher_id = auth.uid();

REAL-TIME SUBSCRIPTIONS:
- Teachers subscribe to: exit_tickets WHERE teacher_id = auth.uid() AND status = 'pending'
- Students subscribe to: exit_tickets WHERE student_id = auth.uid()

*/