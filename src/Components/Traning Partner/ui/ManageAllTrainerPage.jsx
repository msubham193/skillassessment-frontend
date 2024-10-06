import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components(shadcn)/ui/card";
import { Input } from "@/components(shadcn)/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components(shadcn)/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components(shadcn)/ui/avatar";
import { server } from "@/main";

const ManageAllTrainerPage = () => {
  const [teachers, setTeachers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const tpid = localStorage.getItem("trainingPartnerId");

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/trainer/tp/${tpid}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setTeachers(data.data);
        } else {
          console.error("Failed to fetch teachers");
          setTeachers([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setTeachers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [tpid]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredTeachers = teachers
    ? teachers.filter((teacher) =>
        ["name", "email", "phoneNumber", "sector"].some((key) =>
          teacher[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const sortedTeachers = filteredTeachers.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Our Trainers</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Meet our experienced team of experts who are dedicated to
                helping you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-auto">
                <Input
                  type="search"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mb-4"
                />
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : teachers && sortedTeachers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Name{" "}
                          {sortColumn === "name" && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                            </span>
                          )}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("email")}
                        >
                          Email{" "}
                          {sortColumn === "email" && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                            </span>
                          )}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("phoneNumber")}
                        >
                          Phone{" "}
                          {sortColumn === "phoneNumber" && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                            </span>
                          )}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("sector")}
                        >
                          Sector{" "}
                          {sortColumn === "sector" && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                            </span>
                          )}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedTeachers.map((teacher,index) => (
                        <TableRow
                          key={teacher._id}
                          className="transition-transform duration-300"
                        >
                          <TableCell>{index+1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                {teacher.profilePic ? (
                                  <AvatarImage src={teacher.profilePic} />
                                ) : (
                                  <AvatarFallback>
                                    {teacher.name.charAt(0)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div>{teacher.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{teacher.email}</TableCell>
                          <TableCell>{teacher.phoneNumber}</TableCell>
                          <TableCell>{teacher.sector}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4">No teachers found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ManageAllTrainerPage;
