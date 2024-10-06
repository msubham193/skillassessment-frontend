/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaBookOpen,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  authTokenState,
} from "../Atoms/AssessmentAgencyAtoms";
import axios from "axios";
import { server } from "@/main";

const Card = () => {
  const authToken = useRecoilState(authTokenState);
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);
  const [sectorsCount, setSectors] = useState(0);
  const [assessorCount, setAssessorCount] = useState(0);
  const [examsAssigned, setExamsAssigned] = useState(0);
  const [completedExams, setCompletedExams] = useState(0);

  useEffect(() => {
    const makeApiCallWithToken = async () => {
      if (!authToken || !assessmentAgencyId) {
        console.error("Token or ID not found");
        return;
      }

      try {
        // Make an API call and find Assessment agency by id
        const response = await axios.get(
          `${server}/aa/${assessmentAgencyId[0]}`
        );

        const examResponse = await axios.get(
          `${server}/exam/aa/${assessmentAgencyId[0]}`
        );

        const exams = examResponse.data.data;
        const startedExams = exams.filter(
          (exam) => exam.status !== "not-started"
        );
        // console.log(startedExams);
        // console.log(exams);
        const { data } = response.data;

        setExamsAssigned(exams.length);
        setCompletedExams(startedExams.length);
        setSectors(data.sectors.length);
        setAssessorCount(data.total_no_of_certified_Assessor);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    };

    // Call the function
    makeApiCallWithToken();
  },[]);

  const stats = [
    {
      title: "Total Assigned",
      icon: <FaClipboardList />,
      value: `${examsAssigned}`,
      bgColor: "bg-white",
    },
    {
      title: "Conducted",
      icon: <FaChalkboardTeacher />,
      value: `${completedExams}`,
      bgColor: "bg-green-500",
    },
    {
      title: "Sectors",
      icon: <FaBookOpen />,
      value: `${sectorsCount}`,
      bgColor: "bg-yellow-500",
    },
    {
      title: "No. of Assessors",
      icon: <FaUsers />,
      value: `${assessorCount}`,
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-8 justify-start xl:justify-between">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-md border border-teal-100 bg-white xl:w-1/5 p-5 rounded-lg flex flex-col items-center gap-1 transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer`}
        >
          <div className="flex flex-col items-center w-full mb-3">
            <h2 className="text-md font-semibold text-gray-800 whitespace-nowrap">
              {item.title}
            </h2>
            <div className="text-3xl text-gray-600 mt-3">{item.icon}</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Card;
