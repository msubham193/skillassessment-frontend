import React from "react";
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
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { StudentDataAtom } from "../Atoms/studentAtom";
import ProfilePictureUploader from "./ProfilePictureUploader";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components(shadcn)/ui/avatar";
import { server } from "@/main";
const DataTable = () => {
  const batchData = useRecoilValue(batchDataAtoms);
  const [studentData, setStudentData] = useRecoilState(StudentDataAtom);
  const navigate = useNavigate();

  const fetchStudentData = async (batchid) => {
    try {
      const response = await fetch(
        `${server}/student/${batchid}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("student", data.data);
        setStudentData(data.data);
        navigate(`/trainingPartner/dashboard/student/${batchid}`);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-xl">Image</TableHead>
          <TableHead className="font-semibold text-xl">Name</TableHead>
          <TableHead className="font-semibold text-xl">MPR Id</TableHead>
          <TableHead className="font-semibold text-xl">SNA Id</TableHead>
          <TableHead className="font-semibold text-xl">View Profile</TableHead>
          <TableHead className="font-semibold text-xl">Upload Image</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg">
        {batchData && batchData.students && batchData.students.length > 0 ? (
          batchData.students.map((student) => (
            <TableRow key={student.id} className="">
              <TableCell>
                <Avatar className="w-12 h-12 mb-4">
                {console.log("studen:", student.profilepic)}
                <AvatarImage src={student.profilepic } alt="Student" />
                                        {console.log("pic",student.profilepic)}
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-white">{student.name}</TableCell>
              <TableCell className="text-white">{student.MPR_Id}</TableCell>
              <TableCell className="text-white">{student.SNA_Id}</TableCell>
              <TableCell className="text-white">
                <Button
                  className="text-blue-500 hover:underline"
                  onClick={() => fetchStudentData(student._id)}
                >
                  View Details
                </Button>
              </TableCell>
              <TableCell>
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
  );
};

export default DataTable;