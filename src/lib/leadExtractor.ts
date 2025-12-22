// Lead Extraction Utilities
// Extracts useful information from chat conversations

interface ExtractedLeadInfo {
    email: string | null;
    phone: string | null;
    name: string | null;
    budget: string | null;
    projectType: string | null;
    timeline: string | null;
    location: string | null;
    hasKids: boolean | null;
    poolType: string | null;
}

// Regex patterns
const emailRegex = /[\w.-]+@[\w.-]+\.\w+/gi;
const phoneRegex = /(?:\+1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/gi;
const namePatterns = [
    /(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
    /(?:this is)\s+([A-Z][a-z]+)/gi,
];

// Budget patterns
const budgetPatterns = [
    /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:k|K|thousand)?/gi,
    /(\d{1,3})\s*(?:k|K|thousand)\s*(?:dollars?)?/gi,
    /budget\s*(?:is|of|around|about)?\s*\$?(\d{1,3}(?:,\d{3})*)/gi,
    /spend\s*(?:around|about|up to)?\s*\$?(\d{1,3}(?:,\d{3})*)/gi,
];

// Timeline patterns
const timelinePatterns = [
    /(?:start|begin|ready|want it)\s*(?:by|in|around|this)?\s*(spring|summer|fall|winter|january|february|march|april|may|june|july|august|september|october|november|december|next year|this year|\d+ months?)/gi,
    /(asap|as soon as possible|immediately|right away)/gi,
    /(?:in the next|within)\s*(\d+\s*(?:weeks?|months?|years?))/gi,
];

// Pool type patterns
const poolTypePatterns = [
    /(infinity pool|vanishing edge|negative edge)/gi,
    /(lap pool)/gi,
    /(natural pool|swimming pond)/gi,
    /(vinyl liner|vinyl pool)/gi,
    /(concrete pool|gunite|shotcrete)/gi,
    /(fiberglass pool)/gi,
    /(above ground|above-ground)/gi,
    /(inground|in-ground|in ground)/gi,
    /(plunge pool)/gi,
    /(cocktail pool|spool)/gi,
];

// Project type patterns
const projectTypePatterns = [
    /(new construction|new build|building new|brand new)/gi,
    /(renovation|remodel|redo|upgrade|update)/gi,
    /(replacement|replace)/gi,
];

export function extractLeadInfo(conversationText: string): ExtractedLeadInfo {
    const result: ExtractedLeadInfo = {
        email: null,
        phone: null,
        name: null,
        budget: null,
        projectType: null,
        timeline: null,
        location: null,
        hasKids: null,
        poolType: null,
    };

    // Extract email
    const emailMatch = conversationText.match(emailRegex);
    if (emailMatch) {
        result.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = conversationText.match(phoneRegex);
    if (phoneMatch) {
        result.phone = phoneMatch[0];
    }

    // Extract name
    for (const pattern of namePatterns) {
        const match = pattern.exec(conversationText);
        if (match && match[1]) {
            result.name = match[1].trim();
            break;
        }
    }

    // Extract budget
    for (const pattern of budgetPatterns) {
        const match = pattern.exec(conversationText);
        if (match && match[1]) {
            const num = parseInt(match[1].replace(/,/g, ''));
            // Convert k notation
            if (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand')) {
                result.budget = `$${num * 1000}`;
            } else if (num < 500) {
                // Likely thousands notation (e.g., "80" means $80k)
                result.budget = `$${num * 1000}`;
            } else {
                result.budget = `$${num}`;
            }
            break;
        }
    }

    // Extract timeline
    for (const pattern of timelinePatterns) {
        const match = pattern.exec(conversationText);
        if (match) {
            result.timeline = match[1] || match[0];
            break;
        }
    }

    // Extract pool type
    for (const pattern of poolTypePatterns) {
        const match = pattern.exec(conversationText);
        if (match) {
            result.poolType = match[1];
            break;
        }
    }

    // Extract project type
    for (const pattern of projectTypePatterns) {
        const match = pattern.exec(conversationText);
        if (match) {
            result.projectType = match[1].includes('renovation') || match[1].includes('remodel')
                ? 'Renovation'
                : 'New Construction';
            break;
        }
    }

    // Check for kids/family mentions
    const kidsPatterns = /\b(kids?|children|child|family|toddler|teenager|son|daughter)\b/gi;
    result.hasKids = kidsPatterns.test(conversationText);

    return result;
}

// Calculate lead quality score (0-100)
export function calculateLeadScore(info: ExtractedLeadInfo): number {
    let score = 0;

    // Contact info is most important
    if (info.email) score += 25;
    if (info.phone) score += 25;
    if (info.name) score += 10;

    // Budget qualification
    if (info.budget) {
        const budgetNum = parseInt(info.budget.replace(/[$,]/g, ''));
        if (budgetNum >= 150000) score += 20;
        else if (budgetNum >= 80000) score += 15;
        else if (budgetNum >= 50000) score += 10;
        else score += 5;
    }

    // Other qualifying info
    if (info.timeline) score += 5;
    if (info.poolType) score += 5;
    if (info.projectType) score += 5;

    return Math.min(score, 100);
}

export function getLeadStatus(score: number): 'hot' | 'warm' | 'cold' {
    if (score >= 60) return 'hot';
    if (score >= 30) return 'warm';
    return 'cold';
}
