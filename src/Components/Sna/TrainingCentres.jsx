/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

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
      {centerDetails.length === 0 ? (
        <p className="text-center text-gray-500 text-2xl mt-5">There are no pending training centers.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-md">
          <thead className="rounded-md">
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-4 border-b">Center ID</th>
              <th className="py-2 px-4 border-b">Center Name</th>
              <th className="py-2 px-4 border-b">PRN No.</th>
              <th className="py-2 px-4 border-b">Sanction Letter</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {centerDetails.map((center) => (
              <tr key={center._id}>
                <td className="py-2 px-4 border-b text-center">
                  {center.centerId}
                </td>
                <td className="py-2 px-4 border-b text-center">{center.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  {center.PRN_NO}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a
                    href={center.sanction_order_letter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Letter
                  </a>
                </td>
                <td className="py-2 px-4 border-b text-center">{center.state}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleApproval(center._id)}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={loading}
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrainingCenters;
