/* eslint-disable no-unused-vars */
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
      console.log(examId);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/batch/${batchId}`
        );
        const students = response.data.data.students;
        console.log(students);

        // Set the initial isAbsent state based on the fetched data
        const updatedStudents = students.map((student) => ({
          ...student,
          isAbsent: student.absent || false,
        }));

        // Calculate the initial absent count
        const initialAbsentCount = updatedStudents.filter(
          (student) => student.isAbsent
        ).length;

        setAbsentCount(initialAbsentCount);
        setStudentData(updatedStudents);
        console.log(updatedStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchBatchDetails();
  }, [setAbsentCountState]);

  const markAbsent = async (studentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/student/absent/${studentId}`
      );
      console.log(response);

      if (response.status === 200) {
        setStudentData((prevData) => {
          const updatedData = prevData.map((student) =>
            student._id === studentId ? { ...student, isAbsent: true } : student
          );

          // Update the absent count
          const updatedAbsentCount = updatedData.filter(
            (student) => student.isAbsent
          ).length;

          setAbsentCount(updatedAbsentCount);
          return updatedData;
        });
      }
    } catch (error) {
      console.error("Error marking student as absent:", error);
    }
  };

  const handleRowClick = (
    studentId,
    studentName,
    studentDob,
    studentProfilePicture,
    studentCenterId
  ) => {
    setStudentID(studentId);
    setStudentName(studentName);
    setStudentDob(studentDob);
    setStudentProfile(studentProfilePicture);
    setCenterId(studentCenterId);
    navigate("/dashboard/marksheet");
  };

  const handlegeneraldata = () => {
    navigate(`/dashboard/uploaddetails/${examId[0]}`);
  };

  return (
    <div className="mb-28 mt-10 border rounded-lg shadow-sm overflow-hidden p-4 bg-white">
      <div className="flex gap-5 items-center p-2">
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {studentData.map((student) => (
            <tr
              key={student._id}
              onClick={() =>
                handleRowClick(
                  student._id,
                  student.name,
                  student.dob,
                  student.profilepic,
                  student.cenid
                )
              }
              className="hover:bg-gray-100"
            >
              <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.redg_No}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    markAbsent(student._id);
                  }}
                  className={`p-2 text-sm font-medium rounded-3xl shadow-sm text-white ${
                    student.isAbsent
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
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
