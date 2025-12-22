import Link from 'next/link';

export default function TermsPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                <p className="text-slate-400 mb-12">Last Updated: December 22, 2024</p>

                <div className="prose prose-invert prose-orange max-w-none space-y-8">
                    {/* Acceptance */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-300">
                            By accessing or using Scale Your Pool's website and services, you agree to be bound by these
                            Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    {/* Demo Usage */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. AI Demo Usage</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>Our AI chat demo is provided for evaluation purposes:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>The demo is for testing and evaluation only</li>
                                <li>Conversations may be recorded to improve our service</li>
                                <li>No warranty is provided on demo accuracy or completeness</li>
                                <li>Rate limits apply (20 requests per minute per IP)</li>
                                <li>We reserve the right to terminate access for abuse</li>
                            </ul>
                        </div>
                    </section>

                    {/* Founding Builder Program */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Founding Builder Program</h2>
                        <div className="text-slate-300 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Pricing</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Setup Fee:</strong> $2,997 (one-time)</li>
                                    <li><strong>Monthly Subscription:</strong> $197/month</li>
                                    <li><strong>Limited Availability:</strong> Only 3 pool builders accepted</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Money-Back Guarantee</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>30-day money-back guarantee on setup fee</li>
                                    <li>Must provide evidence of proper implementation</li>
                                    <li>Refund requests must be submitted within 30 days</li>
                                    <li>Monthly fees are non-refundable</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Cancellation</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Cancel anytime with 30 days notice</li>
                                    <li>No long-term contracts required</li>
                                    <li>Setup fee is non-refundable after 30-day guarantee period</li>
                                    <li>Access continues until end of billing period</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Acceptable Use */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>You agree NOT to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Abuse or overload the AI demo service</li>
                                <li>Attempt to reverse engineer or copy our technology</li>
                                <li>Use the service for illegal or unethical purposes</li>
                                <li>Share your account credentials with others</li>
                                <li>Scrape or harvest data from our website</li>
                                <li>Interfere with the service's security features</li>
                            </ul>
                        </div>
                    </section>

                    {/* Service Availability */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Service Availability</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>We strive for high availability but cannot guarantee:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>100% uptime (we target 99.9% uptime)</li>
                                <li>Uninterrupted service during maintenance</li>
                                <li>Compatibility with all devices and browsers</li>
                                <li>Specific response times for AI conversations</li>
                            </ul>
                            <p className="mt-3">
                                We will provide advance notice of scheduled maintenance when possible.
                            </p>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>All content and technology on this website is owned by Scale Your Pool:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>AI prompts and conversation flows</li>
                                <li>Website design and code</li>
                                <li>Branding, logos, and trademarks</li>
                                <li>Documentation and training materials</li>
                            </ul>
                            <p className="mt-3">
                                You may not copy, modify, or distribute our intellectual property without written permission.
                            </p>
                        </div>
                    </section>

                    {/* User Data */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Your Data</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>Regarding data you provide:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>You retain ownership of your business data</li>
                                <li>We may use anonymized data to improve our service</li>
                                <li>Conversation logs may be used for training and quality assurance</li>
                                <li>You can request data deletion at any time</li>
                            </ul>
                            <p className="mt-3">
                                See our <Link href="/privacy" className="text-orange-500 hover:text-orange-400">Privacy Policy</Link> for more details.
                            </p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>To the maximum extent permitted by law:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>We are not liable for lost profits or business opportunities</li>
                                <li>Our liability is limited to the amount you paid in the last 12 months</li>
                                <li>We are not responsible for third-party service failures (OpenAI, Anthropic, etc.)</li>
                                <li>AI responses are not guaranteed to be accurate or complete</li>
                            </ul>
                        </div>
                    </section>

                    {/* Warranties */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Warranties & Disclaimers</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>The service is provided "AS IS" without warranties of any kind:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>No guarantee of specific results or lead quality</li>
                                <li>No warranty that the service will meet your requirements</li>
                                <li>No guarantee of error-free operation</li>
                                <li>AI technology may produce unexpected results</li>
                            </ul>
                        </div>
                    </section>

                    {/* Modifications */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Modifications to Service</h2>
                        <p className="text-slate-300">
                            We reserve the right to modify or discontinue the service at any time, with or without notice.
                            We will provide reasonable notice for significant changes affecting paying customers.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                        <div className="text-slate-300 space-y-3">
                            <p>We may terminate or suspend access to our service:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>For violation of these Terms of Service</li>
                                <li>For abusive or fraudulent behavior</li>
                                <li>For non-payment of fees</li>
                                <li>At our discretion with 30 days notice</li>
                            </ul>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
                        <p className="text-slate-300">
                            These Terms shall be governed by and construed in accordance with the laws of the United States,
                            without regard to its conflict of law provisions.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
                        <p className="text-slate-300">
                            We may update these Terms of Service from time to time. We will notify you of any material
                            changes by posting the new terms on this page and updating the "Last Updated" date.
                            Continued use of the service after changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
                        <div className="text-slate-300 space-y-2">
                            <p>If you have any questions about these Terms of Service, please contact us:</p>
                            <p>
                                <strong>Email:</strong>{' '}
                                <a href="mailto:hello@scaleyourpool.com" className="text-orange-500 hover:text-orange-400">
                                    hello@scaleyourpool.com
                                </a>
                            </p>
                            <p>
                                <strong>Legal Inquiries:</strong>{' '}
                                <a href="mailto:legal@scaleyourpool.com" className="text-orange-500 hover:text-orange-400">
                                    legal@scaleyourpool.com
                                </a>
                            </p>
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
                            <Link href="/privacy" className="text-slate-400 hover:text-orange-500 transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-orange-500 font-semibold">
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
