import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * Booking Management API
 * Handles appointment booking requests and tracking
 */

export async function POST(request: NextRequest) {
    try {
        const {
            leadId,
            provider,
            bookingUrl,
            scheduledFor,
            leadData
        } = await request.json();

        const supabase = createServerClient();

        // Create booking record
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                lead_id: leadId,
                provider: provider || 'cal',
                booking_url: bookingUrl,
                scheduled_for: scheduledFor,
                status: 'pending',
                lead_name: leadData?.name,
                lead_email: leadData?.email,
                lead_phone: leadData?.phone,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (bookingError) {
            console.error('Booking creation error:', bookingError);
            return NextResponse.json(
                { error: 'Failed to create booking' },
                { status: 500 }
            );
        }

        // Update lead status to "appointment_scheduled"
        if (leadId) {
            await supabase
                .from('leads')
                .update({
                    status: 'appointment_scheduled',
                    last_contacted_at: new Date().toISOString()
                })
                .eq('id', leadId);
        }

        // Send confirmation email (optional)
        if (leadData?.email && process.env.SEND_BOOKING_CONFIRMATIONS === 'true') {
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/alerts/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: leadData.email,
                    subject: 'Appointment Booking Confirmation',
                    message: generateBookingConfirmation(leadData, scheduledFor),
                    priority: 'WARM'
                })
            });
        }

        return NextResponse.json({
            success: true,
            bookingId: booking.id,
            message: 'Booking created successfully'
        });

    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}

/**
 * GET endpoint to retrieve booking status
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const leadId = searchParams.get('leadId');
        const bookingId = searchParams.get('bookingId');

        const supabase = createServerClient();

        let query = supabase.from('bookings').select('*');

        if (bookingId) {
            query = query.eq('id', bookingId);
        } else if (leadId) {
            query = query.eq('lead_id', leadId);
        } else {
            return NextResponse.json(
                { error: 'leadId or bookingId required' },
                { status: 400 }
            );
        }

        const { data, error } = await query.single();

        if (error) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ booking: data });

    } catch (error) {
        console.error('Booking retrieval error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve booking' },
            { status: 500 }
        );
    }
}

/**
 * PATCH endpoint to update booking status
 */
export async function PATCH(request: NextRequest) {
    try {
        const { bookingId, status, scheduledFor, notes } = await request.json();

        const supabase = createServerClient();

        const updateData: any = {
            updated_at: new Date().toISOString()
        };

        if (status) updateData.status = status;
        if (scheduledFor) updateData.scheduled_for = scheduledFor;
        if (notes) updateData.notes = notes;

        const { data, error } = await supabase
            .from('bookings')
            .update(updateData)
            .eq('id', bookingId)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update booking' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            booking: data
        });

    } catch (error) {
        console.error('Booking update error:', error);
        return NextResponse.json(
            { error: 'Failed to update booking' },
            { status: 500 }
        );
    }
}

/**
 * Generate booking confirmation message
 */
function generateBookingConfirmation(leadData: any, scheduledFor?: string): string {
    return `
Hi ${leadData.name || 'there'}!

Thank you for scheduling your free pool consultation with Paradise Pool!

${scheduledFor ? `📅 Your appointment is scheduled for: ${new Date(scheduledFor).toLocaleString()}` : ''}

What to expect:
✅ 30-minute consultation with our pool design expert
✅ Discussion of your vision, budget, and timeline
✅ Preliminary design ideas and recommendations
✅ Answers to all your questions
✅ No obligation or pressure

We'll send you a calendar invitation shortly with all the details.

Looking forward to helping you create your dream pool!

Best regards,
Paradise Pool Team

Questions? Call us at (555) 765-7665
    `.trim();
}
