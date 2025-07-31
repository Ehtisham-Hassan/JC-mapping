import React from 'react';

interface SalesMetric {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface Product {
  name: string;
  unitsSold: number;
  revenue: string;
}

interface SalesGoal {
  name: string;
  target: string;
  progress: number;
}

interface Deadline {
  name: string;
  date: string;
}

interface SalesComponentProps {
  metrics: SalesMetric[];
  products: Product[];
  goals: SalesGoal[];
  deadlines: Deadline[];
}

const SalesComponent: React.FC<SalesComponentProps> = ({
  metrics,
  products,
  goals,
  deadlines,
}) => {
  return (
    <div className="space-y-6">
      {/* Sales Overview Cards */}
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

      {/* Sales Progress Overview */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Sales Progress Overview</h3>
        </div>
        <div className="p-5">
          <div className="h-[200px] flex items-center justify-center border rounded-md">
            Line Chart: Weekly and Monthly Revenue Growth
            {/* Placeholder for actual chart implementation */}
          </div>
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Top Performing Products</h3>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">Product Name</th>
                  <th className="px-4 py-3 text-left">Units Sold</th>
                  <th className="px-4 py-3 text-left">Revenue Generated</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.unitsSold}</td>
                    <td className="px-4 py-3">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Sales Goals */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Active Sales Goals</h3>
        </div>
        <div className="p-5 space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">🎯 {goal.name}</p>
                <p className="text-sm text-gray-500">{goal.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">Target: {goal.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
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

export default SalesComponent;

// Example usage:
export const SalesComponentDemo: React.FC = () => {
  const demoMetrics: SalesMetric[] = [
    { title: "Deals Closed", value: "124", icon: "💵", color: "#4F46E5" },
    { title: "Revenue Generated", value: "$45,670", icon: "📈", color: "#10B981" },
    { title: "New Clients", value: "28", icon: "👥", color: "#F59E0B" },
    { title: "Conversion Rate", value: "12.5%", icon: "🔥", color: "#EF4444" },
  ];

  const demoProducts: Product[] = [
    { name: "Product A", unitsSold: 120, revenue: "$24,000" },
    { name: "Product B", unitsSold: 90, revenue: "$18,000" },
    { name: "Product C", unitsSold: 75, revenue: "$15,000" },
  ];

  const demoGoals: SalesGoal[] = [
    { name: "Target: $100K Revenue", target: "$100,000", progress: 65 },
    { name: "Target: 50 New Clients", target: "50 New Clients", progress: 80 },
  ];

  const demoDeadlines: Deadline[] = [
    { name: "Q2 Sales Campaign Launch", date: "May 10" },
    { name: "Client Follow-up Deadline", date: "May 15" },
  ];

  return (
    <SalesComponent
      metrics={demoMetrics}
      products={demoProducts}
      goals={demoGoals}
      deadlines={demoDeadlines}
    />
  );
};
