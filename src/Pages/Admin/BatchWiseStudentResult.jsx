import ResultContent from '@/Components/Admin/Content/ResultContent'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'
import { useParams } from 'react-router-dom'

const BatchWiseStudentResult = ({children}) => {        
    const { id } = useParams();
     
  return ( 
    <div>
    <div className='min-h-screen bg-white text-black flex flex-col'> 
    {/*top Bar */}
    <TopBar/>
      {/* side bar */}
      <div className='min-h-screen bg-white text-black flex'>
      <SideNav/>
  
        {/* main page
          here i fetch the student data in the basis of batch id....
          */}
        
        <ResultContent batchId={id}>{children}</ResultContent>
      </div>
      
      </div>
    </div>
  )
}

export default BatchWiseStudentResult
