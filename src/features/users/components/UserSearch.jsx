import React from "react";

const UserSearch = ({ value, onSearch }) => (
  <input
    type="text"
    value={value}
    onChange={e => onSearch(e.target.value)}
    placeholder="Search by name or email..."
    className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
  />
);

export default UserSearch; 