import React from 'react';

export default function WelcomeSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-1 gap-1 max-w-xl mx-auto">
      {/* <img src="/assets/icons/.svg" alt="GemText Logo" className="w-10 h-10 mb-1" /> */}
      <img src="/assets/icons/Main-logo-black.svg" alt="GemText Ai" className="w-19 h-14 mb-1" />
      <h1 className="text-xl font-bold mb-0.5">Welcome to AI Mapping</h1>
      <p className="text-gray-500 mb-2 text-xs">Upload your file, select your mapping goal, and let AI Mapping do the rest.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full max-w-xl">
        <div className="bg-white border rounded-xl shadow p-2 flex flex-col items-center">
          <span className="font-semibold text-sm mb-0.5">Accelerate Product Mapping</span>
          <span className="text-[11px] text-gray-500">Automatically map vendor columns to JC 2.0 fields for simple or configurable products.</span>
        </div>
        <div className="bg-white border rounded-xl shadow p-2 flex flex-col items-center">
          <span className="font-semibold text-sm mb-0.5">User-Friendly Onboarding</span>
          <span className="text-[11px] text-gray-500">Follow a guided flow to upload your file, review mappings, and export.</span>
        </div>
        <div className="bg-white border rounded-xl shadow p-2 flex flex-col items-center">
          <span className="font-semibold text-sm mb-0.5">Manual Mapping Control</span>
          <span className="text-[11px] text-gray-500">Adjust mappings and specify SKU & variations if needed.</span>
        </div>
      </div>
    </div>
  );
  
} 