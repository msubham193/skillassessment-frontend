import React from 'react'
import AdminContent from './AdminContent'
import SideNav from '@/Components/Admin/SideNav'

const AdminDashboard = ({children}) => {
  return (
    <div className='min-h-screen bg-white text-black flex'>
    {/* side bar */}
    <SideNav/>

      {/* main page */}
      <AdminContent>{children}</AdminContent>
    </div>
  )
}

export default AdminDashboard
