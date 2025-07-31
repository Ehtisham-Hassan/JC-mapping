import React, { useState } from 'react';
import { FileText, Download, Mail, BarChart2, Table } from 'lucide-react';

interface SalesTrendsFormData {
    forecastHorizon: string;
    startDate?: string;
    endDate?: string;
    scenario: string;
    includePendingInvoices: boolean;
    includePendingBills: boolean;
    customEntries: Array<{
        amount: string;
        type: 'Income' | 'Expense';
        date: string;
    }>;
    outputView: string;
    emailReport: boolean;
    recipientEmail?: string;
}

const periodOptions = [
    { value: 'Next Month', label: 'Next Month' },
    { value: 'Next 3 Months', label: 'Next 3 Months' },
    { value: 'Next Quarter', label: 'Next Quarter' },
    { value: 'Next 6 Months', label: 'Next 6 Months' },
    { value: 'Next Year', label: 'Next Year' },
    { value: 'Custom Date Range', label: 'Custom Date Range' }
];

const scenarioOptions = [
    { value: 'Most Likely', label: 'Most Likely' },
    { value: 'Optimistic', label: 'Optimistic' },
    { value: 'Pessimistic', label: 'Pessimistic' }
];

const WeeklySalesTrends: React.FC = () => {
    const [formData, setFormData] = useState<SalesTrendsFormData>({
        forecastHorizon: 'Next Month',
        scenario: 'Most Likely',
        includePendingInvoices: false,
        includePendingBills: false,
        customEntries: [],
        outputView: 'Visual Chart & Summary',
        emailReport: false,
    });

    const [showCustomDateRange, setShowCustomDateRange] = useState(false);
    const [showCustomEntryForm, setShowCustomEntryForm] = useState(false);
    const [newCustomEntry, setNewCustomEntry] = useState({
        amount: '',
        type: 'Income' as 'Income' | 'Expense',
        date: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        if (name === 'forecastHorizon') {
            setShowCustomDateRange(value === 'Custom Date Range');
        }
    };

    const handleCustomEntryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCustomEntry(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const addCustomEntry = () => {
        if (newCustomEntry.amount && newCustomEntry.date) {
            setFormData(prev => ({
                ...prev,
                customEntries: [...prev.customEntries, newCustomEntry],
            }));
            setNewCustomEntry({
                amount: '',
                type: 'Income',
                date: '',
            });
            setShowCustomEntryForm(false);
        }
    };

    const removeCustomEntry = (index: number) => {
        setFormData(prev => ({
            ...prev,
            customEntries: prev.customEntries.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex flex-col w-full mb-20">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Weekly Sales Trends</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Analyze and forecast your sales performance</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Forecast Period */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Forecast Period</label>
                        <select
                            id="forecastHorizon"
                            name="forecastHorizon"
                            value={formData.forecastHorizon}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                        >
                            {periodOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {showCustomDateRange && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Scenario Analysis */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Scenario Analysis</label>
                        <select
                            id="scenario"
                            name="scenario"
                            value={formData.scenario}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                        >
                            {scenarioOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Include/Exclude Data */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Include/Exclude Data</label>
                        <div className="space-y-2">
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="includePendingInvoices"
                                    name="includePendingInvoices"
                                    checked={formData.includePendingInvoices}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Include Pending Invoices</span>
                            </label>
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="includePendingBills"
                                    name="includePendingBills"
                                    checked={formData.includePendingBills}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Include Pending Bills</span>
                            </label>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => setShowCustomEntryForm(true)}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
                            >
                                <FileText className="w-3 h-3" />
                                Add Custom Entry
                            </button>

                            {showCustomEntryForm && (
                                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Amount</label>
                                        <input
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            value={newCustomEntry.amount}
                                            onChange={handleCustomEntryChange}
                                            className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Type</label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={newCustomEntry.type}
                                            onChange={handleCustomEntryChange}
                                            className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                        >
                                            <option value="Income">Income</option>
                                            <option value="Expense">Expense</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={newCustomEntry.date}
                                            onChange={handleCustomEntryChange}
                                            className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowCustomEntryForm(false)}
                                            className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addCustomEntry}
                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Add Entry
                                        </button>
                                    </div>
                                </div>
                            )}

                            {formData.customEntries.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {formData.customEntries.map((entry, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {entry.type}: ${entry.amount} on {entry.date}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeCustomEntry(index)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Output Preferences */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Output Preferences</label>
                        <div className="grid grid-cols-1 gap-2">
                            {['Visual Chart & Summary', 'Table View', 'Download PDF', 'Download CSV'].map((option) => (
                                <label key={option} className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="outputView"
                                        value={option}
                                        checked={formData.outputView === option}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <div className="flex items-center gap-2">
                                        {option.includes('Chart') ? (
                                            <BarChart2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        ) : option.includes('Table') ? (
                                            <Table className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        ) : option.includes('PDF') ? (
                                            <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        ) : null}
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{option}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Email Report */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="emailReport"
                                name="emailReport"
                                checked={formData.emailReport}
                                onChange={handleInputChange}
                                className="rounded"
                            />
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Report</label>
                        </div>
                        {formData.emailReport && (
                            <div>
                                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Recipient Email Address</label>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        id="recipientEmail"
                                        name="recipientEmail"
                                        value={formData.recipientEmail}
                                        onChange={handleInputChange}
                                        placeholder="Enter email address"
                                        className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm">
                                        <Mail className="w-3 h-3" />
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
                    >
                        <BarChart2 className="w-3 h-3" />
                        Generate Sales Trends Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeeklySalesTrends; 