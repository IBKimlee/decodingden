'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeButton from '@/app/components/HomeButton';
import ActivityCompletion from '@/app/components/ActivityCompletion';

interface DrawingTool {
  type: 'pen' | 'highlighter' | 'eraser';
  color: string;
  size: number;
  effect?: 'rainbow' | 'glitter' | 'glow' | 'fire' | 'crystal' | 'bubble' | 'neon';
}

export default function MagicWhiteboardPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eraserNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>({
    type: 'pen',
    color: '#FF6B35',
    size: 5,
    effect: undefined
  });
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMascot, setSelectedMascot] = useState('mixed');
  const [showWritingToolsDropdown, setShowWritingToolsDropdown] = useState(false);
  const [eraserDragging, setEraserDragging] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });
  const eraserShelfRef = useRef<HTMLDivElement>(null);
  const [eraserSoundTimeout, setEraserSoundTimeout] = useState<NodeJS.Timeout | null>(null);
  const [eraserReturning, setEraserReturning] = useState(false);
  const eraserGainNodeRef = useRef<GainNode | null>(null);
  const lastEraserPosRef = useRef({ x: 0, y: 0 });
  
  // Stroke-based undo/redo system
  const [strokes, setStrokes] = useState<any[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<any[]>([]);
  const [currentStroke, setCurrentStroke] = useState<any>(null);
  const [eraserUsed, setEraserUsed] = useState(false);
  
  // Special effect tracking
  const rainbowHueRef = useRef(0);
  const lastRainbowPosRef = useRef({ x: 0, y: 0 });
  const lastBubblePosRef = useRef({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas background to white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      // Remove listener after first interaction
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // Load selected mascot from localStorage
  useEffect(() => {
    const savedMascot = localStorage.getItem('selectedMascot');
    if (savedMascot) {
      setSelectedMascot(savedMascot);
    }
    
    // Load sound preference from localStorage
    const savedSoundPref = localStorage.getItem('whiteboardSoundsEnabled');
    if (savedSoundPref !== null) {
      setSoundsEnabled(savedSoundPref === 'true');
    }
  }, []);

  // Save sound preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('whiteboardSoundsEnabled', soundsEnabled.toString());
  }, [soundsEnabled]);

  // Cleanup effect to stop eraser sound
  useEffect(() => {
    return () => {
      // Stop eraser sound on unmount
      if (eraserNoiseRef.current) {
        try {
          eraserNoiseRef.current.stop();
        } catch (error) {
          // Ignore if already stopped
        }
        eraserNoiseRef.current = null;
      }
      // Clear any timeouts
      if (eraserSoundTimeout) {
        clearTimeout(eraserSoundTimeout);
      }
    };
  }, [eraserSoundTimeout]);

  // Stop eraser sound when tool changes
  useEffect(() => {
    if (currentTool.type !== 'eraser' && eraserNoiseRef.current) {
      try {
        eraserNoiseRef.current.stop();
      } catch (error) {
        // Ignore if already stopped
      }
      eraserNoiseRef.current = null;
    }
  }, [currentTool.type]);

  // Color palette with fun names
  const colors = [
    { name: 'Sunset Orange', color: '#FF6B35' },
    { name: 'Ocean Blue', color: '#0EA5E9' },
    { name: 'Forest Green', color: '#228B22' },
    { name: 'Honey Gold', color: '#FFB347' },
    { name: 'Bubblegum Pink', color: '#EC4899' },
    { name: 'Moonlight Purple', color: '#7C3AED' },
    { name: 'Dragon Red', color: '#FF4500' },
    { name: 'Emerald Magic', color: '#10B981' },
    { name: 'Crystal Blue', color: '#00CED1' },
    { name: 'Fire Orange', color: '#FF8C00' },
    { name: 'Berry Red', color: '#DC143C' },
    { name: 'Midnight Black', color: '#1E293B' }
  ];

  const playSound = (sound: string) => {
    if (!soundsEnabled) {
      console.log('Sounds disabled, not playing:', sound);
      return;
    }
    
    console.log('Playing sound:', sound, 'soundsEnabled:', soundsEnabled);
    
    // Create audio context and play procedural sounds
    try {
      // Reuse existing audio context or create a new one
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        console.log('Creating new audio context');
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      console.log('Audio context state:', audioContext.state);
      
      // Resume context if it's suspended (happens in some browsers due to autoplay policies)
      if (audioContext.state === 'suspended') {
        console.log('Audio context suspended, attempting to resume...');
        audioContext.resume().then(() => {
          console.log('Audio context resumed successfully');
        }).catch(err => {
          console.warn('Failed to resume audio context:', err);
        });
      }
      
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      
      // Different sounds for different actions
      switch (sound) {
        case 'start_draw':
          if (currentTool.type === 'eraser') {
            // Eraser - continuous scratchy sound using looping noise
            const noise = audioContext.createBufferSource();
            const buffer = audioContext.createBuffer(2, audioContext.sampleRate * 2, audioContext.sampleRate);
            
            // Create stereo white noise for richer sound
            for (let channel = 0; channel < 2; channel++) {
              const data = buffer.getChannelData(channel);
              for (let i = 0; i < buffer.length; i++) {
                data[i] = Math.random() * 2 - 1;
              }
            }
            
            noise.buffer = buffer;
            noise.loop = true; // Loop the noise continuously
            
            // Filter the noise to make it scratchy
            const filter = audioContext.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, audioContext.currentTime);
            filter.Q.value = 2;
            
            // Add another filter for texture
            const filter2 = audioContext.createBiquadFilter();
            filter2.type = 'bandpass';
            filter2.frequency.setValueAtTime(2000, audioContext.currentTime);
            filter2.Q.value = 1;
            
            noise.connect(filter);
            filter.connect(filter2);
            filter2.connect(gainNode);
            
            gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
            
            noise.start(audioContext.currentTime);
            eraserNoiseRef.current = noise; // Store reference to stop later
            return; // Skip the oscillator for eraser
          } else if (currentTool.effect === 'rainbow') {
            // Rainbow pen - magical ascending musical scale
            const frequencies = [523, 587, 659, 698, 784]; // C-D-E-F-G major scale
            frequencies.forEach((freq, index) => {
              const osc = audioContext.createOscillator();
              const oscGain = audioContext.createGain();
              osc.connect(oscGain);
              oscGain.connect(audioContext.destination);
              
              osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.05);
              osc.type = 'sine';
              oscGain.gain.setValueAtTime(0.03, audioContext.currentTime + index * 0.05);
              oscGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * 0.05 + 0.2);
              
              osc.start(audioContext.currentTime + index * 0.05);
              osc.stop(audioContext.currentTime + index * 0.05 + 0.2);
            });
          } else if (currentTool.effect === 'glitter') {
            // Glitter - sparkly bell cascade
            for (let i = 0; i < 5; i++) {
              const osc = audioContext.createOscillator();
              const oscGain = audioContext.createGain();
              osc.connect(oscGain);
              oscGain.connect(audioContext.destination);
              
              const freq = 800 + Math.random() * 800; // Random high frequencies
              osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.02);
              osc.type = 'triangle';
              oscGain.gain.setValueAtTime(0.02, audioContext.currentTime + i * 0.02);
              oscGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * 0.02 + 0.15);
              
              osc.start(audioContext.currentTime + i * 0.02);
              osc.stop(audioContext.currentTime + i * 0.02 + 0.15);
            }
          } else if (currentTool.effect === 'fire') {
            // Fire - crackling and popping sounds
            const crackle = audioContext.createBufferSource();
            const crackleBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
            const crackleData = crackleBuffer.getChannelData(0);
            
            // Generate crackling noise
            for (let i = 0; i < crackleBuffer.length; i++) {
              crackleData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.1));
            }
            
            crackle.buffer = crackleBuffer;
            const crackleFilter = audioContext.createBiquadFilter();
            crackleFilter.type = 'lowpass';
            crackleFilter.frequency.setValueAtTime(800, audioContext.currentTime);
            
            crackle.connect(crackleFilter);
            crackleFilter.connect(gainNode);
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            
            crackle.start(audioContext.currentTime);
          } else if (currentTool.effect === 'crystal') {
            // Crystal - pure crystal chime with harmonics
            const fundamentalFreq = 1000;
            const harmonics = [1, 2, 3, 4, 5];
            
            harmonics.forEach((harmonic) => {
              const osc = audioContext.createOscillator();
              const oscGain = audioContext.createGain();
              osc.connect(oscGain);
              oscGain.connect(audioContext.destination);
              
              osc.frequency.setValueAtTime(fundamentalFreq * harmonic, audioContext.currentTime);
              osc.type = 'sine';
              const volume = 0.03 / (harmonic * 2); // Decreasing volume for higher harmonics
              oscGain.gain.setValueAtTime(volume, audioContext.currentTime);
              oscGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
              
              osc.start(audioContext.currentTime);
              osc.stop(audioContext.currentTime + 0.8);
            });
          } else if (currentTool.effect === 'glow') {
            // Glow - warm humming sound
            const osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.frequency.setValueAtTime(220, audioContext.currentTime); // Warm low A
            osc.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.4); // Rise to higher A
            osc.type = 'sine';
            gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.6);
          } else if (currentTool.effect === 'bubble') {
            // Bubble - bubbly water sounds
            for (let i = 0; i < 8; i++) {
              const osc = audioContext.createOscillator();
              const oscGain = audioContext.createGain();
              osc.connect(oscGain);
              oscGain.connect(audioContext.destination);
              
              const freq = 300 + Math.random() * 200; // Random bubble frequencies
              osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.03);
              osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioContext.currentTime + i * 0.03 + 0.1);
              osc.type = 'sine';
              oscGain.gain.setValueAtTime(0.02, audioContext.currentTime + i * 0.03);
              oscGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * 0.03 + 0.15);
              
              osc.start(audioContext.currentTime + i * 0.03);
              osc.stop(audioContext.currentTime + i * 0.03 + 0.15);
            }
          } else if (currentTool.effect === 'neon') {
            // Neon - electric glow with softer edge
            const osc1 = audioContext.createOscillator();
            const osc2 = audioContext.createOscillator();
            const oscGain1 = audioContext.createGain();
            const oscGain2 = audioContext.createGain();
            
            osc1.connect(oscGain1);
            osc2.connect(oscGain2);
            oscGain1.connect(audioContext.destination);
            oscGain2.connect(audioContext.destination);
            
            osc1.frequency.setValueAtTime(150, audioContext.currentTime); // Electric hum
            osc2.frequency.setValueAtTime(450, audioContext.currentTime); // Higher harmonic
            osc1.type = 'triangle'; // Less aggressive than sawtooth
            osc2.type = 'sine'; // Much softer than square
            
            oscGain1.gain.setValueAtTime(0.03, audioContext.currentTime); // Keep original volume
            oscGain2.gain.setValueAtTime(0.02, audioContext.currentTime); // Keep original volume
            oscGain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            oscGain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            
            osc1.start(audioContext.currentTime);
            osc2.start(audioContext.currentTime);
            osc1.stop(audioContext.currentTime + 0.3);
            osc2.stop(audioContext.currentTime + 0.3);
          } else if (currentTool.type === 'highlighter') {
            // Highlighter - gentle marker sound
            const osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.frequency.setValueAtTime(600, audioContext.currentTime); // Slightly lower than original
            osc.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.25);
            osc.type = 'triangle'; // Softer than square but keep volume
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime); // Keep original volume
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.25);
          } else {
            // Basic pen - gentle pencil scratch
            const osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.frequency.setValueAtTime(400, audioContext.currentTime);
            osc.type = 'triangle';
            gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.2);
          }
          break;
          
        case 'clear':
          // Bubble pop sound for clearing
          const noise = audioContext.createBufferSource();
          const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
          const data = buffer.getChannelData(0);
          
          // Create noise burst for pop
          for (let i = 0; i < buffer.length; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          
          noise.buffer = buffer;
          
          // Create filter for bubble sound
          const filter = audioContext.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1000, audioContext.currentTime);
          filter.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.05);
          filter.Q.value = 10;
          
          // Connect noise through filter
          noise.connect(filter);
          filter.connect(gainNode);
          
          // Quick pop envelope
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          noise.start(audioContext.currentTime);
          noise.stop(audioContext.currentTime + 0.1);
          
          // Add a little "plop" at the end
          setTimeout(() => {
            const plopOscillator = audioContext.createOscillator();
            const plopGain = audioContext.createGain();
            plopOscillator.connect(plopGain);
            plopGain.connect(audioContext.destination);
            
            plopOscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            plopOscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
            plopOscillator.type = 'sine';
            plopGain.gain.setValueAtTime(0.1, audioContext.currentTime);
            plopGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            plopOscillator.start(audioContext.currentTime);
            plopOscillator.stop(audioContext.currentTime + 0.1);
          }, 50);
          break;
          
        case 'save':
          // Success chime for saving
          const saveOscillator = audioContext.createOscillator();
          saveOscillator.connect(gainNode);
          saveOscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
          saveOscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
          saveOscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
          saveOscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          saveOscillator.start(audioContext.currentTime);
          saveOscillator.stop(audioContext.currentTime + 0.5);
          break;
          
        case 'tool_select':
          // Tool selection boop
          const toolOscillator = audioContext.createOscillator();
          toolOscillator.connect(gainNode);
          toolOscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          toolOscillator.type = 'triangle';
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          toolOscillator.start(audioContext.currentTime);
          toolOscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'eraser_start':
          // Eraser scratchy sound
          if (!audioContextRef.current) {
            audioContextRef.current = audioContext;
          }
          
          const eraserNoise = audioContext.createBufferSource();
          const eraserBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 2, audioContext.sampleRate);
          
          // Create stereo white noise for richer sound
          for (let channel = 0; channel < 2; channel++) {
            const eraserData = eraserBuffer.getChannelData(channel);
            for (let i = 0; i < eraserBuffer.length; i++) {
              eraserData[i] = Math.random() * 2 - 1;
            }
          }
          
          eraserNoise.buffer = eraserBuffer;
          eraserNoise.loop = true; // Loop the noise continuously
          
          // Filter the noise to make it scratchy
          const eraserFilter = audioContext.createBiquadFilter();
          eraserFilter.type = 'highpass';
          eraserFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
          eraserFilter.Q.value = 2;
          
          // Add another filter for texture
          const eraserFilter2 = audioContext.createBiquadFilter();
          eraserFilter2.type = 'bandpass';
          eraserFilter2.frequency.setValueAtTime(2000, audioContext.currentTime);
          eraserFilter2.Q.value = 1;
          
          eraserNoise.connect(eraserFilter);
          eraserFilter.connect(eraserFilter2);
          eraserFilter2.connect(gainNode);
          
          // Start with silence
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          
          // Store gain node reference for dynamic control
          eraserGainNodeRef.current = gainNode;
          
          eraserNoise.start(audioContext.currentTime);
          eraserNoiseRef.current = eraserNoise; // Store reference to stop later
          break;
          
        case 'stop_draw':
          // No sound for stop drawing
          break;
          
        default:
          // No sound for unknown actions
          break;
      }
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log(`🔊 ${sound} sound effect`);
    }
  };

  const getCanvasCoordinates = (event: { clientX: number; clientY: number }, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    playSound('start_draw');
    
    const { x, y } = getCanvasCoordinates(event, canvas);
    
    // Initialize special effect starting positions
    lastRainbowPosRef.current = { x, y };
    lastBubblePosRef.current = { x, y };
    
    // Start new stroke
    const newStroke = {
      tool: { ...currentTool },
      points: [{ x, y }],
      timestamp: Date.now()
    };
    setCurrentStroke(newStroke);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke) {
      // Save completed stroke to strokes array
      setStrokes(prev => [...prev, currentStroke]);
      setRedoStrokes([]); // Clear redo stack when new stroke is added
      setCurrentStroke(null);
    }
    
    setIsDrawing(false);
    
    // Stop the continuous eraser sound if it's playing
    if (eraserNoiseRef.current) {
      try {
        eraserNoiseRef.current.stop();
      } catch (error) {
        // Ignore if already stopped
      }
      eraserNoiseRef.current = null;
    }
    
    // Clear gain node reference
    eraserGainNodeRef.current = null;
    
    // Play stop sound for other tools (not eraser)
    if (currentTool.type !== 'eraser') {
      playSound('stop_draw');
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { x, y } = getCanvasCoordinates(event, canvas);
    
    // Add point to current stroke
    if (currentStroke) {
      setCurrentStroke({
        ...currentStroke,
        points: [...currentStroke.points, { x, y }]
      });
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up drawing context based on current tool
    if (currentTool.type === 'eraser') {
      ctx.lineWidth = currentTool.size * 2; // Make eraser twice as big
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.lineWidth = currentTool.size;
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Apply special effects
    switch (currentTool.effect) {
      case 'rainbow':
        drawRainbow(ctx, x, y);
        break;
      case 'glitter':
        drawGlitter(ctx, x, y);
        break;
      case 'fire':
        drawFire(ctx, x, y);
        break;
      case 'crystal':
        drawCrystal(ctx, x, y);
        break;
      case 'glow':
        drawGlow(ctx, x, y);
        break;
      case 'bubble':
        drawBubble(ctx, x, y);
        break;
      case 'neon':
        drawNeon(ctx, x, y);
        break;
      default:
        // Regular drawing
        if (currentTool.type === 'highlighter') {
          ctx.globalAlpha = 0.01; // Extremely subtle, 75% lighter than before
          ctx.globalCompositeOperation = 'source-over'; // Normal blending for transparency
          ctx.lineWidth = currentTool.size * 4; // Make highlighter even wider
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        } else {
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.strokeStyle = currentTool.color;
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Reset for highlighter
        if (currentTool.type === 'highlighter') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
        }
        break;
    }
  };

  const drawRainbow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Increment hue for much faster color changes over very short distances
    rainbowHueRef.current = (rainbowHueRef.current + 8) % 360;
    
    // Use HSL directly for pure rainbow colors with slight blur for smoothness
    ctx.strokeStyle = `hsl(${rainbowHueRef.current}, 100%, 50%)`;
    ctx.lineWidth = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = `hsl(${rainbowHueRef.current}, 100%, 50%)`;
    ctx.shadowBlur = 2; // Add slight blur for smoother appearance
    
    // Draw smooth continuous line without visible segment breaks
    if (lastRainbowPosRef.current.x !== 0 || lastRainbowPosRef.current.y !== 0) {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    
    // Reset shadow for other drawing operations
    ctx.shadowBlur = 0;
    
    // Update last position
    lastRainbowPosRef.current = { x, y };
  };

  const drawGlitter = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.strokeStyle = currentTool.color;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Add permanent sparkles that stay on the canvas
    for (let i = 0; i < 7; i++) {
      let sparkleX, sparkleY;
      
      if (i < 3) {
        // Sparkles close to or on the line (smaller spread)
        sparkleX = x + (Math.random() - 0.5) * 8;
        sparkleY = y + (Math.random() - 0.5) * 8;
      } else {
        // Sparkles around the line (wider spread)
        sparkleX = x + (Math.random() - 0.5) * 22;
        sparkleY = y + (Math.random() - 0.5) * 22;
      }
      
      // Save current state
      ctx.save();
      
      // Draw permanent sparkle
      ctx.fillStyle = '#FFD700';
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillRect(sparkleX, sparkleY, 2, 2);
      
      // Restore state
      ctx.restore();
    }
  };

  const drawFire = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const fireColors = ['#FF4500', '#FF6600', '#FF8800', '#FFAA00'];
    fireColors.forEach((color, index) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(currentTool.size - index * 2, 1);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x + (Math.random() - 0.5) * 3, y + (Math.random() - 0.5) * 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    });
  };

  const drawCrystal = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.strokeStyle = currentTool.color;
    ctx.lineWidth = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 10;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawGlow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.strokeStyle = currentTool.color;
    ctx.lineWidth = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = currentTool.color;
    ctx.shadowBlur = 15;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawBubble = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Draw the main stroke with proper continuity
    ctx.strokeStyle = currentTool.color;
    ctx.lineWidth = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Only draw if we have a valid last position (not the first point)
    if (lastBubblePosRef.current.x !== 0 || lastBubblePosRef.current.y !== 0) {
      ctx.beginPath();
      ctx.moveTo(lastBubblePosRef.current.x, lastBubblePosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    // Update last position
    lastBubblePosRef.current = { x, y };
    
    // Add realistic bubbles with shadows and shine
    for (let i = 0; i < 7; i++) {
      const bubbleX = x + (Math.random() - 0.5) * 30;
      const bubbleY = y + (Math.random() - 0.5) * 30;
      const bubbleSize = Math.random() * 6 + 1.5;
      
      // Bubble shadow (draw first, behind bubble)
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.arc(bubbleX + 2, bubbleY + 2, bubbleSize, 0, 2 * Math.PI);
      ctx.fill();
      
      // Bubble body with gradient effect
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#87CEEB';
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, 2 * Math.PI);
      ctx.fill();
      
      // Bubble outline
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = '#4682B4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Bubble shine/highlight
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(bubbleX - bubbleSize * 0.3, bubbleY - bubbleSize * 0.3, bubbleSize * 0.3, 0, 2 * Math.PI);
      ctx.fill();
      
      // Smaller shine dot
      ctx.fillStyle = '#F0F8FF';
      ctx.beginPath();
      ctx.arc(bubbleX - bubbleSize * 0.2, bubbleY - bubbleSize * 0.2, bubbleSize * 0.15, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Reset alpha
    ctx.globalAlpha = 1;
  };

  const drawNeon = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Draw multiple layers for neon effect - dark center, bright edges
    const baseSize = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Outer glow layer (brightest)
    ctx.strokeStyle = currentTool.color;
    ctx.shadowColor = currentTool.color;
    ctx.shadowBlur = 20;
    ctx.lineWidth = baseSize + 8;
    ctx.globalAlpha = 0.3;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Middle layer
    ctx.shadowBlur = 10;
    ctx.lineWidth = baseSize + 4;
    ctx.globalAlpha = 0.6;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Inner dark core
    ctx.shadowBlur = 0;
    ctx.lineWidth = Math.max(baseSize - 2, 1);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#1a1a1a'; // Dark center
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Reset settings
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  // Touch support for mobile devices
  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    playSound('start_draw');
    
    const touch = event.touches[0];
    const { x, y } = getCanvasCoordinates(touch, canvas);
    
    // Initialize special effect starting positions
    lastRainbowPosRef.current = { x, y };
    lastBubblePosRef.current = { x, y };
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const touch = event.touches[0];
    const { x, y } = getCanvasCoordinates(touch, canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up drawing context based on current tool
    if (currentTool.type === 'eraser') {
      ctx.lineWidth = currentTool.size * 2; // Make eraser twice as big
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.lineWidth = currentTool.size;
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Apply special effects (same logic as mouse draw)
    switch (currentTool.effect) {
      case 'rainbow':
        drawRainbow(ctx, x, y);
        break;
      case 'glitter':
        drawGlitter(ctx, x, y);
        break;
      case 'fire':
        drawFire(ctx, x, y);
        break;
      case 'crystal':
        drawCrystal(ctx, x, y);
        break;
      case 'glow':
        drawGlow(ctx, x, y);
        break;
      case 'bubble':
        drawBubble(ctx, x, y);
        break;
      case 'neon':
        drawNeon(ctx, x, y);
        break;
      default:
        if (currentTool.type === 'highlighter') {
          ctx.globalAlpha = 0.2;
          ctx.globalCompositeOperation = 'overlay';
          ctx.lineWidth = currentTool.size * 3; // Make highlighter wider
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        } else {
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.strokeStyle = currentTool.color;
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Reset for highlighter
        if (currentTool.type === 'highlighter') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
        }
        break;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    stopDrawing();
  };

  // Eraser drag functionality
  const handleEraserMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setEraserDragging(true);
    setEraserPosition({ x: e.clientX, y: e.clientY });
    lastEraserPosRef.current = { x: e.clientX, y: e.clientY };
    
    // Delay sound by 0.5 seconds to let user carry it to whiteboard
    const timeout = setTimeout(() => {
      playSound('eraser_start');
    }, 500);
    setEraserSoundTimeout(timeout);
    
    const handleMouseMove = (e: MouseEvent) => {
      setEraserPosition({ x: e.clientX, y: e.clientY });
      checkEraserCollision(e.clientX, e.clientY);
      
      // Calculate movement speed for sound modulation
      if (eraserGainNodeRef.current) {
        const dx = e.clientX - lastEraserPosRef.current.x;
        const dy = e.clientY - lastEraserPosRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Map speed to volume (0 to 0.05)
        const targetVolume = Math.min(speed * 0.002, 0.05);
        
        // Smooth volume transition
        eraserGainNodeRef.current.gain.exponentialRampToValueAtTime(
          Math.max(targetVolume, 0.001), // Never go to absolute 0
          audioContextRef.current ? audioContextRef.current.currentTime + 0.1 : 0
        );
        
        lastEraserPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    const handleMouseUp = () => {
      setEraserDragging(false);
      setEraserUsed(false); // Reset eraser flag
      animateEraserHome();
      
      // Clear sound timeout if still pending
      if (eraserSoundTimeout) {
        clearTimeout(eraserSoundTimeout);
        setEraserSoundTimeout(null);
      }
      
      // Stop eraser sound
      if (eraserNoiseRef.current) {
        try {
          eraserNoiseRef.current.stop();
        } catch (error) {
          // Ignore if already stopped
        }
        eraserNoiseRef.current = null;
      }
      
      // Clear gain node reference
      eraserGainNodeRef.current = null;
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleEraserTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setEraserDragging(true);
    setEraserPosition({ x: touch.clientX, y: touch.clientY });
    lastEraserPosRef.current = { x: touch.clientX, y: touch.clientY };
    
    // Delay sound by 0.5 seconds to let user carry it to whiteboard
    const timeout = setTimeout(() => {
      playSound('eraser_start');
    }, 500);
    setEraserSoundTimeout(timeout);
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setEraserPosition({ x: touch.clientX, y: touch.clientY });
      checkEraserCollision(touch.clientX, touch.clientY);
      
      // Calculate movement speed for sound modulation
      if (eraserGainNodeRef.current) {
        const dx = touch.clientX - lastEraserPosRef.current.x;
        const dy = touch.clientY - lastEraserPosRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Map speed to volume (0 to 0.05)
        const targetVolume = Math.min(speed * 0.002, 0.05);
        
        // Smooth volume transition
        eraserGainNodeRef.current.gain.exponentialRampToValueAtTime(
          Math.max(targetVolume, 0.001), // Never go to absolute 0
          audioContextRef.current ? audioContextRef.current.currentTime + 0.1 : 0
        );
        
        lastEraserPosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    
    const handleTouchEnd = () => {
      setEraserDragging(false);
      setEraserUsed(false); // Reset eraser flag
      animateEraserHome();
      
      // Clear sound timeout if still pending
      if (eraserSoundTimeout) {
        clearTimeout(eraserSoundTimeout);
        setEraserSoundTimeout(null);
      }
      
      // Stop eraser sound
      if (eraserNoiseRef.current) {
        try {
          eraserNoiseRef.current.stop();
        } catch (error) {
          // Ignore if already stopped
        }
        eraserNoiseRef.current = null;
      }
      
      // Clear gain node reference
      eraserGainNodeRef.current = null;
      
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const checkEraserCollision = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const isOverCanvas = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    
    if (isOverCanvas) {
      // Mark eraser as used on first use
      if (!eraserUsed) {
        setEraserUsed(true);
      }
      
      const canvasX = (x - rect.left) * (canvas.width / rect.width);
      const canvasY = (y - rect.top) * (canvas.height / rect.height);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const animateEraserHome = () => {
    setEraserReturning(true);
    
    // Get the shelf position
    if (eraserShelfRef.current) {
      const rect = eraserShelfRef.current.getBoundingClientRect();
      const homeX = rect.left + rect.width / 2;
      const homeY = rect.top + 8; // 8px from top like the shelf eraser
      setEraserPosition({ x: homeX, y: homeY + 16 }); // +16 to center vertically
    }
    
    // Let CSS handle the animation, then hide after animation completes
    setTimeout(() => {
      setEraserReturning(false);
      setEraserPosition({ x: 0, y: 0 });
    }, 700);
  };

  // Get cursor style based on current tool
  const getCursorStyle = () => {
    if (currentTool.effect === 'rainbow') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'8\' fill=\'url(%23rainbow)\'/%3E%3Cdefs%3E%3ClinearGradient id=\'rainbow\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'0%25\'%3E%3Cstop offset=\'0%25\' stop-color=\'%23ff0000\'/%3E%3Cstop offset=\'16.66%25\' stop-color=\'%23ff8000\'/%3E%3Cstop offset=\'33.33%25\' stop-color=\'%23ffff00\'/%3E%3Cstop offset=\'50%25\' stop-color=\'%2300ff00\'/%3E%3Cstop offset=\'66.66%25\' stop-color=\'%230000ff\'/%3E%3Cstop offset=\'83.33%25\' stop-color=\'%234b0082\'/%3E%3Cstop offset=\'100%25\' stop-color=\'%239400d3\'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E") 12 12, crosshair';
    } else if (currentTool.effect === 'glitter') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'6\' fill=\'%23ec4899\'/%3E%3Ctext x=\'12\' y=\'16\' text-anchor=\'middle\' font-size=\'12\'%3E✨%3C/text%3E%3C/svg%3E") 12 12, crosshair';
    } else if (currentTool.effect === 'fire') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'6\' fill=\'%23ff4500\'/%3E%3Ctext x=\'12\' y=\'16\' text-anchor=\'middle\' font-size=\'12\'%3E🔥%3C/text%3E%3C/svg%3E") 12 12, crosshair';
    } else if (currentTool.effect === 'crystal') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'6\' fill=\'%237c3aed\' stroke=\'%2300ffff\' stroke-width=\'2\'/%3E%3Ctext x=\'12\' y=\'16\' text-anchor=\'middle\' font-size=\'12\'%3E💎%3C/text%3E%3C/svg%3E") 12 12, crosshair';
    } else if (currentTool.type === 'eraser') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'4\' y=\'8\' width=\'16\' height=\'10\' fill=\'%23ffc0cb\' stroke=\'%23000\' stroke-width=\'1\'/%3E%3Crect x=\'4\' y=\'6\' width=\'16\' height=\'4\' fill=\'%23c0c0c0\' stroke=\'%23000\' stroke-width=\'1\'/%3E%3C/svg%3E") 12 12, crosshair';
    } else if (currentTool.type === 'highlighter') {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'6\' y=\'2\' width=\'4\' height=\'20\' fill=\'' + encodeURIComponent(currentTool.color) + '\' opacity=\'0.5\'/%3E%3Crect x=\'5\' y=\'1\' width=\'6\' height=\'4\' fill=\'%23ffff00\'/%3E%3C/svg%3E") 12 12, crosshair';
    } else {
      return 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'' + (currentTool.size / 2 + 2) + '\' fill=\'' + encodeURIComponent(currentTool.color) + '\'/%3E%3C/svg%3E") 12 12, crosshair';
    }
  };

  // Redraw canvas from strokes array
  const redrawCanvas = (strokesArray: any[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas and set white background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw each stroke
    strokesArray.forEach(stroke => {
      if (stroke.points.length === 0) return;
      
      const tool = stroke.tool;
      let lastRainbowHueLocal = 0;
      let lastBubbleXLocal = 0;
      let lastBubbleYLocal = 0;
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      stroke.points.forEach((point: any, index: number) => {
        if (index === 0) return;
        
        // Set up drawing context based on tool
        if (tool.type === 'eraser') {
          ctx.lineWidth = tool.size * 2;
          ctx.globalCompositeOperation = 'destination-out';
        } else {
          ctx.lineWidth = tool.size;
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Apply special effects
        if (tool.effect === 'rainbow') {
          lastRainbowHueLocal = (lastRainbowHueLocal + 8) % 360;
          ctx.strokeStyle = `hsl(${lastRainbowHueLocal}, 100%, 50%)`;
          ctx.shadowColor = `hsl(${lastRainbowHueLocal}, 100%, 50%)`;
          ctx.shadowBlur = 2;
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.shadowBlur = 0;
        } else if (tool.effect === 'bubble') {
          ctx.strokeStyle = tool.color;
          if (lastBubbleXLocal !== 0 || lastBubbleYLocal !== 0) {
            ctx.beginPath();
            ctx.moveTo(lastBubbleXLocal, lastBubbleYLocal);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
          lastBubbleXLocal = point.x;
          lastBubbleYLocal = point.y;
        } else if (tool.type === 'highlighter') {
          ctx.globalAlpha = 0.01;
          ctx.globalCompositeOperation = 'source-over';
          ctx.lineWidth = tool.size * 4;
          ctx.strokeStyle = tool.color;
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = tool.color;
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      });
      
      // Reset context
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear all strokes
        setStrokes([]);
        setRedoStrokes([]);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        playSound('clear');
      }
    }
  };

  const saveDrawing = () => {
    playSound('save');
    alert('🎨 Your masterpiece has been saved to your treasure gallery! ✨');
  };

  // Stroke-based undo/redo functions
  const undo = () => {
    if (strokes.length === 0) return;
    
    // Move last stroke from strokes to redo
    const lastStroke = strokes[strokes.length - 1];
    setRedoStrokes(prev => [lastStroke, ...prev]);
    setStrokes(prev => prev.slice(0, -1));
    
    // Redraw canvas without the last stroke
    redrawCanvas(strokes.slice(0, -1));
    
    playSound('tool_select');
  };

  const redo = () => {
    if (redoStrokes.length === 0) return;
    
    // Move first stroke from redo back to strokes
    const strokeToRedo = redoStrokes[0];
    setStrokes(prev => [...prev, strokeToRedo]);
    setRedoStrokes(prev => prev.slice(1));
    
    // Redraw canvas with the restored stroke
    redrawCanvas([...strokes, strokeToRedo]);
    
    playSound('tool_select');
  };

  // Function to render the selected mascot
  const renderMascot = () => {
    switch (selectedMascot) {
      case 'forest':
        return (
          <Image 
            src="/images/dhole.png" 
            alt="Dhole" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'squirrel':
        return (
          <Image 
            src="/images/raccoon.png" 
            alt="Raccoon" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'mountain':
        return (
          <Image 
            src="/images/armadillo.png" 
            alt="Armadillo" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'mixed':
        return (
          <Image 
            src="/images/wombat.png" 
            alt="Wombat" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'placeholder1':
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'placeholder2':
        return (
          <Image 
            src="/images/meerkat.png" 
            alt="Meerkat" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      case 'placeholder3':
        return (
          <Image 
            src="/images/hedgehog.png" 
            alt="Hedgehog" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        );
      default:
        return (
          <Image 
            src="/images/white headed petrel.png" 
            alt="White Headed Petrel" 
            width={96} 
            height={96} 
            className="mx-auto"
          />
        ); // Default to white headed petrel
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes tiny-bob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
        `}
      </style>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'
    }`}>
      
      {/* Magical Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 text-4xl animate-pulse">✨</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse delay-500">🌟</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-1000">💎</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-700">🔥</div>
      </div>

      {/* Header */}
      <header className={`relative z-10 shadow-2xl p-4 border-b-4 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
          : 'bg-gradient-to-r from-blue-700 to-purple-600 border-blue-800'
      }`}>
        <div className="relative flex items-center h-16">
          {/* Left side - Back button and title */}
          <div className="absolute left-12 flex items-center space-x-4">
            <HomeButton />
            <div className="flex items-center">
              <Image 
                src="/images/pencil2.png" 
                alt="Drawing Den" 
                width={60} 
                height={60} 
                className="inline-block"
              />
              <div className="ml-1">
                <h1 className="text-3xl font-bold text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
                  Drawing Den
                </h1>
                <p className="text-lg text-purple-100 ml-0.5">
                  Practice with Pizzazz! ✨
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Quick Actions */}
          <div className="absolute right-12 flex items-center space-x-3">
            <button 
              onClick={saveDrawing}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 flex items-center space-x-2 border-2 border-yellow-700 shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="blackBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A4A4A"/>
                    <stop offset="50%" stopColor="#2D2D2D"/>
                    <stop offset="100%" stopColor="#1A1A1A"/>
                  </linearGradient>
                  <radialGradient id="lensGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#6B7280"/>
                    <stop offset="50%" stopColor="#374151"/>
                    <stop offset="100%" stopColor="#111827"/>
                  </radialGradient>
                  <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
                    <stop offset="50%" stopColor="rgba(255,255,255,0.3)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                  </linearGradient>
                </defs>
                
                {/* Camera body with black gradient */}
                <rect x="4" y="9" width="24" height="16" rx="4" fill="url(#blackBody)" stroke="#0F172A" strokeWidth="1.5"/>
                
                {/* Lens outer ring */}
                <circle cx="16" cy="17" r="6" fill="url(#lensGradient)" stroke="#FFD700" strokeWidth="1"/>
                
                {/* Lens inner details */}
                <circle cx="16" cy="17" r="4.5" fill="#374151" opacity="0.9"/>
                <circle cx="16" cy="17" r="3" fill="#1F2937"/>
                <circle cx="16" cy="17" r="1.5" fill="#111827"/>
                
                {/* Lens reflection */}
                <ellipse cx="14.5" cy="15" rx="1.5" ry="2" fill="rgba(255,255,255,0.4)" transform="rotate(-30 14.5 15)"/>
                
                {/* Flash with glow effect */}
                <circle cx="23" cy="12" r="1.8" fill="#60A5FA" opacity="0.6"/>
                <circle cx="23" cy="12" r="1.2" fill="#3B82F6"/>
                <circle cx="23" cy="12" r="0.6" fill="#FFFFFF"/>
                
                {/* Viewfinder */}
                <rect x="10" y="5" width="12" height="4" rx="2" fill="url(#blackBody)" stroke="#0F172A" strokeWidth="1"/>
                
                {/* Professional brand detail */}
                <rect x="20" y="11" width="3" height="1" rx="0.5" fill="#9CA3AF"/>
                
                {/* Cute sparkle effects around camera */}
                <g fill="#FFD700">
                  <circle cx="8" cy="4" r="0.5"/>
                  <circle cx="26" cy="5" r="0.5"/>
                  <circle cx="5" cy="15" r="0.5"/>
                  <circle cx="29" cy="20" r="0.5"/>
                </g>
                
                {/* Star sparkles */}
                <g fill="#FFFFFF" opacity="0.8">
                  <path d="M6 12l1 1-1 1-1-1z"/>
                  <path d="M27 14l1 1-1 1-1-1z"/>
                </g>
                
                {/* Subtle shimmer effect */}
                <rect x="4" y="9" width="24" height="16" rx="4" fill="url(#shimmer)" opacity="0.2"/>
              </svg>
              <span>Picture Perfect!</span>
            </button>
            <button 
              onClick={clearCanvas}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 flex items-center space-x-2 border-2 border-yellow-700 shadow-lg"
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
            <button 
              onClick={() => setSoundsEnabled(!soundsEnabled)}
              className={`px-4 py-2 rounded-xl transition-all ${
                soundsEnabled ? 'bg-green-500' : 'bg-gray-500'
              } text-white hover:scale-110 flex items-center justify-center border-2 border-yellow-700 shadow-lg`}
            >
              {soundsEnabled ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {/* Speaker body - dark gray */}
                  <rect x="18" y="9" width="4" height="6" fill="#374151" rx="1"/>
                  {/* Speaker cone - gradient from dark to light */}
                  <polygon points="18,9 18,15 13,19 13,5" fill="#6B7280"/>
                  <polygon points="18,10 18,14 14,17 14,7" fill="#9CA3AF"/>
                  {/* Sound waves - bright colors */}
                  <path d="M8.46 8.46a5 5 0 0 0 0 7.07" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 4.93a10 10 0 0 0 0 14.14" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {/* Speaker body - darker when muted */}
                  <rect x="18" y="9" width="4" height="6" fill="#4B5563" rx="1"/>
                  {/* Speaker cone - muted colors */}
                  <polygon points="18,9 18,15 13,19 13,5" fill="#6B7280"/>
                  <polygon points="18,10 18,14 14,17 14,7" fill="#9CA3AF"/>
                  {/* Mute slash - red */}
                  <line x1="4" y1="4" x2="20" y2="20" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              )}
            </button>
            {/* Dark Mode Toggle */}
            <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full p-1 backdrop-blur-sm ml-auto -mr-28 border border-white/40">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-sky-300 to-blue-400 shadow-md shadow-blue-400/50' 
                    : 'bg-gradient-to-br from-blue-800 to-indigo-900 shadow-md shadow-indigo-900/50'
                } text-white hover:scale-110 hover:rotate-12 flex items-center justify-center border border-white/50`}
              >
                {darkMode ? (
                  <span className="text-base">☀️</span>
                ) : (
                  <span className="text-sm">🌙</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        
        {/* Tool Panel */}
        <div className={`w-80 backdrop-blur-sm p-4 overflow-y-auto transition-colors duration-300 relative ${
          darkMode 
            ? 'bg-gray-800/95' 
            : 'bg-white/95'
        }`}>
          {/* Gradient border on the right */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-800 to-purple-700"></div>
          

          {/* Tools */}
          <div className="space-y-4">
              
              {/* Writing Tools */}
              <div className="relative">
                <button 
                  onClick={() => setShowWritingToolsDropdown(!showWritingToolsDropdown)}
                  className={`w-full p-4 rounded-xl border-3 font-bold text-lg transition-all hover:scale-105 flex items-center justify-between ${
                    (currentTool.type === 'pen' || currentTool.type === 'highlighter' || 
                     ['rainbow', 'glitter', 'glow', 'bubble', 'neon'].includes(currentTool.effect || '')) 
                    ? 'bg-blue-500 text-white border-blue-700' : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200'
                  }`}
                >
                  <span>✏️ Writing Tools</span>
                  <span className={`transition-transform ${showWritingToolsDropdown ? 'rotate-180' : ''}`}>▼</span>
                </button>
            
            {showWritingToolsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-blue-300 rounded-lg shadow-lg z-10">
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: undefined});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-blue-800 font-medium"
                >
                  ✏️ Basic Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: 'rainbow'});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-purple-700 font-medium"
                >
                  🌈 Rainbow Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: 'glitter'});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-pink-700 font-medium"
                >
                  💫 Glitter Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: 'glow'});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-yellow-700 font-medium"
                >
                  🌟 Glow Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: 'bubble'});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-cyan-700 font-medium"
                >
                  🫧 Bubble Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'pen', effect: 'neon'});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 border-b border-gray-200 transition-colors text-green-700 font-medium"
                >
                  ⚡ Neon Pen
                </button>
                <button 
                  onClick={() => {
                    setCurrentTool({...currentTool, type: 'highlighter', effect: undefined});
                    setShowWritingToolsDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-blue-100 transition-colors text-orange-700 font-medium"
                >
                  🎯 Highlighter
                </button>
              </div>
            )}
              </div>

              {/* Color Palette */}
              <div className={`p-2 rounded-xl transition-colors duration-300 ${
                darkMode ? 'bg-gray-600/80' : 'bg-gray-300'
              }`}>
                <div className="grid grid-cols-3 gap-1.5">
                  {colors.map((colorObj, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Only change color, preserve current tool type and effect (unless it's rainbow)
                        if (currentTool.effect === 'rainbow') {
                          setCurrentTool({...currentTool, color: colorObj.color, effect: undefined});
                        } else {
                          setCurrentTool({...currentTool, color: colorObj.color});
                        }
                      }}
                      className={`w-full h-10 rounded-lg transition-all hover:scale-110 ${
                        currentTool.color === colorObj.color ? 'border-4 border-black shadow-lg' : 'border-2 border-black'
                      }`}
                      style={{ backgroundColor: colorObj.color }}
                      title={colorObj.name}
                    />
                  ))}
                </div>
              </div>


              {/* Size Slider */}
              <div>
                <h3 className={`font-bold mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-100' : 'text-purple-800'
                }`}>📏 Brush Size</h3>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>tiny</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={currentTool.size}
                    onChange={(e) => setCurrentTool({...currentTool, size: parseInt(e.target.value)})}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: darkMode 
                        ? `linear-gradient(to right, #00ff00 0%, #00ff00 ${(currentTool.size - 1) / 19 * 100}%, #374151 ${(currentTool.size - 1) / 19 * 100}%, #374151 100%)`
                        : `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTool.size - 1) / 19 * 100}%, #d1d5db ${(currentTool.size - 1) / 19 * 100}%, #d1d5db 100%)`,
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  />
                  <span className={`text-lg font-bold transition-colors duration-300 ${
                    darkMode ? 'text-gray-100' : 'text-purple-800'
                  }`}>BIG!</span>
                </div>
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: ${darkMode ? '#00ff00' : '#8b5cf6'};
                    cursor: pointer;
                    border: 2px solid ${darkMode ? '#000000' : '#ffffff'};
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                  }
                  input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: ${darkMode ? '#00ff00' : '#8b5cf6'};
                    cursor: pointer;
                    border: 2px solid ${darkMode ? '#000000' : '#ffffff'};
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                  }
                `}</style>
              </div>

              {/* Eraser Section */}
              <div>
                <div className="space-y-2">
                  {/* Eraser Shadow Shelf */}
                  <div className="relative" ref={eraserShelfRef}>
                    <div className="w-full h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg border-2 border-gray-400 shadow-inner">
                      <div className="absolute inset-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded border border-gray-300"></div>
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-bold">ERASER</div>
                    </div>
                    
                    {/* Draggable Eraser */}
                    <div
                      className={`absolute cursor-grab active:cursor-grabbing z-10 ${
                        (eraserDragging || eraserReturning) ? 'opacity-0' : 'opacity-100'
                      } transition-opacity duration-300`}
                      style={{
                        left: '50%',
                        top: '8px',
                        transform: 'translateX(-50%)'
                      }}
                      onMouseDown={handleEraserMouseDown}
                      onTouchStart={handleEraserTouchStart}
                    >
                      {/* Whiteboard Eraser */}
                      <div className="w-16 h-8 bg-gradient-to-b from-blue-100 to-blue-200 rounded-sm border-2 border-blue-300 shadow-lg">
                        {/* Felt Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-sm"></div>
                        {/* Texture Lines */}
                        <div className="absolute top-1 left-1 right-1 space-y-0.5">
                          <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                          <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                          <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
                        </div>
                        {/* Brand Label */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-700 font-bold">E</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>



        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Canvas Toolbar */}
          <div className={`backdrop-blur-sm border-b-2 p-4 flex items-center justify-between transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800/90 border-gray-600' 
              : 'bg-white/90 border-purple-200'
          }`}>
            <div className="flex items-center justify-start w-full">
              {/* Left-aligned group with Undo, Tool, and Redo */}
              <div className="flex items-center space-x-4 ml-4">
                {/* Undo Button */}
                <button 
                  onClick={undo}
                  disabled={strokes.length === 0}
                  className={`transition-all drop-shadow-lg ${
                    strokes.length === 0 
                      ? 'cursor-not-allowed opacity-50' 
                      : 'hover:scale-125'
                  }`}
                  title="Undo"
                >
                  <Image 
                    src="/images/left arrow.png" 
                    alt="Undo" 
                    width={48} 
                    height={48}
                    className={`${
                      strokes.length === 0 
                        ? 'opacity-50' 
                        : ''
                    }`}
                    style={{ filter: 'drop-shadow(0 0 2px black)' }}
                  />
                </button>
                
                {/* Current Tool */}
                <div 
                  className={`px-3 py-1 rounded-lg text-lg font-bold transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700 text-gray-100' : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {currentTool.effect === 'rainbow' ? '🌈 Rainbow Pen' :
                   currentTool.effect === 'glitter' ? '💫 Glitter Pen' :
                   currentTool.effect === 'glow' ? '🌟 Glow Pen' :
                   currentTool.effect === 'bubble' ? '🫧 Bubble Pen' :
                   currentTool.effect === 'neon' ? '⚡ Neon Pen' :
                   currentTool.type === 'pen' ? '✏️ Basic Pen' :
                   currentTool.type === 'highlighter' ? '🎯 Highlighter' :
                   '🧽 Magic Eraser'}
                </div>
                
                {/* Redo Button */}
                <button 
                  onClick={redo}
                  disabled={redoStrokes.length === 0}
                  className={`transition-all drop-shadow-lg ${
                    redoStrokes.length === 0 
                      ? 'cursor-not-allowed opacity-50' 
                      : 'hover:scale-125'
                  }`}
                  title="Redo"
                >
                  <Image 
                    src="/images/right arrow.png" 
                    alt="Redo" 
                    width={48} 
                    height={48}
                    className={`${
                      redoStrokes.length === 0 
                        ? 'opacity-50' 
                        : ''
                    }`}
                    style={{ filter: 'drop-shadow(0 0 2px black)' }}
                  />
                </button>
              </div>
              
              {/* Size and Color info on the right */}
              <div className="absolute right-4 flex items-center space-x-4">
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-purple-700'
                }`}>
                  Size: <span className="font-bold">{currentTool.size}px</span>
                </div>
                <div 
                  className="rounded-full border-2 border-purple-500"
                  style={{ 
                    backgroundColor: currentTool.color,
                    width: `${Math.max(currentTool.size * 1.5, 12)}px`,
                    height: `${Math.max(currentTool.size * 1.5, 12)}px`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 relative bg-white m-6 rounded-2xl shadow-2xl border-2 border-blue-800 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={700}
              height={500}
              className="w-full h-full"
              style={{ cursor: getCursorStyle() }}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
            
          </div>

        </div>

      </div>

      {/* Floating Mascots */}
      <div className="fixed bottom-8 right-8 z-20 space-y-4">
        <div 
          className="cursor-pointer transition-all hover-shake" 
          title="Your mascot says: The rainbow pen is magical!"
          style={{
            animation: 'tiny-bob 4s infinite ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animation = 'shake 0.5s ease-in-out';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animation = 'tiny-bob 4s infinite ease-in-out';
          }}
          onAnimationEnd={(e) => {
            if (e.animationName === 'shake') {
              e.currentTarget.style.animation = 'tiny-bob 4s infinite ease-in-out';
            }
          }}
        >
          {renderMascot()}
        </div>
      </div>

      {/* Floating Eraser (when dragging or returning) */}
      {(eraserDragging || eraserReturning) && (
        <div
          className={`fixed z-[9999] pointer-events-none ${
            eraserReturning ? 'transition-all duration-700 ease-in-out' : ''
          }`}
          style={{
            left: `${eraserPosition.x - 32}px`,
            top: `${eraserPosition.y - 16}px`
          }}
        >
          {/* Whiteboard Eraser */}
          <div className="w-16 h-8 bg-gradient-to-b from-blue-100 to-blue-200 rounded-sm border-2 border-blue-300 shadow-xl">
            {/* Felt Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-sm"></div>
            {/* Texture Lines */}
            <div className="absolute top-1 left-1 right-1 space-y-0.5">
              <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
              <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
              <div className="h-0.5 bg-blue-300 rounded-full opacity-60"></div>
            </div>
            {/* Brand Label */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-700 font-bold">E</div>
          </div>
        </div>
      )}

    </div>

    {/* Activity Completion Tracking */}
    <ActivityCompletion activityType="whiteboard" />
    </>
  );
}