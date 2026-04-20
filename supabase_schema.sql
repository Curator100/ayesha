-- Run this in Supabase SQL Editor

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  university text,
  whatsapp text,
  email text,
  role text default 'user', -- 'user', 'moderator', 'admin'
  banned boolean default false,
  is_new boolean default true,
  zones text[],
  friend_name text,
  friend_phone text,
  friend_dept text,
  parent_phone text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, university, whatsapp, email)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'university',
    new.raw_user_meta_data->>'whatsapp',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- TUITIONS TABLE
create table if not exists public.tuitions (
  id uuid default gen_random_uuid() primary key,
  title text,
  salary integer,
  subject text,
  location text,
  zone text,
  class text,
  days text,
  time text,
  date date,
  status text default 'available', -- 'available', 'booked', 'hidden'
  visible boolean default true,
  description text,
  created_at timestamptz default now()
);

-- APPLICATIONS TABLE
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  tuition_id text,
  tuition_title text,
  salary integer,
  is_fake boolean default false,
  applied_at timestamptz default now()
);

-- USER DATA SURVEY TABLE
create table if not exists public.user_data_survey (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) unique,
  tuition_count text,
  paid_media_before boolean default false,
  created_at timestamptz default now()
);

-- SOS ALERTS TABLE
create table if not exists public.sos_alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid,
  name text,
  whatsapp text,
  university text,
  created_at timestamptz default now()
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.tuitions enable row level security;
alter table public.applications enable row level security;
alter table public.user_data_survey enable row level security;
alter table public.sos_alerts enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','moderator'))
);
create policy "Admins can update all profiles" on public.profiles for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Tuitions: anyone can read available ones; only admins write
create policy "Anyone can view available tuitions" on public.tuitions for select using (visible = true);
create policy "Admins can do everything on tuitions" on public.tuitions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','moderator'))
);

-- Applications: users manage own
create policy "Users can insert own applications" on public.applications for insert with check (auth.uid() = user_id);
create policy "Users can view own applications" on public.applications for select using (auth.uid() = user_id);
create policy "Admins can view all applications" on public.applications for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','moderator'))
);

-- Survey
create policy "Users can insert own survey" on public.user_data_survey for insert with check (auth.uid() = user_id);
create policy "Users can update own survey" on public.user_data_survey for update using (auth.uid() = user_id);
create policy "Admins can view surveys" on public.user_data_survey for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','moderator'))
);

-- SOS
create policy "Users can insert SOS" on public.sos_alerts for insert with check (true);
create policy "Admins can view SOS" on public.sos_alerts for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','moderator'))
);
