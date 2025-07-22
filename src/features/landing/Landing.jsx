import React, { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" fill="#6366f1" /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M8 11h8M8 15h4" /></svg>
    ),
    title: "Skill Listing",
    desc: "List your skills and discover others to exchange with. Showcase your expertise and connect with like-minded learners.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6366f1" /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
    ),
    title: "Skill Requests",
    desc: "Request skills you want to learn or need help with. Find the right people to guide you on your journey.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="#6366f1" /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
    ),
    title: "Community Collaboration",
    desc: "Connect, chat, and grow your network. Collaborate on projects and learn together as a community.",
  },
];

const Landing = () => {
  const [view, setView] = useState("landing");

  if (view === "login") return <Login onSwitch={setView} />;
  if (view === "register") return <Register onSwitch={setView} />;
  if (view === "dashboard") return <Dashboard />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-md w-full">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 text-center">SkillSwap</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">Exchange skills. Learn together. Grow faster.</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-200" onClick={() => setView("login")}>Get Started / Login</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Everything you need to swap and grow skills</h2>
          <p className="text-lg text-gray-600 text-center mb-10">Powerful tools to help you connect, learn, and collaborate with others.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {features.map((feature, idx) => (
              <div key={idx} className="flex-1 bg-white rounded-xl shadow-md p-6 flex items-start gap-4 min-w-[250px]">
                <div className="bg-indigo-500 rounded-lg p-2 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing; 