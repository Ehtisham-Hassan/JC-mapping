import React from 'react';

interface TeamMetric {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface Contributor {
  name: string;
  contributions: number;
  role: string;
}

interface TeamGoal {
  name: string;
  target: string;
  progress: number;
}

interface TeamDeadline {
  name: string;
  date: string;
}

interface TeamPerformanceProps {
  metrics: TeamMetric[];
  contributors: Contributor[];
  goals: TeamGoal[];
  deadlines: TeamDeadline[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({
  metrics,
  contributors,
  goals,
  deadlines,
}) => {
  return (
    <div className="space-y-6">
      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="rounded-xl shadow-sm overflow-hidden border"
          >
            <div className="p-5 flex justify-between items-center">
              <div>
                <p className="text-black text-opacity-80 text-sm font-medium">{metric.title}</p>
                <h3 className="text-3xl font-bold mt-1 text-black">{metric.value}</h3>
              </div>
              <div 
                className="p-3 rounded-full text-2xl"
                style={{ backgroundColor: `${metric.color}80` }}
              >
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Progress Overview */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Team Progress Overview</h3>
        </div>
        <div className="p-5">
          <div className="h-[200px] flex items-center justify-center border rounded-md">
            Line Chart: Team Collaboration & Task Completion (Placeholder)
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Top Contributors</h3>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Contributions</th>
                  <th className="px-4 py-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((contributor, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{contributor.name}</td>
                    <td className="px-4 py-3">{contributor.contributions}</td>
                    <td className="px-4 py-3">{contributor.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Team Goals */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Active Team Goals</h3>
        </div>
        <div className="p-5 space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">🏆 {goal.name}</p>
                <p className="text-sm text-gray-500">{goal.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">Target: {goal.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Team Events/Deadlines */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Upcoming Team Events</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-2">
            {deadlines.map((deadline, index) => (
              <li key={index} className="flex justify-between py-2 border-b last:border-0">
                <span>- {deadline.name}</span>
                <span className="text-gray-500">{deadline.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;

// Example usage:
export const TeamPerformanceDemo: React.FC = () => {
  const demoMetrics: TeamMetric[] = [
    { title: "Active Members", value: "18", icon: "👥", color: "#4F46E5" },
    { title: "Projects", value: "5", icon: "📁", color: "#10B981" },
    { title: "Avg. Completion Rate", value: "87%", icon: "✅", color: "#F59E0B" },
    { title: "Collaboration Score", value: "92", icon: "🤝", color: "#EF4444" },
  ];

  const demoContributors: Contributor[] = [
    { name: "Alice Johnson", contributions: 34, role: "Team Lead" },
    { name: "Bob Smith", contributions: 28, role: "Developer" },
    { name: "Carol Lee", contributions: 25, role: "QA" },
  ];

  const demoGoals: TeamGoal[] = [
    { name: "Complete Project Alpha", target: "100%", progress: 80 },
    { name: "Onboard 3 New Members", target: "3 Members", progress: 66 },
  ];

  const demoDeadlines: TeamDeadline[] = [
    { name: "Sprint Review Meeting", date: "Feb 20" },
    { name: "Project Alpha Deadline", date: "Mar 1" },
  ];

  return (
    <TeamPerformance
      metrics={demoMetrics}
      contributors={demoContributors}
      goals={demoGoals}
      deadlines={demoDeadlines}
    />
  );
}; 