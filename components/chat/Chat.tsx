"use client";

import React, { useState } from 'react';
import ProgressSteps from '../ai-mapping/ProgressSteps';
import WelcomeSection from '../ai-mapping/WelcomeSection';
import UploadBox from '../ai-mapping/UploadBox';
import Table from '../ai-mapping/Table';
import TableSection from '../ai-mapping/TableSection';
import Congratulations from '../ai-mapping/Congratulations';

export default function Chat() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [mappedHeaders, setMappedHeaders] = useState<string[] | undefined>(undefined);
  const [mappedData, setMappedData] = useState<string[][] | undefined>(undefined);
  const [uploadedFileId, setUploadedFileId] = useState<string>('');

  const handleFileUpload = () => {
    setStep(1);
    setProgress(22);
  };

  const handleSubmit = (file: File | null) => {
    if (!file) return;
    setStep(2);
    setProgress(45);
    console.log('Submitted file:', file);
  };

  // Skip Manual Editing
  const handleSkip = () => {
    setStep(3);
    setProgress(80);
  };

  // Export table data as CSV
  const handleExport = () => {
    // Get table data from Table component (for now, use mock data)
    const headers = [
      'RetailerStockNumber', 'StyleNumber', 'VisibleAs', 'ParentSKU', 'ProductType', 'SelectedAttributes', 'ProductName', 'ProductDescription', 'CustomAttribute', 'CustomAttributeLabel', 'ConfigurableControlType', 'IsConfigurableProduct', 'ControlDisplayOrder', 'Categories', 'Collections', 'PriceType', 'WholesaleBasePrice', 'MSRP', 'MetalType', 'MetalColor', 'ImagePath', 'Gender'
    ];
    const data = [
      [
        'PARENT-SKU', 'PARENT-SKU', '1', '', '1', 'Metal Type, Metal Color', 'General product name', 'General product description', 'These columns are not used for a standard configurable product.', '', 'DropDownList,DropDownList', '1', '0,0', 'Product category', 'Product Collection', '1', '100', '200', '18k Gold', 'White', 'main-image-white.jpg', 'Ladies'
      ],
      [
        'CHILD1-SKU', 'CHILD1-SKU', '0', 'PARENT-SKU', '0', '', 'Product name for rose gold', 'Product description for rose gold', '', '', '', '0', '', 'Product category', 'Product Collection', '1', '100', '200', '18k Gold', 'Rose', 'main-image-rose.jpg', 'Ladies'
      ]
    ];
    const csv = [headers.join(','), ...data.map(row => row.map(cell => '"' + (cell || '-') + '"').join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save and go to Congratulations
  const handleSave = () => {
    setShowCongrats(true);
  };

  // Reset to initial state after congrats
  const handleFinish = () => {
    setShowCongrats(false);
    setStep(0);
    setProgress(0);
  };

  // Handle mapping result from UploadBox
  const handleMappingResult = (mappingData: any) => {
    console.log('Chat - handleMappingResult:', mappingData);

    // If backend returns data as 2D array with first row as headers:
    let headers: string[] = [];
    let data: string[][] = [];
    
    // Handle different possible data formats from backend
    if (mappingData.data && Array.isArray(mappingData.data)) {
      if (mappingData.data.length > 0) {
        // If first row contains headers
        headers = mappingData.data[0];
        data = mappingData.data.slice(1);
      }
    } else if (mappingData.headers && mappingData.rows) {
      // If backend returns separate headers and rows
      headers = mappingData.headers;
      data = mappingData.rows;
    } else if (mappingData.mapped_data) {
      // Alternative property name
      if (Array.isArray(mappingData.mapped_data) && mappingData.mapped_data.length > 0) {
        headers = mappingData.mapped_data[0];
        data = mappingData.mapped_data.slice(1);
      }
    }

    console.log('Processed headers:', headers);
    console.log('Processed data:', data);

    setMappedHeaders(headers);
    setMappedData(data);
    setUploadedFileId(mappingData.file_id || '');
    setStep(2);
    setProgress(50);
  };

  React.useEffect(() => {
    if (showCongrats) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCongrats]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: 'calc(100vh - 44px - 56px)' }}>
      <div className="max-w-7xl w-full mx-auto my-auto flex flex-col items-center justify-center gap-7 p-1" style={{ maxHeight: 650 }}>
        <ProgressSteps step={step} percent={progress} />
        {showCongrats ? (
          <Congratulations onFinish={handleFinish} />
        ) : step >= 2 ? (
          <TableSection
            step={step}
            onSkip={handleSkip}
            onExport={handleExport}
            onSave={handleSave}
            headers={mappedHeaders}
            data={mappedData}
            fileId={uploadedFileId}
          />
        ) : (
          <WelcomeSection />
        )}
        <div className="mt-16 w-full">
          <UploadBox onFileUpload={handleFileUpload} onSubmit={handleSubmit} onMappingResult={handleMappingResult} />
        </div>
      </div>
    </div>
  );
}
