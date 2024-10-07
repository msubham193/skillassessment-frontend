import React, { useEffect, useState } from "react";
import { DataTable } from "../ui/notiification/DataTable";
import axios from "axios";
import { server } from "@/main";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom"; 

const AagencyNotification = () => {
  const [assessmentAgency, setAssessmentAgency] = useState([]);
  const [loding, setLoding] = useState(false);
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/aa/status/pending`, { 
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setAssessmentAgency(response.data.data.reverse());
        });
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  }, []);
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      <DataTable
        filter1={"agencyName"}
        path={`${path}/aa`}
        columns={columns}
        data={assessmentAgency}
        isLoding={loding}
        pageUrl={"accessmentagency"}
      />
    </div>
  );
};
export default AagencyNotification;

const columns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "agencyName",
    header: "Agency Name ",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "state_Under_geographicalRegion",
    header: "State",
  },
  {
    accessorKey: "sectors",
    header: "Sector's",
  },
  {
    accessorKey: "total_no_of_certified_Assessor",
    header: "No fo assessor",
  },

  {
    accessorKey: "applicationStatus",
    header: "applicationStatus",
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
