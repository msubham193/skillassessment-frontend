import React, { forwardRef } from "react";
import QRCode from "qrcode.react";

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    let date = new Date(dateString);

    if (isNaN(date.getTime())) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }

    // If still invalid, throw an error
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date"; // Return a placeholder if parsing fails
  }
};

const DownloadCertificate = forwardRef((props, ref) => { 
  console.log(props.data);
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
    schemeLogo,
    certificateCode,
    schemeType
  } = props.data;
// console.log(schemeType)

  const formattedDateOfBirth = formatDate(dateOfBirth);
  const formattedDateOfIssue = formatDate(dateOfIssue);

  return (
    <div className="max-w-7xl mx-auto ">
      <div
        className="w-full max-w-[1000px] aspect-[1000/690] relative mx-auto "
        ref={ref}
      >
        <div className="w-full h-full absolute">
          <img
            src="/certificate4.jpg"
            alt="Certificate Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full">
          {/* Student Image */}
          <div className="w-[103px] border ml-[82.8%] mt-[52px] ">
            <img
              className="h-28 w-24 object-cover"
              src={studentImageUrl}
              alt="Student"
            />
          </div>
          <div className="ml-[85%] mt-[42px] max-w-[148px] overflow-hidden">
            <p className="text-[12px] font-bold whitespace-nowrap">
              {certificateCode || "N/A"}
            </p>
          </div>
          {/* Student Name */}
          <div className="mt-[54px] ml-[40%]">
            <p className="text-[12px] font-semibold">{name || "N/A"}</p>
          </div>
          {/* Father Name, Date of Birth, Enrollment Number */}
          <div className="mt-[27px] ml-[23%] flex items-center ">
            <p className=" w-[300px] text-[12px] font-semibold ">
              {fatherName || "N/A"}
            </p>
            <p className=" ml-[60px]  text-[12px] font-semibold">
              {formattedDateOfBirth || "N/A"}
            </p>
            <p className=" ml-[145px] text-[12px] font-semibold">
              {enrollmentNumber || "N/A"}
            </p>
          </div>
          {/* Subject Name */}
          <div className="mt-[22px] ml-[50%]">
            <p className="text-[12px]  font-semibold">{subject || "N/A"}</p>
          </div>
          {/* Duration, Credit, Level */}
          <div className="mt-[24px] ml-[25%] flex items-center ">
            <p className=" text-[12px] font-semibold">{duration || "N/A"}</p>
            <p className=" ml-[305px] text-[12px] font-semibold">
              {credit || "N/A"}
            </p>
            <p className=" ml-[240px] text-[12px] mt-1 font-semibold">
              {level || "N/A"}
            </p>
          </div>
          {/* Training Center, District, State */}
          <div className="mt-[23px] ml-[20%] flex items-center ">
            <p className="  w-[400px] text-xs font-semibold mb-2 sm:mb-0">
              {trainingCenter || "N/A"}
            </p>
            <p className=" ml-[80px] text-xs font-semibold mb-2 sm:mb-0">
              {district || "N/A"}
            </p>
            <p className=" ml-[140px] text-xs font-semibold">
              {state || "N/A"}
            </p>
          </div>
          {/* Grade */}
          <div className="mt-[30px] ml-[13%] flex items-center">
            <p className=" text-[12px] font-bold">{grade || "N/A"}</p>
          </div>
          {/* Place of Issue */}
          <div className="mt-[18px] ml-[18%] flex items-center">
            <p className=" text-[12px] font-semibold">
              {placeOfIssue || "N/A"}
            </p>
          </div>
          {/* Date of Issue */}
          <div className="mt-[12px] ml-[18%] flex items-center">
            <p className=" text-[12px] font-semibold">
              {formattedDateOfIssue || "N/A"}
            </p>
          </div>
          {/* logo of centurion */}
          <div className="absolute bottom-[103px] left-[735px] w-[56px] h-[56px] bg-[#FFFFFF]">
            <div className="w-full h-full">
              <img
                src="/cutm2.jpg"
                alt="logo Background"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
         {/* logo of scheme  and if the scheme type is corporate then cutm logo */}
          <div className={`absolute bottom-[90px] ${schemeType==="Corporate" ?"left-[452px]" :"left-[366px]"}  w-[56px] h-[56px] bg-[#FFFFFF`}>
            <div className="w-full h-full">
            <img
            src={schemeLogo}
            alt="schemeLogo"
            className="w-full h-full object-contain"
          />              
            </div>
          </div>
          {/* QR Code */}
          <div className="absolute bottom-[48px] left-[70px] bg-white">
            <div className=" w-[45px] h-[45px]"></div>
          </div>
          <div className="absolute bottom-[48px] left-[70px]">
            <QRCode
              value={`https://student-details-by-qr-scan.vercel.app/${
                studentId || ""
              }`}
              size={44}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DownloadCertificate;
