import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
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
    },
  ]);

  const [sectors, setSectors] = useState([]); //state for dropdown menue...
  const [sectorName, setSectorName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [ncrfLevel, setNcrfLevel] = useState("");
  const [aggregate, setAggregate] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);

  //function for store the value in an array...
  const handleAddField = () => {
    setNos([
      ...nos,
      {
        description: "",
        code: "",
        credit: "",
        theoryMarks: "",
        practicalMarks: "",
        vivaMarks: "",
        totalMarks: "",
        nosWisePassPercentage: "",
      },
    ]);
  };

  //function for change field of array of field
  const handleFieldChange = (index, event) => {
    const values = [...nos];
    values[index][event.target.name] = event.target.value;
    setNos(values);
  };

  //function for find all the sector
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(`${server}/sector/all`);
        setSectors(response.data.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);
  //function for celect valu from dropdown...
  const handleSectorSelect = (sectoreName) => {
    setSectorName(sectoreName);
  };

  //function for create course
  const handleCreateCOurse = async (e) => {
    e.preventDefault();
    setShowbuttion(true);
    try {
      const response = await axios.post(
        `${server}/course`,
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
      setShowbuttion(false);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowbuttion(false);
    }
  };
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Course!</h2>
          <p className="text-muted-foreground">
            Here&apos;you can create Course or Sector for trainingPartner!
          </p>
        </div>
      </div>
      {/* Form for creating course and selecting sector */}
      <form onSubmit={handleCreateCOurse} >
        <div className="flex items-center space-x-4 mx-60">
          <Input
            type="text"
            id="sector"
            value={sectorName}
            placeholder="Select sector"
            className="flex-1 py-6"
          />
          <Select onValueChange={handleSectorSelect}>
            <SelectTrigger className="w-[40px] h-[40px] border-none absolute right-[445px]"></SelectTrigger>
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
        {/* create a form for course */}
        <div className="mx-60">
          <Label htmlFor="name" className="text-left  w-40">
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
              <Label htmlFor="name" className="text-left  w-40">
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
              <Label htmlFor="name" className="text-left  w-40">
                Course duration in hours
              </Label>
              <Input
                id="coursduration"
                className="col-span-4 py-6"
                placeholder="Add Course suration in hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-left  w-40">
                NCRF LEVEL
              </Label>
              <Input
                id="ncrflevel"
                className="col-span-4 py-6"
                placeholder="Add NCRF LEVEL "
                value={ncrfLevel}
                onChange={(e) => setNcrfLevel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-left  w-40">
                Total credit
              </Label>
              <Input
                id="ncrflevel"
                className="col-span-4 py-6"
                placeholder="Add Total credit "
                value={totalCredit}
                onChange={(e) => setTotalCredit(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-left  w-40">
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
          {/* add  Nos */}
          {nos.map((field, index) => (
            <div
              key={index}
              className="mt-4 border-[1px] border-gray-300 rounded-md"
            >
              <div className="p-3">
                <Label htmlFor="description" className="text-left w-40">
                  Add NOS
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={field.description}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="flex-1 py-5"
                  placeholder="Add Subject Name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label htmlFor="code" className="text-left w-40">
                      NOS CODE
                    </Label>
                    <Input
                      type="text"
                      name="code"
                      value={field.code}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="credit" className="text-left w-40">
                      CREDIT
                    </Label>
                    <Input
                      type="text"
                      name="credit"
                      value={field.credit}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Credit"
                    />
                  </div>
                  <div>
                    <Label htmlFor="theoryMark" className="text-left w-40">
                      THEORY MARK
                    </Label>
                    <Input
                      type="text"
                      name="theoryMarks"
                      value={field.theoryMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Theory Mark"
                    />
                  </div>
                  <div>
                    <Label htmlFor="practicalMark" className="text-left w-40">
                      PRACTICAL MARK
                    </Label>
                    <Input
                      type="text"
                      name="practicalMarks"
                      value={field.practicalMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Practical Mark"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vivaMark" className="text-left w-40">
                      VIVA MARK
                    </Label>
                    <Input
                      type="text"
                      name="vivaMarks"
                      value={field.vivaMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Viva Mark"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalMark" className="text-left w-40">
                      TOTAL MARK
                    </Label>
                    <Input
                      type="text"
                      name="totalMarks"
                      value={field.totalMarks}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject Total Mark"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passPercentage" className="text-left w-40">
                      NOS WISE PASS %
                    </Label>
                    <Input
                      type="text"
                      name="nosWisePassPercentage"
                      value={field.nosWisePassPercentage}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="col-span-4 py-5"
                      placeholder="Add Subject wise pass %"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
      <div className="flex justify-between mt-4 mx-60">
        <Button
          onClick={handleAddField}
          className="flex items-center space-x-1"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Field</span>
        </Button>
        <Button onClick={handleCreateCOurse} className="flex items-center space-x-1">
          Create course
        </Button>
      </div>
    </div>
  );
};

export default CreateCourseForm;

{
  /*
  <h3 className="text-lg font-medium mb-2">Add Fields</h3>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Input
            type="text"
            value={field.value}
            onChange={(e) => handleFieldChange(index, e)}
            className="flex-1"
            placeholder={`Field ${index + 1}`}
          />
        </div>
      ))}
      <Button onClick={handleAddField} className="flex items-center space-x-1">
        <PlusIcon className="h-5 w-5" />
        <span>Add Field</span>
      </Button>
      <Button onClick={handleAddField}>addd</Button>

      */
}
