/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const UploadDocuments = () => {
  const { examId, batchId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [resultFile, setResultFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [assessors, setAssessors] = useState([]);
  const [assesserror, setAssessError] = useState("");
  const [selectedAssessor, setSelectedAssessor] = useState("");
  const [studentAttedance, setStudentAttendance] = useState(0);
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);

  // fetch the list of Assessors
  useEffect(() => {
    const fetchAssessors = async () => {
      console.log(examId);
      console.log(assessmentAgencyId[0]);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/assessor/aa/${assessmentAgencyId[0]}`
        );
        console.log(response.data.data);
        setAssessors(response.data.data);
      } catch (error) {
        console.error("Error fetching assessors:", error);
        setAssessError("Error fetching assessors. Please try again.");
      }
      const storedAttendance = localStorage.getItem(`absentSudent_${batchId}`);
      if (storedAttendance !== null) {
        setStudentAttendance(Number(storedAttendance));
      }
    };

    fetchAssessors();
  }, []);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    let validPhotos = [];
    let errorMessage = "";

    if (files.length > 10) {
      errorMessage = "Please upload at most 10 photos.";
    } else {
      validPhotos = files.filter((file) => {
        if (file.size > 500 * 1024) {
          return false; // Filter out photos exceeding 500KB
        }
        return true;
      });

      if (validPhotos.length < files.length) {
        errorMessage =
          "Some photos are too large. Please upload photos smaller than 500KB each.";
      }
    }

    setPhotos(validPhotos);
    setPhotoError(errorMessage);

    if (errorMessage) {
      e.target.value = ""; // Clear the input field
    }
  };

  const handleAttendanceFileChange = (e) => {
    setAttendanceFile(e.target.files[0]);
  };

  const handleResultFileChange = (e) => {
    setResultFile(e.target.files[0]);
  };

  const handleAssessorChange = (e) => {
    setSelectedAssessor(e.target.value);
  };

  const handleChangeStudentAttendance = (e) => {
    setStudentAttendance(e.target.value);
  };

  // upload pdf Files
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (!attendanceFile) {
      setFileError("Unable to upload Attendance Sheet: select the file");
    }
    if (!resultFile) {
      setFileError("Unable to upload Result Sheet: select the file");
    }
    setFileError("");
    formData.append("attendanceSheet", attendanceFile);
    formData.append("resultSheet", resultFile);
    // Add any other data you need to send to the server here

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      console.log(examId);
      console.log(formData);
      const response = await axios.put(
        `http://localhost:8000/api/v1/exam/status/${examId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Files uploaded successfully:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading files:", error);
      setFileError("Error uploading file, please try again !");
    }
  };

  // upload images
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();

    if (photos.length > 10) {
      setPhotoError("Please select at most 10 images.");
      return;
    }

    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    console.log(formData);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/exam/images/${examId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle successful upload
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading photos:", error);
      setPhotoError("Error uploading photos. Please try again.");
    }
  };

  // set assessor to the exam
  const handleSetAssessor = async (e) => {
    e.preventDefault();

    if (!selectedAssessor) {
      setAssessError("Please select an assessor.");
      return;
    }
    setAssessError("");

    console.log(selectedAssessor);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/exam/addassessor/${examId}`,
        {
          assessorId: selectedAssessor,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error assigning assessor:", error);
      setAssessError("Error assigning assessor. Please try again.");
    }
  };

  const handleSetStudentAttendance = async (e) => {
    e.preventDefault();
    console.log(studentAttedance);
    const totalNoOfAssessedCandidates = Number(studentAttedance);

    if (isNaN(totalNoOfAssessedCandidates)) {
      toast.error(
        "Total number of assessed candidates must be a valid number."
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/exam/attendance/${examId}`,
        {
          totalNoOfAssessedCandidates,
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error assigning assessor:", error);
      setAssessError("Error assigning assessor. Please try again.");
    }
  };

  return (
    <div className="border flex flex-col gap-10 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-lg max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center text-indigo-800">
        Exam Status Updation
      </h1>
      <form onSubmit={handlePhotoSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Photographs{" "}
          <span className="text-xs">(min 10, max 500KB each)</span>
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="mt-1 block w-full max-w-xs p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
        />
        {photoError && (
          <p className="text-red-600 text-sm mt-2">{photoError}</p>
        )}
        <button
          type="submit"
          className="flex items-center justify-center mt-4 p-2 h-10 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaFileUpload className="inline-block mr-2" />
          Upload Photos
        </button>
      </form>

      <form onSubmit={handleSetAssessor} className="space-y-4">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Assessor:
          </label>
          <select
            name="language"
            id="language"
            onChange={handleAssessorChange}
            className="block w-full max-w-xs px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Assessor" selected>
              Select
            </option>
            {assessors.map((assessor) => (
              <option key={assessor._id} value={assessor._id}>
                {assessor.name}
              </option>
            ))}
          </select>
          {assesserror && (
            <p className="text-red-600 text-sm mt-2">{assesserror}</p>
          )}
          <button
            type="submit"
            className="flex items-center justify-center mt-4 p-2 h-10 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FaFileUpload className="inline-block mr-2" />
            Set Assessor
          </button>
        </div>
      </form>

      <form onSubmit={handleSetStudentAttendance} className="space-y-4">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Student Attended:
          </label>
          <input
            type="number"
            name="studentAttedance"
            value={studentAttedance}
            onChange={handleChangeStudentAttendance}
            className="mt-1 block h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
          />
          <button
            type="submit"
            className="flex items-center justify-center mt-4 p-2 h-10 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FaFileUpload className="inline-block mr-2" />
            Confirn
          </button>
        </div>
      </form>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Attendance Sheet
          </label>
          <input
            type="file"
            accept=".pdf, .xlsx, .xls, .csv"
            onChange={handleAttendanceFileChange}
            className="mt-1 block w-full max-w-xs p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Result Sheet
          </label>
          <input
            type="file"
            accept=".pdf, .xlsx, .xls, .csv"
            onChange={handleResultFileChange}
            className="mt-1 block w-full max-w-xs p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        {fileError && <p className="text-red-600 text-sm mt-2">{fileError}</p>}
        <button
          type="submit"
          className="flex items-center justify-center mt-4 p-2 h-10 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaFileUpload className="inline-block mr-2" />
          Upload Files
        </button>
      </form>

      <Toaster />
    </div>
  );
};

export default UploadDocuments;
