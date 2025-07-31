import React, { useRef, useState } from 'react';
import API_URL from '../../config/api';
const skuOptions = ['SKU1', 'SKU2', 'SKU3'];
const variationOptions = ['Size', 'Color', 'Material', 'Style'];

export default function UploadBox({ onFileUpload, onSubmit, onMappingResult }: { onFileUpload?: () => void, onSubmit?: (file: File | null) => void, onMappingResult?: (data: any) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mappingType, setMappingType] = useState<'simple' | 'configurable'>('configurable');
  const [skuColumn, setSkuColumn] = useState('');
  const [variationColumns, setVariationColumns] = useState<string[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Simple Product Forms');
  type AiToggleKey = 'titles' | 'descriptions' | 'meta';
  const aiToggles: { label: string; key: AiToggleKey }[] = [
    { label: 'AI Product Titles', key: 'titles' },
    { label: 'AI Product Descriptions', key: 'descriptions' },
    { label: 'AI Meta Tags', key: 'meta' },
  ];
  const [aiEnhancements, setAiEnhancements] = useState<Record<AiToggleKey, boolean>>({ titles: true, descriptions: true, meta: true });

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (onFileUpload) onFileUpload();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedFile && onSubmit) {
      onSubmit(selectedFile);
    }
  };

  // Helper to get random client number (1-3)
  function getRandomClientNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  // Upload and mapping integration
  const handleSend = async () => {
    if (!selectedFile) return;
    const clientNumber = getRandomClientNumber();
    // 1. Upload file
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('client_number', clientNumber.toString());
    
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      const uploadData = await response.json();
      console.log("uploadData: ", uploadData);
      
      if (!uploadData.file_id) {
        throw new Error('No file ID received from upload');
      }
      
      console.log("uploadData.file_id: ", uploadData.file_id);
      
      // 2. Generate AI mappings
      const mappingResponse = await fetch(`${API_URL}/mapping/ai-suggested?file_id=${uploadData.file_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!mappingResponse.ok) {
        throw new Error('AI mapping failed');
      }
      
      const mappingData = await mappingResponse.json();
      console.log("mappingData: ", mappingData);
      console.log("mappingData.file_id: ", mappingData.file_id);
      console.log("mappingData.file_id.data: ", mappingData.file_id.data);
      console.log("mappingData.rows: ", mappingData.rows);
      
      // 3. Pass the mapping result to parent component
      if (onMappingResult) {
        const resultData = {
          ...mappingData,
          file_id: uploadData.file_id,
          data: mappingData.file_id.data,
          headers: mappingData.file_id.headers,
          rows: mappingData.file_id.rows
        };
        console.log('UploadBox - passing to parent:', resultData);
        onMappingResult(resultData);
      }
      
      // 4. Call onSubmit to trigger step change
      if (onSubmit) {
        onSubmit(selectedFile);
      }
      
    } catch (error) {
      console.error('Error in handleSend:', error);
      // You might want to show an error message to the user here
    }
  };

  // Modal close on outside click
  const modalRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  return (
    <div className="w-full flex justify-center">
      <div className="border-2 border-[#232F4B] rounded-xl bg-white shadow relative flex flex-col gap-2 max-w-3xl w-full p-3" style={{ minHeight: 70, width: 700 }}>
        <div className="flex items-center mb-1">
          <span className="text-sm font-medium text-[#717171]">Upload your file</span>
          {selectedFile && (
            <span className="text-xs text-[#232F4B] bg-gray-100 rounded px-2 py-0.5 max-w-[120px] truncate ml-2" title={selectedFile.name}>{selectedFile.name}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full border-none transition text-[#A3A3A3] text-xl font-light bg-transparent"
            onClick={handlePlusClick}
            type="button"
          >
            +
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="flex items-center justify-center gap-1 px-1 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border"
            type="button"
            onClick={() => { setShowModal(true); setShowTemplateModal(false); }}
          >
            <img src="/assets/icons/Git commit.svg" alt="Type of Mapping" className="w-4 h-4" />
            Type of Mapping
          </button>
          <button
            className="flex items-center justify-center gap-1 px-1 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium"
            type="button"
            onClick={() => { setShowTemplateModal(true); setShowModal(false); }}
          >
            <img src="/assets/icons/Git commit.svg" alt="Select Template" className="w-4 h-4" />
            Select Template
          </button>
          <button
            className="ml-auto bg-[#232F4B] hover:bg-blue-900 text-white rounded-full w-7 h-7 flex items-center justify-center transition"
            onClick={handleSend}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <img src="/assets/icons/Navigation.svg" alt="Submit" className="w-4 h-4" />
          </button>
        </div>
        {/* Modal Popup for Type of Mapping */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div ref={modalRef} className="bg-white rounded-2xl shadow-lg p-6 w-[340px] max-w-full border border-blue-200">
              <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input
                    type="radio"
                    name="mappingType"
                    checked={mappingType === 'simple'}
                    onChange={() => setMappingType('simple')}
                    className="accent-blue-600"
                  />
                  Map Simple Products into Jewel Cloud Format
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input
                    type="radio"
                    name="mappingType"
                    checked={mappingType === 'configurable'}
                    onChange={() => setMappingType('configurable')}
                    className="accent-blue-600"
                  />
                  <span className="inline-flex items-center gap-1">
                    Convert Simple Products into Configurable Products
                  </span>
                </label>
                <div className="mt-2">
                  <label className="block text-xs font-semibold mb-1">SKU Column</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={skuColumn}
                    onChange={e => setSkuColumn(e.target.value)}
                  >
                    <option value="">Select column</option>
                    {skuOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-semibold mb-1">Variation Columns</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={variationColumns.join(',')}
                    onChange={e => setVariationColumns([e.target.value])}
                  >
                    <option value="">Select columns</option>
                    {variationOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500 mt-1">Variation columns could include attributes like Size, Color, Material, etc.</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal Popup for Select Template */}
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowTemplateModal(false)}>
            <div className="bg-white rounded-2xl shadow-lg p-0 w-[420px] max-w-full border border-blue-200 flex relative" style={{ minHeight: 180 }} onClick={e => e.stopPropagation()}>
              {/* Sidebar */}
              <div className="flex flex-col w-1/2 border-r border-gray-200 bg-white rounded-l-2xl">
                {['Simple Product Forms', 'Ring Builder Data Form', 'Configurable Product Form', 'Diamond Data Form'].map((item) => (
                  <button
                    key={item}
                    className={`text-left px-4 py-2 text-xs rounded-none ${selectedTemplate === item ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'} ${item === selectedTemplate ? 'text-black' : 'text-gray-700'}`}
                    onClick={() => setSelectedTemplate(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {/* Right section */}
              <div className="flex-1 p-4 flex flex-col justify-center">
                <div className="font-medium text-xs mb-3">Enable AI Enhancements:</div>
                <div className="flex flex-col gap-3">
                  {aiToggles.map(t => (
                    <label key={t.key} className="flex items-center justify-between text-xs cursor-pointer select-none">
                      {t.label}
                      <span className="relative inline-block w-9 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={aiEnhancements[t.key]}
                          onChange={() => setAiEnhancements(a => ({ ...a, [t.key]: !a[t.key] }))}
                          className="sr-only"
                        />
                        <span
                          className={`block h-5 w-9 rounded-full transition-colors duration-200 ${aiEnhancements[t.key] ? 'bg-[#27396D]' : 'bg-gray-300'}`}
                        ></span>
                        <span
                          className={`dot absolute left-1 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow transition-all duration-200 ${aiEnhancements[t.key] ? 'translate-x-4' : ''}`}
                        ></span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* No close button here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 