import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  assessmentAgencyNameState,
  courseNameState,
  examIdState,
} from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";


const MarksheetForm = () => {
  const navigate = useNavigate();

 
  const { studentId } = useParams();
  const [batchId, setBatchId] = useState(""); 
  const [assessmentDate, setAssessmentDate] = useState("");
  const [studentData, setStudentData] = useState({});
  const [batchData, setBatchData] = useState({});
  const [dob, setDob] = useState("");

  const [courseName, setCourseName] = useState("");
  const [nosData, setNosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMarksObtained, setTotalMarksObtained] = useState(0);
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState("Pass");
  const [totalPassMarks, setTotalPassMarks] = useState(0);

  const examId = useRecoilState(examIdState);
  const batchCourseName = useRecoilState(courseNameState);
  const trainingAgency = useRecoilState(tpNameState);
  const assessmentAgency = useRecoilState(assessmentAgencyNameState);
  const batchABN = useRecoilState(batchAbnState);
  const batchId = useRecoilState(batchIdState);
  const examDate = useRecoilState(examDateState);
  const centerCode = useRecoilState(setCenterIdState);
  const sectorName = useRecoilState(sectorState);
  const studentRedgNo = useRecoilState(setStudentRegdState);
  const studentName = useRecoilState(setStudentNameState);
  const studentDOB = useRecoilState(setStudentDobState);
  const studentProfilePic = useRecoilState(setStudentProfilePictureState);
  const studentId = useRecoilState(setStudentIdState);
  const total = useState(0);
  const totalTheorymark = useState(0);
  const totalPracticalMark = useState(0);
  const totalVivaMark = useState(0);
  const Result = useState("paas");
  const studentAttendance = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        console.log(studentDOB);
        const response = await axios.get(`${server}/course/course`);
        console.log(response.data.data);
        console.log(batchCourseName[0]);
        const course = response.data.data.find(
          (course) => course.courseName === batchCourseName[0]
        );
        console.log(course);
        setCourseName(course.courseName);
        if (course) {
          const initialNosData = course.Nos.map((nos) => ({
            description: nos.description,
            code: nos.code,
            credit: nos.credit,
            theoryMarks: "",
            practicalMarks: "",
            vivaMarks: "",
            totalMarks: nos.totalMarks,
            nosWisePassPercentage: nos.nosWisePassPercentage,
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
  console.log("course mateched", courseName)
  const handleChange = (index, field, value) => {
    const updatedNosData = nosData.map((nos, idx) =>
      idx === index ? { ...nos, [field]: value } : nos
    );
    setNosData(updatedNosData);
    calculateMarksObtained(updatedNosData);
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem("aaAuthToken");



    const payload = {
      examId: examId[0],
      courseName: courseName,
      TrainingPartner: trainingAgency[0],
      AssesmentAgencyName: assessmentAgency[0],
      studentAttendance: studentAttendance[0],
      batchABN: batchABN[0],
      batchId: batchId[0],
      examDate: examDate[0],
      centerCode: centerCode[0],
      sectorName: sectorName[0],
      studentRedgNo: studentRedgNo[0],
      studentName: studentName[0],
      studentDOB: studentDOB[0],
      studentProfilePic: studentProfilePic[0],
      studentId: studentId[0],
      Nos: nosData.map((nos) => ({
        code:nos.code,
        name: nos.description,
        Theory: nos.theoryMarks,
        Practical: nos.practicalMarks,
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

    try {
      // console.log(totalPracticalMark[0]);
      console.log(payload);
      console.log(payload.Nos);
      console.log(payload.totalPracticalMark);
      console.log(payload.totalVivaMark);
    
      console.log(token);
      // Submit to backend using Axios
      const response = await axios.post(`${server}/marks/upload`, payload, {
        Grade: grade,
      });

      if (response.data.success) {
        console.log("Marks uploaded successfully:", response.data);
        toast.success("Marks uploaded successfully");
        // navigate("/dashboard/students", { state: { studentId: studentId[0] } });
      } else {
        console.error("Error uploading marks:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error(error.response.data.error);
    } finally{
      setShowButton(false);

    }
  };
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
        <img src={studentProfilePic[0]} className="h-24 w-24"></img>
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
                value={studentRedgNo[0]}
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
                value={batchABN[0]}
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
                value={studentName[0]}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                value={studentDOB}
                className="block text-sm font-medium text-gray-700"
              >
                DATE OF BIRTH
              </label>
              <input
                id="dob"
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="assessment-date"
                className="block text-sm font-medium text-gray-700"
              >
                ASSESSMENT DATE
              </label>
              <input
                id="assessment-date"
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                    PASS MARKS
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.practicalMarks}
                        onChange={(e) =>
                          handleChange(index, "practicalMarks", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={nos.vivaMarks}
                        onChange={(e) =>
                          handleChange(index, "vivaMarks", e.target.value)
                        }
                      />
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Date of Issue
          </label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center">
          <p className="mb-6">Head – Centre for Skill Certification</p>
          <p className="mb-6">
            Centurion University of Technology and Management
          </p>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default MarksheetForm;
