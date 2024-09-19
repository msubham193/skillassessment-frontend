import { Button } from "@/components(shadcn)/ui/button";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import { server } from "@/main";
import axios from "axios";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBatchBox = () => {   
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPreInvoice, setShowPreInvoice] = useState(false); 
  const [showPostInvoice, setShowPostInvoice] = useState(false);
  const [isBatchApproved, setIsBatchApproved] = useState(false);

  // Function for fetching batch by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/batch/${id}`, {
          withCredentials: true,
        });
        setData(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching batch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id,isBatchApproved]);

  // Function for approving the payment
  const batchApproved = async () => {
    setLoading(true);

    try {
      const response = await axios.put(
        `${server}/batch/paymentstatus/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsBatchApproved(true); 
      setLoading(false);
      toast.success(response.data.message, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Top Bar */}
      <TopBar />
      {/* Side bar */}
      <div className="min-h-screen bg-white text-black flex">
        <SideNav />

        {/* Main page */}
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Approve batch!
              </h2>
              <p className="text-muted-foreground">
                Here's where you can verify all payments!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Add the functionality like search and filter */}
              {/* For now there is nothing to add in future if there is some data then we will put there */}
            </div>
          </div>
          {/* Details of Training Partner */}
          <div className="w-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Batch ID*</h3>
                <p className="text-lg ">{data?._id}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Batch ABN ID*</h3>
                <p className="text-lg ">{data?.ABN_Number}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Created By*</h3>
                <p className="text-lg ">{data?.trainingOrganization}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">No of Student*</h3>
                <p className="text-lg text-blue-700 ">
                  {data?.students?.length}
                </p>
              </div>

              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">
                  Batch Under Scheme*
                </h3>
                <p className="text-lg font-semibold ">{data?.scheme}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Total Amount*</h3>
                <p className="text-lg text-blue-700">{data?.amountToPaid}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">
                  Client-side Payment*
                </h3>
                <p className="text-lg font-semibold text-green-600 ">
                  {data?.clientPaymentStatus ? "Paid" : "Not Paid"}
                </p>
              </div>
              <div className="p-3 ">
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
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">View Post Invoice*</h3>
                {data?.clientPaymentStatus ? (
                  <Button onClick={() => setShowPostInvoice(!showPostInvoice)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Post Invoice
                  </Button>
                ) : (
                  <p className="text-lg text-red-600 ">Payment Not Completed</p>
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
              
              <div>
              
              </div>
              <div className="flex justify-start w-full">
                <Button
                  onClick={batchApproved}
                  className="bg-green-600 hover:bg-green-400 w-full md:w-auto ml-3"
                  disabled={!data.clientPaymentStatus || data.paymentStatus || isBatchApproved}
                >
                  {loading
                    ? "Loading..."
                    : data?.paymentStatus === true
                    ? "Payment successful"
                    : "Approve Batch"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBatchBox;
