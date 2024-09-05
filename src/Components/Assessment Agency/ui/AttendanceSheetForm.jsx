/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import StudentTable from "./StudentTable";
import { server } from "@/main";
import StudentTable10 from "./StudentTable10";
import { Loader2 } from "lucide-react";

const STUDENTS_PER_PAGE = 10;

const AttendanceSheetForm = () => {
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
  const [aaLogo, setAaLogo] = useState(null);
  const [students, setStudents] = useState([]);
  const [isDownloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(examId);
      try {
        const response = await axios.get(
          `${server}/exam/attendance/${examId[0]}`
        );
        console.log(response.data.data); // Ensure the structure matches your needs
        const data = response.data.data;
        setAaLogo(data.assesmentAgencyId.logo);
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

  const loadImages = () => {
    const images = pdfRef.current.querySelectorAll("img");
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    return Promise.all(promises);
  };

  const downloadPDF = async () => {
    setDownloading(true);
    const input = pdfRef.current;
    const buttons = document.querySelectorAll(".download-button");

    // Hide all buttons
    buttons.forEach((button) => button.classList.add("hidden-button"));

    // await loadImages(); // Ensure images are loaded

    const generatePDFPage = (section) => {
      return html2canvas(section, { scale: 2 }).then((canvas) => {
        return canvas.toDataURL("image/png");
      });
    };

    const sections = document.querySelectorAll(".pdf-section");
    const pagesPromises = Array.from(sections).map((section) =>
      generatePDFPage(section)
    );

    Promise.all(pagesPromises).then((pages) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pages.forEach((page, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(page, "PNG", 0, 0, pdfWidth, pdfHeight);
      });

      pdf.save("attendance-sheet.pdf");

      setDownloading(false);

      // Show all buttons
      buttons.forEach((button) => button.classList.remove("hidden-button"));
    });
  };

  return (
    <div className="p-12 h-full">
      <div className="" ref={pdfRef}>
        <div className="">
          <div className="pdf-section p-12 h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-16">
                <div className="mr-14">
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
                  <h3 className="text-xl font-bold mt-10">ATTENDANCE SHEET</h3>
                </div>
                <div className="ml-20">
                  <img
                    src={aaLogo}
                    alt="Centurion University Logo"
                    className="h-48 w-36"
                  />
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

            <StudentTable students={students.slice(0, 5)} />
          </div>

          <div>
            {/* Dynamically render StudentTable10 for the remaining students in groups of 10 */}
            {Array.from({ length: Math.ceil((students.length - 5) / 10) }).map(
              (_, index) => {
                const start = 5 + index * 10; // Start after the first 5 students
                const end = start + 10;
                const studentsToShow = students.slice(start, end);

                return (
                  <div className="pdf-section p-12 h-full" key={index}>
                    <StudentTable10 students={studentsToShow} />
                  </div>
                );
              }
            )}
          </div>
          <div className="flex justify-between mt-32 gap-60">
            <div className="border-t border-black p-2 w-1/2 text-center">
              Signature of Centre head
            </div>
            <div className="border-t border-black p-2 w-1/2 text-center">
              Signature of Assessor
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn bg-[#0066ff] text-base text-white font-semibold px-3 py-1 rounded duration-500 hover:bg-[#3f37c9] download-button"
        onClick={downloadPDF}
        disabled={isDownloading}
      >
        {isDownloading ? <div className="flex items-center gap-1"><Loader2 className="animate-spin h-5" />Downloading..</div> : "Download PDF"}
      </button>
    </div>
  );
};

export default AttendanceSheetForm;
