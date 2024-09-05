import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components(shadcn)/ui/dialog";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components(shadcn)/ui/avatar";
import { User, Mail, Calendar } from "lucide-react";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
const MyProfile = ({ children, admin }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div>
          <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={admin?.avatarUrl} alt={admin?.name} />
                <AvatarFallback>{admin?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-bold">
                {admin?.name ?? "N/A"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm">{admin?.name ?? "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm">{admin?.email ?? "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created At
                  </p>
                  <p className="text-sm">
                    {admin?.createdAt ? formatDate(admin?.createdAt) : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyProfile;
