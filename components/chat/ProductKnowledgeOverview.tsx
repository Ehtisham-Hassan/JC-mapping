import React from 'react';

export default function ProductKnowledgeOverview() {
  return (
    <div className="w-full flex flex-col items-start pt-8 pb-40">
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Product Knowledge Overview</div>
      <div className="text-gray-500 dark:text-gray-300 mb-6">Track your expertise and training progress on each product</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Products Covered */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900">
            <span className="text-3xl">🪙</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Products Covered</div>
            <div className="text-blue-600 text-2xl font-bold leading-none">5</div>
          </div>
        </div>
        {/* Certifications Achieved */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900">
            <span className="text-3xl">🏆</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Certifications Achieved</div>
            <div className="text-indigo-500 text-2xl font-bold leading-none">3</div>
          </div>
        </div>
        {/* Training Completion */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-green-50 dark:bg-green-900">
            <svg className="w-12 h-12" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle cx="20" cy="20" r="18" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="113" strokeDashoffset="45" strokeLinecap="round" />
              <text x="20" y="25" textAnchor="middle" fontSize="14" fill="#222">60%</text>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Training Completion</div>
            <div className="text-green-600 text-2xl font-bold leading-none">60%</div>
          </div>
        </div>
        {/* Dummy Card 1 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900">
            <span className="text-3xl">📚</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Courses Enrolled</div>
            <div className="text-yellow-600 text-2xl font-bold leading-none">8</div>
          </div>
        </div>
        {/* Dummy Card 2 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-900">
            <span className="text-3xl">💡</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Skills Mastered</div>
            <div className="text-pink-600 text-2xl font-bold leading-none">12</div>
          </div>
        </div>
        {/* Dummy Card 3 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow p-6 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900">
            <span className="text-3xl">📝</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Assessments Taken</div>
            <div className="text-purple-600 text-2xl font-bold leading-none">4</div>
          </div>
        </div>
      </div>
    </div>
  );
} 