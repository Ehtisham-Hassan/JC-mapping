import React, { useState } from 'react';

const AREAS = [
  'Sales & Opportunities (Upsell/Cross-sell)',
  'Lead Management & Conversion',
  'Customer Engagement',
  'Expense Optimization',
  'Profitability Improvement',
  'Operational Efficiency',
];

const DATA_PERIODS = [
  'Last Month',
  'This Quarter',
  'Last Quarter',
  'Last Year',
  'All Available Data',
];

const TYPES = [
  'Growth Strategies',
  'Efficiency Improvements',
  'Risk Mitigation',
  'Problem Solving',
];

const DETAIL_LEVELS = [
  'Summary',
  'Actionable Steps',
  'Detailed Plan',
];

export default function SmartRecommendationsForm() {
  const [area, setArea] = useState('Sales & Opportunities (Upsell/Cross-sell)');
  const [context, setContext] = useState('');
  const [industry, setIndustry] = useState('');
  const [dataPeriod, setDataPeriod] = useState('');
  const [recType, setRecType] = useState('Growth Strategies');
  const [detailLevel, setDetailLevel] = useState('Summary');
  const [output, setOutput] = useState<'list' | 'summary'>('list');
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [emailReport, setEmailReport] = useState(false);
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Smart Recommendations</h2>
        <form className="space-y-5" onSubmit={handleGenerate}>
          {/* Area for Recommendations */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Get Recommendations For:</label>
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

          {/* Context/Filter (Optional) */}
          <div className="space-y-2">
            <input
              type="text"
              value={context}
              onChange={e => setContext(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              placeholder="Specific Customer, Lead, or Project (Optional)"
            />
            <input
              type="text"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              placeholder="Industry Focus (e.g., SaaS) (Optional)"
            />
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={dataPeriod}
              onChange={e => setDataPeriod(e.target.value)}
            >
              <option value="">Analyze Data From (Optional)</option>
              {DATA_PERIODS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Recommendation Type (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Focus On:</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={recType}
              onChange={e => setRecType(e.target.value)}
            >
              {TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Detail Level of Recommendations (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Detail Level:</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={detailLevel}
              onChange={e => setDetailLevel(e.target.value)}
            >
              {DETAIL_LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Output Display */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Display Recommendations As:</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="list"
                  checked={output === 'list'}
                  onChange={() => setOutput('list')}
                  className="accent-blue-500"
                />
                Actionable List (Plain English)
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
                Summary Text
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
              <label htmlFor="email-report-checkbox" className="text-sm text-gray-700 dark:text-gray-300">Email Recommendations Report</label>
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
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          >
            Generate Recommendations
          </button>
        </form>

        {/* Output Area */}
        {showResult && (
          <div className="mt-8">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Recommendations</label>
            <div className="min-h-[180px] max-h-80 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              {output === 'list' && (
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-blue-700 dark:text-blue-300 font-semibold">Focus on upselling to existing customers with new product bundles.</li>
                  <li className="text-blue-700 dark:text-blue-300 font-semibold">Automate follow-ups for leads that have not responded in 7 days.</li>
                  <li className="text-blue-700 dark:text-blue-300 font-semibold">Review expense categories for potential cost savings.</li>
                </ul>
              )}
              {output === 'summary' && (
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">This is a simulated summary of smart recommendations for <b>{area}</b>.</div>
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