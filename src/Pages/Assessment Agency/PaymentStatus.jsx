/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { FaFileUpload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { server } from "@/main";
import { Loader } from "lucide-react";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [invoiceId, setInvoiceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/invoice/aa/${assessmentAgencyId[0]}`
        );
        console.log(response.data.data); // Ensure the structure matches your needs
        const data = response.data.data;

        setBatchData(data);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchData();
  }, [setBatchData]);

  const handleInvoiceUpload = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!invoiceFile) {
      toast.error("unable to upload invoice");
    }
    formData.append("pdf", invoiceFile);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log(invoiceId);
    try {
      setLoading(true)
      const response = await axios.put(
        `${server}/invoice/upload/${invoiceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Invoice uploaded successfully:");
    } catch (error) {
      setLoading(false);
      toast.error("Error uploading files:", error);
     
    } finally{
      setLoading(false);
    }
  };

  const handleRowClick = (id) => {
    setInvoiceId(id);
    console.log(invoiceId);
  };

  const handleGenerate = () => {
    navigate("/generateinvoice");
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden p-4  bg-white">
      <h1 className="text-2xl font-semibold mb-4">Batch Details</h1>
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Sl. No.
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Month
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Year
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ammount
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Paid Acknowledgement
            </th>
            {/* <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total no of candidate
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Candidate assessed
            </th> */}
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Invoice
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Upload
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {batchData.map((item, index) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100"
              onClick={() => handleRowClick(item._id)}
            >
              <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.month}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.year}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.totalAmountToBePaid}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    item.paymentStatus
                      ? "text-green-800 bg-green-200"
                      : "text-red-800 bg-red-200"
                  }`}
                >
                  {item.paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.transactionId}
              </td>
              {/* <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.totalNoOfcandidates}
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                {item.totalNoOfAssessedCandidates}
              </td> */}
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                <button
                  className="bg-blue-700 p-1 rounded-md text-white font-semibold"
                  onClick={handleGenerate}
                >
                  Download
                </button>
              </td>
              <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-700">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div>
                    <input
                      type="file"
                      accept=".pdf, .xlsx, .xls, .csv"
                      onChange={handleInvoiceUpload}
                      className="mt-2 block w-24 p-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 p-1 w-10 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                  {
                    loading?<Loader/>: <FaFileUpload className="inline-block" />
                  }
                   
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default PaymentStatus;
