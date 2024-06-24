import React from 'react';
import { useRecoilValue } from 'recoil';
import { batchDataAtoms } from '@/Components/Traning Partner/Atoms/batchatom';
import { Button } from '@/components(shadcn)/ui/button';
import { useNavigate } from 'react-router-dom';
const Batch = () => {
  const navigate=useNavigate()
  const batchData = useRecoilValue(batchDataAtoms);

  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <div className=' flex justify-between'>
      <h1 className="text-2xl font-bold mb-4">Batch Details</h1>
      <Button onClick={()=>navigate('/trainingPartner/dashboard')}>Back to Dashboard</Button>
      </div>
    
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">{batchData?.name}</h2>
        <p><strong>Created By:</strong> {batchData?.createdBy?.organizationName}</p>
        <p><strong>Duration:</strong> {new Date(batchData?.startDate).toLocaleDateString()} - {new Date(batchData?.endDate).toLocaleDateString()}</p> 
        <p><strong>Status:</strong> {batchData?.status}</p>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Students</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          (batchData?.students?.length === 0)
          ? <p>No students found</p>
          : batchData?.students?.map((student) => (
              <div key={student._id} className="bg-white p-4 rounded-md shadow-md hover:bg-slate-100">
                <h4 className="text-lg font-semibold">{student.name}</h4>
                <p><strong>ID:</strong> {student._id}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
            ))
        }
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Teachers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          (batchData?.trainers?.length === 0)
          ? <p>No teachers found</p>
          : batchData?.trainers?.map((teacher) => (
              <div key={teacher._id} className="bg-white p-4 rounded-md shadow-md hover:bg-slate-100">
                <h4 className="text-lg font-semibold">{teacher.name}</h4>
                <p><strong>ID:</strong> {teacher._id}</p>
                <p><strong>Email:</strong> {teacher.email}</p>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Batch;
