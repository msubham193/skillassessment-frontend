import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components(shadcn)/ui/table";
import { useRecoilValue, useRecoilState } from "recoil";
import { batchDataAtoms } from "../Atoms/batchatom";
import { Button } from "@/components(shadcn)/ui/button";
import { useNavigate } from "react-router-dom";
import { StudentDataAtom } from "../Atoms/studentAtom";
import ProfilePictureUploader from "./ProfilePictureUploader";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components(shadcn)/ui/avatar";
import { server } from "@/main";
import axios from "axios";

const DataTable = ({batchId}) => {
  const batchData = useRecoilValue(batchDataAtoms);
  const [studentData, setStudentData] = useRecoilState(StudentDataAtom);
  const [bd,setBd]=useState([])
  const navigate = useNavigate();


  const fetchBatchData=async ()=>{
    try {
      const response=await axios.get(`${server}/batch/${batchId}`)
      setBd(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log("Here is the batch data",bd);
  const fetchStudentData = async (studnetId) => {
    try {
      const response = await fetch(
        `${server}/student/${studnetId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("student", data.data);
        setStudentData(data.data);
        navigate(`/trainingPartner/dashboard/student/${studnetId}`);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            <TableHead className="font-semibold text-xl">MPR Id</TableHead>
            <TableHead className="font-semibold text-xl">SNA Id</TableHead>
            <TableHead className="font-semibold text-xl text-center">View Profile</TableHead>
            <TableHead className="font-semibold text-xl text-center">Upload Image</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batchData && batchData.students && batchData.students.length > 0 ? (
            batchData.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="text-center">
                  <Avatar className="w-12 h-12 mx-auto">
                    <AvatarImage src={student.profilepic} alt="Student" />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-black">{student.name}</TableCell>
                <TableCell className="text-black">{student.MPR_Id}</TableCell>
                <TableCell className="text-black">{student.SNA_Id}</TableCell>
                <TableCell className="text-center">
                  <Button
                    className="text-blue-500 hover:underline"
                    onClick={() => fetchStudentData(student._id)}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <ProfilePictureUploader studentId={student._id} />
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

export default DataTable;