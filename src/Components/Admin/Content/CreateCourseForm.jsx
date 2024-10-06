import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components(shadcn)/ui/select";
import React, { useEffect, useState } from "react";
import AddSector from "./AddSector";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components(shadcn)/ui/label";
import { server } from "@/main";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCourseForm = () => {
  const [nos, setNos] = useState([
    {
      description: "",
      code: "",
      credit: "",
      theoryMarks: "",
      practicalMarks: "",
      vivaMarks: "",
      totalMarks: "",
      nosWisePassPercentage: "",
      nosType:"",
    },
  ]);

  const [sectors, setSectors] = useState([]);
  const [sectorName, setSectorName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [ncrfLevel, setNcrfLevel] = useState("");
  const [aggregate, setAggregate] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleAddField = () => {
    setNos([
      ...nos,
      {
        description: "",
        code: "",
        nosType:"",
        credit: "",
        theoryMarks: "",
        practicalMarks: "",
        vivaMarks: "",
        totalMarks: "",
        nosWisePassPercentage: "",
      },
    ]);
  };

  const handleFieldChange = (index, event) => {
    const values = [...nos];
    values[index][event.target.name] = event.target.value;
    setNos(values);
  };

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(`${server}/sector/all`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setSectors(response.data.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);

  const handleSectorSelect = (sectorName) => {
    setSectorName(sectorName);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setShowButton(true);

    // Validation checks
    if (!courseName || !courseCode || !sectorName || !duration || !ncrfLevel || !totalCredit || !aggregate) {
      toast.error("Please fill out all required fields.", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
      return;
    }

    for (let i = 0; i < nos.length; i++) {
      const field = nos[i];
      if (!field.description || !field.code || !field.nosType || !field.credit || !field.theoryMarks || !field.practicalMarks || !field.vivaMarks || !field.totalMarks || !field.nosWisePassPercentage) {
        toast.error(`Please fill out all NOS fields for entry ${i + 1}.`, {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setShowButton(false);
        return;
      }
    }

    try {
      await axios.post(
        `${server}/course/course`,
        {
          courseName,
          courseCode,
          sectorName,
          duration,
          Nos: nos,
          ncrfLevel,
          totalCredit,
          aggregate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("New Course created", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    } catch (error) {
      // console.log(error.response.data.error);
      toast.error(error.response.data.error, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <form onSubmit={handleCreateCourse}>
        <div className="flex items-center space-x-4 mx-60">
          <Input
            type="text"
            id="sector"
            value={sectorName}
            placeholder="Select sector"
            className="flex-1 py-6"
            readOnly
          />
          <Select onValueChange={handleSectorSelect}>
            <SelectTrigger className="w-[40px] h-[40px] border-none absolute right-[473px] bg-purple-400"></SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.name}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">OR</span>
            <AddSector>
              <Button className="bg-green-500">Create Sector</Button>
            </AddSector>
          </div>
        </div>
        <div className="mx-60">
          <Label htmlFor="coursename" className="text-left w-40">
            Course Name
          </Label>
          <Input
            id="coursename"
            className="col-span-4 py-6"
            placeholder="Add Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <div>
              <Label htmlFor="courscode" className="text-left w-40">
                Course Code
              </Label>
              <Input
                id="courscode"
                className="col-span-4 py-6"
                placeholder="Add Course Code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="coursduration" className="text-left w-40">
                Course duration in hours
              </Label>
              <Input
                id="coursduration"
                className="col-span-4 py-6"
                placeholder="Add Course duration in hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ncrflevel" className="text-left w-40">
                NSQF LEVEL
              </Label>
              <Input
                id="ncrflevel"
                className="col-span-4 py-6"
                placeholder="Add NSQF LEVEL"
                value={ncrfLevel}
                onChange={(e) => setNcrfLevel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="totalcredit" className="text-left w-40">
                Total Credit
              </Label>
              <Input
                id="totalcredit"
                className="col-span-4 py-6"
                placeholder="Add Total Credit"
                value={totalCredit}
                onChange={(e) => setTotalCredit(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="aggregate" className="text-left w-40">
                Course Aggregate %
              </Label>
              <Input
                id="aggregate"
                className="col-span-4 py-6"
                placeholder="Add Aggregate %"
                value={aggregate}
                onChange={(e) => setAggregate(e.target.value)}
              />
            </div>
          </div>
          {nos.map((field, index) => (
            <div
              key={index}
              className="mt-4 border-[1px] border-gray-300 rounded-md"
            >
              <div className="p-3">
                <Label htmlFor={`description-${index}`} className="text-left w-40">
                   NOS NAME
                </Label>
                <Input
                  id={`description-${index}`}
                  type="text"
                  name="description"
                  value={field.description}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="flex-1 py-5"
                  placeholder="Add Subject Name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label htmlFor={`code-${index}`} className="text-left w-40">
                      NOS CODE
                    </Label>
                    <Input
                      id={`code-${index}`}
                      type="text"
                      name="code"
                      value={field.code}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Subject Code"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`code-${index}`} className="text-left w-40">
                      NOS TYPE
                    </Label>
                    <Input
                      id={`nosType-${index}`}
                      type="text"
                      name="nosType"
                      value={field.nosType}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Type of nos"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`credit-${index}`} className="text-left w-40">
                      Credit
                    </Label>
                    <Input
                      id={`credit-${index}`}
                      type="text"
                      name="credit"
                      value={field.credit}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Credit"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`theoryMarks-${index}`} className="text-left w-40">
                      Theory Marks
                    </Label>
                    <Input
                      id={`theoryMarks-${index}`}
                      type="text"
                      name="theoryMarks"
                      value={field.theoryMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Theory Marks"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`practicalMarks-${index}`} className="text-left w-40">
                      Practical Marks
                    </Label>
                    <Input
                      id={`practicalMarks-${index}`}
                      type="text"
                      name="practicalMarks"
                      value={field.practicalMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Practical Marks"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`vivaMarks-${index}`} className="text-left w-40">
                      Viva Marks
                    </Label>
                    <Input
                      id={`vivaMarks-${index}`}
                      type="text"
                      name="vivaMarks"
                      value={field.vivaMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Viva Marks"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`totalMarks-${index}`} className="text-left w-40">
                      Total Marks
                    </Label>
                    <Input
                      id={`totalMarks-${index}`}
                      type="text"
                      name="totalMarks"
                      value={field.totalMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Total Marks"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`nosWisePassPercentage-${index}`} className="text-left w-40">
                      NOS wise pass %
                    </Label>
                    <Input
                      id={`nosWisePassPercentage-${index}`}
                      type="text"
                      name="nosWisePassPercentage"
                      value={field.nosWisePassPercentage}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="flex-1 py-5"
                      placeholder="Add Pass %"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleAddField}
            >
              <PlusIcon className="w-5 h-5" />
              Add Another NOS
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            disabled={showButton}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {showButton ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;
