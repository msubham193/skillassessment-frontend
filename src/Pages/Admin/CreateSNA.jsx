import CreateSnaForm from '@/Components/Admin/Content/CreateSnaForm'
import ListOfSna from '@/Components/Admin/Content/ListOfSna'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import { useLocation } from "react-router-dom";
import React, { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components(shadcn)/ui/tabs";

const CreateSNA = ({children}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultTab = query.get("tab") || "overview";
  const [selectedTab, setSelectedTab] = useState(defaultTab);
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
        <div className="flex items-center space-x-2">
          {/* Add functionality like search and filter */}
          {/* For now there is nothing to add in feature if there is some data then we will put there */}
        </div>
      </div>
      <Tabs defaultValue={selectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger
            onClick={() => setSelectedTab("overview")}
            value="overview"
          >
            Create SNA
          </TabsTrigger>
          <TabsTrigger
          onClick={() => setSelectedTab("analytics")}
          value="analytics"
        >
          List Of SNA
        </TabsTrigger>      
        </TabsList>

        <TabsContent value="overview">
          {selectedTab === "overview" &&  <CreateSnaForm>{children}</CreateSnaForm>}
        </TabsContent>
        <TabsContent value="analytics">
          {selectedTab === "analytics" && <ListOfSna />}
        </TabsContent>
      </Tabs>
    </div>

     
    </div> 
  </div>
  )
}

export default CreateSNA
