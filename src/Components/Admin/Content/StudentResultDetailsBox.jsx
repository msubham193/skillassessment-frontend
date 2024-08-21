/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components(shadcn)/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { server } from "@/main";
import axios from "axios"; 
import { Download } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components(shadcn)/ui/card";
import QRCode from "qrcode.react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components(shadcn)/ui/table";

const StudentResultDetailsBox = ({ id }) => {  
  // console.log(id)  
  const [data, setData] = useState({});
  const [studentdata, setStudentdata] = useState({});
  const [qrcodedata, setQrcodedata] = useState({});
  const [certificatedata, setCertificatedatadata] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [loding, setLoding] = useState(false);

  //function for retrive the student result by id
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/marks/student/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setData(response.data.data);
          console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, []);

  //need to get student details usinfstudent id....
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/student/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setStudentdata(response.data.data);
          setBatchId(response.data.data.enrolledBatch)
          console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, []);
  //function for retrive the certificate result by id
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/certificate/batch/${batchId}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setCertificatedatadata(response.data.data);
          // setBatchId(response.data.data)
          console.log(batchId)
          console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, [batchId]);


  const displayData = JSON.stringify(data, null, 2);
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
        {/*  here is the update marksheet... */}
        <div
      ref={pdfRef}
      className="w-[210mm] h-[275mm] mx-auto p-8 border border-green-600 font-cambria text-sm"
    >
      <div className="flex justify-between items-start mb-1">
        <img src="/cutm.jpg" alt="Centurion University Logo" className="w-20 h-28" />
        <div className="text-center flex-grow">
          <h1 className="text-2xl font-bold mb-2">
            Centurion University of Technology and Management
          </h1>
          <p className="text-lg mb-2">(NCVET recognized Awarding Body)</p>
          <p className="text-lg mb-2">Scheme- <span>{}</span></p>
          <h2 className="text-2xl font-bold text-green-600 border-t-2 border-b-2 border-green-600 inline-block px-4 py-1">
            M A R K S H E E T
          </h2>
        </div>
        <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-28" />
      </div>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Name of Candidate:</td>
            <td className="border px-2 py-1 w-2/3">{studentdata?.name}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Son/Daughter/Ward of:</td>
            <td className="border px-2 py-1 w-2/3">{studentdata?.fathername}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Qualification Name:</td>
            <td className="border px-2 py-1 w-2/3">{studentdata?.generalqualification}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Qualification Code:</td>
            <td className="border px-2 py-1 w-2/3">{}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">NSQF Level:</td>
            <td className="border px-2 py-1 w-2/3">{}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Sector:</td>
            <td className="border px-2 py-1 w-2/3">{studentdata?.sector_name}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Duration:</td>
            <td className="border px-2 py-1 w-2/3">{studentdata?.totalhours}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border px-1 py-1 w-1/3">Candidate Registration No.</td>
            <td className="border px-1 py-1 w-1/3">Date of Birth</td>
            <td className="border px-1 py-1 w-1/3">Assessment Batch No.</td>
          </tr>
          <tr className="text-center">
            <td className="border px-1 py-1">{studentdata?.redg_No}</td>
            <td className="border px-1 py-1">{studentdata?.dob ? studentdata.dob.split("T")[0] : "Date not available"}</td>
            <td className="border px-1 py-1">{}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border px-1 py-1 w-1/2">Assessment Agency </td>
            <td className="border px-1 py-1 w-1/2">Assessment Date</td>
          </tr>
          <tr className="text-center">
            <td className="border px-1 py-1">{studentdata?.marks?.AssesmentAgencyName}</td>
            <td className="border px-1 py-1">{studentdata?.mark?.examDate 
              ? studentdata.mark.examDate.split("T")[0] 
              : "Date not available"}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <thead>
          <tr>
            <th className="border px-1 py-1 font-medium">NOS Code</th>
            <th className="border px-1 py-1 font-medium">NOS Name</th>
            <th className="border px-1 py-1 font-medium">Maximum Marks</th>
            <th className="border px-1 py-1 font-medium">Marks Obtained</th>
          </tr>
        </thead>
     
       
           <tbody>
          {studentdata?.marks?.Nos.map((nos, index) => (
            <tr key={index}>
              <td className="border px-1 py-1">{nos.code}</td>
              <td className="border px-1 py-1">{nos.description}</td>
              <td className="border px-1 py-1">{nos.Total}</td>
              <td className="border px-1 py-1">{nos.MarksObtained}</td>
            </tr>
          ))}
        </tbody>
         

      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">Total Marks Obtained</td>
            <td className="w-1/2 border px-1 py-1 text-center">{}</td>
          </tr>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">Grade</td>
            <td className="w-1/2 border px-1 py-1 text-center">{studentdata?.Grade}</td>
          </tr>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">Result</td>
            <td className="w-1/2 border px-1 py-1 text-center font-bold">{studentdata?.marks?.Result}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-end mt-4">
        <div>
        <QRCode value={`https://student-details-by-qr-scan.vercel.app/${studentdata?._id}`} size={60} />
          <div className="text-sm">
            <p>Date of Issue: <span>{}</span></p>
            <p>Certificate No: <span>{}</span></p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold mb-4">Head – Centre for Skill Certification</p>
          <p>Centurion University of Technology and Management</p>
        </div>
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

