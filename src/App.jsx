import React, { useEffect } from "react";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { Route, Routes } from "react-router-dom";
import TpDetails from "./Pages/Admin/TpDetails";
import AaDetails from "./Pages/Admin/AaDetails";
import AaNotification from "./Pages/Admin/AccessmentAgeencyDAta";
import TpNotification from "./Pages/Admin/TraningPartnerData";
import AdminLogin from "./Pages/Admin/AdminLogin";
import ProtectedRout from "./ProtectedRout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticationState } from "./Pages/Admin/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkTokenValidity } from "./Pages/Admin/Atoms/utils";
import BatchDetails from "./Pages/Admin/BatchDetails";
import Notification from "./Pages/Admin/Notification";
import CreateCourse from "./Pages/Admin/CreateCourse";
import CreateScheme from "./Pages/Admin/CreateScheme";
import ProtectedRoute from "./Components/Traning Partner/utils/ProtectedRoute";
import StudentResultDetails from "./Pages/Admin/StudentResultDetails";
import BatchWiseStudentResult from "./Pages/Admin/BatchWiseStudentResult";
import AllBAtch from "./Pages/Admin/AllBAtch";
import CreateCertificate from "./Pages/Admin/CreateCertificate";
import PaymentDEtails from "./Pages/Admin/PaymentDEtails";
import BathAnalysis from "./Pages/Admin/BathAnalysis";
import UpdateBatchBox from "./Pages/Admin/UpdateBatchBox";
import ExamDetails from "./Pages/Admin/ExamDetails";
import AaPaymentInvoice from "./Pages/Admin/AaPaymentInvoice";
import AllExam from "./Components/Admin/ui/HomeTablist/AllExam";
import Signup from "./Pages/Traning Partner/Signup";
import ApllicationStatusFail from "./Pages/Traning Partner/ApllicationStatusFail";
import Signin from "./Pages/Traning Partner/Signin";
import ProfilePopup from "./Pages/Traning Partner/ProfilePopup";
import Teachers from "./Pages/Traning Partner/Teachers";
import CreateBatch from "./Pages/Traning Partner/CreateBatch";
import AddTeacher from "./Pages/Traning Partner/AddTeacher";
import AddStudent from "./Pages/Traning Partner/AddStudent";
import Batch from "./Pages/Traning Partner/Batch";
import Student from "./Pages/Traning Partner/Student";
import { batchDataAtoms } from "./Components/Traning Partner/Atoms/batchatom";
import { tpDataAtoms } from "./Components/Traning Partner/Atoms/trainingPartnerData";
import Dashboard from "./Pages/Traning Partner/Dashboard";
import Setting from "./Pages/Traning Partner/Setting";
import CreateCenter from "./Pages/Traning Partner/CreateCenter";
import ManageBatch from "./Pages/Traning Partner/ManageBatch";
import Transcript from "./Pages/Traning Partner/Transcript";
import { CompeltebatchDataAtoms } from "./Components/Traning Partner/Atoms/completeBtachAtom";
import CompeteBtachData from "./Pages/Traning Partner/CompeteBtachData";
import AllTrainers from "./Pages/Traning Partner/AllTrainers";  
  const App = () => {
    //code for admin
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const isAdmin = useRecoilValue(authenticationState);
    const specificEmail = "adminaccount@cutm.ac.in";
    useEffect(() => {
      const isTokenValid = checkTokenValidity();
      if (isTokenValid) {
        const token = localStorage.getItem("adminAuthToken");
        const email = localStorage.getItem("specificEmail");
      setAuthState({
        isAuthenticated: true,
        token: token,
        email:email
      });
    }
  }, [setAuthState]);

//code for traning partner

  const Batchdata=useRecoilValue(batchDataAtoms)
  const CompleteBatchData=useRecoilValue(CompeltebatchDataAtoms)
  const batchId=Batchdata._id;
  const completebatchId=CompleteBatchData._id
  // console.log(batchId);
  const tpData=useRecoilValue(tpDataAtoms )
  const tpId=localStorage.getItem("trainingPartnerId");


    return (
      <div>
      <Routes>
        <Route path="/adminLogin" exact element={<AdminLogin />} />
        <Route element={<ProtectedRout />}>
          {isAdmin?.email === specificEmail ? (
            <>
            <Route path="/admin/dasbord" exact element={<AdminDashboard />} />
              <Route
                path="/admin/dasbord/PaymentsDetails"
                exact
                element={<PaymentDEtails />}
              />
              <Route
                path="/admin/dasbord/Aa/invoice/payment/update/:id"
                exact
                element={<AaPaymentInvoice />}
              />
            </>
          ) : (
            <>
              <Route path="/admin/dasbord" exact element={<AdminDashboard />} />
              <Route path="/admin/dasbord/batch" exact element={<AllBAtch />} />
              <Route path="/admin/dasbord/AllExam" exact element={<AllExam />} />
              <Route
                path="/admin/dasbord/batch/mark/students/:id"
                exact
                element={<BatchWiseStudentResult />}
              />
              <Route
                path="/admin/dasbord/studentMark/:id"
                exact
                element={<StudentResultDetails />}
              />
              <Route
                path="/admin/dasbord/TreaningPartner"
                exact
                element={<TpNotification />}
              />
              <Route
                path="/admin/dasbord/AssessmentAgency"
                exact
                element={<AaNotification />}
              />
              <Route
                path="/admin/dasbord/Notification"
                exact
                element={<Notification />}
              />
              <Route
                path="/admin/dasbord/TreaningPartner/:id"
                exact
                element={<TpDetails />}
              />
              <Route
                path="/admin/dasbord/Notification/tp/:id"
                exact
                element={<TpDetails />}
              />
              <Route
                path="/admin/dasbord/allExam/:id"
                exact
                element={<ExamDetails />}
              />
              <Route
                path="/admin/dasbord/AssessmentAgency/:id"
                exact
                element={<AaDetails />}
              />
              <Route
                path="/admin/dasbord/Notification/aa/:id"
                exact
                element={<AaDetails />}
              />
              <Route path="/admin/dasbord/:id" exact element={<BatchDetails />} />
              <Route
                path="/admin/dasbord/createCourse"
                exact
                element={<CreateCourse />}
              />
              <Route
                path="/admin/dasbord/createScheme"
                exact
                element={<CreateScheme />}
              />
              <Route
                path="/admin/dasbord/createCertificate"
                exact
                element={<CreateCertificate />}
              />
              <Route
                path="/admin/dasbord/PaymentsDetails"
                exact
                element={<PaymentDEtails />}
              />
              <Route
                path="/admin/dasbord/BatchAnylisis"
                exact
                element={<BathAnalysis />}
              />
              <Route
                path="/admin/dasbord/Batch/payment/update/:id"
                exact
                element={<UpdateBatchBox />}
              />
              <Route
                path="/admin/dasbord/Aa/invoice/payment/update/:id"
                exact
                element={<AaPaymentInvoice />}
              />
            </>
          )}
        </Route>

        <Route
          path="/trainingPartner/dashboard"
          element={<Dashboard />}
        />
        <Route path='/trainingPartner/signup' exact element={<Signup />} />
        <Route path='/statusFail' exact element={<ApllicationStatusFail />} />
        <Route path='/trainingPartner/signin' exact element={<Signin />} />
        <Route path='/profile' exact element={<ProfilePopup />} />
        <Route path='/trainingPartner/dashboard/Teachers' exact element={<Teachers batchid={batchId} />} />
        <Route path="/CreateBatch" exact element={<CreateBatch />} />
        <Route path="/Createcenter" exact element={<CreateCenter />} />
        <Route path="/manageBatch" exact element={<ManageBatch />} />
        <Route path="/transcript" exact element={<Transcript />} />
        <Route path="/trainers" exact element={<AllTrainers />} />
        <Route path="/completeBatchData/:completebatchId" exact element={<CompeteBtachData />} />
        <Route path='/trainingPartner/dashboard/CreateBatch/addteacher/:id' exact element={<AddTeacher />} />
        <Route path='/trainingPartner/dashboard/CreateBatch/addstudent/:id' exact element={<AddStudent>{'Add Student'}</AddStudent>} />
        <Route path='/trainingPartner/dashboard/:batchId' element={<Batch />} />
        <Route path='/trainingPartner/dashboard/student/:Id' element={<Student />} />
        <Route path='//trainingPartner/setting' exact element={<Setting />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
