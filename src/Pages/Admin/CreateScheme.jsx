import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components(shadcn)/ui/tabs";import CreateSchemeForm from "@/Components/Admin/Content/CreateSchemeForm";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import ViewAllSceme from "@/Components/Admin/Content/ViewAllSceme";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CreateScheme = ({ children }) => {
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
                Create Scheme!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;you can create Scheme & View for Training Partner !!!
              </p>
            </div>
          </div>
          <Tabs defaultValue={selectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger
                onClick={() => setSelectedTab("overview")}
                value="overview"
              >
                Create Scheme
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab("updateBatchgov")}
                value="updateBatchgov"
              >
                View Scheme's
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {selectedTab === "overview" && (
                <CreateSchemeForm>{children}</CreateSchemeForm>
              )}
            </TabsContent>
            <TabsContent value="updateBatchgov">
              {selectedTab === "updateBatchgov" && <ViewAllSceme />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateScheme;
