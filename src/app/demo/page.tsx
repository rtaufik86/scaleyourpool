'use client';

import Link from 'next/link';
import { ArrowLeft, MessageCircle, Shield, Zap, Brain, Calendar, Target } from 'lucide-react';

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="text-orange-500 font-bold text-xl">Scale Your Pool</div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Hero */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Target size={16} />
                            <span>Live AI Demo</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Experience the AI Sales Concierge
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                            Click the orange chat button in the bottom-right corner to start a conversation.
                            Ask anything about pools—just like your prospects will.
                        </p>

                        {/* CTA Arrow pointing to chat widget */}
                        <div className="relative inline-block">
                            <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
                                <span className="text-orange-500 font-medium">Try it now!</span>
                                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-orange-500">
                                    <path d="M5 20h40M45 20l-10-10M45 20l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <button
                                onClick={() => {
                                    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                                    if (chatButton) chatButton.click();
                                }}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-3"
                            >
                                <MessageCircle size={24} />
                                Start Conversation
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Brain className="text-orange-500" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Intelligent Conversations</h3>
                            <p className="text-slate-400">
                                Unlike static forms, our AI asks smart follow-up questions based on your answers,
                                creating a natural dialogue.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Zap className="text-orange-500" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Instant Responses</h3>
                            <p className="text-slate-400">
                                No waiting for callbacks. Get immediate, helpful answers 24/7—exactly when
                                your prospects are most interested.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Calendar className="text-orange-500" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Smart Qualification</h3>
                            <p className="text-slate-400">
                                The AI gathers budget, timeline, and project details—qualifying leads before
                                they ever reach your sales team.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Shield className="text-orange-500" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Pool Industry Expert</h3>
                            <p className="text-slate-400">
                                Trained specifically on pool construction, features, and common questions—not
                                a generic chatbot.
                            </p>
                        </div>
                    </div>

                    {/* Sample Questions */}
                    <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-white mb-6">Try asking questions like:</h3>
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
                                    className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
