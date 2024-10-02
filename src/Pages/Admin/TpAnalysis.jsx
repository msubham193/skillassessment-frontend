import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button } from "@/components(shadcn)/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components(shadcn)/ui/card";
import { Download, BarChart, PieChart, LineChart } from 'lucide-react';
import * as XLSX from 'xlsx';

const TpAnalysis = ({ data }) => {
  if (!data || !data.length) {
    return <div>No data available.</div>;
  }

  // Group applications by month (Applications Over Time)
  const applicationsByMonth = data.reduce((acc, item) => {
    const month = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += 1;
    return acc;
  }, {});

  // Group applications by sector (Affiliation)
  const sectors = [...new Set(data.flatMap(item => item.sector))]; 
  const sectorsCount = sectors.map(sector =>
    data.filter(item => item.sector.includes(sector)).length
  );

  const applicationsByStatus = data.reduce((acc, item) => {
    const status = item.applicationStatus;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status] += 1;
    return acc;
  }, {});

  const barDataSectors = {
    labels: sectors,
    datasets: [
      {
        label: "Number of Applications by Affiliation (Sector)",
        data: sectorsCount,
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
    labels: Object.keys(applicationsByMonth), 
    datasets: [
      {
        label: "Applications Over Time (By Month)",
        data: Object.values(applicationsByMonth),
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
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Training Partner Analysis Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sectors</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sectors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Application</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(Math.max(...data.map(item => new Date(item.createdAt)))).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Applications Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <Line data={lineData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Applications by Affiliation (Sector)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={barDataSectors} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Applications by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Pie data={pieDataStatus} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleDownloadExcel} className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" /> Download Excel Report
        </Button>
      </div>
    </div>
  );
};

export default TpAnalysis;
