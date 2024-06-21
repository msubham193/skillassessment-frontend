import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import SideNav from '@/Components/Admin/SideNav'
import TopBar from '@/Components/Admin/TopBar'
import { useLocation } from 'react-router-dom';
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
