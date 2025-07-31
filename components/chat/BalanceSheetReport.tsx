import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface ReportFormData {
    startDate: string;
    endDate: string;
    reportingBasis: 'accrual' | 'cash';
    includeComparison: boolean;
    comparisonPeriod: string;
    customStartDate?: string;
    customEndDate?: string;
    detailLevel: 'summary' | 'detail';
    outputFormat: 'pdf' | 'csv' | 'excel';
    emailReport: boolean;
    emailAddress?: string;
}

export default function BalanceSheetReport() {
    const [reportForm, setReportForm] = useState<ReportFormData>({
        startDate: '',
        endDate: '',
        reportingBasis: 'accrual',
        includeComparison: false,
        comparisonPeriod: 'previous-month',
        detailLevel: 'summary',
        outputFormat: 'pdf',
        emailReport: false,
        emailAddress: ''
    });

    const handleFormChange = (field: keyof ReportFormData, value: any) => {
        setReportForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleGenerateReport = () => {
        // This would be connected to the backend in a real implementation
        console.log('Generating report with data:', reportForm);
    };

    return (
        <div className="w-full flex flex-col pt-8 pb-40">
            {/* Header */}
        <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Balance Sheet Report</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Generate a detailed balance sheet report for your business</p>
            </div>

            {/* Report Generation Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generate Balance Sheet Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Range */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Date Range</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={reportForm.startDate}
                                    onChange={(e) => handleFormChange('startDate', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={reportForm.endDate}
                                    onChange={(e) => handleFormChange('endDate', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Reporting Basis */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Reporting Basis</h4>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.reportingBasis === 'accrual'}
                                    onChange={() => handleFormChange('reportingBasis', 'accrual')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Accrual</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.reportingBasis === 'cash'}
                                    onChange={() => handleFormChange('reportingBasis', 'cash')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Cash</span>
                            </label>
                    </div>
                    </div>

                    {/* Comparison Period */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={reportForm.includeComparison}
                                onChange={(e) => handleFormChange('includeComparison', e.target.checked)}
                                className="rounded"
                            />
                            <label className="font-medium text-gray-700 dark:text-gray-300">Include Comparison</label>
                        </div>
                        {reportForm.includeComparison && (
                            <div className="space-y-4">
                                <select
                                    value={reportForm.comparisonPeriod}
                                    onChange={(e) => handleFormChange('comparisonPeriod', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                >
                                    <option value="previous-month">Previous Month</option>
                                    <option value="previous-quarter">Previous Quarter</option>
                                    <option value="previous-year">Previous Year</option>
                                    <option value="custom">Custom</option>
                            </select>
                                {reportForm.comparisonPeriod === 'custom' && (
                                    <div className="grid grid-cols-2 gap-4">
                        <div>
                                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Custom Start Date</label>
                                            <input
                                                type="date"
                                                value={reportForm.customStartDate}
                                                onChange={(e) => handleFormChange('customStartDate', e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                            />
                        </div>
                        <div>
                                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Custom End Date</label>
                                            <input
                                                type="date"
                                                value={reportForm.customEndDate}
                                                onChange={(e) => handleFormChange('customEndDate', e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                            />
                    </div>
                </div>
            )}
                    </div>
                        )}
                    </div>

                    {/* Detail Level */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Detail Level</h4>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.detailLevel === 'summary'}
                                    onChange={() => handleFormChange('detailLevel', 'summary')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Summary</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.detailLevel === 'detail'}
                                    onChange={() => handleFormChange('detailLevel', 'detail')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Detail</span>
                            </label>
                </div>
                    </div>

                    {/* Output Format */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Output Format</h4>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.outputFormat === 'pdf'}
                                    onChange={() => handleFormChange('outputFormat', 'pdf')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">PDF</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.outputFormat === 'csv'}
                                    onChange={() => handleFormChange('outputFormat', 'csv')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">CSV</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={reportForm.outputFormat === 'excel'}
                                    onChange={() => handleFormChange('outputFormat', 'excel')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Excel</span>
                            </label>
                        </div>
                    </div>

                    {/* Email Recipient */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={reportForm.emailReport}
                                onChange={(e) => handleFormChange('emailReport', e.target.checked)}
                                className="rounded"
                            />
                            <label className="font-medium text-gray-700 dark:text-gray-300">Email Report</label>
                </div>
                        {reportForm.emailReport && (
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={reportForm.emailAddress}
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
                        onClick={handleGenerateReport}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
} 