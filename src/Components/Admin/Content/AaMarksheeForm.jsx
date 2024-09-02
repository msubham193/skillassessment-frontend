import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components(shadcn)/ui/button";
import AaMarksheet from "./AaMarksheet";

const AaMarksheeForm = () => {
  const [formData, setFormData] = useState({
    schemCode: '',
    name: '',
    ward: '',
    qualificationName: '',
    qualificationCode: '',
    nsqfLevel: '',
    sector: '',
    duration: '',
    assessorRegNo: '',
    dob: '',
    assessmentBatchNo: '',
    assessmentDate: '',
    nosMarks: Array(7).fill({ code: '', name: '', type: '', maxMarks: '', marksObtained: '' }),
    totalMarks: '',
    grade: '',
    result: '',
    dateOfIssue: '',
    certificateNo: '',
  });

  const marksheetRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNosChange = (index, e) => {
    const { name, value } = e.target;
    const newNosMarks = formData.nosMarks.map((nos, i) =>
      i === index ? { ...nos, [name]: value } : nos
    );
    setFormData({ ...formData, nosMarks: newNosMarks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    html2canvas(marksheetRef.current, {
      scale: 2, // Improve image quality
      useCORS: true, // Enable cross-origin images
      logging: true, // Enable console logging for debugging
      allowTaint: true, // Allow tainting for cross-origin images
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('marksheet.pdf');
    }).catch(error => {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
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
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
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
