-- Add lost reason tracking columns to leads table
-- Run this migration to enable loss analysis

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lost_reason VARCHAR(100),
ADD COLUMN IF NOT EXISTS lost_reason_details TEXT,
ADD COLUMN IF NOT EXISTS lost_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster queries on lost leads
CREATE INDEX IF NOT EXISTS idx_leads_lost_reason ON leads(lost_reason) WHERE lead_status = 'lost';
CREATE INDEX IF NOT EXISTS idx_leads_lost_at ON leads(lost_at) WHERE lead_status = 'lost';

-- Add comment for documentation
COMMENT ON COLUMN leads.lost_reason IS 'Primary reason why the lead was lost (e.g., Price Too High, Went With Competitor, etc.)';
COMMENT ON COLUMN leads.lost_reason_details IS 'Additional details or notes about why the lead was lost';
COMMENT ON COLUMN leads.lost_at IS 'Timestamp when the lead was marked as lost';

-- Update existing lost leads to have lost_at timestamp based on updated_at
UPDATE leads 
SET lost_at = updated_at 
WHERE lead_status = 'lost' AND lost_at IS NULL;
