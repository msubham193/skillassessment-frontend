import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import HomeTable from '../ui/HomeTablist/HomeTable';
import { Button } from '@/components(shadcn)/ui/button';
import { toast } from 'react-toastify';
const ResultContent = ({ batchId }) => {  
  const [students, setSutdents] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [examId, setExamId] = useState("");
  const [exam, setExam] = useState({});
  const [attendanceSheet, setAttendanceSheet] = useState("");
  const [resultSheet, setResultSheet] = useState("");
  const [images, setImages] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);  
  const [isApproved, setIsApproved] = useState(false);


  // Fetch the student from batch by using batchID data
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/marks/batch/${batchId}`, {
          withCredentials: true,
        });
        setLoading(false);
        setSutdents(response.data.data?.marks.reverse());
        // console.log(response.data.data);
        // console.log(response.data.data[0]?.examId );
        setExamId(response.data.data?.marks[0]?.examId || ""); // Handle the case if data is empty
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchResultData();
  }, [batchId,isApproved]);

  // Fetch the exam data using the examId
  useEffect(() => {
    const fetchExamData = async () => {
      if (examId) {
        try {
          setLoading(true);
          const response = await axios.get(`${server}/exam/${examId}`, {
            withCredentials: true,
            headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
          });
          setLoading(false);
          setExam(response.data.data);
          // console.log(response.data.data)
          setAttendanceSheet(response.data.data.attendanceSheet);
          setResultSheet(response.data.data.resultSheet);
          setImages(response.data.data.images || []);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      }
    };
    fetchExamData();
  }, [examId]);

  // Functions for viewing sheets
  const viewAttendanceSheet = () => {
    attendanceSheet && window.open(attendanceSheet, '_blank');
  };
  const viewResultSheet = () => {

    resultSheet && window.open(resultSheet, '_blank');
  };


//function for show the assessment photo's
  const togglePhotos = () => {
    setShowPhotos(!showPhotos);
  };


  // Implement the approve and publish result logic here
  const approveAndPublish = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post( 
        `${server}/certificate/publish/exam/${examId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsApproved(true);
      toast.success(response.data.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a Mark list of All students present in this Batch!
          </p>
        </div>
      </div>
      {/* Data table for the student result */}
      <HomeTable
        filter1={"studentName"}
        path={`/admin/dasbord/studentMark`} 
        columns={columns}
        data={students}
        isLoading={loading}
      />
      <div className="flex justify-between">
        <Button className="mr-2" onClick={viewAttendanceSheet}>
          View Attendance Sheet
        </Button>
        <Button className="mr-2" onClick={viewResultSheet}>
          View Result Sheet
        </Button>
        <Button className="mr-2" onClick={togglePhotos}>
          {showPhotos ? "Hide Photos" : "View Photos"}
        </Button>
        <Button
        className="mr-2 bg-green-600"
        onClick={approveAndPublish}
        disabled={exam?.certificateIssued || isApproved}
      > 
        {loading ? "Loading..." : exam?.certificateIssued || isApproved ? "Published" : "Publish Result"}
      </Button>
      </div>
      {showPhotos && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.slice(0, 10).map((url, index) => (
            <img key={index} src={url} alt={`Photo ${index + 1}`} className="w-72 h-96" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultContent;

const columns = [
  {
    accessorKey: "studentName",
    header: "Name",
  },
  {
    accessorKey: "studentRedgNo",
    header: "Redg No",
  },
  {
    accessorKey: "totalTheorymark",
    header: "Theory mark",
  },
  {
    accessorKey: "totalPracticalMark",
    header: "Practical mark",
  },
  {
    accessorKey: "totalVivaMark",
    header: "Viva mark",
  },
  {
    accessorKey: "total",
    header: "Total mark",
  },
  {
    accessorKey: "Result",
    header: "Result",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-100 text-red-500": row.getValue("Result") === "Fail",
            "bg-green-100 text-green-400": row.getValue("Result") === "Pass",
          })}
        >
          {row.getValue("Result")}
        </div>
      );
    },
  },
];
