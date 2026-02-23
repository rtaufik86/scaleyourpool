/**
 * Smart Follow-Up Automation System
 * Automatically nurtures leads based on their score and engagement
 */

export type FollowUpType = 'email' | 'sms' | 'both';
export type FollowUpTrigger = 'no_response' | 'abandoned_chat' | 'post_booking' | 'cold_lead_nurture' | 'warm_lead_reminder';

export interface FollowUpSequence {
    id: string;
    name: string;
    trigger: FollowUpTrigger;
    leadScore: 'HOT' | 'WARM' | 'COLD' | 'ALL';
    steps: FollowUpStep[];
    enabled: boolean;
}

export interface FollowUpStep {
    stepNumber: number;
    delayHours: number;
    type: FollowUpType;
    subject?: string;
    message: string;
    includeBookingLink?: boolean;
    includePricing?: boolean;
    includePortfolio?: boolean;
}

/**
 * Pre-configured follow-up sequences
 */
export const FOLLOW_UP_SEQUENCES: FollowUpSequence[] = [
    // HOT LEAD - Immediate Follow-Up
    {
        id: 'hot-lead-immediate',
        name: 'Hot Lead - Immediate Follow-Up',
        trigger: 'no_response',
        leadScore: 'HOT',
        enabled: true,
        steps: [
            {
                stepNumber: 1,
                delayHours: 1, // 1 hour after no response
                type: 'both',
                subject: '🔥 Still interested in your pool project?',
                message: `Hi {name},

I noticed we were chatting about your pool project earlier. You mentioned a ${'{budget}'} budget and wanting to start ${'{timeline}'}.

I'd love to help you move forward! I have a few time slots available this week for a free consultation:

{booking_link}

Or if you prefer, give me a call directly: (555) 765-7665

Looking forward to hearing from you!

Best,
Paradise Pool Team`,
                includeBookingLink: true
            },
            {
                stepNumber: 2,
                delayHours: 24, // Next day if still no response
                type: 'email',
                subject: 'Quick question about your pool project',
                message: `Hi {name},

I wanted to follow up one more time. Based on our conversation, I think you'd really love our {suggested_style} design.

I've attached some similar projects we've completed in your budget range (${'{budget}'}).

{portfolio_examples}

Ready to schedule your free consultation?
{booking_link}

Best regards,
Paradise Pool Design Team`,
                includeBookingLink: true,
                includePortfolio: true
            }
        ]
    },

    // WARM LEAD - Nurture Sequence
    {
        id: 'warm-lead-nurture',
        name: 'Warm Lead - Nurture Sequence',
        trigger: 'no_response',
        leadScore: 'WARM',
        enabled: true,
        steps: [
            {
                stepNumber: 1,
                delayHours: 4, // 4 hours after chat
                type: 'email',
                subject: 'Pool design ideas for your backyard',
                message: `Hi {name},

Thanks for chatting with us about your pool project!

Based on what you shared, here are some design ideas that might inspire you:

{portfolio_examples}

These projects are similar to your budget range (${'{budget}'}) and timeline (${'{timeline}'}).

When you're ready to discuss your project in detail, you can book a free consultation here:
{booking_link}

No pressure - just here to help when you're ready!

Best,
Paradise Pool Team`,
                includeBookingLink: true,
                includePortfolio: true
            },
            {
                stepNumber: 2,
                delayHours: 72, // 3 days later
                type: 'email',
                subject: 'Financing options for your pool project',
                message: `Hi {name},

I wanted to share some financing options that might make your pool project more accessible:

💰 Financing Options:
• As low as $XXX/month
• 0% APR for 12 months (qualified buyers)
• Flexible payment plans
• Quick approval process

{pricing_info}

Many of our clients find that financing makes their dream pool achievable sooner than expected.

Want to discuss your options? Book a quick call:
{booking_link}

Best regards,
Paradise Pool Financing Team`,
                includeBookingLink: true,
                includePricing: true
            },
            {
                stepNumber: 3,
                delayHours: 168, // 1 week later
                type: 'email',
                subject: 'Still thinking about your pool?',
                message: `Hi {name},

Just checking in! I know pool projects are big decisions, and it's smart to take your time.

If you have any questions, I'm here to help:
• Budget concerns? Let's discuss financing
• Timeline questions? We can work around your schedule
• Design ideas? I can send more examples

Or if you're ready to move forward, book your free consultation:
{booking_link}

No pressure - reach out whenever you're ready!

Best,
Paradise Pool Team`,
                includeBookingLink: true
            }
        ]
    },

    // COLD LEAD - Long-term Nurture
    {
        id: 'cold-lead-nurture',
        name: 'Cold Lead - Long-term Nurture',
        trigger: 'cold_lead_nurture',
        leadScore: 'COLD',
        enabled: true,
        steps: [
            {
                stepNumber: 1,
                delayHours: 24, // Next day
                type: 'email',
                subject: 'Pool planning resources',
                message: `Hi {name},

Thanks for your interest in pool construction!

Since you're in the early planning stages, I wanted to share some helpful resources:

📚 Free Resources:
• Pool Design Guide (PDF)
• Budget Planning Worksheet
• Timeline & Permitting Checklist
• Maintenance Cost Calculator

{resource_links}

When you're ready to discuss your project, we're here to help!

Best,
Paradise Pool Team`,
                includePortfolio: false
            },
            {
                stepNumber: 2,
                delayHours: 336, // 2 weeks later
                type: 'email',
                subject: 'Pool trends for 2025',
                message: `Hi {name},

Thought you might enjoy seeing what's trending in pool design for 2025:

🌟 Top Trends:
• Infinity edges with LED lighting
• Natural lagoon-style pools
• Smart automation systems
• Eco-friendly heating options

{portfolio_examples}

Still exploring? No problem! We're here when you're ready.

Best,
Paradise Pool Design Team`,
                includePortfolio: true
            },
            {
                stepNumber: 3,
                delayHours: 720, // 1 month later
                type: 'email',
                subject: 'Special spring promotion',
                message: `Hi {name},

We're offering a special promotion for spring 2025 projects:

🎁 Limited Time Offer:
• Free $2,500 3D design with quote
• Priority scheduling for spring starts
• Extended warranty on early bookings

Interested? Book a free consultation:
{booking_link}

Offer expires soon!

Best,
Paradise Pool Team`,
                includeBookingLink: true
            }
        ]
    },

    // ABANDONED CHAT - Re-engagement
    {
        id: 'abandoned-chat',
        name: 'Abandoned Chat - Re-engagement',
        trigger: 'abandoned_chat',
        leadScore: 'ALL',
        enabled: true,
        steps: [
            {
                stepNumber: 1,
                delayHours: 0.5, // 30 minutes
                type: 'email',
                subject: 'Did we lose you?',
                message: `Hi {name},

I noticed our conversation got cut off earlier. No worries - happens to the best of us!

I'm here if you want to pick up where we left off. You can:
• Reply to this email with your questions
• Book a call: {booking_link}
• Or just continue chatting: {chat_link}

Looking forward to helping with your pool project!

Best,
Paradise Pool Team`,
                includeBookingLink: true
            }
        ]
    },

    // POST-BOOKING - Confirmation & Preparation
    {
        id: 'post-booking',
        name: 'Post-Booking - Preparation',
        trigger: 'post_booking',
        leadScore: 'ALL',
        enabled: true,
        steps: [
            {
                stepNumber: 1,
                delayHours: 1, // 1 hour after booking
                type: 'email',
                subject: '✅ Your consultation is confirmed!',
                message: `Hi {name},

Great news - your free pool consultation is confirmed!

📅 Appointment Details:
Date: {appointment_date}
Time: {appointment_time}
Duration: 30 minutes
Meeting: {meeting_link}

📋 To Prepare:
• Think about your must-have features
• Note any questions you have
• Have photos of your backyard ready (optional)
• Consider your ideal timeline

We'll send you a reminder 24 hours before your appointment.

Looking forward to meeting you!

Best,
Paradise Pool Design Team`,
                includeBookingLink: false
            },
            {
                stepNumber: 2,
                delayHours: 24, // 24 hours before appointment
                type: 'both',
                subject: '⏰ Reminder: Your consultation is tomorrow',
                message: `Hi {name},

This is a friendly reminder about your pool consultation tomorrow:

📅 Tomorrow at {appointment_time}
📞 Meeting link: {meeting_link}

See you soon!

Best,
Paradise Pool Team`,
                includeBookingLink: false
            }
        ]
    }
];

/**
 * Generate personalized follow-up message
 */
export function generateFollowUpMessage(
    template: string,
    leadData: any,
    includeBookingLink?: boolean,
    includePortfolio?: boolean,
    includePricing?: boolean
): string {
    let message = template
        .replace(/{name}/g, leadData.name || 'there')
        .replace(/{budget}/g, leadData.budget || 'your budget')
        .replace(/{timeline}/g, leadData.timeline || 'soon')
        .replace(/{suggested_style}/g, suggestPoolStyle(leadData))
        .replace(/{appointment_date}/g, leadData.appointmentDate || 'TBD')
        .replace(/{appointment_time}/g, leadData.appointmentTime || 'TBD')
        .replace(/{meeting_link}/g, leadData.meetingLink || 'TBD');

    // Add booking link
    if (includeBookingLink) {
        const bookingLink = process.env.NEXT_PUBLIC_CAL_BOOKING_LINK || 'https://cal.com/paradise-pool/consultation';
        message = message.replace(/{booking_link}/g, `\n\n📅 Book here: ${bookingLink}\n`);
    } else {
        message = message.replace(/{booking_link}/g, '');
    }

    // Add portfolio examples
    if (includePortfolio) {
        message = message.replace(/{portfolio_examples}/g, `
📸 View Similar Projects:
• Modern Infinity Pool - $95K
• Contemporary White Villa - $85K
• Family Entertainment Pool - $78K

See full portfolio: ${process.env.NEXT_PUBLIC_APP_URL}/demo#portfolio
`);
    } else {
        message = message.replace(/{portfolio_examples}/g, '');
    }

    // Add pricing info
    if (includePricing) {
        message = message.replace(/{pricing_info}/g, `
💵 Typical Project Ranges:
• Basic Custom Pool: $50-80K
• Premium Design: $80-150K
• Luxury Features: $150K+

Financing available from $XXX/month
`);
    } else {
        message = message.replace(/{pricing_info}/g, '');
    }

    // Clean up extra newlines
    return message.replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Suggest pool style based on lead data
 */
function suggestPoolStyle(leadData: any): string {
    const budget = parseInt(leadData.budget?.replace(/[^0-9]/g, '') || '0');

    if (budget >= 150000) return 'luxury infinity edge';
    if (budget >= 100000) return 'premium custom';
    if (budget >= 80000) return 'contemporary modern';
    return 'classic family';
}

/**
 * Determine which follow-up sequence to use
 */
export function getFollowUpSequence(
    leadScore: 'HOT' | 'WARM' | 'COLD',
    trigger: FollowUpTrigger
): FollowUpSequence | null {
    return FOLLOW_UP_SEQUENCES.find(
        seq => seq.leadScore === leadScore && seq.trigger === trigger && seq.enabled
    ) || FOLLOW_UP_SEQUENCES.find(
        seq => seq.leadScore === 'ALL' && seq.trigger === trigger && seq.enabled
    ) || null;
}

/**
 * Calculate next follow-up time
 */
export function calculateNextFollowUp(
    lastContactAt: Date,
    delayHours: number
): Date {
    const nextFollowUp = new Date(lastContactAt);
    nextFollowUp.setHours(nextFollowUp.getHours() + delayHours);
    return nextFollowUp;
}
