"use client"
import React, { useState } from 'react'
import HeaderSection from '../ui/HeaderSection';
import StatisticsCards from '../ui/StatisticsCards';
import FilterButtons from '../ui/FilterButtons';
import ComponentsDatatablesAdvanced from './TeamMember';
import PerformanceCharts from './PerformanceCharts';

const MainTeam = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const headerData = {
      title: 'Progress Dashboard',
      description: 'Track your learning progress and achievements',
      buttons: [
        {
          label: 'Last 30 Days',
          onClick: () => {
            // Handle view history click
          },
          variant: 'secondary' as const,
        },
        {
          label: 'Set Goals',
          onClick: () => {
            // Handle new session click
          },
          variant: 'primary' as const,
        },
      ],
    };
  
    const statisticsData = [
      {
        title: 'Not Started',
        value: 5,
        color: '#1A1A2E',
        icon: null,
      },
      {
        title: 'Active',
        value: 13,
        color: '#10B981',
        icon: null,
      },
      {
        title: 'On Hold',
        value: 8,
        color: 'blue',
        icon: null,
      },
      {
        title: 'Completed',
        value: 12,
        color: 'red',
        icon: null,
      },
    ];
  
    const filterButtons = [
      { label: 'All', value: null },
      { label: 'Active', value: 'active' },
      { label: 'Onboarding', value: 'onboarding' },
      { label: 'Inactive', value: 'inactive' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div>
      <HeaderSection {...headerData} />
      <StatisticsCards stats={statisticsData} />
      
      <div className="mb-5 flex flex-col items-center justify-between gap-5 md:flex-row bg-gray-100 dark:bg-gray-800 px-4 rounded-lg">
        <div className="">
          <div className="relative">
            <input
              type="text"
              placeholder="Search team members..."
              className="form-input h-11 w-72 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 pl-4 pr-11 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-transparent dark:focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 mr-3 h-full text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <FilterButtons activeTab={activeTab} setActiveTab={setActiveTab} buttons={filterButtons} />
        </div>
      </div>
      
      <ComponentsDatatablesAdvanced/>
      <PerformanceCharts />
    </div>
  )
}

export default MainTeam
