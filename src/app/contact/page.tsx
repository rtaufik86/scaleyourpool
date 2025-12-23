import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white">
            {/* Header with Logo and CTA */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="Scale Your Pool" className="h-16 w-auto object-contain" />
                    </Link>
                    <Link
                        href="/#demo-section"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all text-sm"
                    >
                        Try Live Demo
                    </Link>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-slate-400 mb-12">
                    Have questions? We're here to help. Choose the best way to reach us.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Email Contact */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                            <Mail className="text-orange-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Email Us</h2>
                        <p className="text-slate-400 mb-6">
                            Get a response within 24 hours (usually much faster)
                        </p>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-slate-500 mb-1">General Inquiries</p>
                                <a
                                    href="mailto:hello@scaleyourpool.com"
                                    className="text-orange-500 hover:text-orange-400 font-medium"
                                >
                                    hello@scaleyourpool.com
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Founding Builder Program</p>
                                <a
                                    href="mailto:apply@scaleyourpool.com"
                                    className="text-orange-500 hover:text-orange-400 font-medium"
                                >
                                    apply@scaleyourpool.com
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Support</p>
                                <a
                                    href="mailto:support@scaleyourpool.com"
                                    className="text-orange-500 hover:text-orange-400 font-medium"
                                >
                                    support@scaleyourpool.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Chat with AI */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                            <MessageCircle className="text-orange-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Try the AI Demo</h2>
                        <p className="text-slate-400 mb-6">
                            Experience our AI Sales Concierge firsthand
                        </p>
                        <Link
                            href="/#demo-section"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                        >
                            <MessageCircle size={20} />
                            Start Chat Demo
                        </Link>
                        <p className="text-slate-500 text-sm mt-4">
                            Available 24/7 • Instant responses
                        </p>
                    </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Quick Answers</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-white mb-2">What is the Founding Builder Program?</h3>
                            <p className="text-slate-400 text-sm mb-3">
                                A limited program for 3 pool contractors to get our AI Sales Concierge at a special founding rate.
                            </p>
                            <Link href="/apply" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                                Learn More →
                            </Link>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">How much does it cost?</h3>
                            <p className="text-slate-400 text-sm mb-3">
                                $2,997 setup fee + $247/month. Includes 30-day money-back guarantee.
                            </p>
                            <Link href="/#pricing" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                                View Pricing →
                            </Link>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">How does the AI work?</h3>
                            <p className="text-slate-400 text-sm mb-3">
                                Our AI qualifies leads 24/7 through intelligent conversations, then books them on your calendar.
                            </p>
                            <Link href="/#how-it-works" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                                See How It Works →
                            </Link>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">Is there a guarantee?</h3>
                            <p className="text-slate-400 text-sm mb-3">
                                Yes! 30-day money-back guarantee. If it doesn't work, get a full refund.
                            </p>
                            <Link href="/#guarantee" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                                Read Guarantee →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="mt-12 text-center">
                    <h3 className="text-lg font-semibold text-white mb-3">Response Times</h3>
                    <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                            <p className="text-orange-500 font-bold mb-1">AI Chat Demo</p>
                            <p className="text-slate-400 text-sm">Instant • 24/7</p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                            <p className="text-orange-500 font-bold mb-1">Email Support</p>
                            <p className="text-slate-400 text-sm">Within 24 hours</p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                            <p className="text-orange-500 font-bold mb-1">Application Review</p>
                            <p className="text-slate-400 text-sm">Within 48 hours</p>
                        </div>
                    </div>
                </div>
            </div>

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
                            <Link href="/contact" className="text-orange-500 font-semibold">
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
