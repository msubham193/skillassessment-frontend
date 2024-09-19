/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components(shadcn)/ui/card";
import {Avatar, AvatarFallback, AvatarImage } from "@/components(shadcn)/ui/avatar";
import {Badge } from "@/components(shadcn)/ui/badge";
import Loder from "@/Components/Admin/ui/Loder";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { CalendarDays, Mail, Phone, MapPin, GraduationCap, Briefcase, Clock } from "lucide-react"
const StudentDetails = () => {
  const { studentId } = useParams();
  const [studentdata, setStudentdata] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(studentId);
  //function for retrieve student details by id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const respone = await axios.get(`${server}/student/${studentId}`);
        console.log(respone.data.data);
        setStudentdata(respone.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Loder />;
  function InfoItem({ icon, label, value }) {
    return (
      <div className="flex items-center space-x-2">
        {icon && <div className="text-indigo-500">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-sm text-gray-900">{value}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
          <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-2">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={studentdata?.profilepic} alt={studentdata?.name} />
              <AvatarFallback className="text-3xl">{studentdata?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{studentdata?.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                  {studentdata?.course}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                  {studentdata?.sector_name}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </div>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={studentdata?.email} />
            <InfoItem icon={<Phone className="w-5 h-5" />} label="Mobile" value={studentdata?.mobile} />
            <InfoItem icon={<CalendarDays className="w-5 h-5" />} label="Date of Birth" value={formatDate(studentdata?.dob)} />
            <InfoItem icon={<MapPin className="w-5 h-5" />} label="Address" value={`${studentdata?.address}, ${studentdata?.city}, ${studentdata?.district}, ${studentdata?.state} - ${studentdata?.pincode}`} />
          </div>
          <div className="space-y-4">
            <InfoItem icon={<GraduationCap className="w-5 h-5" />} label="Registration No." value={studentdata?.redg_No} />
            <InfoItem icon={<Briefcase className="w-5 h-5" />} label="MPR ID" value={studentdata?.MPR_Id} />
            <InfoItem icon={<CalendarDays className="w-5 h-5" />} label="Training Period" value={`${formatDate(studentdata?.traininstartdate)} - ${formatDate(studentdata?.trainingenddate)}`} />
            <InfoItem icon={<Clock className="w-5 h-5" />} label="Training Hours" value={`${studentdata?.trainingHours} hours`} />
          </div>
        </CardContent>
        <div className="bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <InfoItem label="Gender" value={studentdata?.gender} />
            <InfoItem label="Nationality" value={studentdata?.nationality} />
            <InfoItem label="Religion" value={studentdata?.religion} />
            <InfoItem label="Category" value={studentdata?.category} />
            <InfoItem label="Father's Name" value={studentdata?.fathername} />
            <InfoItem label="Mother's Name" value={studentdata?.mothername} />
            <InfoItem label="Qualification" value={studentdata?.generalqualification} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDetails;
