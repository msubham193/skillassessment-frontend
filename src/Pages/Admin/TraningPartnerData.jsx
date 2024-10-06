import React from "react";

import TpNotificationBoxContent from "@/Components/Admin/Content/TpNotificationBoxContent";
import TopBar from "@/Components/Admin/Content/TopBar";
import SideNav from "@/Components/Admin/Content/SideNav";
 
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
