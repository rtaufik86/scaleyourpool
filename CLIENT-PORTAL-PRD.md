# Client Portal - Product Requirements Document (PRD)

## 📋 Project Overview

**Product Name**: Scale Your Pool - Client Portal  
**Target Users**: Pool contractors (Founding Builders)  
**Purpose**: Real-time monitoring and management of AI Sales Concierge performance  
**Tech Stack**: Next.js (App Router), Supabase, Tailwind CSS, Tremor/Recharts

---

## 🎯 Core Objectives

1. **Transparency**: Give clients full visibility into AI performance
2. **Actionability**: Enable clients to configure and optimize their AI
3. **Data Sovereignty**: Each client sees only their own data (RLS enforced)
4. **Mobile-First**: Optimized for on-the-go business owners
5. **Professional**: Premium UX for high-ticket clients ($80k+ projects)

---

## 👥 User Personas

### Primary: Pool Contractor Owner
- **Age**: 35-55
- **Tech Savvy**: Medium
- **Primary Device**: Mobile (60%), Desktop (40%)
- **Key Need**: Quick performance overview, lead management
- **Pain Point**: Too busy to check complex dashboards

### Secondary: Sales Manager
- **Age**: 28-45
- **Tech Savvy**: High
- **Primary Device**: Desktop (70%), Mobile (30%)
- **Key Need**: Detailed analytics, conversation logs
- **Pain Point**: Need to qualify AI-generated leads

---

## 🏗️ System Architecture

### Frontend
```
Next.js 14+ (App Router)
├── /app
│   ├── (auth)
│   │   ├── login/
│   │   └── magic-link/
│   ├── (dashboard)
│   │   ├── page.tsx (Overview)
│   │   ├── leads/
│   │   ├── conversations/
│   │   ├── reports/
│   │   └── settings/
│   └── api/
│       ├── auth/
│       ├── leads/
│       └── analytics/
```

### Backend (Supabase)
```
Database Tables:
├── clients (RLS: client_id)
├── conversations (RLS: client_id)
├── leads (RLS: client_id)
├── analytics_daily (RLS: client_id)
├── settings (RLS: client_id)
└── reports (RLS: client_id)
```

---

## 📊 Module Breakdown

### Module 1: Authentication & Security (Week 1)

#### Features:
- ✅ Magic Link authentication (Supabase Auth)
- ✅ Email verification
- ✅ Session management
- ✅ Row Level Security (RLS) on all tables
- ✅ Client isolation (client_id based access)

#### User Flow:
1. User enters email
2. Receives magic link
3. Clicks link → Auto login
4. Redirected to dashboard

#### Security Requirements:
```sql
-- RLS Policy Example
CREATE POLICY "Users can only see their own data"
ON conversations
FOR SELECT
USING (auth.uid() = client_id);
```

#### Acceptance Criteria:
- [ ] User can login with magic link
- [ ] Session persists across page refreshes
- [ ] RLS prevents cross-client data access
- [ ] Logout clears session completely

---

### Module 2: Performance Dashboard (Week 1-2)

#### Key Metrics:

**1. Lead Funnel**
```
Total Conversations → Qualified Leads → Booked Consultations
```

**2. Pipeline Value**
```
Sum of (Qualified Leads × Average Project Value)
```

**3. Conversion Rate**
```
(Qualified Leads / Total Conversations) × 100%
```

**4. Response Time**
```
Average AI response time
```

#### Visualizations:

**Chart 1: Lead Funnel (Bar Chart)**
```tsx
<BarChart>
  <Bar dataKey="total_conversations" fill="#3b82f6" />
  <Bar dataKey="qualified_leads" fill="#10b981" />
  <Bar dataKey="booked" fill="#f59e0b" />
</BarChart>
```

**Chart 2: Conversion Trend (Line Chart)**
```tsx
<LineChart>
  <Line dataKey="conversion_rate" stroke="#8b5cf6" />
</LineChart>
```

**Chart 3: Pipeline Value (Metric Card)**
```tsx
<Card>
  <Metric>${totalPipelineValue.toLocaleString()}</Metric>
  <Text>Estimated Pipeline Value</Text>
</Card>
```

#### Data Structure:
```typescript
interface DashboardMetrics {
  total_conversations: number;
  qualified_leads: number;
  booked_consultations: number;
  conversion_rate: number;
  pipeline_value: number;
  avg_response_time: number;
  period: 'today' | 'week' | 'month' | 'all';
}
```

---

### Module 3: Lead Management & Chat History (Week 2)

#### Features:

**Lead List View**
- Real-time updates (Supabase Realtime)
- Filter by status (New, Qualified, Contacted, Booked)
- Search by name, email, phone
- Sort by date, budget, status

**Lead Detail View**
- Full conversation transcript
- Extracted data (Name, Budget, Timeline, Pool Type)
- Contact information
- Lead score (AI-generated)
- Action buttons (Call, Email, Mark as Contacted)

**Conversation Log**
```tsx
interface Conversation {
  id: string;
  client_id: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  budget_range: string;
  timeline: string;
  pool_type: string;
  messages: Message[];
  qualification_status: 'qualified' | 'unqualified' | 'pending';
  lead_score: number; // 0-100
  created_at: string;
  updated_at: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

#### UI Components:

**Lead Card**
```tsx
<Card>
  <div className="flex justify-between">
    <div>
      <h3>{lead.name}</h3>
      <p>{lead.budget_range}</p>
    </div>
    <Badge color={statusColor}>{lead.status}</Badge>
  </div>
  <div className="mt-4">
    <Button onClick={() => viewDetails(lead.id)}>
      View Conversation
    </Button>
  </div>
</Card>
```

---

### Module 4: Automated Reporting Hub (Week 3)

#### Features:

**Monthly Executive Summary**
- Auto-generated PDF report
- Key metrics summary
- Top performing conversations
- Recommendations for improvement

**Report Structure:**
```
1. Executive Summary
   - Total leads: X
   - Qualified: Y (Z%)
   - Pipeline value: $XXX,XXX

2. Performance Highlights
   - Best performing days
   - Peak conversation times
   - Common objections handled

3. Lead Quality Analysis
   - Budget distribution
   - Timeline distribution
   - Geographic distribution

4. AI Performance
   - Average response time
   - Qualification accuracy
   - Common questions

5. Recommendations
   - Prompt optimization suggestions
   - FAQ updates needed
   - Best practices
```

#### Storage:
```typescript
// Supabase Storage bucket
const reportPath = `reports/${client_id}/${year}/${month}/executive-summary.pdf`;

// Download function
async function downloadReport(month: string, year: string) {
  const { data, error } = await supabase.storage
    .from('reports')
    .download(`${client_id}/${year}/${month}/executive-summary.pdf`);
  
  return data;
}
```

---

### Module 5: Configuration & Settings (Week 3-4)

#### Settings Categories:

**1. Business Hours**
```tsx
interface BusinessHours {
  monday: { open: string; close: string; enabled: boolean };
  tuesday: { open: string; close: string; enabled: boolean };
  // ... other days
}
```

**2. FAQ Management**
```tsx
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  enabled: boolean;
}
```

**3. Notification Preferences**
```tsx
interface NotificationSettings {
  email_on_new_lead: boolean;
  email_on_qualified_lead: boolean;
  sms_on_qualified_lead: boolean;
  daily_summary: boolean;
  weekly_report: boolean;
}
```

**4. Integration Settings**
```tsx
interface Integrations {
  calendar_sync: boolean;
  crm_integration: 'none' | 'hubspot' | 'salesforce';
  webhook_url: string;
}
```

---

## 🎨 UI/UX Design Principles

### Color Palette
```css
Primary: #f97316 (Orange-500) - CTAs, highlights
Secondary: #0ea5e9 (Sky-500) - Info, links
Success: #10b981 (Green-500) - Qualified leads
Warning: #f59e0b (Amber-500) - Pending
Danger: #ef4444 (Red-500) - Unqualified
Neutral: #64748b (Slate-500) - Text, borders
```

### Typography
```css
Headings: font-family: 'Inter', sans-serif; font-weight: 700;
Body: font-family: 'Inter', sans-serif; font-weight: 400;
Metrics: font-family: 'Inter', sans-serif; font-weight: 600;
```

### Layout
- **Desktop**: Sidebar navigation + main content
- **Mobile**: Bottom tab navigation + hamburger menu
- **Spacing**: Consistent 4px grid system
- **Cards**: Rounded corners (8px), subtle shadows

---

## 📱 Mobile Optimization

### Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Features
- Touch-optimized buttons (min 44px height)
- Swipe gestures for navigation
- Bottom sheet modals
- Infinite scroll for lead lists
- Offline support (service worker)

---

## 🔒 Security Requirements

### Authentication
- ✅ Magic link (passwordless)
- ✅ Email verification required
- ✅ Session timeout: 7 days
- ✅ Refresh token rotation

### Authorization
- ✅ Row Level Security (RLS) on all tables
- ✅ Client isolation via client_id
- ✅ API route protection (middleware)
- ✅ Rate limiting (100 req/min per client)

### Data Protection
- ✅ Encryption at rest (Supabase default)
- ✅ Encryption in transit (HTTPS)
- ✅ PII masking in logs
- ✅ GDPR compliance (data export/delete)

---

## ⚡ Performance Requirements

### Page Load Time
- **Dashboard**: < 2 seconds (LCP)
- **Lead List**: < 1.5 seconds
- **Conversation Detail**: < 1 second

### Optimization Strategies
```typescript
// 1. Server Components (default)
export default async function DashboardPage() {
  const metrics = await getMetrics(); // Server-side
  return <Dashboard metrics={metrics} />;
}

// 2. Streaming
export default async function LeadsPage() {
  return (
    <Suspense fallback={<LeadsSkeleton />}>
      <LeadsList />
    </Suspense>
  );
}

// 3. Caching
const metrics = await fetch('/api/metrics', {
  next: { revalidate: 60 } // Cache for 60 seconds
});
```

---

## 🗄️ Database Schema

### Tables

**clients**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  company_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own client data"
ON clients FOR SELECT
USING (auth.uid() = user_id);
```

**conversations**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  lead_name TEXT,
  lead_email TEXT,
  lead_phone TEXT,
  budget_range TEXT,
  timeline TEXT,
  pool_type TEXT,
  messages JSONB NOT NULL,
  qualification_status TEXT CHECK (qualification_status IN ('qualified', 'unqualified', 'pending')),
  lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own conversations"
ON conversations FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
```

**analytics_daily**
```sql
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  date DATE NOT NULL,
  total_conversations INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,
  booked_consultations INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  pipeline_value DECIMAL(12,2),
  avg_response_time INTEGER, -- milliseconds
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, date)
);

-- RLS
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own analytics"
ON analytics_daily FOR SELECT
USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
```

---

## 🚀 MVP Scope (Sprint 1 - Week 1)

### Must-Have Features:
1. ✅ **Authentication**
   - Magic link login
   - Email verification
   - Session management

2. ✅ **Chat History**
   - List of conversations
   - Conversation detail view
   - Basic filtering (date, status)

3. ✅ **Basic Dashboard**
   - Total conversations count
   - Qualified leads count
   - Simple conversion rate

### Nice-to-Have (Defer to Sprint 2):
- Advanced analytics
- PDF reports
- Settings page
- Mobile app

---

## 📅 Development Timeline

### Sprint 1 (Week 1): MVP
- Day 1-2: Setup project, Supabase schema, RLS
- Day 3-4: Authentication (Magic link)
- Day 5-7: Chat History UI + API

### Sprint 2 (Week 2): Analytics
- Day 1-3: Dashboard with charts
- Day 4-5: Lead management UI
- Day 6-7: Real-time updates

### Sprint 3 (Week 3): Reporting
- Day 1-3: PDF report generation
- Day 4-5: Report download UI
- Day 6-7: Testing & refinement

### Sprint 4 (Week 4): Settings & Polish
- Day 1-3: Settings page
- Day 4-5: Mobile optimization
- Day 6-7: Final testing & deployment

---

## ✅ Acceptance Criteria

### Authentication
- [ ] User can login with email (magic link)
- [ ] Session persists across refreshes
- [ ] Logout works correctly
- [ ] RLS prevents unauthorized access

### Dashboard
- [ ] Shows accurate metrics
- [ ] Charts render correctly
- [ ] Data updates in real-time
- [ ] Mobile responsive

### Chat History
- [ ] Lists all conversations
- [ ] Shows conversation details
- [ ] Filters work correctly
- [ ] Search functionality works

### Performance
- [ ] Page load < 2 seconds
- [ ] No layout shift (CLS < 0.1)
- [ ] Works on mobile
- [ ] Works offline (basic functionality)

---

## 🎯 Success Metrics

### User Engagement
- Daily active users: > 80% of clients
- Average session duration: > 5 minutes
- Feature adoption: > 60% use chat history weekly

### Performance
- Page load time: < 2 seconds (p95)
- API response time: < 500ms (p95)
- Uptime: > 99.9%

### Business Impact
- Client retention: > 90%
- Feature requests implemented: > 50%
- Support tickets: < 5 per month

---

## 📚 Technical Documentation

### API Routes

**GET /api/auth/magic-link**
```typescript
// Send magic link to email
POST /api/auth/magic-link
Body: { email: string }
Response: { success: boolean, message: string }
```

**GET /api/dashboard/metrics**
```typescript
// Get dashboard metrics
GET /api/dashboard/metrics?period=week
Response: {
  total_conversations: number;
  qualified_leads: number;
  conversion_rate: number;
  pipeline_value: number;
}
```

**GET /api/conversations**
```typescript
// Get conversation list
GET /api/conversations?status=qualified&limit=20&offset=0
Response: {
  conversations: Conversation[];
  total: number;
  hasMore: boolean;
}
```

---

## 🔧 Development Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Supabase account
Git
```

### Installation
```bash
# Clone repo
git clone https://github.com/rtaufik86/scaleyourpool.git
cd scaleyourpool

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in Supabase credentials

# Run database migrations
npm run db:migrate

# Start dev server
npm run dev
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

---

## 📞 Support & Maintenance

### Monitoring
- Vercel Analytics for performance
- Sentry for error tracking
- Supabase logs for database issues

### Backup Strategy
- Daily automated backups (Supabase)
- Point-in-time recovery (7 days)
- Manual backup before major updates

### Update Cadence
- Security patches: Immediate
- Bug fixes: Weekly
- Feature updates: Bi-weekly
- Major releases: Monthly

---

**Document Version**: 1.0  
**Last Updated**: December 22, 2024  
**Owner**: Scale Your Pool Development Team
