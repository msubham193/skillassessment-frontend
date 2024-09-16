/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Separator } from "@/components(shadcn)/ui/separator";
import { server } from "@/main";
import { Loader2 } from "lucide-react";
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
import { Button } from "@/components(shadcn)/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components(shadcn)/ui/dialog";
import TrainerTable from "@/Components/Sna/TrainerTable";

const BatchDetailsOfSNA = () => {
  const { batchId } = useParams();
  const navigate=useNavigate();
  const [showTrainersModal, setShowTrainersModal] = useState(false);    
  const [batchDetails, setBatchDetails] = useState([]);
  const [trainerData, setTrainerData] = useState([]);
  const [isApproaved, setIsApproaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBatchApproved, setIsBatchApproved] = useState(false);


  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/batch/${batchId}`);
        console.log(response.data.data.trainers);
        console.log(response.data.data.students);
        const data = response.data.data;
        // setStudentData(data?.students);
        setTrainerData(data?.trainers);
        setBatchDetails(data);
        if (data.approvedByGovernmentBody === true) {
          setIsApproaved(true);
        }
        // console.log(batchDetails);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchBatchDetails();
  }, [batchId,isBatchApproved]);

  const handleApproval = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${server}/sna/batch/approve/${batchId}`
      );
      // console.log(response);
      setIsBatchApproved(true)
      toast.success("Batch Approved Successfully");
      // navigate("/trainingbatches");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejection = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/sna/batch/approve/${batchId}`
      );
      setIsBatchApproved(true);
      toast.error("Batch Rejected");
      // console.log(response);
      // navigate("/trainingbatches");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-1">
      <h1 className="text-3xl font-bold mb-6 text-center">Batch Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>{batchDetails.courseName ?? "N/A"}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Course Code: {batchDetails.courseCode ?? "N/A"}
              </p>
            </div>
            <Badge
              variant={
                batchDetails.status === "onGoing" ? "Completed" : "secondary"
              }
              style={{
                backgroundColor:
                  batchDetails.status === "Completed"
                    ? "green"
                    : batchDetails.status === "onGoing"
                    ? "orange"
                    : "gray",
                color: "white",
                fontSize: "14px",
                padding: "6px 10px",
                borderRadius: "20px",
              }}
            >
              {batchDetails.status ?? "N/A"}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Course Details</h3>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Level: {batchDetails.courseLevel ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration: {batchDetails.courseDuration ?? "N/A"} hours
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Credit: {batchDetails.courseCredit ?? "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Sector: {batchDetails.sectorName ?? "N/A"}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Batch Information</h3>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date: {formatDate(batchDetails.startDate ?? "")}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  End Date: {formatDate(batchDetails.endDate ?? "")}
                </p>
                <p className="flex items-center gap-2">
                  {batchDetails.batchCompletedStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Batch Completed:{" "}
                  {batchDetails.batchCompletedStatus ? "Yes" : "No"}
                </p>
                <p className="flex items-center gap-2">
                  {batchDetails.batchActivePermission ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  Batch Active Permission:{" "}
                  {batchDetails.batchActivePermission ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                Training Center Information
              </h3>
              <p className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Center Name: {batchDetails.centerName ?? "N/A"}
              </p>
              <p>Center Code: {batchDetails.CenterCode ?? "N/A"}</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                State: {batchDetails.state ?? "N/A"}
              </p>
              <p>
                Training Organization:{" "}
                {batchDetails.trainingOrganization ?? "N/A"}
              </p>
              <p>TP Code: {batchDetails.tpcode ?? "N/A"}</p>
              <p>ABN Number: {batchDetails.ABN_Number ?? "N/A"}</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Financial Information</h3>
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount to be Paid:{" "}
                {formatCurrency(batchDetails.amountToPaid ?? 0)}
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Per Student Cost:{" "}
                {formatCurrency(batchDetails.perStudentCost ?? 0)}
              </p>
              <p className="flex items-center gap-2">
                {batchDetails.paymentStatus ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Payment Status: {batchDetails.paymentStatus ? "Paid" : "Unpaid"}
              </p>
              <p className="flex items-center gap-2">
                {batchDetails.clientPaymentStatus ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Client Payment Status:{" "}
                {batchDetails.clientPaymentStatus ? "Paid" : "Unpaid"}
              </p>
              <p>Transaction ID: {batchDetails.transactionId ?? "N/A"}</p>
              {batchDetails.prePaymentInvoice && (
                <p>
                  <a
                    href={batchDetails.prePaymentInvoice}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Pre-Payment Invoice
                  </a>
                </p>
              )}
              {batchDetails.postPaymentInvoice && (
                <p>
                  <a
                    href={batchDetails.postPaymentInvoice}
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
                {batchDetails.approvedByGovernmentBody ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Approved by Government Body:{" "}
                {batchDetails.approvedByGovernmentBody ? "Yes" : "No"}
              </p>
              <p className="flex items-center gap-2">
                {batchDetails.certificateIssued ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Certificate Issued:{" "}
                {batchDetails.certificateIssued ? "Yes" : "No"}
              </p>
              <p className="flex items-center gap-2">
                {batchDetails.resultPublished ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Result Published: {batchDetails.resultPublished ? "Yes" : "No"}
              </p>
              <p className="flex items-center gap-2">
                {batchDetails.isAssigned ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                Is Assigned: {batchDetails.isAssigned ? "Yes" : "No"}
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Scheme Information</h3>
              <p>Scheme: {batchDetails.scheme ?? "N/A"}</p>
              <p>Scheme Type: {batchDetails.schemeType ?? "N/A"}</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Participants</h3>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Students: {batchDetails.students?.length ?? 0}
              </p>
              <Button
                onClick={() => navigate(`/sna/batchdetails/student/${batchId}`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                See Students
              </Button>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Trainers: {batchDetails.trainers?.length ?? 0}
              </p>
              <Button
                onClick={() => setShowTrainersModal(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                See Trainers
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Additional Information</h3>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created:{" "}
                {new Date(batchDetails.createdAt ?? "").toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Updated:{" "}
                {new Date(batchDetails.updatedAt ?? "").toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleApproval}
            disabled={isApproaved || isBatchApproved}
            className={`px-6 py-2 text-white rounded-lg transition duration-300 mr-4 ${
              isApproaved ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : isApproaved?"Approved": (
              "Approve"
            )}
          </button>
          <button
            onClick={handleRejection}
            disabled={isApproaved || isBatchApproved}
            className={`px-6 py-2 text-white rounded-lg transition duration-300 ${
              isApproaved ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Reject"
            )}
          </button>
        </div>

        {/* Trainers Modal */}
        <Dialog
          open={showTrainersModal}
          onOpenChange={setShowTrainersModal}
          className="w-full"
        >
          <DialogContent className="max-w-6xl">
            {" "}
            {/* Increased width */}
            <DialogHeader>
              <DialogTitle>Trainers List</DialogTitle>
              <DialogDescription>
                Below is the list of trainers assigned to this batch.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 overflow-x-auto">
              {" "}
              {/* Ensure the table scrolls if it overflows */}
              <TrainerTable data={trainerData} />
            </div>
            <DialogFooter>
              <Button onClick={() => setShowTrainersModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  );
};

export default BatchDetailsOfSNA;
