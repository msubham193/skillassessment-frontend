import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import HomeTable from '../ui/HomeTablist/HomeTable';

const ResultContent = ({batchId}) => {
  const[students,setSutdents]=useState([]);
  const[loding,setLoding]=useState(false);
    console.log(`batch id is ${batchId}`)

    //function for fetch the result data...
    useEffect(() => {
      try {
        setLoding(true);
        axios
          .get(`${server}/mark/batch/${batchId}`, {
            withCredentials: true,
          })
          .then((response) => {
            setLoding(false);
            setSutdents(response.data.data.reverse());
            console.log(response.data.data)
          });
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, []);
  
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a Mark list of All students present in this Batch!
        </p>
      </div>
    </div>
    {/* Data table for the student result */}
    <HomeTable
    filter1={"studentName"}
    path={`/admin/dasbord/studentMark`}
    columns={columns}
    data={students && students}
    isLoding={loding}
    />
  </div>
  )
}

export default ResultContent

const columns = [
  {
    accessorKey: "studentName",
    header: "Name",
  },
  {
    accessorKey: "studentRedgNo",
    header: "Redg No",
  },
  {
    accessorKey: "Theory",
    header: "Theory mark",
  },
  {
    accessorKey: "practical",
    header: "Practical mark",
  },
  {
    accessorKey: "viva",
    header: "Viva mark",
  },
  {
    accessorKey: "total",
    header: "Total mark",
  },
  {
    accessorKey: "Result",
    header: "Result",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-100 text-red-500":
              row.getValue("Result") === "Fail",
            "bg-green-100 text-green-400":
              row.getValue("Result") === "Pass",
          })}
        >
          {row.getValue("Result")}
        </div>
      );
    },
  },
];
