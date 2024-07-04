import { server } from '@/main';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../notiification/DataTable';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Batch = () => {
    const [batch,setBatch]=useState([]);
    const[referesh,setReferesh]=useState(false)
    const[loding,setLoding]=useState(false)

    useEffect(() => {
      try {
        setLoding(true)
        axios.get(`${server}/batch`, {
          withCredentials: true,
        }).then((response)=>
        {
          setLoding(false)
          setBatch(response.data.data.reverse());
          setReferesh(prev=>!prev);
        })
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, [])
    const location = useLocation();
    const path=location.pathname;
    console.log(path);
  return (
    <div>
    <DataTable
    path={path}
    columns={batchColumns}
    data={batch}
    isLoding={loding}
  />
    </div>
  )
}

export default Batch

export const batchColumns = [
    {
      accessorKey: "_id",
      header: "Batch_ID",
    },
    {
      accessorKey: "name",
      header: "Batch Name",
    },
    {
        accessorKey: "createdBy",
      header: "CreatedBy",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div
            className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
              "bg-orange-100 text-orange-500":
                row.getValue("status") === "onGoing",
              "bg-green-100 text-green-400":
                row.getValue("status") === "Completed",
            })}
          >
            {row.getValue("status")}
          </div>
        );
      },
    },
  ];
  

