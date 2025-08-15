-- Decoding Den Comprehensive Phoneme Database Schema
-- This schema is separate from the 8-stages system and covers all English phonemes
-- Based on Science of Reading principles and peer-reviewed sources

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Core phonemes table - the heart of the system
CREATE TABLE phonemes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ipa_symbol VARCHAR(10) NOT NULL UNIQUE, -- e.g., "/sh/", "/ā/", "/th/"
    common_name VARCHAR(50) NOT NULL, -- e.g., "sh sound", "long a", "voiced th"
    phoneme_type VARCHAR(30) NOT NULL CHECK (phoneme_type IN (
        'consonant_single',
        'consonant_digraph',
        'consonant_trigraph',
        'consonant_blend',
        'vowel_short',
        'vowel_long',
        'vowel_r_controlled',
        'vowel_diphthong',
        'vowel_team',
        'schwa'
    )),
    frequency_rank INTEGER, -- 1-44 based on English frequency
    is_voiced BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Grapheme mappings - all possible spellings for each phoneme
CREATE TABLE grapheme_mappings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    grapheme VARCHAR(10) NOT NULL, -- e.g., "sh", "a_e", "igh"
    position_frequency JSONB DEFAULT '{"beginning": 0, "medial": 0, "ending": 0}', -- frequency by position
    example_words JSONB DEFAULT '{"beginning": [], "medial": [], "ending": []}',
    spelling_frequency INTEGER, -- how common this spelling is for this phoneme
    notes TEXT, -- any special rules or patterns
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Articulation guides - detailed pronunciation instructions
CREATE TABLE articulation_guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL UNIQUE REFERENCES phonemes(id) ON DELETE CASCADE,
    place_of_articulation VARCHAR(50), -- e.g., "palatal-alveolar", "bilabial"
    manner_of_articulation VARCHAR(50), -- e.g., "fricative", "stop", "liquid"
    voicing VARCHAR(20), -- "voiced" or "unvoiced"
    tongue_position TEXT,
    lip_position TEXT,
    airflow_description TEXT,
    step_by_step_instructions TEXT[], -- Array of instruction steps
    common_errors TEXT[], -- Common articulation mistakes
    teacher_tips TEXT[], -- Tips for teaching articulation
    multimedia_placeholder JSONB DEFAULT '{}', -- For future animation/video URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Word lists - categorized by position and decodability
CREATE TABLE word_lists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    grapheme_id UUID NOT NULL REFERENCES grapheme_mappings(id) ON DELETE CASCADE,
    word VARCHAR(50) NOT NULL,
    position VARCHAR(20) NOT NULL CHECK (position IN ('beginning', 'medial', 'ending')),
    syllable_count INTEGER NOT NULL,
    is_decodable BOOLEAN DEFAULT true,
    additional_phonemes TEXT[], -- Other phonemes in the word
    frequency_score INTEGER, -- Word frequency in English
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Teaching content - rules, explanations, and tips
CREATE TABLE teaching_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    content_type VARCHAR(30) NOT NULL CHECK (content_type IN (
        'explanation',
        'rule',
        'tip',
        'memory_device',
        'common_confusion'
    )),
    content TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    icon_emoji VARCHAR(10), -- e.g., "💙", "💚", "💛"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Practice texts - sentences and stories
CREATE TABLE practice_texts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    text_type VARCHAR(20) NOT NULL CHECK (text_type IN ('sentence', 'story', 'word_ladder')),
    content TEXT NOT NULL,
    target_words TEXT[], -- Words containing the target phoneme
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 3), -- 1=easy, 2=medium, 3=challenge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Research citations - peer-reviewed sources
CREATE TABLE research_citations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID REFERENCES phonemes(id) ON DELETE CASCADE,
    source_name VARCHAR(200) NOT NULL, -- e.g., "Florida Center for Reading Research"
    citation_text TEXT NOT NULL,
    url TEXT,
    applicable_to TEXT[], -- e.g., ['articulation', 'word_lists', 'teaching_tips']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Common misspellings and auto-corrections
CREATE TABLE phoneme_corrections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    incorrect_input VARCHAR(100) NOT NULL UNIQUE, -- e.g., "long sh", "digraph ea"
    correct_phoneme_id UUID REFERENCES phonemes(id) ON DELETE CASCADE,
    correction_message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Teacher customizations (for future use)
CREATE TABLE teacher_customizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL, -- Reference to auth.users
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    custom_content JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Usage analytics (for tracking popular phonemes)
CREATE TABLE phoneme_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phoneme_id UUID NOT NULL REFERENCES phonemes(id) ON DELETE CASCADE,
    user_id UUID, -- Reference to auth.users, nullable for anonymous
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sections_viewed TEXT[] -- Which sections were accessed
);

-- Create indexes for performance
CREATE INDEX idx_grapheme_mappings_phoneme_id ON grapheme_mappings(phoneme_id);
CREATE INDEX idx_grapheme_mappings_grapheme ON grapheme_mappings(grapheme);
CREATE INDEX idx_word_lists_phoneme_id ON word_lists(phoneme_id);
CREATE INDEX idx_word_lists_position ON word_lists(position);
CREATE INDEX idx_practice_texts_phoneme_id ON practice_texts(phoneme_id);
CREATE INDEX idx_phoneme_usage_phoneme_id ON phoneme_usage(phoneme_id);
CREATE INDEX idx_phoneme_usage_accessed_at ON phoneme_usage(accessed_at);
CREATE INDEX idx_phoneme_corrections_input ON phoneme_corrections(incorrect_input);

-- Create views for common queries
CREATE VIEW phoneme_complete_view AS
SELECT 
    p.*,
    ag.place_of_articulation,
    ag.manner_of_articulation,
    ag.voicing,
    COUNT(DISTINCT gm.id) as grapheme_count,
    COUNT(DISTINCT wl.id) as word_count
FROM phonemes p
LEFT JOIN articulation_guides ag ON p.id = ag.phoneme_id
LEFT JOIN grapheme_mappings gm ON p.id = gm.phoneme_id
LEFT JOIN word_lists wl ON p.id = wl.phoneme_id
GROUP BY p.id, ag.place_of_articulation, ag.manner_of_articulation, ag.voicing;

-- Row Level Security (RLS) policies
ALTER TABLE phonemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE grapheme_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulation_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE phoneme_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE phoneme_usage ENABLE ROW LEVEL SECURITY;

-- Public read access for all core tables
CREATE POLICY "Public read access" ON phonemes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON grapheme_mappings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articulation_guides FOR SELECT USING (true);
CREATE POLICY "Public read access" ON word_lists FOR SELECT USING (true);
CREATE POLICY "Public read access" ON teaching_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON practice_texts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON research_citations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON phoneme_corrections FOR SELECT USING (true);

-- Teacher customizations - users can only see/edit their own
CREATE POLICY "Users can view own customizations" ON teacher_customizations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own customizations" ON teacher_customizations
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own customizations" ON teacher_customizations
    FOR UPDATE USING (auth.uid() = user_id);

-- Usage tracking - allow inserts from anyone
CREATE POLICY "Anyone can track usage" ON phoneme_usage
    FOR INSERT WITH CHECK (true);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to relevant tables
CREATE TRIGGER update_phonemes_updated_at BEFORE UPDATE ON phonemes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teacher_customizations_updated_at BEFORE UPDATE ON teacher_customizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();