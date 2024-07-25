import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

// shadcn components
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Calendar } from "@/components(shadcn)/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components(shadcn)/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components(shadcn)/ui/select";

// Custom imports
import "./coustom.css";
import "react-toastify/dist/ReactToastify.css";
import { coursesData } from "@/Components/Traning Partner/Atoms/courseAtom";
import { sectorData } from "@/Components/Traning Partner/Atoms/sectorAtom";
import { validationSchema } from "@/Components/Traning Partner/utils/validation";

const Signup = () => {
  const inputLabels = [
    "organizationName", "password", "organizationCategory", "centerId", "tpCode",
    "scheme", "affiliation", "dateOfIncorporation", "registeredOfficeAddress",
    "registeredOfficeDistrict", "registeredOfficeCity", "registeredOfficeState",
    "registeredOfficePin", "registeredOfficeTelephone", "registeredOfficeMobile",
    "registeredOfficeFax", "registeredOfficeEmail", "registeredOfficeGst",
    "regionalStateOfficeAddress", "regionalStateOfficeDistrict", "regionalStateOfficeCity",
    "regionalStateOfficeState", "regionalStateOfficePin", "regionalStateOfficeTelephone",
    "regionalStateOfficeMobile", "regionalStateOfficeFax", "regionalStateOfficeEmail",
    "regionalStateOfficeGst", "website", "pan", "prnNo", "headOwnerName", "headOwnerDob",
    "headOwnerCity", "headOwnerResidenceAddress", "headOwnerPermanentAddress",
    "headOwnerMobile", "headOwnerAlternateMobile", "headOwnerEmail", "headOwnerQualification",
    "headOwnerWorkExperience", "headOwnerPanNo", "headOwnerAadharNo", "headOwnerPromoter1",
    "headOwnerPromoter2", "headOwnerPromoter3", "projectContactPersonName",
    "projectContactPersonDesignation", "projectContactPersonCity", "projectContactPersonMobile",
    "projectContactPersonAlternateMobile", "projectContactPersonResidenceAddress",
    "projectContactPersonPermanentAddress", "projectContactPersonEmail",
    "projectContactPersonAlternateEmail", "sector"
  ];

  const TimeLabel = ["dateOfIncorporation", "headOwnerDob"];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 789);
  const inputsPerPage = 20;
  const totalPages = Math.ceil(inputLabels.length / inputsPerPage);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useRecoilState(coursesData);
  const [sectors, setSectors] = useRecoilState(sectorData);
  const [selectedSector, setSelectedSector] = useState("");

  




  useEffect(() => {
    setOnSubmit(currentPage === totalPages - 1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  useEffect(() => {
    fetchSectors();
  }, []);
  const currentInputs = inputLabels.slice(
    currentPage * inputsPerPage,
    (currentPage + 1) * inputsPerPage
  );
  const firstColumn = currentInputs.slice(0, 10);
  const secondColumn = currentInputs.slice(10, 20);

  const handleChange = (label, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [label]: value,
    }));
    if (label === "sector") {
      setSelectedSector(value);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  const renderInput = (label) => {
    if (TimeLabel.includes(label)) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !inputs[label] && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {inputs[label] ? format(inputs[label], "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={inputs[label]}
              onSelect={(date) => handleChange(label, date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    } else if (label === "scheme") {
      return (
        <Select onValueChange={(value) => handleChange(label, value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Government">Government</SelectItem>
            <SelectItem value="StateGovernment">State Government</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (label === "sector") {
      return (
        <Select onValueChange={(value) => handleChange(label, value)}>
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
    } else {
      return (
        <Input
          className="w-full bg-transparent text-black"
          onChange={(e) => handleChange(label, e.target.value)}
          value={inputs[label] || ""}
        />
      );
    }
  };

  return (
    <div className="bg-white min-h-screen p-10 flex flex-col justify-between">
      <div className="flex justify-center font-extrabold text-lg m-6 text-black">
        Training-Partner-SignUp
      </div>
      <div>
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {/* Mobile layout */}
            {[...firstColumn, ...secondColumn].map((label, index) => (
              <div key={index} className="text-black">
                <Label>{label}</Label>
                {renderInput(label)}
                {errors[label] && (
                  <p className="text-red-500">{errors[label]}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {/* Desktop layout */}
            <div>
              {firstColumn.map((label, index) => (
                <div key={index} className="text-black">
                  <Label>{label}</Label>
                  {renderInput(label)}
                  {errors[label] && (
                    <p className="text-red-500">{errors[label]}</p>
                  )}
                </div>
              ))}
            </div>
            <div>
              {secondColumn.map((label, index) => (
                <div key={index} className="text-black">
                  <Label>{label}</Label>
                  {renderInput(label)}
                  {errors[label] && (
                    <p className="text-red-500">{errors[label]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handlePreviousPage}
          className="text-white"
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNextPage} className="text-white">
          {onSubmit ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Signup;