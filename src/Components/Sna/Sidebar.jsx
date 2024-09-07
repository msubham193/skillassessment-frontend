/* eslint-disable no-unused-vars */
import {
  FaBars,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBuilding,
  FaClipboardList,
  FaUsers,
  FaRegFileAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const routes = [
  {
    path: "/sna/snadashboard",
    name: "Dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    path: "/sna/trainingbatches",
    name: "Pending Batches",
    icon: <FaClipboardList />,
  },
  {
    path: "/sna/trainingcenters",
    name: "Pending Centers",
    icon: <FaBuilding />,
  },
 
  {
    path: "/sna/reports",
    name: "Reports",
    icon: <FaUsers />,
  },
  // {
  //   path: "/sna/marks",
  //   name: "Marks",
  //   icon: <FaRegFileAlt />,
  // },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("state");
    localStorage.removeItem("scheme");
    navigate("/snalogin");
  };

  return (
    <div
      className={`sticky left-0 top-0 lg:flex flex-col bg-gray-800 text-white transition-width duration-300 ${
        isOpen ? "w-64" : "w-16"
      } lg:w-64 min-h-screen`}
    >
      <div className="p-4 text-lg font-semibold border-b border-gray-700 flex justify-between items-center">
        <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
          SNA Dashboard
        </span>
        <FaBars onClick={toggle} className="cursor-pointer" />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {routes.map((route, index) => (
            <div
              key={index}
              className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => navigate(route.path)}
            >
              <span className="mr-2">{route.icon}</span>
              <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
                {route.name}
              </span>
            </div>
          ))}
        </div>
        <button
          className="flex items-center mt-2 space-x-2 bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
