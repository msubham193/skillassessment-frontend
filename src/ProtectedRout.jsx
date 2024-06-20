import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticationState } from './Pages/Admin/Atoms/atoms';

const ProtectedRout = () => {
  const authState=useRecoilValue(authenticationState) ;
  return authState?.isAuthenticated?<Outlet/>:<Navigate to={"/adminLogin"}/>;
}

export default ProtectedRout
