import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Input } from "@/components(shadcn)/ui/input";
import { Button } from "@/components(shadcn)/ui/button";
import { Label } from "@/components(shadcn)/ui/label";
import { toast } from "react-toastify";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components(shadcn)/ui/select"; 
import { server } from "@/main";

const Setting = ({ onClose }) => {
  const tpdata = useRecoilValue(tpDataAtoms);
  const [email, setEmail] = useState(tpdata.registeredOfficeEmail || "");
  const [course, setCourse] = useState(tpdata.courses || "");
  const [sector, setSector] = useState(tpdata.sector || "");
  const [availableSectors, setAvailableSectors] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  const userId = tpdata._id;

  useEffect(() => {
    const fetchAllSectors = async () => {
      try {
        const response = await fetch(`${server}/sector/all`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAvailableSectors(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchAllCourses = async () => {
      try {
        const response = await fetch(`${server}/course/course`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Courses fetched:", data.data); // Log the courses data
        setAvailableCourses(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllSectors();
    fetchAllCourses();
  }, []);

  const updateEmail = async () => {
    try {
      const response = await fetch(`${server}/tp/info/email/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error("Failed to update email");
      }
    } catch (error) {
      toast.error("Error updating email");
    }
  };

  const updateCourse = async () => {
    try {
      const response = await fetch(`${server}/tp/courses/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error("Error updating course");
    }
  };

  const updateSector = async () => {
    try {
      const response = await fetch(`${server}/tp/sectors/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sector }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error("Failed to update sector");
      }
    } catch (error) {
      toast.error("Error updating sector");
    }
  };

  return (
    <div className="p-8 space-y-6 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className="text-2xl font-semibold text-center">Settings</h1>
      
      <div className="space-y-2">
        <Label htmlFor="email">Registered Office Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Button onClick={updateEmail} className="mt-2">Update Email</Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="w-full">
            {course || "Select a course"}
          </SelectTrigger>
          <SelectContent>
            {availableCourses.length > 0 ? (
              availableCourses.map((courseItem) => (
                <SelectItem key={courseItem._id} value={courseItem.courseName}>
                  {courseItem.courseName}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled>No courses available</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button onClick={updateCourse} className="mt-2">Update Course</Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sector">Sector</Label>
        <Select value={sector} onValueChange={setSector}>
          <SelectTrigger className="w-full">
            {sector || "Select a sector"}
          </SelectTrigger>
          <SelectContent>
            {availableSectors.length > 0 ? (
              availableSectors.map((sectorItem) => (
                <SelectItem key={sectorItem._id} value={sectorItem.name}>
                  {sectorItem.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled>No sectors available</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button onClick={updateSector} className="mt-2">Update Sector</Button>
      </div>
      
    </div>
  );
};

export default Setting;
