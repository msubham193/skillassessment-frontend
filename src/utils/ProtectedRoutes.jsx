/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

const ProtectedRoutes = () => {
  const aaAuthState = useRecoilValue(authTokenState);
  if (!aaAuthState?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (aaAuthState?.applicationStatus !== "Approved") {
    return <Navigate to="/login" />; // Redirect to a not approved page
  }

  return <Outlet />;
};

export default ProtectedRoutes;
