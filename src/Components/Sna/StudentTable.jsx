import React from "react";
import { DataTable } from "../Admin/ui/notiification/DataTable";

const StudentTable = ({ data }) => {
  console.log(data);
  return (
    <div>
      <DataTable filter1={"name"} columns={studentColumn} data={data} />
    </div>
  );
};

export default StudentTable;

const studentColumn = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "email ",
  },
  {
    accessorKey: "redg_No",
    header: "Redg No",
  },
  {
    accessorKey: "course",
    header: "Course",
  },

  {
    accessorKey: "state",
    header: "state",
  },

  {
    accessorKey: "mobile",
    header: "Mob No ",
  },
];
