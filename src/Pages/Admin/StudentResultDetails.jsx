import SideNav from '@/Components/Admin/Content/SideNav';
import StudentResultDetailsBox from '@/Components/Admin/Content/StudentResultDetailsBox';
import TopBar from '@/Components/Admin/Content/TopBar';
import React from 'react'
import { useParams } from 'react-router-dom';

const StudentResultDetails = () => { 
    const { id } = useParams();    
    return (
      <>
        <div className="min-h-screen bg-white text-black flex flex-col">
          {/*top Bar */}
          <TopBar />
          {/* side bar */}
          <div className="min-h-screen bg-white text-black flex"> 
            <SideNav />
  
            {/* main page */}
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                  {/* add the functionality like search and filter */}
                  {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
                </div>
              </div>
              {/* Derails of Training Partner */}
              <StudentResultDetailsBox id={id}/>
            </div>
          </div>
        </div>
      </>
    );
}

export default StudentResultDetails
