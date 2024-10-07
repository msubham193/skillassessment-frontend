/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../Admin/ui/notiification/DataTable";

const TrainingBatches = () => {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  //in this page we can only see the details not able to manage the data   

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const state = localStorage.getItem("state");
        const scheme = localStorage.getItem("scheme");
        const response = await axios.get(
          `${server}/sna/batch/query?state=${state}&scheme=${scheme}`
        );
        console.log(response.data.data);
        if (response.data && Array.isArray(response.data.data)) {
          setBatchData(response.data.data.reverse()); // Ensure response data is an array
        } else {
          console.error("Unexpected response format", response.data);
          setBatchData([]);
        }
      } catch (error) {
        console.error(error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="overflow-x-auto p-2 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold">Training Batches</h1>
      <p className="text-gray-600 mb-4">
        View and manage the training batches submitted by the Training Agency.
      </p>
      <DataTable
      filter1={"ABN_Number"}
      path={"/sna/batchdetails"}
      columns={batchColumns}
      data={batchData}
      isLoading={loading}
    />
      
    </div>
  );
};

export default TrainingBatches;



const batchColumns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "ABN_Number",
    header: "Abn no",
  },
  {
    accessorKey: "schemeType",
    header: "Scheme Type",
  },
  {
    accessorKey: "courseName",
    header: "Course ",
  },
  {
    accessorKey: "trainingOrganization",
    header: "Created By",
  },
  {
    accessorKey: "students",
    header: "No of Student",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.students.length}
        </div>
      );
    },
  },
];
