import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import { Loader2 } from "lucide-react";

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
  const [isDownloading, setDownloading] = useState(false);

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

  useEffect(() => {
    const loadAndConvertImages = async () => {
      const aaLogoBase64 = await convertImageToBase64(formData.aaLogo);
      const studentPhotosBase64 = {};

      for (const student of formData.students) {
        studentPhotosBase64[student.uid] = await convertImageToBase64(student.profilepic);
      }

      setBase64Images({
        aaLogo: aaLogoBase64,
        studentPhotos: studentPhotosBase64
      });
    };

    if (formData.aaLogo && formData.students.length > 0) {
      loadAndConvertImages();
    }
  }, [formData]);

  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
       img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url 
    });
  };

  const downloadPDF = async () => {
    setDownloading(true);
    const input = pdfRef.current;
    const buttons = document.querySelectorAll(".download-button");

    // Hide the buttons during PDF generation
    buttons.forEach((button) => (button.style.display = "none"));

    try {
      const canvas = await html2canvas(input, {
        scale: 3, // Increase scale for better quality
        useCORS: true, // Handle cross-origin images
        logging: true, // Log issues if any
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first image (first page)
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // If content is longer than one page, add more pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Save the generated PDF
      pdf.save("attendance-sheet.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    // Show the buttons back after PDF generation
    buttons.forEach((button) => (button.style.display = "block"));
    setDownloading(false);
  };

  const renderStudentRows = () => {
    return formData.students.map((student, index) => (
      <tr key={student.uid}>
        <td className="border border-black p-2 text-center">{index + 1}</td>
        <td className="border border-black p-2 text-center">
          <img src={base64Images.studentPhotos[student.uid] || student.profilepic} alt={student.name} className="h-10 w-10 mx-auto" />
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
    <div className="p-12 h-full">
      <div ref={pdfRef}>
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
            <img src={base64Images.aaLogo || formData.aaLogo} alt="Assessment Agency Logo" className="h-24 w-24" />
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
                  <td className="border border-black p-4">{assessor.name }</td>
                  <td className="border border-black p-4">
                    {assessor.qualification }
                  </td>
                  <td className="border border-black p-4">
                    {assessor.contact}
                  </td>
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
                  <th className="border border-black p-2">FATHER NAME</th>
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

      {/* Download Button */}
      <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isDownloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDownloading ? <Loader2 className="animate-spin mx-auto" /> : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSheetForm;
