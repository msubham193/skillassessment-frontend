import React, { useState, useEffect } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTeacher = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState({});

  const TeacherLabels = [
    "name",
    "phoneNumber",
    "email",
    "educationQualification_1",
    "educationQualification_2",
    "educationQualification_3",
    "educationQualification_4",
    "certification_course",
    "relevant_industryExperience",
    "other_expreience",
    "PAN_CARD_NO",
    "AADHAR_NO",
    "state",
    "city",
    "district",
    "pincode",
    "certifiedIn",
    "coursecode",
    "sector",
    "profilePic",
    "PRN_NO",
  ];

  const TeacherLabelsForDisplay = [
    "Name",
    "Phone Number",
    "Email",
    "Education Qualification 1",
    "Education Qualification 2",
    "Education Qualification 3",
    "Education Qualification 4",
    "Certification Course",
    "Relevant Industry Experience",
    "Other Experience",
    "PAN Card No.",
    "Aadhar No.",
    "State",
    "City",
    "District",
    "Pincode",
    "Certified In",
    "Course Code",
    "Sector",
    "Profile Picture",
    "PRN No.",
  ];

  const [teacherInputs, setTeacherInputs] = useState(
    TeacherLabels.reduce((acc, label) => {
      acc[label] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchBatchdata = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/${batchId}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        setTeacherInputs((prevState) => ({
          ...prevState,
          sector: data.data.sectorName || "",
          coursecode: data.data.courseCode || "",
        }));
      } else {
        console.error("Failed to fetch batch data");
        toast.error("Failed to fetch batch data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching batch data");
    }
  };

  useEffect(() => {
    fetchBatchdata();
  }, [batchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/addtrainer/${batchId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(teacherInputs),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Teacher added successfully:", data);
        toast.success("Teacher added successfully");
        navigate("/trainingPartner/dashboard");
      } else {
        console.error("Failed to add teacher:", data);
        toast.error(data.message || "Failed to add teacher");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add teacher");
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="p-6 w-[600px] overflow-y-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Add Teacher</h1>
          <Link
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            to={`/trainingPartner/dashboard/Teachers?batchId=${batchId}`}
          >
            Add existing Teacher
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          {TeacherLabels.map((label, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label htmlFor={label} className="text-sm font-medium text-gray-700">
                {TeacherLabelsForDisplay[index]}
              </Label>
              {label === "profilePic" ? (
                <Input
                  type="file"
                  name={label}
                  id={label}
                  onChange={handleChange}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <Input
                  type="text"
                  name={label}
                  id={label}
                  onChange={handleChange}
                  value={teacherInputs[label]}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          ))}
          <Button 
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Add Trainer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;