import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components(shadcn)/ui/dialog";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Button } from "@/components(shadcn)/ui/button";
import { Avatar, AvatarImage } from "@/components(shadcn)/ui/avatar";
import { ImageUp } from "lucide-react";

const EditProfile = ({ children, admin }) => {
    const [imgprev, setImgprev] = useState(admin.profile);
    const [image, setImage] = useState("");
    const inputRef = useRef(null);
    //function for chose photos from file...
    const handelImageClick = () => {
      inputRef.current.click();
    };
    const cahngeImageHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgprev(reader.result);
        setImage(file);
      };
    };
  
    //function for save Changes
    const saveChange = () => {
      alert("Profile Update Successfully");
      onClose();
    };
    return (
      <>
        <Dialog>
          <DialogTrigger>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your Profile here</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 p-4">
              <div className="flex flex-col items-center gap-4 p-4">
                <div className="flex justify-normal">
                <Avatar className={"h-24 w-24"}>
                  <AvatarImage src={imgprev} className="w-full h-full object-cover" />
                </Avatar>
                <div onClick={handelImageClick}>
                  <input
                    type="file"
                    ref={inputRef}
                    p={1.5}
                    accept="image/*"
                    onChange={cahngeImageHandler}
                    className="hidden invisible"
                  />
                  <ImageUp className="mt-16 cursor-pointer -ml-2 text-3xl" />
                </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={admin&&admin.name}
                  className="col-span-10"
                />
              </div>
            </div>
            <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
}
export default EditProfile
