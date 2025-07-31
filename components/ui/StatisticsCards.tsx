import React from 'react';

interface StatisticCardProps {
  title: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

interface StatisticsCardsProps {
  stats: StatisticCardProps[];
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, color, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatisticCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsCards; 