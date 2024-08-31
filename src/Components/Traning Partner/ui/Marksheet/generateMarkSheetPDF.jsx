/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

const GenerateMarksheetPDF = forwardRef(({ data }, ref) => {
  if (!data) return null;

  const {
    schemCode,
    name,
    ward,
    qualificationName,
    qualificationCode,
    nsqfLevel, 
    sector,
    duration,
    assessorRegNo,
    dob,
    assessmentBatchNo,
    assessmentDate,
    nosMarks,
    totalMarks,
    grade,
    result,
    dateOfIssue,
    certificateNo,
  } = data;
 
  return (
    <div ref={ref} className="max-w-3xl mx-auto p-8 border border-green-600 rounded-lg font-cambria">
      <div className="flex justify-between mb-3">
        <img src="/cutm.jpg" alt="Centurion University Logo" className="w-16 h-24" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Centurion University of Technology and
            <br /> Management
          </h1>
          <p className="text-xl">(NCVET recognized Awarding Body)</p>
          <p className="my-4 text-xl">Scheme- <span>{schemCode}</span></p>
          <h2 className="text-2xl font-bold text-green-600 border-t-2 border-b-2 border-green-600 w-[210px] ml-28">
            M A R K S H E E T
          </h2>
        </div>
        <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-24 -mt-4" />
      </div>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="flex">
            <td className="flex-1 border px-2 font-medium">Name of Assessor:</td>
            <td className="flex-1 border px-2">{name}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Son/Daughter/Ward of:</td>
            <td className="flex-1 border px-2">{ward}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Qualification Name:</td>
            <td className="flex-1 border px-2">{qualificationName}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Qualification Code:</td>
            <td className="flex-1 border px-2">{qualificationCode}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">NSQF Level:</td>
            <td className="flex-1 border px-2">{nsqfLevel}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Sector:</td>
            <td className="flex-1 border px-2">{sector}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2">Duration:</td>
            <td className="flex-1 border px-2">{duration}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border w-1/2">Assessor Registration No.</td>
            <td className="border w-1/2">Date of Birth</td>
          </tr>
          <tr className="text-center">
            <td className="border">{assessorRegNo}</td>
            <td className="border">{dob}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border w-1/2">Assessment Batch No.</td>
            <td className="border w-1/2">Assessment Date</td>
          </tr>
          <tr className="text-center">
            <td className="border">{assessmentBatchNo}</td>
            <td className="border">{assessmentDate}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center bg-green-600 text-white">
            <th className="border px-2">NOS Code</th>
            <th className="border px-2">NOS Name</th>
            <th className="border px-2">NOS Type</th>
            <th className="border px-2">Maximum Marks</th>
            <th className="border px-2">Marks Obtained</th>
          </tr>
          {nosMarks.map((nos, index) => (
            <tr key={index} className="text-center">
              <td className="border px-2">{nos.code}</td>
              <td className="border px-2">{nos.name}</td>
              <td className="border px-2">{nos.type}</td>
              <td className="border px-2">{nos.maxMarks}</td>
              <td className="border px-2">{nos.marksObtained}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center bg-green-600 text-white">
            <th className="border px-2">Total Marks Obtained</th>
            <th className="border px-2">Grade</th>
            <th className="border px-2">Result</th>
          </tr>
          <tr className="text-center">
            <td className="border px-2">{totalMarks}</td>
            <td className="border px-2">{grade}</td>
            <td className="border px-2">{result}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border w-1/2">Date of Issue</td>
            <td className="border w-1/2">Certificate No.</td>
          </tr>
          <tr className="text-center">
            <td className="border">{dateOfIssue}</td>
            <td className="border">{certificateNo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default GenerateMarksheetPDF;
