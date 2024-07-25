import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button } from "@/components(shadcn)/ui/button";
import * as XLSX from 'xlsx';

const TpAnalysis = ({ data }) => {
  if (!data || !data.length) {
    return <div>No data available.</div>;
  }

  // Process data for charts
  const sectors = [...new Set(data.flatMap(item => item.sector))];
  const sectorsCount = sectors.map(sector =>
    data.filter(item => item.sector.includes(sector)).length
  );

  const courses = [...new Set(data.flatMap(item => item.courses))];
  const coursesCount = courses.map(course =>
    data.filter(item => item.courses.includes(course)).length
  );

  const applicationsByStatus = data.reduce((acc, item) => {
    const status = item.applicationStatus;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status] += 1;
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
    labels: Object.keys(applicationsByStatus),
    datasets: [
      {
        label: "Applications by Status",
        data: Object.values(applicationsByStatus),
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
    labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Applications Over Time",
        data: data.map(item => item.sector.length), // Example data point
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  // Function to download data as Excel file
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'trainingpartner.xlsx');
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
      <Button onClick={handleDownloadExcel}>Download in Excel</Button>
    </div>
  );
};

export default TpAnalysis;
