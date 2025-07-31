"use client";
import React from 'react';
import { IconUser, IconStar, IconChartPie } from '@tabler/icons-react';

// Mock data for development purposes
const mockIncomingReviews = [
  { id: 1, peer: 'Alex Smith', summary: 'Great team collaboration skills', date: 'Apr 20', rating: 4 },
  { id: 2, peer: 'Jamie Lee', summary: 'Needs to improve response time', date: 'Apr 17', rating: 3 },
];

const mockGivenReviews = [
  { id: 1, peer: 'Monica Ray', summary: 'Very proactive in meetings', date: 'Apr 10' },
  { id: 2, peer: 'Tom Blake', summary: 'Excellent product knowledge', date: 'Apr 08' },
];

const analyticsData = [
  { value: 70, label: 'Positive', color: '#22c55e' },
  { value: 20, label: 'Neutral', color: '#eab308' },
  { value: 10, label: 'Constructive', color: '#ef4444' },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <IconStar
          key={i}
          size={18}
          className={i < rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

const PeerReview = () => {
  // Calculated metrics
  const totalGiven = mockGivenReviews.length;
  const totalReceived = mockIncomingReviews.length;
  const averageRating = mockIncomingReviews.reduce((acc, review) => acc + review.rating, 0) / 
    (mockIncomingReviews.length || 1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Peer Reviews</h1>
      
      {/* Section 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 mr-4">
            <IconUser size={24} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Reviews Given</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{totalGiven}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 mr-4">
            <IconUser size={24} className="text-indigo-500 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Reviews Received</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{totalReceived}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30 mr-4">
            <IconStar size={24} className="text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{averageRating.toFixed(1)}</p>
            <RatingStars rating={averageRating} />
          </div>
        </div>
      </div>

      {/* Section 2: Incoming Reviews */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Incoming Peer Reviews</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Peer</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Summary</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockIncomingReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3">
                          {review.peer.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-200">{review.peer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">{review.summary}</td>
                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{review.date}</td>
                    <td className="py-4 px-4">
                      <RatingStars rating={review.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 3: Given Reviews */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Given Peer Reviews</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Peer</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Summary</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockGivenReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium mr-3">
                          {review.peer.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-200">{review.peer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">{review.summary}</td>
                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{review.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 4: Request Peer Review */}
      <div className="mb-8 flex justify-center">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
        >
          Request a Peer Review
        </button>
      </div>

      {/* Section 5: Analytics (Optional) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Peer Review Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {analyticsData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex justify-center items-center">
            <div className="relative h-48 w-48">
              <div className="flex items-center justify-center absolute inset-0">
                <IconChartPie size={24} className="text-gray-500" />
                <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">Feedback Types</span>
              </div>
              {/* Simple fake pie chart visualization */}
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="20" strokeDasharray="176.6" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="20" strokeDasharray="176.6" strokeDashoffset="53" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20" strokeDasharray="176.6" strokeDashoffset="123.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerReview;
