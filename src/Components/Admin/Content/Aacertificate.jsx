import React, { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { Document, Page } from "react-pdf";
import { Button } from "@/components(shadcn)/ui/button";

const Aacertificate = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (data) {
      generatePDF();
    }
  }, [data]);

  const generatePDF = async () => {
    const existingPdfBytes = await fetch("/assessment.pdf").then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(data.name, { x: 100, y: 700, size: 24, color: rgb(0, 0, 0) });
    firstPage.drawText(data.ward, { x: 100, y: 670, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.dob, { x: 100, y: 640, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.assessorID, { x: 100, y: 610, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.qualificationName, { x: 100, y: 580, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.duration, { x: 100, y: 550, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.earned, { x: 100, y: 520, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.nsqfLevel, { x: 100, y: 490, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.centerplace, { x: 100, y: 460, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.District, { x: 100, y: 430, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.State, { x: 100, y: 400, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.placeOfIssue, { x: 100, y: 370, size: 18, color: rgb(0, 0, 0) });
    firstPage.drawText(data.dateOfIssue, { x: 100, y: 340, size: 18, color: rgb(0, 0, 0) });

    const jpgImageBytes = await data.assessorPic.arrayBuffer();
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    firstPage.drawImage(jpgImage, { x: 400, y: 600, width: 100, height: 100 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const handleDownload = () => {
    saveAs(pdfUrl, "Aacertificate.pdf");
  };

  return (
    <div className="mt-8 text-center">
      <div>
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
     
    </div>
  );
}

export default Aacertificate;
