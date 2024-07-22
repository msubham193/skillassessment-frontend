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

const AaDetailsBox = ({ id }) => {
  const [referesh, setReferesh] = useState(false);
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
  const [course, setCourse] = useState([]);
  const [sector, setSector] = useState([]);
  //  const data=useRecoilValue(trainingPartnerByID(id))
  //  console.log(data)

 

  //function for fetch data from aa by id...
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

  //function for approve the application
  const authState = useRecoilValue(authenticationState);
  const applicationApproved = async () => {
    setLoding(true);
    const token = authState.token;
    if (!token) {
      console.log("Admin not  found");
      return;
    }
    try {
      const responce = await axios.put(
        `${server}/aa/approve/${id}`,
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
      toast.success("Somthing went wrong", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  //function for reject the application
  const applicationReject = async () => {
    setLoding(true);
    const token = authState.token;
    if (!token) {
      console.log("Admin not  found");
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
      toast.success("Somthing went wrong", {
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
                  <TableCell className="font-medium">AgencyName*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.agencyName ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">
                    HeadOfTheOrganization*
                  </TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.headOfTheOrganization ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Email*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.email ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Phone No*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.phoneNumber ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">Course*</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.subject ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">WebsiteLink *</TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    {data?.websiteLink ?? "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">
                    Courses Provided By Traning Partner *
                  </TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Show Course</Button>
                      </PopoverTrigger>

                      {course &&
                        course.map((courses, index) => (
                          <PopoverContent key={index} className="bg-green-300">
                            {courses}
                          </PopoverContent>
                        ))}
                    </Popover>
                  </TableCell>
                </TableRow>
                <TableRow className="text-lg border-none">
                  <TableCell className="font-medium">
                    Available Sector*
                  </TableCell>
                  <TableCell className="pl-4 md:pl-24 text-lg">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Show Sector</Button>
                      </PopoverTrigger>

                      {sector &&
                        sector.map((sectors, index) => (
                          <PopoverContent key={index} className="bg-green-300">
                            {sectors}
                          </PopoverContent>
                        ))}
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* table for office Address */}
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
                  <h3 className="text-lg font-medium mb-2">Zip code*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.pin ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Country*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.officeAddress?.country ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
            {/* table for  communicationAddress */}
            <div className="w-full mt-5">
              <p className="text-xl font-semibold underline">
                COMMUNICATION ADDRESS
              </p>
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
                    {data?.communicationAddress?.street ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">City*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.communicationAddress?.city ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Zip code*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.communicationAddress?.pin ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">Country*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.communicationAddress?.country ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
            {/* About Spoc */}
            <div className="w-full mt-5">
              <p className="text-xl font-semibold underline">ABOUT SPOC</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">SPOC NAME*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.SPOC_NAME ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">SPOC EMAIL*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.SPOC_EMAIL ?? "Unknown"}
                  </p>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium mb-2">SPOC CONTACT NO*</h3>
                  <p className="text-lg border-b-[1px]">
                    {data?.SPOC_CONTACT_NO ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
            <Table className="mt-5">
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  Legal Status Of The Organization*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  <p className="flex justify-between">
                    <div>{data?.legalStatusOfTheOrganization ?? "Unknown"}</div>
                    {/* <TbFileCertificate /> */}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  PAN NO OF COMPANY*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.COMPANY_PAN_NO ?? "Unknown"}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  GST NO OF COMPANY*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.COMPANY_GST_NO ?? "Unknown"}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">NO OF BRANCHES*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.NO_OF_BRANCHES ?? "Unknown"}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  State Under GeographicalRegion*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.state_Under_geographicalRegion ?? "Unknown"}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  Total no of certified Assessor*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.total_no_of_certified_Assessor ?? "Unknown"}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">LETTER OF NCVET*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.LETTER_OF_NCVET ?? "Unknown"}
                </TableCell>
              </TableRow>
              {/* location maybe edit later */}
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">
                  geographical region*
                </TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">
                  {data?.geographical_region ?? "Unknown"}
                </TableCell>
              </TableRow>
            </Table>
          </div>
          <div className="border-[1px] border-black w-48 mx-auto md:w-40 md:mx-0 h-48 overflow-hidden mt-4 md:mt-0">
            <img
              src={data.PHOTO || defaultUserPhoto}
              alt="user"
              onError={(e) => (e.target.src = defaultUserPhoto)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-6 mx-4 md:mx-10 w-full md:w-[625px]">
          <Button
            onClick={applicationReject}
            className="bg-red-600 hover:bg-red-400  w-full md:w-auto mb-4 md:mb-0 "
            disabled={data?.applicationStatus === "Approved"}
          >
            {" "}
            {loding
              ? "Loding..."
              : data.applicationStatus === "Rejected"
              ? "Rejected"
              : "Reject"}
          </Button>
          <Button
            onClick={applicationApproved}
            className=" bg-green-600 hover:bg-green-400 w-full md:w-auto"
            disabled={data?.applicationStatus === "Rejected"}
          >
            {loding
              ? "Loding..."
              : data.applicationStatus === "Approved"
              ? "Approved"
              : "Approve"}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AaDetailsBox;
