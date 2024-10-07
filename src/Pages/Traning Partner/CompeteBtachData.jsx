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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";

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

  //function for check all the data come from complete batch
  // setTimeout(() => {
  //   console.log(batchData);
  // }, 2000);

  const handlePrint = useReactToPrint({
    content: () =>
      documentType === "marksheet"
        ? marksheetRef.current
        : certificateRef.current,
    documentTitle: documentType === "marksheet" ? "MarkSheet" : "Certificate",
    pageStyle: `
      @page {
        size: ${documentType === "marksheet" ? "A4 portrait" : "A4 landscape"};
      }
      @media print {
        ${
          documentType === "certificate"
            ? `
            body {
              padding: 0;
              margin: 0;
            }
            * {
              border: none !important;
              box-shadow: none !important;
            }
          `
            : ""
        }
      }
    `,
    onBeforeGetContent: () => {
      dateRef.current = new Date();
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
    if (student.absent === true) {
      return {
        schemCode: student.marks?.TrainingPartner || "N/A",
        name: student?.name,
        ward: student?.fathername,
        qualificationName: student?.course,
        qualificationCode: "ECL338",
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
        grade: student?.marks?.Grade || "Absent",
        result: student?.marks?.Result || "Absent",
        dateOfIssue: dateRef.current.toISOString().split("T")[0],
        certificateNo: `CERT${student.redg_No}`,
        studentId: student._id,
      };
    }
    return {
      schemCode: student.marks?.TrainingPartner || "N/A",
      name: student?.name,
      ward: student?.fathername,
      qualificationName: student?.course,
      qualificationCode: "ECL338",
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
    // console.log(data)
    return {
      name: data.studentName,
      fatherName: data.fatherName,
      dateOfBirth: data?.DOB
        ? new Date(data.DOB).toISOString().split("T")[0]
        : "N/A",
      enrollmentNumber: data.Enrolment_number,
      subject: data.qualification,
      duration: `${data.duration} days`,
      certificateCode: data?.certificateCode,
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
      schemeType: data.schemeType,
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
              Download Marksheet and Certificate
            </h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Sl_No.</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Redg No.</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchData?.students?.length > 0 ? (
                    batchData.students.map((student, index) => (
                      <TableRow key={student._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={
                                student.profilepic ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={student.name}
                              className={`w-10 h-10 rounded-full object-cover border-2 ${
                                student.absent
                                  ? "border-red-500"
                                  : "border-indigo-500"
                              }`}
                            />
                            <span>{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.redg_No}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              student.absent
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {student.absent ? "Absent" : "Present"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              student.Grade === "F"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {student.Grade === "F" ? "Fail" : "Pass"}
                          </span>
                        </TableCell>
                        <TableCell>{student.Grade}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              className="bg-[#1D4ED8] text-white"
                              onClick={() =>
                                handleButtonClick(student._id, "marksheet")
                              }
                              disabled={loadingStates[student._id]?.marksheet}
                              size="sm"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {loadingStates[student._id]?.marksheet
                                ? "Generating..."
                                : "MarkSheet"}
                            </Button>
                            <Button
                              className="bg-[#7E22CE] text-white px-2 py-1 text-xs rounded-md"
                              onClick={() =>
                                handleButtonClick(student._id, "certificate")
                              }
                              disabled={
                                loadingStates[student._id]?.certificate ||
                                !student.markUploadStatus ||
                                student.Grade === "F" ||
                                student.absent
                              }
                              size="sm"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {loadingStates[student._id]?.certificate
                                ? "Generating..."
                                : "Certificate"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500"
                      >
                        No students found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mb-4 mt-4">
              <Button
                onClick={() => handleDownloadAll(batchId)}
                disabled={isDownloadingAll || !batchData?.students?.length}
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
