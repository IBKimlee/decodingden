import { NextRequest, NextResponse } from 'next/server';
import {
  STAGE_PHONEME_SAMPLES,
  EIGHT_STAGE_SYSTEM,
  type PhonemeEntry,
  type StageInfo,
} from '@/app/data/allStagesDatabase';

interface StoryRequestBody {
  phoneme_input?: string;
}

interface GeneratedStory {
  title: string;
  sentences: string[];
  full_text: string;
  focus_words: string[];
  stage: StageInfo | null;
  stage_number: number;
  phoneme_display: string;
}

const ALIAS_MAP: Record<string, string> = {
  'short a': '/a/',
  'short e': '/e/',
  'short i': '/i/',
  'short o': '/o/',
  'short u': '/u/',
  'long a': '/ā/',
  'long e': '/ē/',
  'long i': '/ī/',
  'long o': '/ō/',
  'long u': '/ū/',
  'digraph sh': '/sh/',
  'digraph ch': '/ch/',
  'digraph th': '/th/',
  'voiced th': '/TH/',
  'th voiced': '/TH/',
  'digraph wh': '/wh/',
  'digraph ph': '/ph/',
  'digraph ng': '/ng/',
  'r controlled ar': '/ar/',
  'r-controlled ar': '/ar/',
  'r controlled er': '/er/',
  'r-controlled er': '/er/',
  'r controlled or': '/or/',
  'r-controlled or': '/or/',
  'diphthong oi': '/oi/',
  'diphthong oy': '/oi/',
  'diphthong ou': '/ou/',
  'diphthong ow': '/ou/',
  'blend bl': '/bl/',
  'blend st': '/st/',
  'blend gr': '/gr/',
  'blend fl': '/fl/',
  'blend tr': '/tr/',
};

const CHARACTER_PAIR: [string, string] = ['Sam', 'Meg'];
const FALLBACK_WORDS = ['mat', 'bag', 'den'];
const IRREGULAR_VERB_MAP: Record<string, string> = {
  sat: 'sit',
  had: 'have',
  hid: 'hide',
  did: 'do',
  ran: 'run',
  met: 'meet',
  got: 'get',
  felt: 'feel',
  left: 'leave',
  made: 'make',
  rode: 'ride',
  sang: 'sing',
  told: 'tell',
  swam: 'swim',
  saw: 'see',
  came: 'come',
  went: 'go',
  read: 'read',
};
const SURFACE_WORDS = ['mat', 'rug', 'log', 'rock', 'sand', 'path', 'deck', 'hill', 'pad', 'dock'];
const COZY_PLACE_WORDS = ['den', 'hut', 'home', 'tent', 'camp', 'barn', 'cabin', 'nest', 'room', 'house'];

function normalizeInput(value: string): string {
  return value.trim().toLowerCase();
}

function formatPhonemeDisplay(entry: PhonemeEntry): string {
  return entry.phoneme;
}

function findPhonemeEntry(rawInput: string): PhonemeEntry | null {
  if (!rawInput) return null;

  const normalized = normalizeInput(rawInput);

  const aliasMatch = ALIAS_MAP[normalized];
  const searchTargets = new Set<string>();

  if (aliasMatch) {
    searchTargets.add(aliasMatch);
  }

  const cleaned = normalized.replace(/^\/|\/$/g, '');
  searchTargets.add(`/${cleaned}/`);
  searchTargets.add(cleaned);

  for (const target of searchTargets) {
    const directMatch = STAGE_PHONEME_SAMPLES.find((entry) => entry.phoneme.toLowerCase() === target);
    if (directMatch) return directMatch;
  }

  for (const target of searchTargets) {
    const graphemeMatch = STAGE_PHONEME_SAMPLES.find((entry) =>
      entry.graphemes.some((grapheme) => grapheme.toLowerCase() === target.replace(/^\/|\/$/g, ''))
    );
    if (graphemeMatch) return graphemeMatch;
  }

  for (const target of searchTargets) {
    const idMatch = STAGE_PHONEME_SAMPLES.find((entry) => entry.phoneme_id.toLowerCase() === target.replace(/\s+/g, '_'));
    if (idMatch) return idMatch;
  }

  return null;
}

function isLikelyVerb(word: string): boolean {
  const lower = word.toLowerCase();
  if (IRREGULAR_VERB_MAP[lower]) return true;
  if (lower.endsWith('ing') || lower.endsWith('ed')) return true;
  const verbPrefixes = ['wash', 'wish', 'push', 'teach', 'paint', 'bring', 'rush', 'march', 'turn'];
  if (verbPrefixes.some((prefix) => lower.startsWith(prefix))) return true;
  return false;
}

function uniqueWords(words: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const word of words) {
    const trimmed = word?.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(trimmed);
    }
  }
  return unique;
}

function formatVerbForSentence(verb: string): string {
  const lower = verb.toLowerCase();
  if (IRREGULAR_VERB_MAP[lower]) {
    return IRREGULAR_VERB_MAP[lower];
  }
  if (lower.endsWith('ing')) {
    return lower.slice(0, -3);
  }
  if (lower.endsWith('ed')) {
    return lower.slice(0, -2);
  }
  return lower;
}

function articleFor(word: string): string {
  const first = word?.[0]?.toLowerCase() ?? '';
  return ['a', 'e', 'i', 'o', 'u'].includes(first) ? 'an' : 'a';
}

function isSurfaceWord(word: string): boolean {
  const lower = word.toLowerCase();
  return SURFACE_WORDS.some((surface) => lower === surface || lower.endsWith(surface));
}

function isCozyWord(word: string): boolean {
  const lower = word.toLowerCase();
  return COZY_PLACE_WORDS.some((place) => lower === place || lower.endsWith(place));
}

function buildCohesiveNarrative(entry: PhonemeEntry) {
  const words = uniqueWords(entry.word_examples ?? []);
  const nouns = words.filter((word) => !isLikelyVerb(word));
  const verbs = words.filter(isLikelyVerb);

  const nounPool = [...nouns];
  for (const fallback of FALLBACK_WORDS) {
    if (!nounPool.some((word) => word.toLowerCase() === fallback)) {
      nounPool.push(fallback);
    }
  }

  const objectA = nounPool[0] ?? FALLBACK_WORDS[0];
  const lowerA = objectA.toLowerCase();

  let objectB =
    nounPool.find((word) => word.toLowerCase() !== lowerA) ??
    FALLBACK_WORDS.find((word) => word !== objectA) ??
    FALLBACK_WORDS[1];
  const lowerB = objectB.toLowerCase();

  let restSpot =
    nounPool.find((word) => {
      const lower = word.toLowerCase();
      if (lower === lowerA || lower === lowerB) return false;
      return isCozyWord(word) || isSurfaceWord(word);
    }) ??
    (isCozyWord(objectA) ? objectA : FALLBACK_WORDS[2]);

  const lowerRest = restSpot.toLowerCase();
  if (lowerRest === lowerA || lowerRest === lowerB) {
    restSpot = isCozyWord(objectB) && lowerB !== lowerA ? objectB : FALLBACK_WORDS[2];
  }

  const verb = verbs[0] ?? null;

  const [characterA, characterB] = CHARACTER_PAIR;
  const sentences: string[] = [];

  sentences.push(`${characterA} has ${articleFor(objectA)} ${objectA}.`);

  if (lowerB !== lowerA) {
    sentences.push(`${characterB} puts ${articleFor(objectB)} ${objectB} on the ${objectA}.`);
  } else {
    sentences.push(`${characterB} pats the ${objectA}.`);
  }

  const actionPreposition = isSurfaceWord(objectA) ? 'on' : 'with';
  if (verb) {
    const simpleVerb = formatVerbForSentence(verb);
    const actionTarget = actionPreposition === 'on' ? `on the ${objectA}` : `with the ${objectA}`;
    sentences.push(`${characterA} and ${characterB} ${simpleVerb} ${actionTarget}.`);
  } else if (actionPreposition === 'on') {
    const extraTarget = lowerB !== lowerA ? ` with the ${objectB}` : '';
    sentences.push(`${characterA} and ${characterB} play on the ${objectA}${extraTarget}.`);
  } else {
    const extraTarget = lowerB !== lowerA ? ` and the ${objectB}` : '';
    sentences.push(`${characterA} and ${characterB} play with the ${objectA}${extraTarget}.`);
  }

  const restPreposition = isSurfaceWord(restSpot) ? 'on' : 'in';
  sentences.push(`${characterA} and ${characterB} rest ${restPreposition} the ${restSpot}.`);

  const focusWords = uniqueWords([objectA, objectB, restSpot]);

  return { sentences, focusWords };
}

function generateStory(entry: PhonemeEntry): GeneratedStory {
  const stageInfo = EIGHT_STAGE_SYSTEM.find((stage) => stage.stage_number === entry.stage) ?? null;
  const narrative = buildCohesiveNarrative(entry);
  const sentences = narrative.sentences.length > 0 ? narrative.sentences : ['Sam has fun practicing.'];
  const fullText = sentences.join(' ');

  return {
    title: `Story Circle: ${formatPhonemeDisplay(entry)}`,
    sentences,
    full_text: fullText,
    focus_words: narrative.focusWords.slice(0, 6),
    stage: stageInfo ?? null,
    stage_number: entry.stage,
    phoneme_display: formatPhonemeDisplay(entry),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: StoryRequestBody = await request.json();
    const phonemeInput = body.phoneme_input?.trim();

    if (!phonemeInput) {
      return NextResponse.json({ error: 'Please enter a sound, blend, or digraph.' }, { status: 400 });
    }

    const phonemeEntry = findPhonemeEntry(phonemeInput);

    if (!phonemeEntry) {
      return NextResponse.json(
        {
          error: 'Sorry, I could not find that sound yet.',
          suggestions: [
            'Try typing /sh/, /ch/, /a/, /ē/, or /ar/',
            'Use names like "short a", "long o", or "digraph sh"',
            'Check for extra spaces or spelling',
          ],
        },
        { status: 404 }
      );
    }

    const story = generateStory(phonemeEntry);

    return NextResponse.json({
      success: true,
      story,
      stage: story.stage,
    });
  } catch (error) {
    console.error('Error generating student story:', error);
    return NextResponse.json(
      { error: 'Something went wrong while creating the story. Please try again.' },
      { status: 500 }
    );
  }
}
