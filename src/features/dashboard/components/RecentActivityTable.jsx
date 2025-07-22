import React from "react";

const activities = [
  { user: "Lucas Bennett", skill: "Photography", status: "Completed", date: "2024-03-15" },
  { user: "Sophia Carter", skill: "Web Development", status: "In Progress", date: "2024-03-14" },
  { user: "Owen Hayes", skill: "Graphic Design", status: "Pending", date: "2024-03-13" },
  { user: "Chloe Reed", skill: "Data Analysis", status: "Completed", date: "2024-03-12" },
  { user: "Caleb Foster", skill: "Content Writing", status: "In Progress", date: "2024-03-11" },
];

const statusStyles = {
  "Completed": "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Pending": "bg-yellow-100 text-yellow-800",
};

const skillLinks = {
  "Photography": "#",
  "Web Development": "#",
  "Graphic Design": "#",
  "Data Analysis": "#",
  "Content Writing": "#",
};

const RecentActivityTable = () => (
  <div className="bg-white rounded-xl shadow-md overflow-x-auto">
    <table className="min-w-full text-left">
      <thead>
        <tr className="border-b">
          <th className="px-6 py-3 font-semibold text-gray-700">User</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Skill</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
          <th className="px-6 py-3 font-semibold text-gray-700">Date</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((a, idx) => (
          <tr key={idx} className="border-b last:border-0">
            <td className="px-6 py-4 whitespace-nowrap">{a.user}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a href={skillLinks[a.skill]} className="text-indigo-600 hover:underline">{a.skill}</a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[a.status] || 'bg-gray-200 text-gray-800'}`}>{a.status}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{a.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentActivityTable; 