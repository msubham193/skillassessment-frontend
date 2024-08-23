import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../ui/Loder";
import { Button } from "@/components(shadcn)/ui/button";
import { Eye } from "lucide-react";

const BatchPaymentBox = ({ id }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPreInvoice, setShowPreInvoice] = useState(false);
  const [showPostInvoice, setShowPostInvoice] = useState(false);

  // Function to fetch batch data by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/batch/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching batch data:", error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loder />;
  }

  return (
    <div>
      <div className="w-full mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3 px-28">
          <div className="p-3 flex justify-between">
            <h3 className="text-lg font-medium mb-2">View Pre Invoice*</h3>
            <Button onClick={() => setShowPreInvoice(!showPreInvoice)}>
              <Eye className="mr-2 h-4 w-4" />
              Pre Invoice
            </Button>
            {showPreInvoice && (
              <div className="mt-4">
                <a
                  href={data?.prePaymentInvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Pre Invoice
                </a>
              </div>
            )}
          </div>
          <div className="p-3 flex justify-between">
            <h3 className="text-lg font-medium mb-2">Client-side Payment*</h3>
            <p className="text-lg font-semibold ">
              {data?.clientPaymentStatus ? "Paid" : "Not Paid"}
            </p>
            
          </div>
          <div className="p-3 flex justify-between">
          <h3 className="text-lg font-medium mb-2">Client-side TransactionId*</h3>
          <p className="text-lg font-semibold ">
              {data?.clientPaymentStatus===true ? data?.transactionId : "Not Paid"}
            </p>
          </div>
          <div className="p-3 flex justify-between">
            <h3 className="text-lg font-medium mb-2">View Post Invoice*</h3>
            {data?.clientPaymentStatus ? (
              <Button onClick={() => setShowPostInvoice(!showPostInvoice)}>
                <Eye className="mr-2 h-4 w-4" />
                Post Invoice
              </Button>
            ) : (
              <p className="text-lg font-semibold">Payment Not Completed</p>
            )}
            {showPostInvoice && data?.clientPaymentStatus && (
              <div className="mt-4">
                <a
                  href={data?.postPaymentInvoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Post Invoice
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchPaymentBox;
