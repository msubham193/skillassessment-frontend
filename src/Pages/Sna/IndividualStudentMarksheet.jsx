/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualStudentMarksheet = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/student/${studentId}`);
        console.log(response.data.data);
        setStudentData(response.data.data.marks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loader while data is being fetched
  }

  if (!studentData) {
    return <div>No data available</div>; // Handle the case when there's no data
  }

  return (
    <div className="max-w-3xl mx-auto p-8 border border-green-600 rounded-lg font-cambria">
      <div className="flex justify-between mb-3">
        <img
          src="/cutm.jpg"
          alt="Centurion University Logo"
          className="w-16 h-24"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Centurion University of Technology and
            <br /> Management
          </h1>
          <p className="text-xl">(NCVET recognized Awarding Body)</p>
          <p className="my-4 text-xl">
            Scheme- <span></span>
          </p>
          <h2 className="text-2xl font-bold text-green-600 border-t-2 border-b-2 border-green-600 w-[210px] ml-28">
            M A R K S H E E T
          </h2>
        </div>
        <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-24 -mt-4" />
      </div>

      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="flex">
            <td className="flex-1 border px-2 font-medium">
              Name of Candidate:
            </td>
            {/* <td className="flex-1 border px-2">{studentData.studentName}</td> */}
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Son/Daughter/Ward of:</td>
            <td className="flex-1 border px-2">{/* {stude} */}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Qualification Name:</td>
            {/* <td className="flex-1 border px-2">{studentData.courseName}</td> */}
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Qualification Code:</td>
            {/* <td className="flex-1 border px-2">{studentData.batchABN}</td> */}
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">NSQF Level:</td>
            <td className="flex-1 border px-2">
              {/* Add NSQF Level if available */}
            </td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Sector:</td>
            {/* <td className="flex-1 border px-2">{studentData.sectorName}</td> */}
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Duration:</td>
            <td className="flex-1 border px-2">
              {/* Add Duration if available */}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border w-1/2">Assessor Registration No.</td>
            <td className="border w-1/2">Date of Birth</td>
          </tr>
          <tr className="text-center">
            {/* <td className="border">{studentData.studentRedgNo}</td> */}
            <td className="border">
              {/* {new Date(studentData.studentDOB).toLocaleDateString()} */}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border w-1/2">Assessment Batch No.</td>
            <td className="border w-1/2">Assessment Date</td>
          </tr>
          <tr className="text-center">
            {/* <td className="border">{studentData.batchId}</td> */}
            {/* <td className="border"> */}
            {/* {studentData.examDate */}
            {/* ? new Date(studentData.examDate).toLocaleDateString() */}
            {/* : "N/A"} */}
            {/* </td> */}
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="border font-medium">NOS Code</th>
            <th className="border font-medium">NOS Name</th>
            <th className="border font-medium">Maximum Marks</th>
            <th className="border font-medium">Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          {/* {studentData.Nos.map((nos, index) => (
            <tr key={index}>
              <td className="border">{nos._id}</td>
              <td className="border">{nos.name}</td>
              <td className="border">{nos.passMark}</td>
              <td className="border">{nos.MarksObtained}</td>
            </tr>
          ))} */}
        </tbody>
      </table>

      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="flex">
            <td className="w-1/2 border px-2 text-center font-medium">
              Total Marks Obtained
            </td>
            <td className="w-1/2 border px-2 text-center">
              {/* {studentData.total} */}
            </td>
          </tr>
          <tr className="flex">
            <td className="w-1/2 border px-2 text-center font-medium">Grade</td>
            <td className="w-1/2 border px-2 text-center">
              {/* {studentData.Grade} */}
            </td>
          </tr>
          <tr className="flex">
            <td className="w-1/2 border px-2 text-center font-medium">
              Result
            </td>
            <td className="w-1/2 border px-2 text-center">
              {/* {studentData.Result} */}
            </td>
          </tr>
        </tbody>
      </table>

      <img src="/placeholder.svg" alt="QR Code" className="w-24 h-24" />
      <div className="flex justify-between font-semibold items-center mt-1 mb-7">
        <div className="text-center text-sm">
          <p>
            Date of Issue: <span></span>
          </p>
          <p>
            Certificate No: <span></span>
          </p>
        </div>
        <div className="text-center font-semibold">
          <p>Head – Centre for Skill Certification</p>
          <p>Centurion University of Technology and Management</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualStudentMarksheet;
