/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import { server } from "@/main";
import { toast } from "react-toastify";

const AddAssessorForm = () => {
  // Initialize state for each field
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [education_qualification_1, setEducation_qualification_1] =
    useState("");
  const [education_qualification_2, setEducation_qualification_2] =
    useState("");
  const [education_qualification_3, setEducation_qualification_3] =
    useState("");
  const [experience, setExperience] = useState("");
  const [other_experience, setOther_experience] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [assesoraId, setAssesoraId] = useState("");
  const [dist, setDist] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [certifiedInAnyCourse, setCertifiedInAnyCourse] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [sector, setSector] = useState("");
  const [
    enrolledInAnyOtherAssesmentAgency,
    setEnrolledInAnyOtherAssesmentAgency,
  ] = useState("No");
  const [enrolledInAnyOtherSSC, setEnrolledInAnyOtherSSC] = useState("Yes");
  const [image, setImage] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [sectorsOption, setSectorsOption] = useState([]);
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
  ];

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
        toast.error("Failed to fetch sectors", {
          position: "bottom-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!sector) {
        setCourseOptions([]);
        return;
      }
      try {
        const response = await axios.get(`${server}/sector?name=${sector}`);
        console.log(response.data.data);
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const courseNames = response.data.data.map(
            (item) => item
          );
          setCourseOptions(courseNames); //change some items here #####################
        } else {
          setCourseOptions([]);
        }
      } catch (error) {
        console.log("Error fetching courses: ", error);
        toast.error("Failed to fetch courses", {
          position: "bottom-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    };
    fetchCourses();
  }, [sector]);

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        setName(value);
        if (!value.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
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
      case "education_qualification_1":
        setEducation_qualification_1(value);
        break;
      case "education_qualification_2":
        setEducation_qualification_2(value);
        break;
      case "education_qualification_3":
        setEducation_qualification_3(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "other_experience":
        setOther_experience(value);
        break;
      case "adharNumber":
        setAdharNumber(value);
        if (!validateAadhaar(value))
          newErrors.adharNumber = "Invalid Aadhar number";
        else delete newErrors.adharNumber;
        break;
      case "panNumber":
        setPanNumber(value);
        if (!validatePAN(value)) newErrors.panNumber = "Invalid PAN number";
        else delete newErrors.panNumber;
        break;
      case "assesoraId":
        setAssesoraId(value);
        break;
      case "dist":
        setDist(value);
        if (!value.trim()) newErrors.dist = "District is required";
        else delete newErrors.dist;
        break;
      case "state":
        setState(value);
        if (!value) newErrors.state = "State is required";
        else delete newErrors.state;
        break;
      case "city":
        setCity(value);
        if (!value.trim()) newErrors.city = "City is required";
        else delete newErrors.city;
        break;
      case "pincode":
        setPincode(value);
        if (!value.trim()) newErrors.pincode = "Pincode is required";
        else delete newErrors.pincode;
        break;
      case "certifiedInAnyCourse":
        setCertifiedInAnyCourse(value);
        break;
      case "enrolledInAnyOtherAssesmentAgency":
        setEnrolledInAnyOtherAssesmentAgency(value);
        break;
      case "enrolledInAnyOtherSSC":
        setEnrolledInAnyOtherSSC(value);
        break;

      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.image;
        return newErrors;
      });
    } else {
      setImage(null);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Profile picture is required",
      }));
    }
  };

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };

  const validateAadhaar = (aadhaar) => {
    const aadhaarPattern = /^[0-9]{12}$/;
    return aadhaarPattern.test(aadhaar);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleSectorChange = (e) => {
    const value = e.target.value;
    setSector(value);
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sector: "Sector is required",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.sector;
        return newErrors;
      });
    }
  };

  const handleCourseChange = (e) => { 
    const value = e.target.value;
    setCourseCode(value);
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        courseCode: "Course Code is required",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.courseCode;
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!adharNumber) {
      newErrors.adharNumber = "Aadhar number is required";
    } else if (!validateAadhaar(adharNumber)) {
      newErrors.adharNumber = "Invalid Aadhar number";
    }
    if (!panNumber) {
      newErrors.panNumber = "PAN number is required";
    } else if (!validatePAN(panNumber)) {
      newErrors.panNumber = "Invalid PAN number";
    }
    if (!dist.trim()) newErrors.dist = "District is required";
    if (!state) newErrors.state = "State is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!sector) newErrors.sector = "Sector is required";
    if (!courseCode) newErrors.courseCode = "Course Code is required";
    if (!image) newErrors.image = "Profile picture is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      toast.error("Please fix the errors before submitting", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("phoneNumber", phoneNumber);
    formDataToSend.append("email", email);
    formDataToSend.append("education_qualification_1", education_qualification_1);
    formDataToSend.append("education_qualification_2", education_qualification_2);
    formDataToSend.append("education_qualification_3", education_qualification_3);
    formDataToSend.append("experience", experience);
    formDataToSend.append("other_experience", other_experience);
    formDataToSend.append("adharNumber", adharNumber);
    formDataToSend.append("panNumber", panNumber);
    formDataToSend.append("assesoraId", assesoraId);
    formDataToSend.append("dist", dist);
    formDataToSend.append("state", state);
    formDataToSend.append("city", city);
    formDataToSend.append("pincode", pincode);
    formDataToSend.append("certifiedInAnyCourse", certifiedInAnyCourse);
    formDataToSend.append("courseCode", courseCode);
    formDataToSend.append("sector", sector);
    formDataToSend.append(
      "enrolledInAnyOtherAssesmentAgency",
      enrolledInAnyOtherAssesmentAgency
    );
    formDataToSend.append(
      "enrolledInAnyOtherSSC",
      enrolledInAnyOtherSSC
    );
    formDataToSend.append("image", image);
    formDataToSend.append("AssesmentAgency", `${assessmentAgencyId}`);

    //rint the form data...
    for (const key in formDataToSend) {
      if (Object.hasOwnProperty.call(formDataToSend, key)) {
          console.log(`${key}: ${formData[key]}`);
      }
  }

    try {
      const response = await axios.post(`${server}/assessor`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });

      // Reset all input fields
      setName("");
      setPhoneNumber("");
      setEmail("");
      setEducation_qualification_1("");
      setEducation_qualification_2("");
      setEducation_qualification_3("");
      setExperience("");
      setOther_experience("");
      setAdharNumber("");
      setPanNumber("");
      setAssesoraId("");
      setDist("");
      setState("");
      setCity("");
      setPincode("");
      setCertifiedInAnyCourse("");
      setCourseCode("");
      setSector("");
      setEnrolledInAnyOtherAssesmentAgency("No");
      setEnrolledInAnyOtherSSC("Yes");
      setImage(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create assessor";
      toast.error(errorMessage, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-300 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-[#A41034]">
          Add Assessor
        </h2>
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name of the Assessor<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              maxLength="10"
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Educational Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Educational Qualification 1
            </label>
            <input
              type="text"
              name="education_qualification_1"
              value={education_qualification_1}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Educational Qualification 2
            </label>
            <input
              type="text"
              name="education_qualification_2"
              value={education_qualification_2}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Educational Qualification 3
            </label>
            <input
              type="text"
              name="education_qualification_3"
              value={education_qualification_3}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Relevant Industry Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              value={experience}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Other Relevant Experience
            </label>
            <input
              type="text"
              name="other_experience"
              value={other_experience}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aadhar Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="adharNumber"
              value={adharNumber}
              onChange={handleChange}
              maxLength="12"
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.adharNumber ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.adharNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.adharNumber}
              </p>
            )}
          </div>

          {/* PAN Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PAN Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="panNumber"
              value={panNumber}
              onChange={handleChange}
              maxLength="10"
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.panNumber ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.panNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.panNumber}
              </p>
            )}
          </div>

          {/* Assessor ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assessor ID
            </label>
            <input
              type="text"
              name="assesoraId"
              value={assesoraId}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dist"
              value={dist}
              onChange={handleChange}
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.dist ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.dist && (
              <p className="mt-1 text-sm text-red-500">{errors.dist}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State<span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={state}
              onChange={handleChange}
              className={`p-1 text-sm rounded-md border w-full ${
                errors.state ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select State</option>
              {indianStates.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={pincode}
              onChange={handleChange}
              maxLength="6"
              className={`mt-1 block w-full h-8 p-2 rounded-md border ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
            )}
          </div>

          {/* Certified In Any Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certified In Any Course
            </label>
            <input
              type="text"
              name="certifiedInAnyCourse"
              value={certifiedInAnyCourse}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sector<span className="text-red-500">*</span>
            </label>
            <select
              name="sectors"
              value={sector}
              onChange={handleSectorChange}
              className={`mt-1 block w-full h-8 p-1 text-sm rounded-md border ${
                errors.sector ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-[#A41034] focus:ring-[#A41034]`}
            >
              <option value="">Select a sector</option>
              {sectorsOption.map((sectorName, index) => (
                <option key={index} value={sectorName}>
                  {sectorName}
                </option>
              ))}
            </select>
            {errors.sector && (
              <p className="mt-1 text-sm text-red-500">{errors.sector}</p>
            )}
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Code<span className="text-red-500">*</span>
            </label>
            <select
              name="courseCode"
              value={courseCode}
              onChange={handleCourseChange}
              className={`mt-1 block w-full h-8 p-1 text-sm rounded-md border ${
                errors.courseCode ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-[#A41034] focus:ring-[#A41034]`}
            >
              <option value="">Select a Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course.courseCode}>
                  {course.courseName}
                </option>
              ))}
            </select>
            {errors.courseCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseCode}
              </p>
            )}
          </div>

          {/* Enrolled In Any Other Assessment Agency */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrolled In Any Other Assessment Agency
            </label>
            <select
              name="enrolledInAnyOtherAssesmentAgency"
              value={enrolledInAnyOtherAssesmentAgency}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Enrolled In Any Other SSC */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrolled In Any Other SSC
            </label>
            <select
              name="enrolledInAnyOtherSSC"
              value={enrolledInAnyOtherSSC}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`mt-1 block w-full h-10 p-1 rounded-md border ${
                errors.image ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image}
              </p>
            )}
            {image && (
              <div className="mt-2">
                <p>Selected file: {image.name}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#A41034] hover:bg-[#A41034]-dark"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Creating Assessor..." : "Add Assessor"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAssessorForm;
