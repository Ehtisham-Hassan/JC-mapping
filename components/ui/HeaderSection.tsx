import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

interface HeaderSectionProps {
  title: string;
  description: string;
  buttons?: ButtonProps[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, description, buttons = [] }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {buttons.length > 0 && (
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSection; 