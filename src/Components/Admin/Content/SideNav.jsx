import React, { useState } from "react";
import { LayoutDashboard, BellDot, ChevronRight, ChevronLeft, Handshake, BotMessageSquare, PackagePlus, GraduationCap, HandCoins, FilePlus2, BookOpenCheck, UserPlus, BellPlus, Menu } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";
import {
    useWindowWidth,
  } from '@react-hook/window-size'
import { Nav } from "../ui/Nav";
import { useRecoilValue } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth()
 const mobileWidth=onlyWidth < 768
 const isAdmin = useRecoilValue(authenticationState);
    const specificEmail = "adminaccount@cutm.ac.in";
  const toggleSideBar=()=>
    {
        setIsCollapsed(!isCollapsed)
    }

  return (
    <div className="relative min-w-[80px] border-r px-2 pb-10 pt-4 bg-[#e6e6fa]">
    {!mobileWidth && (
      <div className="absolute right-[-20px] top-5">
        <Button
          onClick={toggleSideBar}
          variant="ghost"
          className="rounded-full p-2"
        >
          
        </Button>
      </div>
    )}
      {isAdmin?.email === specificEmail ? (
        <Nav links={[{
          title: "All Payments",
          label: "",
          icon: HandCoins,
          variant: "ghost",
          href: "/admin/dasbord/PaymentsDetails"
        }]} />
      ) : (
        <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Home",
              label: "", 
              icon: LayoutDashboard,
              variant: "default",
              href: "/admin/dasbord"
            },
            {
              title: "Notification's",
              label: "",
              icon: BellDot,
              variant: "ghost",
              href: "/admin/dasbord/Notification"
            },
            {
              title: "Batch",
              label: "",
              icon: GraduationCap,
              variant: "ghost",
              href: "/admin/dasbord/batch"
            },
            {
              title: "Exam's",
              label: "",
              icon: BookOpenCheck,
              variant: "ghost",
              href: "/admin/dasbord/AllExam"
            },
            {
              title: "Training Partner",
              label: "",
              icon: Handshake,
              variant: "ghost",
              href: "/admin/dasbord/TreaningPartner"
            },
            {
              title: "Assessment Agency",
              label: "",
              icon: BotMessageSquare,
              variant: "ghost",
              href: "/admin/dasbord/AssessmentAgency"
            },
            {
              title: "All Payments",
              label: "",
              icon: HandCoins,
              variant: "ghost",
              href: "/admin/dasbord/PaymentsDetails"
            },
            {
              title: "Create Course",
              label: "",
              icon: PackagePlus,
              variant: "ghost",
              href: "/admin/dasbord/createCourse"
            },
            {
              title: "Create Scheme",
              label: "",
              icon: PackagePlus,
              variant: "ghost",
              href: "/admin/dasbord/createScheme"
            },
            {
              title: "Create SNA",
              label: "",
              icon: UserPlus,
              variant: "ghost",
              href: "/admin/dasbord/CreateSna"
            },
            {
              title: "TOA & TOT",
              label: "",
              icon: FilePlus2,
              variant: "ghost",
              href: "/admin/dasbord/createCertificate"
            },
            {
              title: "Create Notification",
              label: "",
              icon: BellPlus,
              variant: "ghost",
              href: "/admin/dasbord/addNotification for mainpage"
            },
          ]}
        />
      )}
    </div>
  );
};

export default SideNav;
