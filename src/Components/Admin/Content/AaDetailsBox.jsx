import React, { useEffect, useState } from "react";

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
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Separator } from "@/components(shadcn)/ui/separator";
import {
  MapPin,
  Globe,
  Phone,
  Mail,
  Building,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
} from "lucide-react";

const AaDetailsBox = ({ id }) => {
  const [referesh, setReferesh] = useState(false);
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
  const [course, setCourse] = useState([]);
  const [sector, setSector] = useState([]);
  const [percentage, setPercentage] = useState(null);
  //  const data=useRecoilValue(trainingPartnerByID(id))
  //  console.log(data)

  //function for grt all the detail about the assessmment agency...
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/aa/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setData(response.data.data);
          // console.log(response.data.data);
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

  //this is the function for approve the accessment agency
  const applicationApproved = async () => {
    setLoding(true);
    const token = authState.token;
    console.log(token);
    if (!token) {
      console.log("Admin not  found");
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
      // console.log(responce)
      toast.success(responce.data.message, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setData(responce.data.data);
    } catch (error) {
      setLoding(false);
      toast.error("Somthing went wrong", {
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
      toast.error("Somthing went wrong", {
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
        <div className="container mx-auto space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Agency Logo"
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <CardTitle>{data.agencyName ?? "N/A"}</CardTitle>
                <Badge
                  style={{
                    backgroundColor:
                      data.applicationStatus === "Approved"
                        ? "green"
                        : data.applicationStatus === "Pending"
                        ? "orange"
                        : "gray",
                    color: "white",
                    fontSize: "14px",
                    padding: "6px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {data.applicationStatus ?? "N/A"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {data.phoneNumber ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {data.email ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <a
                      href={data.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {data.websiteLink ?? "N/A"}
                    </a>
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Addresses</h3>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Office: {data.officeAddress ?? "N/A"}
                  </p>
                  <p>Communication: {data.communicationAddress ?? "N/A"}</p>
                  <p>Branch: {data.BRANCH_ADDRESS ?? "N/A"}</p>
                </div>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Company Details</h3>
                  <p>GST No: {data.COMPANY_GST_NO ?? "N/A"}</p>
                  <p>PAN No: {data.COMPANY_PAN_NO ?? "N/A"}</p>
                  <p>
                    Legal Status: {data.legalStatusOfTheOrganization ?? "N/A"}
                  </p>
                  <p>Role: {data.role ?? "N/A"}</p>
                  <p>
                    Head of Organization: {data.headOfTheOrganization ?? "N/A"}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Agency Information</h3>
                  <p className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Branches: {data.NO_OF_BRANCHES ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Certified Assessors:{" "}
                    {data.total_no_of_certified_Assessor ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Payment Percentage: {data.paymentPercentage ?? "N/A"}%
                  </p>
                  <p>Availability: {data.availability ? "Yes" : "No"}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">SPOC Details</h3>
                <p>Name: {data.SPOC_NAME ?? "N/A"}</p>
                <p>Contact: {data.SPOC_CONTACT_NO ?? "N/A"}</p>
                <p>Email: {data.SPOC_EMAIL ?? "N/A"}</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Geographical Information
                </h3>
                <p>Region: {data.geographical_region ?? "N/A"}</p>
                <p>State: {data.state_Under_geographicalRegion ?? "N/A"}</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Courses and Sectors</h3>
                <div className="flex flex-wrap gap-2">
                  {data.courses?.map((course, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      style={{
                        fontSize: "14px",
                        padding: "6px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.sectors?.map((sector, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      style={{
                        fontSize: "14px",
                        padding: "6px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Additional Information
                </h3>
                {data.LETTER_OF_NCVET && (
                  <p>
                    <a
                      href={data.LETTER_OF_NCVET}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-lg"
                    >
                      View NCVET Letter
                    </a>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created: {new Date(data.createdAt ?? "").toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Updated: {new Date(data.updatedAt ?? "").toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* field for add amount for tp according to scheme */}
        {data?.applicationStatus === "Pending" ? (
          <div className="p-8 w-[500px]">
            <form onSubmit={applicationApproved}>
              <Label htmlFor="name" className="text-left w-40 text-lg">
              <p className="text-sm text-red-600">Note*</p>
                Add Share in Percentage for this Assessment agency..
              </Label>
              <Input
                id="scheme-name"
                className="col-span-4 py-6 mt-2 bg-green-100"
                placeholder="Add amount in percentage here..."
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </form>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col md:flex-row justify-between mt-6 mx-4 md:mx-10 w-full md:w-[625px]">
          <Button
            onClick={applicationReject}
            className="bg-red-600 hover:bg-red-400  w-full md:w-auto mb-4 md:mb-0 "
            disabled={
              data?.applicationStatus === "Rejected" ||
              data?.applicationStatus === "Approved"
            }
          >
            {" "}
            {loding
              ? "Loding..."
              : data.applicationStatus === "Rejected"
              ? "Rejected"
              : "Reject"}
          </Button>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full md:w-auto">
                <Button
                  onClick={applicationApproved}
                  className="bg-green-600 hover:bg-green-400 w-full md:w-auto"
                  disabled={
                    data?.applicationStatus === "Rejected" ||
                    data?.applicationStatus === "Approved" ||
                    percentage === null ||
                    percentage === ""
                  }
                >
                  {loding
                    ? "Loding..."
                    : data.applicationStatus === "Approved"
                    ? "Approved"
                    : "Approve"}
                </Button>
              </div>
            </TooltipTrigger>
            {/* Show tooltip if the button is disabled */}
            {(data?.applicationStatus === "Rejected" ||
              data?.applicationStatus === "Approved" ||
              percentage === null ||
              percentage === "") && (
              <TooltipContent side="top">
                Please fill in the percentage or ensure the agency is not already approved or rejected.
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AaDetailsBox;
