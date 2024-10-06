import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components(shadcn)/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components(shadcn)/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components(shadcn)/ui/card";
import Preinvoice from "@/Components/Traning Partner/ui/invoice/Preinvoice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { server } from "@/main";
import { useNavigate } from "react-router-dom";

const ManageBatchForm = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [batchStatuses, setBatchStatuses] = useState({});
  const [batchTransactionIds, setBatchTransactionIds] = useState({});
  const [batchFiles, setBatchFiles] = useState({});
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatingInvoices, setGeneratingInvoices] = useState({});
  const [uploading, setUploading] = useState({});
  const [paymentModes, setPaymentModes] = useState({});
  const [paymentPublishedBy, setPaymentPublishedBy] = useState({});
  const invoiceRef = useRef(null);

  const handleStatusChange = (newStatus, batchId) => {
    setBatchStatuses((prev) => ({ ...prev, [batchId]: newStatus }));
    if (newStatus === "Online") {
      window.open("https://razorpay.com/payment-link", "_blank");
    }
  };

  const handlePaymentModeChange = (mode, batchId) => {
    setPaymentModes((prev) => ({ ...prev, [batchId]: mode }));
  };

  const handlePaymentPublishedByChange = (method, batchId) => {
    setPaymentPublishedBy((prev) => ({ ...prev, [batchId]: method }));
  };

  const fetchBatches = async () => {
    const tpid = localStorage.getItem("trainingPartnerId");
    try {
      setIsLoading(true);
      const response = await fetch(`${server}/batch/tp/${tpid}`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
       
        setBatches(data.data);
      
      } else {
        console.error("Failed to fetch batches");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);
  
  const handleFileChange = (e, batchId, fileType) => {
    setBatchFiles((prev) => ({
      ...prev,
      [batchId]: { ...prev[batchId], [fileType]: e.target.files[0] },
    }));
  };

  const generatePDF = async (batch) => {
    setSelectedBatch(batch);
    setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: true }));
  
    await new Promise(resolve => setTimeout(resolve, 0));
  
    const input = invoiceRef.current;
    if (!input) {
      console.error("Invoice ref is null");
      setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
      return;
    }
  
    try {
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
      setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
    }
  };

  const handleUploadData = async (batchId) => {
    if (batches.find(batch => batch._id === batchId).paymentStatus) {
      toast.error("Sorry, the invoice has already been uploaded.");
      return;
    }

    setUploading((prev) => ({ ...prev, [batchId]: true }));
    const formData = new FormData();
    formData.append("preInvoice", batchFiles[batchId]?.preInvoice);
    formData.append("postInvoice", batchFiles[batchId]?.postInvoice);
    formData.append("transactionId", batchTransactionIds[batchId]);
    formData.append("paymentMode", paymentModes[batchId]);
    formData.append("paymentPublishedBy", paymentPublishedBy[batchId]);

    try {
      const response = await fetch(`${server}/batch/paymentdetails/${batchId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Data uploaded successfully");

        setBatchFiles((prev) => ({
          ...prev,
          [batchId]: { preInvoice: null, postInvoice: null },
        }));
        setBatchTransactionIds((prev) => ({
          ...prev,
          [batchId]: '',
        }));

        // Update the batch's paymentStatus in the local state
        setBatches(prevBatches => 
          prevBatches.map(batch => 
            batch._id === batchId ? { ...batch, paymentStatus: true } : batch
          )
        );
      } else {
        console.error("Failed to upload data");
        toast.error("Failed to upload data");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("Error uploading data");
    } finally {
      setUploading((prev) => ({ ...prev, [batchId]: false }));
    }
  };

  const filteredBatches = batches.filter(batch => 
    batch.amountToPaid !== 0 && 
    batch.batchActivePermission === true &&
    (batch.courseName.toLowerCase().includes(filter.toLowerCase()) ||
     batch.ABN_Number.includes(filter))
  );

  return (
    <Card className="w-full mx-auto mt-8">
    <div className="mt-3 ml-3">
      <Button
        onClick={() => navigate("/trainingPartner/dashboard")}
        className="mb-4 bg-gray-200 text-indigo-600 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Back to Dashboard
      </Button>
    </div>
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Manage Batches</CardTitle>
    </CardHeader>
    <CardContent>
      <Input
        placeholder="Filter batches..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 max-w-md"
      />
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">Index</TableHead>
              <TableHead className="font-semibold">Course Name</TableHead>
              <TableHead className="font-semibold">ABN</TableHead>
              <TableHead className="font-semibold">Generate PreInvoice</TableHead>
              <TableHead className="font-semibold">Payment Mode</TableHead>
              <TableHead className="font-semibold">Payment Published By</TableHead>
              <TableHead className="font-semibold">Transaction/UTR ID</TableHead>
              <TableHead className="font-semibold">PreInvoice</TableHead>
              <TableHead className="font-semibold">PostInvoice</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch, index) => (
              <TableRow 
                key={batch._id}
                className={`
                  ${batch.paymentStatus 
                    ? 'bg-gray-200 hover:bg-gray-200' 
                    : 'bg-white'}
                  ${index !== filteredBatches.length - 1 ? 'border-b' : ''}
                  transition-colors
                `}
              >
                <TableCell className="py-4">{index + 1}</TableCell>
                <TableCell className="py-4">{batch.courseName}</TableCell>
                <TableCell className="py-4">{batch.ABN_Number}</TableCell>
                <TableCell className="py-4">
                  <Button 
                    onClick={() => generatePDF(batch)} 
                    disabled={generatingInvoices[batch._id] || batch.paymentStatus}
                    className="w-full max-w-[120px]"
                  >
                    {generatingInvoices[batch._id] ? "Generating..." : "Generate"}
                  </Button>
                </TableCell>
                <TableCell className="py-4">
                  <Select
                    value={paymentModes[batch._id] || ""}
                    onValueChange={(value) => handlePaymentModeChange(value, batch._id)}
                    disabled={batch.paymentStatus}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="py-4">
                  <Select
                    value={paymentPublishedBy[batch._id] || ""}
                    onValueChange={(value) => handlePaymentPublishedByChange(value, batch._id)}
                    disabled={batch.paymentStatus}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD">DD</SelectItem>
                      <SelectItem value="NEFT">NEFT</SelectItem>
                      <SelectItem value="RTGS">RTGS</SelectItem>
                      <SelectItem value="IMPS">IMPS</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="py-4">
                  <Input
                    placeholder={paymentModes[batch._id] === "Online" ? "UTR ID" : "Transaction ID"}
                    value={batchTransactionIds[batch._id] || ""}
                    onChange={(e) => setBatchTransactionIds((prev) => ({
                      ...prev,
                      [batch._id]: e.target.value,
                    }))}
                    className="max-w-[150px]"
                    disabled={batch.paymentStatus}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, batch._id, "preInvoice")}
                    className="max-w-[200px]"
                    disabled={batch.paymentStatus}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, batch._id, "postInvoice")}
                    className="max-w-[200px]"
                    disabled={batch.paymentStatus}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <Button
                    onClick={() => handleUploadData(batch._id)}
                    disabled={uploading[batch._id] || !batchFiles[batch._id]?.preInvoice || !batchFiles[batch._id]?.postInvoice || batch.paymentStatus}
                    className="w-full max-w-[140px]"
                  >
                    {uploading[batch._id] ? "Uploading..." : "Upload Invoices"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
    <div style={{ position: "absolute", left: "-9999px" }}>
      <div ref={invoiceRef}>
        <Preinvoice batch={selectedBatch} />
      </div>
    </div>
  </Card>
  );
};

export default ManageBatchForm;