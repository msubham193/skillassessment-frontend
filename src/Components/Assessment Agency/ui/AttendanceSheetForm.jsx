import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import { Loader2 } from "lucide-react";

const printStyles = `
  @page {
    size: auto;
    margin: 10mm;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

const AttendanceSheetForm = () => {
  const componentRef = useRef();
  const [examId] = useRecoilState(examIdState);
  const [assessor, setAssessor] = useState({});
  const [assessorId, setAssessorId] = useState("");
  const [formData, setFormData] = useState({
    tpName: "",
    aaName: "",
    centerName: "",
    centId: "",
    abn: "",
    sector: "",
    courseName: "",
    courseCode: "",
    examDate: "",
    batchNo: "",
    aaLogo: null,
    students: []
  });
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/exam/attendance/${examId}`);
        const data = response.data.data;
        setAssessorId(data.AssessorId);
        setFormData({
          aaLogo: data.assesmentAgencyId.logo,
          tpName: data.TrainingOrganization,
          aaName: data.assesmentAgency,
          centerName: data.batchId.centerName,
          centId: data.batchId.students[0].cenid,
          abn: data.batchId.ABN_Number,
          sector: data.sector,
          courseName: data.course,
          courseCode: data.courseCode,
          examDate: data.assesmentdate,
          batchNo: data.batchId.batchNo,
          students: data.batchId.students,
        });
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchData();
  }, [examId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: printStyles,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  const renderStudentRows = () => {
    return formData.students.map((student, index) => (
      <tr key={student.uid} className="">
        <td className="border border-black p-2 text-center">{index + 1}</td>
        <td className="border border-black p-2 text-center">
          <img src={student.profilepic} alt={student.name} className="h-20 w-20 object-cover mx-auto" />
        </td>
        <td className="border border-black p-2">{student.uid}</td>
        <td className="border border-black p-2">{student.name}</td>
        <td className="border border-black p-2">{student.fathername}</td>
        <td className="border border-black p-2">{student.gender}</td>
        <td className="border border-black p-2">{formatDate(student.dob)}</td>
        <td className="border border-black p-2"></td>
      </tr>
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-22 max-w-5xl m-auto h-full">
      <div ref={componentRef}>
        <div className="pdf-section p-12 h-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <img
              src={logo}
              alt="Centurion University Logo"
              className="h-20 w-20 object-contain"
            />
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
              </h2>
              <p className="text-sm">(NCVET Recognized Awarding Body)</p>
              <h3 className="text-xl font-bold mt-2">ATTENDANCE SHEET</h3>
            </div>
            <img src={formData.aaLogo} alt="Assessment Agency Logo" className="max-h-20 max-w-20" />
          </div>

          {/* Batch Details Table */}
          <table className="w-full border-collapse border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 w-1/2">
                  Name of Assessment Agency
                </td>
                <td className="border border-black p-2">{formData.aaName || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  Training Partner Name
                </td>
                <td className="border border-black p-2">{formData.tpName || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  Center Name: {formData.centerName || "N/A"}
                </td>
                <td className="border border-black p-2">
                  Center ID: {formData.centId || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  Batch ABN: {formData.abn || "N/A"}
                </td>
                <td className="border border-black p-2">
                  Sector: {formData.sector || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  Course Name: {formData.courseName || "N/A"}
                </td>
                <td className="border border-black p-2">
                  Course Code: {formData.courseCode || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  Exam Date: {formData.examDate || "N/A"}
                </td>
                <td className="border border-black p-2">
                  Batch No.: {formData.batchNo || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Assessor Details Section */}
          <div className="mb-4">
            <h4 className="font-bold">Assessor Details</h4>
            <table className="w-full border-collapse border border-black mt-2">
              <thead>
                <tr>
                  <th className="border border-black p-4">ID</th>
                  <th className="border border-black p-4">Name</th>
                  <th className="border border-black p-4">Qualification</th>
                  <th className="border border-black p-4">Contact No.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-4"></td>
                  <td className="border border-black p-4">{assessor.name}</td>
                  <td className="border border-black p-4">{assessor.qualification}</td>
                  <td className="border border-black p-4">{assessor.contact}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Student Attendance Summary */}
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
              <tbody>
                <tr>
                  <td className="border border-black p-4"></td>
                  <td className="border border-black p-4"></td>
                  <td className="border border-black p-4">{formData.students.length}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Student Details Table */}
          <div className="mb-4">
            <h4 className="font-bold">Student Details</h4>
            <table className="w-full border-collapse border border-black mt-2">
              <thead>
                <tr>
                  <th className="border border-black p-2">SL. NO</th>
                  <th className="border border-black p-2">CANDIDATE PHOTO</th>
                  <th className="border border-black p-2">REGD. NO.</th>
                  <th className="border border-black p-2">CANDIDATE NAME</th>
                  <th className="border border-black p-2">FATHER'S NAME</th>
                  <th className="border border-black p-2">GENDER</th>
                  <th className="border border-black p-2">DATE OF BIRTH</th>
                  <th className="border border-black p-2">SIGNATURE</th>
                </tr>
              </thead>
              <tbody>{renderStudentRows()}</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-8">
        {isPrinting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-10 hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Print Attendance Sheet
          </button>
        )}
      </div>
    </div>
  );
};

export default AttendanceSheetForm;
