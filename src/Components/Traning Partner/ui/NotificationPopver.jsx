
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components(shadcn)/ui/popover";
import { Button } from "@/components(shadcn)/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components(shadcn)/ui/avatar";
import { Bell, X } from "lucide-react"; // Import Bell and X icons
import axios from "axios";
import { server } from "@/main";

export default function NotificationPopver() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(localStorage.getItem("notification") || "No new notification !!");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [data1, setData1] = useState([]);
  const [filteredBatchData, setFilteredBatchData] = useState([]);

  //function for creat notification
  const fetchData1 = async () => {
    try {
      const response = await axios.get(`${server}/batch/all/corporate`, { withCredentials: true });
      const newData = response.data.data;
      console.log(newData)
      if (newData) {
        const filteredData = newData.filter(batch => batch.amountToPaid !== 0);
        setFilteredBatchData(filteredData);
        }

      if (initialLoad) {
        setData1(filteredBatchData);
      } else if (filteredBatchData.length > data1.length) {
        setNotification("A new payment for batch found");
        setData1(newData);
        localStorage.setItem("notification", "A new payment for batch found");
      }
    } catch (error) {
      console.error('Error fetching data1:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchData1()]);
      setLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    };
    fetchData();

    const interval1 = setInterval(() => {
      fetchData1();
    }, 15 * 10000);

    return () => {
      clearInterval(interval1);
    };
  }, [data1]);

  const handelOnClick = () => {
    if (notification.includes("payment for batch found")) {
      // navigate("");
    }
    setNotification("No new notification !!");
    localStorage.setItem("notification", "No new notification !!");
  };

  return (
    <div className=" top-4 right-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-6 w-6" />
            {notification === "No new notification !!" ? "" : (
                  <div className=" bg-red-600 absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"></div>
                )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Notifications</h4>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            <NotificationItem onClick={handelOnClick}
              avatarSrc="/placeholder-user.jpg"
              avatarFallbackText="JD"
              content={notification}
              timestamp="2 hours ago"
              message={notification}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function NotificationItem({ avatarSrc, avatarFallbackText, content, timestamp, message }) {
  return (
    <div className="flex items-start space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{avatarFallbackText}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{content}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="text-xs text-muted-foreground">{timestamp}</div>
      </div>
    </div>
  );
}
