import React, { useState } from "react";
import { LayoutDashboard, BellDot, ChevronRight, ChevronLeft, Handshake, BotMessageSquare, PackagePlus } from "lucide-react";
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
    <div className=" relative min-w-[80px] border-r px-2 pb-10 pt-12">
 {
    !mobileWidth &&(
        <div className="absolute right-[-20px] top-2">
        <Button onClick={toogelSideBar} className={"rounded-full p-2"} variant="secondary">
        {
          isCollapsed ?<ChevronRight/>:<ChevronLeft/>
        }
        </Button>
        </div>
    )
 }
      <Nav
        isCollapsed={mobileWidth?true: isCollapsed}
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
        ]}
      />
    </div>
  );
};

export default SideNav;
