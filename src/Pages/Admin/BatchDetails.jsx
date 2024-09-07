import BtachDetailsBox from "@/Components/Admin/Content/BtachDetailsBox";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import React, { useState } from "react";
import { useParams } from "react-router-dom"; 
import { Tabs,
  TabsList,
  TabsTrigger,
  TabsContent, } from "@/components(shadcn)/ui/tabs";
import BatchPaymentBox from "@/Components/Admin/Content/BatchPaymentBox";

const BatchDetails = () => { 
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("accessmentagency");

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
                  Here&apos;s is all detail's of the Batch!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* add the functionality like search and filter */}
                {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
              </div>
            </div>
            {/* Derails of Traning Partner */}
            <Tabs defaultValue="accessmentagency" className="space-y-4">
            <TabsList>
              <TabsTrigger
                onClick={() => setSelectedTab("accessmentagency")}
                value="accessmentagency"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab("allExam")} 
                value="allExam"
              >
                View Invoice*
              </TabsTrigger>
            </TabsList>
  
            <TabsContent value="accessmentagency">
              {selectedTab === "accessmentagency" && <BtachDetailsBox id={id} /> }
            </TabsContent>
           
            <TabsContent value="allExam">
              {selectedTab === "allExam" && <BatchPaymentBox id={id} />}  
            </TabsContent>
          </Tabs>
           
          </div> 
        </div>
      </div>
    </>
  );
};

export default BatchDetails;
