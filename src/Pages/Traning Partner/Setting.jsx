import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Input } from "@/components(shadcn)/ui/input";
import { Button } from "@/components(shadcn)/ui/button";
import { Label } from "@/components(shadcn)/ui/label";
import { toast } from "react-toastify";

const Setting = ({onClose}) => {
  const tpdata = useRecoilValue(tpDataAtoms);
  const [email, setEmail] = useState(`${tpdata.registeredOfficeEmail}`);
  const [course, setCourse] = useState(`${tpdata.courses}`);
  const [sector, setSector] = useState(`${tpdata.sector}`);
  const [allSectors,setAllSectors]=useState({})
  const userId = tpdata._id;
useEffect(()=>{
  const fetchSectors = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/sector/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAllSectors(data.data);
    } catch (error) {
      console.log(error);
    }
  };
},[])
  const updateEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/tp/info/email/${userId}`, {
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
      const response = await fetch(`http://localhost:8000/api/v1/tp/courses/${userId}`, {
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
      const response = await fetch(`http://localhost:8000/api/v1/tp/sectors/${userId}`, {
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

  const handleSaveChanges = async () => {
    await updateEmail();
    await updateCourse();
    await updateSector();
    onClose();
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Registered Office Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="sector">Sector</Label>
        <Input
          id="sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleSaveChanges} className="px-6 py-2 text-white bg-blue-600 rounded-md">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Setting;

