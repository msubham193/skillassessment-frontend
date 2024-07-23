import React, { useState } from "react";
import { LayoutDashboard, BellDot, ChevronRight, ChevronLeft, Handshake, BotMessageSquare, PackagePlus, GraduationCap, HandCoins, FilePlus2 } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import {
    useWindowWidth,
  } from '@react-hook/window-size'
import { Nav } from "../ui/Nav";

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth()
 const mobileWidth=onlyWidth < 768
  const toogelSideBar=()=>
    {
        setIsCollapsed(!isCollapsed)
    }

  return (
    <div className="relative min-w-[80px] border-r px-2 pb-10 pt-4 bg-[#E8F5E9]">
 {
    !mobileWidth &&(
        <div className="absolute right-[-20px] top-2">
        </div>
    )
 }
      <Nav 
        links={[
          {
            title: "Home",
            label: "",
            icon: LayoutDashboard,
            variant: "default",
            href:"/admin/dasbord"
          },
         
          {
            title: "Notification's",
            label: "",
            icon: BellDot,
            variant: "ghost",
            href:"/admin/dasbord/Notification"
          },
          {
            title: "Total Batch",
            label: "",
            icon: GraduationCap,
            variant: "default",
            href:"/admin/dasbord/batch"
          },
          {
            title: "Total Training Partner",
            label: "",
            icon: Handshake,
            variant: "ghost",
            href:"/admin/dasbord/TreaningPartner"
          },
          {
            title: "Total Assessment Agency",
            label: "",
            icon: BotMessageSquare,
            variant: "ghost",
            href:"/admin/dasbord/AssessmentAgency"
          },
          {
            title: "All Payments",
            label: "",
            icon: HandCoins,
            variant: "ghost",
            href:"/admin/dasbord/PaymentsDetails"
          },
          {
            title: "Create Course",
            label: "",
            icon: PackagePlus ,
            variant: "ghost",
            href:"/admin/dasbord/createCourse"
          },
          {
            title: "Create Scheme",
            label: "",
            icon: PackagePlus ,
            variant: "ghost",
            href:"/admin/dasbord/createScheme"
          },
          {
            title: "Create Certificate",
            label: "",
            icon: FilePlus2 ,
            variant: "ghost",
            href:"/admin/dasbord/createCertificate"
          },
        ]}
      />
    </div>
  );
};

export default SideNav;
