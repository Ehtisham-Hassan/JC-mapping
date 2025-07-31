'use client'
import React from 'react'
import HeaderSection from '../ui/HeaderSection';
import StatisticsCards from './StatisticsCards';
import CallPerformance from './CallPerformance';
import ProductCoverage from './ProductCoverage';
import TopPerformers from './TopPerformers';

const MainInsight = () => {
  const headerData = {
    title: 'Team Insights',
    description: 'Monitor team performance and progress',
    buttons: [
      {
        label: 'Export Report',
        onClick: () => {
          // Handle view history click
        },
        variant: 'secondary' as const,
      }
    ],
  };
  return (
    <div className="p-6">
      <HeaderSection {...headerData} />
      <StatisticsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CallPerformance />
        <ProductCoverage />
      </div>
      <div className="mt-6">
        <TopPerformers />
      </div>
    </div>
  )
}

export default MainInsight
