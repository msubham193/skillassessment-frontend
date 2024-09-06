/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sna/Sidebar";
import Footer from "./Components/Static/Footer";
function SnaLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <SideBar />
        <main className="flex-grow p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SnaLayout;
