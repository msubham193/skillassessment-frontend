/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "@/main";

const BatchDetailsOfSNA = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batchDetails, setBatchDetails] = useState([]);
  const [isApproaved, setIsApproaved] = useState(false);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/batch/${batchId}`);
        console.log(response.data.data);
        const data = response.data.data;
        setBatchDetails(data);
        if (data.approvedByGovernmentBody === true) {
          setIsApproaved(true);
        }
        console.log(batchDetails);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchBatchDetails();
  }, [batchId]);

  const renderDetailsSection = (details, keys, isDate = false) => {
    return keys.map((key) => renderDetailItem(key, details[key], isDate));
  };

  const renderDetailItem = (label, value, isDate = false) => {
    const formattedLabel = label
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    const formattedValue = isDate
      ? new Date(value).toLocaleDateString()
      : value;
    return (
      <div
        className="flex justify-normal gap-2 border-2 rounded p-2"
        key={label}
      >
        <span className="font-semibold text-gray-700">{formattedLabel}:</span>
        <span className="text-gray-900">
          {Array.isArray(formattedValue)
            ? formattedValue.length
            : formattedValue}
        </span>
      </div>
    );
  };

  const handleStudentTable = () => {
    navigate(`/sna/batchstudents/${batchId}`);
  };

  const handleApproval = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${server}/sna/batch/approve/${batchId}`
      );
      console.log(response);
      toast.success("Batch Approved Successfully");
      // navigate("/trainingbatches");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejection = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${server}/sna/batch/approve/${batchId}`
      );
      console.log(response);
      navigate("/trainingbatches");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-1">
      <h1 className="text-3xl font-bold mb-6 text-center">Batch Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Batch Information
            </h2>
            <div className="mb-4">
              {renderDetailsSection(batchDetails, [
                "ABN_Number",
                "CenterCode",
                "centerName",
                "courseName",
                "courseCode",
                "courseCredit",
                "courseDuration",
                "courseLevel",
              ])}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Batch Status
            </h2>
            <div className="mb-4">
              {renderDetailsSection(
                batchDetails,
                ["startDate", "endDate", "createdAt", "updatedAt"],
                true
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Additional Information
            </h2>
            <div className="mb-4">
              {Object.keys(batchDetails).map((key, index) => {
                if (
                  ![
                    "_id",
                    "schemeType",
                    "resultPublished",
                    "trainingOrganizationId",
                    "scheme",
                    "isAssigned",
                    "clientPaymentStatus",
                    "paymentStatus",
                    "batchActivePermission",
                    "amountToPaid",
                    "batchCompletedStatus",
                    "__v",
                    "prePaymentInvoice",
                    "postPaymentInvoice",
                    "transactionId",
                    "assessorId",
                    "approvedByGovernmentBody",
                    "certificateIssued",
                    "ABN_Number",
                    "CenterCode",
                    "centerName",
                    "courseName",
                    "courseCode",
                    "courseCredit",
                    "courseDuration",
                    "courseLevel",
                    "status",
                    "startDate",
                    "endDate",
                    "createdAt",
                    "updatedAt",
                    "students",
                    "trainers",
                  ].includes(key)
                ) {
                  return renderDetailItem(key, batchDetails[key]);
                }
                return null;
              })}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Associated Students & Trainers
            </h2>
            <div className="mb-4">
              {renderDetailItem("Number of Students", batchDetails.students)}
              {renderDetailItem("Number of Trainers", batchDetails.trainers)}
            </div>
          </div>
          <button
            onClick={handleStudentTable}
            className="px-6 py-2 text-white rounded-lg transition duration-300 mr-4 bg-blue-700"
          >
            View Students{" "}
          </button>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleApproval}
            disabled={isApproaved}
            className={`px-6 py-2 text-white rounded-lg transition duration-300 mr-4 ${
              isApproaved ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Approve
          </button>
          <button
            onClick={handleRejection}
            disabled={isApproaved}
            className={`px-6 py-2 text-white rounded-lg transition duration-300 ${
              isApproaved ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Reject
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default BatchDetailsOfSNA;
