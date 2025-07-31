"use client"
import React, { useState, Suspense } from 'react'
import HeaderSection from '../ui/HeaderSection';
import StatisticsCards from '../ui/StatisticsCards';
import FilterButtons from '../ui/FilterButtons';
import CoachingPerformance from './CoachingPerformance';
import dynamic from 'next/dynamic';
const AIPractice = dynamic(()=>import('./aiPractice'),{ssr:false})
const ManagerFeedback = dynamic(()=>import('./managerFeedback'),{ssr:false})
const PeerReview = dynamic(()=>import('./peerReview'),{ssr:false})
const ExternalComponent = dynamic(()=>import('./enternalComponent'),{ssr:false})
const MainCoaching = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const headerData = {
      title: 'Coaching Dashboard',
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
      { label: 'All Types', value: null },
      { label: 'AI Practice', value: 'ai_practice' },
      { label: 'Manager Feedback', value: 'manager_feedback' },
      { label: 'Peer Review', value: 'peer_review' },
      { label: 'External', value: 'external' },
      
    ];
  return (
    <div>
        <HeaderSection {...headerData} />
      <StatisticsCards stats={statisticsData} />
      <FilterButtons activeTab={activeTab} setActiveTab={setActiveTab} buttons={filterButtons} />
      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
      {activeTab === null && <CoachingPerformance/>}
      {activeTab === 'ai_practice' && <AIPractice/>}
      {activeTab === 'manager_feedback' && <ManagerFeedback/>}
      {activeTab === 'peer_review' && <PeerReview/>}
      {activeTab === 'external' && <ExternalComponent/>}
      </Suspense>
    </div>
  )
}

export default MainCoaching
