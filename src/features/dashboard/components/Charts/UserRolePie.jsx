import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Regular Users", value: 70 },
  { name: "Admins", value: 20 },
  { name: "Banned Users", value: 10 },
];
const COLORS = ["#6366f1", "#10b981", "#f87171"];

const UserRolePie = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="font-semibold mb-4">User Role Distribution</h3>
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

export default UserRolePie; 