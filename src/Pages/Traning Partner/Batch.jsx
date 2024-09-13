import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, BarChart, Calendar, Book } from "lucide-react";
import { batchDataAtoms } from "@/Components/Traning Partner/Atoms/batchatom";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components(shadcn)/ui/tabs";
import DataTable from "@/Components/Traning Partner/ui/StudentDataTable";
import TrainersTable from "@/Components/Traning Partner/ui/TrainersTable";

const Batch = () => {
  const navigate = useNavigate();
  const batchData = useRecoilValue(batchDataAtoms);
  const { batchId } = useParams();

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-500";
      case "onGoing":
        return "text-yellow-700 bg-yellow-500";
      case "Not Started":
        return "text-red-700 bg-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Upper navbar section */}
      <div className="w-full flex justify-end items-center p-4 bg-gray-100">
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/trainingPartner/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
      <hr className="border-gray-300" />

      {/* Main content */}
      <div className="flex-grow flex flex-col lg:flex-row p-6 gap-8 overflow-auto">
        {/* Batch Details */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold mb-4">
            Batch Description & Details
          </h1>
          <div className="flex items-center gap-3">
            <Building2 className="text-gray-400" size={24} />
            <h2 className="text-xl">{batchData.courseName}</h2>
          </div>
          <div className="flex items-center gap-3">
            <BarChart className="text-gray-400" size={24} />
            <span
              className={`font-semibold ${getStatusClass(
                batchData.status
              )} px-2 py-1 rounded bg-opacity-25`}
            >
              {batchData.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Book className="text-gray-400" size={24} />
            <h2 className="text-xl">{batchData.sectorName}</h2>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <span>Start Date: {new Date(batchData?.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <span>End Date: {new Date(batchData?.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-300 self-stretch mx-4"></div>

        {/* Students and trainers Details */}
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="trainer">Trainers</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <DataTable batchId={batchId} />
            </TabsContent>
            <TabsContent value="trainer">
              <TrainersTable batchId={batchId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Batch;
