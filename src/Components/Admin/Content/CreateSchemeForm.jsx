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
  const [cost, setCost] = useState("");
  const [showButton, setShowButton] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowButton(true);
    try {
      const response = await axios.post(
        `${server}/scheme`,
        { name, code, projectType, schemeType, cost },
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
      setCost("");
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
      console.log(error);
      setShowButton(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Scheme!</h2>
          <p className="text-muted-foreground">
            Here&apos;you can create Scheme for Training Partner !!!
          </p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mx-72 mt-20">
          <Label htmlFor="schemeType" className="text-left w-40">
            Scheme Type
          </Label>
          <Select
            id="schemeType"
            value={schemeType}
            onValueChange={(value) => setSchemeType(value)}
          >
            <SelectTrigger className="col-span-4 py-6">
              <SelectValue placeholder="Select Scheme Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="state government">State Government</SelectItem>
              <SelectItem value="central government">Central Government</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="projectType" className="text-left w-40">
            Project Type
          </Label>
          <Input
            id="projectType"
            className="col-span-4 py-6"
            placeholder="Add Project Type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          />
          <Label htmlFor="name" className="text-left w-40">
            Scheme Name
          </Label>
          <Input
            id="name"
            className="col-span-4 py-6"
            placeholder="Add Scheme name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="code" className="text-left w-40">
            Scheme Code
          </Label>
          <Input
            id="code"
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
                id="cost"
                className="col-span-4 py-6"
                placeholder="Cost Per Student"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
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
