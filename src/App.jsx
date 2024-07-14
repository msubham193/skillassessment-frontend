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
import Signup from "./Pages/Traning Partner/Signup";
import ApllicationStatusFail from "./Pages/Traning Partner/ApllicationStatusFail";
import Signin from "./Pages/Traning Partner/Signin";
import ProfilePopup from "./Pages/Traning Partner/ProfilePopup";
import Teachers from "./Pages/Traning Partner/Teachers";
import ProtectedRoute from "./Components/Traning Partner/utils/ProtectedRoute";
import Dashboard from "./Pages/Traning Partner/Dashboard";
import CreateBatch from "./Pages/Traning Partner/CreateBatch";
import AddTeacher from "./Pages/Traning Partner/AddTeacher";
import AddStudent from "./Pages/Traning Partner/AddStudent";
import Batch from "./Pages/Traning Partner/Batch";
import Student from "./Pages/Traning Partner/Student";
import { batchDataAtoms } from "./Components/Traning Partner/Atoms/batchatom";
import { tpDataAtoms } from "./Components/Traning Partner/Atoms/trainingPartnerData";

const App = () => {
  const [authState,setAuthState] = useRecoilState(authenticationState);
  useEffect(() => {
    const isTokenValid = checkTokenValidity();
    if (isTokenValid) {
      const token = localStorage.getItem('adminAuthToken');
      // console.log(JSON.parse(token).data)
      setAuthState({
        isAuthenticated: true,
        token:token,
      });
    }
  }, [setAuthState]);
  // console.log(authState)

  //code of traning partner
  const Batchdata = useRecoilValue(batchDataAtoms);
  const batchId = Batchdata._id;
  // console.log(batchId);
  const tpData = useRecoilValue(tpDataAtoms);
  const tpId = localStorage.getItem("trainingPartnerId");

    return (
    <div>
      <Routes>
        <Route path="/adminLogin" exact element={<AdminLogin />} />
        <Route element={<ProtectedRout />}>
          <Route path="/admin/dasbord" exact element={<AdminDashboard />} />
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
        </Route>
        <Route
          path="/trainingPartner/dashboard"
          element={
            <ProtectedRoute
              applicationStatus={tpData.applicationStatus}
              element={Dashboard}
            />
          }
        />
        <Route path="/trainingPartner/signup" exact element={<Signup />} />
        <Route path="/statusFail" exact element={<ApllicationStatusFail />} />
        <Route path="/trainingPartner/signin" exact element={<Signin />} />
        <Route path="/profile" exact element={<ProfilePopup />} />
        <Route
          path="/trainingPartner/dashboard/Teachers"
          exact
          element={<Teachers batchid={batchId} />}
        />
        <Route
          path="/trainingPartner/dashboard/CreateBatch"
          exact
          element={<CreateBatch />}
        />
        <Route
          path="/trainingPartner/dashboard/CreateBatch/addteacher/:id"
          exact
          element={<AddTeacher />}
        />
        <Route
          path="/trainingPartner/dashboard/CreateBatch/addstudent/:id"
          exact
          element={<AddStudent>{"Add Student"}</AddStudent>}
        />
        <Route path="/trainingPartner/dashboard/:batchId" element={<Batch />} />
        <Route
          path="/trainingPartner/dashboard/student/:Id"
          element={<Student />}
        />
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;



