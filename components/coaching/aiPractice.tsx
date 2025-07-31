"use client";
import React, { useState } from 'react';
import Link from 'next/link';

interface StatCardProps {
    icon: string;
    title: string;
    value: string | number;
}

interface SessionProps {
    topic: string;
    date: string;
    score: string;
    feedback: string;
}

const AIStatCard = ({ icon, title, value }: StatCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-md dark:bg-slate-800">
            <div className="mb-2 text-2xl">{icon}</div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h4>
        </div>
    );
};

const PracticeTypeCard = ({ icon, title, onClick }: { icon: string; title: string; onClick: () => void }) => {
    return (
        <div 
            onClick={onClick}
            className="cursor-pointer rounded-lg bg-white p-5 text-center shadow-md transition-all hover:shadow-lg dark:bg-slate-800 dark:hover:bg-slate-700"
        >
            <div className="mb-3 text-3xl">{icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
    );
};

const SessionRow = ({ topic, date, score, feedback }: SessionProps) => {
    return (
        <div className="grid grid-cols-4 border-b border-gray-200 py-3 text-sm dark:border-gray-700">
            <div className="font-medium text-gray-900 dark:text-white">{topic}</div>
            <div className="text-gray-500 dark:text-gray-400">{date}</div>
            <div className="font-medium text-gray-900 dark:text-white">{score}</div>
            <div className="text-gray-600 dark:text-gray-300">{feedback}</div>
        </div>
    );
};

const AIPractice = () => {
    const [activeTip, setActiveTip] = useState(0);
    
    const overviewStats = [
        { icon: "🧪", title: "Sessions Completed", value: 12 },
        { icon: "⏱️", title: "Average Duration", value: "15 min" },
        { icon: "💬", title: "Feedback Score", value: "8.4/10" }
    ];
    
    const practiceTypes = [
        { icon: "🗣️", title: "Objection Handling" },
        { icon: "🎬", title: "Demo Delivery" },
        { icon: "❓", title: "Discovery Questions" },
        { icon: "📚", title: "Product Knowledge" }
    ];
    
    const recentSessions = [
        { topic: "Objection Handling", date: "Apr 26", score: "85%", feedback: "Good clarity" },
        { topic: "Demo Delivery", date: "Apr 25", score: "78%", feedback: "Improve closing" },
        { topic: "Discovery Questions", date: "Apr 23", score: "92%", feedback: "Excellent follow-ups" },
        { topic: "Product Knowledge", date: "Apr 20", score: "81%", feedback: "Need more detail on features" }
    ];
    
    const aiTips = [
        "Keep answers short and clear",
        "Focus on client needs",
        "Use pauses effectively",
        "Ask clarifying questions",
        "Maintain positive tone"
    ];
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveTip(prev => (prev + 1) % aiTips.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [aiTips.length]);
    
    const handleStartNewPractice = (type?: string) => {
        console.log(`Starting new practice: ${type || 'default'}`);
        // Implementation for starting a new practice session
    };

    return (
        <div className="w-full space-y-8">
            {/* AI Practice Overview Cards */}
            <section>
                <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">AI Practice Overview</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {overviewStats.map((stat, index) => (
                        <AIStatCard key={index} {...stat} />
                    ))}
                </div>
            </section>
            
            {/* Practice Session Types */}
            <section>
                <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">What Would You Like to Practice?</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {practiceTypes.map((type, index) => (
                        <PracticeTypeCard 
                            key={index} 
                            icon={type.icon} 
                            title={type.title} 
                            onClick={() => handleStartNewPractice(type.title)}
                        />
                    ))}
                </div>
            </section>
            
            {/* Recent AI Sessions */}
            <section>
                <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Recent AI Practice Sessions</h2>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-slate-800">
                    <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50 py-3 font-medium text-gray-700 dark:border-gray-700 dark:bg-slate-700 dark:text-gray-200">
                        <div>Topic</div>
                        <div>Date</div>
                        <div>Score</div>
                        <div>Feedback Summary</div>
                    </div>
                    <div className="p-1">
                        {recentSessions.map((session, index) => (
                            <SessionRow key={index} {...session} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Start a New AI Practice */}
            <section className="flex flex-col items-center rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-center dark:from-slate-800 dark:to-indigo-950">
                <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">🎯 Ready for a New Challenge?</h2>
                <div className="mb-3">
                    <button 
                        onClick={() => handleStartNewPractice()}
                        className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Start New Practice
                    </button>
                </div>
                <div>
                    <select className="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
                        <option value="">Choose a topic...</option>
                        {practiceTypes.map((type, index) => (
                            <option key={index} value={type.title}>{type.title}</option>
                        ))}
                    </select>
                </div>
            </section>
            
            {/* Tips for Better AI Practice */}
            <section className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
                <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">🧠 Quick AI Tips</h2>
                <div className="min-h-20 flex items-center justify-center text-center">
                    <p className="animate-fade-in text-lg font-medium text-gray-800 dark:text-gray-200">
                        "{aiTips[activeTip]}"
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AIPractice; 