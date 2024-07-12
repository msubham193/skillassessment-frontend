import React, { useState } from "react";
import { Button} from "@/components(shadcn)/ui/button";
import { Input} from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { batchDataAtoms } from "@/Components/Traning Partner/Atoms/batchatom";
const AddTeacher = () => {
  const { id: batchId } = useParams();
  console.log("this is batch id",batchId)
  const navigate = useNavigate();
   const batchData=useRecoilValue(batchDataAtoms);
   console.log( "this is batchdata ",batchData);
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
    "PRN_NO"
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/v1/batch/addtrainer/${batchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(teacherInputs),
      });

      const data = await response.json(); // Parse the response data
      if (response.ok) {
        console.log("Teacher added successfully:", data);
        toast.success("Teacher added successfully");
        navigate('/trainingPartner/dashboard');
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
    <div className="flex justify-center p-8">
      <div className="p-6 w-[600px] overflow-y-auto bg-slate-300 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Add Teacher</h1>
          <Link className="text-blue-600" to={`/trainingPartner/dashboard/Teachers?batchId=${batchId}`}>
            Add existing Teacher
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          {TeacherLabels.map((label, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label htmlFor={label}>{label}</Label>
              <Input
                type="text"
                name={label}
                id={label}
                onChange={handleChange}
                value={teacherInputs[label]}
              />
            </div>
          ))}
          <Button type="submit">Add Teacher</Button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;