import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react'
import { Button } from '@/components(shadcn)/ui/button';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CompeltebatchDataAtoms } from '../Atoms/completeBtachAtom';
const TranscriptManage = () => {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const trainingPartnerId = localStorage.getItem("trainingPartnerId");
    const[CompleteBatchData, setCompleteBatchData]=useRecoilState(CompeltebatchDataAtoms)
    const getStatusClass = (status) => {
      switch (status) {
        case "Completed":
          return "text-green-700";
        case "onGoing":
          return "text-yellow-500";
        case "Not Started":
          return "text-red-700";
        default:
          return "";
      }
    };
  
    useEffect(() => {
      const fetchBatches = async () => {
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
  
  
    const handleClick = async (batchid) => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/batch/${batchid}`,
            {
              method: "GET",
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            setCompleteBatchData(data.data);
            console.log(data.data);
            navigate(`/completeBatchData/${batchid}`);
          } else {
            console.error("Failed to fetch batches");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
    const handleMarkSheetDownload = (batchId) => {
      // Implement the logic to handle marksheet download
      console.log(`Downloading marksheet for batch ${batchId}`);
    };
  
    const handleCertificateDownload = (batchId) => {
      // Implement the logic to handle certificate download
      console.log(`Downloading certificate for batch ${batchId}`);
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {batches.length > 0 ? (
          batches.map((batch) => (
            batch.paymentStatus === true && (
              <div
                key={batch._id}
                className="py-5 px-5 bg-transparent gap-2 cursor-pointer"
                onClick={() => handleClick(batch._id)}
              >
                <div className="flex justify-between font-bold w-full items-center">
                  <div className="text-black w-full">{batch.courseName}</div>
                  <div className="text-black w-full">{batch.ABN_Number}</div>
                  <div className="text-black w-full">{batch.students.length}</div>
                  <div
                    className={`w-full items-center bg-opacity-25 rounded-md p-1 ${getStatusClass(
                      batch.status
                    )}`}
                  >
                    {batch.status}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={(e) => { e.stopPropagation(); handleMarkSheetDownload(batch._id); }}>
                      <Download /> MarkSheet
                    </Button>
                    <Button onClick={(e) => { e.stopPropagation(); handleCertificateDownload(batch._id); }}>
                      <Download /> Certificate
                    </Button>
                  </div>
                </div>
              </div>
            )
          ))
        ) : (
          <div>No completed batches found</div>
        )}
      </div>
    );
  };
  
  export default TranscriptManage;