import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Simple server client without cookie injection
// For routes that don't need user authentication
export const createServerClient = (): SupabaseClient => {
    return createClient(supabaseUrl, supabaseAnonKey);
};

// Admin client with service role key (bypass RLS)
export const createAdminClient = (): SupabaseClient => {
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, supabaseServiceKey);
};

// Async version for routes that need user context from cookies
export const createServerClientWithCookies = async (): Promise<SupabaseClient> => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Cookie: cookieStore.toString()
            }
        }
    });
};

// For middleware
export const createMiddlewareClient = (cookieString: string): SupabaseClient => {
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Cookie: cookieString
            }
        }
    });
};
