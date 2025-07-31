"use client"
import React from 'react';

const PerformanceCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Performance by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Performance by Category</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          Performance chart will be displayed here
        </div>
      </div>

      {/* Certification Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Certification Progress</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          Certification chart will be displayed here
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts; 