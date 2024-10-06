import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/notiification/DataTable';
import axios from 'axios';
import { server } from '@/main';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

const UpdateBatchCorporet = () => {
    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(false);
    //function for get all ppending sttus data 
    useEffect(() => {
        
          fetchBatches();
         
      }, []);
    
      const fetchBatches = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${server}/batch/all/corporate`, { 
            withCredentials: true,
            headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
          });
          setBatch(response.data.data.reverse());
          // console.log(response.data.data)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      if(!batch)
      {
       <Loader/>
      }
    
  return (
    <div> 
    <DataTable
    filter1={"courseName"}
    path={"/admin/dasbord/Batch/payment/update"}
    columns={batchColumns}
    data={batch} 
    isLoading={loading}
    pageUrl={"batch"}
  />
    </div>
  )
}

export default UpdateBatchCorporet


const batchColumns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
    {
        accessorKey: "courseName",
        header: "Batch Name",
    },
    {
        accessorKey: "ABN_Number",
        header: "Abn no",
      },
    {
        accessorKey: "trainingOrganization",
        header: "Created By",
    },
    {
        accessorKey: "scheme",
        header: "Batch under Scheme",
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
        header: "Total Amount",
    },
 
    {
        accessorKey: "clientPaymentStatus",
        header: "Payment from Tp",
        cell: ({ row }) => {
            const paymentStatusClient = row.getValue("clientPaymentStatus");
            return (
                <div
                    className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                        "bg-orange-100 text-orange-500": paymentStatusClient === false,
                        "bg-green-100 text-green-400": paymentStatusClient === true,
                    })}
                >
                    {paymentStatusClient ? "Paid" : "Not Paid"}
                </div>
            );
        },
    },
    {
        accessorKey: "amountToPaid",
        header: "Amount paid by tp ",
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
