import React, { useState, useEffect } from "react";
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";
import { Button } from "@/components(shadcn)/ui/button";
import { Checkbox } from "@/components(shadcn)/ui/checkbox";
import { toast } from "react-toastify";
import { server } from "@/main";

const UpdateCenterForm = ({ center, onClose, onUpdate }) => { 
  const [formData, setFormData] = useState(center);
  const [isLoading, setIsLoading] = useState(false);
  const [availableSectors, setAvailableSectors] = useState([]);
  const [allSchemes, setAllSchemes] = useState([]);

  useEffect(() => {
    const fetchSectorsAndSchemes = async () => {
      try {
        const [sectorsResponse, schemesResponse] = await Promise.all([
          fetch(`${server}/sector/all`),
          fetch(`${server}/scheme`),
        ]);

        const sectorsData = await sectorsResponse.json();
        const schemesData = await schemesResponse.json();

        setAvailableSectors(sectorsData.data || []);
        setAllSchemes(schemesData.data || []);
      } catch (error) {
        console.error("Error fetching sectors and schemes:", error);
        toast.error("Failed to load sectors and schemes");
      }
    };

    fetchSectorsAndSchemes();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${server}/center/update/${center._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Center updated successfully!");
        onUpdate(data.data);
      } else {
        throw new Error(data.message || "Failed to update center");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(
        error.message || "An error occurred while updating the center"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Update Center</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Center Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State of Operation</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="PRN_NO">PRN No.</Label>
            <Input
              id="PRN_NO"
              value={formData.PRN_NO}
              onChange={handleInputChange}
              required
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="centerId">Center Id</Label>
            <Input
              id="centerId"
              value={formData.centerId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectId">Project Id</Label>
            <Input
              id="projectId"
              value={formData.projectId}
              onChange={handleInputChange}
              required
            />
          </div>

         {/*  <div className="space-y-2">
            <Label>Schemes</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allSchemes.map((scheme) => (
                <div key={scheme._id} className="flex items-center">
                  <Checkbox
                    id={`scheme-${scheme._id}`}
                    checked={formData.schemes.some(
                      (s) => s.schemeName === scheme.name
                    )}
                    onCheckedChange={(checked) =>
                      handleSchemeChange(scheme.name, checked)
                    }
                  />
                  <Label htmlFor={`scheme-${scheme._id}`} className="ml-2">
                    {scheme.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          */}

          <div className="space-y-2">
            <Label>Sectors</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableSectors.map((sector) => (
                <div key={sector._id} className="flex items-center">
                  <Checkbox
                    id={`sector-${sector._id}`}
                    checked={formData.sectors.includes(sector._id)}
                    onCheckedChange={(checked) =>
                      handleSectorChange(sector._id, checked)
                    }
                  />
                  <Label htmlFor={`sector-${sector._id}`} className="ml-2">
                    {sector.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Center"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCenterForm;
