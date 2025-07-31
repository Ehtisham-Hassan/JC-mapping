import React, { useRef, useState } from 'react';
import { Plus, FileText, BarChart3, FolderOpen, Brain, SlidersHorizontal } from 'lucide-react';
import { QuickActionCategories } from './types';

interface ChatInputProps {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSidebarOpen: boolean;
}

const quickActionCategories: QuickActionCategories = {
    'Financial Tasks': [
        { title: 'Generate Invoice for Customer', desc: 'Create professional invoices with automated calculations' },
        { title: 'View Invoices', desc: 'Track and manage outstanding customer payments' },
        { title: 'Create New Expense Entry', desc: 'Record business expenses for tax and budgeting' },
        { title: 'Create Sequence Follow Up', desc: 'Create a sequence of follow up emails for a customer' },
        { title: 'Categorize Transactions', desc: 'Organize transactions for better financial tracking' },
        { title: 'Summarize Monthly Profit & Loss', desc: 'Generate comprehensive monthly financial summaries' }
    ],
    'Reports & Insights': [
        { title: 'Get Balance Sheet Report', desc: 'Generate a comprehensive balance sheet report' },
        { title: 'Summarize Last Month\'s P&L', desc: 'View a concise profit and loss summary for the previous month' },
        { title: 'Forecast Next Month\'s Cash Flow', desc: 'Predict expected inflows and outflows based on current trends' },
        { title: 'Show Weekly Sales Trends', desc: 'View and analyze weekly sales performance trends' },
        { title: 'Find Top 5 Expense Categories', desc: 'Identify the largest areas of spending in your business' }
    ],
    'Documents & Attachments': [
        { title: 'Upload Receipt', desc: 'Upload and categorize receipts automatically' },
        { title: 'Manage Documents', desc: 'Organize financial documents efficiently' },
        { title: 'Backup Files', desc: 'Secure backup of important files' },
        { title: 'Document Scanner', desc: 'Scan and digitize paper documents' }
    ],
    'Smart Queries (AI-Based)': [
        { title: 'Ask Financial Question', desc: 'Get AI-powered financial insights and advice' },
        { title: 'Predict Trends', desc: 'AI-based financial trend predictions' },
        { title: 'Risk Analysis', desc: 'Analyze potential financial risks' },
        { title: 'Smart Recommendations', desc: 'Get personalized financial recommendations' }
    ]
};

export default function ChatInput({ input, setInput, handleSubmit, handleFileUpload, isSidebarOpen }: ChatInputProps) {
    const [quickActionOpen, setQuickActionOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Financial Tasks');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Financial Tasks': return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'Reports & Insights': return <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'Documents & Attachments': return <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'Smart Queries (AI-Based)': return <Brain className="w-4 h-4 sm:w-5 sm:h-5" />;
            default: return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`fixed bottom-4 z-40 w-full max-w-3xl px-2 sm:px-4 transition-all duration-300 ${
                isSidebarOpen 
                    ? 'left-1/2 -translate-x-1/2' 
                    : 'sm:left-[calc(50%+130px)] sm:-translate-x-1/2 left-1/2 -translate-x-1/2'
            }`}
        >
            <div className="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl min-h-[90px]">
                {/* Quick Action Modal */}
                {quickActionOpen && (
                    <div 
                        className="absolute bottom-full mb-2 left-0 w-full bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-lg p-0 overflow-hidden transition-all duration-300 z-50"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Quick Actions</h3>
                            <button
                                onClick={() => setQuickActionOpen(false)}
                                className="text-gray-500 dark:text-gray-400 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Close quick actions"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row h-[340px] sm:h-[320px]">
                            {/* Left Sidebar - Categories */}
                            <div className="w-full sm:w-1/4 bg-gray-50/80 dark:bg-gray-800/80 p-2 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                                {Object.keys(quickActionCategories).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left flex items-center gap-2 p-2 mb-1 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                            selectedCategory === category
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {getCategoryIcon(category)}
                                        <span className="truncate">{category}</span>
                                    </button>
                                ))}
                            </div>
                            {/* Right Content - Sub-items */}
                            <div className="flex-1 p-2 overflow-y-auto bg-white/70 dark:bg-gray-900/70">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {quickActionCategories[selectedCategory]?.map((item, index) => (
                                        <button
                                            key={index}
                                            className="text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 shadow hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 group"
                                            onClick={() => {
                                                setInput(item.title);
                                                setQuickActionOpen(false);
                                            }}
                                        >
                                            <div className="font-semibold text-gray-800 dark:text-white text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{item.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{item.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    rows={3}
                    className="w-full bg-transparent resize-none outline-none border-none p-3 sm:p-5 pt-3 sm:pt-4 pr-24 sm:pr-32 text-sm sm:text-base text-gray-700 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-2xl min-h-[90px] max-h-[180px]"
                    style={{ boxShadow: 'none' }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                {/* Plus icon */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 left-3 sm:left-4 flex items-center justify-center w-7 h-7 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    tabIndex={-1}
                >
                    <Plus className="w-5 h-5" />
                </button>
                {/* Quick Action button */}
                <button
                    type="button"
                    onClick={() => setQuickActionOpen(!quickActionOpen)}
                    className="absolute bottom-3 left-12 sm:left-16 flex items-center gap-1 px-2 h-7 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    tabIndex={-1}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Quick action</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                />
                {/* Send button */}
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute bottom-3 right-3 sm:right-4 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </form>
    );
}
