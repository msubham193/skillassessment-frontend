/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaCalendar, FaRegBuilding } from "react-icons/fa"; // Example icons
import TrainingCenters from "../../Components/Sna/TrainingCentres";
import TrainingBatches from "../../Components/Sna/TrainingBatches";
import { server } from "@/main";


const SummaryCard = ({ title, value, bgColor }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 ${bgColor} rounded-lg shadow-md`}
    >
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const SNADashboard = () => {
  const [details, setDetails] = useState([]); 
  const state = localStorage.getItem("state");
  const scheme = localStorage.getItem("scheme");

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `${server}/sna/batches/all/query?state=${state}&scheme=${scheme}`
        );
        const { data } = response.data;
        console.log(data);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [scheme, state]);

  const totalBatches = details.length;
  const completedBatches = details.filter(
    (batch) => batch.batchCompletedStatus
  ).length;
  const activeBatches = details.filter(
    (batch) => batch.batchActivePermission
  ).length;
  const pendingPayments = details.filter(
    (batch) => !batch.paymentStatus
  ).length;

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Batches"
          value={totalBatches}
          bgColor="bg-blue-500"
        />
        <SummaryCard
          title="Completed Batches"
          value={completedBatches}
          bgColor="bg-green-500"
        />
        <SummaryCard
          title="Active Batches"
          value={activeBatches}
          bgColor="bg-yellow-500"
        />
        <SummaryCard
          title="Pending Payments"
          value={pendingPayments}
          bgColor="bg-red-500"  
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

export default SNADashboard;
