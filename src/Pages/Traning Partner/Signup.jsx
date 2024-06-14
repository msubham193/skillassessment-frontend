import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import "./coustom.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const inputLabels = [
    "password",
    "username",
    "organizationName",
    "organizationCategory",
    "centerId",
    "tpCode",
    "scheme",
    "affiliation",
    "dateOfIncorporation",
    "registeredOfficeAddress",
    "registeredOfficeDistrict",
    "registeredOfficeCity",
    "registeredOfficeState",
    "registeredOfficePin",
    "registeredOfficeTelephone",
    "registeredOfficeMobile",
    "registeredOfficeFax",
    "registeredOfficeEmail",
    "registeredOfficeGst",
    "regionalStateOfficeAddress",
    "regionalStateOfficeDistrict",
    "regionalStateOfficeCity",
    "regionalStateOfficeState",
    "regionalStateOfficePin",
    "regionalStateOfficeTelephone",
    "regionalStateOfficeMobile",
    "regionalStateOfficeFax",
    "regionalStateOfficeEmail",
    "regionalStateOfficeGst",
    "website",
    "pan",
    "prnNo",
    "headOwnerName",
    "headOwnerDob",
    "headOwnerCity",
    "headOwnerResidenceAddress",
    "headOwnerPermanentAddress",
    "headOwnerMobile",
    "headOwnerAlternateMobile",
    "headOwnerEmail",
    "headOwnerQualification",
    "headOwnerWorkExperience",
    "headOwnerPanNo",
    "headOwnerAadharNo",
    "headOwnerPromoter1",
    "headOwnerPromoter2",
    "headOwnerPromoter3",
    "projectContactPersonName",
    "projectContactPersonDesignation",
    "projectContactPersonCity",
    "projectContactPersonMobile",
    "projectContactPersonAlternateMobile",
    "projectContactPersonResidenceAddress",
    "projectContactPersonPermanentAddress",
    "projectContactPersonEmail",
    "projectContactPersonAlternateEmail",
    "paymentStatus",
    "status",
    "timestamp"
  ];
  
const navigate=useNavigate()
  const TimeLabel = ["Date of Incorporation", "Head Owner DOB", "Timestamp"];

  const [currentPage, setCurrentPage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 789);
  const inputsPerPage = 20;
  const totalPages = Math.ceil(inputLabels.length / inputsPerPage);
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
    if (currentPage === totalPages - 1) {
      setOnSubmit(true);
    } else {
      setOnSubmit(false);
    }
  }, [currentPage, totalPages]);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    console.log(inputs)
    try {
      const jsondata=JSON.stringify(inputs);
      console.log("jsondata here")
      console.log(jsondata)
  
      const response = await fetch("http://localhost:8000/api/v1/tp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsondata,
      });
  
      // Log the response for debugging
      console.log(response);
  
      if (response.ok) {
        toast.success("Form submitted successfully!");
        setInputs({});
       navigate('/trainingPartner/signin')
      } else {
        const errorData = await response.json();
        console.log(errorData);  // Log the error data
        throw new Error(errorData.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form");
    }
  };
  



  return (
    <div className="bg-slate-100 min-h-screen p-10 flex flex-col justify-between">
      <div className="flex justify-center font-extrabold text-lg m-6">
        Training-Partner-SignUp
      </div>
      <div>
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            <div>
              {firstColumn.map((label, index) => (
                <div key={index}>
                  <Label>{label}</Label>
                  {TimeLabel.includes(label) ? (
                    <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full ">
                      <DatePicker
                        className="w-full"
                        onChange={(date) => handleChange(label, date)}
                        value={inputs[label] || ""}
                      />
                    </div>
                  ) : (
                    <Input
                      className="w-full"
                      onChange={(e) => handleChange(label, e.target.value)}
                      value={inputs[label] || ""}
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              {secondColumn.map((label, index) => (
                <div key={index}>
                  <Label>{label}</Label>
                  {TimeLabel.includes(label) ? (
                    <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full ">
                      <DatePicker
                        className="w-full"
                        onChange={(date) => handleChange(label, date)}
                        value={inputs[label] || ""}
                      />
                    </div>
                  ) : (
                    <Input
                      className="w-full"
                      onChange={(e) => handleChange(label, e.target.value)}
                      value={inputs[label] || ""}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              {firstColumn.map((label, index) => (
                <div key={index}>
                  <Label>{label}</Label>
                  {TimeLabel.includes(label) ? (
                    <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full ">
                      <DatePicker
                        className="w-full"
                        onChange={(date) => handleChange(label, date)}
                        value={inputs[label] || ""}
                      />
                    </div>
                  ) : (
                    <Input
                      className="w-full"
                      onChange={(e) => handleChange(label, e.target.value)}
                      value={inputs[label] || ""}
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              {secondColumn.map((label, index) => (
                <div key={index}>
                  <Label>{label}</Label>
                  {TimeLabel.includes(label) ? (
                    <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full ">
                      <DatePicker
                        className="w-full"
                        onChange={(date) => handleChange(label, date)}
                        value={inputs[label] || ""}
                      />
                    </div>
                  ) : (
                    <Input
                      className="w-full"
                      onChange={(e) => handleChange(label, e.target.value)}
                      value={inputs[label] || ""}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 p-2">
        <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </Button>
        {onSubmit ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNextPage}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default Signup;
