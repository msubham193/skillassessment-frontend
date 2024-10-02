/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "@/main";
import { toast } from "react-toastify";
import { Button } from "@/components(shadcn)/ui/button";

const RegistrationForm = () => { 
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
    "West Bengal"
  ];
  const navigate = useNavigate();
  const [agencyName, setAgencyName] = useState("");
  const [loading, setLoading] = useState(false); 
  const [officeAddress, setOfficeAddress] = useState("");
  const [communicationAddress, setCommunicationAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("Pending");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [headOfTheOrganization, setheadOfTheOrganization] = useState("");
  const [SPOC_NAME, setSPOC_NAME] = useState("");
  const [SPOC_EMAIL, setSPOC_EMAIL] = useState("");
  const [SPOC_CONTACT_NO, setSPOC_CONTACT_NO] = useState("");
  const [legalStatusOfTheOrganization, setLegalStatusOfTheOrganization] =
    useState("");
  const [COMPANY_PAN_NO, setCOMPANY_PAN_NO] = useState("");
  const [COMPANY_GST_NO, setCOMPANY_GST_NO] = useState("");
  const [NO_OF_BRANCHES, setNO_OF_BRANCHES] = useState("");
  const [BRANCH_ADDRESS, setBRANCH_ADDRESS] = useState("");
  const [geographical_region, setGeographical_region] = useState("");
  const [state_Under_geographicalRegion, setState_Under_geographicalRegion] =
    useState("");
  const [total_no_of_certified_Assessor, setTotal_no_of_certified_Assessor] =
    useState("");
  const [LETTER_OF_NCVET, setLETTER_OF_NCVET] = useState(null);
  const [logo, setLogo] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [role] = useState("AssessmentAgency");
  const [courseOptions, setCourseOptions] = useState([]);
  const [sectorsOption, setSectorsOption] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/sector/all`);
        if (response.data.success) {
          const sectorNames = response.data.data.map((sector) => sector.name);
          setSectorsOption(sectorNames);
        }
      } catch (error) {
        console.log("Error fetching data : ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      console.log(sectors);
      try {
        const response = await axios.get(`${server}/sector?name=${sectors}`);
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const courseNames = response.data.data.map((item) => item.courseName);
          setCourseOptions(courseNames);
        } else {
          setCourseOptions([]);
        }
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchCourses();
  }, [sectors]);

  const validatePasswords = (value, fieldName) => {
    let newErrors = { ...errors };

    if (fieldName === "password" && value !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    } else if (fieldName === "confirmPassword" && value !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      delete newErrors.password;
      delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };

  const validateGST = (gst) => {
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstPattern.test(gst);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case "agencyName":
        setAgencyName(value);
        break;
      case "officeAddress":
        setOfficeAddress(value);
        break;
      case "communicationAddress":
        setCommunicationAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "applicationStatus":
        setApplicationStatus(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        if (!validatePhoneNumber(value))
          newErrors.phoneNumber = "Invalid phone number";
        else delete newErrors.phoneNumber;
        break;
      case "email":
        setEmail(value);
        if (!validateEmail(value)) newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;
      case "websiteLink":
        setWebsiteLink(value);
        break;
      case "headOfTheOrganization":
        setheadOfTheOrganization(value);
        break;
      case "SPOC_NAME":
        setSPOC_NAME(value);
        break;
      case "SPOC_EMAIL":
        setSPOC_EMAIL(value);
        if (!validateEmail(value))
          newErrors.SPOC_EMAIL = "Invalid email format";
        else delete newErrors.SPOC_EMAIL;
        break;
      case "SPOC_CONTACT_NO":
        setSPOC_CONTACT_NO(value);
        if (!validatePhoneNumber(value))
          newErrors.SPOC_CONTACT_NO = "Invalid phone number";
        else delete newErrors.SPOC_CONTACT_NO;
        break;
      case "legalStatusOfTheOrganization":
        setLegalStatusOfTheOrganization(value);
        break;
      case "COMPANY_PAN_NO":
        setCOMPANY_PAN_NO(value);
        if (!validatePAN(value))
          newErrors.COMPANY_PAN_NO = "Invalid PAN number";
        else delete newErrors.COMPANY_PAN_NO;
        break;
      case "COMPANY_GST_NO":
        setCOMPANY_GST_NO(value);
        if (!validateGST(value))
          newErrors.COMPANY_GST_NO = "Invalid GST number";
        else delete newErrors.COMPANY_GST_NO;
        break;
      case "NO_OF_BRANCHES":
        setNO_OF_BRANCHES(value);
        break;
      case "BRANCH_ADDRESS":
        setBRANCH_ADDRESS(value);
        break;
      case "geographical_region":
        setGeographical_region(value);
        break;
      case "state_Under_geographicalRegion":
        setState_Under_geographicalRegion(value);
        break;
      case "total_no_of_certified_Assessor":
        setTotal_no_of_certified_Assessor(value);
        break;
      case "availability":
        setAvailability(value === "true");
        break;
      default:
        break;
    }
    validatePasswords(value, name);
    setErrors(newErrors);
  };

  const handleSectorChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSectors(selectedOptions);
  };

  const handleCourseChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setCourses(selectedOptions);
    console.log(courses);
  };

  const handelFileUpload = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "LETTER_OF_NCVET") {
      if (file.type === "application/pdf") {
        setLETTER_OF_NCVET(file);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Please select a valid PDF file.",
        }));
      }
    } else if (name === "AGENCY_LOGO") {
      if (file.type.startsWith("image/")) {
        setLogo(file);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Please select a valid image file.",
        }));
      }
    }
  };

  //here is the function for create a assessment agency...

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 4) {
      console.log(Object.keys(errors));
      console.log("Please fix the errors before submitting");
      return;
    }

    const data = {
      agencyName,
      officeAddress,
      communicationAddress,
      password,
      applicationStatus,
      phoneNumber,
      email,
      websiteLink,
      headOfTheOrganization,
      SPOC_NAME,
      SPOC_EMAIL,
      SPOC_CONTACT_NO,
      legalStatusOfTheOrganization,
      COMPANY_PAN_NO,
      COMPANY_GST_NO,
      NO_OF_BRANCHES,
      BRANCH_ADDRESS,
      geographical_region,
      state_Under_geographicalRegion,
      total_no_of_certified_Assessor,
      LETTER_OF_NCVET,
      logo,
      sectors,
      courses,
      availability,
      role,
    };
    console.log(LETTER_OF_NCVET);

    try {
      setLoading(true);
      const response = await axios.post(`${server}/aa/create`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response.data);
      navigate("/login");
      toast.success("Assessment agency created !!", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
    });
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error("Somthing went wrong please check the form and try again !!", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
    });
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="container p-10 mx-auto py-8 ">
      <div className="bg-gray-300 p-10 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-[#A41034] mb-6">
          Agency Registration
        </h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assessment Agency Name
              </label>
              <input
                type="text"
                name="agencyName"
                value={agencyName}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Office Address
              </label>
              <input
                type="text"
                name="officeAddress"
                value={officeAddress}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Communication Address
              </label>
              <input
                type="text"
                name="communicationAddress"
                value={communicationAddress}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10 p-2 pr-16 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 mt-2 mb-2 flex items-center text-xs font-semibold p-2 bg-[#A41034] text-white hover:bg-[#8b0d2b] rounded-md"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 mt-2 mb-2 flex items-center text-xs font-semibold p-2 bg-[#A41034] text-white hover:bg-[#8b0d2b] rounded-md"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website Link
              </label>
              <input
                type="text"
                name="websiteLink"
                value={websiteLink}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head of the Organization
              </label>
              <input
                type="text"
                name="headOfTheOrganization"
                value={headOfTheOrganization}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SPOC Name
              </label>
              <input
                type="text"
                name="SPOC_NAME"
                value={SPOC_NAME}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SPOC Email
              </label>
              <input
                type="email"
                name="SPOC_EMAIL"
                value={SPOC_EMAIL}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
              {errors.SPOC_EMAIL && (
                <p className="mt-1 text-sm text-red-500">{errors.SPOC_EMAIL}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SPOC Contact Number
              </label>
              <input
                type="text"
                name="SPOC_CONTACT_NO"
                value={SPOC_CONTACT_NO}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
              {errors.SPOC_CONTACT_NO && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.SPOC_CONTACT_NO}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Legal Status of the Organization
              </label>
              <input
                type="text"
                name="legalStatusOfTheOrganization"
                value={legalStatusOfTheOrganization}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company PAN Number
              </label>
              <input
                type="text"
                name="COMPANY_PAN_NO"
                value={COMPANY_PAN_NO}
                onChange={handleChange}
                className={`mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034] ${
                  errors.COMPANY_PAN_NO ? "border-red-500" : ""
                }`}
              />
              {errors.COMPANY_PAN_NO && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.COMPANY_PAN_NO}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company GST Number
              </label>
              <input
                type="text"
                name="COMPANY_GST_NO"
                value={COMPANY_GST_NO}
                onChange={handleChange}
                className={`mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034] ${
                  errors.COMPANY_GST_NO ? "border-red-500" : ""
                }`}
              />
              {errors.COMPANY_GST_NO && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.COMPANY_GST_NO}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Branches
              </label>
              <input
                type="number"
                name="NO_OF_BRANCHES"
                value={NO_OF_BRANCHES}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Branch Address
              </label>
              <input
                type="text"
                name="BRANCH_ADDRESS"
                value={BRANCH_ADDRESS}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Geographical Region
              </label>
              <input
                type="text"
                name="geographical_region"
                value={geographical_region}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">
              State Under Geographical Region
            </label>
            <select
              name="state_Under_geographicalRegion"
              value={state_Under_geographicalRegion}
              onChange={handleChange}
              className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
            >
              <option value="">Select a State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Number of Certified Assessors
              </label>
              <input
                type="number"
                name="total_no_of_certified_Assessor"
                value={total_no_of_certified_Assessor}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              />
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Letter of NCVET
                </label>
                <input
                  type="file"
                  name="LETTER_OF_NCVET"
                  accept="application/pdf"
                  onChange={handelFileUpload}
                  className="mt-1 block w-full h-11 p-2 rounded-md bg-white border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Agency Logo
                </label>
                <input
                  type="file"
                  name="AGENCY_LOGO"
                  accept="image/*"
                  onChange={handelFileUpload}
                  className="mt-1 block w-full h-11 p-2 rounded-md bg-white border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sectors
              </label>
              <select
                name="sectors"
                value={sectors.join(",")}
                onChange={handleSectorChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              >
                <option value="">Select a sector</option>
                {sectorsOption.map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Courses
              </label>
              <select
                name="courses"
                value={courses.join(",")}
                onChange={handleCourseChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              >
                <option value="">Select a Course</option>
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                name="availability"
                value={availability}
                onChange={handleChange}
                className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>
          <div className="pt-5 flex justify-center items-center">
            <Button
              type="submit"
              className="px-4 py-2  text-white font-medium rounded-md shadow-md hover:bg-[#11874e] "
              disabled={!LETTER_OF_NCVET || !logo}
            >
            {
              loading?"Submiting....":"Submit"
            }
              
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
