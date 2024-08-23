
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components(shadcn)/ui/select";
import { Button } from "@/components(shadcn)/ui/button";
import { Checkbox } from "@/components(shadcn)/ui/checkbox";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { server } from "@/main";
export default function CreateCenter() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    PRN_NO: "",
    schemes: [],
    sanction_order_letter: null,
    centerId: "",
    projectId: "",
    sectors: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [availableSectors, setAvailableSectors] = useState([]);
  const [allSchemes, setAllSchemes] = useState([]);

  useEffect(() => {
    console.log("Available Sectors:", availableSectors);
  }, [availableSectors]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      letter: file,
    }));
  };

  const handleSchemeChange = (schemeName, isChecked) => {
    setFormData((prevData) => ({
      ...prevData,
      schemes: isChecked
        ? [...prevData.schemes, { schemeName }]
        : prevData.schemes.filter((scheme) => scheme.schemeName !== schemeName),
    }));
  };

  const handleSectorChange = (sectorId, isChecked) => {
    setFormData((prevData) => ({
      ...prevData,
      sectors: isChecked
        ? [...prevData.sectors, sectorId]
        : prevData.sectors.filter((id) => id !== sectorId),
    }));
  };

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
        console.log("Sectors:", data.data);
        setAvailableSectors(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllSectors();
  }, []);

  useEffect(() => {
    const fetchAllSchemes = async () => {
      try {
        const response = await fetch(`${server}/scheme`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAllSchemes(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllSchemes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (key !== "sanction_order_letter" && key !== "schemes" && key !== "sectors") {
          formDataToSend.append(key, formData[key]);
        }
      }

      if (formData.sanction_order_letter) {
        formDataToSend.append(
          "sanction_order_letter",
          formData.sanction_order_letter,
          formData.sanction_order_letter.name
        );
      }

      formData.schemes.forEach((scheme, index) => {
        formDataToSend.append(`schemes[${index}][schemeName]`, scheme.schemeName);
      });

      formData.sectors.forEach((sector, index) => {
        formDataToSend.append(`sectors[${index}]`, sector);
      });

      const response = await fetch(`${server}/center`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Center created successfully!");
        navigate("/trainingPartner/dashboard");
      } else {
        throw new Error(data.message || "Failed to create center");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error.message || "An error occurred while creating the center");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(formData)
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen py-12">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="space-y-4 mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-indigo-700">Create New Center</h1>
            <p className="text-gray-600">
              Fill out the form below to create a new center.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-indigo-600">Center Name</Label>
                <Input
                  id="name"
                  placeholder="Enter center name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-indigo-200 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-indigo-600">State of Operation</Label>
                <Input
                  id="state"
                  placeholder="Enter state of operation"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="border-indigo-200 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="PRN_NO" className="text-indigo-600">PRN No.</Label>
                <Input
                  id="PRN_NO"
                  placeholder="Enter PRN number"
                  value={formData.PRN_NO}
                  onChange={handleInputChange}
                  required
                  className="border-indigo-200 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-indigo-600">Schemes</Label>
                <div className="bg-gray-50 p-3 rounded-md space-y-2 max-h-40 overflow-y-auto">
                  {allSchemes.map((scheme) => (
                    <div key={scheme._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`scheme-${scheme._id}`}
                        checked={formData.schemes.some(
                          (s) => s.schemeName === scheme.name
                        )}
                        onCheckedChange={(checked) =>
                          handleSchemeChange(scheme.name, checked)
                        }
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <Label htmlFor={`scheme-${scheme._id}`} className="text-sm">{scheme.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="sanction_order_letter" className="text-indigo-600">Sanction Order Letter</Label>
              <Input
                id="sanction_order_letter"
                type="file"
                onChange={handleFileChange}
                className="border-indigo-200 focus:ring-indigo-500"
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="centerId" className="text-indigo-600">Center Id</Label>
                <Input
                  id="centerId"
                  placeholder="Enter center ID"
                  value={formData.centerId}
                  onChange={handleInputChange}
                  required
                  className="border-indigo-200 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectId" className="text-indigo-600">Project Id</Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  required
                  className="border-indigo-200 focus:ring-indigo-500"
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <Label className="text-indigo-600">Sectors</Label>
              <div className="bg-gray-50 p-3 rounded-md grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {availableSectors.map((sector) => (
                  <div key={sector._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sector-${sector._id}`}
                      checked={formData.sectors.includes(sector._id)}
                      onCheckedChange={(checked) =>
                        handleSectorChange(sector._id, checked)
                      }
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label htmlFor={`sector-${sector._id}`} className="text-sm">{sector.name}</Label>
                  </div>
                ))}
              </div>
            </div>
         
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                {isLoading ? "Creating..." : "Create Center"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
