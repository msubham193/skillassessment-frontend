import React from 'react'
import { DataTable } from '../Admin/ui/notiification/DataTable'

const TrainerTable = ({data}) => {
    console.log(data)
  return (
  
    <div>
    <DataTable filter1={"name"} columns={trainerColumn} data={data} />
  </div>
    
  )
}

export default TrainerTable


const trainerColumn = [
    {
      accessorKey: "name",
      header: "Name",
    },
  
    {
      accessorKey: "email",
      header: "email ",
    },
    {
      accessorKey: "PRN_NO",
      header: "prn No",
    },
    {
      accessorKey: "AADHAR_NO",
      header: "Aadhar no",
    },
    {
      accessorKey: "state",
      header: "state",
    },
  
    {
      accessorKey: "phoneNumber",
      header: "Mob No ",
    },
  ];
  
