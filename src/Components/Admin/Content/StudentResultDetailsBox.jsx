/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components(shadcn)/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { server } from "@/main";
import axios from "axios"; 
import { Download } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components(shadcn)/ui/card";
import QRCode from "qrcode.react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components(shadcn)/ui/table";
import GenerateMarksheetFrom from "@/Components/Traning Partner/ui/Marksheet/generateMarkFrom";
import { useReactToPrint } from "react-to-print";

const StudentResultDetailsBox = ({ id }) => {  
  const componentRef = useRef();
  const [studentData, setStudentData] = useState({}); 
  const [certificatedata, setCertificatedatadata] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [batchdata, setBatchdata] = useState({});
  const [loding, setLoding] = useState(false);

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
          setStudentData(response.data.data);
          console.log(response.data.data)
          setBatchId(response.data.data.enrolledBatch)
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
          // console.log(batchId)
          console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, [batchId]);

  // function for fetch batch detais of the student
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/batch/${batchId}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        })
        .then((response) => {
          setLoding(false);
          setBatchdata(response.data.data);
          // setBatchId(response.data.data)
          // console.log(batchId)
          // console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, [batchId]);



   //function for handel marksheet generation
  
   const handleGenerateMarkSheet = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'MarkSheet', 
});

const generateMarksheet=()=>
{
  if (id && studentData) {
    handleGenerateMarkSheet();
}
}

//generate data for marksheet
const generateDummyData = useCallback((student) => {
  if (!student) return null;

  return {
    schemCode: student?.marks?.TrainingPartner || 'N/A',
    name: student?.name || 'Loading...',
    ward: student?.fathername || 'Loading...',
    qualificationName: student?.course || 'Loading...',
    qualificationCode: student?.marks?.batchABN ? student?.marks?.batchABN.split('/')[1] : 'N/A',
    nsqfLevel: '5', 
    sector: student?.sector_name || 'Loading...',
    duration: `${student?.totaldays || 'N/A'} days`,
    assessorRegNo: 'AR123456', 
    dob: student?.dob ? student?.dob.split('T')[0] : 'Loading...',
    assessmentBatchNo: student?.marks?.batchABN || 'N/A',
    assessmentDate: student?.marks?.examDate ? new Date(student?.marks?.examDate).toISOString().split('T')[0] : 'N/A',
    nosMarks: student?.marks?.Nos?.map((nos, index) => ({
      code: `NOS${index + 1}`,
      name: nos?.name || 'Loading...',
      type: 'Theory', 
      maxMarks: nos?.passMark || 0,
      marksObtained: nos?.MarksObtained || 0
    })) || [],
    totalMarks: student?.marks?.total || 0,
    grade: student?.marks?.Grade || 'N/A',
    result: student?.marks?.Result || 'N/A',
    dateOfIssue: new Date().toISOString().split('T')[0], 
    certificateNo: `CERT${student?.redg_No || 'N/A'}`,
    studentId:id,
  
  };
}, []);
  return (
    <>  
        {/*  here is the update marksheet... */}
        <GenerateMarksheetFrom
                    ref={componentRef} 
                    data={id && studentData ? generateDummyData(studentData) : null} 
                />

       <div className="w-[900px] mx-auto px-4 flex justify-end">
        {" "}
        <Button onClick={generateMarksheet}>Download <Download className="ml-2" /></Button>{" "}
      </div>
    </>
  );
};

export default StudentResultDetailsBox;

