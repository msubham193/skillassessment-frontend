import React from "react";
import TopBar from "@/Components/Admin/TopBar";
import SideNav from "@/Components/Admin/SideNav";
import TpNotificationBoxContent from "../../Components/Admin/TpNotificationBoxContent";

const TpNotification = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/*top Bar */}
        <TopBar />
        {/* side bar */}
        <div className="min-h-screen bg-white text-black flex">
          <SideNav />

          {/* main page */}

          <TpNotificationBoxContent>{children}</TpNotificationBoxContent>
        </div>
      </div>
    </>
  );
};

export default TpNotification;
