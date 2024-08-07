/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

const BatchDetailsofAA = () => {
  const { batchId, examId } = useParams();
  const [batchData, setBatchData] = useState([]);
  const [studentslength, setStudentsLength] = useState(0);
  const [trainerslength, setTrainersLength] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedStartdDate, setFormattedStartdDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/batch/${batchId}`
        );
        console.log(response);
        setStudentsLength(response.data.data.students.length);
        setTrainersLength(response.data.data.trainers.length);
        setBatchData(response.data.data);

        const sdate = new Date(response.data.data.startDate);
        const startFormatted = format(sdate, "MMMM d, yyyy");
        setFormattedStartdDate(startFormatted);

        const edate = new Date(response.data.data.endDate);
        const endFormatted = format(edate, "MMMM d, yyyy");
        setFormattedEndDate(endFormatted);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchBatchDetails();
  }, [batchId]);

  const handleClickAttendanceSheet = () => {
    navigate(`/attendacesheet/${batchId}`);
  };

  const handleClickResultSheet = () => {
    navigate("/resultsheet");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error("Select a Date");
    }

    const formattedDate = format(selectedDate, "dd/M/yyyy");

    try {
      const d = formattedDate.toString();
      console.log(examId);
      const response = await axios.put(
        `http://localhost:8000/api/v1/exam/assesmentdate/${examId}`,
        {
          date: formattedDate.toString(),
        }
      );
      toast.success("Exam date set successfully");
    } catch (error) {
      console.error("Error setting exam date:", error);
      toast.error("Failed to set exam date");
    }
  };

  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
        <div className="w-full mt-5">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold mb-4">Batch Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch ID
                </h3>
                <p className="mt-2 text-md text-muted-foreground">{batchId}</p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch ABN
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.ABN_Number}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Created By
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.trainingOrganization}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. of Student
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {studentslength}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. of Trainers
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {trainerslength}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Starting date
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {formattedStartdDate}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch End Date
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {formattedEndDate}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Course
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.courseName}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Scheme
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.scheme}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Sector
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.sectorName}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under State
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.state}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">Status</h3>
                <p className="mt-2 text-ld font-semibold text-muted-foreground">
                  {batchData.status}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-10">
            <div className="flex flex-col p-6">
              <h2 className="text-2xl font-bold mb-4">Set Examination Date</h2>
              <form onSubmit={handleSubmit} className="flex gap-4">
                {/* <label className="font-medium">Select Date</label> */}
                <DatePicker
                  selected={selectedDate}
                  placeholderText="Select Date"
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="p-2 border border-black rounded-md"
                />
                <button
                  type="submit"
                  className="bg-green-800 rounded-md text-white p-2"
                >
                  Set Date
                </button>
                <Toaster />
              </form>
            </div>
            <div className="mt-16 p-2">
              <button
                className={
                  "bg-blue-700 p-2 w-40 rounded-md text-white font-semibold"
                }
                onClick={handleClickAttendanceSheet}
              >
                Attedance Sheet
              </button>
              <button
                className={
                  "bg-blue-700 ml-4 p-2 w-40 rounded-md text-white font-semibold"
                }
                onClick={handleClickResultSheet}
              >
                Result Sheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatchDetailsofAA;
