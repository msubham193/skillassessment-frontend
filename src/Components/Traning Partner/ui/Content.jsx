import { Button } from '@/components(shadcn)/ui/button';
import TopBar from '@/Components/Traning Partner/TopBar';
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { batchDataAtoms } from '../Atoms/batchatom';
const Content = () => {
  const navigate = useNavigate();
  const [allBatch, setAllBatch] = useState([]);
  const setBatchData = useSetRecoilState(batchDataAtoms);
  const trainingPartnerId = localStorage.getItem('trainingPartnerId');

  const handelView = async (batchid) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/batch/${batchid}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        console.log(data.data);
        navigate(`/trainingPartner/dashboard/${batchid}`);
      } else {
        console.error('Failed to fetch batches');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/batch/tp/${trainingPartnerId}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.data)
          setAllBatch(data.data);
        } else {
          console.error('Failed to fetch batches');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (trainingPartnerId) {
      fetchBatches();
    }
  }, [trainingPartnerId]);
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-700';
      case 'onGoing':
        return 'text-yellow-500 ';
      case 'Not Started':
        return 'text-red-700 ';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      {/* Topbar content */}
      <div>
        <TopBar />
      </div>
     <div className='h-[0.5px] w-full bg-white'></div>
      {/* Content Part */}
      <div className="py-3 px-5 bg-[#0C0C0C] h-full gap-2">
        <div className="mt-4">
          {allBatch.length > 0 ? (
            allBatch.map((batch) => (
              <div key={batch._id} className="  mt-10 px-7  cursor-pointer   rounded-md shadow-md mb-2 ">
                <div className="flex  justify-between  items-center">
                  <div className=' flex justify-between  w-full items-center'>
                  <div className='text-white w-full '>{batch.name}</div>
                  <div className={` w-full  items-center bg-opacity-25 rounded-md p-1 ${getStatusClass(batch.status)}`}>{batch.status}</div>
                  <div className='flex flex-col justify-center items-center text-orange-600'> <Eye className=' mt-1 ' onClick={() => handelView(batch._id)} />
                    <h1>view</h1>
                  </div>
                  </div>
                
                <div className="flex flex-row gap-2 justify-center md:justify-end w-full ">
                  <Button className="text-xs text-violet-500 px-4 py-1  mt-2 bg-violet-700 bg-opacity-25  " onClick={() => navigate(`/trainingPartner/dashboard/CreateBatch/addteacher/${batch._id}`)}>Add Teacher</Button>
                  <Button className="text-xs text-green-400 px-4 py-1  mt-2 bg-green-700 bg-opacity-25" onClick={() => navigate(`/trainingPartner/dashboard/CreateBatch/addstudent/${batch._id}`)}>Add Student</Button>
                </div>
                </div>
                <div className='w-full border border-gray-800 mt-4 '></div>
              </div>
            ))
          ) : (
            <div>No batches found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;




