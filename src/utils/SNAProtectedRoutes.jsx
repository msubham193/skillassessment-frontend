/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SNAProtectedRoutes = () => {
  const state = localStorage.getItem("state");
  if (!state) {
    return <Navigate to="/snalogin" />;
  }
  return <Outlet />;
};

export default SNAProtectedRoutes;
