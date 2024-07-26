import CreateSchemeForm from '@/Components/Admin/Content/CreateSchemeForm'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const CreateScheme = ({children}) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    {/*top Bar */}
    <TopBar />
    {/* side bar */}
    <div className="min-h-screen bg-white text-black flex">
      <SideNav />

      {/* main page */}

      <CreateSchemeForm>{children}</CreateSchemeForm>
    </div> 
  </div>
  )
}

export default CreateScheme
