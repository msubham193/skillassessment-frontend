import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format, differenceInDays, differenceInHours } from "date-fns";
import { server } from "@/main";

const AddStudent = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();

  const studentFields = [
    "name", "fathername", "mothername", "dob", "gender", "religion", "category",
    "nationality", "generalqualification", "address", "state", "district", "city",
    "pincode", "mobile", "email", "sector_name", "course", "module", "uid",
    "traininstartdate", "trainingenddate", "trainingHours", "totalhours",
    "totaldays", "cenid", "redg_No","MPR_Id","SNA_Id"
  ];

  const dateFields = ["dob", "traininstartdate", "trainingenddate"];
  const [batchdata, setbatchdata] = useState({});
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

  const calculateTrainingDuration = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start <= end) {
        const totalDays = differenceInDays(end, start) + 1;
        const totalHours = differenceInHours(end, start) + 24;

        return {
          totaldays: totalDays.toString(),
          totalhours: totalHours.toString(),
          trainingHours: totalHours.toString(),
        };
      } else {
        toast.error("End date cannot be before start date");
        return {
          totaldays: "",
          totalhours: "",
          trainingHours: "",
        };
      }
    }
    return {};
  };

  const handleDateChange = (field, date) => {
    setStudentInputs((prevState) => {
      const newState = {
        ...prevState,
        [field]: date,
      };

      if (field === 'traininstartdate' || field === 'trainingenddate') {
        const { totaldays, totalhours, trainingHours } = calculateTrainingDuration(newState.traininstartdate, newState.trainingenddate);
        newState.totaldays = totaldays;
        newState.totalhours = totalhours;
        newState.trainingHours = trainingHours;
      }

      return newState;
    });
  };

  const fetchBatchdata = async () => {
    try {
      const response = await fetch(`${server}/batch/${batchId}`, {
        method: 'GET',
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setbatchdata(data.data);
        setStudentInputs((prevState) => {
          const newState = {
            ...prevState,
            sector_name: data.data.sectorName || "",
            course: data.data.courseName || "",
            traininstartdate: data.data.startDate || "",
            trainingenddate: data.data.endDate || "",
          };

          const { totaldays, totalhours, trainingHours } = calculateTrainingDuration(newState.traininstartdate, newState.trainingenddate);
          newState.totaldays = totaldays;
          newState.totalhours = totalhours;
          newState.trainingHours = trainingHours;

          return newState;
        });
      } else {
        console.error('Failed to fetch batch data');
        toast.error("Failed to fetch batch data");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error fetching batch data");
    }
  };

  useEffect(() => {
    fetchBatchdata();
  }, [batchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedInputs = { ...studentInputs };
    console.log("formdata", formattedInputs);
    try {
      const response = await fetch(`${server}/batch/addstudent/${batchId}`, {
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
              {['sector_name', 'course'].includes(field) ? (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={studentInputs[field]}
                  readOnly
                />
              ) : dateFields.includes(field) ? (
                <DatePicker
                
                  selected={studentInputs[field] ? new Date(studentInputs[field]) : null}
                  onChange={(date) => handleDateChange(field, date)}
                  showYearDropdown
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 rounded-md"
                />
              ) : ['totalhours', 'totaldays', 'trainingHours'].includes(field) ? (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  value={studentInputs[field]}
                  readOnly
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

