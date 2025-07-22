import React from "react";

const stats = [
  { label: "Total Users", value: "1,234", color: "text-purple-500" },
  { label: "Swaps Today", value: "56", color: "text-orange-500" },
  { label: "Flagged Skills", value: "12", color: "text-red-500" },
  { label: "Active Users", value: "345", color: "text-green-500" },
];

const StatsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat) => (
      <div key={stat.label} className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-start">
        <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
        <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
      </div>
    ))}
  </div>
);

export default StatsCards; 