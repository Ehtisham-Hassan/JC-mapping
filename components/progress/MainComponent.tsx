'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderSection from '../ui/HeaderSection';
import StatisticsCards from '../ui/StatisticsCards';
import FilterButtons from '../ui/FilterButtons';
// Dynamic imports
const ProgressOverview = dynamic(() => import('./ProgressOverview'));
const ProductKnowledge = dynamic(() => import('./productKnowledge'));
const ObjectionHandling = dynamic(() => import('./objectionHandling'));
const DemoDelivery = dynamic(() => import('./demoDelivery'));

const MainComponent = () => {
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
    { label: 'All Skills', value: null },
    { label: 'Product Knowledge', value: 'product_knowledge' },
    { label: 'Objection Handling', value: 'objection_handling' },
    { label: 'Demo Delivery', value: 'demo_delivery' },
    
  ];

  return (
    <div className=''>
      <HeaderSection {...headerData} />
      <StatisticsCards stats={statisticsData} />
      <FilterButtons activeTab={activeTab} setActiveTab={setActiveTab} buttons={filterButtons} />
      {activeTab === null && <ProgressOverview />}
      {activeTab === 'product_knowledge' && <ProductKnowledge />}
      {activeTab === 'objection_handling' && <ObjectionHandling />}
      {activeTab === 'demo_delivery' && <DemoDelivery />}
    </div>
  );
};

export default MainComponent;
