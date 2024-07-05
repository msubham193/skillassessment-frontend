import React from 'react'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Traning Partner/Signup'
import Dashboard from './Pages/Traning Partner/Dashboard'
import { ToastContainer } from 'react-toastify';
import Teachers from './Pages/Traning Partner/Teachers'
import CreateBatch from './Pages/Traning Partner/CreateBatch'
import AddTeacher from './Pages/Traning Partner/AddTeacher'
import Signin from './Pages/Traning Partner/Signin'
import ApllicationStatusFail from './Pages/Traning Partner/ApllicationStatusFail'
import AddStudent from './Pages/Traning Partner/AddStudent'
import { useRecoilValue } from 'recoil'
import { batchDataAtoms } from './Components/Traning Partner/Atoms/batchatom'
import Batch from './Pages/Traning Partner/Batch'
import { tpDataAtoms } from './Components/Traning Partner/Atoms/trainingPartnerData'
import ProtectedRoute from './Components/Traning Partner/utils/ProtectedRoute'
import Student from './Pages/Traning Partner/Student'
const App = () => {
  const Batchdata=useRecoilValue(batchDataAtoms)
  const batchId=Batchdata._id
  const tpData=useRecoilValue(tpDataAtoms )
  return (
    <div >
    <Routes>
    <Route path='/admin/dasbord' exact element={<AdminDashboard children="hii"/>}/>
    <Route
          path="/trainingPartner/dashboard"
          element={<ProtectedRoute applicationStatus={tpData.applicationStatus} element={Dashboard} />}
        />
    <Route path='/trainingPartner/signup' exact element={ <Signup /> } />
    <Route path='/statusFail' exact element={ <ApllicationStatusFail /> } />
    <Route path='/trainingPartner/signin' exact element={ <Signin /> } />
    <Route path='/trainingPartner/dashboard/Teachers' exact element={<Teachers />} />
    <Route path='/trainingPartner/dashboard/CreateBatch' exact element={<CreateBatch />} />
    <Route path='/trainingPartner/dashboard/CreateBatch/addteacher/:id' exact element={<AddTeacher />} />
    <Route path='/trainingPartner/dashboard/CreateBatch/addstudent/:id' exact  element={<AddStudent>{'Add Student'}</AddStudent>} />
    <Route path='/trainingPartner/dashboard/:batchId' element={<Batch />} />
    <Route path='/trainingPartner/dashboard/student/:Id' element={<Student />} />
    </Routes>
    <ToastContainer />
    </div>
  )
}

export default App
