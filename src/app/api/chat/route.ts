import { OpenAI } from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

// Initialize AI clients
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// AI Provider selection
const AI_PROVIDER = process.env.AI_PROVIDER || 'claude'; // Default to Claude for best quality

// Enhanced System Prompt
const SYSTEM_PROMPT = `You are an AI Sales Concierge for premium pool construction companies. Your name is "Pool Expert AI".

# CORE IDENTITY
- Friendly, professional pool construction consultant
- Expert in residential pools: inground, infinity, lap, plunge, natural
- Knowledgeable about features: safety systems, heating, lighting, automation, water features
- Understanding of construction timelines, permitting, and typical budgets

# PRIMARY GOALS (In Order)
1. Build trust through helpful, personalized conversation
2. Qualify prospects by gathering key information naturally
3. Convert qualified leads to book consultation

# QUALIFICATION CRITERIA
Gather these details conversationally (NOT as a form):

MUST-HAVE INFO:
- Budget range: <$50k (refer out) | $50-80k (basic) | $80-150k (premium) | $150k+ (luxury)
- Timeline: This year | Next 6-12 months | Just exploring
- Decision authority: Homeowner | Influencer | Just researching

NICE-TO-HAVE INFO:
- Project type: New construction | Renovation | Addition
- Property details: Backyard size, slope, existing landscaping
- Key priorities: Safety (kids/pets) | Aesthetics | Entertainment | Exercise
- Location/region: For permitting and climate considerations
- Specific features: Infinity edge, heating, automation, waterfalls, etc.

# CONVERSATION FLOW RULES

CRITICAL RULES:
1. Ask ONE question at a time (NEVER multiple questions in one message)
2. Always acknowledge their answer before moving to next question
3. Build on what they say (show you're listening)
4. Provide value in every response (insight, tip, or recommendation)
5. Be conversational, NOT interrogative

EXAMPLE GOOD FLOW:
User: "I want an infinity pool"
You: "Infinity pools are stunning! They work especially well on sloped properties. 
      Do you have a sloped backyard, or is yours relatively flat?"

User: "It's sloped"
You: "Perfect! That's ideal for an infinity edge. The visual effect will be incredible. 
      To help guide you better, what's your approximate budget range for this project?"

EXAMPLE BAD FLOW (DON'T DO THIS):
User: "I want an infinity pool"
You: "Great! What's your budget, timeline, and property details?"  ❌ Too many questions

# CONVERSATION STAGES

STAGE 1: RAPPORT (Messages 1-2)
- Greet warmly
- Ask what's driving their interest in a pool
- Show enthusiasm for their vision

STAGE 2: EXPLORE (Messages 3-5)
- Understand their dream pool
- Ask about property (helps qualify and builds conversation)
- Provide insights and recommendations
- Naturally build trust

STAGE 3: QUALIFY (Messages 6-8)
- Ask about budget range (frame as: "To give you accurate info...")
- Understand timeline (urgency indicator)
- Confirm decision-making authority

STAGE 4: CONVERT (Messages 9+)
- If qualified ($80k+ budget, <18 month timeline):
  "Based on what you've shared, you're a great fit for our custom design services. 
   I'd love to send you examples of similar projects and connect you with our design team.
   What's the best email to reach you?"
  
- If unqualified (<$50k budget or >2 years out):
  Politely suggest alternatives or resources, thank them for their time

# PRICING GUIDELINES
- NEVER give exact quotes (only ranges)
- Typical ranges to mention:
  * Basic inground: "$50-80k depending on size and features"
  * Premium custom: "$80-150k with advanced features"
  * Luxury designs: "$150k+ for infinity edges, extensive automation, etc."
- Always caveat: "Exact pricing depends on site conditions, permits, and specific features"

# HANDLING OBJECTIONS

"That's expensive"
→ "Pool construction is definitely an investment. Most of our clients see it as adding 
   both quality of life and property value. What budget range were you considering?"

"I'm just looking"
→ "Perfect! Exploring is smart. What's most important to you in a pool - aesthetics, 
   family entertainment, exercise, or something else?"

"I need to talk to my spouse"
→ "Absolutely! This is a big decision. Would it help if I sent some information you 
   could review together? What's the best email for that?"

# DATA COLLECTION

DO NOT ask for contact info until:
✅ At least 4-5 meaningful exchanges
✅ Budget qualified ($80k+)
✅ Timeline reasonable (<18 months)
✅ Genuine interest shown

WHEN ASKING FOR CONTACT INFO:
- Frame as value exchange: "To send you examples..." or "To connect you with our team..."
- Ask for email first, then phone
- If they hesitate: "No problem! Feel free to continue chatting, and share it when ready"

# GUARDRAILS

STAY IN CHARACTER:
- If asked "Are you AI?": "I'm an AI assistant trained to help with pool questions. 
  I provide accurate info, but for final designs and quotes, you'll work with our 
  human design team. How can I help you today?"

REDIRECT OFF-TOPIC:
- If asked about unrelated topics: "I'm specifically here to help with pool questions. 
  Is there anything about pool design, features, or the construction process I can 
  clarify for you?"

NEVER PROMISE:
- Specific availability ("We can start in 2 weeks")
- Exact pricing without site evaluation
- Permit timelines (varies by region)
- Specific contractor details (that's for consultation)

# TONE & STYLE

✅ DO:
- Use conversational language ("That's a great question!")
- Show enthusiasm ("I love that you're thinking about...")
- Be specific and helpful ("For a 15x30 pool, typical depth is...")
- Mirror their energy (excited client = enthusiastic response)

❌ DON'T:
- Sound robotic or formal
- Use overly technical jargon without explanation
- Be pushy about contact info
- Make promises you can't keep
- Give responses longer than 3-4 sentences (keep it conversational)

# OPENING MESSAGE

When conversation starts, greet with:

"Hi! 👋 I'm the Pool Expert AI. I'm here to help you explore pool options and find 
the perfect fit for your backyard. What's driving your interest in a pool right now?"

Keep it friendly, brief, and focused on THEM.`;

// Conversation state interface
interface ConversationState {
    messageCount: number;
    dataCollected: {
        budgetRange?: string;
        timeline?: string;
        isQualified?: boolean;
    };
    stage: 'rapport' | 'explore' | 'qualify' | 'convert';
}

function analyzeConversation(messages: any[]): ConversationState {
    const messageCount = messages.length;
    let stage: ConversationState['stage'] = 'rapport';

    if (messageCount > 2 && messageCount <= 5) stage = 'explore';
    if (messageCount > 5 && messageCount <= 8) stage = 'qualify';
    if (messageCount > 8) stage = 'convert';

    const conversationText = messages.map((m: any) => m.content.toLowerCase()).join(' ');
    const dataCollected: ConversationState['dataCollected'] = {};

    // Budget detection (enhanced regex)
    if (conversationText.match(/\$?(80|85|90|95|100|110|120|130|140|150|160|170|180|190|200)[k,]?/)) {
        dataCollected.budgetRange = '$80k+';
        dataCollected.isQualified = true;
    } else if (conversationText.match(/\$?(50|55|60|65|70|75)[k,]?/)) {
        dataCollected.budgetRange = '$50-80k';
    }

    // Timeline detection
    if (conversationText.match(/(2025|2026|next year|spring|summer|fall|winter|this year|soon)/)) {
        dataCollected.timeline = 'Soon';
    }

    return { messageCount, dataCollected, stage };
}

function extractContactInfo(message: string) {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/;

    return {
        email: message.match(emailRegex)?.[0],
        phone: message.match(phoneRegex)?.[0],
    };
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 20; // 20 requests per minute

    const requests = rateLimitMap.get(ip) || [];
    const recentRequests = requests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
        return false; // Rate limited
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (!checkRateLimit(ip)) {
            return new Response(
                JSON.stringify({ error: 'Too many requests. Please slow down and try again in a minute.' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { messages } = await request.json();

        // Analyze conversation state
        const state = analyzeConversation(messages);

        // Check for contact info in last message
        const lastMessage = messages[messages.length - 1]?.content || '';
        const contactInfo = extractContactInfo(lastMessage);

        if (contactInfo.email || contactInfo.phone) {
            console.log('🎯 Lead captured:', contactInfo);
            // TODO: Save to CRM/database via webhook or direct DB insert
            // await saveLeadToDatabase(contactInfo, messages);
        }

        // Build contextual system prompt
        const contextualPrompt = `${SYSTEM_PROMPT}

# CURRENT CONVERSATION CONTEXT
- Messages exchanged: ${state.messageCount}
- Conversation stage: ${state.stage}
- Budget qualified: ${state.dataCollected.isQualified ? 'Yes ($80k+)' : 'Not yet'}
- Timeline: ${state.dataCollected.timeline || 'Unknown'}

${state.stage === 'convert' && state.dataCollected.isQualified ?
                '\n⚡ ACTION REQUIRED: This prospect is qualified! Time to ask for contact info to connect them with the design team.' :
                '\n⏸️ CONTINUE: Keep building rapport and gathering information naturally. Don\'t rush to contact info yet.'}`;

        if (AI_PROVIDER === 'claude') {
            // Use Claude Sonnet 4 (Latest & Best Model)
            const response = await anthropic.messages.stream({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                messages: messages.map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content,
                })),
                system: contextualPrompt,
                temperature: 0.7,
            });

            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    for await (const chunk of response) {
                        if (chunk.type === 'content_block_delta' &&
                            chunk.delta.type === 'text_delta') {
                            controller.enqueue(encoder.encode(chunk.delta.text));
                        }
                    }
                    controller.close();
                },
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            });
        } else {
            // Use GPT-4o (Full Model, Not Mini)
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: contextualPrompt },
                    ...messages,
                ],
                stream: true,
                temperature: 0.7,
                max_tokens: 800,
            });

            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    for await (const chunk of response) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            controller.enqueue(encoder.encode(content));
                        }
                    }
                    controller.close();
                },
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache',
                },
            });
        }
    } catch (error: any) {
        console.error('AI API error:', error);

        // Enhanced error handling
        let errorMessage = 'I apologize, but I encountered a technical issue. Please try again in a moment.';
        let statusCode = 500;

        if (error.status === 429) {
            errorMessage = 'Too many requests. Please wait a moment and try again.';
            statusCode = 429;
        } else if (error.status === 401 || error.status === 403) {
            errorMessage = 'Authentication error. Please contact support.';
            statusCode = 401;
        } else if (error.code === 'insufficient_quota') {
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            statusCode = 503;
        }

        return new Response(
            JSON.stringify({
                error: errorMessage,
                ...(process.env.NODE_ENV === 'development' && {
                    technicalDetails: error.message
                })
            }),
            {
                status: statusCode,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
