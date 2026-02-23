'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles, Image as ImageIcon, Paperclip } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    image?: string; // base64 image data
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string>('');
    const [visitCount, setVisitCount] = useState(1);
    const [isReturningVisitor, setIsReturningVisitor] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Session management - runs on component mount
    useEffect(() => {
        // Get or create session ID from localStorage
        let storedSessionId = localStorage.getItem('syp_session_id');
        let storedVisitCount = parseInt(localStorage.getItem('syp_visit_count') || '0');
        const lastVisit = localStorage.getItem('syp_last_visit');
        const now = new Date();

        if (!storedSessionId) {
            // New visitor - create session
            storedSessionId = `session_${crypto.randomUUID()}`;
            localStorage.setItem('syp_session_id', storedSessionId);
            localStorage.setItem('syp_first_visit', now.toISOString());
            storedVisitCount = 1;
        } else {
            // Returning visitor - check if this is a new session (>30 min since last visit)
            if (lastVisit) {
                const lastVisitDate = new Date(lastVisit);
                const minutesSinceLastVisit = (now.getTime() - lastVisitDate.getTime()) / (1000 * 60);
                if (minutesSinceLastVisit > 30) {
                    storedVisitCount += 1;
                    setIsReturningVisitor(true);
                }
            }
        }

        localStorage.setItem('syp_visit_count', storedVisitCount.toString());
        localStorage.setItem('syp_last_visit', now.toISOString());

        setSessionId(storedSessionId);
        setVisitCount(storedVisitCount);

        // Load any saved messages from previous session
        const savedMessages = localStorage.getItem('syp_messages');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                    setIsReturningVisitor(true);
                }
            } catch (e) {
                console.error('Failed to parse saved messages:', e);
            }
        }
    }, []);

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

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !uploadedImage) || isLoading) return;

        const userMessage = input.trim() || '📷 [Image attached]';
        setInput('');

        // Add user message with optional image
        const newMessages: Message[] = [
            ...messages,
            {
                role: 'user',
                content: userMessage,
                image: uploadedImage || undefined
            }
        ];
        setMessages(newMessages);
        // Save messages to localStorage for session persistence
        localStorage.setItem('syp_messages', JSON.stringify(newMessages));
        setUploadedImage(null); // Clear uploaded image
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

            // Save updated messages to localStorage
            localStorage.setItem('syp_messages', JSON.stringify(allMessages));

            // Only save as lead if we have actionable contact info
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
                        // Session tracking data
                        session_id: sessionId,
                        visit_count: visitCount,
                        first_visit: localStorage.getItem('syp_first_visit'),
                    }),
                });
                // Clear session messages after successful lead creation
                // Keep session ID for future reference
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
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
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
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 flex items-center justify-between">
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
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-600'
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
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Uploaded"
                                        className="rounded-lg mb-2 max-w-full h-auto max-h-64 object-cover"
                                    />
                                )}
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
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
                    {/* Image Preview */}
                    {uploadedImage && (
                        <div className="mb-3 relative inline-block">
                            <img
                                src={uploadedImage}
                                alt="Preview"
                                className="rounded-lg max-h-32 object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => setUploadedImage(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    <div className="flex gap-2">
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        {/* Image upload button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:text-cyan-500 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-50"
                            aria-label="Upload image"
                        >
                            <ImageIcon size={20} />
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="flex-1 bg-slate-800 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || (!input.trim() && !uploadedImage)}
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
