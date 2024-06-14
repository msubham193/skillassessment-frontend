import React, { useState } from "react";
import { Button } from "../../../components(shadcn)/ui/button";
import { Link } from "react-router-dom";
import { Input } from "../../../components(shadcn)/ui/input";
import { Label } from "../../../components(shadcn)/ui/label";
import { toast } from "react-toastify";

const AddTeacher = () => {
  const TeacherLabels = [
    "NAME",
    "PHONE NO",
    "EMAIL ID",
    "EDUCATIONAL QUALIFICATION 1",
    "EDUCATIONAL QUALIFICATION 2",
    "EDUCATIONAL QUALIFICATION 3",
    "EDUCATIONAL QUALIFICATION 4",
    "ANY CERTIFICATION COURSE",
    "RELEVANT INDUSTRY EXPERIENCE",
    "PAN-NO",
    "AADHAR NO",
    "DIST",
    "STATE",
    "PINCODE",
    "CERTIFIED-IN-(COURSE-NAME)",
    "COURSE CODE",
    "SECTOR",
  ];

  const [teacherInputs, setTeacherInputs] = useState({});

  const handleChange = (label, value) => {
    setTeacherInputs((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherInputs),
      });

      if (response.ok) {
        toast("Teacher added Successfully");
        setTeacherInputs({}); 
        
      } else {
        toast("Failed to add teacher");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Failed to add teacher");
    }
  };
  return (
    <div className=" flex justify-center p-8 ">
    <div className="p-6 w-[600px] overflow-y-auto bg-slate-300 rounded-md ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Add Teacher</h1>
        <Link className="text-blue-600" to="/teachers">
          Add existing Teacher
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
        {TeacherLabels.map((Tlabel, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Label>{Tlabel}</Label>
            <Input
              type="text"
              onChange={(e) => handleChange(Tlabel, e.target.value)}
              value={teacherInputs[Tlabel] || ""}
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
