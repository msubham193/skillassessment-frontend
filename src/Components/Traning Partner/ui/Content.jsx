import { Button } from '@/components(shadcn)/ui/button';
import TopBar from '@/Components/Traning Partner/TopBar';
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  const navigate = useNavigate();
  const [allBatch, setAllBatch] = useState([]);
  const trainingPartnerId = localStorage.getItem('trainingPartnerId');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/batch/tp/${trainingPartnerId}`, {
          method: "GET",
        });
        
        if (response.ok) {
          const data = await response.json();
          setAllBatch(data.data); // Assuming your API response has the data you need inside 'data'
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
  }, [trainingPartnerId]); // Only re-run the effect if trainingPartnerId changes

  return (
    <div className="w-full">
      {/* Topbar content */}
      <div>
        <TopBar />
      </div>

      {/* Content Part */}
      <div className="p-4 bg-slate-400 h-full gap-2">
        {/* Display fetched batch data */}
        <div className="mt-4">
          {allBatch.length > 0 ? (
            allBatch.map((batch) => (
              <div key={batch._id} className="bg-white p-4 rounded-md shadow-md mb-2 hover:bg-slate-100">
                <div className="flex justify-between items-center">
                  <div>{batch.name}</div>
                  <Eye />
                </div>
                <div className="flex flex-row gap-2 justify-center md:justify-end mt-2">
                  <Button className="text-xs" onClick={() => navigate("/trainingPartner/dashboard/CreateBatch/addteacher")}>addTeacher</Button>
                  <Button className="text-xs">addStudent</Button>
                </div>
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




