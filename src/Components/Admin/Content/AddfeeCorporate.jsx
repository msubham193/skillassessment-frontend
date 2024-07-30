import React, { useEffect, useState } from 'react';
import { DataTable } from '../ui/notiification/DataTable';
import axios from 'axios';
import { server } from '@/main';
import { cn } from '@/lib/utils';

const AddfeeCorporate = () => {
    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to get all pending status data
    useEffect(() => {
        fetchBatches(); 
    }, []);

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${server}/batch/all/corporate`, {
                withCredentials: true,
            });
            setBatch(response.data.data.reverse());
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <DataTable
                filter1={"courseName"}
                path={"/admin/dasbord/Batch/cprporate/payment/update"}
                columns={batchColumns}
                data={batch}
                isLoading={loading}
                pageUrl={"batch"}
            />
        </div>
    );
};

export default AddfeeCorporate;

const batchColumns = [
    {
        accessorKey: "courseName",
        header: "Batch Name",
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
        accessorKey: "amountToPaid",
        header: "Total Amount",
    },
    {
        accessorKey: "clientPaymentStatus",
        header: "Payment from Client",
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
