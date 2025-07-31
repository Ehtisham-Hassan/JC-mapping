import React from 'react';

export default function WelcomeScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4 sm:gap-6 md:gap-8 w-full max-w-3xl mx-auto px-2 sm:px-4 mb-10 pb-32 sm:pb-40">
            {/* Main Logo with Text */}
            <div className="flex flex-row items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Chat.AI</span>
            </div>
            <div className="w-full">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">Welcome to Chat.AI</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">Get started by Chat a task and Chat can do the rest.</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Not sure where to start?</p>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4 sm:p-5 md:p-6 flex flex-col items-center">
                    <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800 dark:text-white">Productivity Boost</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Start your day with focus. Set three main goals you want to accomplish.</span>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4 sm:p-5 md:p-6 flex flex-col items-center">
                    <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800 dark:text-white">User-Friendly Onboarding</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Start your day with focus. Set three main goals you want to accomplish.</span>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4 sm:p-5 md:p-6 flex flex-col items-center sm:col-span-2 md:col-span-1">
                    <span className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800 dark:text-white">Voice-Activated Responses</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Start your day with focus. Set three main goals you want to accomplish.</span>
                </div>
            </div>
        </div>
    );
}
