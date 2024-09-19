import React, { useRef, useState, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import TopBar from "@/Components/Traning Partner/TopBar";
import SideNav from "@/Components/Traning Partner/SideNav";
import { Button } from "@/components(shadcn)/ui/button";
import { Download } from "lucide-react";
import { CompeltebatchDataAtoms } from "@/Components/Traning Partner/Atoms/completeBtachAtom";
import GenerateMarksheetFrom from "@/Components/Traning Partner/ui/Marksheet/generateMarkFrom";
import GenerateCertificate from "@/Components/Traning Partner/ui/Certificate/GenerateCertificate";
import { server } from "@/main";

const CompleteBatchData = () => {
  const navigate = useNavigate();
  const batchData = useRecoilValue(CompeltebatchDataAtoms);
  const batchId = batchData?._id;
  const marksheetRef = useRef();
  const certificateRef = useRef();
  const dateRef = useRef(new Date());
  const [loadingStates, setLoadingStates] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownloadAll = useCallback(
    (batchId) => {
      navigate(`/downloadAllMarksheet/${batchId}`);
    },
    [navigate]
  );

  const handlePrint = useReactToPrint({
    content: () =>
      documentType === "marksheet"
        ? marksheetRef.current
        : certificateRef.current,
    documentTitle: documentType === "marksheet" ? "MarkSheet" : "Certificate",
    pageStyle:
      documentType === "marksheet"
        ? `@page { size: portrait; }`
        : `@page { size: landscape; }`,
    onBeforeGetContent: () => {
      dateRef.current = new Date(); // Update the date ref just before printing
    },
    onAfterPrint: () => {
      setLoadingStates((prev) => ({
        ...prev,
        [currentStudentId]: {
          ...prev[currentStudentId],
          [documentType]: false,
        },
      }));
      setCurrentStudentId(null);
      setDocumentType(null);
    },
  });

  const fetchStudentData = useCallback(async (studentId, type) => {
    setLoadingStates((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: true,
      },
    }));
    setCurrentStudentId(studentId);
    setDocumentType(type);
    try {
      const endpoint =
        type === "certificate"
          ? `${server}/certificate/student/${studentId}`
          : `${server}/student/${studentId}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} data`);
      }
      const data = await response.json();
      setStudentData(data.data);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setLoadingStates((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [type]: false,
        },
      }));
    }
  }, []);

  useEffect(() => {
    if (currentStudentId && studentData && documentType) {
      handlePrint();
    }
  }, [currentStudentId, studentData, documentType, handlePrint]);

  const generateMarksheetData = useCallback((student) => {
    if (!student) return null;

    return {
      schemCode: student.marks?.TrainingPartner || "N/A",
      name: student?.name,
      ward: student?.fathername,
      qualificationName: student?.course,
      qualificationCode: student?.marks?.batchABN
        ? student.marks.batchABN.split("/")[1]
        : "N/A",
      nsqfLevel: "5",
      sector: student?.sector_name,
      duration: `${student?.totaldays} days`,
      assessorRegNo: "AR123456",
      dob: student?.dob
        ? new Date(student.dob).toISOString().split("T")[0]
        : "N/A",
      assessmentBatchNo: student.marks?.batchABN,
      assessmentDate: student.marks?.examDate
        ? new Date(student.marks.examDate).toISOString().split("T")[0]
        : "N/A",
      nosMarks: Array.isArray(student?.marks?.Nos)
        ? student.marks.Nos.map((nos) => ({
            code: nos?.code || "N/A",
            name: nos?.name || "N/A",
            type: nos?.nosType || "N/A",
            maxMarks: nos?.passMark || 0,
            marksObtained: nos?.MarksObtained || 0,
          }))
        : [],

      totalMarks: student?.marks?.total,
      grade: student?.marks?.Grade,
      result: student?.marks?.Result,
      dateOfIssue: dateRef.current.toISOString().split("T")[0],
      certificateNo: `CERT${student.redg_No}`,
      studentId: student._id,
    };
  }, []);

  const generateCertificateData = useCallback((data) => {
    if (!data) return null;

    return {
      name: data.studentName,
      fatherName: data.fatherName,
      dateOfBirth: data?.DOB
        ? new Date(data.DOB).toISOString().split("T")[0]
        : "N/A",
      enrollmentNumber: data.Enrolment_number,
      subject: data.qualification,
      duration: `${data.duration} days`,
      credit: data.credit,
      level: data.level,
      trainingCenter: data.TrainingCenter,
      district: data.District,
      state: data.state,
      grade: data.grade,
      placeOfIssue: data.placeOfIssue,
      dateOfIssue: dateRef?.current.toISOString().split("T")[0] || "NA",
      studentId: data.studentId,
      studentImageUrl: data.stutentProfilePic,
      schemeLogo: data.schemeLogo,
    };
  }, []);

  const handleButtonClick = useCallback(
    (studentId, type) => {
      fetchStudentData(studentId, type);
      setCurrentStudentId(studentId);
      setDocumentType(type);
    },
    [fetchStudentData]
  );

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
              {batchData?.students?.length > 0 ? (
                batchData.students.map((student) => (
                  <div
                    key={student._id}
                    className="p-6 border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <img
                        src={student.profilepic || "/placeholder-image.jpg"}
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
                onClick={() => handleDownloadAll(batchId)}
                disabled={isDownloadingAll || !batchData?.students?.length}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {isDownloadingAll
                  ? "Downloading..."
                  : "Download All MarkSheets"}
              </Button>
            </div>
          </div>
        </main>
      </div>
      <div style={{ display: "none" }}>
        <GenerateMarksheetFrom
          ref={marksheetRef}
          data={
            currentStudentId && studentData && documentType === "marksheet"
              ? generateMarksheetData(studentData)
              : null
          }
        />
        <GenerateCertificate
          ref={certificateRef}
          data={
            currentStudentId && studentData && documentType === "certificate"
              ? generateCertificateData(studentData)
              : null
          }
        />
      </div>
    </div>
  );
};

export default CompleteBatchData;
