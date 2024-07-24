import { Tabs,
  TabsList,
  TabsTrigger,
  TabsContent, } from "@/components(shadcn)/ui/tabs";
import AaDetailsBox from "@/Components/Admin/Content/AaDetailsBox";
import ExamUnderAccessmentAgecy from "@/Components/Admin/Content/ExamUnderAccessmentAgecy";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
//in this component fetch by id of a poticular rewuest of the aa from the aanotifaction
const AaDetails = () => { 
  const { id } = useParams(); 
  const [selectedTab, setSelectedTab] = useState("accessmentagency"); 

  // console.log(id);
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
                  Here&apos;s is all detail's of the Assessment Agency!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* add the functionality like search and filter */} 
                {/* For now  there is nothing to add in fecture if there some data  thenn we will put there  */}
              </div>
            </div>
            {/* Add tabs for traning partner  like profile ,batch assissin to this batch , exam details */}
            
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
              Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accessmentagency">
            {selectedTab === "accessmentagency" &&<AaDetailsBox id={id}/> }
          </TabsContent>
         
          <TabsContent value="allExam">
            {selectedTab === "allExam" && <ExamUnderAccessmentAgecy id={id} />}  
          </TabsContent>
        </Tabs>
            


            
          </div>
        </div>
      </div>
    </>
  );
};

export default AaDetails;

