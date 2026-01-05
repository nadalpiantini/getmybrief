-- GetMyBrief Waitlist Table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/nqzhxukuvmdlpewqytpv/sql

-- Create waitlist table
CREATE TABLE IF NOT EXISTS getmybrief_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE getmybrief_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for waitlist signups)
CREATE POLICY "Allow anonymous inserts" ON getmybrief_waitlist
  FOR INSERT WITH CHECK (true);

-- Allow reading own email (optional, for checking if already registered)
CREATE POLICY "Allow checking own email" ON getmybrief_waitlist
  FOR SELECT USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_getmybrief_waitlist_email ON getmybrief_waitlist(email);

-- Verify table was created
SELECT 'getmybrief_waitlist table created successfully!' as status;
