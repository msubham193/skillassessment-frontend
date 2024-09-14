import React, { useState, useEffect } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "@/main";
import axios from "axios";
import * as Yup from 'yup';
import { stateDistrictMapping } from "@/Components/Traning Partner/utils/stateDistrictMapping";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components(shadcn)/ui/select";

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand",
  "Uttar Pradesh", "West Bengal",
];

const AddTrainer = () => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [formData, setFormData] = useState({
    name: "", phoneNumber: "", email: "", educationQualification_1: "",
    educationQualification_2: "", educationQualification_3: "", educationQualification_4: "",
    certification_course: "", relevant_industryExperience: "", other_experience: "",
    PAN_CARD_NO: "", AADHAR_NO: "", state: "", city: "", district: "", pincode: "",
    certifiedIn: "", sector: "", coursecode: "",PRN_NO: "",
  });
  const [image, setImage] = useState(null);

  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Invalid phone number")
      .required("Phone Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid Indian postal code').required('Pincode is required'),
    sector: Yup.string().required("Sector is required"),
  });

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(`${server}/sector/all`);
        if (response.data.success) {
          setSectors(response.data.data);
        } else {
          toast.error("Failed to fetch sectors");
        }
      } catch (error) {
        toast.error("Error fetching sectors");
      }
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    const fetchCoursesOfSectors = async () => {
      if (selectedSector) {
        try {
          const response = await axios.get(`${server}/sector?name=${selectedSector}`);
          console.log("API Response:", response.data);
          
          if (response.data && response.data.data) {
            // Check if the data is nested under a 'courses' property
            const coursesData = response.data.data.courses || response.data.data;
            
            if (Array.isArray(coursesData) && coursesData.length > 0) {
              setCourses(coursesData);
            } else {
              console.log("No courses found for the selected sector");
              setCourses([]);
            }
          } else {
            console.log("Unexpected response structure:", response.data);
            setCourses([]);
          }
        } catch (error) {
          console.error("Error fetching courses:", error.message);
          toast.error("Failed to fetch courses");
          setCourses([]);
        }
      } else {
        setCourses([]);
      }
    };

    fetchCoursesOfSectors();
  }, [selectedSector]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    if(field=="sector"){
      setSelectedSector(value)
    }
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
      ...(field === "state" ? { district: "" } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
      if (image) formDataToSend.append("image", image);

      const response = await axios.post(`${server}/trainer`, formDataToSend, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });

      if (response.status === 201) {
        toast.success("Trainer added successfully");
        navigate("/trainers");
      } else {
        toast.error(response.data.message || "Failed to add trainer");
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((validationError) => toast.error(validationError.message));
      } else {
        toast.error(error.message || "Failed to add trainer");
      }
    } finally {
      setLoading(false);
    }
  };
console.log(courses)
  return (
    <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
      <div className="p-8 w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <Button
          onClick={() => navigate("/trainers")}
          className="mb-6 bg-gray-200 text-indigo-600 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Back to Trainer Page
        </Button>
      
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Add Trainer</h1>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}
              </Label>
              {field === "state" ? (
                <Select onValueChange={(value) => handleSelectChange(field, value)} value={value}>
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
              ) : field === "sector" ? (
                <Select onValueChange={(value) => handleSelectChange(field, value)} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${field}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector._id} value={sector.name}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field === "coursecode" ? (
                <Select 
                onValueChange={(value) => handleSelectChange(field, value)} 
                value={value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${field}`} />
                </SelectTrigger>
                <SelectContent>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <SelectItem key={course._id} value={course.courseCode}>
                        {course.courseName} ({course.courseCode})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-courses" disabled>
                      No courses available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              ) : (
                <Input
                  type="text"
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={value}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">
              Profile Picture
            </Label>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-bold py-3 px-4 rounded-md transition-colors`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Trainer"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;