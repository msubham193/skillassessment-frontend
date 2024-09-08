import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import { Loader2 } from "lucide-react"; // Assuming you are using this loader

const AttendanceSheetForm = () => {
  const pdfRef = useRef();
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
  const [isDownloading, setDownloading] = useState(false); // Added state for downloading

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

  const loadImages = () => {
    const images = pdfRef.current.querySelectorAll("img");
    return Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    }));
  };

  const downloadPDF = async () => {
    setDownloading(true);
    const input = pdfRef.current;
    const buttons = document.querySelectorAll(".download-button");

    buttons.forEach(button => button.style.display = "none");

    await loadImages();

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("attendance-sheet.pdf");

      buttons.forEach(button => button.style.display = "block");
      setDownloading(false); // Reset downloading state
    });
  };

  const renderStudentRows = () => {
    return formData.students.map((student, index) => (
      <tr key={student.uid}>
        <td className="border border-black p-2 text-center">{index + 1}</td>
        <td className="border border-black p-2 text-center">
          <img src={student.profilepic} alt={student.name} className="h-10 w-10 mx-auto" />
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
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="p-12 h-full">
      <div ref={pdfRef}>
        <div className="pdf-section p-12 h-full">
          <div className="flex justify-between items-center mb-4">
            <img src={logo} alt="Centurion University Logo" className="h-20 w-20 object-fill" />
            <div className="text-center">
              <h2 className="text-lg font-semibold">CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT</h2>
              <p className="text-sm">(NCVET Recognized Awarding Body)</p>
              <h3 className="text-xl font-bold mt-2">ATTENDANCE SHEET</h3>
            </div>
            <img src={formData.aaLogo} alt="Assessment Agency Logo" className="h-24 w-24" />
          </div>
          
          <table className="w-full border-collapse border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 w-1/2">Name of Assessment Agency</td>
                <td className="border border-black p-2">{formData.aaName}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Training Partner Name</td>
                <td className="border border-black p-2">{formData.tpName}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Center Name: {formData.centerName}</td>
                <td className="border border-black p-2">Center ID: {formData.centId}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Batch ABN: {formData.abn}</td>
                <td className="border border-black p-2">Sector: {formData.sector}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Course Name: {formData.courseName}</td>
                <td className="border border-black p-2">Course Code: {formData.courseCode}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Exam Date: {formData.examDate}</td>
                <td className="border border-black p-2">Batch No.: {formData.batchNo}</td>
              </tr>
            </tbody>
          </table>

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
                <tbody className="h-10">
                  <tr>
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
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
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
                    <td className="border border-black p-4" />
                  </tr>
                </tbody>
              </table>
            </div>


          <div className="mb-4">
            <h4 className="font-bold">Student Attendance</h4>
            <table className="w-full border-collapse border border-black mt-2">
              <thead>
                <tr>
                  <th className="border border-black p-2">SL. NO</th>
                  <th className="border border-black p-2">CANDIDATE PHOTO</th>
                  <th className="border border-black p-2">REGD. NO.</th>
                  <th className="border border-black p-2">CANDIDATE NAME</th>
                  <th className="border border-black p-2">FATHER NAME</th>
                  <th className="border border-black p-2">GENDER</th>
                  <th className="border border-black p-2">DATE OF BIRTH</th>
                  <th className="border border-black p-2">SIGNATURE</th>
                </tr>
              </thead>
              <tbody>
                {renderStudentRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isDownloading ? <Loader2 className="animate-spin" /> : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSheetForm;
