'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    TrendingUp,
    Users,
    DollarSign,
    Clock
} from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        setUser(user);
        setLoading(false);
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push('/login');
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 mb-8">
                    <img src="/logo.png" alt="Scale Your Pool" className="h-10 w-auto" />
                </Link>

                {/* Navigation */}
                <nav className="space-y-2">
                    <Link
                        href="/portal/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/10 text-orange-500 font-medium"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        href="/portal/conversations"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <MessageSquare size={20} />
                        Conversations
                    </Link>

                    <Link
                        href="/portal/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <Settings size={20} />
                        Settings
                    </Link>
                </nav>

                {/* User Info & Logout */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-slate-700/50 rounded-lg p-4 mb-3">
                        <p className="text-sm text-slate-400 mb-1">Signed in as</p>
                        <p className="text-white font-medium truncate">{user?.email}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Welcome back! Here's your AI performance overview.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Conversations */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <MessageSquare className="text-blue-500" size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-medium">+12%</span>
                        </div>
                        <h3 className="text-slate-400 text-sm mb-1">Total Conversations</h3>
                        <p className="text-3xl font-bold text-white">0</p>
                        <p className="text-slate-500 text-xs mt-2">This month</p>
                    </div>

                    {/* Qualified Leads */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Users className="text-green-500" size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-medium">+8%</span>
                        </div>
                        <h3 className="text-slate-400 text-sm mb-1">Qualified Leads</h3>
                        <p className="text-3xl font-bold text-white">0</p>
                        <p className="text-slate-500 text-xs mt-2">Ready to contact</p>
                    </div>

                    {/* Pipeline Value */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <DollarSign className="text-orange-500" size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-medium">+15%</span>
                        </div>
                        <h3 className="text-slate-400 text-sm mb-1">Pipeline Value</h3>
                        <p className="text-3xl font-bold text-white">$0</p>
                        <p className="text-slate-500 text-xs mt-2">Estimated revenue</p>
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <TrendingUp className="text-purple-500" size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-medium">+5%</span>
                        </div>
                        <h3 className="text-slate-400 text-sm mb-1">Conversion Rate</h3>
                        <p className="text-3xl font-bold text-white">0%</p>
                        <p className="text-slate-500 text-xs mt-2">Qualified / Total</p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-3">
                        🎉 Welcome to Your Client Portal!
                    </h2>
                    <p className="text-slate-300 mb-6">
                        Your AI Sales Concierge is ready to start qualifying leads 24/7. Once conversations start coming in,
                        you'll see real-time metrics and analytics here.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/portal/conversations"
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                        >
                            View Conversations
                        </Link>
                        <Link
                            href="/portal/settings"
                            className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                        >
                            Configure Settings
                        </Link>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                        <div className="text-center py-8">
                            <Clock className="text-slate-600 mx-auto mb-3" size={48} />
                            <p className="text-slate-400">No recent activity</p>
                            <p className="text-slate-500 text-sm mt-2">
                                Activity will appear here once your AI starts conversations
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Today's Conversations</span>
                                <span className="text-white font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">This Week</span>
                                <span className="text-white font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">This Month</span>
                                <span className="text-white font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">All Time</span>
                                <span className="text-white font-semibold">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
