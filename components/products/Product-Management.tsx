import React, { useState } from 'react';

const mockFiles = [
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
  {
    vendor: 'Vendor Name',
    type: 'Type',
    originalFile: 'Original File',
    mappedFile: 'Mapped File',
  },
];

const stats = [
  { label: 'Total Files', value: 0 },
  { label: 'Uploaded', value: 5 },
  { label: 'Mapped', value: 10 },
];

const vendors = ['Vendors'];
const categories = ['Categories'];

export default function AllFilesManagement() {
  const [selectedVendor, setSelectedVendor] = useState('Vendors');
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [search, setSearch] = useState('');

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">All Files</h2>
      <p className="text-gray-500 mb-6">Practice and improve your sales skills with AI coaching</p>

      {/* Stats Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex-1 bg-[#2B3663] text-white rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px]">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-base mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-2 text-gray-700 focus:outline-none"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            {vendors.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-gray-700 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex justify-end">
          <input
            type="text"
            placeholder="Search Vendor"
            className="border rounded px-3 py-2 w-full md:w-64 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mapped File</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFiles.map((file, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{file.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{file.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{file.originalFile}</td>
                <td className="px-6 py-4 whitespace-nowrap">{file.mappedFile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <button className="border border-green-400 text-green-600 rounded px-3 py-1 hover:bg-green-50 transition text-sm">Download Original File</button>
                  <button className="border border-blue-400 text-blue-600 rounded px-3 py-1 hover:bg-blue-50 transition text-sm">Download Mapped File</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

