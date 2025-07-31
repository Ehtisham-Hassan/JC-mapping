import React, { useRef } from 'react';

const productForms = [
  { name: 'Simple Product Forms' },
  { name: 'Ring Builder Data Form' },
  { name: 'Configurable Product Form' },
  { name: 'Diamond Data Form' },
];

export default function UploadConfigProduct() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
   {/* <div className="bg-white rounded-2xl shadow p-7 min-w-[600px] max-w-full"> */}
        <h3 className="text-[1.15rem] font-semibold text-gray-900 mb-2">Files</h3>
        <p className="text-gray-500 text-[0.97rem] mb-5">Manage your organization setting</p>
        <div className="space-y-3.5">
          {productForms.map((form, idx) => (
            <div
              key={form.name}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-6 py-3 border border-gray-200 hover:shadow-sm transition min-h-[56px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600">
                <img src="/assets/icons/star.svg" alt="Star Logo" className="w-8 h-8" />
                {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> */}
                </span>
                <span className="font-medium text-gray-900 text-[1.07rem]">{form.name}</span>
              </div>
              <button className="border border-primary text-primary rounded px-5 py-1.5 hover:bg-primary/5 transition text-[0.97rem] font-medium min-w-[90px] h-[38px]">Update</button>
            </div>
          ))}
        </div>
       </div>
    //  </div>
  );
} 