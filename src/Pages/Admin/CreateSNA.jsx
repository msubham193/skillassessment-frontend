import CreateSnaForm from '@/Components/Admin/Content/CreateSnaForm'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const CreateSNA = ({children}) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    {/*top Bar */}
    <TopBar />
    {/* side bar */}
    <div className="min-h-screen bg-white text-black flex">
      <SideNav />

      {/* main page */}

      <CreateSnaForm>{children}</CreateSnaForm>
    </div> 
  </div>
  )
}

export default CreateSNA
