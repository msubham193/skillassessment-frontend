import React, { useEffect, useState } from 'react';
import SideNav from '@/Components/Traning Partner/SideNav';
import TopBar from '@/Components/Traning Partner/TopBar';
import TranscriptManage from '@/Components/Traning Partner/ui/TranscriptManage';
import { server } from '@/main';
const Transcript = () => {
  const [batches, setBatches] = useState([]);
  const trainingPartnerId = localStorage.getItem("trainingPartnerId");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(
          `${server}/batch/tp/${trainingPartnerId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBatches(data.data);
        } else {
          console.error("Failed to fetch batches");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (trainingPartnerId) {
      fetchBatches();
    }
  }, [trainingPartnerId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100"> 
          <div className="container mx-auto px-6 py-8"> 
            
           <TranscriptManage />
           </div> 
        </main> 
      </div>
    </div>
  );
}

export default Transcript;
