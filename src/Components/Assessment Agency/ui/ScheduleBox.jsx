/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";

const ScheduleBox = () => {
  const [batchData, setBatchData] = useState([]); // Initialize as an empty array
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(assessmentAgencyId);
        const response = await axios.get(
          `${server}/exam/aa/${assessmentAgencyId}`
        );

        const data = response.data.data;
        console.log(data);
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
  }, [assessmentAgencyId]); // Ensure this runs when the ID changes

  const statusCounts = batchData.reduce((acc, batch) => {
    acc[batch.markUploadAndExamCompleteStatus] =
      (acc[batch.markUploadAndExamCompleteStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-5 bg-gray-100">
      <h1 className="text-xl font-semibold text-black mb-2">Scheduled</h1>
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Training Institute
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Course
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Project
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Number of Students
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-white text-sm">
          {batchData.map((batch) => (
            <tr key={batch._id} className="cursor-pointer hover:bg-gray-200">
              <td className="p-3 text-md text-gray-700">
                {batch.TrainingOrganization}
              </td>
              <td className="p-3 text-md text-gray-700">{batch.course}</td>
              <td className="p-3 text-md text-gray-700">{batch.scheme}</td>
              <td className="pl-20 text-md text-gray-700">
                {batch.batchId.students ? batch.batchId.students.length : 0}
              </td>
              <td className="p-3 text-sm">
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    batch.markUploadAndExamCompleteStatus === true
                      ? "text-blue-800 bg-blue-200"
                      : "text-green-800 bg-green-200"
                  }`}
                >
                  {batch.markUploadAndExamCompleteStatus
                    ? "Completed"
                    : "On-Going"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="text-lg mb-2">Status Counts</h2>
        <ul className="flex gap-6">
          {Object.keys(statusCounts).map((status) => {
            const isCompleted = status === "true"; // Convert string to boolean
            return (
              <li
                key={status}
                className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 w-28 ${
                  isCompleted
                    ? "text-blue-800 bg-blue-200"
                    : "text-green-800 bg-green-200"
                }`}
              >
                {isCompleted ? "Completed" : "On-Going"}: {statusCounts[status]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleBox;
