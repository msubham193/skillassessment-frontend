import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../notiification/DataTable';
import { cn } from '@/lib/utils';
import SideNav from '../../Content/SideNav';
import TopBar from '../../Content/TopBar';
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
            headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
          })
          .then((response) => {
            setLoding(false);
            setAllExam(response.data.data.reverse()); 
            setIsDataFetched(true);
            // console.log(response.data.data);
          });
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, []);
    // console.log("running")
  return (

    <div className="min-h-screen bg-white text-black flex flex-col">
    {/*top Bar */}
    <TopBar />
    {/* side bar */} 
    <div className="min-h-screen bg-white text-black flex">
      <SideNav />

      {/* main page */}
      <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Exam Details</h2>
          <p className="text-muted-foreground">Here's a list of Exams for you!</p>
        </div>
      </div>
      {/* here i fetch all the exams present in our potal.... 
        when i click on row it will naviget to details of that exam ......*/}
      <DataTable
      filter1={"batchABN"}
      columns={examcolumns}
      path={"/admin/dasbord/allExam"}
      data={allExam && allExam}
      isLoding={loding}
      pageUrl={"allexam"} 
    />
    </div>
     
    </div>
  </div>


   
  )
}

export default AllExam

export const examcolumns = [

  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
    {
      accessorKey: "assesmentAgency",
      header: "Agency Name",
    },
    {
      accessorKey: "batchABN",
      header: "ABN No",
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
        header: "Training Partner Name", 
      },
      {
        accessorKey: "markUploadAndExamCompleteStatus",
        header: "Status",
        cell: ({ row }) => {
          const paymentStatus = row.getValue("markUploadAndExamCompleteStatus");
          return (
            <div
              className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                "bg-orange-100 text-orange-500": paymentStatus === false,
                "bg-green-100 text-green-400": paymentStatus === true,
              })}
            >
              {paymentStatus ? "Completed" : "On Going"}
            </div>
          );
        },
      },
  ];
  
