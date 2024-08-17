/* eslint-disable no-unused-vars */
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewResult = () => {
  const { batchId } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await axios.get(
          `${server}/batch/${batchId}`
        );
        console.log(respone.data.data.students);
        const data = respone.data.data.students;
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (studentId) => {
    console.log(studentId);
    navigate(`/sna/studentresult/${studentId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">MPR ID</th>
            <th className="py-3 px-6 text-left">SNA ID</th>
            <th className="py-3 px-6 text-left">DOB</th>
            <th className="py-3 px-6 text-left">Gender</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            {/* <th className="py-3 px-6 text-left">Address</th> */}
            {/* <th className="py-3 px-6 text-left">Category</th> */}
            {/* <th className="py-3 px-6 text-left">Course</th> */}
            <th className="py-3 px-6 text-left">Marks Upload Status</th>
            <th className="py-3 px-6 text-left">Absent</th>
            <th className="py-3 px-6 text-left">Grade</th>
            {/* <th className="py-3 px-6 text-left">Father's Name</th> */}
            {/* <th className="py-3 px-6 text-left">Mother's Name</th> */}
            {/* <th className="py-3 px-6 text-left">Sector</th> */}
            {/* <th className="py-3 px-6 text-left">State</th> */}
            {/* <th className="py-3 px-6 text-left">Nationality</th> */}
            {/* <th className="py-3 px-6 text-left">Training Start Date</th> */}
            {/* <th className="py-3 px-6 text-left">Training End Date</th> */}
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {students.map((student, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
              onClick={() => {
                handleRowClick(student._id);
              }}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {student.name}
              </td>
              <td className="py-3 px-6 text-left">{student.MPR_Id}</td>
              <td className="py-3 px-6 text-left">{student.SNA_Id}</td>
              <td className="py-3 px-6 text-left">
                {new Date(student.dob).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">{student.gender}</td>
              <td className="py-3 px-6 text-left">{student.email}</td>
              <td className="py-3 px-6 text-left">{student.mobile}</td>
              {/* <td className="py-3 px-6 text-left">{`${student.address}, ${student.city}, ${student.district}, ${student.state}, ${student.pincode}`}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.category}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.course}</td> */}
              <td className="py-3 px-6 text-left">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-white ${
                    student.markUploadStatus ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {student.markUploadStatus ? "Uploaded" : "Pending"}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {student.absent ? "Yes" : "No"}
              </td>
              <td className="py-3 px-6 text-left">{student.Grade}</td>
              {/* <td className="py-3 px-6 text-left">{student.fathername}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.mothername}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.sector_name}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.state}</td> */}
              {/* <td className="py-3 px-6 text-left">{student.nationality}</td> */}
              {/* <td className="py-3 px-6 text-left">
                {new Date(student.traininstartdate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(student.trainingenddate).toLocaleDateString()}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResult;
