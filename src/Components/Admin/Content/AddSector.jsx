import { Button } from "@/components(shadcn)/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components(shadcn)/ui/dialog";
import { Input } from "@/components(shadcn)/ui/input";
import { server } from "@/main";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddSector = ({ children }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);

  //function for create  sector
  const createSector = async (e) => {
    e.preventDefault();
    setShowbuttion(true);
    try {
      const response = await axios.post(
        `${server}/sector`,
        { name, description},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setName("");
      setDescription("");
      toast.success(
        "New Sector created",
        {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        }
      );
      setShowbuttion(false);
    } catch (error) {
      toast.error(
        error.response.data,
        {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        }
      );
      setShowbuttion(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Sector</DialogTitle>
            <DialogDescription>
              Create Sector for Course or select from dropdown
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createSector}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left w-36">
                  SECTOR NAME
                </Label>
                <Input
                  id="name"
                  value={name}
                  className="col-span-4"
                  placeholder="Create  Sector Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left  w-40">
                  SECTOR DESCRIPTION
                </Label>
                <Input
                  id="description"
                  className="col-span-4"
                  placeholder="Add description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button onClick={createSector} type="submit" disabled={showbuttion}>
              {showbuttion ? "Lading...." : "Generate Sector"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSector;
