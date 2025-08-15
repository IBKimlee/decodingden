-- PHONICS DATA MIGRATION SQL
-- Generated: 2025-07-02
-- Description: Inserts all phonics curriculum data into Supabase

-- Disable foreign key checks during import
SET session_replication_role = replica;

-- ============================================================================
-- INSERT PHONICS STAGES DATA
-- ============================================================================
INSERT INTO phonics_stages (id, name, grade_band, student_phase, duration, total_elements, description, key_concept, instructional_focus, science_of_reading_alignment)
VALUES 
(1, 'Core Consonants & Short Vowels', 'Kindergarten – Fall Semester', 'Pre-Alphabetic to Partial Alphabetic Phase', '10 weeks', 15, 'Students learn foundational consonants and short vowels prioritized for high frequency and transparent mappings.', 'Letters represent sounds. When we put consonant-vowel-consonant together, we can read and spell words.', '{"CVC word formation (consonant-vowel-consonant)","Phonemic awareness integration with letters","Letter-sound correspondence mastery","Basic decoding skills development"}', '{"ehri_phase": "Pre-alphabetic to Partial Alphabetic - children use first and last sounds in words", "research_principle": "Ehri (2005); NRP (2000) - Foundational consonants and short vowels prioritized for transparent mappings", "orthographic_mapping": "Foundation for connecting letters to sounds in memory"}'),

(2, 'Remaining Single Letters & Simple Patterns', 'Kindergarten – Spring Semester', 'Partial Alphabetic Phase', '10 weeks', 12, 'Students complete the single letter foundation with remaining high-frequency consonants and simple patterns, avoiding complex digraphs until developmentally ready.', 'We complete our letter-sound foundation. Some letters work together in simple ways, but we''re not ready for complex digraphs yet.', '{"Complete single letter-sound correspondences","Simple consonant blends maintaining individual sounds","CVCC and CCVC word patterns with known letters","Systematic review of all single letters"}', '{"ehri_phase": "Partial Alphabetic - completing single letter foundation before complex patterns", "research_principle": "Fry (2004); NRP (2000) - High-frequency single letters prioritized, digraphs delayed until 1st grade", "orthographic_mapping": "Solid single letter-sound connections before advancing to complex patterns"}'),

(3, 'Consonant Digraphs', '1st Grade – Fall Semester', 'Full Alphabetic Phase - Emerging', '10 weeks', 8, 'Students learn consonant digraphs representing single sounds, building on solid single-letter foundation.', 'Two letters can work together to make one sound. This helps us read and spell more words.', '{"Consonant digraphs (ch, sh, th, wh)","Two letters = one sound concept","Digraph vs. blend distinction","Advanced CVC patterns with digraphs"}', '{"ehri_phase": "Full Alphabetic - systematic letter patterns", "research_principle": "Ehri (2005); Adams (1990) - Digraphs introduced after single letter mastery", "orthographic_mapping": "Complex orthographic patterns stored in memory"}'),

(4, 'Long Vowels with Silent E', '1st Grade – Spring Semester', 'Full Alphabetic Phase', '12 weeks', 10, 'Students learn the magic e pattern for long vowels, understanding vowel sounds in different contexts.', 'The silent e at the end of words makes the vowel say its name (long sound).', '{"CVCe patterns","Long vs. short vowel discrimination","Silent e concept","Vowel team foundations"}', '{"ehri_phase": "Full Alphabetic - advanced phoneme-grapheme correspondences", "research_principle": "Ehri (2005); Bear et al. (2020) - Systematic long vowel instruction", "orthographic_mapping": "Advanced vowel patterns and morphological awareness"}'),

(5, 'Vowel Teams & Diphthongs', '2nd Grade – Fall Semester', 'Full Alphabetic Phase - Advanced', '14 weeks', 15, 'Students master vowel teams and diphthongs, expanding their decoding capabilities significantly.', 'Two vowels can work together to make one sound, and sometimes vowels slide together to make new sounds.', '{"Common vowel teams (ai, ay, ee, ea, oa, ow)","Diphthongs (oi, oy, ou, ow)","Vowel team patterns and rules","Advanced decoding strategies"}', '{"ehri_phase": "Full Alphabetic - complex vowel patterns", "research_principle": "Ehri (2005); Moats (2020) - Systematic vowel team instruction", "orthographic_mapping": "Complex vowel pattern recognition and storage"}'),

(6, 'R-Controlled Vowels & Irregular Patterns', '2nd Grade – Spring Semester', 'Full Alphabetic to Consolidated Alphabetic', '12 weeks', 12, 'Students learn r-controlled vowels and begin handling irregular spelling patterns systematically.', 'The letter r changes how vowels sound, and some words have special spellings we need to remember.', '{"R-controlled vowels (ar, er, ir, or, ur)","Irregular spelling patterns","High-frequency irregular words","Strategic word analysis"}', '{"ehri_phase": "Consolidated Alphabetic - word pattern chunking", "research_principle": "Ehri (2005); Moats (2020) - R-controlled and irregular pattern instruction", "orthographic_mapping": "Pattern chunking and irregular word storage"}'),

(7, 'Advanced Phonics & Variant Spellings', '3rd Grade – Fall Semester', 'Consolidated Alphabetic Phase', '16 weeks', 20, 'Students master advanced phonics patterns and variant spellings, developing sophisticated decoding skills.', 'Many sounds can be spelled in different ways, and we can figure out words by trying different patterns.', '{"Variant spellings for sounds","Advanced consonant patterns","Syllable patterns","Morphological awareness introduction"}', '{"ehri_phase": "Consolidated Alphabetic - advanced pattern recognition", "research_principle": "Ehri (2005); Moats (2020) - Advanced phonics and morphology integration", "orthographic_mapping": "Sophisticated pattern recognition and morphological connections"}'),

(8, 'Multisyllabic Words & Morphology', '3rd Grade – Spring Semester', 'Consolidated Alphabetic to Automatic', '18 weeks', 25, 'Students develop skills for reading multisyllabic words using syllable division and morphological analysis.', 'Big words are made of smaller parts (syllables and word parts with meaning) that we can figure out.', '{"Syllable division patterns","Common prefixes and suffixes","Root word analysis","Multisyllabic decoding strategies"}', '{"ehri_phase": "Automatic - fluent word recognition and morphological analysis", "research_principle": "Ehri (2005); Nagy & Anderson (1984) - Morphological awareness and vocabulary", "orthographic_mapping": "Automatic word recognition with morphological connections"}');

-- ============================================================================
-- INSERT SAMPLE PHONEMES DATA (Stage 1)
-- ============================================================================
INSERT INTO phonemes (phoneme_id, stage_id, phoneme, graphemes, frequency_rank, complexity_score, grade_band, introduction_week, word_examples, decodable_sentences, assessment_criteria, teaching_advantages, research_sources)
VALUES 
('stage1_m', 1, '/m/', '{"m"}', 1, 1.0, 'K-Fall', 1, '{"mat","mad","man","mom","mud"}', '{"I am mad.","Sam has a mat."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"visible articulation","continuous sound"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_s', 1, '/s/', '{"s"}', 2, 1.0, 'K-Fall', 1, '{"sat","sad","sun","sit"}', '{"Sam is sad.","I sit."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"continuous sound","frequent usage"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_a', 1, '/a/', '{"a"}', 3, 1.0, 'K-Fall', 1, '{"mat","sat","hat","man"}', '{"I am mad.","The mat is tan."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"clear sound","visible mouth position"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_t', 1, '/t/', '{"t"}', 4, 1.0, 'K-Fall', 2, '{"top","tap","mat","sat"}', '{"Sam sat.","The mat."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"clear sound","high frequency"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_n', 1, '/n/', '{"n"}', 5, 1.0, 'K-Fall', 2, '{"not","nap","man","sun"}', '{"The man sat.","I can nap."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"continuous sound","frequent usage"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_p', 1, '/p/', '{"p"}', 6, 1.0, 'K-Fall', 3, '{"pat","pan","map","tap"}', '{"Pat has a map.","I can tap."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"visible articulation","clear release"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_i', 1, '/i/', '{"i"}', 7, 1.0, 'K-Fall', 3, '{"sit","pit","tip","sip"}', '{"I can sit.","The tip."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"clear contrast to /a/","frequent in CVC"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_d', 1, '/d/', '{"d"}', 8, 1.0, 'K-Fall', 4, '{"dad","dim","mad","sad"}', '{"Dad is mad.","The sad man."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"voiced pair to /t/","clear articulation"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_f', 1, '/f/', '{"f"}', 9, 1.0, 'K-Fall', 4, '{"fan","fat","if"}', '{"The fan is fat.","I fit."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"continuous sound","visible airflow"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_o', 1, '/o/', '{"o"}', 10, 1.0, 'K-Fall', 5, '{"dot","pot","top","mop"}', '{"The pot is hot.","I can sit on top."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"distinct rounded lips","clear contrast"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_l', 1, '/l/', '{"l"}', 11, 1.1, 'K-Fall', 5, '{"lap","lit","lot"}', '{"The lad has a lap.","Dad lit the lamp."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"continuous sound","visible tongue tip"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_h', 1, '/h/', '{"h"}', 12, 1.0, 'K-Fall', 6, '{"hat","hit","hot","ham"}', '{"The hat is hot.","I hid the pot."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"simple airflow","breath-like"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_b', 1, '/b/', '{"b"}', 13, 1.0, 'K-Fall', 6, '{"bat","bit","bad","tab"}', '{"The bat is bad.","I can bat."}', '{"daily": "90% accuracy", "weekly": "85% accuracy", "summative": "95% letter-sound"}', '{"visible articulation","voiced pair to /p/"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_e', 1, '/e/', '{"e"}', 14, 1.1, 'K-Fall', 7, '{"bet","pet","let","met"}', '{"The pet is in the pen.","Let me pet the cat."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"mid-position between /i/ and /a/"}', '{"Ehri (2005); NRP (2000)"}'),

('stage1_u', 1, '/u/', '{"u"}', 15, 1.1, 'K-Fall', 7, '{"but","hut","cut","mud"}', '{"The sun is fun.","Put the mud in the hut."}', '{"daily": "80% accuracy", "weekly": "75% accuracy", "summative": "85% letter-sound"}', '{"completes five short vowels"}', '{"Ehri (2005); NRP (2000)"}');

-- ============================================================================
-- INSERT SAMPLE PHONEMES DATA (Stage 2)
-- ============================================================================
INSERT INTO phonemes (phoneme_id, stage_id, phoneme, graphemes, frequency_rank, complexity_score, grade_band, introduction_week, word_examples, decodable_sentences, assessment_criteria, teaching_advantages, research_sources)
VALUES 
('stage2_r', 2, '/r/', '{"r"}', 16, 1.5, 'K-Spring', 1, '{"run","red","rat","car"}', '{"The red rat can run.","I run to the car."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"frequent usage","enables blends"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_g', 2, '/g/', '{"g"}', 17, 1.2, 'K-Spring', 1, '{"got","big","dog","bag"}', '{"The big dog got a bag.","I got a big bag."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"clear sound","frequent usage"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_k', 2, '/k/', '{"k","c"}', 18, 1.3, 'K-Spring', 1, '{"kit","cat","back","pick"}', '{"The cat has a kit.","I can pick the back."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"two spellings (k, c)","frequent usage"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_j', 2, '/j/', '{"j"}', 19, 1.2, 'K-Spring', 2, '{"jam","jet","jog","jump"}', '{"The jet has jam.","I can jog and jump."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"clear sound","distinctive"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_v', 2, '/v/', '{"v"}', 20, 1.3, 'K-Spring', 2, '{"van","vet","have","give"}', '{"The vet has a van.","I have a van."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"voiced pair to /f/","continuous sound"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_w', 2, '/w/', '{"w"}', 21, 1.2, 'K-Spring', 2, '{"wet","win","was","we"}', '{"We win.","I was wet."}', '{"daily": "85% accuracy", "weekly": "80% accuracy", "summative": "90% letter-sound"}', '{"lip rounding","glide sound"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_ch', 2, '/ch/', '{"ch"}', 26, 2.2, 'K-Spring', 4, '{"chip","chat","much","such"}', '{"The chip is much good.","I chat such a lot."}', '{"daily": "75% accuracy", "weekly": "70% accuracy", "summative": "80% digraph recognition"}', '{"two letters, one sound","distinctive"}', '{"Adams (1990); FCRR (2005)"}'),

('stage2_sh', 2, '/sh/', '{"sh"}', 27, 2.2, 'K-Spring', 5, '{"shop","ship","fish","dish"}', '{"The fish is in the dish.","I shop for a ship."}', '{"daily": "75% accuracy", "weekly": "70% accuracy", "summative": "80% digraph recognition"}', '{"continuous sound","visible lip rounding"}', '{"Adams (1990); FCRR (2005)"}');

-- ============================================================================
-- INSERT DIFFERENTIATION STRATEGIES
-- ============================================================================
INSERT INTO differentiation_strategies (learner_type, pace, practice_requirements, instruction_type, grouping_strategy, materials)
VALUES 
('struggling', '50% slower progression', 'Double the practice opportunities', 'Explicit multisensory instruction', 'Small group or 1:1 instruction', 'Enhanced visual and tactile supports'),
('on_level', 'Standard progression', 'Regular practice schedule', 'Whole group with targeted small group', 'Flexible grouping', 'Standard instructional materials'),
('advanced', 'Accelerated by 25-50%', 'Extension activities and enrichment', 'Independent application opportunities', 'Enrichment groups and peer tutoring', 'Advanced texts and challenge activities');

-- ============================================================================
-- INSERT SAMPLE ASSESSMENTS
-- ============================================================================
INSERT INTO phonics_assessments (stage_id, assessment_type, name, description, benchmark_criteria, passing_threshold)
VALUES 
(1, 'daily', 'Stage 1 Daily Check', 'Quick daily assessment of letter-sound correspondence', '{"consonant_sounds": "90% accuracy", "short_vowels": "85% accuracy", "cvc_blending": "80% accuracy"}', 85),
(1, 'weekly', 'Stage 1 Weekly Review', 'Comprehensive weekly assessment covering all Stage 1 phonemes', '{"letter_recognition": "95% accuracy", "sound_production": "90% accuracy", "word_reading": "85% accuracy"}', 80),
(1, 'summative', 'Stage 1 Mastery Assessment', 'Final assessment before moving to Stage 2', '{"phoneme_mastery": "95% accuracy", "cvc_fluency": "15 words per minute", "encoding_accuracy": "80% accuracy"}', 90),

(2, 'daily', 'Stage 2 Daily Check', 'Daily assessment of blends and remaining single letters', '{"new_consonants": "85% accuracy", "simple_blends": "80% accuracy", "cvcc_patterns": "75% accuracy"}', 80),
(2, 'weekly', 'Stage 2 Weekly Review', 'Weekly review of Stage 2 phonemes and patterns', '{"consonant_mastery": "90% accuracy", "blend_recognition": "85% accuracy", "pattern_reading": "80% accuracy"}', 75),
(2, 'summative', 'Stage 2 Mastery Assessment', 'Assessment before advancing to consonant digraphs', '{"single_letter_mastery": "95% accuracy", "blend_fluency": "20 words per minute", "pattern_recognition": "85% accuracy"}', 85);

-- ============================================================================
-- INSERT SAMPLE RESEARCH JUSTIFICATIONS
-- ============================================================================
INSERT INTO research_justifications (stage_id, justification_text, key_concepts, research_sources, evidence_base)
VALUES 
(1, 'Stage 1 prioritizes high-frequency consonants and short vowels based on transparent orthographic mappings and developmental appropriateness for kindergarten students.', '{"Transparent letter-sound correspondences","High-frequency phonemes","Developmental readiness","Orthographic mapping foundation"}', '[{"title": "Phases of Word Learning", "authors": "Ehri, L.C.", "year": "2005", "source": "Scientific Studies of Reading"}, {"title": "Teaching Children to Read", "authors": "National Reading Panel", "year": "2000", "source": "NIH Publication"}]', 'Research consistently shows that beginning readers benefit from explicit instruction in the most frequent and transparent letter-sound correspondences first.'),

(2, 'Stage 2 completes the single-letter foundation while introducing simple patterns, avoiding complex digraphs until students have solid phonemic awareness and letter-sound automaticity.', '{"Single-letter completion","Simple pattern introduction","Digraph delay","Phonemic awareness development"}', '[{"title": "Beginning to Read", "authors": "Adams, M.J.", "year": "1990", "source": "MIT Press"}, {"title": "The Most Common Phonograms", "authors": "Fry, E.", "year": "2004", "source": "The Reading Teacher"}]', 'Research supports completing single-letter instruction before introducing complex orthographic patterns that may confuse developing readers.');

-- ============================================================================
-- INSERT SAMPLE SCOPE AND SEQUENCE CATEGORIES
-- ============================================================================
INSERT INTO scope_sequence_categories (name, order_index, grade_levels, description, prerequisites)
VALUES 
('Phonemic Awareness', 1, '{"K","1","2"}', 'Ability to hear, identify, and manipulate individual sounds in spoken words', '{}'),
('Letter Recognition', 2, '{"K","1"}', 'Ability to identify and name letters of the alphabet', '{"Phonemic Awareness"}'),
('Letter-Sound Correspondence', 3, '{"K","1","2"}', 'Understanding that letters represent sounds', '{"Letter Recognition","Phonemic Awareness"}'),
('CVC Decoding', 4, '{"K","1"}', 'Reading consonant-vowel-consonant words', '{"Letter-Sound Correspondence"}'),
('Consonant Blends', 5, '{"K","1"}', 'Reading words with consonant clusters', '{"CVC Decoding"}'),
('Consonant Digraphs', 6, '{"1","2"}', 'Reading two-letter combinations that make one sound', '{"Consonant Blends"}'),
('Long Vowels', 7, '{"1","2"}', 'Reading words with long vowel patterns', '{"Consonant Digraphs"}'),
('Vowel Teams', 8, '{"2","3"}', 'Reading words with vowel combinations', '{"Long Vowels"}'),
('R-Controlled Vowels', 9, '{"2","3"}', 'Reading words where r affects the vowel sound', '{"Vowel Teams"}'),
('Advanced Patterns', 10, '{"3","4"}', 'Complex spelling patterns and irregular words', '{"R-Controlled Vowels"}');

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
SELECT 'Stages inserted: ' || COUNT(*) as stages_count FROM phonics_stages;
SELECT 'Phonemes inserted: ' || COUNT(*) as phonemes_count FROM phonemes;
SELECT 'Assessments inserted: ' || COUNT(*) as assessments_count FROM phonics_assessments;
SELECT 'Research justifications inserted: ' || COUNT(*) as research_count FROM research_justifications;
SELECT 'Differentiation strategies inserted: ' || COUNT(*) as diff_strategies_count FROM differentiation_strategies;
SELECT 'Scope categories inserted: ' || COUNT(*) as scope_categories_count FROM scope_sequence_categories;

SELECT 'Phonics data migration completed successfully!' as status;