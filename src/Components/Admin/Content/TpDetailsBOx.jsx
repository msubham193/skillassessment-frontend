import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { Button } from "@/components(shadcn)/ui/button";
import { TooltipProvider } from "@/components(shadcn)/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Separator } from "@/components(shadcn)/ui/separator";
// import { useRecoilValue } from "recoil";
// import { trainingPartnerByID } from "@/Pages/Admin/Atoms/TpSelector";
import axios from "axios";
import { server } from "@/main";
import Loder from "../ui/Loder";
import { useRecoilValue } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";
import { toast } from "react-toastify";
import {
  Building,
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Globe,
  BookOpen,
  Users,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components(shadcn)/ui/popover";
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";

const TpDetailsBOx = ({ id }) => {
  const [referesh, setReferesh] = useState(false);
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
  const [batch, setBatch] = useState([]);
  const [course, setCourse] = useState([]);
  const [sector, setSector] = useState([]);
  const [amount, setAmount] = useState(null);

  //function for fetch batch by tpID............
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/batch/tp/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setBatch(response.data.data.reverse());
          // console.log(response.data.data);
          setReferesh((prev) => !prev);
        });
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  }, []);

  //function for  fetch data by id of traning partner.
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/tp/${id}`, {
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
          setReferesh((prev) => !prev);
          // console.log(response.data.data);
          setCourse(response.data.data.courses);
          setSector(response.data.data.sector);
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
        `${server}/tp/approve/${id}`,
        { amount },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoding(false);
      console.log(responce);
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

  //function for reject the application
  const applicationReject = async () => {
    setLoding(true);
    const token = authState.token;
    console.log(token);
    if (!token) {
      console.log("Admin not  found");
      return;
    }
    try {
      const responce = await axios.put(
        `${server}/tp/reject/${id}`,
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

  //function for add amount manualy for a traningPartner
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoding(true);
    // try {
    //   const response = await axios.put(
    //     `${server}/batch/addpayment/${id}`,
    //     {amount},
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   setAmount("");

    //   toast.success("Cost added !!", {
    //     position: "top-center",
    //     closeOnClick: true,
    //     draggable: true,
    //     theme: "colored",
    //   });
    //   setLoding(false);
    // } catch (error) {
    //     console.log(error)
    //   toast.error("Something went wrong, try after some time !!!", {
    //     position: "top-center",
    //     closeOnClick: true,
    //     draggable: true,
    //     theme: "colored",
    //   });
    //   setLoding(false);
    // }
  };

  const defaultUserPhoto = "/user.png";
  if (loding) {
    return <Loder />;
  }
  return (
    <TooltipProvider>
      <div className="m-4 md:m-10">
        <div className="container mx-auto p-4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{data.organizationName ?? "N/A"}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  TP Code: {data.tpCode ?? "N/A"}
                </p>
              </div>
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
                variant={
                  data.applicationStatus === "Approved"
                    ? "success"
                    : "secondary"
                }
              >
                {data.applicationStatus ?? "N/A"}
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg ">Organization Details</h3>
                  <p>Category: {data.organizationCategory ?? "N/A"}</p>
                  <p>PAN: {data.pan ?? "N/A"}</p>
                  <p>PRN No: {data.prnNo ?? "N/A"}</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Incorporation Date:{" "}
                    {new Date(
                      data.dateOfIncorporation ?? ""
                    ).toLocaleDateString()}
                  </p>
                  <p>Role: {data.role ?? "N/A"}</p>
                  <p>Scheme: {data.scheme ?? "N/A"}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {data.website ?? "N/A"}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {data.registeredOfficeEmail ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {data.registeredOfficeMobile ?? "N/A"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Head Owner Information</h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {data.headOwnerName ?? "N/A"}
                    </p>
                    <p>Aadhar: {data.headOwnerAadharNo ?? "N/A"}</p>
                    <p>PAN: {data.headOwnerPanNo ?? "N/A"}</p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {data.headOwnerEmail ?? "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {data.headOwnerMobile ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {data.headOwnerPermanentAddress ?? "N/A"},{" "}
                      {data.headOwnerCity ?? "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      DOB:{" "}
                      {new Date(data.headOwnerDob ?? "").toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Qualification: {data.headOwnerQualification ?? "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Work Experience: {data.headOwnerWorkExperience ??
                        "N/A"}{" "}
                      years
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Office Addresses</h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Registered Office</h4>
                    <p>{data.registeredOfficeAddress ?? "N/A"}</p>
                    <p>
                      {data.registeredOfficeCity ?? "N/A"},{" "}
                      {data.registeredOfficeState ?? "N/A"} -{" "}
                      {data.registeredOfficePin ?? "N/A"}
                    </p>
                    <p>GST: {data.registeredOfficeGst ?? "N/A"}</p>
                    <p>Fax: {data.registeredOfficeFax ?? "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Regional State Office</h4>
                    <p>{data.regionalStateOfficeAddress ?? "N/A"}</p>
                    <p>
                      {data.regionalStateOfficeCity ?? "N/A"},{" "}
                      {data.regionalStateOfficeState ?? "N/A"} -{" "}
                      {data.regionalStateOfficePin ?? "N/A"}
                    </p>
                    <p>GST: {data.regionalStateOfficeGst ?? "N/A"}</p>
                    <p>Fax: {data.regionalStateOfficeFax ?? "N/A"}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Project Contact Person</h3>
                <p>{data.projectContactPersonName ?? "N/A"}</p>
                <p>
                  Designation: {data.projectContactPersonDesignation ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {data.projectContactPersonEmail ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.projectContactPersonMobile ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.projectContactPersonPermanentAddress ?? "N/A"},{" "}
                  {data.projectContactPersonCity ?? "N/A"}
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sectors and Centers</h3>
                <div className="flex flex-wrap gap-2">
                  {data.sector?.map((s, index) => (
                    <Badge key={index} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Centers: {data.centers?.length ?? 0}
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Additional Information</h3>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Affiliation: {data.affiliation ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Certificates: {data.certificates?.length ?? 0}
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Courses: {data.courses?.length ?? 0}
                </p>
                <p>Edit Permission: {data.editPermission ? "Yes" : "No"}</p>
                <p>Number of Edit Requests: {data.noOfEditRequest ?? 0}</p>
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
      </div>
      {/* field for add amount for tp according to scheme */}
      {data?.applicationStatus === "Pending" && data?.scheme === "Corporate" ? (
        <div className="p-8 w-[500px] relative left-44">
          <form onSubmit={applicationApproved}>
            <Label htmlFor="name" className="text-left w-40 text-lg">
              Add cost per Student for this Training Partner...
            </Label>
            <Input
              id="scheme-name"
              className="col-span-4 py-6 mt-2"
              placeholder="Add amount in rupee"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="flex  md:flex-row justify-between mt-6 md:mx-10 w-full md:w-[625px] relative left-44">
        <Button
          onClick={applicationReject}
          className="bg-red-600 hover:bg-red-400  w-full md:w-auto mb-4 md:mb-0 "
          disabled={
            data?.applicationStatus === "Approved" ||
            data?.applicationStatus === "Rejected"
          }
        >
          {" "}
          {loding
            ? "Loading..."
            : data.applicationStatus === "Rejected"
            ? "Rejected"
            : "Reject"}
        </Button>
        <Button
          onClick={applicationApproved}
          className=" bg-green-600 hover:bg-green-400 w-full md:w-auto"
          disabled={
            data?.applicationStatus === "Rejected" ||
            data?.applicationStatus === "Approved" ||
            (data?.scheme === "Corporate" && amount === null)
          }
        >
          {loding
            ? "Loding..."
            : data.applicationStatus === "Approved"
            ? "Approved"
            : "Approve"}
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default TpDetailsBOx;
