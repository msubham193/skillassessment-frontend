import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/notiification/DataTable';
import axios from 'axios';
import { server } from '@/main';
import { cn } from '@/lib/utils';

const BatchPaymentDetails = () => {
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  //function for get all ppending sttus data
  useEffect(() => {
     
        fetchBatches();
      
    }, []);
    const fetchBatches = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/batch`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        });
        setBatch(response.data.data.reverse());
        console.log(response.data.data)
        setIsDataFetched(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <div>
    <DataTable
    filter1={"ABN_Number"}
    path={"/admin/dasbord/Batch/payment/update"}
    columns={batchColumns}
    data={batch}
    isLoading={loading}
    pageUrl={"batch"}
  />
    </div>
  )
}

export default BatchPaymentDetails


const batchColumns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "trainingOrganization",
    header: "Training Partner Name",
  },
  {
    accessorKey: "ABN_Number",
    header: "Abn NO",
  }, 
  {
    accessorKey: "students",
    header: "No of Student",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.students.length}
        </div>
      );
    },
  },   
  {
    accessorKey: "amountToPaid",
    header: "Total Amount ",
  },
  {
    accessorKey: "amountToPaid",
    header: "Amount paid by tp ",
  },
  {
    accessorKey: "prePaymentInvoice",
    header: "Invoice",
    cell: ({ row }) => {
      const preInvoice = row.getValue("prePaymentInvoice");
      return (
        <div
         
        >
          {preInvoice ? "Available" : "Not Available"}
        </div>
      );
    },
},
  {
      accessorKey: "clientPaymentStatus",
      header: "Payment  from tp",
      cell: ({ row }) => {
        const paymentStatusclint = row.getValue("clientPaymentStatus");
        return (
          <div
            className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
              "bg-orange-100 text-orange-500": paymentStatusclint === false,
              "bg-green-100 text-green-400": paymentStatusclint === true,
            })}
          >
            {paymentStatusclint ? "Paid" : "Not Paid"}
          </div>
        );
      },
  },
  {
    accessorKey: "paymentStatus", 
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus");
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500": paymentStatus === false,
            "bg-green-100 text-green-400": paymentStatus === true,
          })}
        >
          {paymentStatus ? "Paid" : "Not Paid"}
        </div>
      );
    },
  },
];

