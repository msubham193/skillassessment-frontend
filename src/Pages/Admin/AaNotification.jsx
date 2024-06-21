import SideNav from '@/Components/Admin/SideNav'
import TopBar from '@/Components/Admin/TopBar'
import React from 'react'
import AaNotificationBoxContent from '@/Components/Admin/AaNotificationBoxContent'

const AaNotification = ({children}) => {
  return (
    <div>
    <div className='min-h-screen bg-white text-black flex flex-col'>
    {/*top Bar */}
    <TopBar/>
      {/* side bar */}
      <div className='min-h-screen bg-white text-black flex'>
      <SideNav/>
  
        {/* main page */}
        
        <AaNotificationBoxContent>{children}</AaNotificationBoxContent>
      </div>
      
      </div>
    </div>
  )
}

export default AaNotification
