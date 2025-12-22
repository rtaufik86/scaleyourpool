import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

interface ApplicationData {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    yearsInBusiness: string;
    averageProjectValue: string;
    monthlyLeads: string;
    biggestChallenge: string;
    whyInterested: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: ApplicationData = await request.json();

        // Validate required fields
        const requiredFields = [
            'companyName', 'contactName', 'email', 'phone',
            'yearsInBusiness', 'averageProjectValue', 'monthlyLeads',
            'biggestChallenge', 'whyInterested'
        ];

        for (const field of requiredFields) {
            if (!data[field as keyof ApplicationData]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const supabase = createServerClient();

        // Insert application into database
        const { data: application, error } = await supabase
            .from('applications')
            .insert({
                company_name: data.companyName,
                contact_name: data.contactName,
                email: data.email,
                phone: data.phone,
                website: data.website || null,
                years_in_business: data.yearsInBusiness,
                average_project_value: data.averageProjectValue,
                monthly_leads: data.monthlyLeads,
                biggest_challenge: data.biggestChallenge,
                why_interested: data.whyInterested,
                status: 'pending',
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);

            // If table doesn't exist, log but don't fail
            if (error.code === '42P01') {
                console.log('Applications table not found. Create it in Supabase.');
                // Still return success for demo purposes
                return NextResponse.json({
                    success: true,
                    message: 'Application received (demo mode)',
                    applicationId: 'demo-' + Date.now()
                });
            }

            return NextResponse.json(
                { error: 'Failed to save application' },
                { status: 500 }
            );
        }

        // Optionally send notification email here
        // await sendNotificationEmail(data);

        return NextResponse.json({
            success: true,
            applicationId: application?.id || 'submitted'
        });

    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json(
            { error: 'Failed to process application' },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve applications (for admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const supabase = createServerClient();

        let query = supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch applications' },
                { status: 500 }
            );
        }

        return NextResponse.json({ applications: data });

    } catch (error) {
        console.error('Fetch applications error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications' },
            { status: 500 }
        );
    }
}
