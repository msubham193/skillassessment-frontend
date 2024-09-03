import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components(shadcn)/ui/button";
import AaMarksheet from "./AaMarksheet";
import axios from "axios";
import { server } from "@/main";

const AaMarksheeForm = () => {
  const [formData, setFormData] = useState({
    schemCode: "",
    name: "",
    ward: "",
    qualificationName: "",
    qualificationCode: "",
    nsqfLevel: "",
    sector: "",
    course: "",
    duration: "",
    assessorRegNo: "",
    dob: "",
    assessmentBatchNo: "",
    assessmentDate: "",
    nosMarks: [], // This will be dynamically set
    totalMarks: "",
    grade: "",
    result: "",
    dateOfIssue: "",
    certificateNo: "",
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [sectorsOption, setSectorsOption] = useState([]);
  const [loading, setLoading] = useState(true);

  const marksheetRef = useRef();

  // Fetching all sectors on component mount
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(`${server}/sector/all`);
        if (response.data.success) {
          const sectorNames = response.data.data.map((sector) => sector.name);
          setSectorsOption(sectorNames); // Update available sector options
        }
      } catch (error) {
        console.log("Error fetching sectors: ", error);
      }
    };
    fetchSectors();
  }, []);

  // Fetching courses based on the selected sector
  useEffect(() => {
    const fetchCourses = async () => {
      if (formData.sector) {
        try {
          const response = await axios.get(
            `${server}/sector?name=${formData.sector}`
          );
          if (
            response.data &&
            response.data.data &&
            response.data.data.length > 0
          ) {
            const courseNames = response.data.data.map(
              (item) => item.courseName
            );
            setCourseOptions(courseNames); // Update available course options
          } else {
            setCourseOptions([]);
          }
        } catch (error) {
          console.log("Error fetching courses: ", error);
        }
      }
    };
    fetchCourses();
  }, [formData.sector]); // Trigger fetchCourses when the selected sector changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sector change handler
  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      sector: selectedSector, // Update the sector in formData
      course: "", // Reset course when sector changes
      nosMarks: [], // Reset NOS marks when sector changes
    }));
  };

  // Course change handler
  const handleCourseChange = async (event) => {
    const selectedCourse = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      course: selectedCourse, // Update the course in formData
    }));

    // Fetch NOS data after the course is selected
    await fetchNosData(selectedCourse);
  };

  // Function to fetch NOS data based on the selected course
  const fetchNosData = async (selectedCourse) => {
    try {
      const response = await axios.get(`${server}/course/course`);
      const course = response.data.data.find(
        (course) => course.courseName === selectedCourse
      );

      if (course) {
        const numberOfNos = course.Nos.length;
        setFormData((prevData) => ({
          ...prevData,
          nosMarks: Array(numberOfNos).fill({
            code: "",
            name: "",
            type: "",
            maxMarks: "",
            marksObtained: "",
          }),
        }));
      } else {
        console.log("Course not found");
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNosChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNosMarks = formData.nosMarks.map((nos, i) =>
      i === index ? { ...nos, [name]: value } : nos
    );
    setFormData({ ...formData, nosMarks: updatedNosMarks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    html2canvas(marksheetRef.current, {
      scale: 2, // Improve image quality
      useCORS: true, // Enable cross-origin images
      logging: true, // Enable console logging for debugging
      allowTaint: true, // Allow tainting for cross-origin images
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("marksheet.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("An error occurred while generating the PDF. Please try again.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Scheme Code:</label>
            <input
              type="text"
              name="schemCode"
              value={formData.schemCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Name of Assessor:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Son/Daughter/Ward of:</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Qualification Name:</label>
            <input
              type="text"
              name="qualificationName"
              value={formData.qualificationName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Qualification Code:</label>
            <input
              type="text"
              name="qualificationCode"
              value={formData.qualificationCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">NSQF Level:</label>
            <input
              type="text"
              name="nsqfLevel"
              value={formData.nsqfLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Sector:</label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleSectorChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a Sector</option>
              {sectorsOption.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Course:</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleCourseChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">
              Assessor Registration No.:
            </label>
            <input
              type="text"
              name="assessorRegNo"
              value={formData.assessorRegNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Assessment Batch No.:</label>
            <input
              type="text"
              name="assessmentBatchNo"
              value={formData.assessmentBatchNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold">NOS Marks:</label>
          {formData.nosMarks.map((nos, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 mb-2">
              <input
                type="text"
                name="code"
                value={nos.code}
                onChange={(e) => handleNosChange(index, e)}
                placeholder="NOS Code"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="name"
                value={nos.name}
                onChange={(e) => handleNosChange(index, e)}
                placeholder="NOS Name"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="type"
                value={nos.type}
                onChange={(e) => handleNosChange(index, e)}
                placeholder="NOS Type"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="maxMarks"
                value={nos.maxMarks}
                onChange={(e) => handleNosChange(index, e)}
                placeholder="Max Marks"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="marksObtained"
                value={nos.marksObtained}
                onChange={(e) => handleNosChange(index, e)}
                placeholder="Marks Obtained"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
     
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-semibold">Assessment Date:</label>
            <input
              type="date"
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Total Marks Obtained:</label>
            <input
              type="text"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Grade:</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Result:</label>
            <input
              type="text"
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Date of Issue:</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Certificate No.:</label>
            <input
              type="text"
              name="certificateNo"
              value={formData.certificateNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mt-4">
          <AaMarksheet data={formData} ref={marksheetRef} />
        </div>
        <div className="mt-4 text-center">
          <Button type="submit">Download Marksheet</Button>
        </div>
      </form>
    </div>
  );
};

export default AaMarksheeForm;
