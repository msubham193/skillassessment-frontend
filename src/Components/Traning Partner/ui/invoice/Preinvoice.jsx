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
      className="bg-white text-black p-10"
      style={{
        fontFamily: "Arial, sans-serif",
        width: "210mm",
        padding: "20mm",
      }}
    >
      <div className="text-center mb-10">
        <img src={logo} alt="Logo" className="w-24 mb-4 mx-auto" />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">INVOICE</h1>
      </div>
      <div className="mb-10">
        <table className="w-full table-fixed border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2 border border-black p-2">
                Invoice No: {invoiceNo}
              </td>
              <td className="w-1/2 border border-black p-2">
                Date: {currentDate}
              </td>
            </tr>
            <tr>
              <td className="w-1/2 border border-black p-2">To: CUTM</td>
              <td className="w-1/2 border border-black p-2">
                From: {batch.trainingOrganization}
              </td>
            </tr>
            <tr>
              <td className="w-1/2 border border-black p-2">
                CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
                <br />
                CT Campus
                <br />
                Paralakhemundi, Gajapati
                <br />
                Pin: 761211, Odisha
                <br />
                Contact Person: Subrat Kumar Sahu - +91-7008810321
              </td>
              <td className="w-1/2 border border-black p-2">
                {tpdata.organizationName}
                <br />
                {tpdata.registeredOfficeAddres}
                <br />
                City: {tpdata.registeredOfficeCity}
                <br />
                State: {tpdata.registeredOfficeState}
                <br />
                Pin: {tpdata.registeredOfficePin}
                <br />
                Mob No: {tpdata.registeredOfficeMobile}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="border border-black p-2">
                Dear Sir, Kindly arrange to pay the below amount towards
                assessment fee.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full border-collapse mb-10 text-center">
        <thead>
          <tr className="border border-black">
            <th className="border border-black p-2">S.No</th>
            <th className="border border-black p-2">Description</th>
            <th className="border border-black p-2">No of candidates</th>
            <th className="border border-black p-2">Photo</th>
            <th className="border border-black p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-black">
            <td className="border border-black p-2">01</td>
            <td className="border border-black p-2">
              Center name: Assessment of Batch No: {batch.ABN_Number}
            </td>
            <td className="border border-black p-2">{batch.students.length}</td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2">
              {batch.amountToPaid / batch.students.length}
            </td>
          </tr>
          <tr className="border border-black">
            <td colSpan="4" className="border border-black p-2 text-right">
              Total
            </td>
            <td className="border border-black p-2">{batch.amountToPaid}</td>
          </tr>
          <tr className="border border-black">
            <td colSpan="5" className="border border-black p-2">
              Total Amount in Words: {numberToWords(batch.amountToPaid)} Rupees
              Only
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-10">
        <p>Please note the following details for the transfer of funds</p>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border border-black p-2">Bank</td>
              <td className="border border-black p-2">Punjab National Bank</td>
            </tr>
            <tr>
              <td className="border border-black p-2">In Favour Of</td>
              <td className="border border-black p-2">
                Centurion University of Technology and Management
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">Branch Address</td>
              <td className="border border-black p-2">Gajapati, Odisha</td>
            </tr>
            <tr>
              <td className="border border-black p-2">Account Type</td>
              <td className="border border-black p-2">Current Account</td>
            </tr>
            <tr>
              <td className="border border-black p-2">Account No</td>
              <td className="border border-black p-2">14261193014446</td>
            </tr>
            <tr>
              <td className="border border-black p-2">MICR CODE</td>
              <td className="border border-black p-2">761024003</td>
            </tr>
            <tr>
              <td className="border border-black p-2">IFSC</td>
              <td className="border border-black p-2">PUNB0141610</td>
            </tr>
            <tr>
              <td className="border border-black p-2">PAN No</td>
              <td className="border border-black p-2">AAAAJ9465D</td>
            </tr>
            <tr>
              <td className="border border-black p-2">GST No</td>
              <td className="border border-black p-2">21AAAJC0251B1ZB</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-right">
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
