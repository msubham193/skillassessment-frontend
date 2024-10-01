import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components(shadcn)/ui/select";

// Custom imports
import "react-toastify/dist/ReactToastify.css";
// import { coursesData } from "@/Components/Traning Partner/Atoms/courseAtom";
// import { sectorData } from "@/Components/Traning Partner/Atoms/sectorAtom";
import { server } from "@/main";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { stateDistrictMapping } from "@/Components/Traning Partner/utils/stateDistrictMapping";

const Signup = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    password: "",
    organizationCategory: "",
    centerId: "",
    tpCode: "",
    scheme: "",
    affiliation: "",
    dateOfIncorporation: "",
    sector: "",
    website: "",
    panNumber: "",
    prnNo: "",
    // Registered Office Details
    registeredOfficeAddress: "",
    registeredOfficeDist: "",
    registeredOfficeCity: "",
    registeredOfficeState: "",
    registeredOfficePin: "",
    registeredOfficeTelephone: "",
    registeredOfficeMobile: "", 
    registeredOfficeFax: "",
    registeredOfficeEmail: "",
    registeredOfficeGst: "",
    // Regional Office Details
    regionalStateOfficeAddress: "",
    regionalStateOfficeDist: "",
    regionalStateOfficeCity: "",
    regionalStateOfficeState: "",
    regionalStateOfficePin: "",
    regionalStateOfficeTelephone: "",
    regionalStateOfficeMobile: "",
    regionalStateOfficeFax: "",
    regionalStateOfficeEmail: "",
    regionalStateOfficeGst: "",
    // Head Owner Details
    headOwnerName: "",
    headOwnerDob: "",
    headOwnerCity: "",
    headOwnerResidenceAddress: "",
    headOwnerPermanentAddress: "",
    headOwnerMobile: "",
    headOwnerAlternateMobile: "",
    headOwnerEmail: "",
    headOwnerQualification: "",
    headOwnerWorkExperience: "",
    headOwnerPanNo: "",
    headOwnerAadharNo: "",
    headOwnerPromoter1: "",
    headOwnerPromoter2: "",
    headOwnerPromoter3: "",
    // Project Contact Person Details
    projectContactPersonName: "",
    projectContactPersonDesignation: "",
    projectContactPersonCity: "",
    projectContactPersonMobile: "",
    projectContactPersonAlternateMobile: "",
    projectContactPersonResidenceAddress: "",
    projectContactPersonPermanentAddress: "",
    projectContactPersonEmail: "",
    projectContactPersonAlternateEmail: "",
  });
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedregionalStateOfficeState ,setSelectedregionalStateOfficeState]=useState("")
  const [selectedRegisteredOfficeState ,setSelectedRegisteredOfficeState]=useState("")

  // function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //function for fetch all sector present in the potal

  useEffect(() => {
    try {
      axios
        .get(`${server}/sector/all`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setSectors(response.data.data);
        });
    } catch (error) {
      console.error("Error fetching training partner:", error);
      throw error;
    }
  }, []);

  const steps = [
    "Basic Info",
    "Registered Office Details",
    "Regional Office Details",
    "Head Owner Details",
    "Project Contact Person Details",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "sector") {
      setSelectedSector(value);
    }
    if(name==="regionalStateOfficeState"){
      setSelectedregionalStateOfficeState(value)
    }
    if(name==="registeredOfficeState"){
      setSelectedRegisteredOfficeState(value)
    }
  };
  // console.log(selectedregionalStateOfficeState)
  //this function is for check the validation  for inputs..
  const validateStep = (step) => {
    let stepErrors = {};

    // Helper functions for validation
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile); // Assuming Indian mobile numbers starting with 6-9 and 10 digits
    const isValidPIN = (pin) => /^\d{6}$/.test(pin); // Assuming Indian PIN codes with exactly 6 digits
    const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan); // PAN format
    const isValidGST = (gst) =>
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(
        gst
      ); // GST format
    const isValidDate = (date) => !isNaN(Date.parse(date)); // Checks if date is valid
    const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar); // Aadhaar format (12 digits)
    const isStrongPassword = (password) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      ); // Strong password
    const isAtLeast18YearsOld = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Check if the month or day is earlier than today in the same year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 18;
      }

      return age >= 18;
    };
  
    switch (step) {
      case 1:
        if (!formData.organizationName)
          stepErrors.organizationName = "Organization Name is required";
        if (!formData.password || !isStrongPassword(formData.password))
          stepErrors.password =
            "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
        if (!formData.organizationCategory)
          stepErrors.organizationCategory = "Organization Category is required";
        if (!formData.centerId) stepErrors.centerId = "Center ID is required";
        if (!formData.tpCode) stepErrors.tpCode = "TP Code is required";
        if (!formData.scheme) stepErrors.scheme = "Scheme is required";
        if (!formData.affiliation)
          stepErrors.affiliation = "Affiliation is required";
        if (
          !formData.dateOfIncorporation ||
          !isValidDate(formData.dateOfIncorporation)
        )
          stepErrors.dateOfIncorporation =
            "Valid Date of Incorporation is required";
        if (!formData.sector) stepErrors.sector = "Sector is required";
        if (!formData.website) stepErrors.website = "Website is required";
        if (!formData.panNumber || !isValidPAN(formData.panNumber))
          stepErrors.panNumber = "Valid PAN Number is required";
        if (!formData.prnNo) stepErrors.prnNo = "PRN Number is required";
        break;

      case 2:
        if (!formData.registeredOfficeAddress)
          stepErrors.registeredOfficeAddress =
            "Registered Office Address is required";
        if (!formData.registeredOfficeDist)
          stepErrors.registeredOfficeDist = "District is required";
        if (!formData.registeredOfficeCity)
          stepErrors.registeredOfficeCity = "City is required";
        if (!formData.registeredOfficeState)
          stepErrors.registeredOfficeState = "State is required";
        if (
          !formData.registeredOfficePin ||
          !isValidPIN(formData.registeredOfficePin)
        )
          stepErrors.registeredOfficePin = "Valid PIN is required";
        if (
          !formData.registeredOfficeTelephone ||
          !isValidMobile(formData.registeredOfficeTelephone)
        )
          stepErrors.registeredOfficeTelephone =
            "Valid Telephone number is required";
        if (
          !formData.registeredOfficeMobile ||
          !isValidMobile(formData.registeredOfficeMobile)
        )
          stepErrors.registeredOfficeMobile = "Valid Mobile is required";
        if (
          !formData.registeredOfficeEmail ||
          !isValidEmail(formData.registeredOfficeEmail)
        )
          stepErrors.registeredOfficeEmail = "Valid Email is required";
        if (
          !formData.registeredOfficeGst ||
          !isValidGST(formData.registeredOfficeGst)
        )
          stepErrors.registeredOfficeGst = "Valid GST Number is required";
        if (!formData.registeredOfficeFax)
          stepErrors.registeredOfficeFax = "Valid Fax Number is required";
        break;

      case 3:
        if (!formData.regionalStateOfficeAddress)
          stepErrors.regionalStateOfficeAddress =
            "Regional Office Address is required";
        if (!formData.regionalStateOfficeDist)
          stepErrors.regionalStateOfficeDist = "District is required";
        if (!formData.regionalStateOfficeCity)
          stepErrors.regionalStateOfficeCity = "City is required";
        if (!formData.regionalStateOfficeState)
          stepErrors.regionalStateOfficeState = "State is required";
        if (
          !formData.regionalStateOfficePin ||
          !isValidPIN(formData.regionalStateOfficePin)
        )
          stepErrors.regionalStateOfficePin = "Valid PIN is required";
        if (
          !formData.regionalStateOfficeTelephone ||
          !isValidMobile(formData.regionalStateOfficeTelephone)
        )
          stepErrors.regionalStateOfficeTelephone =
            "Valid Telephone number is required";
        if (
          !formData.regionalStateOfficeMobile ||
          !isValidMobile(formData.regionalStateOfficeMobile)
        )
          stepErrors.regionalStateOfficeMobile = "Valid Mobile is required";
        if (
          !formData.regionalStateOfficeEmail ||
          !isValidEmail(formData.regionalStateOfficeEmail)
        )
          stepErrors.regionalStateOfficeEmail = "Valid Email is required";
        if (
          !formData.regionalStateOfficeGst ||
          !isValidGST(formData.regionalStateOfficeGst)
        )
          stepErrors.regionalStateOfficeGst = "Valid GST Number is required";
        if (!formData.regionalStateOfficeFax)
          stepErrors.regionalStateOfficeFax = "Valid Fax  is required";
        break;

      case 4:
        if (!formData.headOwnerName)
          stepErrors.headOwnerName = "Head Owner Name is required";
        if (!formData.headOwnerDob || !isValidDate(formData.headOwnerDob)) {
          stepErrors.headOwnerDob = "Valid Head Owner DOB is required";
        } else if (!isAtLeast18YearsOld(formData.headOwnerDob)) {
          stepErrors.headOwnerDob = "Head Owner must be at least 18 years old";
        }
        if (!formData.headOwnerCity)
          stepErrors.headOwnerCity = "City is required";
        if (!formData.headOwnerResidenceAddress)
          stepErrors.headOwnerResidenceAddress =
            "Residence Address is required";
        if (!formData.headOwnerPermanentAddress)
          stepErrors.headOwnerPermanentAddress =
            "Permanent Address is required";
        if (
          !formData.headOwnerMobile ||
          !isValidMobile(formData.headOwnerMobile)
        )
          stepErrors.headOwnerMobile = "Valid Mobile is required";
        if (
          !formData.headOwnerAlternateMobile ||
          !isValidMobile(formData.headOwnerAlternateMobile)
        )
          stepErrors.headOwnerAlternateMobile =
            "Valid Alternate Mobile is required";
        if (!formData.headOwnerEmail || !isValidEmail(formData.headOwnerEmail))
          stepErrors.headOwnerEmail = "Valid Email is required";
        if (!formData.headOwnerQualification)
          stepErrors.headOwnerQualification = "Qualification is required";
        if (!formData.headOwnerWorkExperience)
          stepErrors.headOwnerWorkExperience = "Work Experience is required";
        if (!formData.headOwnerPanNo || !isValidPAN(formData.headOwnerPanNo))
          stepErrors.headOwnerPanNo = "Valid PAN Number is required";
        if (
          !formData.headOwnerAadharNo ||
          !isValidAadhar(formData.headOwnerAadharNo)
        )
          stepErrors.headOwnerAadharNo = "Valid Aadhaar Number is required";
        if (!formData.headOwnerPromoter1)
          stepErrors.headOwnerPromoter1 = "Promoter 1 is required";
        if (!formData.headOwnerPromoter2)
          stepErrors.headOwnerPromoter2 = "Promoter 2 is required";
        if (!formData.headOwnerPromoter3)
          stepErrors.headOwnerPromoter3 = "Promoter 3 is required";
        break;

      case 5:
        if (!formData.projectContactPersonName)
          stepErrors.projectContactPersonName =
            "Project Contact Person Name is required";
        if (!formData.projectContactPersonDesignation)
          stepErrors.projectContactPersonDesignation =
            "Designation is required";
        if (!formData.projectContactPersonCity)
          stepErrors.projectContactPersonCity = "City is required";
        if (
          !formData.projectContactPersonMobile ||
          !isValidMobile(formData.projectContactPersonMobile)
        )
          stepErrors.projectContactPersonMobile = "Valid Mobile is required";
        if (
          !formData.projectContactPersonAlternateMobile ||
          !isValidMobile(formData.projectContactPersonAlternateMobile)
        )
          stepErrors.projectContactPersonAlternateMobile =
            "Valid Alternate Mobile is required";
        if (!formData.projectContactPersonResidenceAddress)
          stepErrors.projectContactPersonResidenceAddress =
            "Residence Address is required";
        if (!formData.projectContactPersonPermanentAddress)
          stepErrors.projectContactPersonPermanentAddress =
            "Permanent Address is required";
        if (
          !formData.projectContactPersonEmail ||
          !isValidEmail(formData.projectContactPersonEmail)
        )
          stepErrors.projectContactPersonEmail = "Valid Email is required";
        if (
          !formData.projectContactPersonAlternateEmail ||
          !isValidEmail(formData.projectContactPersonAlternateEmail)
        )
          stepErrors.projectContactPersonAlternateEmail =
            "Valid Alternate Email is required";
        break;

      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setLoading(true);
      try {
        const jsondata = JSON.stringify(formData);
        
        setTimeout(() => {
          console.log(jsondata)
        }, 2000);


        const response = await fetch(`${server}/tp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsondata,
        });
        
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message || "Form submitted successfully");
          navigate("/trainingPartner/signin");
        } else {
          console.log("Server Error: ", data);
          toast.error(data.error || "Failed to submit form");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "An error occurred", {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Organization Name */}
              <div>
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                />
                {errors.organizationName && (
                  <p className="text-red-500">{errors.organizationName}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"} // Conditionally change type
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-3 text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Change icon */}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Organization Category */}
              <div>
                <Label htmlFor="organizationCategory">
                  Organization Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "organizationCategory", value },
                    })
                  }
                  value={formData.organizationCategory}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.organizationCategory
                      ? formData.organizationCategory
                      : "Select Category"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Institute set up by Corporate">
                      Institute set up by Corporate
                    </SelectItem>
                    <SelectItem value="Institute set up by Trust / NGO / Society">
                      Institute set up by Trust / NGO / Society
                    </SelectItem>
                    <SelectItem value="Institute set up by Govt.">
                      Institute set up by Govt.
                    </SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Standalone Training Institute">
                      Standalone Training Institute
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.organizationCategory && (
                  <p className="text-red-500">{errors.organizationCategory}</p>
                )}
              </div>

              {/* Center ID */}
              <div>
                <Label htmlFor="centerId">Center ID</Label>
                <Input
                  type="text"
                  id="centerId"
                  name="centerId"
                  value={formData.centerId}
                  onChange={handleChange}
                  required
                />
                {errors.centerId && (
                  <p className="text-red-500">{errors.centerId}</p>
                )}
              </div>

              {/* TP Code */}
              <div>
                <Label htmlFor="tpCode">TP Code</Label>
                <Input
                  type="text"
                  id="tpCode"
                  name="tpCode"
                  value={formData.tpCode}
                  onChange={handleChange}
                  required
                />
                {errors.tpCode && (
                  <p className="text-red-500">{errors.tpCode}</p>
                )}
              </div>

              {/* Scheme */}
              <div>
                <Label htmlFor="scheme">Scheme</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "scheme", value } })
                  }
                  value={formData.scheme}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.scheme ? formData.scheme : "Select Scheme"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central Government">
                      Central Government
                    </SelectItem>
                    <SelectItem value="State Government">
                      State Government
                    </SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
                {errors.scheme && (
                  <p className="text-red-500">{errors.scheme}</p>
                )}
              </div>

              {/* Affiliation */}
              <div>
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  required
                />
                {errors.affiliation && (
                  <p className="text-red-500">{errors.affiliation}</p>
                )}
              </div>

              {/* Date of Incorporation */}
              <div>
                <Label htmlFor="dateOfIncorporation">
                  Date of Incorporation
                </Label>
                <Input
                  type="date"
                  id="dateOfIncorporation"
                  name="dateOfIncorporation"
                  value={formData.dateOfIncorporation}
                  onChange={handleChange}
                  required
                />
                {errors.dateOfIncorporation && (
                  <p className="text-red-500">{errors.dateOfIncorporation}</p>
                )}
              </div>

              {/* Sector */}
              <div>
                <Label htmlFor="sector">Sector</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "sector", value } })
                  }
                  value={formData.sector}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.sector ? formData.sector : "Select Sector"}
                  </SelectTrigger>
                  <SelectContent>
                    {sectors &&
                      sectors.map((sector) => (
                        <SelectItem key={sector?._id} value={sector?.name}>
                          {sector?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.sector && (
                  <p className="text-red-500">{errors.sector}</p>
                )}
              </div>

              {/* Website */}
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
                {errors.website && (
                  <p className="text-red-500">{errors.website}</p>
                )}
              </div>

              {/* PAN Number */}
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  required
                />
                {errors.panNumber && (
                  <p className="text-red-500">{errors.panNumber}</p>
                )}
              </div>

              {/* PRN Number */}
              <div>
                <Label htmlFor="prnNo">PRN Number</Label>
                <Input
                  type="text"
                  id="prnNo"
                  name="prnNo"
                  value={formData.prnNo}
                  onChange={handleChange}
                  required
                />
                {errors.prnNo && <p className="text-red-500">{errors.prnNo}</p>}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Registered Office Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div>
                <Label htmlFor="registeredOfficeAddress">
                  Registered Office Address
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeAddress"
                  name="registeredOfficeAddress"
                  value={formData.registeredOfficeAddress}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeAddress && (
                  <p className="text-red-500">
                    {errors.registeredOfficeAddress}
                  </p>
                )}
              </div>
              {/* State */}
              <div>
                <Label htmlFor="registeredOfficeState">
                  Registered Office State
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "registeredOfficeState", value },
                    })
                  }
                  value={formData.registeredOfficeState}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.registeredOfficeState
                      ? formData.registeredOfficeState
                      : "Select State"}
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state, index) => (
                      <SelectItem key={index} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.registeredOfficeState && (
                  <p className="text-red-500">{errors.registeredOfficeState}</p>
                )}
              </div>

              {/* District */}
              <div>
                <Label htmlFor="registeredOfficeDist">
                  Registered Office District
                </Label>
                <div>
                <Select
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "registeredOfficeDist", value },
                    })
                  }
                  value={formData.registeredOfficeDist}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.registeredOfficeDist
                      ? formData.registeredOfficeDist
                      : "Select District"}
                  </SelectTrigger>
                  <SelectContent>
                    { stateDistrictMapping[selectedRegisteredOfficeState]?.map((district, index) => (
                      <SelectItem key={index} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.regionalStateOfficeDist && (
                  <p className="text-red-500">
                    {errors.regionalStateOfficeDist}
                  </p>
                )}
              </div>
                {errors.registeredOfficeDist && (
                  <p className="text-red-500">
                    {errors.registeredOfficeDist}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <Label htmlFor="registeredOfficeCity">
                  Registered Office City
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeCity"
                  name="registeredOfficeCity"
                  value={formData.registeredOfficeCity}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeCity && (
                  <p className="text-red-500">{errors.registeredOfficeCity}</p>
                )}
              </div>

              {/* PIN */}
              <div>
                <Label htmlFor="registeredOfficePin">
                  Registered Office PIN
                </Label>
                <Input
                  type="text"
                  id="registeredOfficePin"
                  name="registeredOfficePin"
                  value={formData.registeredOfficePin}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficePin && (
                  <p className="text-red-500">{errors.registeredOfficePin}</p>
                )}
              </div>

              {/* Telephone */}
              <div>
                <Label htmlFor="registeredOfficeTelephone">
                  Registered Office Telephone
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeTelephone"
                  name="registeredOfficeTelephone"
                  value={formData.registeredOfficeTelephone}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeTelephone && (
                  <p className="text-red-500">
                    {errors.registeredOfficeTelephone}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <Label htmlFor="registeredOfficeMobile">
                  Registered Office Mobile
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeMobile"
                  name="registeredOfficeMobile"
                  value={formData.registeredOfficeMobile}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeMobile && (
                  <p className="text-red-500">
                    {errors.registeredOfficeMobile}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="registeredOfficeEmail">
                  Registered Office Email
                </Label>
                <Input
                  type="email"
                  id="registeredOfficeEmail"
                  name="registeredOfficeEmail"
                  value={formData.registeredOfficeEmail}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeEmail && (
                  <p className="text-red-500">{errors.registeredOfficeEmail}</p>
                )}
              </div>

              {/* GST */}
              <div>
                <Label htmlFor="registeredOfficeGst">
                  Registered Office GST Number
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeGst"
                  name="registeredOfficeGst"
                  value={formData.registeredOfficeGst}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeGst && (
                  <p className="text-red-500">{errors.registeredOfficeGst}</p>
                )}
              </div>
              {/* fax*/}
              <div>
                <Label htmlFor="registeredOfficeGst">
                  Registered Office Fax
                </Label>
                <Input
                  type="text"
                  id="registeredOfficeFax"
                  name="registeredOfficeFax"
                  value={formData.registeredOfficeFax}
                  onChange={handleChange}
                  required
                />
                {errors.registeredOfficeFax && (
                  <p className="text-red-500">{errors.registeredOfficeFax}</p>
                )}
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Regional Office Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Address */}
              <div>
                <Label htmlFor="regionalStateOfficeAddress">
                  Regional Office Address
                </Label>
                <Input
                  type="text"
                  id="regionalStateOfficeAddress"
                  name="regionalStateOfficeAddress"
                  value={formData.regionalStateOfficeAddress}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeAddress && (
                  <p className="text-red-500">{errors.regionalStateOfficeAddress}</p>
                )}
              </div>

              {/* State */}
              <div>
                <Label htmlFor="regionalStateOfficeState">
                  Regional Office State
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "regionalStateOfficeState", value },
                    })
                  }
                  value={formData.regionalStateOfficeState}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.regionalStateOfficeState
                      ? formData.regionalStateOfficeState
                      : "Select State"}
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state, index) => (
                      <SelectItem key={index} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.regionalStateOfficeState && (
                  <p className="text-red-500">{errors.regionalStateOfficeState}</p>
                )}
              </div>

              {/* District */}
              <div>
                <Label htmlFor="regionalStateOfficeDist">
                  Regional Office District
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "regionalStateOfficeDist", value },
                    })
                  }
                  value={formData.regionalStateOfficeDist}
                >
                  <SelectTrigger className="border rounded-md p-2 w-full">
                    {formData.regionalStateOfficeDist
                      ? formData.regionalStateOfficeDist
                      : "Select District"}
                  </SelectTrigger>
                  <SelectContent>
                    { stateDistrictMapping[selectedregionalStateOfficeState]?.map((district, index) => (
                      <SelectItem key={index} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.regionalStateOfficeDist && (
                  <p className="text-red-500">
                    {errors.regionalStateOfficeDist}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <Label htmlFor="regionalStateOfficeCity">Regional Office City</Label>
                <Input
                  type="text"
                  id="regionalStateOfficeCity"
                  name="regionalStateOfficeCity"
                  value={formData.regionalStateOfficeCity}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeCity && (
                  <p className="text-red-500">{errors.regionalStateOfficeCity}</p>
                )}
              </div>

              {/* PIN */}
              <div>
                <Label htmlFor="regionalStateOfficePin">Regional Office PIN</Label>
                <Input
                  type="text"
                  id="regionalStateOfficePin"
                  name="regionalStateOfficePin"
                  value={formData.regionalStateOfficePin}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficePin && (
                  <p className="text-red-500">{errors.regionalStateOfficePin}</p>
                )}
              </div>

              {/* Telephone */}
              <div>
                <Label htmlFor="regionalStateOfficeTelephone">
                  Regional Office Telephone
                </Label>
                <Input
                  type="text"
                  id="regionalStateOfficeTelephone"
                  name="regionalStateOfficeTelephone"
                  value={formData.regionalStateOfficeTelephone}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeTelephone && (
                  <p className="text-red-500">
                    {errors.regionalStateOfficeTelephone}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <Label htmlFor="regionalStateOfficeMobile">
                  Regional Office Mobile
                </Label>
                <Input
                  type="text"
                  id="regionalStateOfficeMobile"
                  name="regionalStateOfficeMobile"
                  value={formData.regionalStateOfficeMobile}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeMobile && (
                  <p className="text-red-500">{errors.regionalStateOfficeMobile}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="regionalStateOfficeEmail">
                  Regional Office Email
                </Label>
                <Input
                  type="email"
                  id="regionalStateOfficeEmail"
                  name="regionalStateOfficeEmail"
                  value={formData.regionalStateOfficeEmail}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeEmail && (
                  <p className="text-red-500">{errors.regionalStateOfficeEmail}</p>
                )}
              </div>

              {/* GST */}
              <div>
                <Label htmlFor="regionalStateOfficeGst">
                  Regional Office GST Number
                </Label>
                <Input
                  type="text"
                  id="regionalStateOfficeGst"
                  name="regionalStateOfficeGst"
                  value={formData.regionalStateOfficeGst}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeGst && (
                  <p className="text-red-500">{errors.regionalStateOfficeGst}</p>
                )}
              </div>
              <div>
                <Label htmlFor="regionalStateOfficeGst">Regional Office Fax</Label>
                <Input
                  type="text"
                  id="regionalStateOfficeFax"
                  name="regionalStateOfficeFax"
                  value={formData.regionalStateOfficeFax}
                  onChange={handleChange}
                  required
                />
                {errors.regionalStateOfficeFax && (
                  <p className="text-red-500">{errors.regionalStateOfficeFax}</p>
                )}
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Head Owner Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Head Owner Name */}
              <div>
                <Label htmlFor="headOwnerName">Head Owner Name</Label>
                <Input
                  type="text"
                  id="headOwnerName"
                  name="headOwnerName"
                  value={formData.headOwnerName}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerName && (
                  <p className="text-red-500">{errors.headOwnerName}</p>
                )}
              </div>

              {/* Head Owner DOB */}
              <div>
                <Label htmlFor="headOwnerDob">Head Owner DOB</Label>
                <Input
                  type="date"
                  id="headOwnerDob"
                  name="headOwnerDob"
                  value={formData.headOwnerDob}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerDob && (
                  <p className="text-red-500">{errors.headOwnerDob}</p>
                )}
              </div>

              {/* Head Owner City */}
              <div>
                <Label htmlFor="headOwnerCity">Head Owner City</Label>
                <Input
                  type="text"
                  id="headOwnerCity"
                  name="headOwnerCity"
                  value={formData.headOwnerCity}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerCity && (
                  <p className="text-red-500">{errors.headOwnerCity}</p>
                )}
              </div>

              {/* Head Owner Residence Address */}
              <div>
                <Label htmlFor="headOwnerResidenceAddress">
                  Head Owner Residence Address
                </Label>
                <Input
                  type="text"
                  id="headOwnerResidenceAddress"
                  name="headOwnerResidenceAddress"
                  value={formData.headOwnerResidenceAddress}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerResidenceAddress && (
                  <p className="text-red-500">
                    {errors.headOwnerResidenceAddress}
                  </p>
                )}
              </div>

              {/* Head Owner Permanent Address */}
              <div>
                <Label htmlFor="headOwnerPermanentAddress">
                  Head Owner Permanent Address
                </Label>
                <Input
                  type="text"
                  id="headOwnerPermanentAddress"
                  name="headOwnerPermanentAddress"
                  value={formData.headOwnerPermanentAddress}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerPermanentAddress && (
                  <p className="text-red-500">
                    {errors.headOwnerPermanentAddress}
                  </p>
                )}
              </div>

              {/* Head Owner Mobile */}
              <div>
                <Label htmlFor="headOwnerMobile">Head Owner Mobile</Label>
                <Input
                  type="text"
                  id="headOwnerMobile"
                  name="headOwnerMobile"
                  value={formData.headOwnerMobile}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerMobile && (
                  <p className="text-red-500">{errors.headOwnerMobile}</p>
                )}
              </div>

              {/* Head Owner Alternate Mobile */}
              <div>
                <Label htmlFor="headOwnerAlternateMobile">
                  Head Owner Alternate Mobile
                </Label>
                <Input
                  type="text"
                  id="headOwnerAlternateMobile"
                  name="headOwnerAlternateMobile"
                  value={formData.headOwnerAlternateMobile}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerAlternateMobile && (
                  <p className="text-red-500">
                    {errors.headOwnerAlternateMobile}
                  </p>
                )}
              </div>

              {/* Head Owner Email */}
              <div>
                <Label htmlFor="headOwnerEmail">Head Owner Email</Label>
                <Input
                  type="email"
                  id="headOwnerEmail"
                  name="headOwnerEmail"
                  value={formData.headOwnerEmail}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerEmail && (
                  <p className="text-red-500">{errors.headOwnerEmail}</p>
                )}
              </div>

              {/* Head Owner Qualification */}
              <div>
                <Label htmlFor="headOwnerQualification">
                  Head Owner Qualification
                </Label>
                <Input
                  type="text"
                  id="headOwnerQualification"
                  name="headOwnerQualification"
                  value={formData.headOwnerQualification}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerQualification && (
                  <p className="text-red-500">
                    {errors.headOwnerQualification}
                  </p>
                )}
              </div>

              {/* Head Owner Work Experience */}
              <div>
                <Label htmlFor="headOwnerWorkExperience">
                  Head Owner Work Experience
                </Label>
                <Input
                  type="text"
                  id="headOwnerWorkExperience"
                  name="headOwnerWorkExperience"
                  value={formData.headOwnerWorkExperience}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerWorkExperience && (
                  <p className="text-red-500">
                    {errors.headOwnerWorkExperience}
                  </p>
                )}
              </div>

              {/* Head Owner PAN No */}
              <div>
                <Label htmlFor="headOwnerPanNo">Head Owner PAN No</Label>
                <Input
                  type="text"
                  id="headOwnerPanNo"
                  name="headOwnerPanNo"
                  value={formData.headOwnerPanNo}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerPanNo && (
                  <p className="text-red-500">{errors.headOwnerPanNo}</p>
                )}
              </div>

              {/* Head Owner Aadhar No */}
              <div>
                <Label htmlFor="headOwnerAadharNo">Head Owner Aadhar No</Label>
                <Input
                  type="text"
                  id="headOwnerAadharNo"
                  name="headOwnerAadharNo"
                  value={formData.headOwnerAadharNo}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerAadharNo && (
                  <p className="text-red-500">{errors.headOwnerAadharNo}</p>
                )}
              </div>

              {/* Head Owner Promoter 1 */}
              <div>
                <Label htmlFor="headOwnerPromoter1">
                  Head Owner Promoter 1
                </Label>
                <Input
                  type="text"
                  id="headOwnerPromoter1"
                  name="headOwnerPromoter1"
                  value={formData.headOwnerPromoter1}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerPromoter1 && (
                  <p className="text-red-500">{errors.headOwnerPromoter1}</p>
                )}
              </div>

              {/* Head Owner Promoter 2 */}
              <div>
                <Label htmlFor="headOwnerPromoter2">
                  Head Owner Promoter 2
                </Label>
                <Input
                  type="text"
                  id="headOwnerPromoter2"
                  name="headOwnerPromoter2"
                  value={formData.headOwnerPromoter2}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerPromoter2 && (
                  <p className="text-red-500">{errors.headOwnerPromoter2}</p>
                )}
              </div>

              {/* Head Owner Promoter 3 */}
              <div>
                <Label htmlFor="headOwnerPromoter3">
                  Head Owner Promoter 3
                </Label>
                <Input
                  type="text"
                  id="headOwnerPromoter3"
                  name="headOwnerPromoter3"
                  value={formData.headOwnerPromoter3}
                  onChange={handleChange}
                  required
                />
                {errors.headOwnerPromoter3 && (
                  <p className="text-red-500">{errors.headOwnerPromoter3}</p>
                )}
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Project Contact Person Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Contact Person Name */}
              <div>
                <Label htmlFor="projectContactPersonName">
                  Project Contact Person Name
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonName"
                  name="projectContactPersonName"
                  value={formData.projectContactPersonName}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonName && (
                  <p className="text-red-500">
                    {errors.projectContactPersonName}
                  </p>
                )}
              </div>

              {/* Project Contact Person Designation */}
              <div>
                <Label htmlFor="projectContactPersonDesignation">
                  Project Contact Person Designation
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonDesignation"
                  name="projectContactPersonDesignation"
                  value={formData.projectContactPersonDesignation}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonDesignation && (
                  <p className="text-red-500">
                    {errors.projectContactPersonDesignation}
                  </p>
                )}
              </div>

              {/* Project Contact Person City */}
              <div>
                <Label htmlFor="projectContactPersonCity">
                  Project Contact Person City
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonCity"
                  name="projectContactPersonCity"
                  value={formData.projectContactPersonCity}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonCity && (
                  <p className="text-red-500">
                    {errors.projectContactPersonCity}
                  </p>
                )}
              </div>

              {/* Project Contact Person Mobile */}
              <div>
                <Label htmlFor="projectContactPersonMobile">
                  Project Contact Person Mobile
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonMobile"
                  name="projectContactPersonMobile"
                  value={formData.projectContactPersonMobile}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonMobile && (
                  <p className="text-red-500">
                    {errors.projectContactPersonMobile}
                  </p>
                )}
              </div>

              {/* Project Contact Person Alternate Mobile */}
              <div>
                <Label htmlFor="projectContactPersonAlternateMobile">
                  Project Contact Person Alternate Mobile
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonAlternateMobile"
                  name="projectContactPersonAlternateMobile"
                  value={formData.projectContactPersonAlternateMobile}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonAlternateMobile && (
                  <p className="text-red-500">
                    {errors.projectContactPersonAlternateMobile}
                  </p>
                )}
              </div>

              {/* Project Contact Person Residence Address */}
              <div>
                <Label htmlFor="projectContactPersonResidenceAddress">
                  Project Contact Person Residence Address
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonResidenceAddress"
                  name="projectContactPersonResidenceAddress"
                  value={formData.projectContactPersonResidenceAddress}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonResidenceAddress && (
                  <p className="text-red-500">
                    {errors.projectContactPersonResidenceAddress}
                  </p>
                )}
              </div>

              {/* Project Contact Person Permanent Address */}
              <div>
                <Label htmlFor="projectContactPersonPermanentAddress">
                  Project Contact Person Permanent Address
                </Label>
                <Input
                  type="text"
                  id="projectContactPersonPermanentAddress"
                  name="projectContactPersonPermanentAddress"
                  value={formData.projectContactPersonPermanentAddress}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonPermanentAddress && (
                  <p className="text-red-500">
                    {errors.projectContactPersonPermanentAddress}
                  </p>
                )}
              </div>

              {/* Project Contact Person Email */}
              <div>
                <Label htmlFor="projectContactPersonEmail">
                  Project Contact Person Email
                </Label>
                <Input
                  type="email"
                  id="projectContactPersonEmail"
                  name="projectContactPersonEmail"
                  value={formData.projectContactPersonEmail}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonEmail && (
                  <p className="text-red-500">
                    {errors.projectContactPersonEmail}
                  </p>
                )}
              </div>

              {/* Project Contact Person Alternate Email */}
              <div>
                <Label htmlFor="projectContactPersonAlternateEmail">
                  Project Contact Person Alternate Email
                </Label>
                <Input
                  type="email"
                  id="projectContactPersonAlternateEmail"
                  name="projectContactPersonAlternateEmail"
                  value={formData.projectContactPersonAlternateEmail}
                  onChange={handleChange}
                  required
                />
                {errors.projectContactPersonAlternateEmail && (
                  <p className="text-red-500">
                    {errors.projectContactPersonAlternateEmail}
                  </p>
                )}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex justify-center">
        Training Partner Signup
      </h1>
      <div className="mb-4">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center ${
                currentStep > index + 1
                  ? "text-green-500"
                  : currentStep === index + 1
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center border-2 ${
                  currentStep > index + 1
                    ? "border-green-500 bg-green-500 text-white"
                    : currentStep === index + 1
                    ? "border-blue-700"
                    : "border-gray-500"
                }`}
              >
                {currentStep > index + 1 ? "✓" : index + 1}
              </div>
              <div className="mt-1">{step}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-[6px] bg-gray-300 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">{loading ? "Submitting.." : "Submit"}</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
