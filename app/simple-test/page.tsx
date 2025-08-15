'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SimpleTest() {
  const [result, setResult] = useState<string>('Testing...');

  useEffect(() => {
    async function testConnection() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        
        console.log('Creating Supabase client...');
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        console.log('Querying phonics_stages...');
        const { data, error } = await supabase
          .from('phonics_stages')
          .select('id, name')
          .limit(1);

        if (error) {
          console.error('Supabase error:', error);
          setResult(`❌ Error: ${error.message}`);
        } else {
          console.log('Success! Data:', data);
          setResult(`✅ Success! Found ${data?.length || 0} stages. First stage: ${data?.[0]?.name || 'None'}`);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setResult(`❌ Unexpected error: ${err instanceof Error ? err.message : 'Unknown'}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Supabase Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-lg">{result}</p>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Check the browser console (F12 → Console) for detailed logs.</p>
      </div>
    </div>
  );
}