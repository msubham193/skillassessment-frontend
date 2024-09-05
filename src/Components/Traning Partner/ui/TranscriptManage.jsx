import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components(shadcn)/ui/button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CompeltebatchDataAtoms } from '../Atoms/completeBtachAtom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import GenerateMarksheetFrom from './Marksheet/generateMarkFrom'; 
import { server } from '@/main';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";

const TranscriptManage = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const trainingPartnerId = localStorage.getItem("trainingPartnerId");
  const [CompleteBatchData, setCompleteBatchData] = useRecoilState(CompeltebatchDataAtoms);
  const componentRef = useRef(null);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-100";
      case "onGoing":
        return "text-yellow-700 bg-yellow-100";
      case "Not Started":
        return "text-red-700 bg-red-100";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(
          `${server}/batch/tp/${trainingPartnerId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBatches(data.data);
        } else {
          console.error("Failed to fetch batches");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (trainingPartnerId) {
      fetchBatches();
    }
  }, [trainingPartnerId]);

  const handleClick = async (batchId) => {
    try {
      const response = await fetch(
        `${server}/batch/${batchId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCompleteBatchData(data.data);
        navigate(`/completeBatchData/${batchId}`);
      } else {
        console.error("Failed to fetch batches");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

    return (
      <Card className="w-full  mx-auto p-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Batch Transcripts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {batches.length > 0 ? (
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-left px-4 py-2">Course Name</TableHead>
                  <TableHead className="text-left px-4 py-2">ABN Number</TableHead>
                  <TableHead className="text-center px-4 py-2">Students</TableHead>
                  <TableHead className="text-center px-4 py-2">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches
                  .filter(batch => batch.paymentStatus === true)
                  .map(batch => (
                    <TableRow
                      key={batch._id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleClick(batch._id)}
                    >
                      <TableCell className="font-medium px-4 py-2">{batch.courseName}</TableCell>
                      <TableCell className="px-4 py-2">{batch.ABN_Number}</TableCell>
                      <TableCell className="text-center px-4 py-2">{batch.students.length}</TableCell>
                      <TableCell className="text-center px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(batch.status)}`}
                        >
                          {batch.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-gray-600 py-4">No completed batches found</div>
          )}
        </CardContent>
        
        {/* Hidden component for PDF generation */}
        <div style={{ display: 'none' }}>
          <GenerateMarksheetFrom 
            ref={componentRef} 
            data={currentStudentId && studentData ? generateDummyData(studentData) : null} 
            isGeneratingPDF={true}
          />
        </div>
      </Card>
    );
  };
  export default TranscriptManage;