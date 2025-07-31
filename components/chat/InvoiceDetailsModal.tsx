import React, { useEffect, useState } from 'react';

// Interface for detailed invoice data from API
interface DetailedInvoice {
  // New API response structure
  invoice_number?: string;
  customer_name?: string;
  due_date?: string;
  balance?: number;
  total_amount?: number;
  payment_status?: string;
  invoice_date?: string;
  description?: string;
  currency?: string;
  
  // Legacy fields (for backward compatibility)
  id?: number;
  user_id?: number;
  realm_id?: string;
  allow_ipn_payment?: string;
  allow_online_ach_payment?: string;
  allow_online_credit_card_payment?: string;
  allow_online_payment?: string;
  apply_tax_after_discount?: string;
  bill_addr?: string;
  bill_email?: string;
  currency_ref?: string;
  custom_field?: string | null;
  customer_memo?: string;
  customer_ref?: string;
  doc_number?: string;
  email_status?: string;
  free_form_address?: string;
  quickbooks_id?: string;
  line?: string;
  linked_txn?: string;
  metadata?: string;
  print_status?: string;
  sales_term_ref?: string;
  ship_addr?: string;
  sync_token?: string;
  total_amt?: number;
  txn_date?: string;
  txn_tax_detail?: string;
  domain?: string;
  sparse?: string;
  status?: string | null;
  created_at?: string;
  updated_at?: string;
  customer_id?: number;
}

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

// Parse JSON string safely
const parseJsonSafely = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get status color
const getStatusColor = (status: string | null, balance: number) => {
  if (balance === 0) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
  if (status === 'Overdue') return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
};

// Get status text
const getStatusText = (status: string | null, balance: number) => {
  if (balance === 0) return 'Paid';
  if (status === 'Overdue') return 'Overdue';
  return 'Pending';
};

// Helper function to get field values with fallbacks
const getInvoiceField = (invoice: DetailedInvoice, newField: keyof DetailedInvoice, legacyField: keyof DetailedInvoice) => {
  return invoice[newField] ?? invoice[legacyField];
};

// Helper function to get string field with fallback
const getStringField = (invoice: DetailedInvoice, newField: keyof DetailedInvoice, legacyField: keyof DetailedInvoice): string => {
  return (invoice[newField] ?? invoice[legacyField]) as string || '';
};

// Helper function to get number field with fallback
const getNumberField = (invoice: DetailedInvoice, newField: keyof DetailedInvoice, legacyField: keyof DetailedInvoice): number => {
  return (invoice[newField] ?? invoice[legacyField]) as number || 0;
};

export default function InvoiceDetailsModal({ isOpen, onClose, invoiceId, invoice }: InvoiceDetailsModalProps & { invoice?: any }) {
  // Dummy invoice data
  const dummyInvoice: DetailedInvoice = {
    invoice_number: 'INV-1001',
    customer_name: 'John Doe',
    due_date: '2024-07-01',
    balance: 200,
    total_amount: 1000,
    payment_status: 'Pending',
    invoice_date: '2024-06-01',
    description: 'Consulting services',
    currency: 'USD',
    id: 1,
    user_id: 123,
    realm_id: 'realm-xyz',
    allow_ipn_payment: 'true',
    allow_online_ach_payment: 'true',
    allow_online_credit_card_payment: 'true',
    allow_online_payment: 'true',
    apply_tax_after_discount: 'false',
    bill_addr: JSON.stringify({ Line1: '123 Main St', Line2: 'Suite 400', Line3: 'Springfield' }),
    bill_email: JSON.stringify({ Address: 'john.doe@example.com' }),
    currency_ref: 'USD',
    custom_field: null,
    customer_memo: JSON.stringify({ value: 'Thank you for your business!' }),
    customer_ref: 'CUST-001',
    doc_number: '1001',
    email_status: 'Sent',
    free_form_address: '123 Main St, Springfield',
    quickbooks_id: 'QB-INV-1001',
    line: JSON.stringify([
      {
        DetailType: 'SalesItemLineDetail',
        Description: 'Consulting Service',
        Amount: 800,
        SalesItemLineDetail: {
          Qty: 8,
          UnitPrice: 100,
          ItemAccountRef: { name: 'Consulting Income' }
        }
      },
      {
        DetailType: 'SalesItemLineDetail',
        Description: 'Software License',
        Amount: 200,
        SalesItemLineDetail: {
          Qty: 1,
          UnitPrice: 200,
          ItemAccountRef: { name: 'Software Sales' }
        }
      }
    ]),
    linked_txn: '',
    metadata: '',
    print_status: 'Printed',
    sales_term_ref: JSON.stringify({ name: 'Net 30' }),
    ship_addr: '',
    sync_token: '',
    total_amt: 1000,
    txn_date: '2024-06-01',
    txn_tax_detail: '',
    domain: '',
    sparse: '',
    status: 'Pending',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-01T10:00:00Z',
    customer_id: 1,
  };

  // Remove state and effect for invoice fetching
  const [invoiceState, setInvoice] = useState<DetailedInvoice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use the provided invoice if available, otherwise use dummyInvoice
  useEffect(() => {
    if (isOpen) {
      setInvoice(invoice || dummyInvoice);
      setLoading(false);
      setError(null);
    } else {
      setInvoice(null);
      setError(null);
    }
  }, [isOpen, invoice]);

  // Reset state when modal closes
  const handleClose = () => {
    setInvoice(null);
    setError(null);
    onClose();
  };

  // Download CSV functionality
  const downloadCSV = async () => {
    if (!invoiceState) return;

    try {
      // Get field values with fallbacks
      const invoiceNumber = getStringField(invoiceState, 'invoice_number', 'doc_number');
      const customerName = invoiceState.customer_name || '';
      const customerId = invoiceState.customer_id || '';
      const transactionDate = getStringField(invoiceState, 'invoice_date', 'txn_date');
      const dueDate = invoiceState.due_date || '';
      const quickbooksId = invoiceState.quickbooks_id || '';
      const totalAmount = getNumberField(invoiceState, 'total_amount', 'total_amt');
      const balance = invoiceState.balance || 0;
      const status = getStringField(invoiceState, 'payment_status', 'status');
      
      // Parse JSON data (only for legacy fields)
      const billAddr = invoiceState.bill_addr ? parseJsonSafely(invoiceState.bill_addr) : null;
      const billEmail = invoiceState.bill_email ? parseJsonSafely(invoiceState.bill_email) : null;
      const lineItems = invoiceState.line ? parseJsonSafely(invoiceState.line) : null;
      const salesTerms = invoiceState.sales_term_ref ? parseJsonSafely(invoiceState.sales_term_ref) : null;
      const customerMemo = invoiceState.customer_memo ? parseJsonSafely(invoiceState.customer_memo) : null;

      // Create CSV content
      const csvRows = [
        // Header row
        ['Invoice Details'],
        [''],
        // Basic Information
        ['Invoice Number', `#${invoiceNumber}`],
        ['Customer Name', customerName],
        ['Customer ID', customerId],
        ['Transaction Date', transactionDate ? formatDate(transactionDate) : ''],
        ['Due Date', dueDate ? formatDate(dueDate) : ''],
        ['QuickBooks ID', quickbooksId],
        [''],
        // Billing Information
        ['Billing Address'],
        ['Line 1', billAddr?.Line1 || ''],
        ['Line 2', billAddr?.Line2 || ''],
        ['Line 3', billAddr?.Line3 || ''],
        ['Email', billEmail?.Address || ''],
        [''],
        // Financial Information
        ['Total Amount', formatCurrency(totalAmount)],
        ['Balance', formatCurrency(balance)],
        ['Paid Amount', formatCurrency(totalAmount - balance)],
        ['Status', getStatusText(status, balance)],
        [''],
        // Invoice Items
        ['Invoice Items'],
        ['Item', 'Description', 'Quantity', 'Unit Price', 'Amount']
      ];

      // Add line items
      if (lineItems) {
        lineItems
          .filter((item: any) => item.DetailType === 'SalesItemLineDetail')
          .forEach((item: any, index: number) => {
            csvRows.push([
              `Item ${index + 1}`,
              item.Description || '',
              item.SalesItemLineDetail?.Qty || 0,
              formatCurrency(item.SalesItemLineDetail?.UnitPrice || 0),
              formatCurrency(item.Amount)
            ]);
          });
      }

      // Add additional information
      csvRows.push(
        [''],
        ['Additional Information'],
        ['Sales Terms', salesTerms?.name || ''],
        ['Print Status', invoiceState.print_status],
        ['Email Status', invoiceState.email_status],
        ['Customer Memo', customerMemo?.value || '']
      );

      // Convert to CSV string
      const csvContent = csvRows.map(row => 
        row.map(cell => `"${cell}"`).join(',')
      ).join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', `Invoice_${invoiceState.doc_number}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Error downloading CSV:', err);
      alert('Failed to download invoice. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Invoice Details</h2>
                  <p className="text-blue-100 text-sm">#{invoiceState?.doc_number}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">Error Loading Invoice</h3>
                    <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            ) : invoiceState ? (
              <div className="space-y-6">
                {/* Status Banner */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{invoiceState.customer_name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Customer ID: {invoiceState.customer_id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoiceState.status || null, invoiceState.balance || 0)}`}>
                        {getStatusText(invoiceState.status || null, invoiceState.balance || 0)}
                      </span>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(invoiceState.total_amt || 0)}</p>
                    </div>
                  </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Invoice Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Invoice Information
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Invoice Number</label>
                            <p className="text-gray-900 dark:text-white font-semibold">#{invoiceState.doc_number}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">QuickBooks ID</label>
                            <p className="text-gray-900 dark:text-white">{invoiceState.quickbooks_id}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Date</label>
                            <p className="text-gray-900 dark:text-white">{invoiceState.txn_date ? formatDate(invoiceState.txn_date) : 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</label>
                            <p className="text-gray-900 dark:text-white">{invoiceState.due_date ? formatDate(invoiceState.due_date) : 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Invoice Items
                        </h3>
                      </div>
                      <div className="p-4">
                        {(() => {
                          const lineItems = invoiceState.line ? parseJsonSafely(invoiceState.line) : null;
                          return lineItems ? (
                            <div className="space-y-3">
                              {lineItems.map((item: any, index: number) => (
                                item.DetailType === 'SalesItemLineDetail' && (
                                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.Description}</h4>
                                        {item.SalesItemLineDetail && (
                                          <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                              Quantity: {item.SalesItemLineDetail.Qty}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                              Unit Price: {formatCurrency(item.SalesItemLineDetail.UnitPrice)}
                                            </p>
                                            {item.SalesItemLineDetail.ItemAccountRef && (
                                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Account: {item.SalesItemLineDetail.ItemAccountRef.name}
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-right ml-4">
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(item.Amount)}</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500 dark:text-gray-400">No line items available</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6">
                    {/* Financial Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Financial Summary
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(invoiceState.total_amt || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Balance</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(invoiceState.balance || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Paid Amount</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency((invoiceState.total_amt || 0) - (invoiceState.balance || 0))}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoiceState.status || null, invoiceState.balance || 0)}`}>
                              {getStatusText(invoiceState.status || null, invoiceState.balance || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Customer Details
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                          {(() => {
                            const billEmail = invoiceState.bill_email ? parseJsonSafely(invoiceState.bill_email) : null;
                            return billEmail ? (
                              <p className="text-gray-900 dark:text-white text-sm">{billEmail.Address}</p>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 text-sm">No email available</p>
                            );
                          })()}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Address</label>
                          {(() => {
                            const billAddr = invoiceState.bill_addr ? parseJsonSafely(invoiceState.bill_addr) : null;
                            return billAddr ? (
                              <div className="text-sm text-gray-900 dark:text-white space-y-1">
                                <p>{billAddr.Line1}</p>
                                {billAddr.Line2 && <p>{billAddr.Line2}</p>}
                                {billAddr.Line3 && <p>{billAddr.Line3}</p>}
                              </div>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 text-sm">No address available</p>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Additional Info
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Sales Terms</label>
                          {(() => {
                            const salesTerms = invoiceState.sales_term_ref ? parseJsonSafely(invoiceState.sales_term_ref) : null;
                            return salesTerms ? (
                              <p className="text-gray-900 dark:text-white text-sm">{salesTerms.name}</p>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 text-sm">No terms available</p>
                            );
                          })()}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Print Status</label>
                          <p className="text-gray-900 dark:text-white text-sm">{invoiceState.print_status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Status</label>
                          <p className="text-gray-900 dark:text-white text-sm">{invoiceState.email_status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Memo</label>
                          {(() => {
                            const customerMemo = invoiceState.customer_memo ? parseJsonSafely(invoiceState.customer_memo) : null;
                            return customerMemo ? (
                              <p className="text-gray-900 dark:text-white text-sm italic">"{customerMemo.value}"</p>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 text-sm">No memo available</p>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={downloadCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Download CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 