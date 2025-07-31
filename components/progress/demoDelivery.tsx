'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

const DemoDelivery = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    const [activePlaybookStep, setActivePlaybookStep] = useState<number | null>(null);
    const [isLiveDemoActive, setIsLiveDemoActive] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Mock data for demo metrics
    const demoMetrics = {
        totalDelivered: 24,
        conversionRate: 68,
        averageDuration: 22
    };

    // Mock data for recent demos
    const recentDemos = [
        { id: 1, topic: '. Product Demo', date: 'April 5', score: 8, feedback: 'Great product knowledge, could improve on closing' },
        { id: 2, topic: 'Inventory App Demo', date: 'April 8', score: 9, feedback: 'Excellent feature presentation, good engagement' },
        { id: 3, topic: 'Marketing Platform Demo', date: 'April 12', score: 7, feedback: 'Good overview, needs more focus on client pain points' },
    ];

    // Demo playbook steps
    const playbookSteps = [
        { id: 1, title: 'Opening', content: 'Start with a strong introduction, establish rapport, and set clear expectations for the demo.' },
        { id: 2, title: 'Product Features', content: 'Demonstrate key features aligned with client needs. Focus on benefits, not just functionality.' },
        { id: 3, title: 'Client Pain Points', content: 'Address specific challenges the client mentioned. Show how your product solves their problems.' },
        { id: 4, title: 'Demo Highlights', content: 'Emphasize unique selling points and competitive advantages of your product.' },
        { id: 5, title: 'Closing Pitch', content: 'Summarize value proposition, handle questions, and suggest clear next steps.' },
    ];

    // Improvement tips
    const improvementTips = [
        'Speak slowly and clearly during technical explanations',
        'Ask open-ended questions throughout the demo',
        'Confirm understanding after explaining complex features',
        'Maintain eye contact with your audience',
        'Focus on client needs rather than exhaustive feature lists'
    ];

    const togglePlaybookStep = (id: number) => {
        if (activePlaybookStep === id) {
            setActivePlaybookStep(null);
        } else {
            setActivePlaybookStep(id);
        }
    };

    const startLiveDemo = () => {
        setIsLiveDemoActive(true);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            {/* 1. Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Demo Delivery Practice</h2>
                <p className="text-gray-600 dark:text-gray-400">Master the art of engaging, informative product demos</p>
            </div>

            {/* 2. Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">🎥</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Demos Delivered</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoMetrics.totalDelivered}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">📈</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Conversion Rate</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoMetrics.conversionRate}%</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">⏳</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Average Duration</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoMetrics.averageDuration} minutes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Your Recent Demos */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Recent Demos</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-0">
                        {recentDemos.map((demo, index) => (
                            <div key={demo.id} className={`p-4 ${index !== recentDemos.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                                <div className="flex flex-wrap justify-between items-start mb-2">
                                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{demo.topic}</h4>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">{demo.date}</span>
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-md font-medium">
                                            Score: {demo.score}/10
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{demo.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Demo Playbook */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🚀 Demo Playbook</h3>
                <div className="grid grid-cols-1 gap-4">
                    {playbookSteps.map((step) => (
                        <div key={step.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div 
                                className="p-4 cursor-pointer flex justify-between items-center" 
                                onClick={() => togglePlaybookStep(step.id)}
                            >
                                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{step.id}. {step.title}</h4>
                                <svg 
                                    className={`w-5 h-5 transition-transform ${activePlaybookStep === step.id ? 'transform rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            {activePlaybookStep === step.id && (
                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400">{step.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Live Demo Practice Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🎯 Practice a Live Demo</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={startLiveDemo}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
                    >
                        Start Live Demo
                    </button>
                    
                    {isLiveDemoActive && (
                        <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                                    <svg className="w-6 h-6 text-blue-500 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        <span className="font-medium">AI Customer:</span> Hi there! I'm interested in your inventory management system. Can you show me how it works?
                                    </p>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Start your demo response:</p>
                                        <textarea 
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                            rows={4}
                                            placeholder="Type your response here..."
                                        ></textarea>
                                        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                            Send Response
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 6. Improvement Tips Section */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🧠 Improvement Tips</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <ul className="space-y-2">
                        {improvementTips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-500 dark:text-green-400 mr-2">•</span>
                                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DemoDelivery;
