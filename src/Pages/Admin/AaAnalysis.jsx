import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button } from "@/components(shadcn)/ui/button";
import * as XLSX from 'xlsx';
import { Card, CardContent, CardHeader, CardTitle } from "@/components(shadcn)/ui/card";
import { Download, BarChart, PieChart, LineChart } from 'lucide-react'
const AaAnalysis = ({ data }) => {
  if (!data || !data.length) {
    return <div>No data available.</div>;
  }

  // Process data for charts
  const courses = [...new Set(data.flatMap(item => item.courses))];
  const coursesCount = courses.map(course =>
    data.filter(item => item.courses.includes(course)).length
  );

  const statuses = [...new Set(data.map(item => item.applicationStatus))];
  const statusesCount = statuses.map(status =>
    data.filter(item => item.applicationStatus === status).length
  );

  const createdAtDates = data.map(item => new Date(item.createdAt).toLocaleDateString());
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

  // Function to download data as Excel file
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'assessment_agency.xlsx');
  };
  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Assessment Agency Analysis Dashboard
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
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
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
            <CardTitle className="text-xl font-semibold">Applications by Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={barDataCourses} options={{ maintainAspectRatio: false, responsive: true }} />
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

export default AaAnalysis;
