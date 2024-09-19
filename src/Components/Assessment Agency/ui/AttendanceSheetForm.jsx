import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import logo from "../../../assets/logo.png";

export default function AttendanceSheetForm() {
  const [examId] = useRecoilState(examIdState);
  const [examData, setExamData] = useState({
    assesmentAgency: "",
    trainingOrganizationName: "",
    centerName: "",
    centerId: "",
    batchABN: "",
    sectorName: "",
    courseName: "",
    courseCode: "",
    examDate: "",
    batchNo: "",
  });
  const [studentData, setStudentData] = useState([]);

  const componentRef = useRef(); // Reference to the component to be printed

  const fetchExamDetailsData = async () => {
    try {
      const response = await axios.get(`${server}/exam/attendance/${examId}`);
      const responseData = response.data.data;
      console.log("response", responseData);
      const batchNo = responseData.batchId.ABN_Number.slice(-2);
      setExamData({
        assesmentAgency: responseData.assesmentAgency,
        trainingOrganizationName: responseData.TrainingOrganization,
        centerName: responseData.batchId.centerName,
        centerId: responseData.batchId.CenterCode,
        batchABN: responseData.batchId.ABN_Number,
        sectorName: responseData.sector,
        courseName: responseData.course,
        courseCode: responseData.courseCode,
        examDate: responseData?.assesmentdate,
        batchNo: batchNo,
        assesmentAgencyLogo:responseData.assesmentAgencyId.logo
      });

      setStudentData(responseData.batchId.students);
      console.log("studentsData", studentData);
    } catch (error) {
      console.log("Error in fetching exam Details", error);
      return null;
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    // Add print-specific styles to the document
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page {
          margin: 0.1;
        }
        body {
          -webkit-print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style when the component unmounts
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    fetchExamDetailsData();
  }, []);

  const handlePrint = () => {
    console.log("Printing");
    window.print();
  };

  return (
    <div>
      {/* This is the part that will be printed */}
      <div
        ref={componentRef}
        className="w-[1000px] mx-auto p-4 font-sans border-2 border-gray-300"
      >
        <header className="flex items-center justify-between mb-10">
          <img
            src={logo}
            alt="Centurion University Logo"
            className="h-[100px]"
          />
          <div className="text-center flex-grow mx-4">
            <h1 className="text-xl font-bold leading-tight">
              CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
            </h1>
            <p className="text-xs">(NCVET Recognized Awarding Body)</p>
            <h2 className="text-lg font-bold mt-1">ATTENDANCE SHEET</h2>
          </div>
          <img
            src={examData.assesmentAgencyLogo}
            alt="Assesment agency logo"
            className="h-[100px] max-w-[100px] object-cover"
          />
        </header>

        <table className="w-full border-collapse border border-gray-400 mb-4">
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 w-1/2">
                Name of Assessment Agency
              </td>
              <td className="border border-gray-400 p-2 w-1/2">
                {examData.assesmentAgency}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Training Partner Name
              </td>
              <td className="border border-gray-400 p-2">
                {examData.trainingOrganizationName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Center Name: {examData.centerName}
              </td>
              <td className="border border-gray-400 p-2">
                Center ID: {examData.centerId}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Batch ABN: {examData.batchABN}
              </td>
              <td className="border border-gray-400 p-2">
                Sector: {examData.sectorName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Course Name: {examData.courseName}
              </td>
              <td className="border border-gray-400 p-2">
                Course Code: {examData.courseCode}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Exam Date: {examData.examDate ? examData.examDate :"N/A"}
              </td>
              <td className="border border-gray-400 p-2">
                Batch No: {examData.batchNo}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Assessor Details</h3>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 w-1/4">ID</th>
                <th className="border border-gray-400 p-2 w-1/4">Name</th>
                <th className="border border-gray-400 p-2 w-1/4">
                  Qualification
                </th>
                <th className="border border-gray-400 p-2 w-1/4">
                  Contact No.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">&nbsp;</td>
                <td className="border border-gray-400 p-2">&nbsp;</td>
                <td className="border border-gray-400 p-2">&nbsp;</td>
                <td className="border border-gray-400 p-2">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Student Attendance</h3>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 w-1/3">Present</th>
                <th className="border border-gray-400 p-2 w-1/3">Absent</th>
                <th className="border border-gray-400 p-2 w-1/3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">&nbsp;</td>
                <td className="border border-gray-400 p-2">&nbsp;</td>
                <td className="border border-gray-400 p-2 ">
                  {studentData.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-bold mb-2">Student Details</h3>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">SL. NO</th>
                <th className="border border-gray-400 p-2">CANDIDATE PHOTO</th>
                <th className="border border-gray-400 p-2">REGD. NO.</th>
                <th className="border border-gray-400 p-2">CANDIDATE NAME</th>
                <th className="border border-gray-400 p-2">FATHER'S NAME</th>
                <th className="border border-gray-400 p-2">GENDER</th>
                <th className="border border-gray-400 p-2">DATE OF BIRTH</th>
                <th className="border border-gray-400 p-2">SIGNATURE</th>
              </tr>
            </thead>
            <tbody>
              {studentData?.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <img
                      src={student.profilepic}
                      alt="Candidate"
                      className="w-20 h-20 mx-auto object-cover"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {student.redg_No}
                  </td>
                  <td className="border border-gray-400 p-2">{student.name}</td>
                  <td className="border border-gray-400 p-2">
                    {student.fathername}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {student.gender}
                  </td>
                  <td className="border border-gray-400 p-2">{formatDate(student.dob)}</td>
                  <td className="border border-gray-400 p-2">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 no-print"
        >
          Print Attendance Sheet
        </button>
      </div>
    </div>
  );
}