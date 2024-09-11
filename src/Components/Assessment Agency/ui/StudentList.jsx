import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  examIdState,
  setAbsentCountState,
  setCenterIdState,
  setStudentDobState,
  setStudentIdState,
  setStudentNameState,
  setStudentProfilePictureState,
} from "../Atoms/AssessmentAgencyAtoms";
import { FaArrowRight } from "react-icons/fa"; 
import { server } from "@/main";

const StudentList = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const [studentData, setStudentData] = useState([]);
  const setStudentID = useSetRecoilState(setStudentIdState);
  const setStudentName = useSetRecoilState(setStudentNameState);
  const setStudentDob = useSetRecoilState(setStudentDobState);
  const setStudentProfile = useSetRecoilState(setStudentProfilePictureState);
  const setCenterId = useSetRecoilState(setCenterIdState);
  const setAbsentCount = useSetRecoilState(setAbsentCountState);
  const examId = useRecoilState(examIdState);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/batch/${batchId}`);
        const students = response.data.data.students;

        const updatedStudents = students.map((student) => ({
          ...student,
          isAbsent: student.absent || false,
        }));

        const initialAbsentCount = updatedStudents.filter(
          (student) => student.isAbsent
        ).length;

        setAbsentCount(initialAbsentCount);
        setStudentData(updatedStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchBatchDetails();
  }, [batchId, setAbsentCount]);

  // Function to mark a student as absent
  const markAbsent = async (studentId) => {
    try {
      const response = await axios.put(`${server}/student/absent/${studentId}`);
      if (response.status === 200) {
        setStudentData((prevData) => {
          const updatedData = prevData.map((student) =>
            student._id === studentId ? { ...student, isAbsent: true } : student
          );

          const updatedAbsentCount = updatedData.filter(
            (student) => student.isAbsent
          ).length;

          localStorage.setItem(`absentSudent_${batchId}`, updatedAbsentCount);
          return updatedData;
        });
      }
    } catch (error) {
      console.error("Error marking student as absent:", error);
    }
  };

  // Function to navigate to general data upload
  const handlegeneraldata = () => {
    navigate(`/dashboard/uploaddetails/${examId[0]}/${batchId}`);
  };

  return (
    <div className="mb-28 mt-10 border rounded-lg shadow-sm overflow-hidden p-4 bg-white">
      <div className="flex flex-col gap-5 items-start p-2">
        <p className="text-red-800">
          *Note: Once a student is marked as absent, you will not be able to mark them as present or upload their marks for that session.
        </p>
        <h1 className="text-2xl font-semibold mb-4">Batch Details</h1>
      </div>
      <table className="min-w-full mb-4 border rounded-lg">
        <thead className="bg-blue-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Registration no.
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Name
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Mobile
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Email
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Profile
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Mark Absent
            </th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">
              Marks Upload Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {studentData.map((student) => (
            <tr
              key={student._id}
              className={`${
                student.isAbsent
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() =>
                !student.isAbsent && !student.markUploadStatus && navigate(`/dashboard/marksheet/${student?._id}`)
              }
            >
              <td className="py-2 px-4 whitespace-nowrap text-sm font-medium">
                {student.redg_No}
              </td>
              <td className="py-2 px-6 whitespace-nowrap text-sm">
                {student.name}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm">
                {student.mobile}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm">
                {student.email}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm">
                <img
                  src={student.profilepic}
                  alt="profile_picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAbsent(student._id);
                  }}
                  className={`p-2 text-sm font-medium rounded-xl shadow-sm  ${
                    student.isAbsent || student.markUploadStatus
                      ? "bg-red-300 cursor-not-allowed text-red-800"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                  disabled={student.isAbsent || student.markUploadStatus} // Disable if student is absent or marks are uploaded
                >
                  {student.isAbsent ? "Absent" : "Mark Absent"}
                </button>
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    student.markUploadStatus
                      ? "bg-green-300 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.markUploadStatus ? "Completed" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          className="mt-2 p-2 border border-transparent text-md font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-700"
          onClick={handlegeneraldata}
        >
          <FaArrowRight className="inline-block mr-2" />
          Proceed Further
        </button>
      </div>
    </div>
  );
};

export default StudentList;
