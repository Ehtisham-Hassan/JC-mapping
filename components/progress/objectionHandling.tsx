'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ObjectionHandling = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    const [activeObjection, setActiveObjection] = useState<number | null>(null);
    const [isSimulationActive, setIsSimulationActive] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Mock data for objections
    const objections = [
        { id: 1, title: 'Price Concern', description: 'How to handle objections about pricing', tips: ['Focus on value', 'Discuss ROI', 'Offer comparisons'] },
        { id: 2, title: 'Need More Time', description: 'Addressing requests for extended decision time', tips: ['Create urgency', 'Offer trial', 'Follow-up schedule'] },
        { id: 3, title: 'Need Approval', description: 'Navigating approval chain objections', tips: ['Ask about process', 'Offer resources for approvers', 'Schedule joint call'] },
        { id: 4, title: 'Product Doubts', description: 'Handling concerns about product capabilities', tips: ['Share case studies', 'Offer demo', 'Technical validation'] },
    ];

    // Mock data for summary cards
    const summaryData = {
        totalPracticed: 42,
        successRate: 78,
        averageTime: 32
    };

    // Mock data for recent wins
    const recentWins = [
        { id: 1, description: 'Closed a deal after objection: "Too Expensive"', date: '2023-07-10' },
        { id: 2, description: 'Successfully addressed "Need more time" objection', date: '2023-07-05' },
        { id: 3, description: 'Converted a "Need approval" objection to a sale', date: '2023-06-28' },
    ];

    // Performance radar chart data
    const performanceChart: any = {
        series: [
            {
                name: 'Performance',
                data: [85, 70, 75, 90, 80],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'radar',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: true,
            },
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        strokeColors: isDark ? '#3b3f5c' : '#e0e6ed',
                        connectorColors: isDark ? '#3b3f5c' : '#e0e6ed',
                    },
                },
            },
            colors: ['#00ab55'],
            markers: {
                size: 5,
                colors: ['#00ab55'],
                strokeColor: '#00ab55',
                strokeWidth: 2,
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
            xaxis: {
                categories: ['Confidence', 'Product Knowledge', 'Timing', 'Empathy', 'Follow-up'],
            },
            yaxis: {
                labels: {
                    formatter: (val: number) => {
                        return val + '%';
                    },
                },
                max: 100,
            },
        },
    };

    const toggleObjection = (id: number) => {
        if (activeObjection === id) {
            setActiveObjection(null);
        } else {
            setActiveObjection(id);
        }
    };

    const startSimulation = () => {
        setIsSimulationActive(true);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            {/* 1. Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Objection Handling Mastery</h2>
                <p className="text-gray-600 dark:text-gray-400">Practice and improve how you address common objections</p>
            </div>

            {/* 2. Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">📢</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Objections Practiced</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryData.totalPracticed}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">🧠</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Success Rate</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryData.successRate}%</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">🕒</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Average Handling Time</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryData.averageTime} seconds</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Common Objections List */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Common Objections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {objections.map((objection) => (
                        <div key={objection.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div 
                                className="p-4 cursor-pointer flex justify-between items-center" 
                                onClick={() => toggleObjection(objection.id)}
                            >
                                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{objection.title}</h4>
                                <svg 
                                    className={`w-5 h-5 transition-transform ${activeObjection === objection.id ? 'transform rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            {activeObjection === objection.id && (
                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{objection.description}</p>
                                    <div className="mt-3">
                                        <h5 className="font-medium text-gray-700 dark:text-gray-300">Top Tips:</h5>
                                        <ul className="list-disc pl-5 mt-1">
                                            {objection.tips.map((tip, index) => (
                                                <li key={index} className="text-gray-600 dark:text-gray-400">{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Practice Sessions */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Practice Sessions</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={startSimulation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
                    >
                        Start Objection Simulation
                    </button>
                    
                    {isSimulationActive && (
                        <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                                    <svg className="w-6 h-6 text-blue-500 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">AI Customer:</p>
                                    <p className="text-gray-600 dark:text-gray-400">Your product seems expensive compared to alternatives. Why should I pay this premium?</p>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <textarea 
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    placeholder="Type your response to this objection..."
                                    rows={3}
                                />
                                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                    Submit Response
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. Performance Graph */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Performance Overview</h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    {isMounted && (
                        <ReactApexChart 
                            options={performanceChart.options} 
                            series={performanceChart.series} 
                            type="radar" 
                            height={300} 
                        />
                    )}
                </div>
            </div>

            {/* 6. Recent Wins */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Wins</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="max-h-64 overflow-y-auto">
                        <PerfectScrollbar className="p-5">
                            {recentWins.map((win) => (
                                <div key={win.id} className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                                    <div className="flex items-center">
                                        <span className="text-xl mr-2">🏆</span>
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-300">{win.description}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{win.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectionHandling;
