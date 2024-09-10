import React, { Children } from 'react'
import SideNav from '@/Components/Traning Partner/SideNav'
import Content from '../../Components/Traning Partner/ui/DashboardContent'
const Dashboard = () => {
    return(
    <div className='min-h-screen w-[100%]  text-black flex '> 
    {/* side bar */}
    <div  className=''> 
    <SideNav />
    </div>

      {/* main page */}
     
     <Content />
     </div>
    
    )
}

export default Dashboard