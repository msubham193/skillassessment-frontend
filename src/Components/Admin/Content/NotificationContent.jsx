import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components(shadcn)/ui/tabs";
import AagencyNotification from "./AagencyNotification";
import TpartnerNotification from "./TpartnerNotifiation";

const NotificationContent = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultTab = query.get("tab") || "overview";
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications!</h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* Add functionality like search and filter */}
          {/* For now there is nothing to add in feature if there is some data then we will put there */}
        </div>
      </div>
      <Tabs defaultValue={selectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger onClick={() => setSelectedTab("overview")} value="overview">
            Assessment Agency
          </TabsTrigger>
          <TabsTrigger onClick={() => setSelectedTab("analytics")} value="analytics">
            Training Partner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {selectedTab === "overview" && <AagencyNotification />}
        </TabsContent>
        <TabsContent value="analytics">
          {selectedTab === "analytics" && <TpartnerNotification />} 
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationContent;
