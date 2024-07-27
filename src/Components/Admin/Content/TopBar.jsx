import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import logo from '../../../assets/logo.png';
import UserNav from "../ui/UserNav";
import { Select, SelectContent, SelectTrigger } from "@/components(shadcn)/ui/select";
import axios from "axios";
import { server } from "@/main";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate(); 
  const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem("notifications")) || []);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchData1 = async () => {
    try {
      const response = await axios.get(`${server}/aa/status/pending`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) {
        setNotifications((prev) => [...prev, ...newData.map(() => "A new Assessment Agency found")]);
      } else if (newData.length > notifications.filter((notif) => notif.includes("Assessment Agency")).length) {
        const newNotifications = new Array(newData.length - notifications.filter((notif) => notif.includes("Assessment Agency")).length).fill("A new Assessment Agency found");
        setNotifications((prev) => [...prev, ...newNotifications]);
        localStorage.setItem("notifications", JSON.stringify([...notifications, ...newNotifications]));
      }
    } catch (error) {
      console.error('Error fetching data1:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`${server}/tp/status/pending`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) {
        setNotifications((prev) => [...prev, ...newData.map(() => "A new Training Partner found")]);
      } else if (newData.length > notifications.filter((notif) => notif.includes("Training Partner")).length) {
        const newNotifications = new Array(newData.length - notifications.filter((notif) => notif.includes("Training Partner")).length).fill("A new Training Partner found");
        setNotifications((prev) => [...prev, ...newNotifications]);
        localStorage.setItem("notifications", JSON.stringify([...notifications, ...newNotifications]));
      }
    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get(`${server}/batch/all/paymentnotification`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) {
        setNotifications((prev) => [...prev, ...newData.map(() => "A new Batch request found")]);
      } else if (newData.length > notifications.filter((notif) => notif.includes("Batch request")).length) {
        const newNotifications = new Array(newData.length - notifications.filter((notif) => notif.includes("Batch request")).length).fill("A new Batch request found");
        setNotifications((prev) => [...prev, ...newNotifications]);
        localStorage.setItem("notifications", JSON.stringify([...notifications, ...newNotifications]));
      }
    } catch (error) {
      console.error('Error fetching data3:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchData1(), fetchData2(), fetchData3()]);
      setLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    };

    fetchData();

    const interval1 = setInterval(fetchData1, 20 * 1000); // 20 seconds for assessment agency
    const interval2 = setInterval(fetchData2, 20 * 1000); // 20 seconds for training partner
    const interval3 = setInterval(fetchData3, 20 * 1000); // 20 seconds for batch requests

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [initialLoad, notifications]);

  const handleOnClick = (notification) => {
    if (notification.includes("Assessment Agency")) {
      navigate("/admin/dashboard/Notification?tab=overview");
    } else if (notification.includes("Training Partner")) {
      navigate("/admin/dashboard/Notification?tab=analytics");
    } else if (notification.includes("Batch request")) {
      navigate("/admin/dashboard/Notification?tab=updateBatch");
    }

    const updatedNotifications = notifications.filter(notif => notif !== notification);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const admin = {
    name: "Rakes Pradhan",
    email: "rp5865442@gmail.com",
    profile: "https://res.cloudinary.com/dcycd6p6i/image/upload/v1702218768/hcwc8pzapqn2egwgu1ag.jpg",
    createdAt: String(new Date().toISOString()),
    role: "admin",
  };

  return (
    <nav className="bg-[#f2f9f2] w-full h-16 border-b border-gray-200 dark:bg-gray-900">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-5">
        {/* Avatar logo and name */}
        <a href="#about-me" className="h-auto w-auto flex flex-row items-center">
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-spin-slow"
          />
        </a>

        {/* Notification icon */}
        <div className="flex flex-row gap-5">
          {/* Notification stuff */}
          <Select>
            <SelectTrigger className="w-[60px] bg-[#f2f9f2] border-none">
              <Bell size={23} className="cursor-pointer mt-[5px]" />
              <span className="absolute top-5 right-[100px]">
                {notifications.length === 0 ? "" : (
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                )}
              </span>
            </SelectTrigger>
            <SelectContent className="hover:cursor-pointer">
              {notifications.length === 0 ? (
                <div>No new notifications found</div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index} onClick={() => handleOnClick(notification)}>
                    {notification}
                  </div>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Profile and dropdown menu for edit and logout */}
          <UserNav admin={admin} />
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
