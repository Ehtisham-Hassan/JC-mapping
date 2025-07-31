import React, { useRef, useState } from 'react';

const DOCUMENT_TYPES = [
  'Receipt',
  'Invoice',
  'Contract',
  'Bank Statement',
  'General Document',
  'Bill',
  'Purchase Order',
];

const LINK_OPTIONS = [
  { value: 'expense', label: 'Existing Expense/Transaction' },
  { value: 'bill', label: 'Existing Bill' },
  { value: 'customer', label: 'Customer' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'project', label: 'Project' },
  { value: 'none', label: 'No Specific Link' },
];

export default function ManageDocumentForm() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [docType, setDocType] = useState('');
  const [docDate, setDocDate] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkTo, setLinkTo] = useState('expense');
  const [expenseId, setExpenseId] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseVendor, setExpenseVendor] = useState('');
  const [billId, setBillId] = useState('');
  const [billVendor, setBillVendor] = useState('');
  const [billDueDate, setBillDueDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [vendor, setVendor] = useState('');
  const [project, setProject] = useState('');
  const [noLink, setNoLink] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex justify-center items-start py-8 pb-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Manage Document</h2>
        <form className="space-y-6">
          {/* Document Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Upload Document<span className="text-red-500">*</span></label>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {file ? (
                <div className="text-sm text-gray-700 dark:text-gray-200">{file.name}</div>
              ) : (
                <>
                  <div className="text-gray-400 dark:text-gray-500 text-3xl mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200 font-medium">Drag & drop or click to upload</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, JPG, PNG, DOCX supported</div>
                </>
              )}
            </div>
          </div>

          {/* Document Details */}
          <div className="space-y-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Document Type</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                value={docType}
                onChange={e => setDocType(e.target.value)}
              >
                <option value="" disabled>Select type...</option>
                {DOCUMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Document Date <span className="text-xs text-gray-400">(Optional)</span></label>
              <input
                type="date"
                value={docDate}
                onChange={e => setDocDate(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Document Title / Name <span className="text-xs text-gray-400">(Optional)</span></label>
              <input
                type="text"
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                placeholder="Document title or name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Description / Notes <span className="text-xs text-gray-400">(Optional)</span></label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm min-h-[60px]"
                placeholder="Description or notes about the document..."
              />
            </div>
          </div>

          {/* Link to Entity */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-3">
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">Link Document To:</label>
            <div className="flex flex-col gap-2">
              {LINK_OPTIONS.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="linkTo"
                    value={opt.value}
                    checked={linkTo === opt.value}
                    onChange={() => { setLinkTo(opt.value); setNoLink(opt.value === 'none'); }}
                    className="accent-blue-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {/* Conditional fields for linking */}
            {linkTo === 'expense' && !noLink && (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={expenseId}
                  onChange={e => setExpenseId(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Expense/Transaction ID (or)"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={expenseDate}
                    onChange={e => setExpenseDate(e.target.value)}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="Date"
                  />
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                  />
                  <input
                    type="text"
                    value={expenseVendor}
                    onChange={e => setExpenseVendor(e.target.value)}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="Vendor"
                  />
                </div>
              </div>
            )}
            {linkTo === 'bill' && !noLink && (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={billId}
                  onChange={e => setBillId(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                  placeholder="Bill ID (or)"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={billVendor}
                    onChange={e => setBillVendor(e.target.value)}
                    className="w-1/2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="Vendor Name"
                  />
                  <input
                    type="date"
                    value={billDueDate}
                    onChange={e => setBillDueDate(e.target.value)}
                    className="w-1/2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm"
                    placeholder="Due Date"
                  />
                </div>
              </div>
            )}
            {linkTo === 'customer' && !noLink && (
              <input
                type="text"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm mt-2"
                placeholder="Customer Name / ID"
              />
            )}
            {linkTo === 'vendor' && !noLink && (
              <input
                type="text"
                value={vendor}
                onChange={e => setVendor(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm mt-2"
                placeholder="Vendor Name / ID"
              />
            )}
            {linkTo === 'project' && !noLink && (
              <input
                type="text"
                value={project}
                onChange={e => setProject(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm mt-2"
                placeholder="Project Name / ID"
              />
            )}
            {linkTo === 'none' && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={noLink}
                  onChange={e => setNoLink(e.target.checked)}
                  className="accent-blue-500"
                  id="no-link-checkbox"
                />
                <label htmlFor="no-link-checkbox" className="text-sm text-gray-700 dark:text-gray-300">This document is standalone</label>
              </div>
            )}
          </div>

          <button
            type="button"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 text-base"
            // No actual upload logic, just a mock
          >
            Upload Document
          </button>
        </form>
      </div>
    </div>
  );
} 