import React, { useCallback, useEffect, useRef, useState } from "react";
import LoginForm from "../../Components/Static/LoginForm.jsx";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components(shadcn)/ui/button.jsx";
import { toast } from "react-toastify";
import DownloadCertificate from "@/Components/Static/DownloadCertificate.jsx";
import { useReactToPrint } from "react-to-print";
import { server } from "@/main.jsx";

function PortalLogin() {
  const [enrollmentNumber, setEnrollmentNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [dob, setDob] = useState("");
  const dateRef = useRef(new Date());
  const [documentType, setDocumentType] = useState("certificate");
  // Reference for the certificate to print
  const certificateRef = useRef();

  // Function to trigger the print
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `Certificate_${enrollmentNumber}`,
    pageStyle: `
    @page {
      size: ${documentType === "marksheet" ? "A4 portrait" : "A4 landscape"};
    }
    @media print {
      ${
        documentType === "certificate"
          ? `
          body {
            padding: 0;
            margin: 0;
          }
          * {
            border: none !important;
            box-shadow: none !important;
          }
        `
          : ""
      }
    }
  `,
    onAfterPrint: () => {
      toast.success("Certificate Downloaded Successfully");
      setLoading(false); // Set loading to false after print
    },
  });

  // Function for downloading the certificate
  const downloadFunction = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true as soon as download starts
    try {
      const response = await axios.post(
        `${server}/student/c/a`,
        { enrollmentNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Set the student data after receiving the response
      setStudentData(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again later!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false); // Reset loading in case of error
    }
  };

  // Use useEffect to trigger printing when studentData is available
  useEffect(() => {
    if (studentData) {
      handlePrint(); // Trigger the print only after student data is set
    }
  }, [studentData]);

  // Function for generating the certificate data
  const generateCertificateData = useCallback((data) => {
    if (!data) {
      toast.error("Unable to find the certificate, please try again later", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
    return {
      name: data.studentName,
      fatherName: data.fatherName,
      dateOfBirth: data?.DOB
        ? new Date(data.DOB).toISOString().split("T")[0]
        : "N/A",
      enrollmentNumber: data.Enrolment_number,
      subject: data.qualification,
      duration: `${data.duration} days`,
      certificateCode: data?.certificateCode,
      credit: data.credit,
      level: data.level,
      trainingCenter: data.TrainingCenter,
      district: data.District,
      state: data.state,
      grade: data.grade,
      placeOfIssue: data.placeOfIssue,
      dateOfIssue: dateRef?.current.toISOString().split("T")[0] || "NA",
      studentId: data.studentId,
      studentImageUrl: data.stutentProfilePic,
      schemeLogo: data.schemeLogo,
      schemeType: data.schemeType,
    };
  }, []);

  return (
    <div className="w-full">
      {/* Login Section */}
      <section className="bg-gradient-to-b from-blue-50 to-indigo-100 py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Login to <span className="text-blue-600">Dashboard</span>
          </h2>
          <LoginForm />
        </motion.div>
      </section>

      {/* Certificate Download Section */}
      <section className="w-full py-16 bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Download Student <span className="text-blue-600">Certificate</span>
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-6 text-center">
              Enter your details to download your certificate.
            </p>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="certificate-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enrollment Number
                </label>
                <input
                  type="text"
                  id="certificate-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                  placeholder="Enter your Enrollment Number here"
                  value={enrollmentNumber}
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <p>Selected Date: {dob}</p>
              </div>
              <Button
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={downloadFunction}
                disabled={loading}
              >
                {loading ? "Loading..." : "Download Certificate"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Certificate Preview Section (hidden until print) */}
      <div style={{ display: "none" }}>
        {studentData && (
          <DownloadCertificate
            ref={certificateRef}
            data={generateCertificateData(studentData)}
          />
        )}
      </div>
    </div>
  );
}

export default PortalLogin;
