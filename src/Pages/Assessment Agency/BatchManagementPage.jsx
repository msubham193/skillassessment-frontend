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

const BatchManagementPage = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]); // Initialize as an empty array
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const setExamId = useSetRecoilState(examIdState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(assessmentAgencyId);
        const response = await axios.get(
          `http://localhost:8000/api/v1/exam/aa/${assessmentAgencyId}`
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
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/invoice/${assessmentAgencyId}`
      );

      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.error("Error", error);
      toast.error("Error generating invoice. Please try again.");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-10 border rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                ABN id
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Course
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Scheme
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                Number of Students
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                TP
              </th>
            </tr>
          </thead>
          <tbody>
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
          Generate Monthly Invoice
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BatchManagementPage;
