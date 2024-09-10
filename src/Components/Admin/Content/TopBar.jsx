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
  const [notification, setNotification] = useState(localStorage.getItem("notification") || "No new notification !!");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); 
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const fetchData1 = async () => { 
    try {
      const response = await axios.get(`${server}/aa/status/pending`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) { 
        setData1(newData);
      } else if (newData.length > data1.length) {
        setNotification("A new Assessment Agency found");
        setData1(newData);
        localStorage.setItem("notification", "A new Assessment Agency found");
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
        setData2(newData);
      } else if (newData.length > data2.length) {
        setNotification("A new Training Partner found");
        setData2(newData);
        localStorage.setItem("notification", "A new Training Partner found");
      }
    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get(`${server}/batch/all/payment/gov`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) {
        setData3(newData);
      } else if (newData.length > data3.length) {
        setNotification("A new Government Batch request found");
        setData3(newData);
        localStorage.setItem("notification", "A new Government Batch request found");
      }
    } catch (error) {
      console.error('Error fetching data3:', error);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get(`${server}/batch/all/corporate`, { withCredentials: true });
      const newData = response.data.data;

      if (initialLoad) {
        setData4(newData);
      } else if (newData.length > data4.length) {
        setNotification("A new Corporate Batch request found");
        setData4(newData);
        localStorage.setItem("notification", "A new Corporate Batch request found");
      }
    } catch (error) {
      console.error('Error fetching data4:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchData1(), fetchData2(), fetchData3(), fetchData4()]);
      setLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    };

    fetchData();

    const interval1 = setInterval(() => {
      fetchData1();
    }, 30 * 1000); // 30 seconds for assessment agency
  
    const interval2 = setInterval(() => {
      fetchData2();
    }, 30 * 1000); // 30 seconds for training partner
  
    const interval3 = setInterval(() => {
      fetchData3();
    }, 30 * 1000); // 30 seconds for fetchData3
  
    const interval4 = setInterval(() => {
      fetchData4();
    }, 30 * 1000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
    };
  }, [data1, data2, data3, data4]);

  const handleOnClick = (notification) => {
    if (notification.includes("Assessment Agency")) {
      navigate("/admin/dasbord/Notification?tab=overview");
    } else if (notification.includes("Training Partner")) {
      navigate("/admin/dasbord/Notification?tab=analytics");
    } else if (notification.includes("Government Batch request")) {
      navigate("/admin/dasbord/Notification?tab=updateBatchgov");
    } else if (notification.includes("Corporate Batch request")) {
      navigate("/admin/dasbord/Notification?tab=updateBatchcorporet");
    }
    console.log("clicked");
    
    setNotification("No new notification !!");
    localStorage.setItem("notification", "No new notification !!");
  };

  // //make dynamic admin.................

  const admin = {
    name:  localStorage.getItem("adminName"),
    email:  localStorage.getItem("adminEmail"),
    profile: "https://res.cloudinary.com/dcycd6p6i/image/upload/v1702218768/hcwc8pzapqn2egwgu1ag.jpg",
    createdAt: String(new Date().toISOString()),
    role: "admin",
  };



  return (
    <nav className="bg-[#e6e6fa] w-full h-16 border-b border-[#8B0000] dark:bg-gray-900">
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
            <SelectTrigger className="w-[60px] bg-[#e6e6fa] border-none">
              <Bell size={23} className="cursor-pointer mt-[5px]" />
              <span className="absolute top-5 right-[100px]">
                {notification === "No new notification !!" ? "" : (
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                )}
              </span>
            </SelectTrigger>
            <SelectContent className="hover:cursor-pointer">
              <div onClick={() => handleOnClick(notification)}>
                {notification}
              </div>
            </SelectContent>
          </Select>
                <UserNav admin={admin} />
            
          {/* Profile and dropdown menu for edit and logout */}
    
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
