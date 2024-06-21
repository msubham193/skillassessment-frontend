import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components(shadcn)/ui/dialog";
  import { Button } from "@/components(shadcn)/ui/button";
  import { Avatar, AvatarImage } from "@/components(shadcn)/ui/avatar";
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';
const MyProfile = ({ children, admin }) => {
  return (
    <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Profile</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 p-4 ">
        <Avatar className={"h-24 w-24"}>
          <AvatarImage src={admin && admin.profile} className="w-full h-full object-cover" />
        </Avatar>
        <div>
          <span className="font-bold">Name : </span>
          {admin && admin.name}
        </div>
        <div>
          <span className="font-bold">Email : </span>
          {admin && admin.email}
        </div>
        <div>
          <span className="font-bold">CreatedAt :</span>
          {admin && admin.createdAt}
        </div>
      </div>
      <DialogFooter className="sm:justify-end">
        <EditProfile admin={admin && admin}>
          <Button type="submit">
            Edit profile
          </Button>
        </EditProfile>
        <EditPassword>
          <Button type="submit" >
            Change password
          </Button>
        </EditPassword>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default MyProfile
