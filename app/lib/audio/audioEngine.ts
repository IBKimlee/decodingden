// Audio Engine - Core Web Audio API implementation
import { AudioParameters, SoundDefinition } from './types';

export class AudioEngine {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    // Server-side guard
    if (typeof window === 'undefined') {
      throw new Error('Audio engine can only be used on client side');
    }

    if (this.isInitialized && this.context?.state !== 'closed') {
      return;
    }

    try {
      // Create AudioContext with fallback for older browsers
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
      
      // Create master gain node for volume control
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      
      // Resume context if it's suspended (browser autoplay policy)
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
      throw new Error('Audio not supported in this browser');
    }
  }

  async playSound(definition: SoundDefinition, volume: number = 1): Promise<void> {
    if (!this.context || !this.masterGain || !this.isInitialized) {
      await this.initialize();
    }

    if (!this.context || !this.masterGain) {
      throw new Error('Audio engine not initialized');
    }

    try {
      const finalVolume = definition.volume * volume;
      
      switch (definition.parameters.type) {
        case 'procedural':
          await this.playProceduralSound(definition.parameters, finalVolume);
          break;
        case 'sequence':
          await this.playSequenceSound(definition.parameters, finalVolume);
          break;
        case 'file':
          await this.playFileSound(definition.parameters, finalVolume);
          break;
        default:
          console.warn('Unknown sound type:', definition.parameters.type);
      }
    } catch (error) {
      console.error('Error playing sound:', definition.id, error);
    }
  }

  private async playProceduralSound(params: AudioParameters, volume: number): Promise<void> {
    if (!this.context || !this.masterGain) return;

    const startTime = this.context.currentTime;
    
    if (params.oscillator) {
      // Simple oscillator sound
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      oscillator.type = params.oscillator.type;
      oscillator.frequency.setValueAtTime(params.oscillator.frequency as number, startTime);
      
      // Apply envelope if specified
      if (params.envelope) {
        this.applyEnvelope(gainNode, params.envelope, startTime, volume);
      } else {
        gainNode.gain.setValueAtTime(volume, startTime);
      }
      
      oscillator.start(startTime);
      oscillator.stop(startTime + params.oscillator.duration / 1000);
    }
    
    if (params.noise) {
      // Noise-based sound (like the clear sound)
      await this.playNoiseSound(params, volume, startTime);
    }
  }

  private async playSequenceSound(params: AudioParameters, volume: number): Promise<void> {
    if (!this.context || !this.masterGain || !params.sequence) return;

    const startTime = this.context.currentTime;
    
    // Create separate oscillators for each note in the sequence
    params.sequence.notes.forEach(note => {
      const oscillator = this.context!.createOscillator();
      const gainNode = this.context!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain!);
      
      oscillator.type = 'sine'; // Clean tone for musical notes
      oscillator.frequency.setValueAtTime(note.frequency, startTime + note.startTime / 1000);
      
      const noteVolume = (note.volume || 1) * volume;
      
      // Apply envelope to each note
      if (params.envelope) {
        this.applyEnvelope(gainNode, params.envelope, startTime + note.startTime / 1000, noteVolume);
      } else {
        gainNode.gain.setValueAtTime(noteVolume, startTime + note.startTime / 1000);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + (note.startTime + note.duration) / 1000);
      }
      
      oscillator.start(startTime + note.startTime / 1000);
      oscillator.stop(startTime + (note.startTime + note.duration) / 1000);
    });
  }

  private async playNoiseSound(params: AudioParameters, volume: number, startTime: number): Promise<void> {
    if (!this.context || !this.masterGain || !params.noise) return;

    // Create noise buffer
    const bufferSize = this.context.sampleRate * (params.noise.duration / 1000);
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    
    let audioNode: AudioNode = source;
    
    // Apply filter if specified
    if (params.noise.filter) {
      const filter = this.context.createBiquadFilter();
      filter.type = params.noise.filter.type;
      filter.frequency.setValueAtTime(params.noise.filter.frequency, startTime);
      if (params.noise.filter.Q) {
        filter.Q.value = params.noise.filter.Q;
      }
      
      source.connect(filter);
      audioNode = filter;
    }
    
    const gainNode = this.context.createGain();
    audioNode.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    // Apply envelope
    if (params.envelope) {
      this.applyEnvelope(gainNode, params.envelope, startTime, volume);
    } else {
      gainNode.gain.setValueAtTime(volume, startTime);
    }
    
    source.start(startTime);
    source.stop(startTime + params.noise.duration / 1000);
    
    // Add the "plop" follow-up for clear sound
    if (params.sequence) {
      setTimeout(() => {
        this.playSequenceSound(params, volume * 0.3);
      }, params.noise.duration + 50);
    }
  }

  private async playFileSound(params: AudioParameters, volume: number): Promise<void> {
    // TODO: Implement file-based audio playback for future use
    console.log('File-based audio not yet implemented:', params.file?.url);
  }

  private applyEnvelope(gainNode: GainNode, envelope: NonNullable<AudioParameters['envelope']>, startTime: number, peakVolume: number): void {
    const { attack, decay, sustain, release } = envelope;
    const attackTime = attack / 1000;
    const decayTime = decay / 1000;
    const sustainLevel = sustain * peakVolume;
    const releaseTime = release / 1000;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(peakVolume, startTime + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + attackTime + decayTime + releaseTime);
  }

  setMasterVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.context!.currentTime);
    }
  }

  getContext(): AudioContext | null {
    return this.context;
  }

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }

  destroy(): void {
    if (this.context && this.context.state !== 'closed') {
      this.context.close();
    }
    this.context = null;
    this.masterGain = null;
    this.isInitialized = false;
  }
}