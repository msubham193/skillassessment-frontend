import React, { useState, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';
import TopBar from "@/Components/Traning Partner/TopBar";
import SideNav from "@/Components/Traning Partner/SideNav";
import { Button } from "@/components(shadcn)/ui/button";
import { Download } from "lucide-react";
import { CompeltebatchDataAtoms } from "@/Components/Traning Partner/Atoms/completeBtachAtom";
import GenerateMarksheetFrom from "@/Components/Traning Partner/ui/Marksheet/generateMarkFrom";
import GenerateCertificate from "@/Components/Traning Partner/ui/Certificate/GenerateCertificate";
import { server } from "@/main";

const generateMarksheetPDF = (data, Component, filename) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<Component data={data} />);

  setTimeout(() => {
    const scale = 3;
    html2canvas(container, {
      scale: scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const aspectRatio = canvas.height / canvas.width;
      const pdfWidth = 210;
      const pdfHeight = pdfWidth * aspectRatio;
      
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'p' : 'l',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
      document.body.removeChild(container);
    });
  }, 500);
};

const generateCertificatePDF = (data, Component, filename) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<Component data={data} />);

  setTimeout(() => {
    const scale = 3;
    html2canvas(container, {
      scale: scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
      windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 297;
      const pdfHeight = 210;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      const imgWidth = canvas.width / scale;
      const imgHeight = canvas.height / scale;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const centerShiftX = (pdfWidth - imgWidth * ratio) / 2;
      const centerShiftY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', centerShiftX, centerShiftY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(filename);
      document.body.removeChild(container);
    });
  }, 500);
};

const CompeteBatchData = () => {
  const batchData = useRecoilValue(CompeltebatchDataAtoms);
  const [loadingStates, setLoadingStates] = useState({});
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [studentImages, setStudentImages] = useState({});

  const convertToBlob = useCallback(async (url, studentId) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setStudentImages(prev => ({ ...prev, [studentId]: blobUrl }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }, []);

  useEffect(() => {
    batchData.students.forEach(student => {
      if (student.profilepic) {
        convertToBlob(student.profilepic, student._id);
      }
    });
  }, [batchData, convertToBlob]);

  const handleDownloadAll = useCallback(async () => {
    setIsDownloadingAll(true);
    for (const student of batchData.students) {
      if (student.markUploadStatus) {
        await fetchStudentData(student._id, "marksheet");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    setIsDownloadingAll(false);
  }, [batchData.students]);

  const fetchStudentData = useCallback(async (studentId, type) => {
    setLoadingStates((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: true,
      },
    }));

    try {
      let endpoint = type === "certificate" 
        ? `${server}/certificate/student/${studentId}`
        : `${server}/student/${studentId}`;
      
      const response = await fetch(endpoint, { method: "GET" });
      if (!response.ok) throw new Error(`Failed to fetch ${type} data`);
      
      const data = await response.json();
      data.data.convertedImageUrl = studentImages[studentId];

      if (type === "certificate") {
        generateCertificatePDF(data.data, GenerateCertificate, `Certificate_${data.data.name}.pdf`);
      } else {
        generateMarksheetPDF(data.data, GenerateMarksheetFrom, `Marksheet_${data.data.name}.pdf`);
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [type]: false,
        },
      }));
    }
  }, [studentImages]);

  const handleButtonClick = useCallback((studentId, type) => {
    fetchStudentData(studentId, type);
  }, [fetchStudentData]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Students
            </h1>
           
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {batchData &&
              batchData.students &&
              batchData.students.length > 0 ? (
                batchData.students.map((student) => (
                  <div
                    key={student._id}
                    className="p-6 border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <img
                        src={studentImages[student._id] || "/placeholder-image.jpg"}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {student.name}
                        </h2>
                        <p className="text-gray-600">{student.course}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleButtonClick(student._id, "marksheet")
                          }
                          disabled={
                            loadingStates[student._id]?.marksheet ||
                            !student.markUploadStatus
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {loadingStates[student._id]?.marksheet
                            ? "Generating..."
                            : "MarkSheet"}
                        </Button>
                        <Button
                          onClick={() =>
                            handleButtonClick(student._id, "certificate")
                          }
                          disabled={
                            loadingStates[student._id]?.certificate ||
                            !student.markUploadStatus
                          }
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {loadingStates[student._id]?.certificate
                            ? "Generating..."
                            : "Certificate"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No students found
                </div>
              )}
            </div>
            <div className="flex justify-end mb-4 mt-4">
              <Button
                onClick={handleDownloadAll}
                disabled={isDownloadingAll || !batchData.students.length}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {isDownloadingAll ? "Downloading..." : "Download All MarkSheets"}
              </Button>
            </div> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompeteBatchData;