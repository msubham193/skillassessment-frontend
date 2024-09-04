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
import { StudentvalidationSchema } from "@/Components/Traning Partner/utils/StudentValidation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import data from "../../utils/stateData.json";

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
    "redg_No",
    "MPR_Id",
    "SNA_Id",
  ];

  const labelMap = {
    name: "Full Name",
    fathername: "Father's Name",
    mothername: "Mother's Name",
    dob: "Date of Birth",
    gender: "Gender",
    religion: "Religion",
    category: "Category",
    nationality: "Nationality",
    generalqualification: "General Qualification",
    address: "Address",
    state: "State",
    district: "District",
    city: "City",
    pincode: "PIN Code",
    mobile: "Mobile Number",
    email: "Email Address",
    sector_name: "Sector Name",
    course: "Course",
    module: "Module",
    uid: "UID",
    traininstartdate: "Training Start Date",
    trainingenddate: "Training End Date",
    trainingHours: "Training Hours",
    totalhours: "Total Hours",
    totaldays: "Total Days",
    cenid: "Center ID",
    redg_No: "Registration Number",
    MPR_Id: "MPR ID",
    SNA_Id: "SNA ID",
  };

  const dateFields = ["dob", "traininstartdate", "trainingenddate"];

  const genderOptions = ["Male", "Female", "Other"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Other"];
  const categoryOptions = ["OBC", "General", "SC", "ST"];
  const nationalityOptions = ["Indian", "Other"];

  const [studentInputs, setStudentInputs] = useState(
    studentFields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleDateChange = (field, date) => {
    setStudentInputs((prevState) => {
      const newState = {
        ...prevState,
        [field]: date,
      };

      if (field === "traininstartdate" || field === "trainingenddate") {
        const { totaldays, totalhours, trainingHours } =
          calculateTrainingDuration(
            newState.traininstartdate,
            newState.trainingenddate
          );
        newState.totaldays = totaldays;
        newState.totalhours = totalhours;
        newState.trainingHours = trainingHours;
      }

      return newState;
    });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
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

  const fetchBatchdata = async () => {
    try {
      const response = await fetch(`${server}/batch/${batchId}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentInputs((prevState) => {
          const newState = {
            ...prevState,
            sector_name: data.data.sectorName || "",
            course: data.data.courseName || "",
            traininstartdate: data.data.startDate || "",
            trainingenddate: data.data.endDate || "",
          };

          const { totaldays, totalhours, trainingHours } =
            calculateTrainingDuration(
              newState.traininstartdate,
              newState.trainingenddate
            );
          newState.totaldays = totaldays;
          newState.totalhours = totalhours;
          newState.trainingHours = trainingHours;

          return newState;
        });
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
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    try {
      await StudentvalidationSchema.validate(studentInputs, {
        abortEarly: false,
      });
      const formattedInputs = { ...studentInputs };
      console.log("formdata", formattedInputs);

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
        navigate("/trainingPartner/dashboard");
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
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
        toast.error("Please correct the errors in the form");
      } else {
        console.error("Error:", error);
        toast.error("Failed to add student");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update district options based on selected state
  const handleStateChange = (value) => {
    setStudentInputs((prevState) => ({
      ...prevState,
      state: value,
      district: "", // Reset district when state changes
    }));
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
              <Label
                htmlFor={field}
                className={errors[field] ? "text-red-500" : ""}
              >
                {labelMap[field]}
              </Label>
              {field === "gender" ? (
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "gender", value } })
                  }
                  value={studentInputs.gender}
                >
                  <SelectTrigger
                    className={errors.gender ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "religion" ? (
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "religion", value } })
                  }
                  value={studentInputs.religion}
                >
                  <SelectTrigger
                    className={errors.religion ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {religionOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "category" ? (
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "category", value } })
                  }
                  value={studentInputs.category}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "nationality" ? (
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "nationality", value } })
                  }
                  value={studentInputs.nationality}
                >
                  <SelectTrigger
                    className={errors.nationality ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalityOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "state" ? (
                <Select
                  onValueChange={(value) => handleStateChange(value)}
                  value={studentInputs.state}
                >
                  <SelectTrigger
                    className={errors.state ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.states.map((state, idx) => (
                      <SelectItem key={idx} value={state.state}>
                        {state.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "district" ? (
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "district", value } })
                  }
                  value={studentInputs.district}
                  disabled={!studentInputs.state} // Disable district dropdown if no state is selected
                >
                  <SelectTrigger
                    className={errors.district ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentInputs.state &&
                      data.states
                        .find((s) => s.state === studentInputs.state)
                        .districts.map((district, idx) => (
                          <SelectItem key={idx} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              ) : dateFields.includes(field) ? (
                <DatePicker
                  selected={
                    studentInputs[field] ? new Date(studentInputs[field]) : null
                  }
                  onChange={(date) => handleDateChange(field, date)}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={5}
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  className={`w-full p-2 rounded-md ${
                    errors[field] ? "border-red-500" : ""
                  }`}
                />
              ) : ["totalhours", "totaldays", "trainingHours"].includes(
                  field
                ) ? (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  value={studentInputs[field]}
                  readOnly
                  className={errors[field] ? "border-red-500" : ""}
                />
              ) : (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={studentInputs[field]}
                  className={errors[field] ? "border-red-500" : ""}
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={isLoading}
            className={
              Object.keys(errors).length > 0
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }
          >
            {isLoading ? "Adding Student..." : "Add Student"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
