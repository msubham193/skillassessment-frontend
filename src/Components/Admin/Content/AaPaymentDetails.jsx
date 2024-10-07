import { cn } from '@/lib/utils';
import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataTable } from '../ui/notiification/DataTable';
import { Button } from '@/components(shadcn)/ui/button';

const AaPaymentDetails = () => {
  const [assessmentAgency, setAssessmentAgency] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
 
  useEffect(() => {
    if (!isDataFetched) { 
      try {
        setLoading(true);
        axios.get(`${server}/aa/status/approved`, { 
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        }).then((response) => {
          setLoading(false);
          setAssessmentAgency(response.data.data.reverse());
          setIsDataFetched(true);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [isDataFetched]);

  const handlePaymentClick = (agency) => {
    // Implement your payment logic here
    console.log('Payment clicked for agency:', agency);
  };

  return (
    <div>
      <DataTable
        filter1={"agencyName"}
        columns={columns}
        path={"/admin/dasbord/Aa/invoice/payment/update"}
        data={assessmentAgency}
        isLoading={loading}
        pageUrl={"accessmentagency"}
      />
    </div>
  );
};

export default AaPaymentDetails;

const columns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "agencyName",
    header: "Agency Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "state_Under_geographicalRegion",
    header: "State",
  },
  {
    accessorKey: "sectors",
    header: "Sector's",
  },
  {
    accessorKey: "total_no_of_certified_Assessor",
    header: "No of Assessors",
  },
  {
    accessorKey: "applicationStatus",
    header: "Application Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-100 text-red-500":
              row.getValue("applicationStatus") === "Rejected",
            "bg-orange-100 text-orange-500":
              row.getValue("applicationStatus") === "Pending",
            "bg-green-100 text-green-400":
              row.getValue("applicationStatus") === "Approved",
          })}
        >
          {row.getValue("applicationStatus")}
        </div>
      );
    },
  },
  {
    header: "Payment",
    cell: ({ row }) => {
      return (
        <Button
          onClick={() => handlePaymentClick(row.original)}
          className="bg-blue-200 text-blue-700  rounded"
        >
          Pay
        </Button>
      );
    },
  },
];
