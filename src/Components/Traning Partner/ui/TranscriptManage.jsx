import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CompeltebatchDataAtoms } from '../Atoms/completeBtachAtom';
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
    <Card className="w-full  mx-auto shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">Batch Transcripts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {batches.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Index</TableHead>
                <TableHead className="font-semibold text-gray-700">Course Name</TableHead>
                <TableHead className="font-semibold text-gray-700">ABN Number</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">Students</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches
                .filter(batch => batch.paymentStatus === true && batch.
                  certificateIssued=== true)
                .map((batch, index) => (
                  <TableRow
                    key={batch._id}
                    className={`cursor-pointer transition-colors duration-150 ease-in-out hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    onClick={() => handleClick(batch._id)}
                  >
                    <TableCell>{index+1}</TableCell>
                    <TableCell className="font-medium text-gray-900">{batch.courseName}</TableCell>
                    <TableCell className="text-gray-700">{batch.ABN_Number}</TableCell>
                    <TableCell className="text-center text-gray-700">{batch.students.length}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(batch.status)}`}
                      >
                        {batch.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-600 py-8">No completed batches found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptManage;