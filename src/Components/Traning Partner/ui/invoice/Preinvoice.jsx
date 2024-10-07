import React from "react";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "../../Atoms/trainingPartnerData";

const Preinvoice = ({ batch }) => {
  const tpdata = useRecoilValue(tpDataAtoms);
  if (!batch) return null;

  const currentDate = new Date().toLocaleDateString("en-GB");
  const invoiceNo = `CUTM/INV/${currentDate.replace(/\//g, "")}/${
    batch.ABN_Number
  }/ID`;

  return (
    <div
      className="bg-white text-black"
      style={{
        fontFamily: "Arial, sans-serif",
        width: "100%",
        padding: "10mm",
        boxSizing: "border-box",
      }}
    >
      <div className="text-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">INVOICE</h1>
      </div>

      <table className="w-full border-collapse mb-8">
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2 w-1/2">
              Invoice No: {invoiceNo}
            </td>
            <td className="border border-gray-400 p-2 w-1/2">
              Date: {currentDate}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 w-1/2">
              <strong>To</strong>
              <br />
              Organization Name: {tpdata.organizationName}
              <br />
              City: {tpdata.registeredOfficeCity}
              <br />
              State: {tpdata.registeredOfficeState}
              <br />
              Pin: {tpdata.registeredOfficePin}
            </td>
            <td className="border border-gray-400 p-2 w-1/2">
              <strong>From</strong>
              <br />
              CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT
              <br />
              CT Campus, Paralakhemundi
              <br />
              Pin: 761211, Dist: Gajapati
              <br />
              State: Odisha
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="border border-gray-400 p-2 text-start">
              Dear Sir, Kindly arrange to pay the below amount towards
              assessment fee.
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 p-2">Sl No</th>
            <th className="border border-gray-400 p-2">Description</th>
            <th className="border border-gray-400 p-2">No of candidate</th>
            <th className="border border-gray-400 p-2">Price(₹)</th>
            <th className="border border-gray-400 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2 text-center">01</td>
            <td className="border border-gray-400 p-2">
              Center name: {batch.centerName}
              <br />
              Assessment of Batch No: {batch.ABN_Number}
            </td>
            <td className="border border-gray-400 p-2 text-center">
              {batch.students.length}
            </td>
            <td className="border border-gray-400 p-2 text-right">
              {(batch.amountToPaid / batch.students.length).toFixed(2)}{batch.schemeType === "Corporate"
                ? "+18% GST)"
                : ""}
            </td>
            <td className="border border-gray-400 p-2 text-right">
              {batch.amountToPaid.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td
              colSpan="4"
              className="border border-gray-400 p-2 text-right font-bold"
            >
              Total(Including All Taxes)
            </td>
            <td className="border border-gray-400 p-2 text-right font-bold">
              {batch.amountToPaid.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="border border-gray-400 p-2">
              <strong>Amount in Words:</strong>
              {numberToWords(batch.amountToPaid)} Rupees Only 
              {batch.schemeType === "Corporate"
                ? "(Including 18% GST)"
                : ""}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">
        <strong>Please note following details for transfer of funds</strong>
      </p>

      <table className="w-full border-collapse mb-8">
        <tbody>
          {[
            ["Bank", "Punjab National Bank"],
            [
              "In Favour Of",
              "Centurion University of Technology and Management",
            ],
            ["Branch Address", "Argul, Jatani"],
            ["Account Type", "Current Account"],
            ["Account No", "1426113001448"],
            ["MICR CODE", "752024005"],
            ["IFSC", "PUNB0142610"],
            ["PAN No", "AAAJC0728B"],
            ["GST No", "21AAAJC0728B1ZB"],
          ].map(([key, value], index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2 w-1/3">{key}</td>
              <td className="border border-gray-400 p-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mb-20">
        <p>For Centurion University of Technology and Management</p>

        <div className="inline-block mr-[50px]">
          <img
            src="/Partha_sir_signature.png"
            alt="parth"
            width={100}
            height={20}
            className="inline-block mt-[30px]"
          />
        </div>

        <p>Authorized Signature</p>
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
