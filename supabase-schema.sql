-- Supabase Database Schema for Scale Your Pool
-- Run this SQL in your Supabase SQL Editor

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  name VARCHAR(255),
  budget VARCHAR(100),
  project_type VARCHAR(100),
  timeline VARCHAR(100),
  notes TEXT,
  conversation_log JSONB,
  source VARCHAR(50) DEFAULT 'ai_chat_widget',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (backend can do everything)
CREATE POLICY "Service role can manage leads" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =========================================
-- Applications Table (Founding Builder Program)
-- =========================================

CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  website VARCHAR(500),
  years_in_business VARCHAR(50),
  average_project_value VARCHAR(50),
  monthly_leads VARCHAR(50),
  biggest_challenge TEXT,
  why_interested TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for applications
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy for service role
CREATE POLICY "Service role can manage applications" ON applications
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =========================================
-- Useful Queries
-- =========================================

-- View all leads
-- SELECT * FROM leads ORDER BY created_at DESC;

-- View all applications
-- SELECT * FROM applications ORDER BY created_at DESC;

-- Status values for leads: 'new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'
-- Status values for applications: 'pending', 'reviewing', 'approved', 'rejected', 'onboarded'

