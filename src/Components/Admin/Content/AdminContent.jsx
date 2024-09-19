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
    try {
      axios
        .get(`${server}/tp`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setTotalTp(response.data.data.length);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios
        .get(`${server}/aa`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setTotalAa(response.data.data.length);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios
        .get(`${server}/exam/all`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setTotalExam(response.data.data.length);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios
        .get(`${server}/batch`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setTotalBatch(response.data.data.length);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(totalTp)

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
        <Tabs defaultValue="overview" className="space-y-4 ">
          <DataTabs
            cardData={[
              {
                titel: "Total Training Partner",
                total: +totalTp,
                fromLast: "+0 from last Month",
                logo: CandlestickChart,
              },
              {
                titel: "Total Batches",
                total: +totalBatch,
                fromLast: "+0 from last Month",
                logo: GraduationCap,
              },
              {
                titel: "Total Assessment Agency",
                total: +totalAa,
                fromLast: "+0 from last Month",
                logo: SquareActivity,
              },
              {
                titel: "Total Assessment(Exam) ",
                total: +totalExam,
                fromLast: "+0 from last Year",
                logo: Presentation,
              },
            ]}
          />
        </Tabs> 
        <Tabs defaultValue="accessmentagency" className="space-y-4 ">
          <TabsList >
            <TabsTrigger 
              onClick={() => setSelectedTab("accessmentagency")}
              value="accessmentagency"
            >
              Assessment Agency
            </TabsTrigger>
            <TabsTrigger
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
