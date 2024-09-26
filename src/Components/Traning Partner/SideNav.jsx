import React, { useState } from "react";
import { LayoutDashboard, BotMessageSquare, PackagePlus, CirclePlus, SquareGanttChart, Users,Disc2,Repeat2,AudioWaveform } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./ui/Nav";

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
     <div className="relative min-w-[80px] h-full border-r border-[#1F3B4D] bg-[#f5f5f] px-2 pb-10 pt-12">
      <Nav
        // isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Home",
            label: "",
            icon: LayoutDashboard,
            variant: "default",
            href: "/trainingPartner/dashboard",
          },
          {
            title: "Create Center",
            label: "",
            icon: BotMessageSquare,
            variant: "ghost",
            href: "/Createcenter",
          },
          {
            title: "Create Batch",
            label: "",
            icon: CirclePlus,
            variant: "ghost",
            href: "/CreateBatch",
          },
          {
            title: "Manage Batches",
            label: "",
            icon: SquareGanttChart,
            variant: "ghost",
            href: "/manageBatch",
          },
          {
            title: "Track Payment",
            label: "",
            icon: AudioWaveform,
            variant: "ghost",
            href: "/trackpayment",
          },
          {
            title:"Centers",
            label:"",
            icon:Disc2,
            variant:"ghost",
            href:"/centers"
          },
          {
            title: "Trainers",
            label: "",
            icon: Users,
            variant: "ghost",
            href: "/trainers",
          },
         
          {
            title: "Transcript",
            label: "",
            icon: PackagePlus,
            variant: "ghost",
            href: "/transcript",
          },
          {
            title: "Update Center",
            label: "",
            icon: Repeat2,
            variant: "ghost",
            href: "/updateCenter",
          },
         
          
        ]}
      />
    </div>
  );
};

export default SideNav;
