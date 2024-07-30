import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components(shadcn)/ui/tabs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Batch from '../ui/HomeTablist/Batch';
import UpdateBatch from './UpdateBatch';

const AllBatchTabs = ({ children }) => {
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
          <h2 className="text-2xl font-bold tracking-tight">Batches!</h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* Add functionality like search and filter */}
          {/* For now there is nothing to add in feature if there is some data then we will put there */}
        </div>
      </div>
      <Tabs defaultValue={selectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger onClick={() => setSelectedTab("overview")} value="overview">
            Assign Batches
          </TabsTrigger>
          <TabsTrigger onClick={() => setSelectedTab("updateBatch")} value="updateBatch">
            Update Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {selectedTab === "overview" && <Batch>{children}</Batch>}
        </TabsContent>
        <TabsContent value="updateBatch">
          {selectedTab === "updateBatch" && <UpdateBatch />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AllBatchTabs;
