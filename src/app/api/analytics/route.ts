import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * Analytics API - Comprehensive Metrics for Contractor Dashboard
 * GET /api/analytics?period=30
 */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const period = parseInt(searchParams.get('period') || '30');
        const supabase = await createServerClient();

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - period);

        // Comparison Date (Previous Period)
        const previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - period);

        // Fetch Current Period Data
        const { data: leads } = await supabase
            .from('leads')
            .select('*, profiles(full_name)')
            .gte('created_at', startDate.toISOString());

        // Fetch Previous Period Data for Trends
        const { data: prevLeads } = await supabase
            .from('leads')
            .select('id, project_value, lead_status, created_at')
            .gte('created_at', previousStartDate.toISOString())
            .lt('created_at', startDate.toISOString());

        // 1. EXECUTIVE DEEP DIVE CALCULATIONS
        const currentRevenue = leads?.filter(l => l.lead_status === 'won').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) || 0;
        const prevRevenue = prevLeads?.filter(l => l.lead_status === 'won').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) || 0;

        const revenueTrend = prevRevenue > 0 ? ((currentRevenue - prevRevenue) / prevRevenue * 100).toFixed(1) : '100';

        // Revenue Breakdown by Member
        const revenueByMember = leads?.filter(l => l.lead_status === 'won').reduce((acc: any, lead) => {
            const name = lead.profiles?.full_name || 'Unassigned';
            acc[name] = (acc[name] || 0) + (Number(lead.project_value) || 0);
            return acc;
        }, {}) || {};

        // Critical Alerts Logic
        // 1. Stuck Hot Leads
        const stuckHotLeads = leads?.filter(l => l.lead_score === 'HOT' && !['won', 'lost'].includes(l.lead_status) && (new Date().getTime() - new Date(l.updated_at || l.created_at).getTime()) > (5 * 24 * 60 * 60 * 1000)).map(l => ({
            id: l.id,
            name: l.name || 'Unknown Lead',
            value: l.project_value,
            stage: l.lead_status,
            days: Math.ceil((new Date().getTime() - new Date(l.updated_at || l.created_at).getTime()) / (1000 * 60 * 60 * 24))
        })) || [];

        // 2. Response Time Alert (Mock Logic for demo)
        const responseTimeAlert = {
            rep: 'Sarah Williams',
            current: '45 min',
            prev: '15 min',
            diff: '-200%'
        };


        // 2. TEAM PERFORMANCE DRILL-DOWN & STUCK LEADS
        const { data: profiles } = await supabase.from('profiles').select('id, full_name, avatar_url, role');

        const teamPerformance = profiles?.map(profile => {
            const memberLeads = leads?.filter(l => l.assigned_to === profile.id) || [];
            const activeLeads = memberLeads.filter(l => !['won', 'lost'].includes(l.lead_status));

            // Calculate win rate for leaderboard
            const winRate = memberLeads.length > 0 ? Math.round((memberLeads.filter(l => l.lead_status === 'won').length / memberLeads.length) * 100) : 0;

            // Detect Stuck Leads (>7 days in current status)
            const stuckLeads = activeLeads.filter(l => {
                const lastUpdate = new Date(l.updated_at || l.created_at);
                const diffTime = Math.abs(new Date().getTime() - lastUpdate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 7;
            }).map(l => ({
                id: l.id,
                name: l.name || 'Unknown Lead',
                stage: l.lead_status,
                value: l.project_value,
                daysInStage: Math.ceil(Math.abs(new Date().getTime() - new Date(l.updated_at || l.created_at).getTime()) / (1000 * 60 * 60 * 24))
            }));

            return {
                id: profile.id,
                name: profile.full_name,
                role: profile.role,
                avatar: profile.avatar_url,
                overview: {
                    assigned: memberLeads.length,
                    won: memberLeads.filter(l => l.lead_status === 'won').length,
                    pipeline_value: activeLeads.reduce((sum, l) => sum + (Number(l.project_value) || 0), 0),
                    win_rate: winRate,
                    avg_response: profile.role === 'owner' ? '4 min' : '15 min',
                    total_revenue: memberLeads.filter(l => l.lead_status === 'won').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0)
                },
                active_leads_breakdown: activeLeads.map(l => ({
                    id: l.id,
                    name: l.name,
                    email: l.email,
                    phone: l.phone,
                    budget: l.budget,
                    timeline: l.timeline,
                    project_type: l.project_type,
                    lead_score: l.lead_score,
                    lead_status: l.lead_status,
                    urgency_level: l.urgency_level,
                    score_confidence: l.score_confidence,
                    recommended_action: l.recommended_action,
                    utm_source: l.utm_source,
                    utm_campaign: l.utm_campaign,
                    gclid: l.gclid,
                    fbclid: l.fbclid,
                    conversion_value: l.conversion_value,
                    project_value: l.project_value,
                    created_at: l.created_at,
                    status: l.lead_status,
                    assigned_to: l.assigned_to,
                    assigned_to_profile: l.profiles ? {
                        id: profile.id,
                        full_name: profile.full_name,
                        avatar_url: profile.avatar_url
                    } : undefined,
                    lost_reason: l.lost_reason,
                    lost_reason_details: l.lost_reason_details,
                    lost_at: l.lost_at,
                    stage: l.lead_status,
                    value: l.project_value,
                    days_in_stage: Math.ceil(Math.abs(new Date().getTime() - new Date(l.updated_at || l.created_at).getTime()) / (1000 * 60 * 60 * 24))
                })),
                stuck_leads: stuckLeads,
                action_required: stuckLeads.length > 0 ? `${stuckLeads.length} leads stuck > 7 days` : null
            };
        }) || [];

        // Leaderboard Calculation
        const sortedByWinRate = [...teamPerformance].filter(m => m.overview.won > 0).sort((a, b) => b.overview.win_rate - a.overview.win_rate);
        const sortedByRevenue = [...teamPerformance].filter(m => m.overview.total_revenue > 0).sort((a, b) => b.overview.total_revenue - a.overview.total_revenue);
        // const sortedByResponse = ... (mocked for now)

        const leaderboard = {
            closer: {
                name: sortedByWinRate[0]?.name || 'No wins yet',
                value: sortedByWinRate[0] ? `${sortedByWinRate[0].overview.win_rate}% win rate` : 'this period'
            },
            fisher: {
                name: sortedByRevenue[0]?.name || 'No revenue yet',
                value: sortedByRevenue[0] ? `$${sortedByRevenue[0].overview.total_revenue.toLocaleString()} revenue` : 'this period'
            },
            flash: { name: 'Owner', value: '4 min response' } // Hardcoded for now
        };


        // 3. MARKETING ROI DEEP DIVE (ENHANCED MOCK)
        const detailedMarketingData = [
            {
                source: 'Google Ads',
                leads: 40,
                cost: 2500,
                campaigns: [
                    { name: 'Pool Installation 2025', leads: 25, cpl: 60, cost: 1500, won: 8, revenue: 560000 },
                    { name: 'Luxury Designs', leads: 15, cpl: 67, cost: 1000, won: 4, revenue: 290000 }
                ]
            },
            {
                source: 'Facebook Ads',
                leads: 30,
                cost: 1800,
                campaigns: [
                    { name: 'Luxury Pool Designs', leads: 18, cpl: 56, cost: 1000, won: 6, revenue: 504000 },
                    { name: 'Before/After Ads', leads: 12, cpl: 67, cost: 800, won: 4, revenue: 336000 }
                ]
            },
            {
                source: 'Organic',
                leads: 20,
                cost: 0,
                campaigns: [
                    { name: 'Google Search', leads: 12, cpl: 0, cost: 0, won: 2, revenue: 80000 },
                    { name: 'Direct Traffic', leads: 5, cpl: 0, cost: 0, won: 1, revenue: 50000 },
                    { name: 'Referrals', leads: 3, cpl: 0, cost: 0, won: 1, revenue: 30000 }
                ]
            }
        ];

        const marketingROI = detailedMarketingData.map(ch => {
            const totalRevenue = ch.campaigns.reduce((sum, c) => sum + c.revenue, 0);
            const totalWon = ch.campaigns.reduce((sum, c) => sum + c.won, 0);
            return {
                source: ch.source,
                leads: ch.leads,
                won: totalWon,
                revenue: totalRevenue,
                cost: ch.cost,
                cpl: ch.leads > 0 ? (ch.cost / ch.leads).toFixed(2) : '0.00',
                roas: ch.cost > 0 ? (totalRevenue / ch.cost).toFixed(1) + 'x' : '∞',
                avg_deal: totalWon > 0 ? Math.round(totalRevenue / totalWon) : 0,
                campaigns: ch.campaigns,
                recommendation: ch.source === 'Google Ads' ? 'Increase "Pool Install 2025" budget +50%' : ch.source === 'Facebook Ads' ? 'Pause low-performing ad sets' : 'Improve SEO for high-value keywords'
            };
        });

        // 4. LEAD QUALITY & URGENCY (WITH TOP LEADS)
        const getTopLeads = (score: string) =>
            leads?.filter(l => l.lead_score === score && !['won', 'lost'].includes(l.lead_status))
                .sort((a, b) => (Number(b.project_value) || 0) - (Number(a.project_value) || 0))
                .slice(0, 3)
                .map(l => ({
                    id: l.id,
                    name: l.name || 'Unknown',
                    value: Number(l.project_value) || 0,
                    stage: l.lead_status,
                    assigned_to_name: l.profiles?.full_name || 'Unassigned',
                    days_in_stage: Math.ceil(Math.abs(new Date().getTime() - new Date(l.updated_at || l.created_at).getTime()) / (1000 * 60 * 60 * 24))
                })) || [];

        const leadQuality = {
            hot: {
                count: leads?.filter(l => l.lead_score === 'HOT').length || 0,
                avg_value: Math.round(leads?.filter(l => l.lead_score === 'HOT').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) / (leads?.filter(l => l.lead_score === 'HOT').length || 1)),
                win_rate: '60%',
                top_leads: getTopLeads('HOT')
            },
            warm: {
                count: leads?.filter(l => l.lead_score === 'WARM').length || 0,
                avg_value: Math.round(leads?.filter(l => l.lead_score === 'WARM').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) / (leads?.filter(l => l.lead_score === 'WARM').length || 1)),
                win_rate: '40%',
                top_leads: getTopLeads('WARM')
            },
            cold: {
                count: leads?.filter(l => l.lead_score === 'COLD').length || 0,
                avg_value: Math.round(leads?.filter(l => l.lead_score === 'COLD').reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) / (leads?.filter(l => l.lead_score === 'COLD').length || 1)),
                win_rate: '10%',
                top_leads: getTopLeads('COLD')
            }
        };

        // 5. FUNNEL & SOURCES (WITH COMPARISON)
        // Dynamic Funnel Calculation from 'leads' data
        const FUNNEL_STAGES = ['new', 'contacted', 'consultation_scheduled', 'proposal_sent', 'negotiating', 'won'];

        // Helper to check if a lead has reached at least this stage
        // Assuming linear progression: new -> contacted -> consultation_scheduled -> proposal_sent -> negotiating -> won
        const getMinStageIndex = (status: string) => FUNNEL_STAGES.indexOf(status);

        const funnelData = FUNNEL_STAGES.map((stage, index) => {
            // Count leads that are at this stage OR any subsequent stage (excluding 'lost' unless we want to track loss at each stage, but for standard funnel we usually track positive flow)
            // For simple "Conversion Funnel", we count how many people *reached* this stage.
            // If lead is 'won', they reached 'new', 'contacted', etc.
            // If lead is 'lost', we need to look at history to know how far they got.
            // But since we don't have history joined here easily for all leads without massive query, 
            // we will approximate: Active leads count towards their current stage and all before it.
            // 'lost' leads: We can filter them out OR assume they count towards the stage they validly reached.
            // For this version: "Active Pipeline Funnel" - only active leads + won? 
            // Better: "Snapshot Funnel" - Count leads CURRENTLY in each stage. 
            // The user complained about "Snapshot".

            // Let's try "Current Distribution" first as it's 100% accurate to "what is in the table".
            const leadsInStage = leads?.filter(l => l.lead_status === stage).length || 0;

            // BUT, a Funnel Chart expects a Funnel Shape (Big -> Small).
            // If we just show distribution, it might look like a bar chart, not a funnel.
            // VisualSalesFunnel is now a BarChart. So dynamic distribution is fine.

            // However, to keep the "Conversion %" meaningful, let's use the Cumulative approach (Waterfall).
            const count = leads?.filter(l => {
                const leadStageIdx = getMinStageIndex(l.lead_status);
                // Include if lead is currently at or past this stage
                // Handle 'lost' separately? If lost, we don't know where they dropped off without history.
                // Let's exclude 'lost' from the main "Active Funnel" or include them if we assume they dropped at their current status?
                // Let's exclude 'lost' for a "Success Funnel" view, or include them based on current status.
                // Simplest: Count how many leads are >= this stage index. (Ignoring 'lost' leads for now to show Active/Won funnel, or mapping 'lost' to 0).
                if (l.lead_status === 'lost') return false;
                return leadStageIdx >= index;
            }).length || 0;

            return {
                stage,
                count,
                percentage: 0, // Calculated below
                prev_count: 0 // Mock or calculate if possible
            };
        });

        // Update percentages relative to top of funnel
        const totalFunnelLeads = funnelData[0].count || 1;
        const funnelComparison = funnelData.map(stage => ({
            ...stage,
            percentage: ((stage.count / totalFunnelLeads) * 100).toFixed(1),
            prev_count: Math.round(stage.count * 0.9), // Slight mock for trend
            change_pct: 10 // Mock trend
        }));

        const sources = leads?.reduce((acc: any, lead) => {
            const source = lead.utm_source || 'organic';
            if (!acc[source]) acc[source] = { leads: 0, won: 0, revenue: 0 };
            acc[source].leads++;
            if (lead.lead_status === 'won') {
                acc[source].won++;
                acc[source].revenue += (Number(lead.project_value) || 0);
            }
            return acc;
        }, {}) || {};

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            overview: {
                totalRevenue: currentRevenue,
                revenueTrend: { value: revenueTrend, direction: Number(revenueTrend) >= 0 ? 'up' : 'down' },
                revenueByMember,
                totalLeads: leads?.length || 0,
                leadsTrend: leads && prevLeads ? (((leads.length - prevLeads.length) / prevLeads.length) * 100).toFixed(1) : '0',
                activePipeline: leads?.filter(l => !['won', 'lost'].includes(l.lead_status)).reduce((sum, l) => sum + (Number(l.project_value) || 0), 0) || 0,
                winRate: leads?.length ? ((leads.filter(l => l.lead_status === 'won').length / leads.length) * 100).toFixed(1) : '0',
                avgResponseTime: '12 Mins',
                critical_alerts: stuckHotLeads,
                response_time_alert: responseTimeAlert
            },
            roi: {
                estimatedValue: currentRevenue,
                subscriptionCost: 297, // Base price
                costPerLead: leads?.length ? (0 / leads.length).toFixed(2) : '0.00',
                roi: 0,
                projectedMonthlyRevenue: currentRevenue
            },
            team_performance: teamPerformance,
            leaderboard: leaderboard,
            marketing_roi: marketingROI,
            lead_quality: leadQuality,
            funnel: funnelComparison,
            sources: sources,
            // Access to raw data for filtering in frontend if needed
            raw_leads: leads?.map(l => ({
                id: l.id,
                status: l.lead_status,
                source: l.utm_source || 'organic',
                created_at: l.created_at,
                assigned_to: l.assigned_to
            }))
        });

    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}

/**
 * Calculate average response time
 */
async function calculateAverageResponseTime(supabase: any, startDate: Date): Promise<string> {
    // For AI chat, response time is instant (<1 second)
    // This would be more relevant for human handoff scenarios
    return '< 1 second';
}

/**
 * Get daily lead trend
 */
async function getDailyLeadTrend(supabase: any, startDate: Date, days: number): Promise<any[]> {
    const { data } = await supabase
        .from('leads')
        .select('created_at, lead_score')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

    if (!data) return [];

    // Group by day
    const dailyData: any = {};
    data.forEach((lead: any) => {
        const date = new Date(lead.created_at).toISOString().split('T')[0];
        if (!dailyData[date]) {
            dailyData[date] = { date, total: 0, hot: 0, warm: 0, cold: 0 };
        }
        dailyData[date].total++;
        if (lead.lead_score === 'HOT') dailyData[date].hot++;
        if (lead.lead_score === 'WARM') dailyData[date].warm++;
        if (lead.lead_score === 'COLD') dailyData[date].cold++;
    });

    return Object.values(dailyData);
}

/**
 * Analyze budget ranges
 */
function analyzeBudgetRanges(leads: any[]): any {
    const ranges = {
        'under_50k': 0,
        '50k_80k': 0,
        '80k_150k': 0,
        'over_150k': 0,
        'unknown': 0
    };

    leads.forEach(lead => {
        const budget = parseInt(lead.budget?.replace(/[^0-9]/g, '') || '0');
        if (budget === 0) ranges.unknown++;
        else if (budget < 50000) ranges.under_50k++;
        else if (budget < 80000) ranges['50k_80k']++;
        else if (budget < 150000) ranges['80k_150k']++;
        else ranges.over_150k++;
    });

    return ranges;
}

/**
 * Calculate estimated value from leads
 */
function calculateEstimatedValue(leads: any[]): number {
    let total = 0;

    leads.forEach(lead => {
        const budget = parseInt(lead.budget?.replace(/[^0-9]/g, '') || '0');

        // Estimate conversion probability based on lead score
        let conversionProbability = 0;
        if (lead.lead_score === 'HOT') conversionProbability = 0.4; // 40% close rate
        else if (lead.lead_score === 'WARM') conversionProbability = 0.15; // 15% close rate
        else if (lead.lead_score === 'COLD') conversionProbability = 0.02; // 2% close rate

        total += budget * conversionProbability;
    });

    return Math.round(total);
}
