import React from "react";

const statusOptions = ["All", "Pending", "Accepted", "Rejected", "Cancelled"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "skill", label: "Skill (A-Z)" },
];

const SwapsFilters = ({
  status, setStatus,
  skill, setSkill, allSkills,
  user, setUser,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
  sort, setSort
}) => (
  <div className="flex gap-2 flex-wrap">
    <select
      className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
      value={status}
      onChange={e => setStatus(e.target.value)}
    >
      {statusOptions.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <input
      type="text"
      className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none"
      placeholder="Skill (offered/requested)"
      value={skill}
      onChange={e => setSkill(e.target.value)}
      list="skills-list"
    />
    <datalist id="skills-list">
      {allSkills.map(s => <option key={s} value={s} />)}
    </datalist>
    <input
      type="text"
      className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none"
      placeholder="User name/email"
      value={user}
      onChange={e => setUser(e.target.value)}
    />
    <input
      type="date"
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
      value={dateFrom}
      onChange={e => setDateFrom(e.target.value)}
    />
    <span className="text-gray-500 self-center">to</span>
    <input
      type="date"
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
      value={dateTo}
      onChange={e => setDateTo(e.target.value)}
    />
    <select
      className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
      value={sort}
      onChange={e => setSort(e.target.value)}
    >
      {sortOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default SwapsFilters; 