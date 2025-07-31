import React from 'react';

const steps = [
  { label: 'File Upload', icon: '/assets/icons/Upload.svg' },
  { label: 'AI Mapping', icon: '/assets/icons/Airplay.svg' },
  { label: 'Manual Editing', icon: '/assets/icons/Book.svg' },
  { label: 'Final Preview', icon: '/assets/icons/Eye.svg' },
  { label: 'Push to GemTextApi', icon: '/assets/icons/Vector 66.svg' },
];

// Blue filter for icons
const blueFilter = 'invert(32%) sepia(98%) saturate(747%) hue-rotate(186deg) brightness(92%) contrast(92%)';

export default function ProgressSteps({ step, percent }: { step: number, percent?: number }) {
  // Progress bar fill: stop just past the active icon
  const iconCount = steps.length;
  const iconSpacing = 100 / (iconCount - 1);
  const fill = percent !== undefined ? percent : step * iconSpacing + 7; // 7% extra to reach just past the icon
  return (
    <div className="w-full flex flex-col items-center mb-4">
      {/* Progress Bar */}
      <div className="w-full max-w-xl h-1.5 bg-gray-200 rounded-full relative mb-4">
        <div
          className="h-1.5 bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${fill}%` }}
        />
      </div>
      {/* Steps */}
      <div className="flex justify-between w-full max-w-xl">
        {steps.map((s, idx) => (
          <div key={s.label} className="flex flex-col items-center flex-1">
            <div className={`mb-1 flex items-center justify-center ${idx === step ? 'bg-[#27396D]' : 'bg-[#F2F4F8]'} rounded-full`} style={{ width: 38, height: 38 }}>
              <img
                src={s.icon}
                alt={s.label}
                className="w-5 h-5"
                style={{
                  display: 'block',
                  margin: 'auto',
                  filter: idx === step ? 'brightness(0) invert(1)' : blueFilter,
                }}
              />
            </div>
            <span className={`text-[10px] mt-0.5 ${idx === step ? 'font-bold text-[#27396D]' : 'text-gray-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 