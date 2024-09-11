import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components(shadcn)/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table"; // import the Table components

const StudentTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        {/* Table Head */}
        <TableHeader className="bg-emerald-500">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Profile Picture</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Registration No</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Course</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">State</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mobile No</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {data.map((student, index) => (
            <TableRow key={index}>
              {/* Profile Picture */}
              <TableCell className="px-6 py-4 whitespace-nowrap">
                <Avatar>
                  <AvatarImage src={student.profilepic} alt={`${student.name}'s Profile Picture`} />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </TableCell>

              {/* Name */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.name}</TableCell>

              {/* Email */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.email}</TableCell>

              {/* Registration No */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.redg_No}</TableCell>

              {/* Course */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.course}</TableCell>

              {/* State */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.state}</TableCell>

              {/* Mobile No */}
              <TableCell className="px-6 py-4 whitespace-nowrap">{student.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;

