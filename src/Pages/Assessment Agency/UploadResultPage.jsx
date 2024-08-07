/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  batchAbnState,
  batchIdState,
  courseNameState,
  examDateState,
  examIdState,
  sectorState,
  tpNameState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

const UploadResult = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]); // Initialize as an empty array
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const setBatch_Id = useSetRecoilState(batchIdState);
  const setExamId = useSetRecoilState(examIdState);
  const setCourseName = useSetRecoilState(courseNameState);
  const setTpName = useSetRecoilState(tpNameState);
  const setBatchAbn = useSetRecoilState(batchAbnState);
  const setExamDate = useSetRecoilState(examDateState);
  const setSector = useSetRecoilState(sectorState);

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
  }, [assessmentAgencyId]); // Ensure this runs when the ID changes

  const handleRowClick = (
    examId,
    courseName,
    batchId,
    trainingPartner,
    batchABN,
    examDate,
    sector
  ) => {
    console.log(examId);
    console.log(batchId);
    console.log(courseName);
    console.log(trainingPartner);
    console.log(batchABN);
    console.log(examDate);
    console.log(sector);
    setBatch_Id(batchId);
    setExamId(examId);
    setBatchAbn(batchABN);
    setCourseName(courseName);
    setTpName(trainingPartner);
    setExamDate(examDate);
    setSector(sector);

    navigate(`/dashboard/students/${batchId}`);
  };

  return (
    <div className="overflow-x-auto mt-10 mb-60 border rounded-lg shadow-lg">
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
                handleRowClick(
                  batch._id,
                  batch.course,
                  batch.batchId._id,
                  batch.TrainingOrganization,
                  batch.batchABN,
                  batch.date,
                  batch.sector
                )
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
                    batch.markUploadAndExamCompleteStatus === true
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-yellow-800"
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
  );
};

export default UploadResult;
