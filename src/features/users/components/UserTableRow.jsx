import React from "react";

const statusStyles = {
  "Active": "bg-gray-100 text-gray-800",
  "Banned": "bg-red-100 text-red-700",
};

const UserTableRow = ({ user, onView, onBanToggle }) => (
  <tr className="border-b last:border-0">
    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">{user.email}</td>
    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[user.status] || 'bg-gray-200 text-gray-800'}`}>{user.status}</span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center">{user.swaps ?? '—'}</td>
    <td className="px-6 py-4 whitespace-nowrap text-center">{user.rating ? `${user.rating}⭐` : '—'}</td>
    <td className="px-6 py-4 whitespace-nowrap space-x-2">
      <button className="text-blue-600 hover:underline font-medium" onClick={() => onView(user)}>View</button>
      <span className="text-gray-400">|</span>
      {user.status === "Banned" ? (
        <button className="text-green-600 hover:underline font-medium" onClick={() => onBanToggle(user, false)}>Unban</button>
      ) : (
        <button className="text-red-600 hover:underline font-medium" onClick={() => onBanToggle(user, true)}>Ban</button>
      )}
    </td>
  </tr>
);

export default UserTableRow; 