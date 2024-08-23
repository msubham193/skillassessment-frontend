import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";

// shadcn components
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";

// Custom imports
import "react-toastify/dist/ReactToastify.css";
import { coursesData } from "@/Components/Traning Partner/Atoms/courseAtom";
import { sectorData } from "@/Components/Traning Partner/Atoms/sectorAtom";
import { validationSchema } from "@/Components/Traning Partner/utils/validation";

const Signup = () => {
  const inputLabels = [
    { name: "organizationName", label: "Organization Name" },
    { name: "password", label: "Password" },
    { name: "organizationCategory", label: "Organization Category" },
    { name: "centerId", label: "Center ID" },
    { name: "tpCode", label: "TP Code" },
    { name: "scheme", label: "Scheme" },
    { name: "affiliation", label: "Affiliation" },
    { name: "dateOfIncorporation", label: "Date of Incorporation" },
    { name: "registeredOfficeAddress", label: "Registered Office Address" },
    { name: "registeredOfficeDistrict", label: "Registered Office District" },
    { name: "registeredOfficeCity", label: "Registered Office City" },
    { name: "registeredOfficeState", label: "Registered Office State" },
    { name: "registeredOfficePin", label: "Registered Office PIN" },
    { name: "registeredOfficeTelephone", label: "Registered Office Telephone" },
    { name: "registeredOfficeMobile", label: "Registered Office Mobile" },
    { name: "registeredOfficeFax", label: "Registered Office Fax" },
    { name: "registeredOfficeEmail", label: "Registered Office Email" },
    { name: "registeredOfficeGst", label: "Registered Office GST" },
    {
      name: "regionalStateOfficeAddress",
      label: "Regional State Office Address",
    },
    {
      name: "regionalStateOfficeDistrict",
      label: "Regional State Office District",
    },
    { name: "regionalStateOfficeCity", label: "Regional State Office City" },
    { name: "regionalStateOfficeState", label: "Regional State Office State" },
    { name: "regionalStateOfficePin", label: "Regional State Office PIN" },
    {
      name: "regionalStateOfficeTelephone",
      label: "Regional State Office Telephone",
    },
    {
      name: "regionalStateOfficeMobile",
      label: "Regional State Office Mobile",
    },
    { name: "regionalStateOfficeFax", label: "Regional State Office Fax" },
    { name: "regionalStateOfficeEmail", label: "Regional State Office Email" },
    { name: "regionalStateOfficeGst", label: "Regional State Office GST" },
    { name: "website", label: "Website" },
    { name: "pan", label: "PAN" },
    { name: "prnNo", label: "PRN No" },
    { name: "headOwnerName", label: "Head Owner Name" },
    { name: "headOwnerDob", label: "Head Owner DOB" },
    { name: "headOwnerCity", label: "Head Owner City" },
    {
      name: "headOwnerResidenceAddress",
      label: "Head Owner Residence Address",
    },
    {
      name: "headOwnerPermanentAddress",
      label: "Head Owner Permanent Address",
    },
    { name: "headOwnerMobile", label: "Head Owner Mobile" },
    { name: "headOwnerAlternateMobile", label: "Head Owner Alternate Mobile" },
    { name: "headOwnerEmail", label: "Head Owner Email" },
    { name: "headOwnerQualification", label: "Head Owner Qualification" },
    { name: "headOwnerWorkExperience", label: "Head Owner Work Experience" },
    { name: "headOwnerPanNo", label: "Head Owner PAN No" },
    { name: "headOwnerAadharNo", label: "Head Owner Aadhar No" },
    { name: "headOwnerPromoter1", label: "Head Owner Promoter 1" },
    { name: "headOwnerPromoter2", label: "Head Owner Promoter 2" },
    { name: "headOwnerPromoter3", label: "Head Owner Promoter 3" },
    { name: "projectContactPersonName", label: "Project Contact Person Name" },
    {
      name: "projectContactPersonDesignation",
      label: "Project Contact Person Designation",
    },
    { name: "projectContactPersonCity", label: "Project Contact Person City" },
    {
      name: "projectContactPersonMobile",
      label: "Project Contact Person Mobile",
    },
    {
      name: "projectContactPersonAlternateMobile",
      label: "Project Contact Person Alternate Mobile",
    },
    {
      name: "projectContactPersonResidenceAddress",
      label: "Project Contact Person Residence Address",
    },
    {
      name: "projectContactPersonPermanentAddress",
      label: "Project Contact Person Permanent Address",
    },
    {
      name: "projectContactPersonEmail",
      label: "Project Contact Person Email",
    },
    {
      name: "projectContactPersonAlternateEmail",
      label: "Project Contact Person Alternate Email",
    },
    { name: "sector", label: "Sector" },
  ];

  const TimeLabel = ["dateOfIncorporation", "headOwnerDob"];
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
    "Lakshadweep", "Puducherry"
  ];
  const navigate = useNavigate();

  // State variables
  const [currentPage, setCurrentPage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 789);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useRecoilState(coursesData);
  const [sectors, setSectors] = useRecoilState(sectorData);
  const [selectedSector, setSelectedSector] = useState("");

  // Constants for pagination
  const inputsPerPage = 20;
  const totalPages = Math.ceil(inputLabels.length / inputsPerPage);

  // Effect to update onSubmit state based on current page
  useEffect(() => {
    setOnSubmit(currentPage === totalPages - 1);
  }, [currentPage, totalPages]);

  // Effect to handle window resize for mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to fetch sectors from API
  const fetchSectors = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/sector/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSectors(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to fetch sectors on component mount
  useEffect(() => {
    fetchSectors();
  }, []);

  // Calculate current inputs to display based on pagination
  const currentInputs = inputLabels.slice(
    currentPage * inputsPerPage,
    (currentPage + 1) * inputsPerPage
  );
  const firstColumn = currentInputs.slice(0, 10);
  const secondColumn = currentInputs.slice(10, 20);

  // Handle input change
  const handleChange = (name, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "sector") {
      setSelectedSector(value);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(inputs, { abortEarly: false });
      const jsondata = JSON.stringify(inputs);

      const response = await fetch("http://localhost:8000/api/v1/tp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsondata,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Form submitted successfully!");
        setInputs({});
        navigate("/trainingPartner/signin");
      } else {
        console.log(data);
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      const newError = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newError[err.path] = err.message;
        });
        setErrors(newError);
      } else {
        console.log(error);
      }
    }
  };

  // Render input based on input type
  const renderInput = (labelObj) => {
    const { name, label } = labelObj;

    if (TimeLabel.includes(name)) {
      return (
        <div className="relative">
          <DatePicker
            selected={inputs[name] || null}
            onChange={(date) => handleChange(name, date)}
            className="w-full p-2 pl-10 border rounded text-left font-normal"
            placeholderText="Pick a date"
            dateFormat="PPP"
          />
          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      );
    } else if (name === "scheme") {
      return (
        <Select
          onValueChange={(value) => handleChange(name, value)}
          value={inputs[name] || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Central Governmnet">
              Central Government
            </SelectItem>
            <SelectItem value="State Governmnet">State Goverment</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (name === "sector") {
      return (
        <Select
          onValueChange={(value) => handleChange(name, value)}
          value={inputs[name] || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector._id} value={sector.name}>
                {sector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    else if (name === "registeredOfficeState") {
      return (
        <Select
          onValueChange={(value) => handleChange(name, value)}
          value={inputs[name] || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    else {
      return (
        <Input
          className="w-full bg-transparent text-black"
          onChange={(e) => handleChange(name, e.target.value)}
          value={inputs[name] || ""}
        />
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">Training Partner Sign Up</h1>
        </div>
        <div className="p-6 md:p-10">
          {isMobile ? (
            <div className="space-y-6">
              {/* Mobile layout */}
              {[...firstColumn, ...secondColumn].map((labelObj, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {labelObj.label}
                  </Label>
                  {renderInput(labelObj)}
                  {errors[labelObj.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[labelObj.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop layout */}
              <div className="space-y-6">
                {firstColumn.map((labelObj, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      {labelObj.label}
                    </Label>
                    {renderInput(labelObj)}
                    {errors[labelObj.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[labelObj.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {secondColumn.map((labelObj, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      {labelObj.label}
                    </Label>
                    {renderInput(labelObj)}
                    {errors[labelObj.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[labelObj.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <Button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {onSubmit ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
