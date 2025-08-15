'use client';

// Simplified audio system for Next.js compatibility
// This addresses the webpack bundling issues we encountered

let audioContext: AudioContext | null = null;
let isInitializing = false;
const activeNodes: Set<AudioNode> = new Set();

// Initialize audio context with proper browser checks and cleanup
const getAudioContext = async (): Promise<AudioContext | null> => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  // Prevent multiple simultaneous initializations
  if (isInitializing) {
    return new Promise((resolve) => {
      const checkInit = () => {
        if (!isInitializing) {
          resolve(audioContext);
        } else {
          setTimeout(checkInit, 10);
        }
      };
      checkInit();
    });
  }
  
  if (!audioContext || audioContext.state === 'closed') {
    isInitializing = true;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        isInitializing = false;
        return null;
      }
      
      audioContext = new AudioContextClass();
      
      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
    } catch (error) {
      console.error('Failed to create audio context:', error);
      audioContext = null;
    } finally {
      isInitializing = false;
    }
  }
  
  return audioContext;
};

// Cleanup function for audio nodes
const cleanupNode = (node: AudioNode) => {
  try {
    activeNodes.delete(node);
    if ('stop' in node && typeof node.stop === 'function') {
      (node as any).stop();
    }
    if ('disconnect' in node && typeof node.disconnect === 'function') {
      node.disconnect();
    }
  } catch (error) {
    // Ignore cleanup errors - node may already be disposed
  }
};

// Track and auto-cleanup audio nodes
const trackNode = (node: AudioNode, duration: number = 1000) => {
  activeNodes.add(node);
  setTimeout(() => cleanupNode(node), duration + 100);
  return node;
};

// Resume audio context if suspended
const resumeAudioContext = async (): Promise<void> => {
  const ctx = await getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (error) {
      console.error('Failed to resume audio context:', error);
    }
  }
};

// Play clear sound (bubble pop)
export const playClearSound = async (): Promise<void> => {
  try {
    const ctx = await getAudioContext();
    if (!ctx) return;
    
    await resumeAudioContext();
    
    const startTime = ctx.currentTime;
    const duration = 0.1;
    
    // Create noise buffer for pop sound
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = trackNode(ctx.createBufferSource(), duration * 1000) as AudioBufferSourceNode;
    source.buffer = buffer;
    
    // Create filter for bubble effect
    const filter = trackNode(ctx.createBiquadFilter(), duration * 1000) as BiquadFilterNode;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, startTime);
    filter.frequency.exponentialRampToValueAtTime(2000, startTime + 0.05);
    filter.Q.value = 10;
    
    // Create gain node
    const gainNode = trackNode(ctx.createGain(), duration * 1000) as GainNode;
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    // Connect nodes
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Play
    source.start(startTime);
    source.stop(startTime + duration);
    
    // Add plop sound with proper cleanup
    setTimeout(() => {
      if (ctx.state !== 'closed') {
        const plopOsc = trackNode(ctx.createOscillator(), 100) as OscillatorNode;
        const plopGain = trackNode(ctx.createGain(), 100) as GainNode;
        
        plopOsc.connect(plopGain);
        plopGain.connect(ctx.destination);
        
        plopOsc.frequency.setValueAtTime(200, ctx.currentTime);
        plopOsc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
        plopOsc.type = 'sine';
        
        plopGain.gain.setValueAtTime(0.1, ctx.currentTime);
        plopGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        plopOsc.start(ctx.currentTime);
        plopOsc.stop(ctx.currentTime + 0.1);
      }
    }, 50);
    
  } catch (error) {
    console.error('Error playing clear sound:', error);
  }
};

// Play success sound (C-E-G chord)
export const playSuccessSound = async (): Promise<void> => {
  try {
    const ctx = await getAudioContext();
    if (!ctx) return;
    
    await resumeAudioContext();
    
    const startTime = ctx.currentTime;
    
    // Create individual oscillators for each note
    const notes = [
      { freq: 523, start: 0, duration: 0.15 },     // C5
      { freq: 659, start: 0.1, duration: 0.15 },  // E5
      { freq: 784, start: 0.2, duration: 0.2 }    // G5
    ];
    
    notes.forEach(note => {
      const totalDuration = note.start + note.duration;
      const osc = trackNode(ctx.createOscillator(), totalDuration * 1000) as OscillatorNode;
      const gain = trackNode(ctx.createGain(), totalDuration * 1000) as GainNode;
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, startTime + note.start);
      
      gain.gain.setValueAtTime(0.1, startTime + note.start);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.start + note.duration);
      
      osc.start(startTime + note.start);
      osc.stop(startTime + note.start + note.duration);
    });
    
  } catch (error) {
    console.error('Error playing success sound:', error);
  }
};

// Play word list sound (F-A-C chord - different from build word sound)
export const playWordListSound = async (): Promise<void> => {
  try {
    const ctx = await getAudioContext();
    if (!ctx) return;
    
    await resumeAudioContext();
    
    const startTime = ctx.currentTime;
    
    // Create a softer, different chord for word list drops (F-A-C)
    const notes = [
      { freq: 349, start: 0, duration: 0.2 },     // F4
      { freq: 440, start: 0.05, duration: 0.2 }, // A4
      { freq: 523, start: 0.1, duration: 0.25 }  // C5
    ];
    
    notes.forEach(note => {
      const totalDuration = note.start + note.duration;
      const osc = trackNode(ctx.createOscillator(), totalDuration * 1000) as OscillatorNode;
      const gain = trackNode(ctx.createGain(), totalDuration * 1000) as GainNode;
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle'; // Different wave type for softer sound
      osc.frequency.setValueAtTime(note.freq, startTime + note.start);
      
      gain.gain.setValueAtTime(0.08, startTime + note.start); // Slightly quieter
      gain.gain.exponentialRampToValueAtTime(0.005, startTime + note.start + note.duration);
      
      osc.start(startTime + note.start);
      osc.stop(startTime + note.start + note.duration);
    });
    
  } catch (error) {
    console.error('Error playing word list sound:', error);
  }
};

// Play eraser sound (soft swoosh/scrub sound)
export const playEraserSound = async (): Promise<void> => {
  try {
    const ctx = await getAudioContext();
    if (!ctx) return;
    
    await resumeAudioContext();
    
    const startTime = ctx.currentTime;
    const duration = 0.3;
    
    // Create noise buffer for swooshing sound
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate pink noise (softer than white noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    
    const source = trackNode(ctx.createBufferSource(), duration * 1000) as AudioBufferSourceNode;
    source.buffer = buffer;
    
    // Create filter for swoosh effect
    const filter = trackNode(ctx.createBiquadFilter(), duration * 1000) as BiquadFilterNode;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, startTime);
    filter.frequency.exponentialRampToValueAtTime(500, startTime + duration);
    filter.Q.value = 1;
    
    // Create gain envelope for swoosh
    const gainNode = trackNode(ctx.createGain(), duration * 1000) as GainNode;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    // Connect nodes
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Play
    source.start(startTime);
    source.stop(startTime + duration);
    
  } catch (error) {
    console.error('Error playing eraser sound:', error);
  }
};

// Simple hook for audio in components
export const useSimpleAudio = () => {
  return {
    playClear: playClearSound,
    playSuccess: playSuccessSound,
    playWordBuilt: playSuccessSound, // Use same sound for word built
    playWordList: playWordListSound, // New sound for word list drops
    playEraser: playEraserSound, // Eraser swoosh sound
  };
};

// Check if audio is supported
export const isAudioSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.AudioContext || (window as any).webkitAudioContext);
};