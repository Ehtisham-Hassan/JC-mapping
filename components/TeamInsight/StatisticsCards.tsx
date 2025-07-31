import React from 'react';

interface StatisticCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    changeType: 'positive' | 'neutral' | 'negative';
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, change, icon, changeType }) => {
    const getChangeColor = () => {
        switch (changeType) {
            case 'positive':
                return 'text-green-500 dark:text-green-400';
            case 'negative':
                return 'text-red-500 dark:text-red-400';
            default:
                return 'text-gray-500 dark:text-gray-400';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full ${icon ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                    {icon}
                </div>
                <span className={`text-sm ${getChangeColor()}`}>{change} vs last month</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    );
};

const StatisticsCards = () => {
    const stats = [
        {
            title: 'Team Success Rate',
            value: '0%',
            change: '+0%',
            icon: (
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            changeType: 'positive' as const,
        },
        {
            title: 'Avg Call Duration',
            value: '0m',
            change: '0m',
            icon: (
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            changeType: 'neutral' as const,
        },
        {
            title: 'Objections Handled',
            value: '0%',
            change: '+0%',
            icon: (
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            changeType: 'positive' as const,
        },
        {
            title: 'Team Certifications',
            value: '0',
            change: '+0',
            icon: (
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            changeType: 'positive' as const,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {stats.map((stat, index) => (
                <StatisticCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatisticsCards; 