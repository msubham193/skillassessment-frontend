import { Button } from '@/components(shadcn)/ui/button';
import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, GraduationCapIcon, MapPinIcon, BuildingIcon, UserIcon, BookOpenIcon, BriefcaseIcon, LayersIcon } from 'lucide-react'
import MakePayment from './MakePayment';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components(shadcn)/ui/card';
import { Badge } from '@/components(shadcn)/ui/badge';

const ExamDetailsBox = ({id}) => {
  // console.log("exam id is",id);
    const [data, setData] = useState({});
    const [loding, setLoding] = useState(false);
    const[batchId,setBatchId]=useState(null);
    const [showPreInvoice, setShowPreInvoice] = useState(false); 
    const navigate=useNavigate();
    //function for fetch exam details by id
    useEffect(() => {
        try {
          setLoding(true);
          axios
            .get(`${server}/exam/${id}`, {
              withCredentials: true,
              headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
            })
            .then((response) => {
              setLoding(false);
              setData(response.data?.data);
              setBatchId(response.data?.data?.batchId._id)
              console.log(response.data?.data)
            });
        } catch (error) {
          setLoding(false);
          console.error("Error fetching training partner:", error);
          throw error;
        }
      }, []);
      //funcrion for navigation..
      const handleViewResult = () => {
        //eexam detail's have  batch id by the basis of batch id i find the list of studen....
        navigate(`/admin/dasbord/batch/mark/students/${batchId}`);
      };
  return (
    <div>
    <Card className="w-full mt-5">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Exam Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem
          icon={<BuildingIcon className="w-5 h-5" />}
          label="Training Partner"
          value={data?.TrainingOrganization}
        />
        <InfoItem
          icon={<UserIcon className="w-5 h-5" />}
          label="Assessment Agency"
          value={data?.assesmentAgency}
        />
        <InfoItem
          icon={<LayersIcon className="w-5 h-5" />}
          label="Batch ABN No"
          value={data?.batchABN}
        />
        <InfoItem
          icon={<GraduationCapIcon className="w-5 h-5" />}
          label="No of Students"
          value={data?.batchId?.students.length}
          highlight
        />
        <InfoItem
          icon={<BuildingIcon className="w-5 h-5" />}
          label="Center Name"
          value={data?.batchId?.centerName}
          highlight
        />
        <InfoItem
          icon={<CalendarIcon className="w-5 h-5" />}
          label="Date of Examination"
          value={formatDate(data?.date)}
        />
        <InfoItem
          icon={<CalendarIcon className="w-5 h-5" />}
          label="Date of Upload"
          value={formatDate(data?.updatedAt)}
        />
        <InfoItem
          icon={<BookOpenIcon className="w-5 h-5" />}
          label="Exam Under Course"
          value={data?.course}
        />
        <InfoItem
          icon={<BriefcaseIcon className="w-5 h-5" />}
          label="Exam Under Scheme"
          value={data?.scheme}
        />
        <InfoItem
          icon={<LayersIcon className="w-5 h-5" />}
          label="Exam Under Sector"
          value={data?.sector}
        />
        <InfoItem
          icon={<MapPinIcon className="w-5 h-5" />}
          label="Batch Under State"
          value={data?.state}
        />
       <InfoItem
            label="Status"
            value={
              <Badge variant={data.status === "completed" ? "success" : "secondary"}>
                {data?.status === "completed" ? "Completed" : "Not Started"}
              </Badge>
            }
          />
          <InfoItem
            label="Payment Status"
            value={
              <Badge variant={data.paymentStatus ? "success" : "destructive"}>
                {data.paymentStatus ? "Paid" : "Unpaid"}
              </Badge>
            }
          />
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      {data?.markUploadAndExamCompleteStatus && (
        <Button onClick={handleViewResult} variant="default">
          View Result
        </Button>
      )}
    </CardFooter>
  </Card>
    </div>
  )
}

export default ExamDetailsBox


function InfoItem({ icon, label, value, highlight = false }) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="text-sm font-medium text-muted-foreground flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
      <div className={`text-lg font-semibold ${highlight ? 'text-primary' : ''}`}>
        {value}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
