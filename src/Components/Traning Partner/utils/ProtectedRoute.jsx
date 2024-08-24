// In a new file, e.g., components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenAtoms } from '../Atoms/tokenAtom';


const ProtectedRoute = () => {
  const token = useRecoilValue(tokenAtoms);

  if (!token) {
    return <Navigate to="/trainingPartner/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

