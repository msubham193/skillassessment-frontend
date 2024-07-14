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
import { useRecoilState } from "recoil";
import { checkTokenValidity } from "./Pages/Admin/Atoms/utils";
import BatchDetails from "./Pages/Admin/BatchDetails";
import Notification from "./Pages/Admin/Notification";
import CreateCourse from "./Pages/Admin/CreateCourse";
import CreateScheme from "./Pages/Admin/CreateScheme";
import BatchWiseStudentResult from "./Pages/Admin/BatchWiseStudentResult";
import StudentResultDetails from "./Pages/Admin/StudentResultDetails";

const App = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  useEffect(() => {
    const isTokenValid = checkTokenValidity();
    if (isTokenValid) {
      const token = localStorage.getItem("adminAuthToken");
      // console.log(JSON.parse(token).data)
      setAuthState({
        isAuthenticated: true,
        token: token,
      });
    }
  }, [setAuthState]);
  // console.log(authState)
  return (
    <div>
      <Routes>
        <Route path="/adminLogin" exact element={<AdminLogin />} />
        <Route element={<ProtectedRout />}>
          <Route path="/admin/dasbord" exact element={<AdminDashboard />} />
          <Route
            path="/admin/dasbord/batch/mark/students/:id"
            exact
            element={<BatchWiseStudentResult />}
          />
          <Route path="/admin/dasbord/studentMark/:id" exact element={<StudentResultDetails/>} />
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
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
