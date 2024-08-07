import NotificationForf from '@/Components/Admin/Content/NotificationForf'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const AddNotification = ({children}) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    {/*top Bar */}
    <TopBar />
    {/* side bar */}
    <div className="min-h-screen bg-white text-black flex">
      <SideNav />

      {/* main page */}
 
      <NotificationForf>{children}</NotificationForf>
    </div>
  </div>
  )
}

export default AddNotification
