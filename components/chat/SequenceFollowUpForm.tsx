import React from 'react';

export default function SequenceFollowUpForm() {
  return (
    <div className="w-full max-w-full mx-auto">
      <div className="pt-8 pb-40">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#95DEE1] to-purple-300 p-[3px]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#95DEE1] to-purple-300 blur-[12px]"></div>
          <div className="relative rounded-2xl bg-white dark:bg-slate-800 p-6">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex flex-wrap items-center gap-2 text-center justify-center">
                <h2 className="text-slate-600 text-xl">A call about</h2>
                <span className="px-3 py-1.5 text-blue-600 font-medium inline-flex text-xl items-center gap-1 cursor-pointer">Sample Product
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <h2 className="text-slate-600 text-xl">with focus on</h2>
                <span className="px-3 py-1.5 text-blue-600 font-medium inline-flex text-xl items-center gap-1 cursor-pointer">Europe
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <div className="text-sm text-slate-500">Previous Calls</div>
                <div className="text-2xl font-semibold">1</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Average Score</div>
                <div className="text-2xl font-semibold text-green-500">0%</div>
              </div>
            </div>
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Key Areas to Focus */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Key Areas to Focus</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">1</div>
                      <span className="text-slate-600 dark:text-slate-300">Feature 1</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">2</div>
                      <span className="text-slate-600 dark:text-slate-300">Feature 2</span>
                    </div>
                  </div>
                </div>
                {/* Key Features */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Key Features</h3>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Service Overview</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">This is a sample product description</p>
                  </div>
                </div>
                {/* Call Settings */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Call Settings</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Warmup Time:</span>
                      <span className="font-medium">5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Max Attempts:</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-6">
                {/* Suggested Questions */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Suggested Questions</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-slate-600 dark:text-slate-300"><span className="font-medium bg-blue-100 text-blue-600 rounded-full px-2 py-1">1</span> What are your main business challenges?</p>
                    <p className="text-slate-600 dark:text-slate-300"><span className="font-medium bg-blue-100 text-blue-600 rounded-full px-2 py-1">2</span> How do you currently handle this process?</p>
                    <p className="text-slate-600 dark:text-slate-300"><span className="font-medium bg-blue-100 text-blue-600 rounded-full px-2 py-1">3</span> What would success look like for you?</p>
                  </div>
                </div>
                {/* Target Audience Details */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Target Audience Details</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Name:</span>
                      <span className="text-slate-600 dark:text-slate-300">Enterprise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Age Group:</span>
                      <span className="text-slate-600 dark:text-slate-300">25-34, 35-44</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Budget:</span>
                      <span className="text-slate-600 dark:text-slate-300">$1000+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Gender:</span>
                      <span className="text-slate-600 dark:text-slate-300">Male, Female</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Geography:</span>
                      <span className="text-slate-600 dark:text-slate-300">North America, Europe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 min-w-[100px]">Industry:</span>
                      <span className="text-slate-600 dark:text-slate-300">Technology, Finance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Start New Call Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Start New Call</h3>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Start Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 