import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", swaps: 30 },
  { name: "Feb", swaps: 45 },
  { name: "Mar", swaps: 60 },
  { name: "Apr", swaps: 50 },
  { name: "May", swaps: 80 },
  { name: "Jun", swaps: 65 },
];

const SwapsOverTimeBar = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="font-semibold mb-4">Swaps Over Time</h3>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="swaps" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default SwapsOverTimeBar; 