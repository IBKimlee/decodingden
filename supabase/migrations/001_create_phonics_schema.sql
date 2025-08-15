-- PHONICS CURRICULUM DATABASE SCHEMA
-- Migration: 001_create_phonics_schema
-- Description: Creates comprehensive phonics curriculum tables from TypeScript data
-- Date: 2025-07-02

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PHONICS STAGES TABLE - 8-Stage Progression System (K-3)
-- ============================================================================
CREATE TABLE phonics_stages (
    id INTEGER PRIMARY KEY CHECK (id >= 1 AND id <= 8),
    name TEXT NOT NULL,
    grade_band TEXT NOT NULL,
    student_phase TEXT,
    duration TEXT,
    total_elements INTEGER,
    description TEXT,
    key_concept TEXT,
    instructional_focus TEXT[],
    science_of_reading_alignment JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- PHONEMES TABLE - Individual phoneme entries with comprehensive metadata
-- ============================================================================
CREATE TABLE phonemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phoneme_id TEXT NOT NULL UNIQUE, -- e.g., "stage1_m"
    stage_id INTEGER NOT NULL REFERENCES phonics_stages(id),
    phoneme TEXT NOT NULL, -- e.g., "/m/"
    graphemes TEXT[] NOT NULL, -- e.g., ['m']
    frequency_rank INTEGER,
    complexity_score NUMERIC(3,1),
    grade_band TEXT,
    introduction_week INTEGER,
    word_examples TEXT[],
    decodable_sentences TEXT[],
    assessment_criteria JSONB, -- {daily, weekly, summative}
    teaching_advantages TEXT[],
    research_sources TEXT[],
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- ASSESSMENTS TABLE - Stage-specific assessments with criteria
-- ============================================================================
CREATE TABLE phonics_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stage_id INTEGER NOT NULL REFERENCES phonics_stages(id),
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('daily', 'weekly', 'summative')),
    name TEXT NOT NULL,
    description TEXT,
    questions JSONB, -- Array of question objects
    scoring_rubric JSONB,
    intervention_recommendations JSONB,
    benchmark_criteria JSONB, -- From ASSESSMENT_BENCHMARKS
    time_limit_minutes INTEGER,
    passing_threshold INTEGER CHECK (passing_threshold >= 0 AND passing_threshold <= 100),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- RESEARCH JUSTIFICATIONS TABLE - Academic backing for each stage
-- ============================================================================
CREATE TABLE research_justifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stage_id INTEGER NOT NULL REFERENCES phonics_stages(id),
    justification_text TEXT,
    key_concepts TEXT[],
    research_sources JSONB, -- Array of source objects
    evidence_base TEXT,
    implementation_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(stage_id)
);

-- ============================================================================
-- SCOPE & SEQUENCE CATEGORIES TABLE - K-5 curriculum progression
-- ============================================================================
CREATE TABLE scope_sequence_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    order_index INTEGER NOT NULL,
    grade_levels TEXT[] NOT NULL,
    description TEXT,
    prerequisites TEXT[],
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- PHONEME SCOPE MAPPINGS TABLE - Links phonemes to scope categories
-- ============================================================================
CREATE TABLE phoneme_scope_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phoneme_id UUID NOT NULL REFERENCES phonemes(id),
    category_id UUID NOT NULL REFERENCES scope_sequence_categories(id),
    grade_level TEXT NOT NULL,
    quarter INTEGER CHECK (quarter >= 1 AND quarter <= 4),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(phoneme_id, category_id, grade_level)
);

-- ============================================================================
-- WORD-PHONEME MAPPINGS TABLE - For decodability calculations
-- ============================================================================
CREATE TABLE word_phoneme_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word TEXT NOT NULL,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id),
    position_in_word INTEGER NOT NULL,
    is_required_for_decodability BOOLEAN DEFAULT true,
    complexity_level TEXT CHECK (complexity_level IN ('simple', 'moderate', 'complex')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(word, phoneme_id, position_in_word)
);

-- ============================================================================
-- PHONEME DEVELOPMENT NORMS TABLE - Speech development data
-- ============================================================================
CREATE TABLE phoneme_development_norms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phoneme_id UUID NOT NULL REFERENCES phonemes(id),
    typical_age_range_start NUMERIC(3,1), -- e.g., 2.5 years
    typical_age_range_end NUMERIC(3,1),   -- e.g., 4.0 years
    mastery_age NUMERIC(3,1),             -- e.g., 3.0 years
    common_substitutions TEXT[],
    referral_guidelines TEXT,
    research_citations TEXT[],
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(phoneme_id)
);

-- ============================================================================
-- DIFFERENTIATION STRATEGIES TABLE - Teaching strategies by learner type
-- ============================================================================
CREATE TABLE differentiation_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learner_type TEXT NOT NULL CHECK (learner_type IN ('struggling', 'on_level', 'advanced')),
    pace TEXT,
    practice_requirements TEXT,
    instruction_type TEXT,
    grouping_strategy TEXT,
    materials TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    UNIQUE(learner_type)
);

-- ============================================================================
-- STUDENT PHONICS PROGRESS TABLE - Tracks individual student progress
-- ============================================================================
CREATE TABLE student_phonics_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    stage_id INTEGER REFERENCES phonics_stages(id),
    phoneme_id UUID REFERENCES phonemes(id),
    assessment_id UUID REFERENCES phonics_assessments(id),
    mastery_level TEXT CHECK (mastery_level IN ('not_started', 'emerging', 'developing', 'proficient', 'advanced')),
    score INTEGER CHECK (score >= 0 AND score <= 100),
    attempts INTEGER DEFAULT 1,
    first_attempt_date TIMESTAMPTZ,
    mastery_date TIMESTAMPTZ,
    intervention_triggers TEXT[],
    next_recommended_phonemes TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX idx_phonemes_stage_id ON phonemes(stage_id);
CREATE INDEX idx_phonemes_phoneme ON phonemes(phoneme);
CREATE INDEX idx_phonemes_phoneme_id ON phonemes(phoneme_id);
CREATE INDEX idx_assessments_stage_id ON phonics_assessments(stage_id);
CREATE INDEX idx_research_stage_id ON research_justifications(stage_id);
CREATE INDEX idx_word_phoneme_mappings_word ON word_phoneme_mappings(word);
CREATE INDEX idx_word_phoneme_mappings_phoneme ON word_phoneme_mappings(phoneme_id);
CREATE INDEX idx_student_progress_student_id ON student_phonics_progress(student_id);
CREATE INDEX idx_student_progress_stage_id ON student_phonics_progress(stage_id);
CREATE INDEX idx_student_progress_phoneme_id ON student_phonics_progress(phoneme_id);
CREATE INDEX idx_scope_mappings_phoneme ON phoneme_scope_mappings(phoneme_id);
CREATE INDEX idx_scope_mappings_category ON phoneme_scope_mappings(category_id);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE phonics_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE phonemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE phonics_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_justifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE scope_sequence_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phoneme_scope_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_phoneme_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE phoneme_development_norms ENABLE ROW LEVEL SECURITY;
ALTER TABLE differentiation_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_phonics_progress ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Allow authenticated users to read all phonics curriculum data
CREATE POLICY "Allow authenticated read on phonics_stages" ON phonics_stages 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on phonemes" ON phonemes 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on phonics_assessments" ON phonics_assessments 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on research_justifications" ON research_justifications 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on scope_sequence_categories" ON scope_sequence_categories 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on phoneme_scope_mappings" ON phoneme_scope_mappings 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on word_phoneme_mappings" ON word_phoneme_mappings 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on phoneme_development_norms" ON phoneme_development_norms 
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Allow authenticated read on differentiation_strategies" ON differentiation_strategies 
    FOR SELECT USING (auth.role() = 'authenticated');

-- Student progress policies - more restrictive
CREATE POLICY "Students can view own progress" ON student_phonics_progress 
    FOR SELECT USING (
        auth.uid()::uuid IN (SELECT id FROM students WHERE id = student_id)
    );

CREATE POLICY "Teachers can view their students' progress" ON student_phonics_progress 
    FOR SELECT USING (
        auth.uid()::uuid IN (
            SELECT teacher_id FROM students WHERE id = student_id
        )
    );

CREATE POLICY "Teachers can manage their students' progress" ON student_phonics_progress 
    FOR ALL USING (
        auth.uid()::uuid IN (
            SELECT teacher_id FROM students WHERE id = student_id
        )
    );

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE phonics_stages IS 'Eight-stage phonics progression system (K-3) based on Science of Reading research';
COMMENT ON TABLE phonemes IS 'Individual phoneme entries with comprehensive metadata for instruction';
COMMENT ON TABLE phonics_assessments IS 'Stage-specific assessments with scoring criteria and interventions';
COMMENT ON TABLE research_justifications IS 'Academic research backing for each phonics stage';
COMMENT ON TABLE scope_sequence_categories IS 'K-5 curriculum scope and sequence categories';
COMMENT ON TABLE phoneme_scope_mappings IS 'Maps phonemes to scope and sequence categories by grade level';
COMMENT ON TABLE word_phoneme_mappings IS 'Word-to-phoneme mappings for decodability calculations';
COMMENT ON TABLE phoneme_development_norms IS 'Typical speech development milestones for phonemes';
COMMENT ON TABLE differentiation_strategies IS 'Teaching strategies for different learner types';
COMMENT ON TABLE student_phonics_progress IS 'Individual student progress tracking through phonics curriculum';

-- ============================================================================
-- MIGRATION COMPLETION MESSAGE
-- ============================================================================
SELECT 'Phonics curriculum schema created successfully!' as status;