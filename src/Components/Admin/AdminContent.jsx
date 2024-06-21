import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components(shadcn)/ui/tabs";
import DataTabs from "@/Components/Admin/ui/DataTabs";
import {
  CandlestickChart,
  GraduationCap,
  Presentation,
  SquareActivity,
} from "lucide-react";

const AdminContent = () => {
  return (
    <>
      {/* Content */}
      <div className="flex-1 space-y-4 p-9 pt-10">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* Add some content if requre at the Dashboard side Secction */}
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <DataTabs
            cardData={[
              {
                titel: "Total Training Partner",
                total: +0,
                fromLast: "+0 from last Month",
                logo: CandlestickChart,
              },
              {
                titel: "Total Students",
                total: +0,
                fromLast: "+0 from last Batch",
                logo: GraduationCap,
              },
              {
                titel: "Total Assessment Agency",
                total: +0,
                fromLast: "+0 from last Batch",
                logo: SquareActivity,
              },
              {
                titel: "Total Assessment ",
                total: +0,
                fromLast: "+0 from last Year",
                logo: Presentation,
              },
            ]}
          />
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default AdminContent;
