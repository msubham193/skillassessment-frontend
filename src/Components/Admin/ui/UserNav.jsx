import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components(shadcn)/ui/avatar";
import { Button } from "@/components(shadcn)/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components(shadcn)/ui/dropdown-menu";
import { User } from "lucide-react";
import MyProfile from "./profil/MyProfile";
import { useRecoilState } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";
import { toast } from "react-toastify";
const UserNav = ({ admin }) => {
  const [auth,setAuth]=useRecoilState(authenticationState) 
  //function for  Name

  const nameParts = admin.name.split(" ");
  const initials = nameParts.map((part) => part[0]).join("");

  //function for logout
  const logoutHandler=async()=>
    {
      try {
        setAuth(null);
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("tokenExpiration");
      toast.success("You have successfully exited your session.",{
        position: "top-right",
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      } catch (error) {
        toast.error("Unable to Logout!!",{
          position: "bottom-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-[#e6e6fa]">
          <Avatar className="h-8 w-8">
            <AvatarImage src={admin.profile} className="w-full h-full object-cover"/>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{nameParts[0]}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {admin.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <MyProfile admin={admin}>
              <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:cursor-pointer hover:bg-gray-100">
                Profile 
                <DropdownMenuShortcut className={"ml-[132px]"}>⇧⌘P</DropdownMenuShortcut>
              </div>
            </MyProfile>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHandler} className="bg-red-400 hover:cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
