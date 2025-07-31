import React from 'react';

interface InvoicePreviewProps {
  invoice: any;
  onClose: () => void;
}

const invoiceDetails = {
  issueFor: {
    name: 'John Doe',
    address: '405 Mulberry Rd. Mc Grady, NC, 28649',
    email: 'redq@company.com',
    phone: '(128) 666 070',
  },
  invoice: '#8701',
  issueDate: '13 Sep 2022',
  orderId: '#OD-85794',
  shipmentId: '#SHP-8594',
  bank: {
    name: 'Bank Of America',
    account: '1234567890',
    swift: 'S58K796',
    iban: 'L5698445485',
    country: 'United States',
  },
  company: {
    address: '13 Tetrick Road, Cypress Gardens, Florida, 33884, US',
    email: 'vristo@gmail.com',
    phone: '+1 (070) 123-4567',
    logo: '/assets/ChatLogo/ChatLogo.svg',
  },
  items: [
    { sn: 1, name: 'Calendar App Customization', qty: 1, price: 120, amount: 120 },
    { sn: 2, name: 'Chat App Customization', qty: 1, price: 230, amount: 230 },
    { sn: 3, name: 'Laravel Integration', qty: 1, price: 405, amount: 405 },
    { sn: 4, name: 'Backend UI Design', qty: 1, price: 2500, amount: 2500 },
  ],
  subtotal: 3255,
  tax: 700,
  shipping: 0,
  discount: 10,
  total: 3945,
};

export default function InvoicePreview({ invoice, onClose }: InvoicePreviewProps) {
  return (
    <div className="w-full flex justify-center items-start pt-6 pb-40">
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition" aria-label="Close">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">INVOICE</div>
        <div className="border-t border-gray-200 dark:border-gray-700 mb-6"></div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-6">
          {/* Left: Issue For */}
          <div className="flex-1 min-w-[220px]">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Issue For:</div>
            <div className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{invoiceDetails.issueFor.name}</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">{invoiceDetails.issueFor.address}</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">{invoiceDetails.issueFor.email}</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">{invoiceDetails.issueFor.phone}</div>
          </div>
          {/* Center: Invoice Info */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Invoice :</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.invoice}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Issue Date :</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.issueDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Order ID :</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.orderId}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Shipment ID :</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.shipmentId}</span></div>
          </div>
          {/* Right: Company Info */}
          <div className="flex-1 min-w-[220px] flex flex-col items-end gap-1 text-sm">
            <img src={invoiceDetails.company.logo} alt="Logo" className="w-16 h-16 mb-2" />
            <div className="text-gray-600 dark:text-gray-400 text-right">{invoiceDetails.company.address}</div>
            <div className="text-gray-600 dark:text-gray-400 text-right">{invoiceDetails.company.email}</div>
            <div className="text-gray-600 dark:text-gray-400 text-right">{invoiceDetails.company.phone}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-6">
          {/* Left: Bank Info */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Bank Name:</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.bank.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Account Number:</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.bank.account}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">SWIFT Code:</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.bank.swift}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">IBAN:</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.bank.iban}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Country:</span> <span className="text-gray-900 dark:text-white">{invoiceDetails.bank.country}</span></div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-xl mb-8">
          <table className="w-full min-w-[600px] text-sm divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">S.NO</th>
                <th className="px-4 py-2 text-left font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">ITEMS</th>
                <th className="px-4 py-2 text-center font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">QTY</th>
                <th className="px-4 py-2 text-right font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">PRICE</th>
                <th className="px-4 py-2 text-right font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
              {invoiceDetails.items.map((item) => (
                <tr key={item.sn}>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{item.sn}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{item.name}</td>
                  <td className="px-4 py-2 text-center text-gray-900 dark:text-gray-200">{item.qty}</td>
                  <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">${item.price}</td>
                  <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Totals */}
        <div className="flex flex-col items-end gap-1 text-base">
          <div className="flex gap-8">
            <div className="text-gray-600">Subtotal</div>
            <div className="text-gray-900 dark:text-gray-200">${invoiceDetails.subtotal}</div>
          </div>
          <div className="flex gap-8">
            <div className="text-gray-600">Tax</div>
            <div className="text-gray-900 dark:text-gray-200">${invoiceDetails.tax}</div>
          </div>
          <div className="flex gap-8">
            <div className="text-gray-600">Shipping Rate</div>
            <div className="text-gray-900 dark:text-gray-200">${invoiceDetails.shipping}</div>
          </div>
          <div className="flex gap-8">
            <div className="text-gray-600">Discount</div>
            <div className="text-gray-900 dark:text-gray-200">${invoiceDetails.discount}</div>
          </div>
          <div className="flex gap-8 mt-2 text-xl font-bold">
            <div className="text-gray-900 dark:text-gray-100">Grand Total</div>
            <div className="text-gray-900 dark:text-white">${invoiceDetails.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 