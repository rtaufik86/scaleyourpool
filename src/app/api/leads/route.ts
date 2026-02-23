import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { analyzeLeadQuality, generateAlertMessage, type LeadAnalysis } from '@/lib/lead-scoring';
import { assignLeadAutomatically } from '@/lib/lead-assignment';
import { cookies } from 'next/headers';

const parseBudget = (budgetStr: string): number => {
    if (!budgetStr) return 0;
    const clean = budgetStr.toLowerCase().replace(/,/g, '');
    const nums = clean.match(/\d+/g);
    if (!nums) return 0;

    // Check if it implies 'k' (thousands) 
    const isThousands = clean.includes('k');
    const multiplier = isThousands ? 1000 : 1;

    if (nums.length === 1) return parseInt(nums[0]) * multiplier;
    if (nums.length >= 2) return ((parseInt(nums[0]) + parseInt(nums[1])) / 2) * multiplier;
    return 0;
};

// Helper to get organization ID from context
async function getOrganizationId(supabase: Awaited<ReturnType<typeof createServerClient>>): Promise<string | null> {
    // Check for subdomain cookie first
    const cookieStore = await cookies();
    const subdomain = cookieStore.get('org_subdomain')?.value;

    if (subdomain) {
        const { data: org } = await supabase
            .from('organizations')
            .select('id')
            .eq('subdomain', subdomain)
            .single();
        if (org) return org.id;
    }

    // Get from user's membership
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: membership } = await supabase
            .from('organization_members')
            .select('organization_id')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .limit(1)
            .single();
        if (membership) return membership.organization_id;
    }

    return null;
}

// GET /api/leads - Fetch all leads (filtered by organization)
export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();
        const { searchParams } = new URL(request.url);
        const orgIdParam = searchParams.get('organization_id');

        // Build query
        let query = supabase
            .from('leads')
            .select(`
                *,
                assigned_to_profile:profiles!assigned_to (
                    id, 
                    full_name, 
                    email, 
                    avatar_url
                )
            `)
            .order('created_at', { ascending: false });

        // Filter by organization if available
        const organizationId = orgIdParam || await getOrganizationId(supabase);
        if (organizationId) {
            query = query.eq('organization_id', organizationId);
        }

        const { data: leads, error } = await query;

        if (error) {
            console.error('Error fetching leads:', error);
            return NextResponse.json(
                { error: 'Failed to fetch leads' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            leads: leads || [],
            organization_id: organizationId
        });

    } catch (error) {
        console.error('Leads API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


// POST /api/leads - Create new lead
export async function POST(request: NextRequest) {
    try {
        const { email, phone, name, budget, projectType, timeline, notes, conversationLog, source, utm_source, utm_campaign, session_id, visit_count, first_visit } = await request.json();

        // Analyze lead quality using AI-powered scoring
        const conversationText = conversationLog?.map((m: any) => m.content).join(' ') || '';
        const leadAnalysis: LeadAnalysis = analyzeLeadQuality(
            conversationText,
            !!email,
            !!phone,
            !!budget,
            !!timeline
        );

        console.log('🎯 Lead Analysis:', {
            score: leadAnalysis.score,
            urgency: leadAnalysis.urgency,
            confidence: leadAnalysis.confidence,
            signals: leadAnalysis.signals
        });

        const supabase = await createServerClient();

        // Calculate Project Value for Auto-Assignment
        const projectValue = parseBudget(budget);

        // 🤖 Auto-Assign Logic
        const assignedTo = await assignLeadAutomatically({
            name,
            email,
            budget,
            project_value: projectValue,
            utm_source: 'ai_chat_widget' // Or get from request body if available
        });

        // Insert lead into database with scoring data
        const { data, error } = await supabase
            .from('leads')
            .insert({
                email,
                phone,
                name,
                budget,
                project_type: projectType,
                timeline,
                // notes,  // Column doesn't exist
                // conversation_log: conversationLog, // Column doesn't exist
                utm_source: utm_source || source || 'ai_chat_widget',
                utm_campaign: utm_campaign || null,
                lead_status: 'new',
                // Lead scoring fields
                lead_score: leadAnalysis.score,
                assigned_to: assignedTo,
                project_value: projectValue,
                urgency_level: leadAnalysis.urgency,
                score_confidence: leadAnalysis.confidence,
                // intent_signals: leadAnalysis.signals, // Column doesn't exist
                // scoring_reasoning: leadAnalysis.reasoning, // Column doesn't exist
                recommended_action: leadAnalysis.recommendedAction,
                created_at: new Date().toISOString(),
                // Session tracking for returning visitors
                session_id: session_id || null,
                visit_count: visit_count || 1,
                first_visit: first_visit || new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save lead' },
                { status: 500 }
            );
        }

        // 🔥 SEND EMAIL ALERT FOR HOT & WARM LEADS
        if (leadAnalysis.score === 'HOT' || leadAnalysis.score === 'WARM') {
            try {
                const alertMessage = generateAlertMessage(leadAnalysis, {
                    name,
                    email,
                    phone,
                    budget,
                    timeline,
                    projectType
                });

                // Send email alert to contractor
                const contractorEmail = process.env.CONTRACTOR_EMAIL || process.env.ALERT_EMAIL;

                if (contractorEmail) {
                    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/alerts/email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: contractorEmail,
                            subject: `${leadAnalysis.score} Lead Alert - ${name || email || 'New Lead'}`,
                            message: alertMessage,
                            leadData: { name, email, phone, budget, timeline },
                            priority: leadAnalysis.score
                        })
                    });

                    console.log(`📧 Email alert sent to ${contractorEmail} for ${leadAnalysis.score} lead`);
                } else {
                    console.warn('⚠️ CONTRACTOR_EMAIL not configured - skipping email alert');
                }

                // TODO: Send SMS for HOT leads
                if (leadAnalysis.score === 'HOT' && process.env.TWILIO_ENABLED === 'true') {
                    // await sendSMSAlert(contractorPhone, alertMessage);
                }

            } catch (alertError) {
                console.error('Alert sending error:', alertError);
                // Don't fail the lead capture if alert fails
            }
        }

        return NextResponse.json({
            success: true,
            leadId: data.id,
            leadScore: leadAnalysis.score,
            urgency: leadAnalysis.urgency,
            confidence: leadAnalysis.confidence
        });
    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json(
            { error: 'Failed to process lead' },
            { status: 500 }
        );
    }
}
