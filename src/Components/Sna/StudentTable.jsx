import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components(shadcn)/ui/avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "@/main";
import { DataTable } from "../Admin/ui/notiification/DataTable";
 
const StudentTable = ({ data }) => {
  const { batchId } = useParams();

  const [studentData, setStudentData] = useState([]);  
  const [loading, setLoading] = useState(false);         

  // Function for fetching students from batch
  useEffect(() => {
    fetchBatchDetails(); 
  }, [batchId]);

  const fetchBatchDetails = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${server}/batch/${batchId}`);
      console.log(response.data.data.students);
      const data = response.data.data;
      setStudentData(data?.students);  
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
   <>
   <div className="overflow-x-auto p-2 rounded-md shadow-sm">
   <h1 className="text-2xl font-bold">Student's</h1>
   <DataTable
   path={"/sna/batch/student"}
   filter1={"name"}
   columns={batchColumns}
   data={studentData}
   isLoading={loading}
   />
   </div>
   
   </>
  );
};

export default StudentTable;

const batchColumns = [
  {
    accessorKey: "profilepic", // New profile picture column
    header: "Profile Picture",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.profilepic} alt={`${row.original.name}'s profile`} />
        <AvatarFallback>{row.original.name[0]}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "name",
  },

  {
    accessorKey: "email",
    header: "email ",
  },
    {
    accessorKey: "redg_No",
    header: "Redg no",
  },
  {
    accessorKey: "state",
    header: "state",
  },
];
