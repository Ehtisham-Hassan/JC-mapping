import React, { useState } from 'react';
import { FileText, Download, Mail, BarChart2, Table } from 'lucide-react';

interface ProfitLossFormData {
    period: string;
    startDate?: string;
    endDate?: string;
    reportingBasis: 'accrual' | 'cash';
    detailLevel: 'summary' | 'detail';
    outputFormat: 'plain' | 'chart' | 'table' | 'pdf' | 'csv';
    emailReport: boolean;
    emailAddress?: string;
}

const periodOptions = [
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Date Range' }
];

const inputClass = 'w-full bg-[#f8fafc] dark:bg-[#232b3b] rounded-md py-2 px-3 text-sm text-[#222] dark:text-[#bfc9da] placeholder-gray-400 dark:placeholder-[#bfc9da] focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition border-0 shadow-none';
const selectClass = 'w-full bg-[#f8fafc] dark:bg-[#232b3b] rounded-md py-2 px-3 text-sm text-[#222] dark:text-[#bfc9da] focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition border-0 shadow-none';

export default function ProfitLossSummary() {
    const [formData, setFormData] = useState<ProfitLossFormData>({
        period: 'last-month',
        reportingBasis: 'accrual',
        detailLevel: 'summary',
        outputFormat: 'plain',
        emailReport: false
    });

    const handleFormChange = (field: keyof ProfitLossFormData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleGenerateReport = () => {
        // This would be connected to the backend in a real implementation
        console.log('Generating P&L report with data:', formData);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Profit & Loss Summary</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Generate a comprehensive profit and loss report</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Report Period */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Report Period</label>
                        <select
                            value={formData.period}
                            onChange={(e) => handleFormChange('period', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                        >
                            {periodOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formData.period === 'custom' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleFormChange('startDate', e.target.value)}
                                        className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleFormChange('endDate', e.target.value)}
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
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.reportingBasis === 'accrual'}
                                    onChange={() => handleFormChange('reportingBasis', 'accrual')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Accrual</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.reportingBasis === 'cash'}
                                    onChange={() => handleFormChange('reportingBasis', 'cash')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Cash</span>
                            </label>
                        </div>
                    </div>

                    {/* Detail Level */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Report Detail</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.detailLevel === 'summary'}
                                    onChange={() => handleFormChange('detailLevel', 'summary')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Summary</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.detailLevel === 'detail'}
                                    onChange={() => handleFormChange('detailLevel', 'detail')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Detail</span>
                            </label>
                        </div>
                    </div>

                    {/* Output Format */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Output Format</label>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={formData.outputFormat === 'plain'}
                                    onChange={() => handleFormChange('outputFormat', 'plain')}
                                    className="mr-2"
                                />
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Plain English Summary</span>
                                </div>
                            </label>
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={formData.outputFormat === 'chart'}
                                    onChange={() => handleFormChange('outputFormat', 'chart')}
                                    className="mr-2"
                                />
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Chart View</span>
                                </div>
                            </label>
                            <label className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={formData.outputFormat === 'table'}
                                    onChange={() => handleFormChange('outputFormat', 'table')}
                                    className="mr-2"
                                />
                                <div className="flex items-center gap-2">
                                    <Table className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Table View</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Email Report */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.emailReport}
                                onChange={(e) => handleFormChange('emailReport', e.target.checked)}
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
                                        value={formData.emailAddress}
                                        onChange={(e) => handleFormChange('emailAddress', e.target.value)}
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
                        onClick={handleGenerateReport}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
                    >
                        <FileText className="w-3 h-3" />
                        Generate P&L Summary
                    </button>
                </div>
            </div>
        </div>
    );
} 