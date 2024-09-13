import React, { forwardRef } from "react";
import QRCode from "qrcode.react";
import { data } from "autoprefixer";
const GenerateMarksheetFrom = forwardRef((props, ref) => {
  if (!props.data) {
    return <div ref={ref}>Loading...</div>;
  }
// console.log(props.data);
  // const {
  //   schemCode,
  //   name,
  //   ward = fathername,
  //   qualificationName,
  //   qualificationCode,
  //   nsqfLevel,
  //   sector,
  //   duration,
  //   assessorRegNo,
  //   dob,
  //   assessmentBatchNo,
  //   assessmentDate,
  //   nosMarks,
  //   totalMarks,
  //   grade,
  //   result,
  //   dateOfIssue,
  //   certificateNo,
  //   studentId,
  // } = props.data;

  return (
    <div
      ref={ref}
      className="w-[210mm] h-[275mm] mx-auto p-8 border border-green-600 font-cambria text-sm"
    >
      <div className="flex justify-between items-start mb-1">
        <img
          src="/cutm.jpg"
          alt="Centurion University Logo"
          className="w-20 h-28"
        />
        <div className="text-center flex-grow">
          <h1 className="text-2xl font-bold mb-2">
            Centurion University of Technology and Management
          </h1>
          <p className="text-lg mb-2">(NCVET recognized Awarding Body)</p>
          <p className="text-lg mb-2">
            Scheme- <span>{props.data?.marks?.TrainingPartner}</span>
          </p>
          <h2 className="text-2xl font-bold text-green-600 border-t-2 border-b-2 border-green-600 inline-block px-4 py-1">
            M A R K S H E E T
          </h2>
        </div>
        <img src="/ncevt.jpg" alt="NCVET Logo" className="w-28 h-28" />
      </div>
      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">
              Name of Student:
            </td>
            <td className="border px-2 py-1 w-2/3">{props.data?.name}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">
              Son/Daughter/Ward of:
            </td>
            <td className="border px-2 py-1 w-2/3">{props.data?.fathername}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">
              Qualification Name:
            </td>
            <td className="border px-2 py-1 w-2/3">{props.data?.course}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">
              Qualification Code:
            </td>
            <td className="border px-2 py-1 w-2/3">NA</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">NSQF Level:</td>
            <td className="border px-2 py-1 w-2/3">5</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Sector:</td>
            <td className="border px-2 py-1 w-2/3">{props.data?.sector_name}</td>
          </tr>
          <tr className="border">
            <td className="border px-2 py-1 font-medium w-1/3">Duration:</td>
            <td className="border px-2 py-1 w-2/3">
              {props.data?.totaldays} Days
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border px-1 py-1 w-1/2 align-middle">
              Assessor Registration No.
            </td>
            <td className="border px-1 py-1 w-1/2">Date of Birth</td>
          </tr>
          <tr className="text-center">
            <td className="border px-1 py-1">{props.data?.redg_No || "NA"}</td>
            <td className="border px-1 py-1">{props.data?.marks?.studentDOB}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr className="text-center">
            <td className="border px-1 py-1 w-1/2">Assessment Batch No.</td>
            <td className="border px-1 py-1 w-1/2">Assessment Date</td>
          </tr>
          <tr className="text-center">
            <td className="border px-1 py-1">{props.data?.marks?.batchABN}</td>
            <td className="border px-1 py-1">
              {props.data?.marks?.examDate
                ? new Date(props.data?.marks?.examDate).toLocaleDateString()
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <thead>
          <tr>
            <th className="border px-1 py-1 font-medium">NOS Code</th>
            <th className="border px-1 py-1 font-medium">NOS Name</th>
            <th className="border px-1 py-1 font-medium">NOS Type</th>
            <th className="border px-1 py-1 font-medium">Maximum Marks</th>
            <th className="border px-1 py-1 font-medium">Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.marks?.Nos &&
            props.data?.marks?.Nos.map((nos, index) => (
              <tr key={index}>
                <td className="border px-1 py-1">{nos.code}</td>
                <td className="border px-1 py-1">{nos.name}</td>
                <td className="border px-1 py-1">Tehory & Parctical</td>
                <td className="border px-1 py-1">{nos.Total}</td>
                <td className="border px-1 py-1">{nos.MarksObtained}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <table className="w-full mb-2 border-collapse">
        <tbody>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">
              Total Marks Obtained
            </td>
            <td className="w-1/2 border px-1 py-1 text-center">
              {props.data?.marks?.total}
            </td>
          </tr>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">
              Grade
            </td>
            <td className="w-1/2 border px-1 py-1 text-center">
              {props.data?.marks?.Grade}
            </td>
          </tr>
          <tr>
            <td className="w-1/2 border px-1 py-1 text-center font-medium">
              Result
            </td>
            <td className="w-1/2 border px-1 py-1 text-center">
              {props.data?.marks?.Result}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-end mt-4">
        <div>
          <div className="mb-6">
            <QRCode
              value={`https://student-details-by-qr-scan.vercel.app/${props.data?._id}`}
              size={60}
            />
          </div>
          <div className="text-sm">
            <p>
              Date of Issue:{" "}
              <span>{new Date().toISOString().split("T")[0]}</span>
            </p>
            <p>
              Certificate No: <span>{`CERT${props.data?.redg_No}`}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold mb-4">
            Head – Centre for Skill Certification
          </p>
          <p>Centurion University of Technology and Management</p>
        </div>
      </div>
    </div>
  );
});

export default GenerateMarksheetFrom;
