'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AudioEngine } from './audioEngine';
import { SOUND_REGISTRY, DEFAULT_AUDIO_SETTINGS, saveAudioSettings } from './soundRegistry';
import { AudioSettings, AudioHookReturn, SoundDefinition } from './types';

// Global audio engine instance (singleton pattern)
let globalAudioEngine: AudioEngine | null = null;

export const useAudio = (userId?: string): AudioHookReturn => {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const playingCountRef = useRef(0);

  // Initialize audio engine
  const initializeAudio = useCallback(async () => {
    // Server-side guard
    if (typeof window === 'undefined') {
      return;
    }

    if (audioEngineRef.current) {
      return;
    }

    // Check if audio is supported
    if (!new AudioEngine().isSupported()) {
      return;
    }

    try {
      // Use global instance or create new one
      if (!globalAudioEngine) {
        globalAudioEngine = new AudioEngine();
      }
      
      audioEngineRef.current = globalAudioEngine;
      await audioEngineRef.current.initialize();
      
      // Set initial master volume
      audioEngineRef.current.setMasterVolume(settings.master_volume);
      
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize audio';
      setError(errorMessage);
      console.error('Audio initialization failed:', err);
    }
  }, [settings.master_volume]);

  // Play sound function
  const playSound = useCallback(async (soundId: string, options?: { volume?: number }) => {
    // Check if sounds are globally disabled
    if (!settings.sounds_enabled) {
      return;
    }

    const soundDef = SOUND_REGISTRY[soundId];
    if (!soundDef) {
      console.warn('Sound not found in registry:', soundId);
      return;
    }

    // Check if this sound category is enabled
    if (!settings.categories[soundDef.category]) {
      return;
    }

    // Check if this specific sound is enabled
    if (!soundDef.enabled) {
      return;
    }

    // Initialize audio if needed
    if (!audioEngineRef.current) {
      await initializeAudio();
    }

    if (!audioEngineRef.current) {
      console.warn('Audio engine not available');
      return;
    }

    try {
      playingCountRef.current++;
      setIsPlaying(true);
      
      const volume = options?.volume ?? 1;
      await audioEngineRef.current.playSound(soundDef, volume);
      
      // Clean up playing state after sound duration
      setTimeout(() => {
        playingCountRef.current = Math.max(0, playingCountRef.current - 1);
        if (playingCountRef.current === 0) {
          setIsPlaying(false);
        }
      }, soundDef.duration > 0 ? soundDef.duration : 1000);
      
    } catch (err) {
      console.error('Error playing sound:', soundId, err);
      playingCountRef.current = Math.max(0, playingCountRef.current - 1);
      if (playingCountRef.current === 0) {
        setIsPlaying(false);
      }
    }
  }, [settings, initializeAudio]);

  // Update settings function
  const updateSettings = useCallback(async (newSettings: Partial<AudioSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Update master volume if changed
    if (newSettings.master_volume !== undefined && audioEngineRef.current) {
      audioEngineRef.current.setMasterVolume(newSettings.master_volume);
    }
    
    // Save to Supabase if user is logged in
    if (userId) {
      try {
        await saveAudioSettings(userId, updatedSettings);
      } catch (err) {
        console.error('Failed to save audio settings:', err);
      }
    } else {
      // Save to localStorage as fallback
      localStorage.setItem('decodingden_audio_settings', JSON.stringify(updatedSettings));
    }
  }, [settings, userId]);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (userId) {
          // TODO: Load from Supabase
          // const { data } = await supabase
          //   .from('user_audio_settings')
          //   .select('*')
          //   .eq('user_id', userId)
          //   .single();
          // if (data) setSettings(data);
        } else {
          // Load from localStorage
          const stored = localStorage.getItem('decodingden_audio_settings');
          if (stored) {
            try {
              const parsedSettings = JSON.parse(stored);
              setSettings({ ...DEFAULT_AUDIO_SETTINGS, ...parsedSettings });
            } catch (err) {
              console.error('Failed to parse stored audio settings:', err);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load audio settings:', err);
      }
    };

    loadSettings();
  }, [userId]);

  // Auto-initialize on first interaction (handles browser autoplay policies)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isInitialized) {
        initializeAudio();
      }
    };

    // Listen for first user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [isInitialized, initializeAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't destroy global engine, other components might be using it
      // Only clean up local references
      audioEngineRef.current = null;
    };
  }, []);

  return {
    playSound,
    settings,
    updateSettings,
    isPlaying,
    error,
    initializeAudio
  };
};

// Utility hook for simple sound playing (most common use case)
export const useSimpleAudio = () => {
  const { playSound } = useAudio();
  
  return {
    playClick: () => playSound('ui_button_press'),
    playClear: () => playSound('ui_clear'),
    playSuccess: () => playSound('ui_success'),
    playWordBuilt: () => playSound('edu_word_built'),
    playPhonemeCorrect: () => playSound('edu_phoneme_correct'),
    playSound // For custom sounds
  };
};

// Export for global access if needed
export const getGlobalAudioEngine = () => globalAudioEngine;