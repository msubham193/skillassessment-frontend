

import React, { useEffect, useState } from "react";
import SideNav from "@/Components/Traning Partner/SideNav";
import TopBar from "@/Components/Traning Partner/TopBar";
import CenterPageContent from "@/Components/Traning Partner/ui/CenterPageContent";

const CentersPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
           <CenterPageContent />
          </div>
        </main>
      </div>
    </div>
    )
  };
  
  export default CentersPage;
