import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
            setSutdents(response);
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
  </div>
  )
}

export default ResultContent
