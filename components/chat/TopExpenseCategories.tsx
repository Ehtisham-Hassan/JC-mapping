import React, { useState } from 'react';
import { FileText, Download, Mail, BarChart2, Table } from 'lucide-react';

interface ExpenseCategoriesFormData {
    analysisPeriod: string;
    startDate?: string;
    endDate?: string;
    basis: string;
    displayAsChart: boolean;
    downloadAs: string;
    emailReport: boolean;
    recipientEmail?: string;
}

const periodOptions = [
    { value: 'Last Month', label: 'Last Month' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Quarter', label: 'Last Quarter' },
    { value: 'This Quarter', label: 'This Quarter' },
    { value: 'Last Year', label: 'Last Year' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Custom Date Range', label: 'Custom Date Range' }
];

const TopExpenseCategories: React.FC = () => {
    const [formData, setFormData] = useState<ExpenseCategoriesFormData>({
        analysisPeriod: 'Last Month',
        basis: 'Accrual',
        displayAsChart: true,
        downloadAs: 'None',
        emailReport: false,
    });

    const [showCustomDateRange, setShowCustomDateRange] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        if (name === 'analysisPeriod') {
            setShowCustomDateRange(value === 'Custom Date Range');
        }
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
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Top 5 Expense Categories</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Analyze your largest expense categories</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Analysis Period */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Analysis Period</label>
                        <select
                            id="analysisPeriod"
                            name="analysisPeriod"
                            value={formData.analysisPeriod}
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

                    {/* Reporting Basis */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reporting Basis</label>
                        <div className="flex gap-4">
                            {['Accrual', 'Cash'].map((basis) => (
                                <label key={basis} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="basis"
                                        value={basis}
                                        checked={formData.basis === basis}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{basis}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Output Preferences */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Output Preferences</label>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="displayAsChart"
                                    name="displayAsChart"
                                    checked={formData.displayAsChart}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Display as Chart</span>
                                </div>
                            </label>
                            <div className="space-y-2">
                                <label className="block text-xs text-gray-600 dark:text-gray-400">Download As</label>
                                {['None', 'PDF', 'CSV'].map((format) => (
                                    <label key={format} className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="downloadAs"
                                            value={format}
                                            checked={formData.downloadAs === format}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <div className="flex items-center gap-2">
                                            {format === 'PDF' ? (
                                                <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            ) : format === 'CSV' ? (
                                                <Table className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            ) : null}
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{format}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
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
                        <FileText className="w-3 h-3" />
                        Find Top 5 Categories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopExpenseCategories; 