import { DataTable } from "@/Components/Admin/ui/notiification/DataTable";
import { cn } from "@/lib/utils";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";


const TpNotificationBoxContent = () => {
  const [traningPartnerData,setTraningPartnerData]=useState([]);
  const[referesh,setReferesh]=useState(false)
  const[loding,setLoding]=useState(false)

  // console.log(data);
  useEffect(() => {
    try {
      setLoding(true)
      axios.get(`${server}/tp`, {
        withCredentials: true,
      }).then((response)=>
      {
        setLoding(false)
        // const result=response.data.data;
        // console.log(result.reverse())
        setTraningPartnerData(response.data.data.reverse());
        setReferesh(prev=>!prev);
      })
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  }, [])


  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Traning Partner's for you!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* add the functionality like search and filter */}
            {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
          </div>
        </div>
        {/* Data table for the notification */}
        <DataTable
          columns={columns}
          data={traningPartnerData && traningPartnerData}
          isLoding={loding}
        />
      </div>
    </>
  );
};

export default TpNotificationBoxContent;
const columns = [
  {
    accessorKey: "organizationName",
    header: "Organization Name",
  },
  {
    accessorKey: "registeredOfficeEmail",
    header: "Email",
  },
  {
    accessorKey: "applicationStatus",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-100 text-red-500":
              row.getValue("applicationStatus") === "Rejected",
            "bg-orange-100 text-orange-500":
              row.getValue("applicationStatus") === "Pending",
            "bg-green-100 text-green-400":
              row.getValue("applicationStatus") === "Approved",
          })}
        >
          {row.getValue("applicationStatus")}
        </div>
      );
    },
  },
];
