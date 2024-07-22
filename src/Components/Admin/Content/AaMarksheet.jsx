import React from 'react'

const AaMarksheet = ({data}) => {
    if (!data) return null; 
    //   console.log(data)
    
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
        <div className="max-w-3xl mx-auto p-8 border border-green-600 rounded-lg font-cambria">
          <div className="flex justify-between  mb-4">
            <img
              src="/cutm.jpg"
              alt="Centurion University Logo"
              className="w-16 h-24"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                Centurion University of Technology and
                <br /> Management
              </h1>
              <p className="text-xl">(NCVET recognized Awarding Body)</p>
              <p className="mt-6 text-xl">Scheme- <span>{schemCode}</span></p>
              <h2 className="text-2xl font-bold text-green-600 mt-6 border-t-2 border-b-2 border-green-600 w-[210px] ml-28 ">
                M A R K S H E E T
              </h2>
            </div>
            <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-24 -mt-4" />
          </div>
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px] font-medium">
                  Name of Assessor:
                </td>
                <td className="flex-1 border px-2 py-1">{name}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">
                  Son/Daughter/Ward of:
                </td>
                <td className="flex-1 border px-2 py-1" >{ward}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">Qualification Name:</td>
                <td className="flex-1 border px-2 py-1" >{qualificationName}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">Qualification Code:</td>
                <td className="flex-1 border px-2 py-1" >{qualificationCode}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">NSQF Level:</td>
                <td className="flex-1 border px-2 py-1">{nsqfLevel}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">Sector:</td>
                <td className="flex-1 border px-2 py-1">{sector}</td>
              </tr>
              <tr className="flex">
                <td className="flex-1 border px-2 py-[2px]">Duration:</td>
                <td className="flex-1 border px-2 py-1">{duration}</td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="text-center">
                <td className="border p-1  w-1/2">Assessor Registration No.</td>
                <td className="border p-1  w-1/2">Date of Birth</td>
              </tr>
              <tr className="text-center">
                <td className="border p-1">{assessorRegNo}</td>
                <td className="border p-1">{dob}</td>
              </tr>
            </tbody>
          </table>
    
          {/* Second Table */}
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="text-center">
                <td className="border p-1  w-1/2">Assessment Batch No.</td>
                <td className="border p-1  w-1/2">Assessment Date</td>
              </tr>
              <tr className="text-center">
                <td className="border p-1">{assessmentBatchNo}</td>
                <td className="border p-1">{assessmentDate}</td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mb-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2 font-medium">NOS Code</th>
                <th className="border p-2 font-medium">NOS Name</th>
                <th className="border p-2 font-medium">NOS Type</th>
                <th className="border p-2 font-medium">Maximum Marks</th>
                <th className="border p-2 font-medium">Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {nosMarks.map((nos, index) => (
                <tr key={index}>
                  <td className="border p-2">{nos.code}</td>
                  <td className="border p-2">{nos.name}</td>
                  <td className="border p-2">{nos.type}</td>
                  <td className="border p-2">{nos.maxMarks}</td>
                  <td className="border p-2" >{nos.marksObtained}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="flex">
                <td className="w-1/2 border px-2 py-1 text-center font-medium">
                  Total Marks Obtained
                </td>
                <td className="w-1/2 border px-2 py-1 text-center" >{totalMarks}</td>
              </tr>
              <tr className="flex">
                <td className="w-1/2 border px-2 py-1 text-center font-medium">
                  Grade
                </td>
                <td className="w-1/2 border px-2 py-1 text-center">{grade}</td>
              </tr>
              <tr className="flex">
                <td className="w-1/2 border px-2 py-1 text-center font-medium">
                  Result
                </td>
                <td className="w-1/2 border px-2 py-1 text-center">{result}</td>
              </tr>
            </tbody>
          </table>
          <img src="/placeholder.svg" alt="QR Code" className="w-24 h-24" />
          <div className="flex justify-between  font-semibold items-center mt-1 mb-7">
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
}

export default AaMarksheet
