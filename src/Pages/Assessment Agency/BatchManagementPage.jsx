/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  examIdState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "@/main";

const BatchManagementPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [batchData, setBatchData] = useState([]); // Initialize as an empty array
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const setExamId = useSetRecoilState(examIdState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(assessmentAgencyId);
        const response = await axios.get(
          `${server}/exam/aa/${assessmentAgencyId}`
        );
        console.log(response.data.data); // Ensure the structure matches your needs
        const data = response.data.data;

        // Wrap the response in an array if it is an object
        if (data && !Array.isArray(data)) {
          setBatchData([data]);
        } else {
          setBatchData(data);
        }
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchData();
  }, [assessmentAgencyId]);

  const handleRowClick = (batchId, status, examId) => {
    console.log(examId);
    setExamId(examId);
    if (status === "not-started" || status === "onGoing") {
      navigate(`/dashboard/batch/${batchId}/exam/${examId}`);
    }
  };

  const handleInvoiceGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/invoice/${assessmentAgencyId}`
      );

      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.error("Error", error);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-1 border rounded-lg shadow-lg">
        <div className="p-2">
          <h1 className="text-2xl font-bold">Batches</h1>
          <p className="text-gray-600 mb-4">Manage and Track Batch Results</p>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead className="">
            <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
              <th className="px-4 py-3 text-left font-medium">ABN id</th>
              <th className="px-4 py-3 text-left font-medium">Course</th>
              <th className="px-4 py-3 text-left font-medium">Scheme</th>
              <th className="px-4 py-3 text-center font-medium">
                Number of Students
              </th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">TP</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {batchData.map((batch) => (
              <tr
                key={batch._id}
                onClick={() =>
                  handleRowClick(batch.batchId._id, batch.status, batch._id)
                }
                className="cursor-pointer hover:bg-gray-200"
              >
                <td className="px-4 py-3">{batch.batchABN}</td>
                <td className="px-4 py-3">{batch.course}</td>
                <td className="px-4 py-3">{batch.scheme}</td>
                <td className="px-4 py-3 text-center">
                  {batch.batchId.students ? batch.batchId.students.length : 0}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      batch.markUploadAndExamCompleteStatus === false
                        ? "bg-red-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {batch.markUploadAndExamCompleteStatus
                      ? "Completed"
                      : "On-Going"}
                  </span>
                </td>
                <td className="px-4 py-3">{batch.TrainingOrganization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex justify-end">
        <button
          className={"bg-blue-700 ml-4 p-2 rounded-md text-white font-semibold"}
          onClick={handleInvoiceGenerate}
        >
        {
          loading?"Generating..":"Generate Monthly Invoice"
        }   
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BatchManagementPage;
