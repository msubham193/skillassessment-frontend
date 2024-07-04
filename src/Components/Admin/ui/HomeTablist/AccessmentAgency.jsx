import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '@/main';
import { cn } from '@/lib/utils';
import HomeTable from './HomeTable';

const AccessmentAgency = () => {
    const[assessmentAgency,setAssessmentAgency]=useState([]);
    const[loding,setLoding]=useState(false)
    useEffect(() => {
      try {
        setLoding(true);
        axios.get(`${server}/aa/status/approved`, {
          withCredentials: true,
        }).then((response)=>
        {
          setLoding(false);
          setAssessmentAgency(response.data.data.reverse());
        })
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, [])
  return (
    <div>
    <HomeTable columns={columns} data={assessmentAgency} isLoding={loding}/>
    </div>
  )
}

export default AccessmentAgency

const columns = [
  {
    accessorKey: '_id',
      header: 'Organization _ID',
  },
    {
      accessorKey: 'agencyName',
      header: 'Organization Name',
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
   
    {
      accessorKey: 'applicationStatus',
      header: 'applicationStatus',
      cell:({row})=>{
        return(
          <div className={cn("font-medium w-fit px-4 py-2 rounded-lg",{
            "bg-red-100 text-red-500":row.getValue("applicationStatus")==="Rejected",
            "bg-orange-100 text-orange-500":row.getValue("applicationStatus")==="Pending",
            "bg-green-100 text-green-400":row.getValue("applicationStatus")==="Approved",
  
          })}>{row.getValue("applicationStatus")}</div>
        )
      }
    },
  ];

