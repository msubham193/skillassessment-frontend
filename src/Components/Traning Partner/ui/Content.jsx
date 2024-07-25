import { Button } from "@/components(shadcn)/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components(shadcn)/ui/table";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { batchDataAtoms } from "../Atoms/batchatom";
import TopBar from "../TopBar";
import { toast } from "react-toastify";

const Content = () => {
  const navigate = useNavigate();
  const [allBatch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const setBatchData = useSetRecoilState(batchDataAtoms);
  const trainingPartnerId = localStorage.getItem("trainingPartnerId");

  const handelView = async (batchid) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/${batchid}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        console.log(data.data);
        navigate(`/trainingPartner/dashboard/${batchid}`);
      } else {
        console.error("Failed to fetch batches");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/batch/tp/${trainingPartnerId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAllBatch(data.data);
        } else {
          console.error("Failed to fetch batches");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trainingPartnerId) {
      fetchBatches();
    }
  }, [trainingPartnerId]);

  const handelBatchReady = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/batch/active/${batchId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("batch sended", data);
        toast.success("Batch Submitted Successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to submit batch:", errorData);
        toast.error("Failed to submit batch: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting batch: " + error.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700";
      case "onGoing":
        return "text-yellow-500 ";
      case "Not Started":
        return "text-red-700 ";
      default:
        return "";
    }
  };

  console.log(allBatch);
  return (
    <div className="w-full">
      <div>
        <TopBar />
      </div>

      <div className="py-3 px-5 bg-transparent gap-2">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-2xl">Loading...</span>
          </div>
        ) : (
          <div className="mt-4 ">
            {allBatch.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>ABN Number</TableHead>
                    <TableHead>Number of Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-gray-300">
                  {allBatch.map((batch) => (
                    <TableRow key={batch._id}>
                      <TableCell >{batch.courseName}</TableCell>
                      <TableCell >{batch.ABN_Number}</TableCell>
                      <TableCell className="text-center">{batch.students.length}</TableCell>
                      <TableCell className={`text-center   p-1 ${getStatusClass(batch.status)}`}>
                        {batch.status}
                      </TableCell>
                      <TableCell >
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-orange-600">
                          <div className="flex flex-col items-center cursor-pointer" onClick={() => handelView(batch._id)}>
                            <Eye className="mb-1" />
                            <span>View</span>
                          </div>
                          </div>
                          </TableCell>
                          <TableCell >
                          <div>
                          <div className="flex flex-row gap-2 mr-2">
                            <Button
                              className="text-xs text-white px-4 py-1 bg-[#0C0C0C]"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/CreateBatch/addteacher/${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Trainer
                            </Button>
                            <Button
                              className="text-xs text-white px-4 py-1 bg-[#0C0C0C]"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/CreateBatch/addstudent/${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Student
                            </Button>
                            <Button
                              className="text-xs text-white px-4 py-1 bg-[#0C0C0C]"
                              onClick={() =>
                                handelBatchReady(batch._id)
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Submit Batch
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div>No batches found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
