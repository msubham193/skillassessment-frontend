import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components(shadcn)/ui/pagination";
import { Tabs } from "@/components(shadcn)/ui/tabs";
import { Skeleton } from "@/components(shadcn)/ui/skeleton";
import DataTabs from "@/Components/Admin/ui/DataTabs";
import {
  CandlestickChart,
  GraduationCap,
  Presentation,
  SquareActivity,
  Eye,
} from "lucide-react";
import { batchDataAtoms } from "../Atoms/batchatom";
import { centerAtom } from "../Atoms/centerAtom";
import { batchIdAtoms } from "../Atoms/BatchId";
import TopBar from "../TopBar";
import { server } from "@/main";
import { AnimatedPagination } from "./Pagination/Animatedpagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components(shadcn)/ui/alert-dialog";
const Content = () => {
  const navigate = useNavigate();
  const [allBatch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(null);
  const [totalBatches, setTotalBatches] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [batchID, setBATCHID] = useRecoilState(batchIdAtoms);
  const setBatchData = useSetRecoilState(batchDataAtoms);
  const trainingPartnerId = localStorage.getItem("trainingPartnerId");
  const totalCenter = useRecoilValue(centerAtom);

  useEffect(() => {
    setTotalCenters(totalCenter.length);
  }, [totalCenter]);

  const handelView = async (batchId) => {
    setBATCHID(batchId);
    try {
      const response = await fetch(`${server}/batch/${batchId}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        navigate(`/trainingPartner/viewBatch/${batchId}`);
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
          fetch(`${server}/batch/tp/${trainingPartnerId}`, {
            method: "GET",
          }),
          fetch(`${server}/trainer/tp/${trainingPartnerId}`, {
            method: "GET",
          }),
        ]);

        if (batchesResponse.ok && trainersResponse.ok) {
          const batchesData = await batchesResponse.json();
          const trainersData = await trainersResponse.json();

          setTotalBatches(batchesData.data.length);
          setTotalTrainers(trainersData.data.length);

          const totalStudents = batchesData.data.reduce(
            (sum, batch) => sum + batch.students.length,
            0
          );
          setTotalStudents(totalStudents);

          const sortedBatches = batchesData.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          console.log(sortedBatches);
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
    const totalPages = Math.ceil(allBatch.length / itemsPerPage);
    if (pageNumber < 1) {
      setCurrentPage(totalPages);
    } else if (pageNumber > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handelBatchReady = async (batchId) => {
    setSubmitLoading(batchId);
    try {
      const response = await fetch(`${server}/batch/active/${batchId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("batch submitted", data);
        toast.success("Batch Submitted Successfully");
        setAllBatch((prevBatches) =>
          prevBatches.map((batch) =>
            batch._id === batchId
              ? { ...batch, batchActivePermission: true, status: "onGoing" }
              : batch
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to submit batch:", errorData);
        toast.error(
          "Failed to submit batch: " + (errorData.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting batch: " + error.message);
    } finally {
      setSubmitLoading(null);
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
  const getApprovedClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Corporate":
        return "text-yellow-600 ";
      case "Not-Approved":
        return "text-red-600 ";
      default:
        return "";
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allBatch.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allBatch.length / itemsPerPage);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <TopBar />
      <div className="flex-grow py-3 px-5 bg-transparent gap-2">
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
          <div className="mt-4 flex flex-col h-full">
            <Tabs defaultValue="overview" className="space-y-4">
              <DataTabs
                cardData={[
                  {
                    titel: "Total Batches",
                    total: totalBatches,
                    fromLast: "+0 from last Month",
                    logo: GraduationCap,
                  },
                  {
                    titel: "Total Centers",
                    total: totalCenters,
                    fromLast: "+0 from last Month",
                    logo: CandlestickChart,
                  },
                  {
                    titel: "Total Students",
                    total: totalStudents,
                    fromLast: "+0 from last Month",
                    logo: SquareActivity,
                  },
                  {
                    titel: "Total Trainers",
                    total: totalTrainers,
                    fromLast: "+0 from last Year",
                    logo: Presentation,
                  },
                ]}
              />
            </Tabs>
            {allBatch.length > 0 ? (
              <div className="flex flex-col flex-grow">
                <Table className="mt-8 p-0">
                  <TableHeader className="bg-emerald-600" >
                    <TableRow>
                      <TableHead className="font-bold text-black">Index</TableHead>
                      <TableHead className="font-bold text-black">Course Name</TableHead>
                      <TableHead className="font-bold text-black">ABN Number</TableHead>
                      <TableHead className="font-bold text-black">
                       Batch Submission Status
                      </TableHead>
                      <TableHead className="font-bold text-black">SNA Approval</TableHead>
                      <TableHead className="font-bold text-black">Students</TableHead>
                      <TableHead className="font-bold text-black">Status</TableHead>
                      <TableHead className="font-bold text-black">Details</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
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
                        {/* this is for batch submission status */}
                        <TableCell
                          className={`font-bold ${
                            batch?.batchActivePermission === true
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {batch?.batchActivePermission === true
                            ? "Submitted"
                            : "Not Submit"}
                        </TableCell>


                        {/* this is for sna approval ###################3*/}


                        <TableCell
                          className={`text-center font-bold text-md  ${getApprovedClass(
                            batch.approvedByGovernmentBody
                              ? "Approved"
                              : batch.schemeType === "Corporate"
                              ? "Corporate"
                              : "Not-Approved"
                          )}`}
                        >
                          {batch?.batchActivePermission? batch.schemeType === "State Government" ||
                          batch.schemeType === "Central Government"
                            ? batch.approvedByGovernmentBody
                              ? "Approved"
                              : "Not-Approved"
                            : "Corporate":"Batch not submitted yet"}
                        </TableCell>
                        <TableCell className="text-center ml-[20px]">
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
                              className="text-xs text-white px-2 py-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/Teachers?batchId=${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Trainer
                            </Button>
                            <Button
                              className="text-xs text-white px-2 py-1 bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                navigate(
                                  `/trainingPartner/dashboard/CreateBatch/addstudent/${batch._id}`
                                )
                              }
                              disabled={batch.batchActivePermission === true}
                            >
                              Add Student
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  className="text-xs text-white px-2 py-1 bg-purple-600 hover:bg-purple-700"
                                  disabled={
                                    batch.batchActivePermission === true ||
                                    submitLoading === batch._id
                                  }
                                >
                                  {submitLoading === batch._id
                                    ? "Submitting..."
                                    : "Submit Batch"}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will submit the batch and this
                                    can't be undo . Are you sure you want to
                                    proceed?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handelBatchReady(batch._id)}
                                  >
                                    Confirm Submit
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-auto py-4">
                  <AnimatedPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={paginate}
                  />
                </div>
              </div>
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
