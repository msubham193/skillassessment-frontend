/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../Admin/ui/notiification/DataTable";
import { cn } from "@/lib/utils";

const TBDetails = () => {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);    

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const state = localStorage.getItem("state");
        const scheme = localStorage.getItem("scheme");
        const response = await axios.get(
          `${server}/sna/batches/all/query?state=${state}&scheme=${scheme}`
        );
        console.log(response.data.data[0]);
        if (response.data && Array.isArray(response.data.data)) {
          setBatchData(response.data.data); 
        } else {
          console.error("Unexpected response format", response.data);
          setBatchData([]);
        }
      } catch (error) {
        console.error(error);
      } finally
      {
        setLoading(true)
      }
      
    };

    fetchData();
  }, []);

  const handleRowClick = (batchId) => {
    console.log(batchId);
    navigate(`/sna/batchdetails/${batchId}`);
  };
  return (
    <div className="overflow-x-auto p-2 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold">Training Batches</h1>
      <p className="text-gray-600 mb-4">
        View and manage the training batches submitted by the Training Agency.
      </p>
      <DataTable
      path={"/sna/batchdetails"}
      filter1={"ABN_Number"}
      columns={batchColumns}
      data={batchData}
      isLoading={loading}
    />
    </div>
  );
};

export default TBDetails;

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
  {
    accessorKey: "approvedByGovernmentBody",
    header: "Status",
    cell: ({ row }) => {
      const isApproved = row.getValue("approvedByGovernmentBody");
  
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-yellow-200 text-yellow-800": !isApproved, // If `approvedByGovernmentBody` is false
            "bg-green-200 text-green-800": isApproved,    // If `approvedByGovernmentBody` is true
          })}
        >
          {isApproved ? "Approved" : "Pending"}
        </div>
      );
    },
  }
];

