import CreateCourseForm from "@/Components/Admin/Content/CreateCourseForm";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components(shadcn)/ui/tabs";
import { useLocation } from "react-router-dom";
import ViewSectorAndCourse from "@/Components/Admin/Content/ViewSectorAndCourse";

const CreateCourse = ({ children }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultTab = query.get("tab") || "overview";
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);
  return (
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
                {" "}
                Course and Sector!!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;you can create Course or Sector for trainingPartner!
              </p>
            </div>
          </div>
          <Tabs defaultValue={selectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger
                onClick={() => setSelectedTab("overview")}
                value="overview"
              >
                Create Course
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab("updateBatchgov")}
                value="updateBatchgov"
              >
                View Sectors & Course
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {selectedTab === "overview" && (
                <CreateCourseForm>{children}</CreateCourseForm>
              )}
            </TabsContent>
            <TabsContent value="updateBatchgov">
              {selectedTab === "updateBatchgov" && <ViewSectorAndCourse />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
