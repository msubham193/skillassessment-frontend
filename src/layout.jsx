/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./Components/Assessment Agency/ui/SideBar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <SideBar />
        <main className="flex-grow p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <h1>This is footer</h1>
    </div>
  );
}

export default Layout;
