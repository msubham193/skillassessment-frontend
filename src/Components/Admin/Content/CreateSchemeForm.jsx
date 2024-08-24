import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { server } from "@/main";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateSchemeForm = () => {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [schemeType, setSchemeType] = useState("");
  const [code, setCode] = useState("");
  const [pricePerStudent, setPricePerStudent] = useState("");
  const [state, setState] = useState("");
  const [showButton, setShowButton] = useState(false); 

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowButton(true);
    try {
      const response = await axios.post(
        `${server}/scheme`,
        { name, code, projectType, schemeType, pricePerStudent,state },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setName("");
      setCode("");
      setProjectType("");
      setPricePerStudent("");
      toast.success("New scheme added !!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    } catch (error) {
      toast.error("Something went wrong, try after some time !!!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      console.log(error)
      setShowButton(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 pt-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Course!</h2>
          <p className="text-muted-foreground">
            Here&apos;you can create Scheme for Training Partner !!!
          </p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mx-72 mt-10">
          <Label htmlFor="schemeType" className="text-left w-40">
            Scheme Type
          </Label>
          <Select
            id="projectType"
            value={schemeType}
            onValueChange={(value) => setSchemeType(value)}
          >
            <SelectTrigger className="col-span-4 py-6">
              <SelectValue placeholder="Select Scheme Type" />
            </SelectTrigger>
            <SelectContent>
            
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="State Government">State Government</SelectItem>
              <SelectItem value="Central Government">Central Government</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="schemeType" className="text-left w-40">
            Select State
          </Label>
          <Select
            id="schemeType"
            value={state}
            onValueChange={(value) => setState(value)}
          >
            <SelectTrigger className="col-span-4 py-6">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Odisha">Odisha</SelectItem>
            <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
            <SelectItem value="West Bengal">West Bengal</SelectItem>
            <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
            <SelectItem value="Jharkhand">Jharkhand</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="name" className="text-left w-40">
            Project Type
          </Label>
          <Input
            id="scheme-name"
            className="col-span-4 py-6"
            placeholder="Add Project Type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          />
          <Label htmlFor="name" className="text-left w-40">
            Scheme Name
          </Label>
          <Input
            id="scheme-name"
            className="col-span-4 py-6"
            placeholder="Add Scheme name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="code" className="text-left w-40">
            Scheme Code
          </Label>
          <Input
            id="scheme-code"
            className="col-span-4 py-6"
            placeholder="Add Code for Scheme"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {projectType !== "corporate" && (
            <>
              <Label htmlFor="cost" className="text-left w-40">
                Student Fee
              </Label>
              <Input
                id="scheme-cost"
                className="col-span-4 py-6"
                placeholder="Cost Per Student"
                value={pricePerStudent}
                onChange={(e) => setPricePerStudent(e.target.value)}
              />
            </>
          )}
        </div>
      </form>
      <Button
        className="w-32 flex mx-72"
        disabled={showButton}
        onClick={submitHandler}
      >
        {showButton ? "Loading..." : "Create Scheme"}
      </Button>
    </div>
  );
};

export default CreateSchemeForm;
