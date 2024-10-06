/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import * as XLSX from "xlsx";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { server } from "@/main";

const ViewReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [centerData, setCenterData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      const state = localStorage.getItem("state");
      const scheme = localStorage.getItem("scheme");
      try {
        const response = await axios.get(
          `${server}/sna/batches/all/query?state=${state}&scheme=${scheme}`
        );
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }

      try {
        const response = await axios.get(
          `${server}/center/sna/query?state=${state}&scheme=${scheme}`
        );
        console.log(response);
        setCenterData(response.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!data.length) {
    return <div className="text-3xl flex justify-center mt-16 font-sans text-red-900">No data available.</div>;
  }

  // Process data for charts
  const courses = [...new Set(data.map((item) => item.courseName))];
  const coursesCount = courses.map(
    (course) => data.filter((item) => item.courseName === course).length
  );

  const statuses = [...new Set(data.map((item) => item.status))];
  const statusesCount = statuses.map(
    (status) => data.filter((item) => item.status === status).length
  );

  const createdAtDates = data.map((item) =>
    new Date(item.createdAt).toLocaleDateString()
  );
  const applicationsOverTime = createdAtDates.reduce((acc, date) => {
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const barDataCourses = {
    labels: courses,
    datasets: [
      {
        label: "Number of Applications by Course",
        data: coursesCount,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieDataStatus = {
    labels: statuses,
    datasets: [
      {
        label: "Applications by Status",
        data: statusesCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(applicationsOverTime),
    datasets: [
      {
        label: "Applications Over Time",
        data: Object.values(applicationsOverTime),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  // Process data for payments
  const paymentData = data.map((item) => ({
    courseName: item.courseName,
    amountToPaid: item.amountToPaid,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  const paymentAmounts = paymentData.reduce((acc, item) => {
    if (!acc[item.courseName]) {
      acc[item.courseName] = 0;
    }
    acc[item.courseName] += item.amountToPaid;
    return acc;
  }, {});

  const barDataPayments = {
    labels: Object.keys(paymentAmounts),
    datasets: [
      {
        label: "Total Payments by Course",
        data: Object.values(paymentAmounts),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Function to download data as Excel file
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "batch.xlsx");
  };

  const handleDownloadExcelCenter = () => {
    const ws = XLSX.utils.json_to_sheet(centerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "center.xlsx");
  };
  return (
    <div>
      <h1 className="flex justify-center font-semibold underline text-xl">
        Applications Over Time
      </h1>
      <div className="flex justify-center">
        <div className="w-[900px]">
          <Line data={lineData} />
        </div>
      </div>
      <h2 className="flex justify-center font-semibold underline text-xl mt-10">
        Applications by Course
      </h2>
      <div className="flex justify-center">
        <div className="w-[900px]">
          <Bar data={barDataCourses} />
        </div>
      </div>
      <h2 className="flex justify-center font-semibold underline text-xl mt-10">
        Applications by Status
      </h2>
      <div className="flex justify-center">
        <div className="w-[400px] h-[400px]">
          <Pie data={pieDataStatus} />
        </div>
      </div>
      <h2 className="flex justify-center font-semibold underline text-xl mt-10">
        Total Payments by Course
      </h2>
      <div className="flex justify-center">
        <div className="w-[900px]">
          <Bar data={barDataPayments} />
        </div>
      </div>
      <div className="flex justify-evenly mt-10">
        <button
          onClick={handleDownloadExcel}
          className={`px-6 py-2 flex text-white rounded-lg transition duration-300 bg-green-600 hover:bg-green-700`}
        >
          {" "}
          <FaDownload className="mt-1 mr-2" />
          Download Batch Details in Excel
        </button>
        <button
          onClick={handleDownloadExcelCenter}
          className={`px-6 py-2 flex text-white rounded-lg transition duration-300 bg-green-600 hover:bg-green-700`}
        >
          {" "}
          <FaDownload className="mt-1 mr-2" />
          Download Center Details in Excel
        </button>
      </div>
    </div>
  );
};

export default ViewReports;
