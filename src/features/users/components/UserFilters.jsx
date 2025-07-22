import React from "react";

const UserFilters = ({ role, status, onRoleChange, onStatusChange }) => (
  <div className="flex gap-4 mb-4">
    <select
      value={role}
      onChange={e => onRoleChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="All">All Roles</option>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </select>
    <select
      value={status}
      onChange={e => onStatusChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="All">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Banned">Banned</option>
    </select>
  </div>
);

export default UserFilters; 