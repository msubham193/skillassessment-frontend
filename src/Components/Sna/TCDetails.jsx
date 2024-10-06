/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "../Admin/ui/notiification/DataTable";

const TCDetails = () => {
  const [centerDetails, setCenterDetails] = useState([]);   
  const [loading, setLoading] = useState(false);
  const state = localStorage.getItem("state"); 
  const scheme = localStorage.getItem("scheme");

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        setLoading(true)
   
        const response = await axios.get(
          `${server}/center/sna/query?state=${state}&scheme=${scheme}`
        );
        setCenterDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

export default TCDetails;

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
