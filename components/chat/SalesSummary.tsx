import React from 'react';

export default function SalesSummary() {
  return (
    <div className="w-full flex flex-col pt-8 pb-40 space-y-6">
      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl shadow-sm overflow-hidden border bg-white dark:bg-gray-900">
          <div className="p-5 flex justify-between items-center">
            <div>
              <p className="text-black dark:text-white text-opacity-80 text-sm font-medium">Deals Closed</p>
              <h3 className="text-3xl font-bold mt-1 text-black dark:text-white">124</h3>
            </div>
            <div className="p-3 rounded-full text-2xl" style={{ backgroundColor: '#4F46E580' }}>
              <span role="img" aria-label="deals">📊</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl shadow-sm overflow-hidden border bg-white dark:bg-gray-900">
          <div className="p-5 flex justify-between items-center">
            <div>
              <p className="text-black dark:text-white text-opacity-80 text-sm font-medium">Revenue Generated</p>
              <h3 className="text-3xl font-bold mt-1 text-black dark:text-white">$45,670</h3>
            </div>
            <div className="p-3 rounded-full text-2xl" style={{ backgroundColor: '#10B98180' }}>
              <span role="img" aria-label="revenue">📈</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl shadow-sm overflow-hidden border bg-white dark:bg-gray-900">
          <div className="p-5 flex justify-between items-center">
            <div>
              <p className="text-black dark:text-white text-opacity-80 text-sm font-medium">New Clients</p>
              <h3 className="text-3xl font-bold mt-1 text-black dark:text-white">28</h3>
            </div>
            <div className="p-3 rounded-full text-2xl" style={{ backgroundColor: '#F59E0B80' }}>
              <span role="img" aria-label="clients">👥</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl shadow-sm overflow-hidden border bg-white dark:bg-gray-900">
          <div className="p-5 flex justify-between items-center">
            <div>
              <p className="text-black dark:text-white text-opacity-80 text-sm font-medium">Conversion Rate</p>
              <h3 className="text-3xl font-bold mt-1 text-black dark:text-white">12.5%</h3>
            </div>
            <div className="p-3 rounded-full text-2xl" style={{ backgroundColor: '#EF444480' }}>
              <span role="img" aria-label="conversion">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Progress Overview */}
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Progress Overview</h3>
        </div>
        <div className="p-5">
          <div className="h-[200px] flex items-center justify-center border rounded-md border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            Line Chart: Weekly and Monthly Revenue Growth
          </div>
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Products</h3>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">Product Name</th>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">Units Sold</th>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">Revenue Generated</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3">Product A</td>
                  <td className="px-4 py-3">120</td>
                  <td className="px-4 py-3">$24,000</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3">Product B</td>
                  <td className="px-4 py-3">90</td>
                  <td className="px-4 py-3">$18,000</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3">Product C</td>
                  <td className="px-4 py-3">75</td>
                  <td className="px-4 py-3">$15,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Sales Goals */}
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sales Goals</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium text-gray-900 dark:text-white">🎯 Target: $100K Revenue</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">65%</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Target: $100,000</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium text-gray-900 dark:text-white">🎯 Target: 50 New Clients</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">80%</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Target: 50 New Clients</p>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-2">
            <li className="flex justify-between py-2 border-b last:border-0 border-gray-100 dark:border-gray-800">
              <span>- Q2 Sales Campaign Launch</span>
              <span className="text-gray-500 dark:text-gray-300">May 10</span>
            </li>
            <li className="flex justify-between py-2 border-b last:border-0 border-gray-100 dark:border-gray-800">
              <span>- Client Follow-up Deadline</span>
              <span className="text-gray-500 dark:text-gray-300">May 15</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 