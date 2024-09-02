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

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"
];

const AddTeacher = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState({});
  const [loading, setLoading] = useState(false);

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

  const fetchBatchData = async () => {
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
    fetchBatchData();
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
    setLoading(true);

    try {
      await validationSchema.validate({
        name,
        phoneNumber,
        email,
        state,
        city,
        district,
        pincode,
      }, { abortEarly: false });

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

      const response = await axios.post(`${server}/trainer`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        toast.success("Teacher added successfully");
        navigate("/trainingPartner/dashboard");
      } else {
        console.error("Failed to add teacher:", response.data);
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
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="p-6 w-[600px] overflow-y-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Add Teacher</h1>
          <Link
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            to={`/trainingPartner/dashboard/Teachers?batchId=${batchId}`}
          >
            Add existing Teacher
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4" encType="multipart/form-data">
          {/* Input fields */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
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
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</Label>
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
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
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
              value={state}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Select state</option>
              {stateOptions.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
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
            <Label htmlFor="district" className="text-sm font-medium text-gray-700">District</Label>
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
            <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</Label>
            <Input
              type="text"
              name="pincode"
              id="pincode"
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={loading}>
              {loading ? "Adding..." : "Add Teacher"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
