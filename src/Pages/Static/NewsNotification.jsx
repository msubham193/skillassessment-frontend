import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { server } from "@/main";

const NewsNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loding, setLoding] = useState(false);


  //function for fetch notification from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoding(true);
      try {
        const response = await axios.get(`${server}/admin/notifications`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setNotifications(response.data.data.reverse());
        // console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }finally{
        setLoding(false);
      }

    };
    fetchNotifications();
  }, []);

  return (
    
    <section>
      <motion.div
        className="container min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-blue-50 to-indigo-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          News and <span className="text-blue-600">Notifications</span>
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {
          loding?<div className="flex justify-center font-bold text-2xl text-black">Loding...</div>:<table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Notification
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {notification?.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {notification?.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={notification?.pdf}
                    className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
          
        </div>
      </motion.div>
    </section>
  );
};

export default NewsNotification;
