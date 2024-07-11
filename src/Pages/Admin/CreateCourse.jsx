import CreateCourseForm from '@/Components/Admin/Content/CreateCourseForm'
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import React from 'react'

const CreateCourse = ({children}) => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    {/*top Bar */}
    <TopBar />
    {/* side bar */}
    <div className="min-h-screen bg-white text-black flex">
      <SideNav />

      {/* main page */}

      <CreateCourseForm>{children}</CreateCourseForm>
    </div>
  </div>
  )
}

export default CreateCourse
