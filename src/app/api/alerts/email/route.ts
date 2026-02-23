import { NextRequest, NextResponse } from 'next/server';

/**
 * Email Alert API - Send instant notifications to contractors
 * POST /api/alerts/email
 */

interface EmailAlertRequest {
    to: string; // Contractor email
    subject: string;
    message: string;
    leadData: any;
    priority: 'HOT' | 'WARM' | 'COLD';
}

export async function POST(req: NextRequest) {
    try {
        const body: EmailAlertRequest = await req.json();
        const { to, subject, message, leadData, priority } = body;

        // Validate required fields
        if (!to || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get email service provider from env
        const emailProvider = process.env.EMAIL_PROVIDER || 'resend'; // 'resend' or 'sendgrid'

        let result;
        if (emailProvider === 'resend') {
            result = await sendViaResend(to, subject, message, priority);
        } else if (emailProvider === 'sendgrid') {
            result = await sendViaSendGrid(to, subject, message, priority);
        } else {
            // Fallback: Log to console (development)
            console.log('📧 EMAIL ALERT (Dev Mode):');
            console.log('To:', to);
            console.log('Subject:', subject);
            console.log('Message:', message);
            console.log('Lead Data:', leadData);

            result = { success: true, provider: 'console' };
        }

        return NextResponse.json({
            ...result
        });

    } catch (error) {
        console.error('Email alert error:', error);
        return NextResponse.json(
            { error: 'Failed to send email alert' },
            { status: 500 }
        );
    }
}

/**
 * Send email via Resend (Recommended - Simple & Affordable)
 */
async function sendViaResend(to: string, subject: string, message: string, priority: string) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
    }

    const priorityEmoji = priority === 'HOT' ? '🔥' : priority === 'WARM' ? '⚡' : '📧';

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'alerts@scaleyourpool.com',
            to: [to],
            subject: `${priorityEmoji} ${subject}`,
            html: formatEmailHTML(message, priority),
            text: message
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
    }

    const data = await response.json();
    return { success: true, provider: 'resend', messageId: data.id };
}

/**
 * Send email via SendGrid (Alternative)
 */
async function sendViaSendGrid(to: string, subject: string, message: string, priority: string) {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

    if (!SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY not configured');
    }

    const priorityEmoji = priority === 'HOT' ? '🔥' : priority === 'WARM' ? '⚡' : '📧';

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: to }],
                subject: `${priorityEmoji} ${subject}`
            }],
            from: {
                email: process.env.EMAIL_FROM || 'alerts@scaleyourpool.com',
                name: 'ScaleYourPool Alerts'
            },
            content: [
                {
                    type: 'text/plain',
                    value: message
                },
                {
                    type: 'text/html',
                    value: formatEmailHTML(message, priority)
                }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`SendGrid API error: ${error}`);
    }

    return { success: true, provider: 'sendgrid' };
}

/**
 * Format email as HTML for better presentation
 */
function formatEmailHTML(message: string, priority: string): string {
    const priorityColor = priority === 'HOT' ? '#EF4444' : priority === 'WARM' ? '#F59E0B' : '#6B7280';
    const priorityBg = priority === 'HOT' ? '#FEE2E2' : priority === 'WARM' ? '#FEF3C7' : '#F3F4F6';

    // Convert plain text message to HTML with formatting
    const htmlMessage = message
        .replace(/\n/g, '<br>')
        .replace(/🔥|⚡|📧|📊|⏰|👤|🎯|💡|⚠️/g, match => `<span style="font-size: 18px;">${match}</span>`)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^(.*?):$/gm, '<strong>$1:</strong>');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #06B6D4 0%, #2563EB 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                ScaleYourPool AI Sales Concierge
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                New Lead Alert
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Priority Badge -->
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <div style="display: inline-block; background-color: ${priorityBg}; color: ${priorityColor}; padding: 10px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; border: 2px solid ${priorityColor};">
                                ${priority} PRIORITY LEAD
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Message Content -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid ${priorityColor};">
                                <div style="color: #1f2937; font-size: 14px; line-height: 1.6;">
                                    ${htmlMessage}
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px; text-align: center;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/conversations" 
                               style="display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #2563EB 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                View in Dashboard →
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                This is an automated alert from your AI Sales Concierge
                            </p>
                            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/settings" style="color: #06B6D4; text-decoration: none;">
                                    Manage notification settings
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}
