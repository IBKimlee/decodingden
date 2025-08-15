'use client';

import { useSimpleAudio, isAudioSupported } from '@/app/lib/simpleAudio';

export default function AudioDebugPanel() {
  const { playClear, playSuccess, playWordBuilt } = useSimpleAudio();

  const handleTestClear = async () => {
    console.log('🔊 Testing Clear Sound...');
    await playClear();
  };

  const handleTestSuccess = async () => {
    console.log('🔊 Testing Success Sound...');
    await playSuccess();
  };

  const handleTestWordBuilt = async () => {
    console.log('🔊 Testing Word Built Sound...');
    await playWordBuilt();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="text-sm font-bold mb-2">🔊 Audio Debug Panel</h3>
      
      <div className="text-xs mb-2">
        <p>Audio Supported: {isAudioSupported() ? '✅ Yes' : '❌ No'}</p>
        <p className="text-yellow-300">Check browser console for audio logs</p>
      </div>
      
      <div className="space-y-1">
        <button 
          onClick={handleTestClear}
          className="block w-full px-2 py-1 bg-teal-600 hover:bg-teal-700 rounded text-xs"
        >
          Test Clear Sound
        </button>
        <button 
          onClick={handleTestSuccess}
          className="block w-full px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
        >
          Test Success Sound
        </button>
        <button 
          onClick={handleTestWordBuilt}
          className="block w-full px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
        >
          Test Word Built Sound
        </button>
      </div>
      
      <div className="text-xs mt-2 text-gray-400">
        <p>💡 Modern browsers require user interaction before audio can play</p>
      </div>
    </div>
  );
}