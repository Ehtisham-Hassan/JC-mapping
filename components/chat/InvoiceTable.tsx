import React, { useState } from 'react';
import InvoiceDetailsModal from './InvoiceDetailsModal';

const invoices = [
  { id: '#081451', name: 'Laurie Fox', email: 'lauriefox@company.com', date: '15 Dec 2020', amount: '$2275.45', status: 'Paid', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '#081452', name: 'Alexander Gray', email: 'alexGray3188@gmail.com', date: '20 Dec 2020', amount: '$1044.00', status: 'Paid', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '#081681', name: 'James Taylor', email: 'jamestaylor468@gmail.com', date: '27 Dec 2020', amount: '$20.00', status: 'Pending', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '#082693', name: 'Grace Roberts', email: 'graceRoberts@company.com', date: '31 Dec 2020', amount: '$344.00', status: 'Paid', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '#084743', name: 'Donna Rogers', email: 'donnaRogers@hotmail.com', date: '03 Jan 2021', amount: '$405.15', status: 'Paid', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '#086643', name: 'Amy Diaz', email: 'amy968@gmail.com', date: '14 Jan 2020', amount: '$100.00', status: 'Paid', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '#086773', name: 'Nia Hillyer', email: 'niahillyer666@comapny.com', date: '20 Jan 2021', amount: '$59.21', status: 'Pending', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: '#087916', name: 'Mary McDonald', email: 'maryDonald007@gamil.com', date: '25 Jan 2021', amount: '$79.00', status: 'Pending', img: 'https://randomuser.me/api/portraits/women/29.jpg' },
  { id: '#089472', name: 'Andy King', email: 'kingandy07@company.com', date: '28 Jan 2021', amount: '$149.00', status: 'Paid', img: 'https://randomuser.me/api/portraits/men/41.jpg' },
];

const statusBadge = (status: string) => {
  if (status === 'Paid') {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700">Paid</span>;
  }
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700">Pending</span>;
};

// Define the type for an invoice
interface Invoice {
  id: string;
  name: string;
  email: string;
  date: string;
  amount: string;
  status: string;
  img: string;
}

interface InvoiceTableProps {
  onViewInvoice?: (invoice: Invoice) => void;
}

export default function InvoiceTable({ onViewInvoice }: InvoiceTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };

  const ActionIcons = ({ invoice }: { invoice: Invoice }) => (
    <div className="flex gap-1 sm:gap-2">
      {/* Edit */}
      <button className="hover:bg-blue-100 dark:hover:bg-blue-900 p-1 rounded transition" title="Edit">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"/></svg>
      </button>
      {/* View */}
      <button className="hover:bg-purple-100 dark:hover:bg-purple-900 p-1 rounded transition" title="View" onClick={() => handleViewInvoice(invoice)}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 dark:text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      {/* Delete */}
      <button className="hover:bg-red-100 dark:hover:bg-red-900 p-1 rounded transition" title="Delete">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 dark:text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m5 4v6m4-6v6"/></svg>
      </button>
    </div>
  );

  return (
    <>
      <div className="w-full pb-40 pt-4 flex justify-center items-start">
        <div className="w-full max-w-7xl">
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 w-full overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[600px] text-xs sm:text-sm divide-y divide-gray-200 dark:divide-gray-700 select-text">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider rounded-tl-2xl">Invoice</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Name</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Email</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Date</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Amount</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-4 py-2 text-center font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-blue-600 dark:text-blue-400 underline cursor-pointer font-semibold">{inv.id}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap flex items-center gap-2 sm:gap-3">
                        <img src={inv.img} alt={inv.name} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm object-cover" />
                        <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[80px] sm:max-w-[120px]">{inv.name}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300 truncate max-w-[100px] sm:max-w-[160px]">{inv.email}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400">{inv.date}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap font-semibold text-gray-800 dark:text-gray-200">{inv.amount}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{statusBadge(inv.status)}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-center"><ActionIcons invoice={inv} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <InvoiceDetailsModal isOpen={modalOpen} onClose={handleCloseModal} invoiceId={selectedInvoice ? selectedInvoice.id : null} />
    </>
  );
} 