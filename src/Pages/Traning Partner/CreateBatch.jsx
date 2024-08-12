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
import { centerAtom } from "@/Components/Traning Partner/Atoms/centerAtom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components(shadcn)/ui/popover";


const CreateBatch = () => {
  const trainingPartnerData = useRecoilValue(tpDataAtoms);
  const sectors = trainingPartnerData?.sector || [];
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
  const [centers, setCenters] = useState([]);
  const [batchData, setBatchData] = useRecoilState(batchDataAtoms);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [schemeData, setSchemeData] = useState([]);
  const tpid = localStorage.getItem("trainingPartnerId");
  const tpData = useRecoilValue(tpDataAtoms);
  const tpcode = tpData.tpCode;
  const selcetdSchemeType = batchInputs.schemeType;
  console.log("selecetdscheme", selcetdSchemeType);

  const fetchCenters = async () => {
    if (!tpid) {
      console.log("No TPID provided");
      return;
    }
    if(!batchInputs.scheme && !batchInputs.state){
      console.log("scheme and state not seletcted ")
      return ;
    }

    console.log("Fetching centers...");
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/sna/centers/query?trainingPartnerId=${tpid}&schemeName=${batchInputs.scheme}&state=${batchInputs.state}`
      );
      console.log("Response received");
      if (!response.ok) {
        console.error("Response not ok");
        throw new Error("Failed to fetch centers");
      }
      const data = await response.json();
      console.log("schemss", data.data);
      setCenters(data.data || []);
    } catch (error) {
      console.error("Error fetching centers:", error);
      setError("Failed to fetch centers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    if (!batchInputs.sectorName) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/sector?name=${batchInputs.sectorName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      console.log("course",data)
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
        `http://localhost:8000/api/v1/scheme/query?schemeType=${selcetdSchemeType}`
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
  }, [tpid,batchInputs.scheme,batchInputs.state]);

  useEffect(() => {
    fetchCourses();
  }, [batchInputs.sectorName]);

  useEffect(() => {
    fetchScheme();
  }, [batchInputs.schemeType]);

  const validateForm = () => {
    const requiredFields = [
      "center",
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
        setError("Please fill in all required fields");
        return false;
      }
    }
    setError("");
    return true;
  };
  const handleSelectChange = (name, value) => {
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
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/create`,
        {
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
        }
      );

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

  const handleCenterSelect = (value) => {
    const selectedCenter = centers.find((center) => center.name === value);
    setBatchInputs((prev) => ({
      ...prev,
      center: selectedCenter,
      centerName: selectedCenter.name,
    }));
  };

  const handleCourseSelect = (value) => {
    const selectedCourse = courses.find(
      (course) => course.courseName === value
    );
    console.log("course", selectedCourse);
    console.log("credit", selectedCourse.totalCredit);
    console.log("code", selectedCourse.courseCode);
    setBatchInputs((prev) => ({
      ...prev,
      courseName: selectedCourse.courseName,
      courseCode: selectedCourse.courseCode,
      courseDuration: selectedCourse.duration,
      courseCredit: selectedCourse.totalCredit,
      courseLevel: selectedCourse.ncrfLevel,
    }));
  };
  console.log(batchInputs);
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 md:py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create New Batch</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new training batch.
        </p>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
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
                  <SelectLabel>Sector</SelectLabel>
                  {sectors.map((sector, index) => (
                    <SelectItem key={index} value={sector}>
                      {sector}
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
              onChange={(e) => handleInputChange("courseCode", e.target.value)}
              placeholder="Enter Course Code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-code">Course Duration</Label>
            <Input
              id="courseDuration"
              name="courseDuration"
              value={batchInputs.courseDuration}
              onChange={(e) =>
                handleInputChange("courseDuration", e.target.value)
              }
              placeholder="Enter Course Duration"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-code">Course Credit</Label>
            <Input
              id="courseCredit"
              name="courseCredit"
              value={batchInputs.courseCredit}
              onChange={(e) =>
                handleInputChange("courseCredit", e.target.value)
              }
              placeholder="Course Credit"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-code">Course Level</Label>
            <Input
              id="courseLevel"
              name="courseLevel"
              value={batchInputs.courseLevel}
              onChange={(e) => handleInputChange("courseLevel", e.target.value)}
              placeholder="Course Level"
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
            <Input
              id="state"
              name="state"
              value={batchInputs.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="ex:- Odisha"
            />
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
          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating Batch..." : "Create Batch"}
        </Button>
      </form>
    </div>
  );
};

export default CreateBatch;
