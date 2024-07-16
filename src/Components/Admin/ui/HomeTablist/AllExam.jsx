import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../notiification/DataTable';

const AllExam = () => {
    const [allExam, setAllExam] = useState([]);
    const [loding, setLoding] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    useEffect(() => {
      try {
        setLoding(true);
        axios
          .get(`${server}/exam/all`, { 
            withCredentials: true,
          })
          .then((response) => {
            setLoding(false);
            setAllExam(response.data.data.reverse());
            setIsDataFetched(true);
            console.log(response.data.data);
          });
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, [isDataFetched]);
    console.log("running")
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Exam Details</h2>
          <p className="text-muted-foreground">Here's a list of Exams for you!</p>
        </div>
      </div>
      <DataTable
      filter1={"assesmentAgency"}
      columns={examcolumns}
      data={allExam && allExam}
      isLoding={loding}
    />
     
    </div>
  )
}

export default AllExam

export const examcolumns = [
  
    {
      accessorKey: "assesmentAgency",
      header: "Agency Name",
    },
    {
      accessorKey: "batchABN",
      header: "Batch ABN",
    },
    {
      accessorKey: "course",
      header: "Course",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
        accessorKey: "TrainingOrganization",
        header: "Traning Partner Name",
      },
  ];
  
