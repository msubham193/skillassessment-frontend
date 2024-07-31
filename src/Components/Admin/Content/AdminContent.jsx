import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components(shadcn)/ui/tabs";
import DataTabs from "@/Components/Admin/ui/DataTabs";
import {
  CandlestickChart,
  GraduationCap,
  Presentation,
  SquareActivity, 
} from "lucide-react";
import AccessmentAgency from "../ui/HomeTablist/AccessmentAgency";
import TraningPartner from "../ui/HomeTablist/TraningPartner";
import axios from "axios";
import { server } from "@/main";
import AllExam from "../ui/HomeTablist/AllExam";

const AdminContent = () => {
  const [selectedTab, setSelectedTab] = useState("accessmentagency");
  const [totalTp, setTotalTp] = useState(0);
  const [totalAa, setTotalAa] = useState(0);
  const [totalExam, setTotalExam] = useState(0);
  const [totalBatch, setTotalBatch] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tpResponse = await axios.get(`${server}/tp`, { withCredentials: true });
        setTotalTp(tpResponse.data.data.length);

        const aaResponse = await axios.get(`${server}/aa`, { withCredentials: true });
        setTotalAa(aaResponse.data.data.length);

        const examResponse = await axios.get(`${server}/exam/all`, { withCredentials: true });
        setTotalExam(examResponse.data.data.length);

        const batchResponse = await axios.get(`${server}/batch`, { withCredentials: true });
        setTotalBatch(batchResponse.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Content */}
      <div className="flex-1 space-y-4 p-9 pt-10">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* Add some content if required at the Dashboard side Section */}
          </div>
        </div>

        {/* DataTabs component is always visible */}
        <Tabs defaultValue="overview" className="space-y-4">
          <DataTabs
            cardData={[
              {
                titel: "Total Training Partner",
                total: totalTp,
                fromLast: "+0 from last Month",
                logo: CandlestickChart,
              },
              {
                titel: "Total Batches",
                total: totalBatch,
                fromLast: "+0 from last Month",
                logo: GraduationCap,
              },
              {
                titel: "Total Assessment Agency",
                total: totalAa,
                fromLast: "+0 from last Month",
                logo: SquareActivity,
              },
              {
                titel: "Total Assessment (Exam)",
                total: totalExam,
                fromLast: "+0 from last Year",
                logo: Presentation,
              },
            ]}
          />
        </Tabs>

        <Tabs defaultValue="accessmentagency" className="space-y-4">
          <TabsList>
            <TabsTrigger
              onClick={() => setSelectedTab("accessmentagency")}
              value="accessmentagency"
            >
              Assessment Agency
            </TabsTrigger>
            <TabsTrigger
              className="text-gray-700"
              onClick={() => setSelectedTab("traningPartner")}
              value="traningPartner"
            >
              Training Partner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accessmentagency">
            {selectedTab === "accessmentagency" && <AccessmentAgency />}
          </TabsContent>
          <TabsContent value="traningPartner">
            {selectedTab === "traningPartner" && <TraningPartner />}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminContent;
