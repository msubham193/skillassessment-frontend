import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { batchDataAtoms } from "@/Components/Traning Partner/Atoms/batchatom";
import { Button } from "@/components(shadcn)/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { BarChart } from "lucide-react";
import { Calendar } from "lucide-react";
import DataTable from "@/Components/Traning Partner/ui/DataTable";
import { columns } from "@/Components/Traning Partner/ui/coulmns";
const Batch = () => {
   const navigate = useNavigate();
   const batchData = useRecoilValue(batchDataAtoms);
   console.log("batch details", batchData);
   const [students, setStudents] = useState([]);
   const [Trainers, setTrainers] = useState([]);
   const getStatusClass = (status) => {
     switch (status) {
       case 'Completed':
         return 'text-green-700 bg-green-500';
       case 'onGoing':
         return 'text-yellow-700 bg-yellow-500';
       case 'Not Started':
         return 'text-red-700 bg-red-500';
       default:
         return '';
     }
   };
   
   return (
     <div className="w-full h-screen bg-[#1A1C21] py-3 px-5 ">
       {/* upper navbar section */}
       <div className="w-full h-12  flex justify-end items-center">
         <Button className="bg-blue-600" onClick={() => navigate("/trainingPartner/dashboard")}>
           Back to Dashboard
         </Button>
       </div>
       <hr className="bg-white h-[1px] border-none my-4" />
       {/* batch details section */}
       <div className="w-full h-auto flex flex-row ">
         {/* Batch Details */}
         <div className="w-[25%] flex flex-col gap-4">
           <h1 className="text-xl text-white font-semibold mb-5">Batch Description & Details</h1>
           <div>
             <div className='flex items-center gap-3'>
               <Building2 className='text-gray-300' size={30} />
               <h1 className='text-gray-400 font-semibold text-xl'>{batchData.name}</h1>
             </div>
           </div>
           <div>
             <div className='flex gap-2'>
               <BarChart className='text-gray-300 mt-1' size={30} />
               <h1 className={`font-semibold ${getStatusClass(batchData.status)} p-1 rounded bg-opacity-25 `}>
                 {batchData.status}
               </h1>
             </div>
           </div>
           <div className='mt-6 flex flex-col gap-4'>
             <div className='flex items-center gap-4 '>
               <Calendar className='text-white' />
               <h1 className='text-white'>Start Date - </h1>
               <p className='text-gray-400'>{new Date(batchData?.startDate).toLocaleDateString()}</p>
             </div>
             <div className='flex items-center gap-4 '>
               <Calendar className='text-white' />
               <h1 className='text-white'>End Date - </h1>
               <p className='text-gray-400'>{new Date(batchData?.endDate).toLocaleDateString()}</p>
             </div>
           </div>
         </div>
         <div className="bg-white w-[1px] h-screen mt-[-16px]"></div>
         {/* students and students Details */}
         <div className="w-[70%] ml-5 flex  flex-col gap-4">
           <div className="text-xl text-white  font-semibold"> Students</div>
           <div className="p-4">
            {/* tableeee */}
            <DataTable columns={columns} data={data} />
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default Batch;

 const data={
  name:"ajit",
  email:"ajit@gmail.com",
  course:"c++"
 }

