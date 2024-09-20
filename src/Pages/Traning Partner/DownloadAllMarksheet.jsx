import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { server } from "@/main";

const DownloadAllMarksheet = () => {
  const { batchId } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const componentRef = useRef();
  async function fetchData() {
    try {
      const response = await axios.get(
        `${server}/marks/batch/${batchId}`
      );
      console.log(response.data.data);
      const responsePayload = response.data.data;
      setExamDetails(responsePayload.examDetails);
      setStudentData(responsePayload.marks);
    } catch (error) {
      console.log("error", error.message);
    }
  }

  const handlePrint = () => {
    console.log("Printing");
    window.print();
  };



  
  useEffect(() => {
    // Add print-specific styles to the document
    const style = document.createElement("style");
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

  //  ** event for fetch Data
  useEffect(() => {
    fetchData();
  }, []);
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
            <h2 className="text-lg font-bold mt-1">BATCH RESULT SHEET</h2>
          </div>
          <img
            src={
              examDetails?.assesmentAgencyLogo
              }
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
                {examDetails?.assessmentAgencyName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Training Partner Name
              </td>
              <td className="border border-gray-400 p-2">
                {examDetails?.trainingPartnerName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Center Name: {examDetails.centerName}
              </td>
              <td className="border border-gray-400 p-2">
                Center ID: {examDetails.centerId}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Batch ABN: {examDetails.batchABN}
              </td>
              <td className="border border-gray-400 p-2">
                Sector: {examDetails.sector}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Course Name: {examDetails.courseName}
              </td>
              <td className="border border-gray-400 p-2">
                Course Code: {examDetails.courseCode}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">
                Exam Date: {examDetails.examDate}
              </td>
              <td className="border border-gray-400 p-2">
                Batch No: {examDetails.batchABN}
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
                <td className="border border-gray-400 p-2">
                  {examDetails?.assesorId}
                </td>
                <td className="border border-gray-400 p-2">
                  {examDetails?.assesorName}
                </td>
                <td className="border border-gray-400 p-2">
                  {examDetails?.assesorQualification}
                </td>
                <td className="border border-gray-400 p-2">
                  {examDetails?.assesorContactNumber}
                </td>
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
                <td className="border border-gray-400 p-2">
                  {examDetails.presentStudent}
                </td>
                <td className="border border-gray-400 p-2">
                  {examDetails.totalStudents - examDetails.presentStudent}
                </td>
                <td className="border border-gray-400 p-2 ">
                  {examDetails.totalStudents}
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
                <th className="border border-gray-400 p-2">REGD. NO.</th>
                <th className="border border-gray-400 p-2">CANDIDATE NAME</th>
                <th className="border border-gray-400 p-2">THEORY</th>
                <th className="border border-gray-400 p-2">PRACTICAL</th>
                <th className="border border-gray-400 p-2">VIVA</th>
                <th className="border border-gray-400 p-2">TOTAL</th>
                <th className="border border-gray-400 p-2">RESULT</th>
              </tr>
            </thead>
            <tbody>
              {studentData?.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {student.studentRedgNo}
                  </td>
                  <td className="border border-gray-400 p-2">{student.studentName}</td>
                  <td className="border border-gray-400 p-2">{student.totalTheorymark}</td>
                  <td className="border border-gray-400 p-2">{student.totalPracticalMark}</td>
                  <td className="border border-gray-400 p-2">{student.totalVivaMark}</td>
                  <td className="border border-gray-400 p-2">{student.total}</td>
                  <td className="border border-gray-400 p-2">{student.Result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-16 w-[1000px] mx-auto  text-right">
        <div className="inline-block border-t border-gray-300 pt-2">
          Signature of Assessor
        </div>
      </div>
      {/* Print Button */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 no-print"
        >
          Print Result Sheet
        </button>
      </div>
         
    </div>
  );
};

export default DownloadAllMarksheet;
