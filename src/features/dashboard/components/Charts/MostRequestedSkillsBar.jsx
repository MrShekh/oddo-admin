import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { skill: "Web Dev", requests: 40 },
  { skill: "Design", requests: 32 },
  { skill: "Writing", requests: 28 },
  { skill: "Marketing", requests: 22 },
  { skill: "Data Analysis", requests: 18 },
];

const MostRequestedSkillsBar = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="font-semibold mb-4">Most Requested Skills</h3>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="skill" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="requests" fill="#f59e42" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MostRequestedSkillsBar; 