import React, { useState } from 'react';

interface UploadReceiptFormProps {
  onClose?: () => void;
}

export default function UploadReceiptForm({ onClose }: UploadReceiptFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [linkType, setLinkType] = useState<'details' | 'id'>('details');
  const [transactionDate, setTransactionDate] = useState('');
  const [amount, setAmount] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Upload Receipt</h2>
        <form className="space-y-5">
          {/* Receipt File Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Select Receipt File<span className="text-red-500">*</span></label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            {file && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Selected: {file.name}</div>}
          </div>

          {/* Link to Existing (Optional) */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Link to Existing Transaction/Bill <span className="text-xs text-gray-400">(Optional)</span></label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="linkType"
                  value="details"
                  checked={linkType === 'details'}
                  onChange={() => setLinkType('details')}
                  className="accent-blue-500"
                />
                Match by Details
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="linkType"
                  value="id"
                  checked={linkType === 'id'}
                  onChange={() => setLinkType('id')}
                  className="accent-blue-500"
                />
                Enter ID
              </label>
            </div>
            {linkType === 'details' ? (
              <div className="space-y-2">
                <input
                  type="date"
                  value={transactionDate}
                  onChange={e => setTransactionDate(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Transaction Date"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                />
                <input
                  type="text"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Vendor Name"
                />
              </div>
            ) : (
              <input
                type="text"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                placeholder="Transaction/Bill ID"
              />
            )}
          </div>

          {/* Receipt Date (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Date on Receipt <span className="text-xs text-gray-400">(Optional)</span></label>
            <input
              type="date"
              value={receiptDate}
              onChange={e => setReceiptDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Notes <span className="text-xs text-gray-400">(Optional)</span></label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm min-h-[60px]"
              placeholder="Any additional details about the receipt..."
            />
          </div>

          <button
            type="button"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 text-base"
            // No actual upload logic, just a mock
            onClick={onClose}
          >
            Upload Receipt
          </button>
        </form>
      </div>
    </div>
  );
} 