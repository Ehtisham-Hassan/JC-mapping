import React from 'react';

interface TeamGoalProps {
  progress?: number;
  modules?: { name: string; completed: boolean }[];
}

const TeamGoal: React.FC<TeamGoalProps> = ({
  progress = 82,
  modules = [
    { name: 'Module 1: Collaboration', completed: true },
    { name: 'Module 2: Communication', completed: true },
    { name: 'Module 3: Leadership', completed: false },
  ],
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-[#2A3F54]">Team</h3>
        <span className="text-sm text-gray-500 font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-[#2A3F54] h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {modules && modules.length > 0 && (
        <ul className="space-y-2 mt-2">
          {modules.map((mod, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <span className={`mr-2 w-3 h-3 rounded-full border ${mod.completed ? 'bg-[#2A3F54] border-[#2A3F54]' : 'bg-white border-gray-300'}`}></span>
              {mod.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamGoal; 