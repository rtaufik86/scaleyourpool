import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        // Code will be handled by Supabase client-side
        // Just redirect to portal
    }

    // Redirect to portal dashboard after successful login
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
}
