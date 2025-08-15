'use client';

import { useState, useEffect } from 'react';
import { getAllStages } from '@/lib/supabase/phonics-queries';
import { EIGHT_STAGE_SYSTEM } from '@/app/data/allStagesDatabase';

export default function DataSourceTest() {
  const [supabaseStages, setSupabaseStages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const stages = await getAllStages();
        setSupabaseStages(stages);
      } catch (error) {
        console.error('Error loading Supabase data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSupabaseData();
  }, []);

  const typescriptStages = EIGHT_STAGE_SYSTEM;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmBeige via-creamyWhite to-softSand p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-deepNavy mb-8">
          📊 Data Source Comparison Test
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Supabase Data */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              🗄️ Supabase Database (NEW)
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3">Loading from Supabase...</span>
              </div>
            ) : (
              <>
                <p className="text-green-700 font-semibold mb-3">
                  ✅ Found {supabaseStages.length} stages in database
                </p>
                <div className="space-y-2">
                  {supabaseStages.map((stage, index) => (
                    <div key={stage.id} className="border border-green-200 rounded p-3 bg-green-50">
                      <p className="font-semibold">Stage {stage.id}: {stage.name}</p>
                      <p className="text-sm text-gray-600">{stage.grade_band}</p>
                      <p className="text-xs text-green-600">Source: Supabase Database</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* TypeScript Data */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              📄 TypeScript Files (OLD)
            </h2>
            
            <p className="text-orange-700 font-semibold mb-3">
              📊 Found {typescriptStages.length} stages in static files
            </p>
            <div className="space-y-2">
              {typescriptStages.map((stage, index) => (
                <div key={stage.stage_number} className="border border-orange-200 rounded p-3 bg-orange-50">
                  <p className="font-semibold">Stage {stage.stage_number}: {stage.stage_name}</p>
                  <p className="text-sm text-gray-600">{stage.grade_level}</p>
                  <p className="text-xs text-orange-600">Source: allStagesDatabase.ts</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">
            🔍 Current Status
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">✅ Using Supabase:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>/teacher/stages (main stages page)</li>
                <li>/teacher/stages/[stage] (individual stages)</li>
                <li>This test page</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">⚠️ Still using TypeScript files:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>/api/generate-lesson (lesson generation)</li>
                <li>/teacher (main dashboard)</li>
                <li>Other components importing allStagesDatabase</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded border">
            <p className="text-sm">
              <strong>Bottom line:</strong> Your main stages functionality is now using Supabase! 
              Visit <a href="/teacher/stages" className="text-blue-600 underline">/teacher/stages</a> to see 
              data loading from your database. The lesson generator and some other components still use 
              the TypeScript files, but the core curriculum viewing is fully migrated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}