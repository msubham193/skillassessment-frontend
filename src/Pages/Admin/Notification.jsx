import NotificationContent from '@/Components/Admin/Content/NotificationContent'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const Notification = ({ children }) => {
  return (

   <>
   <div className="min-h-screen bg-white text-black flex flex-col">
     {/*top Bar */}
     <TopBar />
     {/* side bar */}
     <div className="min-h-screen bg-white text-black flex">
       <SideNav />
 
       {/* main page */}

       <NotificationContent>{children}</NotificationContent>  
     </div>
   </div>
   </>
  )
}

export default Notification
