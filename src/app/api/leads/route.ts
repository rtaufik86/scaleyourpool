import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, phone, name, budget, projectType, timeline, notes, conversationLog } = await request.json();

        const supabase = createServerClient();

        // Insert lead into database
        const { data, error } = await supabase
            .from('leads')
            .insert({
                email,
                phone,
                name,
                budget,
                project_type: projectType,
                timeline,
                notes,
                conversation_log: conversationLog,
                source: 'ai_chat_widget',
                status: 'new',
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, leadId: data.id });
    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json(
            { error: 'Failed to process lead' },
            { status: 500 }
        );
    }
}
