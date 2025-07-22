import React from "react";

const flagColors = {
  "Inappropriate Content": "text-blue-600 hover:underline cursor-pointer",
  "Spam": "text-blue-600 hover:underline cursor-pointer",
  "Misleading Information": "text-blue-600 hover:underline cursor-pointer",
  "Duplicate Skill": "text-blue-600 hover:underline cursor-pointer",
  "Offensive Language": "text-blue-600 hover:underline cursor-pointer",
};

const actionStyles = {
  view: "text-blue-600 hover:underline font-medium cursor-pointer",
  approve: "text-green-600 hover:underline font-medium cursor-pointer",
  reject: "text-red-600 hover:underline font-medium cursor-pointer",
  edit: "text-blue-600 hover:underline font-medium cursor-pointer",
};

const SkillTable = ({ skills, onView, onApprove, onReject, onEdit }) => (
  <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
    <table className="min-w-full text-left">
      <thead>
        <tr className="border-b">
          <th className="px-6 py-3 font-semibold text-gray-700">User</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Skill</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Flag Reason</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((row, idx) => (
          <tr className="border-b last:border-0" key={idx}>
            <td className="px-6 py-4 whitespace-nowrap">{row.user}</td>
            <td className="px-6 py-4 whitespace-nowrap">{row.skill}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={flagColors[row.flag] || "text-blue-600 hover:underline cursor-pointer"}>{row.flag}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2">
              <span className={actionStyles.view} onClick={() => onView(row)}>View</span>
              <span className="text-gray-400">|</span>
              <span className={actionStyles.approve} onClick={() => onApprove(row)}>Approve</span>
              <span className="text-gray-400">|</span>
              <span className={actionStyles.reject} onClick={() => onReject(row)}>Reject</span>
              <span className="text-gray-400">|</span>
              <span className={actionStyles.edit} onClick={() => onEdit(row)}>Edit</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SkillTable; 