import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HomeTable from './HomeTable';
import { cn } from '@/lib/utils';

const Exam = () => {
  const[exam,setExam]=useState([]);
  const[referesh,setReferesh]=useState(false)
  const[loding,setLoding]=useState(false)

  useEffect(() => {
    try {
      setLoding(true)
      axios.get(`${server}/exam/all`, {
        withCredentials: true,
        headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
      }).then((response)=>
      {
        setLoding(false)
        setExam(response.data.data.reverse());
        setReferesh(prev=>!prev);
      })
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  }, [])
  return (
    <div>
      <HomeTable
      columns={columns}
      data={exam && exam}
      isLoding={loding}
    />
    </div>
  )
}

export default Exam
const columns = [
  {
      accessorKey: 'name',
        header: 'Exam Name',
    },
  {
    accessorKey: "testAgency",
    header: "TestAgency Name",
  },
  {
    accessorKey: "batch.name",
    header: "Batch Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500":
              row.getValue("status") === "not-started",
            "bg-green-100 text-green-400":
              row.getValue("status") === "completed",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
];

