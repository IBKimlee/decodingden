// Sound Registry - Supabase-ready sound definitions
import { SoundDefinition } from './types';

// This will eventually be loaded from Supabase, but starts as static config
export const SOUND_REGISTRY: Record<string, SoundDefinition> = {
  // UI Feedback Sounds
  'ui_clear': {
    id: 'ui_clear',
    name: 'Clear Action',
    category: 'ui_feedback',
    description: 'Bubble pop sound for clearing content',
    volume: 0.3,
    duration: 200, // milliseconds
    enabled: true,
    parameters: {
      type: 'procedural',
      noise: {
        type: 'white',
        duration: 100,
        filter: {
          type: 'bandpass',
          frequency: 1000,
          Q: 10
        }
      },
      sequence: {
        notes: [
          // Pop sound with frequency sweep
          { frequency: 1000, startTime: 0, duration: 50, volume: 0.3 },
          { frequency: 2000, startTime: 50, duration: 50, volume: 0.1 },
          // Follow-up plop
          { frequency: 200, startTime: 100, duration: 100, volume: 0.1 }
        ]
      },
      envelope: {
        attack: 0,
        decay: 50,
        sustain: 0.1,
        release: 100
      }
    }
  },

  'ui_success': {
    id: 'ui_success',
    name: 'Success Action',
    category: 'ui_feedback',
    description: 'Success chime for completed actions (C-E-G chord)',
    volume: 0.15,
    duration: 500,
    enabled: true,
    parameters: {
      type: 'sequence',
      sequence: {
        notes: [
          // C major chord progression
          { frequency: 523, startTime: 0, duration: 150, volume: 0.1 },   // C5
          { frequency: 659, startTime: 100, duration: 150, volume: 0.1 }, // E5
          { frequency: 784, startTime: 200, duration: 200, volume: 0.1 }  // G5
        ]
      },
      envelope: {
        attack: 10,
        decay: 100,
        sustain: 0.8,
        release: 200
      }
    }
  },

  'ui_button_press': {
    id: 'ui_button_press',
    name: 'Button Press',
    category: 'ui_feedback',
    description: 'Simple confirmation sound for button presses',
    volume: 0.1,
    duration: 100,
    enabled: true,
    parameters: {
      type: 'procedural',
      oscillator: {
        type: 'triangle',
        frequency: 600,
        duration: 100
      },
      envelope: {
        attack: 0,
        decay: 50,
        sustain: 0.5,
        release: 50
      }
    }
  },

  // Educational Sounds
  'edu_phoneme_correct': {
    id: 'edu_phoneme_correct',
    name: 'Phoneme Correct',
    category: 'educational',
    description: 'Positive feedback for correct phoneme identification',
    volume: 0.2,
    duration: 300,
    enabled: true,
    parameters: {
      type: 'sequence',
      sequence: {
        notes: [
          { frequency: 440, startTime: 0, duration: 100, volume: 0.15 },   // A4
          { frequency: 554, startTime: 100, duration: 100, volume: 0.15 }, // C#5
          { frequency: 659, startTime: 200, duration: 100, volume: 0.2 }   // E5
        ]
      },
      envelope: {
        attack: 5,
        decay: 50,
        sustain: 0.7,
        release: 100
      }
    }
  },

  'edu_word_built': {
    id: 'edu_word_built',
    name: 'Word Built Successfully',
    category: 'educational',
    description: 'Celebration sound when a word is successfully built',
    volume: 0.2,
    duration: 600,
    enabled: true,
    parameters: {
      type: 'sequence',
      sequence: {
        notes: [
          // Triumphant ascending melody
          { frequency: 523, startTime: 0, duration: 150, volume: 0.15 },   // C5
          { frequency: 659, startTime: 150, duration: 150, volume: 0.15 }, // E5
          { frequency: 784, startTime: 300, duration: 150, volume: 0.2 },  // G5
          { frequency: 1047, startTime: 450, duration: 150, volume: 0.15 } // C6
        ]
      },
      envelope: {
        attack: 10,
        decay: 50,
        sustain: 0.8,
        release: 200
      }
    }
  },

  // Ambient Sounds (for future use)
  'ambient_forest': {
    id: 'ambient_forest',
    name: 'Forest Ambience',
    category: 'ambient',
    description: 'Subtle forest sounds for background atmosphere',
    volume: 0.05,
    duration: -1, // continuous
    enabled: false, // disabled by default
    parameters: {
      type: 'file', // Future: will load from audio files
      file: {
        url: '/audio/forest_ambient.ogg',
        format: 'ogg'
      }
    }
  }
};

// Default audio settings - matches Supabase schema
export const DEFAULT_AUDIO_SETTINGS = {
  master_volume: 0.8,
  sounds_enabled: true,
  categories: {
    ui_feedback: true,
    educational: true,
    ambient: false,
    notifications: true
  }
};

// Helper functions for future Supabase integration
export const getSoundsByCategory = (category: SoundDefinition['category']): SoundDefinition[] => {
  return Object.values(SOUND_REGISTRY).filter(sound => sound.category === category);
};

export const getEnabledSounds = (): SoundDefinition[] => {
  return Object.values(SOUND_REGISTRY).filter(sound => sound.enabled);
};

// Future: Load from Supabase
export const loadSoundsFromDatabase = async (): Promise<Record<string, SoundDefinition>> => {
  // TODO: Implement Supabase integration
  // const { data, error } = await supabase.from('sound_definitions').select('*');
  // return data?.reduce((acc, sound) => ({ ...acc, [sound.id]: sound }), {}) || {};
  return SOUND_REGISTRY;
};

// Future: Save user settings to Supabase
export const saveAudioSettings = async (userId: string, settings: any): Promise<void> => {
  // TODO: Implement Supabase integration
  // await supabase.from('user_audio_settings').upsert({ user_id: userId, ...settings });
  console.log('Audio settings would be saved to Supabase:', { userId, settings });
};