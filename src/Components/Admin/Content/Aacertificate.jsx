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
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date"; // Return a placeholder if parsing fails
  }
};

const Aacertificate = forwardRef((props, ref) => { 
  console.log(props.data);
  if (!props.data) {
    return <div ref={ref}>Loading...</div>;
  }
  const {
    name,
    fatherName,
    profilePic,
    state,
    district,
    dob,
    enrollmentNo,
    qualification,
    durationFrom,
    durationTo,
    earned,
    nsqfLevel,
    trainingCenterName,
    certificateNo,
    percentage,
    dateOfIssue,
    placeOfIssue,
  } = props.data;

  const formattedDateOfBirth = formatDate(dob);
  const formattedDateOfIssue = formatDate(dateOfIssue);
  const duration = `${formatDate(durationFrom)} to ${formatDate(durationTo)}`;

  return (
    <div className="max-w-7xl mx-auto ">
      <div
        className="w-full max-w-[1000px] aspect-[1000/690] relative mx-auto "
        ref={ref}
      >
        <div className="w-full h-full absolute">
          <img
            src="/TOATOT.jpg"
            alt="Certificate Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full">
          {/* Student Image */}
          <div className="w-[91px] h-[112px] ml-[79.7%] mt-[162px]  ">
            <img
              className="h-28 w-24 object-cover"
              src={profilePic ? URL.createObjectURL(profilePic) : '/placeholder-image.jpg'}
              alt="Profile"
            />
          </div>
          <div className="ml-[73%] mt-[36px] max-w-[158px]  bg-white overflow-hidden">
            <p className="text-[12px]  font-bold whitespace-nowrap">
              {certificateNo || "N/A"}
            </p>
          </div>
      
          {/* Student Name */}
          <div className="mt-[-20px] ml-[38%] w-[160px] ">
            <p className="text-[12px] font-semibold">{name || "N/A"}</p>
          </div>
          {/* Father Name, Date of Birth, Enrollment Number */}
          <div className="mt-[20px] ml-[25%] flex items-center">
            <p className=" w-[240px] text-[12px] font-semibold ">
              {fatherName || "N/A"}
            </p>
            <p className=" ml-[78px]   text-[12px] font-semibold">
              {dob || "N/A"}
            </p>
            <p className=" ml-[120px]  w-[100px] text-[12px] font-semibold">
              {enrollmentNo || "N/A"}
            </p>
          </div>
          {/* Subject Name */}
          <div className="mt-[20px] ml-[30%]">
            <p className="text-[12px]  w-[500px]  font-semibold">{qualification || "N/A"}</p>
          </div>
          {/* Duration, Credit, Level */}
          <div className="mt-[20px]  ml-[21%]">
            <p className="  text-[12px] 
              font-semibold">{durationFrom || "N/A"}</p>
            <p className=" ml-[150px]  w-[100px] mt-[-20px] text-[12px] 
              font-semibold">{durationTo || "N/A"}</p>
            <p className=" ml-[360px] mt-[-15px] text-[12px] font-semibold">
              {earned || "N/A"}
            </p>
            <p className=" ml-[600px] text-[12px] mt-[-18px] font-semibold">
              {nsqfLevel || "N/A"}
            </p>
          </div>
          {/* Training Center, District, State */}
          <div className="mt-[15px] ml-[38%] flex items-center ">
            <p className="    text-[12px]  w-[200px] font-semibold mb-2 sm:mb-0">
              {trainingCenterName || "N/A"}
            </p>
            <p className=" ml-[55px] w-[100px] text-[12px] font-semibold mb-2 sm:mb-0">
              {district || "N/A"}
            </p>
            <p className=" ml-[50px] text-[12px] font-semibold">
              {state || "N/A"}
            </p>
          </div>
          {/* Grade */}
          <div className="mt-[20px] ml-[53%] flex items-center">
            <p className=" text-[12px] font-bold">{percentage || "N/A"}%</p>
          </div>
          {/* Place of Issue */}
          <div className="mt-[15px] ml-[23%] flex items-center">
            <p className=" text-[12px] font-semibold">
              {placeOfIssue || "N/A"}
            </p>
          </div>
          {/* Date of Issue */}
          <div className="mt-[-13px] ml-[43%] flex items-center">
            <p className=" text-[12px] font-semibold">
              {formattedDateOfIssue || "N/A"}
            </p>
          </div>
          
        
        </div>
      </div>
    </div>
  );
});

export default Aacertificate;
