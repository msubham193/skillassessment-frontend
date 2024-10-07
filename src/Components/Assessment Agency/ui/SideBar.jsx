/* eslint-disable no-unused-vars */
import {
  FaBars,
  FaFileInvoice,
  FaUserEdit,
  FaUpload,
  FaCreditCard,
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReceiptText } from "lucide-react";

const routes = [
  {
    path: "/dashboard/assessmentschedule",
    name: "Assessment Schedule",
    icon: <FaClock />,
  },
  {
    path: "/dashboard/managebatches",
    name: "Batch Management",
    icon: <FaLayerGroup />,
  },
  {
    path: "/dashboard/assessors",
    name: "All Assessors",
    icon: <FaUsers />,
  },
  {
    path: "/dashboard/addassessor",
    name: "Add Assessor",
    icon: <FaUserEdit />,
  },
  {
    path: "/dashboard/uploadresult",
    name: "Upload Result",
    icon: <FaUpload />,
  },
  {
    path: "/dashboard/paymentstatus",
    name: "Upload monthly invoice",
    icon: <FaCreditCard />,
  },
  {
    path: "/dashboard/invoice",
    name: "Invoice",
    icon: <ReceiptText />,
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: <FaUserCircle />,
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("aaAuthToken");
    const token = localStorage.getItem("aaAuthToken");
    navigate("/login");
  };

  return (
    <div
      className={`lg:flex flex-col bg-gray-800 text-white transition-width duration-300 fixed ${
        isOpen ? "w-64" : "w-16"
      } lg:w-64 min-h-screen`}
    >
      <div className="p-4 text-lg font-semibold border-b border-gray-700 flex justify-between items-center">
        <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
          Skill Assessment Dashboard
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
              <span
                className={`${isOpen ? "block" : "hidden"} lg:block text-base`}
              >
                {route.name}
              </span>
            </div>
          ))}
        </div>
        <button
          className="flex items-center mt-2 gap-2 bg-red-500 text-white px-3 text-sm py-2 rounded-md"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
