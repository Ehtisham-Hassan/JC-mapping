import React, { useState } from 'react';

const AREAS = [
  'Overall Financial Health',
  'Accounts Receivable (Overdue Invoices)',
  'Cash Flow Stability',
  'Sales Pipeline Health (Stalled Deals)',
  'Expense Management',
  'Project Performance',
];

const PERIODS = [
  'Current Status',
  'Last Month',
  'This Quarter',
  'Last Quarter',
  'Last Year',
  'Custom Date Range',
];

export default function RiskAnalysisForm() {
  const [area, setArea] = useState('Overall Financial Health');
  const [period, setPeriod] = useState('Current Status');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [output, setOutput] = useState<'list' | 'summary' | 'dashboard'>('list');
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [emailReport, setEmailReport] = useState(false);
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Risk Analysis</h2>
        <form className="space-y-5" onSubmit={handleAnalyze}>
          {/* Area of Risk Analysis */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Analyze Risks In:</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={area}
              onChange={e => setArea(e.target.value)}
            >
              {AREAS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Analysis Period */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Analyze Data From:</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              {PERIODS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {period === 'Custom Date Range' && (
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={e => setCustomStart(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={e => setCustomEnd(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Output Display */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Display Results As:</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="list"
                  checked={output === 'list'}
                  onChange={() => setOutput('list')}
                  className="accent-red-500"
                />
                List of Identified Risks
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="summary"
                  checked={output === 'summary'}
                  onChange={() => setOutput('summary')}
                  className="accent-blue-500"
                />
                Summary Report (Plain English)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="dashboard"
                  checked={output === 'dashboard'}
                  onChange={() => setOutput('dashboard')}
                  className="accent-purple-500"
                />
                Visual Dashboard (Charts & Red Flags)
              </label>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={downloadPDF}
                  onChange={e => setDownloadPDF(e.target.checked)}
                  className="accent-blue-500"
                />
                Download as PDF
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={downloadCSV}
                  onChange={e => setDownloadCSV(e.target.checked)}
                  className="accent-blue-500"
                />
                Download as CSV
              </label>
            </div>
          </div>

          {/* Email Report (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Email Report (Optional)</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailReport}
                onChange={e => setEmailReport(e.target.checked)}
                className="accent-blue-500"
                id="email-report-checkbox"
              />
              <label htmlFor="email-report-checkbox" className="text-sm text-gray-700 dark:text-gray-300">Email Risk Analysis Report</label>
              {emailReport && (
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="ml-2 flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Recipient Email Address"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400 text-base"
          >
            Perform Risk Analysis
          </button>
        </form>

        {/* Output Area */}
        {showResult && (
          <div className="mt-8">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Risk Analysis Results</label>
            <div className="min-h-[180px] max-h-80 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              {output === 'list' && (
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-red-600 dark:text-red-400 font-semibold">Overdue invoices exceed 30% of total receivables <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">High Risk</span></li>
                  <li className="text-yellow-600 dark:text-yellow-400 font-semibold">Cash flow is projected to be negative next month <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">Medium Risk</span></li>
                  <li className="text-orange-600 dark:text-orange-400 font-semibold">Expense growth rate is above target <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">Warning</span></li>
                </ul>
              )}
              {output === 'summary' && (
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">This is a simulated summary of the identified risks for <b>{area}</b> during <b>{period}</b>.</div>
              )}
              {output === 'dashboard' && (
                <div className="flex flex-col items-center justify-center">
                  <img src="https://placehold.co/500x200?text=Risk+Dashboard" alt="Risk Dashboard" className="rounded mb-2" />
                  <div className="text-xs text-red-500">(Visual dashboard with red flags is simulated for this mock UI.)</div>
                </div>
              )}
              {(downloadPDF || downloadCSV) && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">Download options are simulated for this mock UI.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 