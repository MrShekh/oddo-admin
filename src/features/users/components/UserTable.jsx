import React from "react";
import UserTableRow from "./UserTableRow";

const headers = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "swaps", label: "Swaps" },
  { key: "rating", label: "Rating" },
  { key: "actions", label: "Actions", sortable: false },
];

const UserTable = ({ users, onView, onBanToggle, onSort, sortKey, sortOrder }) => (
  <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
    <table className="min-w-full text-left">
      <thead>
        <tr className="border-b">
          {headers.map(h => (
            <th
              key={h.key}
              className={`px-6 py-3 font-semibold text-gray-700 ${h.sortable === false ? '' : 'cursor-pointer select-none'}`}
              onClick={h.sortable === false ? undefined : () => onSort(h.key)}
            >
              {h.label}
              {h.sortable === false ? null : sortKey === h.key ? (
                <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserTableRow key={user.email} user={user} onView={onView} onBanToggle={onBanToggle} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable; 