const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xckllondwxdotcsjtxrd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2xsb25kd3hkb3Rjc2p0eHJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTIwNDY2NiwiZXhwIjoyMDg0NzgwNjY2fQ.N354iT0HbckIAurIIk8xpB3ded7GmWimuIuUmV6FhaU'
);

const missingPhonemes = [
  {
    phoneme_id: "stage1_b",
    stage_id: 1,
    phoneme: "/b/",
    graphemes: ["b", "bb"],
    frequency_rank: 13,
    complexity_score: 1.0,
    grade_band: "K-Fall",
    introduction_week: 6,
    word_examples: ["bat", "bit", "bad", "tab", "tub", "cub", "bib", "bed", "bus", "rub"],
    decodable_sentences: [
      "The bat is bad.",
      "I can bat.",
      "Bob has a big bat.",
      "The cub is in the tub.",
      "I put the bib on the bed."
    ],
    assessment_criteria: {
      daily: "90% accuracy in phoneme production",
      weekly: "85% accuracy in word reading",
      summative: "95% letter-sound correspondence"
    },
    teaching_advantages: [
      "visible articulation",
      "voiced pair to /p/",
      "lips together, easy to see"
    ],
    research_sources: [
      "Ehri (2005)",
      "NRP (2000)",
      "McLeod & Crowe (2018)"
    ],
    articulation_data: {
      place: "bilabial",
      manner: "stop",
      airflow: "oral",
      voicing: "voiced",
      referral_age: 4,
      student_tips: "Put your lips together like /p/, but turn your voice on. Feel the buzz in your throat.",
      acquisition_age: "3",
      teacher_guidance: "Compare to /p/ - same lip position, but /b/ is voiced. Use hand on throat to feel vibration.",
      articulation_cues: "👄 Lips together, then pop apart. 🗣️ Voiced - feel the buzz!",
      development_notes: "Early developing sound. Voiced counterpart to /p/. Should be mastered by age 3-4.",
      typical_age_range: "2–3",
      common_substitutions: ["/p/", "omission"],
      related_sounds_to_check: ["/p/", "/d/", "/g/"]
    },
    instructional_sequence: {
      rule: "Use 'b' to spell /b/ at the start or end of a syllable",
      notes: "Most common spelling of /b/. Double 'bb' appears in middle of words like 'rabbit'.",
      usage_label: "Primary",
      syllable_context: "Appears at the beginning or end of words like 'bat', 'tub'"
    },
    assessment_framework_details: {
      summative_assessment: {
        spelling: "80% accuracy on 5 /b/ words",
        transfer: "Uses /b/ knowledge in new words",
        word_reading: "90% accuracy on 10 /b/ words"
      },
      formative_assessments: [
        {
          type: "daily_quick_check",
          criterion: "Produces /b/ sound in isolation",
          frequency: "daily"
        },
        {
          type: "word_reading",
          criterion: "Reads 5 CVC words with /b/",
          frequency: "every 2-3 days"
        }
      ]
    },
    differentiation_protocols: {
      english_learners: {
        visual_supports: "Picture cards, mouth position charts",
        oral_language_emphasis: "Vocabulary development with /b/ words",
        cultural_considerations: [
          "Some languages don't distinguish /b/ and /p/",
          "Spanish speakers may need extra practice"
        ],
        native_language_connections: true
      },
      advanced_learners: {
        enrichment: "Word study comparing /b/ and /p/ minimal pairs",
        acceleration: "Move to blends (bl-, br-)",
        complexity_increase: "Multisyllabic words with /b/"
      },
      struggling_learners: {
        additional_practice: "Mirror work to see lip position, hand on throat for voicing",
        progress_monitoring: "Daily data collection",
        intervention_triggers: [
          "Below 70% accuracy after 1 week",
          "Confusing /b/ with /p/"
        ],
        multisensory_emphasis: true
      }
    },
    linguistic_properties_extended: {
      morphological_role: ["initial", "medial", "final"],
      syllable_positions: ["onset", "coda"],
      coarticulation_effects: "Rounded before rounded vowels",
      frequency_distribution: {
        final: 20,
        medial: 25,
        initial: 55
      },
      phonological_neighbors: ["/p/", "/d/", "/m/"]
    },
    weekly_data_override: [
      {
        tips: "Compare /b/ to /p/. Same mouth position, different voicing.",
        week: 6,
        stage: 1,
        assessment: "Daily quick check: /b/ sound production and contrast with /p/",
        focus_words: ["bat", "bad", "bed", "bib", "bus"],
        decodable_text: "Bob has a bat. The bat is bad. Bob is not sad."
      }
    ],
    content_generation_meta: {
      ai_keyword: "bat",
      example_words: ["bat", "bad", "bed", "bib", "bus", "tub", "cub"],
      word_families: ["-ab", "-ub", "-ib", "-ob"],
      context_sentences: "Generated based on decodability requirements",
      difficulty_progression: ["CVC", "CVCC", "CCVC", "multisyllabic"]
    }
  },
  {
    phoneme_id: "stage2_ch",
    stage_id: 2,
    phoneme: "/ch/",
    graphemes: ["ch", "tch"],
    frequency_rank: 26,
    complexity_score: 2.2,
    grade_band: "K-Spring",
    introduction_week: 4,
    word_examples: ["chip", "chat", "much", "such", "chop", "chin", "rich", "catch", "match", "pitch"],
    decodable_sentences: [
      "The chip is in the bag.",
      "I chat with Chad.",
      "Much of the lunch is on the bench.",
      "Catch the ball, then pitch it back.",
      "The rich man has a big ranch."
    ],
    assessment_criteria: {
      daily: "75% accuracy in phoneme production",
      weekly: "70% accuracy in word reading",
      summative: "80% digraph recognition"
    },
    teaching_advantages: [
      "two letters, one sound",
      "distinctive affricate",
      "common in everyday words"
    ],
    research_sources: [
      "Adams (1990)",
      "FCRR (2005)",
      "Moats (2020)"
    ],
    articulation_data: {
      place: "palatal",
      manner: "affricate",
      airflow: "oral",
      voicing: "voiceless",
      referral_age: 5,
      student_tips: "Start with your tongue behind your top teeth like /t/, then slide into /sh/. It's like a sneeze: 'ah-CHOO!'",
      acquisition_age: "4-5",
      teacher_guidance: "Teach as combination of /t/ + /sh/. Use visual of train sound 'choo-choo'. Common substitution is /sh/ alone.",
      articulation_cues: "👄 Tongue tip up, then release with air. 🚂 Think: choo-choo train!",
      development_notes: "Affricate sound combining stop and fricative. Later developing than simple stops.",
      typical_age_range: "3.5–5",
      common_substitutions: ["/sh/", "/t/"],
      related_sounds_to_check: ["/sh/", "/j/", "/t/"]
    },
    instructional_sequence: {
      rule: "Use 'ch' at the beginning of words and after long vowels. Use 'tch' after short vowels.",
      notes: "'ch' is a digraph - two letters making one sound. 'tch' follows short vowels (catch, match, pitch).",
      usage_label: "Primary",
      syllable_context: "Appears at beginning (chip, chat) and end (much, rich) of syllables"
    },
    assessment_framework_details: {
      summative_assessment: {
        spelling: "75% accuracy on 5 /ch/ words (including tch pattern)",
        transfer: "Uses /ch/ knowledge in new words",
        word_reading: "85% accuracy on 10 /ch/ words"
      },
      formative_assessments: [
        {
          type: "daily_quick_check",
          criterion: "Produces /ch/ sound in isolation",
          frequency: "daily"
        },
        {
          type: "digraph_recognition",
          criterion: "Identifies 'ch' as one sound in 5 words",
          frequency: "every 2-3 days"
        },
        {
          type: "spelling_pattern",
          criterion: "Correctly uses 'ch' vs 'tch' in 4 words",
          frequency: "weekly"
        }
      ]
    },
    differentiation_protocols: {
      english_learners: {
        visual_supports: "Picture cards, digraph chart, train imagery",
        oral_language_emphasis: "/ch/ is not in all languages - explicit instruction needed",
        cultural_considerations: [
          "Spanish speakers may substitute /sh/",
          "Some Asian languages lack this sound"
        ],
        native_language_connections: true
      },
      advanced_learners: {
        enrichment: "Word study: 'ch' can also say /k/ (school) or /sh/ (chef)",
        acceleration: "Move to comparison with /j/ (voiced counterpart)",
        complexity_increase: "Multisyllabic words: chocolate, champion, children"
      },
      struggling_learners: {
        additional_practice: "Break down as /t/ + /sh/. Practice slowly then blend.",
        progress_monitoring: "Daily data collection on digraph recognition",
        intervention_triggers: [
          "Below 60% accuracy after 1 week",
          "Consistently substituting /sh/"
        ],
        multisensory_emphasis: true
      }
    },
    linguistic_properties_extended: {
      morphological_role: ["initial", "final"],
      syllable_positions: ["onset", "coda"],
      coarticulation_effects: "Minimal - fairly stable articulation",
      frequency_distribution: {
        final: 45,
        medial: 10,
        initial: 45
      },
      phonological_neighbors: ["/sh/", "/j/", "/t/"]
    },
    weekly_data_override: [
      {
        tips: "Use 'choo-choo' train as anchor. Teach 'ch' and 'tch' spelling rule explicitly.",
        week: 4,
        stage: 2,
        assessment: "Daily quick check: /ch/ digraph recognition",
        focus_words: ["chip", "chat", "chin", "much", "such", "catch"],
        decodable_text: "Chad has a chip. The chip is on the bench. Much of the lunch is in the bag."
      }
    ],
    content_generation_meta: {
      ai_keyword: "chip",
      example_words: ["chip", "chat", "chin", "chop", "much", "such", "rich", "catch", "match"],
      word_families: ["-atch", "-itch", "-unch", "-inch"],
      context_sentences: "Generated based on decodability requirements",
      difficulty_progression: ["CVC-digraph", "CVCC", "blends+digraph", "multisyllabic"]
    }
  }
];

async function addMissingPhonemes() {
  console.log('Adding missing phonemes to Supabase...\n');

  for (const phoneme of missingPhonemes) {
    console.log(`Inserting ${phoneme.phoneme}...`);

    const { data, error } = await supabase
      .from('phonemes')
      .insert(phoneme)
      .select();

    if (error) {
      console.log(`  ❌ Error: ${error.message}`);

      // If it's a duplicate, try to update instead
      if (error.code === '23505') {
        console.log(`  Attempting update instead...`);
        const { data: updateData, error: updateError } = await supabase
          .from('phonemes')
          .update(phoneme)
          .eq('phoneme', phoneme.phoneme)
          .select();

        if (updateError) {
          console.log(`  ❌ Update also failed: ${updateError.message}`);
        } else {
          console.log(`  ✅ Updated successfully!`);
        }
      }
    } else {
      console.log(`  ✅ Inserted successfully!`);
    }
  }

  console.log('\n--- Verification ---\n');

  // Verify the insertions
  const { data: verification } = await supabase
    .from('phonemes')
    .select('phoneme, phoneme_id, stage_id, graphemes')
    .in('phoneme', ['/b/', '/ch/']);

  if (verification && verification.length > 0) {
    verification.forEach(p => {
      console.log(`${p.phoneme}: Stage ${p.stage_id}, Graphemes: ${p.graphemes.join(', ')}`);
    });
    console.log(`\n✅ All ${verification.length} phonemes verified in database!`);
  } else {
    console.log('❌ Verification failed - phonemes not found');
  }
}

addMissingPhonemes().catch(console.error);
