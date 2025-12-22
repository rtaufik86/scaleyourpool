import Link from 'next/link';

export default function PrivacyPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <div className="flex gap-4 text-slate-400 mb-12">
                    <p>Last Updated: December 22, 2024</p>
                    <span>•</span>
                    <p>Effective Date: January 1, 2025</p>
                </div>

                <div className="prose prose-invert prose-orange max-w-none space-y-10">
                    {/* Introduction */}
                    <section className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                        <p className="text-slate-300 text-lg leading-relaxed">
                            At <strong className="text-white">ScaleYourPool</strong>, we are committed to protecting the privacy of your business and your customers.
                            This policy outlines how we handle data across our AI Sales Concierge platform and our website.
                        </p>
                    </section>

                    {/* 1. Data Architecture */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">1. Data Architecture: What We Collect</h2>
                        <p className="text-slate-300 mb-6">
                            To provide a high-performance AI experience, we collect information across three primary categories:
                        </p>

                        <div className="space-y-6">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">A. User-Provided Information</h3>
                                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                                    <li><strong className="text-white">Identity Data:</strong> Names, email addresses, and professional roles when you sign up for our Demo or Founding Builder Program.</li>
                                    <li><strong className="text-white">Business Profile:</strong> Details about your pool construction company, pricing structures, and service areas.</li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">B. AI Interaction Data (The "Concierge" Data)</h3>
                                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                                    <li><strong className="text-white">Conversation Logs:</strong> Real-time chat data between the AI and your prospective leads.</li>
                                    <li><strong className="text-white">Lead Details:</strong> Contact information provided by leads during the qualification process.</li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-3">C. Technical & Usage Data</h3>
                                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                                    <li><strong className="text-white">Log Data:</strong> IP addresses, browser types, and device information for security and rate limiting.</li>
                                    <li><strong className="text-white">Analytics:</strong> Anonymized behavior patterns to optimize the conversion funnel (CRO).</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 2. Strategic Data Usage */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">2. Strategic Data Usage</h2>
                        <p className="text-slate-300 mb-6">
                            We process your data not to sell it, but to optimize your sales performance:
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <ul className="text-slate-300 space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Service Delivery:</strong> Activate AI chatbot to handle prospect qualification 24/7.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Product Evolution:</strong> Analyze conversation patterns to improve AI response accuracy to technical questions (e.g., salt cell issues or warranty coverage).
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Direct Communication:</strong> Send updates about the Founding Builder program and relevant new features.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Security & Compliance:</strong> Prevent fraud and bot attacks on your widget.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Tech Stack & Data Security */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">3. Tech Stack & Data Security</h2>
                        <p className="text-slate-300 mb-6">
                            We use world-class infrastructure (Enterprise-Grade) to ensure your data remains secure:
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-800 border-b border-slate-700">
                                        <th className="text-left p-4 text-white font-semibold">Provider</th>
                                        <th className="text-left p-4 text-white font-semibold">Purpose</th>
                                        <th className="text-left p-4 text-white font-semibold">Security Standards</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-700/50">
                                        <td className="p-4 font-medium text-white">Google Cloud</td>
                                        <td className="p-4">Core Infrastructure</td>
                                        <td className="p-4">SOC 2 Type II, ISO 27001</td>
                                    </tr>
                                    <tr className="border-b border-slate-700/50">
                                        <td className="p-4 font-medium text-white">Supabase</td>
                                        <td className="p-4">Database & Auth</td>
                                        <td className="p-4">Point-in-Time Recovery (PITR), AES-256</td>
                                    </tr>
                                    <tr className="border-b border-slate-700/50">
                                        <td className="p-4 font-medium text-white">OpenAI / Anthropic</td>
                                        <td className="p-4">LLM Processing</td>
                                        <td className="p-4">Enterprise Privacy (No training on your data)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-white">Vercel</td>
                                        <td className="p-4">Frontend Hosting</td>
                                        <td className="p-4">Global Edge Network Security</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mt-6">
                            <p className="text-orange-300">
                                <strong>🛡️ Pro-Tip:</strong> We ensure that conversation data processed by OpenAI/Anthropic APIs is not used to train their public models.
                                Your data remains yours.
                            </p>
                        </div>
                    </section>

                    {/* 4. Third-Party Disclosures */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">4. Third-Party Disclosures</h2>
                        <p className="text-slate-300 mb-4">
                            We only share data with third parties under the following conditions:
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <ul className="text-slate-300 space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Service Providers:</strong> Technical sub-processors mentioned above (Google, Supabase, etc.).
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Legal Requirements:</strong> If required by law or to protect our legal rights.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">Business Transfer:</strong> In the event of a merger or acquisition (data will remain protected under the same policy).
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 5. Your Rights & Data Sovereignty */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">5. Your Rights & Data Sovereignty</h2>
                        <p className="text-slate-300 mb-6">
                            You have full control over your data (and your prospects' data):
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-2">Right to Access</h3>
                                <p className="text-slate-400 text-sm">Request a copy of all data we store about you.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-2">Right to Erasure</h3>
                                <p className="text-slate-400 text-sm">Request permanent deletion of your account and data logs (Right to be forgotten).</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-2">Data Portability</h3>
                                <p className="text-slate-400 text-sm">Export your prospect data in reusable formats (CSV/JSON).</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-2">Right to Rectification</h3>
                                <p className="text-slate-400 text-sm">Update or correct your information at any time.</p>
                            </div>
                        </div>
                    </section>

                    {/* 6. Cookies & Tracking Technology */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">6. Cookies & Tracking Technology</h2>
                        <p className="text-slate-300 mb-6">
                            We use a "Privacy-First Analytics" approach:
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <ul className="text-slate-300 space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-white">Essential:</strong> Only cookies required to maintain your login session.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-white">Performance:</strong> Anonymous analysis to measure website loading speed.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-white">No Third-Party Ads:</strong> We do not sell ad space or place tracking pixels for third-party ads that invade privacy.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 7. Contact Us */}
                    <section className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500/30 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-white mb-6">7. Contact Us</h2>
                        <p className="text-slate-300 mb-6">
                            For in-depth questions about data security or to exercise your privacy rights, please contact our team:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-slate-500 mb-2">General Inquiry</p>
                                <a
                                    href="mailto:hello@scaleyourpool.com"
                                    className="text-orange-500 hover:text-orange-400 font-medium text-lg"
                                >
                                    hello@scaleyourpool.com
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-2">Data Protection Officer</p>
                                <a
                                    href="mailto:privacy@scaleyourpool.com"
                                    className="text-orange-500 hover:text-orange-400 font-medium text-lg"
                                >
                                    privacy@scaleyourpool.com
                                </a>
                            </div>
                        </div>
                    </section>
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
                            <Link href="/privacy" className="text-orange-500 font-semibold">
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
