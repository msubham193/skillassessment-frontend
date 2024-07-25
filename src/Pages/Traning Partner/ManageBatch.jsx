import React from "react";
import TopBar from "@/Components/Traning Partner/TopBar";
import SideNav from "@/Components/Traning Partner/SideNav";
import ManageBtachForm from "@/Components/Traning Partner/ui/ManageBtachForm";

const ManageBatch = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <SideNav /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <ManageBtachForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageBatch;

