import React, { useEffect } from "react";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { Route, Routes } from "react-router-dom";
import TpDetails from "./Pages/Admin/TpDetails";
import AaDetails from "./Pages/Admin/AaDetails";
import AaNotification from "./Pages/Admin/AaNotification";
import TpNotification from "./Pages/Admin/TpNotification";
import AdminLogin from "./Pages/Admin/AdminLogin";
import ProtectedRout from "./ProtectedRout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticationState } from "./Pages/Admin/Atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkTokenValidity } from "./Pages/Admin/Atoms/utils";

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
            path="/admin/dasbord/TreaningPartner/:id"
            exact
            element={<TpDetails />}
          />
          <Route
            path="/admin/dasbord/AssessmentAgency/:id"
            exact
            element={<AaDetails />}
          />
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;



