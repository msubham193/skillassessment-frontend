import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '@/main';
import { cn } from '@/lib/utils';
import { DataTable } from '../notiification/DataTable';

const AccessmentAgency = () => { 
  const [assessmentAgency, setAssessmentAgency] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
 
  useEffect(() => {
    if (!isDataFetched) {
      try {
        setLoading(true); 
        axios.get(`${server}/aa/status/approved`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        }).then((response) => {
          setLoading(false);
          setAssessmentAgency(response.data.data.reverse());
          setIsDataFetched(true); // Set isDataFetched to true after data is fetched
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [isDataFetched]); // Only fetch data if isDataFetched is false

  return (
    <div>
      <DataTable
        filter1={"agencyName"}
        columns={columns}
        path={"/admin/dasbord/AssessmentAgency"}
        data={assessmentAgency}
        isLoading={loading}
        pageUrl={"accessmentagency"}
      />
    </div>
  )
}

export default AccessmentAgency;

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
