import { Tabs, TabsContent, TabsList, TabsTrigger  } from '@/components(shadcn)/ui/tabs'
import AddfeeCorporate from '@/Components/Admin/Content/AddfeeCorporate'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import UpdateBatch from '@/Components/Admin/Content/UpdateBatch'
import Batch from '@/Components/Admin/ui/HomeTablist/Batch'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AllBAtch = ({children}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultTab = query.get("tab") || "overview"; 
  const [selectedTab, setSelectedTab] = useState(defaultTab); 

  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);
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
        <Tabs defaultValue={selectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger onClick={() => setSelectedTab("overview")} value="overview">
              All Batches
            </TabsTrigger>
            <TabsTrigger onClick={() => setSelectedTab("analytics")} value="analytics">
              Update Payment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {selectedTab === "overview" &&  <Batch>{children}</Batch>}
          </TabsContent>
          <TabsContent value="analytics">
            {selectedTab === "analytics" &&  <UpdateBatch/>}
          </TabsContent>

        </Tabs>
      </div>
        
       
      </div>
    </div>
  </>
  )
}

export default AllBAtch
 