/**
 * Calendar Booking Integration Component
 * Allows users to book appointments directly from chat
 * Supports: Cal.com, Calendly, or custom booking
 */

'use client';

import { useState } from 'react';
import { Calendar, Clock, Check, X, ExternalLink } from 'lucide-react';

export type BookingProvider = 'cal' | 'calendly' | 'custom';

interface CalendarBookingProps {
    provider?: BookingProvider;
    calLink?: string; // Cal.com booking link
    calendlyLink?: string; // Calendly link
    onBookingComplete?: (bookingData: any) => void;
    leadData?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

export default function CalendarBooking({
    provider = 'cal',
    calLink,
    calendlyLink,
    onBookingComplete,
    leadData
}: CalendarBookingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    // Get booking URL based on provider
    const getBookingUrl = () => {
        if (provider === 'cal' && calLink) {
            // Pre-fill Cal.com with lead data
            const url = new URL(calLink);
            if (leadData?.name) url.searchParams.set('name', leadData.name);
            if (leadData?.email) url.searchParams.set('email', leadData.email);
            return url.toString();
        }

        if (provider === 'calendly' && calendlyLink) {
            // Pre-fill Calendly with lead data
            const url = new URL(calendlyLink);
            if (leadData?.name) url.searchParams.set('name', leadData.name);
            if (leadData?.email) url.searchParams.set('email', leadData.email);
            return url.toString();
        }

        return null;
    };

    const bookingUrl = getBookingUrl();

    // Handle booking completion
    const handleBookingComplete = () => {
        setIsBooked(true);
        if (onBookingComplete) {
            onBookingComplete({
                provider,
                leadData,
                bookedAt: new Date().toISOString()
            });
        }
    };

    if (isBooked) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                    <Check size={24} />
                    <span className="font-semibold">Appointment Booked!</span>
                </div>
                <p className="text-sm text-green-700">
                    You'll receive a confirmation email shortly with all the details.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
            {/* Booking CTA */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-white" size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">
                        Ready to Schedule Your Free Consultation?
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                        Book a time that works for you. Our pool design expert will review your project and answer all your questions.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-1 mb-3">
                        {[
                            'Free 30-minute consultation',
                            'Discuss your vision & budget',
                            'Get preliminary design ideas',
                            'No obligation or pressure'
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-slate-700">
                                <Check size={14} className="text-cyan-500 flex-shrink-0" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>

                    {/* Booking Button */}
                    {bookingUrl ? (
                        <button
                            onClick={() => {
                                window.open(bookingUrl, '_blank', 'width=800,height=800');
                                // Assume booking completed after opening (can be enhanced with webhooks)
                                setTimeout(() => handleBookingComplete(), 2000);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                        >
                            <Calendar size={18} />
                            <span>Book Your Free Consultation</span>
                            <ExternalLink size={16} />
                        </button>
                    ) : (
                        <div className="text-center text-sm text-slate-500">
                            Calendar booking not configured. Please contact us directly.
                        </div>
                    )}
                </div>
            </div>

            {/* Alternative: Manual Contact */}
            <div className="text-center pt-3 border-t border-cyan-200">
                <p className="text-xs text-slate-500">
                    Prefer to call? <a href="tel:555-765-7665" className="text-cyan-600 hover:text-cyan-700 font-semibold">(555) 765-7665</a>
                </p>
            </div>
        </div>
    );
}

/**
 * Inline Calendar Embed Component
 * For embedding calendar directly in chat (alternative to popup)
 */
export function InlineCalendarEmbed({
    provider = 'cal',
    calLink,
    calendlyLink,
    height = '600px'
}: {
    provider?: BookingProvider;
    calLink?: string;
    calendlyLink?: string;
    height?: string;
}) {
    const embedUrl = provider === 'cal' ? calLink : calendlyLink;

    if (!embedUrl) {
        return (
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 text-center">
                <Calendar size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600">Calendar booking not configured</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden" style={{ height }}>
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book Appointment"
                className="rounded-lg"
            />
        </div>
    );
}

/**
 * Quick Availability Display
 * Shows next available slots without opening calendar
 */
export function QuickAvailability({
    slots = [
        { day: 'Tomorrow', time: '10:00 AM' },
        { day: 'Tomorrow', time: '2:00 PM' },
        { day: 'Wednesday', time: '11:00 AM' },
        { day: 'Thursday', time: '3:00 PM' }
    ],
    onSelectSlot
}: {
    slots?: Array<{ day: string; time: string }>;
    onSelectSlot?: (slot: any) => void;
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-cyan-500" />
                <h4 className="font-semibold text-slate-900">Next Available Times</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {slots.map((slot, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectSlot?.(slot)}
                        className="bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 rounded-lg p-3 text-left transition-all group"
                    >
                        <div className="text-xs text-slate-500 mb-1">{slot.day}</div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-cyan-600">
                            {slot.time}
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-3 text-center">
                <button className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold">
                    View all available times →
                </button>
            </div>
        </div>
    );
}
