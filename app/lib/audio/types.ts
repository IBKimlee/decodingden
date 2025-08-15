// Audio system types - designed for Supabase integration

export interface AudioSettings {
  id?: string;
  user_id?: string;
  master_volume: number;
  sounds_enabled: boolean;
  categories: {
    ui_feedback: boolean;
    educational: boolean;
    ambient: boolean;
    notifications: boolean;
  };
  created_at?: string;
  updated_at?: string;
}

export interface SoundDefinition {
  id: string;
  name: string;
  category: 'ui_feedback' | 'educational' | 'ambient' | 'notifications';
  description: string;
  volume: number;
  duration: number;
  parameters: AudioParameters;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AudioParameters {
  type: 'procedural' | 'file' | 'sequence';
  // For procedural sounds
  oscillator?: {
    type: 'sine' | 'square' | 'sawtooth' | 'triangle';
    frequency: number | number[];
    duration: number;
  };
  // For noise-based sounds
  noise?: {
    type: 'white' | 'pink' | 'brown';
    duration: number;
    filter?: {
      type: 'lowpass' | 'highpass' | 'bandpass';
      frequency: number;
      Q?: number;
    };
  };
  // For file-based sounds (future)
  file?: {
    url: string;
    format: 'mp3' | 'wav' | 'ogg';
  };
  // For sequences (chords, melodies)
  sequence?: {
    notes: Array<{
      frequency: number;
      startTime: number;
      duration: number;
      volume?: number;
    }>;
  };
  // Common envelope
  envelope?: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
}

export interface AudioContextState {
  context: AudioContext | null;
  isInitialized: boolean;
  isSupported: boolean;
  error: string | null;
}

export interface AudioHookReturn {
  playSound: (soundId: string, options?: { volume?: number }) => Promise<void>;
  settings: AudioSettings;
  updateSettings: (settings: Partial<AudioSettings>) => Promise<void>;
  isPlaying: boolean;
  error: string | null;
  initializeAudio: () => Promise<void>;
}