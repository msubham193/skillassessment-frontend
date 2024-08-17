/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "@/main";

const MarkAbsentStudentList = () => {
  const { batchId } = useParams();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/batch/${batchId}`);
        const students = response.data.data.students;
        // Set the initial isAbsent state based on the fetched data
        const updatedStudents = students.map((student) => ({
          ...student,
          isAbsent: student.absent || false, // Assuming the key from the API response is `isabsent`
        }));
        console.log(updatedStudents);
        setStudentData(updatedStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchBatchDetails();
  }, [batchId]);

  const markAbsent = async (studentId) => {
    try {
      const response = await axios.put(`${server}/student/absent/${studentId}`);
      console.log(response);
      if (response.status === 200) {
        setStudentData((prevData) =>
          prevData.map((student) =>
            student._id === studentId ? { ...student, isAbsent: true } : student
          )
        );
      }
    } catch (error) {
      console.error("Error marking student as absent:", error);
    }
  };

  return (
    <div className="mb-28 mt-10 border rounded-lg shadow-sm overflow-hidden p-4 bg-white">
      <div className="flex gap-5 items-center p-2">
        <h1 className="text-2xl font-semibold mb-4">Batch Details</h1>
      </div>
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[100px]">
              Registration no.
            </th>
            <th className="py-2 px-6 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mobile
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Profile
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {studentData.map((student) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.uid}
              </td>
              <td className="py-2 px-6 whitespace-nowrap text-sm text-gray-700">
                {student.name}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {student.mobile}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {student.email}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                <img
                  src={student.profilepic}
                  alt="profile_picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                <button
                  onClick={() => markAbsent(student._id)}
                  className={`p-2 text-sm font-medium rounded-md shadow-sm text-white ${
                    student.isAbsent
                      ? "bg-red-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={student.isAbsent}
                >
                  {student.isAbsent ? "Absent" : "Mark Absent"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkAbsentStudentList;
