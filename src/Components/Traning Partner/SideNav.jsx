import React, { useState } from "react";
import { LayoutDashboard, ChevronRight, ChevronLeft, BotMessageSquare, PackagePlus,CirclePlus,SquareGanttChart,Users } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import {
    useWindowWidth,
  } from '@react-hook/window-size'
import { Nav } from "./ui/Nav";

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
            href:"/trainingPartner/dashboard"
          },
          {
            title: "createBatch",
            label: "",
            icon: CirclePlus ,
            variant: "ghost",
            href:"/CreateBatch"
          },
          {
            title: "Manage batches",
            label: "",
            icon: SquareGanttChart,
            variant: "ghost",
            href:"/manageBatch"
          },
          {
            title: "Create center",
            label: "",
            icon: BotMessageSquare,
            variant: "ghost",
            href:"/Createcenter"
          },
          {
            title: "Transcript",
            label: "",
            icon: PackagePlus ,
            variant: "ghost",
            href:"/transcript"
          },
          {
            title: "Teachers",
            label: "",
            icon: Users ,
            variant: "ghost",
            href:"/trainers"
          },
        ]}
      />
    </div>
  );
};

export default SideNav;