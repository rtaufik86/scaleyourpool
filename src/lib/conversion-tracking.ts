/**
 * Conversion Tracking Library
 * Tracks conversions for Google Ads and Facebook Ads
 */

export type ConversionEvent =
    | 'page_view'
    | 'chat_started'
    | 'lead_captured'
    | 'appointment_booked'
    | 'phone_call'
    | 'form_submit';

export interface ConversionData {
    event: ConversionEvent;
    value?: number;
    currency?: string;
    leadId?: string;
    leadScore?: 'HOT' | 'WARM' | 'COLD';

    // UTM Parameters
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;

    // Click IDs
    gclid?: string; // Google Click ID
    fbclid?: string; // Facebook Click ID

    // User data (for enhanced conversions)
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;

    // Additional metadata
    userAgent?: string;
    ipAddress?: string;
    url?: string;
}

/**
 * Track conversion event
 */
export async function trackConversion(data: ConversionData): Promise<void> {
    try {
        // Send to backend API
        await fetch('/api/tracking/conversion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            })
        });

        // Also fire client-side tracking
        fireClientSideTracking(data);

    } catch (error) {
        console.error('Conversion tracking error:', error);
    }
}

/**
 * Fire client-side tracking pixels
 */
function fireClientSideTracking(data: ConversionData): void {
    // Google Ads Conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            'send_to': `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${getGoogleConversionLabel(data.event)}`,
            'value': data.value || 0,
            'currency': data.currency || 'USD',
            'transaction_id': data.leadId
        });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', getFacebookEventName(data.event), {
            value: data.value || 0,
            currency: data.currency || 'USD',
            content_name: data.event,
            content_category: data.leadScore || 'unknown'
        });
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', data.event, {
            event_category: 'conversion',
            event_label: data.leadScore,
            value: data.value || 0
        });
    }
}

/**
 * Get Google Ads conversion label based on event
 */
function getGoogleConversionLabel(event: ConversionEvent): string {
    const labels: Record<ConversionEvent, string> = {
        'page_view': process.env.NEXT_PUBLIC_GOOGLE_PAGEVIEW_LABEL || 'default',
        'chat_started': process.env.NEXT_PUBLIC_GOOGLE_CHAT_LABEL || 'chat_start',
        'lead_captured': process.env.NEXT_PUBLIC_GOOGLE_LEAD_LABEL || 'lead_capture',
        'appointment_booked': process.env.NEXT_PUBLIC_GOOGLE_BOOKING_LABEL || 'booking',
        'phone_call': process.env.NEXT_PUBLIC_GOOGLE_CALL_LABEL || 'phone_call',
        'form_submit': process.env.NEXT_PUBLIC_GOOGLE_FORM_LABEL || 'form_submit'
    };
    return labels[event];
}

/**
 * Get Facebook event name based on event
 */
function getFacebookEventName(event: ConversionEvent): string {
    const events: Record<ConversionEvent, string> = {
        'page_view': 'PageView',
        'chat_started': 'InitiateCheckout',
        'lead_captured': 'Lead',
        'appointment_booked': 'Schedule',
        'phone_call': 'Contact',
        'form_submit': 'SubmitApplication'
    };
    return events[event];
}

/**
 * Capture UTM parameters from URL
 */
export function captureUTMParameters(): Partial<ConversionData> {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);

    return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
        gclid: params.get('gclid') || undefined,
        fbclid: params.get('fbclid') || undefined
    };
}

/**
 * Store UTM parameters in session storage
 */
export function storeUTMParameters(): void {
    if (typeof window === 'undefined') return;

    const utmData = captureUTMParameters();
    if (Object.keys(utmData).length > 0) {
        sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    }
}

/**
 * Retrieve stored UTM parameters
 */
export function getStoredUTMParameters(): Partial<ConversionData> {
    if (typeof window === 'undefined') return {};

    const stored = sessionStorage.getItem('utm_data');
    return stored ? JSON.parse(stored) : {};
}

/**
 * Calculate conversion value based on lead score
 */
export function calculateConversionValue(
    leadScore: 'HOT' | 'WARM' | 'COLD',
    budget?: string
): number {
    // Extract budget amount
    const budgetAmount = budget ? parseInt(budget.replace(/[^0-9]/g, '')) : 0;

    // Estimate conversion probability
    const conversionProbability = {
        'HOT': 0.4,   // 40% close rate
        'WARM': 0.15, // 15% close rate
        'COLD': 0.02  // 2% close rate
    }[leadScore];

    // Calculate expected value
    return Math.round(budgetAmount * conversionProbability);
}

/**
 * Track page view with UTM parameters
 */
export function trackPageView(): void {
    const utmData = captureUTMParameters();

    trackConversion({
        event: 'page_view',
        ...utmData
    });
}

/**
 * Track chat started
 */
export function trackChatStarted(): void {
    const utmData = getStoredUTMParameters();

    trackConversion({
        event: 'chat_started',
        ...utmData
    });
}

/**
 * Track lead captured
 */
export function trackLeadCaptured(
    leadId: string,
    leadScore: 'HOT' | 'WARM' | 'COLD',
    email?: string,
    phone?: string,
    budget?: string
): void {
    const utmData = getStoredUTMParameters();
    const value = calculateConversionValue(leadScore, budget);

    trackConversion({
        event: 'lead_captured',
        leadId,
        leadScore,
        value,
        currency: 'USD',
        email,
        phone,
        ...utmData
    });
}

/**
 * Track appointment booked
 */
export function trackAppointmentBooked(
    leadId: string,
    leadScore: 'HOT' | 'WARM' | 'COLD',
    email?: string,
    phone?: string,
    budget?: string
): void {
    const utmData = getStoredUTMParameters();
    const value = calculateConversionValue(leadScore, budget);

    trackConversion({
        event: 'appointment_booked',
        leadId,
        leadScore,
        value,
        currency: 'USD',
        email,
        phone,
        ...utmData
    });
}
