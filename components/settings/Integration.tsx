import React from 'react';

export default function Integration() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 hover:shadow-sm transition">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: '#232F4B' }}>
                <img src="/assets/icons/star.svg" alt="Star Logo" className="w-6 h-6" style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(190deg) brightness(0.7)' }} />
              </span>
              <span className="font-medium text-gray-900">GemTextApi</span>
            </div>
            <button className="border rounded px-5 py-1.5 transition text-sm font-medium min-w-[90px] h-[38px]" style={{ borderColor: '#232F4B', color: '#232F4B' }}>Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
} 