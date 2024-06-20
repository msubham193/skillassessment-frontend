import React from "react";
import UserNav from "./ui/UserNav";
import { Bell } from "lucide-react";
import logo from  '../../assets/logo.png'

const TopBar = () => {
  const admin = {
    name: "Rakes Pradhan",
    email: "rp5865442@gmail.com",
    profile:
      "https://res.cloudinary.com/dcycd6p6i/image/upload/v1702218768/hcwc8pzapqn2egwgu1ag.jpg",
    createdAt: String(new Date().toISOString()),
    role: "admin",
  };
  return (
<nav className="bg-white w-full h-16 border-b border-gray-200 dark:bg-gray-900 ">
<div className="w-full h-full flex flex-row items-center justify-between m-auto px-5">
        {/* avatar logo and name */}
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-spin-slow "
          />
        </a>

        {/* for  notification icon */}
        <div className="flex flex-row gap-5 ">
          <Bell
            size={23}
            className="cursor-pointer mt-[5px] "
          />
          {/* for profile and drope down menue for edit and logout */}
          <UserNav admin={admin}/>
        </div>
      </div>
</nav>

  );
};

export default TopBar;
