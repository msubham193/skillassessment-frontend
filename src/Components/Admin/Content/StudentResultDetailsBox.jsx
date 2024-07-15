import { Button } from "@/components(shadcn)/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { server } from "@/main";
import axios from "axios";
import { Download } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const StudentResultDetailsBox = ({ id }) => {
  // console.log(id)
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);

  //function for retrive the student result by id

  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/mark/student/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoding(false);
          setData(response.data.data);
          // console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //code for download the marksheet..
  const pdfRef=useRef();

  const downloadPdf=()=>
  {
        const input=pdfRef.current;
        html2canvas(input).then((canvas)=>{
          const imgData=canvas.toDataURL('image/png');
          const pdf=new jsPDF('p','mm','a4',true);
          const pdfWidth=pdf.internal.pageSize.getWidth();
          const pdfHight=pdf.internal.pageSize.getHeight();
          const imgWidth=canvas.width;
          const imgHight=canvas.height;
          const ratio=Math.min(pdfWidth/imgWidth,pdfHight/imgHight);
          const imgX=(pdfWidth-imgWidth*ratio)/2;
          const imgY=30;
          pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHight*ratio);
          pdf.save('marksheet.pdf');

        })
  }

  return (
    <>
      <div className="w-[900px] mx-auto p-4 bg-white border rounded-md shadow-md" ref={pdfRef}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-center">Marksheet</h1>
            <p className="text-center text-lg">ABN no.{data?.batchABN}</p>
            <p className="text-center text-lg">{formatDate(data?.examDate)}</p>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/placeholder.svg"
              alt="Student"
              className="w-24 h-24 rounded-full border"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Student Name:</strong> {data?.studentName}
            </p>
            <p>
              <strong>Regd. No.:</strong> {data?.studentRedgNo}
            </p>
            <p>
              <strong> AssesmentAgencyName:</strong> {data?.AssesmentAgencyName}
            </p>
          </div>
          <div>
            <p>
              <strong>TrainingPartner:</strong> {data?.TrainingPartner}
            </p>
            <p>
              <strong>centerCode:</strong> {data?.centerCode}
            </p>
            <p>
              <strong>sectorName:</strong> {data?.sectorName}
            </p>
          </div>
        </div>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Theory Marks</th>
              <th className="border p-2">Viva Marks</th>
              <th className="border p-2">Practical Marks</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{data?.Theory}</td>
              <td className="border p-2">{data?.viva}</td>
              <td className="border p-2">{data?.practical}</td>
              <td className="border p-2">{data?.total}</td>
              <td className="border p-2">{data?.Result}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p>
            <strong>Grand Total:</strong> {data?.total}
          </p>
          <p className="text-green-600 font-bold">Passed</p>
        </div>
      </div>

      <div className="w-[900px] mx-auto px-4 flex justify-end">
        {" "}
        <Button onClick={downloadPdf}>Download <Download className="ml-2" /></Button>{" "}
      </div>
    </>
  );
};

export default StudentResultDetailsBox;
