/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect } from "react";
import { FaBuilding, FaCalendar, FaRegBuilding } from "react-icons/fa"; // Example icons
import TrainingCenters from "./TrainingCentres";
import TrainingBatches from "./TrainingBatches";

const Card = ({ title, count, pending, approved, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-64 transform transition-transform duration-300 hover:scale-105">
      <div className="flex items- justify-between">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div className="text-gray-800 text-xl mb-4">{icon}</div>
      </div>
      <div className="mb-2 flex flex-col">
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <div className="flex justify-start gap-2 text-sm text-gray-600">
          <span>Pending: {pending}</span>
          <span>Approved: {approved}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const state = localStorage.getItem("state");
        const scheme = localStorage.getItem("scheme");
        console.log(state);
        console.log(scheme);
        const response = await axios.get(
          `http://localhost:8000/api/v1/sna/batch/query`,
          {
            params: {
              state,
              scheme,
            },
          }
        );
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });
  return (
    <>
      <div className="flex flex-wrap justify-around">
        <Card
          title="Total Training Centers"
          count={120}
          pending={10}
          approved={110}
          icon={<FaBuilding />}
        />
        <Card
          title="Total Batches"
          count={45}
          pending={5}
          approved={40}
          icon={<FaCalendar />}
        />
        <Card
          title="Agencies Registered"
          count={30}
          pending={2}
          approved={28}
          icon={<FaRegBuilding />}
        />
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white mt-4 p-4">
        <TrainingCenters />
      </div>

      <div className="bg-white rounded-lg shadow-lg mt-4 p-4">
        <TrainingBatches />
      </div>
    </>
  );
};

export default Dashboard;
