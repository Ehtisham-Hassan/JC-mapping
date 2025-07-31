import React, { useState } from 'react';

const METRICS = [
  'Sales Revenue',
  'Cash Flow',
  'Lead Conversion Rate',
  'Number of Deals Closed',
  'Gross Profit',
  'Customer Engagement',
  'Expenses',
];

const HORIZONS = [
  'Next Month',
  'Next 3 Months',
  'Next Quarter',
  'Next 6 Months',
  'Next Year',
  'Custom Date Range',
];

const SEGMENTS = [
  'None',
  'Product/Service',
  'Customer Segment',
  'Sales Region',
  'Sales Agent/Team',
];

const SCENARIOS = [
  'Most Likely',
  'Optimistic',
  'Pessimistic',
];

export default function PredictTrendsForm() {
  const [metric, setMetric] = useState('Sales Revenue');
  const [horizon, setHorizon] = useState('Next Month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [segment, setSegment] = useState('None');
  const [scenario, setScenario] = useState('Most Likely');
  const [output, setOutput] = useState<'chart' | 'text' | 'table'>('chart');
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
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Predict Financial Trends</h2>
        <form className="space-y-5" onSubmit={handleGenerate}>
          {/* Trend Metric Selection */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Select Metric to Predict</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={metric}
              onChange={e => setMetric(e.target.value)}
            >
              {METRICS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Forecast Horizon */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Forecast For</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={horizon}
              onChange={e => setHorizon(e.target.value)}
            >
              {HORIZONS.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            {horizon === 'Custom Date Range' && (
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Forecast Start Date</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={e => setCustomStart(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Forecast End Date</label>
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

          {/* Segmentation (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Segment Trends By (Optional)</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={segment}
              onChange={e => setSegment(e.target.value)}
            >
              {SEGMENTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Scenario (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Forecast Scenario (Optional)</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={scenario}
              onChange={e => setScenario(e.target.value)}
            >
              {SCENARIOS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Output Preferences */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Display Output As:</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="chart"
                  checked={output === 'chart'}
                  onChange={() => setOutput('chart')}
                  className="accent-blue-500"
                />
                Visual Chart
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="text"
                  checked={output === 'text'}
                  onChange={() => setOutput('text')}
                  className="accent-blue-500"
                />
                Summary Text
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="output"
                  value="table"
                  checked={output === 'table'}
                  onChange={() => setOutput('table')}
                  className="accent-blue-500"
                />
                Table Data
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
              <label htmlFor="email-report-checkbox" className="text-sm text-gray-700 dark:text-gray-300">Email Trend Report</label>
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
            Generate Trend Prediction
          </button>
        </form>

        {/* Output Area */}
        {showResult && (
          <div className="mt-8">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Trend Prediction Output</label>
            <div className="min-h-[180px] max-h-80 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center">
              {output === 'chart' && (
                <img src="https://placehold.co/500x200?text=Trend+Line+Chart" alt="Trend Chart" className="rounded mb-2" />
              )}
              {output === 'text' && (
                <div className="text-gray-800 dark:text-gray-100 text-base text-center">This is a simulated summary of the predicted trend for <b>{metric}</b> over <b>{horizon}</b> ({scenario} scenario).</div>
              )}
              {output === 'table' && (
                <table className="min-w-full text-sm border mt-2">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Date</th>
                      <th className="border px-2 py-1">Predicted Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">2024-07-01</td><td className="border px-2 py-1">$10,000</td></tr>
                    <tr><td className="border px-2 py-1">2024-08-01</td><td className="border px-2 py-1">$11,200</td></tr>
                    <tr><td className="border px-2 py-1">2024-09-01</td><td className="border px-2 py-1">$12,000</td></tr>
                  </tbody>
                </table>
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