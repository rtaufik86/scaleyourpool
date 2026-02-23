/**
 * Lead Scoring & Urgency Detection System
 * Analyzes conversation to determine lead quality and urgency
 */

export type LeadScore = 'HOT' | 'WARM' | 'COLD';
export type UrgencyLevel = 'URGENT' | 'MODERATE' | 'LOW';

export interface IntentSignals {
    urgencyKeywords: string[];
    budgetMentioned: boolean;
    timelineMentioned: boolean;
    competitorMentioned: boolean;
    contactInfoProvided: boolean;
    specificQuestions: boolean;
    priceShoppingSignals: boolean;
    readyToBuySignals: boolean;
}

export interface LeadAnalysis {
    score: LeadScore;
    urgency: UrgencyLevel;
    confidence: number; // 0-100
    signals: IntentSignals;
    reasoning: string[];
    recommendedAction: string;
}

/**
 * Analyze conversation to determine lead quality
 */
export function analyzeLeadQuality(
    conversationText: string,
    hasEmail: boolean,
    hasPhone: boolean,
    hasBudget: boolean,
    hasTimeline: boolean
): LeadAnalysis {
    const text = conversationText.toLowerCase();

    // Intent Signal Detection
    const signals: IntentSignals = {
        urgencyKeywords: detectUrgencyKeywords(text),
        budgetMentioned: hasBudget || /\$\d+|budget|afford|price|cost/.test(text),
        timelineMentioned: hasTimeline || detectTimeline(text),
        competitorMentioned: detectCompetitors(text),
        contactInfoProvided: hasEmail || hasPhone,
        specificQuestions: detectSpecificQuestions(text),
        priceShoppingSignals: detectPriceShopping(text),
        readyToBuySignals: detectReadyToBuy(text)
    };

    // Calculate Score
    let scorePoints = 0;
    const reasoning: string[] = [];

    // HOT SIGNALS (High Intent)
    if (signals.readyToBuySignals) {
        scorePoints += 30;
        reasoning.push('🔥 Ready-to-buy signals detected');
    }

    if (signals.contactInfoProvided) {
        scorePoints += 25;
        reasoning.push('✅ Contact information provided');
    }

    if (signals.urgencyKeywords.length > 0) {
        scorePoints += 20;
        reasoning.push(`⏰ Urgency detected: ${signals.urgencyKeywords.join(', ')}`);
    }

    if (signals.budgetMentioned && signals.timelineMentioned) {
        scorePoints += 15;
        reasoning.push('💰 Budget and timeline discussed');
    }

    if (signals.specificQuestions) {
        scorePoints += 10;
        reasoning.push('❓ Asking specific project questions');
    }

    // WARM SIGNALS (Medium Intent)
    if (signals.budgetMentioned || signals.timelineMentioned) {
        scorePoints += 5;
        reasoning.push('📊 Project details being discussed');
    }

    // COLD SIGNALS (Low Intent - Deduct Points)
    if (signals.priceShoppingSignals && !signals.contactInfoProvided) {
        scorePoints -= 15;
        reasoning.push('⚠️ Price shopping without commitment');
    }

    if (signals.competitorMentioned && !signals.readyToBuySignals) {
        scorePoints -= 10;
        reasoning.push('🔍 Comparing multiple contractors');
    }

    // Determine Lead Score
    let score: LeadScore;
    let urgency: UrgencyLevel;
    let recommendedAction: string;

    if (scorePoints >= 60) {
        score = 'HOT';
        urgency = signals.urgencyKeywords.length > 0 ? 'URGENT' : 'MODERATE';
        recommendedAction = '🚨 CALL IMMEDIATELY - High conversion probability';
    } else if (scorePoints >= 30) {
        score = 'WARM';
        urgency = signals.urgencyKeywords.length > 0 ? 'MODERATE' : 'LOW';
        recommendedAction = '📞 Follow up within 2 hours - Nurture opportunity';
    } else {
        score = 'COLD';
        urgency = 'LOW';
        recommendedAction = '📧 Add to email drip campaign - Long-term nurture';
    }

    // Confidence calculation
    const confidence = Math.min(100, Math.max(0, scorePoints + 20));

    return {
        score,
        urgency,
        confidence,
        signals,
        reasoning,
        recommendedAction
    };
}

/**
 * Detect urgency keywords in conversation
 */
function detectUrgencyKeywords(text: string): string[] {
    const urgencyPatterns = [
        // Immediate timeline
        { pattern: /asap|as soon as possible|immediately|urgent|right away|this week/, keyword: 'ASAP' },
        { pattern: /by (spring|summer|fall|winter|next month|end of)/, keyword: 'Deadline-driven' },
        { pattern: /selling (the|our) house|moving|relocating/, keyword: 'Time pressure (moving)' },
        { pattern: /party|event|wedding|graduation/, keyword: 'Event deadline' },
        { pattern: /before (summer|winter|spring|fall)/, keyword: 'Seasonal deadline' },

        // Ready to commit
        { pattern: /ready to (start|begin|move forward|sign|commit)/, keyword: 'Ready to commit' },
        { pattern: /when can you (start|begin)/, keyword: 'Start date inquiry' },
        { pattern: /how soon|how quickly/, keyword: 'Speed priority' },

        // Decision stage
        { pattern: /final (decision|quote|estimate)/, keyword: 'Final decision stage' },
        { pattern: /ready to (book|schedule|hire)/, keyword: 'Ready to hire' },
        { pattern: /deposit|down payment/, keyword: 'Payment discussion' }
    ];

    const detected: string[] = [];
    for (const { pattern, keyword } of urgencyPatterns) {
        if (pattern.test(text)) {
            detected.push(keyword);
        }
    }

    return detected;
}

/**
 * Detect timeline mentions
 */
function detectTimeline(text: string): boolean {
    const timelinePatterns = [
        /spring|summer|fall|winter|next year/,
        /january|february|march|april|may|june|july|august|september|october|november|december/,
        /\d+\s*(month|week|day)s?/,
        /by (the end of|next|this)/,
        /timeline|timeframe|when/
    ];

    return timelinePatterns.some(pattern => pattern.test(text));
}

/**
 * Detect competitor mentions
 */
function detectCompetitors(text: string): boolean {
    const competitorPatterns = [
        /other (contractor|builder|company|companies)/,
        /comparing (quotes|prices|estimates)/,
        /shopping around/,
        /talked to|speaking with|contacted.*other/,
        /cheaper|better price|lower cost/,
        /competitor|competition/
    ];

    return competitorPatterns.some(pattern => pattern.test(text));
}

/**
 * Detect specific project questions
 */
function detectSpecificQuestions(text: string): boolean {
    const specificPatterns = [
        /what (type|kind|style) of/,
        /can you (do|build|install)/,
        /do you (offer|provide|include)/,
        /how (long|much|many)/,
        /what's (included|the process|your warranty)/,
        /tell me (about|more about)/,
        /explain|describe|details about/
    ];

    return specificPatterns.some(pattern => pattern.test(text));
}

/**
 * Detect price shopping behavior
 */
function detectPriceShopping(text: string): boolean {
    const priceShoppingPatterns = [
        /how much (does|will|would).*cost/,
        /what('s| is) (the|your) (price|cost|rate)/,
        /ballpark (figure|estimate|price)/,
        /rough (estimate|cost|price)/,
        /just (curious|wondering|looking)/,
        /just browsing|just checking/
    ];

    return priceShoppingPatterns.some(pattern => pattern.test(text));
}

/**
 * Detect ready-to-buy signals
 */
function detectReadyToBuy(text: string): boolean {
    const readyToBuyPatterns = [
        /ready to (start|begin|proceed|move forward)/,
        /let's (do|start|begin|schedule)/,
        /i want to (hire|book|schedule)/,
        /when can (you|we) (start|begin)/,
        /sign (the|a) contract/,
        /make (a|the) deposit/,
        /book (an|a) appointment/,
        /schedule (a|the) (consultation|meeting|visit)/,
        /what's (the )?next step/,
        /how do we (proceed|move forward|get started)/
    ];

    return readyToBuyPatterns.some(pattern => pattern.test(text));
}

/**
 * Generate alert message for contractors
 */
export function generateAlertMessage(analysis: LeadAnalysis, leadData: any): string {
    const emoji = analysis.score === 'HOT' ? '🔥' : analysis.score === 'WARM' ? '⚡' : '📧';

    let message = `${emoji} NEW ${analysis.score} LEAD - ${analysis.urgency} PRIORITY\n\n`;
    message += `📊 Confidence: ${analysis.confidence}%\n`;
    message += `⏰ Urgency: ${analysis.urgency}\n\n`;

    message += `👤 Contact Info:\n`;
    if (leadData.name) message += `Name: ${leadData.name}\n`;
    if (leadData.email) message += `Email: ${leadData.email}\n`;
    if (leadData.phone) message += `Phone: ${leadData.phone}\n`;
    if (leadData.budget) message += `Budget: ${leadData.budget}\n`;
    if (leadData.timeline) message += `Timeline: ${leadData.timeline}\n`;

    message += `\n🎯 Why This Lead Scores ${analysis.score}:\n`;
    analysis.reasoning.forEach(reason => {
        message += `• ${reason}\n`;
    });

    message += `\n💡 Recommended Action:\n${analysis.recommendedAction}\n`;

    if (analysis.signals.urgencyKeywords.length > 0) {
        message += `\n⚠️ URGENCY SIGNALS DETECTED:\n`;
        analysis.signals.urgencyKeywords.forEach(keyword => {
            message += `• ${keyword}\n`;
        });
    }

    return message;
}
