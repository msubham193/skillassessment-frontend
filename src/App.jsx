import React from 'react'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Traning Partner/Signup'
import Dashboard from './Pages/Traning Partner/Dashboard'
import { ToastContainer } from 'react-toastify';
import Teachers from './Pages/Traning Partner/Teachers'
import CreateBatch from './Components/Traning Partner/ui/CreateBatch'
import AddTeacher from './Components/Traning Partner/ui/AddTeacher'
import Signin from './Pages/Traning Partner/Signin'
import ApllicationStatusFail from './Pages/Traning Partner/ApllicationStatusFail'

const App = () => {
  return (
    <div >
    <Routes>
    <Route path='/admin/dasbord' exact element={<AdminDashboard children="hii"/>}/>
    <Route path='/trainingPartner/dashboard' exact element={<Dashboard />}  />
    <Route path='/trainingPartner/signup' exact element={ <Signup /> } />
    <Route path='/statusFail' exact element={ <ApllicationStatusFail /> } />
    <Route path='/trainingPartner/signin' exact element={ <Signin /> } />
    <Route path='/trainingPartner/dashboard/Teachers' exact element={<Teachers />} />
    <Route path='/trainingPartner/dashboard/CreateBatch' exact element={<CreateBatch />} />
    <Route path='/trainingPartner/dashboard/CreateBatch/addteacher' exact  element={<AddTeacher>{'Add Teacher'}</AddTeacher>} />
    </Routes>
    <ToastContainer />
    </div>
  )
}

export default App
