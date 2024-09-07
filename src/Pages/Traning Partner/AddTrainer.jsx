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
import { stateDistrictMapping } from "@/Components/Traning Partner/utils/stateDistrictMapping";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components(shadcn)/ui/select";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    educationQualification_1: "",
    educationQualification_2: "",
    educationQualification_3: "",
    educationQualification_4: "",
    certification_course: "",
    relevant_industryExperience: "",
    other_experience: "",
    PAN_CARD_NO: "",
    AADHAR_NO: "",
    state: "",
    city: "",
    district: "",
    pincode: "",
    certifiedIn: "",
    coursecode: "",
    sector: "",
    PRN_NO: "",
  });
  const [image, setImage] = useState(null);

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
        setFormData(prevState => ({
          ...prevState,
          sector: data.data.sectorName || "",
          coursecode: data.data.courseCode || "",
        }));
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
    pincode: Yup.number()
    .typeError("Pincode must be a number") 
    .required("Pincode is required")       
    .integer("Pincode must be an integer") 
    .positive("Pincode must be positive")  
    .min(100000, "Pincode must be at least 6 digits")
    .max(999999, "Pincode cannot be more than 6 digits")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));

    if (field === "state") {
      setFormData(prevState => ({
        ...prevState,
        district: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await axios({
        method: 'post',
        url: `${server}/trainer`,
        data: formDataToSend,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="p-6 w-[600px] overflow-y-auto bg-white rounded-lg shadow-md">
        <Button
          onClick={() => navigate("/trainingPartner/dashboard")}
          className="mb-4 bg-gray-200 text-indigo-600 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Back to Dashboard
        </Button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Add Trainer</h1>
          <Link
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            to={`/trainingPartner/dashboard/Teachers?batchId=${batchId}`}
          >
            Add existing Teacher
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4" encType="multipart/form-data">
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} className="flex flex-col gap-2">
              <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}
              </Label>
              {field === "state" ? (
                <Select onValueChange={(value) => handleSelectChange(field, value)} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "district" ? (
                <Select onValueChange={(value) => handleSelectChange(field, value)} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(stateDistrictMapping[formData.state] || []).map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={value}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          ))}
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