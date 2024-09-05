/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./Components/Assessment Agency/ui/SideBar";
import Footer from "./Components/Static/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <SideBar />
        <main className="flex-grow sm:ml-64 ml-20 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Layout;
