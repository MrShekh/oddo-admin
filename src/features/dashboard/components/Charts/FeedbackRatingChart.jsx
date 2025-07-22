import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { rating: "5⭐", percent: 60 },
  { rating: "4⭐", percent: 25 },
  { rating: "3⭐", percent: 10 },
  { rating: "2⭐", percent: 3 },
  { rating: "1⭐", percent: 2 },
];

const FeedbackRatingChart = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="font-semibold mb-4">Feedback Rating Breakdown</h3>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="percent" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default FeedbackRatingChart; 