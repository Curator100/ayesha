# TuitionMedia PWA — Setup Guide

## Files
- `index.html` — Sign in/up + Home page
- `jobs.html` — Jobs & Tuitions page  
- `safety.html` — Safety tips + SOS
- `admin.html` — Admin panel (path: /admin.html or /admin)
- `config.js` — Shared config (Supabase, Telegram, zones, universities)
- `manifest.json` — PWA manifest
- `sw.js` — Service worker for offline
- `netlify.toml` — Netlify deploy config
- `icons/` — App icons for PWA
- `supabase_schema.sql` — Run this in Supabase SQL Editor

## Setup Steps

### 1. Supabase
1. Open your Supabase project dashboard
2. Go to SQL Editor → New Query
3. Paste everything from `supabase_schema.sql` and run it
4. Go to Authentication → Settings → Enable Email/Password sign-in

### 2. GitHub
1. Create a new GitHub repository
2. Upload all files to the root of the repo (keeping icons/ folder)

### 3. Netlify
1. Go to netlify.com → New site from Git
2. Connect your GitHub repo
3. Build command: leave empty
4. Publish directory: `.` (dot)
5. Deploy!

### 4. Admin Access
- URL: `https://yoursite.netlify.app/admin.html`
- Email: `rayhanchy576@gmail.com`
- Password: whatever you used to sign up

### 5. First Time
When you open the site, it will ask to install the app (Chrome PWA banner at bottom).

## Admin Features
- **Users tab**: View all users, make moderator/admin, ban/unban
- **Tuitions tab**: View all tuitions, change status (available/booked/hidden)
- **Add Tuition**: Upload new tuitions with all details
- **Applicants tab**: View who applied with ranking (top public uni = 2pts, paid media fee = 1pt, 2+ tuitions = 1pt)
- **SOS Alerts**: See all SOS triggers
- **Directory**: Search users by university name

## Notes
- Admin path is `/admin.html` or `/admin` (redirects via netlify.toml)
- The 5 fake tuitions shown first are hardcoded in jobs.html for data collection
- Real tuitions load from Supabase after user completes data survey
- Profile popup appears 30 seconds after first login
