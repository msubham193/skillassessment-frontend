import SideNav from "@/Components/Admin/SideNav";
import TopBar from "@/Components/Admin/TopBar";
import TpDetailsBOx from "@/Components/Admin/TpDetailsBOx";
import React from "react";
import { useParams } from "react-router-dom";

const TpDetails = () => {
  const { id } = useParams();

  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/*top Bar */}
        <TopBar />
        {/* side bar */}
        <div className="min-h-screen bg-white text-black flex">
          <SideNav />

          {/* main page */}
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                Basic Info!
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s is all  detail's of the Traning Partner!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* add the functionality like search and filter */}
                {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
               
              </div>
            </div>
            {/* Derails of Traning Partner */}
           <TpDetailsBOx id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TpDetails;
