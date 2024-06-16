import React, { Children } from 'react'
import SideNav from '@/Components/Traning Partner/SideNav'
import Content from '../../Components/Traning Partner/ui/Content'
const Dashboard = () => {
    return(
    <div className='min-h-screen bg-white text-black flex'>
    {/* side bar */}
    <SideNav />

      {/* main page */}
     <Content />
    </div>
    )
}

export default Dashboard