import React from 'react';

export default function PromptUpdate() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 flex flex-col items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Knowledgebase Card */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 flex flex-col">
          <h3 className="text-base font-semibold text-white rounded-t-lg text-center py-2 mb-4" style={{ background: '#232F4B' }}>Knowledgebase</h3>
          <label className="text-sm text-gray-700 mb-2">Select Files</label>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#232F4B] text-white px-3 py-1 rounded-full text-xs font-medium">Senior Product Designer <button className="ml-1">&times;</button></span>
            <span className="bg-[#232F4B] text-white px-3 py-1 rounded-full text-xs font-medium">Content <button className="ml-1">&times;</button></span>
          </div>
          <div className="flex-1" />
        </div>
        {/* Add Prompt Card */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 flex flex-col">
          <h3 className="text-base font-semibold text-white rounded-t-lg text-center py-2 mb-4" style={{ background: '#232F4B' }}>Add Prompt</h3>
          <textarea className="w-full min-h-[70px] rounded-lg border border-gray-200 p-3 mb-4 text-sm resize-none" defaultValue={"Evaluate how consistently the employee meets or exceeds their job responsibilities. Consider their ability to manage workload and meet deadlines, even under challenging circumstances. How effectively do they plan, organize, and prioritize tasks to drive meaningful results?"} />
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-xs text-[#232F4B] underline">Try out on jc</a>
            <button className="text-xs text-[#232F4B] underline">Edit</button>
          </div>
          <textarea className="w-full min-h-[70px] rounded-lg border border-gray-200 p-3 mb-4 text-sm resize-none" defaultValue={"Assess the employee's communication skills, both written and verbal. How do they interact with team members, clients, and stakeholders? Are they able to convey information clearly and effectively in various situations?"} />
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-xs text-[#232F4B] underline">Try out on jc</a>
            <button className="text-xs text-[#232F4B] underline">Edit</button>
          </div>
          <textarea className="w-full min-h-[70px] rounded-lg border border-gray-200 p-3 mb-4 text-sm resize-none" defaultValue={"Assess the employee's communication skills, both written and verbal. How do they interact with team members, clients, and stakeholders? Are they able to convey information clearly and effectively in various situations?"} />
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-xs text-[#232F4B] underline">Try out on jc</a>
            <button className="text-xs text-[#232F4B] underline">Edit</button>
          </div>
          <div className="flex-1" />
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
        <button className="bg-[#232F4B] text-white rounded-lg px-8 py-2 font-semibold text-base shadow hover:bg-[#1a2236] transition">Generate prompts</button>
      </div>
    </div>
  );
} 