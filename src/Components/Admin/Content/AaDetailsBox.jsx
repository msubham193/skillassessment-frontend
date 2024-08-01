import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components(shadcn)/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components(shadcn)/ui/tooltip";
import { Button } from "@/components(shadcn)/ui/button";
import { server } from "@/main";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";
import { toast } from "react-toastify";
import Loder from "../ui/Loder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components(shadcn)/ui/popover";
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";

const AaDetailsBox = ({ id }) => {
  const [referesh, setReferesh] = useState(false);
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
  const [course, setCourse] = useState([]);
  const [sector, setSector] = useState([]);
  const [percentage, setPercentage] = useState(null);


  //function for grt all the detail about the assessmment agency...
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/aa/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoding(false);
          setData(response.data.data);
          console.log(response.data.data)
          setReferesh((prev) => !prev);
          setCourse(response.data.data.courses);
          setSector(response.data.data.sectors);
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching training partner:", error);
      throw error;
    }
  }, []);

  const authState = useRecoilValue(authenticationState);

  //this is the function for approve the accessment agency
  const applicationApproved = async () => {
    setLoding(true);
    const token = authState.token;
    if (!token) {
      console.log("Admin not found");
      return;
    }
    try {
      const responce = await axios.put(
        `${server}/aa/approve/${id}`,
        { percentage },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoding(false);
      toast.success(responce.data.message, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setData(responce.data.data);
    } catch (error) {
      setLoding(false);
      toast.success("Something went wrong", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

    //this is the function for reject the accessment agency

  const applicationReject = async () => {
    setLoding(true);
    const token = authState.token;
    if (!token) {
      console.log("Admin not found");
      return;
    }
    try {
      const responce = await axios.put(
        `${server}/aa/reject/${id}`,
        {},
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoding(false);
      toast.success(responce.data.message, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setData(responce.data.data);
    } catch (error) {
      setLoding(false);
      toast.success("Something went wrong", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const defaultUserPhoto = "/user.png";

  if (loding) {
    return <Loder />;
  }
  return (
    <TooltipProvider>
      <div className="m-4 md:m-10">
        <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10">
          <div className="w-full md:w-3/4">
            <Table>
              <TableBody>
                <TableRow className="text-lg border-none h-[5px]">
                  <TableCell className="font-medium">Name*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.name ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Ward*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.ward ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Date of Birth*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.dob ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Assessor ID*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.assessorID ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Qualification*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.qualificationName ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Duration*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.duration ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Earned*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.earned ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">NSQF Level*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.nsqfLevel ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Center Place*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.centerplace ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">District*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.District ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">State*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.State ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Place of Issue*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.placeOfIssue ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Date of Issue*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.dateOfIssue ?? "Unknown"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="w-full mt-5">
              <p className="text-xl font-semibold underline">OFFICE ADDRESS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">State*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.state ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Street*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.street ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">City*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.city ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Pincode*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.pincode ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Contact Number*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.contact ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Email ID*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.email ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 md:ml-20 mt-10 md:mt-0">
            <div className="flex justify-center md:justify-end">
              <img
                src={data?.userPhoto || defaultUserPhoto}
                alt="User Photo"
                className="rounded-lg w-[400px] h-[300px]"
              />
            </div>
            <div className="w-full mt-5">
              <h3 className="text-xl font-semibold underline">
                Bank Details
              </h3>
              <div className="grid grid-cols-1 gap-4 mt-3">
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">
                    Bank Name*
                  </h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.bankDetails?.bankName ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Account Number*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.bankDetails?.accountNumber ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">
                    Branch Name*
                  </h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.bankDetails?.branchName ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">
                    IFSC Code*
                  </h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.bankDetails?.ifscCode ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">
                    Account Holder Name*
                  </h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.bankDetails?.accountHolderName ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5 flex flex-col items-center justify-center md:flex-row md:justify-end">
          {data.status === "underReview" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                  Approve
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4 w-full mx-auto bg-white rounded-md shadow-md">
                  <Label className="text-xl font-semibold underline">
                    Percentage
                  </Label>
                  <Input
                    className="border mt-2"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    type="text"
                    placeholder="Enter percentage"
                  />
                  <Button
                    className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={applicationApproved}
                  >
                    Confirm Approval
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {data.status === "underReview" && (
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={applicationReject}
                >
                  Reject
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-lg font-semibold">
                Are you sure you want to reject this application?
              </TooltipContent>
            </Tooltip>
          )}
          {data.status === "approved" && (
            <h3 className="text-2xl font-semibold text-green-500">Approved</h3>
          )}
          {data.status === "rejected" && (
            <h3 className="text-2xl font-semibold text-red-500">Rejected</h3>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AaDetailsBox;
