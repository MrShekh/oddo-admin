import React, { useState, useMemo, useEffect } from "react";
import SwapsTable from "./components/SwapsTable";
import SwapsFilters from "./components/SwapsFilters";
import SwapsModal from "./components/SwapsModal";
import Pagination from "../users/components/Pagination";

const API_URL = "https://687a0b48abb83744b7eb22f4.mockapi.io/api/v1/Swaps";
const PAGE_SIZE = 9;

const quickDateOptions = [
  { label: "Today", days: 0 },
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
];

function isWithinDays(dateStr, days) {
  const date = new Date(dateStr);
  const now = new Date();
  if (days === 0) return date.toDateString() === now.toDateString();
  const diff = (now - date) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

const Swaps = () => {
  const [swapsData, setSwapsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [skill, setSkill] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [quickDate] = useState("");
  const [user, setUser] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  // 🟡 Fetch Data from Mock API
useEffect(() => {
  const fetchSwaps = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // Transform data to match SwapsTable structure
      const transformedData = data.map((item) => ({
        from: item.requester_name,
        to: item.recipient_name,
        offered: item.offeredSkill,
        requested: item.requestedSkill,
        status: item.status?.[0] || "Pending", // fallback to "Pending" if empty
        raw: item, // optional: keep raw object for modal/view
      }));

      setSwapsData(transformedData);
    } catch (error) {
      console.error("Failed to fetch swaps data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchSwaps();
}, []);


  // 🟡 Extract unique skills for dropdown
  const allSkills = useMemo(() => {
    return Array.from(new Set(swapsData.flatMap(s => [s.offered, s.requested])));
  }, [swapsData]);

  // 🟡 Filter logic
  const filteredSwaps = useMemo(() => {
    let filtered = [...swapsData];
    if (status !== "All") filtered = filtered.filter(s => s.status === status);
    if (skill) filtered = filtered.filter(s => s.offered?.toLowerCase().includes(skill.toLowerCase()) || s.requested?.toLowerCase().includes(skill.toLowerCase()));
    if (user) filtered = filtered.filter(s =>
      s.from?.toLowerCase().includes(user.toLowerCase()) ||
      s.to?.toLowerCase().includes(user.toLowerCase())
    );
    if (dateFrom) filtered = filtered.filter(s => new Date(s.date) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter(s => new Date(s.date) <= new Date(dateTo));
    if (quickDate) {
      const days = quickDateOptions.find(q => q.label === quickDate)?.days;
      if (days !== undefined) filtered = filtered.filter(s => isWithinDays(s.date, days));
    }
    if (sort === "newest") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "skill") filtered.sort((a, b) => a.offered.localeCompare(b.offered));
    return filtered;
  }, [swapsData, status, skill, user, dateFrom, dateTo, quickDate, sort]);

  const totalPages = Math.ceil(filteredSwaps.length / PAGE_SIZE);
  const pagedSwaps = filteredSwaps.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [status, skill, user, dateFrom, dateTo, quickDate, sort]);

  const handleView = (swap) => {
    setSelectedSwap(swap);
    setModalOpen(true);
  };

  if (loading) return <div className="p-10 text-center">Loading swaps...</div>;

  return (
    <div className="w-full px-10 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SwapsFilters
          status={status} setStatus={setStatus}
          skill={skill} setSkill={setSkill} allSkills={allSkills}
          user={user} setUser={setUser}
          dateFrom={dateFrom} setDateFrom={setDateFrom}
          dateTo={dateTo} setDateTo={setDateTo}
          sort={sort} setSort={setSort}
        />
      </div>
      <SwapsTable swaps={pagedSwaps} onView={handleView} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <SwapsModal open={modalOpen} swap={selectedSwap} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Swaps;
