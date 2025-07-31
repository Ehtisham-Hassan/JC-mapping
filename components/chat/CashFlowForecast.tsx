import React, { useState } from 'react';
import { FileText, BarChart2, Table, Download, Mail, Plus } from 'lucide-react';

interface ForecastFormData {
    forecastHorizon: string;
    customStartDate?: string;
    customEndDate?: string;
    scenario: string;
    includePendingInvoices: boolean;
    includePendingBills: boolean;
    customEntries: Array<{
        amount: string;
        type: 'income' | 'expense';
        date: string;
    }>;
    outputView: 'chart' | 'table' | 'pdf' | 'csv';
    emailReport: boolean;
    emailAddress?: string;
}

export default function CashFlowForecast() {
    const [formData, setFormData] = useState<ForecastFormData>({
        forecastHorizon: 'next-month',
        scenario: 'most-likely',
        includePendingInvoices: false,
        includePendingBills: false,
        customEntries: [],
        outputView: 'chart',
        emailReport: false,
        emailAddress: ''
    });

    const [showCustomEntry, setShowCustomEntry] = useState(false);
    const [newCustomEntry, setNewCustomEntry] = useState({
        amount: '',
        type: 'income' as 'income' | 'expense',
        date: ''
    });

    const handleFormChange = (field: keyof ForecastFormData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddCustomEntry = () => {
        if (newCustomEntry.amount && newCustomEntry.date) {
            setFormData(prev => ({
                ...prev,
                customEntries: [...prev.customEntries, newCustomEntry]
            }));
            setNewCustomEntry({
                amount: '',
                type: 'income',
                date: ''
            });
            setShowCustomEntry(false);
        }
    };

    const handleRemoveCustomEntry = (index: number) => {
        setFormData(prev => ({
            ...prev,
            customEntries: prev.customEntries.filter((_, i) => i !== index)
        }));
    };

    const handleGenerateForecast = () => {
        console.log('Generating forecast with data:', formData);
    };

    return (
        <div className="w-full flex flex-col pt-8 pb-40">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cash Flow Forecast</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Generate a detailed cash flow forecast for your business</p>
            </div>

            {/* Forecast Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Forecast Period */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Forecast Period</h4>
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Forecast Horizon</label>
                            <select
                                value={formData.forecastHorizon}
                                onChange={(e) => handleFormChange('forecastHorizon', e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                            >
                                <option value="next-month">Next Month</option>
                                <option value="next-3-months">Next 3 Months</option>
                                <option value="next-quarter">Next Quarter</option>
                                <option value="next-6-months">Next 6 Months</option>
                                <option value="next-year">Next Year</option>
                                <option value="custom">Custom Date Range</option>
                            </select>
                        </div>
                        {formData.forecastHorizon === 'custom' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.customStartDate}
                                        onChange={(e) => handleFormChange('customStartDate', e.target.value)}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.customEndDate}
                                        onChange={(e) => handleFormChange('customEndDate', e.target.value)}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Scenario Analysis */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Scenario Analysis</h4>
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Scenario</label>
                            <select
                                value={formData.scenario}
                                onChange={(e) => handleFormChange('scenario', e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                            >
                                <option value="most-likely">Most Likely</option>
                                <option value="optimistic">Optimistic</option>
                                <option value="pessimistic">Pessimistic</option>
                            </select>
                        </div>
                    </div>

                    {/* Include/Exclude Data */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Include/Exclude Data</h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.includePendingInvoices}
                                    onChange={(e) => handleFormChange('includePendingInvoices', e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Include Pending Invoices</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.includePendingBills}
                                    onChange={(e) => handleFormChange('includePendingBills', e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Include Pending Bills</span>
                            </label>
                        </div>
                        <button
                            onClick={() => setShowCustomEntry(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Custom Entry
                        </button>
                        {showCustomEntry && (
                            <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</label>
                                    <input
                                        type="number"
                                        value={newCustomEntry.amount}
                                        onChange={(e) => setNewCustomEntry(prev => ({ ...prev, amount: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Type</label>
                                    <select
                                        value={newCustomEntry.type}
                                        onChange={(e) => setNewCustomEntry(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    >
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={newCustomEntry.date}
                                        onChange={(e) => setNewCustomEntry(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddCustomEntry}
                                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        Add Entry
                                    </button>
                                    <button
                                        onClick={() => setShowCustomEntry(false)}
                                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        {formData.customEntries.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {formData.customEntries.map((entry, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-sm">
                                            <span className={`font-medium ${entry.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {entry.type === 'income' ? '+' : '-'}${entry.amount}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-2">{entry.date}</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveCustomEntry(index)}
                                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Output Preferences */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Output Preferences</h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={formData.outputView === 'chart'}
                                    onChange={() => handleFormChange('outputView', 'chart')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Visual Chart & Summary</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={formData.outputView === 'table'}
                                    onChange={() => handleFormChange('outputView', 'table')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Table View</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={formData.outputView === 'pdf'}
                                    onChange={() => handleFormChange('outputView', 'pdf')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Download PDF</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={formData.outputView === 'csv'}
                                    onChange={() => handleFormChange('outputView', 'csv')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Download CSV</span>
                            </label>
                        </div>
                    </div>

                    {/* Email Report */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.emailReport}
                                onChange={(e) => handleFormChange('emailReport', e.target.checked)}
                                className="rounded"
                            />
                            <label className="font-medium text-gray-700 dark:text-gray-300">Email Forecast Report</label>
                        </div>
                        {formData.emailReport && (
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Recipient Email Address</label>
                                <input
                                    type="email"
                                    value={formData.emailAddress}
                                    onChange={(e) => handleFormChange('emailAddress', e.target.value)}
                                    placeholder="Enter email address"
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleGenerateForecast}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <BarChart2 className="w-4 h-4" />
                        Generate Cash Flow Forecast
                    </button>
                </div>
            </div>
        </div>
    );
} 