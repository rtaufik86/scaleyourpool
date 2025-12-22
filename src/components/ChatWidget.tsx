'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Initialize chat with AI greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            // Simulate AI typing delay for natural feel
            setTimeout(() => {
                setMessages([
                    {
                        role: 'assistant',
                        content: "Hi there! 👋 I'm the Pool Expert AI. I'm here to help you explore pool options and find the perfect fit for your backyard. What's driving your interest in a pool right now?",
                    },
                ]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen, messages.length]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let aiResponse = '';

            // Add empty assistant message that we'll update
            setMessages([...newMessages, { role: 'assistant', content: '' }]);
            setIsTyping(false);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    aiResponse += chunk;

                    // Update the last message with streaming content
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { role: 'assistant', content: aiResponse };
                        return updated;
                    });
                }
            }

            // Smart lead extraction from conversation
            const allMessages = [...newMessages, { role: 'assistant', content: aiResponse }];
            const allContent = allMessages.map(m => m.content).join(' ');

            // Regex patterns for extraction
            const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
            const phoneRegex = /(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
            const nameRegex = /(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i;
            const budgetRegex = /\$?(\d{1,3}(?:,\d{3})*|\d+)\s*(?:k|K|thousand)?(?:\s*dollars?)?/;

            const emailMatch = allContent.match(emailRegex);
            const phoneMatch = allContent.match(phoneRegex);
            const nameMatch = allContent.match(nameRegex);
            const budgetMatch = allContent.match(budgetRegex);

            // Detect project type
            const isRenovation = /renovation|remodel|redo|upgrade|update/i.test(allContent);
            const projectType = isRenovation ? 'Renovation' :
                /new|build|construction/i.test(allContent) ? 'New Construction' : null;

            // Detect timeline
            const timelineMatch = allContent.match(/(?:start|begin|want|ready)\s*(?:in|by|around)?\s*(spring|summer|fall|winter|january|february|march|april|may|june|july|august|september|october|november|december|next year|\d+\s*months?)/i);

            // Only save if we have actionable contact info
            if (emailMatch || phoneMatch) {
                await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: emailMatch?.[0] || null,
                        phone: phoneMatch?.[0] || null,
                        name: nameMatch?.[1] || null,
                        budget: budgetMatch?.[0] || null,
                        projectType: projectType,
                        timeline: timelineMatch?.[1] || null,
                        notes: `Conversation extracted at ${new Date().toISOString()}`,
                        conversationLog: allMessages,
                    }),
                });
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at (555) 123-4567." },
            ]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Chat Launcher Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
            >
                <MessageCircle size={28} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            </button>

            {/* Chat Widget */}
            <div
                className={`fixed z-50 bg-slate-900 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    inset-0 w-full h-full rounded-none
                    md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[600px] md:max-h-[80vh] md:rounded-2xl`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Pool Expert AI</h3>
                            <p className="text-white/80 text-sm">
                                {isTyping ? 'Typing...' : 'Online • Ready to help'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label="Close chat"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-blue-500'
                                    : 'bg-gradient-to-r from-orange-500 to-orange-600'
                                    }`}
                            >
                                {message.role === 'user' ? (
                                    <User size={18} className="text-white" />
                                ) : (
                                    <Bot size={18} className="text-white" />
                                )}
                            </div>
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-md'
                                    : 'bg-slate-700 text-slate-100 rounded-bl-md'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div className="bg-slate-700 rounded-2xl rounded-bl-md px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-700">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="flex-1 bg-slate-800 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <Send size={20} />
                            )}
                        </button>
                    </div>
                    <p className="text-center text-slate-500 text-xs mt-2">
                        Powered by AI • Your privacy is protected
                    </p>
                </form>
            </div>
        </>
    );
}
