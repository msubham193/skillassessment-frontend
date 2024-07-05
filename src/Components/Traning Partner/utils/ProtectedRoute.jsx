import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, applicationStatus }) => {
  return applicationStatus === 'Approved' ? <Element /> : <Navigate to="/trainingPartner/signin" />;
};

export default ProtectedRoute;

