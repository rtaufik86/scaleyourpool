'use client';

import Link from 'next/link';
import {
  MessageCircle, Calendar, Brain, Shield, Zap, ArrowRight, CheckCircle,
  Clock, Tag, BatteryLow, Moon, Filter, Target as TargetIcon, Mail, PlayCircle,
  Bot, User as UserIcon, FileText, X as XIcon, Info, ChevronDown, ShieldCheck,
  Lock, Headphones, XCircle, Award, Cpu, Cloud
} from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Scale Your Pool" className="h-16 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-2 text-orange-500 font-medium text-sm">
            🚀 <span className="text-white">Founding Builder Program:</span> Only 5 Spots Remaining
          </div>
          <button
            onClick={() => {
              const demoSection = document.getElementById('demo-section');
              demoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all text-sm"
          >
            View Live Demo
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-900 to-slate-900"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/20">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Specialized System For: Custom Pools • Renovations • Outdoor Living
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your AI Sales Concierge Works 24/7 to Fill Your 2026 Calendar with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              $80k+ Pool Projects
            </span>
            —While You Sleep
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
            Stop losing premium leads to competitors who respond faster. Your AI has intelligent conversations,
            qualifies serious buyers, and books consultations automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                const demoSection = document.getElementById('demo-section');
                demoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-orange-500/25 transition-all animate-pulse"
            >
              <PlayCircle size={24} />
              Try the AI Demo
            </button>
            <Link
              href="/apply"
              className="border-2 border-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-3 hover:bg-orange-500/10 transition-all"
            >
              <ArrowRight size={24} />
              Apply for Founding Program
            </Link>
          </div>

          <div className="animate-bounce mt-8">
            <ChevronDown className="mx-auto text-slate-600" size={32} />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              The Silent Business Killer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The 'Generalist Website' is Costing You Millions.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Most pool contractors face the same frustrating challenges that drain time and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Hours Lost on Bad Leads',
                description: 'Your sales team spends 10+ hours a week driving to properties for people who only have $30k to spend. That\'s time stolen from real profit-generating activities.',
              },
              {
                icon: Tag,
                title: 'The \'Commodity\' Trap',
                description: 'Standard websites make you look like every other contractor. This invites prospects to shop based on price, not value, forcing you to lower your margins to win the bid.',
              },
              {
                icon: BatteryLow,
                title: 'Manual Follow-Up Chaos',
                description: 'Without automation, hot leads slip through the cracks. If you don\'t reply in 5 minutes, they call your competitor—and you\'ve lost a $100k project forever.',
              },
              {
                icon: Moon,
                title: 'Slow Response Time',
                description: 'By the time you reply to leads (next day), they\'ve already called 3 competitors. First responder wins 78% of contracts.',
              },
            ].map((problem, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <problem.icon className="text-orange-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-slate-400 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Your AI Sales Concierge Works - Detailed Timeline */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-orange-500/20">
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">AI Sales Concierge</span> Works
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See exactly how the AI qualifies $80k+ prospects and books them automatically—24/7, without you lifting a finger.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                icon: Filter,
                step: 'Step 1',
                title: 'AI-Powered Conversation (Not a Quiz)',
                description: 'Your prospects don\'t fill out boring forms. They chat naturally with the AI about their pool vision, budget, and timeline. The AI asks intelligent follow-up questions based on their answers—just like a skilled sales consultant.',
                example: {
                  ai: 'What kind of pool are you considering?',
                  prospect: 'Infinity pool',
                  aiResponse: 'Beautiful choice! Do you have a sloped property? That works best for infinity edges.',
                },
                benefits: [
                  'No forms. No friction. Just conversation.',
                  'Eliminate 70% of unqualified leads before they waste your time',
                  'Pre-qualified prospects = higher close rates',
                ],
              },
              {
                icon: Brain,
                step: 'Step 2',
                title: 'Smart Lead Enrichment (Not Just Data)',
                description: 'The AI doesn\'t just collect budget and timeline—it understands CONTEXT: Does the client care about child safety? Are they concerned about construction timeline? What\'s their design preference? Your sales team gets rich insights, not just contact info.',
                leadExample: {
                  name: 'Sarah Martinez',
                  budget: '$85k budget, Spring 2026',
                  insights: 'Concerned about pool safety for 2 young children, wants heated pool, prefers infinity style, open to premium features if value justified',
                },
                benefits: [
                  'Rich context about prospect motivations',
                  'Understand family needs and priorities',
                  'Sales team prepared for meaningful conversations',
                ],
              },
              {
                icon: Zap,
                step: 'Step 3',
                title: '60-Second Personal Video Response',
                description: 'Within 60 seconds of qualification, prospects receive a personalized video from you introducing yourself and addressing their specific interests. While competitors are still checking their email (or sleeping), you\'ve already built trust and positioned yourself as the expert.',
                benefits: [
                  'Strike while the iron is hot - capture interest at peak motivation',
                  'Establish authority before the competition responds',
                  'First responder wins 78% of contracts',
                ],
              },
              {
                icon: Calendar,
                step: 'Step 4',
                title: 'Automated Booking & Smart Nurture',
                description: 'Qualified prospects book consultations directly on your calendar—no phone tag. If they don\'t book immediately, the AI triggers a 14-day email sequence with testimonials and portfolio examples tailored to their interests (e.g., child safety features if they mentioned kids).',
                benefits: [
                  'Book consultations 24/7, even while you sleep',
                  '87% show-up rate (vs 40% industry average)',
                  'You never let a hot lead go cold',
                ],
              },
            ].map((step, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="text-orange-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 mb-4">{step.description}</p>

                    {/* Example conversation for Step 1 */}
                    {step.example && (
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <p className="text-sm text-slate-300 mb-1">
                          <strong className="text-orange-400">AI:</strong> "{step.example.ai}"
                        </p>
                        <p className="text-sm text-slate-300 mb-1">
                          <strong className="text-blue-400">Prospect:</strong> "{step.example.prospect}"
                        </p>
                        <p className="text-sm text-slate-300">
                          <strong className="text-orange-400">AI:</strong> "{step.example.aiResponse}"
                        </p>
                      </div>
                    )}

                    {/* Lead example for Step 2 */}
                    {step.leadExample && (
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-white mb-1">{step.leadExample.name}</p>
                        <p className="text-sm text-slate-400 mb-2">{step.leadExample.budget}</p>
                        <p className="text-xs text-slate-500">
                          <strong className="text-orange-400">AI Insights:</strong> {step.leadExample.insights}
                        </p>
                      </div>
                    )}

                    <ul className="space-y-2">
                      {step.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Comparison Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              The AI Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Traditional Form vs AI Sales Concierge
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-slate-500" size={24} />
                <h3 className="text-xl font-semibold text-white">Traditional Contact Form</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Name, Email, Phone, Budget—that\'s it',
                  'Generic questions everyone gets',
                  'No context, no personality',
                  'Feels like interrogation',
                  '60% abandon before finishing',
                  'Sales team gets: "John, $80k budget"',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400">
                    <XIcon size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="text-orange-500" size={24} />
                <h3 className="text-xl font-semibold text-white">AI Sales Concierge</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Natural conversation, feels human',
                  'Asks smart follow-ups based on answers',
                  'Understands pool construction deeply',
                  'Feels like talking to an expert',
                  '87% completion rate',
                  'Sales team gets rich context & insights',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Example Conversation */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="text-orange-500" size={24} />
              <h3 className="text-xl font-semibold text-white">Example AI Conversation:</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-slate-100">
                    <strong>AI:</strong> I see you have a sloped backyard. That's actually perfect for an Infinity Pool design—creates stunning visual effects. Is aesthetics a priority, or are you more focused on functionality for family use?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <UserIcon size={16} className="text-white" />
                </div>
                <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white">
                    <strong>Prospect:</strong> Both actually, we have kids but want it to look amazing too.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-slate-100">
                    <strong>AI:</strong> Great! For family safety with premium aesthetics, I'd recommend exploring Infinity Pools with integrated safety ledges and auto-cover systems. Your budget of $85k is perfect for this. Would you like to see examples of similar projects we've completed?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-400">
                <strong className="text-white">Notice:</strong> The AI recognized the sloped backyard opportunity, balanced safety with aesthetics, confirmed budget qualification, and smoothly transitioned to booking—all while providing genuine value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo-section" className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-orange-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
                <TargetIcon size={16} />
                <span>Live AI Demo</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Experience the AI Sales Concierge
              </h2>
              <p className="text-xl text-slate-300 mb-2">Don't Take Our Word For It—Try It</p>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Click the orange chat button in the bottom-right corner to start a conversation. Ask anything about pools—just like your prospects will.
              </p>

              {/* CTA Button */}
              <div className="mb-8">
                {/* Try it now arrow - positioned above button on mobile, to the right on desktop */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
                  <button
                    onClick={() => {
                      const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                      if (chatButton) chatButton.click();
                    }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-orange-500/25 transition-all inline-flex items-center gap-3 animate-pulse"
                  >
                    <MessageCircle size={24} />
                    Start Conversation
                  </button>

                  <div className="flex items-center gap-2 lg:ml-4 animate-pulse">
                    <span className="text-orange-500 font-medium">Try it now!</span>
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-orange-500">
                      <path d="M5 20h40M45 20l-10-10M45 20l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: Brain,
                    title: 'Intelligent Conversations',
                    description: 'Unlike static forms, our AI asks smart follow-up questions based on your answers, creating a natural dialogue.',
                  },
                  {
                    icon: Zap,
                    title: 'Instant Responses',
                    description: 'No waiting for callbacks. Get immediate, helpful answers 24/7—exactly when your prospects are most interested.',
                  },
                  {
                    icon: Calendar,
                    title: 'Smart Qualification',
                    description: 'The AI gathers budget, timeline, and project details—qualifying leads before they ever reach your sales team.',
                  },
                  {
                    icon: Shield,
                    title: 'Pool Industry Expert',
                    description: 'Trained specifically on pool construction, features, and common questions—not a generic chatbot.',
                  },
                ].map((feature, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left hover:border-orange-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="text-orange-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Sample Questions */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Try asking questions like:</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    "What pool styles are trending?",
                    "How much does an infinity pool cost?",
                    "Best pool for small backyards?",
                    "How long does installation take?",
                    "What safety features should I consider?",
                    "Can you install a pool on a slope?",
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                        if (chatButton) chatButton.click();
                      }}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm transition-colors hover:border-orange-500/50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-slate-500 text-sm mt-6">⏱️ Takes 3 minutes. See why this crushes traditional contact forms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Program */}
      <section id="founding-program" className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🚀 Limited Opportunity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Founding Builder Program
            </h2>
            <p className="text-slate-400">Limited to 5 Elite Pool Builders Only</p>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Pricing Card */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-orange-500/30 rounded-3xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-center">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Founding Rate
              </span>
              <h3 className="text-white text-lg font-semibold mt-2">Exclusive Early Access Pricing</h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm uppercase tracking-wide">Setup Fee</p>
                  <p className="text-4xl font-bold text-orange-500 my-2">$2,997</p>
                  <p className="text-slate-500 text-sm">Regular: $6,997 — <span className="text-green-500 font-semibold">Save $4,000</span></p>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm uppercase tracking-wide">Monthly</p>
                  <p className="text-4xl font-bold text-orange-500 my-2">$247<span className="text-lg text-slate-400">/mo</span></p>
                  <p className="text-slate-500 text-sm">Regular: $497/mo — <span className="text-green-500 font-semibold">Locked Forever</span></p>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center mb-8 border border-slate-700">
                <p className="text-white">Total Year 1: <span className="text-orange-500 font-bold text-xl">$5,961</span></p>
                <p className="text-green-500 text-sm">vs $12,961 regular pricing</p>
              </div>

              {/* What's Included */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {[
                      'Complete AI Sales Concierge setup',
                      'Custom landing page',
                      'CRM integration',
                      'Weekly optimization calls (Month 1-3)',
                      'Direct access to AI engineers',
                      'Lifetime founding rate ($247 forever)',
                      '30-day money-back guarantee',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">What We Need:</h4>
                  <ul className="space-y-2">
                    {[
                      'Your honest feedback',
                      'Video testimonial (if satisfied)',
                      'Permission for case study',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold mb-6 animate-pulse">
                  ⏰ Spots Remaining: 5
                </div>
                <br />
                <Link href="/apply" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-orange-500/25 transition-all inline-flex items-center gap-3">
                  <ArrowRight size={24} />
                  Apply for Founding Spot Now
                </Link>
                <p className="text-slate-500 text-sm mt-4">
                  After spots fill, pricing returns to $6,997 + $497/month permanently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-green-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our 30-Day Performance Guarantee
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We're so confident the Pool Flow System will transform your lead quality that we're putting our money where our mouth is.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Here's Our Iron-Clad Promise:</h3>
              <p className="text-slate-300 leading-relaxed">
                Implement the Pool Flow System for 30 days. If you don't see a <strong className="text-white">measurable improvement</strong> in lead quality, qualification efficiency, or time saved—simply show us you've followed the system, and we'll refund 100% of your setup fee. No questions asked. No hard feelings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: TargetIcon,
                  title: 'Higher Budget Leads',
                  description: 'At least 50% of qualified leads have budgets of $80k+',
                },
                {
                  icon: Clock,
                  title: 'Time Saved',
                  description: 'Reduce unqualified consultation calls by at least 60%',
                },
                {
                  icon: Zap,
                  title: 'Faster Response',
                  description: 'Automated 60-second response to every qualified lead',
                },
                {
                  icon: Bot,
                  title: 'AI-Powered Intelligence',
                  description: 'Your AI is trained on pool industry best practices and continuously optimized',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <item.icon size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-slate-700">
              {[
                { icon: Lock, text: 'Secure Setup' },
                { icon: Shield, text: '30-Day Guarantee' },
                { icon: Headphones, text: 'Dedicated Support' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400">
                  <badge.icon size={16} className="text-green-500" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 px-4 bg-slate-900 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-slate-400 text-sm mb-6">
            Powered by enterprise-grade AI technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Claude AI Badge */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 hover:border-orange-500/30 transition-colors">
              <Cpu size={24} className="text-orange-400" />
              <div>
                <p className="text-white font-semibold text-sm">Claude AI</p>
                <p className="text-slate-500 text-xs">Anthropic Powered</p>
              </div>
            </div>

            {/* Google Cloud Badge */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 hover:border-orange-500/30 transition-colors">
              <Cloud size={24} className="text-blue-400" />
              <div>
                <p className="text-white font-semibold text-sm">Google Cloud</p>
                <p className="text-slate-500 text-xs">Infrastructure</p>
              </div>
            </div>

            {/* SSL Security Badge */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 hover:border-orange-500/30 transition-colors">
              <ShieldCheck size={24} className="text-green-400" />
              <div>
                <p className="text-white font-semibold text-sm">SSL Secured</p>
                <p className="text-slate-500 text-xs">256-bit Encryption</p>
              </div>
            </div>

            {/* Proven Results Badge */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 hover:border-orange-500/30 transition-colors">
              <TargetIcon size={24} className="text-yellow-400" />
              <div>
                <p className="text-white font-semibold text-sm">🎯 Proven Results</p>
                <p className="text-slate-500 text-xs">Built for Pool Builders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Questions Answered
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to set up the Pool Flow System?',
                a: 'Most clients are fully operational within 14 days. We handle the technical setup, copywriting, and CRM integration. You just provide your branding assets and approve the final design.',
              },
              {
                q: 'Will this work with my existing CRM?',
                a: 'Yes. We integrate seamlessly with all major CRMs including Salesforce, HubSpot, JobNimbus, and custom solutions. If you don\'t have a CRM, we\'ll recommend the best option for pool contractors.',
              },
              {
                q: 'Is this just a chatbot with scripted responses?',
                a: 'No. Our AI uses advanced language models trained specifically on pool construction sales. It understands context, asks intelligent follow-ups, and adapts to each prospect—just like a real sales consultant. This isn\'t a basic chatbot following a script; it\'s AI that genuinely understands your business.',
              },
              {
                q: 'What if the AI gives wrong information?',
                a: 'The AI is trained on your specific services and pricing. It won\'t make promises you can\'t keep. All conversations are logged and we optimize monthly based on real performance. You have full control over what the AI can and cannot say, and we continuously refine it to match your brand voice perfectly.',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.q}</h3>
                  <ChevronDown className="text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0" size={20} />
                </summary>
                <p className="text-slate-400 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <img src="/logo.png" alt="Scale Your Pool" className="h-12 w-auto object-contain" />
            </Link>

            {/* Center - Links */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-orange-500 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-orange-500 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-orange-500 transition-colors">
                Contact
              </Link>
              <a href="mailto:hello@scaleyourpool.com" className="text-slate-400 hover:text-orange-500 transition-colors">
                Email
              </a>
            </div>

            {/* Right - Copyright */}
            <div className="text-center md:text-right">
              <p className="text-slate-500 text-sm">
                © 2024 Scale Your Pool
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
