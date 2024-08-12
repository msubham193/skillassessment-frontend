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

const ManageBatchForm = () => {
  const [batches, setBatches] = useState([]);
  const [batchStatuses, setBatchStatuses] = useState({});
  const [batchTransactionIds, setBatchTransactionIds] = useState({});
  const [batchFiles, setBatchFiles] = useState({});
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatingInvoices, setGeneratingInvoices] = useState({});
  const [uploading, setUploading] = useState({});
  const invoiceRef = useRef(null);

  const handleStatusChange = (newStatus, batchId) => {
    setBatchStatuses((prev) => ({ ...prev, [batchId]: newStatus }));
    if (newStatus === "Online") {
      window.open("https://razorpay.com/payment-link", "_blank");
    }
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

    // Wait for the next render cycle to ensure the invoice content is updated
    await new Promise(resolve => setTimeout(resolve, 0));

    const input = invoiceRef.current;
    if (!input) {
      console.error("Invoice ref is null");
      setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

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
      const imgY = 30; // Add some top margin

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`preinvoice_${batch.ABN_Number}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
    }const generatePDF = async (batch) => {
      setSelectedBatch(batch);
      setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: true }));
  
      // Wait for the next render cycle to ensure the invoice content is updated
      await new Promise(resolve => setTimeout(resolve, 0));
  
      const input = invoiceRef.current;
      if (!input) {
        console.error("Invoice ref is null");
        setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
        return;
      }
  
      try {
        // Reduce scale to lower the resolution and file size
        const canvas = await html2canvas(input, { scale: 1.5 });  // Lower scale for less resolution
        const imgData = canvas.toDataURL("image/jpeg", 0.7);  // Use JPEG format and set quality to 0.7
  
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
        const imgY = 30; // Add some top margin
  
        pdf.addImage(imgData, "JPEG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`preinvoice_${batch.ABN_Number}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast.error("Failed to generate PDF");
      } finally {
        setGeneratingInvoices((prev) => ({ ...prev, [batch._id]: false }));
      }
    };
  
  };

  const handleUploadData = async (batchId) => {
    setUploading((prev) => ({ ...prev, [batchId]: true }));
    const formData = new FormData();
    formData.append("preInvoice", batchFiles[batchId]?.preInvoice);
    formData.append("postInvoice", batchFiles[batchId]?.postInvoice);
    formData.append("transactionId", batchTransactionIds[batchId]);

    try {
      const response = await fetch(`${server}/batch/paymentdetails/${batchId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Data uploaded successfully");

        // Reset the fields
        setBatchFiles((prev) => ({
          ...prev,
          [batchId]: { preInvoice: null, postInvoice: null },
        }));
        setBatchTransactionIds((prev) => ({
          ...prev,
          [batchId]: '',
        }));
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
      <CardHeader>
        <CardTitle>Manage Batches</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Filter batches..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4"
        />
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>ABN</TableHead>
                <TableHead>Generate PreInvoice</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>PreInvoice</TableHead>
                <TableHead>PostInvoice</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch._id}>
                  <TableCell>{batch.courseName}</TableCell>
                  <TableCell>{batch.ABN_Number}</TableCell>
                  <TableCell>
                    <Button onClick={() => generatePDF(batch)} disabled={generatingInvoices[batch._id]}>
                      {generatingInvoices[batch._id] ? "Generating..." : "Generate"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue="offline"
                      onValueChange={(value) => handleStatusChange(value, batch._id)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Transaction ID"
                      value={batchTransactionIds[batch._id] || ""}
                      onChange={(e) => setBatchTransactionIds((prev) => ({
                        ...prev,
                        [batch._id]: e.target.value,
                      }))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, batch._id, "preInvoice")}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, batch._id, "postInvoice")}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleUploadData(batch._id)}
                      disabled={uploading[batch._id] || !batchFiles[batch._id]?.preInvoice || !batchFiles[batch._id]?.postInvoice}
                      className="ml-2"
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
