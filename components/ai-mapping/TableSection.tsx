import React, { useRef, useState } from 'react';
import Table from './Table';
import { generateAISuggestedMappings, MappingResponse } from '../../lib/api/mapping';

interface TableSectionProps {
  step: number;
  onSkip?: () => void;
  onExport?: () => void;
  onSave?: () => void;
  headers?: string[];
  data?: string[][];
  fileId?: string;
}

export default function TableSection({ step, onSkip, onExport, onSave, headers, data, fileId }: TableSectionProps) {
  // 2 = Manual Editing, 3 = Final Preview
  const [tableHeight, setTableHeight] = useState(320);
  const [mappedData, setMappedData] = useState<MappingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(320);

  const handleMouseDown = (e: React.MouseEvent) => {
    resizing.current = true;
    startY.current = e.clientY;
    startHeight.current = tableHeight;
    document.body.style.cursor = 'ns-resize';
  };
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing.current) return;
      const delta = e.clientY - startY.current;
      setTableHeight(Math.max(200, startHeight.current + delta));
    };
    const handleMouseUp = () => {
      resizing.current = false;
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [tableHeight]);

  // Function to generate AI mappings
  const handleGenerateMappings = async () => {
    if (!fileId) {
      setError('No file ID provided');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateAISuggestedMappings(fileId);
      setMappedData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate mappings');
    } finally {
      setIsLoading(false);
    }
  };

  // Use headers and data props directly
  const displayHeaders = headers || [];
  const displayData = data || [];

  // Debug logging to verify data is received
  React.useEffect(() => {
    console.log('TableSection - Received headers:', displayHeaders);
    console.log('TableSection - Received data:', displayData);
    console.log('TableSection - File ID:', fileId);
  }, [displayHeaders, displayData, fileId]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Button row */}
      <div className="w-full max-w-6xl flex justify-end items-center gap-3 mb-2 pr-2">
        {/* Add AI Mapping button */}
        {fileId && step === 2 && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 text-sm font-semibold shadow transition"
            onClick={handleGenerateMappings}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate AI Mappings'}
          </button>
        )}
        
        {step === 2 && (
          <button
            className="bg-[#232B44] hover:bg-blue-900 text-white rounded-lg px-6 py-2 text-sm font-semibold shadow transition"
            onClick={onSkip}
          >
            Skip
          </button>
        )}
        {step === 3 && (
          <>
            <button
              className="bg-[#232B44] hover:bg-blue-900 text-white rounded-lg px-6 py-2 text-sm font-semibold shadow transition"
              onClick={onExport}
            >
              Export
            </button>
            <button
              className="bg-[#2A4AFF] hover:bg-blue-700 text-white rounded-lg px-6 py-2 text-sm font-semibold shadow transition"
              onClick={onSave}
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* Error/Success messages */}
      {error && (
        <div className="w-full max-w-6xl mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {mappedData && (
        <div className="w-full max-w-6xl mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {mappedData.message}
          <div className="text-sm mt-1">
            Rows: {mappedData.rows}, Columns: {mappedData.columns}
          </div>
        </div>
      )}

      {/* Resizable table card */}
      <div
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
        style={{ height: tableHeight }}
      >
        <div className="flex-1 overflow-auto">
          <Table headers={displayHeaders} data={displayData} />
        </div>
        {/* Resize handle */}
        <div
          className="absolute bottom-0 left-0 w-full h-4 flex items-center justify-center cursor-ns-resize select-none z-20"
          onMouseDown={handleMouseDown}
        >
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
} 