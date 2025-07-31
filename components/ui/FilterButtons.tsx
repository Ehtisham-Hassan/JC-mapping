import React from 'react';

interface FilterButtonProps {
  label: string;
  value: string | null;
}

interface FilterButtonsProps {
  buttons: FilterButtonProps[];
  activeTab: string | null;
  setActiveTab: (value: string | null) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ buttons, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(button.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === button.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons; 