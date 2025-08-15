-- Seed data for Decoding Den phoneme database
-- Initial set of core phonemes with Science of Reading-based content

-- Insert core consonant phonemes
INSERT INTO phonemes (ipa_symbol, common_name, phoneme_type, frequency_rank, is_voiced) VALUES
-- Single consonants
('/b/', 'b sound', 'consonant_single', 10, true),
('/d/', 'd sound', 'consonant_single', 8, true),
('/f/', 'f sound', 'consonant_single', 15, false),
('/g/', 'hard g', 'consonant_single', 20, true),
('/h/', 'h sound', 'consonant_single', 9, false),
('/k/', 'k sound', 'consonant_single', 11, false),
('/l/', 'l sound', 'consonant_single', 4, true),
('/m/', 'm sound', 'consonant_single', 7, true),
('/n/', 'n sound', 'consonant_single', 2, true),
('/p/', 'p sound', 'consonant_single', 16, false),
('/r/', 'r sound', 'consonant_single', 6, true),
('/s/', 's sound', 'consonant_single', 3, false),
('/t/', 't sound', 'consonant_single', 1, false),
('/v/', 'v sound', 'consonant_single', 24, true),
('/w/', 'w sound', 'consonant_single', 17, true),
('/y/', 'y sound', 'consonant_single', 21, true),
('/z/', 'z sound', 'consonant_single', 25, true),

-- Consonant digraphs
('/sh/', 'sh sound', 'consonant_digraph', 22, false),
('/ch/', 'ch sound', 'consonant_digraph', 19, false),
('/th/', 'voiceless th', 'consonant_digraph', 12, false),
('/th/', 'voiced th', 'consonant_digraph', 13, true),
('/wh/', 'wh sound', 'consonant_digraph', 26, false),
('/ng/', 'ng sound', 'consonant_digraph', 14, true),

-- Short vowels
('/æ/', 'short a', 'vowel_short', 5, true),
('/ɛ/', 'short e', 'vowel_short', 18, true),
('/ɪ/', 'short i', 'vowel_short', 23, true),
('/ɒ/', 'short o', 'vowel_short', 27, true),
('/ʌ/', 'short u', 'vowel_short', 28, true),

-- Long vowels
('/eɪ/', 'long a', 'vowel_long', 29, true),
('/i:/', 'long e', 'vowel_long', 30, true),
('/aɪ/', 'long i', 'vowel_long', 31, true),
('/oʊ/', 'long o', 'vowel_long', 32, true),
('/ju:/', 'long u', 'vowel_long', 33, true);

-- Get phoneme IDs for reference (using CTEs for clarity)
WITH phoneme_refs AS (
    SELECT id, ipa_symbol FROM phonemes
)

-- Insert grapheme mappings for /sh/ as an example
INSERT INTO grapheme_mappings (phoneme_id, grapheme, spelling_frequency, notes)
SELECT id, 'sh', 1, 'Most common spelling for /sh/ sound'
FROM phoneme_refs WHERE ipa_symbol = '/sh/';

-- Insert articulation guide for /sh/
INSERT INTO articulation_guides (
    phoneme_id,
    place_of_articulation,
    manner_of_articulation,
    voicing,
    tongue_position,
    lip_position,
    airflow_description,
    step_by_step_instructions,
    common_errors,
    teacher_tips
)
SELECT 
    id,
    'palatal-alveolar',
    'fricative',
    'unvoiced',
    'Tongue rests high, near the front of the mouth, just behind the top teeth',
    'Lips slightly rounded and protruded',
    'Continuous air flows over the tongue without vibration',
    ARRAY[
        'Step 1: Place tongue high and forward in the mouth',
        'Step 2: Round lips slightly',
        'Step 3: Push air continuously over the tongue',
        'Step 4: No vocal cord vibration - whisper the sound'
    ],
    ARRAY[
        'Substituting /s/ for /sh/ (saying "sip" instead of "ship")',
        'Adding voice (making it sound like /zh/)'
    ],
    ARRAY[
        'Use a "be quiet" gesture with finger to lips',
        'Compare to a snake hissing softly',
        'Practice with mirror to see lip rounding'
    ]
FROM phoneme_refs WHERE ipa_symbol = '/sh/';

-- Insert teaching content for /sh/
INSERT INTO teaching_content (phoneme_id, content_type, content, display_order, icon_emoji)
SELECT 
    p.id,
    tc.content_type,
    tc.content,
    tc.display_order,
    tc.icon_emoji
FROM phoneme_refs p
CROSS JOIN (VALUES
    ('explanation', '<strong>〈sh〉</strong> is a digraph. It has two letters that make one sound.', 1, '💙'),
    ('explanation', 'The /sh/ sound is unvoiced. Your vocal cords do not vibrate when it is said.', 2, '💙'),
    ('explanation', 'You can hear this sound at the beginning, middle, or end of words.', 3, '💙'),
    ('rule', 'Digraphs are two letters making one sound.', 1, '💚'),
    ('rule', 'The sh sound is commonly found at the beginning (e.g., ship), middle (e.g., wishing), and end (e.g., brush) of words.', 2, '💚'),
    ('tip', 'Use a snake-like "shhhh" motion with your finger to remind students of the quiet sound.', 1, '💛'),
    ('tip', 'Practice sound discrimination with /sh/ vs. /s/ (e.g., ship vs. sip).', 2, '💛'),
    ('tip', 'Include tactile activities like sand writing or whiteboard tracing for reinforcement.', 3, '💛')
) AS tc(content_type, content, display_order, icon_emoji)
WHERE p.ipa_symbol = '/sh/';

-- Insert sample word lists for /sh/
WITH sh_phoneme AS (
    SELECT p.id as phoneme_id, gm.id as grapheme_id
    FROM phonemes p
    JOIN grapheme_mappings gm ON p.id = gm.phoneme_id
    WHERE p.ipa_symbol = '/sh/' AND gm.grapheme = 'sh'
)
INSERT INTO word_lists (phoneme_id, grapheme_id, word, position, syllable_count, is_decodable, frequency_score)
SELECT 
    phoneme_id,
    grapheme_id,
    word,
    position,
    syllable_count,
    is_decodable,
    frequency_score
FROM sh_phoneme
CROSS JOIN (VALUES
    -- Beginning position
    ('ship', 'beginning', 1, true, 90),
    ('shop', 'beginning', 1, true, 95),
    ('shut', 'beginning', 1, true, 85),
    ('shack', 'beginning', 1, true, 70),
    ('shed', 'beginning', 1, true, 75),
    -- Medial position
    ('wishing', 'medial', 2, true, 80),
    ('pushing', 'medial', 2, true, 82),
    ('fishing', 'medial', 2, true, 88),
    ('rushing', 'medial', 2, true, 78),
    ('dishing', 'medial', 2, true, 65),
    -- Ending position
    ('brush', 'ending', 1, true, 87),
    ('crash', 'ending', 1, true, 83),
    ('flash', 'ending', 1, true, 85),
    ('clash', 'ending', 1, true, 70),
    ('splash', 'ending', 1, true, 80)
) AS words(word, position, syllable_count, is_decodable, frequency_score);

-- Insert practice sentences for /sh/
INSERT INTO practice_texts (phoneme_id, text_type, content, target_words, difficulty_level)
SELECT 
    id,
    'sentence',
    'She shut the shop.',
    ARRAY['She', 'shut', 'shop'],
    1
FROM phoneme_refs WHERE ipa_symbol = '/sh/'
UNION ALL
SELECT 
    id,
    'sentence',
    'The fish is in the dish.',
    ARRAY['fish', 'dish'],
    1
FROM phoneme_refs WHERE ipa_symbol = '/sh/'
UNION ALL
SELECT 
    id,
    'sentence',
    'I will rush to get the brush.',
    ARRAY['rush', 'brush'],
    2
FROM phoneme_refs WHERE ipa_symbol = '/sh/'
UNION ALL
SELECT 
    id,
    'story',
    'Shawn had a shiny shell. He showed it to Sheila, who gave a loud shout. "That''s the best shell I''ve ever seen!" she said. Then they made a ship from shiny sticks and let it splash in the pond.',
    ARRAY['Shawn', 'shiny', 'shell', 'showed', 'Sheila', 'shout', 'shell', 'she', 'ship', 'shiny', 'splash'],
    2
FROM phoneme_refs WHERE ipa_symbol = '/sh/';

-- Insert research citations (using approved project sources)
INSERT INTO research_citations (phoneme_id, source_name, citation_text, url, applicable_to)
VALUES
(NULL, 'National Reading Panel (2000)', 'Systematic phonics instruction significantly improves children''s reading and spelling abilities in kindergarten and first grade.', NULL, ARRAY['teaching_tips', 'word_lists', 'articulation']),
(NULL, 'Florida Center for Reading Research (2005)', 'Phoneme awareness activities should progress from easier to more difficult tasks, with explicit instruction in sound-spelling correspondences.', 'https://fcrr.org/', ARRAY['teaching_tips', 'articulation', 'word_lists']),
(NULL, 'Ehri, L.C. (2005)', 'Phases of word reading development require systematic instruction moving from partial alphabetic to full alphabetic understanding.', NULL, ARRAY['teaching_tips', 'word_lists']),
(NULL, 'Adams, M.J. (1990)', 'Beginning to Read: Most frequent, consistent consonants should be taught first, with digraphs introduced systematically.', NULL, ARRAY['teaching_tips', 'articulation']),
(NULL, 'Fry (2004)', 'Phoneme-grapheme frequency data supports optimal sequencing of phonics instruction from high-frequency to low-frequency patterns.', NULL, ARRAY['word_lists', 'teaching_tips']),
(NULL, 'Moats, L. (2020)', 'Short vowels and early consonants provide the most consistent sound-spelling mappings for beginning readers.', NULL, ARRAY['articulation', 'teaching_tips']),
(NULL, 'Castles, Rastle, & Nation (2018)', 'High-frequency, consistent sound-spelling patterns should be emphasized in early phonics instruction.', NULL, ARRAY['word_lists', 'teaching_tips']);

-- Insert common corrections
INSERT INTO phoneme_corrections (incorrect_input, correct_phoneme_id, correction_message)
SELECT 
    'digraph sh',
    id,
    'You''re absolutely right - "sh" is indeed a digraph (two letters making one sound).'
FROM phonemes WHERE ipa_symbol = '/sh/'
UNION ALL
SELECT 
    'long sh',
    id,
    'Actually, /sh/ is not a long sound — it''s a consonant digraph. Long and short typically refer to vowel sounds.'
FROM phonemes WHERE ipa_symbol = '/sh/'
UNION ALL
SELECT 
    'sh blend',
    id,
    'Actually, "sh" is a digraph, not a blend. In a digraph, two letters make one new sound. In a blend, you hear each letter''s sound.'
FROM phonemes WHERE ipa_symbol = '/sh/';