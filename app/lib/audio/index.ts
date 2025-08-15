// Main audio system exports
export { useAudio, useSimpleAudio, getGlobalAudioEngine } from './useAudio';
export { AudioEngine } from './audioEngine';
export { SOUND_REGISTRY, DEFAULT_AUDIO_SETTINGS, getSoundsByCategory, getEnabledSounds } from './soundRegistry';
export type { 
  AudioSettings, 
  SoundDefinition, 
  AudioParameters, 
  AudioContextState, 
  AudioHookReturn 
} from './types';

// Convenience exports for common use cases
export const AUDIO_CATEGORIES = {
  UI_FEEDBACK: 'ui_feedback' as const,
  EDUCATIONAL: 'educational' as const,
  AMBIENT: 'ambient' as const,
  NOTIFICATIONS: 'notifications' as const,
};

export const COMMON_SOUNDS = {
  CLEAR: 'ui_clear',
  SUCCESS: 'ui_success',
  BUTTON_PRESS: 'ui_button_press',
  WORD_BUILT: 'edu_word_built',
  PHONEME_CORRECT: 'edu_phoneme_correct',
} as const;