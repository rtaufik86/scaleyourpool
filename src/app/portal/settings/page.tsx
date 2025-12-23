'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
                <p className="text-slate-400 mb-8">Coming soon...</p>
                <Link
                    href="/portal/dashboard"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
