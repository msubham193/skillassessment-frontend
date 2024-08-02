import React from "react";
import logo from "../invoice/logo.png";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "../../Atoms/trainingPartnerData";

const Preinvoice = ({ batch }) => {
  const tpdata = useRecoilValue(tpDataAtoms);
  if (!batch) return null;

  const currentDate = new Date().toLocaleDateString("en-GB");
  const invoiceNo = `CUTM/BNV/${currentDate.replace(/\//g, "")}/${
    batch.ABN_Number
  }/ID`;

  return (
    <div
      className="bg-white text-black"
      style={{
        fontFamily: "Arial, sans-serif",
        width: "210mm",
        padding: "10mm 20mm",
        margin: "0 auto",
      }}
    >
      <div className="text-center mb-2">
        <img src={logo} alt="Logo" className="w-16 mx-auto" />
      </div>
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold">INVOICE</h1>
      </div>
      <div className="mb-3">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <td className="w-1/2 border border-black p-1">
                Invoice No: {invoiceNo}
              </td>
              <td className="w-1/2 border border-black p-1">
                Date: {currentDate}
              </td>
            </tr>
            <tr>
              <td className="w-1/2 border border-black p-1">To: CUTM</td>
              <td className="w-1/2 border border-black p-1">
                From: {batch.trainingOrganization}
              </td>
            </tr>
            <tr>
              <td className="w-1/2 border border-black p-1 align-top">
                <p className="font-semibold">CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT</p>
                <p>CT Campus</p>
                <p>Paralakhemundi, Gajapati</p>
                <p>Pin: 761211, Odisha</p>
                <p>Contact Person: Subrat Kumar Sahu - +91-7008810321</p>
              </td>
              <td className="w-1/2 border border-black p-1 align-top">
                <p className="font-semibold">{tpdata.organizationName}</p>
                <p>{tpdata.registeredOfficeAddres}</p>
                <p>City: {tpdata.registeredOfficeCity}</p>
                <p>State: {tpdata.registeredOfficeState}</p>
                <p>Pin: {tpdata.registeredOfficePin}</p>
                <p>Mob No: {tpdata.registeredOfficeMobile}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="border border-black p-1">
                Dear Sir, Kindly arrange to pay the below amount towards
                assessment fee.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full border-collapse mb-3 text-center text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-1">S.No</th>
            <th className="border border-black p-1">Description</th>
            <th className="border border-black p-1">No of candidates</th>
            <th className="border border-black p-1">Photo</th>
            <th className="border border-black p-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-1">01</td>
            <td className="border border-black p-1 text-left">
              Center name: Assessment of Batch No: {batch.ABN_Number}
            </td>
            <td className="border border-black p-1">{batch.students.length}</td>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1">
              {(batch.amountToPaid / batch.students.length).toFixed(2)}
            </td>
          </tr>
          <tr className="font-semibold">
            <td colSpan="4" className="border border-black p-1 text-right">
              Total
            </td>
            <td className="border border-black p-1">{batch.amountToPaid.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5" className="border border-black p-1 text-left">
              Total Amount in Words: {numberToWords(batch.amountToPaid)} Rupees Only
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-3">
        <p className="font-semibold mb-1 text-sm">Please note the following details for the transfer of funds</p>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["Bank", "Punjab National Bank"],
              ["In Favour Of", "Centurion University of Technology and Management"],
              ["Branch Address", "Gajapati, Odisha"],
              ["Account Type", "Current Account"],
              ["Account No", "14261193014446"],
              ["MICR CODE", "761024003"],
              ["IFSC", "PUNB0141610"],
              ["PAN No", "AAAAJ9465D"],
              ["GST No", "21AAAJC0251B1ZB"],
            ].map(([key, value], index) => (
              <tr key={index}>
                <td className="border border-black p-1 font-semibold w-1/3">{key}</td>
                <td className="border border-black p-1">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right text-sm">
        <p>For Centurion University of Technology and Management</p>
        <p className="mt-4">Authorized Signature</p>
      </div>
    </div>
  );
};
// Helper function to convert number to words
function numberToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100)
    return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
  if (num < 1000)
    return (
      ones[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 1000000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );

  return num.toString();
}

export default Preinvoice;
