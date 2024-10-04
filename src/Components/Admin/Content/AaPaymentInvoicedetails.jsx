import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "../ui/notiification/DataTable";
import { ArrowBigDownDash, BoxIcon, Download, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components(shadcn)/ui/button";
import MakePayment from "./MakePayment";

const AaPaymentInvoicedetails = () => {
  const { id } = useParams();
  // console.log("assessment agency id",id);
  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => ({
    id: (currentYear - i).toString(),
    name: (currentYear - i).toString(),
  }));
  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });
  const [selectedValues, setSelectedValues] = useState({
    month: "",
    year: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(false);

  //function for fetch monthly data in the table.....
  useEffect(() => {
    if (filters.month && filters.year && !isDataFetched) {
      fetchBatches();
    }
  }, [filters]);

  //** here is the function for get payment and invoice details for the assessment agency by month */
  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/invoice/monthly/query`,
        { assesmentAgencyId: id },
        {
          params: filters,
          withCredentials: true,
        }
      );
      setPaymentData(response.data.data);
      console.log(response.data.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //function for change the handel.........
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
    setIsDataFetched(false);
  };

  //function for reset filter.....
  const resetFilters = () => {
    setFilters({
      month: "",
      year: "",
    });
    setSelectedValues({
      month: "",
      year: "",
    });
    setIsDataFetched(false);
  };
  //is for reset thr filter data
  const hasActiveFilters = Object.values(filters).some((value) => value !== "");
  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-start space-x-6">
          <Select
            value={selectedValues.month}
            onValueChange={(value) => handleFilterChange("month", value)}
          >
            <SelectTrigger className="w-fit border-0 bg-zinc-300 ">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.id} value={month.name}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedValues.year}
            onValueChange={(value) => handleFilterChange("year", value)}
          >
            <SelectTrigger className="w-fit border-0  bg-zinc-300">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <div className="flex">
              <span className="font-semibold">Reset</span>
              <X
                onClick={resetFilters}
                className="w-4 cursor-pointer hover:cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* here is the data table  */}
      {paymentData?.month ? (
        <div className="p-8">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Agency Name</th>
                <th className="py-2 px-4 border-b">No of Exam</th>
                <th className="py-2 px-4 border-b">Total No of Candidates</th>
                <th className="py-2 px-4 border-b">
                  No of Assessed Candidates
                </th>
                <th className="py-2 px-4 border-b">Total Amount to be Paid</th>
                <th className="py-2 px-4 border-b">Download Invoice</th>
                <th className="py-2 px-4 border-b">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.AssesmentAgencyDetails?.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.examDetails?.length}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.totalNoOfcandidates}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.totalNoOfAssessedCandidates}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.totalAmountToBePaid}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {paymentData?.invoicePdf ? (
                    <a
                      href={paymentData?.invoicePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <Download className="ml-14" />
                    </a>
                  ) : (
                    <div className="relative group">
                      <span className="text-gray-500 cursor-not-allowed">
                        <Download className="ml-14" />
                      </span>
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-gray-700 text-white text-xs rounded-lg py-1 px-2 transition-opacity duration-300">
                        Invoice is not uploaded by the assessment agency.
                      </div>
                    </div>
                  )}
                </td>

                <td className="py-2 px-4 border-b text-center">
                  <MakePayment
                    invoice_id={paymentData?._id}
                    amountToPaid={paymentData?.totalAmountToBePaid}
                  >
                    <Button
                      className={`px-4 py-2 rounded-lg text-white ${
                        paymentData.paidAmount === 0
                          ? "bg-green-500"
                          : "bg-green-800"
                      }`}
                      disabled={paymentData.paidAmount !== 0}
                    >
                      {paymentData.paidAmount === 0 ? "Pay" : "Paid"}
                    </Button>
                  </MakePayment>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" flex justify-center">
          <p className="mt-5 text-2xl font-semibold text-green-700">
            {loading ? (
              "Lading...."
            ) : filters.month && filters.year ? (
              <div className="flex min-h-[100dvh] flex-col items-center  bg-background px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md text-center">
                  <BoxIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    OOPs' No Data Available !!!
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    It looks like there is no data to display at the selected
                    month or year.
                  </p>
                </div>
              </div>
            ) : (
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Month and Year not selected !!!
              </h2>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AaPaymentInvoicedetails;

export const aAcolumn = [
  {
    accessorKey: "AssesmentAgencyDetails",
    header: "Agency Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.AssesmentAgencyDetails.name}
        </div>
      );
    },
  },

  {
    accessorKey: "examDetails",
    header: "No of Exam",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.examDetails.length}
        </div>
      );
    },
  },
  {
    accessorKey: "totalNoOfcandidates",
    header: "Total No of candidates",
  },
  {
    accessorKey: "totalNoOfAssessedCandidates",
    header: "No of Assessed Candidates",
  },
  {
    accessorKey: "totalAmountToBePaid",
    header: "Total amount to paid",
  },
  {
    accessorKey: "invoicePdf",
    header: "Download Invoice",
    cell: ({ row }) => {
      const handleDownload = () => {
        const pdfUrl = row.getValue("invoicePdf");
        window.open(pdfUrl, "_blank");
      };
      return (
        <Button onClick={handleDownload}>
          <ArrowBigDownDash />
        </Button>
      );
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Payment status",
    cell: ({ row }) => {
      const paidStatus = row.getValue("paidAmount");
      const handleClick = () => {
        alert(`Action button clicked for row: ${row.original._id}`);
      };
      return (
        <Button
          onClick={handleClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          disabled={paidStatus != 0}
        >
          {paidStatus === 0 ? "Pay" : "Paid"}
        </Button>
      );
    },
  },
];

export const batchColumns = [
  {
    accessorKey: "AssesmentAgencyId",
    header: "Abn no",
  },
  {
    accessorKey: "invoiceGenerateDate",
    header: "Scheme Type",
  },
  {
    accessorKey: "transactionId",
    header: "Course ",
  },
];
