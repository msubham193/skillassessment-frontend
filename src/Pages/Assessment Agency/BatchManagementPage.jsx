/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  examIdState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "@/main";
import { Input } from "@/components(shadcn)/ui/input";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { Badge } from "@/components(shadcn)/ui/badge";
import SetExamModal from "@/Components/Assessment Agency/ui/SetExamModal";

const BatchManagementPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
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
    } finally {
      setLoading(false);
    }
  };

  const filteredBatchData = batchData.filter((batch) =>
    Object.values(batch).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-2xl font-bold">Batches</h1>
        <p className="text-gray-600">Manage and Track Batch Results</p>
      </div>
      <div className="flex justify-between gap-4 mt-3">
        <Input
          placeholder="Search batches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleInvoiceGenerate}>
          Generate Monthly Invoice
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL NO</TableHead>
              <TableHead>ABN ID</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Scheme</TableHead>
              <TableHead className="text-center">Number of Students</TableHead>
              <TableHead>TP</TableHead>
              <TableHead>Status</TableHead>
              
             {/*  <TableHead>Action</TableHead>  Action column for the button */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatchData.map((batch, index) => (
              <TableRow
                key={batch.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  handleRowClick(batch?.batchId?._id, batch?.status, batch?._id)
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{batch.batchABN}</TableCell>
                <TableCell>{batch.course}</TableCell>
                <TableCell>{batch.scheme}</TableCell>
                <TableCell className="text-center">
                  {batch.totalStudents}
                </TableCell>
            
                <TableCell>{batch.TrainingOrganization}</TableCell>
                <TableCell>
                <Badge
                  className={`px-4 py-2 rounded-lg ${
                    batch.markUploadAndExamCompleteStatus
                      ? "bg-green-100 text-green-700" // Green background and text for true
                      : "bg-yellow-100 text-yellow-700" // Yellow background and text for false
                  }`}
                >
                  {batch.markUploadAndExamCompleteStatus
                    ? "Completed"
                    : "Not Completed"}
                </Badge>
              </TableCell>
               {/*
                 <TableCell>
                  <SetExamModal batchId={batch?.batchId?._id} examId={batch?._id}>
                    <Button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when the button is clicked
                        console.log("open Modal");
                      }}
                    >
                      Exam Setup
                    </Button>
                  </SetExamModal>
                </TableCell>
                */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BatchManagementPage;
