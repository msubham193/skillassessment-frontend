import React from 'react'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div >
    <Routes>
    <Route path='/admin/dasbord' exact element={<AdminDashboard/>}/>
    </Routes>
    </div>
  )
}

export default App
