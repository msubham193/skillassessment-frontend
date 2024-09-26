import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import SideNav from "@/Components/Traning Partner/SideNav";
import TopBar from "@/Components/Traning Partner/TopBar";
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
import BankReceipt from "@/Components/Traning Partner/ui/BankRecipt/GenerateBankRecipt";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from 'react-toastify'; // Import toast for error handling

const TrackPayment = () => {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchBatches = () => {
      setTimeout(() => {
        setBatches([
          {
            _id: "1",
            courseName: "Web Development",
            ABN_Number: "ABN123456",
            paymentStatus: true,
            trainingPartnerName: "Tech Training Co.",
            batchNo: "BATCH001",
            projectName: "Web Dev Project",
            amountToPaid: 10000,
            transactionId: "TXN987654",
            paymentDate: "2023-09-15"
          },
          {
            _id: "2",
            courseName: "Data Science",
            ABN_Number: "ABN789012",
            paymentStatus: true,
            trainingPartnerName: "Data Experts Inc.",
            batchNo: "BATCH002",
            projectName: "Data Analysis Project",
            amountToPaid: 15000,
            transactionId: "TXN123456",
            paymentDate: "2023-09-20"
          },
        ]);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchBatches();
  }, []);

  const filteredBatches = batches.filter((batch) => batch.paymentStatus === true);

  const handleDownloadReceipt = async (batch) => {
    const receiptComponent = (
      <BankReceipt
        receivedFrom={batch.trainingPartnerName}
        batchNo={batch.batchNo}
        abnNo={batch.ABN_Number}
        projectName={batch.projectName}
        amountReceived={batch.amountToPaid.toString()}
        fundReceivedBy="DD/NEFT/RTGS/IMPS"
        fundTransferDetails={batch.transactionId || "N/A"}
        transferDate={new Date(batch.paymentDate).toLocaleDateString()}
      />
    );

    const receiptDiv = document.createElement('div');
    document.body.appendChild(receiptDiv);
    
    const root = createRoot(receiptDiv);
    root.render(receiptComponent);

    try {
      // Wait for the component to render
      await new Promise(resolve => setTimeout(resolve, 100));

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

      pdf.addImage(imgData, "JPEG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`preinvoice_${batch.ABN_Number}.pdf`);
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
            <h1 className="text-2xl font-semibold mb-6">Download Receipt</h1>
            <Table>
              <TableCaption>A list of batches with payment status</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Batch ABN</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Download Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredBatches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No batches found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBatches.map((batch) => (
                    <TableRow key={batch._id}>
                      <TableCell>{batch.courseName}</TableCell>
                      <TableCell>{batch.ABN_Number}</TableCell>
                      <TableCell>
                        {batch.paymentStatus ? "Paid" : "Unpaid"}
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={!batch.paymentStatus}
                          onClick={() => handleDownloadReceipt(batch)}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackPayment;