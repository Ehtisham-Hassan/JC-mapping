import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  score: number;
  change: string;
}

const PerformerRow = ({ name, role, score, change }: TeamMember) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold dark:text-gray-100">{score}%</span>
        <span className="text-xs text-green-500 dark:text-green-400">+{change}</span>
      </div>
    </div>
  );
};

const TopPerformers = () => {
  const performers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Sales Rep',
      score: 95,
      change: '1.2%',
    },
    {
      name: 'Michael Chen',
      role: 'Sales Rep',
      score: 92,
      change: '1.8%',
    },
    {
      name: 'Emma Davis',
      role: 'Sales Rep',
      score: 88,
      change: '1.5%',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Top Performers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">This month's leading team members</p>
        </div>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {performers.map((performer) => (
          <PerformerRow key={performer.name} {...performer} />
        ))}
      </div>
    </div>
  );
};

export default TopPerformers; 