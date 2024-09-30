import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components(shadcn)/ui/dialog";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import DatePicker from "react-datepicker";
  import toast, { Toaster } from "react-hot-toast";
  
  const SetExamModal = ({ children, batchId, examId }) => {
    const [batchData, setBatchData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateSet, setIsDateSet] = useState(false);
    const navigate = useNavigate(); // Keep this for attendance/result sheet navigation
  
    useEffect(() => {
      const fetchBatchDetails = async () => {
        try {
          const response = await axios.get(`${server}/batch/${batchId}`);
          console.log(response);
          setBatchData(response.data.data);
        } catch (error) {
          console.error("Error fetching batch data:", error);
        }
  
        const storedDate = localStorage.getItem(`selectedDate_${examId}`);
        if (storedDate) {
          setSelectedDate(new Date(storedDate));
          setIsDateSet(true);
        }
      };
      fetchBatchDetails();
    }, [batchId, examId]);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }
  
      const formattedDate = selectedDate.toISOString();
  
      try {
        const response = await axios.put(`${server}/exam/assesmentdate/${examId}`, {
          date: formattedDate,
        });
        toast.success("Exam date set successfully");
        localStorage.setItem(`selectedDate_${examId}`, formattedDate);
        setIsDateSet(true);
      } catch (error) {
        console.error("Error setting exam date:", error);
        toast.error("Failed to set exam date");
      }
    };
  
    const handleClickAttendanceSheet = () => {
      navigate(`/attendacesheet/${examId}`);
    };
  
    const handleClickResultSheet = () => {
      navigate("/resultsheet");
    };
  
    return (
      <div>
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Set Exam Date</DialogTitle>
              <DialogDescription>
                Set the exam date and download necessary sheets.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 mt-10">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">Set Examination Date</h2>
                <p className={`font-medium mb-2 ${isDateSet ? "text-red-600" : "text-black"}`}>
                  The date can only be set once.
                </p>
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
                    className={`p-2 rounded-md text-white ${isDateSet ? "bg-gray-400" : "bg-green-800"}`}
                  >
                    Set Date
                  </button>
                </form>
                <Toaster />
              </div>
              <div className="mt-14 p-2">
                <button
                  className={`p-2 w-40 rounded-md text-white font-semibold ${
                    isDateSet ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleClickAttendanceSheet}
                  disabled={!isDateSet} // Disable if the date is not set
                >
                  Attendance Sheet
                </button>
                <button
                  className={`ml-4 p-2 w-40 rounded-md text-white font-semibold ${
                    isDateSet ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleClickResultSheet}
                  disabled={!isDateSet} // Disable if the date is not set
                >
                  Result Sheet
                </button>
              </div>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default SetExamModal;
  