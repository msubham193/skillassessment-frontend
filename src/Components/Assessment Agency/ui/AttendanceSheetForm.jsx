/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { useRecoilState } from "recoil";
import { examIdState } from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import StudentTable from "./StudentTable";

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
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(examId);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/exam/attendance/${examId[0]}`
        );
        console.log(response.data.data); // Ensure the structure matches your needs
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

  const newStudents = [
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG001",
      name: "John Doe",
      fathername: "Robert Doe",
      gender: "Male",
      dob: "2000-01-01",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG002",
      name: "Jane Smith",
      fathername: "Michael Smith",
      gender: "Female",
      dob: "2001-02-02",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG003",
      name: "Alice Johnson",
      fathername: "David Johnson",
      gender: "Female",
      dob: "2002-03-03",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG004",
      name: "Bob Brown",
      fathername: "James Brown",
      gender: "Male",
      dob: "2003-04-04",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG005",
      name: "Charlie Davis",
      fathername: "Richard Davis",
      gender: "Male",
      dob: "2004-05-05",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG006",
      name: "Diana Evans",
      fathername: "Thomas Evans",
      gender: "Female",
      dob: "2005-06-06",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG007",
      name: "Eve White",
      fathername: "Christopher White",
      gender: "Female",
      dob: "2006-07-07",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG008",
      name: "Frank Harris",
      fathername: "Daniel Harris",
      gender: "Male",
      dob: "2007-08-08",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG009",
      name: "Grace Clark",
      fathername: "Matthew Clark",
      gender: "Female",
      dob: "2008-09-09",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG010",
      name: "Henry Lewis",
      fathername: "Joseph Lewis",
      gender: "Male",
      dob: "2009-10-10",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG011",
      name: "Ivy Walker",
      fathername: "George Walker",
      gender: "Female",
      dob: "2010-11-11",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG012",
      name: "Jack Hall",
      fathername: "Edward Hall",
      gender: "Male",
      dob: "2011-12-12",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG013",
      name: "Kathy Young",
      fathername: "Charles Young",
      gender: "Female",
      dob: "2012-01-01",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG014",
      name: "Leo Allen",
      fathername: "Mark Allen",
      gender: "Male",
      dob: "2013-02-02",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG015",
      name: "Mia King",
      fathername: "Steven King",
      gender: "Female",
      dob: "2014-03-03",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG016",
      name: "Noah Scott",
      fathername: "Paul Scott",
      gender: "Male",
      dob: "2015-04-04",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG017",
      name: "Olivia Green",
      fathername: "Andrew Green",
      gender: "Female",
      dob: "2016-05-05",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG018",
      name: "Peter Baker",
      fathername: "Benjamin Baker",
      gender: "Male",
      dob: "2017-06-06",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG019",
      name: "Quinn Adams",
      fathername: "Jacob Adams",
      gender: "Female",
      dob: "2018-07-07",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG020",
      name: "Ryan Nelson",
      fathername: "Larry Nelson",
      gender: "Male",
      dob: "2019-08-08",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG021",
      name: "Sophie Carter",
      fathername: "Donald Carter",
      gender: "Female",
      dob: "2020-09-09",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG022",
      name: "Tommy Perez",
      fathername: "Ronald Perez",
      gender: "Male",
      dob: "2021-10-10",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG023",
      name: "Uma Roberts",
      fathername: "Kenneth Roberts",
      gender: "Female",
      dob: "2022-11-11",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG024",
      name: "Victor Phillips",
      fathername: "Timothy Phillips",
      gender: "Male",
      dob: "2023-12-12",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG025",
      name: "Wendy Campbell",
      fathername: "Jason Campbell",
      gender: "Female",
      dob: "2024-01-01",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG026",
      name: "Xander Mitchell",
      fathername: "Ryan Mitchell",
      gender: "Male",
      dob: "2025-02-02",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG027",
      name: "Yara Roberts",
      fathername: "Gary Roberts",
      gender: "Female",
      dob: "2026-03-03",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG028",
      name: "Zane Turner",
      fathername: "Kevin Turner",
      gender: "Male",
      dob: "2027-04-04",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG029",
      name: "Ava Lee",
      fathername: "Scott Lee",
      gender: "Female",
      dob: "2028-05-05",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG030",
      name: "Ben Wilson",
      fathername: "Frank Wilson",
      gender: "Male",
      dob: "2029-06-06",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG031",
      name: "Chloe Moore",
      fathername: "Jeffrey Moore",
      gender: "Female",
      dob: "2030-07-07",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG032",
      name: "David Harris",
      fathername: "Gregory Harris",
      gender: "Male",
      dob: "2031-08-08",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG033",
      name: "Ella Martin",
      fathername: "Harold Martin",
      gender: "Female",
      dob: "2032-09-09",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG034",
      name: "Felix Thompson",
      fathername: "Keith Thompson",
      gender: "Male",
      dob: "2033-10-10",
    },
    {
      profilepic: "https://via.placeholder.com/150",
      uid: "REG035",
      name: "Gina Walker",
      fathername: "Louis Walker",
      gender: "Female",
      dob: "2034-11-11",
    },
  ];

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

      // Show all buttons
      buttons.forEach((button) => button.classList.remove("hidden-button"));
    });
  };

  const totalPages = Math.ceil(newStudents.length / STUDENTS_PER_PAGE);

  return (
    <div className="p-12 h-full">
      <div className="" ref={pdfRef}>
        <div className="pdf-section p-12 h-full">
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
                <h3 className="text-xl font-bold mt-10">ATTENDANCE SHEET</h3>
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
                  {centerName}
                </td>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {centId}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {abn}
                </td>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {sector}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {courseName}
                </td>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {courseCode}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {examDate}
                </td>
                <td className="border border-black p-2 text-xl font-semibold text-center">
                  {batchNo}
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

          {/* Dynamically render student tables based on pages */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const start = index * STUDENTS_PER_PAGE;
            const end = start + STUDENTS_PER_PAGE;
            const studentsToShow = students.slice(start, end);
            if (studentsToShow.length >= 10) {
              return (
                <div className="pdf-section p-12 h-full" key={index}>
                  <StudentTable students={studentsToShow} />
                </div>
              );
            }
          })}
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
      >
        Download PDF
      </button>
    </div>
  );
};

export default AttendanceSheetForm;
