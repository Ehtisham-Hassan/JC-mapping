"use client"
import React, { Suspense, useState } from 'react'
import HeaderSection from '../ui/HeaderSection';
import StatisticsCards from '../ui/StatisticsCards';
import FilterButtons from '../ui/FilterButtons';
import GoalsProgress from './GoalsProgress';
import dynamic from 'next/dynamic';
const SalesComponent = dynamic(()=>import('./salesComponent'),{ssr:false})
const ProductKnowledge = dynamic(()=>import('./ProductKnowledge'),{ssr:false})
const CustomerSatisfaction = dynamic(()=>import('./CustomerSatisfaction'),{ssr:false})
const TeamPerformance = dynamic(()=>import('./TeamPerformance'),{ssr:false})
interface TeamMetric {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface Contributor {
  name: string;
  contributions: number;
  role: string;
}

interface TeamGoal {
  name: string;
  target: string;
  progress: number;
}

interface TeamDeadline {
  name: string;
  date: string;
}

interface TeamPerformanceProps {
  metrics: TeamMetric[];
  contributors: Contributor[];
  goals: TeamGoal[];
  deadlines: TeamDeadline[];
}
// Sales component demo data
const salesMetrics = [
  { title: "Deals Closed", value: "124", icon: "💵", color: "#4F46E5" },
  { title: "Revenue Generated", value: "$45,670", icon: "📈", color: "#10B981" },
  { title: "New Clients", value: "28", icon: "👥", color: "#F59E0B" },
  { title: "Conversion Rate", value: "12.5%", icon: "🔥", color: "#EF4444" },
];

const salesProducts = [
  { name: "Product A", unitsSold: 120, revenue: "$24,000" },
  { name: "Product B", unitsSold: 90, revenue: "$18,000" },
  { name: "Product C", unitsSold: 75, revenue: "$15,000" },
];

const salesGoals = [
  { name: "Target: $100K Revenue", target: "$100,000", progress: 65 },
  { name: "Target: 50 New Clients", target: "50 New Clients", progress: 80 },
];

const salesDeadlines = [
  { name: "Q2 Sales Campaign Launch", date: "May 10" },
  { name: "Client Follow-up Deadline", date: "May 15" },
];
const demoMetrics: TeamMetric[] = [
  { title: "Active Members", value: "18", icon: "👥", color: "#4F46E5" },
  { title: "Projects", value: "5", icon: "📁", color: "#10B981" },
  { title: "Avg. Completion Rate", value: "87%", icon: "✅", color: "#F59E0B" },
  { title: "Collaboration Score", value: "92", icon: "🤝", color: "#EF4444" },
];

const demoContributors: Contributor[] = [
  { name: "Alice Johnson", contributions: 34, role: "Team Lead" },
  { name: "Bob Smith", contributions: 28, role: "Developer" },
  { name: "Carol Lee", contributions: 25, role: "QA" },
];

const demoGoals: TeamGoal[] = [
  { name: "Complete Project Alpha", target: "100%", progress: 80 },
  { name: "Onboard 3 New Members", target: "3 Members", progress: 66 },
];

const demoDeadlines: TeamDeadline[] = [
  { name: "Sprint Review Meeting", date: "Feb 20" },
  { name: "Project Alpha Deadline", date: "Mar 1" },
];

const MainGoal = () => {
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
      { label: 'All', value: null },
      { label: 'Sales', value: 'sales' },
      { label: 'Product Knowledge', value: 'product_knowledge' },
      { label: 'Customer Satisfaction', value: 'customer_satisfaction' },
      { label: 'Team ', value: 'team' },
      
    ];
  return (
    <div>
        <HeaderSection {...headerData} />
      <StatisticsCards stats={statisticsData} />
      <FilterButtons activeTab={activeTab} setActiveTab={setActiveTab} buttons={filterButtons} />
      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
      {activeTab === null && <GoalsProgress/>}
      {activeTab === 'sales' && (
        <SalesComponent 
          metrics={salesMetrics}
          products={salesProducts}
          goals={salesGoals}
          deadlines={salesDeadlines}
        />
      )}
      {activeTab === 'product_knowledge' && (
        <ProductKnowledge progress={78} modules={[
          { name: "Module 1: Features Overview", completed: true },
          { name: "Module 2: Competitive Analysis", completed: true },
          { name: "Module 3: Use Cases", completed: false },
        ]} />
      )}
      {activeTab === 'customer_satisfaction' && (
        <CustomerSatisfaction progress={64} modules={[
          { name: "Module 1: NPS Training", completed: true },
          { name: "Module 2: Feedback Loops", completed: false },
          { name: "Module 3: Customer Journey", completed: false },
        ]} />
      )}
      {activeTab === 'team' && (
        <TeamPerformance metrics={demoMetrics} contributors={demoContributors} goals={demoGoals} deadlines={demoDeadlines} />
      )}
      </Suspense>
    </div>
  )
}

export default MainGoal
