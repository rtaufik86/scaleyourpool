'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket, CheckCircle, Send, Loader2, Shield, Users, TrendingUp, Building2 } from 'lucide-react';

interface FormData {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website: string;
    yearsInBusiness: string;
    averageProjectValue: string;
    monthlyLeads: string;
    biggestChallenge: string;
    whyInterested: string;
    agreeToTerms: boolean;
}

export default function ApplyPage() {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        yearsInBusiness: '',
        averageProjectValue: '',
        monthlyLeads: '',
        biggestChallenge: '',
        whyInterested: '',
        agreeToTerms: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit application');

            setIsSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again or email us directly.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
                <div className="max-w-lg text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Application Received! 🎉</h1>
                    <p className="text-slate-400 mb-8">
                        Thank you for your interest in the Founding Builder Program.
                        We&apos;ll review your application and reach out within 24-48 hours to schedule a discovery call.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
                        <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                        <ul className="text-slate-400 text-sm space-y-2 text-left">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                Our team reviews your application (24-48 hours)
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                If approved, we schedule a 30-minute discovery call
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                We discuss your business and customize the AI for you
                            </li>
                        </ul>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Homepage
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Rocket className="text-orange-500" size={20} />
                        <span className="font-bold text-white">Scale Your Pool</span>
                    </div>
                </div>
            </header>

            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            🚀 Founding Builder Application
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Apply for the Founding Builder Program
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Join an exclusive group of 3 elite pool builders who will shape the future of AI-powered lead generation—and lock in founding pricing forever.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefits Sidebar */}
                        <div className="md:col-span-1 space-y-4">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="text-orange-500" size={18} />
                                    Founding Benefits
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2 text-slate-400">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong className="text-white">$4,000 off</strong> setup fee</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-400">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong className="text-white">$197/mo</strong> locked forever</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-400">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Weekly optimization calls</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-400">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Direct access to AI team</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-400">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>30-day money-back guarantee</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Users className="text-orange-500" size={18} />
                                    Ideal Candidate
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <TrendingUp size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                        Average project value $80k+
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Building2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                        2+ years in business
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Rocket size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                        Ready to grow & innovate
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-5">
                                <p className="text-center text-sm">
                                    <span className="text-white font-bold">⏰ Only 3 Spots</span>
                                    <br />
                                    <span className="text-slate-400">Applications reviewed on first-come, first-served basis</span>
                                </p>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-white mb-6">Your Information</h2>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6">
                                        {error}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Aqua Pools Inc."
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contactName" className="block text-sm font-medium text-slate-300 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            name="contactName"
                                            required
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="john@aquapools.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">
                                        Website (optional)
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="https://aquapools.com"
                                    />
                                </div>

                                <h2 className="text-xl font-semibold text-white mb-6 mt-8 pt-6 border-t border-slate-700">Business Details</h2>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-slate-300 mb-2">
                                            Years in Business *
                                        </label>
                                        <select
                                            id="yearsInBusiness"
                                            name="yearsInBusiness"
                                            required
                                            value={formData.yearsInBusiness}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="1-2">1-2 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="6-10">6-10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="averageProjectValue" className="block text-sm font-medium text-slate-300 mb-2">
                                            Average Project Value *
                                        </label>
                                        <select
                                            id="averageProjectValue"
                                            name="averageProjectValue"
                                            required
                                            value={formData.averageProjectValue}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="30-50k">$30,000 - $50,000</option>
                                            <option value="50-80k">$50,000 - $80,000</option>
                                            <option value="80-120k">$80,000 - $120,000</option>
                                            <option value="120-200k">$120,000 - $200,000</option>
                                            <option value="200k+">$200,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="monthlyLeads" className="block text-sm font-medium text-slate-300 mb-2">
                                        Monthly Lead Volume *
                                    </label>
                                    <select
                                        id="monthlyLeads"
                                        name="monthlyLeads"
                                        required
                                        value={formData.monthlyLeads}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select...</option>
                                        <option value="1-10">1-10 leads/month</option>
                                        <option value="11-25">11-25 leads/month</option>
                                        <option value="26-50">26-50 leads/month</option>
                                        <option value="50+">50+ leads/month</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="biggestChallenge" className="block text-sm font-medium text-slate-300 mb-2">
                                        What&apos;s your biggest lead generation challenge? *
                                    </label>
                                    <textarea
                                        id="biggestChallenge"
                                        name="biggestChallenge"
                                        required
                                        rows={3}
                                        value={formData.biggestChallenge}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                        placeholder="Too many unqualified leads, slow response times, etc."
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="whyInterested" className="block text-sm font-medium text-slate-300 mb-2">
                                        Why are you interested in the Founding Builder Program? *
                                    </label>
                                    <textarea
                                        id="whyInterested"
                                        name="whyInterested"
                                        required
                                        rows={3}
                                        value={formData.whyInterested}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                        placeholder="I want to be an early adopter of AI technology..."
                                    />
                                </div>

                                <div className="mb-8">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            required
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            className="mt-1 w-5 h-5 rounded bg-slate-900/50 border-slate-600 text-orange-500 focus:ring-orange-500"
                                        />
                                        <span className="text-sm text-slate-400">
                                            I understand that by applying, I&apos;m expressing interest in the Founding Builder Program. If selected, I agree to provide honest feedback, participate in a video testimonial (if satisfied), and allow my business to be used as a case study.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={24} />
                                            Submit Application
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-slate-500 text-sm mt-4">
                                    🔒 Your information is secure and never shared.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
