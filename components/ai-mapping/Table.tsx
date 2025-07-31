import React, { useState, useRef } from 'react';

// JC headers from the CSV file
const JC_HEADERS = [
  'RetailerStockNumber', 'StyleNumber', 'VisibleAs', 'ParentSKU', 'ProductType', 'SelectedAttributes', 'ProductName', 'ProductDescription', 'CustomAttribute', 'CustomAttributeLabel', 'ConfigurableControlType', 'IsConfigurableProduct', 'ControlDisplayOrder', 'Categories', 'Collections', 'PriceType', 'WholesaleBasePrice', 'MSRP', 'MetalType', 'MetalColor', 'ImagePath', 'Gender'
];

// Empty initial data - will be populated from backend
function getInitialData() {
  return [];
}

export default function Table({ headers = [], data = [] }: { headers?: string[], data?: string[][] }) {
  const [editingHeader, setEditingHeader] = useState<number | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [addColValue, setAddColValue] = useState('');
  const dragCol = useRef<number | null>(null);

  // Handle header edit
  const handleHeaderClick = (i: number) => setEditingHeader(i);
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newHeaders = [...headers];
    newHeaders[i] = e.target.value;
    // setHeaders(newHeaders); // This state is no longer managed by the component
  };
  const handleHeaderBlur = () => setEditingHeader(null);

  // Handle cell edit
  const handleCellClick = (row: number, col: number) => setEditingCell({ row, col });
  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const newData = data.map(r => [...r]);
    newData[row][col] = e.target.value || '-';
    // setData(newData); // This state is no longer managed by the component
  };
  const handleCellBlur = () => setEditingCell(null);

  // Add column
  const handleAddCol = () => {
    if (!addColValue.trim()) return;
    // setHeaders([...headers, addColValue.trim()]); // This state is no longer managed by the component
    // setData(data.map(row => [...row, '-'])); // This state is no longer managed by the component
    setAddColValue('');
  };

  // Delete column
  const handleDeleteCol = (col: number) => {
    // setHeaders(headers.filter((_, i) => i !== col)); // This state is no longer managed by the component
    // setData(data.map(row => row.filter((_, i) => i !== col))); // This state is no longer managed by the component
  };

  // Drag and drop columns
  const handleDragStart = (col: number) => { dragCol.current = col; };
  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, col: number) => {
    e.preventDefault();
    if (dragCol.current === null || dragCol.current === col) return;
    const newHeaders = [...headers];
    const [dragged] = newHeaders.splice(dragCol.current, 1);
    newHeaders.splice(col, 0, dragged);
    // setHeaders(newHeaders); // This state is no longer managed by the component
    const newData = data.map(row => {
      const newRow = [...row];
      const [draggedCell] = newRow.splice(dragCol.current!, 1);
      newRow.splice(col, 0, draggedCell);
      return newRow;
    });
    // setData(newData); // This state is no longer managed by the component
    dragCol.current = col;
  };
  const handleDragEnd = () => { dragCol.current = null; };

  // Show loading state if no data
  if (!headers.length || !data.length) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        No data to display. Upload and map a file to see results.
      </div>
    );
  }

  return (
    <div className="overflow-auto flex justify-center w-full" style={{ maxHeight: 400 }}>
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4" style={{ minHeight: 220 }}>
        <table className="min-w-max w-full border-separate border-spacing-0 text-sm rounded-2xl">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 bg-[#232B44] font-bold text-white text-left whitespace-nowrap relative group cursor-pointer text-base"
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={e => handleDragOver(e, i)}
                  onDragEnd={handleDragEnd}
                  style={{ minWidth: 120, maxWidth: 200, border: 'none' }}
                >
                  <div className="flex items-center gap-2">
                    {editingHeader === i ? (
                      <input
                        className="border px-1 py-0.5 rounded w-full text-black"
                        value={header}
                        autoFocus
                        onChange={e => handleHeaderChange(e, i)}
                        onBlur={handleHeaderBlur}
                        onKeyDown={e => e.key === 'Enter' && handleHeaderBlur()}
                      />
                    ) : (
                      <span onClick={() => handleHeaderClick(i)}>{header}</span>
                    )}
                    <button
                      className="text-red-400 hover:text-red-600 text-xs ml-1 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleDeleteCol(i)}
                      tabIndex={-1}
                      title="Delete column"
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
              {/* Add column cell, hidden unless focused or hovered */}
              <th className="px-4 py-3 bg-[#232B44] font-bold text-white text-left whitespace-nowrap min-w-[120px] group">
                <input
                  className="border px-1 py-0.5 rounded w-full text-black opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                  placeholder="Add column"
                  value={addColValue}
                  onChange={e => setAddColValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddCol()}
                  onBlur={handleAddCol}
                  tabIndex={0}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="bg-white">
                {headers.map((_, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-3 text-[#232B44] bg-white whitespace-nowrap cursor-pointer min-w-[120px] max-w-[200px] overflow-hidden text-left border-none"
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    style={{ verticalAlign: 'middle', border: 'none' }}
                  >
                    {editingCell && editingCell.row === rowIdx && editingCell.col === colIdx ? (
                      <input
                        className="border px-1 py-0.5 rounded w-full text-black"
                        value={row[colIdx] === '-' ? '' : row[colIdx]}
                        autoFocus
                        onChange={e => handleCellChange(e, rowIdx, colIdx)}
                        onBlur={handleCellBlur}
                        onKeyDown={e => e.key === 'Enter' && handleCellBlur()}
                      />
                    ) : (
                      <span>{row[colIdx] || '-'}</span>
                    )}
                  </td>
                ))}
                {/* Add column cell for each row (empty, hidden) */}
                <td className="px-4 py-3 bg-white min-w-[120px] border-none"> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 