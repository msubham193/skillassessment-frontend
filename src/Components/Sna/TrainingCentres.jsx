/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "../Admin/ui/notiification/DataTable";

//this page handel all the center approval 

const TrainingCenters = () => {
  const [centerDetails, setCenterDetails] = useState([]);
  const [loading, setLoading] = useState(false); 
  const state = localStorage.getItem("state");
  const schemeName = localStorage.getItem("scheme");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = localStorage.getItem("state");
        const scheme = localStorage.getItem("scheme");
        console.log(state);
        console.log(scheme);
        const response = await axios.get(
          `${server}/sna/centers/query?state=${state}&schemeName=${scheme}`
        );
        const { data } = response.data;
        console.log(data);
        setCenterDetails(data.reverse());
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (centerId) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/sna/center/approve/${centerId}`,
        { state, schemeName }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejection = async (centerId) => {
    try {
      const response = await axios.put(
        `${server}/sna/center/reject/${centerId}`,
        { state, schemeName }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-md p-2 shadow-sm">
      <h1 className="text-2xl font-bold">Training Centers</h1>
      <p className="text-gray-600 mb-4">
        View and manage the training batches submitted by the Training Agency.
      </p>
      
      <DataTable
      path={"/sna/centerDetails"}
      filter1={"name"}
      columns={batchColumns}
      data={centerDetails}
      isLoading={loading}
    />
    </div>
  );
};

export default TrainingCenters;
const schemeNameToCheck =localStorage.getItem("scheme"); 

const batchColumns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "PRN_NO",
    header: "PRN No",
  },
  {
    accessorKey: "centerId",
    header: "Center ID ",
  },
  {
    accessorKey: "projectId",
    header: "Project ID",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "schemes",
    header: "No of Scheme",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.schemes.length}
        </div>
      );
    },
  },
  {
    accessorKey: "approveStatus",
    header: "Approve Status",
    cell: ({ row }) => {
      // Find the scheme by name in the schemes array
      const scheme = row.original.schemes.find(
        (s) => s.schemeName === schemeNameToCheck
      );

      // Check if scheme exists and get approval status
      const isApproved = scheme ? scheme.approveStatus : null;

      // Return status based on approval status
      return (
        <span
          className={`font-medium w-fit px-4 py-2 rounded-lg ${
            isApproved === true
              ? "bg-green-200 text-green-800"
              : isApproved === false
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {isApproved === true
            ? "Approved"
            : isApproved === false
            ? "Pending"
            : "Not Found"}
        </span>
      );
    },
  },
];

