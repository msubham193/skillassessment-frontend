import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { server } from "@/main";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateSchemeForm = () => {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [code, setCode] = useState("");
  const [showButton, setShowButton] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setShowButton(true);
    try {
      const response = await axios.post(
        `${server}/scheme`,
        { name, code, projectType },
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
      toast.success("New scheme added !!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    } catch (error) {
      toast.error("Somthinf went wrong try after sometime !!!", {
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
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Course!</h2>
          <p className="text-muted-foreground">
            Here&apos;you can create Scheme for Traning Partner !!!
          </p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mx-72 mt-20">
          <Label htmlFor="name" className="text-left  w-40">
            Scheme Name
          </Label>
          <Input
            id="coursename"
            className="col-span-4 py-6"
            placeholder="Add Scheme name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="name" className="text-left  w-40">
            Scheme Code
          </Label>
          <Input
            id="coursename"
            className="col-span-4 py-6"
            placeholder="Add Code for Scheme"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Label htmlFor="name" className="text-left  w-40">
            Project Type
          </Label>
          <Input
            id="coursename"
            className="col-span-4 py-6"
            placeholder="Add Project Type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          />
        </div>
      </form>
      <Button
        className="w-32 flex mx-72"
        disabled={showButton}
        onClick={submitHandler}
      >
        {showButton ? "Loding..." : " Create Scheme"}
      </Button>
    </div>
  );
};

export default CreateSchemeForm;
