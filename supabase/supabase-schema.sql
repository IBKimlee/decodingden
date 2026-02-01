-- Decoding Den Supabase Schema
-- © 2025 Decoding Den. All rights reserved.
-- Optimized for Science of Reading phonics instruction

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Phonemes table - Core phoneme data
create table public.phonemes (
  id uuid default uuid_generate_v4() primary key,
  phoneme text not null,
  graphemes text[] not null,
  stage integer not null check (stage >= 1 and stage <= 8),
  frequency_rank integer not null,
  grade_band text not null,
  introduction_week integer not null,
  word_examples text[] not null,
  decodable_sentences text[] not null,
  assessment_criteria jsonb not null,
  teaching_advantages text[] not null,
  research_sources text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stages table - Stage progression information
create table public.stages (
  id uuid default uuid_generate_v4() primary key,
  stage_number integer unique not null check (stage_number >= 1 and stage_number <= 8),
  stage_name text not null,
  grade_level text not null,
  student_phase text not null,
  duration text not null,
  total_elements integer not null,
  description text not null,
  key_concept text not null,
  instructional_focus text[] not null,
  science_of_reading_alignment jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lesson plans table - Generated lesson content
create table public.lesson_plans (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  phoneme_id uuid references public.phonemes(id) on delete cascade,
  duration text not null,
  objectives text[] not null,
  materials text[] not null,
  structure jsonb not null,
  differentiation jsonb not null,
  research_basis text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User progress table - Track student learning
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  phoneme_id uuid references public.phonemes(id) on delete cascade,
  stage integer not null check (stage >= 1 and stage <= 8),
  mastery_level text not null check (mastery_level in ('introduced', 'practicing', 'mastered')),
  last_practiced timestamp with time zone not null,
  attempts integer default 0,
  success_rate numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, phoneme_id)
);

-- Assessments table - Track formal assessments
create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  phoneme_id uuid references public.phonemes(id) on delete cascade,
  assessment_type text not null check (assessment_type in ('daily', 'weekly', 'summative')),
  score integer not null,
  max_score integer not null,
  feedback text,
  administered_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for performance
create index idx_phonemes_stage on public.phonemes(stage);
create index idx_phonemes_grade_band on public.phonemes(grade_band);
create index idx_user_progress_user_id on public.user_progress(user_id);
create index idx_user_progress_stage on public.user_progress(stage);
create index idx_assessments_user_id on public.assessments(user_id);
create index idx_assessments_type_date on public.assessments(assessment_type, administered_at);

-- Row Level Security (RLS) policies
alter table public.phonemes enable row level security;
alter table public.stages enable row level security;
alter table public.lesson_plans enable row level security;
alter table public.user_progress enable row level security;
alter table public.assessments enable row level security;

-- Public read access for phonemes and stages (educational content)
create policy "Phonemes are publicly readable" on public.phonemes
  for select using (true);

create policy "Stages are publicly readable" on public.stages
  for select using (true);

-- Lesson plans can be read by authenticated users
create policy "Lesson plans are readable by authenticated users" on public.lesson_plans
  for select using (auth.role() = 'authenticated');

-- Teachers can insert lesson plans
create policy "Teachers can insert lesson plans" on public.lesson_plans
  for insert with check (auth.role() = 'authenticated');

-- Users can only access their own progress and assessments
create policy "Users can view own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users can update own progress" on public.user_progress
  for update using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can view own assessments" on public.assessments
  for select using (auth.uid() = user_id);

create policy "Users can insert own assessments" on public.assessments
  for insert with check (auth.uid() = user_id);

-- Updated at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers
create trigger handle_updated_at before update on public.phonemes
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.stages
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.lesson_plans
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.user_progress
  for each row execute procedure public.handle_updated_at();