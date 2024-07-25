import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components(shadcn)/ui/tabs";
import AaPaymentDetails from "@/Components/Admin/Content/AaPaymentDetails";
import BatchPaymentDetails from "@/Components/Admin/Content/BatchPaymentDetails";
import SideNav from "@/Components/Admin/Content/SideNav"; 
import TopBar from "@/Components/Admin/Content/TopBar";
import React, { useState } from "react";

const PaymentDEtails = ({ children }) => { 
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
                  Payment Info!
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s is all detail's about Payment!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* add the functionality like search and filter */}
                {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
              </div>
            </div>
            <Tabs defaultValue="accessmentagency" className="space-y-4">
              <TabsList>
                <TabsTrigger
                  onClick={() => setSelectedTab("accessmentagency")}
                  value="accessmentagency"
                >
                  Assessment Agency
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setSelectedTab("batch")}
                  value="batch"
                >
                  Batch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="accessmentagency">
                {selectedTab === "accessmentagency" && <AaPaymentDetails />}
              </TabsContent>
              <TabsContent value="batch">
                {selectedTab === "batch" && <BatchPaymentDetails />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDEtails;
