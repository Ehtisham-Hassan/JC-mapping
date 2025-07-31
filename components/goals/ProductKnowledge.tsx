import React from 'react';

interface ProductKnowledgeProps {
  progress?: number; // percentage (0-100)
  modules?: { name: string; completed: boolean }[];
}

const ProductKnowledge: React.FC<ProductKnowledgeProps> = ({
  progress = 50,
  modules = [
    { name: 'Module 1: Features Overview', completed: true },
    { name: 'Module 2: Competitive Analysis', completed: false },
    { name: 'Module 3: Use Cases', completed: false },
  ],
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-[#2A3F54]">Product Knowledge</h3>
        <span className="text-sm text-gray-500 font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-[#7C3AED] h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {modules && modules.length > 0 && (
        <ul className="space-y-2 mt-2">
          {modules.map((mod, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <span className={`mr-2 w-3 h-3 rounded-full border ${mod.completed ? 'bg-[#7C3AED] border-[#7C3AED]' : 'bg-white border-gray-300'}`}></span>
              {mod.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductKnowledge;
