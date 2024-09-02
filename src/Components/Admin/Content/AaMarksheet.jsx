import React, { forwardRef } from 'react';

const AaMarksheet = forwardRef(({ data }, ref) => {
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
      <div className="flex justify-between  mb-3">
        <img src="/cutm.jpg" alt="Centurion University Logo" className="w-16 h-24" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Centurion University of Technology and
            <br /> Management
          </h1>
          <p className="text-xl">(NCVET recognized Awarding Body)</p>
          <p className="my-4 text-xl">Scheme- <span>{schemCode}</span></p>
          <h2 className="text-2xl font-bold text-green-600  border-t-2 border-b-2 border-green-600 w-[210px] ml-28 ">
            M A R K S H E E T
          </h2>
        </div>
        <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-24 -mt-4" />
      </div>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="flex">
            <td className="flex-1 border px-2   font-medium">Name of Assessor:</td>
            <td className="flex-1 border px-2 ">{name}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2  ">Son/Daughter/Ward of:</td>
            <td className="flex-1 border px-2 ">{ward}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2 ">Qualification Name:</td>
            <td className="flex-1 border px-2  ">{qualificationName}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2  ">Qualification Code:</td>
            <td className="flex-1 border px-2  ">{qualificationCode}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2 ">NSQF Level:</td>
            <td className="flex-1 border px-2 ">{nsqfLevel}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2 ">Sector:</td>
            <td className="flex-1 border px-2 ">{sector}</td>
          </tr>
          <tr className="flex">
            <td className="flex-1 border px-2 ">Duration:</td>
            <td className="flex-1 border px-2 ">{duration}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border    w-1/2">Assessor Registration No.</td>
            <td className="border    w-1/2">Date of Birth</td>
          </tr>
          <tr className="text-center">
            <td className="border  ">{assessorRegNo}</td>
            <td className="border  ">{dob}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border    w-1/2">Assessment Batch No.</td>
            <td className="border   w-1/2">Assessment Date</td>
          </tr>
          <tr className="text-center">
            <td className="border ">{assessmentBatchNo}</td>
            <td className="border ">{assessmentDate}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="border  font-medium">NOS Code</th>
            <th className="border  font-medium">NOS Name</th>
            <th className="border  font-medium">NOS Type</th>
            <th className="border  font-medium">Maximum Marks</th>
            <th className="border  font-medium">Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          {nosMarks.map((nos, index) => (
            <tr key={index}>
              <td className="border">{nos.code}</td>
              <td className="border">{nos.name}</td>
              <td className="border">{nos.type}</td>
              <td className="border">{nos.maxMarks}</td>
              <td className="border" >{nos.marksObtained}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full mb-4 border-collapse">
        <tbody>
          <tr className="flex">
            <td className="w-1/2 border px-2   text-center font-medium">Total Marks Obtained</td>
            <td className="w-1/2 border px-2  text-center" >{totalMarks}</td>
          </tr>
          <tr className="flex">
            <td className="w-1/2 border px-2   text-center font-medium">Grade</td>
            <td className="w-1/2 border px-2   text-center">{grade}</td>
          </tr>
          <tr className="flex">
            <td className="w-1/2 border px-2   text-center font-medium">Result</td>
            <td className="w-1/2 border px-2   text-center">{result}</td>
          </tr>
        </tbody>
      </table>
      <img src="/placeholder.svg" alt="QR Code" className="w-24 h-24" />
      <div className="flex justify-between font-semibold items-center mt-1 mb-7">
        <div className="text-center text-sm">
          <p>Date of Issue: <span>{dateOfIssue}</span></p>
          <p>Certificate No: <span>{certificateNo}</span></p>
        </div>
        <div className="text-center font-semibold">
          <p>Head – Centre for Skill Certification</p>
          <p>Centurion University of Technology and Management</p>
        </div>
      </div>
    </div>
  );
});

export default AaMarksheet;
