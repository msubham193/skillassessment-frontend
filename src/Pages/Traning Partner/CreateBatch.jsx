import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components(shadcn)/ui/calendar";
import { Button } from "@/components(shadcn)/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { batchDataAtoms } from "@/Components/Traning Partner/Atoms/batchatom";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components(shadcn)/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components(shadcn)/ui/popover";
import { server } from "@/main";

const CreateBatch = () => {
  const navigate = useNavigate();
  const [batchInputs, setBatchInputs] = useState({
    courseName: "",
    courseCode: "",
    CenterCode: "",
    sectorName: "",
    trainingOrganization: "",
    schemeType: "",
    scheme: "",
    state: "",
    startDate: null,
    endDate: null,
    centerName: "",
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
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSchemeType, setSelectedSchemeType] = useState(null);
  const [centers, setCenters] = useState([]);
  const [batchData, setBatchData] = useRecoilState(batchDataAtoms);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [schemeData, setSchemeData] = useState([]);
  const tpid = localStorage.getItem("trainingPartnerId");
  const tpData = useRecoilValue(tpDataAtoms);
  const tpcode = tpData.tpCode;

  const fetchCenters = async () => {
    if (!tpid || !batchInputs.scheme || !batchInputs.state) {
      console.log("Missing required data for fetching centers");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const url =
        selectedSchemeType === "Corporate"
          ? `${server}/center/tp/${tpid }`
          : `${server}/sna/centers/tp/query?trainingPartnerId=${tpid }&schemeName=${batchInputs.scheme}&state=${batchInputs.state}`;
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to fetch centers");
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setCenters(data.data);
      } else {
        setCenters([]);
        setError("No centers found for the selected criteria.");
      }
    } catch (error) {
      console.error("Error fetching centers:", error);
      setError("Failed to fetch centers. Please try again.");
      setCenters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    if (!batchInputs.sectorName) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${server}/sector?name=${batchInputs.sectorName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchScheme = async () => {
    if (!batchInputs.schemeType) return;
    try {
      const response = await fetch(
        `${server}/scheme/query?schemeType=${batchInputs.schemeType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch schemes");
      }
      const data = await response.json();
      setSchemeData(data.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch scheme type");
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [tpid, batchInputs.scheme, batchInputs.state]);

  useEffect(() => {
    fetchCourses();
  }, [batchInputs.sectorName]);

  useEffect(() => {
    fetchScheme();
  }, [batchInputs.schemeType]);

  const validateForm = () => {
    const requiredFields = [
      "centerName",
      "courseName",
      "sectorName",
      "trainingOrganization",
      "scheme",
      "state",
      "startDate",
      "endDate",
    ];
    for (let field of requiredFields) {
      if (!batchInputs[field]) {
        setError(
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field`
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSelectChange = (name, value) => {
    if (name == "schemeType") {
      setSelectedSchemeType(value);
    }
    setBatchInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setBatchInputs((prev) => ({ ...prev, [name]: date }));
  };

  const handleInputChange = (name, value) => {
    setBatchInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${server}/batch/create`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...batchInputs,
          startDate: batchInputs.startDate
            ? batchInputs.startDate.toISOString()
            : null,
          endDate: batchInputs.endDate
            ? batchInputs.endDate.toISOString()
            : null,
          tpcode: tpcode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        toast.success(data.message);
        navigate("/trainingPartner/dashboard");
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Failed to create batch. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log();
  const handleCenterSelect = (value) => {
    const center = centers.find((c) => c.name === value);
    setSelectedCenter(center);
    setBatchInputs((prev) => ({
      ...prev,
      centerName: center.name,
      CenterCode: center.centerCode,
      sectorName: "", // Reset sector when center changes
    }));
  };

  const handleCourseSelect = (value) => {
    const selectedCourse = courses.find(
      (course) => course.courseName === value
    );
    setBatchInputs((prev) => ({
      ...prev,
      courseName: selectedCourse.courseName,
      courseCode: selectedCourse.courseCode,
      courseDuration: selectedCourse.duration,
      courseCredit: selectedCourse.totalCredit,
      courseLevel: selectedCourse.ncrfLevel,
    }));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8 bg-white shadow-lg rounded-lg">
      <Button
        onClick={() => navigate("/trainingPartner/dashboard")}
        className="mb-4 ml-[20px] bg-gray-200 text-indigo-600 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Back to Dashboard
      </Button>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Create New Batch</h1>

        <p className="text-blue-600">
          Fill out the form below to create a new training batch.
        </p>
      </div>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="scheme-type">Scheme Type</Label>
            <Select
              value={batchInputs.schemeType}
              onValueChange={(value) => handleSelectChange("schemeType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Scheme Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Scheme Types</SelectLabel>
                  <SelectItem value="Central Government">
                    Central Government
                  </SelectItem>
                  <SelectItem value="State Government">
                    State Government
                  </SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheme">Scheme</Label>
            <Select
              value={batchInputs.scheme}
              onValueChange={(value) => handleSelectChange("scheme", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Schemes</SelectLabel>
                  {schemeData.map((scheme) => (
                    <SelectItem key={scheme._id} value={scheme.name}>
                      {scheme.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={batchInputs.state}
              onValueChange={(value) => handleSelectChange("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="center-name">Center Name</Label>
            <Select
              value={batchInputs.centerName}
              onValueChange={handleCenterSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a center" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Centers</SelectLabel>
                  {centers.map((center) => (
                    <SelectItem key={center._id} value={center.name}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="center-code">Center Code</Label>
            <Input
              id="center-code"
              name="CenterCode"
              value={batchInputs.CenterCode}
              onChange={(e) => handleInputChange("CenterCode", e.target.value)}
              placeholder="Enter Center Code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector-name">Sector Name</Label>
            <Select
              value={batchInputs.sectorName}
              onValueChange={(value) => handleSelectChange("sectorName", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sectors</SelectLabel>
                  {selectedCenter?.sectors.map((sector) => (
                    <SelectItem key={sector._id} value={sector.name}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Select
              value={batchInputs.courseName}
              onValueChange={handleCourseSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Courses</SelectLabel>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course.courseName}>
                      {course.courseName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-code">Course Code</Label>
            <Input
              id="course-code"
              name="courseCode"
              value={batchInputs.courseCode}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-duration">Course Duration</Label>
            <Input
              id="courseDuration"
              name="courseDuration"
              value={batchInputs.courseDuration}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-credit">Course Credit</Label>
            <Input
              id="courseCredit"
              name="courseCredit"
              value={batchInputs.courseCredit}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-level">Course Level</Label>
            <Input
              id="courseLevel"
              name="courseLevel"
              value={batchInputs.courseLevel}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="training-organization">Training Organization</Label>
            <Input
              id="training-organization"
              name="trainingOrganization"
              value={batchInputs.trainingOrganization}
              onChange={(e) =>
                handleInputChange("trainingOrganization", e.target.value)
              }
              placeholder="Enter Training Organization"
            />
          </div>
          {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {batchInputs.startDate
                      ? batchInputs.startDate.toDateString()
                      : "Pick a date"}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={batchInputs.startDate}
                    onSelect={(date) => handleDateChange(date, "startDate")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {batchInputs.endDate
                      ? batchInputs.endDate.toDateString()
                      : "Pick a date"}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={batchInputs.endDate}
                    onSelect={(date) => handleDateChange(date, "endDate")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          {/* </div> */}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating Batch..." : "Create Batch"}
        </Button>
      </form>
    </div>
  );
};

export default CreateBatch;
