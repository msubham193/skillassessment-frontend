/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./pages/Dashboard/Sidebar";


function snaLayout() {
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

export default snaLayout;
