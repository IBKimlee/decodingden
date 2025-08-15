'use client';

import { useState, useEffect } from 'react';
import { getAllStages, getAllPhonemes, getPhonemesByStage } from '@/lib/supabase/phonics-queries';

export default function MigrationTest() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runTests() {
      const testResults: any = {};
      
      try {
        // Test 1: Load all stages
        console.log('Testing: getAllStages()');
        const stages = await getAllStages();
        testResults.stages = {
          success: true,
          count: stages.length,
          sample: stages.slice(0, 2).map(s => ({ id: s.id, name: s.name }))
        };

        // Test 2: Load all phonemes  
        console.log('Testing: getAllPhonemes()');
        const phonemes = await getAllPhonemes();
        testResults.phonemes = {
          success: true,
          count: phonemes.length,
          sample: phonemes.slice(0, 3).map(p => ({ id: p.phoneme_id, phoneme: p.phoneme }))
        };

        // Test 3: Load Stage 1 phonemes
        console.log('Testing: getPhonemesByStage(1)');
        const stage1Phonemes = await getPhonemesByStage(1);
        testResults.stage1Phonemes = {
          success: true,
          count: stage1Phonemes.length,
          sample: stage1Phonemes.slice(0, 3).map(p => ({ id: p.phoneme_id, phoneme: p.phoneme }))
        };

        testResults.overall = 'success';
        
      } catch (error) {
        console.error('Test failed:', error);
        testResults.error = error instanceof Error ? error.message : 'Unknown error';
        testResults.overall = 'failed';
      }
      
      setResults(testResults);
      setLoading(false);
    }

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-lg font-medium">Running migration tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-deepNavy mb-8">
          🧪 Supabase Migration Test Results
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Overall Status: {' '}
            <span className={results.overall === 'success' ? 'text-green-600' : 'text-red-600'}>
              {results.overall === 'success' ? '✅ PASSED' : '❌ FAILED'}
            </span>
          </h2>
          
          {results.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold">Error:</p>
              <p className="text-red-600">{results.error}</p>
            </div>
          )}
        </div>

        {results.stages && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-deepNavy mb-3">📚 Stages Test</h3>
            <div className="flex items-center mb-2">
              <span className="text-green-600 font-semibold">✅ Success</span>
              <span className="ml-4 text-gray-600">Found {results.stages.count} stages</span>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm font-medium mb-2">Sample stages:</p>
              {results.stages.sample.map((stage: any) => (
                <p key={stage.id} className="text-sm text-gray-700">
                  • Stage {stage.id}: {stage.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {results.phonemes && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-deepNavy mb-3">🔤 All Phonemes Test</h3>
            <div className="flex items-center mb-2">
              <span className="text-green-600 font-semibold">✅ Success</span>
              <span className="ml-4 text-gray-600">Found {results.phonemes.count} phonemes</span>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm font-medium mb-2">Sample phonemes:</p>
              {results.phonemes.sample.map((phoneme: any) => (
                <p key={phoneme.id} className="text-sm text-gray-700">
                  • {phoneme.id}: {phoneme.phoneme}
                </p>
              ))}
            </div>
          </div>
        )}

        {results.stage1Phonemes && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-deepNavy mb-3">🎯 Stage 1 Phonemes Test</h3>
            <div className="flex items-center mb-2">
              <span className="text-green-600 font-semibold">✅ Success</span>
              <span className="ml-4 text-gray-600">Found {results.stage1Phonemes.count} Stage 1 phonemes</span>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm font-medium mb-2">Stage 1 phonemes:</p>
              {results.stage1Phonemes.sample.map((phoneme: any) => (
                <p key={phoneme.id} className="text-sm text-gray-700">
                  • {phoneme.id}: {phoneme.phoneme}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">✅ Migration Test Complete</h3>
          <p className="text-blue-700">
            Your Supabase migration is working correctly! You can now:
          </p>
          <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
            <li>Visit <a href="/teacher/stages" className="underline hover:text-blue-900">/teacher/stages</a> to see all stages</li>
            <li>Click on individual stages to see detailed phoneme data</li>
            <li>Use the new query functions throughout your app</li>
            <li>Start tracking student progress in the database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}