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
        return "text-green-700";
      case "onGoing":
        return "text-yellow-500";
      case "Not Started":
        return "text-red-500";
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

  const getmark = useCallback(async (studentId) => {
    setLoadingStates(prev => ({ ...prev, [studentId]: true }));
    setCurrentStudentId(studentId);
    try {
      const response = await fetch(`${server}/student/${studentId}`, {
        method: "GET"
      });
      const data = await response.json();
      setStudentData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [studentId]: false }));
    }
  }, []);

  const generateDummyData = (student) => {
    return {
      schemCode: CompleteBatchData.scheme,
      name: student.name,
      ward: `${student.fathername} / ${student.mothername}`,
      qualificationName: CompleteBatchData.courseName,
      qualificationCode: CompleteBatchData.courseCode,
      nsqfLevel: CompleteBatchData.courseLevel,
      sector: CompleteBatchData.sectorName,
      duration: `${CompleteBatchData.courseDuration} hours`,
      assessorRegNo: student.redg_No,
      dob: new Date(student.dob).toLocaleDateString(),
      assessmentBatchNo: CompleteBatchData.ABN_Number,
      assessmentDate: new Date(CompleteBatchData.endDate).toLocaleDateString(),
      nosMarks: student.marks ? student.marks.nosMarks : [],
      totalMarks: student.marks ? student.marks.totalMarks : 'N/A',
      grade: student.Grade || 'N/A',
      result: student.Grade ? 'PASS' : 'FAIL',
      dateOfIssue: new Date().toLocaleDateString(),
      certificateNo: `CERT-${student._id}`,
    };
  };

  const generatePDF = async (student) => {
    await getmark(student._id);

    // Wait for the state to update and component to render
    await new Promise(resolve => setTimeout(resolve, 2000));

    const input = componentRef.current;
    if (!input) {
      console.error("Component ref is null");
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${student.name}_MarkSheet.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    // Reset the state
    setCurrentStudentId(null);
    setStudentData(null);
  };

  const handleMarkSheetDownload = async (batchId) => {
    try {
      const response = await fetch(`${server}/batch/${batchId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch batch data");
      }

      const data = await response.json();
      const batchData = data.data;

      for (const student of batchData.students) {
        await generatePDF(student);
        // Add a small delay between downloads to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error("Error downloading mark sheets:", error);
    }
  };

  const handleCertificateDownload = (batchId) => {
    // Implement the logic to handle certificate download
    console.log(`Downloading certificate for batch ${batchId}`);
  };

  return (
<div className="bg-gray-100 shadow-md rounded-lg overflow-hidden p-4">
  {batches.length > 0 ? (
    batches
      .filter(batch => batch.paymentStatus === true)
      .map(batch => (
        <div
          key={batch._id}
          className="py-4 px-6 bg-white border border-gray-300 shadow-md rounded-lg mb-4 cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => handleClick(batch._id)}
        >
          <div className="flex justify-between items-center gap-3">
            <div className="text-gray-800 font-semibold w-1/4">{batch.courseName}</div>
            <div className="text-gray-600 w-1/4">{batch.ABN_Number}</div>
            <div className="text-gray-600 w-1/4 text-center">{batch.students.length}</div>
            <div
              className={`w-1/4 text-center py-1 px-2 rounded-md ${getStatusClass(batch.status)} text-white`}
            >
              {batch.status}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            {/* Uncomment and adjust buttons as needed */}
            {/* <Button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleMarkSheetDownload(batch._id); 
              }}
              disabled={loadingStates[batch._id]}
              className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {loadingStates[batch._id] ? 'Loading...' : <><Download /> MarkSheet</>}
            </Button>
            <Button
              onClick={(e) => { 
                e.stopPropagation(); 
                handleCertificateDownload(batch._id); 
              }}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Download /> Certificate
            </Button> */}
          </div>
        </div>
      ))
  ) : (
    <div className="text-center text-gray-600 py-4">No completed batches found</div>
  )}
  
  <div style={{ display: 'none' }}>
    <GenerateMarksheetFrom 
      ref={componentRef} 
      data={currentStudentId && studentData ? generateDummyData(studentData) : null} 
      isGeneratingPDF={true} // Pass the prop indicating PDF generation
    />
  </div>
</div>


  );
};

export default TranscriptManage;
