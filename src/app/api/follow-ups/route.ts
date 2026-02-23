import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import {
    FOLLOW_UP_SEQUENCES,
    getFollowUpSequence,
    generateFollowUpMessage,
    calculateNextFollowUp,
    type FollowUpTrigger
} from '@/lib/follow-up-automation';

/**
 * Follow-Up Automation API
 * Schedules and sends automated follow-up messages
 */

export async function POST(request: NextRequest) {
    try {
        const { leadId, trigger } = await request.json();

        if (!leadId || !trigger) {
            return NextResponse.json(
                { error: 'leadId and trigger required' },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        // Get lead data
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single();

        if (leadError || !lead) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            );
        }

        // Get appropriate follow-up sequence
        const sequence = getFollowUpSequence(lead.lead_score, trigger as FollowUpTrigger);

        if (!sequence) {
            return NextResponse.json(
                { error: 'No follow-up sequence found for this lead' },
                { status: 404 }
            );
        }

        // Schedule all follow-up steps
        const scheduledFollowUps = [];
        const now = new Date();

        for (const step of sequence.steps) {
            const scheduledFor = calculateNextFollowUp(now, step.delayHours);

            // Generate personalized message
            const message = generateFollowUpMessage(
                step.message,
                {
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone,
                    budget: lead.budget,
                    timeline: lead.timeline
                },
                step.includeBookingLink,
                step.includePortfolio,
                step.includePricing
            );

            // Create follow-up record
            const { data: followUp, error: followUpError } = await supabase
                .from('follow_ups')
                .insert({
                    lead_id: leadId,
                    sequence_id: sequence.id,
                    step_number: step.stepNumber,
                    type: step.type,
                    subject: step.subject,
                    message: message,
                    scheduled_for: scheduledFor.toISOString(),
                    status: 'scheduled',
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (!followUpError && followUp) {
                scheduledFollowUps.push(followUp);
            }
        }

        // Update lead with follow-up info
        await supabase
            .from('leads')
            .update({
                follow_up_sequence: sequence.id,
                follow_up_count: (lead.follow_up_count || 0) + sequence.steps.length,
                last_follow_up_at: new Date().toISOString()
            })
            .eq('id', leadId);

        return NextResponse.json({
            success: true,
            sequence: sequence.name,
            scheduledCount: scheduledFollowUps.length,
            followUps: scheduledFollowUps
        });

    } catch (error) {
        console.error('Follow-up scheduling error:', error);
        return NextResponse.json(
            { error: 'Failed to schedule follow-ups' },
            { status: 500 }
        );
    }
}

/**
 * GET endpoint to retrieve scheduled follow-ups
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const leadId = searchParams.get('leadId');
        const status = searchParams.get('status') || 'scheduled';

        const supabase = createServerClient();

        let query = supabase
            .from('follow_ups')
            .select('*, leads(name, email, lead_score)')
            .eq('status', status)
            .order('scheduled_for', { ascending: true });

        if (leadId) {
            query = query.eq('lead_id', leadId);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json(
                { error: 'Failed to retrieve follow-ups' },
                { status: 500 }
            );
        }

        return NextResponse.json({ followUps: data });

    } catch (error) {
        console.error('Follow-up retrieval error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve follow-ups' },
            { status: 500 }
        );
    }
}
