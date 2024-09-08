import AllBatchTabs from '@/Components/Admin/Content/AllBatchTabs'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const AllBAtch = ({children}) => {    

  return (
  <>
   <div className="min-h-screen bg-white text-black flex flex-col">
     {/*top Bar */}
     <TopBar />
     {/* side bar */}
     <div className="min-h-screen bg-white text-black flex">
       <SideNav />
 
       {/* main page */}
 
       <AllBatchTabs>{children}</AllBatchTabs>  
     </div>
   </div>
   </>
  )
}

export default AllBAtch
 