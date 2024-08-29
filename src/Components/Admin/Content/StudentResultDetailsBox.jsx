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
          // console.log(response.data.data)
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
        <div ref={pdfRef} className="w-full relative bg-white h-[992px] overflow-hidden text-center text-xs text-black font-crimson-text">
        <div className="absolute top-[26px] left-[38px] rounded-[20px] bg-gainsboro border-forestgreen border-[2px] border-solid box-border w-[660px] h-[899px]" />
        <img
          className="absolute top-[54px] left-[66px] w-[72px] h-[111px] object-cover"
          alt=""
          src="/logo.png"
        />
        <img
          className="absolute top-[45px] left-[545px] w-[134.3px] h-[113.1px] object-cover"
          alt=""
          src="/ncevt.jpg"
        />
        <div className="absolute top-[60px] left-[178px] w-[348px] h-[104px] text-base ">
          <div className="absolute w-full top-[0%] left-[0%] text-[20px]  font-semibold inline-block">
            Centurion University of Technology and Management
          </div>
          <div className="absolute top-[40.38%] left-[12.26%] text-[18px]">
            (NCVET recognized Awarding Body)
          </div>
          <div className="absolute top-[79.81%] left-[31.26%] text-[16px]">
            Scheme- {batchdata?.scheme}
          </div>
        </div>
        <div className="absolute top-[184px] left-[260px] w-[195px] h-[31px] text-[22px] text-forestgreen ">
          <div className="absolute h-full w-[98.92%] top-[0%] right-[1.08%] bottom-[0%] left-[0%] bg-white border-black border-t-[1px] border-solid  border-b-[1px]  box-border" />
          <b className="absolute top-[16.13%] left-[0%] text-green-500 ml-2">
            M A R K S H E E T
          </b>
        </div>
        <div className="absolute top-[234px] left-[62px] w-[609px] h-[161px] text-[15px]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-white border-gray border-[2px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[0%] right-[69.13%] bottom-[85.73%] left-[0%] bg-white border-gray border-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[14.27%] right-[69.13%] bottom-[71.45%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border"></div>
          <div className="absolute h-[14.27%] w-[30.87%] top-[28.55%] right-[69.13%] bottom-[57.18%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[42.82%] right-[69.13%] bottom-[42.9%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[57.18%] right-[69.13%] bottom-[28.55%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[71.45%] right-[69.13%] bottom-[14.27%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[30.87%] top-[85.73%] right-[69.13%] bottom-[0%] left-[0%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid border-gray border-l-[1px] border-solid box-border" />
          <div className="absolute h-[14.27%] w-[69.13%] top-[0%] right-[0%] bottom-[85.73%] left-[30.87%] bg-white border-gray border-t-[1px] border-solid border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {" "}
            {studentData?.name}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[14.27%] right-[0%] bottom-[71.45%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {" "}
            {studentData?.fathername}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[28.55%] right-[0%] bottom-[57.18%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {studentData?.generalqualification}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[42.82%] right-[0%] bottom-[42.9%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {"********"}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[57.18%] right-[0%] bottom-[28.55%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {batchdata?.courseLevel}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[85.73%] right-[0%] bottom-[0%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
            {studentData?.totalhours}
          </div>
          <div className="absolute h-[14.27%] w-[69.13%] top-[71.45%] right-[0%] bottom-[14.27%] left-[30.87%] bg-white border-gray border-r-[1px] border-solid border-gray border-b-[1px] border-solid box-border">
          {studentData?.sector_name}
          </div>
          <div className="absolute h-[11.15%] w-[23.04%] top-[2.52%] left-[0%] inline-block">
            Name of Candidate:
          </div>
          <div className="absolute h-[11.15%] w-[28.33%] top-[16.79%] left-[-0.21%] inline-block">
            Son/Daughter/Ward of:
          </div>
          <div className="absolute h-[11.15%] w-[23.47%] top-[31.68%] left-[0%] inline-block">
            Qualification Name:
          </div>
          <div className="absolute h-[11.15%] w-[22.62%] top-[45.95%] left-[-0.21%] inline-block">
            Qualification Code:
          </div>
          <div className="absolute h-[11.15%] w-[15.01%] top-[60.23%] left-[0.21%] inline-block">
            NSQF Level:
          </div>
          <div className="absolute h-[11.15%] w-[8.03%] top-[74.5%] left-[0.21%] inline-block">
            Sector:
          </div>
          <div className="absolute h-[11.15%] w-[11.42%] top-[88.17%] left-[0.21%] inline-block">
            Duration:
          </div>
        </div>
  
        <div className="absolute top-[402px] left-[62px] w-[609px] h-[55px] text-[15px]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-white border-gray border-[2px] border-solid box-border"></div>
          <div className="absolute h-[51.14%] w-[33.83%] top-[0%] right-[66.17%] bottom-[48.86%] left-[0%] bg-white border-gray border-[1px] border-solid box-border" />
          <div className="absolute h-[51.14%] w-[32.98%] top-[0%] right-[33.19%] bottom-[48.86%] left-[33.83%] bg-white border-gray border-t-[1px]  border-r-[1px]  border-b-[1px] border-solid box-border" />
          <div className="absolute h-[51.14%] w-[33.19%] top-[0%] right-[0%] bottom-[48.86%] left-[66.81%] bg-white border-gray border-t-[1px]  border-r-[1px]  border-b-[1px] border-solid box-border" />
          <div className="absolute h-[48.86%] w-[33.83%] top-[51.14%] right-[66.17%] bottom-[0%] left-[0%] bg-white border-gray border-r-[1px]  border-b-[1px]  border-l-[1px] border-solid box-border">
           {studentData?.marks?.studentRedgNo}
          </div>
          <div className="absolute h-[48.86%] w-[32.98%] top-[51.14%] right-[33.19%] bottom-[0%] left-[33.83%] bg-white border-gray border-r-[1px]  border-b-[1px] border-solid box-border">
            {studentData?.dob ? studentData.dob.split("T")[0] : "Date not available"}
          </div>
          <div className="absolute h-[48.86%] w-[32.98%] top-[51.14%] right-[0.21%] bottom-[0%] left-[66.81%] bg-white border-gray border-b-[1px] border-solid box-border">
         {"********"}
          </div>
          <div className="absolute h-[37.14%] w-[27.27%] top-[0.86%] left-[3.17%] inline-block">
            Candidate Registration No.
          </div>
          <div className="absolute h-[37.14%] w-[13.11%] top-[0.86%] left-[44.4%] inline-block">
            Date of Birth
          </div>
          <div className="absolute h-[37.14%] w-[21.99%] top-[0.86%] left-[71.67%] inline-block">
            Assessment Batch No.
          </div>
        </div>
        {/* need to make some change here...... */}
        <div className="absolute top-[469px] left-[62px] w-[609px] h-[55px] text-[15px]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-white border-gray border-[1px] border-solid box-border" > Rakesh prdahan</div>
          <div className="absolute h-[51.43%] w-[49.68%] top-[2.86%] right-[50.11%] bottom-[45.71%] left-[0.21%] bg-white border-gray border-r-[1px]  border-b-[1px] border-solid box-border" />
          <div className="absolute h-[51.43%] w-[49.89%] top-[2.86%] right-[0.21%] bottom-[45.71%] left-[49.89%] bg-white border-gray border-b-[1px] border-solid box-border" />
          <div className="absolute h-[37.14%] w-[21.99%] top-[5.71%] left-[11.21%] inline-block">
            Assessment Agency
          </div>
          <div className="absolute h-[37.14%] w-[21.99%] top-[5.71%] left-[62.79%] inline-block">
            Assessment Date
          </div>
          <div className="absolute h-[45.71%] w-[49.68%] top-[54.29%] right-[50.11%] bottom-[0%] left-[0.21%] bg-white border-gray border-r-[1px]   border-solid box-border" >{studentData?.marks?.AssesmentAgencyName}</div>
          <div className="absolute h-[45.71%] w-[49.68%] top-[54.29%]  bottom-[0%] left-[49.91%] bg-white border-gray  border-solid box-border" >{studentData?.mark?.examDate 
                ? studentData.mark.examDate.split("T")[0] 
                : "Date not available"}</div>
        </div>
        <div className="absolute top-[535px] left-[62px] w-[609px] h-[153px] text-[15px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-gray border-[1px] border-solid box-border px-1 font-medium">
                  NOS Code
                </th>
                <th className="border-gray border-[1px] border-solid box-border px-1 font-medium">
                  NOS Name
                </th>
                <th className="border-gray border-[1px] border-solid box-border px-1 font-medium">
                  Maximum Marks
                </th>
                <th className="border-gray border-[1px] border-solid box-border px-1 font-medium">
                  Marks Obtained
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData?.marks?.Nos.map((nos, index) => (
                <tr key={index}>
                  <td className="border-gray border-[1px] border-solid box-border px-1 py-[3px]">
                    {nos.code}
                  </td>
                  <td className="border-gray border-[1px] border-solid box-borderpx-1 py-[3px]">
                    {nos.name}
                  </td>
                  <td className="border-gray border-[1px] border-solid box-border px-1 py-[3px]">
                    {nos.Total}
                  </td>
                  <td className="border-gray border-[1px] border-solid box-border px-1 py-[3px]">
                    {nos.MarksObtained}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute top-[699px] left-[63px] w-[609px] h-[64px] text-[15px]">
          <div className="absolute top-[0px] left-[-1px] bg-white border-gray border-[1px] border-solid box-border w-[472px] h-[54px]" />
          <div className="absolute h-[33.33%] w-[42.46%] top-[0%] right-[57.54%] bottom-[66.67%] left-[0%] bg-white border-gray border-t-[1px] border-r-[1px]  border-b-[1px] border-solid box-border" />
          <div className="absolute h-[33.33%] w-[42.46%] top-[33.33%] right-[57.54%] bottom-[33.33%] left-[0%] bg-white border-gray border-r-[1px] border-b-[1px] border-solid box-border" />
          <div className="absolute h-[33.33%] w-[42.46%] top-[66.67%] right-[57.54%] bottom-[0%] left-[0%] bg-white border-gray border-r-[1px] border-b-[1px] border-solid box-border" />
          <div className="absolute h-[33.33%] w-[57.54%] top-[0%] right-[0%] bottom-[66.67%] left-[42.46%] bg-white border-gray border-t-[1px] border-r-[1px]  border-b-[1px] border-solid box-border" >{studentData?.marks?.total}</div>
          <div className="absolute h-[33.33%] w-[57.54%] top-[31.67%] right-[0%] bottom-[35%] left-[42.46%] bg-white border-gray border-t-[1px] border-r-[1px] border-solid box-border" >{studentData?.Grade}</div>
          <div className="absolute h-[33.33%] w-[57.54%] top-[65%] right-[0%] bottom-[1.67%] left-[42.46%] bg-white border-gray border-t-[1px] border-r-[1px] border-solid box-border" >{studentData?.marks?.Result}</div>
          <div className="absolute h-[26.67%] w-[22.08%] top-[1.67%] left-[9.34%] inline-block">
            Total Marks Obtained
          </div>
          <div className="absolute h-[26.67%] w-[6.16%] top-[38.33%] left-[17.41%] inline-block">
            Grade
          </div>
          <div className="absolute h-[26.67%] w-[6.37%] top-[70%] left-[17.2%] inline-block">
            Result
          </div>
        </div>
          {/* function for qr code */}
          
        <div className="absolute top-[769px] left-[99px]  ">
        <QRCode value={`https://student-details-by-qr-scan.vercel.app/${studentData?._id}`} size={50} />
        </div>
        <b className="absolute top-[819px] left-[309px] text-3xs-5">
          <p className="m-0">Head – Centre for Skill Certification</p>
          <p className="m-0">Centurion University of Technology and Management</p>
        </b>
        <b className="absolute top-[819px] left-[73px] text-3xs-5">
          <p className="m-0">Date of Issue: DD-MM-YYYY</p>
          <p className="m-0">Certificate No: XXXXXXXX</p>
        </b>
      </div>

       <div className="w-[900px] mx-auto px-4 flex justify-end">
        {" "}
        <Button onClick={downloadPdf}>Download <Download className="ml-2" /></Button>{" "}
      </div>
    </>
  );
};

export default StudentResultDetailsBox;

