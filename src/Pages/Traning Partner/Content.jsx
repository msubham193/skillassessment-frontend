import { Button } from '@/components(shadcn)/ui/button';
import TopBar from '@/Components/Traning Partner/TopBar';
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';


const Content = () => {
  const [allBatch, setAllBatch] = useState([]);
  const trainingPartnerId = localStorage.getItem('trainingPartnerId');
  console.log(trainingPartnerId)
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

    fetchBatches();
  }, []);

  return (
    <div className="w-full">
      {/* Topbar content */}
      <div>
        <TopBar />
      </div>

      {/* Content Part */}
      <div className="p-4 bg-slate-400 h-full gap-2">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div>BatchName</div>
            <Eye />
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <Button className="text-xs">addTeacher</Button>
            <Button className="text-xs">addStudent</Button>
          </div>
        </div>
        
        {/* Display fetched batch data */}
        <div className="mt-4">
          {allBatch.length > 0 ? (
            allBatch.map((batch) => (
              <div key={batch._id} className="bg-white p-4 rounded-md shadow-md mb-2">
                <div className="flex justify-between items-center">
                  <div>{batch.name}</div>
                  <Eye />
                </div>
                <div className="flex flex-row gap-2 justify-center mt-2">
                  <Button className="text-xs">addTeacher</Button>
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



