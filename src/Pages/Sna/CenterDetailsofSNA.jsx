import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Separator } from "@/components(shadcn)/ui/separator";
import {
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Briefcase,
  GraduationCap,
  MapPin,
  Link,
  FileCheck,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";


const CenterDetailsofSNA = () => {
  const { centerId } = useParams();
  const [data, setData] = useState({});
  const [isApproaved, setIsApproaved] = useState(false);    
  const [loading, setLoading] = useState(false);
  const state = localStorage.getItem("state");
  const schemeName = localStorage.getItem("scheme");
  const [isBatchApproved, setIsBatchApproved] = useState(false);


  //here is the function for get the details of traning center
  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/center/${centerId}`);
        // console.log(response.data.data.schemes);
        const scheme = response.data.data.schemes.find((s) => s.schemeName === schemeName);
        // console.log(scheme)
        setIsApproaved(scheme?.approveStatus);

        setData(response.data.data);

        //   console.log(batchDetails);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchBatchDetails();
  }, [centerId,isBatchApproved]);

  const handleApproval = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/sna/center/approve/${centerId}`,
        { state, schemeName }
      );
      setIsBatchApproved(true)
      setIsApproaved(true)
      console.log(response);
      toast.success("Center Approve successfully", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRejection = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.error("Batch Reejected !!!", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
setIsBatchApproved(true)
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{data.name ?? "N/A"}</CardTitle>
            <p className="text-sm text-muted-foreground">
              TP Code: {data.tpCode ?? "N/A"}
            </p>
          </div>
          <Badge variant="secondary">{data.role ?? "N/A"}</Badge>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Organization Details</h3>
              <p className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                PRN No: {data.PRN_NO ?? "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Center ID: {data.centerId ?? "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Project ID: {data.projectId ?? "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                State: {data.state ?? "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Contact Information</h3>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {data?.trainingOrganizationId?.registeredOfficeTelephone ?? "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                <a
                  href={data?.trainingOrganizationId?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Website
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <a
                  href={data?.trainingOrganizationId?.sanction_order_letter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Sanction Order Letter
                </a>
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Head Owner Information</h3>
            <p className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {data?.trainingOrganizationId?.headOwnerName ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {data?.trainingOrganizationId?.headOwnerEmail ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data?.trainingOrganizationId?.headOwnerMobile ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {data?.trainingOrganizationId?.headOwnerCity ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Aadhar: {data?.trainingOrganizationId?.headOwnerAadharNo ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              PAN: {data?.trainingOrganizationId?.headOwnerPanNo ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              DOB: {formatDate(data?.trainingOrganizationId?.headOwnerDob)}
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Scheme and Sector</h3>
            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Scheme: {data?.trainingOrganizationId?.scheme ?? "N/A"}
            </p>
            <div>
              <p className="font-medium mb-1">Sector:</p>
              <div className="flex flex-wrap gap-2">
                {data?.trainingOrganizationId?.sector?.map((s, index) => (
                  <Badge key={index} variant="secondary">
                    {s}
                  </Badge>
                )) ?? "N/A"}
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Additional Information</h3>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Updated: {formatDate(data?.trainingOrganizationId?.updatedAt)}
            </p>
          </div>
          <Separator/>
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
            disabled={isApproaved}
            className={`px-6 py-2 text-white rounded-lg transition duration-300 ${
              isApproaved ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
          {loading ? <Loader2 size={20} className="animate-spin" /> : "Reject"}
            
          </button>
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CenterDetailsofSNA;
