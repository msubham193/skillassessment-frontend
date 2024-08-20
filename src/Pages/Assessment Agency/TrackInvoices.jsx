/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  batchAbnState,
  batchIdState,
  courseNameState,
  examDateState,
  examIdState,
  sectorState,
  tpNameState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { server } from "@/main";
import axios from "axios";

const TrackInvoices = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]); // Initialize as an empty array
  const setBatch_Id = useSetRecoilState(batchIdState);
  const setExamId = useSetRecoilState(examIdState);
  const setCourseName = useSetRecoilState(courseNameState);
  const setTpName = useSetRecoilState(tpNameState);
  const setBatchAbn = useSetRecoilState(batchAbnState);
  const setExamDate = useSetRecoilState(examDateState);
  const setSector = useSetRecoilState(sectorState);
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [contact, setContact] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [share, setShare] = useState("");
  const [totalNoOfcandidates, setTotalNoOfcandidates] = useState(0);
  const [totalNoOfAssessedCandidates, setTotalNoOfAssessedCandidates] =
    useState(0);
  const [totalAmountToBePaid, setTotalAmountToBePaid] = useState(0);
  const [examData, setExamData] = useState([]);
  const [ammountInWord, setAmmountInWord] = useState("");

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.post(
          `${server}/invoice/${assessmentAgencyId[0]}`
        );
        console.log(response);
        const data = response.data.data;
        setDate(data.invoiceGenerateDate);
        setName(data.AssesmentAgencyDetails.name);
        setAddress1(data.AssesmentAgencyDetails.address);
        setContact(data.AssesmentAgencyDetails.contactNumber);
        setPan(data.AssesmentAgencyDetails.PAN);
        setGst(data.AssesmentAgencyDetails.GST_Number);
        // setBankName(data.BankInformation.bankName);
        // setBranchName(data.BankInformation.branchName);
        // setAccountNumber(data.BankInformation.accountNumber);
        // setIfscCode(data.BankInformation.IFSCCode);
        setExamData(data.examDetails);
        setTotalNoOfcandidates(data.totalNoOfcandidates);
        setTotalNoOfAssessedCandidates(data.totalNoOfAssessedCandidates);
        setTotalAmountToBePaid(data.totalAmountToBePaid);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchBatchDetails();
  }, [assessmentAgencyId]); // Ensure this runs when the ID changes

  const handleRowClick = (
    examId,
    courseName,
    batchId,
    trainingPartner,
    batchABN,
    examDate,
    sector
  ) => {
    console.log(examId);
    console.log(batchId);
    console.log(courseName);
    console.log(trainingPartner);
    console.log(batchABN);
    console.log(examDate);
    console.log(sector);
    setBatch_Id(batchId);
    setExamId(examId);
    setBatchAbn(batchABN);
    setCourseName(courseName);
    setTpName(trainingPartner);
    setExamDate(examDate);
    setSector(sector);

    navigate(`/dashboard/students/${batchId}`);
  };
  return (
    <div className="overflow-x-auto mt-2 mb-60 border rounded-lg shadow-lg">
      <div className="p-2">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-gray-600 mb-4">Track Individual Exam Invoices</p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead className="">
          <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
            <th className="px-4 py-3 text-left font-medium">Sl. No</th>
            <th className="px-4 py-3 text-left font-medium">ABN No</th>
            <th className="px-4 py-3 text-left font-medium">TP Name</th>
            <th className="px-4 py-3 text-center font-medium">
              Date of Assessment
            </th>
            <th className="px-4 py-3 text-center font-medium">
              Total no of Candidate
            </th>
            <th className="px-4 py-3 text-center font-medium">
              No of Assessed candidate
            </th>
            <th className="px-4 py-3 text-left font-medium">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {batchData.map((batch) => (
            <tr
              key={batch._id}
              // onClick={() =>
              //   handleRowClick(
              //     batch._id,
              //     batch.course,
              //     batch.batchId._id,
              //     batch.TrainingOrganization,
              //     batch.batchABN,
              //     batch.date,
              //     batch.sector
              //   )
              // }
              className="cursor-pointer hover:bg-gray-200"
            >
              <td className="px-4 py-3">{batch.batchABN}</td>
              <td className="px-4 py-3">{batch.course}</td>
              <td className="px-4 py-3">{batch.scheme}</td>
              <td className="px-4 py-3 text-center">
                {batch.batchId.students ? batch.batchId.students.length : 0}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    batch.markUploadAndExamCompleteStatus === true
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-yellow-800"
                  }`}
                >
                  {batch.markUploadAndExamCompleteStatus
                    ? "Completed"
                    : "On-Going"}
                </span>
              </td>
              <td className="px-4 py-3">{batch.TrainingOrganization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackInvoices;
