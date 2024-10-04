/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components(shadcn)/ui/button";
import { server } from "@/main";
import axios from "axios"; 
import { Download } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GenerateMarksheetFrom from "@/Components/Traning Partner/ui/Marksheet/generateMarkFrom";
import { useReactToPrint } from "react-to-print";
import ViewSectorAndCourse from "./ViewSectorAndCourse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components(shadcn)/ui/tabs";
import GenerateCertificate from "@/Components/Traning Partner/ui/Certificate/GenerateCertificate";

const StudentResultDetailsBox = ({ id }) => {  
  const [currentStudentId, setCurrentStudentId] = useState(null); 
  const [documentType, setDocumentType] = useState(null);
  const query = new URLSearchParams(location.search); 
  const defaultTab = query.get("tab") || "overview"; 
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const componentRef = useRef();
  const certificateRef = useRef();
  const [studentData, setStudentData] = useState({});  
  const [certificatedata, setCertificatedatadata] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [batchdata, setBatchdata] = useState({});
  const [loding, setLoding] = useState(false);
//make the change in this component ony...........
  //need to get student details using student id....
  useEffect(() => {
    setSelectedTab(defaultTab); 
  }, [defaultTab]);
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

  //function for gete the result from certificate

  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/certificate/student/${id}`, {
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
          // console.log(response.data.data);
          console.log(response.data.data)
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching studen result:", error);
      throw error;
    }
  }, []);

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
      type: nos?.nosType ||"N/A", 
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

//function for generate data for certificate
  const generateCertificateData = useCallback((data) => {
    if (!data) return null;
    return {
      name: data.studentName,
      fatherName: data.fatherName,
      dateOfBirth: new Date(data.DOB).toISOString().split("T")[0],
      enrollmentNumber: data.Enrolment_number,
      subject: data.qualification,
      duration: `${data.duration} days`,
      credit: data.credit,
      level: data.level,
      trainingCenter: data.TrainingCenter,
      district: data.District,
      state: data.state,
      grade: data.grade,
      placeOfIssue: data.placeOfIssue,
      dateOfIssue: new Date(data.DateOfIssue).toISOString().split("T")[0],
      studentId: data.studentId,
      studentImageUrl: data.stutentProfilePic,
      schemeLogo:data?.schemeLogo,
      certificateCode:data?.certificateCode,
    };
  }, []);

  return (
    <>  
    {/* here create two tabs one for marksheet and another for certificate*/}


    <Tabs defaultValue={selectedTab} className="space-y-4">
      <TabsList>
        <TabsTrigger onClick={() => setSelectedTab("overview")} value="overview">
         MarkSheet
        </TabsTrigger>
        <TabsTrigger onClick={() => setSelectedTab("updateBatchgov")} value="updateBatchgov">
          Certificate
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        {selectedTab === "overview" && <GenerateMarksheetFrom
                    ref={componentRef} 
                    data={id && studentData ? generateDummyData(studentData) : null} 
             />}
      </TabsContent>
      <TabsContent value="updateBatchgov">
        {selectedTab === "updateBatchgov" && <GenerateCertificate
          ref={certificateRef}
          data={
            id && studentData ? generateCertificateData(certificatedata): null
          }
        />}
      </TabsContent>
    </Tabs>


        {/*  here is the update marksheet... */}
        

       <div className="w-[900px] mx-auto px-4 flex justify-end">
        {" "}
        <Button onClick={generateMarksheet}>Download <Download className="ml-2" /></Button>{" "}
      </div>
    </>
  );
};

export default StudentResultDetailsBox;

