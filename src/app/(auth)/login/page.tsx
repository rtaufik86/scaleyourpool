'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            setSent(true);
        } catch (error: any) {
            setError(error.message || 'Failed to send magic link');
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Success Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-500" size={32} />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-3">
                            Check Your Email
                        </h1>

                        <p className="text-slate-300 mb-6">
                            We've sent a magic link to <strong className="text-white">{email}</strong>
                        </p>

                        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-400">
                                Click the link in the email to sign in to your portal. The link will expire in 1 hour.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSent(false);
                                setEmail('');
                            }}
                            className="text-orange-500 hover:text-orange-400 text-sm font-medium"
                        >
                            Use a different email
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Didn't receive the email? Check your spam folder or{' '}
                        <button
                            onClick={() => setSent(false)}
                            className="text-orange-500 hover:text-orange-400"
                        >
                            try again
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img
                            src="/logo.png"
                            alt="Scale Your Pool"
                            className="h-16 w-auto mx-auto mb-4"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Client Portal
                    </h1>
                    <p className="text-slate-400">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <p className="text-blue-300 text-sm">
                                <strong>🔐 Passwordless Login:</strong> We'll send you a secure magic link to sign in. No password needed!
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending Magic Link...
                                </>
                            ) : (
                                <>
                                    Send Magic Link
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center space-y-3">
                    <p className="text-slate-500 text-sm">
                        Don't have access?{' '}
                        <Link href="/apply" className="text-orange-500 hover:text-orange-400 font-medium">
                            Apply for Founding Builder Program
                        </Link>
                    </p>

                    <p className="text-slate-500 text-sm">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                            ← Back to Home
                        </Link>
                    </p>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 text-center">
                    <p className="text-slate-600 text-xs flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Secured by Supabase Auth
                    </p>
                </div>
            </div>
        </div>
    );
}
