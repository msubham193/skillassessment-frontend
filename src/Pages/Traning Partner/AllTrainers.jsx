import ManageAllTrainerPage from '@/Components/Traning Partner/ui/ManageAllTrainerPage';
import React from 'react'
import TopBar from '@/Components/Traning Partner/TopBar';
import SideNav from '@/Components/Traning Partner/SideNav';
import { Button } from '@/components(shadcn)/ui/button';
import { useNavigate } from 'react-router-dom';
const AllTrainers = () => {
  const navigate = useNavigate();
    return (
        <div className="flex h-screen bg-gray-100">
          <SideNav />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          
              <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Trainers</h1>
                <Button className="mb-5 ml-6"
                onClick={() =>
                  navigate(
                    `/trainingPartner/dashboard/CreateBatch/addteacher`
                  )
                }
                >
                Add trainer
                </Button>
                <ManageAllTrainerPage /> 
              
              </div>
            </main>
          </div>
        </div>
      );
}

export default AllTrainers
