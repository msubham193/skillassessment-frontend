/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingBatches = () => {
  const [batchData, setBatchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = localStorage.getItem("state");
        const scheme = localStorage.getItem("scheme");
        const response = await axios.get(
          `${server}/sna/batch/query?state=${state}&scheme=${scheme}`
        );
        console.log(response);
        if (response.data && Array.isArray(response.data.data)) {
          setBatchData(response.data.data); // Ensure response data is an array
        } else {
          console.error("Unexpected response format", response.data);
          setBatchData([]);
        }
      } catch (error) {
        console.error(error);
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
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">TP Name</th>
            <th className="py-2 px-4 border-b">Batch ABN</th>
            <th className="py-2 px-4 border-b">Students</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {batchData.map((batch) => (
            <tr key={batch._id} onClick={() => handleRowClick(batch._id)}>
              <td className="py-2 px-4 border-b text-center">
                {batch.trainingOrganization}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {batch.ABN_Number}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {batch.students.length}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <span
                  className={`inline-block px-2 py-1 text-white ${
                    batch.status === "Approved" ? "bg-green-500" : "bg-red-500"
                  } rounded-full`}
                >
                  {batch.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingBatches;
