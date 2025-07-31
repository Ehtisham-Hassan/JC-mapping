"use client"
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DataTable } from 'mantine-datatable';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Feedback {
    id: string;
    managerName: string;
    summary: string;
    date: string;
    rating: number;
    details: string;
    category: 'Communication' | 'Product Knowledge' | 'Objection Handling' | 'Delivery';
}

const ManagerFeedback = () => {
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    // Sample data for demonstration
    const feedbacks: Feedback[] = [
        {
            id: '1',
            managerName: 'Sarah Johnson',
            summary: 'Great product knowledge',
            date: 'Apr 26, 2023',
            rating: 4,
            details: 'You demonstrated excellent product knowledge during the sales call. Your ability to explain complex features in simple terms was impressive. Consider working on objection handling techniques to further improve your performance.',
            category: 'Product Knowledge'
        },
        {
            id: '2',
            managerName: 'Mark Evans',
            summary: 'Improve objection handling',
            date: 'Apr 24, 2023',
            rating: 3,
            details: 'You have a good grasp of the product but need to work on handling customer objections more effectively. Practice anticipating common objections and preparing concise responses. Your communication skills are excellent.',
            category: 'Objection Handling'
        },
        {
            id: '3',
            managerName: 'Emily Wilson',
            summary: 'Excellent communication',
            date: 'Apr 20, 2023',
            rating: 5,
            details: 'Your communication skills are outstanding. You maintained excellent rapport with the client and explained our value proposition clearly. Keep up the great work and consider sharing your techniques with the team.',
            category: 'Communication'
        },
        {
            id: '4',
            managerName: 'David Thompson',
            summary: 'Work on delivery pace',
            date: 'Apr 15, 2023',
            rating: 3,
            details: 'You have solid product knowledge, but your delivery could be improved. Try to pace yourself better during presentations and leave more room for customer questions. Your enthusiasm is contagious - just need to manage the flow better.',
            category: 'Delivery'
        }
    ];

    // Calculate statistics for overview cards
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks;
    const lastFeedbackDate = feedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date;

    // Calculate category data for the pie chart
    const categoryData = {
        labels: ['Communication', 'Product Knowledge', 'Objection Handling', 'Delivery'],
        datasets: [
            {
                data: [
                    feedbacks.filter(f => f.category === 'Communication').length,
                    feedbacks.filter(f => f.category === 'Product Knowledge').length,
                    feedbacks.filter(f => f.category === 'Objection Handling').length,
                    feedbacks.filter(f => f.category === 'Delivery').length
                ],
                backgroundColor: ['#4361ee', '#805dca', '#e2a03f', '#e7515a'],
                borderColor: ['#4361ee', '#805dca', '#e2a03f', '#e7515a'],
                borderWidth: 1,
            },
        ],
    };

    // Handle opening the feedback detail modal
    const handleViewFeedback = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setIsModalOpen(true);
    };

    // Render stars for rating
    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ));
    };

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Feedbacks</p>
                            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{totalFeedbacks}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Rating</p>
                            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{averageRating.toFixed(1)}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                            <svg className="w-6 h-6 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Last Feedback</p>
                            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{lastFeedbackDate}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg className="w-6 h-6 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Feedbacks */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Feedback</h3>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={feedbacks}
                        columns={[
                            { accessor: 'managerName', title: 'Manager' },
                            { accessor: 'summary', title: 'Summary' },
                            { accessor: 'date', title: 'Date' },
                            { 
                                accessor: 'rating', 
                                title: 'Rating',
                                render: ({ rating }) => (
                                    <div className="flex items-center">
                                        {renderStars(rating)}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                render: (record) => (
                                    <button 
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleViewFeedback(record)}
                                    >
                                        View Details
                                    </button>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Request Feedback Button */}
            <div className="flex justify-center mt-6">
                <button 
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setIsRequestModalOpen(true)}
                >
                    Request Feedback
                </button>
            </div>

            {/* Feedback Analytics Chart (Optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Feedback Insights</h3>
                <div className="flex justify-center" style={{ height: '250px' }}>
                    <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Detailed Feedback Viewer Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Feedback from {selectedFeedback?.managerName}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <div className="flex items-center mb-2">
                                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Rating:</span>
                                            <div className="flex">
                                                {selectedFeedback && renderStars(selectedFeedback.rating)}
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Date: </span>
                                            <span className="text-gray-700 dark:text-gray-300">{selectedFeedback?.date}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Category: </span>
                                            <span className="text-gray-700 dark:text-gray-300">{selectedFeedback?.category}</span>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Feedback Details:</h4>
                                            <p className="text-gray-700 dark:text-gray-300">{selectedFeedback?.details}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Request Feedback Modal */}
            <Transition appear show={isRequestModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsRequestModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Request Feedback
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Select Manager
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                                    <option value="">Choose a manager</option>
                                                    <option value="sarah">Sarah Johnson</option>
                                                    <option value="mark">Mark Evans</option>
                                                    <option value="emily">Emily Wilson</option>
                                                    <option value="david">David Thompson</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Topic
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                                    <option value="">Select a topic</option>
                                                    <option value="communication">Communication</option>
                                                    <option value="product">Product Knowledge</option>
                                                    <option value="objection">Objection Handling</option>
                                                    <option value="delivery">Delivery</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Additional Notes (Optional)
                                                </label>
                                                <textarea 
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    rows={3}
                                                    placeholder="Any specific aspects you'd like feedback on?"
                                                ></textarea>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            onClick={() => setIsRequestModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => {
                                                // Handle request submission
                                                setIsRequestModalOpen(false);
                                            }}
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ManagerFeedback;
