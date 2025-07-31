import React from 'react';

const inputClass =
  'w-full bg-[#f8fafc] dark:bg-[#232b3b] rounded-md py-2 px-3 text-sm text-[#222] dark:text-[#bfc9da] placeholder-gray-400 dark:placeholder-[#bfc9da] focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition border-0 shadow-none';
const selectClass =
  'w-full bg-[#f8fafc] dark:bg-[#232b3b] rounded-md py-2 px-3 text-sm text-[#222] dark:text-[#bfc9da] focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition border-0 shadow-none';
const textareaClass =
  'w-full bg-[#f8fafc] dark:bg-[#232b3b] rounded-md py-2 px-3 text-sm text-[#222] dark:text-[#bfc9da] placeholder-gray-400 dark:placeholder-[#bfc9da] focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition border-0 shadow-none min-h-[80px]';

export default function InvoiceCreateForm() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 pb-40 pt-6 font-sans">
      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-[#181f2c] border border-[#e5e7eb] dark:border-[#232b3b] p-6 rounded-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
          {/* Company Info */}
          <div className="flex items-start gap-4 pt-8">
            <img src="\assets\mainLogo\icon.svg" alt="Logo" className="w-16 h-16 object-contain" />
            <div className="text-sm text-[#222] dark:text-[#bfc9da] leading-relaxed">
              <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
              <div>2themoon@gmail.com</div>
              <div>+1 (070) 123-4567</div>
            </div>
          </div>
          {/* Invoice Info */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#222] dark:text-[#bfc9da] pt-8">
            <label className="self-center">Invoice Number</label>
            <div><input className={inputClass} value="#8801" readOnly /></div>
            <label className="self-center">Invoice Label</label>
            <div><input className={inputClass} placeholder="Enter Invoice Label" /></div>
            <label className="self-center">Invoice Date</label>
            <div><input className={inputClass} placeholder="mm/dd/yyyy" /></div>
            <label className="self-center">Due Date</label>
            <div><input className={inputClass} placeholder="mm/dd/yyyy" /></div>
          </div>
        </div>
        {/* Bill To & Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 pt-4">
          {/* Bill To */}
          <div>
            <div className="mb-2 text-[#222] dark:text-[#bfc9da]">Bill To :-</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Name</label>
                <input className={inputClass} placeholder="Enter Name" />
              </div>
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Email</label>
                <input className={inputClass} placeholder="Enter Email" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Address</label>
                <input className={inputClass} placeholder="Enter Address" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Phone Number</label>
                <input className={inputClass} placeholder="Enter Phone number" />
              </div>
            </div>
          </div>
          {/* Payment Details */}
          <div>
            <div className="mb-2 text-[#222] dark:text-[#bfc9da]">Payment Details:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Account Number</label>
                <input className={inputClass} placeholder="Enter Account Number" />
              </div>
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Bank Name</label>
                <input className={inputClass} placeholder="Enter Bank Name" />
              </div>
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">SWIFT Number</label>
                <input className={inputClass} placeholder="Enter SWIFT Number" />
              </div>
              <div className="col-span-1">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">IBAN Number</label>
                <input className={inputClass} placeholder="Enter IBAN Number" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#222] dark:text-[#bfc9da]">Country</label>
                <select className={selectClass}><option>Choose Country</option></select>
              </div>
            </div>
          </div>
        </div>
        {/* Item Entry */}
        <div className="mt-6">
          <div className="bg-[#f8fafc] dark:bg-[#232b3b] px-4 py-2 text-[#222] dark:text-[#bfc9da] border-b border-[#e5e7eb] dark:border-[#232b3b]">Item</div>
          <div className="grid grid-cols-12 gap-3 p-4">
            <div className="col-span-12 md:col-span-5">
              <input className={inputClass} placeholder="Enter Item Name" />
            </div>
            <div className="col-span-12 md:col-span-7">
              <input className={inputClass} placeholder="Enter Description" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 px-4 pb-2">
            <div className="col-span-4 md:col-span-2">
              <input className={inputClass} placeholder="0" />
            </div>
            <div className="col-span-4 md:col-span-2">
              <input className={inputClass} placeholder="0" />
            </div>
            <div className="col-span-4 md:col-span-2 flex items-center font-semibold text-[#222] dark:text-[#bfc9da]">$0</div>
            <div className="col-span-12 md:col-span-6 flex items-center justify-end">
              <button className="bg-[#2563eb] text-white rounded-md px-5 py-2 text-sm font-medium shadow-md hover:bg-[#1d4ed8] transition">✕</button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button className="bg-[#2563eb] mt-4 text-white rounded-md px-5 py-2 text-sm font-medium shadow-md hover:bg-[#1d4ed8] transition">Add Item</button>
          </div>
        </div>
        {/* Summary and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <div>
            <div className="mb-2 text-[#222] dark:text-[#bfc9da]">Notes</div>
            <textarea className={textareaClass} placeholder="Notes...." />
          </div>
          <div className="flex flex-col items-end justify-end">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-1 text-[#222] dark:text-[#bfc9da]"><span>Subtotal</span><span>$0.00</span></div>
              <div className="flex justify-between py-1 text-[#222] dark:text-[#bfc9da]"><span>Tax(%)</span><span>0%</span></div>
              <div className="flex justify-between py-1 text-[#222] dark:text-[#bfc9da]"><span>Shipping Rate($)</span><span>$0.00</span></div>
              <div className="flex justify-between py-1 text-[#222] dark:text-[#bfc9da]"><span>Discount(%)</span><span>0%</span></div>
              <div className="flex justify-between py-1 text-[#222] dark:text-[#bfc9da] font-semibold"><span>Total</span><span>$0.00</span></div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
        <div className="bg-white dark:bg-[#232b3b] rounded-md border border-[#e5e7eb] dark:border-[#232b3b] p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs text-[#222] dark:text-[#bfc9da]">Currency</label>
            <select className={selectClass}><option>USD - US Dollar</option></select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#222] dark:text-[#bfc9da]">Tax(%)</label>
              <input className={inputClass} value="0" readOnly />
            </div>
            <div>
              <label className="text-xs text-[#222] dark:text-[#bfc9da]">Discount(%)</label>
              <input className={inputClass} value="0" readOnly />
            </div>
          </div>
          <div>
            <label className="text-xs text-[#222] dark:text-[#bfc9da]">Shipping Charge($)</label>
            <input className={inputClass} value="0" readOnly />
          </div>
          <div>
            <label className="text-xs text-[#222] dark:text-[#bfc9da]">Accept Payment Via</label>
            <select className={selectClass}><option>Select Payment</option></select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full py-2 rounded-md bg-[#22c55e] text-white font-medium shadow-sm hover:bg-[#16a34a] transition">Save</button>
          <button className="w-full py-2 rounded-md bg-[#2563eb] text-white font-medium shadow-sm hover:bg-[#1d4ed8] transition">Send Invoice</button>
          <button className="w-full py-2 rounded-md bg-[#6366f1] text-white font-medium shadow-sm hover:bg-[#4f46e5] transition">Preview</button>
          <button className="w-full py-2 rounded-md bg-[#a78bfa] text-white font-medium shadow-sm hover:bg-[#7c3aed] transition">Download</button>
        </div>
      </div>
    </div>
  );
} 
