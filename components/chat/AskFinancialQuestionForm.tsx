import React, { useState } from 'react';

const TIMEFRAMES = [
  'Last Month',
  'This Month',
  'Last Quarter',
  'This Quarter',
  'Last Year',
  'Custom Date Range',
];

const SUGGESTIONS = [
  'Show me my current cash balance.',
  'What were my top expenses last quarter?',
  'Generate a balance sheet for last year.',
  'How profitable was Project Orion?',
];

export default function AskFinancialQuestionForm() {
  const [question, setQuestion] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [timeframe, setTimeframe] = useState('');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerType, setAnswerType] = useState<'text' | 'chart' | 'table'>('text');

  // Simulate answer for mock
  const handleAsk = () => {
    if (!question.trim()) return;
    // Simulate different answer types
    if (question.toLowerCase().includes('chart')) {
      setAnswerType('chart');
      setAnswer('');
    } else if (question.toLowerCase().includes('table') || question.toLowerCase().includes('balance sheet')) {
      setAnswerType('table');
      setAnswer('<table class="min-w-full text-sm"><thead><tr><th class="border px-2 py-1">Account</th><th class="border px-2 py-1">Amount</th></tr></thead><tbody><tr><td class="border px-2 py-1">Assets</td><td class="border px-2 py-1">$50,000</td></tr><tr><td class="border px-2 py-1">Liabilities</td><td class="border px-2 py-1">$20,000</td></tr><tr><td class="border px-2 py-1">Equity</td><td class="border px-2 py-1">$30,000</td></tr></tbody></table>');
    } else {
      setAnswerType('text');
      setAnswer('This is a simulated answer to your financial question.');
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setQuestion(suggestion);
    setTimeout(() => handleAsk(), 200);
  };

  return (
    <div className="w-full flex justify-center items-start pt-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ask Chat a Financial Question</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleAsk(); }}>
          {/* Question Input Area */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">What would you like to know about your finances?</label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-base min-h-[80px] max-h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Summarize this month's profit & loss in plain English."
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>

          {/* Optional Context/Filters */}
          <div>
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2 focus:outline-none"
              onClick={() => setShowFilters(f => !f)}
            >
              {showFilters ? 'Hide' : 'Refine your query (Optional)'}
            </button>
            {showFilters && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 space-y-3">
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Select Timeframe</label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    value={timeframe}
                    onChange={e => setTimeframe(e.target.value)}
                  >
                    <option value="">Select timeframe...</option>
                    {TIMEFRAMES.map(tf => (
                      <option key={tf} value={tf}>{tf}</option>
                    ))}
                  </select>
                </div>
                {timeframe === 'Custom Date Range' && (
                  <div className="flex gap-2">
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
                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Specific Project/Customer/Vendor (Optional)</label>
                  <input
                    type="text"
                    value={context}
                    onChange={e => setContext(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="e.g. Project Orion, Acme Corp, etc."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          >
            Ask Chat
          </button>
        </form>

        {/* Quick Question Suggestions */}
        <div className="mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Quick Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                type="button"
                className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                onClick={() => handleSuggestion(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Answer Display Area */}
        <div className="mt-8">
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Chat's Answer</label>
          <div className="min-h-[120px] max-h-64 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            {answerType === 'text' && (
              <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{answer}</div>
            )}
            {answerType === 'chart' && (
              <div className="flex flex-col items-center justify-center">
                <img src="https://placehold.co/400x180?text=Financial+Chart" alt="Chart Placeholder" className="mb-2 rounded" />
                <div className="text-xs text-gray-500 dark:text-gray-400">(Chart preview placeholder)</div>
              </div>
            )}
            {answerType === 'table' && (
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: answer }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 