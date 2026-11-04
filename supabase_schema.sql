-- ============================================================================
-- SQL Schema สำหรับ LernWeb บน Supabase (ตามมาตรฐาน Supabase RLS Best Practices)
-- ============================================================================

-- 1. สร้างตารางเก็บความก้าวหน้าการเรียนของแต่ละผู้ใช้ (user_progress)
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  completed_lessons text[] not null default '{}',
  last_lesson_id text,
  updated_at timestamptz not null default now()
);

-- 2. ให้สิทธิ์เข้าถึงตารางสำหรับ role authenticated (Data API Access)
grant select, insert, update on table public.user_progress to authenticated;

-- 3. เปิดใช้งาน Row Level Security (RLS)
alter table public.user_progress enable row level security;

-- 4. สร้าง Policy แบบระบุ TO authenticated และใช้ (select auth.uid()) เพื่อประสิทธิภาพสูงสุด
create policy "Users can view own progress"
  on public.user_progress
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Users can insert own progress"
  on public.user_progress
  for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "Users can update own progress"
  on public.user_progress
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );
