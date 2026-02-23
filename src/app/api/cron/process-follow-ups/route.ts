import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * Cron Job: Process Scheduled Follow-Ups
 * This endpoint should be called every 15 minutes by a cron service
 * (Vercel Cron, GitHub Actions, or external cron service)
 * 
 * URL: /api/cron/process-follow-ups
 * Method: GET
 * Auth: Requires CRON_SECRET in headers
 */

export async function GET(request: NextRequest) {
    try {
        // Verify cron secret for security
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const supabase = createServerClient();
        const now = new Date();

        // Get all follow-ups that are due
        const { data: dueFollowUps, error: fetchError } = await supabase
            .from('follow_ups')
            .select('*, leads(*)')
            .eq('status', 'scheduled')
            .lte('scheduled_for', now.toISOString())
            .order('scheduled_for', { ascending: true })
            .limit(50); // Process 50 at a time

        if (fetchError) {
            console.error('Error fetching follow-ups:', fetchError);
            return NextResponse.json(
                { error: 'Failed to fetch follow-ups' },
                { status: 500 }
            );
        }

        if (!dueFollowUps || dueFollowUps.length === 0) {
            return NextResponse.json({
                success: true,
                processed: 0,
                message: 'No follow-ups due'
            });
        }

        const results = {
            processed: 0,
            sent: 0,
            failed: 0,
            errors: [] as string[]
        };

        // Process each follow-up
        for (const followUp of dueFollowUps) {
            try {
                results.processed++;

                const lead = followUp.leads;
                if (!lead) {
                    results.failed++;
                    results.errors.push(`Lead not found for follow-up ${followUp.id}`);
                    continue;
                }

                // Send email
                if (followUp.type === 'email' || followUp.type === 'both') {
                    if (lead.email) {
                        await sendFollowUpEmail(
                            lead.email,
                            followUp.subject || 'Follow-up from Paradise Pool',
                            followUp.message,
                            lead.name
                        );
                    }
                }

                // Send SMS
                if (followUp.type === 'sms' || followUp.type === 'both') {
                    if (lead.phone && process.env.TWILIO_ENABLED === 'true') {
                        await sendFollowUpSMS(lead.phone, followUp.message);
                    }
                }

                // Update follow-up status
                await supabase
                    .from('follow_ups')
                    .update({
                        status: 'sent',
                        sent_at: new Date().toISOString()
                    })
                    .eq('id', followUp.id);

                // Update lead last_contacted_at
                await supabase
                    .from('leads')
                    .update({
                        last_contacted_at: new Date().toISOString()
                    })
                    .eq('id', lead.id);

                results.sent++;

            } catch (error) {
                results.failed++;
                results.errors.push(`Failed to process follow-up ${followUp.id}: ${error}`);
                console.error(`Follow-up processing error:`, error);

                // Mark as failed
                await supabase
                    .from('follow_ups')
                    .update({
                        status: 'failed',
                        error_message: String(error)
                    })
                    .eq('id', followUp.id);
            }
        }

        return NextResponse.json({
            success: true,
            ...results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: 'Cron job failed', details: String(error) },
            { status: 500 }
        );
    }
}

/**
 * Send follow-up email
 */
async function sendFollowUpEmail(
    to: string,
    subject: string,
    message: string,
    name?: string
): Promise<void> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    await fetch(`${appUrl}/api/alerts/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to,
            subject,
            message,
            priority: 'WARM'
        })
    });
}

/**
 * Send follow-up SMS (Twilio integration)
 */
async function sendFollowUpSMS(to: string, message: string): Promise<void> {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.warn('Twilio not configured - skipping SMS');
        return;
    }

    // Twilio API call
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;

    const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(
                `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
            ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            To: to,
            From: process.env.TWILIO_PHONE_NUMBER || '',
            Body: message.substring(0, 1600) // SMS character limit
        })
    });

    if (!response.ok) {
        throw new Error(`Twilio API error: ${await response.text()}`);
    }
}
