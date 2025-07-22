import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import RecentActivityTable from "./components/RecentActivityTable";
import UserRolePie from "./components/Charts/UserRolePie";
import SwapsOverTimeBar from "./components/Charts/SwapsOverTimeBar";
import SwapStatusPie from "./components/Charts/SwapStatusPie";
import MostRequestedSkillsBar from "./components/Charts/MostRequestedSkillsBar";
import FeedbackRatingChart from "./components/Charts/FeedbackRatingChart";
import Users from "../users/Users";
import Skills from "../skills/Skills";
import Swaps from "../swaps/Swaps";
import Reports from "../reports/Reports";
import Profile from "../profile/Profile";

const pageHeadings = {
  Home: "Dashboard",
  Users: "Users",
  Skills: "Skills",
  Swaps: "Swaps",
  Reports: "Reports",
  Profile: "Profile",
};

const pageComponents = {
  Home: () => (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <UserRolePie />
        <SwapsOverTimeBar />
        <SwapStatusPie />
        <MostRequestedSkillsBar />
        <FeedbackRatingChart />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <RecentActivityTable />
      </div>
    </>
  ),
  Users: Users,
  Skills: Skills,
  Swaps: Swaps,
  Reports: Reports,
  Profile: Profile,
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const ActiveComponent = pageComponents[activePage];
  const heading = pageHeadings[activePage];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <main className="flex-1 w-full">
        <div className="flex items-start">
          <h1 className="text-3xl font-bold mt-0 ml-0 mb-8 pt-8 pl-10">{heading}</h1>
        </div>
        <div className="px-10">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 