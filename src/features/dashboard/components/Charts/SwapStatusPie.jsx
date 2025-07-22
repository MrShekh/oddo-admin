import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pending", value: 25 },
  { name: "Accepted", value: 50 },
  { name: "Rejected", value: 15 },
  { name: "Cancelled", value: 10 },
];
const COLORS = ["#fbbf24", "#10b981", "#f87171", "#a3a3a3"];

const SwapStatusPie = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="font-semibold mb-4">Swap Status Distribution</h3>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default SwapStatusPie; 