/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";

const ResultSheetForm = () => {
  const pdfRef = useRef();
  const examId = useRecoilState(examIdState);
  const [tpName, setTpName] = useState("");
  const [aaName, setAaName] = useState("");
  const [centerName, setCenterName] = useState("");
  const [centId, setCentId] = useState("");
  const [abn, setAbn] = useState("");
  const [sector, setSector] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [examDate, setExamDate] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(examId);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/exam/attendance/${examId[0]}`
        );
        console.log(response); // Ensure the structure matches your needs
        const data = response.data.data;
        setTpName(data.TrainingOrganization);
        setAaName(data.assesmentAgency);
        setCenterName(data.batchId.centerName);
        setCentId(data.batchId.students[0].cenid);
        setAbn(data.batchId.ABN_Number);
        setSector(data.sector);
        setCourseName(data.course);
        setCourseCode(data.courseCode);
        setExamDate(data.assesmentdate);
        setBatchNo();
        setStudents(data.batchId.students);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Adjust dimensions to fill the page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = 0; // Start at the top-left corner
      const imgY = 0; // Start at the top-left corner
      const adjustedWidth = pdfWidth; // Adjust to PDF width
      const adjustedHeight = pdfHeight; // Adjust to PDF height

      pdf.addImage(imgData, "PNG", imgX, imgY, adjustedWidth, adjustedHeight);
      pdf.save("result-sheet.pdf");
    });
  };
  return (
    <div className="p-12 h-full" ref={pdfRef}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-16">
          <div className="mr-10">
            <img
              src={logo}
              alt="Centurion University Logo"
              className="h-48 w-36"
            />
          </div>
          <div className="ml-16 mr-12 text-center">
            <h2 className="text-lg font-semibold ">
              CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
            </h2>
            <p className="text-lg">(NCVET Recognized Awarding Body)</p>
            <h3 className="text-xl font-bold mt-10">Result SHEET</h3>
          </div>
          <div>
            <div className="h-48 w-48 bg-blue-500 ml-30 text-white text-center flex items-center justify-center rounded-xl">
              <p>Assessment Agency Logo</p>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse border border-black mb-4">
        <tbody>
          <tr className="">
            <td className="border border-black p-2 w-1/2 text-xl font-semibold text-center text-gray-400">
              Name of Assessment Agency
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              {aaName}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-xl font-semibold text-center text-gray-400">
              Training Partner Name
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              {tpName}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Center Name :
                </h2>
                {centerName}
              </div>
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Center ID :
                </h2>
                {centId}
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Batch ABN :
                </h2>
                {abn}
              </div>
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Sector :
                </h2>
                {sector}
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Course Name :
                </h2>
                {courseName}
              </div>
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Course Code :
                </h2>
                {courseCode}
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Exam Date :
                </h2>
                {examDate}
              </div>
            </td>
            <td className="border border-black p-2 text-xl font-semibold text-center">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-400 mr-2">
                  Batch No. :
                </h2>
                {batchNo}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-4">
        <h4 className="font-bold">Assessor Details</h4>
        <table className="w-full border-collapse border border-black mt-2">
          <thead>
            <tr>
              <th className="border border-black p-2">ID</th>
              <th className="border border-black p-2">Name</th>
              <th className="border border-black p-2">Qualification</th>
              <th className="border border-black p-2">Contact No.</th>
            </tr>
          </thead>
          <tbody className="h-10">
            <tr>
              <td className="border border-black p-2" />
              <td className="border border-black p-2" />
              <td className="border border-black p-2" />
              <td className="border border-black p-2" />
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <h4 className="font-bold">Student Attendance</h4>
        <table className="w-full border-collapse border border-black mt-2">
          <thead>
            <tr>
              <th className="border border-black p-2">Present</th>
              <th className="border border-black p-2">Absent</th>
              <th className="border border-black p-2">Total</th>
            </tr>
          </thead>
          <tbody className="h-10">
            <tr>
              <td className="border border-black p-2" />
              <td className="border border-black p-2" />
              <td className="border border-black p-2" />
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full border-collapse border border-black mb-4">
        <thead>
          <tr>
            <th className="border border-black p-2">SL. NO</th>
            <th className="border border-black p-2">Regd. No.</th>
            <th className="border border-black p-2">CANDIDATE NAME</th>
            <th className="border border-black p-2">Theory</th>
            <th className="border border-black p-2">Practical</th>
            <th className="border border-black p-2">Viva</th>
            <th className="border border-black p-2">Total</th>
            <th className="border border-black p-2">Result</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {students.slice(0, 10).map((student, index) => (
            <tr key={index}>
              <td className="border border-black p-2">{index + 1}</td>
              <td className="border border-black p-2">{student.redg_No}</td>
              <td className="border border-black p-2">{student.name}</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-24">
        <div className="border-t border-black p-2 w-1/2 text-center">
          Signature of Assessor
        </div>
      </div>
      <button
        className="btn bg-[#0066ff] text-base text-white font-semibold px-3 py-1 rounded duration-500 hover:bg-[#3f37c9]"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResultSheetForm;
