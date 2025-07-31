import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CallPerformance = () => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          stepSize: 25,
          color: 'rgb(107, 114, 128)', // text-gray-500
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(107, 114, 128)', // text-gray-500
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    barPercentage: 0.6,
  };

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [25, 30, 27, 35, 30],
        backgroundColor: '#4F46E5',
        borderRadius: 4,
      },
      {
        data: [85, 88, 90, 87, 89],
        backgroundColor: '#818CF8',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Call Performance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Daily practice call metrics</p>
        </div>
      </div>
      <div className="h-[300px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default CallPerformance; 