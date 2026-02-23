import { createServerClient } from '@/lib/supabase-server';

interface LeadData {
    name?: string;
    email?: string;
    budget?: string;
    project_value?: number;
    utm_source?: string;
    [key: string]: any;
}

export async function assignLeadAutomatically(leadData: LeadData) {
    const supabase = createServerClient();

    console.log('🤖 Auto-Assigning Lead:', leadData.name);

    // 1. Fetch Rules with their Targets
    const { data: rules } = await supabase
        .from('assignment_rules')
        .select(`
            *,
            targets:rule_targets(*)
        `)
        .eq('is_active', true)
        .order('priority', { ascending: false });

    let assignedUserId = null;
    let assignmentReason = 'Unassigned';
    let targetRecordId = null;

    // 2. Evaluate Rules
    let pValue = leadData.project_value || 0;

    if (rules && rules.length > 0) {
        for (const rule of rules) {
            let matched = false;

            // Match Logic
            if (rule.rule_type === 'budget') {
                const threshold = parseInt(rule.condition_value);
                if (pValue >= threshold) matched = true;
            } else if (rule.rule_type === 'source' && leadData.utm_source) {
                if (leadData.utm_source.toLowerCase().includes(rule.condition_value.toLowerCase())) matched = true;
            }

            if (matched) {
                // Determine which target in this rule gets the lead based on their rule-specific weights
                if (rule.targets && rule.targets.length > 0) {
                    // Selection Logic: Pick the target with lowest (assigned_count / weight)
                    const sortedTargets = [...rule.targets].sort((a, b) => {
                        const scoreA = a.assigned_count / (a.weight || 1);
                        const scoreB = b.assigned_count / (b.weight || 1);
                        return scoreA - scoreB;
                    });

                    assignedUserId = sortedTargets[0].profile_id;
                    targetRecordId = sortedTargets[0].id;
                    assignmentReason = `Rule: ${rule.name}`;
                    console.log(`✅ Matched Rule ${rule.name}, Distributed to: ${assignedUserId} (Weight: ${sortedTargets[0].weight})`);
                } else if (rule.assign_to) {
                    // Legacy support
                    assignedUserId = rule.assign_to;
                    assignmentReason = `Rule: ${rule.name}`;
                }

                if (assignedUserId) break;
            }
        }
    }

    // 3. Fallback: Global Weighted Round Robin
    if (!assignedUserId) {
        // Fetch sales reps with their global weights
        const { data: reps } = await supabase
            .from('profiles')
            .select('id, weight, leads_assigned_count, last_assigned_at')
            .eq('role', 'sales_rep')
            .order('last_assigned_at', { ascending: true, nullsFirst: true });

        if (reps && reps.length > 0) {
            // Sort by (assigned_count / weight)
            const sortedReps = [...reps].sort((a, b) => {
                const scoreA = (a.leads_assigned_count || 0) / (a.weight || 1);
                const scoreB = (b.leads_assigned_count || 0) / (b.weight || 1);
                if (scoreA !== scoreB) return scoreA - scoreB;
                // Tie breaker: who waited longest
                const timeA = a.last_assigned_at ? new Date(a.last_assigned_at).getTime() : 0;
                const timeB = b.last_assigned_at ? new Date(b.last_assigned_at).getTime() : 0;
                return timeA - timeB;
            });

            assignedUserId = sortedReps[0].id;
            assignmentReason = 'Global Weighted Round Robin';
            console.log(`🔄 Fallback to Weighted RR: ${assignedUserId} (Global Weight: ${sortedReps[0].weight})`);
        }
    }

    // 4. Update Profile timestamp, counter & Send Notification
    if (assignedUserId) {
        // Update profile
        await supabase.rpc('increment_lead_count', { profile_id: assignedUserId });

        await supabase
            .from('profiles')
            .update({ last_assigned_at: new Date().toISOString() })
            .eq('id', assignedUserId);

        // If it was a rule target, update that too
        if (targetRecordId) {
            await supabase.rpc('increment_target_count', { target_id: targetRecordId });
        }

        // Create Notification
        await supabase.from('notifications').insert({
            user_id: assignedUserId,
            title: 'New Lead Assigned',
            message: `You have been assigned a new lead: ${leadData.name || 'New Lead'} via ${assignmentReason}.`,
            type: 'lead_assigned',
            link: '/portal/leads'
        });
    }

    return assignedUserId;
}

