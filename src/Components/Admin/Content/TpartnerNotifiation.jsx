import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/notiification/DataTable';
import axios from 'axios';
import { server } from '@/main';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components(shadcn)/ui/select';

const TpartnerNotifiation = () => {
    const [traningPartnerData,setTraningPartnerData]=useState([]);
    const[referesh,setReferesh]=useState(false)
    const[loding,setLoding]=useState(false)
    
  //function for get all pending data of traning partner..
    useEffect(() => {
      try {
        setLoding(true)
        axios.get(`${server}/tp/status/pending`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        }).then((response)=>
        {
          setLoding(false)
          setTraningPartnerData(response.data.data.reverse());
          setReferesh(prev=>!prev);
        })
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, [])
    const location = useLocation();
    const path=location.pathname;
  return (
    <div>
  {/*
      <div className="flex items-center space-x-2">
            
    <Select onValueChange={(value) => handleFilterChange("sector", value)} >
      <SelectTrigger className="w-fit border-0">
        <SelectValue placeholder="Filter by Sector" />
      </SelectTrigger>
      <SelectContent>
      {sectors.map((sector) => (
        <SelectItem key={sector.id} value={sector.name}>
          {sector.name}
        </SelectItem>
      ))}
      </SelectContent>
    </Select>

    <Select onValueChange={(value) => handleFilterChange("course", value)} >
    <SelectTrigger className="w-fit border-0">
      <SelectValue placeholder="Filter by Course" />
    </SelectTrigger>
    <SelectContent>
    {course.map((courses) => (
      <SelectItem key={courses.id} value={courses.courseName}>
        {courses.courseName}
      </SelectItem>
    ))}
    </SelectContent>
  </Select>
    <Select onValueChange={(value) => handleFilterChange("scheme", value)} >
    <SelectTrigger className="w-fit border-0">
      <SelectValue placeholder="Filter by scheme" />
    </SelectTrigger>
    <SelectContent>
    {schemes.map((scheme) => (
      <SelectItem key={scheme.id} value={scheme.name}>
        {scheme.name}
      </SelectItem>
    ))}
    </SelectContent>
  </Select>
    <Select onValueChange={(value) => handleFilterChange("registeredOfficeState", value)}>
      <SelectTrigger className="w-fit border-0">
        <SelectValue placeholder="Filter by State" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>States</SelectLabel>
          <SelectItem value="Odisha">Odisha</SelectItem>
          <SelectItem value="Andhra Pradesh"> Andhra Pradesh</SelectItem>
          <SelectItem value="West Bengal">West Bengal</SelectItem>
          <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
          <SelectItem value="Jharkhand">Jharkhand</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>  
    */}

    <DataTable
    filter1={"organizationName"}
    path={`${path}/tp`}
    columns={columns}
    data={traningPartnerData && traningPartnerData}
    isLoding={loding}
    pageUrl={"trainingpartner"}
  />
    </div>
  )
}


export default TpartnerNotifiation

const columns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "organizationName",
    header: "Training Partner Name",
  },
  {
    accessorKey: "registeredOfficeEmail",
    header: "Email",
  },
  {
    accessorKey: "registeredOfficeState",
    header: "State",
  },
  {
    accessorKey: "scheme",
    header: "Scheme",
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