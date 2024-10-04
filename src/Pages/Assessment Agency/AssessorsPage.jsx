/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  examIdState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "@/main";

const AssessorsPage = () => {
  const navigate = useNavigate();
  const [assessorData, setAssessorData] = useState([]); // Initialize as an empty array
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(assessmentAgencyId);
        const response = await axios.get(
          `${server}/assessor/aa/${assessmentAgencyId}`
        );
        console.log(response.data.data); // Ensure the structure matches your needs
        const data = response.data.data;

        // Wrap the response in an array if it is an object
        if (data && !Array.isArray(data)) {
          setAssessorData([data]);
        } else {
          setAssessorData(data);
        }
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto mt-1 border rounded-lg shadow-lg">
        <div className="p-2">
          <h1 className="text-2xl font-bold">All Assessors List</h1>
          <p className="text-gray-600 mb-4">Currently Available Assessors</p>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead className="">
            <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
              <th className="px-4 py-3 text-left font-medium">SL NO</th>
              <th className="px-4 py-3 text-left font-medium">Id</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">
                Qualifications
              </th>
              <th className="px-4 py-3 text-center font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Phone NO.</th>
              <th className="px-4 py-3 text-left font-medium">Sector</th>
              <th className="px-4 py-3 text-left font-medium">Aadhar No.</th>
              <th className="px-4 py-3 text-left font-medium">Pan No.</th>
              <th className="px-4 py-3 text-left font-medium">Address</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {assessorData.map((assessor,index) => (
              <tr
                key={assessor._id}
                className="cursor-pointer hover:bg-gray-200"
              >
                <td className="px-4 py-3">{index+1}</td>
                <td className="px-4 py-3">{assessor.assesoraId}</td>
                <td className="px-4 py-3">{assessor.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <div>{assessor.education_qualification_1}</div>
                    <div>{assessor.education_qualification_2}</div>
                    <div> {assessor.education_qualification_3}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">{assessor.email}</td>
                <td className="px-4 py-3">{assessor.phoneNumber}</td>
                <td className="px-4 py-3">{assessor.sector}</td>
                <td className="px-4 py-3">{assessor.adharNumber}</td>
                <td className="px-4 py-3">{assessor.panNumber}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <div>{assessor.city}, {assessor.dist}</div>
                    <div>{assessor.state}, {assessor.pincode}</div>{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex justify-end">
        <ToastContainer />
      </div>
    </div>
  );
};

export default AssessorsPage;
