import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import React, { useState } from "react";

const NotificationForf = () => {
  const [showButton, setShowButton] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  //function for upload file or pdf
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file");
    }
  };
  return (
    <div className="h-full flex-1 flex-col p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create Notification!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;you can create Notification !!!
          </p>
        </div>
      </div>
      <form>
        <div className="mx-72 mt-20">
          <Label htmlFor="projectType" className="text-left w-40">
            Set Notification title
          </Label>
          <Input
            id="projectType"
            className="col-span-4 py-6"
            placeholder="Add email for SNA"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="name" className="text-left w-40">
            Upload pdf
          </Label>
          <Input
            type="file"
            className="cursor-pointer"
            accept=".pdf,.jpg,.jpeg,.png,.gif"
            onChange={handleFileChange}
          />
        </div>
      </form>
      <Button className="w-32 flex mx-72 mt-3" disabled={showButton}>
        {showButton ? "Loading..." : "Create Notification"}
      </Button>
    </div>
  );
};

export default NotificationForf;
