import React, { useState } from 'react';

const FREQUENCIES = ['Disabled', 'Daily', 'Weekly', 'Monthly'];
const DESTINATIONS = [
  { value: 'download', label: 'Download to My Device (as a ZIP file)' },
  { value: 'cloud', label: '2themoon.ai Cloud Storage (for future restore)' },
  { value: 'drive', label: 'Link to Google Drive / Dropbox' },
];

export default function BackupFilesForm() {
  const [includeFinancial, setIncludeFinancial] = useState(true);
  const [includeDocuments, setIncludeDocuments] = useState(false);
  const [frequency, setFrequency] = useState('Disabled');
  const [destination, setDestination] = useState('download');
  const [notify, setNotify] = useState(false);
  const [email, setEmail] = useState('user@email.com');
  const [connectingDrive, setConnectingDrive] = useState(false);

  let actionLabel = 'Initiate Download';
  if (frequency !== 'Disabled') {
    actionLabel = 'Save Backup Settings';
  } else if (destination === 'cloud') {
    actionLabel = 'Save Backup to Cloud';
  } else if (destination === 'drive') {
    actionLabel = connectingDrive ? 'Connecting...' : 'Connect & Save to Drive';
  }

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Backup Files</h2>
        <form className="space-y-6">
          {/* Select Data for Backup */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Select Data for Backup</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeFinancial}
                  onChange={e => setIncludeFinancial(e.target.checked)}
                  className="accent-blue-500"
                />
                Include All Financial Data (Transactions, Reports, Invoices)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeDocuments}
                  onChange={e => setIncludeDocuments(e.target.checked)}
                  className="accent-blue-500"
                />
                Include All Uploaded Documents (Receipts, Contracts, etc.)
              </label>
            </div>
          </div>

          {/* Backup Method/Frequency */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Method / Frequency</label>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base mb-2"
            >
              Perform Backup Now
            </button>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Automated Backup Schedule (Optional)</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              >
                {FREQUENCIES.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Backup Destination */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Destination</label>
            <div className="flex flex-col gap-2">
              {DESTINATIONS.map(dest => (
                <label key={dest.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="destination"
                    value={dest.value}
                    checked={destination === dest.value}
                    onChange={() => setDestination(dest.value)}
                    className="accent-blue-500"
                  />
                  {dest.label}
                  {dest.value === 'drive' && destination === 'drive' && (
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded shadow text-xs font-medium"
                      onClick={() => setConnectingDrive(true)}
                      disabled={connectingDrive}
                    >
                      {connectingDrive ? 'Connecting...' : 'Connect Account'}
                    </button>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Backup Notifications */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Notifications <span className="text-xs text-gray-400">(Optional)</span></label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={e => setNotify(e.target.checked)}
                  className="accent-blue-500"
                />
                Email me on backup completion/failure
              </label>
              {notify && (
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Notification Email Address"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 text-base"
          >
            {actionLabel}
          </button>
        </form>
      </div>
    </div>
  );
} 