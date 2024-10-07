/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import { DataTable } from "@/Components/Admin/ui/notiification/DataTable";
import { cn } from "@/lib/utils";

const ScheduleBox = () => {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // console.log(assessmentAgencyId);
        const response = await axios.get(
          `${server}/exam/aa/${assessmentAgencyId}`
        );

        const data = response.data.data;
        console.log(data)
        setBatchData(data);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
      finally
      {
        setLoading(false);
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
      <DataTable
        filter1={"batchABN"}
        columns={columns}
        data={batchData}
        isLoding={loading}
      />
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

const columns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "TrainingOrganization",
    header: "Training Institute",
  },
  {
    accessorKey: "batchABN",
    header: "ABN.NO",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "totalStudents",
    header: "Number of Students",
  },
  {
    accessorKey: "markUploadAndExamCompleteStatus",
    header: "Status",
    cell: ({ row }) => {
      const getStatusLabel = (status) => {
        return status ? "Completed" : "Not Completed";
      };

      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-green-100 text-green-400": row.getValue(
              "markUploadAndExamCompleteStatus"
            ),
            "bg-red-100 text-red-500": !row.getValue(
              "markUploadAndExamCompleteStatus"
            ),
          })}
        >
          {getStatusLabel(row.getValue("markUploadAndExamCompleteStatus"))}
        </div>
      );
    },
  },
];
