import React, { useEffect, useState } from "react";
import {useRecoilValue } from "recoil";
import { assessmentAgencyIdState } from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "@/main";
import { Loader } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import { toast } from "react-toastify";

const UploadDocuments = () => { 
  const navigate = useNavigate();
  const { examId, batchId } = useParams();
  const [loader, setLoader] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [resultFile, setResultFile] = useState(null);
  const [assessors, setAssessors] = useState([]);
  const [selectedAssessor, setSelectedAssessor] = useState("");
  const [studentAttendance, setStudentAttendance] = useState(0);
  const [step, setStep] = useState(1); // Tracks the current step
  const [isAttendanceFileSelected, setIsAttendanceFileSelected] = useState(false);
  const [isResultFileSelected, setIsResultFileSelected] = useState(false);
  const [isPhotosSelected, setIsPhotosSelected] = useState(false);
  const assessmentAgencyId = useRecoilValue(assessmentAgencyIdState);

  useEffect(() => {
    const fetchAssessors = async () => {
      try {
        const response = await axios.get(`${server}/assessor/aa/${assessmentAgencyId}`);
        setAssessors(response.data.data);
        const storedAttendance = localStorage.getItem(`absentSudent_${batchId}`);
        if (storedAttendance !== null) {
          setStudentAttendance(Number(storedAttendance));
        }
      } catch (error) {
        toast.error("Error fetching assessors", {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    };

    if (assessmentAgencyId && batchId) {  // Fetch only if assessmentAgencyId and batchId are available
      fetchAssessors();
    }
  }, [assessmentAgencyId, batchId]);

  const handleSetAssessor = async (e) => {
    e.preventDefault();
    if (!selectedAssessor) return toast.error("Please select an assessor.");
    try {
      setLoader(true);
      const response = await axios.put(`${server}/exam/addassessor/${examId}`, {
        assessorId: selectedAssessor,
      });
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setStep(2); // Move to step 2
    } catch (error) {
      toast.error("Error assigning assessor. Please try again.", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleSetStudentAttendance = async (e) => {
    e.preventDefault();
    if (isNaN(Number(studentAttendance))) {
      return toast.error("Total number of assessed candidates must be a valid number.");
    }
    try {
      setLoader(true);
      const response = await axios.put(`${server}/exam/attendance/${examId}`, {
        attendanceNumber: Number(studentAttendance),
      });
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setStep(3); // Move to step 3
    } catch (error) {
      toast.error("Error assigning attendance. Please try again.", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleSubmitFiles = async (e) => {
    e.preventDefault();

    // Check if both files are selected
    if (!attendanceFile || !resultFile) {
      return toast.error("Please upload both attendance and result sheets.");
    }

    const formData = new FormData();
    formData.append("attendanceSheet", attendanceFile);
    formData.append("resultSheet", resultFile);

    try {
      setLoader(true);
      const response = await axios.put(`${server}/exam/status/${examId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setStep(4); // Move to step 4
    } catch (error) {
      toast.error("Error uploading files. Please try again.", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoader(false);
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();

    // Check if any photos are selected
    if (photos.length === 0) {
      return toast.error("Please select at least one picture for upload.");
    }

    const formData = new FormData();
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      setLoader(true);
      const response = await axios.put(`${server}/exam/images/${examId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Photos uploaded successfully & This batch is successfully completed", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/dashboard/uploadresult");
      }, 1000); 
     
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to upload Photo", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="border bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-8 rounded-lg shadow-lg max-w-xl mx-auto mt-24">
      <h1 className="text-2xl font-semibold text-center text-indigo-800">
        Exam Status Updation
      </h1>

      {/* Tracker Progress */}
      <div className="flex justify-center space-x-7 mb-6 mt-5">
        <div
          className={`${
            step >= 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-lg text-[10px] font-semibold shadow-md`}
        >
          Step 1: Set Assessor
        </div>
        <div
          className={`${
            step >= 2 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-lg text-[10px] font-semibold shadow-md`}
        >
          Step 2: Add Attendance
        </div>
        <div
          className={`${
            step >= 3 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-lg text-[10px] font-semibold shadow-md`}
        >
          Step 3: Upload Files
        </div>
        <div
          className={`${
            step >= 4 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-lg text-[10px] font-semibold shadow-md`}
        >
          Step 4: Upload Photos
        </div>
      </div>

      {/* Step 1: Set Assessor */}
      {step === 1 && (
        <form onSubmit={handleSetAssessor} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Assessor:</label>
          <select onChange={(e) => setSelectedAssessor(e.target.value)} className="block w-full">
            <option value="" disabled selected>
              Select an assessor
            </option>
            {assessors.map((assessor) => (
              <option key={assessor._id} value={assessor._id}>
                {assessor.name}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loader ? <Loader /> : "Set Assessor"}
          </Button>
        </form>
      )}

      {/* Step 2: Set Student Attendance */}
      {step === 2 && (
        <form onSubmit={handleSetStudentAttendance} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Number of Students Attended:
          </label>
          <input
            type="number"
            value={studentAttendance}
            onChange={(e) => setStudentAttendance(e.target.value)}
            className="block w-full"
          />
          <Button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loader ? <Loader /> : "Confirm Attendance"}
          </Button>
        </form>
      )}

      {/* Step 3: Upload Attendance and Result Files */}
      {step === 3 && (
        <form onSubmit={handleSubmitFiles} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Attendance Sheet:
          </label>
          <input
            type="file"
            accept=".pdf, .xlsx, .xls, .csv"
            onChange={(e) => {
              setAttendanceFile(e.target.files[0]);
              setIsAttendanceFileSelected(!!e.target.files[0]);
            }}
          />
          <label className="block text-sm font-medium text-gray-700">
            Upload Result Sheet:
          </label>
          <input
            type="file"
            accept=".pdf, .xlsx, .xls, .csv"
            onChange={(e) => {
              setResultFile(e.target.files[0]);
              setIsResultFileSelected(!!e.target.files[0]);
            }}
          />
          <Button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            disabled={!isAttendanceFileSelected || !isResultFileSelected}
          >
            {loader ? <Loader /> : "Upload Files"}
          </Button>
        </form>
      )}

      {/* Step 4: Upload Photos */}
      {step === 4 && (
        <form onSubmit={handlePhotoSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Photos (max 10, 500KB each):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setPhotos(Array.from(e.target.files));
              setIsPhotosSelected(e.target.files.length > 0);
            }}
          />
          <Button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            disabled={!isPhotosSelected}
          >
            {loader ? <Loader /> : "Upload Photos"}
          </Button>
        </form>
      )}

    </div>
  );
};

export default UploadDocuments;
