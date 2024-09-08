import React, { forwardRef } from "react";
import QRCode from "qrcode.react";

const GenerateCertificate = forwardRef((props, ref) => {
  if (!props.data) {
    return <div ref={ref}>Loading...</div>;
  }

  const {
    name,
    fatherName,
    dateOfBirth,
    enrollmentNumber,
    subject,
    duration,
    credit,
    level,
    trainingCenter,
    district,
    state,
    grade,
    placeOfIssue,
    dateOfIssue,
    studentId,
    studentImageUrl,
  } = props.data;

  return (
    <div className="max-w-7xl mx-auto">
    <div className="w-full max-w-[1000px] aspect-[1000/690] border relative mx-auto" ref={ref}>
      <div className="w-full h-full absolute">
        <img src="/Certificate.png" alt="Certificate Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute w-full h-full">
        {/* Student Image */}
        <div className="w-[103px] border ml-[82.4%] mt-[59px]">
            <img
              className="h-28 w-24 object-cover"
              src={studentImageUrl}
              alt="Student"
            />
          </div>
          {/* Student Name */}
          <div className="mt-[105px] ml-[40%]">
            <p className="text-[#117EC3] text-[20px] font-semibold">{name}</p>
          </div>
          {/* Father Name, Date of Birth, Enrollment Number */}
          <div className="mt-[20px] ml-[28%] flex">
            <p className="text-[#117EC3] text-[15px] font-semibold">{fatherName}</p>
            <p className="text-[#117EC3] ml-[206px] text-[15px] font-semibold">{dateOfBirth}</p>
            <p className="text-[#117EC3] ml-[120px] text-[15px] font-semibold">{enrollmentNumber}</p>
          </div>
          {/* Subject Name */}
          <div className="mt-[16px] ml-[50%]">
            <p className="text-[#117EC3] text-[15px] font-semibold">{subject}</p>
          </div>
          {/* Duration, Credit, Level */}
          <div className="mt-[20px] ml-[25%] flex items-center">
            <p className="text-[#117EC3] text-[15px] font-semibold">{duration}</p>
            <p className="text-[#117EC3] ml-[300px] text-[15px] font-semibold">{credit}</p>
            <p className="text-[#117EC3] ml-[230px] text-[12px] mt-2 font-semibold">{level}</p>
          </div>
          {/* Training Center, District, State */}
          <div className="mt-[16px] ml-[25%] flex items-center">
            <p className="text-[#117EC3] text-[15px] font-semibold">{trainingCenter}</p>
            <p className="text-[#117EC3] ml-[390px] text-[15px] font-semibold">{district}</p>
            <p className="text-[#117EC3] ml-[80px] text-[15px] font-semibold">{state}</p>
          </div>
          {/* Grade */}
          <div className="mt-[27px] ml-[13%] flex items-center">
            <p className="text-[#117EC3] text-[13px] font-bold">{grade}</p>
          </div>
          {/* Place of Issue */}
          <div className="mt-[15px] ml-[18%] flex items-center">
            <p className="text-[#117EC3] text-[13px] font-semibold">{placeOfIssue}</p>
          </div>
          {/* Date of Issue */}
          <div className="mt-[9px] ml-[18%] flex items-center">
            <p className="text-[#117EC3] text-[13px] font-semibold">{dateOfIssue}</p>
          </div>
          {/* QR Code */}
          <div className="absolute bottom-[45px] left-[75px] bg-white">
           <div className=" w-[45px] h-[45px]"></div>
          </div>
          <div className="absolute bottom-[45px] left-[75px]">
            <QRCode value={`https://student-details-by-qr-scan.vercel.app/${studentId}`} size={42} />
          </div>
      </div>
    </div>
  </div>
  );
});

export default GenerateCertificate;