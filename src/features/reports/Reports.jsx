import React from "react";
import ReportCard from "./components/ReportCard";

const Reports = () => (
  <div className="w-full min-h-screen bg-gray-50">
    <div className="px-10">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px] max-w-md">
          <ReportCard title="User Activity Logs" />
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px] max-w-md">
          <ReportCard title="Feedback Logs" />
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px] max-w-md">
          <ReportCard title="Swap Statistics" />
        </div>
      </div>
    </div>
  </div>
);

export default Reports; 