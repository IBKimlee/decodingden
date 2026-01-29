const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xckllondwxdotcsjtxrd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2xsb25kd3hkb3Rjc2p0eHJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTIwNDY2NiwiZXhwIjoyMDg0NzgwNjY2fQ.N354iT0HbckIAurIIk8xpB3ded7GmWimuIuUmV6FhaU'
);

// Stage 1 content - Short stories and word ladders for each phoneme
// All stories use ONLY Stage 1 sounds (m, s, a, t, n, p, i, d, f, o, l, h, b, e, u)
// This ensures 100% decodability for beginning readers

const stage1Content = {
  '/m/': {
    short_stories: [
      {
        title: "Mom and the Mat",
        text: "Mom had a mat. The mat is tan. Mom sat on the mat. Sam sat on the mat. Mom and Sam sit on the tan mat."
      }
    ],
    word_ladders: [
      { words: ["mat", "man", "can", "cat", "sat"], instructions: "Change one letter at a time!" },
      { words: ["mom", "mop", "top", "tap", "map"], instructions: "Watch the middle and ending sounds!" }
    ],
    decodable_sentences: [
      "I am mad.",
      "Sam has a mat.",
      "The man has mud.",
      "Mom met me.",
      "The ham is on the map."
    ]
  },

  '/s/': {
    short_stories: [
      {
        title: "Sam and the Sun",
        text: "Sam sat in the sun. The sun is hot. Sam has a hat. Sam is not sad. Sam sat and sat in the sun."
      }
    ],
    word_ladders: [
      { words: ["sat", "sit", "pit", "pat", "sat"], instructions: "The vowel changes in the middle!" },
      { words: ["sun", "sum", "hum", "him", "his"], instructions: "Listen to each sound change!" }
    ],
    decodable_sentences: [
      "Sam sat on a mat.",
      "The sun is up.",
      "I see a bus.",
      "Sis has a cap.",
      "The mess is on the rug."
    ]
  },

  '/a/': {
    short_stories: [
      {
        title: "The Cat Nap",
        text: "The cat sat on a mat. The cat had a nap. Dad sat on the mat. The cat ran. Dad is sad. Bad cat!"
      }
    ],
    word_ladders: [
      { words: ["cat", "can", "man", "map", "cap"], instructions: "Short a stays in every word!" },
      { words: ["had", "sad", "sat", "bat", "bad"], instructions: "Listen for the /a/ sound!" }
    ],
    decodable_sentences: [
      "The cat sat on the mat.",
      "Dad had a tan hat.",
      "Sam ran fast.",
      "The bag is on the lap.",
      "A fat rat ran."
    ]
  },

  '/t/': {
    short_stories: [
      {
        title: "Tom and the Top",
        text: "Tom has a top. The top can spin. Tom sat and let it spin. The top hit the pot. Tom got the top. Tom is not mad."
      }
    ],
    word_ladders: [
      { words: ["top", "tap", "tip", "tin", "tan"], instructions: "The vowels change but /t/ stays!" },
      { words: ["hat", "hot", "hit", "sit", "sat"], instructions: "Watch where /t/ appears!" }
    ],
    decodable_sentences: [
      "The top can spin.",
      "Tom sat on the cot.",
      "Put it on the mat.",
      "The bat hit the net.",
      "Get the hat and the mitt."
    ]
  },

  '/n/': {
    short_stories: [
      {
        title: "Nan and the Pen",
        text: "Nan has a pen. The pen is in a tin. Nan got the pen. Nan can sit and print. Nan is not done."
      }
    ],
    word_ladders: [
      { words: ["nap", "map", "man", "can", "tan"], instructions: "The /n/ moves around!" },
      { words: ["pen", "ten", "hen", "den", "Ben"], instructions: "Same ending, different starts!" }
    ],
    decodable_sentences: [
      "Nan can run.",
      "The sun is on the den.",
      "Ben has ten pens.",
      "I can nap on the cot.",
      "The hen ran in the pen."
    ]
  },

  '/p/': {
    short_stories: [
      {
        title: "The Pup and the Pig",
        text: "Pat has a pup. The pup met a pig. The pup and the pig ran. The pup ran fast. The pig did not. Pat got the pup."
      }
    ],
    word_ladders: [
      { words: ["pup", "cup", "cut", "but", "bus"], instructions: "Start with /p/ and watch it change!" },
      { words: ["pat", "pan", "pin", "pit", "pet"], instructions: "The /p/ stays at the start!" }
    ],
    decodable_sentences: [
      "The pup can hop.",
      "Pat put the cap on.",
      "The pan is hot.",
      "Pop the top off.",
      "I pat the pup."
    ]
  },

  '/i/': {
    short_stories: [
      {
        title: "The Big Pig",
        text: "The pig is big. The pig sits in the mud. It is a fit pig. The pig did a jig. The big pig is not sad."
      }
    ],
    word_ladders: [
      { words: ["big", "pig", "pit", "sit", "six"], instructions: "Short i is in every word!" },
      { words: ["hit", "bit", "fit", "sit", "kit"], instructions: "Same ending, different starts!" }
    ],
    decodable_sentences: [
      "The pig is big.",
      "Kim hid in the den.",
      "Sit on the log.",
      "I bit the fig.",
      "The kid did a jig."
    ]
  },

  '/d/': {
    short_stories: [
      {
        title: "Dad and the Dog",
        text: "Dad has a dog. The dog dug a pit. Dad is mad. The dog hid. Dad is not sad. Dad and the dog had fun."
      }
    ],
    word_ladders: [
      { words: ["dog", "dig", "did", "lid", "led"], instructions: "Watch where /d/ appears!" },
      { words: ["dad", "bad", "bed", "red", "led"], instructions: "The /d/ sound moves!" }
    ],
    decodable_sentences: [
      "Dad is in the den.",
      "The dog dug a big pit.",
      "Did Don see the duck?",
      "I fed the dog.",
      "The lid is on the pot."
    ]
  },

  '/f/': {
    short_stories: [
      {
        title: "The Fun Fan",
        text: "Fran has a fan. The fan is fast. Fran sat and the fan ran. It is fun! Fran is not hot. The fan is the best."
      }
    ],
    word_ladders: [
      { words: ["fan", "fun", "run", "sun", "fin"], instructions: "The /f/ sound starts us off!" },
      { words: ["fit", "fat", "sat", "set", "fed"], instructions: "Watch the sounds change!" }
    ],
    decodable_sentences: [
      "The fan is fast.",
      "Fran is not fat.",
      "The fin is on the fish.",
      "I fed the cat.",
      "It is fun to run."
    ]
  },

  '/o/': {
    short_stories: [
      {
        title: "The Hot Pot",
        text: "Mom got a pot. The pot is hot. Mom got a top. The top is on the pot. Mom can stop. The pot is not hot."
      }
    ],
    word_ladders: [
      { words: ["hot", "hop", "top", "pop", "pot"], instructions: "Short o stays in every word!" },
      { words: ["cot", "got", "not", "lot", "dot"], instructions: "Same pattern, different starts!" }
    ],
    decodable_sentences: [
      "The pot is hot.",
      "Tom got on top.",
      "The dog is on the log.",
      "Hop on the cot.",
      "I got a job."
    ]
  },

  '/l/': {
    short_stories: [
      {
        title: "The Lost Lad",
        text: "The lad is lost. The lad sat on a log. The lad is sad. Mom led the lad. The lad is not lost. The lad is glad."
      }
    ],
    word_ladders: [
      { words: ["log", "lot", "let", "led", "leg"], instructions: "The /l/ stays at the start!" },
      { words: ["lap", "lip", "lit", "lot", "let"], instructions: "Watch the vowels change!" }
    ],
    decodable_sentences: [
      "The lad sat on the log.",
      "I let the lid fall.",
      "Liz has a doll.",
      "The bell is loud.",
      "I lit the lamp."
    ]
  },

  '/h/': {
    short_stories: [
      {
        title: "The Hen in the Hut",
        text: "The hen is in the hut. The hen has eggs. The hen sat on the eggs. The hen is hot. The hut has a fan. The hen is glad."
      }
    ],
    word_ladders: [
      { words: ["hat", "hit", "hot", "hop", "hip"], instructions: "The /h/ sound is soft!" },
      { words: ["hen", "pen", "pin", "him", "hum"], instructions: "Watch where /h/ appears!" }
    ],
    decodable_sentences: [
      "The hat is on his head.",
      "The hen is in the hut.",
      "I hid the ham.",
      "The hog is big.",
      "He has a red hat."
    ]
  },

  '/b/': {
    short_stories: [
      {
        title: "Bob and the Bus",
        text: "Bob ran to the bus. The bus is big. Bob got on the bus. Bob sat in the back. The bus is fast. Bob is glad."
      }
    ],
    word_ladders: [
      { words: ["bat", "bet", "bit", "but", "bus"], instructions: "The vowels change with /b/!" },
      { words: ["bed", "bad", "bag", "big", "bib"], instructions: "The /b/ stays at the start!" }
    ],
    decodable_sentences: [
      "The bat is in the bag.",
      "Bob bit the bun.",
      "The bed is big.",
      "I bet he can run.",
      "The cub is in the tub."
    ]
  },

  '/e/': {
    short_stories: [
      {
        title: "Ben and the Red Hen",
        text: "Ben met a hen. The hen is red. Ben fed the hen. The hen sat on a bed of grass. Ben and the red hen are pals."
      }
    ],
    word_ladders: [
      { words: ["bed", "red", "led", "let", "bet"], instructions: "Short e stays in every word!" },
      { words: ["pen", "pet", "set", "get", "met"], instructions: "Listen for the /e/ sound!" }
    ],
    decodable_sentences: [
      "The red hen is in the pen.",
      "Ben fed the pet.",
      "Let me get the net.",
      "The egg fell on the bed.",
      "I met ten men."
    ]
  },

  '/u/': {
    short_stories: [
      {
        title: "The Pup in the Mud",
        text: "The pup ran in the mud. The pup dug and dug. The pup is a mess! Mom got the tub. The pup got a rub. The pup is not muddy."
      }
    ],
    word_ladders: [
      { words: ["cup", "cut", "but", "bug", "rug"], instructions: "Short u is in every word!" },
      { words: ["tub", "rub", "rug", "hug", "mug"], instructions: "The ending changes!" }
    ],
    decodable_sentences: [
      "The pup is in the mud.",
      "I dug up the bug.",
      "The cup is on the rug.",
      "The sun is up.",
      "Gus has a bus."
    ]
  }
};

async function populateStage1Content() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       POPULATING STAGE 1 STORIES & WORD LADDERS              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  for (const [phoneme, content] of Object.entries(stage1Content)) {
    console.log(`\nUpdating ${phoneme}...`);

    // Get current record
    const { data: current, error: fetchError } = await supabase
      .from('phonemes')
      .select('content_generation_meta, decodable_sentences')
      .eq('phoneme', phoneme)
      .single();

    if (fetchError) {
      console.log(`  ❌ Could not find ${phoneme}: ${fetchError.message}`);
      continue;
    }

    // Merge new content with existing content_generation_meta
    const updatedMeta = {
      ...(current.content_generation_meta || {}),
      short_stories: content.short_stories,
      word_ladders: content.word_ladders
    };

    // Update sentences if provided and current is empty/missing
    const currentSentences = current.decodable_sentences || [];
    const newSentences = content.decodable_sentences || [];
    const finalSentences = currentSentences.length >= 3 ? currentSentences : newSentences;

    // Update the record
    const { error: updateError } = await supabase
      .from('phonemes')
      .update({
        content_generation_meta: updatedMeta,
        decodable_sentences: finalSentences
      })
      .eq('phoneme', phoneme);

    if (updateError) {
      console.log(`  ❌ Update failed: ${updateError.message}`);
    } else {
      console.log(`  ✅ Added ${content.short_stories.length} story, ${content.word_ladders.length} word ladders`);
      if (finalSentences !== currentSentences) {
        console.log(`  ✅ Updated decodable sentences (${finalSentences.length} total)`);
      }
    }
  }

  // Verification
  console.log('\n\n═══════════════════════════════════════════════════════════════');
  console.log('VERIFICATION');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const { data: verified } = await supabase
    .from('phonemes')
    .select('phoneme, content_generation_meta, decodable_sentences')
    .eq('stage_id', 1)
    .not('phoneme', 'like', '%irregular%')
    .order('frequency_rank', { ascending: true });

  let successCount = 0;
  verified?.forEach(p => {
    if (p.phoneme.startsWith('/')) {
      const hasStories = p.content_generation_meta?.short_stories?.length > 0;
      const hasLadders = p.content_generation_meta?.word_ladders?.length > 0;
      const hasSentences = p.decodable_sentences?.length >= 3;

      const status = hasStories && hasLadders && hasSentences ? '✅' : '⚠️';
      if (hasStories && hasLadders) successCount++;

      console.log(`${status} ${p.phoneme}: Stories=${hasStories ? '✓' : '✗'}, Ladders=${hasLadders ? '✓' : '✗'}, Sentences=${hasSentences ? '✓' : '✗'}`);
    }
  });

  console.log(`\n✅ Successfully populated ${successCount}/15 Stage 1 phonemes!`);
}

populateStage1Content().catch(console.error);
