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
import { server } from "@/main";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel  } from "@/components(shadcn)/ui/alert-dialog";

// Import Shadcn modal component (you need to import this from the library)

const UploadResult = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]);
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const setBatch_Id = useSetRecoilState(batchIdState);
  const setExamId = useSetRecoilState(examIdState);
  const setCourseName = useSetRecoilState(courseNameState);
  const setTpName = useSetRecoilState(tpNameState);
  const setBatchAbn = useSetRecoilState(batchAbnState);
  const setExamDate = useSetRecoilState(examDateState);
  const setSector = useSetRecoilState(sectorState);

  // Modal control state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(assessmentAgencyId);
        const response = await axios.get(`${server}/exam/aa/${assessmentAgencyId}`);
        console.log(response.data.data); 
        const data = response.data.data;
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

  const handleRowClick = (batch) => {
    if (batch.markUploadAndExamCompleteStatus) {
      // Show modal for completed batches
      setSelectedBatch(batch);
      setIsModalOpen(true);
    } else {
      // Navigate for ongoing batches
      setBatch_Id(batch.batchId._id);
      setExamId(batch._id);
      setBatchAbn(batch.batchABN);
      setCourseName(batch.course);
      setTpName(batch.TrainingOrganization);
      setExamDate(batch.date);
      setSector(batch.sector);

      navigate(`/dashboard/students/${batch.batchId._id}`);
    }
  };

  return (
    <div className="overflow-x-auto mt-2 mb-60 border rounded-lg shadow-lg">
      <div className="p-2">
        <h1 className="text-2xl font-bold">Batches</h1>
        <p className="text-gray-600 mb-4">Manage and Track Batch Results</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead className="">
          <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
            <th className="px-4 py-3 text-left font-medium">SL. NO.</th>
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
        <tbody>
          {batchData.map((batch, index) => (
            <tr
              key={batch._id}
              onClick={() => handleRowClick(batch)}
              className="cursor-pointer hover:bg-gray-200"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{batch.batchABN}</td>
              <td className="px-4 py-3">{batch.course}</td>
              <td className="px-4 py-3">{batch.scheme}</td>
              <td className="px-4 py-3 text-center">
                {batch.batchId.students ? batch.batchId.students.length : 0}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    batch.markUploadAndExamCompleteStatus
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

      {/* Shadcn Alert Modal */}
      {selectedBatch && (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <h2>Batch Status</h2>
              <p>You are note able to read or write it because,This batch has already been completed, and the results have been uploaded </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
                OK
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default UploadResult;
