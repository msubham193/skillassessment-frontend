import React, { useState } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./coustom.css";

const AddStudent = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();

  const studentFields = [
    "name",
    "fathername",
    "mothername",
    "dob",
    "gender",
    "religion",
    "category",
    "nationality",
    "generalqualification",
    "address",
    "state",
    "district",
    "city",
    "pincode",
    "mobile",
    "email",
    "sector_name",
    "course",
    "module",
    "uid",
    "traininstartdate",
    "trainingenddate",
    "trainingHours",
    "totalhours",
    "totaldays",
    "cenid",
    "profilepic",
  ];

  const dateFields = ["dob", "traininstartdate", "trainingenddate"];

  const [studentInputs, setStudentInputs] = useState(
    studentFields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setStudentInputs((prevState) => ({
      ...prevState,
      [field]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedInputs = { ...studentInputs };

    try {
      const response = await fetch(`http://localhost:8000/api/v1/batch/addstudent/${batchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formattedInputs),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("student data", data);
        toast.success(data.message);
        navigate('/trainingPartner/dashboard');
        setStudentInputs(
          studentFields.reduce((acc, field) => {
            acc[field] = "";
            return acc;
          }, {})
        );
      } else {
        console.error("Failed to add student:", data);
        toast.error(data.message || "Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="p-6 w-[600px] overflow-y-auto bg-slate-300 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Add Student</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          {studentFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label htmlFor={field}>{field}</Label>
              {dateFields.includes(field) ? (
                <DatePicker
                  onChange={(date) => handleDateChange(field, date)}
                  value={studentInputs[field] || null}
                  format="y-MM-dd"
                  className="w-full bg-white rounded-md p-2 text-black"
                />
              ) : (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={studentInputs[field]}
                />
              )}
            </div>
          ))}
          <Button type="submit">Add Student</Button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;