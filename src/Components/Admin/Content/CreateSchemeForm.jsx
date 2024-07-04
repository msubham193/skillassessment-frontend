import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import React, { useState } from "react";

const CreateSchemeForm = () => {
    const[schemeName,setSchemeName]=useState("");
    const[projectType,setProjectType]=useState("");
    const[code,setCode]=useState("");
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
      <form action="">
        <div className="mx-72 mt-20">
          <Label htmlFor="name" className="text-left  w-40">
            Scheme Name
          </Label>
          <Input
            id="coursename"
            className="col-span-4 py-6"
            placeholder="Add Scheme name"
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
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
        </div>
      </form>
      <Button className="w-32 flex mx-72">Create Scheme</Button>
    </div>
  );
};

export default CreateSchemeForm;
