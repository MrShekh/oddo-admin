import React, { useState, useMemo, useEffect } from "react";
import UserSearch from "./components/UserSearch";
import UserFilters from "./components/UserFilters";
import Pagination from "./components/Pagination";
import UserTable from "./components/UserTable";
import UserProfileModal from "./UserProfileModal";

const API_BASE = "https://oddo-hackathon.onrender.com";
const PAGE_SIZE = 9;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileUser, setProfileUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch users from backend
  useEffect(() => {
    if (!token) return;

    let url = `${API_BASE}/api/admin/users`;
    if (status === "Banned") url += "?banned=true";
    else if (status === "Active") url += "?banned=false";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const actualUsers = Array.isArray(data) ? data : data.users;
        setUsers(actualUsers || []);
      })
      .catch(() => setUsers([]));
  }, [status, token]);

  // Search by skill
  useEffect(() => {
    if (!token || search.trim() === "") return;

    const timeout = setTimeout(() => {
      fetch(`${API_BASE}/api/admin/search-skill?skill=${encodeURIComponent(search)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const actualUsers = Array.isArray(data) ? data : data.users;
          setUsers(actualUsers || []);
        })
        .catch(() => {});
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, token]);

  // Filtering, searching, sorting
  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    if (search) {
      filtered = filtered.filter((u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (role !== "All") {
      filtered = filtered.filter((u) => u.role?.toLowerCase() === role.toLowerCase());
    }
    if (status !== "All") {
      filtered = filtered.filter((u) => u.status?.toLowerCase() === status.toLowerCase());
    }
    filtered.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [users, search, role, status, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleView = (user) => {
    setProfileUser(user);
    setProfileOpen(true);
  };

  const handleBanToggle = async (user, ban) => {
    try {
      const endpoint = ban ? `/api/admin/users/${user._id}/ban` : `/api/admin/users/${user._id}/unban`;
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to update user status");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, status: ban ? "banned" : "active" } : u
        )
      );
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  const handleFlagSkill = async (user, skill) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user._id}/flag-skill`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill }),
      });
      if (!res.ok) throw new Error("Failed to flag skill");
      alert("Skill flagged!");
    } catch (err) {
      alert("Error flagging skill: " + err.message);
    }
  };

  const handleUnflagSkill = async (user, skill) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user._id}/unflag-skill`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill }),
      });
      if (!res.ok) throw new Error("Failed to unflag skill");
      alert("Skill unflagged!");
    } catch (err) {
      alert("Error unflagging skill: " + err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-10">
        <UserSearch value={search} onSearch={setSearch} />
        <UserFilters role={role} status={status} onRoleChange={setRole} onStatusChange={setStatus} />
      </div>
      <div className="px-10">
        <UserTable
          users={pagedUsers}
          onView={handleView}
          onBanToggle={handleBanToggle}
          onSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <UserProfileModal open={profileOpen} user={profileUser} onClose={() => setProfileOpen(false)} />
      </div>
    </div>
  );
};

export default Users;
