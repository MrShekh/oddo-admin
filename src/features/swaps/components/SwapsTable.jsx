import React from "react";

const statusStyles = {
  Pending: "bg-gray-100 text-gray-800",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-200 text-gray-500",
};

const SwapsTable = ({ swaps, onView }) => (
  <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
    <table className="min-w-full text-left">
      <thead>
        <tr>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">From User</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">To User</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">Skill Offered</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">Skill Requested</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {swaps.map((swap, idx) => (
          <tr key={idx} className="border-b last:border-0">
            <td className="px-6 py-4 whitespace-nowrap">{swap.from}</td>
            <td className="px-6 py-4 whitespace-nowrap">{swap.to}</td>
            <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">{swap.offered}</td>
            <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">{swap.requested}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[swap.status]}`}>{swap.status}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-blue-600 hover:underline font-medium cursor-pointer" onClick={() => onView && onView(swap)}>View</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SwapsTable; 