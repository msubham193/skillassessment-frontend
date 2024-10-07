import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  assessmentAgencyNameState,
  courseNameState,
  examIdState,
} from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";
import { toast } from "react-toastify";
import { Button } from "@/components(shadcn)/ui/button";

const MarksheetForm = () => { 
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [batchId, setBatchId] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [batchData, setBatchData] = useState({});
  const [dob, setDob] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [nosData, setNosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [totalMarksObtained, setTotalMarksObtained] = useState(0);
  const [grade, setGrade] = useState(null);
  const [result, setResult] = useState("Pass");
  const [totalPassMarks, setTotalPassMarks] = useState(0);
  const examId = useRecoilState(examIdState);
  const batchCourseName = useRecoilState(courseNameState);
  const assessmentAgency = useRecoilState(assessmentAgencyNameState);
  const studentAttendance = useState(false);
  const [errors, setErrors] = useState({});



  //function for fettch course..############################
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${server}/course/course`);
        console.log(response.data.data);
        const course = response.data.data.find(
          (course) => course.courseName === batchCourseName[0]
        );
        console.log(course.Nos);
        setCourseName(course.courseName);
        if (course) {
          const initialNosData = course?.Nos.map((nos) => ({
            description: nos.description,
            code: nos.code,
            credit: nos.credit,
            fullTheoryMark:nos.theoryMarks,
            fullPracticalMark:nos.practicalMarks,
            fullVivaMark:nos.vivaMarks,
            nosType:nos?.nosType ||"N/A",
            theoryMarks: "", // User will input this manually
            practicalMarks: "", // User will input this manually
            vivaMarks: "", // User will input this manually
            passMarks: nos.totalMarks, // Fetched and shown
            marksObtained: "",
          }));
          setNosData(initialNosData);
          const totalPassMarks = course.Nos.reduce(
            (sum, nos) => sum + nos.totalMarks,
            0
          );
          setTotalPassMarks(totalPassMarks);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  //function for fetch student data by id#########################
  useEffect(() => {
    const fetchStudenDetails = async () => {
      try {
        const response = await axios.get(`${server}/student/${studentId}`);
        console.log("Student by ID", response.data.data);
        setStudentData(response.data.data);
        const formattedDOB = new Date(response.data.data?.dob)
          .toISOString()
          .split("T")[0];
        setDob(formattedDOB);
        setBatchId(response.data.data?.enrolledBatch);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudenDetails();
  }, []);
  //function for convert the date ##################
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  //function for fetch exam date from exam model by exam id..###############################
  useEffect(() => {
    fetchExam();
  }, []);
  const fetchExam = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/exam/${examId[0]}`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      // setBatchData(response.data.data);
      console.log(formatDate(response.data.data?.assesmentdate));
      console.log("exam details", response.data.data);
      setBatchData(response.data.data.batchId);
      setAssessmentDate(formatDate(response.data.data?.assesmentdate));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //function for take input for nos..##############################
  const handleChange = (index, field, value) => {
    const updatedNosData = nosData.map((nos, idx) => {
      if (idx === index) {
        // Validation logic for each field
        let error = null;
        if (field === "theoryMarks" && value > nos.fullTheoryMark) {
          error = `Theory marks cannot exceed ${nos.fullTheoryMark}`;
        } else if (field === "practicalMarks" && value > nos.fullPracticalMark) {
          error = `Practical marks cannot exceed ${nos.fullPracticalMark}`;
        } else if (field === "vivaMarks" && value > nos.fullVivaMark) {
          error = `Viva marks cannot exceed ${nos.fullVivaMark}`;
        }

        if (!error) {
          // No error, update the field value
          return { ...nos, [field]: value, error: null };
        } else {
          // Set the error field in the corresponding item
          return { ...nos, error };
        }
      }
      return nos;
    });

    setNosData(updatedNosData);
    calculateMarksObtained(updatedNosData);
  };

  //function for calculate the total mark
  const calculateMarksObtained = (data) => {
    const updatedData = data.map((nos) => ({
      ...nos,
      marksObtained:
        parseInt(nos.theoryMarks || 0, 10) +
        parseInt(nos.practicalMarks || 0, 10) +
        parseInt(nos.vivaMarks || 0, 10),
    }));
    setNosData(updatedData);
    const totalMarks = updatedData.reduce(
      (sum, nos) => sum + nos.marksObtained,
      0
    );
    setTotalMarksObtained(totalMarks);
    calculateGradeAndResult(totalMarks);
  };
  //function for callculate the greade ...################################
  const calculateGradeAndResult = (totalMarks) => {
    const percentage = (totalMarks / totalPassMarks) * 100;
    let grade = "";
    let result = "Pass";
    if (percentage >= 90) {
      grade = "A+";
    } else if (percentage >= 80) {
      grade = "A";
    } else if (percentage >= 70) {
      grade = "B+";
    } else if (percentage >= 60) {
      grade = "B";
    } else if (percentage >= 50) {
      grade = "C";
    } else {
      grade = "F";
      result = "Fail";
    }
    setGrade(grade);
    setResult(result);
  };

  //create a validation function
  const validateFields = () => {
    const validationErrors = {};
    if (!courseName) validationErrors.courseName = "Course Name is required";
    if (!dob) validationErrors.dob = "Date of Birth is required";
    if (!assessmentDate)
      validationErrors.assessmentDate = "Assessment Date is required";
    nosData.forEach((nos, index) => {
      if (!nos.theoryMarks && nos.fullTheoryMark>0)
        validationErrors[`theoryMarks_${index}`] = "Theory marks required";
      if (!nos.practicalMarks && nos.fullPracticalMark>0)
        validationErrors[`practicalMarks_${index}`] =
          "Practical marks required";
      if (!nos.vivaMarks && nos.fullVivaMark>0)
        validationErrors[`vivaMarks_${index}`] = "Viva marks required";
    });
    
    return validationErrors;
  };

  //this is a function for add the  mark in result sheet of  student........#####################
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
  console.log("nosDtta",nosData);
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all the field before submitting.", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      return; 
    }
  
    const token = localStorage.getItem("aaAuthToken");
  
    const payload = {
      examId: examId[0],
      courseName: courseName,
      TrainingPartner: batchData?.trainingOrganization,
      AssesmentAgencyName: assessmentAgency[0],
      studentAttendance: studentAttendance[0],
      batchABN: batchData?.ABN_Number,
      batchId: batchData?._id,
      examDate: assessmentDate,
      centerCode: batchData?.CenterCode,
      sectorName: batchData?.sectorName,
      studentRedgNo: studentData?.redg_No,
      studentName: studentData?.name,
      studentDOB: dob,
      studentProfilePic: studentData?.profilepic,
      studentId: studentData?._id,
      Nos: nosData.map((nos) => ({
        code: nos.code,
        name: nos.description,
        Theory: nos.theoryMarks,
        Practical: nos.practicalMarks,
        nosType:nos?.nosType,
        Viva: nos.vivaMarks,
        Total: nos.marksObtained,
        passMark: nos.passMarks,
        MarksObtained: nos.marksObtained,
      })),
      total: totalMarksObtained,
      totalTheorymark: nosData.reduce(
        (sum, nos) => sum + parseInt(nos.theoryMarks || 0, 10),
        0
      ), 
      totalPracticalMark: nosData.reduce(
        (sum, nos) => sum + parseInt(nos.practicalMarks || 0, 10),
        0
      ),
      totalVivaMark: nosData.reduce(
        (sum, nos) => sum + parseInt(nos.vivaMarks || 0, 10),
        0
      ),
      Grade: grade,
      Result: result,
    };
  
    // Print the payload
    console.log("Payload:", payload);
  
    try {
      // Submit to backend using Axios
      setShowButton(true);
      const response = await axios.post(`${server}/marks/upload`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success) {
        toast.success("Marks uploaded successfully", {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => {
          navigate(`/dashboard/students/${batchId}`);
        }, 1000);
      } else {
        console.error("Error uploading marks:", response.data.message);
        toast.error("Failed to upload marks: " + response.data.message, {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Failed to upload marks", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setShowButton(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">
          Centurion University of Technology and Management
        </h2>
        <p className="text-lg">(NCVET recognized Awarding Body)</p>
        <p className="text-xl">{assessmentAgency}</p>
        <h3 className="text-xl mt-4">Marksheet</h3>
      </div>
      <div className="mb-2">
        <img src={studentData?.profilepic} className="h-24 w-24"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-5xl mx-auto p-4 border">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <label
                htmlFor="course-name"
                className="block text-sm font-medium text-gray-700"
              >
                COURSE NAME
              </label>
              <input
                id="course-name"
                value={courseName}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="candidate-reg-no"
                className="block text-sm font-medium text-gray-700"
              >
                CANDIDATE REG. NO.
              </label>
              <input
                id="candidate-reg-no"
                value={studentData?.redg_No}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="abn-no"
                className="block text-sm font-medium text-gray-700"
              >
                ABN NO.
              </label>
              <input
                id="abn-no"
                value={batchData?.ABN_Number}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="candidate-name"
                className="block text-sm font-medium text-gray-700"
              >
                CANDIDATE NAME
              </label>
              <input
                id="candidate-name"
                value={studentData?.name}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setDob(e.target.value)} // Allow DOB change
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium" htmlFor="dob">
                Assessment Date
              </label>
              <input
                type="date"
                id="assessmentDate"
                value={assessmentDate}
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setAssessmentDate(e.target.value)} // Allow DOB change
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SL NO.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NOS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Credit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Theory
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Practical
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Viva
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    TOTAL MARKS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    MARKS OBTAINED
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nosData.map((nos, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{nos.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nos.credit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.theoryMarks}
                        onChange={(e) =>
                          handleChange(index, "theoryMarks", e.target.value)
                        }
                      />
                      {nos.error && nos.error.includes("Theory marks") && (
                        <span className="text-red-500 text-sm">
                          {nos.error}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.practicalMarks}
                        onChange={(e) =>
                          handleChange(index, "practicalMarks", e.target.value)
                        }
                      />
                      {nos.error && nos.error.includes("Practical marks") && (
                        <span className="text-red-500 text-sm">
                          {nos.error}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.vivaMarks}
                        onChange={(e) =>
                          handleChange(index, "vivaMarks", e.target.value)
                        }
                      />
                      {nos.error && nos.error.includes("Viva marks") && (
                        <span className="text-red-500 text-sm">
                          {nos.error}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="block w-full p-2 border border-gray-300 rounded-md">
                        {nos.passMarks}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.marksObtained}
                        onChange={(e) =>
                          handleChange(index, "marksObtained", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label
                htmlFor="total-marks"
                className="block text-sm font-medium text-gray-700"
              >
                TOTAL MARKS OBTAINED
              </label>
              <input
                id="total-marks"
                value={totalMarksObtained}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700"
              >
                GRADE
              </label>
              <input
                id="grade"
                value={grade}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="result"
                className="block text-sm font-medium text-gray-700"
              >
                RESULT
              </label>
              <input
                id="result"
                value={result}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
     {/*
     <div className="mb-6">
     <label className="block text-sm font-medium text-gray-700">
       Date of Issue
     </label>
     <input
       type="date"
       className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
     />
   </div>
     */}
        <div className="text-center">
          <p className="mb-6">Head – Centre for Skill Certification</p>
          <p className="mb-6">
            Centurion University of Technology and Management
          </p>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {showButton ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MarksheetForm;
