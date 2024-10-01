import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../ui/Loder";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Separator } from "@/components(shadcn)/ui/separator";
import CreateExam from "./CreateExam";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  DollarSign,
  BookOpen,
  Users,
  Building,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const BtachDetailsBox = ({ id }) => {
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false); 
  const [isRefresh, setIsRefresh] = useState(false); 

  const navigate = useNavigate();
  //function for  fetch battch data by id.
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/batch/${id}`, {
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
          console.log(response.data.data);
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching training partner:", error);
      throw error;
    }
  }, [isRefresh]);
  // console.log(data)
  //function for handel the navigation for resultPage..

 
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount)
    }

  const handleViewResult = () => {
    navigate(`/admin/dasbord/batch/mark/students/${id}`); 
  };

  
  if (loding) {
    return <Loder />;
  }
  return (
    <div>
      <div className="w-full mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
          {/* Button For assign a batch */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{data.courseName ?? "N/A"}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Course Code: {data.courseCode ?? "N/A"}
                </p>
              </div>
              <Badge
                variant={data.status === "onGoing" ? "Completed" : "secondary"}
                style={{
                  backgroundColor:
                    data.status === "Completed"
                      ? "green"
                      : data.status === "onGoing"
                      ? "orange"
                      : "gray",
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 10px",
                  borderRadius: "20px",
                }}
              >
                {data.status ?? "N/A"}
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Course Details</h3>
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Level: {data.courseLevel ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration: {data.courseDuration ?? "N/A"} hours
                  </p>
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Credit: {data.courseCredit ?? "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Sector: {data.sectorName ?? "N/A"}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Batch Information</h3>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date: {formatDate(data.startDate ?? "")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date: {formatDate(data.endDate ?? "")}
                  </p>
                  <p className="flex items-center gap-2">
                    {data.batchCompletedStatus ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    Batch Completed: {data.batchCompletedStatus ? "Yes" : "No"}
                  </p>
                  <p className="flex items-center gap-2">
                    {data.batchActivePermission ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    Batch Active Permission:{" "}
                    {data.batchActivePermission ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Training Center Information</h3>
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Center Name: {data.centerName ?? "N/A"}
                </p>
                <p>Center Code: {data.CenterCode ?? "N/A"}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  State: {data.state ?? "N/A"}
                </p>
                <p>
                  Training Organization: {data.trainingOrganization ?? "N/A"}
                </p>
                <p>TP Code: {data.tpcode ?? "N/A"}</p>
                <p>ABN Number: {data.ABN_Number ?? "N/A"}</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Financial Information</h3>
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Amount to be Paid: {formatCurrency(data.amountToPaid ?? 0)}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Per Student Cost: {formatCurrency(data.perStudentCost ?? 0)}
                </p>
                <p className="flex items-center gap-2">
                  {data.paymentStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Payment Status: {data.paymentStatus ? "Paid" : "Unpaid"}
                </p>
                <p className="flex items-center gap-2">
                  {data.clientPaymentStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Client Payment Status:{" "}
                  {data.clientPaymentStatus ? "Paid" : "Unpaid"}
                </p>
                <p>Transaction ID: {data.transactionId ?? "N/A"}</p>
                {data.prePaymentInvoice && (
                  <p>
                    <a
                      href={data.prePaymentInvoice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Pre-Payment Invoice
                    </a>
                  </p>
                )}
                {data.postPaymentInvoice && (
                  <p>
                    <a
                      href={data.postPaymentInvoice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Post-Payment Invoice
                    </a>
                  </p>
                )}
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Course Status</h3>
                <p className="flex items-center gap-2">
                  {data.approvedByGovernmentBody ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Approved by Government Body:{" "}
                  {data.approvedByGovernmentBody ? "Yes" : "No"}
                </p>
                <p className="flex items-center gap-2">
                  {data.certificateIssued ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Certificate Issued: {data.certificateIssued ? "Yes" : "No"}
                </p>
                <p className="flex items-center gap-2">
                  {data.resultPublished ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Result Published: {data.resultPublished ? "Yes" : "No"}
                </p>
                <p className="flex items-center gap-2">
                  {data.isAssigned ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Is Assigned: {data.isAssigned ? "Yes" : "No"}
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Scheme Information</h3>
                <p>Scheme: {data.scheme ?? "N/A"}</p>
                <p>Scheme Type: {data.schemeType ?? "N/A"}</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Participants</h3>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Students: {data.students?.length ?? 0}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Trainers: {data.trainers?.length ?? 0}
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Additional Information</h3>
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

          <CreateExam
            abn_id={data?._id}
            tp_id={data?.trainingOrganizationId}
            course={data?.courseName}
            sector={data?.sectorName}
            state={data?.state}
            setRefresh={setIsRefresh}
          >
            <Button
              disabled={
                data?.status === "Completed" || 
                data?.paymentStatus === false ||
                data?.isAssigned
              }
              variant={"default"}
              className={"bg-green-700"}
            >
              {data?.isAssigned
                ? "Already Assigned "
                : data?.paymentStatus === false
                ? "Batch Payment Not Completed"
                : "Assign to Agency"}
            </Button>
          </CreateExam>
          {/* here admin can see the result of the  student */}
          <div>
            {data?.status === "Completed" ? (
              <Button className={"bg-red-800"} onClick={handleViewResult}>
                View Result
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtachDetailsBox;
