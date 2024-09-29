import React, { useState } from "react";
import { Button } from "../../../components(shadcn)/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components(shadcn)/ui/dialog";
import { Input } from "../../../components(shadcn)/ui/input";
import { Label } from "../../../components(shadcn)/ui/label";
import axios from "axios";
import { server } from "@/main";
import { toast } from "react-toastify";
const AddAdmin = ({ children }) => { 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowbuttion(true);
    try {
      const response = await axios.post(
        `${server}/admin`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setEmail("")
      setName("")
      setPassword("")
      toast.success("New admin added! An email has been sent with further instructions.", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowbuttion(false)
    } catch (error) {
      toast.error(
        error.response.data.error.email||error.response.data.error.password||error.response.data.error.name ,
        {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        }
      );
      setShowbuttion(false)
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Admin</DialogTitle>
            <DialogDescription>
              Add new admin users to the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-4"
                  placeholder="eg:Sruti Mohanty"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Email
                </Label>
                <Input
                  id="username"
                  className="col-span-4"
                  placeholder="eg:Sruti15@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="create Password here"
                  className="col-span-4"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button disabled={showbuttion} type="submit" onClick={submitHandler}>
              {showbuttion ? "Loading...." : "Create Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdmin;
