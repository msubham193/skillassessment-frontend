/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import { server } from "@/main";
import toast from "react-hot-toast";

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
  const [sector, setSector] = useState([]);
  const [
    enrolledInAnyOtherAssesmentAgency,
    setEnrolledInAnyOtherAssesmentAgency,
  ] = useState("No");
  const [enrolledInAnyOtherSSC, setEnrolledInAnyOtherSSC] = useState("Yes");
  const [profilePic, setProfilePic] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [sectorsOption, setSectorsOption] = useState([]);
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const [errors, setErrors] = useState({});

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
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${server}/sector?name=${sector}`);
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const courseNames = response.data.data.map((item) => item.courseName);
          setCourseOptions(courseNames);
          console.log(courseNames);
        } else {
          setCourseOptions([]);
        }
      } catch (error) {
        console.log("Error fetching courses: ", error);
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
        break;
      case "city":
        setCity(value);
        break;
      case "pincode":
        setPincode(value);
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
      setProfilePic(file);
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

  const handleSectorChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSector(selectedOptions);
  };

  const handleCourseChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(selectedOptions);
    setCourseCode("");
    console.log(courseCode);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors));
      console.log("Please fix the errors before submitting");
      return;
    }

    const formData = {
      name,
      phoneNumber,
      email,
      education_qualification_1,
      education_qualification_2,
      education_qualification_3,
      experience,
      other_experience,
      adharNumber,
      panNumber,
      assesoraId,
      dist,
      state,
      city,
      pincode,
      certifiedInAnyCourse,
      courseCode,
      sector,
      enrolledInAnyOtherAssesmentAgency,
      enrolledInAnyOtherSSC,
      profilePic,
      // Assign AssessmentAgency ID from localStorage or any other source
      AssesmentAgency: `${assessmentAgencyId}`,
      // localStorage.getItem("assessmentAgencyId") || "defaultAssessmentAgencyId",
    };
    console.log(formData);
    console.log(assessmentAgencyId);

    try {
      console.log(formData);
      const response = await axios.post(`${server}/assessor`, formData);
      console.log(response.data);
      // alert("Assessor Added");
      toast.success(response.data.message);

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
      setProfilePic("");
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-300 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-[#A41034]">
          Add Assessor
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name of the Assessor
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
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
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Relevant Industry Experience (Years)
            </label>
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={handleChange}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aadhar Number
            </label>
            <input
              type="text"
              name="adharNumber"
              value={adharNumber}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.adharNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.adharNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PAN Number
            </label>
            <input
              type="text"
              name="panNumber"
              value={panNumber}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.panNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.panNumber}</p>
            )}
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="dist"
              value={dist}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-1 text-sm rounded-md border w-full"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={pincode}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sector
            </label>
            <select
              name="sectors"
              value={sector.join(",")}
              onChange={handleSectorChange}
              className="mt-1 block w-full h-8 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
            >
              <option value="">Select a sector</option>
              {sectorsOption.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              name="courses"
              value={courseCode.join(",")}
              onChange={handleCourseChange}
              className="mt-1 block w-full h-8 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#A41034] focus:ring-[#A41034]"
            >
              <option value="">Select a Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrolled In Any Other Assesment Agency
            </label>
            <input
              type="text"
              name="enrolledInAnyOtherAssesmentAgency"
              value={enrolledInAnyOtherAssesmentAgency}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrolled In Any Other SSC
            </label>
            <input
              type="text"
              name="enrolledInAnyOtherSSC"
              value={enrolledInAnyOtherSSC}
              onChange={handleChange}
              className="mt-1 block w-full h-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full h-10 p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {profilePic && (
              <div className="mt-2">
                <p>Selected file: {profilePic.name}</p>
              </div>
            )}
          </div> */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A41034] hover:bg-[#A41034]-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Assessor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAssessorForm;
