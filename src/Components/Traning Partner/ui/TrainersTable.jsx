import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components(shadcn)/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components(shadcn)/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { server } from "@/main";

const TrainersTable = ({ batchId }) => {
  const [trainers,setTrainers]=useState([])
const navigate=useNavigate()

const fetchTeacherData=(teacherId)=>{
   navigate(`/trainer/${teacherId}`)
}


  const fetchBatchData=async ()=>{
    try {
      const response=await axios.get(`${server}/batch/${batchId}`)
      setTrainers(response.data.data.trainers)
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
 fetchBatchData()
},[])

    return (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-xl text-center w-24">Image</TableHead>
                <TableHead className="font-semibold text-xl">Name</TableHead>
                <TableHead className="font-semibold text-xl">Email</TableHead>
                <TableHead className="font-semibold text-xl">Phone</TableHead>
                <TableHead className="font-semibold text-xl text-center">View Profile</TableHead>
              </TableRow>
            </TableHeader>
    
            <TableBody>
              {trainers && trainers.length > 0 ? (
                trainers.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell className="text-center">
                      <Avatar className="w-12 h-12 mx-auto">
                        <AvatarImage src={teacher.profilePic} alt="Teacher" />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-black">{teacher.name}</TableCell>
                    <TableCell className="text-black">{teacher.email}</TableCell>
                    <TableCell className="text-black">{teacher.phoneNumber}</TableCell>
                    <TableCell className="text-center">
                       {console.log("id",teacher._id)}
                      <Button
                        className="text-blue-500 hover:underline"
                        onClick={() => fetchTeacherData(teacher._id)}
                        
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-white">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    };
export default TrainersTable;