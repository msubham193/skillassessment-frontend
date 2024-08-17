/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import { server } from "@/main";

const GenerateInvoice = () => {
  const pdfRef = useRef();
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
    setAmmountInWord(numberToWords(45686));
  }, []);

  function numberToWords(num) {
    const ones = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    function convertLessThanOneThousand(n) {
      if (n === 0) return "";
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return (
          tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "")
        );
      return (
        ones[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 !== 0 ? " " + convertLessThanOneThousand(n % 100) : "")
      );
    }

    if (num === 0) return "zero";

    let words = "";
    if (num >= 1000000) {
      words +=
        convertLessThanOneThousand(Math.floor(num / 1000000)) + " million ";
      num %= 1000000;
    }
    if (num >= 1000) {
      words +=
        convertLessThanOneThousand(Math.floor(num / 1000)) + " thousand ";
      num %= 1000;
    }
    words += convertLessThanOneThousand(num);
    return words.trim();
  }

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div>
      <div className="p-10" id="pdf-content">
        <h1 className="text-center text-lg font-bold mb-4">
          Monthly assessment fee claim invoice for Assessment Agency
        </h1>
        <div className="border border-black mb-4">
          <div className="grid grid-cols-2 border border-black">
            <div className="border border-black p-2">
              Invoice No: AA/2024-25/04/00001
            </div>
            <div className="border border-black p-2">
              Date : <span className="ml-2 text-md">{date}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="border border-black p-2">To</p>
              <p className="border border-black p-2">
                CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
              </p>
              <p className="border border-black p-2">
                Center for Skill Certification
              </p>
              <p className="border border-black p-2">Ramachandarpur, Jatni</p>
              <p className="border border-black p-2">
                Pin: 752050, Dist. –Khorda, Odisha
              </p>
              <p className="border border-black p-2">PAN: AAAJC0752B</p>
              <p className="border border-black p-2">GST No: 21AAAJC0752B1Z8</p>
            </div>
            <div>
              <p className="border border-black p-2">From</p>
              <p className="border border-black p-2">
                Name : <span className="ml-2 text-md">{name}</span>
              </p>
              <p className="border border-black p-2">
                Address1- : <span className="ml-2 text-md">{address1}</span>
              </p>
              <p className="border border-black p-2">
                Address2- : <span className="ml-2 text-md">{address1}</span>
              </p>
              <p className="border border-black p-2">
                Contact no- : <span className="ml-2 text-md">{contact}</span>
              </p>
              <p className="border border-black p-2">
                PAN : <span className="ml-2 text-md">{pan}</span>
              </p>
              <p className="border border-black p-2">
                GST No : <span className="ml-2 text-md">{gst}</span>
              </p>
            </div>
          </div>
          <p className="p-2 border border-black">
            Dear Sir, Kindly arrange to pay the amount towards assessment fee
            with the below mentioned bank details.
          </p>
          <div className="p-2 border border-black">
            <p>
              Assessment Agency Bank Name and Branch - <span>{bankName}</span>,{" "}
              <span>{branchName}</span>
            </p>
            <p>
              Account No - <span>{accountNumber}</span>
            </p>
            <p>
              IFSC code - <span>{ifscCode}</span>
            </p>
          </div>
        </div>
        <div className="border-2 border-black p-4 mb-4">
          <h2 className="text-center font-bold mb-4">
            Claim Details for Assessment
          </h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border border-black p-2">Sl. No</th>
                <th className="border border-black p-2">ABN No</th>
                <th className="border border-black p-2">TP Name</th>
                <th className="border border-black p-2">Date of Assessment</th>
                <th className="border border-black p-2">
                  Total no of Candidate
                </th>
                <th className="border border-black p-2">
                  No of Assessed candidate
                </th>
                <th className="border border-black p-2">
                  Assessment cost (per Unit)
                </th>
                <th className="border border-black p-2">Amount claim @ </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {examData.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-black p-2">1</td>
                  <td className="border border-black p-2">{item.batchAbn}</td>
                  <td className="border border-black p-2">{item.tpname}</td>
                  <td className="border border-black p-2">{item.date}</td>
                  <td className="border border-black p-2 text-center">
                    {item.totalNoOfCandidates}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.noOfAssessedCandidates}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.costPerCandidate}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.amountToPaid}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="text-xs py-2 " colSpan={3}>
                  <div className="flex flex-col">
                    Amount in words :{" "}
                    <span className="text-lg font-semibold">
                      {ammountInWord}
                    </span>
                  </div>
                </td>
                <td className="border border-black p-2">Total</td>
                <td className="border border-black p-2">
                  {totalNoOfcandidates}
                </td>
                <td className="border border-black p-2">
                  {totalNoOfAssessedCandidates}
                </td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2">
                  {totalAmountToBePaid}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <p className="font-bold">Declaration:</p>
            <ol className="list-decimal list-inside">
              <li>
                I do hear by declare that whenever Awarding Body would demand
                for physical documents for the above mentioned batches would be
                furnished by the assessment agency. All the physical assessment
                records would be stored by assessment agency.
              </li>
              <li>
                The above information furnished by me is true to my knowledge &
                the documents attached are in order. If any deviation in that
                above found at later stage during audit, Assessment Agency will
                be held responsible.
              </li>
            </ol>
          </div>
          <div className="mt-28">
            <p className="font-bold">
              Authorized Signatory of Assessment Agency
            </p>
          </div>
        </div>
        <div className="border-2 border-black p-4">
          <h2 className="text-center font-bold mb-4">OFFICIAL USE</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border p-2">
              <p className="text-center mt-14">
                Signature of Operation Manager
              </p>
            </div>
            <div className="border p-2">
              <p className="text-center mt-14">Signature of Accountant</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border p-2">
              <p className="text-center mt-14">
                Head- Center for Skill Certification
              </p>
            </div>
            <div className="border p-2">
              <p className="text-center mt-14">
                Signature of Finance controller
              </p>
            </div>
            <div className="border p-2">
              <p className="text-center mt-14">
                Signature of Comptroller of Finance
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-2">
              <p>Remark of Concerned Dept.:</p>
            </div>
            <div className="border p-2">
              <p>Remarks of Account Dept.:</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Note:</p>
          <ol className="list-decimal list-inside">
            <li className="bg-yellow-200 mt-4">
              Invoice code – Assessment Agency Abbreviation/Fiscal year/month
              code/00001
            </li>
          </ol>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="btn bg-[#0066ff] text-base text-white font-semibold px-3 py-1 rounded duration-500 hover:bg-[#3f37c9] download-button"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default GenerateInvoice;
