-- ============================================
-- CLIENT PORTAL DATABASE SCHEMA
-- Scale Your Pool - Client Portal MVP
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: clients
-- Stores client company information
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'inactive', 'trial', 'cancelled')) DEFAULT 'trial',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_email ON clients(email);

-- RLS Policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own client data"
ON clients FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own client data"
ON clients FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- TABLE: conversations
-- Stores AI chat conversations with leads
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Lead Information
  lead_name TEXT,
  lead_email TEXT,
  lead_phone TEXT,
  
  -- Qualification Data
  budget_range TEXT,
  timeline TEXT,
  pool_type TEXT,
  location TEXT,
  
  -- Conversation Data
  messages JSONB NOT NULL DEFAULT '[]',
  
  -- Status & Scoring
  qualification_status TEXT CHECK (qualification_status IN ('qualified', 'unqualified', 'pending')) DEFAULT 'pending',
  lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100) DEFAULT 0,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_conversations_client_id ON conversations(client_id);
CREATE INDEX idx_conversations_status ON conversations(qualification_status);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_lead_email ON conversations(lead_email);

-- RLS Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
ON conversations FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own conversations"
ON conversations FOR INSERT
WITH CHECK (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own conversations"
ON conversations FOR UPDATE
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ============================================
-- TABLE: analytics_daily
-- Aggregated daily analytics per client
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Core Metrics
  total_conversations INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,
  unqualified_leads INTEGER DEFAULT 0,
  pending_leads INTEGER DEFAULT 0,
  booked_consultations INTEGER DEFAULT 0,
  
  -- Calculated Metrics
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  qualification_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- Pipeline
  pipeline_value DECIMAL(12,2) DEFAULT 0.00,
  avg_budget DECIMAL(12,2) DEFAULT 0.00,
  
  -- Performance
  avg_response_time INTEGER DEFAULT 0, -- milliseconds
  avg_conversation_length INTEGER DEFAULT 0, -- number of messages
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(client_id, date)
);

-- Indexes
CREATE INDEX idx_analytics_client_date ON analytics_daily(client_id, date DESC);

-- RLS Policies
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analytics"
ON analytics_daily FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ============================================
-- TABLE: client_settings
-- Client configuration and preferences
-- ============================================
CREATE TABLE IF NOT EXISTS client_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE UNIQUE,
  
  -- Business Hours (JSONB)
  business_hours JSONB DEFAULT '{
    "monday": {"open": "09:00", "close": "17:00", "enabled": true},
    "tuesday": {"open": "09:00", "close": "17:00", "enabled": true},
    "wednesday": {"open": "09:00", "close": "17:00", "enabled": true},
    "thursday": {"open": "09:00", "close": "17:00", "enabled": true},
    "friday": {"open": "09:00", "close": "17:00", "enabled": true},
    "saturday": {"open": "10:00", "close": "14:00", "enabled": false},
    "sunday": {"open": "10:00", "close": "14:00", "enabled": false}
  }',
  
  -- Notification Preferences
  email_on_new_lead BOOLEAN DEFAULT TRUE,
  email_on_qualified_lead BOOLEAN DEFAULT TRUE,
  sms_on_qualified_lead BOOLEAN DEFAULT FALSE,
  daily_summary BOOLEAN DEFAULT TRUE,
  weekly_report BOOLEAN DEFAULT TRUE,
  
  -- Integration Settings
  calendar_sync BOOLEAN DEFAULT FALSE,
  webhook_url TEXT,
  
  -- AI Configuration
  ai_greeting_message TEXT DEFAULT 'Hi there! 👋 I''m the Pool Expert AI. I''m here to help you explore pool options and find the perfect fit for your backyard. What''s driving your interest in a pool right now?',
  qualification_threshold INTEGER DEFAULT 70, -- Lead score threshold
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE client_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
ON client_settings FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own settings"
ON client_settings FOR UPDATE
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ============================================
-- TABLE: faqs
-- Client-specific FAQ management
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_faqs_client_id ON faqs(client_id);
CREATE INDEX idx_faqs_enabled ON faqs(enabled);

-- RLS Policies
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own FAQs"
ON faqs FOR ALL
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ============================================
-- TABLE: reports
-- Generated PDF reports storage metadata
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  report_type TEXT CHECK (report_type IN ('monthly', 'weekly', 'custom')) DEFAULT 'monthly',
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Report Data (JSON snapshot)
  report_data JSONB,
  
  -- File Storage
  file_path TEXT, -- Supabase Storage path
  file_size INTEGER, -- bytes
  
  -- Status
  status TEXT CHECK (status IN ('generating', 'ready', 'failed')) DEFAULT 'generating',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reports_client_id ON reports(client_id);
CREATE INDEX idx_reports_period ON reports(period_start, period_end);

-- RLS Policies
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reports"
ON reports FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_daily_updated_at BEFORE UPDATE ON analytics_daily
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_settings_updated_at BEFORE UPDATE ON client_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Calculate daily analytics
-- ============================================
CREATE OR REPLACE FUNCTION calculate_daily_analytics(p_client_id UUID, p_date DATE)
RETURNS VOID AS $$
DECLARE
  v_total_conversations INTEGER;
  v_qualified_leads INTEGER;
  v_unqualified_leads INTEGER;
  v_pending_leads INTEGER;
  v_conversion_rate DECIMAL(5,2);
  v_qualification_rate DECIMAL(5,2);
  v_pipeline_value DECIMAL(12,2);
BEGIN
  -- Count conversations
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE qualification_status = 'qualified'),
    COUNT(*) FILTER (WHERE qualification_status = 'unqualified'),
    COUNT(*) FILTER (WHERE qualification_status = 'pending')
  INTO 
    v_total_conversations,
    v_qualified_leads,
    v_unqualified_leads,
    v_pending_leads
  FROM conversations
  WHERE client_id = p_client_id
    AND DATE(created_at) = p_date;
  
  -- Calculate rates
  IF v_total_conversations > 0 THEN
    v_conversion_rate := (v_qualified_leads::DECIMAL / v_total_conversations) * 100;
    v_qualification_rate := ((v_qualified_leads + v_unqualified_leads)::DECIMAL / v_total_conversations) * 100;
  ELSE
    v_conversion_rate := 0;
    v_qualification_rate := 0;
  END IF;
  
  -- Calculate pipeline value (assuming avg project value of $80,000)
  v_pipeline_value := v_qualified_leads * 80000;
  
  -- Insert or update analytics
  INSERT INTO analytics_daily (
    client_id,
    date,
    total_conversations,
    qualified_leads,
    unqualified_leads,
    pending_leads,
    conversion_rate,
    qualification_rate,
    pipeline_value
  ) VALUES (
    p_client_id,
    p_date,
    v_total_conversations,
    v_qualified_leads,
    v_unqualified_leads,
    v_pending_leads,
    v_conversion_rate,
    v_qualification_rate,
    v_pipeline_value
  )
  ON CONFLICT (client_id, date)
  DO UPDATE SET
    total_conversations = EXCLUDED.total_conversations,
    qualified_leads = EXCLUDED.qualified_leads,
    unqualified_leads = EXCLUDED.unqualified_leads,
    pending_leads = EXCLUDED.pending_leads,
    conversion_rate = EXCLUDED.conversion_rate,
    qualification_rate = EXCLUDED.qualification_rate,
    pipeline_value = EXCLUDED.pipeline_value,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA (for testing)
-- ============================================

-- Note: Run this manually after creating a test user via Supabase Auth

-- Example:
-- INSERT INTO clients (user_id, company_name, email, phone)
-- VALUES (
--   'YOUR_USER_ID_FROM_AUTH_USERS',
--   'Paradise Pools Inc',
--   'demo@paradisepools.com',
--   '(555) 123-4567'
-- );

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage bucket for reports (run in Supabase Dashboard)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('reports', 'reports', false);

-- Storage RLS Policy
-- CREATE POLICY "Users can access their own reports"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'reports' AND (storage.foldername(name))[1] IN (
--   SELECT id::text FROM clients WHERE user_id = auth.uid()
-- ));

-- ============================================
-- REALTIME SUBSCRIPTIONS
-- ============================================

-- Enable realtime for conversations table
-- ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Additional composite indexes for common queries
CREATE INDEX idx_conversations_client_status_date 
ON conversations(client_id, qualification_status, created_at DESC);

CREATE INDEX idx_conversations_client_score 
ON conversations(client_id, lead_score DESC);

-- ============================================
-- COMMENTS (Documentation)
-- ============================================

COMMENT ON TABLE clients IS 'Client company information and subscription details';
COMMENT ON TABLE conversations IS 'AI chat conversations with leads, including qualification data';
COMMENT ON TABLE analytics_daily IS 'Aggregated daily analytics metrics per client';
COMMENT ON TABLE client_settings IS 'Client configuration, preferences, and AI settings';
COMMENT ON TABLE faqs IS 'Client-specific FAQ management for AI knowledge base';
COMMENT ON TABLE reports IS 'Generated PDF reports metadata and storage references';

-- ============================================
-- COMPLETION
-- ============================================

-- Schema created successfully!
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create storage bucket 'reports' in Supabase Storage
-- 3. Enable realtime for conversations table
-- 4. Create test user and client record
