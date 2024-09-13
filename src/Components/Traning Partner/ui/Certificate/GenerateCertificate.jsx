import React from "react";
import QRCode from "qrcode.react";

const GenerateCertificate = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

 

  const {
    studentName,
    fatherName,
    DOB,
    Enrolment_number,
    qualification,
    duration,
    credit,
    level,
    convertedImageUrl,
    TrainingCenter,
    District,
    state,
    grade,
    DateOfIssue,
    studentId,
  } = data;

  const trimmedDateOfIssue = new Date(DateOfIssue).toISOString().split("T")[0];
  const trimmedDOB = new Date(DOB).toISOString().split("T")[0];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full max-w-[1000px] aspect-[1000/690] border relative mx-auto ">
        <div className="w-full h-full absolute">
          <img
            src="/Certificate.png"
            alt="Certificate Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full">
          {/* Student Image */}
          <div className="w-[103px] border ml-[82%] mt-[61px]">
            <img
              className="h-28 w-24 object-cover"
              src={convertedImageUrl}
              alt="Student"
            />
          </div>
          {/* Student Name */}
          <div className="mt-[107px] ml-[35%]">
            <p className="text-[12px] font-semibold">{studentName}</p>
          </div>
          {/* Father Name, Date of Birth, Enrollment Number */}
          <div className="mt-[25px] ml-[28%] flex">
            <p className=" text-[12px] font-semibold">{fatherName}</p>
            <p className=" ml-[255px] text-[12px] font-semibold">
              {trimmedDOB}
            </p>
            <p className=" ml-[130px] text-[12px] font-semibold">
              {Enrolment_number}
            </p>
          </div>
          {/* Subject Name */}
          <div className="mt-[22px] ml-[50%]">
            <p className="text-[12px] font-semibold">{qualification}</p>
          </div>
          {/* Duration, Credit, Level */}
          <div className="mt-[22px] ml-[25%] flex items-center">
            <p className=" text-[12px] font-semibold">{duration} Days</p>
            <p className=" ml-[305px] text-[12px] font-semibold">{credit}</p>
            <p className=" ml-[240px] text-[12px] mt-2 font-semibold">
              {level}
            </p>
          </div>
          {/* Training Center, District, State */}
          <div className="mt-[18px] ml-[20%] flex items-center">
            <p className=" text-xs font-semibold mb-2 sm:mb-0">
              {TrainingCenter}
            </p>
            <p className=" ml-[350px] text-xs font-semibold mb-2 sm:mb-0">
              {District}
            </p>
            <p className=" ml-[140px] text-xs font-semibold">{state}</p>
          </div>
          {/* Grade */}
          <div className="mt-[30px] ml-[13%] flex items-center">
            <p className=" text-[12px] font-bold">{grade}</p>
          </div>
          {/* Place of Issue */}
          <div className="mt-[18px] ml-[18%] flex items-center">
            <p className=" text-[12px] font-semibold">Jatani</p>
          </div>
          {/* Date of Issue */}
          <div className="mt-[12px] ml-[18%] flex items-center">
            <p className=" text-[12px] font-semibold">{trimmedDateOfIssue}</p>
          </div>
          <div className="absolute bottom-[90px] left-[548px] bg-white w-[53px] h-[53px]">
          
          </div>
          <div className="absolute bottom-[91px] left-[550px]  w-[52px] h-[52px]">
            <div className="w-full h-full">
            <img
            src="/logo.png"
            alt="logo Background"
            className="w-full h-full object-cover"
          />
          </div>
          </div>
          <div className="absolute bottom-[90px] left-[749px] bg-white w-[53px] h-[53px]">
          
          </div>
          <div className="absolute bottom-[90px] left-[749px] w-[52px] h-[52px]">
            <div className="w-full h-full">
            <img
            src="/logo.png"
            alt="logo Background"
            className="w-full h-full object-cover"
          />
          </div>
          </div>
          {/* QR Code */}
          <div className="absolute bottom-[45px] left-[75px] bg-white">
            <div className=" w-[40px] h-[40px]"></div>
          </div>
          <div className="absolute bottom-[47px] left-[81px]">
            <QRCode
              value={`https://student-details-by-qr-scan.vercel.app/${studentId}`}
              size={42}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
