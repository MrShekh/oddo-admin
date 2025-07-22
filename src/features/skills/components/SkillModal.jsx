import React, { useState } from "react";

const flagColors = {
  "Inappropriate Content": "text-blue-600 hover:underline cursor-pointer",
  "Spam": "text-blue-600 hover:underline cursor-pointer",
  "Misleading Information": "text-blue-600 hover:underline cursor-pointer",
  "Duplicate Skill": "text-blue-600 hover:underline cursor-pointer",
  "Offensive Language": "text-blue-600 hover:underline cursor-pointer",
};

const actionStyles = {
  approve: "text-green-600 hover:underline font-medium cursor-pointer",
  reject: "text-red-600 hover:underline font-medium cursor-pointer",
  edit: "text-blue-600 hover:underline font-medium cursor-pointer",
  delete: "text-red-600 hover:underline font-medium cursor-pointer",
  save: "bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors",
  cancel: "bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors",
};

const skillTypeOptions = ["Offered", "Wanted"];
const flagReasonOptions = [
  "",
  "Inappropriate Content",
  "Spam",
  "Misleading Information",
  "Duplicate Skill",
  "Offensive Language",
  "Approved"
];

const SkillModal = ({ open, skill, onClose, onApprove, onReject, onEdit, startEditing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  React.useEffect(() => {
    if (open && skill) {
      setIsEditing(!!startEditing);
      setEditData({ ...skill });
    }
  }, [open, skill, startEditing]);

  if (!open || !skill) return null;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...skill });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...skill });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h3 className="text-xl font-bold mb-2">Skill Details</h3>
        <div className="mb-4 text-xs text-gray-500 flex flex-col gap-1">
          <span>
            <span className="font-semibold">Submitted By:</span> <span className="text-blue-600 hover:underline cursor-pointer">{skill.user}</span>
          </span>
          <span>
            <span className="font-semibold">Submission Date:</span> {skill.submitted}
          </span>
        </div>
        {isEditing ? (
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div>
              <label className="block text-sm font-semibold mb-1">Skill Name</label>
              <input
                name="skill"
                value={editData.skill}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Skill Type</label>
              <select
                name="type"
                value={editData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
                required
              >
                {skillTypeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Flag Reason</label>
              <select
                name="flag"
                value={editData.flag}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
              >
                {flagReasonOptions.map(opt => (
                  <option key={opt} value={opt}>{opt || "None"}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className={actionStyles.save}>Save Changes</button>
              <button type="button" className={actionStyles.cancel} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <div className="mb-2">
                <span className="font-semibold">Skill Name:</span> {skill.skill}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Type:</span> <span className="capitalize">{skill.type}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Flag Reason:</span> <span className={flagColors[skill.flag] || "text-blue-600"}>{skill.flag}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Submitted On:</span> {skill.submitted}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Description:</span> {skill.description}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className={actionStyles.approve} onClick={() => onApprove(skill)}>Approve</button>
              <button className={actionStyles.reject} onClick={() => onReject(skill)}>Reject</button>
              <button className={actionStyles.edit} onClick={handleEditClick}>Edit</button>
              <button className={actionStyles.delete} onClick={onClose}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillModal; 