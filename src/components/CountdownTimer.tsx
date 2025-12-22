'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Target: December 31, 2025 23:59:59 PST (Los Angeles time)
        const targetDate = new Date('2025-12-31T23:59:59-08:00'); // PST timezone

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-slate-800/50 border border-orange-500/30 rounded-2xl p-6 mb-8">
            <div className="text-center mb-4">
                <p className="text-orange-500 font-semibold text-lg mb-2">⏰ Founding Program Closes In:</p>
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Minutes' },
                    { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                    <div key={index} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                        <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
                            {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-slate-400 text-xs md:text-sm uppercase tracking-wider">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
                After this deadline, pricing returns to $6,997 + $497/month
            </p>
        </div>
    );
}
