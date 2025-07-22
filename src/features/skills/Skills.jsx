import React, { useState, useMemo } from "react";
import SkillTable from "./components/SkillTable";
import SkillModal from "./components/SkillModal";
import Pagination from "../users/components/Pagination";

const initialModerationData = [
  { user: "Lucas Bennett", skill: "Graphic Design", type: "Offered", flag: "Inappropriate Content", submitted: "2024-07-01", description: "Designing graphics for various media and platforms." },
  { user: "Sophia Carter", skill: "Web Development", type: "Wanted", flag: "Spam", submitted: "2024-07-02", description: "Looking to learn and collaborate on web development projects." },
  { user: "Owen Hayes", skill: "Photography", type: "Offered", flag: "Misleading Information", submitted: "2024-07-03", description: "Professional photography services for events and portraits." },
  { user: "Ava Mitchell", skill: "Content Writing", type: "Offered", flag: "Duplicate Skill", submitted: "2024-07-04", description: "Writing engaging content for blogs and websites." },
  { user: "Caleb Reed", skill: "Video Editing", type: "Wanted", flag: "Offensive Language", submitted: "2024-07-05", description: "Seeking help with editing videos for social media." },
  { user: "Priya Singh", skill: "UI/UX Design", type: "Offered", flag: "Spam", submitted: "2024-07-06", description: "Offering UI/UX design services for web and mobile apps." },
  { user: "David Lee", skill: "Public Speaking", type: "Wanted", flag: "Inappropriate Content", submitted: "2024-07-07", description: "Looking for a mentor to improve public speaking skills." },
  { user: "Emily Zhang", skill: "Data Analysis", type: "Offered", flag: "Duplicate Skill", submitted: "2024-07-08", description: "Providing data analysis and visualization services." },
  { user: "Carlos Rivera", skill: "Marketing", type: "Wanted", flag: "Misleading Information", submitted: "2024-07-09", description: "Seeking marketing advice for a startup project." },
  { user: "Mia Wilson", skill: "Mentoring", type: "Offered", flag: "Offensive Language", submitted: "2024-07-10", description: "Mentoring students in coding and career development." },
  { user: "John Doe", skill: "App Development", type: "Offered", flag: "Spam", submitted: "2024-07-11", description: "Building mobile apps for Android and iOS platforms." },
  { user: "Sara Kim", skill: "Copywriting", type: "Wanted", flag: "Inappropriate Content", submitted: "2024-07-12", description: "Looking for a copywriter for website content." },
];

const PAGE_SIZE = 9;
const flagStatusOptions = ["All", "Flagged", "Unreviewed", "Approved"];
const skillTypeOptions = ["All", "Offered", "Wanted"];
const sortOptions = [
  { value: "submitted", label: "Submission Date" },
  { value: "user", label: "User Name" },
  { value: "flag", label: "Flag Status" },
];

const getFlagStatus = (flag) => {
  if (!flag) return "Unreviewed";
  if (["Spam", "Inappropriate Content", "Misleading Information", "Duplicate Skill", "Offensive Language"].includes(flag)) return "Flagged";
  if (flag === "Approved") return "Approved";
  return flag;
};

const Skills = () => {
  const [moderationData, setModerationData] = useState(initialModerationData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [startEditing, setStartEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [flagStatus, setFlagStatus] = useState("All");
  const [skillType, setSkillType] = useState("All");
  const [sortKey, setSortKey] = useState("submitted");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filtering, searching, sorting
  const filteredSkills = useMemo(() => {
    let filtered = [...moderationData];
    if (search) {
      filtered = filtered.filter(s =>
        s.skill.toLowerCase().includes(search.toLowerCase()) ||
        s.user.toLowerCase().includes(search.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (flagStatus !== "All") {
      filtered = filtered.filter(s => getFlagStatus(s.flag) === flagStatus);
    }
    if (skillType !== "All") {
      filtered = filtered.filter(s => s.type === skillType);
    }
    filtered.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (sortKey === "user") {
        aVal = a.user.toLowerCase();
        bVal = b.user.toLowerCase();
      }
      if (sortKey === "flag") {
        aVal = getFlagStatus(a.flag);
        bVal = getFlagStatus(b.flag);
      }
      if (sortKey === "submitted") {
        aVal = a.submitted;
        bVal = b.submitted;
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [moderationData, search, flagStatus, skillType, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / PAGE_SIZE);
  const pagedSkills = filteredSkills.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleView = (skill) => {
    setSelectedSkill(skill);
    setModalOpen(true);
    setStartEditing(false);
  };

  const handleApprove = (skill) => {
    setModerationData(data => data.filter(s => s !== skill));
    setModalOpen(false);
  };
  const handleReject = (skill) => {
    setModerationData(data => data.filter(s => s !== skill));
    setModalOpen(false);
  };
  const handleEdit = (updatedSkill) => {
    setModerationData(data => data.map(s => (s === selectedSkill ? updatedSkill : s)));
    setModalOpen(false);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(value);
      setSortOrder("asc");
    }
  };

  // Reset to page 1 on filter/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, flagStatus, skillType, sortKey, sortOrder]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-10">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Search by keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
            value={flagStatus}
            onChange={e => setFlagStatus(e.target.value)}
          >
            {flagStatusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
            value={skillType}
            onChange={e => setSkillType(e.target.value)}
          >
            {skillTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
            value={sortKey}
            onChange={handleSortChange}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="px-10">
        <SkillTable
          skills={pagedSkills}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={(skill) => { setSelectedSkill(skill); setModalOpen(true); setStartEditing(true); }}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <SkillModal
        open={modalOpen}
        skill={selectedSkill}
        onClose={() => setModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        onEdit={handleEdit}
        startEditing={startEditing}
      />
    </div>
  );
};

export default Skills; 