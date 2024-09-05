import React, { useState, useEffect } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "@/main";
import axios from "axios";
import * as Yup from 'yup';
import { fileURLToPath } from "url";

const stateOptions = [
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
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

const AddTeacher = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState({});
 const [loading ,setLoading]=useState(false)
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [educationQualification_1, setEducationQualification1] = useState("");
  const [educationQualification_2, setEducationQualification2] = useState("");
  const [educationQualification_3, setEducationQualification3] = useState("");
  const [educationQualification_4, setEducationQualification4] = useState("");
  const [certification_course, setCertificationCourse] = useState("");
  const [relevant_industryExperience, setRelevantIndustryExperience] = useState("");
  const [other_experience, setOtherExperience] = useState("");
  const [PAN_CARD_NO, setPANCardNo] = useState("");
  const [AADHAR_NO, setAadharNo] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [certifiedIn, setCertifiedIn] = useState("");
  const [coursecode, setCoursecode] = useState("");
  const [sector, setSector] = useState("");
  const [image, setImage] = useState(null);
  const [PRN_NO, setPRNNo] = useState("");

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
        setBatchData(data.data);
        setSector(data.data.sectorName || "");
        setCoursecode(data.data.courseCode || "");
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    pincode: Yup.string().required("Pincode is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await validationSchema.validate(
        {
          name,
          phoneNumber,
          email,
          state,
          city,
          district,
          pincode,
        },
        { abortEarly: false }
      );

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("educationQualification_1", educationQualification_1);
      formData.append("educationQualification_2", educationQualification_2);
      formData.append("educationQualification_3", educationQualification_3);
      formData.append("educationQualification_4", educationQualification_4);
      formData.append("certification_course", certification_course);
      formData.append("relevant_industryExperience", relevant_industryExperience);
      formData.append("other_experience", other_experience);
      formData.append("PAN_CARD_NO", PAN_CARD_NO);
      formData.append("AADHAR_NO", AADHAR_NO);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("district", district);
      formData.append("pincode", pincode);
      formData.append("certifiedIn", certifiedIn);
      formData.append("coursecode", coursecode);
      formData.append("sector", sector);
      formData.append("PRN_NO", PRN_NO);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios({
        method: 'post',
        url: `${server}/trainer`,
        data: formData,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        toast.success("Teacher added successfully");
        navigate("/trainingPartner/dashboard");
      } else {
        toast.error(response.data.message || "Failed to add teacher");
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        toast.error("Failed to add teacher");
      }
    }
    finally {
      setLoading(false); 
    }
  };



  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="p-6 w-[600px] overflow-y-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Add Trainer</h1>
          <Link
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            to={`/trainingPartner/dashboard/Teachers?batchId=${batchId}`}
          >
            Add existing Teacher
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4" enctype="multipart/form-data">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="educationQualification_1" className="text-sm font-medium text-gray-700">
              Education Qualification 1
            </Label>
            <Input
              type="text"
              name="educationQualification_1"
              id="educationQualification_1"
              onChange={(e) => setEducationQualification1(e.target.value)}
              value={educationQualification_1}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="educationQualification_2" className="text-sm font-medium text-gray-700">
              Education Qualification 2
            </Label>
            <Input
              type="text"
              name="educationQualification_2"
              id="educationQualification_2"
              onChange={(e) => setEducationQualification2(e.target.value)}
              value={educationQualification_2}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="educationQualification_3" className="text-sm font-medium text-gray-700">
              Education Qualification 3
            </Label>
            <Input
              type="text"
              name="educationQualification_3"
              id="educationQualification_3"
              onChange={(e) => setEducationQualification3(e.target.value)}
              value={educationQualification_3}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="educationQualification_4" className="text-sm font-medium text-gray-700">
              Education Qualification 4
            </Label>
            <Input
              type="text"
              name="educationQualification_4"
              id="educationQualification_4"
              onChange={(e) => setEducationQualification4(e.target.value)}
              value={educationQualification_4}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="certification_course" className="text-sm font-medium text-gray-700">
              Certification Course
            </Label>
            <Input
              type="text"
              name="certification_course"
              id="certification_course"
              onChange={(e) => setCertificationCourse(e.target.value)}
              value={certification_course}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="relevant_industryExperience" className="text-sm font-medium text-gray-700">
              Relevant Industry Experience
            </Label>
            <Input
              type="text"
              name="relevant_industryExperience"
              id="relevant_industryExperience"
              onChange={(e) => setRelevantIndustryExperience(e.target.value)}
              value={relevant_industryExperience}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="other_experience" className="text-sm font-medium text-gray-700">
              Other Experience
            </Label>
            <Input
              type="text"
              name="other_experience"
              id="other_experience"
              onChange={(e) => setOtherExperience(e.target.value)}
              value={other_experience}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="PAN_CARD_NO" className="text-sm font-medium text-gray-700">
              PAN Card No.
            </Label>
            <Input
              type="text"
              name="PAN_CARD_NO"
              id="PAN_CARD_NO"
              onChange={(e) => setPANCardNo(e.target.value)}
              value={PAN_CARD_NO}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="AADHAR_NO" className="text-sm font-medium text-gray-700">
              Aadhar No.
            </Label>
            <Input
              type="text"
              name="AADHAR_NO"
              id="AADHAR_NO"
              onChange={(e) => setAadharNo(e.target.value)}
              value={AADHAR_NO}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
              State
            </Label>
            <select
              name="state"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a state</option>
              {stateOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </Label>
            <Input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="district" className="text-sm font-medium text-gray-700">
              District
            </Label>
            <Input
              type="text"
              name="district"
              id="district"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
              Pincode
            </Label>
            <Input
              type="text"
              name="pincode"
              id="pincode"
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="certifiedIn" className="text-sm font-medium text-gray-700">
              Certified In
            </Label>
            <Input
              type="text"
              name="certifiedIn"
              id="certifiedIn"
              onChange={(e) => setCertifiedIn(e.target.value)}
              value={certifiedIn}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="coursecode" className="text-sm font-medium text-gray-700">
              Course Code
            </Label>
            <Input
              type="text"
              name="coursecode"
              id="coursecode"
              onChange={(e) => setCoursecode(e.target.value)}
              value={coursecode}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sector" className="text-sm font-medium text-gray-700">
              Sector
            </Label>
            <Input
              type="text"
              name="sector"
              id="sector"
              onChange={(e) => setSector(e.target.value)}
              value={sector}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">
              Profile Picture
            </Label>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="PRN_NO" className="text-sm font-medium text-gray-700">
              PRN No.
            </Label>
            <Input
              type="text"
              name="PRN_NO"
              id="PRN_NO"
              onChange={(e) => setPRNNo(e.target.value)}
              value={PRN_NO}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Button
        type="submit"
        className={`mt-4 ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-bold py-2 px-4 rounded transition-colors`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Trainer"}
      </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;