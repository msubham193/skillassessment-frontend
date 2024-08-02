import { Button } from "@/components(shadcn)/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components(shadcn)/ui/pagination";
import { Tabs,TabsList,
  TabsTrigger,
  TabsContent, } from "@/components(shadcn)/ui/tabs";
import { Skeleton } from "@/components(shadcn)/ui/skeleton";
import DataTabs from "@/Components/Admin/ui/DataTabs";

import {
  CandlestickChart,
  GraduationCap,
  Presentation,
  SquareActivity,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { batchDataAtoms } from "../Atoms/batchatom";
import TopBar from "../TopBar";
import { toast } from "react-toastify";

const Content = () => {
  const navigate = useNavigate();
  const [allBatch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBatches, setTotalBatches] = useState(0);
  const [totalCenters, setTotalCenters] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [totalTrainers, setTotalTrainers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const setBatchData = useSetRecoilState(batchDataAtoms);
  const trainingPartnerId = localStorage.getItem("trainingPartnerId");

  const handelView = async (batchId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/${batchId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        console.log(data.data);
        navigate(`/trainingPartner/dashboard/${batchId}`);
      } else {
        console.error("Failed to fetch batches");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [batchesResponse, trainersResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/v1/batch/tp/${trainingPartnerId}`, {
            method: "GET",
          }),
          fetch(`http://localhost:8000/api/v1/trainer/tp/${trainingPartnerId}`, {
            method: "GET",
          }),
        ]);

        if (batchesResponse.ok && trainersResponse.ok) {
          const batchesData = await batchesResponse.json();
          const trainersData = await trainersResponse.json();

          setTotalBatches(batchesData.data.length);
          setTotalTrainers(trainersData.data.length);

          // Sort batches by creation date
          const sortedBatches = batchesData.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAllBatch(sortedBatches);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trainingPartnerId) {
      fetchData();
    }
  }, [trainingPartnerId]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(totalPages);
    } else if (pageNumber > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handelBatchReady = async (batchId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/batch/active/${batchId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("batch submitted", data);
        toast.success("Batch Submitted Successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to submit batch:", errorData);
        toast.error(
          "Failed to submit batch: " + (errorData.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting batch: " + error.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-100";
      case "onGoing":
        return "text-yellow-700 bg-yellow-100";
      case "Not Started":
        return "text-red-700 bg-red-100";
      default:
        return "";
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allBatch.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allBatch.length / itemsPerPage);

  console.log(allBatch);

  return (
    <div className="w-full">
      <TopBar />
      <div className="py-3 px-5 bg-transparent gap-2">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="mt-4">
            <Tabs defaultValue="overview" className="space-y-4">
              <DataTabs
                cardData={[
                  {
                    titel: "Total Batches",
                    total: +totalBatches,
                    fromLast: "+0 from last Month",
                    logo: GraduationCap,
                  },
                  {
                    titel: "Total Centers",
                    total: +totalCenters,
                    fromLast: "+0 from last Month",
                    logo: CandlestickChart,
                  },
                  {
                    titel: "Total Students",
                    total: +totalStudents,
                    fromLast: "+0 from last Month",
                    logo: SquareActivity,
                  },
                  {
                    titel: "Total Trainers",
                    total: +totalTrainers,
                    fromLast: "+0 from last Year",
                    logo: Presentation,
                  },
                ]}
              />
            </Tabs>
            {allBatch.length > 0 ? (
              <>
                <Table className="mt-8">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Index</TableHead>
                      <TableHead className="font-bold">Course Name</TableHead>
                      <TableHead className="font-bold">ABN Number</TableHead>
                      <TableHead className="font-bold">
                        Number of Students
                      </TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((batch, index) => (
                      <TableRow key={batch._id}>
                        <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {batch.courseName}
                        </TableCell>
                        <TableCell>{batch.ABN_Number}</TableCell>
                        <TableCell className="text-center">
                          {batch.students.length}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                              batch.status
                            )}`}
                          >
                            {batch.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-blue-600">
                            <div
                              className="flex flex-col items-center cursor-pointer hover:text-blue-800"
                              onClick={() => handelView(batch._id)}
                            >
                              <Eye className="mb-1" />
                              <span>View</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-2 mr-2">
                            <Button
                              className="text-xs text-white px-4 py-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/CreateBatch/addteacher/${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Trainer
                            </Button>
                            <Button
                              className="text-xs text-white px-4 py-1 bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/CreateBatch/addstudent/${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Student
                            </Button>
                            <Button
                              className="text-xs text-white px-4 py-1 bg-purple-600 hover:bg-purple-700"
                              onClick={() => handelBatchReady(batch._id)}
                              disabled={batch.batchActivePermission === true}
                            >
                              Submit Batch
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="fixed bottom-0 w-full bg-white py-2">
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => paginate(currentPage - 1)}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => paginate(index + 1)}
                            isActive={currentPage === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => paginate(currentPage + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="text-center mt-8 text-gray-500">
                No batches found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
