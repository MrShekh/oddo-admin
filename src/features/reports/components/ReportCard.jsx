import React, { useState } from "react";
import { downloadReport } from "../../../api/report"; // Adjust import as per your folder

const ReportCard = ({ title, reportType }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleDownload = async () => {
    try {
      await downloadReport(reportType);
    } catch (err) {
      alert("Failed to download report: " + err.message);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-800 transition-colors"
        >
          Download CSV
        </button>
        <button
          disabled
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold shadow cursor-not-allowed"
        >
          Download Excel (Coming soon)
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
