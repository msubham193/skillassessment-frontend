import React, { useState } from "react";
import { Nav } from "./ui/Nav";
import { LayoutDashboard, BellDot,CirclePlus, ChevronRight, ChevronLeft, Ghost } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import {
    useWindowWidth,
  } from '@react-hook/window-size'

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth()
 const mobileWidth=onlyWidth < 768
  const toogelSideBar=()=>
    {
        setIsCollapsed(!isCollapsed)
    }

  return (
    <div className=" relative min-w-[80px] border-r px-2 pr-5  pb-10 pt-24 bg-[#0C0C0C]">
 {
    !mobileWidth &&(
        <div className="absolute right-[-20px] top-5">
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
            title: "DashBoard",
            path:"",
            label: "",
            icon: LayoutDashboard,
            variant: "default",
          },
        
          {
            title:"Create Batch",
            label:"",
            path:"CreateBatch",
            icon:CirclePlus,
            variant:"secondary"
          },
          // {
          //   title:"Create Course",
          //   label:"",
          //   path:"CreateCourse",
          //   icon:CirclePlus,
          //   variant:"secondary"
          // },
          // {
          //   title:"Create Sector",
          //   label:"",
          //   path:"CreateSector",
          //   icon:CirclePlus,
          //   variant:"secondary"
          // }
        ]}
      />
    </div>
  );
};

export default SideNav;
