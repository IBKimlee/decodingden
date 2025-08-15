'use client';

import { useSimpleAudio, useAudio } from '@/app/lib/audio';

// Quick test component to validate audio system
export default function AudioTestPanel() {
  const { playClear, playWordBuilt, playSuccess, playClick } = useSimpleAudio();
  const { settings, updateSettings, error } = useAudio();

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <p className="text-red-700">Audio Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">🔊 Audio System Test Panel</h3>
      
      {/* Test Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={playClear}
          className="px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Test Clear Sound
        </button>
        <button 
          onClick={playWordBuilt}
          className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Word Built Sound
        </button>
        <button 
          onClick={playSuccess}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Success Sound
        </button>
        <button 
          onClick={playClick}
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Test Click Sound
        </button>
      </div>

      {/* Settings Display */}
      <div className="text-sm">
        <p><strong>Master Volume:</strong> {Math.round(settings.master_volume * 100)}%</p>
        <p><strong>Sounds Enabled:</strong> {settings.sounds_enabled ? 'Yes' : 'No'}</p>
        <p><strong>UI Feedback:</strong> {settings.categories.ui_feedback ? 'On' : 'Off'}</p>
        <p><strong>Educational:</strong> {settings.categories.educational ? 'On' : 'Off'}</p>
      </div>

      {/* Quick Settings */}
      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.sounds_enabled}
            onChange={(e) => updateSettings({ sounds_enabled: e.target.checked })}
          />
          <span>Enable Sounds</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <span>Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.master_volume}
            onChange={(e) => updateSettings({ master_volume: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span>{Math.round(settings.master_volume * 100)}%</span>
        </label>
      </div>
    </div>
  );
}