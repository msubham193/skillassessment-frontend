import React from 'react'
import AdminContent from '../../Components/Admin/Content/AdminContent'
import TopBar from '@/Components/Admin/Content/TopBar';
import SideNav from '@/Components/Admin/Content/SideNav';
const AdminDashboard = ({children}) => {
   
  return (
    <div className='min-h-screen bg-white text-black flex flex-col'>
  {/*top Bar */}
  <TopBar/>
    {/* side bar */}
    <div className='min-h-screen bg-white text-black flex'>
    <SideNav/>

      {/* main page */}
      <AdminContent>{children}</AdminContent>
     
    </div>
    
    </div>
  )
}

export default AdminDashboard
