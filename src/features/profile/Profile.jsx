import React, { useState } from "react";

const Profile = () => {
  // Placeholder user data
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@skillswap.com",
    role: "Administrator",
    password: ""
  });
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEdit(false);
    // Add save logic here
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-700 mb-2">
          {profile.name[0]}
        </div>
        <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
        <p className="text-gray-500 mb-2">{profile.email}</p>
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold">{profile.role}</span>
      </div>
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            disabled={!edit}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            disabled={!edit}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="••••••••"
            disabled={!edit}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          {!edit ? (
            <button
              type="button"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 