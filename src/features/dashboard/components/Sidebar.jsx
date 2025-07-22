import React from "react";

const navItems = [
  { name: "Home", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0h-2a2 2 0 01-2-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 01-2 2H3" /></svg>
  ) },
  { name: "Users", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
  ) },
  { name: "Skills", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
  ) },
  { name: "Swaps", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
  ) },
  { name: "Reports", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h6M8 17h4" /></svg>
  ) },
  { name: "Profile", icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2" /></svg>
  ) },
];

const Sidebar = ({ active, onNavigate }) => (
  <aside className="w-64 min-h-screen bg-gray-900 flex flex-col justify-between py-8 px-4 sticky top-0 h-screen">
    <div>
      <div className="text-2xl font-extrabold text-white mb-10 px-2 tracking-wide">SkillSwap Admin</div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 focus:outline-none ${isActive ? 'bg-gray-800 text-white font-bold' : 'text-gray-200 hover:bg-gray-800 hover:text-white'}`}
            >
              {React.cloneElement(item.icon, { className: `w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}` })}
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
    <div className="px-2 mt-10">
      <a href="#" className="flex items-center text-gray-400 hover:text-indigo-400 text-sm">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to SkillSwap
      </a>
    </div>
  </aside>
);

export default Sidebar; 