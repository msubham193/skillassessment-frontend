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
  const query = new URLSearchParams(location.search); 
  const defaultTab = query.get("tab") || "overview"; 
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const componentRef = useRef();
  const certificateRef = useRef();
  const [studentData, setStudentData] = useState(null);  // Initially null
  const [certificatedata, setCertificatedatadata] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [batchdata, setBatchdata] = useState({});
  const [loading, setLoading] = useState(true); // Start with loading as true

  // Fetch student details using student ID
  useEffect(() => {
    setSelectedTab(defaultTab); 
  }, [defaultTab]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/student/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        });
        setStudentData(response.data.data);
        setBatchId(response.data.data.enrolledBatch);
      } catch (error) {
        console.error("Error fetching student result:", error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  // Function for fetching result from certificate
  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/certificate/student/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        });
        setCertificatedatadata(response.data.data);
      } catch (error) {
        console.error("Error fetching student result:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificateData();
    }
  }, [id]);

  // Function for handling marksheet generation
  const handleGenerateMarkSheet = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'MarkSheet',
  });

  const generateMarksheet = () => {
    if (id && studentData) {
      handleGenerateMarkSheet();
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading indicator while fetching data
  }

  if (!studentData) {
    return <div>No data available</div>;  // Handle case if studentData is not fetched correctly
  }

  return (
    <>  
      {/* Tabs for Marksheet and Certificate */}
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
          {selectedTab === "overview" && studentData && (
            <GenerateMarksheetFrom data={studentData} ref={componentRef} />
          )}
        </TabsContent>
        <TabsContent value="updateBatchgov">
          {selectedTab === "updateBatchgov" && studentData && (
            <GenerateCertificate data={certificatedata} />
          )}
        </TabsContent>
      </Tabs>

      {/* Button for generating Marksheet */}

    </>
  );
};

export default StudentResultDetailsBox;
