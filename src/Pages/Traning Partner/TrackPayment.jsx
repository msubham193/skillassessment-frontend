import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideNav from "@/Components/Traning Partner/SideNav";
import TopBar from "@/Components/Traning Partner/TopBar";
import BankReceipt from "@/Components/Traning Partner/ui/BankRecipt/GenerateBankRecipt";
import { server } from "@/main";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Loader2 } from "lucide-react";

const TrackPayment = () => {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tpid = localStorage.getItem("trainingPartnerId");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${server}/batch/tp/${tpid}`);
      console.log(response);
      setBatches(response.data.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
      toast.error("Failed to fetch batches");
    }
    setIsLoading(false);
  };

  const filteredBatches = batches.filter(
    (batch) => batch.paymentStatus === true
  );

  const handleDownloadReceipt = async (batch) => {
    const receiptComponent = (
      <BankReceipt
        receivedFrom={batch.trainingOrganization}
        batchNo={batch.ABN_Number.slice(-2)}
        abnNo={batch.ABN_Number}
        projectName={batch.courseName}
        amountReceived={batch.amountToPaid.toString()}
        fundReceivedBy={batch.paymentPublishedBy}
        fundTransferDetails={batch.transactionId || "N/A"}
        transferDate={new Date(batch.updatedAt).toLocaleDateString()}
      />
    );

    const receiptDiv = document.createElement("div");
    document.body.appendChild(receiptDiv);

    const root = createRoot(receiptDiv);
    root.render(receiptComponent);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const input = receiptDiv.firstChild;
      const canvas = await html2canvas(input, { scale: 3 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`PaymentReceipt_${batch.ABN_Number}.pdf`);
      toast.success("Receipt downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      root.unmount();
      document.body.removeChild(receiptDiv);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Download Receipt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Index</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Batch ABN</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : filteredBatches.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No paid batches found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBatches.map((batch,index) => (
                        <TableRow key={batch._id}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell className="font-medium">
                            {batch.courseName}
                          </TableCell>
                          <TableCell>{batch.ABN_Number}</TableCell>
                          <TableCell>
                            <span className=" text-center inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Paid
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleDownloadReceipt(batch)}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Download Receipt
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default TrackPayment;
