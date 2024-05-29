import React from "react";
import { Button } from "../../../components(shadcn)/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components(shadcn)/ui/dialog";
import { Input } from "../../../components(shadcn)/ui/input";
import { Label } from "../../../components(shadcn)/ui/label";
const AddAdmin = ({ children }) => {
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
              Username
              </Label>
              <Input
                id="username"
                className="col-span-4"
                placeholder="eg:Sruti15@gmail.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                placeholder="create Password here"
                className="col-span-4"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdmin;
