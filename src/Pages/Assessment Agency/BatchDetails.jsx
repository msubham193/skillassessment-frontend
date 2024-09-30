/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { server } from "@/main";

const BatchDetails = () => {
  const { batchId, examId } = useParams(); 
  const [batchData, setBatchData] = useState([]);
  const [studentslength, setStudentsLength] = useState(0);
  const [trainerslength, setTrainersLength] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedStartdDate, setFormattedStartdDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [isDateSet, setIsDateSet] = useState(false);
  const [absentStudents, setAbsentStudents] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`${server}/batch/${batchId}`);
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

      const storedDate = localStorage.getItem(`selectedDate_${examId}`);
      if (storedDate) {
        setSelectedDate(new Date(storedDate));
        setIsDateSet(true);
      }
    };
    fetchBatchDetails();

  
    setAbsentStudents(localStorage.getItem(`absentSudent_${batchId}`));
  }, [batchId, examId]);

  const handleClickAttendanceSheet = () => {
    navigate(`/attendacesheet/${examId}`);
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

    const formattedDate = format(selectedDate, "dd/MM/yyyy");

    try {
      const response = await axios.put(
        `${server}/exam/assesmentdate/${examId}`,
        {
          date: formattedDate.toString(),
        }
      );
      console.log(selectedDate.toISOString())
      toast.success("Exam date set successfully");
      localStorage.setItem(
        `selectedDate_${examId}`,
        selectedDate.toISOString()
      );
      setIsDateSet(true);
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:gap-8">
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch ID
                </h3>
                <p className="mt-2 text-md text-muted-foreground">{batchId}</p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch ABN
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.ABN_Number}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Created By
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.trainingOrganization}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. of Student
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {studentslength}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. of Trainers
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {trainerslength}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Starting date
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {formattedStartdDate}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch End Date
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {formattedEndDate}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Course
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.courseName}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Scheme
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.scheme}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under Sector
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.sectorName}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Batch Under State
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {batchData.state}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">Status</h3>
                <p className="mt-2 text-ld font-semibold text-muted-foreground">
                  {batchData.status}
                </p>
              </div>
            </div>

            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. Of Present Student
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {studentslength - Number(absentStudents)}
                </p>
              </div>
            </div>
            <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  No. Of Absent Student
                </h3>
                <p className="mt-2 text-md text-muted-foreground">
                  {absentStudents}
                </p>
              </div>
            </div>
            {/* <div className="bg-white border group relative overflow-hidden rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Examination Data
                </h3>
                <p className="mt-2 text-ld font-semibold text-muted-foreground">
                  {selectedDate?.toISOString()}
                </p>
              </div>
            </div> */}
          </div>
          {/* have to copy from this and make some changes  */}
          <div className="flex gap-4 mt-10">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">Set Examination Date</h2>
              <p
                className={`font-medium mb-2 ${
                  isDateSet ? "text-red-600" : "text-black"
                }`}
              >
                Date can be selected only once.
              </p>
              <div className="flex flex-col">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <DatePicker
                    selected={selectedDate}
                    placeholderText="Select Date"
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 border border-black rounded-md"
                    disabled={isDateSet}
                  />
                  <button
                    type="submit"
                    disabled={isDateSet}
                    className={`p-2 rounded-md text-white ${
                      isDateSet ? "bg-gray-400" : "bg-green-800"
                    }`}
                  >
                    Set Date
                  </button>
                </form>
                <Toaster />
              </div>
            </div>
            <div className="mt-14 p-2">
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

export default BatchDetails;
