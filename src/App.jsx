/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { Route, Routes, useLocation } from "react-router-dom";
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
import CreateBatch from "./Pages/Traning Partner/CreateBatch";
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
import Centers from "./Pages/Traning Partner/Centers";
import CertificateGenerator from "./Components/Admin/Content/CertificateGenerator";
import CreateSNA from "./Pages/Admin/CreateSNA";
import AddNotification from "./Pages/Admin/AddNotification";
import Layout from "./layout";
import Assessorlogin from "./Pages/Assessment Agency/Login";
import RegistrationForm from "./Pages/Assessment Agency/Registration";
import MarksheetForm from "./Components/Assessment Agency/ui/MarksheetForm";
import StudentList from "./Components/Assessment Agency/ui/StudentList";
import { useSetRecoilState } from "recoil";
import { authTokenState } from "./Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { checkAATokenValidity } from "./Components/Assessment Agency/Atoms/utils";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import UploadResult from "./Pages/Assessment Agency/UploadResultPage";
import AttendanceSheetForm from "./Components/Assessment Agency/ui/AttendanceSheetForm";
import ResultSheetForm from "./Components/Assessment Agency/ui/ResultSheetForm";
import MarkAbsentStudentList from "./Components/Assessment Agency/ui/MarkAbsentStudentList";
import Profile from "./Pages/Assessment Agency/Profile";
import AssessmentSchedule from "./Pages/Assessment Agency/AssessmentSchedule";
import BatchManagementPage from "./Pages/Assessment Agency/BatchManagementPage";
import AddAssessorForm from "./Components/Assessment Agency/ui/AddAssessorForm";
import PaymentStatus from "./Pages/Assessment Agency/PaymentStatus";
import BankDetailsForm from "./Components/Assessment Agency/ui/Bankdetails";
import UploadDocuments from "./Pages/Assessment Agency/UploadDocuments";
import GenerateInvoice from "./Components/Assessment Agency/ui/GenerateInvoice";
import TrackInvoices from "./Pages/Assessment Agency/TrackInvoices";
import BatchDetailsofAA from "./Pages/Assessment Agency/BatchDetails";
import SNALayout from "./SNALayout";
import SNALogin from "./Pages/Sna/SNALogin";
import SNAProtectedRoutes from "./utils/SNAProtectedRoutes";
import ViewReports from "./Pages/Sna/ViewReports";
import Marksheet from "./Pages/Sna/Marksheet";
import ViewResult from "./Pages/Sna/ViewResult";
import IndividualStudentMarksheet from "./Pages/Sna/IndividualStudentMarksheet";
import SNADashboard from "./Pages/Sna/Dashboard";
import BatchDetailsOfSNA from "./Pages/Sna/BatchDetails";
import StaticLayout from "./StaticLayout";
import Home from "./Pages/Static/Home";
import AboutUs from "./Pages/Static/AboutUs.jsx";
import Partners from "./Pages/Static/Partners.jsx";
import TraningAndAssignment from "./Pages/Static/TraningAndAssignment";
import Qualification from "./Pages/Static/Qualification";
import NewsNotification from "./Pages/Static/NewsNotification.jsx";
import Resource from "./Pages/Static/Resource";
import ContactUs from "./Pages/Static/ContactUs";
import PortalLogin from "./Pages/Static/PortalLogin";
import UpdateCenter from "./Pages/Traning Partner/UpdateCenter";
import AssessorsPage from "./Pages/Assessment Agency/AssessorsPage";
import TrainerDetails from "./Components/Traning Partner/ui/TrainersDetails";
import StudentDetails from "./Pages/Sna/StudentsDetails";

import Invoice from "./Pages/Assessment Agency/Invoice";

import TrainingBatches from "./Components/Sna/TrainingBatches";
import TrainingCenters from "./Components/Sna/TrainingCentres";
import CenterDetailsofSNA from "./Pages/Sna/CenterDetailsofSNA"; 
import TCDetails from "./Components/Sna/TCDetails";
import TBDetails from "./Components/Sna/TBDetails";
import AddBulkTrainer from "./Pages/Traning Partner/BulkTrainerAdd";
import AddTrainer from "./Pages/Traning Partner/AddTrainer";

import DownloadAllMarksheet from "./Pages/Traning Partner/DownloadAllMarksheet";

import StudentTable from "./Components/Sna/StudentTable";
import TrackPayment from "./Pages/Traning Partner/TrackPayment";



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
        email: email,
      });
    }
  }, [setAuthState]);

  //code for traning partner

  const Batchdata = useRecoilValue(batchDataAtoms);
  const CompleteBatchData = useRecoilValue(CompeltebatchDataAtoms);
  const batchId = Batchdata._id;
  const completebatchId = CompleteBatchData._id;
  // console.log(batchId);
  const tpData = useRecoilValue(tpDataAtoms);
  const tpId = localStorage.getItem("trainingPartnerId");

  //code for assessment agency
  const setAuthTokenState = useSetRecoilState(authTokenState);
  useEffect(() => {
    const isTokenValid = checkAATokenValidity();
    if (isTokenValid) {
      const token = localStorage.getItem("aaAuthToken");
      const applicationStatus = localStorage.getItem("applicationStatus");
      setAuthTokenState({
        isAuthenticated: true,
        token: token,
        applicationStatus: applicationStatus,
      });
    }
  }, [setAuthTokenState]);

  return (
    <div>
      <Routes>
        {/* Static Pages */}

        <Route path="/" element={<StaticLayout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="partner" element={<Partners />} />
          <Route path="tp" element={<TraningAndAssignment />} />
          <Route path="qualification" element={<Qualification />} />
          <Route path="notification" element={<NewsNotification />} />
          <Route path="resource" element={<Resource />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="portal" element={<PortalLogin />} />
        </Route>

        {/* Admin routs... */}
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
              <Route
                path="/admin/dasbord/AllExam"
                exact
                element={<AllExam />}
              />
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
              <Route
                path="/admin/dasbord/:id"
                exact
                element={<BatchDetails />}
              />
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
              <Route
                path="/admin/dasbord/CertificateGenerate"
                exact
                element={<CertificateGenerator />}
              />
              <Route
                path="/admin/dasbord/CreateSna"
                exact
                element={<CreateSNA />}
              />
              <Route
                path="/admin/dasbord/addNotification for mainpage"
                exact
                element={<AddNotification />}
              />
            </>
          )}
        </Route>
        {/* traning partner routs */}
        <Route path="/trainingPartner/signin" exact element={<Signin />} />
        <Route path="/trainingPartner/signup" exact element={<Signup />} />
        <Route path="/statusFail" exact element={<ApllicationStatusFail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/trainingPartner/dashboard" element={<Dashboard />} />
          <Route path="/profile" exact element={<ProfilePopup />} />
          <Route
            path="/trainingPartner/dashboard/Teachers"
            exact
            element={<AddBulkTrainer batchid={batchId} />}
          />
          <Route path="/CreateBatch" exact element={<CreateBatch />} />
          <Route path="/Createcenter" exact element={<CreateCenter />} />
          <Route path="/manageBatch" exact element={<ManageBatch />} />
          <Route path="/updateCenter" exact element={<UpdateCenter />} />
          <Route path="/transcript" exact element={<Transcript />} />
          <Route path="/trainers" exact element={<AllTrainers />} />
          <Route path="/trackpayment" exact element={<TrackPayment />} />
          <Route path="/centers" exact element={<Centers />} />
          <Route path="/downloadAllMarksheet/:batchId" exact element={<DownloadAllMarksheet />} />
          <Route
            path="/completeBatchData/:completebatchId"
            exact
            element={<CompeteBtachData />}
          />
          <Route path="batchstudents/:batchId" element={<StudentDetails />} />
          <Route
            path="/trainingPartner/dashboard/CreateBatch/addteacher"
            exact
            element={<AddTrainer />}
          />
          <Route
            path="/trainingPartner/dashboard/CreateBatch/addstudent/:id"
            exact
            element={<AddStudent>{"Add Student"}</AddStudent>}
          />
          <Route
            path="/trainingPartner/viewBatch/:batchId"
            element={<Batch />}
          />
          <Route
            path="/trainingPartner/dashboard/student/:Id"
            element={<Student />}
          />
          <Route path="/trainer/:teacherId" element={<TrainerDetails />} />
          <Route path="/trainingPartner/setting" exact element={<Setting />} />
        </Route>
        {/* Routes for Assessment Agency */}
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="login" element={<Assessorlogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="assessmentschedule" element={<AssessmentSchedule />} />
            <Route path="managebatches" element={<BatchManagementPage />} />
            <Route path="addassessor" element={<AddAssessorForm />} />
            <Route path="uploadresult" element={<UploadResult />} />
            <Route path="paymentstatus" element={<PaymentStatus />} />
            <Route path="invoices" element={<TrackInvoices />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="profile" element={<Profile />} />
            <Route path="assessors" element={<AssessorsPage />} />
            <Route path="students/:batchId" element={<StudentList />} />
            <Route
              path="markabsent/:batchId"
              element={<MarkAbsentStudentList />}
            />
            <Route path="marksheet/:studentId" element={<MarksheetForm />} />
            <Route
              path="batch/:batchId/exam/:examId"
              element={<BatchDetailsofAA />}
            />
            <Route path="bankdetails" element={<BankDetailsForm />} />
            <Route
              path="uploaddetails/:examId/:batchId"
              element={<UploadDocuments />}
            />
          </Route>
          <Route path="generateinvoice" element={<GenerateInvoice />} />
          <Route
            path="attendacesheet/:batchId"
            element={<AttendanceSheetForm />}
          /> 
          <Route path="resultsheet" element={<ResultSheetForm />} />
        </Route>

        {/* SNA Routes */}
        <Route path="snalogin" element={<SNALogin />} />
        <Route element={<SNAProtectedRoutes />}>
          <Route path="/sna" element={<SNALayout />}>
            <Route path="snadashboard" element={<SNADashboard />} />
            <Route path="snadashboard" element={<SNADashboard/>} />
            <Route path="trainingcenters" element={<TrainingCenters/>} />
            <Route path="trainingbatches" element={<TrainingBatches/>} />
            <Route
              path="batchdetails/:batchId"
              element={<BatchDetailsOfSNA />}
              />
            <Route
              path="batchdetails/student/:batchId"
              element={<StudentTable />}
              />
            <Route
              path="batch/student/:studentId"
              element={<StudentDetails />}
              />
              <Route
              path="centerDetails/:centerId"
              element={<CenterDetailsofSNA />}
            />
            <Route path="reports" element={<ViewReports />} />
            <Route path="marks" element={<Marksheet />} />
            <Route path="batchresult/:batchId" element={<ViewResult />} />
            <Route
              path="studentresult/:studentId"
              element={<IndividualStudentMarksheet />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
