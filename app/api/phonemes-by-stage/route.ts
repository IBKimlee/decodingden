import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get the stage number from the request URL.
  const searchParams = request.nextUrl.searchParams;
  const stageId = searchParams.get('stage_id');

  // If no stage_id is provided, return an error.
  if (!stageId) {
    return NextResponse.json({ error: 'Stage ID is required' }, { status: 400 });
  }

  // Fetch the phonemes from the database for the requested stage.
  const { data: phonemes, error } = await supabase
    .from('phonemes')
    .select('phoneme, graphemes, word_examples')
    .eq('stage_id', stageId)
    .order('frequency_rank', { ascending: true });

  // If there's a database error, return it.
  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to fetch phonemes' }, { status: 500 });
  }

  // If everything is successful, return the list of phonemes.
  return NextResponse.json(phonemes);
}