import React, { useRef, useState } from 'react';

const DOC_TYPES = ['Receipt', 'Invoice', 'Bill', 'Contract', 'Other'];
const CATEGORIES = ['Office Supplies', 'Travel', 'Utilities', 'Meals', 'Other'];
const LINK_OPTIONS = [
  { value: 'new_expense', label: 'Create New Expense Entry (from extracted details)' },
  { value: 'existing_bill', label: 'Attach to Existing Bill' },
  { value: 'existing_transaction', label: 'Attach to Existing Transaction' },
  { value: 'general', label: 'General Document (No Specific Link)' },
];

export default function DocumentScannerForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [docType, setDocType] = useState('Receipt');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('');
  const [linkTo, setLinkTo] = useState('new_expense');
  const [billId, setBillId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [generalDoc, setGeneralDoc] = useState(false);
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate camera scan by using a placeholder image
  const handleCameraScan = () => {
    setPreview('https://placehold.co/400x250?text=Scanned+Document');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Document Scanner</h2>
        <form className="space-y-6">
          {/* Scanning/Upload Input Area */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Scan or Upload Document</label>
            <div className="flex gap-3 mb-2">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                onClick={handleCameraScan}
              >
                Use Camera to Scan
              </button>
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg shadow text-base"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Document File
              </button>
            </div>
            <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[120px]">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-40 max-w-full object-contain" />
              ) : (
                <span className="text-gray-400 dark:text-gray-500">Preview of Scanned/Uploaded Document</span>
              )}
            </div>
          </div>

          {/* Document Type Selection */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Document Type</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={docType}
              onChange={e => setDocType(e.target.value)}
            >
              {DOC_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Extracted Information (Simulated OCR) */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Extracted Details (Review & Edit)</label>
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mb-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              placeholder="Amount"
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mb-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              placeholder="Date"
            />
            <input
              type="text"
              value={vendor}
              onChange={e => setVendor(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mb-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              placeholder="Vendor/Payee"
            />
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Linkage Options */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Link Document To:</label>
            <div className="flex flex-col gap-2">
              {LINK_OPTIONS.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="linkTo"
                    value={opt.value}
                    checked={linkTo === opt.value}
                    onChange={() => setLinkTo(opt.value)}
                    className="accent-blue-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {linkTo === 'existing_bill' && (
              <input
                type="text"
                value={billId}
                onChange={e => setBillId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mt-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                placeholder="Select or enter Bill ID/Name"
              />
            )}
            {linkTo === 'existing_transaction' && (
              <input
                type="text"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mt-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                placeholder="Select or enter Transaction ID/Name"
              />
            )}
            {linkTo === 'general' && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={generalDoc}
                  onChange={e => setGeneralDoc(e.target.checked)}
                  className="accent-blue-500"
                  id="general-doc-checkbox"
                />
                <label htmlFor="general-doc-checkbox" className="text-sm text-gray-700 dark:text-gray-300">This document is standalone</label>
              </div>
            )}
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Notes <span className="text-xs text-gray-400">(Optional)</span></label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm min-h-[60px]"
              placeholder="Any additional comments..."
            />
          </div>

          <button
            type="button"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 text-base"
          >
            Save Document
          </button>
        </form>
      </div>
    </div>
  );
} 