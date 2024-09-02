import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import React, { useState } from "react";
import axios from "axios"; // Add axios for making HTTP requests
import { server } from "@/main";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const NotificationForf = () => {
  const [showButton, setShowButton] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [expiredAt, setExpiredAt] = useState(""); // Add state for expiredAt
  const [pdf, setPdf] = useState(null);

  // Function for handling file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["application/pdf"];
  
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setPdf(selectedFile);
    } else {
      setShowButton(true);
      toast.error("Please select a PDF only", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  // Function for handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowButton(true);
  
    // Create a FormData object to send file and form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("expiredAt", expiredAt);
    if (pdf) {
      formData.append("pdf", pdf); 
    }
  
    try {
    // Send a POST request to your backend
    //   for (const pair of formData.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    // }
      const response = await axios({
        method: 'post',
        url: `${server}/admin/notification`,
        data: formData  
      });
      toast.success("Notification created successfully!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setTitle("");
      setDescription("");
      setExpiredAt("");
    } catch (error) {
      toast.error("Something went wrong, try again later!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      console.error(error);
    } finally {
      setShowButton(false);
    }
  };
  

  return (
    <div className="h-full flex-1 flex-col p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Notification!</h2>
          <p className="text-muted-foreground">
            Here&apos; you can create a Notification!
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-72 mt-20">
          <Label htmlFor="title" className="text-left w-40">
            Set Notification Title
          </Label>
          <Input
            id="title"
            className="col-span-4 py-6"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label htmlFor="description" className="text-left w-40">
            Set Description
          </Label>
          <Input
            id="description"
            className="col-span-4 py-6"
            placeholder="Enter description for notification"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Label htmlFor="expiredAt" className="text-left w-40">
            Expiration Date
          </Label>
          <Input
            type="date"
            id="expiredAt"
            className="col-span-4 py-6"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
            required
          />
          <Label htmlFor="file" className="text-left w-40">
            Upload PDF
          </Label>
          <Input
            type="file"
            id="file"
            className="cursor-pointer"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <Button className="w-32 flex mx-72 mt-3" type="submit" disabled={showButton}>
          {showButton ? "Loading..." : "Create Notification"}
        </Button>
      </form>
    </div>
  );
};

export default NotificationForf;
